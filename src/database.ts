import { createPool, Pool } from 'mysql2/promise';


export async function connect() {

   const connection: Pool = await createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'sorpresa',
        connectionLimit: 10
    });

    return connection;

}