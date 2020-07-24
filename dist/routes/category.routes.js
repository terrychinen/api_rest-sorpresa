"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const router = express_1.Router();
router.route('/')
    .get(category_controller_1.getCategories)
    .post(category_controller_1.createCategory);
router.route('/:category_id')
    .get(category_controller_1.getCategory)
    .put(category_controller_1.updateCategory)
    .delete(category_controller_1.deleteCategory);
exports.default = router;
