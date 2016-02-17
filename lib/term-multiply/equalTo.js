//not used
module.exports = function(term, typeOnly) {
  if(!typeOnly) {
    if(this.termStr === term.termStr) return true;
  }
  else if(term.terms && this.terms.length === term.terms.length) {
    for(var i = 0; i < this.terms.length; i++) {
      if(!this.terms[i].equalTo(term.terms[i], typeOnly)) {
        return false;
      }
    }
    return true;
  }
  return false;
};
