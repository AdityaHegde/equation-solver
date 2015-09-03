module.exports = function(term, withTerm) {
  for(var i = 0; i < this.terms.length; i++) {
    this.terms[i] = this.terms[i].replace(term, withTerm);
  }
  return this;
};
