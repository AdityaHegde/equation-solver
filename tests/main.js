var
should = require("should"),
testCases = [
  "main/parse.js",
  "main/simplify.js",
  "main/replace.js",
  "main/segregate.js",
  "main/factorize.js",
];

describe("Main", function() {
  for(var i = 0; i < testCases.length; i++) {
    require(__dirname + "/" + testCases[i]);
  }
});
