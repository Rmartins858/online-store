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

  plusQuantity = ({ target }) => {
    const { cartItems } = this.state;
    const item = cartItems.find((object) => object.id === target.name);
    item.quantity += 1;
    this.setState({ cartItems });
    localStorage.setItem('cartItems', cartItems);
  }

  minusQuantity = ({ target }) => {
    const { cartItems } = this.state;
    const item = cartItems.find((object) => object.id === target.name);
    item.quantity -= 1;
    this.setState({ cartItems });
    localStorage.setItem('cartItems', cartItems);
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
                  <img
                    src={ item.thumbnail }
                    alt={ item.title }
                    style={ { width: '7cm' } }
                  />
                  <h2 data-testid="shopping-cart-product-name">{ item.title }</h2>
                  <p style={ { fontWeight: 'bold' } }>
                    Preço: R$
                    {' '}
                    { item.price * item.quantity }
                  </p>
                  <div style={ { display: 'flex' } }>
                    Quantidade:
                    {' '}
                    <p data-testid="shopping-cart-product-quantity">
                      {item.quantity}
                    </p>
                    <button
                      type="button"
                      data-testid="product-increase-quantity"
                      onClick={ this.plusQuantity }
                      name={ item.id }
                      style={ { margin: '5px' } }
                    >
                      +

                    </button>
                    <button
                      type="button"
                      data-testid="product-decrease-quantity"
                      onClick={ this.minusQuantity }
                      name={ item.id }
                      style={ { margin: '5px' } }
                    >
                      -

                    </button>
                  </div>
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
