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
exports.queryUpdate = exports.query = void 0;
const database_1 = require("../database");
function query(queryString) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const query = yield conn.query(queryString);
            conn.end();
            if (!query)
                return ({ ok: false, status: 400, message: 'Query error', result: [] });
            return ({
                ok: true,
                status: 200,
                message: 'Query successful',
                result: query
            });
        }
        catch (e) {
            return ({ ok: false, status: 500, message: e.toString(), result: [] });
        }
    });
}
exports.query = query;
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
