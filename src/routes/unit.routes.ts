import { Router } from 'express';
import { getUnits, createUnit, getUnit, updateUnit, deleteUnit } from '../controllers/unit.controller';

const router = Router();

router.route('/')
    .get(getUnits)
    .post(createUnit);

router.route('/:unit_id')
    .get(getUnit)
    .put(updateUnit)
    .delete(deleteUnit);

export default router;