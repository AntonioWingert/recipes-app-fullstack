import React from 'react';
import { useRecipes } from '../../context/RecipesProvider';
import RecommendationCard from '../RecommendationCard/RecommendationCard';
import { CarouselContainer } from './style';

const MAX_LENGTH = 6;

function Carousel() {
  const { filterRecipes } = useRecipes();

  return (
    <CarouselContainer>
      {filterRecipes.map((recipe, index) => (
        <div key={ index }>
          <RecommendationCard
            image={ recipe.imageUrl}
            index={ index }
            title={ recipe.name}
          />
        </div>
      )).slice(0, MAX_LENGTH)}
    </CarouselContainer>
  );
}

export default Carousel;
