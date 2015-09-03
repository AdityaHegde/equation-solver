var
eqn_utils = require("../utils/eqn_utils"),
inheritance = require("../utils/inheritance"),
Term = require("../term/Term");

function TermBracket(config) {
  TermBracket.parent.call(this, config);
}

inheritance.inherit(Term, TermBracket, {

  key : "TermBracket",

  init : function() {
    this.type = 3;
    this.terms = this.terms || [];
  },

  equalTo : require("./equalTo"),

  addTerm : require("./addTerm"),

  power : require("./power"),

  simplify : require("./simplify"),

  condense : require("./condense"),

  multiply : require("./multiply"),

  copy : require("./copy"),

  replace : require("./replace"),

  segregate : require("./segregate"),

  hasSTerm : require("./hasSTerm"),

  processForFactorization : require("./processForFactorization"),

  factorize : require("./factorize"),

  getVars : require("./getVars"),

  getCode : require("./getCode"),

  sortAndStringify : require("./sortAndStringify"),
  
});

module.exports = TermBracket;
