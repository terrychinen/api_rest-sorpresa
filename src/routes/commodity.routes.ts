import { Router } from 'express';
import { getCommodities, getComoditiesByCategoryId, createCommodity} from '../controllers/commodity.controller';

const router = Router();

router.route('/')
    .post(createCommodity);

router.route('/:category_id')
    .get(getComoditiesByCategoryId)
//     .put(updateUnit)
//     .delete(deleteUnit);

export default router;