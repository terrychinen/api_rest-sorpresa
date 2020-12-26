"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const unit_controller_1 = require("../controllers/unit.controller");
const router = express_1.Router();
/**
 * @api {get} /unit?offset=0&state=1 Obtener todas las unidades
 * @apiName ObtenerUnidades
 * @apiGroup Unit
 *
 * @apiHeaderExample {json} Header-Example:
 *    {
 *       "version": "xxxxx",
 *       "token": "xxxx.xxxx.xxxx"
 *    }
 *
 *
 * @apiParam {Number} offset Numero de indice
 * @apiParam {Number} state El estado de la unidad (0, 1)
 *
 * @apiSuccess {bool} ok Si la peticion ha sido exitosa o no
 * @apiSuccess {String} message Mensaje del servidor
 * @apiSuccess {String} result La lista de unidades
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            "ok": true,
            "message": "Query successful",
            "result": [
                {
                    "unit_id": 1,
                    "unit_name": "Litros",
                    "symbol": "L"
                    "state": 1
                },
                {
                    "unit_id": 2,
                    "unit_name": "Kilogramos",
                    "symbol": "Kg"
                    "state": 1
                }
            ]
 *     }
 *
 *
 *
 *
 *
 * @apiError UpdateApp Necesita actualizar la aplicación
 *
 * @apiErrorExample AppVersion: 406
 *     HTTP/1.1 406 Version error
 *     {
            "ok": false,
            "message": "Actualiza la apliación",
 *     }
 *
 *
 *
 *
 * @apiError OffsetOrStateNotFound El 'offset' o 'state' no ha sido encontrado
 *
 * @apiErrorExample OffsetOrStateNotFound: 405
 *     HTTP/1.1 405 Not Found
 *     {
            "ok": false,
            "message": "La variable 'offset' y 'state' son obligatorio!"
 *     }
 *
 *
 *
 * @apiError JWTNotFound El 'token' no ha sido encontrado
 *
 * @apiErrorExample JWTNotFound: 401
 *     HTTP/1.1 401 JWTNotFound
 *     {
            "ok": false,
            "name": "TokenExpiredError",
            "message": "jwt expired",
            "expiredAt": "2020-12-26T16:01:48.000Z"
 *     }
 *
 *
 *
 *
 * @apiError ServeError Error del servidor
 *
 * @apiErrorExample ServeError: 500
 *     HTTP/1.1 500 Internal Server Error
 *     {
            "ok": false,
            "message": "Mensaje de error del servidor"
 *     }
 *
 *
 */
router.route('/')
    .get(unit_controller_1.getUnits)
    .post(unit_controller_1.createUnit);
router.route('/search')
    .post(unit_controller_1.searchUnit);
router.route('/:unit_id')
    .get(unit_controller_1.getUnit)
    .put(unit_controller_1.updateUnit)
    .delete(unit_controller_1.deleteUnit);
router.route('/order_by_unitid/:unit_id')
    .get(unit_controller_1.getUnitsById);
router.route('/commodity/by_id')
    .get(unit_controller_1.getUnitsByCommodityId);
exports.default = router;
