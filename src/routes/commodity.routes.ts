import { Router } from 'express';
import { getCommodities, getCommoditiesByCategoryId, updateCommodity, createCommodity} from '../controllers/commodity.controller';

const router = Router();

router.route('/')
    .post(createCommodity)
    .put(updateCommodity);

router.route('/:category_id')
    .get(getCommoditiesByCategoryId);

export default router;