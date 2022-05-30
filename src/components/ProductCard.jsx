import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  render() {
    const { productId, productTitle, productThumbnail,
      productPrice, onClick, freeShipping } = this.props;
    return (
      <section
        data-testid="product"
        id={ productId }
      >
        <h3>{ productTitle }</h3>
        {freeShipping && <p data-testid="free-shipping">Frete Grátis</p>}
        <img
          src={ productThumbnail }
          alt={ `Imagem de ${productTitle}` }
          style={ { width: '5cm' } }
        />
        <p style={ { fontWeight: 'bold' } }>
          R$
          {' '}
          <span>{ productPrice }</span>
        </p>
        <div style={ { margin: '15px' } }>
          <Link
            data-testid="product-detail-link"
            to={ `/product-details/${productId}` }
          >
            {' '}
            Detalhes
            {' '}

          </Link>
        </div>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ onClick }
          name={ productId }
        >
          Adicionar ao Carrinho
        </button>
      </section>
    );
  }
}

ProductCard.propTypes = {
  productId: PropTypes.string.isRequired,
  productTitle: PropTypes.string.isRequired,
  productThumbnail: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  freeShipping: PropTypes.bool.isRequired,
};

export default ProductCard;
