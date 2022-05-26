import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ShoppingCart extends Component {
  state = {
    cartItems: [],
  }

  componentDidMount = async () => {
    await this.getCartItemsFromLocalStorage();
  }

  getCartItemsFromLocalStorage = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    this.setState({ cartItems });
  }

  render() {
    const { cartItems } = this.state;
    return (
      <div>
        {!cartItems ? (
          <h2
            data-testid="shopping-cart-empty-message"
          >
            Seu carrinho está vazio
          </h2>
        ) : (
          <div>
            {cartItems && (
              cartItems.map((item) => (
                <div key={ item.id }>
                  <img src={ item.thumbnail } alt={ item.title } />
                  <h2 data-testid="shopping-cart-product-name">{ item.title }</h2>
                  <p>{ item.price }</p>
                  <p data-testid="shopping-cart-product-quantity">1</p>
                </div>
              ))
            )}
          </div>
        )}
        <Link to="checkout" data-testid="checkout-products">Finalizar Compra</Link>
      </div>
    );
  }
}

export default ShoppingCart;
