module.exports = function(term, pwr) {
  var segregateThis = this._super(term, pwr);

  if(segregateThis[0]) {
    return segregateThis;
  }
  else {
    var
    //a reference of all terms with different powers of 'term'
    pwrRef = {};

    this.forEachTerm(function(tterm) {
      var t = tterm.segregate(term, pwr);
      if(t[0]) {
        //if some term was segregated
        if(!pwrRef[t[0].pwr]) {
          //if the seperated term's power is not present, add it
          pwrRef[t[0].pwr] = {
            //the TermMultiply with an instance of 'term' raised a power
            mulTerm : this.createTermMultiply({terms : [t[0]]}),
            //all the other terms with 'term' with a praticular power
            bktTerm : this.createTermBracket({terms : []}),
            //eg - for a^2 + a^2*b, mulTerm = a^2, bktTerm = (1 + b)
          };
          //add the bktTerm to mulTerm
          pwrRef[t[0].pwr].mulTerm.addTerm(pwrRef[t[0].pwr].bktTerm);
        }
        t[1] = t[1].condense();
        if(t[1]) {
          //if after condensing the term is non empty then add it to the bkt term
          pwrRef[t[0].pwr].bktTerm.addTerm(t[1]);
        }
      }
      else {
        //else just add back the term to 'this'
        return t[1].condense();
      }
      return null;
    });

    //console.log(pwrRef);
    for(var p in pwrRef) {
      pwrRef[p].mulTerm = pwrRef[p].mulTerm.condense();
      this.addTerm(pwrRef[p].mulTerm);
    }
    return [null, this, pwrRef[pwr || -1] && pwrRef[pwr || -1].mulTerm];
  }
};
