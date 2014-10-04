var
should = require("should"),
test_utils = require("test_utils"),
testCases = [
  "utils-combinations.js",
  "utils-factors.js",
  "utils-heap.js",
  "utils-subsets.js",
  "utils-main-coeff-for-raise-to-pwr.js",
  "utils-main-hcf.js",
  "utils-main-distribute-pwr.js",
];

describe("Utils", function() {
  test_utils.describe(testCases, __dirname+"/utils/");
});
