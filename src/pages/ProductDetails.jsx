import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromID } from '../services/api';

class ProductDetails extends React.Component {
state ={
  product: {},
  attributes: [],
  freeShipping: false,
  cartItems: [],
  email: '',
  message: '',
  nota: '',
  avaliations: [],
  itemsAdded: 0,
}

componentDidMount= async () => {
  this.getCartItemsFromLocalStorage();
  this.getAvaliationFromLocalStorage();
  this.getItemsQuantityFromLocalStorage();
  await this.searchProduct();
}

getCartItemsFromLocalStorage = () => {
  const cartItems = (localStorage.getItem('cartItems'));
  this.setState({ cartItems });
}

getItemsQuantityFromLocalStorage = () => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  const itemsAdded = cartItems
    ? cartItems.reduce((acc, curr) => acc + curr.quantity, 0) : 0;

  this.setState({ itemsAdded });
}

searchProduct = async () => {
  const { match } = this.props;
  const productAPI = await getProductsFromID(match.params.id);
  const { attributes } = productAPI;
  const freeShipping = productAPI.shipping.free_shipping;

  this.setState({
    product: productAPI,
    attributes,
    freeShipping,
  });
}

saveCartItemsInLocalStorage = () => {
  const { cartItems } = this.state;
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

addProductToCart = () => {
  const { product, cartItems } = this.state;
  product.quantity = 1;

  this.setState((prevState) => ({
    cartItems: cartItems ? [...cartItems, product] : [product],
    itemsAdded: prevState.itemsAdded + 1,
  }), this.saveCartItemsInLocalStorage);
}

onRadioButtonClick = ({ target }) => {
  const { id } = target;
  this.setState({
    nota: id,
  });
}

handleChange = ({ target }) => {
  const { name, value } = target;
  this.setState({
    [name]: value,
  });
}

printAvaliation = () => {
  const { email, message, nota, product: { id } } = this.state;
  const avaliation = { email, message, nota, id };
  this.setState((prevState) => ({
    avaliations: [...prevState.avaliations, avaliation],
  }), () => this.saveAvaliationInLocalStorage());
}

saveAvaliationInLocalStorage = () => {
  const { avaliations } = this.state;
  localStorage.setItem('avaliation', JSON.stringify(avaliations));
}

getAvaliationFromLocalStorage = () => {
  const retornoLocalStorageJson = localStorage.getItem('avaliation');
  const retornoLocalStorageObj = JSON.parse(retornoLocalStorageJson);
  if (retornoLocalStorageObj !== null) {
    this.setState({
      avaliations: retornoLocalStorageObj,
    });
  }
}

render() {
  const { product, attributes, freeShipping, avaliations, itemsAdded } = this.state;
  const { match: { params: { id } } } = this.props;
  return (
    <div>
      <div className="productDetails" name={ product.id } data-testid="product">
        <div className="product">
          {freeShipping === true && (

            <p data-testid="free-shipping">Frete grátis</p>)}
          <img src={ product.thumbnail } alt={ product.title } />
          <p
            data-testid="product-detail-name"
          >
            {product.title}

          </p>
          <p>
            {' '}
            R$
            {' '}
            {product.price}
          </p>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ this.addProductToCart }
          >
            Adicionar ao Carrinho
          </button>
          <Link to="/shopping-cart" data-testid="shopping-cart-button">
            Carrinho
            {' '}
            <span data-testid="shopping-cart-size">{ itemsAdded }</span>
          </Link>
        </div>
        <ul className="attributes">
          {attributes.map((i) => (
            <li key={ i.id }>
              {`${i.name}: ${i.value_name}`}
            </li>
          ))}
        </ul>
      </div>
      <div className="rates">
        <h1>Avaliações</h1>
        <form>
          <input
            type="email"
            placeholder="Insira seu email"
            data-testid="product-detail-email"
            name="email"
            onChange={ this.handleChange }
            autoComplete="off"
          />
          <label htmlFor="1">
            <input
              type="radio"
              name="nota"
              id="1"
              data-testid="1-rating"
              onClick={ this.onRadioButtonClick }
            />
            1
          </label>
          <label htmlFor="2">
            <input
              type="radio"
              name="nota"
              id="2"
              data-testid="2-rating"
              onClick={ this.onRadioButtonClick }
            />
            2
          </label>
          <label htmlFor="3">
            <input
              type="radio"
              name="nota"
              id="3"
              data-testid="3-rating"
              onClick={ this.onRadioButtonClick }
            />
            3
          </label>
          <label htmlFor="4">
            <input
              type="radio"
              name="nota"
              id="4"
              data-testid="4-rating"
              onClick={ this.onRadioButtonClick }
            />
            4
          </label>
          <label htmlFor="5">
            <input
              type="radio"
              name="nota"
              id="5"
              data-testid="5-rating"
              onClick={ this.onRadioButtonClick }
            />
            5
          </label>
          <textarea
            placeholder="Mensagem(opcional)"
            data-testid="product-detail-evaluation"
            onChange={ this.handleChange }
            name="message"
          />
          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ this.printAvaliation }
          >
            Avaliar
          </button>
        </form>
      </div>
      {avaliations.filter((element) => element.id === id)
        .map((element, index) => (
          <div
            className="ratesDone"
            key={ index }
          >
            <p>{ element.nota }</p>
            <p>{ element.email }</p>
            <p>{ element.message }</p>
          </div>
        ))}
    </div>
  );
}
}

ProductDetails.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default ProductDetails;
