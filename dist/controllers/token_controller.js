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
            return res.status(406).json({ ok: false, message: 'El token es necesario!' });
        const queryCheckToken = `SELECT * FROM token WHERE token_key = "${token}"`;
        //VERIFICA SI EXISTE EL TOKEN
        return yield query_1.query(queryCheckToken).then((data) => __awaiter(this, void 0, void 0, function* () {
            if (data.result[0] == '')
                return res.status(404).json({ ok: false, message: 'No existe el token' });
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            const queryUser = `SELECT u.user_id, u.role_id, u.token_id, u.username, u.password, u.state,
                        (SELECT role_name FROM role r WHERE r.role_id = u.role_id)role_name,
                        (SELECT first_name FROM person p WHERE p.person_id = u.user_id)first_name,
                        (SELECT last_name FROM person p WHERE p.person_id = u.user_id)last_name
                        FROM user u WHERE u.user_id = "${userID}"`;
            //BUSCAMOS AL USUARIO CON SU ID
            return yield query_1.query(queryUser).then((dataUser) => __awaiter(this, void 0, void 0, function* () {
                if (!dataUser.ok)
                    return res.status(dataUser.status).json({ ok: false, message: dataUser.message });
                if (dataUser.result[0] == '')
                    return res.status(404).json({ ok: false, message: 'El usuario no existe!' });
                const userDB = dataUser.result[0][0];
                delete userDB.role_id;
                delete userDB.password;
                delete userDB.role_name;
                const tokenID = userDB.token_id;
                let newToken = jsonwebtoken_1.default.sign({ user: userDB }, process.env.SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
                return yield updateToken(res, String(tokenID), newToken, Number(process.env.TOKEN_EXPIRATION));
            }));
        }));
    });
}
exports.refreshToken = refreshToken;
function updateToken(res, tokenID, newToken, expiresIn) {
    return __awaiter(this, void 0, void 0, function* () {
        let token = new token_model_1.TokenModel();
        token.token_key = newToken;
        token.created_at = moment_1.default().format('YYYY-MM-DD h:mm:ss');
        token.expires_in = expiresIn;
        const queryUpdate = `UPDATE token SET token_key = "${token.token_key}", created_at = "${token.created_at}",  
                        expires_in = "${token.expires_in}" WHERE token_id = "${tokenID}"`;
        return yield query_1.query(queryUpdate).then(dataUpdate => {
            if (!dataUpdate.ok)
                return res.status(dataUpdate.status).json({ ok: false, message: dataUpdate.message });
            return res.status(200).json({
                ok: true,
                message: 'Token updated',
                token: newToken,
                expires_in: expiresIn
            });
        });
    });
}
