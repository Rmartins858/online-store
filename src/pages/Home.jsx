import React from 'react';
import { Link } from 'react-router-dom';
import CategorieButton from '../components/CategorieButton';
import { getCategories } from '../services/api';

class Home extends React.Component {
  state = {
    categories: [],
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;
    console.log(categories);

    return (
      <div>
        <input type="text" />
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
