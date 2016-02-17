module.exports = function(term) {
  if(this.pwr !== 1) {
    this.power(this.pwr, term);
  }

  this.forEachTerm(function(tterm) {
    return tterm.simplify(term);
  });

  if(this.terms.length === 0) {
    //if no terms were retained after simplification, return a TermNumber with the coeff
    return this.createTermNumber({coeff : this.coeff});
  }

  /*  expand brackets inside the TermMultiply  */

  //codense the equation 1st to remove duplicate terms among other things
  //bt - 1st TermBracket
  //mts - TermBrackets other than 'bt'
  //nmts - TermBrackets with negative powers
  //stm - a TermMultiply with terms in 'this' which is not TermBrackets, or doesnt have 'term'
  var t = this.condense(),
      mts = [], stm = this.createTermMultiply({terms : []}), bt = null;
  //console.log("----");
  //console.log(t);
  if(t.type === 1) {
    //return the condensed term if it is a simple Term
    return t;
  }

  t.terms.forEach(function(tterm) {
    if(tterm.type !== 3 || tterm.pwr !== 1 || !tterm.hasTerm(term)) {
      //add to smt if tterm is not TermBracket, power is not 1 or doesnt have term
      stm.addTerm(tterm);
    }
    else {
      //else push to mts
      mts.push(tterm);
    }
  }, this);
  stm.sortAndStringify();
  /*if(bt) {
    for(var i = 0; i < bt.terms.length; i++) {
      bt.terms[i].coeff *= this.coeff;
    }
  }*/
  bt = mts.pop();
  if(stm.terms.length !== 0) {
    //if there are single terms
    if(!bt) {
      //if there are no multi term, return 't' as it needs no further simplification
      return t;
    }
    //else multiply the smt to bt
    bt = bt.multiply(stm, term);
  }

  //if(mts.length === 1 && mts[0].pwr / Math.abs(mts[0].pwr) !== bt / Math.abs(bt)) {
  //}

  //multiply bt to all remaining 'multi term' terms
  bt = mts.reduce(function(bt, tterm) {
    return bt.multiply(tterm, term);
  }, bt);

  //move the coeff from 'this' to 'bt'
  bt.coeff = this.coeff;

  //condense and return bt
  return bt.condense();
};
