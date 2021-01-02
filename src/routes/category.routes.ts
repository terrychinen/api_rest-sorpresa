import { Router } from 'express';
import { searchCategoryByStoreId, searchCategory, getCategories, createCategory, getCategory, getCategoriesById, getCategoriesByStores, deleteCategory, updateCategory } from '../controllers/category.controller';

const router = Router();



/**
 * @api {get} /category?offset=0&state=1 Obtener todas las categorías
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
  * @api {post} /category Crear categoría
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
  * @apiParam {String} category_name El nombre de la categoría
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
  * 
  *
  * 
  * 
  * @apiError CategoryExists Ya existe el nombre de la categoría
  * @apiErrorExample CategoryExists: 400
  *     HTTP/1.1 406 Category exists
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
    .get(getCategories)
    .post(createCategory);















/**
 * @api {post} /category/search Buscador de categorías
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
    .post(searchCategory);











 /** 
  * @api {put} /category/:category_id Actualizar Categoría
  * @apiName ActualizarCategoría
  * @apiGroup Categoría
  * 
  * @apiHeaderExample {json} Header-Example:
  *    {
  *       "version": "xxxxx",
  *       "token": "xxxx.xxxx.xxxx"
  *    }
  * 
  * 
  * @apiParam {Number} category_id El ID de la categoría (este ID tiene que ir en el URL)
  * @apiParam {String} category_name El nombre de la categoría
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
            "message": "Categoría actualizado correctamente"
  *     }
  *
  * 
  * 
  * 
  * 
  * 
  * 
  * @apiError CategoryExists Ya existe la categoría
  * @apiErrorExample CategoryExists: 400
  *     HTTP/1.1 400 Category exists
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
  * 
  * @apiError CategoyIDNotFound El ID de la categoría no existe
  * @apiErrorExample CategoryIDNotFound: 405
  *     HTTP/1.1 405 Category ID Not Found
  *     {
            "ok": false,
            "message": "EL ID de la categoría no existe!",
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
  * @api {delete} /category/:category_id Eliminar Categoría
  * @apiName EliminarCategoría
  * @apiGroup Categoría
  * 
  * @apiHeaderExample {json} Header-Example:
  *    {
  *       "version": "xxxxx",
  *       "token": "xxxx.xxxx.xxxx"
  *    }
  * 
  * 
  * @apiParam {Number} category_id El ID de la categoría (este ID tiene que ir en el URL)
  * 
  * @apiSuccess {bool} ok Si la petición ha sido exitosa o no
  * @apiSuccess {String} message Mensaje del servidor
  * 
  * 
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
            "ok": true,
            "message": "La Categoría ha sido eliminado correctamente"
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
  * @apiError CategoryIDNotFound El ID de la categoría no existe
  * @apiErrorExample CategoryIDNotFound: 405
  *     HTTP/1.1 405 Category ID Not Found
  *     {
            "ok": false,
            "message": "EL ID de la categoría no existe!",
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
router.route('/:category_id')
    .get(getCategory)
    .put(updateCategory)
    .delete(deleteCategory);











router.route('/search/:store_id')
    .post(searchCategoryByStoreId);



router.route('/order_by_categoryid/:category_id')
    .get(getCategoriesById);



router.route('/store/:store_id')
    .get(getCategoriesByStores);


    
export default router;
