module.exports = function(term, typeOnly) {
  if(this.termStr && term.termStr && !typeOnly) {
    if(this.termStr === term.termStr) return 1;
  }
  else if(term.terms && this.terms.length === term.terms.length) {
    for(var i = 0; i < this.terms.length; i++) {
      if(this.terms[i].equalTo(term.terms[i], typeOnly) === 0) {
        return 0;
      }
    }
    return 1;
  }
  return 0;
};
