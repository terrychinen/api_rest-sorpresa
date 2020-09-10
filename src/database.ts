import { createPool, Pool } from 'mysql2/promise';


export async function connect() {

//    const connection: Pool = await createPool({
//         host: 'us-cdbr-east-02.cleardb.com',
//         user: 'bcd20465993d1e',
//         password: '298145dd',
//         database: 'heroku_5d7a179d98846fd',
//         connectionLimit: 100
//     });

    const connection: Pool = await createPool({
        host: 'db-sorpresa-nyc1-23077-do-user-7913617-0.b.db.ondigitalocean.com',
        port: 25060,
        user: 'doadmin',
        password: 'yamcpgdqim4ofklp',
        database: 'defaultdb',
        connectionLimit: 200 
    });


    return connection;

}