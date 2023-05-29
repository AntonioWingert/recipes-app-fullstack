/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { BsEggFried } from 'react-icons/bs';
import { GiMeat, GiChicken, GiCakeSlice, GiGoat, GiMeal } from 'react-icons/gi';
import CategoryBtn from '../../components/CategoryBtn/CategoryBtn';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Recipes from '../../components/Recipes/Recipes';
import { useRecipes } from '../../context/RecipesProvider';
import * as S from '../../styles/MealAndDrinkPage';

const MAX_LENGTH = 12;
const MAX_CATEGORY = 5;

const meals = [
  <GiMeat key={ 0 } />,
  <BsEggFried key={ 1 } />,
  <GiChicken key={ 2 } />,
  <GiCakeSlice key={ 3 } />,
  <GiGoat key={ 4 } />,
];

function Meals() {
  const { filterRecipes, setRecipes, setCategoryOnState, category } = useRecipes();

  useEffect(() => {
    setRecipes('/meals/name');
    setCategoryOnState('/meals/categories');
  }, []);

  const resetRecipes = () => {
    setRecipes('/meals/name');
  };

  return (
    <div>
      <Header title="Meals" />
      <S.CategoryContainer>
        <S.AllButton>
          <button onClick={ resetRecipes } data-testid="All-category-filter">
            <GiMeal />
          </button>
          <span>All</span>
        </S.AllButton>
        {
          category && category.map((item, index) => (
            <CategoryBtn
              key={ index }
              category={ item.name }
              icon={ meals[index] }
              type="Meal"
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
              type="meals"
            />
          )).slice(0, MAX_LENGTH)
        }
      </S.RecipesContainer>
      <Footer />
    </div>
  );
}

export default Meals;
