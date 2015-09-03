var
EquationSolver = require("../../lib/eqn-main"),
should = require("should");

describe("simplify", function() {
  var tests = [{
    eqn : "1+a+2*a+3",
    term : {
      key : "TermBracket",
      type : 3,
      vari : "(4+3a)",
      coeff : 1,
      pwr : 1,
      terms : [{
        key: "TermNumber",
        type : 0,
        vari : "1",
        coeff : 4,
        pwr : 1,
        termStr: "1",
        fullStr: "4",
      },{
        key: "Term",
        type : 1,
        vari : "a",
        coeff : 3,
        pwr : 1,
        termStr: "a",
        fullStr: "3a",
      }],
      termStr : "(4+3a)",
      fullStr : "(4+3a)",
    },
  }, {
    eqn : "a*(b+c+2)",
    term : {
      key : "TermBracket",
      type : 3,
      vari : "(2a+a*b+a*c)",
      coeff : 1,
      pwr : 1,
      termStr : "(2a+a*b+a*c)",
      fullStr : "(2a+a*b+a*c)",
      terms : [{
        key : "Term",
        type : 1,
        vari : "a",
        coeff : 2,
        pwr : 1,
        termStr : "a",
        fullStr : "2a",
      }, {
        key: "TermMultiply",
        type : 2,
        vari : "a*b",
        coeff : 1,
        pwr : 1,
        termStr: "a*b",
        fullStr: "a*b",
        terms : [{
          key: "Term",
          type : 1,
          vari : "a",
          coeff : 1,
          pwr : 1,
          termStr: "a",
          fullStr: "a",
        },{
          key: "Term",
          type : 1,
          vari : "b",
          coeff : 1,
          pwr : 1,
          termStr: "b",
          fullStr: "b",
        }],
      }, {
        key: "TermMultiply",
        type : 2,
        vari : "a*c",
        coeff : 1,
        pwr : 1,
        termStr: "a*c",
        fullStr: "a*c",
        terms : [{
          key: "Term",
          type : 1,
          vari : "a",
          coeff : 1,
          pwr : 1,
          termStr: "a",
          fullStr: "a",
        },{
          key: "Term",
          type : 1,
          vari : "c",
          coeff : 1,
          pwr : 1,
          termStr: "c",
          fullStr: "c",
        }],
      }]
    },
  }, {
    eqn : "(a+b)*(a-b)",
    term : {
      key : "TermBracket",
      type : 3,
      vari : "(a^2-b^2)",
      coeff : 1,
      pwr : 1,
      termStr : "(a^2-b^2)",
      fullStr : "(a^2-b^2)",
      terms : [{
        key : "Term",
        type : 1,
        vari : "a",
        coeff : 1,
        pwr : 2,
        termStr : "a^2",
        fullStr : "a^2",
      }, {
        key : "Term",
        type : 1,
        vari : "b",
        coeff : -1,
        pwr : 2,
        termStr : "b^2",
        fullStr : "-b^2",
      }],
    },
  }, {
    eqn : "(a+b)^2+(a-b)^2",
    term : {
      key : "TermBracket",
      type : 3,
      vari : "(a^2+b^2)",
      coeff : 2,
      pwr : 1,
      termStr : "(a^2+b^2)",
      fullStr : "2(a^2+b^2)",
      terms : [{
        key : "Term",
        type : 1,
        vari : "a",
        coeff : 1,
        pwr : 2,
        termStr : "a^2",
        fullStr : "a^2",
      }, {
        key : "Term",
        type : 1,
        vari : "b",
        coeff : 1,
        pwr : 2,
        termStr : "b^2",
        fullStr : "b^2",
      }],
    },
  }, {
    eqn : "(a+b)^2-(a-b)^2",
    term : {
      key : "TermMultiply",
      type : 2,
      vari : "a*b",
      coeff : 4,
      pwr : 1,
      termStr : "a*b",
      fullStr : "4a*b",
      terms : [{
        key : "Term",
        type : 1,
        vari : "a",
        coeff : 1,
        pwr : 1,
        termStr : "a",
        fullStr : "a",
      }, {
        key : "Term",
        type : 1,
        vari : "b",
        coeff : 1,
        pwr : 1,
        termStr : "b",
        fullStr : "b",
      }],
    },
  }, {
    eqn : "a*(a+b)*(b-c)",
    sterm : "a",
    fullStr : "(a*b*(b-c)+a^2*(b-c))",
  }, {
    eqn : "(a+b)^2-(b-c)^2",
    sterm : "a",
    fullStr : "(a^2+b^2+2a*b-(b-c)^2)",
  }];

  tests.forEach(function(test) {
    it("simplify " + test.eqn + (test.sterm ? " with sterm " + test.sterm : ""), function() {
      var
      term = EquationSolver.EqnParser(test.eqn);
      if(test.sterm) {
        var sterm = EquationSolver.EqnParser(test.sterm);
        term = term.simplify(sterm);
      }
      else {
        term = term.simplify();
      }
      term.sortAndStringify();
      if(test.term) {
        term.should.be.eql(test.term);
      }
      else if(test.fullStr) {
        term.fullStr.should.be.eql(test.fullStr);
      }
    });
  });
});
