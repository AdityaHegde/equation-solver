module.exports = function(sterm) {
  var terms = this.terms;
  this.terms = [];
  for(var i = 0; i < terms.length; i++) {
    terms[i] = terms[i].simplify(sterm);
    if(terms[i]) this.addTerm(terms[i]);
  }
  var t = this.condense();
  if(t && t.type > 0 && t.pwr !== 1) {
    t = t.power(t.pwr, sterm, 1);
  }

  return t;
};
