module.exports = function(term, typeOnly) {
  if(this.termStr && term.termStr && !typeOnly) {
    if(this.termStr !== term.termStr) return 0;
  }
  else if(term.type !== 2 || this.terms.length !== term.terms.length) {
    return 0;
  }
  else {
    for(var i = 0; i < this.terms.length; i++) {
      if(this.terms[i].equalTo(term.terms[i], typeOnly) === 0) {
        return 0;
      }
    }
  }
  return 1;
};
