import { connect } from '../database';

export async function queryGet(table: String) {
    try{
        const conn = await connect();
        const query = await conn.query('SELECT * FROM ' +table);

        if(!query) return ({ok: false, status: 400, error: 'GET error: ' +table, result: []});
        
        return ({
            ok: true, 
            status: 200, 
            message: 'GET successful: ' +table,
            result: query
        });

    }catch(e){return ({ok: false, status: 500, error: e, result: []});}
}


export async function queryGetBy(table: String, columnName: String, value: any) {
    try{
        const conn = await connect();
        const query = await conn.query('SELECT * FROM '+ table +' WHERE '+ columnName +' = ?', [value]);
    
        if(!query) return ({ok: false, status: 400, error: 'GET BY '+columnName +' error: ' +table, result: []});

        return ({
            ok: true, 
            status: 200, 
            message: 'GET BY '+columnName +' successful: ' +table,
            result: query
        });

    }catch(e){return ({ok: false, status: 500, error: e, result: []});}
}


export async function queryInsert(table: String, value: any) {
    try {
        const conn = await connect();
        const query = await conn.query('INSERT INTO ' +table +' SET ?', value);
        
        if(!query) return ({ok: false, status: 400, error: 'INSERT error: ' +table});
        return ({ok: true, status: 200, message: 'INSERT successful: ' +table});

    }catch(e) {return ({ok: false, status: 500, error: e});}       
}


export async function queryUpdate(table: String, columnName: String, value: any, id: any) {
    try {
        const conn = await connect();
        const query = await conn.query('UPDATE ' +table+ ' SET ? WHERE ' +columnName +' = ?', [value, id]);
        
        if(!query) return ({ok: false, status: 400, error: 'UPDATE error' +table});
        return ({ok: true, status: 200, message: 'UPDATE successful: ' +table});

    }catch(e) {return ({ok: false, status: 500, error: e});}      

}


export async function queryDelete(table: String, columnName: String, value: any) {
    try{
        const conn = await connect();
        const query = await conn.query(`DELETE FROM ${table} WHERE ${columnName} = ${value}`);

        if(!query) return ({ok: false, status: 400, error: 'DELETE error' +table});
        return ({ok: true, status: 200, message: 'DELETE successful: ' +table});


    }catch(e) {return ({ok: false, status: 500, error: e});}      
}
