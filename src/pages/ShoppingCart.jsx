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
  const unselectedItems = cartItems.filter((item) => item.id !== target.name);
  const selectedItem = cartItems.find((object) => object.id === target.name);

  if (selectedItem.quantity >= selectedItem.available_quantity) {
    this.setState({ cartItems: [selectedItem, ...unselectedItems] },
      localStorage.setItem('cartItems', JSON.stringify(cartItems)));
  }

  if (selectedItem.quantity < selectedItem.available_quantity) {
    selectedItem.quantity += 1;
    this.setState({ cartItems: [selectedItem, ...unselectedItems] },
      localStorage.setItem('cartItems', JSON.stringify(cartItems)));
  }
}

minusQuantity = ({ target }) => {
  const { cartItems } = this.state;
  const unselectedItems = cartItems.filter((item) => item.id !== target.name);
  const selectedItem = cartItems.find((object) => object.id === target.name);
  selectedItem.quantity -= 1;

  this.setState({
    cartItems: [...unselectedItems, selectedItem],
  },
  localStorage.setItem('cartItems', JSON.stringify(cartItems)));
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
        <div className="cart-text">
          <h2>
            Carrinho de compras
          </h2>
          {cartItems && (
            cartItems.map((item) => (
              <div
                className="cart"
                key={ item.id }
              >
                <img
                  src={ item.thumbnail }
                  alt={ item.title }
                  style={ { width: '7cm' } }
                />
                <h3 data-testid="shopping-cart-product-name">{ item.title }</h3>
                <p style={ { fontWeight: 'bold' } }>
                  Preço: R$
                  {' '}
                  <span>{ item.price * item.quantity }</span>
                </p>
                <div style={ { display: 'flex' } }>
                  Quantidade:
                  {' '}
                  <p data-testid="shopping-cart-product-quantity">
                    { item.quantity }
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
