import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoriesDisplay from '../components/CategoriesDisplay';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  state = {
    categories: [],
    searchList: [],
    search: [],
    cartItems: [],
  }

  componentDidMount() {
    this.fetchCategories();
  }

  onInputChange= ({ target }) => {
    const { value } = target;
    this.setState({
      search: value,
    });
  }

  listageral= async () => {
    const { search } = this.state;
    const test = await getProductsFromCategoryAndQuery(undefined, search);
    console.log(test);
    this.setState({
      searchList: test.results,
    });
  }

  renderCategorieProducts = async ({ target }) => {
    const { id } = target;
    const test = await getProductsFromCategoryAndQuery(undefined, id);
    console.log(test);
    this.setState({
      searchList: test.results,
    });
  }

  fetchCategories = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  }

  saveCartItemsInLocalStorage = () => {
    const { cartItems } = this.state;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  // Adiciona quantidades
  onButtonClick = ({ target }) => {
    const { name } = target;
    const { searchList } = this.state;
    const cartItem = searchList.find((product) => product.id === name);
    cartItem.quantity = 1;

    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, cartItem],
    }), this.saveCartItemsInLocalStorage);
  }

  render() {
    const { categories, search, searchList } = this.state;
    return (
      <div>
        <header>
          <div>
            <h3 data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h3>
            <input
              type="text"
              value={ search }
              data-testid="query-input"
              placeholder="Pesquisar produto"
              onChange={ this.onInputChange }
            />
            <button
              type="button"
              data-testid="query-button"
              onClick={ this.listageral }
            >
              {' '}
              Enviar
              {' '}
            </button>
          </div>
          <section className="cart-icon">
            <Link to="/shopping-cart" data-testid="shopping-cart-button">Carrinho</Link>
          </section>
        </header>
        <div className="divisory">
          <section className="categories">
            <CategoriesDisplay
              categories={ categories }
              onButtonClick={ this.renderCategorieProducts }
            />
          </section>
          <section className="productList">
            { searchList.length === 0 ? (
              <div>
                <h1> Nenhum produto foi encotrado</h1>
                <h3> Selecione uma categoria </h3>
              </div>

            ) : searchList.map((product) => (
              <ProductCard
                key={ product.id }
                productId={ product.id }
                productTitle={ product.title }
                productThumbnail={ product.thumbnail }
                productPrice={ product.price }
                onClick={ this.onButtonClick }
                freeShipping={ product.shipping.free_shipping }
              />
            )) }
          </section>
        </div>
      </div>
    );
  }
}

export default Home;
