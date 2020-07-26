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
const database_1 = require("../database");
//================== OBTENER TODAS LAS UNIDADES ==================//
function getUnits(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const units = yield conn.query('SELECT * FROM unit');
            return res.status(200).json({
                ok: true,
                message: 'Query successful',
                Units: units[0]
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: 'Internal Server error',
            });
        }
    });
}
exports.getUnits = getUnits;
//================== OBTENER UNA UNIDAD POR SU ID ==================//
function getUnit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.unit_id;
            const conn = yield database_1.connect();
            const unit = yield conn.query('SELECT * FROM unit WHERE category_id = ?', [id]);
            return res.status(200).json({
                ok: true,
                message: 'Query successful',
                unit: unit[0]
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: 'Internal Server error'
            });
        }
    });
}
exports.getUnit = getUnit;
//================== CREAR UNA UNIDAD ==================//
function createUnit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const unit = req.body;
            const conn = yield database_1.connect();
            yield conn.query({
                sql: 'SELECT * FROM unit WHERE unit_name = ? LIMIT 1',
                values: unit.unit_name
            }, function (error, unitDB) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        return res.status(500).json({
                            ok: false,
                            message: 'Internal Server error'
                        });
                    }
                    if (unitDB[0]) {
                        return res.status(400).json({
                            ok: false,
                            message: 'Unit name already exists',
                        });
                    }
                    yield conn.query('INSERT INTO unit SET ?', unit);
                    return res.status(200).json({
                        ok: true,
                        message: 'Unit created',
                        unit
                    });
                });
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                messsage: 'Internal Server error'
            });
        }
    });
}
exports.createUnit = createUnit;
//================== ACTUALIZAR UNA UNIDAD ==================//
function updateUnit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.unit_id;
            const updateUnit = req.body;
            const conn = yield database_1.connect();
            yield conn.query({
                sql: 'SELECT * FROM unit WHERE unit_id = ? LIMIT 1',
                values: id
            }, function (error, unitDB) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        return res.status(500).json({
                            ok: false,
                            message: 'Internal Server error'
                        });
                    }
                    if (!unitDB[0]) {
                        return res.status(400).json({
                            ok: false,
                            message: 'The unit does not exist'
                        });
                    }
                    yield conn.query('UPDATE unit SET ? WHERE unit_id = ?', [updateUnit, id]);
                    return res.status(200).json({
                        ok: true,
                        message: 'Unit updated',
                        unit: id
                    });
                });
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                messsage: 'Internal Server error'
            });
        }
    });
}
exports.updateUnit = updateUnit;
//================== ELIMINAR UNA UNIDAD POR SU ID ==================//
function deleteUnit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.unit_id;
            const conn = yield database_1.connect();
            conn.query({
                sql: 'SELECT * FROM unit WHERE unit_id = ? LIMIT 1',
                values: id
            }, function (error, unitDB) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        return res.status(500).json({
                            ok: false,
                            message: 'Internal Server error'
                        });
                    }
                    if (!unitDB[0]) {
                        return res.status(400).json({
                            ok: false,
                            message: 'The unit does not exist'
                        });
                    }
                    yield conn.query('DELETE FROM unit WHERE unit_id = ?', [id]);
                    return res.json({
                        ok: true,
                        message: 'Unit deleted',
                        unit: id
                    });
                });
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                messsage: 'Internal Server error'
            });
        }
    });
}
exports.deleteUnit = deleteUnit;
