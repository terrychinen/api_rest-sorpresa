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
exports.deleteCommodity = exports.updateCommodity = exports.createCommodity = exports.getComoditiesByCategoryId = exports.getCommodities = void 0;
const database_1 = require("../database");
const search_query_1 = require("../queries/search.query");
const query_1 = require("../queries/query");
//================== OBTENER TODOS LAS MERCANCÍAS ==================//
function getCommodities(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tableName = 'commodity';
        const offset = Number(req.query.offset);
        const state = Number(req.query.state);
        return yield query_1.queryGet(tableName, offset, state).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getCommodities = getCommodities;
//================== OBTENER TODOS LAS MERCANCÍAS POR EL ID DE LA CATEGORÍA ==================//
function getComoditiesByCategoryId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryId = req.params.category_id;
        const state = req.query.state;
        const offset = Number(req.query.offset);
        const columnName = 'category_id';
        try {
            const conn = yield database_1.connect();
            const queryString = 'SELECT commodity_id, commodity_name, created_at, state,' +
                '(SELECT category_name FROM category cat WHERE cat.category_id = comm.category_id)category_name, ' +
                '(SELECT unit_name FROM unit un WHERE un.unit_id = comm.unit_id)unit_name, ' +
                '(SELECT username FROM user us WHERE us.user_id = comm.user_id)username ' +
                'FROM commodity comm WHERE category_id = ' + categoryId + ' AND state = ' + state + ' LIMIT 10 OFFSET ' + offset;
            const query = yield conn.query(queryString);
            if (!query)
                return res.status(400).json({ ok: false, message: 'GET BY ' + columnName + ' error: Commodity', result: [] });
            return res.status(200).json({
                ok: true,
                message: 'GET BY ' + columnName + ' successful: Commodity',
                result: query[0]
            });
        }
        catch (e) {
            return res.status(500).json({ ok: false, message: e.toString(), result: [] });
        }
    });
}
exports.getComoditiesByCategoryId = getComoditiesByCategoryId;
//================== CREAR UNA MERCANCÍA ==================//
function createCommodity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = req.body;
        const tableName = 'commodity';
        const columnName = 'commodity_name';
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
exports.createCommodity = createCommodity;
//================== ACTUALIZAR UNA MERCANCÍA ==================//
function updateCommodity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const commodity = req.body;
        const commodityId = req.params.commodity_id;
        const tableName = 'commodity';
        const columnName = 'commodity_id';
        //VERIFICA SI EXISTE EL ID PARA ACTUALIZAR
        return yield search_query_1.checkIfDataExist(tableName, columnName, commodityId).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (!dataCheck.ok) {
                return res.status(404).json({ ok: false, message: dataCheck.message });
            }
            //VERIFICA SI YA HAY UNA CATEGORIA CON EL MISMO NOMBRE PARA NO ACTUALIZAR
            return yield search_query_1.checkIfDataExist(tableName, columnName, commodity.commodity_name).then((dataCheckRepeat) => __awaiter(this, void 0, void 0, function* () {
                if (dataCheckRepeat.ok) {
                    return res.status(400).json({ ok: false, message: dataCheckRepeat.message });
                }
                //ACTUALIZA EL REGISTRO
                return yield query_1.queryUpdate(tableName, columnName, commodity, commodityId).then(data => {
                    if (!data.ok)
                        return res.status(data.status).json({ ok: false, message: data.message });
                    return res.status(data.status).json({ ok: true, message: data.message });
                });
            }));
        }));
    });
}
exports.updateCommodity = updateCommodity;
//================== ELIMINAR UNA MERCANCÍA POR SU ID ==================//
function deleteCommodity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const commodityId = req.params.commodity_id;
        const tableName = 'commoity';
        const columnName = 'commodity_id';
        //VERIFICA SI EXISTE EL ID PARA ACTUALIZAR
        return yield search_query_1.checkIfDataExist(tableName, columnName, commodityId).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (!dataCheck.ok) {
                return res.status(404).json({ ok: false, message: dataCheck.message });
            }
            //ELIMINA EL REGISTRO
            return yield query_1.queryDelete(tableName, columnName, commodityId).then(data => {
                if (!data.ok)
                    return res.status(data.status).json({ ok: false, message: data.message });
                return res.status(data.status).json({ ok: true, message: data.message });
            });
        }));
    });
}
exports.deleteCommodity = deleteCommodity;
