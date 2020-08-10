import { IUser } from '../interfaces/user.interface';


export class UserModel implements IUser{
    user_id?: Number;
    role_id: Number;
    token_id?: Number;
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    phone?: string;
    email?: string;
    street?: string;
    state: Number;
}