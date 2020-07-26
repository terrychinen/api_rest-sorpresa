"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const unit_controller_1 = require("../controllers/unit.controller");
const router = express_1.Router();
router.route('/')
    .get(unit_controller_1.getUnits)
    .post(unit_controller_1.createUnit);
exports.default = router;
