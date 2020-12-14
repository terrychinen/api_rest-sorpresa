import { Router } from 'express';
import { searchCommodity, searchCommodityByStoreIdAndCategoryId, getCommodityByCommodityId, getCommoditiesByCategoryId, getCommoditiesByCategoryIdAndStoreId, getCommoditiesWithLessStock, updateCommodity, createCommodity} from '../controllers/commodity.controller';

const router = Router();

router.route('/')
    .post(createCommodity)
    .put(updateCommodity);


router.route('/:category_id')
    .get(getCommoditiesByCategoryId);


router.route('/search')
    .post(searchCommodity);


router.route('/search/:store_id/:category_id')
    .post(searchCommodityByStoreIdAndCategoryId);


router.route('/by_commodity/:store_id/:commodity_id')
    .get(getCommodityByCommodityId);   


router.route('/get_less_stock/:store_id')
    .get(getCommoditiesWithLessStock);   


router.route('/:store_id/:category_id')
    .get(getCommoditiesByCategoryIdAndStoreId);


export default router;