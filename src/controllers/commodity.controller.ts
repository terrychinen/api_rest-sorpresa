import { Request, Response } from 'express';
import { connect } from '../database';
import { checkIfDataExist } from '../queries/search.query';
import { query, queryUpdate } from '../queries/query';
import { ICommodity } from '../interfaces/commodity.interface';


//================== OBTENER TODOS LAS MERCANCÍAS ==================//
export async function getCommodities(req: Request, res: Response){
    const offset = Number(req.query.offset);
    const state = Number(req.query.state);

    const queryGet = `SELECT * FROM commodity WHERE state = ${state} ORDER BY commodity_id DESC LIMIT 10 OFFSET ${offset}`;

    return await query(queryGet).then(data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== OBTENER TODOS LAS MERCANCÍAS POR EL ID DE LA CATEGORÍA ==================//
export async function getCommoditiesByCategoryId(req: Request, res: Response) {
    const categoryId = req.params.category_id;
    const state = req.query.state;
    const offset = Number(req.query.offset);

    const test = `SELECT commodity_id, unit_id, quantity_id, barcode, photo, user_id, last_update, state,
                    (SELECT commodity_name FROM commodity comm WHERE comm.commodity_id = cuq.commodity_id)commodity_name,
                    (SELECT unit_name FROM unit u WHERE u.unit_id = cuq.unit_id)unit_name,
                    (SELECT quantity_name FROM quantity q WHERE q.quantity_id = cuq.quantity_id)quantity_name,
                    (SELECT short_name FROM quantity q WHERE q.quantityt_id = cuq.quantity_id)short_name
                    (SELECT username FROM user WHERE user.user_id = cuq.user_id)username
                    FROM commodity_unit_quantity WHERE commodity_id IN (SELECT commodityid FROM commodity WHERE category_id = ${categoryId})`;

   /* const queryGet = `SELECT commodity_id, commodity_name, CAST(last_update AS CHAR) AS last_update, state, 
            (SELECT cat.category_id FROM category cat WHERE cat.category_id = comm.category_id)category_id, 
            (SELECT category_name FROM category cat WHERE cat.category_id = comm.category_id)category_name, 
            (SELECT un.unit_id FROM unit un WHERE un.unit_id = comm.unit_id)unit_id, 
            (SELECT unit_name FROM unit un WHERE un.unit_id = comm.unit_id)unit_name, 
            (SELECT username FROM user us WHERE us.user_id = comm.user_id)username 
            FROM commodity comm WHERE category_id = ${categoryId} AND state = ${state} LIMIT 10 OFFSET ${offset}`; */

    return await query(test).then(data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== OBTENER UNA MERCANCÍA POR EL COMMODITY_ID ==================//
export async function getCommodityByCommodityId(req: Request, res: Response) {
    const storeId = req.params.store_id;
    const commodityId = req.params.commodity_id;

    const queryGet = `SELECT commodity_id, commodity_name, CAST(last_update AS CHAR) AS last_update, state, 
            (SELECT cat.category_id FROM category cat WHERE cat.category_id = comm.category_id)category_id, 
            (SELECT category_name FROM category cat WHERE cat.category_id = comm.category_id)category_name, 
            (SELECT un.unit_id FROM unit un WHERE un.unit_id = comm.unit_id)unit_id,   
            (SELECT unit_name FROM unit un WHERE un.unit_id = comm.unit_id)unit_name,  
            (SELECT username FROM user us WHERE us.user_id = comm.user_id)username, 
            (SELECT stock_min FROM store_commodity sc WHERE sc.commodity_id =  ${commodityId} AND sc.store_id = ${storeId})stock_min, 
            (SELECT stock_max FROM store_commodity sc WHERE sc.commodity_id = ${commodityId} AND sc.store_id = ${storeId})stock_max, 
            (SELECT current_stock FROM store_commodity sc WHERE sc.commodity_id = ${commodityId} AND sc.store_id = ${storeId})current_stock 
            FROM commodity comm WHERE commodity_id = ${commodityId}`;

    return await query(queryGet).then(data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== OBTENER LOS 5 MERCANCÍAS CON MENOS STOCK  ==================//
export async function getCommoditiesWithLessStock(req: Request, res: Response){
    const storeId = req.params.store_id
    const offset = Number(req.query.offset);

    const queryGet = `SELECT  distinct sc.store_commodity_id, sc.commodity_id, c.commodity_name, c.unit_id, u.unit_name, 
                cate.category_id, cate.category_name, sc.stock_min, sc.stock_max, sc.current_stock, sc.last_update FROM store_commodity sc 
                INNER JOIN commodity c ON sc.commodity_id = c.commodity_id 
                INNER JOIN unit u ON c.unit_id = u.unit_id
                INNER JOIN category cate ON cate.category_id = c.category_id
                WHERE store_id = ${storeId} AND current_stock<stock_min  LIMIT 20 OFFSET ${offset}`;
    
    return await query(queryGet).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== BUSCAR COMMODITY POR SU NOMBRE  ==================//
export async function searchCommodity(req: Request, res: Response){
    const categoryId = req.params.category_id;
    const search = req.body.query;
    const state = Number(req.body.state);

    const queryGet = `SELECT commodity_id, commodity_name, CAST(last_update AS CHAR) AS last_update, state, 
                        (SELECT cat.category_id FROM category cat WHERE cat.category_id = comm.category_id)category_id, 
                        (SELECT category_name FROM category cat WHERE cat.category_id = comm.category_id)category_name, 
                        (SELECT un.unit_id FROM unit un WHERE un.unit_id = comm.unit_id)unit_id, 
                        (SELECT unit_name FROM unit un WHERE un.unit_id = comm.unit_id)unit_name, 
                        (SELECT username FROM user us WHERE us.user_id = comm.user_id)username 
                        FROM commodity comm WHERE category_id = ${categoryId} AND state = ${state} AND commodity_name LIKE "%${search}%" LIMIT 10`;

    return await query(queryGet).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== BUSCAR COMMODITY POR SU NOMBRE  ==================//
export async function searchCommodityByStoreIdAndCategoryId(req: Request, res: Response){
    const categoryId = req.params.category_id;
    const storeId = req.params.store_id;
    const search = req.body.query;
    const state = Number(req.body.state);

    const queryGet = `SELECT  distinct sc.store_commodity_id, sc.commodity_id, c.commodity_name, c.unit_id, u.unit_name, 
                        cate.category_id, cate.category_name, sc.stock_min, sc.stock_max, sc.current_stock, sc.last_update FROM store_commodity sc 
                        INNER JOIN commodity c ON sc.commodity_id = c.commodity_id 
                        INNER JOIN unit u ON c.unit_id = u.unit_id
                        INNER JOIN category cate ON cate.category_id = c.category_id
                        WHERE store_id = ${storeId} AND cate.category_id = ${categoryId} AND c.commodity_name LIKE "%${search}%" AND sc.state = ${state}`;

    return await query(queryGet).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== OBTENER TODOS LAS MERCANCÍAS POR EL ID DE LA CATEGORÍA Y DEL ALMACEN ==================//
export async function getCommoditiesByCategoryIdAndStoreId(req: Request, res: Response) {
    const categoryId = req.params.category_id;
    const storeId = req.params.store_id;

    const queryGet = `SELECT  distinct sc.store_commodity_id, sc.commodity_id, c.commodity_name, c.unit_id, 
                    u.unit_name, cate.category_id, cate.category_name, sc.stock_min, sc.stock_max, sc.current_stock, 
                    sc.last_update FROM store_commodity_unit_quantity sc 
                    INNER JOIN commodity c ON sc.commodity_id = c.commodity_id 
                    INNER JOIN unit u ON c.unit_id = u.unit_id
                    INNER JOIN category cate ON cate.category_id = c.category_id
                    WHERE store_id = ${storeId} AND cate.category_id = ${categoryId}`;

    return await query(queryGet).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== CREAR UNA MERCANCÍA ==================//
export async function createCommodity(req: Request, res: Response) {
    const commodity: ICommodity = req.body;
    const lastUpdate = req.body.last_update;
    const storesIdList = req.query.store_id;

    const queryCheck = `SELECT * FROM commodity WHERE commodity_name = "${commodity.commodity_name}"`;
   
    return await query(queryCheck).then(async dataCheck => {
        if(dataCheck.result[0][0] != null) {return res.status(400).json({ok: false, message: 'El producto ya existe!'});}
        const queryInsert = `INSERT INTO commodity (category_id, commodity_name, state) 
           VALUES ("${commodity.category_id}", "${commodity.commodity_name}", ${commodity.state})`;

        return await query(queryInsert).then(data => {
            if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
            return res.status(data.status).json({ok: true, message: 'El Producto ha sido creado correctamente'});
        });
    });
}
    

//================== ACTUALIZAR UNA MERCANCÍA ==================//
export async function updateCommodity(req: Request, res: Response) {
    const commodity: ICommodity = req.body;
    const storesIdList = req.query.store_id;
    const lastUpdate = req.body.last_update;

    const tableCommodity = 'commodity';
    const tableStoreCommodity = 'store_commodity';


    const columnCommodityId = 'commodity_id';
    const columnCommodityName = 'commodity_name';

    //VERIFICA SI EXISTE EL ID PARA ACTUALIZAR
    return await checkIfDataExist(tableCommodity, columnCommodityId, commodity.commodity_id).then( async dataCheck => {
        if(!dataCheck.ok) {return res.status(404).json({ok: false, message: dataCheck.message})}

        //VERIFICA SI YA HAY UNA MERCANCÍA CON EL MISMO NOMBRE PARA NO ACTUALIZAR
        return await checkIfDataExist(tableStoreCommodity, columnCommodityName, commodity.commodity_name).then( async dataCheck => {
            if(!dataCheck.ok) {
                try{
                    const conn = await connect();
                    await conn.query(`UPDATE store_commodity SET state = 0 WHERE commodity_id = ${commodity.commodity_id}`); 

                    for(var i=0; i<storesIdList.length; i++){
                        const conn = await connect();
                        const query = await conn.query(`SELECT store_commodity_id FROM store_commodity WHERE store_id = ${storesIdList[i]} AND commodity_id = ${commodity.commodity_id}`);

                        if(Object.keys(query[0]).length === 0){
                            await conn.query(`INSERT INTO store_commodity (commodity_id, store_id, last_update) VALUES 
                            ('${commodity.commodity_id}', '${storesIdList[i]}', '${lastUpdate.toString()}')`);
                        }else{
                            await conn.query(`UPDATE store_commodity SET state = 1 WHERE store_id = ${storesIdList[i]} AND commodity_id = ${commodity.commodity_id}`);
                        } 
                    }

                    await conn.query(`UPDATE commodity SET last_update = '${lastUpdate.toString()}' WHERE commodity_id = ${commodity.commodity_id}`); 


                    conn.end();

                }catch(e) {return ({ok: false, status: 500, message: e});} 
                

                return await queryUpdate(tableCommodity, columnCommodityId, commodity, commodity.commodity_id).then( data => {
                    if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
                    
                    return res.status(data.status).json({ok: true, message: data.message});
                });
            }else{
                return res.status(400).json({ok: true, message: 'Error en el servidor'});
            }
        });
    });    
}


//================== ELIMINAR UNA MERCANCÍA POR SU ID ==================//
export async function deleteCommodity(req: Request, res: Response) {
    const commodityId = req.params.commodity_id;

    const queryCheckId = `SELECT * FROM commodity WHERE commodity_id = "${commodityId}"`;

    return await query(queryCheckId).then(async dataCheckId => {
        if(dataCheckId.result[0][0] == null) {return res.status(400).json({ok: false, message: `El producto con el id ${commodityId} no existe!`});};
        const queryDelete = `DELETE commodity WHERE commodity_id = "${commodityId}"`;

        return await query(queryDelete).then(dataDelete => {
            if(!dataDelete.ok) return res.status(dataDelete.status).json({ok: false, message: dataDelete.message})
            return res.status(dataDelete.status).json({ok: true, message: 'El producto se eliminó correctamente'});
        });
    });
}