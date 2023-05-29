/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

export const RecipesContext = createContext();

function RecipesProvider({ children }) {
  const [filterRecipes, setFilterRecipes] = useState([]);
  const [category, setCategory] = useState([]);
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState({
    ingredients: [],
    measures: [],
  });
  const { makeFetch, isLoading, Error } = useFetch();

  const setRecipes = async (endpoint) => {
    const data = await makeFetch(endpoint);
    setFilterRecipes(data);
  };

  const setRecipeDetail = async (endpoint) => {
    const data = await makeFetch(endpoint);
    setRecipe(data);
  };

  const setCategoryOnState = async (endpoint) => {
    const data = await makeFetch(endpoint);
    setCategory(data);
  };

  const values = useMemo(() => ({
    filterRecipes,
    isLoading,
    Error,
    setRecipes,
    category,
    setCategoryOnState,
    recipe,
    setRecipeDetail,
    ingredients,
    setIngredients,
  }), [filterRecipes, isLoading, Error, category, recipe, ingredients]);

  return (
    <RecipesContext.Provider value={ values }>
      {children}
    </RecipesContext.Provider>
  );
}

export const useRecipes = () => {
  const context = useContext(RecipesContext);
  return context;
};

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
