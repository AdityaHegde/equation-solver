var eqn_utils = require("../utils/eqn_utils");

module.exports = function(termHeap, termRef, termsMeta, tkey, addNew) {
  if(termRef[1].tref[tkey]) {
    for(var i = 0; i < termRef[1].tref[tkey].bts.length; i++) {
      var p = termRef[1].tref[tkey].bts[i];
      if(p.tref[tkey].present === 0) {
        this._type1_add_tkey_to_bt(termHeap, p, termsMeta, tkey, this.coeff);

        //modify the heap
        //eqn_utils.heap.modified(termHeap, p.href, eqn_utils.heapcmp);
        termHeap.updateItem(p.href);
      }
    }
    //update the coeff of the term entry
    termRef[1].tref[tkey].coeff = this.coeff;
  }
  else if(addNew) {
    termRef[1].tref[tkey] = {bts : [], coeff : this.coeff, terms : [this.copy()]};
  }
};
