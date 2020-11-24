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
exports.deleteQuantity = exports.updateQuantity = exports.createQuantity = exports.searchQuantity = exports.getQuantity = exports.getQuantities = void 0;
const query_1 = require("../queries/query");
//================== OBTENER TODAS LAS CANTIDADES ==================//
function getQuantities(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const offset = Number(req.query.offset);
        const state = Number(req.query.state);
        const queryGet = `SELECT * FROM quantity WHERE state = ${state} ORDER BY quantity_id DESC LIMIT 10 OFFSET ${offset}`;
        return yield query_1.query(queryGet).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getQuantities = getQuantities;
//================== OBTENER UNA CANTIDAD POR SU ID ==================//
function getQuantity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const search = req.params.quantity_id;
        const state = req.params.state;
        const queryGet = `SELECT * FROM quantity WHERE quantity_id = "${search}" AND state = ${state}`;
        return yield query_1.query(queryGet).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getQuantity = getQuantity;
//================== BUSCAR CANTIDAD POR SU NOMBRE  ==================//
function searchQuantity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const search = req.body.query;
        const state = Number(req.body.state);
        const querySearch = `SELECT * FROM quantity WHERE quantity_name LIKE "%${search}%" AND state = ${state} LIMIT 10`;
        return yield query_1.query(querySearch).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.searchQuantity = searchQuantity;
//================== CREAR UNA CANTIDAD ==================//
function createQuantity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const quantity = req.body;
        const quantityName = quantity.quantity_name;
        quantity.quantity_name = quantityName.charAt(0).toUpperCase() + quantityName.slice(1);
        const shortName = quantity.short_name;
        if (shortName != '') {
            quantity.short_name = shortName.charAt(0).toUpperCase() + shortName.slice(1);
        }
        else {
            quantity.short_name = '';
        }
        const queryCheckQuantityName = `SELECT * FROM quantity WHERE short_name = "${quantity.short_name}"`;
        return yield query_1.query(queryCheckQuantityName).then((dataCheckShortName) => __awaiter(this, void 0, void 0, function* () {
            if (quantity.short_name != '') {
                if (dataCheckShortName.result[0][0] != null) {
                    return res.status(400).json({ ok: false, message: 'La abreviatura del nombre de la cantidad ya existe!' });
                }
            }
            const queryCheckShortName = `SELECT * FROM quantity WHERE quantity_name = "${quantity.quantity_name}"`;
            return yield query_1.query(queryCheckShortName).then((dataCheckQuantityName) => __awaiter(this, void 0, void 0, function* () {
                if (dataCheckQuantityName.result[0][0] != null) {
                    return res.status(400).json({ ok: false, message: 'El nombre de la "cantidad" ya existe!' });
                }
                const queryInsert = `INSERT INTO quantity (quantity_name, short_name, state) VALUES ("${quantity.quantity_name}", "${quantity.short_name}", "${quantity.state}")`;
                return yield query_1.query(queryInsert).then(data => {
                    if (!data.ok)
                        return res.status(data.status).json({ ok: false, message: data.message });
                    return res.status(data.status).json({ ok: true, message: 'La "cantidad" se ha creado correctamente' });
                });
            }));
        }));
    });
}
exports.createQuantity = createQuantity;
//================== ACTUALIZAR UNA CANTIDAD ==================//
function updateQuantity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const quantity = req.body;
        const quantityId = req.params.quantity_id;
        const quantityName = quantity.quantity_name;
        quantity.quantity_name = quantityName.charAt(0).toUpperCase() + quantityName.slice(1);
        const shortName = quantity.short_name;
        if (shortName == '') {
            quantity.short_name = shortName.charAt(0).toUpperCase() + shortName.slice(1);
        }
        else {
            quantity.short_name = '';
        }
        const queryCheckId = `SELECT * FROM quantity WHERE quantity_id = "${quantityId}"`;
        return yield query_1.query(queryCheckId).then((dataCheckId) => __awaiter(this, void 0, void 0, function* () {
            if (dataCheckId.result[0][0] == null) {
                return res.status(400).json({ ok: false, message: `La "cantidad" con el id ${quantityId} no existe!` });
            }
            ;
            const queryCheckQuantityName = `SELECT quantity_id FROM quantity WHERE quantity_name = "${quantity.quantity_name}" AND quantity_id != "${quantityId}"`;
            return yield query_1.query(queryCheckQuantityName).then((dataCheckQuantityName) => __awaiter(this, void 0, void 0, function* () {
                if (dataCheckQuantityName.result[0][0] != null) {
                    return res.status(400).json({ ok: false, message: 'El nombre de la "cantidad" ya existe!' });
                }
                const queryCheckShortName = `SELECT quantity_id FROM quantity WHERE short_name = "${quantity.short_name}" AND quantity_id != "${quantityId}"`;
                return yield query_1.query(queryCheckShortName).then((dataCheckShortName) => __awaiter(this, void 0, void 0, function* () {
                    if (shortName != '') {
                        if (dataCheckShortName.result[0][0] != null) {
                            return res.status(400).json({ ok: false, message: 'La abreviatura de la cantidad ya existe!' });
                        }
                    }
                    const queryUpdate = `UPDATE quantity SET quantity_name = "${quantity.quantity_name}", short_name = "${quantity.short_name}", 
                                        state = "${quantity.state}" WHERE quantity_id = "${quantityId}"`;
                    return yield query_1.query(queryUpdate).then((dataUpdate) => __awaiter(this, void 0, void 0, function* () {
                        if (!dataUpdate.ok)
                            return res.status(dataUpdate.status).json({ ok: false, message: dataUpdate.message });
                        return res.status(dataUpdate.status).json({ ok: true, message: 'La "cantidad" se actualizó correctamente' });
                    }));
                }));
            }));
        }));
    });
}
exports.updateQuantity = updateQuantity;
//================== ELIMINAR UNA CANTIDAD POR SU ID ==================//
function deleteQuantity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const quantityId = req.params.quantity_id;
        const queryCheckId = `SELECT * FROM quantity WHERE quantity_id = "${quantityId}"`;
        return yield query_1.query(queryCheckId).then((dataCheckId) => __awaiter(this, void 0, void 0, function* () {
            if (dataCheckId.result[0][0] == null) {
                return res.status(400).json({ ok: false, message: `La "cantidad" con el id ${quantityId} no existe!` });
            }
            ;
            const queryDelete = `DELETE quantity WHERE quantity_id = "${quantityId}"`;
            return yield query_1.query(queryDelete).then(dataDelete => {
                if (!dataDelete.ok)
                    return res.status(dataDelete.status).json({ ok: false, message: dataDelete.message });
                return res.status(dataDelete.status).json({ ok: true, message: 'La "cantidad" se eliminó correctamente' });
            });
        }));
    });
}
exports.deleteQuantity = deleteQuantity;
