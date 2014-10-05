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
  describe("factorize", function() {
    it("factorize a+a*b", function() {
      var term = new TermBracket().fromString("a+a*b");
      term = term.simplify();
      term = term.factorize();
      term.sortAndStringify();
      term.fullStr.should.be.eql("(a+ab)");
    });

    it("factorize a+a*b+a*c", function() {
      var term = new TermBracket().fromString("a+a*b+a*c");
      term = term.simplify();
      term = term.factorize();
      term.sortAndStringify();
      term.fullStr.should.be.eql("(1+b+c)a");
    });

    it("factorize a^2+a*b+2*b^2", function() {
      var term = new TermBracket().fromString("a^2+a*b+2*b^2");
      term = term.simplify();
      term = term.factorize();
      term.sortAndStringify();
      term.fullStr.should.be.eql("(a^2+ab+2b^2)");
    });

    it("factorize a^2+a*b+b^2", function() {
      var term = new TermBracket().fromString("a^2+a*b+b^2");
      term = term.simplify();
      term = term.factorize();
      term.sortAndStringify();
      term.fullStr.should.be.eql("((-1)ab+(a+b)^2)");
    });

    it("factorize a^2+2*a*b+b^2", function() {
      var term = new TermBracket().fromString("a^2+2*a*b+b^2");
      term = term.simplify();
      term = term.factorize();
      term.sortAndStringify();
      term.fullStr.should.be.eql("(a+b)^2");
    });
  });
}
