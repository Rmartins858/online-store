import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div>
        <input type="text" />
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>

        <Link to="/shopping-cart" data-testid="shopping-cart-button">Carrinho</Link>
      </div>
    );
  }
}

export default Home;
