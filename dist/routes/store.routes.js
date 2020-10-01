"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_controller_1 = require("../controllers/store.controller");
const router = express_1.Router();
router.route('/')
    .get(store_controller_1.getStores)
    .post(store_controller_1.createStore);
router.route('/commodity')
    .get(store_controller_1.getStoresByCommodityId);
router.route('/:store_id')
    .get(store_controller_1.getStore)
    .put(store_controller_1.updateStore)
    .delete(store_controller_1.deleteStore);
router.route('/order/by_storeid')
    .get(store_controller_1.getStoresOrderById);
router.route('/category/:store_id')
    .get(store_controller_1.getCategoriesByStores);
exports.default = router;
