#!/usr/bin/env node
var fs = require('fs');
var path = require('path');

var faker = require('faker');
var puppeteer = require('puppeteer');

var { fillInData } = require('./source');
var { randomWord } = require('./random-words');
var { getNextBusiness } = require('./businesses');

async function genData() {
  var employee = [ faker.name.firstName(), faker.name.lastName() ];
  var emNum = parseInt(('' + Math.random()).substring(2, 11), 10);
  var { name, email, addr, city, zip } = await getNextBusiness(randomWord);
  var d = [ name, email, emNum, addr, city, zip, ...employee ];
  return d;
}

async function step(page) {
  const client = await page.target().createCDPSession();
  await client.send('Network.clearBrowserCookies');
  await client.send('Network.clearBrowserCache');

  var url = 'https://secure.jfs.ohio.gov/covid-19-fraud/';
  await page.goto(url, { waitUntil: 'networkidle2' });

  var fillInDataArguments = await genData();
  await page.evaluate(function fillInData(EmployerName, Email,
      EmployerNumber, EmployerAddress, EmployerCity, EmployerZip,
      EmployeeFirstName, EmployeeLastName) {

    function fillAndClick(id, value) {
      var el = document.getElementById(id);
      el.value = value;
      el.click();
    }

    // setEmployerNameandEmail(); // EmployerName, Email, EmployerNumber
    fillAndClick('EmployerName', EmployerName)
    fillAndClick('Email', Email)
    fillAndClick('EmployerNumber', EmployerNumber)

    // setAddressData(); // EmployerAddress, EmployerCity, EmployerZip,
    fillAndClick('EmployerAddress', EmployerAddress)
    fillAndClick('EmployerCity', EmployerCity)
    fillAndClick('EmployerZip', EmployerZip)

    // clicks on things
    var clicks = ['ID0E1EAE', 'ID0EDJAE', 'ID0EWOAE', 'ID0E3TAE', 'ID0EVXAE'];
    clicks.map(id => document.getElementById(id).click());

    // EmployeeFirstName, EmployeeLastName
    document.querySelector('#EmployeeFirstName').value = EmployeeFirstName;
    document.querySelector('#EmployeeLastName').value = EmployeeLastName;
  }, ...fillInDataArguments);

  // CAPTCHA LOGIC HERE

  // document.documentElement scrollHeight/Width 1530, 785
  /**
    var body = document.body,
    html = document.documentElement;

    var height = Math.max( body.scrollHeight, body.offsetHeight, 
                           html.clientHeight, html.scrollHeight, html.offsetHeight );
  */

  // x: 41, y = 1530 - 186
  // page.mouse.click(41, 1530 - 186).then(console.log)
}

async function main(argv = process.argv) {
  var browser = await puppeteer.launch({
    args: ['--disable-infobars ','--disable-web-security']
    headless: false
  });

  var page = await browser.newPage();

  for (;;) {
    await step(page);
    require('repl').start().context.page = page;
    break;
  }

  // await browser.close();
}

module.exports = { main };

if (require.main === module) {
  main().then(() => {});
}
