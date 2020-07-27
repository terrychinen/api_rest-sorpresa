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
exports.deleteRole = exports.updateRole = exports.createRole = exports.getRole = exports.getRoles = void 0;
const database_1 = require("../database");
//================== OBTENER TODAS LOS ROLES ==================//
function getRoles(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const roles = yield conn.query('SELECT * FROM role');
            return res.status(200).json({
                ok: true,
                message: 'Query successful',
                Roles: roles[0]
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
exports.getRoles = getRoles;
//================== OBTENER UN ROL POR SU ID ==================//
function getRole(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.role_id;
            const conn = yield database_1.connect();
            const role = yield conn.query('SELECT * FROM role WHERE role_id = ?', [id]);
            return res.status(200).json({
                ok: true,
                message: 'Query successful',
                role: role[0]
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
exports.getRole = getRole;
//================== CREAR UN ROL ==================//
function createRole(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const role = req.body;
            const conn = yield database_1.connect();
            yield conn.query({
                sql: 'SELECT * FROM role WHERE role_name = ? LIMIT 1',
                values: role.role_name
            }, function (error, roleDB) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        return res.status(500).json({
                            ok: false,
                            message: 'Internal Server error'
                        });
                    }
                    if (roleDB[0]) {
                        return res.status(400).json({
                            ok: false,
                            message: 'Role already exists',
                        });
                    }
                    yield conn.query('INSERT INTO role SET ?', role);
                    return res.status(200).json({
                        ok: true,
                        message: 'Role created',
                        role
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
exports.createRole = createRole;
//================== ACTUALIZAR UN ROL ==================//
function updateRole(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.role_id;
            const updateRole = req.body;
            const conn = yield database_1.connect();
            yield conn.query({
                sql: 'SELECT * FROM role WHERE role_id = ? LIMIT 1',
                values: id
            }, function (error, roleDB) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        return res.status(500).json({
                            ok: false,
                            message: 'Internal Server error'
                        });
                    }
                    if (!roleDB[0]) {
                        return res.status(400).json({
                            ok: false,
                            message: 'The role does not exist'
                        });
                    }
                    yield conn.query('UPDATE role SET ? WHERE role_id = ?', [updateRole, id]);
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
exports.updateRole = updateRole;
//================== ELIMINAR UN ROL POR SU ID ==================//
function deleteRole(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.role_id;
            const conn = yield database_1.connect();
            conn.query({
                sql: 'SELECT * FROM role WHERE role_id = ? LIMIT 1',
                values: id
            }, function (error, roleDB) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        return res.status(500).json({
                            ok: false,
                            message: 'Internal Server error'
                        });
                    }
                    if (!roleDB[0]) {
                        return res.status(400).json({
                            ok: false,
                            message: 'The role does not exist'
                        });
                    }
                    yield conn.query('DELETE FROM role WHERE role_id = ?', [id]);
                    return res.json({
                        ok: true,
                        message: 'Role deleted',
                        role: id
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
exports.deleteRole = deleteRole;
