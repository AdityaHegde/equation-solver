var utils = {
  strcmp : function(a, b) {
    return a.length === b.length ? (a > b ? 1 : -1) : (a.length > b.length ? 1 : -1);
  },

  strcmp1 : function(a, b) {
    return a.length === b.length ? (a == b ? 0 : (a > b ? 1 : -1)) : (a.length > b.length ? 1 : -1);
  },

  heapcmp : function(a, b) {
    if(a.value === b.value) {
      return utils.strcmp1(a.key, b.key);
    }
    return b.value - a.value;
  },

  sort_fun : function(a, b) {
    return a === b ? 0 : (a > b ? 1 : -1);
  },

  sort_term : function(a, b) {
    if(a.vari === b.vari) {
      return utils.strcmp1(a.termStr, b.termStr);
    }
    return utils.strcmp1(a.vari, b.vari);
  },

  sort_by_vari : function(a, b) {
    return b.vari < a.vari;
  },

  //heap : require("./heap.js"),
  factors : require("./factors.js"),
  prime : require("./prime.js"),
  subsets : require("./subsets.js"),
  combinations : require("./combinations.js"),
  factorial : require("./factorial.js"),

  degToRad : function(deg) {
    return deg*Math.PI/180;
  },

  hcf : function(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while(a - b !== 0) {
      var a1 = Math.max(a, b), b1 = Math.min(a, b);
      a = b1;
      b = a1 - b1;
    }
    return b;
  },

  distributePwrsFor_N_R : {
    //n - total power
    //r - terms count
    //sum of pwrs of r terms = n

    _getPwrsFor_N_R : function(n, r, pwrs, cur, curTotal) {
      if(curTotal === n) {
        var allPwrs = [];
        for(var i = 0; i < pwrs.length; i++) {
          allPwrs.push(pwrs[i]);
        }
        for(var i = pwrs.length; i < r; i++) {
          allPwrs.push(0);
        }
        return [allPwrs];
      }
      if(cur === r) {
        return [];
      }
      var retPwrs = [];
      for(var i = 0; i <= n - curTotal; i++) {
        pwrs[cur] = i;      
        var pwrsFrmChild = utils.distributePwrsFor_N_R._getPwrsFor_N_R(n, r, pwrs, cur + 1, curTotal + pwrs[cur]);
        for(var j = 0; j < pwrsFrmChild.length; j++) {
          retPwrs.push(pwrsFrmChild[j]);
        }
      }
      pwrs[cur] = 0;
      return retPwrs;
    },
    pwrsFor_N_RMap : {},
    distributePwrsFor_N_R : function(n, r) {
      var key = n+"__"+r;
      if(utils.distributePwrsFor_N_R.pwrsFor_N_RMap[key]) utils.distributePwrsFor_N_R.pwrsFor_N_RMap[key];
      var val = utils.distributePwrsFor_N_R._getPwrsFor_N_R(n, r, [], 0, 0);
      utils.distributePwrsFor_N_R.pwrsFor_N_RMap[key] = val;
      return val;
    },
  },

  //coeffs for (a1+a2+...ar)^n
  //each = (n!/(p1!*p2!...pr!))
  coeffsForRaiseToPwr : {
    coeffsMap : {},
    coeffMap : {},
    getCoeffs : function(n, r) {
      var key = n+"__"+r;
      if(utils.coeffsForRaiseToPwr.coeffsMap[key]) return utils.coeffsForRaiseToPwr.coeffsMap[key];
      var coeffs = [], dist = utils.distributePwrsFor_N_R.distributePwrsFor_N_R(n, r),
          coeffMap = {};
      for(var i = 0; i < dist.length; i++) {
        coeffs.push(utils.coeffsForRaiseToPwr.getCoeffForAPwrSet(n, dist[i]));
      }
      utils.coeffsForRaiseToPwr.coeffsMap[key] = coeffs;
      return coeffs;
    },

    getCoeffForAPwrSet : function(n, pwrSet) {
      var key = n+"__"+pwrSet.join("__");
      if(utils.coeffsForRaiseToPwr.coeffMap[key]) return utils.coeffsForRaiseToPwr.coeffMap[key];
      var coeff = utils.factorial.getFactorial(n);
      for(var j = 0; j < pwrSet.length; j++) {
        coeff /= utils.factorial.getFactorial(pwrSet[j]);
      }
      utils.coeffsForRaiseToPwr.coeffMap[key] = coeff;
      return coeff;
    },
  },

};

module.exports = utils;
