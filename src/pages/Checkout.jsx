import React from 'react';

class Checkout extends React.Component {
  render() {
    // const { productTitle, productPrice } = this.props;
    return (
      <div>
        <div className="productReview">
          <h3>Revise seus Produtos</h3>
          {/* {productTitle} {productPrice} */}
          <h3>
            Total:
            { /* productPrice */}
          </h3>
        </div>
        <div>
          <form>
            <input
              placeholder="Nome Completo"
              type="text"
              data-testid="checkout-fullname"
            />
            <input placeholder="CPF" type="text" data-testid="checkout-cpf" />
            <input
              placeholder="Email"
              data-testid="checkout-email"
              type="email"
              name="buyerEmail"
              id="buyerEmail"
            />
            <input placeholder="Telefone" type="text" data-testid="checkout-phone" />
            <input placeholder="CEP" type="text" data-testid="checkout-cep" />
            <input placeholder="Endereço" type="text" data-testid="checkout-address" />
            <button type="button">Comprar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Checkout;
