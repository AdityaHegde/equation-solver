var
eqn_utils = require("./utils/eqn_utils.js"),
inheritance = require("./utils/inheritance.js"),
Tokens = require("./eqn-tokens.js");

var operators = {
  '+' : 1,
  '-' : 1,
  '*' : 1,
  '/' : 1,
},
NUMBER_REGEX = /^[0-9]*(?:\.[0-9]+)?$/,
indexMap = {
  'x' : 0,
  'y' : 1,
  'z' : 2,
};

module.exports = {

  parse : function(tokens) {
    var t = tokens.next();
    this.vari = "";
    //if the term begins with an operator
    if(operators[t]) {
      this.op = t;
      if(this.op === "-") {
        //if operator is -, negate coeff and set operator to +
        this.coeff = -this.coeff;
        this.op = "+";
      }
      else if(this.op === "/") {
        //if operator is /, negate pwr and set operator to *
        this.coeff = 1/this.coeff;
        this.op = "*";
        if(this.pwr) this.pwr = -this.pwr;
      }
      t = tokens.next();
    }
    if(t === "(") {
      //if the next token is an open brace, put the operator and bracket back and parse TermBracket
      tokens.back(2);
      return new Term.TermBracket({terms : []}).parse(tokens);
    }
    var isNum = 0;
    if(NUMBER_REGEX.exec(t)) {
      //if the next token is a number, assign it to coeff
      this.coeff *= Number(t);
      t = tokens.next();
      isNum = 1;
    }
    if(operators[t]) {
      if(t === "+" || t === "-" || t === ")") {
        //if next token is +/-/), put back the operator and start parsing next term
        tokens.back();
        return this;
      }
      else {
        /*if(isNum === 1) {
          tokens.back();
          return this;
        }*/
        if(t === "*" || t === "/") {
          //if operator is /, negate pwr
          if(t === "/") this.pwr = -this.pwr;
          t = tokens.next();
        }
        else if(t === "^") {
          //if operator is ^, compute pwr
          t = tokens.next();
          this.coeff = Math.pow(this.coeff, Number(t));
          return this;
        }
      }
    }
    //the next token is always a vairable
    this.vari = t;
    t = tokens.next();
    if(t === "^") {
      //if next token is ^, compute pwr
      t = tokens.next();
      if(t === "-") {
        //negate the pwr if token operate is -
        this.pwr = -this.pwr;
        t = tokens.next();
      }
      this.pwr *= Number(t);
      return this;
    }
    if(t) tokens.back();
    return this;
  },

};
