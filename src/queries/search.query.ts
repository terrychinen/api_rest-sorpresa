import { connect } from '../database';

export async function checkIfDataExist(table: String, columnName: String, value: any) {
    try{
        const conn = await connect();
        const data = await conn.query('SELECT * FROM '+ table +' WHERE '+ columnName +' = ?', [value]);
        
        conn.end();

        if(Object.keys(data[0]).length === 0) return ({ok: false, status: 200, message: 'No existe'});
        return ({ok: true, status: 200, message: 'Ya existe', result: data[0]});   

    }catch(e) {return ({ok: false, status: 500, message: e});} 
}