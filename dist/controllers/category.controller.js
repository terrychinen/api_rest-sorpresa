"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoriesByStores = exports.getCategoriesById = exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.searchCategoryByStoreId = exports.searchCategory = exports.getCategory = exports.getCategories = void 0;
const query_1 = require("../queries/query");
//================== OBTENER TODAS LAS CATEGORIAS ==================//
function getCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const offset = Number(req.query.offset);
        const state = Number(req.query.state);
        const queryGet = `SELECT * FROM category WHERE state = ${state} ORDER BY category_id DESC LIMIT 10 OFFSET ${offset}`;
        return yield query_1.query(queryGet).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getCategories = getCategories;
//================== OBTENER UNA CATEGORIA POR SU ID ==================//
function getCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const search = req.params.category_id;
        const state = req.params.state;
        const queryGet = `SELECT * FROM category WHERE category_id = "${search}" AND state = ${state}`;
        return yield query_1.query(queryGet).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getCategory = getCategory;
//================== BUSCAR CATEGORIA POR SU NOMBRE  ==================//
function searchCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const search = req.body.query;
        const state = Number(req.body.state);
        const querySearch = `SELECT * FROM category WHERE category_name LIKE "%${search}%" AND state = ${state} LIMIT 10`;
        return yield query_1.query(querySearch).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.searchCategory = searchCategory;
//================== BUSCAR CATEGORIA POR SU NOMBRE y POR STORE_ID  ==================//
function searchCategoryByStoreId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const storeId = req.params.store_id;
        const search = req.body.query;
        const state = Number(req.body.state);
        const querySearch = `SELECT category_id, category_name FROM category c WHERE category_name LIKE "%${search}%" AND state = ${state} AND c.category_id IN (SELECT category_id FROM commodity 
        WHERE commodity_id IN (SELECT commodity_id FROM store_commodity WHERE store_id = "${storeId}"))  LIMIT 20`;
        return yield query_1.query(querySearch).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.searchCategoryByStoreId = searchCategoryByStoreId;
//================== CREAR UNA CATEGORIA ==================//
function createCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = req.body;
        const categoryName = category.category_name;
        category.category_name = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
        const queryCheck = `SELECT * FROM category WHERE category_name = "${category.category_name}"`;
        return yield query_1.query(queryCheck).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (dataCheck.result[0][0] != null) {
                return res.status(400).json({ ok: false, message: 'La categoría ya existe!' });
            }
            const queryInsert = `INSERT INTO category (category_name, state) VALUES ("${category.category_name}", "${category.state}")`;
            return yield query_1.query(queryInsert).then(data => {
                if (!data.ok)
                    return res.status(data.status).json({ ok: false, message: data.message });
                return res.status(data.status).json({ ok: true, message: 'Categoría creado correctamente' });
            });
        }));
    });
}
exports.createCategory = createCategory;
//================== ACTUALIZAR UNA CATEGORIA ==================//
function updateCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = req.body;
        const categoryId = req.params.category_id;
        const categoryName = category.category_name;
        category.category_name = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
        const queryCheckId = `SELECT * FROM category WHERE category_id = "${categoryId}"`;
        return yield query_1.query(queryCheckId).then((dataCheckId) => __awaiter(this, void 0, void 0, function* () {
            if (!dataCheckId.ok)
                return res.status(500).json({ ok: false, message: dataCheckId.message });
            if (dataCheckId.result[0][0] == null)
                return res.status(400).json({ ok: false, message: `La categoría con el id ${categoryId} no existe!` });
            const queryCheck = `SELECT * FROM category WHERE category_name = "${category.category_name}"`;
            return yield query_1.query(queryCheck).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
                if (!dataCheck.ok)
                    return res.status(500).json({ ok: false, message: dataCheck.message });
                if (dataCheck.result[0][0] != null)
                    return res.status(400).json({ ok: false, message: 'La categoría ya existe!' });
                const queryUpdate = `UPDATE category SET category_name="${category.category_name}", state = "${category.state}" WHERE category_id = "${categoryId}"`;
                return yield query_1.query(queryUpdate).then((dataUpdate) => __awaiter(this, void 0, void 0, function* () {
                    if (!dataUpdate.ok)
                        return res.status(dataUpdate.status).json({ ok: false, message: dataUpdate.message });
                    return res.status(dataUpdate.status).json({ ok: true, message: 'La categoría se actualizó correctamente' });
                }));
            }));
        }));
    });
}
exports.updateCategory = updateCategory;
//================== ELIMINAR UNA CATEGORIA POR SU ID ==================//
function deleteCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryId = req.params.category_id;
        const queryCheckId = `SELECT * FROM category WHERE category_id = "${categoryId}"`;
        return yield query_1.query(queryCheckId).then((dataCheckId) => __awaiter(this, void 0, void 0, function* () {
            if (dataCheckId.result[0][0] == null) {
                return res.status(400).json({ ok: false, message: `La categoría con el id ${categoryId} no existe!` });
            }
            ;
            const queryDelete = `DELETE category WHERE category_id = "${categoryId}"`;
            return yield query_1.query(queryDelete).then(dataDelete => {
                if (!dataDelete.ok)
                    return res.status(dataDelete.status).json({ ok: false, message: dataDelete.message });
                return res.status(dataDelete.status).json({ ok: true, message: 'La categoría se eliminó correctamente' });
            });
        }));
    });
}
exports.deleteCategory = deleteCategory;
//================== OBTENER TODAS LAS CATEGORIAS ORDER BY CATEGORY ID ==================//
function getCategoriesById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const offset = Number(req.query.offset);
        const state = Number(req.query.state);
        const categoryId = req.params.category_id;
        const queryGet = `SELECT * FROM category WHERE state = ${state} ORDER BY FIELD(category_id, "${categoryId}") DESC LIMIT 10 OFFSET ${offset}`;
        return yield query_1.query(queryGet).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getCategoriesById = getCategoriesById;
//================== OBTENER TODAS LAS CATEGORIAS SEGUN EL ALMACEN ==================//
function getCategoriesByStores(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const storeId = req.params.store_id;
        const offset = req.query.offset;
        const queryGet = `SELECT category_id, category_name FROM category c WHERE state = 1 AND c.category_id IN (SELECT category_id FROM commodity 
                            WHERE commodity_id IN (SELECT commodity_id FROM store_commodity WHERE store_id = "${storeId}"))  LIMIT 20 OFFSET ${offset}`;
        return yield query_1.query(queryGet).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(200).json({ ok: true, message: data.message, result: data[0] });
        });
    });
}
exports.getCategoriesByStores = getCategoriesByStores;
