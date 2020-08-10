import { createPool, Pool } from 'mysql2/promise';


export async function connect() {

   const connection: Pool = await createPool({
        host: 'us-cdbr-east-02.cleardb.com',
        user: 'bcd20465993d1e',
        password: '298145dd',
        database: 'heroku_5d7a179d98846fd',
        connectionLimit: 100
    });


    return connection;

}