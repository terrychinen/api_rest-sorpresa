"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.Router();
/**
 * @api {post} url/auth/signin Inciar sesión al usuario
 * @apiName IniciarSesión
 * @apiGroup Auth
 *
 *
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *      "version": "xxxxx",
 *   }
 *
 *
 *
 *
 * @apiParam {String} username Nombre del usuario
 * @apiParam {String} password Clave del usuario
 *
 * @apiSuccess {Boolean}  ok                Si la peticion ha sido exitosa o no
 * @apiSuccess {String}   message           Mensaje del servidor
 * @apiSuccess {Object}   user              Modelo usuario
 * @apiSuccess {String}   user.user_id      El ID del usuario
 * @apiSuccess {String}   user.token_id     El ID del token
 * @apiSuccess {String}   user.role_id      El ID del rol
 * @apiSuccess {String}   user.role_name    El nombre del rol
 * @apiSuccess {String}   user.username     El nombre del usuario
 * @apiSuccess {String}   user.first_name   El nombre de la persona
 * @apiSuccess {String}   user.last_name    El apellido dela persona
 * @apiSuccess {String}   user.state        El estado del usuario (si está permitido loguearse o no)
 * @apiSuccess {String}   token             El token
 * @apiSuccess {Number}   expires_in        La expiración del token
 * @apiSuccess {String}   date              La fecha del token generado
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            "ok": true,
            "message": "Login successful!",
            "user": {
                "user_id": 0,
                "token_id": 0,
                "role_id": 0,
                "role_name": 0,
                "first_name": "xxxxx",
                "last_name": "xxxxx",
                "username": "xxxx",
                "state": 1
            },
            "token": "xxxxxxx.xxxxxx-xxxxx&xxxxxxx",
            "expireIn": "0000000",
            "date": "xxxx-xx-xx x:xx:xx"
 *     }
 *
 * @apiError UserNotFound El nombre del usuario no fue encontrado
 *
 * @apiErrorExample UserNotFound: 400
 *     HTTP/1.1 400 Not Found
 *     {
            "ok": false,
            "message": "El nombre del usuario o la clave es incorrecta!"
 *     }
 *
 * @apiError UserDisabled El usuario ha sido desactivado
 *
 * @apiErrorExample UserDisabled: 403
 *     HTTP/1.1 403 Disabled
 *     {
            "ok": false,
            "message": "Usuario desactivado",
            "username": "juan",
            "state": 0
*      }

* @apiError AppVersion Necesita actualizar la aplicación
*
* @apiErrorExample AppVersion: 406
*     HTTP/1.1 406 Need to update
*     {
            "ok": false,
            "message": "Actualiza la apliación",
*     }
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
router.route('/signin').post(auth_controller_1.signIn);
router.route('/signup').post(auth_controller_1.signUp);
exports.default = router;
