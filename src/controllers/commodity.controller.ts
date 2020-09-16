import { Request, Response } from 'express';
import moment from 'moment';
import { connect } from '../database';
import { ICategory } from '../interfaces/category.interface';
import { checkIfDataExist } from '../queries/search.query';
import { queryGet, queryGetBy, queryInsert, queryDelete, queryUpdate } from '../queries/query';
import { ICommodity } from '../interfaces/commodity.interface';


//================== OBTENER TODOS LAS MERCANCÍAS ==================//
export async function getCommodities(req: Request, res: Response){
    const tableName = 'commodity';
    const offset = Number(req.query.offset);
    const state = Number(req.query.state);
    return await queryGet(tableName, offset, state).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== OBTENER TODOS LAS MERCANCÍAS POR EL ID DE LA CATEGORÍA ==================//
export async function getCommoditiesByCategoryId(req: Request, res: Response) {
    const categoryId = req.params.category_id;
    const state = req.query.state;
    const offset = Number(req.query.offset);

    const columnName = 'category_id';

    try{
        const conn = await connect();
        const queryString = 'SELECT commodity_id, commodity_name, created_at, state,' + 
                '(SELECT category_name FROM category cat WHERE cat.category_id = comm.category_id)category_name, ' +
                '(SELECT unit_name FROM unit un WHERE un.unit_id = comm.unit_id)unit_name, ' + 
                '(SELECT username FROM user us WHERE us.user_id = comm.user_id)username ' + 
                'FROM commodity comm WHERE category_id = ' +categoryId +' AND state = ' +state+ ' LIMIT 10 OFFSET ' +offset;

        const query = await conn.query(queryString);
    
        if(!query)  return res.status(400).json({ok: false, message: 'GET BY '+columnName +' error: Commodity', result: []})

        return res.status(200).json({
            ok: true, 
            message: 'GET BY '+columnName +' successful: Commodity',
            result: query[0]
        });

    }catch(e){return res.status(500).json({ok: false, message: e.toString(), result: []});}
}


//================== CREAR UNA MERCANCÍA ==================//
export async function createCommodity(req: Request, res: Response) {
    const commodity: ICommodity = req.body;
    const storesIdList = req.query.store_id;

    const tableCommodity = 'commodity';
    const columnName = 'commodity_name';

    const tableStoreCommodity = 'store_commodity';


    //VERIFICA SI LA MERCANCÍA EXISTE
    return await checkIfDataExist(tableCommodity, columnName, commodity.commodity_name).then( async dataCheck => {
        if(dataCheck.ok) return res.status(403).json({ok: false, message: dataCheck.message});
        if(dataCheck.status == 500) return res.status(500).json({ok: false, message: dataCheck.message});

         //INSERTA LA NUEVA MERCANCÍA
        const conn = await connect();

        return await conn.query({
           sql: 'INSERT INTO commodity SET ?', 
           values: commodity
        }, async function(err, result) {
               if(err) return res.status(400).json({ok: false, message: err.toString()});

               try{
                for(var i=0; i < storesIdList.length; i++) {                
                    await conn.query('INSERT INTO ' +tableStoreCommodity +' SET store_id = ' 
                             +storesIdList[i]+ ' , commodity_id = ' +result.insertId);
                 }

                return res.status(200).json({ok: true, message: 'Se creo exitosamente'});
               }catch(e){
                return res.status(500).json({ok: true, message: e.toString()});
               }
        });
    });
}


//================== ACTUALIZAR UNA MERCANCÍA ==================//
export async function updateCommodity(req: Request, res: Response) {
    const commodity: ICommodity = req.body;
    const commodityId = req.params.commodity_id;
    const tableName = 'commodity';
    const columnName = 'commodity_id';

    //VERIFICA SI EXISTE EL ID PARA ACTUALIZAR
    return await checkIfDataExist(tableName, columnName, commodityId).then( async dataCheck => {
        if(!dataCheck.ok) {return res.status(404).json({ok: false, message: dataCheck.message})}

        //VERIFICA SI YA HAY UNA CATEGORIA CON EL MISMO NOMBRE PARA NO ACTUALIZAR
        return await checkIfDataExist(tableName, columnName, commodity.commodity_name).then( async dataCheckRepeat => {
            if(dataCheckRepeat.ok) {return res.status(400).json({ok: false, message: dataCheckRepeat.message})}

            //ACTUALIZA EL REGISTRO
            return await queryUpdate(tableName, columnName, commodity, commodityId).then( data => {
                if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
                
                return res.status(data.status).json({ok: true, message: data.message});
            });
        });
    });
}


//================== ELIMINAR UNA MERCANCÍA POR SU ID ==================//
export async function deleteCommodity(req: Request, res: Response) {
    const commodityId = req.params.commodity_id;
    const tableName = 'commoity';
    const columnName = 'commodity_id';

    //VERIFICA SI EXISTE EL ID PARA ACTUALIZAR
    return await checkIfDataExist(tableName, columnName, commodityId).then( async dataCheck => {
        if(!dataCheck.ok) {return res.status(404).json({ok: false, message: dataCheck.message})}

        //ELIMINA EL REGISTRO
        return await queryDelete(tableName, columnName, commodityId).then( data => {
            if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
            
            return res.status(data.status).json({ok: true, message: data.message});
        });
    });
}