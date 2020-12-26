"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBrand = exports.searchBrand = exports.updateBrand = exports.createBrand = exports.getBrands = void 0;
const query_1 = require("../queries/query");
//================== OBTENER TODAS LAS MARCAS ==================//
function getBrands(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const offset = Number(req.query.offset);
        const state = Number(req.query.state);
        if (Number.isNaN(offset) || Number.isNaN(state)) {
            return res.status(404).json({ ok: false, message: `La variable 'offset' y 'state' es obligatorio!` });
        }
        const queryGet = `SELECT * FROM brand WHERE state = ${state} ORDER BY brand_id DESC LIMIT 10 OFFSET ${offset}`;
        return yield query_1.query(queryGet).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.getBrands = getBrands;
//================== CREAR UNA MARCA ==================//
function createBrand(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const brand = req.body;
        const brandName = brand.brand_name;
        brand.brand_name = brandName.charAt(0).toUpperCase() + brandName.slice(1);
        const queryCheck = `SELECT * FROM brand WHERE brand_name = "${brand.brand_name}"`;
        return yield query_1.query(queryCheck).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
            if (dataCheck.result[0][0] != null) {
                return res.status(400).json({ ok: false, message: 'La marca ya existe!' });
            }
            const queryInsert = `INSERT INTO brand (brand_name, state) VALUES ("${brand.brand_name}", "${brand.state}")`;
            return yield query_1.query(queryInsert).then(data => {
                if (!data.ok)
                    return res.status(data.status).json({ ok: false, message: data.message });
                return res.status(data.status).json({ ok: true, message: 'Marca creado correctamente' });
            });
        }));
    });
}
exports.createBrand = createBrand;
//================== ACTUALIZAR UNA MARCA ==================//
function updateBrand(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const brand = req.body;
        const brandId = req.params.brand_id;
        const brandName = brand.brand_name;
        if (brandName != '' || brandName != null) {
            brand.brand_name = brandName.charAt(0).toUpperCase() + brandName.slice(1);
        }
        else {
            brand.brand_name = '';
        }
        const queryCheckId = `SELECT * FROM brand WHERE brand_id = "${brandId}"`;
        return yield query_1.query(queryCheckId).then((dataCheckId) => __awaiter(this, void 0, void 0, function* () {
            if (!dataCheckId.ok)
                return res.status(500).json({ ok: false, message: dataCheckId.message });
            if (dataCheckId.result[0][0] == null)
                return res.status(400).json({ ok: false, message: `La marca con el id ${brandId} no existe!` });
            const queryCheck = `SELECT * FROM brand WHERE brand_name = "${brand.brand_name}"`;
            return yield query_1.query(queryCheck).then((dataCheck) => __awaiter(this, void 0, void 0, function* () {
                if (!dataCheck.ok)
                    return res.status(500).json({ ok: false, message: dataCheck.message });
                if (dataCheck.result[0][0] != null)
                    return res.status(400).json({ ok: false, message: 'La marca ya existe!' });
                const queryUpdate = `UPDATE brand SET brand_name="${brand.brand_name}", state = "${brand.state}" WHERE brand_id = "${brandId}"`;
                return yield query_1.query(queryUpdate).then((dataUpdate) => __awaiter(this, void 0, void 0, function* () {
                    if (!dataUpdate.ok)
                        return res.status(dataUpdate.status).json({ ok: false, message: dataUpdate.message });
                    return res.status(dataUpdate.status).json({ ok: true, message: 'La marca se actualizó correctamente' });
                }));
            }));
        }));
    });
}
exports.updateBrand = updateBrand;
//================== BUSCAR MARCA POR SU NOMBRE  ==================//
function searchBrand(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const search = req.body.query;
        const state = Number(req.body.state);
        const querySearch = `SELECT * FROM brand WHERE brand_name LIKE "%${search}%" AND state = ${state} LIMIT 10`;
        return yield query_1.query(querySearch).then(data => {
            if (!data.ok)
                return res.status(data.status).json({ ok: false, message: data.message });
            return res.status(data.status).json({ ok: true, message: data.message, result: data.result[0] });
        });
    });
}
exports.searchBrand = searchBrand;
//================== ELIMINAR UNA MARCA POR SU ID ==================//
function deleteBrand(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const brandId = req.params.brand_id;
        const queryCheckId = `SELECT * FROM brand WHERE brand_id = "${brandId}"`;
        return yield query_1.query(queryCheckId).then((dataCheckId) => __awaiter(this, void 0, void 0, function* () {
            if (dataCheckId.result[0][0] == null) {
                return res.status(400).json({ ok: false, message: `La marca con el id ${brandId} no existe!` });
            }
            ;
            const queryDelete = `UPDATE brand SET state = 0 WHERE brand_id = "${brandId}"`;
            return yield query_1.query(queryDelete).then(dataDelete => {
                if (!dataDelete.ok)
                    return res.status(dataDelete.status).json({ ok: false, message: dataDelete.message });
                return res.status(dataDelete.status).json({ ok: true, message: 'La categoría se eliminó correctamente' });
            });
        }));
    });
}
exports.deleteBrand = deleteBrand;
