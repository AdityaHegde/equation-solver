var
factors = require("../../lib/utils/factors.js"),
test_utils = require("test_utils"),
should = require("should");

module.exports = function() {
  describe("factors.js", function() {
    it("prime factors of 15", function() {
      var facts = factors.getPrimeFactors(15);
      test_utils.checkArray(facts, [3, 5]);
    });

    it("prime factors of 23", function() {
      var facts = factors.getPrimeFactors(23);
      test_utils.checkArray(facts, [23]);
    });

    it("prime factors of 24", function() {
      var facts = factors.getPrimeFactors(24);
      test_utils.checkArray(facts, [2, 2, 2, 3]);
    });

    it("pairs of factors for 24", function() {
      var pairs = factors.getPairsOfFactors(24);
      test_utils.checkArray(pairs, [
        [ 1, 24 ],
        [ 3, 8 ],
        [ 2, 12 ],
        [ 6, 4 ],
        [ 4, 6 ],
        [ 12, 2 ],
        [ 8, 3 ],
        [ 24, 1 ],
      ]);
    });
  });
}
