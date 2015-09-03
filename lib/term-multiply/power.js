module.exports = function(pwr, sterm) {
  if(pwr !== 0) {
    this.coeff = Math.pow(this.coeff, pwr);
    for(var i = 0; i < this.terms.length; i++) {
      this.terms[i].power(pwr, sterm);
    }
    this.pwr = 1;
    return this;
  }
  return null;
};
