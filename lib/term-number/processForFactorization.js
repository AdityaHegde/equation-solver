var eqn_utils = require("../utils/eqn_utils");

module.exports = function(termHeap, termRef, termsMeta, seperate) {
  if(this.vari) {
    var key;
    for(var i = 1; i <= this.pwr; i++) {
      key = this.vari+"--"+i;
      if(termRef[0][key]) {
        termRef[0][key].value += i;
        termRef[0][key].terms.push(termsMeta.curParent || this);
        eqn_utils.heap.modified(termHeap, termRef[0][key], eqn_utils.heapcmp);
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
          terms : [termsMeta.curParent || this],
        };
        eqn_utils.heap.insert(termHeap, termRef[0][key], eqn_utils.heapcmp);
      }
    }
    if(seperate) {
      this._type1_add_tkey(termHeap, termRef, termsMeta, key, 1);
    }
  }
};
