var
Class = require('class.extend'),
Term = Class.extend({

  key : "Term",
  type : 1,

  init : function(config) {
    //to add it to json object
    this.key = this.key;
    this.type = this.type;

    this.pwr = config.pwr || 1;
    this.coeff = Number(config.coeff) || 1;

    this.vari = config.vari || "";

    this.variMap = {};
    this.termStrMap = {};
    
    this._init(config);

    this.sortAndStringify();
  },

  _init : function(config) {
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

  hasTerm : require("./hasTerm"),

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

  getTermClass : function() {
    return Term;
  },

  createTermNumber : function(config) {
    return new Term.TermNumber(config);
  },

  getTermNumberClass : function() {
    return TermNumber;
  },

  createTermBracket : function(config) {
    return new Term.TermBracket(config);
  },

  getTermBracketClass : function() {
    return Term.TermBracket;
  },

  createTermMultiply : function(config) {
    return new Term.TermMultiply(config);
  },

  getTermMultiplyClass : function() {
    return Term.TermMultiply;
  },

  toString : function() {
    return this.fullStr;
  },
});

module.exports = Term;
