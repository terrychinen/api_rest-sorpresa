import jsonWebToken from 'jsonwebtoken';
import { Request, Response } from 'express';
import { IUser } from '../interfaces/user.interface';
import { checkIfDataExist } from '../queries/search.query';
import { queryUpdate, queryGetBy} from '../queries/query';
import { TokenModel } from '../models/token.model';
import moment from 'moment';
import { UserModel } from '../models/user.model';


export async function saveNewToken(user: IUser, token) {
    const tableName = 'user';
    const columnName = 'user_id';
  
    if(!token) return ({ok: false, message:'The token is required'});

    //VERIFICA SI EXISTE EL USUARIO
    return await checkIfDataExist(tableName, columnName, user.user_id).then( async dataCheck => {
        if(!dataCheck.ok) {return ({ok: false, message: dataCheck.message})}
        
        const jwt = new TokenModel();
        jwt.token_key = token;
        jwt.created_at = moment().format('YYYY-MM-DD h:mm:ss')
        jwt.expires_in = Number(process.env.TOKEN_EXPIRATION); 
    
        //ACTUALIZA EL NUEVO TOKEN AL DB
        return await queryUpdate('token', 'token_id', jwt, user.token_id).then( data => {
            if(!data.ok) return ({ok: data.ok,message: data.error})
    
            return ({ok: data.ok, message: 'Update ok'});
        });
    });   
}
   



export async function refreshToken(req: Request, res: Response) {
    const body = req.body;
    const token = body.token;
    const userID = body.user_id;

    const tableToken = 'token';
    const columnToken = 'token_key';

    const tableUser = 'user';
    const columnUserId = 'user_id';
    
    if(!token) return res.status(406).json({ok: false, message: 'The token is required'});

    return await queryGetBy(tableToken, columnToken, token).then(async dataToken => {
        if(!dataToken.ok) return res.status(dataToken.status).json({ok: false, error: dataToken.error});

       return await queryGetBy(tableUser, columnUserId, userID).then( async dataUser => {
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
    const tableUser = 'user';
    const columnUserID = 'user_id';

    await queryGetBy(tableUser, columnUserID, userID).then( async dataToken => {
        if(!dataToken.ok) return res.status(dataToken.status).json({ok: false, error: dataToken.error});

        const tableToken = 'token';
        const columnTokenId = 'token_id';

        let token = new TokenModel();
        token.token_key = newToken;
        token.created_at = moment().format('YYYY-MM-DD h:mm:ss');
        token.expires_in = expiresIn;

        await queryUpdate(tableToken, columnTokenId, token, userID).then( dataUpdate => {
            if(!dataUpdate.ok) return res.status(dataUpdate.status).json({ok: false, error: dataUpdate.error});

            return res.status(200).json({
                ok: true,
                message: 'Token updated',
                token: newToken,
                expiresIn
            });
        });
    });
}
