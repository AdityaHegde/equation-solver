var eqn_utils = require("../utils/eqn_utils");

module.exports = function(termHeap, termRef, termsMeta, parentTerm) {
  if(this.vari) {
    var key;
    for(var i = 1; i <= this.pwr; i++) {
      key = this.vari+"--"+i;
      if(termRef[0][key]) {
        //decrease the value
        termRef[0][key].value -= i;
        //remove from terms array for this vari
        termRef[0][key].terms.splice(termRef[0][key].terms.indexOf(parentTerm || this), 1);
        termHeap.updateItem(termRef[0][key]);
        if(termRef[0][key].value <= 0) {
          //if the value is negative or zero, remove it from heap
          //console.log("for (type 0) " + key + " removed from heap");
          //console.log(termRef[0][key]);
          //console.log(termHeap);
          //eqn_utils.heap.removeEle(termHeap, termRef[0][key], eqn_utils.heapcmp);
          delete termRef[0][key];
        }
        else {
          //else call modify
          //eqn_utils.heap.modified(termHeap, termRef[0][key], eqn_utils.heapcmp);
        }
      }
    }
    if(termRef[1].tref[key] && !parentTerm) {
      this._type1_remove_tkey(termHeap, termRef, termsMeta, key, this.coeff);
    }
  }
};
