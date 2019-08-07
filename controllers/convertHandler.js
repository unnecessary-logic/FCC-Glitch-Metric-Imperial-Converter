/*
*
*
*       Complete the handler logic below
*       
*       
*/
const math = require('mathjs')
function ConvertHandler() {
  
  this.getNum = function(input) {
    
    //Helper function that will help us weed out improper input.
    //Mainly aimed at / though could be used for decimals if the assigment called for it.
    function dupeFind(str, x) {
      let result = false;
      let counter = 0;
      for (let i = 0; i < str.length; i++) {
        if (str[i] === x) {
          counter++
        }
      }
      (counter > 1) ? result = true : result = false;
      return result;
    }
    
    //Regular regex; captures valid strings.
    let regex = /^\d|\d|[\/](?=\d)|[\/](?=.)|[\.](?=\d)/g
    //Number regex - captures input that do NOT start with numbers.
    let numRegex = /^[^\d]/g
    if (input.match(numRegex)) {
      result = 1;
      return result;
    }
    input = input.match(regex).join('')
    var result;
    //Only two cases here - one for dupes and the other for standard input return.
    //At this point we've massaged the data enough to be pretty confident not to make this huge.
    switch (true) {
      case (dupeFind(input, "/")):
        result = "Invalid Number"
        return result;
        break;
      default: 
        result = input;
        return result;
        break;
    }
  };
  this.getUnit = function(input) {
    let validInput = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    //Here we'll grab the values from a regex that COULD equal a valid unit.
    //If our array includes this input, we'll do stuff - if not, invalidate.
    let regex = /[a-z]/gi
    input = input.match(regex).join('');
    let result;
    if (validInput.includes(input)) {
      result = input;
    }
    else {
      result = "Invalid Unit"
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    var expect = ['l','gal','km','mi','kg','lbs', 'L', 'GAL', 'KM', 'MI', 'KG', 'LBS'];
    
    //Here we just need to slog through two arrays - some of the tests included capitals so I beefed up the arrays.
    let findMe = input.indexOf(initUnit)
    var result = expect[findMe]
    if (result === undefined) {
      result = "Invalid Unit, Try Again"
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    //Same principal as above - slog through two arrays and return the matching index.
    var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    var expect = ['gallons','liters','miles','kilometers','kilograms','pounds', 'gallons','liters','miles','kilometers','kilograms','pounds']
    let findMe = input.indexOf(unit)
    var result = expect[findMe]
    if (result === undefined) {
      result = "Invalid Unit, Try Again"
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    //If initNum is our previous error string we don't want to do any processing - we want to exit the function with a return right away.
    if (initNum === "Invalid Number") {
      return "There was a problem with your numeric input - please try again.";
    }
    //Helper function - to be used by developers only so no protection against bad input needed.
    //...for now.
    function helpMe(num, op, conv) {
      let result;
      if (num.toString().includes("/")) {
        num = math.fraction(num);
        op === "/" ? result = math.round((num / conv), 5) : result = math.round((num * conv), 5)
        return result;
      }
      else {
        op === "/" ? result = math.round((num / conv), 5) : result = math.round((num * conv), 5)
        return result;
      }
    }
    //Our helper function will make this pretty trivial.
    switch(initUnit) {
      case "gal":
        result = helpMe(initNum, "*", galToL)
        console.log(result)
        return result;
        break;
      case "L":
        result = helpMe(initNum, "/", galToL)
        return result;
        break;
      case "lbs":
        result = helpMe(initNum, "*", lbsToKg)
        return result;
        break;
      case "kg":
        result = helpMe(initNum, "/", lbsToKg)
        return result;
        break;
      case "mi":
        result = helpMe(initNum, "*", miToKm)
        return result;
        break;
      case "km":
        result = helpMe(initNum, "/", miToKm)
        return result;
        break;
      default:
        result = "Cannot convert invalid unit."
        return result;
        break;
    }
  };
  
  //Standard return string.
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result = initNum + " " + initUnit + " converts to " + returnNum + " " + returnUnit;
    console.log(result)
    return result;
  };
  
}

module.exports = ConvertHandler;
