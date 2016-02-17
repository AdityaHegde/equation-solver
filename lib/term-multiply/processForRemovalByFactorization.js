module.exports = function(termHeap, termRef, termsMeta, parentTerm) {
  for(var i = 0; i < this.terms.length; i++) {
    this.terms[i].processForRemovalByFactorization(termHeap, termRef, termsMeta, this);
  }

  if(!parentTerm) {
    var
    //key to be used for the bracket in the bracket hash map
    //will be <t1>--<p1>__<t2>--<p2>.....<tn>--<pn>__<p>
    //p - pwr of the bracket
    btkey = "",
    //key with just the terms
    //will be <t1>--<p1*p>__<t2>--<p2*p>.....<tn>--<pn*p>
    //p - pwr of the bracket
    tkey = [],
    //map of term's 'vari' to its pwr
    termToPwrMap = {};

    for(var i = 0; i < this.terms.length; i++) {
      var term = this.terms[i];
      tkey.push(term.vari+"--"+term.pwr);
    }
    tkey = tkey.join("__");

    if(termRef[1].tref[tkey]) {
      this._type1_remove_tkey(termHeap, termRef, termsMeta, tkey);
    }
  }
};
