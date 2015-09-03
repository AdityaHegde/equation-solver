module.exports = function() {
  var c = this.createTermMultiply({pwr : this.pwr, coeff : this.coeff, terms : []});
  for(var i = 0; i < this.terms.length; i++) {
    c.addTerm(this.terms[i].copy());
  }
  return c;
};
