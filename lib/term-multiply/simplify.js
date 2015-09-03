module.exports = function(sterm) {
  var terms = this.terms;
  this.terms = [];
  for(var i = 0; i < terms.length; i++) {
    terms[i] = terms[i].simplify(sterm);
    if(terms[i]) {
      if(terms[i].type > 0 || terms[i].vari) {
        //if simplified term is not a just number
        //type check for TermMultiply or TermBracket
        //vari check for Term with a variable
        this.addTerm(terms[i]);
      }
      else if(terms[i].coeff !== 1) {
        //if the term is a number but not 1
        //TODO : handle real numbers
        this.coeff *= terms[i].coeff;
      }
    }
  }
  if(this.terms.length === 0) {
    //if no terms were retained after simplification, return a EQN.Term with just the coeff
    return this.createTerm({coeff : this.coeff});
  }

  /*  expand brackets inside the TermMultiply  */

  //codense the equation 1st to remove duplicate terms among other things
  //bt - 1st TermBracket
  //mts - TermBrackets not in bt
  //stm - a TermMultiply with terms in 'this' which is not TermBrackets, or doesnt have sterm
  var t = this.condense(),
      mts = [], stm = this.createTermMultiply({terms : []}), bt = null;
  //console.log("----");
  //console.log(t);
  if(t.type === 1) {
    //return the condensed term if it is a simple Term
    return t;
  }

  for(var i = 0; i < t.terms.length; i++) {
    if(t.terms[i].type === 1 || t.terms[i].pwr !== 1 || t.terms[i].hasSTerm(sterm) === 0) {
      //add to smt if terms[i] is Term, power is not 1 or doesnt have sterm
      stm.addTerm(t.terms[i]);
    }
    else {
      //else is a term with multiple child terms
      if(!bt) {
        //if 1st multi term, assign it to 'bt'
        bt = t.terms[i];
      }
      else {
        //else push to mts
        mts.push(t.terms[i]);
      }
    }
  }
  stm.sortAndStringify();
  /*if(bt) {
    for(var i = 0; i < bt.terms.length; i++) {
      bt.terms[i].coeff *= this.coeff;
    }
  }*/
  if(stm.terms.length !== 0) {
    //if there are single terms
    if(!bt) {
      //if there are no multi term, return 't' as it needs no further simplification
      return t;
    }
    //else multiply the smt to bt
    bt = bt.multiply(stm, sterm);
  }

  for(var i = 0; i < mts.length; i++) {
    //multiply bt to all remaining 'multi term' terms
    bt = bt.multiply(mts[i], sterm);
  }

  //move the coeff from 'this' to 'bt'
  bt.coeff = this.coeff;
  //simplify all terms after expanding brackets
  bt = bt.simplify(sterm);
  if(bt.terms.length === 1) {
    //if simplified 'bt' has a single term return it
    bt.terms[0].coeff *= bt.coeff;
    return bt.terms.pop();
  }
  if(bt.terms.length === 0) {
    //if bt has no terms then return null
    return null;
  }

  return bt;
};
