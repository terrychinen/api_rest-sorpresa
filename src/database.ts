import { createPool } from 'mysql2/promise';

export async function connect(){

   const connection = await createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'sorpresa',
        connectionLimit: 10
    });

    return connection;

}