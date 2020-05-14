// submits junk data to
// https://secure.jfs.ohio.gov/covid-19-fraud/

const faker = require('faker')

const large_ohio_companies = [
  "Kroger",
  "Macy’s",
  "Watson’s",
  "P&G",
  "National Machinery",
  "Goodyear Tire and Rubber Company",
  "L Brands",
  "First Student",
  "Parker Hannifin",
  "Cardinal Health",
  "Marathon Petroleum",
  "Sherwin-Williams",
  "Cintas",
  "Mason",
  "Speedway",
  "Flynn Restaurant Group LP",
  "Progressive",
  "The Midland Company",
  "Nationwide Mutual Insurance",
  "Dana",
  "Schottenstein Stores",
  "Gilvarte",
  "American Greetings",
  "Owens-Illinois",
  "KRLP",
  "The Ohio State University",
  "University Hospitals",
  "Jo-Ann Stores",
  "Diebold Nixdorf",
  "Big Lots",
  "Abercrombie & Fitch",
  "TravelCenters of America",
  "Bath & Body Works",
  "Vertiv",
  "KeyBank",
  "Fifth Third Bank",
  "American Electric Power",
  "Owens Corning",
  "Greif",
  "Ohio",
  "Huntington Bancshares",
  "FirstEnergy",
  "ProMedica",
  "First Transit",
  "Ohio Arts Council",
  "Timken Company",
  "Safelite AutoGlass",
  "Chemed",
  "RPM International",
  "Mettler-Toledo International",
  "DSW",
  "Wendy’s",
  "Worthington Industries",
  "Givaudan",
  "Cincinnati Children’s Hospital Medical Center",
  "Crown Equipment",
  "TriHealth",
  "HCR ManorCare",
  "Cooper Tire & Rubber Company",
  "Belcan",
  "Teradata",
  "Bravo Brio Restaurant Group",
  "R+L Carriers",
  "Lincoln Electric",
  "White Castle Management Co.",
  "University of Cincinnati",
  "Davey Tree Expert Company",
  "NACCO Industries",
  "AK Steel Holding",
  "Sunglass Hut",
  "Ohio University",
  "Faurecia Exhaust Systems",
  "Kent State University",
  "Covelli Enterprises",
  "Transportation Unlimited",
  "Tween Brands",
  "The MetroHealth System",
  "Case Western Reserve University",
  "STERIS",
  "Mentor",
  "American Financial Group",
  "Summa Health",
  "The J.M. Smucker Company",
  "Columbus Fire-Executive Ofcr",
  "Marc’s",
  "Commercial Vehicle Group",
  "Area Temps",
  "Frisch’s Big Boy",
  "Comfort Keepers",
  "OM Group",
  "Applied Industrial Technologies",
  "Battelle",
  "Hyster-Yale Materials Handling",
  "PolyOne",
  "Ohio.gov",
  "Libbey",
  "Pepperl+Fuchs",
  "Miami Valley Hospital",
  "Reynolds and Reynolds",
  "Nordson",
  "Park-Ohio Holdings"
];

function integerBetween(min, max) {
  return Math.floor(
  Math.random() * (max - min + 1) + min
  )
}

const employerEmailDomains = [ "yahoo", "gmail", "hotmal"]

function getRandSeperator() {
  const val = integerBetween(1,4)
  switch (val) {
    case 1:
      return '.'
    case 3:
      return '_'
    case 4:
      return ''
  }
}

function companyNametoFakeEmail(name, personName) {
  var rand = integerBetween(1,3)
  var suffix = rand % 3 ? name.replace(/[^\w]+/g, '').toLowerCase() + ".com" : employerEmailDomains[~~(Math.random() * employerEmailDomains.length)] + ".com";
  return personName[0] + getRandSeperator() + personName[1] + "@" + suffix;
}

function GetFakeEmployerIdNumber() {
  return parseInt(("" + Math.random()).substring(2, 11), 10);
}

function fillInData(EmployerName, Email, EmployerNumber, EmployerAddress,
    EmployerCity, EmployerZip, EmployeeFirstName, EmployeeLastName) {

  function fillAndClick(id, value) { var el = document.getElementById(id); el.value = value; el.click(); }

  // EmployerName, Email, EmployerNumber
  // setEmployerNameandEmail();
  fillAndClick('EmployerName', EmployerName)
  fillAndClick('Email', Email)
  fillAndClick('EmployerNumber', EmployerNumber)


  // EmployerAddress, EmployerCity, EmployerZip,
  // setAddressData();
  fillAndClick('EmployerAddress', EmployerAddress)
  fillAndClick('EmployerCity', EmployerCity)
  fillAndClick('EmployerZip', EmployerZip)

  // clicks on things
  fillMiscData();

  // EmployeeFirstName, EmployeeLastName
  // fillEmployeeName();
}

function setEmployerNameandEmail(name) {
  var employerName = large_ohio_companies[~~(Math.random() * large_ohio_companies.length)];

  var employerNameField = document.querySelector("#EmployerName");
  employerNameField.value = employerName;
  employerNameField.click();

  var employerEmailField = document.querySelector("#Email");
  employerEmailField.value = companyNametoFakeEmail(employerName, name);
  employerEmailField.click();

  var employerNumberField = document.querySelector("#EmployerNumber");
  employerNumberField.value = GetFakeEmployerIdNumber();
  employerNumberField.click();
}

// each array is address, city, zip
const addressData = [["90 Blackburn Road","Jefferson","44047"],["7682 Lilypad Rd.","Cincinnati","45238"],["64 E. Marshall Drive","Dayton","45400"],["554 Fortune Drive Blue","Creek","45616"],["91 Petal St.","Gallipolis","45631"],["54 Foxrun Lane","Luckey","43443"],["39 North Azure Rd. West","Manchester","45382"],["44 SE. Pinnacle St.","Creston","44217"],["9377 SE. Creekside Drive","Groveport","43125"],["7798 Cemetery St.","Okolona","43550"],["7329 Church St.","Middlefield","44062"],["731 Grotto Road Green","Springs","44836"],["493 Griffin St.","Euclid","44132"],["184 Randall Mill Court","Shreve","44676"],["732 Gartner Rd.","Lockbourne","43137"],["7270 Riverview Ave.","Lima","45804"],["75 Shirley Ave.","Shade","45776"],["75 Cherry Hill Drive","Pedro","45659"],["821 South Goldfield Drive","Mantua","44255"],["2 E. Elizabeth Drive Port","Jefferson","45360"],["319 Church Rd.","Winona","44493"],["7839 North Palm Rd.","Waynesfield","45896"],["316 Brewer Ave.","Centerburg","43011"],["8960 Sugar Street","Dayton","45463"],["169 Edgemont Street Canal","Winchester","43110"],["576 Manor St.","Canton","44711"],["896 Cliff Court East","Liverpool","43920"],["7015 Lilypad St.","Lowell","45744"],["8439 Iroquois Circle","Stoutsville","43154"],["823 Polygon Street","Millersburg","44654"],["8102 S. Globe St.","Eastlake","44095"],["8486 John Ave.","Garrettsville","44231"],["9634 S. Wharf St.","Peninsula","44264"],["65 Broad Street","Wilberforce","45384"],["896 S. Old York Avenue","Toledo","43611"],["9661 High Ridge Street","Ottoville","45876"],["718 Schoolhouse St.","Utica","43080"],["13 El Dorado Avenue","Mantua","44255"],["54 Fair Ave.","Barnesville","43713"],["39 Prince Court","Lynchburg","45142"],["300 Gold St.","Toledo","43652"],["8 Duchess Ave.","Cleveland","44127"],["8994 Nicolls Court Newton","Falls","44444"],["352 Terrace Lane","Newport","45768"],["947 Winchester St.","Cleveland","44192"],["8076 Polygon Rd.","Cincinnati","45211"],["948 Silver Ave. New","Bavaria","43548"],["9932 Bloomfield St.","Sandusky","44870"],["615 Front St.","Cincinnati","45224"],["369 York St.","Rosewood","43070"],["141 Green Road","Tippecanoe","44699"],["33 Stone Lane","Elkton","44415"],["28 Beechwood St.","Cincinnati","45280"],["7291 Hilldale St.","Massillon","44648"],["895 Parker Rd. Mount","Cory","45868"],["9 Bay Road New","London","44851"],["291 Snake Hill Street","Lakeview","43331"],["28 Middle Ave.","Glencoe","43928"],["75 Atlantic Lane","Ontario","44862"],["8250 Linden Street","Cleveland","44111"],["398 Vernon St. West","Union","45693"],["8012 Mayfair Ave.","Sarahsville","43779"],["9763 N. William Lane","Columbus","43220"]];

function setAddressData() {
  var data = addressData[~~(Math.random() * addressData.length)];

  var addressField = document.querySelector("#EmployerAddress");
  addressField.value = data[0];
  addressField.click();               // make the page validate it

  var cityField = document.querySelector("#EmployerCity");
  cityField.value = data[1];
  cityField.click();

  var zipField = document.querySelector("#EmployerZip");
  zipField.value = data[2];
  zipField.click();

  // sets the "Employer State" field to OH
  document.querySelector("#EmployerState").selectedIndex = 44;

  const numberOfCounties = 89;
  document.querySelector("#EmployerCounty").selectedIndex = integerBetween(0, numberOfCounties);
}


function fillMiscData() {
  // set "essential during covid-19" to no
  document.querySelector("#ID0E1EAE").click();
  // set "did your employee quit" to "No"
  document.querySelector("#ID0EDJAE").click();
  // set "Did your employee refuse to return to work?" to "No"
  document.querySelector("#ID0EWOAE").click();
  // set "work the same as pre-covid" to yes
  document.querySelector("#ID0E3TAE").click();
  // yes we abide by the safety standards lol
  document.querySelector("#ID0EVXAE").click();
}

function fillEmployeeName(){
  var names = faker.name.findName().split(' ')
  console.log(names)
  document.querySelector("#EmployeeFirstName").value = names[0];
  document.querySelector("#EmployeeLastName").value = names[1];
  return [names[0], names[1]]
}

function fillPage() {

  setAddressData();
  fillMiscData();
  const names = fillEmployeeName();
  setEmployerNameandEmail(names);
}


const captchas = {

  "Pick the highest number, then subtract one: forty, 1, 43, 7, five." : "42",

  "I have five apples and two oranges. Do I have more oranges than apples?" : "no",

  "Zombie, Vampire, Ghost, Werewolf, Ogre. The word that ends in \"T\" is?" : "Ghost",

   "Of these, how many are made of water: stream, mountain, plain, river, sea, canyon, lake." : "4",

   "Morning, breakfast, noon, afternoon, evening, supper, bedtime: only one of these is a specific time on a clock - which one?" : "noon",

   "In this list, which one would fit in your pocket: horse, airplane, skyscraper, coin, house?" : "coin",

   "From this list, choose the date latest in the year, and type the name of the month: December 25, March 1st, Jan. 3rd, Oct-31." : "December",

   "Cat, batch, sat, hatch, pat, match: the one that starts with the varter \"h\" is?" : "hatch",

   "Battery, fan, shoe, apple, marker: to write something, which would you most likely use?" : "marker",

   "If 9 apples are split into three equal piles, the apples in each pile are how many?" : "3",

   "Jack and Jill ran up the hill, and found Spot. What word in that sentence is immediately before the comma?": "hill"
}

function answerCaptcha(callback) {
  const questionElem = document.querySelector("#qaCaptchaQ");
  const questionText = questionElem.innerText;

  if(questionText in captchas) {
    var answerBox = document.querySelector("#qaCaptchaA");
    answerBox.value = captchas[questionText];
    callback();
  }
  else {
    // ask for a different question and try again until we know the answer
    var switchQuestionElement = document.querySelector("#qaCaptchaNewQImg");
    switchQuestionElement.click();

    const questionSwitchMillisecondDelay = 2000;
    setTimeout(answerCaptcha, questionSwitchMillisecondDelay, callback);
  }
}

// RUN THIS FUNCTION TO SUBMIT A RANDOM SELECTION OF DATA
async function fillPageAndSubmit() {
  fillPage();
  return new Promise(r => answerCaptcha(r));
}

if (typeof window !== 'undefined') {
  window.integerBetween = integerBetween;
  window.companyNametoFakeEmail = companyNametoFakeEmail;
  window.GetFakeEmployerIdNumber = GetFakeEmployerIdNumber;
  window.setEmployerNameandEmail = setEmployerNameandEmail;
  window.setAddressData = setAddressData;
  window.fillMiscData = fillMiscData;
  window.fillEmployeeName = fillEmployeeName;
  window.fillPage = fillPage;
  window.answerCaptcha = answerCaptcha;
  window.fillPageAndSubmit = fillPageAndSubmit;

  window.large_ohio_companies = large_ohio_companies;
  window.employerEmailDomains = employerEmailDomains;
  window.addressData = addressData;
  window.captchas = captchas;
} else {
  module.exports = {
    integerBetween,
    companyNametoFakeEmail,
    GetFakeEmployerIdNumber,
    fillInData,
    setEmployerNameandEmail,
    setAddressData,
    fillMiscData,
    fillEmployeeName,
    fillPage,
    answerCaptcha,
    fillPageAndSubmit,

    large_ohio_companies,
    employerEmailDomains,
    addressData,
    captchas,
  };
}
