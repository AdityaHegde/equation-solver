var eqn_utils = require("../utils/eqn_utils"), Heap = require("heap");

module.exports = function(sterm) {
  var 
  f = 1, rt = this,
  termHeap = new Heap(eqn_utils.heapcmp),
  termRef = {
    //type 0, for simple term segregate - a^2+ab => a(a+b)
    0 : {},
    //type 1, for power of bracket factorization - a^2+b^2 => (a+b)^2 - 2ab
    1 : {
      //hash map for bracket details
      btref : {},
      //hash map for terms details
      tref : {},
    },
  },
  termsMeta = {termsLeft : rt.terms.length};

  rt.forEachTerm(function(rtTerm) {
    rtTerm = rtTerm.factorize(sterm);
    if(!sterm || !rtTerm.hasTerm(sterm)) {
      rtTerm.processForFactorization(termHeap, termRef, termsMeta);
    }
    termsMeta.termsLeft--;

    return rtTerm;
  });

  while(f === 1) {
    f = 0;
    //console.log("\n---------" + rt.fullStr + "---------\n");
    //var e = eqn_utils.heap.remove(termHeap, eqn_utils.heapcmp);
    var e = termHeap.pop();
    //console.log(e);
    if(e && e.value > 0) {
      switch(e.type) {
        case 0:
          e.terms.forEach(function(eTerm) {
            eTerm.processForRemovalByFactorization(termHeap, termRef, termsMeta);
          });

          //run segregate with the term
          //TODO : find a faster way to segregate than parsing all terms in rt
          var newt = rt.segregate(this.createTerm({vari : e.key}), e.pwr)[2];
          newt.sortAndStringify();
          var _newt = newt.factorize();
          if(newt !== _newt) {
            rt.replaceTerm(newt, _newt);
          }
          _newt.processForFactorization(termHeap, termRef, termsMeta);

          rt.sortAndStringify();
          f = 1;

          break;

        case 1:
          //console.log(termRef[1].btref);
          var p = termRef[1].btref[e.key];
          //console.log(p);
          for(var k in p.tref) {
            //add all terms within the bracket with -<expected coeff> as coeff
            if(p.tref.hasOwnProperty(k)) {
              var
              terms = termRef[1].tref[k].terms.filter(function(t) {
                return t.pwr !== 0;
              }).map(function(t) {
                return t.copy();
              }),
              term;
              if(terms.length === 1) {
                term = terms[0];
              }
              else {
                term = this.createTermMultiply({terms : terms});
              }
              term.coeff = -p.tref[k].exCoeff;
              //term.sortAndStringify();
              term.processForRemovalByFactorization(termHeap, termRef, termsMeta);
              rt.addTerm(term);
            }
          }
          //add the bracket with power
          var newbt = this.createTermBracket({terms : p.terms, pwr : p.pwr});
          newbt.sortAndStringify();
          newbt = newbt.factorize(sterm);
          rt.addTerm(newbt);
          rt.sortAndStringify();
          f = 1;

          break;

        default: break;
      }
    }
    rt = rt.condense();
    if(rt.type !== 3) {
      f = 0;
    }
  }
  return rt;
};
