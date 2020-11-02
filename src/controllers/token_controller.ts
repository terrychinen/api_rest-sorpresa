import jsonWebToken from 'jsonwebtoken';
import { Request, Response } from 'express';
import { IUser } from '../interfaces/user.interface';
import { query } from '../queries/query';
import { TokenModel } from '../models/token.model';
import moment from 'moment';


export async function saveNewToken(user: IUser, token) {
    if(!token) return ({ok: false, message:'The token is required'});

    const queryString = `SELECT * FROM user WHERE user_id = ${user.user_id}`;


    //VERIFICA SI EXISTE EL USUARIO
    return await query(queryString).then(async data => {
        const dataCheck = data.result[0][0];
        if(dataCheck == null) {return ({ok: false, message: 'No existe'});}

        const jwt = new TokenModel();
        jwt.token_key = token;
        jwt.created_at = moment().format('YYYY-MM-DD h:mm:ss')
        jwt.expires_in = Number(process.env.TOKEN_EXPIRATION); 
    

        const queryUpdate = `UPDATE token SET token_key='${jwt.token_key}', created_at='${jwt.created_at}', 
                             expires_in='${jwt.expires_in}' WHERE token_id = ${user.token_id}`;

        //GUARDA EL TOKEN
        return await query(queryUpdate).then(dataUpdate => {
            if(!dataUpdate.ok) return ({ok: false, message: dataUpdate.message})
    
            return ({ok: dataUpdate.ok, message: 'Update ok'});
        });
    });  
}


export async function refreshToken(req: Request, res: Response) {
    const body = req.body;
    const token = body.token;
    const userID = body.user_id;
    
    if(!token) return res.status(406).json({ok: false, message: 'El token es necesario!'});

    const queryCheckToken = `SELECT * FROM token WHERE token_key = "${token}"`;

    //VERIFICA SI EXISTE EL TOKEN
    return await query(queryCheckToken).then(async data => {
        if(data.result[0] == '') return res.status(404).json({ok: false, message: 'No existe el token'});
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message});
        

        const queryUser = `SELECT u.user_id, u.role_id, u.token_id, u.username, u.password, u.state,
                        (SELECT role_name FROM role r WHERE r.role_id = u.role_id)role_name,
                        (SELECT first_name FROM person p WHERE p.person_id = u.user_id)first_name,
                        (SELECT last_name FROM person p WHERE p.person_id = u.user_id)last_name
                        FROM user u WHERE u.user_id = "${userID}"`;  
    

        //BUSCAMOS AL USUARIO CON SU ID
        return await query(queryUser).then(async dataUser => {
            if(!dataUser.ok) return res.status(dataUser.status).json({ok: false, message: dataUser.message});
            if(dataUser.result[0] == '') return res.status(404).json({ok: false, message: 'El usuario no existe!'});

            const userDB: IUser = dataUser.result[0][0];
            delete userDB.role_id;
            delete userDB.password;
            delete userDB.role_name;

            const tokenID = userDB.token_id;           
            
            let newToken = jsonWebToken.sign({user: userDB}, process.env.SECRET, {expiresIn: process.env.TOKEN_EXPIRATION});     
            return await updateToken(res, String(tokenID), newToken, Number(process.env.TOKEN_EXPIRATION));
        });
    });
} 


async function updateToken(res: Response, tokenID: String, newToken: string, expiresIn: Number) {
    let token = new TokenModel();
    token.token_key = newToken;
    token.created_at = moment().format('YYYY-MM-DD h:mm:ss');
    token.expires_in = expiresIn;

    const queryUpdate = `UPDATE token SET token_key = "${token.token_key}", created_at = "${token.created_at}",  
                        expires_in = "${token.expires_in}" WHERE token_id = "${tokenID}"`;
    
    return await query(queryUpdate).then(dataUpdate => {
        if(!dataUpdate.ok) return res.status(dataUpdate.status).json({ok: false, message: dataUpdate.message});

        return res.status(200).json({
            ok: true,
            message: 'Token updated',
            token: newToken,
            expiresIn
        });
    });
}
