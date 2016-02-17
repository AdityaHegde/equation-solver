var
eqn_utils = require("../utils/eqn_utils"),
Term = require("../term/Term"),
TermBracket = Term.extend({

  key : "TermBracket",
  type : 3,

  init : function(config) {
    this._super(config);
  },

  _init : function(config) {
    this.terms = [];
    if(config.terms) {
      config.terms.forEach(function(term) {
        this.addTerm(term);
      }, this);
    }
  },

  //equalTo : require("./equalTo"),

  addTerm : require("./addTerm"),

  removeTerm : require("./removeTerm"),

  replaceTerm : require("./replaceTerm"),

  clearTerms : require("./clearTerms"),

  forEachTerm : require("./forEachTerm"),

  power : require("./power"),

  simplify : require("./simplify"),

  condense : require("./condense"),

  multiply : require("./multiply"),

  copy : require("./copy"),

  replace : require("./replace"),

  segregate : require("./segregate"),

  hasTerm : require("./hasTerm"),

  //processForFactorization : require("./processForFactorization"),

  factorize : require("./factorize"),

  getVars : require("./getVars"),

  getCode : require("./getCode"),

  sortAndStringify : require("./sortAndStringify"),

  getHCFOfTerms : require("./getHCFOfTerms"),
  
});

module.exports = TermBracket;
