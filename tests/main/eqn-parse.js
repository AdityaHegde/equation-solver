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
  describe("parse", function() {
    it("parse 2*a^3", function() {
      var term = new Term().fromString("2*a^3");
      term.vari.should.be.eql("a");
      term.coeff.should.be.eql(2);
      term.pwr.should.be.eql(3);
      term.type.should.be.eql(0);
    });

    it("parse 3*a^2*b^3", function() {
      var term = new TermMultiply({terms : []}).fromString("3*a^2*b^3");
      test_utils.checkArray(term.terms, [
        {vari : "a", coeff : 1, pwr : 2, type : 0},
        {vari : "b", coeff : 1, pwr : 3, type : 0},
      ]);
      term.coeff.should.be.eql(3);
      term.type.should.be.eql(1);
    });

    it("parse 2*a+4*b-c^2", function() {
      var term = new TermBracket({terms : []}).fromString("2*a+4*b-c^2");
      test_utils.checkArray(term.terms, [
        {vari : "a", coeff : 2, pwr : 1, type : 0},
        {vari : "b", coeff : 4, pwr : 1, type : 0},
        {vari : "c", coeff : -1, pwr : 2, type : 0},
      ]);
      term.type.should.be.eql(2);
    });

    it("parse 2*a+4*b*c-c^2*(a+b)", function() {
      var term = new TermBracket({terms : []}).fromString("2*a+4*b*c-c^2*(a+b)");
      test_utils.checkArray(term.terms, [
        {vari : "a", coeff : 2, pwr : 1, type : 0},
        {coeff : 4, pwr : 1, type : 1, terms : [
          {vari : "b", coeff : 1, pwr : 1},
          {vari : "c", coeff : 1, pwr : 1},
        ]},
        {coeff : -1, pwr : 1, type : 1, terms : [
          {vari : "c", coeff : 1, pwr : 2, type : 0},
          {coeff : 1, pwr : 1, type : 2, terms : [
            {vari : "a", coeff : 1, pwr : 1, type : 0},
            {vari : "b", coeff : 1, pwr : 1, type : 0},
          ]},
        ]},
      ]);
      term.type.should.be.eql(2);
    });

    it("parse (2*a*b+c)^2-(d-e)^3", function() {
      var term = new TermBracket({terms : []}).fromString("(2*a*b+c)^2-(d-e)^3");
      test_utils.checkArray(term.terms, [
        {coeff : 1, pwr : 2, type : 2, terms : [
          {coeff : 2, pwr : 1, type : 1, terms : [
            {vari : "a", coeff : 1, pwr : 1, type : 0},
            {vari : "b", coeff : 1, pwr : 1, type : 0},
          ]},
          {vari : "c", coeff : 1, pwr : 1, type : 0},
        ]},
        {coeff : -1, pwr : 3, type : 2, terms : [
          {vari : "d", coeff : 1, pwr : 1, type : 0},
          {vari : "e", coeff : -1, pwr : 1, type : 0},
        ]},
      ]);
    });

    it("parse (a+b)^2", function() {
      var term = new TermBracket({terms : []}).fromString("(a+b)^2");
      term = term.terms[0];
      test_utils.checkArray(term.terms, [
        {vari : "a", coeff : 1, pwr : 1, type : 0},
        {vari : "b", coeff : 1, pwr : 1, type : 0},
      ]);
      term.type.should.be.eql(2);
      term.pwr.should.be.eql(2);
    });
  });
}
