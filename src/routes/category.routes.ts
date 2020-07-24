import { Router } from 'express';
import { getCategories, createCategory, getCategory, deleteCategory, updateCategory } from '../controllers/category.controller';

const router = Router();


router.route('/')
    .get(getCategories)
    .post(createCategory);

router.route('/:category_id')
    .get(getCategory)
    .put(updateCategory)
    .delete(deleteCategory);


export default router;
