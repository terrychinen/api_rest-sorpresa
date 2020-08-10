import { connect } from '../database';
import jsonWebToken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { IUser } from '../interfaces/user.interface';
import { saveNewToken } from './token_controller';
import { queryUpdate, queryGetBy } from '../queries/query';
import { checkIfDataExist } from '../queries/search.query';
import { TokenModel } from '../models/token.model';
import { UserModel } from '../models/user.model';
import moment from 'moment';

export async function signIn(req: Request, res: Response) {
    const body =  req.body;

    const tableUser = 'user';
    const columnUsername = 'username';
    return await queryGetBy(tableUser, columnUsername, body.username).then( async dataCheck => {
        if(!dataCheck.ok) return res.status(dataCheck.status).json({ok: false, error: dataCheck.error})
        
        const userDB:IUser = dataCheck.result[0][0];

        if(userDB.state == 0){
            return res.status(403).json({
                ok: false,
                message: 'User deleted',
                user: userDB.last_name + ' ' + userDB.first_name,
                username: userDB.username,
                state: userDB.state
            });
        }

        const compare = await bcrypt.compareSync(body.password, userDB.password);
        if(!compare) return res.status(400).json({ok:false, message: 'The username or password is not correct'});
        
        delete userDB.password;

        let token = jsonWebToken.sign({
            user: userDB
        }, process.env.SECRET, {expiresIn: process.env.TOKEN_EXPIRATION}); 

        return saveNewToken(userDB, token).then(data => {
            if(!data.ok) return res.status(400).json({ok: false, message: data.message})
            return res.status(200).json({
                ok: true,
                message: 'Login successful!',
                user: userDB,
                token,
                expireIn: process.env.TOKEN_EXPIRATION,
                savedDate: moment().format('YYYY-MM-DD h:mm:ss')
            });
        });
    });
}



export async function signUp(req: Request, res: Response) {
    try{
        const user: IUser = req.body;
        const tableName = 'user';
        const columnName = 'username';
        const conn  = await connect();
       
        await checkIfDataExist(tableName, columnName, user.username.toString());

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
            
            if(error) return res.status(500).json({ok: false, message: 'INSERT new User Error', error})
            
            newUser.user_id = resultUser.insertID;
          
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
                if(error) return res.status(500).json({ok: false, message: 'INSERT Token Error', error})

                const user = new UserModel();
                const user_id = resultUser.insertId;
                user.token_id = resultToken.insertId;
                
                return queryUpdate(tableName, 'user_id', user, user_id).then( data => {
                    if(data.ok) return res.status(data.status).json({ok: false, message: data.error});
                    return res.status(data.status).json({ok: true, message: data.message});
                });     
             });
        });
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            messsage: 'Internal Server error (Create user) ' 
        });
    }
}