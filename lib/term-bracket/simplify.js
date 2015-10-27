module.exports = function(sterm) {
  var
  terms = this.terms,
  denominatorTerms = [], denominatorTermsMap = {};
  this.terms = [];

  terms.forEach(function(term) {
    term = term.simplify(sterm);
    if(term) {
      this.addTerm(term);
    }
  }, this);

  /*this.terms.forEach(function(term, i) {
    var termWithNegativePwr;
    if(term.pwr < 0) {
      termWithNegativePwr = term;
    }
    else if(term.type === 2) {
      var termsWithNegativePwrs = term.terms.filter(function(term) {
        return term.pwr < 0;
      });
      if(termsWithNegativePwrs.length > 0) {
        termWithNegativePwr = this.createTermMultiply({terms : termsWithNegativePwrs});
      }
    }

    if(termWithNegativePwr) {
      var denominatorTerm = termWithNegativePwr.copy();
      denominatorTerm.pwr = -denominatorTerm.pwr;

      denominatorTerms.push(denominatorTerm);
      denominatorTermsMap[i] = termWithNegativePwr;
    }
  }, this);

  if(denominatorTerms.length > 0) {
    var hcfOfDenominators = this.getHCFOfTerms(denominatorTerms);

    this.terms = this.terms.map(function(term, i) {
      var hcfOfDenominatorsCopy = hcfOfDenominators.copy();
      if(denominatorTermsMap[i]) {
        hcfOfDenominatorsCopy = hcfOfDenominatorsCopy.multiply(denominatorTermsMap[i]).simplify(sterm);
      }
      hcfOfDenominatorsCopy.pwr = -hcfOfDenominatorsCopy.pwr;
      return term.multiply(hcfOfDenominatorsCopy).simplify();
    });
  }*/

  var t = this.condense();
  if(t && t.type > 0 && t.pwr !== 1) {
    t = t.power(t.pwr, sterm, 1);
  }

  return t;
};
