import { connect } from '../database';
import { Request, Response } from 'express';
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

        await conn.query({
            sql: 'SELECT * FROM categorys WHERE category_name = ? limit 1',
            values: category.category_name
        }, async function(error, categoryDB: Category[]) {

            if(error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Internal Server error'
                });
            }

            if(categoryDB[0]) {
                return res.status(400).json({
                    ok :false,
                    message: 'Category name already exists',
                });
            }
            
            await conn.query('INSERT INTO category SET ?', category);
    
            return res.status(200).json({
                ok: true,
                message: 'Category created',
                category
            });

        });

    }catch(error) {
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

        await conn.query({
            sql: 'SELECT * FROM category WHERE category_id = ?',
            values: id 
        }, async function(error, categoryDB: Category[]) {
            if(error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Internal Server error'
                });
            }

            if(!categoryDB[0]) {
                return res.status(400).json({
                    ok: false,
                    message: 'The category does not exist'
                });
            }

            await conn.query('UPDATE category SET ? WHERE category_id = ?', [updateCategory, id]);
    
            return res.status(200).json({
                ok: true,
                message: 'Category updated',
                category: id
            });

        });

    }catch(error) {
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

        await conn.query({
            sql: 'SELECT * FROM category WHERE category_id = ? limit 1',
            values: id
        }, async function(error, categoryDB: Category[]) {
            if(error) {
                return res.status(500).json({
                    ok: false,
                    message: 'Internal Server error'
                });
            }

            if(!categoryDB[0]) {
                return res.status(400).json({
                    ok: false,
                    message: 'The category does not exist'
                });
            }

            await conn.query('DELETE FROM category WHERE category_id = ?', [id]);
    
            return res.json({
                ok: true,
                message: 'Category deleted',
                category: id
            });    

        });

    }catch(error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            messsage: 'Internal Server error'
        });
    }
}