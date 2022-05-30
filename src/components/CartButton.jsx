import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CartButton extends Component {
  state = {
    itemsAdded: 0,
  }

  componentDidMount= async () => {
    await this.getCartItemsFromLocalStorage();
  }

  getCartItemsFromLocalStorage = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const itemsAdded = cartItems.length;

    this.setState({ itemsAdded });
  }

  render() {
    const { itemsAdded } = this.state;

    return (
      <Link
        to="/shopping-cart"
        data-testid="shopping-cart-button"
        className="cart-button"
      >
        Carrinho
        <span
          data-testid="shopping-cart-size"
          className="cart-items-count"
        >
          { itemsAdded }
        </span>
      </Link>
    );
  }
}

export default CartButton;
