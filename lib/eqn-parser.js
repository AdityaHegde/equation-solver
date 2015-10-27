var
Term = require("./term/Term.js"),
TermNumber = require("./term-number/TermNumber.js"),
TermBracket = require("./term-bracket/TermBracket.js"),
TermMultiply = require("./term-multiply/TermMultiply.js"),
parser = require("./eqn-parser-generated").parser;

Term.TermNumber = TermNumber;
Term.TermBracket = TermBracket;
Term.TermMultiply = TermMultiply;

parser.yy = {
  Term : Term,
  TermNumber : TermNumber,
  TermBracket : TermBracket,
  TermMultiply : TermMultiply,

  addTerms : function(termA, termB) {
    if(termA.type === 3 && termA.pwr === 1) {
      termA.addTerm(termB);
      return termA;
    }
    else if(termB.type === 3 && termB.pwr === 1){
      termB.addTerm(termA);
      return termB;
    }
    return new TermBracket({terms : [termA, termB]});
  },

  multiplyTerm : function(termA, termB) {
    if(termA.type === 2 && termA.pwr === 1) {
      termA.addTerm(termB);
      return termA;
    }
    else if(termB.type === 2 && termB.pwr === 1){
      termB.addTerm(termA);
      return termB;
    }
    return new TermMultiply({terms : [termA, termB]});
  },
};

module.exports = function(eqn) {
  return parser.parse(eqn);
};
