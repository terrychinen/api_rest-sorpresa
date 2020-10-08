import { Router } from 'express';
import { getStockHistory, getStockById, getStockByStoreId, createStockHistory } from '../controllers/stock_history.controller';

const router = Router();

router.route('/')
    .get(getStockHistory)
    .post(createStockHistory)

router.route('/by_stock_id/:stock_history_id')
    .get(getStockById)

router.route('/by_store_id/:store_commodity_id')
    .get(getStockByStoreId)

export default router;