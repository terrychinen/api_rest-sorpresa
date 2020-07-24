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
const database_1 = require("../database");
//================== OBTENER TODAS LAS CATEGORIAS ==================//
function getCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const categories = yield conn.query('SELECT * FROM category');
            return res.status(200).json({
                ok: true,
                message: 'Query successful',
                Categories: categories[0]
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: 'Internal Server error',
            });
        }
    });
}
exports.getCategories = getCategories;
//================== OBTENER UNA CATEGORIA POR SU ID ==================//
function getCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.category_id;
        const conn = yield database_1.connect();
        const category = yield conn.query('SELECT * FROM category WHERE category_id = ?', [id]);
        return res.json(category[0]);
    });
}
exports.getCategory = getCategory;
//================== CREAR UNA CATEGORIA ==================//
function createCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = req.body;
        console.log('Categoria:', category);
        const conn = yield database_1.connect();
        yield conn.query('INSERT INTO category SET ?', category);
        return res.json({
            message: 'Category created',
            category
        });
    });
}
exports.createCategory = createCategory;
//================== ACTUALIZAR UNA CATEGORIA ==================//
function updateCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.category_id;
        const updateCategory = req.body;
        const conn = yield database_1.connect();
        yield conn.query('UPDATE category SET ? WHERE id = ?', [updateCategory, id]);
        return res.json({
            message: 'Category updated',
            category: id
        });
    });
}
exports.updateCategory = updateCategory;
//================== ELIMINAR UNA CATEGORIA POR SU ID ==================//
function deleteCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.category_id;
        const conn = yield database_1.connect();
        yield conn.query('DELETE FROM category WHERE category_id = ?', [id]);
        return res.json({
            message: 'Category deleted',
            category: id
        });
    });
}
exports.deleteCategory = deleteCategory;
