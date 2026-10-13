const {test, expect}= require('@playwright/test');
//const {console} = require('console');
const Exceljs= require('exceljs');
const path = require('path');

test.only ('paymentholidayfileupdate e2e', async ({page})=>
{ 
    await page.goto("https://portalcloud.allpay.test/");
   const username = page.locator("#UserName");
   const password= page.locator("#Password");
   const login =  page.getByRole('button', { value: 'Log In' }); 
    await username.fill("passport_admin");//('rajb3200');
    await password.fill('Allpay01'); //("Allpay01Allpay01");
    await login.click();
    
    await page.getByRole('button',{ name:'Files' }).click();
    await page.getByRole('link', { name : 'File export DD'}).click();
     //await page.pause();
    //await page.getByTitle('SelectedSchemeCode_chosen').click();
    //await page.pause();
   // await page.locator(".card-body b").first().waitFor();
  //await page.waitForLoadState('networkidle');
  //await page.locator(".card-body b").first().textContent();
  //const s = await page.locator(".card-body b").allTextContents();
   //console.log(s);
     //await page.waitForLoadState('networkidle');
  //await page.locator(".card-body b").first().waitFor();
  //await page.getByRole('link', { name: 'File export DD' }).click();
  //await page.getByRole('link', { name: 'File import DD' }).click();
  //await page.getByRole('link', { name: 'File export DD' }).click();
  //await page.getByRole('group', { name: 'Client code' }).locator('a').click();
//     await page.getByRole('group', { name: 'Client code' }).locator('a').click();
  //await page.locator('div b').click();
  //await page.getByText('SelectedSchemeCode_chosen').click;
  //const schemecode= 
  //await page.locator('#SelectedSchemeCode_chosen').click();
  await page.locator('.combobox-wrapper').click();
  //await page.locator('.accessible-combobox').click(); 
  //await page.locator('#SelectedSchemeCode_chosen .chosen-results li').filter({ hasText: 'DUM1 ALLPAY TEST ACCOUNT (SCHEME CODE DESCRIPTION DUM1)' }).click();//correct
  //await page.locator('.active-result').filter({ hasText: 'DUM1 ALLPAY TEST ACCOUNT' }).click();//can be flaky as the name description changing
  await page.getByRole('option', {name: /DUM1 ALLPAY TEST ACCOUNT/i}).click();
  //await page.locator('#SelectedExtractType_chosen').click();
  await page.locator('#ExtractTypes_toggle').click();  
  //await page.locator('#SelectedExtractType_chosen .chosen-results li').filter({ hasText:'Payment Holiday cancellation'}).click();//correct
  //await page.locator('.active-result').filter({ hasText:'Payment Holiday'}).first().click();//correct
  await page.getByRole('option', { name: 'Payment Holiday' }).first().click();
  //await page.locator('.active-result').getByText('Payment Holiday', { exact: true }).click();
 // await page.getByRole('option', {value: 'DUM1 ALLPAY TEST ACCOUNT',exact: false}).click();
  //await page.locator('li', { hasText: 'DUM1 ALLPAY TEST ACCOUNT (SCHEME CODE DESCRIPTION DUM1)' }).click() //correct
  //await page.pause();
  //await page.getByText('DUM1 ALLPAY TEST ACCOUNT (SCHEME CODE DESCRIPTION DUM1)').click();
   //await page.locator('#SelectedSchemeCode_chosen').filter ()
  //await page.getByRole('listitem').filter({ hasText: '' });
  //await page.locator('#SelectedSchemeCode').click();
  //await page.locator('#SelectedSchemeCode_chosen').filter({ hasText: 'DUM1 ALLPAY TEST ACCOUNT (SCHEME CODE DESCRIPTION DUM1)' }).click();
 // await page.locator('#SelectedSchemeCode_chosen').filter({ has: 'DUM1 ALLPAY TEST ACCOUNT (SCHEME CODE DESCRIPTION DUM1)' });
  //await page.getByText('DUM1 ALLPAY TEST ACCOUNT (SCHEME CODE DESCRIPTION DUM1)').click();
  //await page.getByRole('group', { name: 'Extract type' }).locator('a').click();//--- Please select an extract type ---
  //await page.pause();
  //await page.getByText('Please select an extract type').click();
 // await page.locator('#SelectedExtractType_chosen').getByText('Payment Holiday', { exact: true }).click();
  //await page.locator('#PaymentHolidayStartDate').click();///correct
  //await page.getByPlaceholder('dd/mm/yyyy').click();'[]  //await page.locator('#EffectiveDate').click();
  //const today = new Date().toLocaleDateString(); // 22/04/2026 
 //const futureDate = new Date(new Date().setDate(new Date().getDate() + 30)).toLocaleDateString();
// console.log(futureDate);
//   console.log(today);
const futureDate = new Date(new Date().setDate(new Date().getDate() + 30));
const phdate= futureDate.toLocaleDateString();
const phstartday = futureDate.getDate();
//const phendate= phstartday.getDate() + 30 ();----------wrong code
const phenddate=new Date(new Date().setDate(new Date().getDate() + 60));
const phendday = phenddate.getDate();
  await page.locator('#PaymentHolidayStartDate').fill(phdate);
  await page.locator('.ui-icon-circle-triangle-e').click();
  await page.getByRole('link', { name: phstartday }).click();
  //await page.locator('.ui-icon-circle-triangle-e').click(); //ui-datepicker-prev ui-corner-all ui-state-disabled
  await page.locator('#PaymentHolidayEndDate').click();
  await page.locator('.ui-icon-circle-triangle-e').click();
  //await page.pause();
  await page.getByRole('link', { name:phendday}).click();
 //await page.getByRole("button",{ name:'button'}).click();
  
await Promise.all([
 page.waitForLoadState('networkidle'),
  //page.click('#submit')
  page.getByRole("button",{ name:'button'}).click()
]);
  //await page.getByRole("button",{ name:'button'}).click();
  //await page.getByRole('row').locator('i.fa-eye').waitFor('domcontentloaded');

  
const partialfilename = function getDateTime() {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  const formatted =
    `${pad(now.getDate())}-` +
    `${pad(now.getMonth() + 1)}-` +
    `${now.getFullYear()}-` +
    `${pad(now.getHours())}-` +
    `${pad(now.getMinutes())}-` +
    `${pad(now.getSeconds())}`;
  return formatted;
}
//console.log(getDateTime());
console.log(partialfilename());
  //const filenam= page.locator('td[data-bind*="fileName"]').filter({hasText:getDateTime()});
  //await page.locator('td[data-bind*="fileName"]').waitFor();
  
const cells = page.locator('td[data-bind*="fileName"]');
await cells.first().waitFor();
const names = await cells.allTextContents();

  const tablecount= await page.locator('tbody[data-bind="foreach: ExportHistory"]').count();
 // console.log(tablecount);
 
 //await page.locator('tbody[data-bind="foreach: ExportHistory"]').getByText('Export completed');
 await page.locator('td[data-bind="text: fileName"]').allTextContents();
//await page.getByRole('row').first().locator('i.fa-eye').waitFor({ state: 'visible' });
  
  //const rows = page.locator('table tbody tr');
  //await expect(rows.first()).toBeVisible();
  //const latestRow = rows.last();
  //await expect(latestRow).toBeVisible();
  //const latestIcon = latestRow.locator('i.fa-eye').nth(0);
  //await expect(latestIcon).toBeVisible();
  //await latestIcon.click();
  await page.getByRole('row').locator('i.fa-eye').first().waitFor({ state: 'visible' });
  //getByText('Processing').
  
 const latestEyeLink =  page.getByRole('row').locator('i.fa-eye').last();
 //await expect(page.getByRole('row').locator('i.fa-eye').first()).toBeVisible();----------
  
//const latestEyeLink = page.getByRole('link').filter({ has: page.locator('i.fa-eye') }).first();
await expect(latestEyeLink).toBeVisible();
await expect(latestEyeLink).toBeEnabled();
//console.log(partialfilename());
//await latestEyeLink.click();
//await page.getByRole('cell', { name: partialfilename() }).first().waitFor();----------
await page.locator('tr').locator('i.fa-eye').last().waitFor();//ilter({ hasText: 'Report.pdf' })
//fa fa-eye
// await Promise.all([
//   page.waitForResponse(resp =>
//     resp.url('https://portalcloud.allpay.test/Instruction/CreateExportDd').includes('/api/files') && resp.status() === 200
//   ),
//   page.click('#loadFiles')
// ]);
// await Promise.all([
//   page.waitForResponse(resp =>
//     resp.url('https://portalcloud.allpay.test/Instruction/CreateExportDd').includes('xlsx') && resp.status() === 200
//   ),
//   page.click('#refresh')
// ]);
const latestEyeIcon = page.locator('tbody tr').first().locator('i.fa-eye');
await latestEyeIcon.waitFor();

 // 
  
//const firstRowEyeIcon = page.getByRole('row').locator('i.fa-eye').nth(0);-----------------
//await page.locator('tr i["class=fa-eye"]').click();
//await firstRowEyeIcon.waitFor({ state: 'visible' });---------------------------
  //await page.locator('i.fa-eye').waitForLoadState('networkidle');
  //const [download] = await Promise.all([
   // await page.waitForEvent('download'),
  //await page.locator('tr.tac').getByRole('link').first().click();
  //await page.locator('i.fa-eye').nth(0).click();
  //const downloadPromise = await page.waitForEvent('download');
  //await page.getByRole('row', { name: '20/04/2026 Passport_Admin 20/' }).getByRole('link').click();
 // await page.pause();
  const downfilename= await page.locator('td[data-bind="text: fileName"]').first().textContent();
  console.log(downfilename);
const [download] = await Promise.all([
  page.waitForEvent('download'),
  await page.getByRole('cell').last().waitFor(),
//const row = page.locator('table tbody tr').last();
//await row.locator('i.fa-eye').nth(0).waitFor({ state: 'visible' });
  //await page.locator('i.fa-eye').nth(0)
  //await page.locator('i.fa-eye').nth(0).click()
  //await firstRowEyeIcon.click()
  //await filenam.locator('i.fa-eye').click()
  //await latestEyeLink.click()
  await page.getByRole('row').locator('i.fa-eye').first().click()
]);
  //await page.waitForEvent('download');
  //await latestIcon.click()]);
  
  //await page.pause();

//await download.saveAs('export.xlsx');
  //const download = await waitfordownload;
  await download.saveAs('./'+ download.suggestedFilename());
  //await page.getByRole()
 //await page.pause();
  const dpathartifact = await download.path();
await console.log(dpathartifact);


const fileforupload = 'C:\\Users\\abina\\Downloads'+'\\'+downfilename;
console.log('hi');
console.log(fileforupload);
const filelocation= fileforupload.toString();

  //const download = await downloadPromise;
  await page.getByRole("button",{name: 'Files'}).click();
  //await page.getByRole('link', { name: 'File import DD' }).click();
  //await page.getByRole('link', { name: "/Instruction/ImportDd" }).click();
  //await page.getByText('File import DD').click();
  await page.locator('a[href="/Instruction/ImportDd"]').click();

  await page.getByRole('button', { name: 'Browse' }).click();

//   await page.locator('#fileupload').setInputFiles('DDPaymentHolidayDUM1_04-08-2026-07-33-55.xlsx');
//   await page.getByRole('button', { name: 'Import file' }).click();
//   await page.getByText('Import Cancel').click();
//   await page.goto('https://portalcloud.allpay.test/Instruction/InstructionFileSummary?fileImportId=51995');
console.log(fileforupload);
  //await page.locator('#browseButton').setInputFiles(fileforupload);
  await page.locator('#fileupload').setInputFiles(fileforupload);
 await page.locator('#uploadButton').click();
  //await page.pause();
 await page.locator('a[data-bind*="ready to submit"]').click();
 //await page.pause();
 
//await page.getByRole("checkbox", {name: 'checked: selectAll'}).click();
 //await page.pause();
  //await page.getByRole("link",{name : /records  ready to submit/i}).click();
 // await page.getByRole("button",{name: /submit selected records/i}).click();
 //await page.pause();
  await page.getByRole('row', { name: 'select Created Created by' }).getByLabel('select').uncheck();
 // await page.getByRole('table', {name: username }).getByLabel('select').check();
 await page.locator('td [type= "checkbox"]').first().click(); 
 //await page.getByRole('row', { name: 'select 15/05/2026 Passport_Admin 0TESTING03 AREGRESSION3 Payment holiday 10.00' }).getByLabel('select').check();
  await page.getByRole('button', { name: 'submit selected records' }).click();
  await page.getByRole('button', { name: 'Ok' }).click();
  await page.getByRole('link', { name: 'View file summary' }).click();
  await page.getByRole('link', { name: 'View complete instructions' }).click();
}
);

  test('accountVerifypaymentholiday',async ({page})=>{
    await page.goto("https://portalcloud.allpay.test/");
   const username = page.locator("#UserName");
   const password= page.locator("#Password");
   const login =  page.getByRole('button', { value: 'Log In' }); 
    await username.fill("passport_admin");//('rajb3200');
    await password.fill('Allpay01'); //("Allpay01Allpay01");
    await login.click();
    await page.getByRole('button',{name:'Search'}).click();
  await page.getByRole('link', { name: 'Account', exact: true }).click();
  await page.locator('#searchAccountDetails a').click();
  
  await page.locator('#searchAccountDetails #SchemeCode_chosen').getByRole('textbox').fill('dum');
  await page.getByRole('listitem').filter({ hasText: 'DUM1 ALLPAY TEST ACCOUNT (' }).dblclick();
  await page.getByRole('textbox', { name: 'Client reference' }).click();
  await page.getByRole('button', { name: 'submit' }).click();
  await page.getByRole('row', { name: 'DUM1 0TESTING03 290042822' }).getByLabel('View details of the Direct').click();
  await page.getByRole('link', { name: 'View details of the Direct' }).click();
  await page.pause();
    
  
}
);










 //const excelfile= await fileforupload.path();
// const fileupload = path.join(
//   'C:',
//   'Users',
//   'abina',
//   'Downloads',
//   'PlaywrightAutomation2',
//   downfilename
// );
///EXCEL VALIDATION??????????????????????????
// const fs = require('fs');////Correct
// console.log(fs.existsSync(fileforupload));///Correct
// //console.log(fs.existsSync(fileupload));
// ///Scheme code from downloaded Excel 
//  //async function excelvalidation() {
 
// // const stream = await download.createReadStream();
// // const chunks = [];
// // for await (const chunk of stream) {
// //   chunks.push(chunk);
// // }
// // const buffer = Buffer.concat(chunks);
//   //const filelocation = await download.path();
 
// const content = fs.readFileSync(dpathartifact);///Correct
// console.log(content.toString());///Correct
//  await page.pause();///Correct
//  const workbook= new Exceljs.Workbook();///Correct
 
//  await workbook.xlsx.readFile(fileforupload);//(dpathartifact);///Correct
//  const worksheet= workbook.getWorksheet('DD Payment Holidays');///Correct
 
// const cell = worksheet.getCell('B2');///Correct
// const clientRef = cell.value;///Correct
// console.log(clientRef);///Correct
//await workbook.xlsx.load(buffer);
//("C:\Users\abina\Downloads\PlaywrightAutomation2\DDPaymentHolidayDUM1_09-05-2026-08-24-28.xlsx"); 
//  worksheet.eachRow(async(row, rowNumber)=>{
//     row.eachCell((cells, colNumber)=> 
//     {
//       if (row.getCell());
//         const clientRef = cells.value
//         console.log(clientRef)
//     }
    
//     )
//   }
//   )
 
 //};
 //excelvalidation();
  //await page.pause();
  //const date='20';
  //const month= 'current'+1;
  //const year ='current +1'
  // await page.getByRole('link', { name: '20' }).click();
  // await page.locator('#PaymentHolidayEndDate').click();
  // await page.getByRole('link', { name: '30' }).click();
  // await page.getByRole('button', { name: 'button' }).click();
  // //const downloadPromise = page.waitForEvent('download');
  // await page.getByRole('row', { name: '20/04/2026 Passport_Admin 20/' }).getByRole('link').click();
  // await page.pause();





//const logger =new console
//await console.log(dpath);

