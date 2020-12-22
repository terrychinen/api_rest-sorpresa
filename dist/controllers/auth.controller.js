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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_controller_1 = require("./token_controller");
const query_1 = require("../queries/query");
const token_model_1 = require("../models/token.model");
const user_model_1 = require("../models/user.model");
const moment_1 = __importDefault(require("moment"));
function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const queryGet = `SELECT user_id, role_id, token_id, username, password, state, 
                            (SELECT role_name FROM role r WHERE r.role_id = u.role_id)role_name, 
                            (SELECT first_name FROM person p WHERE p.person_id = u.user_id)first_name, 
                            (SELECT last_name FROM person p WHERE p.person_id = u.user_id)last_name 
                            FROM user u WHERE username = "${body.username}"`;
        return yield query_1.query(queryGet).then((data) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!data.ok)
                    return res.status(data.status).json({ ok: false, message: data.message });
                const userDB = data.result[0][0];
                if (userDB == null) {
                    return res.status(400).json({ ok: false, message: 'El usuario o la contraseña es incorrecto' });
                }
                const compare = yield bcrypt_1.default.compareSync(body.password, userDB.password);
                if (!compare)
                    return res.status(400).json({ ok: false, message: 'El usuario o la contraseña es incorrecto' });
                if (userDB.state == 0) {
                    return res.status(403).json({ ok: false, message: 'Cuenta eliminado', username: userDB.username, state: 0 });
                }
                delete userDB.password;
                let token = jsonwebtoken_1.default.sign({ user: userDB }, process.env.SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
                return token_controller_1.saveNewToken(userDB, token).then(data => {
                    if (!data.ok)
                        return res.status(400).json({ ok: false, message: data.message });
                    return res.status(200).json({
                        ok: true,
                        message: 'Inicio de sesión correcto!',
                        user: userDB,
                        token,
                        expires_in: process.env.TOKEN_EXPIRATION,
                        date: moment_1.default().format('YYYY-MM-DD h:mm:ss')
                    });
                });
            }
            catch (e) {
                return res.status(400).json({
                    ok: false,
                    message: e.toString()
                });
            }
        }));
    });
}
exports.signIn = signIn;
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const person = req.body;
            const user = req.body;
            const queryGet = `SELECT * FROM user WHERE username = "${user.username}"`;
            return yield query_1.query(queryGet).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
                if (!dataCheck.ok) {
                    return res.status(400).json({ ok: false, message: dataCheck.message });
                }
                const userDB = dataCheck.result[0][0];
                if (userDB != null) {
                    return res.status(400).json({ ok: false, message: 'El nombre de usuario ya existe' });
                }
                const queryInsertPerson = `INSERT INTO person (first_name, last_name, dni, ruc, photo, state) 
                                        VALUES ('${person.first_name}', '${person.last_name}', '${person.dni}', '${person.ruc}', 
                                        '${person.photo}', '${person.state}')`;
                return yield query_1.query(queryInsertPerson).then((dataInsertPerson) => __awaiter(this, void 0, void 0, function* () {
                    if (!dataInsertPerson.ok) {
                        return res.status(dataInsertPerson.status).json({ ok: false, message: dataInsertPerson.message });
                    }
                    const personId = dataInsertPerson.result[0].insertId;
                    let password = yield bcrypt_1.default.hashSync(user.password, 10);
                    const queryInsertUser = `INSERT INTO user (user_id, role_id, username, password, state) 
                                         VALUES ('${personId}', '${user.role_id}', '${user.username}', 
                                         '${password}', '${user.state}')`;
                    return yield query_1.query(queryInsertUser).then((dataInsertUser) => __awaiter(this, void 0, void 0, function* () {
                        if (!dataInsertUser.ok) {
                            return res.status(dataInsertUser.status).json({ ok: false, message: dataInsertUser.message });
                        }
                        const newUser = new user_model_1.UserModel();
                        newUser.user_id = personId;
                        newUser.username = user.username;
                        let jwt = jsonwebtoken_1.default.sign({
                            user: newUser
                        }, process.env.SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
                        let token = new token_model_1.TokenModel();
                        token.token_key = jwt;
                        token.created_at = moment_1.default().format('YYYY-MM-DD h:mm:ss');
                        token.expires_in = Number(process.env.TOKEN_EXPIRATION);
                        const queryInsertToken = `INSERT INTO token (token_key, created_at, expires_in, state)
                                              VALUES ('${token.token_key}', '${token.created_at}', '${token.expires_in}', '1')`;
                        return yield query_1.query(queryInsertToken).then((dataInsertToken) => __awaiter(this, void 0, void 0, function* () {
                            if (!dataInsertToken.ok)
                                return res.status(dataInsertToken.status).json({ ok: false, message: dataInsertToken.message });
                            const tokenId = dataInsertToken.result[0].insertId;
                            const queryUpdateUserToken = `UPDATE user SET token_id = ${tokenId} WHERE user_id = ${newUser.user_id}`;
                            return yield query_1.query(queryUpdateUserToken).then(dataUpdateUserToken => {
                                if (!dataUpdateUserToken.ok)
                                    return res.status(dataUpdateUserToken.status).json({ ok: false, message: dataUpdateUserToken.message });
                                return res.status(dataUpdateUserToken.status).json({ ok: true, message: 'Usuario creado satisfactoriamente' });
                            });
                        }));
                    }));
                }));
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
