import { Router } from 'express';
import { getFullNameByDni, getDniByName, getDataByRuc } from '../controllers/document.controller';

const router = Router();


router.route('/dni/:dni').get(getFullNameByDni);

router.route('/dni').post(getDniByName);
    
router.route('/ruc/:ruc')
    .get(getDataByRuc);

export default router;
