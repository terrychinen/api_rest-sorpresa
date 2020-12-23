import { Router } from 'express';
import { getBrands, createBrand, updateBrand, deleteBrand, searchBrand } from '../controllers/brand.controller';


const router = Router();


router.route('/')
    .get(getBrands)
    .post(createBrand);


router.route('/:brand_id')
    .put(updateBrand)
    .delete(deleteBrand);


router.route('/search')
    .post(searchBrand);


export default router;
