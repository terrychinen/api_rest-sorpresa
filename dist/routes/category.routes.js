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
router.route('/search')
    .post(category_controller_1.searchCategory);
router.route('/search/:store_id')
    .post(category_controller_1.searchCategoryByStoreId);
router.route('/order_by_categoryid/:category_id')
    .get(category_controller_1.getCategoriesById);
router.route('/store/:store_id')
    .get(category_controller_1.getCategoriesByStores);
exports.default = router;
