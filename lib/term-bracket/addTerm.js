module.exports = function(term) {
  if(term.type === 3 && term.pwr === 1) {
    term.terms.forEach(function(tterm) {
      tterm.coeff *= term.coeff;
      this.addTerm(tterm);
    }, this);
  }
  else {
    //console.log(term);
    if(this.variMap[term.vari] && this.variMap[term.vari][term.pwr]) {
      this.variMap[term.vari][term.pwr].coeff += term.coeff;
      if(this.variMap[term.vari][term.pwr].coeff === 0) {
        this.removeTerm(this.variMap[term.vari][term.pwr]);
      }
    }
    else {
      this.variMap[term.vari] = this.variMap[term.vari] || {};
      this.variMap[term.vari][term.pwr] = term;
      this.termStrMap[term.termStr] = term;
      this.terms.push(term);
    }
  }
  this.sortAndStringify();
};
