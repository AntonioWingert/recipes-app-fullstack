import { useHistory } from 'react-router-dom';
import { useRecipes } from '../context/RecipesProvider';
import useGetLocalStorage from './useGetLocalStorage';

function useSetLocalStorage(type, id) {
  const { setInProgress, setIsFavorite } = useGetLocalStorage(type, id);
  const { recipe } = useRecipes();

  const history = useHistory();

  const startRecipe = () => {
    const { id } = recipe;
    if (type === 'meals') {
      const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const newInProgressRecipes = {
        ...inProgressRecipe,
        meals: {
          ...inProgressRecipe.meals,
          [id]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressRecipes));
      setInProgress(true);
      history.push(`/meals/${id}/in-progress`);
    } else {
      const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const newInProgressRecipes = {
        ...inProgressRecipe,
        drinks: {
          ...inProgressRecipe.drinks,
          [id]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressRecipes));
      setInProgress(true);
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  const finishRecipe = () => {
    const recipeData = {
      alcoholicOrNot: recipe.alcoholic?.name || '',
      category: recipe.category?.name || '',
      doneDate: new Date().toISOString(),
      id: recipe.id,
      image: recipe.imageUrl,
      name: recipe.name,
      nationality: recipe.area?.name || '',
      tags: recipe.tags || [],
      type: recipe.type,
    };
    if (JSON.parse(localStorage.getItem('doneRecipes'))) {
      const doneRecipesArray = JSON.parse(localStorage.getItem('doneRecipes'));
      const newDoneRecipesArray = [...doneRecipesArray, recipeData];
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipesArray));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([recipeData]));
    }
    history.push('/done-recipes');
  };

  const setFavorite = () => {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavoriteRecipes = [...favoriteRecipes, {
      id: recipe.id,
      type: recipe.type,
      nationality: recipe.area?.name,
      category: recipe.category?.name,
      alcoholicOrNot: recipe.alcoholic?.name,
      name: recipe.name,
      image: recipe.imageUrl,
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setIsFavorite((prevState) => !prevState);
  };

  const removeFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavoriteRecipes = favoriteRecipes
      .filter((recipes) => recipes.id !== recipe.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setIsFavorite((prevState) => !prevState);
  };

  return {
    startRecipe, setFavorite, removeFavorite, finishRecipe,
  };
}

export default useSetLocalStorage;
