import { Request, Response } from 'express';
import { IRole } from '../interfaces/role.interface';
import { query } from '../queries/query';


//================== OBTENER TODAS LOS ROLES ==================//
export async function getRoles(req: Request, res: Response) {
    const offset = Number(req.query.offset);
    const state = Number(req.query.state);

    const queryGet = `SELECT * FROM role WHERE state = ${state} ORDER BY role_id DESC LIMIT 10 OFFSET ${offset}`;

    return await query(queryGet).then(data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== OBTENER UN ROL POR SU ID ==================//
export async function getRole(req: Request, res: Response) {
    const search = req.params.role_id;
    const state = req.params.state;

    const queryGet = `SELECT * FROM role WHERE role_id = "${search}" AND state = ${state}`;

    return await query(queryGet).then(data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    }); 
}


//================== BUSCAR ROL POR SU NOMBRE  ==================//
export async function searchRole(req: Request, res: Response){
    const search = req.body.query;
    const state = Number(req.body.state);

    const queryString = `SELECT * FROM role WHERE role_name LIKE "%${search}%" AND state = ${state} LIMIT 10`;

    return await query(queryString).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== CREAR UN ROL ==================//
export async function createRole(req: Request, res: Response) {
    const role: IRole = req.body;
    const tableName = 'role';
    const columnName = 'role_name';

    const queryCheck = `SELECT * FROM role WHERE role_name = "${role.role_name}"`;
   
    return await query(queryCheck).then(async dataCheck => {
        if(dataCheck.result[0][0] != null) {return res.status(400).json({ok: false, message: 'El rol ya existe!'});}
        const queryInsert = `INSERT INTO role (role_name, state) VALUES ("${role.role_name}", "${role.state}")`;

        return await query(queryInsert).then(data => {
            if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
            return res.status(data.status).json({ok: true, message: 'Rol creado correctamente'});
        });
    });
}


//================== ACTUALIZAR UN ROL ==================//
export async function updateRole(req: Request, res: Response) {
    const role: IRole = req.body;
    const roleId = req.params.role_id;

    const queryCheckId = `SELECT * FROM role WHERE role_id = "${roleId}"`;

    return await query(queryCheckId).then(async dataCheckId => {
        if(dataCheckId.result[0][0] == null) {return res.status(400).json({ok: false, message: `El rol con el id ${roleId} no existe!`});};

        const queryCheck = `SELECT * FROM role WHERE role_name = "${role.role_name}"`;

        return await query(queryCheck).then(async dataCheck => {
            if(dataCheck.result[0][0] != null) {return res.status(400).json({ok: false, message: 'El rol ya existe!'});}
            const queryUpdate = `UPDATE role SET role_name="${role.role_name}", state = "${role.state}" WHERE role_id = "${roleId}"`;    

            return await query(queryUpdate).then(async dataUpdate => {
                if(!dataUpdate.ok) return res.status(dataUpdate.status).json({ok: false, message: dataUpdate.message})    
                return res.status(dataUpdate.status).json({ok: true, message: 'El rol se actualizó correctamente'});
            });
        });
    });
}


//================== ELIMINAR UN ROL POR SU ID ==================//
export async function deleteRole(req: Request, res: Response) {
    const roleId = req.params.role_id;

    const queryCheckId = `SELECT * FROM role WHERE role_id = "${roleId}"`;

    return await query(queryCheckId).then(async dataCheckId => {
        if(dataCheckId.result[0][0] == null) {return res.status(400).json({ok: false, message: `El rol con el id ${roleId} no existe!`});};
        const queryDelete = `DELETE role WHERE role_id = "${roleId}"`;

        return await query(queryDelete).then(dataDelete => {
            if(!dataDelete.ok) return res.status(dataDelete.status).json({ok: false, message: dataDelete.message})
            
            return res.status(dataDelete.status).json({ok: true, message: 'El rol se eliminó correctamente'});
        });
    });
}