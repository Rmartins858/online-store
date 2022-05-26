import React from 'react';
import PropTypes from 'prop-types';
import { getProductsFromID } from '../services/api';

class ProductDetails extends React.Component {
    state ={
      product: {},
      attributes: [],
    }

    componentDidMount= async () => {
      await this.searchProduct();
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
        </div>
      );
    }
}

ProductDetails.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default ProductDetails;
