import { createPool, Pool } from 'mysql2/promise';


export async function connect() {
    const connection: Pool = await createPool({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'Di.ta.lux&29',
        database: 'sorpresa_db',
        connectionLimit: 300 
    });

    
    return connection;

}