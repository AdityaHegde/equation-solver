var
should = require("should"),
test_utils = require("test_utils"),
testCases = [
  "eqn-parse.js",
  "eqn-simplify.js",
];

describe("Main", function() {
  test_utils.describe(testCases, __dirname+"/main/");
});
