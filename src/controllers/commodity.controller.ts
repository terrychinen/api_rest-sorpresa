import { Request, Response } from 'express';
import { connect } from '../database';
import { checkIfDataExist } from '../queries/search.query';
import { query, queryGet, queryDelete, queryUpdate } from '../queries/query';
import { ICommodity } from '../interfaces/commodity.interface';


//================== OBTENER TODOS LAS MERCANCÍAS ==================//
export async function getCommodities(req: Request, res: Response){
    const tableName = 'commodity';
    const columnName = 'commodity_id';
    const offset = Number(req.query.offset);
    const state = Number(req.query.state);
    return await queryGet(tableName, columnName, offset, state).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== OBTENER TODOS LAS MERCANCÍAS POR EL ID DE LA CATEGORÍA ==================//
export async function getCommoditiesByCategoryId(req: Request, res: Response) {
    const categoryId = req.params.category_id;
    const state = req.query.state;
    const offset = Number(req.query.offset);

    const columnName = 'category_id';

    try{
        const conn = await connect();
        const queryString = `SELECT commodity_id, commodity_name, CAST(last_update AS CHAR) AS last_update, state, 
                (SELECT cat.category_id FROM category cat WHERE cat.category_id = comm.category_id)category_id, 
                (SELECT category_name FROM category cat WHERE cat.category_id = comm.category_id)category_name, 
                (SELECT un.unit_id FROM unit un WHERE un.unit_id = comm.unit_id)unit_id, 
                (SELECT unit_name FROM unit un WHERE un.unit_id = comm.unit_id)unit_name, 
                (SELECT username FROM user us WHERE us.user_id = comm.user_id)username 
                FROM commodity comm WHERE category_id = ${categoryId} AND state = ${state} LIMIT 10 OFFSET ${offset}`;

    
        const queryCommodity = await conn.query(queryString);

        conn.end();
    
        if(!queryCommodity)  return res.status(400).json({ok: false, message: 'GET BY '+columnName +' error: Commodity', result: []})

        return res.status(200).json({
            ok: true, 
            message: 'GET BY '+columnName +' successful: Commodity',
            result: queryCommodity[0],
        });

    }catch(e){return res.status(500).json({ok: false, message: e.toString(), result: []});}
}


//================== OBTENER UNA MERCANCÍA POR EL COMMODITY_ID ==================//
export async function getCommodityByCommodityId(req: Request, res: Response) {
    const storeId = req.params.store_id;
    const commodityId = req.params.commodity_id;
    
    try{
        const conn = await connect();
        const queryString = `SELECT commodity_id, commodity_name, CAST(last_update AS CHAR) AS last_update, state, 
                (SELECT cat.category_id FROM category cat WHERE cat.category_id = comm.category_id)category_id, 
                (SELECT category_name FROM category cat WHERE cat.category_id = comm.category_id)category_name, 
                (SELECT un.unit_id FROM unit un WHERE un.unit_id = comm.unit_id)unit_id,   
                (SELECT unit_name FROM unit un WHERE un.unit_id = comm.unit_id)unit_name,  
                (SELECT username FROM user us WHERE us.user_id = comm.user_id)username, 
                (SELECT stock_min FROM store_commodity sc WHERE sc.commodity_id =  ${commodityId} AND sc.store_id = ${storeId})stock_min, 
                (SELECT stock_max FROM store_commodity sc WHERE sc.commodity_id = ${commodityId} AND sc.store_id = ${storeId})stock_max, 
                (SELECT current_stock FROM store_commodity sc WHERE sc.commodity_id = ${commodityId} AND sc.store_id = ${storeId})current_stock 
                FROM commodity comm WHERE commodity_id = ${commodityId}`;

    
        const queryCommodity = await conn.query(queryString);

        conn.end();
    
        if(!queryCommodity)  return res.status(400).json({ok: false, message: 'GET BY error: Commodity', result: []})

        return res.status(200).json({
            ok: true, 
            message: 'GET BY successful: Commodity',
            result: queryCommodity[0],
        });

    }catch(e){return res.status(500).json({ok: false, message: e.toString(), result: []});}
}


//================== OBTENER LOS 5 MERCANCÍAS CON MENOS STOCK  ==================//
export async function getCommoditiesWithLessStock(req: Request, res: Response){
    const storeId = req.params.store_id
    const offset = Number(req.query.offset);

    const queryString = `SELECT  distinct sc.store_commodity_id, sc.commodity_id, c.commodity_name, c.unit_id, u.unit_name, 
                cate.category_id, cate.category_name, sc.stock_min, sc.stock_max, sc.current_stock, sc.last_update FROM store_commodity sc 
                INNER JOIN commodity c ON sc.commodity_id = c.commodity_id 
                INNER JOIN unit u ON c.unit_id = u.unit_id
                INNER JOIN category cate ON cate.category_id = c.category_id
                WHERE store_id = ${storeId} AND current_stock<stock_min  LIMIT 20 OFFSET ${offset}`;
    
    return await query(queryString).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== BUSCAR COMMODITY POR SU NOMBRE  ==================//
export async function searchCommodity(req: Request, res: Response){
    const categoryId = req.params.category_id;
    const search = req.body.query;
    const state = Number(req.body.state);

    const queryString = `SELECT commodity_id, commodity_name, CAST(last_update AS CHAR) AS last_update, state, 
                        (SELECT cat.category_id FROM category cat WHERE cat.category_id = comm.category_id)category_id, 
                        (SELECT category_name FROM category cat WHERE cat.category_id = comm.category_id)category_name, 
                        (SELECT un.unit_id FROM unit un WHERE un.unit_id = comm.unit_id)unit_id, 
                        (SELECT unit_name FROM unit un WHERE un.unit_id = comm.unit_id)unit_name, 
                        (SELECT username FROM user us WHERE us.user_id = comm.user_id)username 
                        FROM commodity comm WHERE category_id = ${categoryId} AND state = ${state} AND commodity_name LIKE "%${search}%" LIMIT 10`;

    return await query(queryString).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== BUSCAR COMMODITY POR SU NOMBRE  ==================//
export async function searchCommodityByStoreIddAndCategoryId(req: Request, res: Response){
    const categoryId = req.params.category_id;
    const storeId = req.params.store_id;
    const search = req.body.query;
    const state = Number(req.body.state);

    const queryString = `SELECT  distinct sc.store_commodity_id, sc.commodity_id, c.commodity_name, c.unit_id, u.unit_name, 
                        cate.category_id, cate.category_name, sc.stock_min, sc.stock_max, sc.current_stock, sc.last_update FROM store_commodity sc 
                        INNER JOIN commodity c ON sc.commodity_id = c.commodity_id 
                        INNER JOIN unit u ON c.unit_id = u.unit_id
                        INNER JOIN category cate ON cate.category_id = c.category_id
                        WHERE store_id = ${storeId} AND cate.category_id = ${categoryId} AND c.commodity_name LIKE "%${search}%" AND sc.state = ${state}`;

    return await query(queryString).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== OBTENER TODOS LAS MERCANCÍAS POR EL ID DE LA CATEGORÍA Y DEL ALMACEN ==================//
export async function getCommoditiesByCategoryIdAndStoreId(req: Request, res: Response) {
    const categoryId = req.params.category_id;
    const storeId = req.params.store_id;

    const columnName = 'category_id';
    
    try{
        const conn = await connect();
        const queryString = `SELECT  distinct sc.store_commodity_id, sc.commodity_id, c.commodity_name, c.unit_id, u.unit_name, 
		            cate.category_id, cate.category_name, sc.stock_min, sc.stock_max, sc.current_stock, sc.last_update FROM store_commodity sc 
                    INNER JOIN commodity c ON sc.commodity_id = c.commodity_id 
                    INNER JOIN unit u ON c.unit_id = u.unit_id
                    INNER JOIN category cate ON cate.category_id = c.category_id
                    WHERE store_id = ${storeId} AND cate.category_id = ${categoryId}`;

    
        const queryCommodity = await conn.query(queryString);

        conn.end();
    
        if(!queryCommodity)  return res.status(400).json({ok: false, message: 'GET BY '+columnName +' error: Commodity', result: []})

        return res.status(200).json({
            ok: true, 
            message: 'GET BY '+columnName +' successful: Commodity',
            result: queryCommodity[0],
        });

    }catch(e){return res.status(500).json({ok: false, message: e.toString(), result: []});}
}


//================== CREAR UNA MERCANCÍA ==================//
export async function createCommodity(req: Request, res: Response) {
    const commodity: ICommodity = req.body;
    const lastUpdate = req.body.last_update;
    const storesIdList = req.query.store_id;

    const tableCommodity = 'commodity';
    const columnName = 'commodity_name';

    //VERIFICA SI LA MERCANCÍA EXISTE
    return await checkIfDataExist(tableCommodity, columnName, commodity.commodity_name).then( async dataCheck => {
        if(dataCheck.ok) return res.status(403).json({ok: false, message: dataCheck.message});
        if(dataCheck.status == 500) return res.status(500).json({ok: false, message: dataCheck.message});

        const conn = await connect();

        return await conn.query({
           sql: 'INSERT INTO commodity SET ?', 
           values: commodity
        }, async function(err, result) {
               if(err) return res.status(400).json({ok: false, message: err.toString()});

               try{
                for(var i=0; i < storesIdList.length; i++) {                
                    await conn.query(`INSERT INTO  store_commodity (commodity_id, store_id, last_update) VALUES 
                                         ('${result.insertId}', '${storesIdList[i]}', '${lastUpdate.toString()}')`);
                 }

                 conn.end();

                return res.status(200).json({ok: true, message: 'Se creo exitosamente'});
               }catch(e){
                return res.status(500).json({ok: true, message: e.toString()});
               }
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
    const tableName = 'commoity';
    const columnName = 'commodity_id';

    //VERIFICA SI EXISTE EL ID PARA ACTUALIZAR
    return await checkIfDataExist(tableName, columnName, commodityId).then( async dataCheck => {
        if(!dataCheck.ok) {return res.status(404).json({ok: false, message: dataCheck.message})}

        //ELIMINA EL REGISTRO
        return await queryDelete(tableName, columnName, commodityId).then( data => {
            if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
            
            return res.status(data.status).json({ok: true, message: data.message});
        });
    });
}