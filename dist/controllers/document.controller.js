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
exports.getDataByRuc = exports.getDniByName = exports.getFullNameByDni = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
function getFullNameByDni(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dniParams = req.params.dni;
            const url = 'https://eldni.com/buscar-por-dni?dni=' + dniParams;
            const browser = yield puppeteer_1.default.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox',], devtools: true });
            const page = yield browser.newPage();
            yield page.goto(url, { waitUntil: 'networkidle2' });
            let data = yield page.evaluate(() => {
                var rowData = document.querySelectorAll('table[class="table table-striped"]>tbody>tr>td');
                var firstName = rowData[0].innerText;
                var lastNameF = rowData[1].innerText;
                var lastNameM = rowData[2].innerText;
                return { firstName, lastNameF, lastNameM };
            });
            yield browser.close();
            return res.status(200).json({
                firstName: data.firstName,
                lastNameF: data.lastNameF,
                lastNameM: data.lastNameM
            });
        }
        catch (e) {
            return res.status(400).json({ error: e });
        }
    });
}
exports.getFullNameByDni = getFullNameByDni;
function getDniByName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const firstName = body.first_name;
            const lastNameF = body.last_name_f;
            const lastNameM = body.last_name_m;
            const browser = yield puppeteer_1.default.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox',] });
            const page = yield browser.newPage();
            yield page.goto('https://eldni.com/buscar-por-nombres', { waitUntil: 'networkidle2' });
            yield page.waitFor('input[name=nombres]');
            yield page.waitFor('input[name=apellido_p]');
            yield page.waitFor('input[name=apellido_m]');
            yield page.evaluate(() => {
                document.getElementById('nombres').value = firstName;
                document.getElementById('apellido_p').value = lastNameF;
                document.getElementById('apellido_m').value = lastNameM;
            });
            yield page.focus('#nombres');
            yield page.keyboard.press('Enter');
            yield page.waitForSelector('.text-danger');
            const people = yield page.evaluate(() => {
                const numsRowsText = document.querySelector('.text-danger').innerHTML;
                const numsRowsInt = Number(numsRowsText.slice(1, 3));
                const rowDataFullName = document.querySelectorAll('table[class="table table-striped"]>tbody>tr>td');
                const rowDataDni = document.querySelectorAll('table[class="table table-striped"]>tbody>tr>th');
                var n = 2;
                var m = 0;
                var data = '';
                var arrayPeople = [];
                for (let i = 0; i < numsRowsInt * 3; i++) {
                    data += '' + rowDataFullName[i].innerText + ' ';
                    if (i === n) {
                        const newData = data.slice(0, -1);
                        const dni = rowDataDni[m].innerText;
                        arrayPeople.push(dni + ': ' + newData);
                        data = '';
                        m++;
                        if ((m % 10) === 0) {
                            m++;
                        }
                        n += 3;
                    }
                }
                return arrayPeople;
            });
            yield browser.close();
            return res.status(200).json({ ok: true, result: people });
        }
        catch (e) {
            return res.status(400).json({ ok: false, error: e });
        }
    });
}
exports.getDniByName = getDniByName;
function getDataByRuc(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const ruc = req.params.ruc;
        const url = 'http://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc';
        const urlNumRandom = url + '/captcha?accion=random';
        const browser = yield puppeteer_1.default.launch();
        const page1 = yield browser.newPage();
        page1.on('error', err => {
            console.log('error happen at the page: ', err);
        });
        yield page1.goto(urlNumRandom, { waitUntil: 'networkidle2' });
        page1.on('error', err => {
            console.log('error happen at the page: ', err);
        });
        let numRandom = yield page1.evaluate(() => {
            var rowData = document.querySelector('pre');
            var data = rowData.innerText;
            return { data };
        });
        const urlRuc = url + '/jcrS00Alias?accion=consPorRuc&nroRuc=' + ruc + '&numRnd=' + numRandom.data;
        const page2 = yield browser.newPage();
        yield page2.goto(urlRuc, { waitUntil: 'networkidle2' });
        let rucData = yield page2.evaluate(() => {
            var rowData = document.querySelectorAll('table[class="form-table"]>tbody>tr>td');
            var numRuc = rowData[1].innerText;
            var taxpayerType = rowData[3].innerText;
            var commercialName = rowData[5].innerText;
            var dateRegistration = rowData[7].innerText;
            var startDateActivities = rowData[9].innerText;
            var taxpayerState = rowData[11].innerText;
            var dateDischarge = rowData[13].innerText;
            var taxpayerCondition = rowData[15].innerText;
            var addressFiscalDomicile = rowData[17].innerText;
            var voucherIssuingSystem = rowData[19].innerText;
            var foreignTradeActivity = rowData[21].innerText;
            var accountingSystem = rowData[23].innerText;
            var economicActivities = rowData[25].innerText;
            var paymentVouchers = rowData[27].innerText;
            var electronicEmissionSystem = rowData[29].innerText;
            var electronicSenderFrom = rowData[31].innerText;
            var electronicReceipts = rowData[33].innerText;
            return { numRuc, taxpayerType, commercialName, dateRegistration, startDateActivities,
                taxpayerState, dateDischarge, taxpayerCondition, addressFiscalDomicile,
                voucherIssuingSystem, foreignTradeActivity, accountingSystem, economicActivities,
                paymentVouchers, electronicEmissionSystem, electronicSenderFrom, electronicReceipts };
        });
        yield browser.close();
        return res.status(200).json({
            numRuc: rucData.numRuc,
            taxpayerType: rucData.taxpayerType,
            commercialName: rucData.commercialName,
            dateRegistration: rucData.dateRegistration,
            startDateActivities: rucData.startDateActivities,
            taxpayerState: rucData.taxpayerState,
            dateDischarge: rucData.dateDischarge,
            taxpayerCondition: rucData.taxpayerCondition,
            addressFiscalDomicile: rucData.addressFiscalDomicile,
            voucherIssuingSystem: rucData.voucherIssuingSystem,
            foreignTradeActivity: rucData.foreignTradeActivity,
            accountingSystem: rucData.accountingSystem,
            economicActivities: rucData.economicActivities,
            paymentVouchers: rucData.paymentVouchers,
            electronicEmissionSystem: rucData.electronicEmissionSystem,
            electronicSenderFrom: rucData.electronicSenderFrom,
            electronicReceipts: rucData.electronicReceipts,
        });
    });
}
exports.getDataByRuc = getDataByRuc;
