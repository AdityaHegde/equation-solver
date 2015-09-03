var
heap = require("../../lib/utils/heap.js"),
should = require("should");

describe("heap.js", function() {
  var tests = [{
    title : "min heap (defaut)",
    isSimple : 1,
    insert : [3, 5, 2, 8, 6],
    remove : [2, 3, 5, 6, 8],
  }, {
    title : "max heap (with comparator)",
    isSimple : 1,
    insert : [3, 5, 2, 8, 6],
    remove : [8, 6, 5, 3, 2],
    comp : function(a, b) {
      return a - b;
    },
  }, {
    title : "heap with random access change to move up",
    insert : [3, 5, 2, 8, 6],
    modify : [{
      idx : 2,
      val : 10,
    }],
    remove : [10, 8, 6, 5, 3],
    comp : function(a, b) {
      return a.v - b.v;
    },
  }, {
    title : "heap with random access change to move down",
    insert : [3, 5, 2, 8, 6],
    modify : [{
      idx : 1,
      val : 1,
    }],
    remove : [8, 5, 3, 2, 1],
    comp : function(a, b) {
      return a.v - b.v;
    },
  }, {
    title : "heap with random access remove #1",
    insert : [3, 5, 2, 8, 6],
    removeIdxs : [1],
    remove : [8, 5, 3, 2],
    comp : function(a, b) {
      return a.v - b.v;
    },
  }, {
    title : "heap with random access remove #2",
    insert : [3, 5, 2, 8, 6],
    removeIdxs : [4],
    remove : [8, 6, 3, 2],
    comp : function(a, b) {
      return a.v - b.v;
    },
  }, {
    title : "heap with random access remove #3",
    insert : [3, 5, 2, 8, 6],
    removeIdxs : [2],
    remove : [8, 6, 5, 3],
    comp : function(a, b) {
      return a.v - b.v;
    },
  }, {
    title : "heap with random access remove #3",
    insert : [3, 5, 2, 8, 6],
    removeIdxs : [0],
    remove : [6, 5, 3, 2],
    comp : function(a, b) {
      return a.v - b.v;
    },
  }];

  for(var i = 0; i < tests.length; i++) {
    (function() {
      var test = tests[i];
      it(test.title, function() {
        var arr = [];

        for(var j = 0; j < test.insert.length; j++) {
          if(test.isSimple) {
            heap.insert(arr, test.insert[j], test.comp);
          }
          else {
            heap.insert(arr, {v : test.insert[j]}, test.comp);
          }
        }

        if(test.modify) {
          for(var k = 0; k < test.modify.length; k++) {
            arr[test.modify[k].idx].v = test.modify[k].val;
            heap.modified(arr, arr[test.modify[k].idx], test.comp);
          }
        }

        //console.log(arr);
        if(test.removeIdxs) {
          for(var j = 0; j < test.removeIdxs.length; j++) {
            heap.removeEle(arr, arr[test.removeIdxs[j]], test.comp);
          }
        }

        for(var j = 0; j < test.remove.length; j++) {
          if(test.isSimple) {
            heap.remove(arr, test.comp).should.be.eql(test.remove[j]);
          }
          else {
            heap.remove(arr, test.comp).should.have.property("v", test.remove[j]);
          }
        }
      });
    })();
  }

  it("delete on empty array", function() {
    var arr = [];
    should(heap.remove(arr)).be.eql(null);
  });
});
