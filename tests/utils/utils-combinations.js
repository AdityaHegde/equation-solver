var
combinations = require("../../lib/utils/combinations.js"),
test_utils = require("test_utils"),
should = require("should");

module.exports = function() {
  describe("combinations.js", function() {
    it("combinations sanity test", function() {
      var soln = combinations.selectionProblem([ [1, 2, 3], [4, 5], [6, 7, 8] ]);
      test_utils.checkArray(soln, [
        [ 1, 4, 6 ],
        [ 1, 4, 7 ],
        [ 1, 4, 8 ],
        [ 1, 5, 6 ],
        [ 1, 5, 7 ],
        [ 1, 5, 8 ],
        [ 2, 4, 6 ],
        [ 2, 4, 7 ],
        [ 2, 4, 8 ],
        [ 2, 5, 6 ],
        [ 2, 5, 7 ],
        [ 2, 5, 8 ],
        [ 3, 4, 6 ],
        [ 3, 4, 7 ],
        [ 3, 4, 8 ],
        [ 3, 5, 6 ],
        [ 3, 5, 7 ],
        [ 3, 5, 8 ],
      ]);
    });

    it("noOfCombinations", function() {
      combinations.noOfCombinations(10, 4).should.be.eql(210);
      combinations.noOfCombinations(10, 6).should.be.eql(210);
    });
  });
}
