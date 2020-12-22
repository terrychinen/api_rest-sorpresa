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
exports.checkIfDataExist = void 0;
const database_1 = require("../database");
function checkIfDataExist(table, columnName, value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const data = yield conn.query('SELECT * FROM ' + table + ' WHERE ' + columnName + ' = ?', [value]);
            conn.end();
            if (Object.keys(data[0]).length === 0)
                return ({ ok: false, status: 200, message: 'No existe' });
            return ({ ok: true, status: 200, message: 'Ya existe', result: data[0] });
        }
        catch (e) {
            return ({ ok: false, status: 500, message: e });
        }
    });
}
exports.checkIfDataExist = checkIfDataExist;
