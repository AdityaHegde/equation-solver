var
EquationSolver = require("../../lib/eqn-main"),
should = require("should");

describe("factorize", function() {
  var tests = [{
    input : "a+a*b",
    output : "(a+a*b)",
  }, {
    input : "a+a*b+a*c",
    output : "a*(1+b+c)",
  }, {
    input : "a+a*b+a*c+c*d+c*b",
    output : "(b*c+c*d+a*(1+b+c))",
  }, {
    input : "a^2+a*b+2*b^2",
    output : "(a^2+2b^2+a*b)",
  }, {
    input : "a^2+a*b+b^2",
    output : "(-a*b+(a+b)^2)",
  }, {
    input : "a^2+2*a*b+b^2",
    output : "(a+b)^2",
  }, {
    input : "a^2+2*a*b+b^2+c^2+2*c*d+d^2",
    output : "((a+b)^2+(c+d)^2)",
  }, {
    input : "a^2+2*a*b+b^2+c^2+2*c*d+d^2+e^2+e*f+e*g",
    output : "((a+b)^2+(c+d)^2+e*(e+f+g))",
  }, {
    input : "a^2+2*a*b+b^2+e*c^2+2*e*c*d+e*d^2",
    output : "((a+b)^2+e*(c+d)^2)",
  }, {
    input : "a^4+4*a^3*b+6*a^2*b^2+4*b^3*a+b^4",
    output : "(a+b)^4",
  }, {
    input : "a^4+5*a^3*b+6*a^2*b^2+4*b^3*a+b^4+a^6+b^2",
    output : "((a+b)^4-a^3*b+(a^3+b)^2)",
  }, {
    input : "a*(c+d)+b*(c+d)",
    output : "(a+b)*(c+d)",
  }, {
    input : "a*(d+e)+b*(d+e)+c*(d+e)",
    output : "(d+e)*(a+b+c)",
  }, {
    input : "a*(d+e)^2+b*(d+e)^3+c*(d+e)^4+f",
    output : "(f+(d+e)^2*(a+(d+e)*(b+c*(d+e))))",
  /*}, {
    input : "a^2+2*a+1",
    output : "(a+b)^2",
  */
  }];

  tests.forEach(function(test) {
    it("factorize, " + test.input + "  ==>  " + test.output, function() {
      var term = EquationSolver.EqnParser(test.input);
      term = term.factorize().sortAndStringify();
      term.fullStr.should.be.eql(test.output);
    });
  });
});
