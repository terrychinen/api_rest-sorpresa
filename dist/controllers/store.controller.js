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
exports.deleteStore = exports.updateStore = exports.createStore = exports.getStore = exports.getStores = void 0;
const search_query_1 = require("../queries/search.query");
const query_1 = require("../queries/query");
//================== OBTENER TODAS LOS ALMACENES ==================//
function getStores(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tableName = 'store';
        const offset = Number(req.query.offset);
        const state = Number(req.query.state);
        return yield query_1.queryGet(tableName, offset, state).then(data => {
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
        const columnName = 'store_id';
        //VERIFICA SI EXISTE EL ID PARA ACTUALIZAR
        return yield search_query_1.checkIfDataExist(tableName, columnName, storeId).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (!dataCheck.ok) {
                return res.status(404).json({ ok: false, message: dataCheck.message });
            }
            //VERIFICA SI YA HAY UN ALMACÉN CON EL MISMO NOMBRE PARA NO ACTUALIZAR
            return yield search_query_1.checkIfDataExist(tableName, columnName, store.store_name).then((dataCheckRepeat) => __awaiter(this, void 0, void 0, function* () {
                if (dataCheckRepeat.ok) {
                    return res.status(400).json({ ok: false, message: dataCheckRepeat.message });
                }
                //ACTUALIZA EL REGISTRO
                return yield query_1.queryUpdate(tableName, columnName, store, storeId).then(data => {
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
