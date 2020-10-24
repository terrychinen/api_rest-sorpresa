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
exports.deleteCommodity = exports.updateCommodity = exports.createCommodity = exports.getCommoditiesByCategoryIdAndStoreId = exports.searchCommodityByStoreIdAndCategoryId = exports.searchCommodity = exports.getCommoditiesWithLessStock = exports.getCommodityByCommodityId = exports.getCommoditiesByCategoryId = exports.getCommodities = void 0;
const database_1 = require("../database");
const search_query_1 = require("../queries/search.query");
const query_1 = require("../queries/query");
//================== OBTENER TODOS LAS MERCANCÍAS ==================//
function getCommodities(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const offset = Number(req.query.offset);
        const state = Number(req.query.state);
        const queryGet = `SELECT * FROM commodity WHERE state = ${state} ORDER BY commodity_id DESC LIMIT 10 OFFSET ${offset}`;
        return yield query_1.query(queryGet).then(data => {
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
        const test = `SELECT commodity_id, unit_id, quantity_id, barcode, photo, user_id, last_update, state,
                    (SELECT commodity_name FROM commodity comm WHERE comm.commodity_id = cuq.commodity_id)commodity_name,
                    (SELECT unit_name FROM unit u WHERE u.unit_id = cuq.unit_id)unit_name,
                    (SELECT quantity_name FROM quantity q WHERE q.quantity_id = cuq.quantity_id)quantity_name,
                    (SELECT short_name FROM quantity q WHERE q.quantityt_id = cuq.quantity_id)short_name
                    (SELECT username FROM user WHERE user.user_id = cuq.user_id)username
                    FROM commodity_unit_quantity WHERE commodity_id IN (SELECT commodityid FROM commodity WHERE category_id = ${categoryId})`;
        /* const queryGet = `SELECT commodity_id, commodity_name, CAST(last_update AS CHAR) AS last_update, state,
                 (SELECT cat.category_id FROM category cat WHERE cat.category_id = comm.category_id)category_id,
                 (SELECT category_name FROM category cat WHERE cat.category_id = comm.category_id)category_name,
                 (SELECT un.unit_id FROM unit un WHERE un.unit_id = comm.unit_id)unit_id,
                 (SELECT unit_name FROM unit un WHERE un.unit_id = comm.unit_id)unit_name,
                 (SELECT username FROM user us WHERE us.user_id = comm.user_id)username
                 FROM commodity comm WHERE category_id = ${categoryId} AND state = ${state} LIMIT 10 OFFSET ${offset}`; */
        return yield query_1.query(test).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getCommoditiesByCategoryId = getCommoditiesByCategoryId;
//================== OBTENER UNA MERCANCÍA POR EL COMMODITY_ID ==================//
function getCommodityByCommodityId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const storeId = req.params.store_id;
        const commodityId = req.params.commodity_id;
        const queryGet = `SELECT commodity_id, commodity_name, CAST(last_update AS CHAR) AS last_update, state, 
            (SELECT cat.category_id FROM category cat WHERE cat.category_id = comm.category_id)category_id, 
            (SELECT category_name FROM category cat WHERE cat.category_id = comm.category_id)category_name, 
            (SELECT un.unit_id FROM unit un WHERE un.unit_id = comm.unit_id)unit_id,   
            (SELECT unit_name FROM unit un WHERE un.unit_id = comm.unit_id)unit_name,  
            (SELECT username FROM user us WHERE us.user_id = comm.user_id)username, 
            (SELECT stock_min FROM store_commodity sc WHERE sc.commodity_id =  ${commodityId} AND sc.store_id = ${storeId})stock_min, 
            (SELECT stock_max FROM store_commodity sc WHERE sc.commodity_id = ${commodityId} AND sc.store_id = ${storeId})stock_max, 
            (SELECT current_stock FROM store_commodity sc WHERE sc.commodity_id = ${commodityId} AND sc.store_id = ${storeId})current_stock 
            FROM commodity comm WHERE commodity_id = ${commodityId}`;
        return yield query_1.query(queryGet).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getCommodityByCommodityId = getCommodityByCommodityId;
//================== OBTENER LOS 5 MERCANCÍAS CON MENOS STOCK  ==================//
function getCommoditiesWithLessStock(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const storeId = req.params.store_id;
        const offset = Number(req.query.offset);
        const queryGet = `SELECT  distinct sc.store_commodity_id, sc.commodity_id, c.commodity_name, c.unit_id, u.unit_name, 
                cate.category_id, cate.category_name, sc.stock_min, sc.stock_max, sc.current_stock, sc.last_update FROM store_commodity sc 
                INNER JOIN commodity c ON sc.commodity_id = c.commodity_id 
                INNER JOIN unit u ON c.unit_id = u.unit_id
                INNER JOIN category cate ON cate.category_id = c.category_id
                WHERE store_id = ${storeId} AND current_stock<stock_min  LIMIT 20 OFFSET ${offset}`;
        return yield query_1.query(queryGet).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getCommoditiesWithLessStock = getCommoditiesWithLessStock;
//================== BUSCAR COMMODITY POR SU NOMBRE  ==================//
function searchCommodity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryId = req.params.category_id;
        const search = req.body.query;
        const state = Number(req.body.state);
        const queryGet = `SELECT commodity_id, commodity_name, CAST(last_update AS CHAR) AS last_update, state, 
                        (SELECT cat.category_id FROM category cat WHERE cat.category_id = comm.category_id)category_id, 
                        (SELECT category_name FROM category cat WHERE cat.category_id = comm.category_id)category_name, 
                        (SELECT un.unit_id FROM unit un WHERE un.unit_id = comm.unit_id)unit_id, 
                        (SELECT unit_name FROM unit un WHERE un.unit_id = comm.unit_id)unit_name, 
                        (SELECT username FROM user us WHERE us.user_id = comm.user_id)username 
                        FROM commodity comm WHERE category_id = ${categoryId} AND state = ${state} AND commodity_name LIKE "%${search}%" LIMIT 10`;
        return yield query_1.query(queryGet).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.searchCommodity = searchCommodity;
//================== BUSCAR COMMODITY POR SU NOMBRE  ==================//
function searchCommodityByStoreIdAndCategoryId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryId = req.params.category_id;
        const storeId = req.params.store_id;
        const search = req.body.query;
        const state = Number(req.body.state);
        const queryGet = `SELECT  distinct sc.store_commodity_id, sc.commodity_id, c.commodity_name, c.unit_id, u.unit_name, 
                        cate.category_id, cate.category_name, sc.stock_min, sc.stock_max, sc.current_stock, sc.last_update FROM store_commodity sc 
                        INNER JOIN commodity c ON sc.commodity_id = c.commodity_id 
                        INNER JOIN unit u ON c.unit_id = u.unit_id
                        INNER JOIN category cate ON cate.category_id = c.category_id
                        WHERE store_id = ${storeId} AND cate.category_id = ${categoryId} AND c.commodity_name LIKE "%${search}%" AND sc.state = ${state}`;
        return yield query_1.query(queryGet).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.searchCommodityByStoreIdAndCategoryId = searchCommodityByStoreIdAndCategoryId;
//================== OBTENER TODOS LAS MERCANCÍAS POR EL ID DE LA CATEGORÍA Y DEL ALMACEN ==================//
function getCommoditiesByCategoryIdAndStoreId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryId = req.params.category_id;
        const storeId = req.params.store_id;
        const queryGet = `SELECT  distinct sc.store_commodity_id, sc.commodity_id, c.commodity_name, c.unit_id, 
                    u.unit_name, cate.category_id, cate.category_name, sc.stock_min, sc.stock_max, sc.current_stock, 
                    sc.last_update FROM store_commodity_unit_quantity sc 
                    INNER JOIN commodity c ON sc.commodity_id = c.commodity_id 
                    INNER JOIN unit u ON c.unit_id = u.unit_id
                    INNER JOIN category cate ON cate.category_id = c.category_id
                    WHERE store_id = ${storeId} AND cate.category_id = ${categoryId}`;
        return yield query_1.query(queryGet).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getCommoditiesByCategoryIdAndStoreId = getCommoditiesByCategoryIdAndStoreId;
//================== CREAR UNA MERCANCÍA ==================//
function createCommodity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const commodity = req.body;
        const lastUpdate = req.body.last_update;
        const storesIdList = req.query.store_id;
        const queryCheck = `SELECT * FROM commodity WHERE commodity_name = "${commodity.commodity_name}"`;
        return yield query_1.query(queryCheck).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (dataCheck.result[0][0] != null) {
                return res.status(400).json({ ok: false, message: 'El producto ya existe!' });
            }
            const queryInsert = `INSERT INTO commodity (category_id, commodity_name, state) 
           VALUES ("${commodity.category_id}", "${commodity.commodity_name}", ${commodity.state})`;
            return yield query_1.query(queryInsert).then(data => {
                if (!data.ok)
                    return res.status(data.status).json({ ok: false, message: data.message });
                return res.status(data.status).json({ ok: true, message: 'El Producto ha sido creado correctamente' });
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
        const queryCheckId = `SELECT * FROM commodity WHERE commodity_id = "${commodityId}"`;
        return yield query_1.query(queryCheckId).then((dataCheckId) => __awaiter(this, void 0, void 0, function* () {
            if (dataCheckId.result[0][0] == null) {
                return res.status(400).json({ ok: false, message: `El producto con el id ${commodityId} no existe!` });
            }
            ;
            const queryDelete = `DELETE commodity WHERE commodity_id = "${commodityId}"`;
            return yield query_1.query(queryDelete).then(dataDelete => {
                if (!dataDelete.ok)
                    return res.status(dataDelete.status).json({ ok: false, message: dataDelete.message });
                return res.status(dataDelete.status).json({ ok: true, message: 'El producto se eliminó correctamente' });
            });
        }));
    });
}
exports.deleteCommodity = deleteCommodity;
