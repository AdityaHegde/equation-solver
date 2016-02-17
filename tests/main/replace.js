var
EquationSolver = require("../../lib/eqn-main"),
should = require("should");

describe("replace", function() {
  var tests = [{
    eqn : "a+b",
    replaceTerm : "a",
    replaceWith : "b",
    fullStr : "2b",
  }, {
    eqn : "a^2+a^3+a^5",
    replaceTerm : "a^2",
    replaceWith : "b",
    fullStr : "(b+a*b+a*b^2)",
  }, {
    eqn : "a*(a+b)",
    replaceTerm : "a",
    replaceWith : "b",
    fullStr : "2b^2",
  }, {
    eqn : "a*(a+b)",
    replaceTerm : "a",
    replaceWith : "b+c",
    fullStr : "(2b^2+c^2+3b*c)",
  }, {
    eqn : "(a+b)*(a+c)",
    replaceTerm : "a",
    replaceWith : "b*c",
    fullStr : "(b*c+b*c^2+b^2*c+b^2*c^2)",
  }, {
    eqn : "x^2+3*x-4",
    replaceTerm : "x",
    replaceWith : "2",
    fullStr : "6",
  }, {
    eqn : "x^3+3*x^2-4",
    replaceTerm : "x^2",
    replaceWith : "2",
    fullStr : "2(1+x)",
  }, {
    eqn : "a*(b+c)+a^2*(b+c)^2",
    //to retail (b+c) as it is
    sterm : "a",
    replaceTerm : "b+c",
    replaceWith : "d",
    fullStr : "(a*d+a^2*d^2)",
  }];

  tests.forEach(function(test) {
    it("eqn " + test.eqn + ", replace " + test.replaceTerm + " with " + test.replaceWith + " = " + test.fullStr, function() {
      var
      term = EquationSolver.EqnParser(test.eqn),
      replaceTerm = EquationSolver.EqnParser(test.replaceTerm),
      replaceWith = EquationSolver.EqnParser(test.replaceWith),
      sterm = test.sterm && EquationSolver.EqnParser(test.sterm);
      term = term.replace(replaceTerm, replaceWith).simplify(sterm).sortAndStringify();
      term.fullStr.should.be.equal(test.fullStr);
    });
  });
});
