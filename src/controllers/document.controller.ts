import puppeteer from 'puppeteer';
import { Request, Response } from 'express';

export async function getFullNameByDni(req: Request, res: Response) {
    try{
        const dniParams = req.params.dni;
        const url = 'https://eldni.com/buscar-por-dni?dni=' +dniParams;
        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox',]});
        const page = await browser.newPage();    
        await page.goto(url, {waitUntil: 'networkidle2'});    

        let data = await page.evaluate(() => {
            var rowData = <HTMLElement><unknown>document.querySelectorAll('table[class="table table-striped"]>tbody>tr>td');
            var firstName = rowData[0].innerText;
            var lastNameF = rowData[1].innerText;
            var lastNameM = rowData[2].innerText;

            return {firstName, lastNameF, lastNameM};
        });

        await browser.close();

        return res.status(200).json({
            firstName: data.firstName,
            lastNameF: data.lastNameF,
            lastNameM: data.lastNameM
       });

    }catch(e){return res.status(400).json({error: e});}
}

export async function getDniByName(req: Request, res: Response) {
    try{
        const body = req.body;
        const firstName: String = body.first_name;
        const lastNameF: String = body.last_name_f;
        const lastNameM: String = body.last_name_m;


        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox',]});
        const page = await browser.newPage();
        await page.goto('https://eldni.com/buscar-por-nombres', {waitUntil: 'networkidle2'});
    
        await page.waitFor('input[name=nombres]');
        await page.waitFor('input[name=apellido_p]');
        await page.waitFor('input[name=apellido_m]');

        await page.evaluate(({firstName,lastNameF, lastNameM}) => {
            (<HTMLInputElement>document.getElementById('nombres')).value    = firstName;
            (<HTMLInputElement>document.getElementById('apellido_p')).value = lastNameF;
            (<HTMLInputElement>document.getElementById('apellido_m')).value = lastNameM;
        }, {firstName,lastNameF, lastNameM});

        await page.focus('#nombres');      
        await page.keyboard.press('Enter');
        await page.waitForSelector('.text-danger');

        const people = await page.evaluate(() => {
            const numsRowsText = document.querySelector('.text-danger').innerHTML;
            const numsRowsInt = Number(numsRowsText.slice(1, 3));
            const rowDataFullName = <HTMLElement><unknown>document.querySelectorAll('table[class="table table-striped"]>tbody>tr>td');
            const rowDataDni = <HTMLElement><unknown>document.querySelectorAll('table[class="table table-striped"]>tbody>tr>th');

            var n=2; var m=0; var data = ''; var arrayPeople = [];
            
            for(let i=0; i<numsRowsInt*3; i++){
                data += ''+rowDataFullName[i].innerText + ' ';
                if(i === n){
                    const newData = data.slice(0, -1);
                    const dni = rowDataDni[m].innerText;
                    arrayPeople.push(dni +': '+newData);
                    data='';
                    m++;
                    if((m%10) === 0){m++;}
                    n+=3;
                }
            }
            return arrayPeople;
        });

        await browser.close();

        console.log(10%10);

        return res.status(200).json({ok:true, result: people});
    }catch(e){
        return res.status(400).json({ok: false, error: e});
    }
}

export async function getDataByRuc(req: Request, res: Response) {
    try {
        const ruc = req.params.ruc;

        const url = 'http://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc';
        const urlNumRandom = url + '/captcha?accion=random';

        const browser = await puppeteer.launch({args: ['--no-sandbox']});        
        const page1 = await browser.newPage();
        await page1.goto(urlNumRandom, {waitUntil: 'networkidle2'});

        let numRandom = await page1.evaluate(() => {
            var rowData = <HTMLElement><unknown>document.querySelector('pre');
            var data = rowData.innerText;

            return {data};
        });

        const urlRuc = url + '/jcrS00Alias?accion=consPorRuc&nroRuc='+ruc+'&numRnd='+numRandom.data;
        const page2 = await browser.newPage();
        await page2.goto(urlRuc, {waitUntil: 'networkidle2'});

        let rucData = await page2.evaluate(() => {
            var rowData = <HTMLElement><unknown>document.querySelectorAll('table[class="form-table"]>tbody>tr>td');
            var numRuc                       =  rowData[1].innerText;
            var taxpayerType                 =  rowData[3].innerText;
            var commercialName               =  rowData[5].innerText;
            var dateRegistration             =  rowData[7].innerText;
            var startDateActivities          =  rowData[9].innerText; 
            var taxpayerState                =  rowData[11].innerText;
            var dateDischarge                =  rowData[13].innerText;
            var taxpayerCondition            =  rowData[15].innerText;
            var addressFiscalDomicile        =  rowData[17].innerText;
            var voucherIssuingSystem         =  rowData[19].innerText;
            var foreignTradeActivity         =  rowData[21].innerText;
            var accountingSystem             =  rowData[23].innerText;
            var economicActivities           =  rowData[25].innerText;
            var paymentVouchers              =  rowData[27].innerText;
            var electronicEmissionSystem     =  rowData[29].innerText;
            var electronicSenderFrom         =  rowData[31].innerText;
            var electronicReceipts           =  rowData[33].innerText;

            return {numRuc, taxpayerType, commercialName, dateRegistration, startDateActivities, 
                    taxpayerState, dateDischarge, taxpayerCondition, addressFiscalDomicile,
                    voucherIssuingSystem, foreignTradeActivity, accountingSystem, economicActivities,
                    paymentVouchers, electronicEmissionSystem, electronicSenderFrom, electronicReceipts};
        });

        await browser.close();
    
        return res.status(200).json({
            numRuc                      :    rucData.numRuc,
            taxpayerType                :    rucData.taxpayerType,
            commercialName              :    rucData.commercialName,
            dateRegistration            :    rucData.dateRegistration,
            startDateActivities         :    rucData.startDateActivities,
            taxpayerState               :    rucData.taxpayerState,
            dateDischarge               :    rucData.dateDischarge,
            taxpayerCondition           :    rucData.taxpayerCondition,
            addressFiscalDomicile       :    rucData.addressFiscalDomicile,
            voucherIssuingSystem        :    rucData.voucherIssuingSystem,
            foreignTradeActivity        :    rucData.foreignTradeActivity,
            accountingSystem            :    rucData.accountingSystem,
            economicActivities          :    rucData.economicActivities,
            paymentVouchers             :    rucData.paymentVouchers,
            electronicEmissionSystem    :    rucData.electronicEmissionSystem,
            electronicSenderFrom        :    rucData.electronicSenderFrom,
            electronicReceipts          :    rucData.electronicReceipts,
       });

    }catch(e) {
        console.error(e);        
        return res.status(400).json({error: e})};
}