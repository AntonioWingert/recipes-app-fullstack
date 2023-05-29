import { useHistory } from 'react-router-dom';
import { useRecipes } from '../context/RecipesProvider';
import useGetLocalStorage from './useGetLocalStorage';

function useSetLocalStorage(type, id) {
  const { setInProgress, setIsFavorite } = useGetLocalStorage(type, id);
  const { recipe } = useRecipes();

  const history = useHistory();

  const startRecipe = () => {
    const { idDrink, idMeal } = recipe;
    if (type === 'meals') {
      const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const newInProgressRecipes = {
        ...inProgressRecipe,
        meals: {
          ...inProgressRecipe.meals,
          [idMeal]: [],
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
          [idDrink]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressRecipes));
      setInProgress(true);
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  const finishRecipe = () => {
    const recipeData = {
      alcoholicOrNot: recipe.strAlcoholic || '',
      category: recipe.strCategory,
      doneDate: new Date().toISOString(),
      id: type === 'meals' ? recipe.idMeal : recipe.idDrink,
      image: type === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb,
      name: type === 'meals' ? recipe.strMeal : recipe.strDrink,
      nationality: recipe.strArea || '',
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
      type: type === 'meals' ? 'meal' : 'drink',
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

    if (type === 'meals') {
      const newFavoriteRecipes = [...favoriteRecipes, {
        id: recipe.id,
        type: 'meal',
        nationality: recipe.area?.name,
        category: recipe.category?.name,
        alcoholicOrNot: '',
        name: recipe.name,
        image: recipe.imageUrl,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    } else {
      const newFavoriteRecipes = [...favoriteRecipes, {
        id: recipe.id,
        type: 'drink',
        nationality: '',
        category: recipe.category?.name,
        alcoholicOrNot: recipe.alcoholic,
        name: recipe.name,
        image: recipe.imageUrl,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    }
    setIsFavorite((prevState) => !prevState);
  };

  const removeFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (type === 'meals') {
      const newFavoriteRecipes = favoriteRecipes
        .filter((recipes) => recipes.id !== recipe.idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    } else {
      const newFavoriteRecipes = favoriteRecipes
        .filter((recipes) => recipes.id !== recipe.idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    }
    setIsFavorite((prevState) => !prevState);
  };

  return {
    startRecipe, setFavorite, removeFavorite, finishRecipe,
  };
}

export default useSetLocalStorage;
