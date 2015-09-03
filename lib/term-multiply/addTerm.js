var eqn_utils = require("../utils/eqn_utils");

module.exports = function(term) {
  if(term.type === 1 || term.type === 3) {
    for(var i = 0; i < this.terms.length; i++) {
      if(this.terms[i].equalTo(term, 1) === 1) {
        this.terms[i].pwr += term.pwr;
        if(this.terms[i].pwr === 0) {
          this.terms.splice(i, 1);
        }
        if(term.pwr >= 0) this.coeff *= term.coeff;
        else this.coeff /= term.coeff;
        term.coeff = 1;
        return;
      }
    }
    this.terms.push(term);
    this.terms.sort(eqn_utils.sort_by_vari);
  }
  else if(term.type === 2) {
    for(var i = 0; i < term.terms.length; i++) {
      this.addTerm(term.terms[i]);
    }
  }
  if(term.pwr >= 0) this.coeff *= term.coeff;
  else this.coeff /= term.coeff;
  term.coeff = 1;
};
