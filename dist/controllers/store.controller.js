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
const query_1 = require("../queries/query");
//================== OBTENER TODAS LOS ALMACENES ==================//
function getStores(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const offset = Number(req.query.offset);
        const state = Number(req.query.state);
        const queryGet = `SELECT * FROM store WHERE state = ${state} ORDER BY store_id DESC`;
        return yield query_1.query(queryGet).then(data => {
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
        const queryGet = `SELECT * FROM store WHERE store_id = "${search}" AND state = ${state}`;
        return yield query_1.query(queryGet).then(data => {
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
        const storeName = store.store_name;
        store.store_name = storeName.charAt(0).toUpperCase() + storeName.slice(1);
        const queryCheck = `SELECT * FROM store WHERE store_name = "${store.store_name}"`;
        return yield query_1.query(queryCheck).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (dataCheck.result[0][0] != null) {
                return res.status(400).json({ ok: false, message: 'El almacen ya existe!' });
            }
            const queryInsert = `INSERT INTO store (store_name, state) VALUES ("${store.store_name}", "${store.state}")`;
            return yield query_1.query(queryInsert).then(data => {
                if (!data.ok)
                    return res.status(data.status).json({ ok: false, message: data.message });
                return res.status(data.status).json({ ok: true, message: 'El Almacen se ha creado correctamente' });
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
        const storeName = store.store_name;
        store.store_name = storeName.charAt(0).toUpperCase() + storeName.slice(1);
        const queryCheckId = `SELECT * FROM store WHERE store_id = "${storeId}"`;
        return yield query_1.query(queryCheckId).then((dataCheckId) => __awaiter(this, void 0, void 0, function* () {
            if (dataCheckId.result[0][0] == null) {
                return res.status(400).json({ ok: false, message: `El almacen con el id ${storeId} no existe!` });
            }
            ;
            const queryCheck = `SELECT * FROM store WHERE store_name = "${store.store_name}"`;
            return yield query_1.query(queryCheck).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
                if (dataCheck.result[0][0] != null) {
                    return res.status(400).json({ ok: false, message: 'El almacen ya existe!' });
                }
                const queryUpdate = `UPDATE store SET store_name = "${store.store_name}", state = "${store.state}" WHERE store_id = "${storeId}"`;
                return yield query_1.query(queryUpdate).then((dataUpdate) => __awaiter(this, void 0, void 0, function* () {
                    if (!dataUpdate.ok)
                        return res.status(dataUpdate.status).json({ ok: false, message: dataUpdate.message });
                    return res.status(dataUpdate.status).json({ ok: true, message: 'El almacen se actualizó correctamente' });
                }));
            }));
        }));
    });
}
exports.updateStore = updateStore;
//================== ELIMINAR UN ALMACÉN POR SU ID ==================//
function deleteStore(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const storeId = req.params.store_id;
        const queryCheckId = `SELECT * FROM store WHERE store_id = "${storeId}"`;
        return yield query_1.query(queryCheckId).then((dataCheckId) => __awaiter(this, void 0, void 0, function* () {
            if (dataCheckId.result[0][0] == null) {
                return res.status(400).json({ ok: false, message: `El almacen con el id ${storeId} no existe!` });
            }
            ;
            const queryDelete = `DELETE store WHERE store_id = "${storeId}"`;
            return yield query_1.query(queryDelete).then(dataDelete => {
                if (!dataDelete.ok)
                    return res.status(dataDelete.status).json({ ok: false, message: dataDelete.message });
                return res.status(dataDelete.status).json({ ok: true, message: 'El almacen se eliminó correctamente' });
            });
        }));
    });
}
exports.deleteStore = deleteStore;
//================== OBTENER TODAS LOS ALMACENES ORDER BY STORE ID ==================//
function getStoresOrderById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const state = Number(req.query.state);
        const offset = Number(req.query.offset);
        const storeIdList = req.query.store_id;
        var queryGet = '';
        var storesIdsString = '';
        if (storeIdList != null) {
            for (var i = 0; i < storeIdList.length; i++) {
                storesIdsString += '"' + storeIdList[i] + '"' + ',';
            }
            var cutStoresIdsString = storesIdsString.substring(0, storesIdsString.length - 1);
            queryGet = `SELECT * FROM store WHERE state = ${state} ORDER BY FIELD(category_id, "${cutStoresIdsString}") DESC LIMIT 10 OFFSET ${offset}`;
        }
        else {
            queryGet = `SELECT * FROM store WHERE state = ${state} ORDER BY store_id DESC LIMIT 10 OFFSET ${offset}`;
        }
        return yield query_1.query(queryGet).then(data => {
            console.log(data.message);
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getStoresOrderById = getStoresOrderById;
//================== OBTENER LOS ALMACENES POR EL ID DEL PRODUCTO ==================//
function getStoresByCommodityId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const commodityId = req.query.commodity_id;
        const state = req.query.state;
        const queryGet = `SELECT DISTINCT scuq.store_id, 
            (SELECT DISTINCT store_name FROM store s WHERE s.store_id = scuq.store_id)store_name 
            FROM store_commodity_unit_quantity scuq 
            WHERE commodity_unit_quantity_id IN (SELECT commodity_unit_quantity_id FROM commodity_unit_quantity WHERE commodity_id = "${commodityId}") 
            AND scuq.state = ${state}`;
        return yield query_1.query(queryGet).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getStoresByCommodityId = getStoresByCommodityId;
