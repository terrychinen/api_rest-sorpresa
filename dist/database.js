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
exports.connect = void 0;
const promise_1 = require("mysql2/promise");
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        //    const connection: Pool = await createPool({
        //         host: 'us-cdbr-east-02.cleardb.com',
        //         user: 'bcd20465993d1e',
        //         password: '298145dd',
        //         database: 'heroku_5d7a179d98846fd',
        //         connectionLimit: 100
        //     });
        const connection = yield promise_1.createPool({
            host: 'db-sorpresa-nyc1-23077-do-user-7913617-0.b.db.ondigitalocean.com',
            port: 25060,
            user: 'doadmin',
            password: 'yamcpgdqim4ofklp',
            database: 'defaultdb',
            connectionLimit: 200
        });
        return connection;
    });
}
exports.connect = connect;
