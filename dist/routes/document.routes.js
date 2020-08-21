"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const document_controller_1 = require("../controllers/document.controller");
const router = express_1.Router();
router.route('/dni/:dni').get(document_controller_1.getFullNameByDni);
router.route('/dni').post(document_controller_1.getDniByName);
router.route('/ruc/:ruc')
    .get(document_controller_1.getDataByRuc);
exports.default = router;
