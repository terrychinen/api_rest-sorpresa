import { Router } from 'express';
import { getStore, getStores, getStoresOrderById, getStoresByCommodityId, createStore, updateStore, deleteStore } from '../controllers/store.controller';

const router = Router();

router.route('/')
    .get(getStores)
    .post(createStore);

router.route('/commodity')
    .get(getStoresByCommodityId)

router.route('/:store_id')
    .get(getStore)
    .put(updateStore)
    .delete(deleteStore);

router.route('/order/by_storeid')
    .get(getStoresOrderById);



export default router;