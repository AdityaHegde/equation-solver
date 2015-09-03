var
EquationSolver = require("../../lib/eqn-main"),
should = require("should");

describe("segregate", function() {
  var tests = [{
    eqn : "2*a*b+a",
    segregate : "a",
    fullStr : "(a*(1+2b))",
  }, {
    eqn : "2*a*b+a*(b+d)",
    segregate : "a",
    fullStr : "(a*(3b+d))",
  }, {
    eqn : "(a+b)*(b+c)+a^2+2*a*d",
    segregate : "a",
    fullStr : "(a^2+b^2+b*c+a*(b+c+2d))",
  }];

  tests.forEach(function(test) {
    it("eqn " + test.eqn + ", segregate " + test.segregate, function() {
      var
      term = EquationSolver.EqnParser(test.eqn),
      segregate = EquationSolver.EqnParser(test.segregate);
      term = term.simplify().segregate(segregate);
      term = term[1].sortAndStringify();
      term.fullStr.should.be.eql(test.fullStr);
    });
  });
});
