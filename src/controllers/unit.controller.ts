import { Request, Response } from 'express';
import { IUnit } from '../interfaces/unit.interface';
import { query } from '../queries/query';



//================== OBTENER TODAS LAS UNIDADES ==================//
export async function getUnits(req: Request, res: Response) {
    const offset = Number(req.query.offset);
    const state = Number(req.query.state);

    const queryGet = `SELECT * FROM unit WHERE state = ${state} ORDER BY unit_id DESC LIMIT 10 OFFSET ${offset}`;

    return await query(queryGet).then(data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== OBTENER UNA UNIDAD POR SU ID ==================//
export async function getUnit(req: Request, res: Response) {
    const search = req.params.unit_id;
    const state = req.params.state;

    const queryGet = `SELECT * FROM unit WHERE unit_id = "${search}" AND state = ${state}`;

    return await query(queryGet).then(data => {
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

    const queryCheck = `SELECT * FROM unit WHERE unit_name = "${unit.unit_name}"`;
   
    return await query(queryCheck).then(async dataCheck => {
        if(dataCheck.result[0][0] != null) {return res.status(400).json({ok: false, message: 'La unidad ya existe!'});}
        const queryInsert = `INSERT INTO unit (unit_name, symbol, state) VALUES ("${unit.unit_name}", "${unit.symbol}", "${unit.state}")`;

        return await query(queryInsert).then(data => {
            if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
            return res.status(data.status).json({ok: true, message: 'Unidad creado correctamente'});
        });
    });
}


//================== ACTUALIZAR UNA UNIDAD ==================//
export async function updateUnit(req: Request, res: Response) {
    const unit: IUnit = req.body;
    const unitId = req.params.unit_id;

    const queryCheckId = `SELECT * FROM unit WHERE unit_id = "${unitId}"`;

    return await query(queryCheckId).then(async dataCheckId => {
        if(dataCheckId.result[0][0] == null) {return res.status(400).json({ok: false, message: `La unidad con el id ${unitId} no existe!`});};

        const queryCheckUnitName = `SELECT unit_id FROM unit WHERE unit_name = "${unit.unit_name}" AND unit_id != "${unitId}"`;

        return await query(queryCheckUnitName).then(async dataCheckUnit => {
            if(dataCheckUnit.result[0][0] != null) {return res.status(400).json({ok: false, message: 'El nombre de la unidad ya existe!'});}

            const queryCheckUnitSymbol = `SELECT unit_id FROM unit WHERE symbol = "${unit.unit_name}" AND unit_id != "${unitId}"`;

            return await query(queryCheckUnitSymbol).then(async dataCheckSymbol => {
                if(dataCheckSymbol.result[0][0] != null) {return res.status(400).json({ok: false, message: 'El símbolo de la unidad ya existe!'});}
                const queryUpdate = `UPDATE unit SET unit_name = "${unit.unit_name}", symbol = ${unit.symbol}, state = "${unit.state}" WHERE unit_id = "${unitId}"`;    

                return await query(queryUpdate).then(async dataUpdate => {
                    if(!dataUpdate.ok) return res.status(dataUpdate.status).json({ok: false, message: dataUpdate.message})    
                    return res.status(dataUpdate.status).json({ok: true, message: 'La unidad se actualizó correctamente'});
                });
            });
        });
    });
}


//================== ELIMINAR UNA UNIDAD POR SU ID ==================//
export async function deleteUnit(req: Request, res: Response) {
    const unitId = req.params.unit_id;

    const queryCheckId = `SELECT * FROM unit WHERE unit_id = "${unitId}"`;

    return await query(queryCheckId).then(async dataCheckId => {
        if(dataCheckId.result[0][0] == null) {return res.status(400).json({ok: false, message: `La unidad con el id ${unitId} no existe!`});};
        const queryDelete = `DELETE unit WHERE unit_id = "${unitId}"`;

        return await query(queryDelete).then(dataDelete => {
            if(!dataDelete.ok) return res.status(dataDelete.status).json({ok: false, message: dataDelete.message})
            
            return res.status(dataDelete.status).json({ok: true, message: 'La unidad se eliminó correctamente'});
        });
    });
}


//================== OBTENER TODAS LAS UNIDADES ORDER BY UNIT ID ==================//
export async function getUnitsById(req: Request, res: Response){
    const unitId = req.params.unit_id;
    const offset = Number(req.query.offset);
    const state = Number(req.query.state);

    const queryGet = `SELECT * FROM unit WHERE state = ${state} ORDER BY FIELD(unit_id, "${unitId}") DESC LIMIT 10 OFFSET ${offset}`;

    return await query(queryGet).then(data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}