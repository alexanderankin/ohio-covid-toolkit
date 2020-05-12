#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var colors = require('colors/safe');
var faker = require('faker');
var puppeteer = require('puppeteer-extra');

var StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

var args = process.argv.slice(2);

var RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');

var log = function (...args) {
  console.log(new Date(), ...args);
};

var error = function (...args) {
  console.error(colors.red(...args));
};

var warn = function (...args) {
  console.log(colors.yellow(...args));
};

var { fillInData } = require('./source');
var { randomWord } = require('./random-words');
var { getNextBusiness } = require('./businesses');

async function genData() {
  var employee = [faker.name.firstName(), faker.name.lastName()];
  var emNum = parseInt(('' + Math.random()).substring(2, 11), 10);
  var { name, email, addr, city, zip } = await getNextBusiness(randomWord);
  var d = [name, email, emNum, addr, city, zip, ...employee];
  return d;
}

async function step(page, stepNumber) {
  const client = await page.target().createCDPSession();
  await client.send('Network.clearBrowserCookies');
  await client.send('Network.clearBrowserCache');
  log('cleared cookies');

  var url = 'https://secure.jfs.ohio.gov/covid-19-fraud/';
  await page.goto(url, { waitUntil: 'networkidle2' });

  var fillInDataArguments = await genData();
  log('genData:', fillInDataArguments);

  await page.evaluate(function fillInData(
    EmployerName,
    Email,
    EmployerNumber,
    EmployerAddress,
    EmployerCity,
    EmployerZip,
    EmployeeFirstName,
    EmployeeLastName
  ) {
    function fillAndClick(id, value) {
      var el = document.getElementById(id);
      el.value = value;
      el.click();
    }

    // setEmployerNameandEmail(); // EmployerName, Email, EmployerNumber
    fillAndClick('EmployerName', EmployerName);
    fillAndClick('Email', Email);
    fillAndClick('EmployerNumber', EmployerNumber);

    // setAddressData(); // EmployerAddress, EmployerCity, EmployerZip,
    fillAndClick('EmployerAddress', EmployerAddress);
    fillAndClick('EmployerCity', EmployerCity);
    fillAndClick('EmployerZip', EmployerZip);
    document.querySelector('#EmployerState').selectedIndex = 44;

    var integerBetween = (min, max) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    var numberOfCounties = 89;
    document.querySelector('#EmployerCounty').selectedIndex = integerBetween(
      0,
      numberOfCounties
    );

    // clicks on things
    var clicks = ['ID0E1EAE', 'ID0EDJAE', 'ID0EWOAE', 'ID0E3TAE', 'ID0EVXAE'];
    clicks.map((id) => document.getElementById(id).click());

    // EmployeeFirstName, EmployeeLastName
    document.querySelector('#EmployeeFirstName').value = EmployeeFirstName;
    document.querySelector('#EmployeeLastName').value = EmployeeLastName;
  },
  ...fillInDataArguments);
  log('solving');
  console.time('solved');

  var recaptcha = await page.solveRecaptchas();

  if (recaptcha.error) {
    const unsolvableError = Boolean(recaptcha.error.error.match('ERROR_CAPTCHA_UNSOLVABLE'))
    if (unsolvableError) {
      warn(recaptcha.error.error)
      return
    }
    else {
      throw Error(recaptcha.error.error);
    }
  }
  console.timeEnd('solved');

  await page.evaluate(() => {
    document.querySelector('input[value="Send Message"]').click();
  });

  log('Sent: Helped someone (' + stepNumber + ') keep unemployment benefits.');
}

function quit(browser) {
  return async () => {
    if (browser) {
      await browser.close();
    }
    process.exit(1);
  };
}

async function main(argv = args) {
  try {
    var apitoken = argv[0];
    if (!apitoken) {
      throw new Error(
        'No captcha2 api token supplied\n\nUsage: ohio-covid-toolkit <api token>\n'
      );
    }
    puppeteer.use(
      RecaptchaPlugin({
        provider: {
          id: '2captcha',
          token: apitoken,
        },
        // colorize reCAPTCHAs (violet = detected, green = solved)
        visualFeedback: true,
      })
    );
    var browser = await puppeteer.launch({
      args: ['--disable-infobars ', '--disable-web-security'],
      headless: true,
    });

    process.on('SIGTERM', quit(browser));
    process.on('SIGINT', quit(browser));

    var page = await browser.newPage();

    for (var i = 1; ; i++) {
      await step(page, i);
    }
  } catch (err) {
    error(err.message);
    await quit(browser)();
  }
}

module.exports = { main };

if (require.main === module) {
  main().then(() => {});
}
