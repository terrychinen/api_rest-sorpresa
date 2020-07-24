import {Request, Response } from 'express';
import { connect } from '../database';
import { Category } from '../interfaces/category.interface';



//================== OBTENER TODAS LAS CATEGORIAS ==================//
export async function getCategories(req: Request, res: Response): Promise<Response> {
    try{
        const conn = await connect();
        const categories = await conn.query('SELECT * FROM category');
    
        return res.status(200).json({
            ok: true,
            message: 'Query successful',
            Categories: categories[0]
        });    

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal Server error',
        });
    }
}


//================== OBTENER UNA CATEGORIA POR SU ID ==================//
export async function getCategory(req: Request, res: Response): Promise<Response> {
    try{
        const id = req.params.category_id;
        const conn = await connect();
        const category = await conn.query('SELECT * FROM category WHERE category_id = ?', [id]);
    
        return res.status(200).json({
            ok: true,
            message: 'Query successful',
            category: category[0]
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Internal Server error'
        });
    }
}


//================== CREAR UNA CATEGORIA ==================//
export async function createCategory(req: Request, res: Response) {
    try{
        const category: Category = req.body;
        const conn = await connect();
    
        await conn.query('INSERT INTO category SET ?', category);
    
        return res.status(200).json({
            ok: true,
            message: 'Category created',
            category
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            messsage: 'Internal Server error'
        });
    }
}


//================== ACTUALIZAR UNA CATEGORIA ==================//
export async function updateCategory(req: Request, res: Response) {
    try{
        const id = req.params.category_id;
        const updateCategory: Category = req.body;
        const conn = await connect();
    
        await conn.query('UPDATE category SET ? WHERE id = ?', [updateCategory, id]);
    
        return res.status(200).json({
            ok: true,
            message: 'Category updated',
            category: id
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            messsage: 'Internal Server error'
        });
    }
}

//================== ELIMINAR UNA CATEGORIA POR SU ID ==================//
export async function deleteCategory(req: Request, res: Response) {
    try{
        const id = req.params.category_id;
        const conn = await connect();
        await conn.query('DELETE FROM category WHERE category_id = ?', [id]);
    
        return res.json({
            message: 'Category deleted',
            category: id
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            messsage: 'Internal Server error'
        });
    }
}