import React, { useEffect, useState } from 'react';
import { MdFastfood } from 'react-icons/md';
import { GiMeal } from 'react-icons/gi';
import { BiDrink } from 'react-icons/bi';
import Button from '../../components/Button/Button';
import DoneAndFavCard from '../../components/DoneAndFavCard/DoneAndFavCard';
import Header from '../../components/Header/Header';
import * as S from './style';

function DoneRecipes() {
  const [filterRecipes, setFilterRecipes] = useState([]);
  const [getItems, setGetItems] = useState([]);

  useEffect(() => {
    const localState = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!localState) return localStorage.setItem('doneRecipes', JSON.stringify([]));
    return setGetItems(localState);
  }, []);

  const handleFilter = (category) => {
    const newFilter = getItems.filter((recipe) => recipe.type === category);
    setFilterRecipes(newFilter);
  };

  const resetFilter = () => {
    setFilterRecipes([]);
  };

  return (
    <div>
      <Header title="Done Recipes" searchButton={ false } />
      <S.ButtonsContainer>
        <Button
          id="filter-by-all-btn"
          handleClick={ resetFilter }
          color="secondary"
          size="55px"
        >
          <MdFastfood />
        </Button>
        <Button
          id="filter-by-meal-btn"
          handleClick={ () => handleFilter('meal') }
          color="secondary"
          size="55px"
        >
          <GiMeal />
        </Button>
        <Button
          id="filter-by-drink-btn"
          handleClick={ () => handleFilter('drink') }
          color="secondary"
          size="55px"
        >
          <BiDrink />
        </Button>
      </S.ButtonsContainer>

      <S.RecipesContainer>
        {
          getItems.length === 0 && (
            <p>Você não possui receitas inciadas.</p>
          )
        }

        {
          filterRecipes.length >= 1 ? (
            filterRecipes.map((recipe, index) => (
              <DoneAndFavCard
                tags={ recipe.tags }
                name={ recipe.name }
                index={ index }
                image={ recipe.image }
                doneDate={ recipe.doneDate }
                category={ recipe.category }
                key={ index }
                alcoholic={ recipe.alcoholicOrNot }
                nationality={ recipe.nationality }
                type={ recipe.type }
                id={ recipe.id }
                done
              />
            ))
          ) : (
            getItems.map((recipe, index) => (
              <DoneAndFavCard
                tags={ recipe.tags }
                name={ recipe.name }
                index={ index }
                image={ recipe.image }
                doneDate={ recipe.doneDate }
                category={ recipe.category }
                key={ index }
                alcoholic={ recipe.alcoholicOrNot }
                nationality={ recipe.nationality }
                type={ recipe.type }
                id={ recipe.id }
                done
              />
            ))
          )
        }
      </S.RecipesContainer>
    </div>
  );
}

export default DoneRecipes;
