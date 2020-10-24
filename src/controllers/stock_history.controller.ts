import { Request, Response } from 'express';
import { query } from '../queries/query';
import { IStockHistory } from '../interfaces/stock_history.interface';
import { IStoreCommodity } from '../interfaces/store_commodity.interface';


//================== OBTENER TODAS LOS HISTORIALES DEL STOCK ==================//
export async function getStockHistory(req: Request, res: Response){
    const offset = Number(req.query.offset);

    const queryString = `SELECT * FROM stock_history LIMIT 20 OFFSET ${offset} ORDER BY date asc`;
    
    return await query(queryString).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}

//================== OBTENER UN HISTORIAL POR SU ID ==================//
export async function getStockById(req: Request, res: Response) {
    const stockHistoryId = req.params.stock_history_id;

    const queryString = `SELECT * FROM stock_history WHERE stock_history_id = "${stockHistoryId}"`;

    return await query(queryString).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message}) 
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}

//================== OBTENER TODOS LOS HISTORIALES POR EL STORE_ID ==================//
export async function getStockByStoreId(req: Request, res: Response) {
    const storeCommodityId = req.params.store_commodity_id;
    const offset = Number(req.query.offset);

    const queryString = `SELECT * FROM stock_history WHERE store_commodity_id = "${storeCommodityId}"  ORDER BY date desc LIMIT 20 OFFSET ${offset}`;
    return await query(queryString).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}

//================== ACTUALIZA EL STOCK Y CREAR  UN NUEVO HISTORIAL DEL STOCK ==================//
export async function createStockHistory(req: Request, res: Response) {
    const stockHistory: IStockHistory = req.body;
    const storeCommodity: IStoreCommodity = req.body;

    const queryUpdate = `UPDATE store_commodity SET stock_min = ${storeCommodity.stock_min}, stock_max = ${storeCommodity.stock_max}, 
                        current_stock = ${storeCommodity.current_stock}, last_update = '${storeCommodity.last_update}', state = ${storeCommodity.state} 
                        WHERE store_commodity_id = ${storeCommodity.store_commodity_id}`;

     const queryInsert = `INSERT INTO stock_history (store_commodity_id, user_id, quantity_stock_min, quantity_stock_max, quantity_current_stock, date) 
                             VALUES ('${stockHistory.store_commodity_id}', '${stockHistory.user_id}', '${stockHistory.quantity_stock_min}', 
                                 '${stockHistory.quantity_stock_max}', '${stockHistory.quantity_current_stock}', '${stockHistory.date.toString()}')`;
                         
    //ACTUALIZA EL STOCK                    
    return await query(queryUpdate).then( async data  => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})

        //INSERTA EL NUEVO HISTORIAL
        return await query(queryInsert).then( data => {
            if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
            return res.status(data.status).json({ok: true, message: data.message});
        });
    });
}