import { Router } from 'express';
import { getQuantity, getQuantities, searchQuantity, createQuantity, updateQuantity, deleteQuantity } from '../controllers/quantity.controller';

const router = Router();




/**
 * @api {get} /quantity?offset=0&state=1 Obtener todas las cantidades
 * @apiName ObtenerCantidades
 * @apiGroup Cantidad
 * 
 * @apiHeaderExample {json} Header-Example:
 *    {
 *       "version": "xxxxx",
 *       "token": "xxxx.xxxx.xxxx"
 *    }
 * 
 * 
 * @apiParam {Number} offset Número de índice
 * @apiParam {Number} state El estado de la cantidad (0, 1)
 *
 * @apiSuccess {bool} ok Si la petición ha sido exitosa o no
 * @apiSuccess {String} message Mensaje del servidor
 * @apiSuccess {String} result La lista de cantidades
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            "ok": true,
            "message": "Query successful",
            "result": [
                {
                    "quantity_id": 1,
                    "quantity_name": "Caja",
                    "short_name": ""
                    "state": 1
                },                
                {
                    "quantity_id": 2,
                    "quantity_name": "Paquete",
                    "short_name": "paq"
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
  * @api {post} /quantity Crear cantidad
  * @apiName CrearCantidad
  * @apiGroup Cantidad
  * 
  * @apiHeaderExample {json} Header-Example:
  *    {
  *       "version": "xxxxx",
  *       "token": "xxxx.xxxx.xxxx"
  *    }
  * 
  * 
  * @apiParam {String} quantity_name El nombre de la cantidad
  * @apiParam {String} short_name La abreviatura de la cantidad 
  * @apiParam {Number} state El estado de la cantidad (0, 1)
  * 
  * @apiSuccess {bool} ok Si la petición ha sido exitosa o no
  * @apiSuccess {String} message Mensaje del servidor
  * 
  * 
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
            "ok": true,
            "message": "Cantidad creado correctamente"
  *     }
  *
  * 
  * 
  * 
  * 
  * 
  * 
  * 
  * @apiError QuantityExists Ya existe la cantidad
  * @apiErrorExample QuantityExists: 400
  *     HTTP/1.1 406 Quantity exists
  *     {
            "ok": false,
            "message": "La cantidad ya existe!",
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
    .get(getQuantities)
    .post(createQuantity)









/**
  * @api {post} /quantity/search Buscador de cantidades
  * @apiName BuscarCantidades
  * @apiGroup Cantidad
  * 
  * @apiHeaderExample {json} Header-Example:
  *    {
  *       "version": "xxxxx",
  *       "token": "xxxx.xxxx.xxxx"
  *    }
  * 
  * 
  * @apiParam {Number} query     El nombre de la cantidad
  * @apiParam {Number} state     El estado de la cantidad (0, 1)
  *
  * 
  * @apiSuccess {bool}       ok          Si la petición ha sido exitosa o no
  * @apiSuccess {String}     message     Mensaje del servidor
  * @apiSuccess {String}     result      La lista de cantidades
  * 
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
             "ok": true,
             "message": "Query successful",
             "result": [
                 {
                     "quantity_id": 1,
                     "quantity_name": "Caja",
                     "short_name": ""
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
    .post(searchQuantity)











 
 /** 
  * @api {put} /quantity/:quantity_id Actualizar Cantidad
  * @apiName ActualizarQuantity
  * @apiGroup Cantidad
  * 
  * @apiHeaderExample {json} Header-Example:
  *    {
  *       "version": "xxxxx",
  *       "token": "xxxx.xxxx.xxxx"
  *    }
  * 
  * 
  * @apiParam {Number} quantity_id El ID de la cantidad (este ID tiene que ir en el URL)
  * @apiParam {String} quantity_name El nombre de la cantidad
  * @apiParam {String} short_name La abreviatura de la cantidad
  * @apiParam {Number} state El estado de la cantidad (0, 1)
  * 
  * @apiSuccess {bool} ok Si la petición ha sido exitosa o no
  * @apiSuccess {String} message Mensaje del servidor
  * 
  * 
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
            "ok": true,
            "message": "Cantidad actualizado correctamente"
  *     }
  *
  * 
  * 
  * 
  * 
  * 
  * 
  * @apiError QuantityExists Ya existe la cantidad
  * @apiErrorExample QuantityExists: 400
  *     HTTP/1.1 400 Quantity exists
  *     {
            "ok": false,
            "message": "La cantidad ya existe!",
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
  * @apiError QuantityIDNotFound El ID de la cantidad no existe
  * @apiErrorExample QuantityIDNotFound: 405
  *     HTTP/1.1 405 Quantity ID Not Found
  *     {
            "ok": false,
            "message": "EL ID de la cantidad no existe!",
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
  * @api {delete} /quantity/:quanitity_id Eliminar Cantidad
  * @apiName EliminarCantidad
  * @apiGroup Cantidad
  * 
  * @apiHeaderExample {json} Header-Example:
  *    {
  *       "version": "xxxxx",
  *       "token": "xxxx.xxxx.xxxx"
  *    }
  * 
  * 
  * @apiParam {Number} quantity_id El ID de la cantidad (este ID tiene que ir en el URL)
  * 
  * @apiSuccess {bool} ok Si la petición ha sido exitosa o no
  * @apiSuccess {String} message Mensaje del servidor
  * 
  * 
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
            "ok": true,
            "message": "La cantidad ha sido eliminado correctamente"
  *     }
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
  * @apiError QuantityIDNotFound El ID de la cantidad no existe
  * @apiErrorExample QuantityIDNotFound: 405
  *     HTTP/1.1 405 Quantity ID Not Found
  *     {
            "ok": false,
            "message": "EL ID de la cantidad no existe!",
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
router.route('/:quantity_id')
    .get(getQuantity)
    .put(updateQuantity)
    .delete(deleteQuantity)


export default router;