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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
const search_query_1 = require("../queries/search.query");
const query_1 = require("../queries/query");
//================== OBTENER TODAS LAS CATEGORIAS ==================//
function getCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tableName = 'category';
        const offset = Number(req.query.offset);
        return yield query_1.queryGet(tableName, offset).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.error });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getCategories = getCategories;
//================== OBTENER UNA CATEGORIA POR SU ID ==================//
function getCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const search = req.params.category_id;
        const tableName = 'category';
        const columnName = 'category_id';
        return yield query_1.queryGetBy(tableName, columnName, search).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.error });
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
                    return res.status(data.status).json({ ok: false, message: data.error });
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
                return res.status(dataCheck.status).json({ ok: false, message: dataCheck.message });
            }
            //VERIFICA SI YA HAY UNA CATEGORIA CON EL MISMO NOMBRE PARA NO ACTUALIZAR
            return yield search_query_1.checkIfDataExist(tableName, columnName, category.category_name).then((dataCheckRepeat) => __awaiter(this, void 0, void 0, function* () {
                if (dataCheckRepeat.ok) {
                    return res.status(dataCheckRepeat.status).json({ ok: false, message: dataCheckRepeat.message });
                }
                //ACTUALIZA EL REGISTRO
                return yield query_1.queryUpdate(tableName, columnName, category, categoryId).then(data => {
                    if (!data.ok)
                        return res.status(data.status).json({ ok: false, message: data.error });
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
        const tableName = 'category';
        const columnName = 'category_id';
        const value = req.params.category_id;
        return yield search_query_1.checkIfDataExist(tableName, columnName, value).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (!dataCheck.ok) {
                return res.status(dataCheck.status).json({ ok: false, message: dataCheck.message });
            }
            return yield query_1.queryDelete(tableName, columnName, value).then(data => {
                if (!data.ok)
                    return res.status(data.status).json({ ok: false, message: data.error });
                return res.status(data.status).json({ ok: true, message: data.message });
            });
        }));
    });
}
exports.deleteCategory = deleteCategory;
