module.exports = function(term) {
  //if the terms are equal (var and pwr) then add them
  if(this.equalTo(term) === 1) {
    this.coeff = this.coeff + term.coeff;
    return 1;
  }
  return 0;
};
