import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CategorieButton extends Component {
  render() {
    const { labelText, onButtonClick } = this.props;
    return (
      <label htmlFor={ labelText } data-testid="category">
        <input
          type="radio"
          name="categories"
          id={ labelText }
          onClick={ onButtonClick }
        />
        { labelText }
      </label>
    );
  }
}

CategorieButton.propTypes = {
  labelText: PropTypes.string.isRequired,
  // inputId: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default CategorieButton;
