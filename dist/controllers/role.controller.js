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
exports.deleteRole = exports.updateRole = exports.createRole = exports.searchRole = exports.getRole = exports.getRoles = void 0;
const query_1 = require("../queries/query");
//================== OBTENER TODAS LOS ROLES ==================//
function getRoles(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const offset = Number(req.query.offset);
        const state = Number(req.query.state);
        if (Number.isNaN(offset) || Number.isNaN(state)) {
            return res.status(404).json({ ok: false, message: `La variable 'offset' y 'state' es obligatorio!` });
        }
        const queryGet = `SELECT * FROM role WHERE state = ${state} ORDER BY role_id DESC LIMIT 10 OFFSET ${offset}`;
        return yield query_1.query(queryGet).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getRoles = getRoles;
//================== OBTENER UN ROL POR SU ID ==================//
function getRole(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const search = req.params.role_id;
        const state = req.params.state;
        const queryGet = `SELECT * FROM role WHERE role_id = "${search}" AND state = ${state}`;
        return yield query_1.query(queryGet).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getRole = getRole;
//================== BUSCAR ROL POR SU NOMBRE  ==================//
function searchRole(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const search = req.body.query;
        const state = Number(req.body.state);
        const queryString = `SELECT * FROM role WHERE role_name LIKE "%${search}%" AND state = ${state} LIMIT 10`;
        return yield query_1.query(queryString).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.searchRole = searchRole;
//================== CREAR UN ROL ==================//
function createRole(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const role = req.body;
        const roleName = role.role_name;
        role.role_name = roleName.charAt(0).toUpperCase() + roleName.slice(1);
        const queryCheck = `SELECT * FROM role WHERE role_name = "${role.role_name}"`;
        return yield query_1.query(queryCheck).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (dataCheck.result[0][0] != null) {
                return res.status(400).json({ ok: false, message: 'El rol ya existe!' });
            }
            const queryInsert = `INSERT INTO role (role_name, state) VALUES ("${role.role_name}", "${role.state}")`;
            return yield query_1.query(queryInsert).then(data => {
                if (!data.ok)
                    return res.status(data.status).json({ ok: false, message: data.message });
                return res.status(data.status).json({ ok: true, message: 'Rol creado correctamente' });
            });
        }));
    });
}
exports.createRole = createRole;
//================== ACTUALIZAR UN ROL ==================//
function updateRole(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const role = req.body;
        const roleId = req.params.role_id;
        const roleName = role.role_name;
        if (roleName != '' || roleName != null) {
            role.role_name = roleName.charAt(0).toUpperCase() + roleName.slice(1);
        }
        else {
            role.role_name = '';
        }
        const queryCheckId = `SELECT * FROM role WHERE role_id = "${roleId}"`;
        return yield query_1.query(queryCheckId).then((dataCheckId) => __awaiter(this, void 0, void 0, function* () {
            if (dataCheckId.result[0][0] == null) {
                return res.status(400).json({ ok: false, message: `El rol con el id ${roleId} no existe!` });
            }
            ;
            const queryCheck = `SELECT * FROM role WHERE role_name = "${role.role_name}"`;
            return yield query_1.query(queryCheck).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
                if (dataCheck.result[0][0] != null) {
                    return res.status(400).json({ ok: false, message: 'El rol ya existe!' });
                }
                const queryUpdate = `UPDATE role SET role_name="${role.role_name}", state = "${role.state}" WHERE role_id = "${roleId}"`;
                return yield query_1.query(queryUpdate).then((dataUpdate) => __awaiter(this, void 0, void 0, function* () {
                    if (!dataUpdate.ok)
                        return res.status(dataUpdate.status).json({ ok: false, message: dataUpdate.message });
                    return res.status(dataUpdate.status).json({ ok: true, message: 'El rol se actualizó correctamente' });
                }));
            }));
        }));
    });
}
exports.updateRole = updateRole;
//================== ELIMINAR UN ROL POR SU ID ==================//
function deleteRole(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const roleId = req.params.role_id;
        const queryCheckId = `SELECT * FROM role WHERE role_id = "${roleId}"`;
        return yield query_1.query(queryCheckId).then((dataCheckId) => __awaiter(this, void 0, void 0, function* () {
            if (dataCheckId.result[0][0] == null) {
                return res.status(400).json({ ok: false, message: `El rol con el id ${roleId} no existe!` });
            }
            ;
            const queryDelete = `DELETE role WHERE role_id = "${roleId}"`;
            return yield query_1.query(queryDelete).then(dataDelete => {
                if (!dataDelete.ok)
                    return res.status(dataDelete.status).json({ ok: false, message: dataDelete.message });
                return res.status(dataDelete.status).json({ ok: true, message: 'El rol se eliminó correctamente' });
            });
        }));
    });
}
exports.deleteRole = deleteRole;
