"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commodity_controller_1 = require("../controllers/commodity.controller");
const router = express_1.Router();
router.route('/')
    .post(commodity_controller_1.createCommodity)
    .put(commodity_controller_1.updateCommodity);
router.route('/:category_id')
    .get(commodity_controller_1.getCommoditiesByCategoryId);
router.route('/search/:category_id')
    .post(commodity_controller_1.searchCommodity);
router.route('/search/:store_id/:category_id')
    .post(commodity_controller_1.searchCommodityByStoreIdAndCategoryId);
router.route('/by_commodity/:store_id/:commodity_id')
    .get(commodity_controller_1.getCommodityByCommodityId);
router.route('/get_less_stock/:store_id')
    .get(commodity_controller_1.getCommoditiesWithLessStock);
router.route('/:store_id/:category_id')
    .get(commodity_controller_1.getCommoditiesByCategoryIdAndStoreId);
exports.default = router;
