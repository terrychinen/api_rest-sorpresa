import { connect } from '../database';

export async function query(queryString: string) {
    try{
        const conn = await connect();
        const query = await conn.query(queryString);

        conn.end();

        if(!query) return ({ok: false, status: 400, message: 'GET error', result: []});
        return ({
            ok: true, 
            status: 200, 
            message: 'GET successful',
            result: query
        });

    }catch(e){return ({ok: false, status: 500, message: e.toString(), result: []});}
}


export async function queryGet(table: String, column: String, offset: Number, state: Number) {
    try{
        const conn = await connect();
        const query = await conn.query(`SELECT * FROM ${table} WHERE state = ${state} ORDER BY ${column} DESC LIMIT 10 OFFSET ${offset}`);

        conn.end();

        if(!query) return ({ok: false, status: 400, message: 'GET error: ' +table, result: []});
        return ({
            ok: true, 
            status: 200, 
            message: 'GET successful: ' +table,
            result: query
        });

    }catch(e){return ({ok: false, status: 500, message: e.toString(), result: []});}
}


export async function queryGetBy(table: String, columnName: String, value: any, state: String) {
    try{
        const conn = await connect();
        const query = await conn.query(`SELECT * FROM ${table} WHERE ${columnName} = "${value}" AND state = ${state}`);

        conn.end();
    
        if(!query) return ({ok: false, status: 400, message: 'GET BY '+columnName +' error: ' +table, result: []});
        return ({
            ok: true, 
            status: 200, 
            message: 'GET BY '+columnName +' successful: ' +table,
            result: query
        });

    }catch(e){return ({ok: false, status: 500, message: e.toString(), result: []});}
}


export async function queryInsert(table: String, value: any) {
    try {
        const conn = await connect();
        const query = await conn.query('INSERT INTO ' +table +' SET ?', value);

        conn.end();
        
        if(!query) return ({ok: false, status: 400, message: 'INSERT error: ' +table});
        return ({ok: true, status: 200, message: 'INSERT successful: ' +table});

    }catch(e) {return ({ok: false, status: 500, message: e.toString()});}       
}


export async function queryUpdate(table: String, columnName: String, value: any, id: any) {    
    try {
        const conn = await connect();
        const query = await conn.query('UPDATE ' +table+ ' SET ? WHERE ' +columnName +' = ?', [value, id]);
        
        conn.end();
        
        if(!query) return ({ok: false, status: 400, message: 'UPDATE error' +table});
        return ({ok: true, status: 200, message: 'UPDATE successful: ' +table});

    }catch(e) {return ({ok: false, status: 500, message: e.toString()});}      

}


export async function queryDelete(table: String, columnName: String, value: any) {
    try{
        const conn = await connect();
        const query = await conn.query(`DELETE FROM ${table} WHERE ${columnName} = ${value}`);

        conn.end();

        if(!query) return ({ok: false, status: 400, message: 'DELETE error' +table});
        return ({ok: true, status: 200, message: 'DELETE successful: ' +table});


    }catch(e) {return ({ok: false, status: 500, message: e.toString()});}      
}


export async function queryOrderbyId(table: String, columnName: String, value: String, offset: Number, state: Number) {
    try{
        const conn = await connect();
        const query = await conn.query(`SELECT * FROM ${table} WHERE state = ${state} ORDER BY FIELD(${columnName}, ${value}) DESC LIMIT 10 OFFSET ${offset}`);

        conn.end();

        if(!query) return ({ok: false, status: 400, message: 'GET error: ' +table, result: []});
        return ({
            ok: true, 
            status: 200, 
            message: 'GET successful: ' +table,
            result: query
        });

    }catch(e){return ({ok: false, status: 500, message: e.toString(), result: []});}
}


export async function queryGetWithoutOffset(table: String, column: String, state: Number) {
    try{
        const conn = await connect();
        const query = await conn.query(`SELECT * FROM ${table} WHERE state = "${state}" ORDER BY ${column} DESC`);

         conn.end();
        
        if(!query) return ({ok: false, status: 400, message: 'GET error: ' +table, result: []});
        return ({
            ok: true, 
            status: 200, 
            message: 'GET successful: ' +table,
            result: query
        });

    }catch(e){return ({ok: false, status: 500, message: e.toString(), result: []});}
}