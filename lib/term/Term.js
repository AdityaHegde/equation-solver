var
inheritance = require("../utils/inheritance.js");

function Term(config) {
  Term.parent.call(this, config);
  this.type = 1;
  //to add it to json object
  this.key = this.key;

  this.pwr = this.pwr || 1;
  this.coeff = this.coeff || 1;
  
  this.init();

  this.sortAndStringify();
}

inheritance.inherit(inheritance.Base, Term, {

  key : "Term",

  init : function() {
    this.vari = this.vari || "";
    this.coeff = Number(this.coeff) || 1;
  },

  equalTo : require("./equalTo"),

  add : require("./add"),

  power : require("./power"),

  simplify : require("./simplify"),

  condense : require("./condense"),

  multiply : require("./multiply"),

  copy : require("./copy"),

  replace : require("./replace"),

  segregate : require("./segregate"),

  hasSTerm : require("./hasSTerm"),

  //for a^2bc, expand (a+b+c)^4
  //give a better function name
  _generateTermsForPower : require("./_generateTermsForPower"),

  //for a^4b^2c :  (a^2)^2(b)^2c, (a^2)^2b^2c, a^4b^2c, etc
  _generatePossibleTermAndPowerPairs : require("./_generatePossibleTermAndPowerPairs"),

  _type1_add_tkey : require("./_type1_add_tkey"),

  _type1_add_tkey_to_bt : require("./_type1_add_tkey_to_bt"),

  processForFactorization : require("./processForFactorization"),

  _type1_remove_tkey : require("./_type1_remove_tkey"),

  processForRemovalByFactorization : require("./processForRemovalByFactorization"),

  factorize : require("./factorize"),

  getVars : require("./getVars"),

  getCode : require("./getCode"),

  getCoeffStr : require("./getCoeffStr"),
  sortAndStringify : require("./sortAndStringify"),

  createTerm : function(config) {
    return new Term(config);
  },

  createTermNumber : function(config) {
    return new Term.TermNumber(config);
  },

  createTermBracket : function(config) {
    return new Term.TermBracket(config);
  },

  createTermMultiply : function(config) {
    return new Term.TermMultiply(config);
  },
});

module.exports = Term;
