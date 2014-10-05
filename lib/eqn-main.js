var
eqn_utils = require("./utils/eqn_utils.js"),
Term = require("./eqn-term.js"),
TermBracket = require("./eqn-bracket-term.js"),
TermMultiply = require("./eqn-multiply-term.js"),
EqnGen = require("./eqn-gen.js");
Term.TermBracket = TermBracket;
Term.TermMultiply = TermMultiply;
TermBracket.TermMultiply = TermMultiply;

module.exports = {
  EqnGen : EqnGen,
  Term : Term,
  TermBracket : TermBracket,
  TermMultiply : TermMultiply,
  utils : eqn_utils,
};
