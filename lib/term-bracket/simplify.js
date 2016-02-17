module.exports = function(sterm) {
  var
  denominatorTerms = [], denominatorTermsMap = {};

  this.forEachTerm(function(term, i) {
    term = term.simplify(sterm);
    if(term) {
      /*var termWithNegativePwr;
      if(term.pwr < 0) {
        termWithNegativePwr = term;
      }
      else if(term.type === 2) {
        var termsWithNegativePwrs = term.terms.filter(function(term) {
          return term.pwr < 0;
        });
        if(termsWithNegativePwrs.length > 1) {
          termWithNegativePwr = this.createTermMultiply({terms : termsWithNegativePwrs});
        }
        else if(termsWithNegativePwrs.length === 1) {
          termWithNegativePwr = termsWithNegativePwrs[0];
        }
      }

      if(termWithNegativePwr) {
        var denominatorTerm = termWithNegativePwr.copy();
        denominatorTerm.pwr = -denominatorTerm.pwr;

        denominatorTerms.push(denominatorTerm);
        denominatorTermsMap[i] = termWithNegativePwr;
      }*/
    }

    return term;
  });

  /*if(denominatorTerms.length > 0) {
    var hcfOfDenominators = this.getHCFOfTerms(denominatorTerms);

    this.forEachTerm(function(term) {
      var hcfOfDenominatorsCopy = hcfOfDenominators.copy();
      if(denominatorTermsMap[i]) {
        hcfOfDenominatorsCopy = hcfOfDenominatorsCopy.multiply(denominatorTermsMap[i]).simplify(sterm);
      }
      hcfOfDenominatorsCopy.pwr = -hcfOfDenominatorsCopy.pwr;
      return term.multiply(hcfOfDenominatorsCopy).simplify();
    });

    this.addTerm(hcfOfDenominators);
  }*/

  var t = this.condense();
  if(t && t.type > 0 && t.pwr !== 1) {
    t = t.power(t.pwr, sterm, 1);
  }

  return t;
};
