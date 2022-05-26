import React from 'react';
import PropTypes from 'prop-types';
import { getProductsFromID } from '../services/api';

class ProductDetails extends React.Component {
    state ={
      products: {},
      attributes: [],
      email: '',
      message: '',
      nota: '',
      avaliations: [],
    }

    componentDidMount= async () => {
      await this.searchProduct();
      await this.productsDet();
      await this.getAvaliationFromLocalStorage();
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
      const { email, message, nota, products: { id } } = this.state;
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
      const { products, attributes, avaliations } = this.state;
      const { match: { params: { id } } } = this.props;
      return (
        <div name={ products.id } data-testid="product">
          <img src={ products.thumbnail } alt={ products.title } />
          <h1 data-testid="product-detail-name">{products.title}</h1>
          <h2>{products.price}</h2>
          <ul>
            {attributes.map((i) => (
              <li key={ i.id }>
                {`${i.name}: ${i.value_name}`}
              </li>
            ))}
          </ul>
          <div>
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
                type="button"
                data-testid="submit-review-btn"
                onClick={ this.printAvaliation }
              >
                Avaliar
              </button>
            </form>
          </div>
          {avaliations.filter((element) => element.id === id)
            .map((element, index) => (
              <div key={ index }>
                <p>{ element.email }</p>
                <p>{ element.nota }</p>
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
