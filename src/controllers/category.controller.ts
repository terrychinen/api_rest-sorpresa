import { Request, Response } from 'express';
import { ICategory } from '../interfaces/category.interface';
import { checkIfDataExist } from '../queries/search.query';
import { queryGet, queryGetBy, queryInsert, queryDelete, queryUpdate } from '../queries/query';


//================== OBTENER TODAS LAS CATEGORIAS ==================//
export async function getCategories(req: Request, res: Response){
    const tableName = 'category';
    const offset = Number(req.query.offset);
    return await queryGet(tableName, offset).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== OBTENER UNA CATEGORIA POR SU ID ==================//
export async function getCategory(req: Request, res: Response) {
    const search = req.params.category_id;
    const tableName = 'category';
    const columnName = 'category_id';

    return await queryGetBy(tableName, columnName, search).then( data => {
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
        if(!dataCheck.ok) {return res.status(dataCheck.status).json({ok: false, message: dataCheck.message})}

        //VERIFICA SI YA HAY UNA CATEGORIA CON EL MISMO NOMBRE PARA NO ACTUALIZAR
        return await checkIfDataExist(tableName, columnName, category.category_name).then( async dataCheckRepeat => {
            if(dataCheckRepeat.ok) {return res.status(dataCheckRepeat.status).json({ok: false, message: dataCheckRepeat.message})}

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
    const tableName = 'category';
    const columnName = 'category_id';
    const value = req.params.category_id;

    return await checkIfDataExist(tableName, columnName, value).then( async dataCheck => {
        if(!dataCheck.ok) {return res.status(dataCheck.status).json({ok: false, message: dataCheck.message})}

        return await queryDelete(tableName, columnName, value).then( data => {
            if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
            
            return res.status(data.status).json({ok: true, message: data.message});
        });
    });
}