/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { MdFavorite, MdFavoriteBorder, MdShare } from 'react-icons/md';
import Carousel from '../../components/Carousel/Carousel';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { useRecipes } from '../../context/RecipesProvider';
import useGetLocalStorage from '../../hooks/useGetLocalStorage';
import useSetLocalStorage from '../../hooks/useSetLocalStorage';
import Button from '../../components/Button/Button';
import * as S from './styles';

function RecipeDetails() {
  const [isFav, setIsFav] = useState(false);
  const [isCopy, setIsCopy] = useState(false);

  const {
    recipe,
    setRecipeDetail,
    setRecipes,
  } = useRecipes();

  const history = useHistory();
  const id = history.location.pathname.split('/')[2];
  const type = history.location.pathname.split('/')[1];

  const { isFavorite, inProgress } = useGetLocalStorage(type, id);
  const { startRecipe, setFavorite, removeFavorite } = useSetLocalStorage(type, id);

  useEffect(() => {
    if (type === 'drinks') {
      setRecipeDetail(`http://localhost:3001/drinks/${id}`);
      setRecipes('http://localhost:3001/meals/name');
      return;
    }
    if (type === 'meals') {
      setRecipeDetail(`/meals/${id}`);
    }
  }, []);

  useEffect(() => {
    setIsFav(isFavorite);
  }, [isFavorite]);

  const handleClick = () => {
    startRecipe();
  };

  const handleFavorite = () => {
    setFavorite();
    setIsFav(true);
  };

  const removeFav = () => {
    removeFavorite();
    setIsFav(false);
  };

  const handleShare = () => {
    copy(`http://localhost:3000${history.location.pathname}`);
    setIsCopy(!isCopy);
  };

  const handleContinue = () => {
    history.push(`/${type}/${id}/in-progress`);
  };

  return (
    <div>
      {console.log(recipe)}
      <S.ButtonsContainer>
        <Button
          handleClick={ isFav ? removeFav : handleFavorite }
          alt="botão de favoritar"
          id="favorite-btn"
          size="30px"
          color="secondary"
        >
          { isFav
            ? <MdFavorite /> : <MdFavoriteBorder />}
        </Button>
        <Button
          handleClick={ handleShare }
          alt="botão de compartilhar"
          id="share-btn"
          size="30px"
          color="secondary"
        >
          <MdShare />
        </Button>
      </S.ButtonsContainer>
      <RecipeCard
        ingredients={ recipe.ingredients }
        recipe={ recipe }
        key={ recipe.id }
        title={ recipe.name }
        instructions={ recipe.instructions }
        image={ recipe.imageUrl }
        categoryOrAlcoholic={ recipe.alcoholic }
        video={ type === 'meals' ? recipe.videoUrl : null }
      />
      <S.ButtonContainer>
        {isCopy && (
          <div>
            <span>Link copied!</span>
          </div>
        )}
        <h2>Recommended</h2>
        <Carousel />
        <button
          data-testid="start-recipe-btn"
          onClick={ inProgress ? handleContinue : handleClick }
        >
          {inProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      </S.ButtonContainer>
    </div>
  );
}

export default RecipeDetails;
