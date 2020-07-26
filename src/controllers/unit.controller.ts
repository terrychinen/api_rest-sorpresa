import { connect } from '../database';
import { Request, Response } from 'express';
import { Unit } from '../interfaces/unit.interfaces';




//================== OBTENER TODAS LAS UNIDADES ==================//
export async function getUnits(req: Request, res: Response): Promise<Response> {
    try{
        const conn = await connect();
        const units = await conn.query('SELECT * FROM unit');
    
        return res.status(200).json({
            ok: true,
            message: 'Query successful',
            Units: units[0]
        });    

    }catch(error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal Server error',
        });
    }
}



//================== OBTENER UNA UNIDAD POR SU ID ==================//
export async function getUnit(req: Request, res: Response): Promise<Response> {
    try{
        const id = req.params.unit_id;
        const conn = await connect();
        const unit = await conn.query('SELECT * FROM unit WHERE category_id = ?', [id]);
    
        return res.status(200).json({
            ok: true,
            message: 'Query successful',
            unit: unit[0]
        });

    }catch(error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal Server error'
        });
    }
}


//================== CREAR UNA UNIDAD ==================//
export async function createUnit(req: Request, res: Response) {
    try{
        const unit: Unit = req.body;
        const conn = await connect();

        await conn.query({
            sql: 'SELECT * FROM unit WHERE unit_name = ? LIMIT 1',
            values: unit.unit_name
        }, async function(error, unitDB: Unit[]) {
            if(error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Internal Server error'
                });
            }

            if(unitDB[0]) {
                return res.status(400).json({
                    ok :false,
                    message: 'Unit name already exists',
                });
            }

            await conn.query('INSERT INTO unit SET ?', unit);
    
            return res.status(200).json({
                ok: true,
                message: 'Unit created',
                unit
            });

        });
    
 
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            messsage: 'Internal Server error'
        });
    }
}


//================== ACTUALIZAR UNA UNIDAD ==================//
export async function updateUnit(req: Request, res: Response) {
    try{
        const id = req.params.unit_id;
        const updateUnit = req.body;
        const conn = await connect();

        await conn.query({
            sql: 'SELECT * FROM unit WHERE unit_id = ? LIMIT 1',
            values: id 
        }, async function(error, unitDB: Unit[]) {
            if(error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Internal Server error'
                });
            }

            if(!unitDB[0]) {
                return res.status(400).json({
                    ok: false,
                    message: 'The unit does not exist'
                });
            }
            
            await conn.query('UPDATE unit SET ? WHERE unit_id = ?', [updateUnit, id]);
    
            return res.status(200).json({
                ok: true,
                message: 'Unit updated',
                unit: id
            });
        });
        
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            messsage: 'Internal Server error'
        });
    }
}


//================== ELIMINAR UNA UNIDAD POR SU ID ==================//
export async function deleteUnit(req: Request, res: Response) {
    try{
        const id = req.params.unit_id;
        const conn = await connect();

        conn.query({
            sql: 'SELECT * FROM unit WHERE unit_id = ? LIMIT 1',
            values: id
        }, async function(error, unitDB: Unit[]) {
            if(error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Internal Server error'
                });
            }

            if(!unitDB[0]) {
                return res.status(400).json({
                    ok: false,
                    message: 'The unit does not exist'
                });
            }

            await conn.query('DELETE FROM unit WHERE unit_id = ?', [id]);
    
            return res.json({
                ok: true,
                message: 'Unit deleted',
                unit: id
            });

        });

    }catch(error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            messsage: 'Internal Server error'
        });
    }
}