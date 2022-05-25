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

  render() {
    const { categories, search, searchList } = this.state;
    return (
      <div>
        <input
          type="text"
          value={ search }
          data-testid="query-input"
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
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <CategoriesDisplay
          categories={ categories }
          onButtonClick={ this.renderCategorieProducts }
        />
        <Link to="/shopping-cart" data-testid="shopping-cart-button">Carrinho</Link>
        <div>
          { searchList.length === 0 ? (
            <h1> Nenhum produto foi encotrado</h1>

          ) : searchList.map((product) => (
            <ProductCard
              key={ product.id }
              productId={ product.id }
              productTitle={ product.title }
              productThumbnail={ product.thumbnail }
              productPrice={ product.price }
            />
          )) }
        </div>
      </div>
    );
  }
}

export default Home;
