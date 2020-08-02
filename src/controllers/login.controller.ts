import { connect } from '../database';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from '../interfaces/user.interface';


export async function login(req: Request, res: Response) {
    const body =  req.body;
    const conn = await connect();

    const username = body.username;
    const password = body.password;

    conn.query({
        sql: 'SELECT * FROM user WHERE username = ? AND password = ? AND state = 1',
        values: [username, password]
    }, function(error, user: User) {

        if(error) {
            return res.status(400).json({
                ok: false,
                message: 'Internal Server error'
            });
        }

        if(!user[0]){
            return res.status(400).json({
                ok: false,
                message: 'User not found!'
            });
        }

        delete user[0].password;

        console.log('SECRET:', process.env.SECRET);
        console.log('EXPIRATION:', process.env.TOKEN_EXPIRATION);

        let token = jwt.sign({
            user: user[0]
        }, process.env.SECRET, {expiresIn: process.env.TOKEN_EXPIRATION}); 
        
        
        return res.status(200).json({
            ok: true,
            message: 'Login successful!',
            user: user[0],
            token
        });
        
    });
}