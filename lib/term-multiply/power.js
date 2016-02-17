module.exports = function(pwr, term) {
  if(pwr !== 0) {
    this.coeff = Math.pow(this.coeff, pwr);
    this.forEachTerm(function(tterm) {
      return tterm.getTermClass().prototype.power.call(tterm, pwr, term);
    });
    this.pwr = 1;
    return this;
  }
  return null;
};
