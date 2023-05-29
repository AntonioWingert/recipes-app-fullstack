import { Request, Response } from 'express';
import MealsService from '../services/MealsService';

export default class MealsController {
  constructor(
    private _mealsService: MealsService = new MealsService(),
  ) {}

  public static getAll = async (req: Request, res: Response) => {
    const { q } = req.query;
    const meals = await MealsService.getAllMeals();
    if (q) {
      const qCaps = q.toString().toUpperCase();
      const filteredMealsByName = meals.filter((meal) => meal.name.toUpperCase().includes(qCaps as string));
      return res.status(200).json(filteredMealsByName);
    }
    return res.status(200).json(meals);
  };

  public static findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const idNumber = parseInt(id);
    const meals = await MealsService.findById(idNumber);
    return res.status(200).json(meals);
  };

  public static findByFirstLetter = async (req: Request, res: Response) => {
    const { q } = req.query;
    const qCaps = q?.toString().toUpperCase()
    const meals = await MealsService.getAllMeals();
    const filteredMealsByFirstLetter = meals.filter((meal) => meal.name.toUpperCase().startsWith(qCaps as string));
    return res.status(200).json(filteredMealsByFirstLetter);
  };

  public static getRandom = async (req: Request, res: Response) => {
    const randomNumber = (Math.random() * 6)
    const meal = await MealsService.findOneRandom(randomNumber);
    return res.status(200).json(meal);
  };

  public static getAllCategories = async (req: Request, res: Response) => {
    const { q } = req.query;
    const categories = await MealsService.getAllCategories();
    if (q) {
      const qCaps = q.toString().toUpperCase();
      const filteredCategoriesByName = categories.filter((category) => category.name.toUpperCase().includes(qCaps as string));
      return res.status(200).json(filteredCategoriesByName);
    }
    return res.status(200).json(categories);
  };

  public static getAllAreas = async (req: Request, res: Response) => {
    const { q } = req.query;
    const areas = await MealsService.getAllAreas();
    if (q) {
      const qCaps = q.toString().toUpperCase();
      const filteredAreasByName = areas.filter((area) => area.name.toUpperCase().includes(qCaps as string));
      return res.status(200).json(filteredAreasByName);
    }
    return res.status(200).json(areas);
  };

  public static getAllIngredients = async (req: Request, res: Response) => {
    const { q } = req.query;
    const ingredients = await MealsService.getAllIngredients();
    if (q) {
      const qCaps = q.toString().toUpperCase();
      const filteredIngredientsByName = ingredients.filter((ingredient) => ingredient.name.toUpperCase().includes(qCaps as string));
      return res.status(200).json(filteredIngredientsByName);
    }
    return res.status(200).json(ingredients);
  };
}