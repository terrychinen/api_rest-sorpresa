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
exports.getStoresByCommodityId = exports.getStoresOrderById = exports.deleteStore = exports.updateStore = exports.createStore = exports.searchStore = exports.getStore = exports.getStores = void 0;
const database_1 = require("../database");
const search_query_1 = require("../queries/search.query");
const query_1 = require("../queries/query");
//================== OBTENER TODAS LOS ALMACENES ==================//
function getStores(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tableName = 'store';
        const columnName = 'store_id';
        const state = Number(req.query.state);
        return yield query_1.queryGetWithoutOffset(tableName, columnName, state).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getStores = getStores;
//================== OBTENER UN ALMACÉN POR SU ID ==================//
function getStore(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const search = req.params.store_id;
        const state = req.params.state;
        const tableName = 'store';
        const columnName = 'store_id';
        return yield query_1.queryGetBy(tableName, columnName, search, state).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getStore = getStore;
//================== BUSCAR ALMACEN POR SU NOMBRE  ==================//
function searchStore(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const search = req.body.query;
        const state = Number(req.body.state);
        const queryString = `SELECT * FROM store WHERE store_name LIKE "%${search}%" AND state = ${state} ORDER BY store_name DESC`;
        return yield query_1.query(queryString).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.searchStore = searchStore;
//================== CREAR UN ALMACÉN ==================//
function createStore(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const store = req.body;
        const tableName = 'store';
        const columnName = 'store_name';
        //VERIFICA SI EL ALMACÉN EXISTE
        return yield search_query_1.checkIfDataExist(tableName, columnName, store.store_name).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (dataCheck.ok)
                return res.status(403).json({ ok: false, message: dataCheck.message });
            if (dataCheck.status == 500)
                return res.status(500).json({ ok: false, message: dataCheck.message });
            //INSERTA EL NUEVO ALMACÉN
            return yield query_1.queryInsert(tableName, store).then(data => {
                if (!data.ok)
                    return res.status(data.status).json({ ok: false, message: data.message });
                return res.status(data.status).json({ ok: true, message: data.message });
            });
        }));
    });
}
exports.createStore = createStore;
//================== ACTUALIZAR UN ALMACÉN ==================//
function updateStore(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const store = req.body;
        const storeId = req.params.store_id;
        const tableName = 'store';
        const columnStoreID = 'store_id';
        const columnStoreName = 'store_name';
        //VERIFICA SI EXISTE EL ID PARA ACTUALIZAR
        return yield search_query_1.checkIfDataExist(tableName, columnStoreID, storeId).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (!dataCheck.ok) {
                return res.status(404).json({ ok: false, message: dataCheck.message });
            }
            //VERIFICA SI YA HAY UN ALMACÉN CON EL MISMO NOMBRE PARA NO ACTUALIZAR
            return yield search_query_1.checkIfDataExist(tableName, columnStoreName, store.store_name).then((dataCheckRepeat) => __awaiter(this, void 0, void 0, function* () {
                if (dataCheckRepeat.ok) {
                    return res.status(400).json({ ok: false, message: dataCheckRepeat.message });
                }
                //ACTUALIZA EL REGISTRO
                return yield query_1.queryUpdate(tableName, columnStoreID, store, storeId).then(data => {
                    if (!data.ok)
                        return res.status(data.status).json({ ok: false, message: data.message });
                    return res.status(data.status).json({ ok: true, message: data.message });
                });
            }));
        }));
    });
}
exports.updateStore = updateStore;
//================== ELIMINAR UN ALMACÉN POR SU ID ==================//
function deleteStore(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const storeId = req.params.store_id;
        const tableName = 'store';
        const columnName = 'store_id';
        //VERIFICA SI EXISTE EL ID PARA ACTUALIZAR
        return yield search_query_1.checkIfDataExist(tableName, columnName, storeId).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (!dataCheck.ok) {
                return res.status(dataCheck.status).json({ ok: false, message: dataCheck.message });
            }
            //ELIMINA EL REGISTRO (state = 0)
            return yield query_1.queryDelete(tableName, columnName, storeId).then(data => {
                if (!data.ok)
                    return res.status(data.status).json({ ok: false, message: data.message });
                return res.status(data.status).json({ ok: true, message: data.message });
            });
        }));
    });
}
exports.deleteStore = deleteStore;
//================== OBTENER TODAS LOS ALMACENES ORDER BY STORE ID ==================//
function getStoresOrderById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tableName = 'store';
        const state = Number(req.query.state);
        const storeIdList = req.query.store_id;
        const columnName = `store_id`;
        var storesIdsString = '';
        if (storeIdList != null) {
            for (var i = 0; i < storeIdList.length; i++) {
                storesIdsString += '"' + storeIdList[i] + '"' + ',';
            }
            var cutStoresIdsString = storesIdsString.substring(0, storesIdsString.length - 1);
            console.log(cutStoresIdsString);
            return yield query_1.queryOrderbyId(tableName, columnName, cutStoresIdsString, 0, state).then(data => {
                if (!data.ok)
                    return res.status(data.status).json({ ok: false, message: data.message });
                return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
            });
        }
        else {
            return yield query_1.queryGetWithoutOffset(tableName, columnName, state).then(data => {
                if (!data.ok)
                    return res.status(data.status).json({ ok: false, message: data.message });
                return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
            });
        }
    });
}
exports.getStoresOrderById = getStoresOrderById;
//================== OBTENER LOS ALMACENES POR EL ID DEL PRODUCTO ==================//
function getStoresByCommodityId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const commodityId = req.query.commodity_id;
        const state = req.query.state;
        const columnName = 'commodity_id';
        try {
            const conn = yield database_1.connect();
            const queryString = `SELECT store_id, 
        (SELECT store_name FROM store s WHERE s.store_id = sm.store_id)store_name,  
        (SELECT state FROM store s WHERE s.store_id = sm.store_id)state  
        FROM store_commodity sm WHERE commodity_id = ${commodityId} and state = ${state}`;
            const queryStoreCommmodity = yield conn.query(queryString);
            conn.end();
            if (!queryStoreCommmodity)
                return res.status(400).json({ ok: false, message: 'GET BY ' + columnName + ' error: store_commodity', result: [] });
            return res.status(200).json({
                ok: true,
                message: 'GET BY ' + columnName + ' successful: Commodity',
                result: queryStoreCommmodity[0],
            });
        }
        catch (e) {
            return res.status(500).json({ ok: false, message: e.toString(), result: [] });
        }
    });
}
exports.getStoresByCommodityId = getStoresByCommodityId;
