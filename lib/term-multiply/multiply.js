module.exports = function(term, sterm) {
  if(term.type === 3) return term.multiply(this, sterm);
  var ts = (term.terms ? term.terms:[term]);
  for(var i = 0; i < ts.length; i++) {
    this.addTerm(ts[i]);
  }
  return this;
};
