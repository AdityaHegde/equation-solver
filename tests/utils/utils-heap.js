var
heap = require("../../lib/utils/heap.js"),
should = require("should");

module.exports = function() {
  describe("heap.js", function() {
    it("min heap (defaut)", function() {
      var arr = [];
      heap.insert(arr, 3);
      heap.insert(arr, 5);
      heap.insert(arr, 2);
      heap.insert(arr, 8);
      heap.insert(arr, 6);

      heap.deleteEle(arr).should.be.eql(2);
      heap.deleteEle(arr).should.be.eql(3);
      heap.deleteEle(arr).should.be.eql(5);
      heap.deleteEle(arr).should.be.eql(6);
      heap.deleteEle(arr).should.be.eql(8);
    });

    it("max heap (with comparator)", function() {
      var arr = [],
      comp = function(a, b) {
        return a - b;
      };
      heap.insert(arr, 2, comp);
      heap.insert(arr, 8, comp);
      heap.insert(arr, 1, comp);
      heap.insert(arr, 4, comp);
      heap.insert(arr, 6, comp);

      heap.deleteEle(arr, comp).should.be.eql(8);
      heap.deleteEle(arr, comp).should.be.eql(6);
      heap.deleteEle(arr, comp).should.be.eql(4);
      heap.deleteEle(arr, comp).should.be.eql(2);
      heap.deleteEle(arr, comp).should.be.eql(1);
    });

    it("heap with random access change to move up", function() {
      var arr = [],
      comp = function(a, b) {
        return a.v - b.v;
      };
      heap.insert(arr, {v : 3}, comp);
      heap.insert(arr, {v : 5}, comp);
      heap.insert(arr, {v : 2}, comp);
      heap.insert(arr, {v : 8}, comp);
      heap.insert(arr, {v : 6}, comp);

      arr[2].v = 10;

      heap.modified(arr, arr[2], comp);
      heap.deleteEle(arr, comp).should.have.property("v", 10);
      heap.deleteEle(arr, comp).should.have.property("v", 8);
      heap.deleteEle(arr, comp).should.have.property("v", 6);
      heap.deleteEle(arr, comp).should.have.property("v", 5);
      heap.deleteEle(arr, comp).should.have.property("v", 3);
    });

    it("heap with random access change to move down", function() {
      var arr = [],
      comp = function(a, b) {
        return a.v - b.v;
      };
      heap.insert(arr, {v : 3}, comp);
      heap.insert(arr, {v : 5}, comp);
      heap.insert(arr, {v : 2}, comp);
      heap.insert(arr, {v : 8}, comp);
      heap.insert(arr, {v : 6}, comp);

      arr[1].v = 1;

      heap.modified(arr, arr[2], comp);
      heap.deleteEle(arr, comp).should.have.property("v", 8);
      heap.deleteEle(arr, comp).should.have.property("v", 5);
      heap.deleteEle(arr, comp).should.have.property("v", 3);
      heap.deleteEle(arr, comp).should.have.property("v", 2);
      heap.deleteEle(arr, comp).should.have.property("v", 1);
    });

    it("delete on empty array", function() {
      var arr = [];
      should(heap.deleteEle(arr)).be.eql(null);
    });
  });
}
