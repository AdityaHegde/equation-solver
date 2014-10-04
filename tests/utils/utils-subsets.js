var
subsets = require("../../lib/utils/subsets.js"),
test_utils = require("test_utils"),
should = require("should");

module.exports = function() {
  describe("subsets.js", function() {
    it("subsets of 1,2,3,4", function() {
      var subs = subsets.getSubsets([1,2,3,4]);
      test_utils.checkArray(subs, [
        [ [], [ 1, 2, 3, 4 ] ],
        [ [ 1 ], [ 2, 3, 4 ] ],
        [ [ 2 ], [ 1, 3, 4 ] ],
        [ [ 3 ], [ 1, 2, 4 ] ],
        [ [ 4 ], [ 1, 2, 3 ] ],
        [ [ 1, 2 ], [ 3, 4 ] ],
        [ [ 1, 3 ], [ 2, 4 ] ],
        [ [ 1, 4 ], [ 2, 3 ] ],
        [ [ 2, 3 ], [ 1, 4 ] ],
        [ [ 2, 4 ], [ 1, 3 ] ],
        [ [ 3, 4 ], [ 1, 2 ] ],
        [ [ 1, 2, 3 ], [ 4 ] ],
        [ [ 1, 2, 4 ], [ 3 ] ],
        [ [ 1, 3, 4 ], [ 2 ] ],
        [ [ 2, 3, 4 ], [ 1 ] ],
        [ [ 1, 2, 3, 4 ], [] ],
      ]);
    });
  });
}
