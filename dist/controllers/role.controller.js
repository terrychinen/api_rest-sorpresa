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
const search_query_1 = require("../queries/search.query");
const query_1 = require("../queries/query");
//================== OBTENER TODAS LOS ROLES ==================//
function getRoles(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tableName = 'role';
        return yield query_1.queryGet(tableName).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, error: data.error });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getRoles = getRoles;
//================== OBTENER UN ROL POR SU ID ==================//
function getRole(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const search = req.params.role_id;
        const tableName = 'role';
        const columnName = 'role_id';
        return yield query_1.queryGetBy(tableName, columnName, search).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, error: data.error });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getRole = getRole;
//================== CREAR UN ROL ==================//
function createRole(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const role = req.body;
        const tableName = 'role';
        const columnName = 'role_name';
        //VERIFICA SI EL ROL EXISTE
        return yield search_query_1.checkIfDataExist(tableName, columnName, role.role_name).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (dataCheck.ok)
                return res.status(dataCheck.status).json({ ok: true, message: dataCheck.message });
            //INSERTA EL NUEVO ROL
            return yield query_1.queryInsert(tableName, role).then(data => {
                if (!data.ok)
                    return res.status(data.status).json({ ok: false, message: data.error });
                return res.status(data.status).json({ ok: true, message: data.message });
            });
        }));
    });
}
exports.createRole = createRole;
//================== ACTUALIZAR UN ROL ==================//
function updateRole(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const role = req.body;
        const tableName = 'role';
        const columnName = 'role_id';
        //VERIFICA SI EXISTE EL ID PARA ACTUALIZAR
        return yield search_query_1.checkIfDataExist(tableName, columnName, role.role_id).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (!dataCheck.ok) {
                return res.status(dataCheck.status).json({ ok: false, message: dataCheck.message });
            }
            //VERIFICA SI YA HAY UN ROL CON EL MISMO NOMBRE PARA NO ACTUALIZAR
            return yield search_query_1.checkIfDataExist(tableName, columnName, role.role_name).then((dataCheckRepeat) => __awaiter(this, void 0, void 0, function* () {
                if (dataCheckRepeat.ok) {
                    return res.status(dataCheckRepeat.status).json({ ok: false, message: dataCheckRepeat.message });
                }
                //ACTUALIZA EL REGISTRO
                return yield query_1.queryUpdate(tableName, columnName, role, role.role_id).then(data => {
                    if (!data.ok)
                        return res.status(data.status).json({ ok: false, error: data.error });
                    return res.status(data.status).json({ ok: true, message: data.message });
                });
            }));
        }));
    });
}
exports.updateRole = updateRole;
//================== ELIMINAR UN ROL POR SU ID ==================//
function deleteRole(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tableName = 'role';
        const columnName = 'role_id';
        const roleId = req.params.role_id;
        return yield search_query_1.checkIfDataExist(tableName, columnName, roleId).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (!dataCheck.ok) {
                return res.status(dataCheck.status).json({ ok: false, message: dataCheck.message });
            }
            return yield query_1.queryDelete(tableName, columnName, roleId).then(data => {
                if (!data.ok)
                    return res.status(data.status).json({ ok: false, error: data.error });
                return res.status(data.status).json({ ok: true, message: data.message });
            });
        }));
    });
}
exports.deleteRole = deleteRole;
