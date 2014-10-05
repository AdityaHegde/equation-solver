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
  describe("replace", function() {
    it("eqn a+b, replace a with b", function() {
      var term = new TermBracket().fromString("a+b");
      term = term.replace(new Term({vari : "a"}), new Term({vari : "b"}));
      term = term.simplify();
      term.sortAndStringify();
      term.fullStr.should.be.eql("2b");
    });

    it("eqn a*(a+b), replace a with b", function() {
      var term = new TermBracket().fromString("a*(a+b)");
      term = term.replace(new Term({vari : "a"}), new Term({vari : "b"}));
      term = term.simplify();
      term.sortAndStringify();
      term.fullStr.should.be.eql("2b^2");
    });

    it("eqn a*(a+b), replace a with b+c", function() {
      var term = new TermBracket().fromString("a*(a+b)");
      term = term.replace(
        new Term({vari : "a"}),
        new TermBracket({terms : [
          new Term({vari : "b"}),
          new Term({vari : "c"}),
        ]})
      );
      term = term.simplify();
      term.sortAndStringify();
      term.fullStr.should.be.eql("(2b^2+3bc+c^2)");
    });

    it("eqn (a+b)*(a+c), replace a with b*c", function() {
      var term = new TermBracket().fromString("(a+b)*(a+c)");
      term = term.replace(
        new Term({vari : "a"}),
        new TermMultiply({terms : [
          new Term({vari : "b"}),
          new Term({vari : "c"}),
        ]})
      );
      term = term.simplify();
      term.sortAndStringify();
      term.fullStr.should.be.eql("(b^2c^2+bc^2+b^2c+bc)");
    });
  });
}
