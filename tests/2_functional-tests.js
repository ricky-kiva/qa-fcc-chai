const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server) // request from server 'server'
        .get('/hello') // using get HTTP
        .end(function (err, res) { // the test goes here
          assert.equal(res.status, 200, 'Response status should be 200 (OK)');
          assert.equal(res.text, 'hello Guest', 'Response should be "hello Guest"');
          done();
        });
    });
    
    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .get('/hello?name=Kathlyn')
        .end(function (err, res) {
          assert.equal(res.status, 200, 'Response status should be 200 (OK)');
          assert.equal(res.text, 'hello Kathlyn', 'Response should be "hello Kathlyn"');
          done();
        });
    });
    
    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put('/travellers') // using put HTTP in the /travellers
        .send({ // sending what to 'put' 
          surname: "Colombo"
        })
        .end(function (err, res) { // the test goes here
          assert.equal(res.status, 200, "Response status should be 200 (OK)");
          assert.equal(res.type, "application/json", "contentType should be application/json");
          assert.equal(res.body.name, "Cristoforo", "body.name should return Cristoforo");
          assert.equal(res.body.surname, "Colombo", "body.surname should return Colombo")
          done();
        });
    });
    
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send({
          surname: "da Verrazzano"
        })
        .end(function (err, res) {
          assert.equal(res.status, 200, "Response status should be 200 (OK)");
          assert.equal(res.type, "application/json","contentType should be application/json");
          assert.equal(res.body.name, "Giovanni","body.name should return Giovanni");
          assert.equal(res.body.surname, "da Verrazzano", "body.surname should return da Verrazzano");
          done();
        })
    });
  });
});

const Browser = require('zombie'); // using zombie.js to test in headless browser
Browser.site = 'https://qa-fcc-chai.ricky-kiva.repl.co'; // setting up the site for zombie.js

suite('Functional Tests with Zombie.js', function () {
  this.timeout(5000);
  const browser = new Browser; // instaniate the browser
  suiteSetup(function (done) { // using mocha hook suiteSetup
    return browser.visit('/', done); // visit '/' when this suite opened
  })

  suite('Headless browser', function () {
    test('should have a working "site" property', function() {
      assert.isNotNull(browser.site);
    });
  });

  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      browser.fill('surname', 'Colombo').then(() => {
        browser.pressButton('submit', () => {
          browser.assert.success();
          browser.assert.text('span#name', 'Cristoforo');
          browser.assert.text('span#surname', 'Colombo');
          browser.assert.elements('span#dates', 1);
          done();
        })
      })
    });
    
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      browser.fill('surname', 'Vespucci').then(() => {
        browser.pressButton('submit', () => {
          browser.assert.success();
          browser.assert.text('span#name', 'Amerigo');
          browser.assert.text('span#surname', 'Vespucci');
          browser.assert.elements('span#dates', 1);
          done();
        })
      })
    });
  });
});
