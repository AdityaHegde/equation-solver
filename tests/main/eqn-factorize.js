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
    var tests = [{
    //*
      input : "a+a*b",
      output : "(a+ab)",
    }, {
      input : "a+a*b+a*c",
      output : "(1+b+c)a",
    }, {
      input : "a+a*b+a*c+c*d+c*b",
      output : "(cd+bc+(1+b+c)a)",
    //*
    }, {
      input : "a^2+a*b+2*b^2",
      output : "(a^2+ab+2b^2)",
    }, {
      input : "a^2+a*b+b^2",
      output : "((-1)ab+(a+b)^2)",
    }, {
      input : "a^2+2*a*b+b^2",
      output : "(a+b)^2",
    }, {
      input : "a^2+2*a*b+b^2+c^2+2*c*d+d^2",
      output : "((a+b)^2+(c+d)^2)",
    }, {
      input : "a^2+2*a*b+b^2+c^2+2*c*d+d^2+e^2+e*f+e*g",
      output : "((a+b)^2+(c+d)^2+(f+e+g)e)",
    }, {
      input : "a^2+2*a*b+b^2+e*c^2+2*e*c*d+e*d^2",
      output : "((a+b)^2+(c+d)^2e)",
    }, {
      input : "a^4+4*a^3*b+6*a^2*b^2+4*b^3*a+b^4",
      output : "(a+b)^4",
    }, {
    //*/
      input : "a^4+4*a^3*b+6*a^2*b^2+4*b^3*a+b^4+a^6+b^2",
      output : "((a+b)^4+(-2)a^3b+(a^3+b)^2)",
    //*/
    }];

    for(var i = 0; i < tests.length; i++) {
      (function() {
        var test = tests[i];
        it("factorize, " + test.input + "  ==>  " + test.output, function() {
          var term = new TermBracket().fromString(test.input);
          term = term.simplify();
          term = term.factorize();
          term.sortAndStringify();
          term.fullStr.should.be.eql(test.output);
        });
      })();
    }
  });
}
