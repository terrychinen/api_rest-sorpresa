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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const database_1 = require("../database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const conn = yield database_1.connect();
        const username = body.username;
        const password = body.password;
        conn.query({
            sql: 'SELECT * FROM user WHERE username = ? AND password = ? AND state = 1',
            values: [username, password]
        }, function (error, user) {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    message: 'Internal Server error'
                });
            }
            if (!user[0]) {
                return res.status(400).json({
                    ok: false,
                    message: 'User not found!'
                });
            }
            delete user[0].password;
            console.log('SECRET:', process.env.SECRET);
            console.log('EXPIRATION:', process.env.TOKEN_EXPIRATION);
            let token = jsonwebtoken_1.default.sign({
                user: user[0]
            }, process.env.SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
            return res.status(200).json({
                ok: true,
                message: 'Login successful!',
                user: user[0],
                token
            });
        });
    });
}
exports.login = login;
