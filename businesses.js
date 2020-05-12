var querystring = require('querystring');
var fs = require('fs');

var axios = require('axios');
var cheerio = require('cheerio');
var faker = require('faker');
var { parseLocation } = require('parse-address'); 

var { integerBetween } = require('./source')

async function getSearchTerm(term) {
  var { data } = await axios({
    method: 'post',
    data: querystring.encode({ sterm: term, ispost: 1 }),
    url: 'https://www.ohiostart.com/search.php'
  });

  var $ = cheerio.load(data);

  // find the heading
  var arr = $('h4').map((i, el) => ({ text: $(el).text(), el })).get();
  var { el: h4 } = arr.filter(el => el.text === 'Search Results').pop();

  // get links from parent of the heading
  var relatives = $(h4).parent().find('p').map((i, e) => {
    try { return $(e).find('a').attr('href'); } catch (e) { return false; }
  }).get().filter(e => !!e);

  return relatives.map(u => 'https://www.ohiostart.com' + u);
}

async function getBusinessInfo(url) {
  var { data } = await axios.get(url);

  var $ = cheerio.load(data);

  var contents = $('address').contents().get();
  var addressParts = contents
    .map(e => $(e).text().trim())
    .filter(e => !!e);

  var [ name, addr, city, zip ] = addressParts;
  city = city.replace(/, OH$/, '');
  var email = nameToEmail(name);
  return { name, email, addr, city, zip };
}
const employerEmailDomains = [ "yahoo", "gmail", "hotmail"]

function getClassicEmailName() {
  var emails = [ "jobs", "work", "info", "management", "careers" ];
  return emails[~~(Math.random() * emails.length)];
}

function nameToEmail(name) {
  var rand = integerBetween(1,7)
  var isException = !Boolean(rand % 3)
  if (isException)
    var prefix = getClassicEmailName();
  else
    var prefix = faker.internet.userName();

  var parts = name.split(/[^\w+]/);
  var numKeep = Math.max(3, Math.ceil(parts.length * .75));
  var domain = isException ? parts.slice(0, numKeep).join('').toLowerCase() + '.com' : employerEmailDomains[~~(Math.random() * employerEmailDomains.length)] + ".com";
  return [ prefix, domain ].join('@');
}

var lastBusinessResults = [];
async function getNextBusiness(word) {
  if (!lastBusinessResults.length)
    lastBusinessResults = (await getSearchTerm(await word())).slice(0, 30);

  return await getBusinessInfo(lastBusinessResults.pop());
}

function testing() {
  getSearchTerm('service').then(async (links) => {
    console.log(links);
    for (var i = 0; i < links.length; i++) {
      console.log(await getBusinessInfo(links[i]));
    }
  });
  // getBusinessInfo(
  // 'https://www.ohiostart.com/o-neil-s-a-dayton-biz298566.htm')
  //   .then(info => {
  //   console.log(info);
  // })
}

if (require.main === module) {
  testing();
}

module.exports = {
  getSearchTerm,
  getBusinessInfo,
  getClassicEmailName,
  nameToEmail,
  getNextBusiness
};
