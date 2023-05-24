import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError';
import MealModel, { MealsAttributes } from '../database/models/MealsModel';

export default class MealsService {
  public static async getAll(): Promise<MealsAttributes[]> {
    const meals = await MealModel.findAll();
    return meals;
  }

  public static async findOne(idMeal: string): Promise<MealsAttributes> {
    const meals = await MealModel.findOne({
      where: {
        idMeal,
      },
    });
    if (!meals) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid ID');
    }
    return meals;
  }
}
