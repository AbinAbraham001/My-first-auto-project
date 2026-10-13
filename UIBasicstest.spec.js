const {test} = require('@playwright/test');

test(testcase1, async function({browser})
{
  //chrome - plugins/ cookies 
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("http://www.rahulshettyacademy.com/.")
   


})