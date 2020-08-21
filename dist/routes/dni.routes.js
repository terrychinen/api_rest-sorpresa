"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dni_controller_1 = require("../controllers/dni.controller");
const router = express_1.Router();
router.route('/:dni')
    .get(dni_controller_1.getFullNameByDNI);
router.route('/:ruc')
    .get(dni_controller_1.getFullDataByRuc);
exports.default = router;
