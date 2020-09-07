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
const search_query_1 = require("../queries/search.query");
const query_1 = require("../queries/query");
const token_model_1 = require("../models/token.model");
const moment_1 = __importDefault(require("moment"));
const user_model_1 = require("../models/user.model");
function saveNewToken(user, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const tableName = 'user';
        const columnName = 'user_id';
        if (!token)
            return ({ ok: false, message: 'The token is required' });
        //VERIFICA SI EXISTE EL USUARIO
        return yield search_query_1.checkIfDataExist(tableName, columnName, user.user_id).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (!dataCheck.ok) {
                return ({ ok: false, message: dataCheck.message });
            }
            const jwt = new token_model_1.TokenModel();
            jwt.token_key = token;
            jwt.created_at = moment_1.default().format('YYYY-MM-DD h:mm:ss');
            jwt.expires_in = Number(process.env.TOKEN_EXPIRATION);
            //ACTUALIZA EL NUEVO TOKEN AL DB
            return yield query_1.queryUpdate('token', 'token_id', jwt, user.token_id).then(data => {
                if (!data.ok)
                    return ({ ok: data.ok, message: data.message });
                return ({ ok: data.ok, message: 'Update ok' });
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
        const tableToken = 'token';
        const columnToken = 'token_key';
        const tableUser = 'user';
        const columnUserId = 'user_id';
        if (!token)
            return res.status(406).json({ ok: false, message: 'The token is required' });
        return yield query_1.queryGetBy(tableToken, columnToken, token, '1').then((dataToken) => __awaiter(this, void 0, void 0, function* () {
            if (!dataToken.ok)
                return res.status(dataToken.status).json({ ok: false, message: dataToken.message });
            return yield query_1.queryGetBy(tableUser, columnUserId, userID, '1').then((dataUser) => __awaiter(this, void 0, void 0, function* () {
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
        const tableUser = 'user';
        const columnUserID = 'user_id';
        yield query_1.queryGetBy(tableUser, columnUserID, userID, '1').then((dataToken) => __awaiter(this, void 0, void 0, function* () {
            if (!dataToken.ok)
                return res.status(dataToken.status).json({ ok: false, message: dataToken.message });
            const tableToken = 'token';
            const columnTokenId = 'token_id';
            let token = new token_model_1.TokenModel();
            token.token_key = newToken;
            token.created_at = moment_1.default().format('YYYY-MM-DD h:mm:ss');
            token.expires_in = expiresIn;
            yield query_1.queryUpdate(tableToken, columnTokenId, token, userID).then(dataUpdate => {
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
