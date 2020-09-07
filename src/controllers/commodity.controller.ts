import { Request, Response } from 'express';
import { connect } from '../database';
import { ICategory } from '../interfaces/category.interface';
import { checkIfDataExist } from '../queries/search.query';
import { queryGet, queryGetBy, queryInsert, queryDelete, queryUpdate } from '../queries/query';


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
export async function getComoditiesByCategoryId(req: Request, res: Response) {
    const categoryId = req.params.category_id;
    const state = req.query.state;
    const offset = Number(req.query.offset);

    const tableName = 'commodity';
    const columnName = 'category_id';

    try{
        const conn = await connect();
        const query = await conn.query(`SELECT * FROM ${tableName} WHERE category_id = ${categoryId} AND state = ${state}`);
    
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
    const category: ICategory = req.body;
    const tableName = 'commodity';
    const columnName = 'commodity_name';

    //VERIFICA SI LA CATEGORIA EXISTE
    return await checkIfDataExist(tableName, columnName, category.category_name).then( async dataCheck => {
        if(dataCheck.ok) return res.status(403).json({ok: false, message: dataCheck.message});
        if(dataCheck.status == 500) return res.status(500).json({ok: false, message: dataCheck.message});

         //INSERTA LA NUEVA CATEGORIA
         return await queryInsert(tableName, category).then( data => {
            if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
            
            return res.status(data.status).json({ok: true, message: data.message});
        });

    });
}


//================== ACTUALIZAR UNA MERCANCÍA ==================//
export async function updateCommodity(req: Request, res: Response) {
    const category: ICategory = req.body;
    const categoryId = req.params.category_id;
    const tableName = 'category';
    const columnName = 'category_id';

    //VERIFICA SI EXISTE EL ID PARA ACTUALIZAR
    return await checkIfDataExist(tableName, columnName, categoryId).then( async dataCheck => {
        if(!dataCheck.ok) {return res.status(404).json({ok: false, message: dataCheck.message})}

        //VERIFICA SI YA HAY UNA CATEGORIA CON EL MISMO NOMBRE PARA NO ACTUALIZAR
        return await checkIfDataExist(tableName, columnName, category.category_name).then( async dataCheckRepeat => {
            if(dataCheckRepeat.ok) {return res.status(400).json({ok: false, message: dataCheckRepeat.message})}

            //ACTUALIZA EL REGISTRO
            return await queryUpdate(tableName, columnName, category, categoryId).then( data => {
                if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
                
                return res.status(data.status).json({ok: true, message: data.message});
            });
        });
    });
}


//================== ELIMINAR UNA MERCANCÍA POR SU ID ==================//
export async function deleteCommodity(req: Request, res: Response) {
    const categoryId = req.params.category_id;
    const tableName = 'category';
    const columnName = 'category_id';

    //VERIFICA SI EXISTE EL ID PARA ACTUALIZAR
    return await checkIfDataExist(tableName, columnName, categoryId).then( async dataCheck => {
        if(!dataCheck.ok) {return res.status(404).json({ok: false, message: dataCheck.message})}

        //ELIMINA EL REGISTRO
        return await queryDelete(tableName, columnName, categoryId).then( data => {
            if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
            
            return res.status(data.status).json({ok: true, message: data.message});
        });
    });
}