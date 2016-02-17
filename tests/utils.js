var
should = require("should"),
testCases = [
  "utils/utils-combinations.js",
  "utils/utils-factors.js",
  //"utils/utils-heap.js",
  "utils/utils-subsets.js",
  "utils/utils-main-coeff-for-raise-to-pwr.js",
  "utils/utils-main-hcf.js",
  "utils/utils-main-distribute-pwr.js",
];

describe("Utils", function() {
  for(var i = 0; i < testCases.length; i++) {
    require(__dirname + "/" + testCases[i]);
  }
});
