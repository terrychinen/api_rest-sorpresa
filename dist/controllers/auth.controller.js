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
exports.signUp = exports.signIn = void 0;
const database_1 = require("../database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_controller_1 = require("./token_controller");
const query_1 = require("../queries/query");
const search_query_1 = require("../queries/search.query");
const token_model_1 = require("../models/token.model");
const user_model_1 = require("../models/user.model");
const moment_1 = __importDefault(require("moment"));
function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const tableUser = 'user';
        const columnUsername = 'username';
        return yield search_query_1.checkIfDataExist(tableUser, columnUsername, body.username).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (!dataCheck.ok)
                return res.status(400).json({ ok: false, message: dataCheck.message });
            const userDB = dataCheck.result[0];
            const compare = yield bcrypt_1.default.compareSync(body.password, userDB.password);
            if (!compare)
                return res.status(400).json({ ok: false, message: 'The username or password is not correct' });
            if (userDB.state == 0) {
                return res.status(403).json({ ok: false, message: 'User deleted', username: userDB.username, state: 0 });
            }
            delete userDB.password;
            let token = jsonwebtoken_1.default.sign({ user: userDB }, process.env.SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
            return token_controller_1.saveNewToken(userDB, token).then(data => {
                if (!data.ok)
                    return res.status(400).json({ ok: false, message: data.message });
                return res.status(200).json({
                    ok: true,
                    message: 'Login successful!',
                    user: userDB,
                    token,
                    expireIn: process.env.TOKEN_EXPIRATION,
                    savedDate: moment_1.default().format('YYYY-MM-DD h:mm:ss')
                });
            });
        }));
    });
}
exports.signIn = signIn;
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.body;
            const tableName = 'user';
            const columnName = 'username';
            const conn = yield database_1.connect();
            return yield search_query_1.checkIfDataExist(tableName, columnName, user.username).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
                if (dataCheck.ok)
                    return res.status(dataCheck.status).json({ ok: false, message: dataCheck.message });
                let password = yield bcrypt_1.default.hashSync(user.password, 10);
                let newUser = new user_model_1.UserModel();
                newUser.role_id = user.role_id;
                newUser.first_name = user.first_name;
                newUser.last_name = user.last_name;
                newUser.username = user.username;
                newUser.password = password;
                newUser.phone = user.phone;
                newUser.email = user.email;
                newUser.street = user.street;
                newUser.state = user.state;
                yield conn.query({
                    sql: 'INSERT INTO user SET ?',
                    values: newUser
                }, function (error, resultUser) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (error)
                            return res.status(400).json({ ok: false, message: 'INSERT new User Error', error });
                        newUser.user_id = resultUser.insertID;
                        delete newUser.password;
                        delete newUser.street;
                        //GENERATE NEW TOKEN
                        let jwt = jsonwebtoken_1.default.sign({
                            user: newUser
                        }, process.env.SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
                        let token = new token_model_1.TokenModel();
                        token.token_key = jwt;
                        token.created_at = moment_1.default().format('YYYY-MM-DD h:mm:ss');
                        token.expires_in = Number(process.env.TOKEN_EXPIRATION);
                        yield conn.query({
                            sql: 'INSERT INTO token SET ?',
                            values: token
                        }, function (error, resultToken) {
                            return __awaiter(this, void 0, void 0, function* () {
                                if (error)
                                    return res.status(400).json({ ok: false, message: 'INSERT Token Error', error });
                                const user = new user_model_1.UserModel();
                                const user_id = resultUser.insertId;
                                user.token_id = resultToken.insertId;
                                return query_1.queryUpdate(tableName, 'user_id', user, user_id).then(data => {
                                    if (!data.ok)
                                        return res.status(data.status).json({ ok: false, message: data.message });
                                    return res.status(data.status).json({ ok: true, message: 'User created successfully' });
                                });
                            });
                        });
                    });
                });
            }));
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: 'Internal Server error (Create user)'
            });
        }
    });
}
exports.signUp = signUp;
