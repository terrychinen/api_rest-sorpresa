import { Request, Response } from 'express';
import { query } from '../queries/query';
import { IQuantity } from '../interfaces/quantity.interface';


//================== OBTENER TODAS LAS CANTIDADES ==================//
export async function getQuantities(req: Request, res: Response) {
    const offset = Number(req.query.offset);
    const state = Number(req.query.state);

    const queryGet = `SELECT * FROM quantity WHERE state = ${state} ORDER BY quantity_id DESC LIMIT 10 OFFSET ${offset}`;

    return await query(queryGet).then(data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== OBTENER UNA CANTIDAD POR SU ID ==================//
export async function getQuantity(req: Request, res: Response) {
    const search = req.params.quantity_id;
    const state = req.params.state;

    const queryGet = `SELECT * FROM quantity WHERE quantity_id = "${search}" AND state = ${state}`;

    return await query(queryGet).then(data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    }); 
}


//================== BUSCAR CANTIDAD POR SU NOMBRE  ==================//
export async function searchQuantity(req: Request, res: Response){
    const search = req.body.query;
    const state = Number(req.body.state);

    const querySearch = `SELECT * FROM quantity WHERE quantity_name LIKE "%${search}%" AND state = ${state} LIMIT 10`;

    return await query(querySearch).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== CREAR UNA CANTIDAD ==================//
export async function createQuantity(req: Request, res: Response) {
    const quantity: IQuantity = req.body;

    const queryCheckQuantityName = `SELECT * FROM quantity WHERE quantity_name = "${quantity.quantity_name}"`;

    return await query(queryCheckQuantityName).then(async dataCheckQuantityName => {
        if(dataCheckQuantityName.result[0][0] != null) {return res.status(400).json({ok: false, message: 'La abreviatura del nombre de la cantidad ya existe!'});}
        const queryCheckShortName = `SELECT * FROM quantity WHERE short_name = "${quantity.short_name}"`;

        return await query(queryCheckShortName).then(async dataCheckShortName => {
            if(dataCheckShortName.result[0][0] != null) {return res.status(400).json({ok: false, message: 'El nombre de la "cantidad" ya existe!'});}
            const queryInsert = `INSERT INTO role (quantity_name, short_name state) VALUES ("${quantity.quantity_name}", "${quantity.short_name} "${quantity.state}")`;
    
            return await query(queryInsert).then(data => {
                if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
                return res.status(data.status).json({ok: true, message: 'La "cantidad" se ha creado correctamente'});
            });
        });
    });
}


//================== ACTUALIZAR UNA CANTIDAD ==================//
export async function updateQuantity(req: Request, res: Response) {
    const quantity: IQuantity = req.body;
    const quantityId = req.params.quantity_id;

    const queryCheckId = `SELECT * FROM quantity WHERE quantity_id = "${quantityId}"`;

    return await query(queryCheckId).then(async dataCheckId => {
        if(dataCheckId.result[0][0] == null) {return res.status(400).json({ok: false, message: `La "cantidad" con el id ${quantityId} no existe!`});};

        const queryCheckQuantityName = `SELECT quantity_id FROM quantity WHERE quantity_name = "${quantity.quantity_name}" AND quantity_id != "${quantityId}"`;

        return await query(queryCheckQuantityName).then(async dataCheckQuantityName => {
            if(dataCheckQuantityName.result[0][0] != null) {return res.status(400).json({ok: false, message: 'El nombre de la "cantidad" ya existe!'});}

            const queryCheckShortName = `SELECT quantity_id FROM quantity WHERE short_name = "${quantity.short_name}" AND quantity_id != "${quantityId}"`;

            return await query(queryCheckShortName).then(async dataCheckShortName => {
                if(dataCheckShortName.result[0][0] != null) {return res.status(400).json({ok: false, message: 'La abreviatura de la cantidad ya existe!'});}
                const queryUpdate = `UPDATE quantity SET quantity_name = "${quantity.quantity_name}", short_name = ${quantity.short_name}, 
                                        state = "${quantity.state}" WHERE quantity = "${quantityId}"`;    

                return await query(queryUpdate).then(async dataUpdate => {
                    if(!dataUpdate.ok) return res.status(dataUpdate.status).json({ok: false, message: dataUpdate.message})    
                    return res.status(dataUpdate.status).json({ok: true, message: 'La "cantidad" se actualizó correctamente'});
                });
            });
        });
    });
}


//================== ELIMINAR UNA CANTIDAD POR SU ID ==================//
export async function deleteQuantity(req: Request, res: Response) {
    const quantityId = req.params.quantity_id;

    const queryCheckId = `SELECT * FROM quantity WHERE quantity_id = "${quantityId}"`;

    return await query(queryCheckId).then(async dataCheckId => {
        if(dataCheckId.result[0][0] == null) {return res.status(400).json({ok: false, message: `La "cantidad" con el id ${quantityId} no existe!`});};
        const queryDelete = `DELETE quantity WHERE quantity_id = "${quantityId}"`;

        return await query(queryDelete).then(dataDelete => {
            if(!dataDelete.ok) return res.status(dataDelete.status).json({ok: false, message: dataDelete.message})
            
            return res.status(dataDelete.status).json({ok: true, message: 'La "cantidad" se eliminó correctamente'});
        });
    });
}