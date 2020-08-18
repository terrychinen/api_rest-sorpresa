import { Request, Response } from 'express';
import { IRole } from '../interfaces/role.interface';
import { checkIfDataExist } from '../queries/search.query';
import { queryGet, queryGetBy, queryInsert, queryDelete, queryUpdate } from '../queries/query';


//================== OBTENER TODAS LOS ROLES ==================//
export async function getRoles(req: Request, res: Response) {
    const tableName = 'role';
    const offset = Number(req.query.offset);
    return await queryGet(tableName, offset).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, error: data.error})
        
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== OBTENER UN ROL POR SU ID ==================//
export async function getRole(req: Request, res: Response) {
    const search = req.params.role_id;

    const tableName = 'role';
    const columnName = 'role_id';
    return await queryGetBy(tableName, columnName, search).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, error: data.error})
        
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });   
}


//================== CREAR UN ROL ==================//
export async function createRole(req: Request, res: Response) {
    const role: IRole = req.body;
    const tableName = 'role';
    const columnName = 'role_name';

    //VERIFICA SI EL ROL EXISTE
    return await checkIfDataExist(tableName, columnName, role.role_name).then( async dataCheck => {
        if(dataCheck.ok) return res.status(dataCheck.status).json({ok: true, message: dataCheck.message});
 
        //INSERTA EL NUEVO ROL
        return await queryInsert(tableName, role).then( data => {
            if(!data.ok) return res.status(data.status).json({ok: false, message: data.error})
            
            return res.status(data.status).json({ok: true, message: data.message});
        });
    });
}


//================== ACTUALIZAR UN ROL ==================//
export async function updateRole(req: Request, res: Response) {
    const role: IRole = req.body;
    const tableName = 'role';
    const columnName = 'role_id';

    //VERIFICA SI EXISTE EL ID PARA ACTUALIZAR
    return await checkIfDataExist(tableName, columnName, role.role_id).then( async dataCheck => {
        if(!dataCheck.ok) {return res.status(dataCheck.status).json({ok: false, message: dataCheck.message})}

        //VERIFICA SI YA HAY UN ROL CON EL MISMO NOMBRE PARA NO ACTUALIZAR
        return await checkIfDataExist(tableName, columnName, role.role_name).then( async dataCheckRepeat => {
            if(dataCheckRepeat.ok) {return res.status(dataCheckRepeat.status).json({ok: false, message: dataCheckRepeat.message})}

             //ACTUALIZA EL REGISTRO
            return await queryUpdate(tableName, columnName, role, role.role_id).then( data => {
                if(!data.ok) return res.status(data.status).json({ok: false, error: data.error})
                
                return res.status(data.status).json({ok: true, message: data.message});
            });
        });
    });
}

//================== ELIMINAR UN ROL POR SU ID ==================//
export async function deleteRole(req: Request, res: Response) {
    const tableName = 'role';
    const columnName = 'role_id';
    const roleId = req.params.role_id;

    return await checkIfDataExist(tableName, columnName, roleId).then( async dataCheck => {
        if(!dataCheck.ok) {return res.status(dataCheck.status).json({ok: false, message: dataCheck.message})}

        return await queryDelete(tableName, columnName, roleId).then( data => {
            if(!data.ok) return res.status(data.status).json({ok: false, error: data.error})
            
            return res.status(data.status).json({ok: true, message: data.message});
        });
    });
}