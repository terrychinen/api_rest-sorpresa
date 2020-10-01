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
exports.deleteCommodity = exports.updateCommodity = exports.createCommodity = exports.getCommoditiesByCategoryId = exports.getCommodities = void 0;
const database_1 = require("../database");
const search_query_1 = require("../queries/search.query");
const query_1 = require("../queries/query");
//================== OBTENER TODOS LAS MERCANCÍAS ==================//
function getCommodities(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tableName = 'commodity';
        const columnName = 'commodity_id';
        const offset = Number(req.query.offset);
        const state = Number(req.query.state);
        return yield query_1.queryGet(tableName, columnName, offset, state).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getCommodities = getCommodities;
//================== OBTENER TODOS LAS MERCANCÍAS POR EL ID DE LA CATEGORÍA ==================//
function getCommoditiesByCategoryId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryId = req.params.category_id;
        const state = req.query.state;
        const offset = Number(req.query.offset);
        const columnName = 'category_id';
        try {
            const conn = yield database_1.connect();
            const queryString = 'SELECT commodity_id, commodity_name, last_update, state,' +
                '(SELECT cat.category_id FROM category cat WHERE cat.category_id = comm.category_id)category_id, ' +
                '(SELECT category_name FROM category cat WHERE cat.category_id = comm.category_id)category_name, ' +
                '(SELECT un.unit_id FROM unit un WHERE un.unit_id = comm.unit_id)unit_id, ' +
                '(SELECT unit_name FROM unit un WHERE un.unit_id = comm.unit_id)unit_name, ' +
                '(SELECT username FROM user us WHERE us.user_id = comm.user_id)username ' +
                'FROM commodity comm WHERE category_id = ' + categoryId + ' AND state = ' + state + ' LIMIT 10 OFFSET ' + offset;
            const queryCommodity = yield conn.query(queryString);
            conn.end();
            if (!queryCommodity)
                return res.status(400).json({ ok: false, message: 'GET BY ' + columnName + ' error: Commodity', result: [] });
            return res.status(200).json({
                ok: true,
                message: 'GET BY ' + columnName + ' successful: Commodity',
                result: queryCommodity[0],
            });
        }
        catch (e) {
            return res.status(500).json({ ok: false, message: e.toString(), result: [] });
        }
    });
}
exports.getCommoditiesByCategoryId = getCommoditiesByCategoryId;
//================== CREAR UNA MERCANCÍA ==================//
function createCommodity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const commodity = req.body;
        const lastUpdate = req.body.last_update;
        const storesIdList = req.query.store_id;
        const tableCommodity = 'commodity';
        const columnName = 'commodity_name';
        const tableStoreCommodity = 'store_commodity';
        //VERIFICA SI LA MERCANCÍA EXISTE
        return yield search_query_1.checkIfDataExist(tableCommodity, columnName, commodity.commodity_name).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (dataCheck.ok)
                return res.status(403).json({ ok: false, message: dataCheck.message });
            if (dataCheck.status == 500)
                return res.status(500).json({ ok: false, message: dataCheck.message });
            const conn = yield database_1.connect();
            return yield conn.query({
                sql: 'INSERT INTO commodity SET ?',
                values: commodity
            }, function (err, result) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        return res.status(400).json({ ok: false, message: err.toString() });
                    try {
                        for (var i = 0; i < storesIdList.length; i++) {
                            yield conn.query(`INSERT INTO  ${tableStoreCommodity} (commodity_id, store_id, last_update) VALUES 
                                         ('${result.insertId}', '${storesIdList[i]}', '${lastUpdate.toString()}')`);
                        }
                        conn.end();
                        return res.status(200).json({ ok: true, message: 'Se creo exitosamente' });
                    }
                    catch (e) {
                        return res.status(500).json({ ok: true, message: e.toString() });
                    }
                });
            });
        }));
    });
}
exports.createCommodity = createCommodity;
//================== ACTUALIZAR UNA MERCANCÍA ==================//
function updateCommodity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const commodity = req.body;
        const storesIdList = req.query.store_id;
        const lastUpdate = req.body.last_update;
        const tableCommodity = 'commodity';
        const tableStoreCommodity = 'store_commodity';
        const columnCommodityId = 'commodity_id';
        const columnCommodityName = 'commodity_name';
        //VERIFICA SI EXISTE EL ID PARA ACTUALIZAR
        return yield search_query_1.checkIfDataExist(tableCommodity, columnCommodityId, commodity.commodity_id).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (!dataCheck.ok) {
                return res.status(404).json({ ok: false, message: dataCheck.message });
            }
            //VERIFICA SI YA HAY UNA MERCANCÍA CON EL MISMO NOMBRE PARA NO ACTUALIZAR
            return yield search_query_1.checkIfDataExist(tableStoreCommodity, columnCommodityName, commodity.commodity_name).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
                if (!dataCheck.ok) {
                    try {
                        const conn = yield database_1.connect();
                        yield conn.query(`UPDATE store_commodity SET state = 0 WHERE commodity_id = ${commodity.commodity_id}`);
                        for (var i = 0; i < storesIdList.length; i++) {
                            const conn = yield database_1.connect();
                            const query = yield conn.query(`SELECT store_commodity_id FROM store_commodity WHERE store_id = ${storesIdList[i]} AND commodity_id = ${commodity.commodity_id}`);
                            if (Object.keys(query[0]).length === 0) {
                                yield conn.query(`INSERT INTO store_commodity (commodity_id, store_id, last_update) VALUES 
                            ('${commodity.commodity_id}', '${storesIdList[i]}', '${lastUpdate.toString()}')`);
                            }
                            else {
                                yield conn.query(`UPDATE store_commodity SET state = 1 WHERE store_id = ${storesIdList[i]} AND commodity_id = ${commodity.commodity_id}`);
                            }
                        }
                        yield conn.query(`UPDATE commodity SET last_update = '${lastUpdate.toString()}' WHERE commodity_id = ${commodity.commodity_id}`);
                        conn.end();
                    }
                    catch (e) {
                        return ({ ok: false, status: 500, message: e });
                    }
                    return yield query_1.queryUpdate(tableCommodity, columnCommodityId, commodity, commodity.commodity_id).then(data => {
                        if (!data.ok)
                            return res.status(data.status).json({ ok: false, message: data.message });
                        return res.status(data.status).json({ ok: true, message: data.message });
                    });
                }
                else {
                    return res.status(400).json({ ok: true, message: 'Error en el servidor' });
                }
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
