import { Router } from 'express';
import { searchUnit, getUnits, getUnitsById, createUnit, getUnit, updateUnit, deleteUnit, getUnitsByCommodityId } from '../controllers/unit.controller';

const router = Router();


/**
 * @api {get} /unit?offset=0&state=1 Obtener todas las unidades
 * @apiName ObtenerUnidades
 * @apiGroup Unidad
 * 
 * @apiHeaderExample {json} Header-Example:
 *    {
 *       "version": "xxxxx",
 *       "token": "xxxx.xxxx.xxxx"
 *    }
 * 
 * 
 * @apiParam {Number} offset    Número de índice
 * @apiParam {Number} state     El estado de la unidad (0, 1)
 *
 * 
 * @apiSuccess {bool}       ok          Si la petición ha sido exitosa o no
 * @apiSuccess {String}     message     Mensaje del servidor
 * @apiSuccess {String}     result      La lista de unidades
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
  * @api {post} /unit Crear unidad
  * @apiName CrearUnidad
  * @apiGroup Unidad
  * 
  * 
  * @apiHeaderExample {json} Header-Example:
  *    {
  *       "version": "xxxxx",
  *       "token": "xxxx.xxxx.xxxx"
  *    }
  * 
  * 
  * @apiParam {String}      unit_name    El nombre de la unidad
  * @apiParam {String}      symbol       El símbolo de la unidad 
  * @apiParam {Number}      state        El estado de la unidad (0, 1)
  * 
  * @apiSuccess {bool} ok Si la petición ha sido exitosa o no
  * @apiSuccess {String} message Mensaje del servidor
  * 
  * 
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
            "ok": true,
            "message": "Unidad creado correctamente"
  *     }
  *
  * 
  * 
  * 
  * 
  * 
  * 
  * @apiError UnitExists Ya existe la unidad
  * @apiErrorExample UnitExists: 400
  *     HTTP/1.1 406 Unit exists
  *     {
            "ok": false,
            "message": "La unidad ya existe!",
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
  * @apiErrorExample ServeError: 500
  *     HTTP/1.1 500 Internal Server Error
  *     {
            "ok": false,
            "message": "Mensaje de error del servidor",
  *     }
  * 
  */


router.route('/')
    .get(getUnits)
    .post(createUnit);












/**
 * @api {post} /unit/search Buscador de unidades
 * @apiName BuscarUnidades
 * @apiGroup Unidad
 * 
 * @apiHeaderExample {json} Header-Example:
 *    {
 *       "version": "xxxxx",
 *       "token": "xxxx.xxxx.xxxx"
 *    }
 * 
 * 
 * @apiParam {Number} query     El nombre de la unidad
 * @apiParam {Number} state     El estado de la unidad (0, 1)
 *
 * 
 * @apiSuccess {bool}       ok          Si la petición ha sido exitosa o no
 * @apiSuccess {String}     message     Mensaje del servidor
 * @apiSuccess {String}     result      La lista de unidades
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            "ok": true,
            "message": "Query successful",
            "result": [
                {
                    "unit_id": 5,
                    "unit_name": "Metros",
                    "symbol": "m"
                    "state": 1
                },                
                {
                    "unit_id": 9,
                    "unit_name": "Militros",
                    "symbol": "ml"
                    "state": 1
                }
            ]
 *     }
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
    .post(searchUnit);





/** 
  * @api {put} /unit/:unit_id Actualizar Unidad
  * @apiName ActualizarUnidad
  * @apiGroup Unidad
  * 
  * @apiHeaderExample {json} Header-Example:
  *    {
  *       "version": "xxxxx",
  *       "token": "xxxx.xxxx.xxxx"
  *    }
  * 
  * 
  * @apiParam {Number} unit_id El ID de la unidad (este ID tiene que ir en el URL)
  * @apiParam {String} unit_name El nombre de la unidad
  * @apiParam {String} symbol El símbolo de la unidad
  * @apiParam {Number} state El estado de la unidad (0, 1)
  * 
  * @apiSuccess {bool} ok Si la petición ha sido exitosa o no
  * @apiSuccess {String} message Mensaje del servidor
  * 
  * 
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
            "ok": true,
            "message": "Unidad actualizado correctamente"
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
  * @apiError UnitExists Ya existe la unidad
  * @apiErrorExample UnitExists: 400
  *     HTTP/1.1 400 Unit exists
  *     {
            "ok": false,
            "message": "La unidad ya existe!",
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
  * @apiError UnitIDNotFound El ID de la unidad no existe
  * @apiErrorExample UnitIDNotFound: 405
  *     HTTP/1.1 405 Unit ID Not Found
  *     {
            "ok": false,
            "message": "EL ID de la unidad no existe!",
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
  * @apiErrorExample ServeError: 500
  *     HTTP/1.1 500 Internal Server Error
  *     {
            "ok": false,
            "message": "Mensaje de error del servidor",
  *     }
  * 
  */







/** 
  * @api {delete} /unit/:unit_id Eliminar Unidad
  * @apiName EliminarUnidad
  * @apiGroup Unidad
  * 
  * @apiHeaderExample {json} Header-Example:
  *    {
  *       "version": "xxxxx",
  *       "token": "xxxx.xxxx.xxxx"
  *    }
  * 
  * 
  * @apiParam {Number} unit_id El ID de la unidad (este ID tiene que ir en el URL)
  * 
  * @apiSuccess {bool} ok Si la petición ha sido exitosa o no
  * @apiSuccess {String} message Mensaje del servidor
  * 
  * 
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
            "ok": true,
            "message": "La unidad ha sido eliminado correctamente"
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
  * @apiError UnitIDNotFound El ID de la unidad no existe
  * @apiErrorExample UnitIDNotFound: 405
  *     HTTP/1.1 405 Unit ID Not Found
  *     {
            "ok": false,
            "message": "EL ID de la unidad no existe!",
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
router.route('/:unit_id')
    .get(getUnit)
    .put(updateUnit)
    .delete(deleteUnit);










router.route('/order_by_unitid/:unit_id')
    .get(getUnitsById);

router.route('/commodity/by_id')
    .get(getUnitsByCommodityId);

export default router;