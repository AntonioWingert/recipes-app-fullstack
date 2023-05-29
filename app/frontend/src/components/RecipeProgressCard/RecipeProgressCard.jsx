/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useGetLocalStorage from '../../hooks/useGetLocalStorage';
import * as S from './style';

function RecipeProgressCard({
  image, title, categoryOrAlcoholic,
  ingredients, instructions, verifyIsFinish }) {
  const [checkedIngredient, setCheckedIngredient] = useState([]);

  const history = useHistory();
  const id = history.location.pathname.split('/')[2];
  const type = history.location.pathname.split('/')[1];

  const { ingredientsChecked } = useGetLocalStorage(type, id);

  useEffect(() => {
    if (!ingredientsChecked) return;
    const listIngredientsIds = ingredients.map((e) => e.ingredientId);
    const listLocalStorageIds = ingredientsChecked.map((e) => e.ingredientId);
    const newIngredient = listIngredientsIds.map((e) => listLocalStorageIds.includes(e));
    setCheckedIngredient(newIngredient);
  }, [ingredients, ingredientsChecked]);

  useEffect(() => {
    verifyIsFinish(checkedIngredient);
  }, [checkedIngredient]);

  const handleChange = (ingredient) => {
    const getItems = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const newItem = getItems;
    newItem[type][+id].push(ingredient);
    localStorage.setItem('inProgressRecipes', JSON.stringify(newItem));

    const listIngredientsIds = ingredients.map((e) => e.ingredientId);
    setCheckedIngredient((prev) => {
      const newChecked = [...prev];
      newChecked[listIngredientsIds.indexOf(ingredient.ingredientId)] = true;
      return newChecked;
      });
  };

  return (
    <S.RecipeCardContainer>
      <img
        src={ image }
        alt="imagem da receita"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{title}</h1>
      <p data-testid="recipe-category">{categoryOrAlcoholic}</p>
      <S.IngredientsContainer>
        {ingredients.map((ingredient, index) => (
          <label
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            htmlFor={ ingredient.name }
            style={ { textDecoration: checkedIngredient[index]
              ? 'line-through solid rgb(0, 0, 0)' : '' } }
          >
            <input
              type="checkbox"
              id={ ingredient.name }
              name={ ingredient.name }
              onChange={ () => handleChange(ingredient) }
              checked={ checkedIngredient[index] }
              disabled={ checkedIngredient[index] }
            />
              {
                ingredient.measure === undefined
                  ? `${ingredient.ingredient.name}` : `${ingredient.ingredient.name} - ${ingredient.measure}`
              }
          </label>
        ))}
      </S.IngredientsContainer>
      <p data-testid="instructions">{instructions}</p>
    </S.RecipeCardContainer>
  );
}

RecipeProgressCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  categoryOrAlcoholic: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.object),
  instructions: PropTypes.string,
  verifyIsFinish: PropTypes.func.isRequired,
};

RecipeProgressCard.defaultProps = {
  image: '',
  title: '',
  categoryOrAlcoholic: '',
  ingredients: [],
  measures: [],
  instructions: '',
};

export default RecipeProgressCard;
