"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quantity_controller_1 = require("../controllers/quantity.controller");
const router = express_1.Router();
router.route('/')
    .get(quantity_controller_1.getQuantities)
    .post(quantity_controller_1.createQuantity);
router.route('/search')
    .post(quantity_controller_1.searchQuantity);
router.route('/:quantity_id')
    .get(quantity_controller_1.getQuantity)
    .put(quantity_controller_1.updateQuantity)
    .delete(quantity_controller_1.deleteQuantity);
exports.default = router;
