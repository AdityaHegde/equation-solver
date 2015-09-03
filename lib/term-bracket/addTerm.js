module.exports = function(term) {
  if(term.type === 3 && term.pwr === 1) {
    for(var i = 0; i < term.terms.length; i++) {
      this.terms.push(term.terms[i]);
      term.terms[i].coeff *= term.coeff;
    }
  }
  else {
    this.terms.push(term);
  }
};
