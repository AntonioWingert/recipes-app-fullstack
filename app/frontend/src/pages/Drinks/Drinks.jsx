/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { BiDrink } from 'react-icons/bi';
import { ImGlass } from 'react-icons/im';
import { GiMartini } from 'react-icons/gi';
import { TbCup } from 'react-icons/tb';
import { CiBeerMugFull } from 'react-icons/ci';
import { FiCoffee } from 'react-icons/fi';
import CategoryBtn from '../../components/CategoryBtn/CategoryBtn';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Recipes from '../../components/Recipes/Recipes';
import { useRecipes } from '../../context/RecipesProvider';
import * as S from '../../styles/MealAndDrinkPage';

const MAX_LENGTH = 12;
const MAX_CATEGORY = 5;

const drinks = [
  <ImGlass key={ 0 } />,
  <GiMartini key={ 1 } />,
  <TbCup key={ 2 } />,
  <CiBeerMugFull key={ 3 } />,
  <FiCoffee key={ 4 } />,
];

function Drinks() {
  const { filterRecipes, setRecipes, setCategoryOnState, category } = useRecipes();

  useEffect(() => {
    setRecipes('/drinks/name');
    setCategoryOnState('/drinks/categories');
  }, []);

  const resetRecipes = () => {
    setRecipes('/drinks/name');
  };

  return (
    <div>
      <Header title="Drinks" />
      <S.CategoryContainer>
        <S.AllButton>
          <button onClick={ resetRecipes } data-testid="All-category-filter">
            <BiDrink />
          </button>
          <span>All</span>
        </S.AllButton>
        {
          category && category.map((item, index) => (
            <CategoryBtn
              key={ index }
              category={ item.name }
              icon={ drinks[index] }
              type="drinks"
            />)).slice(0, MAX_CATEGORY)
        }
      </S.CategoryContainer>
      <S.RecipesContainer>
        {
          filterRecipes && filterRecipes.map((recipe, index) => (
            <Recipes
              key={ index }
              index={ index }
              img={ recipe.imageUrl }
              name={ recipe.name }
              id={ recipe.id }
              type="drinks"
            />
          )).slice(0, MAX_LENGTH)
        }
      </S.RecipesContainer>
      <Footer />
    </div>
  );
}

export default Drinks;
