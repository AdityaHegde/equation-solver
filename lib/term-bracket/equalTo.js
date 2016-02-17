//not used
module.exports = function(term, typeOnly) {
  if(this.termStr && term.termStr && !typeOnly) {
    return this.termStr === term.termStr;
  }
  else if(term.type !== 2 || this.terms.length !== term.terms.length) {
    return false;
  }
  else {
    return this.terms.every(function(tterm, i) {
      return tterm.equalTo(term.terms[i], typeOnly);
    }, this);
  }
};
