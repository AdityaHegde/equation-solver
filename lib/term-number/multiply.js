module.exports = function(term, sterm) {
  term.coeff *= this.coeff;
  return term;
};
