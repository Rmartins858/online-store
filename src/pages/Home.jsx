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
    itemsAdded: 0,
  }

  componentDidMount() {
    this.fetchCategories();
    this.getCartItemsFromLocalStorage();
    this.getItemsQuantityFromLocalStorage();
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

  getCartItemsFromLocalStorage = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    this.setState({ cartItems });
  }

  getItemsQuantityFromLocalStorage = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const itemsAdded = cartItems
      ? cartItems.reduce((acc, curr) => acc + curr.quantity, 0) : 0;

    this.setState({ itemsAdded });
  }

  saveCartItemsInLocalStorage = () => {
    const { cartItems } = this.state;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  // Adiciona quantidades --
  onButtonClick = ({ target }) => {
    const { name } = target;
    const { searchList, cartItems } = this.state;
    const cartItem = searchList.find((product) => product.id === name);
    cartItem.quantity = 1;

    this.setState((prevState) => ({
      cartItems: cartItems ? [...cartItems, cartItem] : [cartItem],
      itemsAdded: prevState.itemsAdded + 1,
    }), this.saveCartItemsInLocalStorage);
  }

  render() {
    const { categories, search, searchList, itemsAdded } = this.state;
    return (
      <div>
        <header>
          <div className="home-initial">
            <h3 data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h3>
            <input
              className="input-search"
              type="search"
              value={ search }
              data-testid="query-input"
              placeholder="Pesquisar produto"
              onChange={ this.onInputChange }
            />
            <button
              className="btn-search"
              type="submit"
              data-testid="query-button"
              onClick={ this.listageral }
            >
              {' '}
              Enviar
              {' '}
            </button>
          </div>
          <h5 className="fill">Lorem ipsum dolor sit amet, consectetur adipiscing.</h5>
          <section className="cart-icon">
            <Link to="/shopping-cart" data-testid="shopping-cart-button">
              Carrinho:
              {' '}
              <span data-testid="shopping-cart-size">{ itemsAdded }</span>
            </Link>
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
