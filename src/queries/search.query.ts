import { connect } from '../database';

export async function checkIfDataExist(table: String, columnName: String, value: any) {
    try{
        const conn = await connect();
        const data = await conn.query('SELECT * FROM '+ table +' WHERE '+ columnName +' = ?', [value]);
        
        if(Object.keys(data[0]).length === 0) return ({ok: false, status: 200, message: 'The data does not exist'})
        
        return ({ok: true, status: 200, message: 'The data exist', result: data[0]});   

    }catch(e) {return ({ok: false, status: 500, message: e});} 
}