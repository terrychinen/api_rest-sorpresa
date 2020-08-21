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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullDataByRuc = exports.getFullNameByDNI = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
function getFullNameByDNI(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dniParams = req.params.dni;
            const url = 'https://eldni.com/buscar-por-dni?dni=' + dniParams;
            const browser = yield puppeteer_1.default.launch();
            const page = yield browser.newPage();
            yield page.goto(url, { waitUntil: 'networkidle2' });
            let data = yield page.evaluate(() => {
                var rowData = document.querySelectorAll('table[class="table table-striped"]>tbody>tr>td');
                var dni = rowData[0].innerText;
                var firstName = rowData[1].innerText;
                var lastName = rowData[2].innerText;
                return { dni, firstName, lastName };
            });
            yield browser.close();
            return res.status(200).json({
                dni: data.dni,
                firstName: data.firstName,
                lastName: data.lastName
            });
        }
        catch (e) {
            return res.status(400).json({
                error: e
            });
        }
    });
}
exports.getFullNameByDNI = getFullNameByDNI;
function getFullDataByRuc(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rucParams = req.params.ruc;
            const url = 'https://consultaruc.pe/';
            const browser = yield puppeteer_1.default.launch();
            const page = yield browser.newPage();
            yield page.goto(url, { waitUntil: 'networkidle2' });
            yield page.waitFor('input[name=nruc]');
            yield page.$eval('input[name=nruc]', input => input.value = rucParams);
            yield page.click('input[type="submit"]');
            yield page.waitForSelector('"tbody');
            //  (<HTMLInputElement>document.getElementById('ruc')).value = rucParams;
            let data = yield page.evaluate(() => {
                const rowData = document.querySelectorAll('table[class="table table-striped"]>tbody>tr>td');
                var ruc = rowData[0].innerText;
                var razonSocial = rowData[1].innerText;
                var condition = rowData[2].innerText;
                return { ruc, razonSocial, condition };
            });
            yield browser.close();
            return res.status(200).json({
                ruc: data.ruc,
                razonSocial: data.razonSocial,
                condition: data.condition
            });
        }
        catch (e) {
            return res.status(400).json({
                error: e
            });
        }
    });
}
exports.getFullDataByRuc = getFullDataByRuc;
