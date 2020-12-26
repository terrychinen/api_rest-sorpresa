import { query } from '../queries/query';
import { Request, Response } from 'express';
import { IBrand } from '../interfaces/brand.interface';



//================== OBTENER TODAS LAS MARCAS ==================//
export async function getBrands(req: Request, res: Response){
    const offset = Number(req.query.offset);
    const state = Number(req.query.state);

    if(Number.isNaN(offset) || Number.isNaN(state)) {
        return res.status(404).json({ok: false, message: `La variable 'offset' y 'state' es obligatorio!`});
    }

    const queryGet = `SELECT * FROM brand WHERE state = ${state} ORDER BY brand_id DESC LIMIT 10 OFFSET ${offset}`;

    return await query(queryGet).then(data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}



//================== CREAR UNA MARCA ==================//
export async function createBrand(req: Request, res: Response) {
    const brand: IBrand = req.body;

    const brandName = brand.brand_name;
    brand.brand_name = brandName.charAt(0).toUpperCase() + brandName.slice(1);

    const queryCheck = `SELECT * FROM brand WHERE brand_name = "${brand.brand_name}"`;
   
    return await query(queryCheck).then(async dataCheck => {
        if(dataCheck.result[0][0] != null) {return res.status(400).json({ok: false, message: 'La marca ya existe!'});}
        const queryInsert = `INSERT INTO brand (brand_name, state) VALUES ("${brand.brand_name}", "${brand.state}")`;

        return await query(queryInsert).then(data => {
            if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
            return res.status(data.status).json({ok: true, message: 'Marca creado correctamente'});
        });
    });
}



//================== ACTUALIZAR UNA MARCA ==================//
export async function updateBrand(req: Request, res: Response) {
    const brand: IBrand = req.body;
    const brandId = req.params.brand_id;

    const brandName = brand.brand_name;
    if(brandName != '' || brandName != null){
        brand.brand_name = brandName.charAt(0).toUpperCase() + brandName.slice(1);
    }else{
        brand.brand_name = '';
    }

    const queryCheckId = `SELECT * FROM brand WHERE brand_id = "${brandId}"`;

    return await query(queryCheckId).then(async dataCheckId => {
        if(!dataCheckId.ok) return res.status(500).json({ok: false, message: dataCheckId.message});
        if(dataCheckId.result[0][0] == null) return res.status(400).json({ok: false, message: `La marca con el id ${brandId} no existe!`});

        const queryCheck = `SELECT * FROM brand WHERE brand_name = "${brand.brand_name}"`;

        return await query(queryCheck).then(async dataCheck => {
            if(!dataCheck.ok) return res.status(500).json({ok: false, message: dataCheck.message});
            if(dataCheck.result[0][0] != null) return res.status(400).json({ok: false, message: 'La marca ya existe!'});

            const queryUpdate = `UPDATE brand SET brand_name="${brand.brand_name}", state = "${brand.state}" WHERE brand_id = "${brandId}"`;    

            return await query(queryUpdate).then(async dataUpdate => {
                if(!dataUpdate.ok) return res.status(dataUpdate.status).json({ok: false, message: dataUpdate.message});    
                return res.status(dataUpdate.status).json({ok: true, message: 'La marca se actualizó correctamente'});
            });
        });
    });
}



//================== BUSCAR MARCA POR SU NOMBRE  ==================//
export async function searchBrand(req: Request, res: Response){
    const search = req.body.query;
    const state = Number(req.body.state);

    const querySearch = `SELECT * FROM brand WHERE brand_name LIKE "%${search}%" AND state = ${state} LIMIT 10`;

    return await query(querySearch).then( data => {
        if(!data.ok) return res.status(data.status).json({ok: false, message: data.message})
        return res.status(data.status).json({ok: true, message: data.message, result: data.result[0]});
    });
}



//================== ELIMINAR UNA MARCA POR SU ID ==================//
export async function deleteBrand(req: Request, res: Response) {
    const brandId = req.params.brand_id;

    const queryCheckId = `SELECT * FROM brand WHERE brand_id = "${brandId}"`;

    return await query(queryCheckId).then(async dataCheckId => {
        if(dataCheckId.result[0][0] == null) {return res.status(400).json({ok: false, message: `La marca con el id ${brandId} no existe!`});};
        const queryDelete = `UPDATE brand SET state = 0 WHERE brand_id = "${brandId}"`;

        return await query(queryDelete).then(dataDelete => {
            if(!dataDelete.ok) return res.status(dataDelete.status).json({ok: false, message: dataDelete.message})
            return res.status(dataDelete.status).json({ok: true, message: 'La categoría se eliminó correctamente'});
        });
    });
}