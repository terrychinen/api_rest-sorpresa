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
exports.queryGetWithoutOffset = exports.queryOrderbyId = exports.queryDelete = exports.queryUpdate = exports.queryInsert = exports.queryGetBy = exports.queryGet = exports.query = void 0;
const database_1 = require("../database");
function query(queryString) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const query = yield conn.query(queryString);
            conn.end();
            if (!query)
                return ({ ok: false, status: 400, message: 'GET error', result: [] });
            return ({
                ok: true,
                status: 200,
                message: 'GET successful',
                result: query
            });
        }
        catch (e) {
            return ({ ok: false, status: 500, message: e.toString(), result: [] });
        }
    });
}
exports.query = query;
function queryGet(table, column, offset, state) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const query = yield conn.query(`SELECT * FROM ${table} WHERE state = ${state} ORDER BY ${column} DESC LIMIT 10 OFFSET ${offset}`);
            conn.end();
            if (!query)
                return ({ ok: false, status: 400, message: 'GET error: ' + table, result: [] });
            return ({
                ok: true,
                status: 200,
                message: 'GET successful: ' + table,
                result: query
            });
        }
        catch (e) {
            return ({ ok: false, status: 500, message: e.toString(), result: [] });
        }
    });
}
exports.queryGet = queryGet;
function queryGetBy(table, columnName, value, state) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const query = yield conn.query(`SELECT * FROM ${table} WHERE ${columnName} = "${value}" AND state = ${state}`);
            conn.end();
            if (!query)
                return ({ ok: false, status: 400, message: 'GET BY ' + columnName + ' error: ' + table, result: [] });
            return ({
                ok: true,
                status: 200,
                message: 'GET BY ' + columnName + ' successful: ' + table,
                result: query
            });
        }
        catch (e) {
            return ({ ok: false, status: 500, message: e.toString(), result: [] });
        }
    });
}
exports.queryGetBy = queryGetBy;
function queryInsert(table, value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const query = yield conn.query('INSERT INTO ' + table + ' SET ?', value);
            conn.end();
            if (!query)
                return ({ ok: false, status: 400, message: 'INSERT error: ' + table });
            return ({ ok: true, status: 200, message: 'INSERT successful: ' + table });
        }
        catch (e) {
            return ({ ok: false, status: 500, message: e.toString() });
        }
    });
}
exports.queryInsert = queryInsert;
function queryUpdate(table, columnName, value, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const query = yield conn.query('UPDATE ' + table + ' SET ? WHERE ' + columnName + ' = ?', [value, id]);
            conn.end();
            if (!query)
                return ({ ok: false, status: 400, message: 'UPDATE error' + table });
            return ({ ok: true, status: 200, message: 'UPDATE successful: ' + table });
        }
        catch (e) {
            return ({ ok: false, status: 500, message: e.toString() });
        }
    });
}
exports.queryUpdate = queryUpdate;
function queryDelete(table, columnName, value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const query = yield conn.query(`DELETE FROM ${table} WHERE ${columnName} = ${value}`);
            conn.end();
            if (!query)
                return ({ ok: false, status: 400, message: 'DELETE error' + table });
            return ({ ok: true, status: 200, message: 'DELETE successful: ' + table });
        }
        catch (e) {
            return ({ ok: false, status: 500, message: e.toString() });
        }
    });
}
exports.queryDelete = queryDelete;
function queryOrderbyId(table, columnName, value, offset, state) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const query = yield conn.query(`SELECT * FROM ${table} WHERE state = ${state} ORDER BY FIELD(${columnName}, ${value}) DESC LIMIT 10 OFFSET ${offset}`);
            conn.end();
            if (!query)
                return ({ ok: false, status: 400, message: 'GET error: ' + table, result: [] });
            return ({
                ok: true,
                status: 200,
                message: 'GET successful: ' + table,
                result: query
            });
        }
        catch (e) {
            return ({ ok: false, status: 500, message: e.toString(), result: [] });
        }
    });
}
exports.queryOrderbyId = queryOrderbyId;
function queryGetWithoutOffset(table, column, state) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const query = yield conn.query(`SELECT * FROM ${table} WHERE state = "${state}" ORDER BY ${column} DESC`);
            conn.end();
            if (!query)
                return ({ ok: false, status: 400, message: 'GET error: ' + table, result: [] });
            return ({
                ok: true,
                status: 200,
                message: 'GET successful: ' + table,
                result: query
            });
        }
        catch (e) {
            return ({ ok: false, status: 500, message: e.toString(), result: [] });
        }
    });
}
exports.queryGetWithoutOffset = queryGetWithoutOffset;
