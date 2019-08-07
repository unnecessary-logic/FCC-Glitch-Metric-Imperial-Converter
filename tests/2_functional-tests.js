/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('Routing Tests', function() {
    
    //These are pretty self explanatory.  I mulled over using global variables but decided not to as I read they're in bad practice.
    //Still, I think for standardized error messages they might make sense.
    suite('GET /api/convert => conversion object', function() {
      
      test('Convert 10L (valid input)', function(done) {
       chai.request(server)
        .get('/api/convert')
        .query({input: '10L'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'L');
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, 'GAL');
          done();
        });
      });
      
      test('Convert 32g (invalid input unit)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input: '32g'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 32);
          assert.equal(res.body.initUnit, "Invalid Unit");
          assert.equal(res.body.returnNum, "Cannot convert invalid unit.");
          assert.equal(res.body.returnUnit, "Invalid Unit, Try Again");
          done();
        });
      });
      
      test('Convert 3/7.2/4kg (invalid number)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input: '3/7.2/4kg'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, "Invalid Number");
          assert.equal(res.body.initUnit, "kg");
          assert.equal(res.body.returnNum, "There was a problem with your numeric input - please try again.");
          assert.equal(res.body.returnUnit, "lbs");
          done();
        });
      });  
      
      test('Convert 3/7.2/4kilomegagram (invalid number and unit)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input: '3/7.2/4kilomegagram'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, "Invalid Number");
          assert.equal(res.body.initUnit, "Invalid Unit");
          assert.equal(res.body.returnNum, "There was a problem with your numeric input - please try again.");
          assert.equal(res.body.returnUnit, "Invalid Unit, Try Again");
          done();
        });
      });
      
      test('Convert kg (no number)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input: 'kg'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 1);
          assert.equal(res.body.initUnit, "kg");
          assert.approximately(res.body.returnNum, 2.20462, 0.1);
          assert.equal(res.body.returnUnit, "lbs");
          done();
        });
      });
      
    });

  });

});
