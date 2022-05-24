import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CategorieButton extends Component {
  render() {
    const { labelText, inputId } = this.props;
    return (
      <label htmlFor={ inputId } data-testid="category">
        <input
          type="radio"
          name="categories"
          id={ inputId }
        />
        { labelText }
      </label>
    );
  }
}

CategorieButton.propTypes = {
  labelText: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
};

export default CategorieButton;
