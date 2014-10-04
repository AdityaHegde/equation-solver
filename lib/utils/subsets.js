var 
subsets = {
  _subsets : function(set, selected, cur) {
    if(cur === set.length) {
      var subset = [], leftOut = [];
      for(var i = 0, j = 0; i < set.length; i++) {
        if(i === selected[j]) {
          subset.push(set[i]);
          j++;
        }
        else {
          leftOut.push(set[i]);
        }
      }
      return [[subset, leftOut]];
    }
    var subSetsWithout, subSetsWith;
    subSetsWithout = subsets._subsets(set, selected, cur + 1);
    selected.push(cur);
    subSetsWith = subsets._subsets(set, selected, cur + 1);
    selected.pop();
    for(var i = 0; i < subSetsWith.length; i++) {
      subSetsWithout.push(subSetsWith[i]);
    }
    return subSetsWithout;
  },
  getSubsets : function(set) {
    return subsets._subsets(set, [], 0);
  },
};

module.exports = subsets;
