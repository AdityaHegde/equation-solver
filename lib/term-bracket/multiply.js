module.exports = function(term, sterm) {
  var terms, retTerm = this;
  switch(term.type) {
    case 0:
    case 1:
    case 2:
      this.forEachTerm(function(tterm) {
        var t1 = term.copy();
        return tterm.multiply(t1, sterm);
      });

      break;

    case 3:
      if(this.pwr / Math.abs(this.pwr) !== term.pwr / Math.abs(term.pwr)) {
        retTerm = this.createTermMultiply({terms : [this, term]});
      }
      else {
        terms = this.terms;
        this.clearTerms();
        terms.forEach(function(tterm1) {
          term.terms.forEach(function(tterm2) {
            var
            t1 = tterm1.copy(),
            t2 = tterm2.copy(),
            mt = t1.multiply(t2, sterm);
            //console.log(mt);
            this.addTerm(mt);
          }, this);
        }, this);
      }

      break;
  }
  retTerm.sortAndStringify();
  return retTerm;
};
