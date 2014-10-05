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
  describe("segregate", function() {
    it("eqn 2*a*b+a, segregate a", function() {
      var term = new TermBracket().fromString("2*a*b+a");
      term = term.simplify();
      term = term.segregate(new Term({vari : "a"}));
      term = term[1];
      term.sortAndStringify();
      term.fullStr.should.be.eql("((2b+1)a)");
    });

    it("eqn 2*a*b+a*(b+d), segregate a", function() {
      var term = new TermBracket().fromString("2*a*b+a*(b+d)");
      term = term.simplify();
      term = term.segregate(new Term({vari : "a"}));
      term = term[1];
      term.sortAndStringify();
      term.fullStr.should.be.eql("((3b+d)a)");
    });

    it("eqn (a+b)*(b+c)+a^2+2*a*d, simplify and segregate a", function() {
      var term = new TermBracket().fromString("(a+b)*(b+c)+a^2+2*a*d");
      term = term.simplify();
      term = term.segregate(new Term({vari : "a"}));
      term = term[1];
      term.sortAndStringify();
      term.fullStr.should.be.eql("(b^2+bc+(b+c+2d)a+a^2)");
    });
  });
}
