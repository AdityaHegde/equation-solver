module.exports = function(term, sterm) {
  if(term.type < 3) {
    for(var i = 0; i < this.terms.length; i++) {
      var t1 = term.copy();
      this.terms[i] = this.terms[i].multiply(t1, sterm);
    }
  }
  else {
    var terms = this.terms;
    this.terms = [];
    for(var i = 0; i < terms.length; i++) {
      for(var j = 0; j < term.terms.length; j++) {
        var t1 = terms[i].copy(),
            t2 = term.terms[j].copy(),
            mt;
        mt = t1.multiply(t2);
        this.terms.push(mt);
      }
    }
  }
  this.sortAndStringify();
  return this;
};
