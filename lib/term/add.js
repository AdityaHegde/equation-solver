module.exports = function(term) {
  //if the terms are equal (var and pwr) then add them
  if(this.equalTo(term)) {
    this.coeff = this.coeff + term.coeff;
    this.sortAndStringify();
    return 1;
  }
  return 0;
};
