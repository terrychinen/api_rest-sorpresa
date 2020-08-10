"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.tokenValidation = (req, res, next) => {
    let token = req.get('token');
    jsonwebtoken_1.default.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }
        req.user = decoded.user;
        next();
    });
};
