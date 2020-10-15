import { connect } from '../database';
import { Request, Response } from 'express';
import { IStore } from '../interfaces/store.interface';
import { checkIfDataExist } from '../queries/search.query';
import { query, queryGet, queryGetWithoutOffset, queryGetBy, queryOrderbyId, queryInsert, queryDelete, queryUpdate } from '../queries/query';


//================== OBTENER TODAS LOS ALMACENES ==================//
export async function getStores(req: Request, res: Response){
    const tableName = 'store';
    const columnName = 'store_id';
    const state = Number(req.query.state);
    
    return await queryGetWithoutOffset(tableName, columnName, state).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== OBTENER UN ALMACÉN POR SU ID ==================//
export async function getStore(req: Request, res: Response) {
    const search = req.params.store_id;
    const state = req.params.state;
    const tableName = 'store';
    const columnName = 'store_id';

    return await queryGetBy(tableName, columnName, search, state).then( data => {
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
    const tableName = 'store';
    const columnName = 'store_name';

    //VERIFICA SI EL ALMACÉN EXISTE
    return await checkIfDataExist(tableName, columnName, store.store_name).then( async dataCheck => {
        if(dataCheck.ok) return res.status(403).json({ok: false, message: dataCheck.message});
        if(dataCheck.status == 500) return res.status(500).json({ok: false, message: dataCheck.message});

         //INSERTA EL NUEVO ALMACÉN
         return await queryInsert(tableName, store).then( data => {
            if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
            
            return res.status(data.status).json({ok: true, message: data.message});
        });

    });
}


//================== ACTUALIZAR UN ALMACÉN ==================//
export async function updateStore(req: Request, res: Response) {
    const store: IStore = req.body;
    const storeId = req.params.store_id;
    const tableName = 'store';
    const columnStoreID = 'store_id';
    const columnStoreName = 'store_name';

    //VERIFICA SI EXISTE EL ID PARA ACTUALIZAR
    return await checkIfDataExist(tableName, columnStoreID, storeId).then( async dataCheck => {
        if(!dataCheck.ok) {return res.status(404).json({ok: false, message: dataCheck.message})}

        //VERIFICA SI YA HAY UN ALMACÉN CON EL MISMO NOMBRE PARA NO ACTUALIZAR
        return await checkIfDataExist(tableName, columnStoreName, store.store_name).then( async dataCheckRepeat => {
            if(dataCheckRepeat.ok) {return res.status(400).json({ok: false, message: dataCheckRepeat.message})}

            //ACTUALIZA EL REGISTRO
            return await queryUpdate(tableName, columnStoreID, store, storeId).then( data => {
                if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
                
                return res.status(data.status).json({ok: true, message: data.message});
            });
        });
    });
}


//================== ELIMINAR UN ALMACÉN POR SU ID ==================//
export async function deleteStore(req: Request, res: Response) {
    const storeId = req.params.store_id;
    const tableName = 'store';
    const columnName = 'store_id';

    //VERIFICA SI EXISTE EL ID PARA ACTUALIZAR
    return await checkIfDataExist(tableName, columnName, storeId).then( async dataCheck => {
        if(!dataCheck.ok) {return res.status(dataCheck.status).json({ok: false, message: dataCheck.message})}

         //ELIMINA EL REGISTRO (state = 0)
        return await queryDelete(tableName, columnName, storeId).then( data => {
            if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
            
            return res.status(data.status).json({ok: true, message: data.message});
        });
    });
}


//================== OBTENER TODAS LOS ALMACENES ORDER BY STORE ID ==================//
export async function getStoresOrderById(req: Request, res: Response){
    const tableName = 'store';
    const state = Number(req.query.state);
    const storeIdList = req.query.store_id;
    const columnName = `store_id`;

    var storesIdsString = '';

    if(storeIdList != null){
        for(var i=0; i<storeIdList.length; i++){
            storesIdsString += '"'+storeIdList[i]+'"' + ',';
        }
   
       var cutStoresIdsString = storesIdsString.substring(0, storesIdsString.length - 1);
   
        console.log(cutStoresIdsString);
   
       return await queryOrderbyId(tableName, columnName, cutStoresIdsString, 0, state).then( data => {
           if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
           
           return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
       });
    }else{
        return await queryGetWithoutOffset(tableName, columnName, state).then( data => {
            if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
            
            return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
        });
    }
}


//================== OBTENER LOS ALMACENES POR EL ID DEL PRODUCTO ==================//
export async function getStoresByCommodityId(req: Request, res: Response) {
    const commodityId = req.query.commodity_id;
    const state = req.query.state;

    const columnName = 'commodity_id';

    try{
        const conn = await connect();

        const queryString = `SELECT store_id, 
        (SELECT store_name FROM store s WHERE s.store_id = sm.store_id)store_name,  
        (SELECT state FROM store s WHERE s.store_id = sm.store_id)state  
        FROM store_commodity sm WHERE commodity_id = ${commodityId} and state = ${state}`;

        const queryStoreCommmodity = await conn.query(queryString);

        conn.end();
    
        if(!queryStoreCommmodity)  return res.status(400).json({ok: false, message: 'GET BY '+columnName +' error: store_commodity', result: []})
        return res.status(200).json({
            ok: true, 
            message: 'GET BY '+columnName +' successful: Commodity',
            result: queryStoreCommmodity[0],
        });

    }catch(e){return res.status(500).json({ok: false, message: e.toString(), result: []});}
}


