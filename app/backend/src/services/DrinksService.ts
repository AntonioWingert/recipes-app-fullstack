import prismaClient from '../database/prismaClient';
import ApiError from '../utils/ApiError';

export default class DrinksService {
  static async getAllDrinks() {
    const drinks = await prismaClient.recipe.findMany({
      where: {
        type: 'Drink'
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          }
        },
        category: true,
        alcoholic: true,
      }
    });
    return drinks;
  }

  static async findOneRandom(id: number) {
    const randomDrink = await prismaClient.recipe.findMany({
      where: {
        id: String(id),
        type: 'Drink',
      },
      include: {
        ingredients: true,
        category: true,
        area: true,
      }
    });

    if (!randomDrink) throw new ApiError(401, 'Invalid ID!');

    return randomDrink;
  }

  static async getAllDrinksCategories() {
    const categories = await prismaClient.category.findMany({
      where: { 
        recipes: {
          some: {
            type: 'Drink'
          }
        }
      }
    });

    return categories;
  }

  static async getAllDrinksIngredients(query?: string) {
    const ingredients = await prismaClient.recipe.findMany({
      where: {
        type:'Drink',
      }
    })

    return ingredients;
  }

  static async findOneById(id: number) {
    const drink = await prismaClient.recipe.findUnique({
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
        alcoholic: true,
      }
    });

    if (drink === null) throw new ApiError(401, 'Invalid ID!');

    return drink;
  }
}
