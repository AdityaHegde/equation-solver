var 
factorial = require("./factorial.js"),
combinations = {
  _select : function(items, selected, cur) {
    if(cur === items.length) {
      var ret = [];
      for(var i = 0; i < selected.length; i++) {
        ret.push(items[i][selected[i]]);
      }
      return [ret];
    }
    var retVals = [];
    for(var i = 0; i < items[cur].length; i++) {
      selected[cur] = i;
      var retVal = this._select(items, selected, cur+1);
      for(var j = 0; j < retVal.length; j++) {
        retVals.push(retVal[j]);
      }
    }
    return retVals;
  },
  //n slots with some options for each slot,
  //get all possible selections
  selectionProblem : function(items) {
    return this._select(items, [], 0);
  },

  noOfCombinations : function(n, r) {
    return factorial.getFactorial(n) / (factorial.getFactorial(r) * factorial.getFactorial(n - r));
  },
};

module.exports = combinations;
