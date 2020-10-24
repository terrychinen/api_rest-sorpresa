import { connect } from '../database';


export async function query(queryString: string) {
    try{
        const conn = await connect();
        const query = await conn.query(queryString);

        conn.end();

        if(!query) return ({ok: false, status: 400, message: 'Query error', result: []});
        return ({
            ok: true, 
            status: 200, 
            message: 'Query successful',
            result: query
        });

    }catch(e){return ({ok: false, status: 500, message: e.toString(), result: []});}
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