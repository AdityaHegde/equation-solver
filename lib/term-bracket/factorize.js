var eqn_utils = require("../utils/eqn_utils");

module.exports = function(sterm) {
  var 
  f = 1, rt = this,
  termHeap = [],
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

  for(var i = 0; i < rt.terms.length; i++) {
    rt.terms[i] = rt.terms[i].factorize(sterm);
    if(!sterm || !rt.terms[i].hasSTerm(sterm)) {
      termsMeta.curParent = null;
      rt.terms[i].processForFactorization(termHeap, termRef, termsMeta, 1);
    }
    termsMeta.termsLeft--;
  }

  while(f === 1) {
    f = 0;
    //console.log("\n\n---------" + rt.fullStr + "---------\n\n");
    var e = eqn_utils.heap.remove(termHeap, eqn_utils.heapcmp);
    //console.log(e);
    if(e && e.value > 0) {
      if(e.type === 0) {
        for(var i = 0; i < e.terms.length; i++) {
          termsMeta.curParent = null;
          e.terms[i].processForRemovalByFactorization(termHeap, termRef, termsMeta, 1);
        }

        //run segregate with the term
        //TODO : find a faster way to segregate than parsing all terms in rt
        var newbt = rt.segregate(this.createTerm({vari : e.key}), e.pwr)[2];
        newbt.sortAndStringify();
        newbt = newbt.factorize();
        termsMeta.curParent = null;
        newbt.processForFactorization(termHeap, termRef, termsMeta, 1);

        rt.sortAndStringify();
        if(rt.terms.length === 1) {
          var t = rt.terms.pop();
          t.coeff *= rt.coeff;
          t.pwr *= rt.pwr;
          t = t.factorize(sterm);
          t.sortAndStringify();
          return t;
        }
        f = 1;
      }
      else if(e.type === 1) {
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
            termsMeta.curParent = null;
            term.processForRemovalByFactorization(termHeap, termRef, termsMeta, 1);
            rt.addTerm(term);
          }
        }
        //add the bracket with power
        var newbt = this.createTermBracket({terms : p.terms, pwr : p.pwr});
        newbt.sortAndStringify();
        newbt = newbt.factorize(sterm);
        rt.addTerm(newbt);
        rt.sortAndStringify();
        var nrt = rt.condense();
        nrt.sortAndStringify();
        if(nrt !== rt) {
          return nrt;
        }
        f = 1;
      }
    }
    rt = rt.condense();
    if(rt) {
      rt.sortAndStringify();
    }
  }
  return rt;
};
