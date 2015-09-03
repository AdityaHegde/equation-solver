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
  }];

  tests.forEach(function(test) {
    it("eqn " + test.eqn + ", replace " + test.replaceTerm + " with " + test.replaceWith, function() {
      var
      term = EquationSolver.EqnParser(test.eqn),
      replaceTerm = EquationSolver.EqnParser(test.replaceTerm),
      replaceWith = EquationSolver.EqnParser(test.replaceWith);
      term = term.replace(replaceTerm, replaceWith).simplify().sortAndStringify();
      term.fullStr.should.be.eql(test.fullStr);
    });
  });
});
