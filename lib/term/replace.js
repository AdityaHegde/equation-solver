module.exports = function(term, withTerm) {
  //the place where the replace actually happens
  //replace only if 'this' is the same variable as 'term' and at a higher power
  if(this.vari === term.vari && this.pwr >= term.pwr) {
    //create a copy of 'withTerm'
    var ret = withTerm.copy();
    if(withTerm.type > 0) {
      //multiply power of 'ret' with the quotient of powers converted to integer
      ret.pwr *= Math.floor(this.pwr / term.pwr);
      //updated the coeff of 'ret' with quotient
      ret.coeff = Math.pow(ret.coeff, Math.floor(this.pwr / term.pwr));
      if(this.pwr % term.pwr === 0) {
        //if power of 'this' is divisible by power 'term'
        //update the coeff with coeff of 'this'
        ret.coeff *= this.coeff;
      }
      else {
        //update the power of 'this' with remaining power after division by power of 'term'
        this.pwr %= term.pwr;
        //create a TermMultipy with 'ret' and 'this' and return it
        ret = this.createTermMultiply({
          terms : [this, ret],
        });
      }
    }
    else {
      //if 'term' is a plain number then update the coeff
      ret.coeff = Math.pow(ret.coeff, Math.floor(this.pwr / term.pwr));

      if(this.pwr % term.pwr !== 0) {
        //if it is not a complete replace, then update 'this'
        this.coeff *= ret.coeff;
        this.pwr %= term.pwr;
        ret = this;
      }
      else {
        ret.coeff *= this.coeff;
      }
    }
    //console.log('ret');
    //console.log(ret);
    return ret.sortAndStringify();
  }
  return this;
};
