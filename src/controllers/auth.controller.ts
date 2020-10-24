import jsonWebToken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { IUser } from '../interfaces/user.interface';
import { IPerson } from '../interfaces/person.interface';
import { saveNewToken } from './token_controller';
import { query } from '../queries/query';
import { TokenModel } from '../models/token.model';
import { UserModel } from '../models/user.model';
import moment from 'moment';


export async function signIn(req: Request, res: Response) {
    const body =  req.body;

    const queryGet = `SELECT user_id, role_id, token_id, username, password, state, 
                            (SELECT role_name FROM role r WHERE r.role_id = u.role_id)role_name, 
                            (SELECT first_name FROM person p WHERE p.person_id = u.user_id)first_name, 
                            (SELECT last_name FROM person p WHERE p.person_id = u.user_id)last_name 
                            FROM user u WHERE username = "${body.username}"`;    

    return await query(queryGet).then( async data => {
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
        const person: IPerson = req.body;
        const user: IUser = req.body;

        const queryGet = `SELECT * FROM user WHERE username = "${user.username}"`;
        
        return await query(queryGet).then(async dataCheck => {
            if(!dataCheck.ok) {return res.status(400).json({ok: false, message: dataCheck.message});}
            const userDB:IUser = dataCheck.result[0][0];
            if(userDB != null) {return res.status(400).json({ok: false, message: 'El nombre de usuario ya existe'});}

            const queryInsertPerson = `INSERT INTO person (first_name, last_name, dni, ruc, photo, state) 
                                        VALUES ('${person.first_name}', '${person.last_name}', '${person.dni}', '${person.ruc}', 
                                        '${person.photo}', '${person.state}')`;



            return await query(queryInsertPerson).then(async dataInsertPerson => {
                if(!dataInsertPerson.ok) {return res.status(dataInsertPerson.status).json({ok: false, message: dataInsertPerson.message});}

                const personId = dataInsertPerson.result[0].insertId;
                let password = await bcrypt.hashSync(user.password, 10);

                const queryInsertUser = `INSERT INTO user (user_id, role_id, username, password, state) 
                                         VALUES ('${personId}', '${user.role_id}', '${user.username}', 
                                         '${password}', '${user.state}')`;
                
                return await query(queryInsertUser).then(async dataInsertUser => {
                    if(!dataInsertUser.ok) {return res.status(dataInsertUser.status).json({ok: false, message: dataInsertUser.message});}

                    const newUser:UserModel = new UserModel();
                    newUser.user_id = personId;
                    newUser.username = user.username;
        
                    let jwt = jsonWebToken.sign({
                        user: newUser
                    }, process.env.SECRET, {expiresIn: process.env.TOKEN_EXPIRATION});

                    let token = new TokenModel();
                    token.token_key = jwt;
                    token.created_at = moment().format('YYYY-MM-DD h:mm:ss');
                    token.expires_in = Number(process.env.TOKEN_EXPIRATION); 

                    const queryInsertToken = `INSERT INTO token (token_key, created_at, expires_in, state)
                                              VALUES ('${token.token_key}', '${token.created_at}', '${token.expires_in}', '1')`;

                    return await query(queryInsertToken).then(async dataInsertToken => {
                        if(!dataInsertToken.ok) return res.status(dataInsertToken.status).json({ok: false, message: dataInsertToken.message})
    
                        const tokenId = dataInsertToken.result[0].insertId;

                        const queryUpdateUserToken = `UPDATE user SET token_id = ${tokenId} WHERE user_id = ${newUser.user_id}`;

                        return await query(queryUpdateUserToken).then(dataUpdateUserToken => {
                            if(!dataUpdateUserToken.ok) return res.status(dataUpdateUserToken.status).json({ok: false, message: dataUpdateUserToken.message});
                            return res.status(dataUpdateUserToken.status).json({ok: true, message: 'Usuario creado satisfactoriamente'});
                        });
                        
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