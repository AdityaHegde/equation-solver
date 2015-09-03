var
inheritance = require("../utils/inheritance"),
eqn_utils = require("../utils/eqn_utils"),
TermBracket = require("../term-bracket/TermBracket");

function TermMultiply(config) {
  TermMultiply.parent.call(this, config);

  this.type = 2;
}

inheritance.inherit(TermBracket, TermMultiply, {

  key : "TermMultiply",

  init : function() {
    this.coeff = this.coeff || 1;
    var terms = this.terms;
    this.terms = [];
    for(var i = 0; i < terms.length; i++) {
      this.coeff *= terms[i].coeff;
      if(terms[i].type === 2) {
        for(var j = 0; j < terms[i].terms.length; j++) {
          terms[i].terms[j].coeff = 1;
          this.terms.push(terms[i].terms[j]);
        }
      }
      else {
        terms[i].coeff = 1;
        this.terms.push(terms[i]);
      }
    }
    this.terms.sort(eqn_utils.sort_by_vari);
  },

  addTerm : require("./addTerm"),

  equalTo : require("./equalTo"),

  power : require("./power"),

  simplify : require("./simplify"),

  condense : require("./condense"),

  multiply : require("./multiply"),

  copy : require("./copy"),

  replace : require("./replace"),

  segregate : require("./segregate"),

  hasSTerm : require("./hasSTerm"),

  processForFactorization : require("./processForFactorization"),

  processForRemovalByFactorization : require("./processForRemovalByFactorization"),

  factorize : require("./factorize"),

  getVars : require("./getVars"),

  getCode : require("./getCode"),

  sortAndStringify : require("./sortAndStringify"),

});

module.exports = TermMultiply;
