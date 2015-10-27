var
EquationSolver = require("../../lib/eqn-main"),
should = require("should");

describe("parse", function() {
  var tests = [{
    eqn : "2*a^3",
    term : {
      key : "Term",
      type : 1,
      vari : "a",
      pwr : 3,
      coeff : 2,
      termStr : "a^3",
      fullStr : "2a^3",
    },
  }, {
    eqn : "3*a^2*b^3",
    term : {
      key : "TermMultiply",
      type : 2,
      vari : "a^2*b^3",
      coeff : 3,
      pwr : 1,
      termStr : "a^2*b^3",
      fullStr : "3a^2*b^3",
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
        pwr : 3,
        termStr : "b^3",
        fullStr : "b^3",
      }],
    },
  }, {
    eqn : "2*a+4*b-c^2-6",
    term : {
      key : "TermBracket",
      type : 3,
      vari : "(-6+2a+4b-c^2)",
      coeff : 1,
      pwr : 1,
      termStr : "(-6+2a+4b-c^2)",
      fullStr : "(-6+2a+4b-c^2)",
      terms : [{
        key : "TermNumber",
        type : 0,
        vari : "1",
        coeff : -6,
        pwr : 1,
        termStr : "1",
        fullStr : "-6",
      }, {
        key : "Term",
        type : 1,
        vari : "a",
        coeff : 2,
        pwr : 1,
        termStr : "a",
        fullStr : "2a",
      }, {
        key : "Term",
        type : 1,
        vari : "b",
        coeff : 4,
        pwr : 1,
        termStr : "b",
        fullStr : "4b",
      }, {
        key : "Term",
        type : 1,
        vari : "c",
        coeff : -1,
        pwr : 2,
        termStr : "c^2",
        fullStr : "-c^2",
      }],
    },
  }, {
    eqn : "2*a+4*b*c-c^2*(a+b)",
    term : {
      key : "TermBracket",
      type : 3,
      vari : "(2a+4b*c-c^2*(a+b))",
      coeff : 1,
      pwr : 1,
      termStr : "(2a+4b*c-c^2*(a+b))",
      fullStr : "(2a+4b*c-c^2*(a+b))",
      terms : [{
        key : "Term",
        type : 1,
        vari : "a",
        coeff : 2,
        pwr : 1,
        termStr : "a",
        fullStr : "2a",
      }, {
        key : "TermMultiply",
        type : 2,
        vari : "b*c",
        coeff : 4,
        pwr : 1,
        termStr : "b*c",
        fullStr : "4b*c",
        terms : [{
          key : "Term",
          type : 1,
          vari : "b",
          coeff : 1,
          pwr : 1,
          termStr : "b",
          fullStr : "b",
        }, {
          key : "Term",
          type : 1,
          vari : "c",
          coeff : 1,
          pwr : 1,
          termStr : "c",
          fullStr : "c",
        }],
      }, {
        key : "TermMultiply",
        type : 2,
        vari : "c^2*(a+b)",
        coeff : -1,
        pwr : 1,
        termStr : "c^2*(a+b)",
        fullStr : "-c^2*(a+b)",
        terms : [{
          key : "Term",
          type : 1,
          vari : "c",
          coeff : 1,
          pwr : 2,
          termStr : "c^2",
          fullStr : "c^2",
        }, {
          key : "TermBracket",
          type : 3,
          vari : "(a+b)",
          coeff : 1,
          pwr : 1,
          termStr : "(a+b)",
          fullStr : "(a+b)",
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
        }],
      }],
    },
  }, {
    eqn : "(-(d-e)^3+(c+2*a*b)^2)",
    term : {
      key : "TermBracket",
      type : 3,
      vari : "(-(d-e)^3+(c+2a*b)^2)",
      coeff : 1,
      pwr : 1,
      termStr : "(-(d-e)^3+(c+2a*b)^2)",
      fullStr : "(-(d-e)^3+(c+2a*b)^2)",
      terms : [{
        key : "TermBracket",
        type : 3,
        vari : "(d-e)",
        coeff : -1,
        pwr : 3,
        termStr : "(d-e)^3",
        fullStr : "-(d-e)^3",
        terms : [{
          key : "Term",
          type : 1,
          vari : "d",
          coeff : 1,
          pwr : 1,
          termStr : "d",
          fullStr : "d",
        }, {
          key : "Term",
          type : 1,
          vari : "e",
          coeff : -1,
          pwr : 1,
          termStr : "e",
          fullStr : "-e",
        }],
      }, {
        key : "TermBracket",
        type : 3,
        vari : "(c+2a*b)",
        coeff : 1,
        pwr : 2,
        termStr : "(c+2a*b)^2",
        fullStr : "(c+2a*b)^2",
        terms : [{
          key : "Term",
          type : 1,
          vari : "c",
          coeff : 1,
          pwr : 1,
          termStr : "c",
          fullStr : "c",
        }, {
          key : "TermMultiply",
          type : 2,
          vari : "a*b",
          coeff : 2,
          pwr : 1,
          termStr : "a*b",
          fullStr : "2a*b",
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
        }],
      }],
    },
  }, {
    eqn : "(a+b)^2",
    term : {
      key : "TermBracket",
      type : 3,
      vari : "(a+b)",
      coeff : 1,
      pwr : 2,
      termStr : "(a+b)^2",
      fullStr : "(a+b)^2",
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
    eqn : "-2*(a-b)^2",
    term : {
      key : "TermBracket",
      type : 3,
      vari : "(a-b)",
      coeff : -2,
      pwr : 2,
      termStr : "(a-b)^2",
      fullStr : "-2(a-b)^2",
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
        coeff : -1,
        pwr : 1,
        termStr : "b",
        fullStr : "-b",
      }],
    },
  }, {
    eqn : "(a+b)/(a-b)+c",
    term : {
      key : "TermBracket",
      type : 3,
      vari : "(c+(a+b)*(a-b)^-1)",
      coeff : 1,
      pwr : 1,
      termStr : "(c+(a+b)*(a-b)^-1)",
      fullStr : "(c+(a+b)*(a-b)^-1)",
      terms : [{
        key : "Term",
        type : 1,
        vari : "c",
        coeff : 1,
        pwr : 1,
        termStr : "c",
        fullStr : "c",
      }, {
        key : "TermMultiply",
        type : 2,
        vari : "(a+b)*(a-b)^-1",
        coeff : 1,
        pwr : 1,
        termStr : "(a+b)*(a-b)^-1",
        fullStr : "(a+b)*(a-b)^-1",
        terms : [{
          key : "TermBracket",
          type : 3,
          vari : "(a+b)",
          coeff : 1,
          pwr : 1,
          termStr : "(a+b)",
          fullStr : "(a+b)",
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
        }, {
          key : "TermBracket",
          type : 3,
          vari : "(a-b)",
          coeff : 1,
          pwr : -1,
          termStr : "(a-b)^-1",
          fullStr : "(a-b)^-1",
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
            coeff : -1,
            pwr : 1,
            termStr : "b",
            fullStr : "-b",
          }],
        }],
      }],
    },
  }, {
    eqn : "((a+b)/c)^2",
    term : {
      key : "TermMultiply",
      type : 2,
      vari : "c^-1*(a+b)",
      coeff : 1,
      pwr : 2,
      termStr : "(c^-1*(a+b))^2",
      fullStr : "(c^-1*(a+b))^2",
      terms : [{
        key : "Term",
        type : 1,
        vari : "c",
        coeff : 1,
        pwr : -1,
        termStr : "c^-1",
        fullStr : "c^-1",
      }, {
        key : "TermBracket",
        type : 3,
        vari : "(a+b)",
        coeff : 1,
        pwr : 1,
        termStr : "(a+b)",
        fullStr : "(a+b)",
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
      }],
    },
  }];

  tests.forEach(function(test) {
    it("parse " + test.eqn, function() {
      var term = EquationSolver.EqnParser(test.eqn);
      term.should.be.eql(test.term);
    });
  });
});
