import { Router } from 'express';
import { searchCategoryByStoreId, searchCategory, getCategories, createCategory, getCategory, getCategoriesById, getCategoriesByStores, deleteCategory, updateCategory } from '../controllers/category.controller';

const router = Router();

router.route('/')
    .get(getCategories)
    .post(createCategory);



router.route('/:category_id')
    .get(getCategory)
    .put(updateCategory)
    .delete(deleteCategory);



router.route('/search')
    .post(searchCategory);



router.route('/search/:store_id')
    .post(searchCategoryByStoreId);



router.route('/order_by_categoryid/:category_id')
    .get(getCategoriesById);



router.route('/store/:store_id')
    .get(getCategoriesByStores);


    
export default router;
