module.exports = function() {
  var c = this.createTermMultiply({pwr : this.pwr, coeff : this.coeff, terms : []});
  this.terms.forEach(function(term) {
    c.addTerm(term.copy());
  });
  return c;
};
