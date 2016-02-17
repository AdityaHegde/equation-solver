module.exports = function(fn) {
  var terms = this.terms;
  this.clearTerms();
  terms.forEach(function(term, i, terms) {
    term = fn.call(this, term, i, terms);
    if(term) {
      this.addTerm(term);
    }
  }, this);
};
