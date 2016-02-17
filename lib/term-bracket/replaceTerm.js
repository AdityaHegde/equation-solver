/**
 * Replaces 'term' object with 'withTerm' in this.terms array
 */
module.exports = function(term, withTerm) {
  this.removeTerm(term);
  this.addTerm(withTerm);
};
