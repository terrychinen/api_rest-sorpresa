import jsonWebToken from 'jsonwebtoken';
import { Request, Response } from 'express';
import { IUser } from '../interfaces/user.interface';
import { query } from '../queries/query';
import { TokenModel } from '../models/token.model';
import moment from 'moment';
import { UserModel } from '../models/user.model';


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
    
    if(!token) return res.status(406).json({ok: false, message: 'The token is required'});

    const queryString = `SELECT * FROM token WHERE token_key = ${token}`;

    return await query(queryString).then(async data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message, result: data.result});

        const queryString = `SELECT user_id, role_id, token_id, username, password, state,
                                (SELECT role_name FROM role r WHERE r.role_id = u.role_id)role_name,
                                (SELECT first_name FROM person p WHERE p.user_id = u.user_id)first_name,
                                (SELECT last_name FROM person p WHERE p.user_id = u.user_id)last_name,
                                FROM user u WHERE user_id = "${userID}"`;  
    

        return await query(queryString).then(async dataUser => {
            const resultJSON: IUser = dataUser.result[0][0];
            const user = new UserModel();
            user.user_id = resultJSON.user_id;
            user.role_id = resultJSON.role_id;
            user.token_id = resultJSON.token_id;
            user.first_name = resultJSON.first_name;
            user.last_name = resultJSON.last_name;
            user.username = resultJSON.username;
            user.phone = resultJSON.phone;
            user.email = resultJSON.email;
            user.state = resultJSON.state;    
            
            let newToken = jsonWebToken.sign({user: user}, process.env.SECRET, {expiresIn: process.env.TOKEN_EXPIRATION});     
            return await updateToken(req, res, userID, newToken, Number(process.env.TOKEN_EXPIRATION));
        });
    });
} 


async function updateToken(req: Request, res: Response, userID: Number, newToken: string, expiresIn: Number) {
    const queryString = `SELECT user_id FROM user WHERE user_id = "${userID}"`;

    return await query(queryString).then(async data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message});

        let token = new TokenModel();
        token.token_key = newToken;
        token.created_at = moment().format('YYYY-MM-DD h:mm:ss');
        token.expires_in = expiresIn;

        const queryUpdate = `UPDATE token SET ${token} WHERE user_id = ${userID}`;
    
        return await query(queryUpdate).then(dataUpdate => {
            if(!dataUpdate.ok) return res.status(dataUpdate.status).json({ok: false, message: dataUpdate.message});

            return res.status(200).json({
                ok: true,
                message: 'Token updated',
                token: newToken,
                expiresIn
            });
        });
    });
}
