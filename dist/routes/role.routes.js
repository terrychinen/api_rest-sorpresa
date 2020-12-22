"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_controller_1 = require("../controllers/role.controller");
const router = express_1.Router();
router.route('/')
    .get(role_controller_1.getRoles)
    .post(role_controller_1.createRole);
router.route('/search')
    .post(role_controller_1.searchRole);
router.route('/:role_id')
    .get(role_controller_1.getRole)
    .put(role_controller_1.updateRole)
    .delete(role_controller_1.deleteRole);
exports.default = router;
