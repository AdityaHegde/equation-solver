var eqn_utils = require("../utils/eqn_utils");

module.exports = function(termHeap, termRef, termsMeta, parentTerm) {
  if(this.vari) {
    var key;
    for(var i = 1; i <= this.pwr; i++) {
      key = this.vari+"--"+i;
      if(termRef[0][key]) {
        termRef[0][key].value += i;
        termRef[0][key].terms.push(parentTerm || this);
        //eqn_utils.heap.modified(termHeap, termRef[0][key], eqn_utils.heapcmp);
        termHeap.updateItem(termRef[0][key]);
      }
      else {
        termRef[0][key] = {
          //no of operations decreased
          value : -1,
          //type, 0 - simple term occurance
          type : 0,
          //key
          key : this.vari,
          //pwr
          pwr : i,
          //terms having this var
          terms : [parentTerm || this],
        };
        //eqn_utils.heap.insert(termHeap, termRef[0][key], eqn_utils.heapcmp);
        termHeap.push(termRef[0][key]);
      }
    }
    if(!parentTerm) {
      this._type1_add_tkey(termHeap, termRef, termsMeta, key, 1);
    }
  }
};
