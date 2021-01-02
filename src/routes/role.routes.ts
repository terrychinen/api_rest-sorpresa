import { Router } from 'express';
import { searchRole, getRole, getRoles, createRole, updateRole, deleteRole } from '../controllers/role.controller';

const router = Router();


/**
 * @api {get} /role?offset=0&state=1 Obtener todos los roles
 * @apiName ObtenerRoles
 * @apiGroup Rol
 * 
 * @apiHeaderExample {json} Header-Example:
 *    {
 *       "version": "xxxxx",
 *       "token": "xxxx.xxxx.xxxx"
 *    }
 * 
 * 
 * @apiParam {Number} offset Número de índice
 * @apiParam {Number} state El estado del rol (0, 1)
 *
 * @apiSuccess {bool} ok Si la petición ha sido exitosa o no
 * @apiSuccess {String} message Mensaje del servidor
 * @apiSuccess {String} result La lista de roles
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            "ok": true,
            "message": "Query successful",
            "result": [
                {
                    "role_id": 1,
                    "role_name": "Administrador",
                    "state": 1
                },                
                {
                    "role_id": 2,
                    "role_name": "Cajero",
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
  * @api {post} /role Crear rol
  * @apiName CrearRol
  * @apiGroup Rol
  * 
  * @apiHeaderExample {json} Header-Example:
  *    {
  *       "version": "xxxxx",
  *       "token": "xxxx.xxxx.xxxx"
  *    }
  * 
  * 
  * @apiParam {String} rol_name El nombre del rol
  * @apiParam {Number} state El estado del rol (0, 1)
  * 
  * @apiSuccess {bool} ok Si la petición ha sido exitosa o no
  * @apiSuccess {String} message Mensaje del servidor
  * 
  * 
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
            "ok": true,
            "message": "Rol creado correctamente"
  *     }
  *
  * 
  * 
  * 
  * 
  * 
  * @apiError RoleExists Ya existe el rol
  * @apiErrorExample RoleExists: 400
  *     HTTP/1.1 406 Role exists
  *     {
            "ok": false,
            "message": "El rol ya existe!",
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
    .get(getRoles)
    .post(createRole)












/**
  * @api {post} /role/search Buscador de roles
  * @apiName BuscarRoles
  * @apiGroup Rol
  * 
  * @apiHeaderExample {json} Header-Example:
  *    {
  *       "version": "xxxxx",
  *       "token": "xxxx.xxxx.xxxx"
  *    }
  * 
  * 
  * @apiParam {Number} query     El nombre del rol
  * @apiParam {Number} state     El estado del rol (0, 1)
  *
  * 
  * @apiSuccess {bool}       ok          Si la petición ha sido exitosa o no
  * @apiSuccess {String}     message     Mensaje del servidor
  * @apiSuccess {String}     result      La lista de roles
  * 
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
             "ok": true,
             "message": "Query successful",
             "result": [
                 {
                    "role_id": 1,
                    "role_name": "Administrador",
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
    .post(searchRole)











    

 /** 
  * @api {put} /role/:role_id Actualizar Rol
  * @apiName ActualizarRol
  * @apiGroup Rol
  * 
  * @apiHeaderExample {json} Header-Example:
  *    {
  *       "version": "xxxxx",
  *       "token": "xxxx.xxxx.xxxx"
  *    }
  * 
  * 
  * @apiParam {Number} role_id El ID del rol (este ID tiene que ir en el URL)
  * @apiParam {String} role_name El nombre del rol
  * @apiParam {Number} state El estado del rol (0, 1)
  * 
  * @apiSuccess {bool} ok Si la petición ha sido exitosa o no
  * @apiSuccess {String} message Mensaje del servidor
  * 
  * 
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
            "ok": true,
            "message": "Rol actualizado correctamente"
  *     }
  *
  * 
  * 
  * 
  * 
  * 
  * 
  * 
  * @apiError RoleExists Ya existe el rol
  * @apiErrorExample RoleExists: 400
  *     HTTP/1.1 400 Role exists
  *     {
            "ok": false,
            "message": "El rol ya existe!",
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
  * 
  * @apiError RoleIDNotFound El ID del rol no existe
  * @apiErrorExample RoleIDNotFound: 405
  *     HTTP/1.1 405 Role ID Not Found
  *     {
            "ok": false,
            "message": "EL ID de la rol no existe!",
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
  * @api {delete} /role/:role_id Eliminar Rol
  * @apiName EliminarRol
  * @apiGroup Rol
  * 
  * @apiHeaderExample {json} Header-Example:
  *    {
  *       "version": "xxxxx",
  *       "token": "xxxx.xxxx.xxxx"
  *    }
  * 
  * 
  * @apiParam {Number} role_id El ID del rol (este ID tiene que ir en el URL)
  * 
  * @apiSuccess {bool} ok Si la petición ha sido exitosa o no
  * @apiSuccess {String} message Mensaje del servidor
  * 
  * 
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
            "ok": true,
            "message": "El rol ha sido eliminado correctamente"
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
  * @apiError RoleIDNotFound El ID del rol no existe
  * @apiErrorExample RoleIDNotFound: 405
  *     HTTP/1.1 405 Role ID Not Found
  *     {
            "ok": false,
            "message": "EL ID del rol no existe!",
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
router.route('/:role_id')
    .get(getRole)
    .put(updateRole)
    .delete(deleteRole)


export default router;