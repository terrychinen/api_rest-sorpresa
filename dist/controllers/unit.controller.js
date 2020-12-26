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
exports.getUnitsByCommodityId = exports.getUnitsById = exports.deleteUnit = exports.updateUnit = exports.createUnit = exports.searchUnit = exports.getUnit = exports.getUnits = void 0;
const query_1 = require("../queries/query");
//================== OBTENER TODAS LAS UNIDADES ==================//
function getUnits(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const offset = Number(req.query.offset);
        const state = Number(req.query.state);
        if (Number.isNaN(offset) || Number.isNaN(state)) {
            return res.status(404).json({ ok: false, message: `La variable 'offset' y 'state' es obligatorio!` });
        }
        const queryGet = `SELECT * FROM unit WHERE state = ${state} ORDER BY unit_id DESC LIMIT 10 OFFSET ${offset}`;
        return yield query_1.query(queryGet).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getUnits = getUnits;
//================== OBTENER UNA UNIDAD POR SU ID ==================//
function getUnit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const search = req.params.unit_id;
        const state = req.params.state;
        const queryGet = `SELECT * FROM unit WHERE unit_id = "${search}" AND state = ${state}`;
        return yield query_1.query(queryGet).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getUnit = getUnit;
//================== BUSCAR UNIDAD POR SU NOMBRE  ==================//
function searchUnit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const search = req.body.query;
        const state = Number(req.body.state);
        const queryString = `SELECT * FROM unit WHERE unit_name LIKE "%${search}%" AND state = ${state} ORDER BY unit_name DESC`;
        return yield query_1.query(queryString).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.searchUnit = searchUnit;
//================== CREAR UNA UNIDAD ==================//
function createUnit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const unit = req.body;
        const unitName = unit.unit_name;
        unit.unit_name = unitName.charAt(0).toUpperCase() + unitName.slice(1);
        const queryCheck = `SELECT * FROM unit WHERE unit_name = "${unit.unit_name}"`;
        return yield query_1.query(queryCheck).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (dataCheck.result[0][0] != null) {
                return res.status(400).json({ ok: false, message: 'La unidad ya existe!' });
            }
            const queryInsert = `INSERT INTO unit (unit_name, symbol, state) VALUES ("${unit.unit_name}", "${unit.symbol}", "${unit.state}")`;
            return yield query_1.query(queryInsert).then(data => {
                if (!data.ok)
                    return res.status(data.status).json({ ok: false, message: data.message });
                return res.status(data.status).json({ ok: true, message: 'Unidad creado correctamente' });
            });
        }));
    });
}
exports.createUnit = createUnit;
//================== ACTUALIZAR UNA UNIDAD ==================//
function updateUnit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const unit = req.body;
        const unitId = req.params.unit_id;
        const unitName = unit.unit_name;
        if (unitName != '' || unitName != null) {
            unit.unit_name = unitName.charAt(0).toUpperCase() + unitName.slice(1);
        }
        else {
            unit.unit_name = '';
        }
        const queryCheckId = `SELECT * FROM unit WHERE unit_id = "${unitId}"`;
        return yield query_1.query(queryCheckId).then((dataCheckId) => __awaiter(this, void 0, void 0, function* () {
            if (dataCheckId.result[0][0] == null) {
                return res.status(400).json({ ok: false, message: `La unidad con el id ${unitId} no existe!` });
            }
            ;
            const queryCheckUnitName = `SELECT unit_id FROM unit WHERE unit_name = "${unit.unit_name}" AND unit_id != "${unitId}"`;
            return yield query_1.query(queryCheckUnitName).then((dataCheckUnit) => __awaiter(this, void 0, void 0, function* () {
                if (dataCheckUnit.result[0][0] != null) {
                    return res.status(400).json({ ok: false, message: 'El nombre de la unidad ya existe!' });
                }
                const queryCheckUnitSymbol = `SELECT unit_id FROM unit WHERE symbol = "${unit.unit_name}" AND unit_id != "${unitId}"`;
                return yield query_1.query(queryCheckUnitSymbol).then((dataCheckSymbol) => __awaiter(this, void 0, void 0, function* () {
                    if (dataCheckSymbol.result[0][0] != null) {
                        return res.status(400).json({ ok: false, message: 'El símbolo de la unidad ya existe!' });
                    }
                    const queryUpdate = `UPDATE unit SET unit_name = "${unit.unit_name}", symbol = "${unit.symbol}", state = "${unit.state}" WHERE unit_id = "${unitId}"`;
                    return yield query_1.query(queryUpdate).then((dataUpdate) => __awaiter(this, void 0, void 0, function* () {
                        if (!dataUpdate.ok)
                            return res.status(dataUpdate.status).json({ ok: false, message: dataUpdate.message });
                        return res.status(dataUpdate.status).json({ ok: true, message: 'La unidad se actualizó correctamente' });
                    }));
                }));
            }));
        }));
    });
}
exports.updateUnit = updateUnit;
//================== ELIMINAR UNA UNIDAD POR SU ID ==================//
function deleteUnit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const unitId = req.params.unit_id;
        const queryCheckId = `SELECT * FROM unit WHERE unit_id = "${unitId}"`;
        return yield query_1.query(queryCheckId).then((dataCheckId) => __awaiter(this, void 0, void 0, function* () {
            if (dataCheckId.result[0][0] == null) {
                return res.status(400).json({ ok: false, message: `La unidad con el id ${unitId} no existe!` });
            }
            ;
            const queryDelete = `DELETE unit WHERE unit_id = "${unitId}"`;
            return yield query_1.query(queryDelete).then(dataDelete => {
                if (!dataDelete.ok)
                    return res.status(dataDelete.status).json({ ok: false, message: dataDelete.message });
                return res.status(dataDelete.status).json({ ok: true, message: 'La unidad se eliminó correctamente' });
            });
        }));
    });
}
exports.deleteUnit = deleteUnit;
//================== OBTENER TODAS LAS UNIDADES ORDER BY UNIT ID ==================//
function getUnitsById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const unitId = req.params.unit_id;
        const offset = Number(req.query.offset);
        const state = Number(req.query.state);
        const queryGet = `SELECT * FROM unit WHERE state = ${state} ORDER BY FIELD(unit_id, "${unitId}") DESC LIMIT 10 OFFSET ${offset}`;
        return yield query_1.query(queryGet).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getUnitsById = getUnitsById;
//================== OBTENER LAS UNIDADES POR EL ID DEL PRODUCTO ==================//
function getUnitsByCommodityId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const commodityId = req.query.commodity_id;
        const state = req.query.state;
        const queryGet = `SELECT DISTINCT cuq.unit_id, 
            (SELECT DISTINCT unit_name FROM unit u WHERE u.unit_id = cuq.unit_id)unit_name 
            FROM commodity_unit_quantity cuq 
            WHERE commodity_unit_quantity_id IN (SELECT commodity_unit_quantity_id FROM commodity_unit_quantity WHERE commodity_id = "${commodityId}") 
            AND cuq.state = "${state}"`;
        return yield query_1.query(queryGet).then(data => {
            console.log(data.message);
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getUnitsByCommodityId = getUnitsByCommodityId;
