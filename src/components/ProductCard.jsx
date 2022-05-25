import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  render() {
    const { productId, productTitle, productThumbnail, productPrice } = this.props;
    return (
      <section
        data-testid="product"
        id={ productId }
      >
        <h2>{ productTitle }</h2>
        <img src={ productThumbnail } alt={ `Imagem de ${productTitle}` } />
        <p>
          R$
          {' '}
          <span>{ productPrice }</span>
        </p>
        <Link
          data-testid="product-detail-link"
          to={ `/product-details/${productId}` }
        >
          {' '}
          Detalhes
          {' '}

        </Link>
      </section>
    );
  }
}

ProductCard.propTypes = {
  productId: PropTypes.string.isRequired,
  productTitle: PropTypes.string.isRequired,
  productThumbnail: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
};

export default ProductCard;
