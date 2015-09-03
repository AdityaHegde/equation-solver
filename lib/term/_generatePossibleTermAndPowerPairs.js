var eqn_utils = require("../utils/eqn_utils");

//for a^4b^2c :  (a^2)^2(b)^2c, (a^2)^2b^2c, a^4b^2c, etc
module.exports = function(terms) {
  terms = terms || this.terms || [];
  //terms and powers
  var tsnps = [];
  for(var i = 0; i < terms.length; i++) {
    //possible power pairs
    //powers for terms
    var ppp = eqn_utils.factors.getPairsOfFactors(terms[i].pwr), psft = [];
    for(var j = 0; j < ppp.length; j++) {
      psft.push([this.createTerm({vari : terms[i].vari, pwr : ppp[j][0]}), ppp[j][1]]);
    }
    psft = psft.sort(function(a, b) {
      return eqn_utils.sort_term(a[0], b[0]);
    });
    tsnps.push(psft);
  }
  return eqn_utils.combinations.selectionProblem(tsnps);
};
