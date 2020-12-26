"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const router = express_1.Router();
/**
 * @api {get} /role?offset=0&state=1 Obtener todas las categorías
 * @apiName ObtenerCategorías
 * @apiGroup Categoría
 *
 * @apiHeaderExample {json} Header-Example:
 *    {
 *       "version": "xxxxx",
 *       "token": "xxxx.xxxx.xxxx"
 *    }
 *
 *
 * @apiParam {Number} offset Número de índice
 * @apiParam {Number} state El estado de la categoría (0, 1)
 *
 * @apiSuccess {bool} ok Si la petición ha sido exitosa o no
 * @apiSuccess {String} message Mensaje del servidor
 * @apiSuccess {String} result La lista de categorías
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            "ok": true,
            "message": "Query successful",
            "result": [
                {
                    "category_id": 1,
                    "category_name": "Leche",
                    "state": 1
                },
                {
                    "category_id": 2,
                    "category_name": "Envase",
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
 * @api {post} /unit Crear categoría
 * @apiName CrearCategoría
 * @apiGroup Categoría
 *
 * @apiHeaderExample {json} Header-Example:
 *    {
 *       "version": "xxxxx",
 *       "token": "xxxx.xxxx.xxxx"
 *    }
 *
 *
 * @apiParam {String} unit_name El nombre de la categoría
 * @apiParam {Number} state El estado de la categoría (0, 1)
 *
 * @apiSuccess {bool} ok Si la petición ha sido exitosa o no
 * @apiSuccess {String} message Mensaje del servidor
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
           "ok": true,
           "message": "Categoría creado correctamente"
 *     }
 *
 *
 *
 * @apiError UnitExists Ya existe el nombre de la categoría
 * @apiErrorExample UnitExists: 400
 *     HTTP/1.1 406 Unit exists
 *     {
           "ok": false,
           "message": "La categoría ya existe!",
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
    .get(category_controller_1.getCategories)
    .post(category_controller_1.createCategory);
/**
 * @api {post} /category/search Buscador de categoría
 * @apiName BuscarCategorías
 * @apiGroup Categoría
 *
 * @apiHeaderExample {json} Header-Example:
 *    {
 *       "version": "xxxxx",
 *       "token": "xxxx.xxxx.xxxx"
 *    }
 *
 *
 * @apiParam {Number} query     El nombre de la categoría
 * @apiParam {Number} state     El estado de la categoría (0, 1)
 *
 *
 * @apiSuccess {bool}       ok          Si la petición ha sido exitosa o no
 * @apiSuccess {String}     message     Mensaje del servidor
 * @apiSuccess {String}     result      La lista de categorías
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            "ok": true,
            "message": "Query successful",
            "result": [
                {
                    "category_id": 1,
                    "category_name": "Leche",
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
    .post(category_controller_1.searchCategory);
router.route('/:category_id')
    .get(category_controller_1.getCategory)
    .put(category_controller_1.updateCategory)
    .delete(category_controller_1.deleteCategory);
router.route('/search/:store_id')
    .post(category_controller_1.searchCategoryByStoreId);
router.route('/order_by_categoryid/:category_id')
    .get(category_controller_1.getCategoriesById);
router.route('/store/:store_id')
    .get(category_controller_1.getCategoriesByStores);
exports.default = router;
