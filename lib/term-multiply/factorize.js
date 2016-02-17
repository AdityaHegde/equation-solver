module.exports = function(term) {
  this.forEachTerm(function(tterm) {
    return tterm.factorize(term);
  });
  return this;
};
