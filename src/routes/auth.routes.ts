import { Router } from 'express';
import { signIn, signUp } from '../controllers/auth.controller';

const router = Router();

/**
 * @api {post} url/auth/signin/ Allow the user to Sign In
 * @apiName PostSignin
 * @apiGroup Auth
 * 
 * @apiHeaderExample {json} Header-Example:
 *    {
 *       "flutter_key": "xxxxx",
 *       "token": "xxxx.xxxx.xxxx"
 *    }
 * 
 * @apiParam {String} username Authentication name.
 * @apiParam {String} password Authentication password.
 *
 * @apiSuccess {Boolean}  ok                Success of the petition.
 * @apiSuccess {String}   message           Message of the petition.
 * @apiSuccess {Object}   user              user model.  
 * @apiSuccess {String}   user.user_id      The user id.
 * @apiSuccess {String}   user.role_id      The role id.
 * @apiSuccess {String}   user.token_id     The token id.
 * @apiSuccess {String}   user.first_name   Firstname of the user.
 * @apiSuccess {String}   user.last_name    Lastname of the user.
 * @apiSuccess {String}   user.username     Username for login.
 * @apiSuccess {String}   user.phone        User's phone.
 * @apiSuccess {String}   user.email        User's email.
 * @apiSuccess {int}      user.state        User's state.
 * @apiSuccess {String}   token             Token for user.
 * @apiSuccess {String}   expire_in         Token expiration date.
 * @apiSuccess {Date}     saved_date        Token saved date.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "ok": true,
            "message": "Login successful!",
            "user": {
                "user_id": 0,
                "role_id": 0,
                "token_id":0,
                "first_name": "xxxxx",
                "last_name": "xxxxx",
                "username": "xxxx",
                "phone": "xxxxxxxxxxxx",
                "email": "xxxxx@gmail.com",
                "state": 1
            },
            "token": "xxxxxxx.xxxxxx-xxxxx&xxxxxxx",
            "expireIn": "0000000",
            "savedDate": "xxxx-xx-xx x:xx:xx"
 *     }
 *
 * @apiError UserNotFound Username was not found.
 *
 * @apiErrorExample UserNotFound: 400
 *     HTTP/1.1 400 Not Found
 *     {
            "ok": false,
            "message": "The username or password is not correct"
 *     }
 *
 * @apiError UserWasDelete Username was deleted.
 *
 * @apiErrorExample UserWasDelete: 403
 *     HTTP/1.1 403 Was Deleted
 *     {
            "ok": false,
            "message": "User deleted",
            "username": "juan",
            "state": 0
*      }

* @apiError UpdateApp Need to update the application
*
* @apiErrorExample UpdateApp: 406
*     HTTP/1.1 406 Need to update
*     {
            "ok": false,
            "message": "Update the app",
*     }
* 
* @apiError ServeError Internal Server Error
*
* @apiErrorExample ServeError: 500
*     HTTP/1.1 500 Internal Server Error
*     {
            "ok": false,
            "message": "Server's message",
*     }
* 
*/
router.route('/signin').post(signIn);







/**
 * @api {post} url/auth/signup/ Create new account
 * @apiName PostSignup
 * @apiGroup Auth
 *
 * 
 * @apiSuccess {Boolean}  ok                Success of the petition.
 * @apiSuccess {String}   message           Message of the petition.
 * 
 * 
 * @apiSuccessExample Success-Response: 200
 *     HTTP/1.1 200 OK
 *     {
 *         "ok": true,
 *         "message": "User created successfully"
 *     }
 * 
 * 
 * 
 * @apiError InsertUpdate Insert or Update query error
 * @apiErrorExample InsertUpdate: 400
 *     HTTP/1.1 400 Insert or Update error
 *     {
            "ok": false,
            "message": "INSERT or UPDATE error",
            error
 *     }
 * 
 * @apiError UpdateApp Need to update the application
 *
 * @apiErrorExample UpdateApp: 406
 *     HTTP/1.1 403 Need to update
 *     {
            "ok": false,
            "message": "Update the app",
 *     }
 * 
 * @apiError ServeError Internal Server Error
 * @apiErrorExample ServeError: 500
 *     HTTP/1.1 500 Internal Server Errpr
 *     {
            "ok": false,
            "message": "Server's message",
 *     }
 * 
 */
router.route('/signup').post(signUp);


export default router;