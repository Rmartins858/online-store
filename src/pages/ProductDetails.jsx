import React from 'react';
import PropTypes from 'prop-types';
import { getProductsFromID } from '../services/api';

class ProductDetails extends React.Component {
    state ={
      products: {},
      attributes: [],
    }

    componentDidMount= async () => {
      await this.searchProduct();
    }

    searchProduct = async () => {
      const { match } = this.props;
      const productAPI = await getProductsFromID(match.params.id);
      this.setState({
        products: productAPI,
      });
    }

    productsDet = () => {
      const { products } = this.state;
      const { attributes } = products;
      const detailsAttribute = attributes.map((i) => i);
      this.setState({
        attributes: detailsAttribute,
      });
    }

    render() {
      const { products, attributes } = this.state;
      return (
        <div name={ products.id } data-testid="product">
          <img src={ products.thumbnail } alt={ products.title } />
          <p data-testid="product-detail-name">{products.title}</p>
          <p>{products.price}</p>
          <ul>
            {attributes.map((i) => (
              <li key={ i.id }>
                {`${i.name}: ${i.value_name}`}
              </li>
            ))}
          </ul>
        </div>
      );
    }
}

ProductDetails.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default ProductDetails;
