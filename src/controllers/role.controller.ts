import { connect } from '../database';
import { Request, Response } from 'express';
import { Role } from '../interfaces/role.interface';


//================== OBTENER TODAS LOS ROLES ==================//
export async function getRoles(req: Request, res: Response): Promise<Response> {
    try{
        const conn = await connect();
        const roles = await conn.query('SELECT * FROM role');
    
        return res.status(200).json({
            ok: true,
            message: 'Query successful',
            Roles: roles[0]
        });    

    }catch(error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal Server error',
        });
    }
}



//================== OBTENER UN ROL POR SU ID ==================//
export async function getRole(req: Request, res: Response): Promise<Response> {
    try{
        const id = req.params.role_id;
        const conn = await connect();
        const role = await conn.query('SELECT * FROM role WHERE role_id = ?', [id]);
    
        return res.status(200).json({
            ok: true,
            message: 'Query successful',
            role: role[0]
        });

    }catch(error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal Server error'
        });
    }
}



//================== CREAR UN ROL ==================//
export async function createRole(req: Request, res: Response) {
    try{
        const role: Role = req.body;
        const conn = await connect();

        await conn.query({
            sql: 'SELECT * FROM role WHERE role_name = ? LIMIT 1',
            values: role.role_name
        }, async function(error, roleDB: Role[]) {
            if(error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Internal Server error'
                });
            }

            if(roleDB[0]) {
                return res.status(400).json({
                    ok :false,
                    message: 'Role already exists',
                });
            }

            await conn.query('INSERT INTO role SET ?', role);
    
            return res.status(200).json({
                ok: true,
                message: 'Role created',
                role
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


//================== ACTUALIZAR UN ROL ==================//
export async function updateRole(req: Request, res: Response) {
    try{
        const id = req.params.role_id;
        const updateRole = req.body;
        const conn = await connect();

        await conn.query({
            sql: 'SELECT * FROM role WHERE role_id = ? LIMIT 1',
            values: id 
        }, async function(error, roleDB: Role[]) {
            if(error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Internal Server error'
                });
            }

            if(!roleDB[0]) {
                return res.status(400).json({
                    ok: false,
                    message: 'The role does not exist'
                });
            }
            
            await conn.query('UPDATE role SET ? WHERE role_id = ?', [updateRole, id]);
    
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


//================== ELIMINAR UN ROL POR SU ID ==================//
export async function deleteRole(req: Request, res: Response) {
    try{
        const id = req.params.role_id;
        const conn = await connect();

        conn.query({
            sql: 'SELECT * FROM role WHERE role_id = ? LIMIT 1',
            values: id
        }, async function(error, roleDB: Role[]) {
            if(error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Internal Server error'
                });
            }

            if(!roleDB[0]) {
                return res.status(400).json({
                    ok: false,
                    message: 'The role does not exist'
                });
            }

            await conn.query('DELETE FROM role WHERE role_id = ?', [id]);
    
            return res.json({
                ok: true,
                message: 'Role deleted',
                role: id
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