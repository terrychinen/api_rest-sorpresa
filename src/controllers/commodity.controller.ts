import { Request, Response } from 'express';
import { connect } from '../database';
import { checkIfDataExist } from '../queries/search.query';
import { query, queryUpdate } from '../queries/query';
import { ICommodity } from '../interfaces/commodity.interface';



//================== OBTENER TODOS LAS MERCANCÍAS ==================//
export async function getCommodities(req: Request, res: Response){
    const offset = Number(req.query.offset);
    const state = Number(req.query.state);

    const queryGet = `SELECT  distinct scuq.store_commodity_unit_quantity_id, scuq.commodity_unit_quantity_id, 
            scuq.store_id, scuq.stock_min, scuq.stock_max, scuq.current_stock, CAST(scuq.last_update AS CHAR) AS last_update, 
            scuq.favorite, scuq.user_id, scuq.state, s.store_name, 
            cuq.commodity_id, cuq.unit_id, cuq.unit_value, cuq.quantity_id, cuq.barcode, cuq.photo, 
            comm.category_id, comm.commodity_name, 
            u.unit_name, u.symbol, cate.category_name, user.username
            FROM store_commodity_unit_quantity scuq
            INNER JOIN store s ON scuq.store_id = s.store_id
            INNER JOIN commodity_unit_quantity cuq ON scuq.commodity_unit_quantity_id = cuq.commodity_unit_quantity_id
            INNER JOIN unit u ON cuq.unit_id = u.unit_id
            INNER JOIN commodity comm ON cuq.commodity_id = comm.commodity_id
            INNER JOIN category cate ON comm.category_id = cate.category_id
            INNER JOIN user ON scuq.user_id = user.user_id
            WHERE state = ${state} ORDER BY commodity_id DESC LIMIT 10 OFFSET ${offset}`;

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


    const queryGet = `SELECT  distinct scuq.store_commodity_unit_quantity_id, scuq.commodity_unit_quantity_id, 
                scuq.store_id, scuq.stock_min, scuq.stock_max, scuq.current_stock, 
                CAST(scuq.last_update AS CHAR) AS last_update, scuq.state,
                scuq.favorite, scuq.user_id, scuq.state, s.store_name, 
                cuq.commodity_id, cuq.unit_id, cuq.unit_value, cuq.quantity_id, cuq.barcode, cuq.photo, 
                comm.category_id, comm.commodity_name, 
                u.unit_name, u.symbol, cate.category_name, user.username
                FROM store_commodity_unit_quantity scuq
                INNER JOIN store s ON scuq.store_id = s.store_id
                INNER JOIN commodity_unit_quantity cuq ON scuq.commodity_unit_quantity_id = cuq.commodity_unit_quantity_id
                INNER JOIN unit u ON cuq.unit_id = u.unit_id
                INNER JOIN commodity comm ON cuq.commodity_id = comm.commodity_id
                INNER JOIN category cate ON comm.category_id = cate.category_id
                INNER JOIN user ON scuq.user_id = user.user_id
                WHERE comm.category_id = ${categoryId} AND scuq.state = ${state} 
                GROUP BY cuq.commodity_id
                ORDER BY commodity_id DESC LIMIT 10 OFFSET ${offset}`;

    return await query(queryGet).then(data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== OBTENER UNA MERCANCÍA POR EL COMMODITY_ID ==================//
export async function getCommodityByCommodityId(req: Request, res: Response) {
    const storeId = req.params.store_id;
    const commodityId = req.params.commodity_id;

    const queryGet = `SELECT  distinct scuq.store_commodity_unit_quantity_id, scuq.commodity_unit_quantity_id, 
            scuq.store_id, scuq.stock_min, scuq.stock_max, scuq.current_stock,CAST(scuq.last_update AS CHAR) AS last_update, 
            scuq.favorite, scuq.user_id,  scuq.state, s.store_name, 
            cuq.commodity_id, cuq.unit_id, cuq.unit_value, cuq.quantity_id, cuq.barcode, cuq.photo, 
            comm.category_id, comm.commodity_name, 
            u.unit_name, u.symbol, cate.category_name, user.username
            FROM store_commodity_unit_quantity scuq
            INNER JOIN store s ON scuq.store_id = s.store_id
            INNER JOIN commodity_unit_quantity cuq ON scuq.commodity_unit_quantity_id = cuq.commodity_unit_quantity_id
            INNER JOIN unit u ON cuq.unit_id = u.unit_id
            INNER JOIN commodity comm ON cuq.commodity_id = comm.commodity_id
            INNER JOIN category cate ON comm.category_id = cate.category_id
            INNER JOIN user ON scuq.user_id = user.user_id
            WHERE cuq.commodity_id = ${commodityId}`;


    return await query(queryGet).then(data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== OBTENER LOS 5 MERCANCÍAS CON MENOS STOCK  ==================//
export async function getCommoditiesWithLessStock(req: Request, res: Response){
    const storeId = req.params.store_id
    const offset = Number(req.query.offset);

    const queryGet = `SELECT  distinct scuq.store_commodity_unit_quantity_id, scuq.commodity_unit_quantity_id, 
                    scuq.store_id, scuq.stock_min, scuq.stock_max, scuq.current_stock,CAST(scuq.last_update AS CHAR) AS last_update, 
                    scuq.favorite, scuq.user_id, scuq.state, s.store_name, 
                    cuq.commodity_id, cuq.unit_id, cuq.unit_value, cuq.quantity_id, cuq.barcode, cuq.photo, 
                    comm.category_id, comm.commodity_name, 
                    u.unit_name, u.symbol, cate.category_name, user.username
                    FROM store_commodity_unit_quantity scuq
                    INNER JOIN store s ON scuq.store_id = s.store_id
                    INNER JOIN commodity_unit_quantity cuq ON scuq.commodity_unit_quantity_id = cuq.commodity_unit_quantity_id
                    INNER JOIN unit u ON cuq.unit_id = u.unit_id
                    INNER JOIN commodity comm ON cuq.commodity_id = comm.commodity_id
                    INNER JOIN category cate ON comm.category_id = cate.category_id
                    INNER JOIN user ON scuq.user_id = user.user_id
                    WHERE scuq.store_id = ${storeId} AND scuq.current_stock<scuq.stock_min  LIMIT 20 OFFSET ${offset}`;
    
    return await query(queryGet).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== BUSCAR COMMODITY POR SU NOMBRE  ==================//
export async function searchCommodity(req: Request, res: Response){
    const search = req.body.query;

    const queryGet = `SELECT commodity_name FROM commodity WHERE commodity_name = '${search}'`;

    return await query(queryGet).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message});

        if(data.result[0][0] == null) data.result[0][0] = '';
        
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0][0]});
    });
}


//================== BUSCAR COMMODITY POR SU NOMBRE  ==================//
export async function searchCommodityByStoreIdAndCategoryId(req: Request, res: Response){
    const categoryId = req.params.category_id;
    const storeId = req.params.store_id;
    const search = req.body.query;
    const state = Number(req.body.state);

    const queryGet = `SELECT  distinct scuq.store_commodity_unit_quantity_id, scuq.commodity_unit_quantity_id, 
            scuq.store_id, scuq.stock_min, scuq.stock_max, scuq.current_stock, 
            CAST(scuq.last_update AS CHAR) AS last_update, 
            scuq.favorite, scuq.user_id, scuq.state, s.store_name, 
            cuq.commodity_id, cuq.unit_id, cuq.unit_value, cuq.quantity_id, cuq.barcode, cuq.photo, 
            comm.category_id, comm.commodity_name, 
            u.unit_name, u.symbol, cate.category_name, user.username
            FROM store_commodity_unit_quantity scuq
            INNER JOIN store s ON scuq.store_id = s.store_id
            INNER JOIN commodity_unit_quantity cuq ON scuq.commodity_unit_quantity_id = cuq.commodity_unit_quantity_id
            INNER JOIN unit u ON cuq.unit_id = u.unit_id
            INNER JOIN commodity comm ON cuq.commodity_id = comm.commodity_id
            INNER JOIN category cate ON comm.category_id = cate.category_id
            INNER JOIN user ON scuq.user_id = user.user_id
            WHERE scuq.store_id = ${storeId} AND comm.category_id = ${categoryId} AND c.commodity_name LIKE "%${search}%" AND scuq.state = ${state}`;

    return await query(queryGet).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== OBTENER TODOS LAS MERCANCÍAS POR EL ID DE LA CATEGORÍA Y DEL ALMACEN ==================//
export async function getCommoditiesByCategoryIdAndStoreId(req: Request, res: Response) {
    const categoryId = req.params.category_id;
    const storeId = req.params.store_id;

    const queryGet = `SELECT  distinct scuq.store_commodity_unit_quantity_id, scuq.commodity_unit_quantity_id, 
                    scuq.store_id, scuq.stock_min, scuq.stock_max, scuq.current_stock, scuq.last_update, 
                    scuq.favorite, scuq.user_id, s.store_name, 
                    cuq.commodity_id, cuq.unit_id, cuq.unit_value, cuq.quantity_id, cuq.barcode, cuq.photo, 
                    cuq.state, comm.category_id, comm.commodity_name, 
                    u.unit_name, u.symbol, cate.category_name, user.username
                    FROM store_commodity_unit_quantity scuq
                    INNER JOIN store s ON scuq.store_id = s.store_id
                    INNER JOIN commodity_unit_quantity cuq ON scuq.commodity_unit_quantity_id = cuq.commodity_unit_quantity_id
                    INNER JOIN unit u ON cuq.unit_id = u.unit_id
                    INNER JOIN commodity comm ON cuq.commodity_id = comm.commodity_id
                    INNER JOIN category cate ON comm.category_id = cate.category_id
                    INNER JOIN user ON scuq.user_id = user.user_id
                    WHERE scuq.store_id = ${storeId} AND comm.category_id = ${categoryId}`;
                    
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
        if(!dataCheck.ok) return res.status(dataCheck.status).json({ok: false, message: dataCheck.message})
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