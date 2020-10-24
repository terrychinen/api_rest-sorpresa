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
exports.refreshToken = exports.saveNewToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const query_1 = require("../queries/query");
const token_model_1 = require("../models/token.model");
const moment_1 = __importDefault(require("moment"));
const user_model_1 = require("../models/user.model");
function saveNewToken(user, token) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!token)
            return ({ ok: false, message: 'The token is required' });
        const queryString = `SELECT * FROM user WHERE user_id = ${user.user_id}`;
        //VERIFICA SI EXISTE EL USUARIO
        return yield query_1.query(queryString).then((data) => __awaiter(this, void 0, void 0, function* () {
            const dataCheck = data.result[0][0];
            if (dataCheck == null) {
                return ({ ok: false, message: 'No existe' });
            }
            const jwt = new token_model_1.TokenModel();
            jwt.token_key = token;
            jwt.created_at = moment_1.default().format('YYYY-MM-DD h:mm:ss');
            jwt.expires_in = Number(process.env.TOKEN_EXPIRATION);
            const queryUpdate = `UPDATE token SET token_key='${jwt.token_key}', created_at='${jwt.created_at}', 
                             expires_in='${jwt.expires_in}' WHERE token_id = ${user.token_id}`;
            //GUARDA EL TOKEN
            return yield query_1.query(queryUpdate).then(dataUpdate => {
                if (!dataUpdate.ok)
                    return ({ ok: false, message: dataUpdate.message });
                return ({ ok: dataUpdate.ok, message: 'Update ok' });
            });
        }));
    });
}
exports.saveNewToken = saveNewToken;
function refreshToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const token = body.token;
        const userID = body.user_id;
        if (!token)
            return res.status(406).json({ ok: false, message: 'The token is required' });
        const queryString = `SELECT * FROM token WHERE token_key = ${token}`;
        return yield query_1.query(queryString).then((data) => __awaiter(this, void 0, void 0, function* () {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message, result: data.result });
            const queryString = `SELECT user_id, role_id, token_id, username, password, state,
                                (SELECT role_name FROM role r WHERE r.role_id = u.role_id)role_name,
                                (SELECT first_name FROM person p WHERE p.user_id = u.user_id)first_name,
                                (SELECT last_name FROM person p WHERE p.user_id = u.user_id)last_name,
                                FROM user u WHERE user_id = "${userID}"`;
            return yield query_1.query(queryString).then((dataUser) => __awaiter(this, void 0, void 0, function* () {
                const resultJSON = dataUser.result[0][0];
                const user = new user_model_1.UserModel();
                user.user_id = resultJSON.user_id;
                user.role_id = resultJSON.role_id;
                user.token_id = resultJSON.token_id;
                user.first_name = resultJSON.first_name;
                user.last_name = resultJSON.last_name;
                user.username = resultJSON.username;
                user.phone = resultJSON.phone;
                user.email = resultJSON.email;
                user.state = resultJSON.state;
                let newToken = jsonwebtoken_1.default.sign({ user: user }, process.env.SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
                return yield updateToken(req, res, userID, newToken, Number(process.env.TOKEN_EXPIRATION));
            }));
        }));
    });
}
exports.refreshToken = refreshToken;
function updateToken(req, res, userID, newToken, expiresIn) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = `SELECT user_id FROM user WHERE user_id = "${userID}"`;
        return yield query_1.query(queryString).then((data) => __awaiter(this, void 0, void 0, function* () {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            let token = new token_model_1.TokenModel();
            token.token_key = newToken;
            token.created_at = moment_1.default().format('YYYY-MM-DD h:mm:ss');
            token.expires_in = expiresIn;
            const queryUpdate = `UPDATE token SET ${token} WHERE user_id = ${userID}`;
            return yield query_1.query(queryUpdate).then(dataUpdate => {
                if (!dataUpdate.ok)
                    return res.status(dataUpdate.status).json({ ok: false, message: dataUpdate.message });
                return res.status(200).json({
                    ok: true,
                    message: 'Token updated',
                    token: newToken,
                    expiresIn
                });
            });
        }));
    });
}
