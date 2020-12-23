"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const brand_controller_1 = require("../controllers/brand.controller");
const router = express_1.Router();
router.route('/')
    .get(brand_controller_1.getBrands)
    .post(brand_controller_1.createBrand);
router.route('/:brand_id')
    .put(brand_controller_1.updateBrand)
    .delete(brand_controller_1.deleteBrand);
router.route('/search')
    .post(brand_controller_1.searchBrand);
exports.default = router;
