import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromID } from '../services/api';

class ProductDetails extends React.Component {
    state ={
      product: {},
      attributes: [],
      cartItems: [],
    }

    componentDidMount= async () => {
      await this.searchProduct();
      await this.getCartItemsFromLocalStorage();
    }

    getCartItemsFromLocalStorage = () => {
      const cartItems = JSON.parse(localStorage.getItem('cartItems'));
      this.setState({ cartItems });
    }

    searchProduct = async () => {
      const { match } = this.props;
      const productAPI = await getProductsFromID(match.params.id);
      const { attributes } = productAPI;

      this.setState({
        product: productAPI,
        attributes,
      });
    }

    saveCartItemsInLocalStorage = () => {
      const { cartItems } = this.state;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    addProductToCart = () => {
      const { product, cartItems } = this.state;
      this.setState((prevState) => ({
        cartItems: cartItems ? [...prevState.cartItems, product] : [product],
      }), this.saveCartItemsInLocalStorage);
    }

    render() {
      const { product, attributes } = this.state;
      return (
        <div name={ product.id } data-testid="product">
          <img src={ product.thumbnail } alt={ product.title } />
          <p data-testid="product-detail-name">{product.title}</p>
          <p>{product.price}</p>
          <ul>
            {attributes.map((i) => (
              <li key={ i.id }>
                {`${i.name}: ${i.value_name}`}
              </li>
            ))}
          </ul>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ this.addProductToCart }
          >
            Adicionar ao Carrinho
          </button>
          <Link to="/shopping-cart" data-testid="shopping-cart-button">Carrinho</Link>
        </div>
      );
    }
}

ProductDetails.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default ProductDetails;
