var
eqn_utils = require("../../lib/utils/eqn_utils.js"),
test_utils = require("test_utils"),
should = require("should");

module.exports = function() {
  describe("hcf", function() {
    it("hcf of 2, 3", function() {
      eqn_utils.hcf(2, 3).should.be.eql(1);
    });

    it("hcf of 2, 4", function() {
      eqn_utils.hcf(2, 4).should.be.eql(2);
    });

    it("hcf of 4, 6", function() {
      eqn_utils.hcf(4, 6).should.be.eql(2);
    });
  });
}
