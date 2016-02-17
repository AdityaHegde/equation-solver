var
eqn_utils = require("../utils/eqn_utils"),
Term = require("../term/Term"),
TermNumber = Term.extend({

  key : "TermNumber",
  type : 0,

  init : function(config) {
    this._super(config);
  },

  _init : function(config) {
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
