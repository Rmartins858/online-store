import React from 'react';
import PropTypes from 'prop-types';
import { getProductsFromID } from '../services/api';

class ProductDetails extends React.Component {
    state ={
      products: {},
    }

    componentDidMount= async () => {
      await this.searchProduct();
    }

    searchProduct = async () => {
      const { match } = this.props;
      const test = await getProductsFromID(match.params.id);
      this.setState({
        products: test,
      });
      console.log(test);
    }

    render() {
      const { products } = this.state;
      const { attributes } = products;
      console.log(attributes);
      return (
        <div name={ products.id } data-testid="product">
          <img src={ products.thumbnail } alt={ products.title } />
          <p data-testid="product-detail-name">{products.title}</p>
          <p>{products.price}</p>
          {/* {products > 0 && (
            <div>
              {attributes.length > 0 && (
                attributes.map((i) => (
                  <p key={ i.value_id }>
                    {' '}
                    test
                  </p>

                ))
              )}

            </div>
          )} */}
        </div>
      );
    }
}

ProductDetails.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default ProductDetails;
