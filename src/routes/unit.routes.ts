import { Router } from 'express';
import { getUnits, createUnit } from '../controllers/unit.controller';

const router = Router();

router.route('/')
    .get(getUnits)
    .post(createUnit);

export default router;