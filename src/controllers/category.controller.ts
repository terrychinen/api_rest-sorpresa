import { Request, Response } from 'express';
import { ICategory } from '../interfaces/category.interface';
import { checkIfDataExist } from '../queries/search.query';
import { queryGet, queryGetBy, queryOrderbyId, queryInsert, queryDelete, queryUpdate } from '../queries/query';


//================== OBTENER TODAS LAS CATEGORIAS ==================//
export async function getCategories(req: Request, res: Response){
    const tableName = 'category';
    const columnName = 'category_id';
    const offset = Number(req.query.offset);
    const state = Number(req.query.state);

    return await queryGet(tableName, columnName, offset, state).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== OBTENER UNA CATEGORIA POR SU ID ==================//
export async function getCategory(req: Request, res: Response) {
    const search = req.params.category_id;
    const state = req.params.state;
    const tableName = 'category';
    const columnName = 'category_id';

    return await queryGetBy(tableName, columnName, search, state).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== CREAR UNA CATEGORIA ==================//
export async function createCategory(req: Request, res: Response) {
    const category: ICategory = req.body;
    const tableName = 'category';
    const columnName = 'category_name';

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


//================== ACTUALIZAR UNA CATEGORIA ==================//
export async function updateCategory(req: Request, res: Response) {
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


//================== ELIMINAR UNA CATEGORIA POR SU ID ==================//
export async function deleteCategory(req: Request, res: Response) {
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


//================== OBTENER TODAS LAS CATEGORIAS ORDER BY CATEGORY ID ==================//
export async function getCategoriesById(req: Request, res: Response){
    const tableName = 'category';
    const offset = Number(req.query.offset);
    const state = Number(req.query.state);
    const categoryId = '"' +req.params.category_id +'"';
    const columnName = `category_id`;

    return await queryOrderbyId(tableName, columnName, categoryId, offset, state).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}