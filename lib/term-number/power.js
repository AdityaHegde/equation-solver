module.exports = function(pwr) {
  //if(pwr !== 0) {
    this.coeff = Math.pow(this.coeff, pwr);
    return this.sortAndStringify();
  /*}
  else {
    this.pwr = 0;
  }*/
  //return null;
};
