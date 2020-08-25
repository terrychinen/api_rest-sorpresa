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
exports.deleteUnit = exports.updateUnit = exports.createUnit = exports.getUnit = exports.getUnits = void 0;
const search_query_1 = require("../queries/search.query");
const query_1 = require("../queries/query");
//================== OBTENER TODAS LAS UNIDADES ==================//
function getUnits(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tableName = 'unit';
        const offset = Number(req.query.offset);
        return yield query_1.queryGet(tableName, offset).then(data => {
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
        const tableName = 'unit';
        const columnName = 'unit_id';
        yield yield query_1.queryGetBy(tableName, columnName, search).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getUnit = getUnit;
//================== CREAR UNA UNIDAD ==================//
function createUnit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const unit = req.body;
        const tableName = 'unit';
        const columnName = 'unit_name';
        //VERIFICA SI LA UNIDAD EXISTE
        return yield search_query_1.checkIfDataExist(tableName, columnName, unit.unit_name).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (dataCheck.ok)
                return res.status(dataCheck.status).json({ ok: false, message: dataCheck.message });
            //INSERTA LA NUEVA UNIDAD
            return yield query_1.queryInsert(tableName, unit).then(data => {
                if (!data.ok)
                    return res.status(data.status).json({ ok: false, message: data.message });
                return res.status(data.status).json({ ok: true, message: data.message });
            });
        }));
    });
}
exports.createUnit = createUnit;
//================== ACTUALIZAR UNA UNIDAD ==================//
function updateUnit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const unit = req.body;
        const tableName = 'unit';
        const columnName = 'unit_id';
        //VERIFICA SI EXISTE EL ID PARA ACTUALIZAR
        yield search_query_1.checkIfDataExist(tableName, columnName, unit.unit_id).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (!dataCheck.ok) {
                return res.status(dataCheck.status).json({ ok: false, message: dataCheck.message });
            }
            //VERIFICA SI YA HAY UNA UNIDAD CON EL MISMO NOMBRE PARA NO ACTUALIZAR
            return yield search_query_1.checkIfDataExist(tableName, columnName, unit.unit_name).then((dataCheckRepeat) => __awaiter(this, void 0, void 0, function* () {
                if (dataCheckRepeat.ok) {
                    return res.status(dataCheckRepeat.status).json({ ok: false, message: dataCheckRepeat.message });
                }
                //ACTUALIZA EL REGISTRO
                return yield query_1.queryUpdate(tableName, columnName, unit, unit.unit_id).then(data => {
                    if (!data.ok)
                        return res.status(data.status).json({ ok: false, message: data.message });
                    return res.status(data.status).json({ ok: true, message: data.message });
                });
            }));
        }));
    });
}
exports.updateUnit = updateUnit;
//================== ELIMINAR UNA UNIDAD POR SU ID ==================//
function deleteUnit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tableName = 'unit';
        const columnName = 'unit_id';
        const value = req.params.unit_id;
        yield search_query_1.checkIfDataExist(tableName, columnName, value).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (!dataCheck.ok) {
                return res.status(dataCheck.status).json({ ok: false, message: dataCheck.message });
            }
            return yield query_1.queryDelete(tableName, columnName, value).then(data => {
                if (!data.ok)
                    return res.status(data.status).json({ ok: false, message: data.message });
                return res.status(data.status).json({ ok: true, message: data.message });
            });
        }));
    });
}
exports.deleteUnit = deleteUnit;
