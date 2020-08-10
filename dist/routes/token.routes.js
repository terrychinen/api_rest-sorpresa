"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_controller_1 = require("../controllers/token_controller");
const router = express_1.Router();
router.route('/refresh')
    .post(token_controller_1.refreshToken);
exports.default = router;
