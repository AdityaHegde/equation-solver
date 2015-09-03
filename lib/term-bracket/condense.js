var eqn_utils = require("../utils/eqn_utils");

module.exports = function() {
  if(this.terms.length === 0) {
    return null;
  }
  this.sortAndStringify();
  var terms = this.terms;
  this.terms = [];
  for(var i = 0; i < terms.length - 1; i++) {
    if(terms[i] === 0) continue;
    for(var j = i + 1; j < terms.length; j++) {
      if(terms[j] === 0) continue;
      if(terms[i].add(terms[j]) !== 0) {
        terms[j] = 0;
      }
    }
    if(terms[i].coeff !== 0) {
      this.addTerm(terms[i]);
    }
  }
  if(terms[terms.length - 1] !== 0) this.addTerm(terms[terms.length - 1]);

  if(this.terms.length === 1) {
    this.terms[0].coeff *= this.coeff;
    if(this.pwr !== 1) this.terms[0].pwr = this.pwr;
    return this.terms.pop();
  }
  else {
    var hcf = this.terms[0].coeff;;
    for(var i = 1; i < this.terms.length && hcf !== 1; i++) {
      hcf = eqn_utils.hcf(hcf, this.terms[i].coeff);
    }
    if(hcf !== 1) {
      for(var i = 0; i < this.terms.length && hcf !== 1; i++) {
        this.terms[i].coeff /= hcf;
      }
      this.coeff *= hcf;
    }
    return this;
  }
  return null;
};
