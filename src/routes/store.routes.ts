import { Router } from 'express';
import { getStore, getStores, createStore, updateStore, deleteStore } from '../controllers/store.controller';

const router = Router();

router.route('/')
    .get(getStores)
    .post(createStore);

router.route('/:unit_id')
    .get(getStore)
    .put(updateStore)
    .delete(deleteStore);

export default router;