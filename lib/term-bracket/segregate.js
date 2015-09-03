module.exports = function(term, pwr) {
  var terms = this.terms,
      pwrRef = {};
  this.terms = [];
  for(var i = 0; i < terms.length; i++) {
    var t = terms[i].segregate(term, pwr);
    if(t[0]) {
      if(!pwrRef[t[0].pwr]) {
        pwrRef[t[0].pwr] = this.createTermMultiply({terms : [t[0]]});
        pwrRef[t[0].pwr].addTerm(this.createTermBracket({terms : []}));
      }
      t[1] = t[1].condense();
      if(t[1]) {
        pwrRef[t[0].pwr].terms[0].addTerm(t[1]);
      }
    }
    else {
      t[1] = t[1].condense();
      if(t[1]) {
        this.addTerm(t[1]);
      }
    }
  }
  for(var p in pwrRef) {
    //if(pwrRef[p].terms[0].terms.length === 1) pwrRef[p] = pwrRef[p].simplify();
    pwrRef[p].terms[0] = pwrRef[p].terms[0].condense();
    pwrRef[p] = pwrRef[p].condense();
    this.addTerm(pwrRef[p]);
  }
  return [null, this, pwrRef[pwr || -1]];
};
