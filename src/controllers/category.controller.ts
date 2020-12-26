import { Request, Response } from 'express';
import { ICategory } from '../interfaces/category.interface';
import { query } from '../queries/query';


//================== OBTENER TODAS LAS CATEGORIAS ==================//
export async function getCategories(req: Request, res: Response){
    const offset = Number(req.query.offset);
    const state = Number(req.query.state);

    if(Number.isNaN(offset) || Number.isNaN(state)) {
        return res.status(404).json({ok: false, message: `La variable 'offset' y 'state' es obligatorio!`});
    }

    const queryGet = `SELECT * FROM category WHERE state = ${state} ORDER BY category_id DESC LIMIT 10 OFFSET ${offset}`;

    return await query(queryGet).then(data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== OBTENER UNA CATEGORIA POR SU ID ==================//
export async function getCategory(req: Request, res: Response) {
    const search = req.params.category_id;
    const state = req.params.state;

    const queryGet = `SELECT * FROM category WHERE category_id = "${search}" AND state = ${state}`;

    return await query(queryGet).then(data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== BUSCAR CATEGORIA POR SU NOMBRE  ==================//
export async function searchCategory(req: Request, res: Response){
    const search = req.body.query;
    const state = Number(req.body.state);

    const querySearch = `SELECT * FROM category WHERE category_name LIKE "%${search}%" AND state = ${state} LIMIT 10`;

    return await query(querySearch).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== BUSCAR CATEGORIA POR SU NOMBRE y POR STORE_ID  ==================//
export async function searchCategoryByStoreId(req: Request, res: Response) {
    const storeId = req.params.store_id;
    const search = req.body.query;
    const state = Number(req.body.state);

    const querySearch = `SELECT category_id, category_name FROM category c WHERE category_name LIKE "%${search}%" AND state = ${state} AND c.category_id IN (SELECT category_id FROM commodity 
        WHERE commodity_id IN (SELECT commodity_id FROM store_commodity WHERE store_id = "${storeId}"))  LIMIT 20`;

    return await query(querySearch).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== CREAR UNA CATEGORIA ==================//
export async function createCategory(req: Request, res: Response) {
    const category: ICategory = req.body;

    const categoryName = category.category_name;
    category.category_name = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

    const queryCheck = `SELECT * FROM category WHERE category_name = "${category.category_name}"`;
   
    return await query(queryCheck).then(async dataCheck => {
        if(dataCheck.result[0][0] != null) {return res.status(400).json({ok: false, message: 'La categoría ya existe!'});}
        const queryInsert = `INSERT INTO category (category_name, state) VALUES ("${category.category_name}", "${category.state}")`;

        return await query(queryInsert).then(data => {
            if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
            return res.status(data.status).json({ok: true, message: 'Categoría creado correctamente'});
        });
    });
}


//================== ACTUALIZAR UNA CATEGORIA ==================//
export async function updateCategory(req: Request, res: Response) {
    const category: ICategory = req.body;
    const categoryId = req.params.category_id;

    const categoryName = category.category_name;
    if(categoryName != '' || categoryName != null){
        category.category_name = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
    }else{
        category.category_name = '';
    }

    const queryCheckId = `SELECT * FROM category WHERE category_id = "${categoryId}"`;

    return await query(queryCheckId).then(async dataCheckId => {
        if(!dataCheckId.ok) return res.status(500).json({ok: false, message: dataCheckId.message});
        if(dataCheckId.result[0][0] == null) return res.status(400).json({ok: false, message: `La categoría con el id ${categoryId} no existe!`});

        const queryCheck = `SELECT * FROM category WHERE category_name = "${category.category_name}"`;

        return await query(queryCheck).then(async dataCheck => {
            if(!dataCheck.ok) return res.status(500).json({ok: false, message: dataCheck.message});
            if(dataCheck.result[0][0] != null) return res.status(400).json({ok: false, message: 'La categoría ya existe!'});

            const queryUpdate = `UPDATE category SET category_name="${category.category_name}", state = "${category.state}" WHERE category_id = "${categoryId}"`;    

            return await query(queryUpdate).then(async dataUpdate => {
                if(!dataUpdate.ok) return res.status(dataUpdate.status).json({ok: false, message: dataUpdate.message});    
                return res.status(dataUpdate.status).json({ok: true, message: 'La categoría se actualizó correctamente'});
            });
        });
    });
}


//================== ELIMINAR UNA CATEGORIA POR SU ID ==================//
export async function deleteCategory(req: Request, res: Response) {
    const categoryId = req.params.category_id;

    const queryCheckId = `SELECT * FROM category WHERE category_id = "${categoryId}"`;

    return await query(queryCheckId).then(async dataCheckId => {
        if(dataCheckId.result[0][0] == null) {return res.status(400).json({ok: false, message: `La categoría con el id ${categoryId} no existe!`});};
        const queryDelete = `DELETE category WHERE category_id = "${categoryId}"`;

        return await query(queryDelete).then(dataDelete => {
            if(!dataDelete.ok) return res.status(dataDelete.status).json({ok: false, message: dataDelete.message})
            return res.status(dataDelete.status).json({ok: true, message: 'La categoría se eliminó correctamente'});
        });
    });
}


//================== OBTENER TODAS LAS CATEGORIAS ORDER BY CATEGORY ID ==================//
export async function getCategoriesById(req: Request, res: Response){
    const offset = Number(req.query.offset);
    const state = Number(req.query.state);
    const categoryId = req.params.category_id;

    const queryGet = `SELECT * FROM category WHERE state = ${state} ORDER BY FIELD(category_id, "${categoryId}") DESC LIMIT 10 OFFSET ${offset}`;

    return await query(queryGet).then(data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}


//================== OBTENER TODAS LAS CATEGORIAS SEGUN EL ALMACEN ==================//
export async function getCategoriesByStores(req: Request, res: Response){
    const storeId = req.params.store_id;
    const offset = req.query.offset;

    const queryGet =  `SELECT category_id, category_name FROM category c WHERE state = 1 AND c.category_id IN (SELECT category_id FROM commodity 
                            WHERE commodity_id IN (SELECT commodity_id FROM store_commodity WHERE store_id = "${storeId}"))  LIMIT 20 OFFSET ${offset}`;

    return await query(queryGet).then(data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(200).json({ok: true, message: data.message, result: data[0]});
    });
}