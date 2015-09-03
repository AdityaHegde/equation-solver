var
factors = require("../../lib/utils/factors.js"),
should = require("should");

describe("factors.js", function() {
  it("prime factors of 15", function() {
    var facts = factors.getPrimeFactors(15);
    facts.should.be.eql([3, 5]);
  });

  it("prime factors of 23", function() {
    var facts = factors.getPrimeFactors(23);
    facts.should.be.eql([23]);
  });

  it("prime factors of 24", function() {
    var facts = factors.getPrimeFactors(24);
    facts.should.be.eql([2, 2, 2, 3]);
  });

  it("pairs of factors for 24", function() {
    var pairs = factors.getPairsOfFactors(24);
    pairs.should.be.eql([
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
