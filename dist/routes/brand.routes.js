"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const brand_controller_1 = require("../controllers/brand.controller");
const router = express_1.Router();
/**
 * @api {get} /brand?offset=0&state=1 Obtener todas las marcas
 * @apiName ObtenerMarcas
 * @apiGroup Marca
 *
 * @apiHeaderExample {json} Header-Example:
 *    {
 *       "version": "xxxxx",
 *    }
 *
 *
 * @apiParam {Number} offset Número de índice
 * @apiParam {Number} state El estado de la marca (0, 1)
 *
 * @apiSuccess {bool} ok Si la petición ha sido exitosa o no
 * @apiSuccess {String} message Mensaje del servidor
 * @apiSuccess {String} result La lista de marcas
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            "ok": true,
            "message": "Query successful",
            "result": [
                {
                    "brand_id": 1,
                    "brand_name": "Gloria",
                    "state": 1
                },
                {
                    "brand_id": 2,
                    "brand_name": "Otto kunz",
                    "state": 1
                }
            ]
 *     }
 *
 *
 *
 *
 *
 * @apiError AppVersion Necesita actualizar la aplicación
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
  * @api {post} /brand Crear Marca
  * @apiName CrearMarca
  * @apiGroup Marca
  *
  * @apiHeaderExample {json} Header-Example:
  *    {
  *       "version": "xxxxx",
  *       "token": "xxxx.xxxx.xxxx"
  *    }
  *
  *
  * @apiParam {String} brand_name El nombre de la marca
  * @apiParam {Number} state El estado de la marca (0, 1)
  *
  * @apiSuccess {bool} ok Si la petición ha sido exitosa o no
  * @apiSuccess {String} message Mensaje del servidor
  *
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
            "ok": true,
            "message": "Marca creado correctamente"
  *     }
  *
  *
  *
  * @apiError BrandExists Ya existe la marca
  * @apiErrorExample BrandExists: 400
  *     HTTP/1.1 406 Brand exists
  *     {
            "ok": false,
            "message": "La marca ya existe!",
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
  * @apiError AppVersion Necesita actualizar la aplicación
  * @apiErrorExample AppVersion: 406
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
    .get(brand_controller_1.getBrands)
    .post(brand_controller_1.createBrand);
/**
* @api {post} /brand/search Buscador de la marca
* @apiName BuscarMarcas
* @apiGroup Marca
*
* @apiHeaderExample {json} Header-Example:
*    {
*       "version": "xxxxx",
*       "token": "xxxx.xxxx.xxxx"
*    }
*
*
* @apiParam {Number} query     El nombre de la marca
* @apiParam {Number} state     El estado de la marca (0, 1)
*
*
* @apiSuccess {bool}       ok          Si la petición ha sido exitosa o no
* @apiSuccess {String}     message     Mensaje del servidor
* @apiSuccess {String}     result      La lista de marcas
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
          "ok": true,
          "message": "Query successful",
          "result": [
              {
                  "brand_id": 1,
                  "brand_name": "Gloria",
                  "state": 1
              }
          ]
*     }
*
*
*
*
*
*
* @apiError AppVersion Necesita actualizar la aplicación
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
    .post(brand_controller_1.searchBrand);
/**
 * @api {put} /brand/:brand_id Actualizar Marca
 * @apiName ActualizarMarca
 * @apiGroup Marca
 *
 * @apiHeaderExample {json} Header-Example:
 *    {
 *       "version": "xxxxx",
 *       "token": "xxxx.xxxx.xxxx"
 *    }
 *
 *
 * @apiParam {Number} brand_id El ID de la marca (este ID tiene que ir en el URL)
 * @apiParam {String} brand_name El nombre de la marca
 * @apiParam {Number} state El estado de la marca (0, 1)
 *
 * @apiSuccess {bool} ok Si la petición ha sido exitosa o no
 * @apiSuccess {String} message Mensaje del servidor
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
           "ok": true,
           "message": "Marca actualizado correctamente"
 *     }
 *
 *
 *
 *
 *
 *
 *
 *
 * @apiError BrandExists Ya existe la marca
 * @apiErrorExample BrandExists: 400
 *     HTTP/1.1 400 Brand exists
 *     {
           "ok": false,
           "message": "La marca ya existe!",
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
 * @apiError BrandIDNotFound El ID de la marca no existe
 * @apiErrorExample BrandIDNotFound: 405
 *     HTTP/1.1 405 Brand ID Not Found
 *     {
           "ok": false,
           "message": "EL ID de la marca no existe!",
 *     }
 *
 *
 *
 * @apiError AppVersion Necesita actualizar la aplicación
 * @apiErrorExample AppVersion: 406
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
 * @apiErrorExample ServeError: 500
 *     HTTP/1.1 500 Internal Server Error
 *     {
           "ok": false,
           "message": "Mensaje de error del servidor",
 *     }
 *
 */
/**
 * @api {delete} /brand/:brand_id Eliminar Marca
 * @apiName EliminarMarca
 * @apiGroup Marca
 *
 * @apiHeaderExample {json} Header-Example:
 *    {
 *       "version": "xxxxx",
 *       "token": "xxxx.xxxx.xxxx"
 *    }
 *
 *
 * @apiParam {Number} brand_id El ID de la marca (este ID tiene que ir en el URL)
 *
 * @apiSuccess {bool} ok Si la petición ha sido exitosa o no
 * @apiSuccess {String} message Mensaje del servidor
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
           "ok": true,
           "message": "La Marca ha sido eliminado correctamente"
 *     }
 *
 *
 *
 *
 *
 *
 *
 *
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
 * @apiError BrandIDNotFound El ID de la marca no existe
 * @apiErrorExample BrandIDNotFound: 405
 *     HTTP/1.1 405 Brand ID Not Found
 *     {
           "ok": false,
           "message": "EL ID de la marca no existe!",
 *     }
 *
 *
 *
 *
 *
 * @apiError AppVersion Necesita actualizar la aplicación
 * @apiErrorExample AppVersion: 406
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
 * @apiErrorExample ServeError: 500
 *     HTTP/1.1 500 Internal Server Error
 *     {
           "ok": false,
           "message": "Mensaje de error del servidor",
 *     }
 *
 */
router.route('/:brand_id')
    .put(brand_controller_1.updateBrand)
    .delete(brand_controller_1.deleteBrand);
exports.default = router;
