module.exports = function() {
  this.forEachTerm(function(term) {
    return term.condense();
  });

  if(this.terms.length === 1) {
    this.terms[0].coeff *= this.coeff;
    return this.terms.pop();
  }
  if(this.terms.length === 0) return this.createTermNumber({coeff : this.coeff});
  return this;
};
