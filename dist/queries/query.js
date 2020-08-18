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
exports.queryDelete = exports.queryUpdate = exports.queryInsert = exports.queryGetBy = exports.queryGet = void 0;
const database_1 = require("../database");
function queryGet(table, offset) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const query = yield conn.query(`SELECT * FROM ${table} LIMIT 10 OFFSET ${offset}`);
            if (!query)
                return ({ ok: false, status: 400, error: 'GET error: ' + table, result: [] });
            return ({
                ok: true,
                status: 200,
                message: 'GET successful: ' + table,
                result: query
            });
        }
        catch (e) {
            return ({ ok: false, status: 500, error: e, result: [] });
        }
    });
}
exports.queryGet = queryGet;
function queryGetBy(table, columnName, value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const query = yield conn.query('SELECT * FROM ' + table + ' WHERE ' + columnName + ' = ?', [value]);
            if (!query)
                return ({ ok: false, status: 400, error: 'GET BY ' + columnName + ' error: ' + table, result: [] });
            return ({
                ok: true,
                status: 200,
                message: 'GET BY ' + columnName + ' successful: ' + table,
                result: query
            });
        }
        catch (e) {
            return ({ ok: false, status: 500, error: e, result: [] });
        }
    });
}
exports.queryGetBy = queryGetBy;
function queryInsert(table, value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const query = yield conn.query('INSERT INTO ' + table + ' SET ?', value);
            if (!query)
                return ({ ok: false, status: 400, error: 'INSERT error: ' + table });
            return ({ ok: true, status: 200, message: 'INSERT successful: ' + table });
        }
        catch (e) {
            return ({ ok: false, status: 500, error: e });
        }
    });
}
exports.queryInsert = queryInsert;
function queryUpdate(table, columnName, value, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const query = yield conn.query('UPDATE ' + table + ' SET ? WHERE ' + columnName + ' = ?', [value, id]);
            if (!query)
                return ({ ok: false, status: 400, error: 'UPDATE error' + table });
            return ({ ok: true, status: 200, message: 'UPDATE successful: ' + table });
        }
        catch (e) {
            return ({ ok: false, status: 500, error: e });
        }
    });
}
exports.queryUpdate = queryUpdate;
function queryDelete(table, columnName, value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const query = yield conn.query(`DELETE FROM ${table} WHERE ${columnName} = ${value}`);
            if (!query)
                return ({ ok: false, status: 400, error: 'DELETE error' + table });
            return ({ ok: true, status: 200, message: 'DELETE successful: ' + table });
        }
        catch (e) {
            return ({ ok: false, status: 500, error: e });
        }
    });
}
exports.queryDelete = queryDelete;
