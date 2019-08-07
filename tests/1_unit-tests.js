/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '32.30L';
      assert.equal(convertHandler.getNum(input),32.30)
      done();
    });
    
    //We will evaluate fractionals as strings here.
    //It doesn't matter - we will use math.fraction to evaluate them in the math portion later.
    test('Fractional Input', function(done) {
      var input = '5/4L';
      assert.equal(convertHandler.getNum(input), '5/4')
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = '5.5/4L';
      assert.equal(convertHandler.getNum(input), '5.5/4')
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      var input ='5/4/3kg';
      assert.equal(convertHandler.getNum(input), "Invalid Number")
      done();
    });
    
    test('No Numerical Input', function(done) {
      var input = "kg";
      assert.equal(convertHandler.getNum(input), 1)
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        assert.equal(convertHandler.getUnit(ele), ele)
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      let input = "zzz"
      assert.equal(convertHandler.getUnit(input), "Invalid Unit")
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      var expect = ['l','gal','km','mi','kg','lbs', 'L', 'GAL', 'KM', 'MI', 'KG', 'LBS'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      var expect = ['gallons','liters','miles','kilometers','kilograms','pounds', 'gallons','liters','miles','kilometers','kilograms','pounds'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = ["5/4", "gal"];
      var expected = 4.7317;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [30, 'L'];
      var expected = 7.9251;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = [20, 'mi'];
      var expected = 32.1869;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Km to Mi', function(done) {
      var input = [50, 'km'];
      var expected = 31.0686;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Lbs to Kg', function(done) {
      var input = [30, 'lbs'];
      var expected = 13.6078;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [40, 'kg'];
      var expected = 88.1849;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
  });

});