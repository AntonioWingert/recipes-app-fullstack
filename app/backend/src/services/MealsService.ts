import prismaClient from '../database/prismaClient';
import ApiError from '../utils/ApiError';

export default class MealsService {
  static async getAllMeals() {
    const meals = await prismaClient.recipe.findMany({
      where: {
        type: 'Meal'
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          }
        },
        category: true,
        area: true,
    }
    });

    return meals;
  }

  static async findById(id: number) {
    const meals = await prismaClient.recipe.findUnique({
      where: {
        id
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          }
        },
        category: true,
        area: true,
    }
    });

    return meals;
  }

  static async findOneRandom(id: number) {
    const randomMeal = await prismaClient.recipe.findMany({
      where: {
        id,
        type: 'Meal',
      },
      include: {
        ingredients: true,
        category: true,
        area: true,
    }
    });

    if (!randomMeal) throw new ApiError(401, 'Invalid ID!');

    return randomMeal;
  }


  static async getAllCategories() {
    const categories = await prismaClient.category.findMany({
      where: {
        type: 'Meal',
      }
    })

    return categories;
  }

  static async getAllAreas() {
    const areas = await prismaClient.area.findMany()

    return areas;
  }

  static async getAllIngredients() {
    const ingredients = await prismaClient.ingredient.findMany({
      where: {
        type: 'Meal',
      }
    })

    return ingredients;
  }
}
