import { connect } from '../database';
import jsonWebToken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { IUser } from '../interfaces/user.interface';
import { saveNewToken } from './token_controller';
import { query, queryUpdate } from '../queries/query';
import { checkIfDataExist } from '../queries/search.query';
import { TokenModel } from '../models/token.model';
import { UserModel } from '../models/user.model';
import moment from 'moment';

export async function signIn(req: Request, res: Response) {
    const body =  req.body;

    const queryString = `SELECT user_id, role_id, (SELECT role_name FROM role r WHERE r.role_id = u.role_id)role_name, token_id, first_name, last_name, 
                            username, password, phone, email, street, state FROM user u WHERE username = "${body.username}"`;    

    return await query(queryString).then( async data => {
        try{
            if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})

            const userDB:IUser = data.result[0][0];

            if(userDB == null) {return res.status(400).json({ok: false, message: 'El usuario o la contraseña es incorrecto'});}
    
            const compare = await bcrypt.compareSync(body.password, userDB.password);
            if(!compare) return res.status(400).json({ok:false, message: 'El usuario o la contraseña es incorrecto'});
    
            if(userDB.state == 0){return res.status(403).json({ok: false, message: 'Cuenta eliminado', username: userDB.username, state: 0});}
    
            delete userDB.password;
    
            let token = jsonWebToken.sign({user: userDB}, process.env.SECRET, {expiresIn: process.env.TOKEN_EXPIRATION}); 
    
            return saveNewToken(userDB, token).then(data => {
                if(!data.ok) return res.status(400).json({ok: false, message: data.message})
                return res.status(200).json({
                    ok: true,
                    message: 'Inicio de sesión correcto!',
                    user: userDB,
                    token,
                    expireIn: process.env.TOKEN_EXPIRATION,
                    savedDate: moment().format('YYYY-MM-DD h:mm:ss')
                });
            });   
        }catch(e){
            return res.status(400).json({
                ok: false,
                message: e.toString()
            });
        }
    });      
}



export async function signUp(req: Request, res: Response) {
    try{
        const user: IUser = req.body;
        const tableName = 'user';
        const columnName = 'username';
        const conn  = await connect();
       
        return await checkIfDataExist(tableName, columnName, user.username).then( async dataCheck => {
            if(dataCheck.ok) return res.status(dataCheck.status).json({ok: false, message: dataCheck.message});
           
            let password = await bcrypt.hashSync(user.password, 10);
    
            let newUser = new UserModel();
            newUser.role_id      =   user.role_id;
            newUser.first_name   =   user.first_name;
            newUser.last_name    =   user.last_name;
            newUser.username     =   user.username;
            newUser.password     =   password;
            newUser.phone        =   user.phone;
            newUser.email        =   user.email;
            newUser.street       =   user.street;
            newUser.state        =   user.state;
    
            await conn.query({
                sql: 'INSERT INTO user SET ?',
                values: newUser
            }, async function(error: Error, resultUser) {
                
                if(error) return res.status(400).json({ok: false, message: 'INSERT new User Error', error})
                
                newUser.user_id = resultUser.insertID;
    
                delete newUser.first_name;
                delete newUser.last_name;
                delete newUser.role_id;
                delete newUser.phone;
                delete newUser.password;
                delete newUser.street;
                delete newUser.state;
                delete newUser.token_id;
                delete newUser.email;
              
                //GENERATE NEW TOKEN
                let jwt = jsonWebToken.sign({
                    user: newUser
                }, process.env.SECRET, {expiresIn: process.env.TOKEN_EXPIRATION});
    
                
                let token = new TokenModel();
                token.token_key = jwt;
                token.created_at = moment().format('YYYY-MM-DD h:mm:ss');
                token.expires_in = Number(process.env.TOKEN_EXPIRATION); 
    
                await conn.query({
                    sql: 'INSERT INTO token SET ?',
                    values: token
                }, async function(error: Error, resultToken) {
                    if(error) return res.status(400).json({ok: false, message: 'INSERT Token Error', error})
    
                    const user = new UserModel();
                    const user_id = resultUser.insertId;
                    user.token_id = resultToken.insertId;
                    
                    return queryUpdate(tableName, 'user_id', user, user_id).then( data => {
                        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message});
                        return res.status(data.status).json({ok: true, message: 'User created successfully'});
                    });     
                 });
            });
        });
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal Server error (Create user)' 
        });
    }
}