var
subsets = require("../../lib/utils/subsets.js"),
should = require("should");

describe("subsets.js", function() {
  it("subsets of 1,2,3,4", function() {
    var subs = subsets.getSubsets([1,2,3,4]);
    subs.should.be.eql([
      [ [], [ 1, 2, 3, 4 ] ],
      [ [ 4 ], [ 1, 2, 3 ] ],
      [ [ 3 ], [ 1, 2, 4 ] ],
      [ [ 3, 4 ], [ 1, 2 ] ],
      [ [ 2 ], [ 1, 3, 4 ] ],
      [ [ 2, 4 ], [ 1, 3 ] ],
      [ [ 2, 3 ], [ 1, 4 ] ],
      [ [ 2, 3, 4 ], [ 1 ] ],
      [ [ 1 ], [ 2, 3, 4 ] ],
      [ [ 1, 4 ], [ 2, 3 ] ],
      [ [ 1, 3 ], [ 2, 4 ] ],
      [ [ 1, 3, 4 ], [ 2 ] ],
      [ [ 1, 2 ], [ 3, 4 ] ],
      [ [ 1, 2, 4 ], [ 3 ] ],
      [ [ 1, 2, 3 ], [ 4 ] ],
      [ [ 1, 2, 3, 4 ], [] ],
    ]);
  });
});
