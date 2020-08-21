"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const router = express_1.Router();
/**
 * @api {get} url/category/ Get categories
 * @apiName GetCategories
 * @apiGroup Category
 *
 * @apiHeaderExample {json} Header-Example:
 *    {
 *       "flutter_key": "xxxxx",
 *       "token": "xxxx.xxxx.xxxx"
 *    }
 *
 * @apiSuccess {Boolean}  ok                         Success of the petition.
 * @apiSuccess {String}   message                    Message of the petition.
 * @apiSuccess {Object}   result                     Show all categories.
 * @apiSuccess {String}   result.category_id         The category id.
 * @apiSuccess {String}   result.category_name       The category name.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            "ok": true,
            "message": "GET successful: category",
            "result": [
                {
                    "category_id": 0,
                    "category_name": "xxxxxx"
                }
            ]
 *      }
 *
 * @apiError GetQueryError GET query error
 *
 * @apiErrorExample GetQueryError: 400
 *     HTTP/1.1 400 Not Found
 *     {
            "ok": false,
            "message": "GET error"
 *     }
 *
 * @apiErrorExample UpdateApp: 406
 *     HTTP/1.1 403 Need to update
 *     {
            "ok": false,
            "message": "Update the app",
 *     }
 *
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
/**
* @api {post} url/category/ Post category
* @apiName PostCategoryBy
* @apiGroup Category
*
*
* @apiSuccess {Boolean}  ok                         Success of the petition.
* @apiSuccess {String}   message                    Message of the petition.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
           "ok": true,
           "message": "GET BY category_id successful: category",
           "result": [
               {
                   "category_id": 0,
                   "category_name": "xxxxx"
               }
           ]
*     }
*
*
*/
router.route('/')
    .get(category_controller_1.getCategories)
    .post(category_controller_1.createCategory);
/**
* @api {get} url/category/ Get category
* @apiName GetCategoryBy
* @apiGroup Category
*
*
* @apiSuccess {Boolean}  ok                         Success of the petition.
* @apiSuccess {String}   message                    Message of the petition.
* @apiSuccess {Object}   result                     Show all categories.
* @apiSuccess {String}   result.category_id         The category id.
* @apiSuccess {String}   result.category_name       The category name.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
           "ok": true,
           "message": "GET BY category_id successful: category",
           "result": [
               {
                   "category_id": 0,
                   "category_name": "xxxxx"
               }
           ]
*     }
*
*
*/
router.route('/:category_id')
    .get(category_controller_1.getCategory)
    .put(category_controller_1.updateCategory)
    .delete(category_controller_1.deleteCategory);
exports.default = router;
