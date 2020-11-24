import { Request, Response } from 'express';
import { IStore } from '../interfaces/store.interface';
import { query } from '../queries/query';


//================== OBTENER TODAS LOS ALMACENES ==================//
export async function getStores(req: Request, res: Response){
    const offset = Number(req.query.offset);
    const state = Number(req.query.state);

    const queryGet = `SELECT * FROM store WHERE state = ${state} ORDER BY store_id DESC`;

    return await query(queryGet).then(data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== OBTENER UN ALMACÉN POR SU ID ==================//
export async function getStore(req: Request, res: Response) {
    const search = req.params.store_id;
    const state = req.params.state;

    const queryGet = `SELECT * FROM store WHERE store_id = "${search}" AND state = ${state}`;

    return await query(queryGet).then(data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== BUSCAR ALMACEN POR SU NOMBRE  ==================//
export async function searchStore(req: Request, res: Response){
    const search = req.body.query;
    const state = Number(req.body.state);

    const queryString = `SELECT * FROM store WHERE store_name LIKE "%${search}%" AND state = ${state} ORDER BY store_name DESC`;

    return await query(queryString).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== CREAR UN ALMACÉN ==================//
export async function createStore(req: Request, res: Response) {
    const store: IStore = req.body;

    const storeName = store.store_name;
    store.store_name = storeName.charAt(0).toUpperCase() + storeName.slice(1);


    const queryCheck = `SELECT * FROM store WHERE store_name = "${store.store_name}"`;
   
    return await query(queryCheck).then(async dataCheck => {
        if(dataCheck.result[0][0] != null) {return res.status(400).json({ok: false, message: 'El almacen ya existe!'});}
        const queryInsert = `INSERT INTO store (store_name, state) VALUES ("${store.store_name}", "${store.state}")`;

        return await query(queryInsert).then(data => {
            if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
            return res.status(data.status).json({ok: true, message: 'El Almacen se ha creado correctamente'});
        });
    });
}


//================== ACTUALIZAR UN ALMACÉN ==================//
export async function updateStore(req: Request, res: Response) {
    const store: IStore = req.body;
    const storeId = req.params.store_id;

     const storeName = store.store_name;
     store.store_name = storeName.charAt(0).toUpperCase() + storeName.slice(1);

    const queryCheckId = `SELECT * FROM store WHERE store_id = "${storeId}"`;

    return await query(queryCheckId).then(async dataCheckId => {
        if(dataCheckId.result[0][0] == null) {return res.status(400).json({ok: false, message: `El almacen con el id ${storeId} no existe!`});};
        const queryCheck = `SELECT * FROM store WHERE store_name = "${store.store_name}"`;

        return await query(queryCheck).then(async dataCheck => {
            if(dataCheck.result[0][0] != null) {return res.status(400).json({ok: false, message: 'El almacen ya existe!'});}
            const queryUpdate = `UPDATE store SET store_name = "${store.store_name}", state = "${store.state}" WHERE store_id = "${storeId}"`;    

            return await query(queryUpdate).then(async dataUpdate => {
                if(!dataUpdate.ok) return res.status(dataUpdate.status).json({ok: false, message: dataUpdate.message})    
                return res.status(dataUpdate.status).json({ok: true, message: 'El almacen se actualizó correctamente'});
            });
        });
    });
}


//================== ELIMINAR UN ALMACÉN POR SU ID ==================//
export async function deleteStore(req: Request, res: Response) {
    const storeId = req.params.store_id;

    const queryCheckId = `SELECT * FROM store WHERE store_id = "${storeId}"`;

    return await query(queryCheckId).then(async dataCheckId => {
        if(dataCheckId.result[0][0] == null) {return res.status(400).json({ok: false, message: `El almacen con el id ${storeId} no existe!`});};
        const queryDelete = `DELETE store WHERE store_id = "${storeId}"`;

        return await query(queryDelete).then(dataDelete => {
            if(!dataDelete.ok) return res.status(dataDelete.status).json({ok: false, message: dataDelete.message})
            return res.status(dataDelete.status).json({ok: true, message: 'El almacen se eliminó correctamente'});
        });
    });
}


//================== OBTENER TODAS LOS ALMACENES ORDER BY STORE ID ==================//
export async function getStoresOrderById(req: Request, res: Response){
    const state = Number(req.query.state);
    const offset = Number(req.query.offset);
    const storeIdList = req.query.store_id;
    
    var queryGet = '';
    var storesIdsString = '';

    if(storeIdList != null){
        for(var i=0; i<storeIdList.length; i++){storesIdsString += '"'+storeIdList[i]+'"' + ',';}
        var cutStoresIdsString = storesIdsString.substring(0, storesIdsString.length - 1);
        queryGet = `SELECT * FROM store WHERE state = ${state} ORDER BY FIELD(category_id, "${cutStoresIdsString}") DESC LIMIT 10 OFFSET ${offset}`;
    }else{
        queryGet = `SELECT * FROM store WHERE state = ${state} ORDER BY store_id DESC LIMIT 10 OFFSET ${offset}`;
    }

    return await query(queryGet).then(data => {
        console.log(data.message);
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== OBTENER LOS ALMACENES POR EL ID DEL PRODUCTO ==================//
export async function getStoresByCommodityId(req: Request, res: Response) {
    const commodityId = req.query.commodity_id;
    const state = req.query.state;

    const queryGet = `SELECT DISTINCT scuq.store_id, 
            (SELECT DISTINCT store_name FROM store s WHERE s.store_id = scuq.store_id)store_name 
            FROM store_commodity_unit_quantity scuq 
            WHERE commodity_unit_quantity_id IN (SELECT commodity_unit_quantity_id FROM commodity_unit_quantity WHERE commodity_id = "${commodityId}") 
            AND scuq.state = ${state}`;

    return await query(queryGet).then(data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


