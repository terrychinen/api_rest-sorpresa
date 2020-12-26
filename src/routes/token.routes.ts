import { Router } from 'express';
import { refreshToken } from '../controllers/token_controller';


const router = Router();



/**
 * @api {get} /token/refresh Refrescar el token
 * @apiName RefrescarToken
 * @apiGroup Auth
 * 
 * @apiHeaderExample {json} Header-Example:
 *    {
 *       "token": "xxxx.xxxx.xxxx"
 *    }
 * 
 * 
 * @apiParam {String} token El token del usuario
 * @apiParam {Number} user_id El ID del usuario
 *
 * @apiSuccess {bool}       ok              Si la petición ha sido exitosa o no
 * @apiSuccess {String}     message         Mensaje del servidor
 * @apiSuccess {String}     token           El token ya refrescado
 * @apiSuccess {Number}     expires_in      La expiración del token
 * 
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            "ok": true,
            "message": "Token updated",
            "token": "xxxxxxx.xxxxxx-xxxxx&xxxxxxx",
            "expires_in": 3600000
 *     }
 *
 * 
 * 
 * 
 *
 * @apiError JWTNotFound El 'token' no existe
 * @apiErrorExample JWTNotFound: 401
 *     HTTP/1.1 401 JWTNotFound
 *     {
            "ok": false,
            "message": "El token no existe!",
 *     }
 * 
 * 
 * @apiError JWTNotFound El 'usuario' no existe
 * @apiErrorExample JWTNotFound: 406
 *     HTTP/1.1 406 JWTNotFound
 *     {
            "ok": false,
            "message": "El usuario no existe!",
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









router.route('/refresh')
    .post(refreshToken);


export default router;