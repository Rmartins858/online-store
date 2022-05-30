import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategorieButton from './CategorieButton';

class CategoriesDisplay extends Component {
  render() {
    const { categories, onButtonClick } = this.props;
    const centerTitle = {
      textAlign: 'center',
    };
    return (
      <aside>
        <h1 style={ centerTitle }>Categorias</h1>
        <ul>
          {categories.map(({ name, id }) => (
            <li key={ id }>
              <CategorieButton
                labelText={ name }
                inputId={ id }
                onButtonClick={ onButtonClick }
              />
            </li>))}
        </ul>
      </aside>
    );
  }
}

CategoriesDisplay.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default CategoriesDisplay;
