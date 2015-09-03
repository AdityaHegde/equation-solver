var eqn_utils = require("../utils/eqn_utils");

module.exports = function() {
  this.fullStr = this.getCoeffStr();
  for(var i = 0; i < this.terms.length; i++) {
    this.terms[i].sortAndStringify();
  }
  this.terms.sort(eqn_utils.sort_term);
  this.vari = "(";
  for(var i = 0; i < this.terms.length; i++) {
    if(i > 0 && this.terms[i].coeff >= 0) this.vari += "+";
    this.vari += this.terms[i].fullStr;
  }
  this.vari += ")";
  this.termStr = this.vari;
  if(this.pwr && this.pwr !== 1) this.termStr += "^" + this.pwr;
  this.fullStr += this.termStr;

  return this;
};
