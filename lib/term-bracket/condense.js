var eqn_utils = require("../utils/eqn_utils");

module.exports = function() {
  this.forEachTerm(function(term) {
    return term.condense();
  });

  if(this.terms.length === 0) {
    return this.createTermNumber({coeff : this.coeff});
  }
  else if(this.terms.length === 1) {
    this.terms[0].coeff *= this.coeff;
    if(this.pwr !== 1) this.terms[0].pwr = this.pwr;
    return this.terms.pop().sortAndStringify();
  }
  else {
    var hcf = this.terms[0].coeff;
    for(var i = 1; i < this.terms.length && hcf !== 1; i++) {
      hcf = eqn_utils.hcf(hcf, this.terms[i].coeff);
    }
    if(hcf !== 1) {
      for(var i = 0; i < this.terms.length && hcf !== 1; i++) {
        this.terms[i].coeff /= hcf;
      }
      this.coeff *= hcf;
    }
    return this.sortAndStringify();
  }
};
