module.exports = function(pwr) {
  if(pwr !== 0) {
    //multiply the pwr and raise coeff
    this.pwr = (this.pwr ? this.pwr * pwr : pwr);
    this.coeff = Math.pow(this.coeff, pwr);
    return this;
  }
  else {
    this.pwr = 0;
  }
  return null;
};
