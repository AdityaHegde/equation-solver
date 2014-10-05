var
TermMultiply = require("../../lib/eqn-multiply-term.js"),
TermBracket = require("../../lib/eqn-bracket-term.js"),
Term = require("../../lib/eqn-term.js"),
test_utils = require("test_utils"),
should = require("should");
Term.TermBracket = TermBracket;
Term.TermMultiply = TermMultiply;
TermBracket.TermMultiply = TermMultiply;

module.exports = function() {
  describe("simplify", function() {
    it("simplify 1+a+2*a+3", function() {
      var term = new TermBracket({terms : []}).fromString("1+a+2*a+3");
      term = term.simplify();
      test_utils.checkArray(term.terms, [
        {vari : "a", coeff : 3, pwr : 1, type : 0},
        {vari : "", coeff : 4, pwr : 1, type : 0},
      ]);
      term.sortAndStringify();
      term.fullStr.should.be.eql("(4+3a)");
    });

    it("simplify a*(b+c)", function() {
      var term = new TermBracket({terms : []}).fromString("a*(b+c)");
      term = term.simplify();
      test_utils.checkArray(term.terms, [
        {coeff : 1, pwr : 1, type : 1, terms : [
          {vari : "a", coeff : 1, pwr : 1, type : 0},
          {vari : "b", coeff : 1, pwr : 1, type : 0},
        ]},
        {coeff : 1, pwr : 1, type : 1, terms : [
          {vari : "a", coeff : 1, pwr : 1, type : 0},
          {vari : "c", coeff : 1, pwr : 1, type : 0},
        ]},
      ]);
      term.sortAndStringify();
      term.fullStr.should.be.eql("(ab+ac)");
    });

    it("simplify (a+b)*(a-b)", function() {
      var term = new TermBracket({terms : []}).fromString("(a+b)*(a-b)");
      term = term.simplify();
      test_utils.checkArray(term.terms, [
        {vari : "a", coeff : 1, pwr : 2, type : 0},
        {vari : "b", coeff : -1, pwr : 2, type : 0},
      ]);
      term.sortAndStringify();
      term.fullStr.should.be.eql("(a^2+(-1)b^2)");
    });

    it("simplify (a+b)^2+(a-b)^2", function() {
      var term = new TermBracket({terms : []}).fromString("(a+b)^2+(a-b)^2");
      term = term.simplify();
      test_utils.checkArray(term.terms, [
        {vari : "a", coeff : 1, pwr : 2, type : 0},
        {vari : "b", coeff : 1, pwr : 2, type : 0},
      ]);
      term.sortAndStringify();
      term.coeff.should.be.eql(2);
      term.fullStr.should.be.eql("2(b^2+a^2)");
    });

    it("simplify (a+b)^2-(a-b)^2", function() {
      var term = new TermBracket({terms : []}).fromString("(a+b)^2-(a-b)^2");
      term = term.simplify();
      test_utils.checkArray(term.terms, [
        {vari : "a", coeff : 1, pwr : 1, type : 0},
        {vari : "b", coeff : 1, pwr : 1, type : 0},
      ]);
      term.sortAndStringify();
      term.coeff.should.be.eql(4);
      term.fullStr.should.be.eql("4ab");
    });

    //no need to check the terms, fullStr is enough
    it("simplify a*(a+b)*(b-c) with sterm a", function() {
      var term = new TermBracket({terms : []}).fromString("a*(a+b)*(b-c)");
      term = term.simplify(new Term({vari : "a"}));
      term.sortAndStringify();
      term.fullStr.should.be.eql("((b+(-1)c)a^2+(b+(-1)c)ab)");
    });

    it("simplify (a+b)^2-(b-c)^2 with sterm a", function() {
      var term = new TermBracket({terms : []}).fromString("(a+b)^2-(b-c)^2");
      term = term.simplify(new Term({vari : "a"}));
      term.sortAndStringify();
      term.fullStr.should.be.eql("(a^2+2ab+b^2+(-1)(b+(-1)c)^2)");
    });
  });
}
