var eqn_utils = require("../utils/eqn_utils");

//for a^2bc, expand (a+b+c)^4
//give a better function name
module.exports = function(terms, pwrs, pwr) {
  if(!pwr) {
    pwr = 0;
    for(var i = 0; i < pwrs.length; i++) {
      pwr += pwrs[i];
    }
  }
  var pwrDist = eqn_utils.distributePwrsFor_N_R.distributePwrsFor_N_R(pwr, terms.length),
      //coeffs = eqn_utils.coeffsForRaiseToPwr.getCoeffs(pwr, terms.length),
      retTermSets = [];
  for(var i = 0; i < pwrDist.length; i++) {
    var retTermSet = [];
    for(var j = 0; j < pwrDist[i].length; j++) {
      var t = terms[j].copy();
      t.power(pwrDist[i][j]);
      if(t) {
        t.sortAndStringify();
      }
      retTermSet.push(t);
    }
    //TODO : use binary insertion instead of .push and .sort
    retTermSet.sort(eqn_utils.sort_term);
    retTermSets.push(retTermSet);
  }
  return retTermSets;
};
