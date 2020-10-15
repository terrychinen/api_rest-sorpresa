import { Request, Response } from 'express';
import { IUnit } from '../interfaces/unit.interface';
import { checkIfDataExist } from '../queries/search.query';
import { query, queryGet, queryGetBy, queryOrderbyId, queryInsert, queryDelete, queryUpdate } from '../queries/query';



//================== OBTENER TODAS LAS UNIDADES ==================//
export async function getUnits(req: Request, res: Response) {
    const tableName = 'unit';
    const columnName = 'unit_id';
    const offset = Number(req.query.offset);
    const state = Number(req.query.state);
    return await queryGet(tableName, columnName, offset, state).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== OBTENER UNA UNIDAD POR SU ID ==================//
export async function getUnit(req: Request, res: Response) {
    const search = req.params.unit_id;
    const state = req.params.state;
    const tableName = 'unit';
    const columnName = 'unit_id';

    await await queryGetBy(tableName, columnName, search, state).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== BUSCAR UNIDAD POR SU NOMBRE  ==================//
export async function searchUnit(req: Request, res: Response){
    const search = req.body.query;
    const state = Number(req.body.state);

    const queryString = `SELECT * FROM unit WHERE unit_name LIKE "%${search}%" AND state = ${state} ORDER BY unit_name DESC`;

    return await query(queryString).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== CREAR UNA UNIDAD ==================//
export async function createUnit(req: Request, res: Response) {
    const unit: IUnit = req.body;
    const tableName = 'unit';
    const columnName = 'unit_name';

    //VERIFICA SI LA UNIDAD EXISTE
    return await checkIfDataExist(tableName, columnName, unit.unit_name).then( async dataCheck => {
        if(dataCheck.ok) return res.status(dataCheck.status).json({ok: false, message: dataCheck.message});
        
        //INSERTA LA NUEVA UNIDAD
        return await queryInsert(tableName, unit).then( data => {
            if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
            
            return res.status(data.status).json({ok: true, message: data.message});
        });
    });
}


//================== ACTUALIZAR UNA UNIDAD ==================//
export async function updateUnit(req: Request, res: Response) {
    const unit: IUnit = req.body;
    const unitId = req.params.unit_id;
    const tableName = 'unit';
    const columnId = 'unit_id';
    const columnName = 'unit_name';

    //VERIFICA SI EXISTE EL ID PARA ACTUALIZAR
    await checkIfDataExist(tableName, columnId, unitId).then( async dataCheck => {
        if(!dataCheck.ok) {return res.status(404).json({ok: false, message: dataCheck.message})}

        //VERIFICA SI YA HAY UNA UNIDAD CON EL MISMO NOMBRE PARA NO ACTUALIZAR
        return await checkIfDataExist(tableName, columnName, unit.unit_name).then( async dataCheckRepeat => {
            if(dataCheckRepeat.ok) {return res.status(400).json({ok: false, message: dataCheckRepeat.message})}
            //ACTUALIZA EL REGISTRO
            return await queryUpdate(tableName, columnId, unit, unitId).then( data => {
                if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
            
                return res.status(data.status).json({ok: true, message: data.message});
            });
        });
    });
}


//================== ELIMINAR UNA UNIDAD POR SU ID ==================//
export async function deleteUnit(req: Request, res: Response) {
    const tableName = 'unit';
    const columnName = 'unit_id';
    const unitId = req.params.unit_id;

     //VERIFICA SI EXISTE EL ID PARA ACTUALIZAR
    await checkIfDataExist(tableName, columnName, unitId).then( async dataCheck => {
        if(!dataCheck.ok) {return res.status(404).json({ok: false, message: dataCheck.message})}

         //ELIMINA EL REGISTRO
        return await queryDelete(tableName, columnName, unitId).then( data => {
            if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
            
            return res.status(data.status).json({ok: true, message: data.message});
        });
    });
}


//================== OBTENER TODAS LAS UNIDADES ORDER BY UNIT ID ==================//
export async function getUnitsById(req: Request, res: Response){
    const tableName = 'unit';
    const offset = Number(req.query.offset);
    const state = Number(req.query.state);
    const unitId = '"' +req.params.unit_id +'"';
    const columnName = `unit_id`;

    return await queryOrderbyId(tableName, columnName, unitId, offset, state).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}