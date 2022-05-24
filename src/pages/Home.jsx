import React from 'react';
import { Link } from 'react-router-dom';
import CategorieButton from '../components/CategorieButton';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  state = {
    categories: [],
    searchList: [],
    search: [],
    xablau: '',

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

  listageral= () => {
    const { search } = this.state;
    const test =  getProductsFromCategoryAndQuery(undefined, search);
    this.setState({
      searchList: test.results,
    })

  fetchCategories = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render(){
    const { categories, search } = this.state;
    console.log(categories);

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
        />
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <aside>
          <h1>Categorias</h1>
          <ul>
            {categories.map(({ name, id }) => (
              <li key={ id }>
                <CategorieButton
                  labelText={ name }
                  inputId={ id }
                />
              </li>))}
          </ul>
        </aside>
        <Link to="/shopping-cart" data-testid="shopping-cart-button">Carrinho</Link>
      </div>
    );
  }
}

export default Home;
