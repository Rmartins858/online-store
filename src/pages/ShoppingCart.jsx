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
                  <img src={ item.thumbnail } alt={ item.title } />
                  <h2 data-testid="shopping-cart-product-name">{ item.title }</h2>
                  <p>
                    Preço: R$
                    {' '}
                    { item.price * item.quantity }
                  </p>
                  <p data-testid="shopping-cart-product-quantity">
                    Quantidade:
                    {' '}
                    {item.quantity}
                  </p>
                  <button
                    type="button"
                    onClick={ this.plusQuantity }
                    name={ item.id }
                  >
                    +

                  </button>
                  <button
                    type="button"
                    onClick={ this.minusQuantity }
                    name={ item.id }
                  >
                    -

                  </button>
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
