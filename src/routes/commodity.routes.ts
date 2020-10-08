import { Router } from 'express';
import { getCommodityByCommodityId, getCommoditiesByCategoryId, getCommoditiesByCategoryIdAndStoreId, updateCommodity, createCommodity} from '../controllers/commodity.controller';

const router = Router();

router.route('/')
    .post(createCommodity)
    .put(updateCommodity);


router.route('/:category_id')
    .get(getCommoditiesByCategoryId);


router.route('/by_commodity/:store_id/:commodity_id')
    .get(getCommodityByCommodityId);    


router.route('/:store_id/:category_id')
    .get(getCommoditiesByCategoryIdAndStoreId);


export default router;