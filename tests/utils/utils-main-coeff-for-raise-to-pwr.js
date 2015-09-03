var
eqn_utils = require("../../lib/utils/eqn_utils.js"),
should = require("should");

module.exports = function() {
  describe("coeffsForRaiseToPwr", function() {
    it("coeffsForRaiseToPwr.getCoeffs for 2 terms raised to 2", function() {
      var coeffs = eqn_utils.coeffsForRaiseToPwr.getCoeffs(2, 2);
      coeffs.should.be.eql([1, 2, 1]);
    });

    it("coeffsForRaiseToPwr.getCoeffs for 3 terms raised to 6", function() {
      var coeffs = eqn_utils.coeffsForRaiseToPwr.getCoeffs(6, 3);
      coeffs.should.be.eql([1, 6, 15, 20, 15, 6, 1, 6, 30, 60, 60, 30, 6, 15, 60, 90, 60, 15, 20, 60, 60, 20, 15, 30, 15, 6, 6, 1]);
    });

    it("coeffsForRaiseToPwr.getCoeffForAPwrSet for 2 terms raised to 2 with power set 1,1", function() {
      var coeff = eqn_utils.coeffsForRaiseToPwr.getCoeffForAPwrSet(2, [1, 1]);
      coeff.should.be.eql(2);
    });

    it("coeffsForRaiseToPwr.getCoeffForAPwrSet for 2 terms raised to 3 with power set 2,1", function() {
      var coeff = eqn_utils.coeffsForRaiseToPwr.getCoeffForAPwrSet(3, [2, 1]);
      coeff.should.be.eql(3);
    });

    it("coeffsForRaiseToPwr.getCoeffForAPwrSet for 4 terms raised to 8 with power set 1,2,3,2", function() {
      var coeff = eqn_utils.coeffsForRaiseToPwr.getCoeffForAPwrSet(8, [1, 2, 3, 2]);
      coeff.should.be.eql(1680);
    });
  });
}
