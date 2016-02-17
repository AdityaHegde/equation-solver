module.exports = function(term) {
  if(!term || this.vari === term.vari) return true;
  return this.terms.some(function(tterm) {
    return tterm.hasTerm(term);
  });
  return false;
};
