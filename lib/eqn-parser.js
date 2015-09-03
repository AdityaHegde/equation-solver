var
Term = require("./term/Term.js"),
TermNumber = require("./term-number/TermNumber.js"),
TermBracket = require("./term-bracket/TermBracket.js"),
TermMultiply = require("./term-multiply/TermMultiply.js"),
Parser = require("jison").Parser,

grammer = {
  lex : {
    rules : [
      ["\\s+", ""],
      ["[a-z][a-z_0-9]*",      "return 'VAR'"],
      ["[0-9]+(?:\\.[0-9]+)?", "return 'NUM'"],
      ["\\+",                  "return '+'"],
      ["-",                    "return '-'"],
      ["\\*",                  "return '*'"],
      ["\\/",                  "return '/'"],
      ["\\^",                  "return '^'"],
      ["\\(",                  "return '('"],
      ["\\)",                  "return ')'"],
      ["$",                    "return 'EOF'"],
    ],
  },

  operators : [
    ["left", "+", "-"],
    //NUM * e => e must have priority over NUM => e
    ["left", "NUM"],
    ["left", "*", "/"],
    ["left", "^"],
    ["left", "UMINUS"],
  ],

  bnf : {
    "expressions" : [["e EOF", "$1.sortAndStringify();return $1;"]],
    "e" : [
      [ "e + e",   "$$ = yy.addTerms($1, $3);" ],
      [ "e - e",   "$3.coeff = -$3.coeff; $$ = yy.addTerms($1, $3);" ],
      [ "e * e",   "$$ = yy.multiplyTerm($1, $3);" ],
      [ "e / e",   "$3.pwr = -$3.pwr; $$ = yy.multiplyTerm($1, $3);" ],
      [ "e ^ NUM", "$1.pwr *= Number($3); $$ = $1;" ],
      [ "NUM * e", "$3.coeff *= Number($1); $$ = $3;" ],
      [ "- e",     "$2.coeff = -$2.coeff; $$ = $2;", {"prec": "UMINUS"} ],
      [ "( e )",   "$$ = $2;" ],
      [ "NUM",     "$$ = new yy.TermNumber({coeff : Number(yytext)});" ],
      [ "VAR",     "$$ = new yy.Term({vari : yytext});" ],
    ],
  },
};

Term.TermNumber = TermNumber;
Term.TermBracket = TermBracket;
Term.TermMultiply = TermMultiply;

var parser = new Parser(grammer);
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
