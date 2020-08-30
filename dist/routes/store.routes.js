"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_controller_1 = require("../controllers/store.controller");
const router = express_1.Router();
router.route('/')
    .get(store_controller_1.getStores)
    .post(store_controller_1.createStore);
router.route('/:unit_id')
    .get(store_controller_1.getStore)
    .put(store_controller_1.updateStore)
    .delete(store_controller_1.deleteStore);
exports.default = router;
