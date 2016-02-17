var
eqn_utils = require("../utils/eqn_utils"),
TermBracket = require("../term-bracket/TermBracket"),

TermMultiply = TermBracket.extend({

  key : "TermMultiply",
  type : 2,

  init : function(config) {
    this._super(config);
  },

  _init : function(config) {
    this._super(config);
  },

  addTerm : require("./addTerm"),

  //equalTo : require("./equalTo"),

  power : require("./power"),

  simplify : require("./simplify"),

  condense : require("./condense"),

  multiply : require("./multiply"),

  copy : require("./copy"),

  segregate : require("./segregate"),

  processForFactorization : require("./processForFactorization"),

  processForRemovalByFactorization : require("./processForRemovalByFactorization"),

  factorize : require("./factorize"),

  getVars : require("./getVars"),

  getCode : require("./getCode"),

  sortAndStringify : require("./sortAndStringify"),

});

module.exports = TermMultiply;
