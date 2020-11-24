import { Router } from 'express';
import { getQuantity, getQuantities, searchQuantity, createQuantity, updateQuantity, deleteQuantity } from '../controllers/quantity.controller';

const router = Router();

router.route('/')
    .get(getQuantities)
    .post(createQuantity)
    
router.route('/search')
    .post(searchQuantity)

router.route('/:quantity_id')
    .get(getQuantity)
    .put(updateQuantity)
    .delete(deleteQuantity)


export default router;