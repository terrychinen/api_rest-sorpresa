"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stock_history_controller_1 = require("../controllers/stock_history.controller");
const router = express_1.Router();
router.route('/')
    .get(stock_history_controller_1.getStockHistory)
    .post(stock_history_controller_1.createStockHistory);
router.route('/by_stock_id/:stock_history_id')
    .get(stock_history_controller_1.getStockById);
router.route('/by_store_id/:store_commodity_id')
    .get(stock_history_controller_1.getStockByStoreId);
exports.default = router;
