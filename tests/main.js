var
should = require("should"),
test_utils = require("test_utils"),
testCases = [
  "eqn-parse.js",
  "eqn-simplify.js",
  "eqn-replace.js",
  "eqn-segregate.js",
  "eqn-factorize.js",
];

describe("Main", function() {
  test_utils.describe(testCases, __dirname+"/main/");
});
