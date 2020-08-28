import { Request, Response } from 'express';
import { IUnit } from '../interfaces/unit.interface';
import { checkIfDataExist } from '../queries/search.query';
import { queryGet, queryGetBy, queryInsert, queryDelete, queryUpdate } from '../queries/query';



//================== OBTENER TODAS LAS UNIDADES ==================//
export async function getUnits(req: Request, res: Response) {
    const tableName = 'unit';
    const offset = Number(req.query.offset);
    return await queryGet(tableName, offset).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== OBTENER UNA UNIDAD POR SU ID ==================//
export async function getUnit(req: Request, res: Response) {
    const search = req.params.unit_id;
    const tableName = 'unit';
    const columnName = 'unit_id';

    await await queryGetBy(tableName, columnName, search).then( data => {
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
    const value = req.params.unit_id;

    await checkIfDataExist(tableName, columnName, value).then( async dataCheck => {
        if(!dataCheck.ok) {return res.status(dataCheck.status).json({ok: false, message: dataCheck.message})}

        return await queryDelete(tableName, columnName, value).then( data => {
            if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
            
            return res.status(data.status).json({ok: true, message: data.message});
        });
    });
}