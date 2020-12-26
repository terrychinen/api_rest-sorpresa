"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_controller_1 = require("../controllers/store.controller");
const router = express_1.Router();
/**
 * @api {get} /store?offset=0&state=1 Obtener todos los almacenes
 * @apiName ObtenerAlmacenes
 * @apiGroup Almacen
 *
 * @apiHeaderExample {json} Header-Example:
 *    {
 *       "version": "xxxxx",
 *       "token": "xxxx.xxxx.xxxx"
 *    }
 *
 *
 * @apiParam {Number} offset Número de índice
 * @apiParam {Number} state El estado del almacen (0, 1)
 *
 * @apiSuccess {bool} ok Si la petición ha sido exitosa o no
 * @apiSuccess {String} message Mensaje del servidor
 * @apiSuccess {String} result La lista de almacenes
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            "ok": true,
            "message": "Query successful",
            "result": [
                {
                    "store_id": 1,
                    "store_name": "Almacen A",
                    "state": 1
                },
                {
                    "store_id": 2,
                    "store_name": "Almacen B",
                    "state": 1
                }
            ]
 *     }
 *
 *
 *
 * @apiError UpdateApp Necesita actualizar la aplicación
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
 * @apiErrorExample ServeError: 500
 *     HTTP/1.1 500 Internal Server Error
 *     {
            "ok": false,
            "message": "Mensaje de error del servidor"
 *     }
 *
 *
 */
/**
 * @api {post} /store Crear almacen
 * @apiName CrearAlmacen
 * @apiGroup Almacen
 *
 * @apiHeaderExample {json} Header-Example:
 *    {
 *       "version": "xxxxx",
 *       "token": "xxxx.xxxx.xxxx"
 *    }
 *
 *
 * @apiParam {String} store_name El nombre del almacen
 * @apiParam {Number} state El estado del almacen (0, 1)
 *
 * @apiSuccess {bool} ok Si la petición ha sido exitosa o no
 * @apiSuccess {String} message Mensaje del servidor
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
           "ok": true,
           "message": "Almacen creado correctamente"
 *     }
 *
 *
 *
 * @apiError UnitExists Ya existe el almacen
 * @apiErrorExample QuantityExists: 400
 *     HTTP/1.1 406 Quantity exists
 *     {
           "ok": false,
           "message": "El almacen ya existe!",
 *     }
 *
 *
 *
 * @apiError JWTNotFound El 'token' no ha sido encontrado
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
 * @apiError UpdateApp Necesita actualizar la aplicación
 *
 * @apiErrorExample UpdateApp: 406
 *     HTTP/1.1 406 Need to update
 *     {
           "ok": false,
           "message": "Actualiza la apliación",
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
           "message": "Mensaje de error del servidor",
 *     }
 *
 */
router.route('/')
    .get(store_controller_1.getStores)
    .post(store_controller_1.createStore);
/**
 * @api {post} /store/search Buscador de almacenes
 * @apiName BuscarAlamcenes
 * @apiGroup Almacen
 *
 * @apiHeaderExample {json} Header-Example:
 *    {
 *       "version": "xxxxx",
 *       "token": "xxxx.xxxx.xxxx"
 *    }
 *
 *
 * @apiParam {Number} query     El nombre del almacen
 * @apiParam {Number} state     El estado del almacen (0, 1)
 *
 *
 * @apiSuccess {bool}       ok          Si la petición ha sido exitosa o no
 * @apiSuccess {String}     message     Mensaje del servidor
 * @apiSuccess {String}     result      La lista de almacenes
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            "ok": true,
            "message": "Query successful",
            "result": [
                {
                   "store_id": 1,
                    "store_name": "Almacen A",
                    "state": 1
                }
            ]
 *     }
 *
 *
 *
 * @apiError UpdateApp Necesita actualizar la aplicación
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
 * @apiError StateNotFound El 'state' no ha sido encontrado
 * @apiErrorExample StateNotFound: 405
 *     HTTP/1.1 405 Not Found
 *     {
            "ok": false,
            "message": "La variable 'state' son obligatorio!"
 *     }
 *
 *
 *
 * @apiError JWTNotFound El 'token' no ha sido encontrado
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
 * @apiErrorExample ServeError: 500
 *     HTTP/1.1 500 Internal Server Error
 *     {
            "ok": false,
            "message": "Mensaje de error del servidor"
 *     }
 *
 *
 */
router.route('/search')
    .post(store_controller_1.searchStore);
router.route('/commodity')
    .get(store_controller_1.getStoresByCommodityId);
router.route('/:store_id')
    .get(store_controller_1.getStore)
    .put(store_controller_1.updateStore)
    .delete(store_controller_1.deleteStore);
router.route('/order/by_storeid')
    .get(store_controller_1.getStoresOrderById);
exports.default = router;
