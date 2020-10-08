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
exports.getCategoriesByStores = exports.getCategoriesById = exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
const search_query_1 = require("../queries/search.query");
const query_1 = require("../queries/query");
const database_1 = require("../database");
//================== OBTENER TODAS LAS CATEGORIAS ==================//
function getCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tableName = 'category';
        const columnName = 'category_id';
        const offset = Number(req.query.offset);
        const state = Number(req.query.state);
        return yield query_1.queryGet(tableName, columnName, offset, state).then(data => {
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
        const tableName = 'category';
        const columnName = 'category_id';
        return yield query_1.queryGetBy(tableName, columnName, search, state).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getCategory = getCategory;
//================== CREAR UNA CATEGORIA ==================//
function createCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = req.body;
        const tableName = 'category';
        const columnName = 'category_name';
        //VERIFICA SI LA CATEGORIA EXISTE
        return yield search_query_1.checkIfDataExist(tableName, columnName, category.category_name).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (dataCheck.ok)
                return res.status(403).json({ ok: false, message: dataCheck.message });
            if (dataCheck.status == 500)
                return res.status(500).json({ ok: false, message: dataCheck.message });
            //INSERTA LA NUEVA CATEGORIA
            return yield query_1.queryInsert(tableName, category).then(data => {
                if (!data.ok)
                    return res.status(data.status).json({ ok: false, message: data.message });
                return res.status(data.status).json({ ok: true, message: data.message });
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
        const tableName = 'category';
        const columnName = 'category_id';
        //VERIFICA SI EXISTE EL ID PARA ACTUALIZAR
        return yield search_query_1.checkIfDataExist(tableName, columnName, categoryId).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (!dataCheck.ok) {
                return res.status(404).json({ ok: false, message: dataCheck.message });
            }
            //VERIFICA SI YA HAY UNA CATEGORIA CON EL MISMO NOMBRE PARA NO ACTUALIZAR
            return yield search_query_1.checkIfDataExist(tableName, columnName, category.category_name).then((dataCheckRepeat) => __awaiter(this, void 0, void 0, function* () {
                if (dataCheckRepeat.ok) {
                    return res.status(400).json({ ok: false, message: dataCheckRepeat.message });
                }
                //ACTUALIZA EL REGISTRO
                return yield query_1.queryUpdate(tableName, columnName, category, categoryId).then(data => {
                    if (!data.ok)
                        return res.status(data.status).json({ ok: false, message: data.message });
                    return res.status(data.status).json({ ok: true, message: data.message });
                });
            }));
        }));
    });
}
exports.updateCategory = updateCategory;
//================== ELIMINAR UNA CATEGORIA POR SU ID ==================//
function deleteCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryId = req.params.category_id;
        const tableName = 'category';
        const columnName = 'category_id';
        //VERIFICA SI EXISTE EL ID PARA ACTUALIZAR
        return yield search_query_1.checkIfDataExist(tableName, columnName, categoryId).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (!dataCheck.ok) {
                return res.status(404).json({ ok: false, message: dataCheck.message });
            }
            //ELIMINA EL REGISTRO
            return yield query_1.queryDelete(tableName, columnName, categoryId).then(data => {
                if (!data.ok)
                    return res.status(data.status).json({ ok: false, message: data.message });
                return res.status(data.status).json({ ok: true, message: data.message });
            });
        }));
    });
}
exports.deleteCategory = deleteCategory;
//================== OBTENER TODAS LAS CATEGORIAS ORDER BY CATEGORY ID ==================//
function getCategoriesById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tableName = 'category';
        const offset = Number(req.query.offset);
        const state = Number(req.query.state);
        const categoryId = '"' + req.params.category_id + '"';
        const columnName = `category_id`;
        return yield query_1.queryOrderbyId(tableName, columnName, categoryId, offset, state).then(data => {
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
        const tableName = 'category';
        const columnName = 'store_id';
        const state = Number(req.query.state);
        try {
            const conn = yield database_1.connect();
            const queryString = `SELECT category_id, category_name FROM category c WHERE state = 1 AND c.category_id IN (SELECT category_id FROM commodity 
                                 WHERE commodity_id IN (SELECT commodity_id FROM store_commodity WHERE store_id = "${storeId}"))  LIMIT 20 OFFSET ${offset}`;
            const queryCategoryCommmodity = yield conn.query(queryString);
            conn.end();
            if (!queryCategoryCommmodity)
                return res.status(400).json({ ok: false, message: 'GET BY ' + columnName + ' error: store_commodity', result: [] });
            return res.status(200).json({
                ok: true,
                message: 'GET BY ' + columnName + ' successful: Commodity',
                result: queryCategoryCommmodity[0],
            });
        }
        catch (e) {
            return res.status(500).json({ ok: false, message: e.toString(), result: [] });
        }
    });
}
exports.getCategoriesByStores = getCategoriesByStores;
