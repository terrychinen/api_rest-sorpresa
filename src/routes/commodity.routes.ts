import { Router } from 'express';
import { getCommodities, getCommoditiesByCategoryId, createCommodity} from '../controllers/commodity.controller';

const router = Router();

router.route('/')
    .post(createCommodity);

router.route('/:category_id')
    .get(getCommoditiesByCategoryId)
//     .put(updateUnit)
//     .delete(deleteUnit);

export default router;