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
        const queryGet = `SELECT  distinct scuq.store_commodity_unit_quantity_id, scuq.commodity_unit_quantity_id, 
            scuq.store_id, scuq.stock_min, scuq.stock_max, scuq.current_stock, CAST(scuq.last_update AS CHAR) AS last_update, 
            scuq.favorite, scuq.user_id, scuq.state, s.store_name, 
            cuq.commodity_id, cuq.unit_id, cuq.unit_value, cuq.quantity_id, cuq.barcode, cuq.photo, 
            comm.category_id, comm.commodity_name, 
            u.unit_name, u.symbol, cate.category_name, user.username
            FROM store_commodity_unit_quantity scuq
            INNER JOIN store s ON scuq.store_id = s.store_id
            INNER JOIN commodity_unit_quantity cuq ON scuq.commodity_unit_quantity_id = cuq.commodity_unit_quantity_id
            INNER JOIN unit u ON cuq.unit_id = u.unit_id
            INNER JOIN commodity comm ON cuq.commodity_id = comm.commodity_id
            INNER JOIN category cate ON comm.category_id = cate.category_id
            INNER JOIN user ON scuq.user_id = user.user_id
            WHERE state = ${state} ORDER BY commodity_id DESC LIMIT 10 OFFSET ${offset}`;
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
        const queryGet = `SELECT  distinct scuq.store_commodity_unit_quantity_id, scuq.commodity_unit_quantity_id, 
                scuq.store_id, scuq.stock_min, scuq.stock_max, scuq.current_stock, 
                CAST(scuq.last_update AS CHAR) AS last_update, scuq.state,
                scuq.favorite, scuq.user_id, scuq.state, s.store_name, 
                cuq.commodity_id, cuq.unit_id, cuq.unit_value, cuq.quantity_id, cuq.barcode, cuq.photo, 
                comm.category_id, comm.commodity_name, 
                u.unit_name, u.symbol, cate.category_name, user.username
                FROM store_commodity_unit_quantity scuq
                INNER JOIN store s ON scuq.store_id = s.store_id
                INNER JOIN commodity_unit_quantity cuq ON scuq.commodity_unit_quantity_id = cuq.commodity_unit_quantity_id
                INNER JOIN unit u ON cuq.unit_id = u.unit_id
                INNER JOIN commodity comm ON cuq.commodity_id = comm.commodity_id
                INNER JOIN category cate ON comm.category_id = cate.category_id
                INNER JOIN user ON scuq.user_id = user.user_id
                WHERE comm.category_id = ${categoryId} AND scuq.state = ${state} 
                GROUP BY cuq.commodity_id
                ORDER BY commodity_id DESC LIMIT 10 OFFSET ${offset}`;
        return yield query_1.query(queryGet).then(data => {
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
        const queryGet = `SELECT  distinct scuq.store_commodity_unit_quantity_id, scuq.commodity_unit_quantity_id, 
            scuq.store_id, scuq.stock_min, scuq.stock_max, scuq.current_stock,CAST(scuq.last_update AS CHAR) AS last_update, 
            scuq.favorite, scuq.user_id,  scuq.state, s.store_name, 
            cuq.commodity_id, cuq.unit_id, cuq.unit_value, cuq.quantity_id, cuq.barcode, cuq.photo, 
            comm.category_id, comm.commodity_name, 
            u.unit_name, u.symbol, cate.category_name, user.username
            FROM store_commodity_unit_quantity scuq
            INNER JOIN store s ON scuq.store_id = s.store_id
            INNER JOIN commodity_unit_quantity cuq ON scuq.commodity_unit_quantity_id = cuq.commodity_unit_quantity_id
            INNER JOIN unit u ON cuq.unit_id = u.unit_id
            INNER JOIN commodity comm ON cuq.commodity_id = comm.commodity_id
            INNER JOIN category cate ON comm.category_id = cate.category_id
            INNER JOIN user ON scuq.user_id = user.user_id
            WHERE cuq.commodity_id = ${commodityId}`;
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
        const queryGet = `SELECT  distinct scuq.store_commodity_unit_quantity_id, scuq.commodity_unit_quantity_id, 
                    scuq.store_id, scuq.stock_min, scuq.stock_max, scuq.current_stock,CAST(scuq.last_update AS CHAR) AS last_update, 
                    scuq.favorite, scuq.user_id, scuq.state, s.store_name, 
                    cuq.commodity_id, cuq.unit_id, cuq.unit_value, cuq.quantity_id, cuq.barcode, cuq.photo, 
                    comm.category_id, comm.commodity_name, 
                    u.unit_name, u.symbol, cate.category_name, user.username
                    FROM store_commodity_unit_quantity scuq
                    INNER JOIN store s ON scuq.store_id = s.store_id
                    INNER JOIN commodity_unit_quantity cuq ON scuq.commodity_unit_quantity_id = cuq.commodity_unit_quantity_id
                    INNER JOIN unit u ON cuq.unit_id = u.unit_id
                    INNER JOIN commodity comm ON cuq.commodity_id = comm.commodity_id
                    INNER JOIN category cate ON comm.category_id = cate.category_id
                    INNER JOIN user ON scuq.user_id = user.user_id
                    WHERE scuq.store_id = ${storeId} AND scuq.current_stock<scuq.stock_min  LIMIT 20 OFFSET ${offset}`;
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
        const search = req.body.query;
        const queryGet = `SELECT commodity_name FROM commodity WHERE commodity_name = '${search}'`;
        return yield query_1.query(queryGet).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0][0] });
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
        const queryGet = `SELECT  distinct scuq.store_commodity_unit_quantity_id, scuq.commodity_unit_quantity_id, 
            scuq.store_id, scuq.stock_min, scuq.stock_max, scuq.current_stock, 
            CAST(scuq.last_update AS CHAR) AS last_update, 
            scuq.favorite, scuq.user_id, scuq.state, s.store_name, 
            cuq.commodity_id, cuq.unit_id, cuq.unit_value, cuq.quantity_id, cuq.barcode, cuq.photo, 
            comm.category_id, comm.commodity_name, 
            u.unit_name, u.symbol, cate.category_name, user.username
            FROM store_commodity_unit_quantity scuq
            INNER JOIN store s ON scuq.store_id = s.store_id
            INNER JOIN commodity_unit_quantity cuq ON scuq.commodity_unit_quantity_id = cuq.commodity_unit_quantity_id
            INNER JOIN unit u ON cuq.unit_id = u.unit_id
            INNER JOIN commodity comm ON cuq.commodity_id = comm.commodity_id
            INNER JOIN category cate ON comm.category_id = cate.category_id
            INNER JOIN user ON scuq.user_id = user.user_id
            WHERE scuq.store_id = ${storeId} AND comm.category_id = ${categoryId} AND c.commodity_name LIKE "%${search}%" AND scuq.state = ${state}`;
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
        const queryGet = `SELECT  distinct scuq.store_commodity_unit_quantity_id, scuq.commodity_unit_quantity_id, 
                    scuq.store_id, scuq.stock_min, scuq.stock_max, scuq.current_stock, scuq.last_update, 
                    scuq.favorite, scuq.user_id, s.store_name, 
                    cuq.commodity_id, cuq.unit_id, cuq.unit_value, cuq.quantity_id, cuq.barcode, cuq.photo, 
                    cuq.state, comm.category_id, comm.commodity_name, 
                    u.unit_name, u.symbol, cate.category_name, user.username
                    FROM store_commodity_unit_quantity scuq
                    INNER JOIN store s ON scuq.store_id = s.store_id
                    INNER JOIN commodity_unit_quantity cuq ON scuq.commodity_unit_quantity_id = cuq.commodity_unit_quantity_id
                    INNER JOIN unit u ON cuq.unit_id = u.unit_id
                    INNER JOIN commodity comm ON cuq.commodity_id = comm.commodity_id
                    INNER JOIN category cate ON comm.category_id = cate.category_id
                    INNER JOIN user ON scuq.user_id = user.user_id
                    WHERE scuq.store_id = ${storeId} AND comm.category_id = ${categoryId}`;
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
            if (!dataCheck.ok)
                return res.status(dataCheck.status).json({ ok: false, message: dataCheck.message });
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
