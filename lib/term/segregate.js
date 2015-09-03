module.exports = function(term, pwr) {
  var
  t = null,
  rt = this;
  //execute only if it is 'this' is the same variable as 'term'
  //and has a greater pwr that the one passed, if passed
  if(this.vari === term.vari && (!pwr || this.pwr >= pwr)) {
    //create a copy of 'this'
    t = this.copy();
    t.coeff = 1;

    if(pwr && this.pwr > pwr) {
      //if a 'pwr' is passed, segragate only that portion of pwr
      this.pwr -= pwr;
      t.pwr = pwr;
    }
    else {
      //else segregate all of the var and retain a number
      rt = this.createTermNumber({coeff : this.coeff});
    }
  }
  return [t, rt];
};
