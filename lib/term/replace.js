module.exports = function(term, withTerm) {
  //the place where the replace actually happens
  //replace only if 'this' is the same variable as 'term'
  if(term.vari === this.vari) {
    //create a copy of 'withTerm'
    var ret = withTerm.copy();
    if(ret.type === 3) {
      //if 'ret' is a TermBracket, multiply coeff to each term
      for(var i = 0; i < ret.terms.length; i++) {
        ret.terms[i].coeff *= this.coeff;
      }
    }
    else {
      //else multiply the coeff to 'ret' itself
      ret.coeff *= this.coeff;
    }
    //multiply pwr of 'this' to it
    if(withTerm.type > 0) {
      ret.pwr *= this.pwr;
    }
    else {
      ret.coeff = Math.pow(ret.coeff, this.pwr);
    }
    return ret;
  }
  return this;
};
