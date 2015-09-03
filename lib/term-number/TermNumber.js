var
eqn_utils = require("../utils/eqn_utils"),
inheritance = require("../utils/inheritance"),
Term = require("../term/Term");

function TermNumber(config) {
  TermNumber.parent.call(this, config);
}

inheritance.inherit(Term, TermNumber, {

  key : "TermNumber",

  init : function() {
    this.type = 0;
    this.coeff = Math.pow(this.coeff, this.pwr);
    this.termStr = this.vari = "1";
  },

  copy : require("./copy"),

  power : require("./power"),

  multiply : require("./multiply"),

  replace : require("./replace"),

  getVars : require("./getVars"),

  getCode : require("./getCode"),

  sortAndStringify : require("./sortAndStringify"),

  processForFactorization : require("./processForFactorization"),

  processForRemovalByFactorization : require("./processForRemovalByFactorization"),
  
});

module.exports = TermNumber;
