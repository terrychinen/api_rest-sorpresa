import { Request, Response } from 'express';
import { IStore } from '../interfaces/store.interface';
import { checkIfDataExist } from '../queries/search.query';
import { queryGet, queryGetBy, queryInsert, queryDelete, queryUpdate } from '../queries/query';


//================== OBTENER TODAS LOS ALMACENES ==================//
export async function getStores(req: Request, res: Response){
    const tableName = 'store';
    const offset = Number(req.query.offset);
    const state = Number(req.query.state);
    return await queryGet(tableName, offset, state).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== OBTENER UN ALMACÉN POR SU ID ==================//
export async function getStore(req: Request, res: Response) {
    const search = req.params.store_id;
    const tableName = 'store';
    const columnName = 'store_id';

    return await queryGetBy(tableName, columnName, search).then( data => {
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
    const columnName = 'store_id';

    //VERIFICA SI EXISTE EL ID PARA ACTUALIZAR
    return await checkIfDataExist(tableName, columnName, storeId).then( async dataCheck => {
        if(!dataCheck.ok) {return res.status(404).json({ok: false, message: dataCheck.message})}

        //VERIFICA SI YA HAY UN ALMACÉN CON EL MISMO NOMBRE PARA NO ACTUALIZAR
        return await checkIfDataExist(tableName, columnName, store.store_name).then( async dataCheckRepeat => {
            if(dataCheckRepeat.ok) {return res.status(400).json({ok: false, message: dataCheckRepeat.message})}

            //ACTUALIZA EL REGISTRO
            return await queryUpdate(tableName, columnName, store, storeId).then( data => {
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