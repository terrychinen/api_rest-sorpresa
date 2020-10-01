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
exports.default = router;
