var
EquationSolver = require("../../lib/eqn-main"),
should = require("should");

describe("segregate", function() {
  var tests = [{
    eqn : "2*a*b+a",
    segregate : "a",
    fullStr : "(a*(1+2b))",
  }, {
    eqn : "a+a^2*b+a^3*c",
    segregate : "a",
    pwr : 2,
    fullStr : "(a+a^2*(b+a*c))",
  }, {
    eqn : "2*a*b+a*(b+d)+a^2*b+a^2*c",
    segregate : "a",
    fullStr : "(a*(3b+d)+a^2*(b+c))",
  }, {
    eqn : "a+b*(a+b)+c*(a+b)",
    segregate : "a+b",
    fullStr : "(a+(a+b)*(b+c))",
  }, {
    eqn : "a+b*(a+b)+c*(a+b)^2",
    segregate : "a+b",
    pwr : 1,
    fullStr : "(a+(a+b)*(b+c*(a+b)))",
  }];

  tests.forEach(function(test) {
    it("eqn " + test.eqn + ", segregate " + test.segregate + (test.pwr ? " with power " + test.pwr : "") + " = " + test.fullStr, function() {
      var
      term = EquationSolver.EqnParser(test.eqn),
      segregate = EquationSolver.EqnParser(test.segregate);
      term = term.segregate(segregate, test.pwr);
      term = term[1].sortAndStringify();
      term.fullStr.should.be.eql(test.fullStr);
    });
  });
});
