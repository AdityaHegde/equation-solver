var eqn_utils = require("../utils/eqn_utils");

module.exports = function(termHeap, termRef, termsMeta, tkey) {
  //console.log("-----");
  //console.log(tkey);
  for(var i = 0; i < termRef[1].tref[tkey].bts.length;) {
    var p = termRef[1].tref[tkey].bts[i],
    modified = 0;
    //if expected coeff is equal to present coeff,
    //the term will be removed, so set present to 0
    //update the heap value of the bracket term
    //console.log("--");
    //console.log(p.tref[tkey]);
    //console.log(p.href);
    //console.log(p.href.key);
    if(p.tref[tkey].presCoeff === p.tref[tkey].exCoeff) {
      p.href.value -= p.tref[tkey].oprns;
      modified = 1;
      p.tref[tkey].present = 0;
      //console.log("removed from : " + p.href.key);
    }
    //update the present coeff
    p.tref[tkey].presCoeff = p.tref[tkey].presCoeff - p.tref[tkey].exCoeff;

    if(p.href.value <= 0) {
      //if value is negative or zero, remove it from heap
      eqn_utils.heap.removeEle(termHeap, p.href, eqn_utils.heapcmp);
      //console.log("removed bracket term " + p.href.key);
      //console.log(termHeap);
      delete termRef[1].btref[p.href.key];
      termRef[1].tref[tkey].bts.splice(i, 1);
      
      for(var t in p.tref) {
        if(p.tref.hasOwnProperty(t)) {
          for(var j = 0; j < termRef[1].tref[t].bts.length; j++) {
            if(termRef[1].tref[t].bts[j].href.key === p.href.key) {
              termRef[1].tref[t].bts.splice(j, 1);
              break;
            }
          }
        }
      }
    }
    else {
      //else call modify and increment i
      eqn_utils.heap.modified(termHeap, p.href, eqn_utils.heapcmp);
      i++;
    }
  }
  delete termRef[1].tref[tkey].coeff;
};
