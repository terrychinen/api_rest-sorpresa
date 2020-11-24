import { Router } from 'express';
import { searchUnit, getUnits, getUnitsById, createUnit, getUnit, updateUnit, deleteUnit, getUnitsByCommodityId } from '../controllers/unit.controller';

const router = Router();

router.route('/')
    .get(getUnits)
    .post(createUnit);

router.route('/search')
    .post(searchUnit);

router.route('/:unit_id')
    .get(getUnit)
    .put(updateUnit)
    .delete(deleteUnit);

router.route('/order_by_unitid/:unit_id')
    .get(getUnitsById);

router.route('/commodity/by_id')
    .get(getUnitsByCommodityId);

export default router;