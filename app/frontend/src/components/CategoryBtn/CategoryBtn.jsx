import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRecipes } from '../../context/RecipesProvider';
import { CategoryButton, CategoryButtonContainer } from './style';

function CategoryBtn({ category, type, icon }) {
  const [isActive, setIsActive] = useState(false);
  const { setRecipes } = useRecipes();

  const handleClick = () => {
    if (isActive) {
      setIsActive(false);
      if (type === 'Drink') return setRecipes('/drinks/categories');
      if (type === 'Meal') return setRecipes('/meals/categories');
    }
    setIsActive(true);
    if (type === 'Meal') return setRecipes(`/meals/categories?q=${category}`);
    if (type === 'Drink') return setRecipes(`/drinks/categories?q=${category}`);
  };

  return (
    <CategoryButtonContainer>
      <CategoryButton
        data-testid={ `${category}-category-filter` }
        onClick={ handleClick }
      >
        {icon}
      </CategoryButton>
      <span>{category}</span>
    </CategoryButtonContainer>
  );
}

CategoryBtn.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default CategoryBtn;
