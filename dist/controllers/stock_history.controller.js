"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStockHistory = exports.getStockByStoreId = exports.getStockById = exports.getStockHistory = void 0;
const query_1 = require("../queries/query");
//================== OBTENER TODAS LOS HISTORIALES DEL STOCK ==================//
function getStockHistory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const offset = Number(req.query.offset);
        const queryString = `SELECT * FROM stock_history LIMIT 20 OFFSET ${offset} ORDER BY date asc`;
        return yield query_1.query(queryString).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getStockHistory = getStockHistory;
//================== OBTENER UN HISTORIAL POR SU ID ==================//
function getStockById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const stockHistoryId = req.params.stock_history_id;
        const queryString = `SELECT * FROM stock_history WHERE stock_history_id = "${stockHistoryId}"`;
        return yield query_1.query(queryString).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getStockById = getStockById;
//================== OBTENER TODOS LOS HISTORIALES POR EL STORE_ID ==================//
function getStockByStoreId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const storeCommodityId = req.params.store_commodity_id;
        const offset = Number(req.query.offset);
        const queryString = `SELECT * FROM stock_history WHERE store_commodity_id = "${storeCommodityId}"  ORDER BY date desc LIMIT 20 OFFSET ${offset}`;
        return yield query_1.query(queryString).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getStockByStoreId = getStockByStoreId;
//================== ACTUALIZA EL STOCK Y CREAR  UN NUEVO HISTORIAL DEL STOCK ==================//
function createStockHistory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const stockHistory = req.body;
        const storeCommodity = req.body;
        const queryUpdate = `UPDATE store_commodity SET stock_min = ${storeCommodity.stock_min}, stock_max = ${storeCommodity.stock_max}, 
                        current_stock = ${storeCommodity.current_stock}, last_update = '${storeCommodity.last_update}', state = ${storeCommodity.state} 
                        WHERE store_commodity_id = ${storeCommodity.store_commodity_id}`;
        const queryInsert = `INSERT INTO stock_history (store_commodity_id, user_id, quantity_stock_min, quantity_stock_max, quantity_current_stock, date) 
                             VALUES ('${stockHistory.store_commodity_id}', '${stockHistory.user_id}', '${stockHistory.quantity_stock_min}', 
                                 '${stockHistory.quantity_stock_max}', '${stockHistory.quantity_current_stock}', '${stockHistory.date.toString()}')`;
        //ACTUALIZA EL STOCK                    
        return yield query_1.query(queryUpdate).then((data) => __awaiter(this, void 0, void 0, function* () {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            //INSERTA EL NUEVO HISTORIAL
            return yield query_1.query(queryInsert).then(data => {
                if (!data.ok)
                    return res.status(data.status).json({ ok: false, message: data.message });
                return res.status(data.status).json({ ok: true, message: data.message });
            });
        }));
    });
}
exports.createStockHistory = createStockHistory;
