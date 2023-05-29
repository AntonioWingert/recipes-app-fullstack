import { Router } from 'express';
import MealsController from '../controllers/MealsController';

const router = Router();


router.get('/meals/name', MealsController.getAll);
router.get('/meals/letter', MealsController.findByFirstLetter);
router.get('/meals/random', MealsController.getRandom);
router.get('/meals/categories', MealsController.getAllCategories);
router.get('/meals/areas', MealsController.getAllAreas);
router.get('/meals/ingredients', MealsController.getAllIngredients);
router.get('/meals/:id', MealsController.findById);


export default router;
