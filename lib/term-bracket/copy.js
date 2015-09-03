module.exports = function() {
  var c = this.createTermBracket({pwr : this.pwr, terms : []});
  for(var i = 0; i < this.terms.length; i++) {
    c.addTerm(this.terms[i].copy());
  }
  return c;
};
