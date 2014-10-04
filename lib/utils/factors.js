var
prime = require("./prime.js"),
subsets = require("./subsets.js"),
factors = {
  primeFactorsMap : {},
  getPrimeFactors : function(n) {
    if(this.primeFactorsMap[n]) return this.primeFactorsMap[n];
    if(prime.isPrime(n)) {
      this.primeFactorsMap[n] = [n];
      return [n];
    }
    var _n = n, i = 2, factors = [];
    while(i <= _n) {
      if(_n % i === 0) {
        factors.push(i);
        _n /= i;
      }
      else {
        i++;
        while(!prime.isPrime(i) && i < _n) {
          i++;
        }
      }
    }
    this.primeFactorsMap[n] = factors;
    return factors;
  },

  pairsOfFactors : {},
  getPairsOfFactors : function(n) {
    if(this.pairsOfFactors[n]) return this.pairsOfFactors[n];
    var factors = this.getPrimeFactors(n),
        subsetsOfFactors = subsets.getSubsets(factors),
        pairsOfFactors = [], presentMap = {};
    for(var i = 0; i < subsetsOfFactors.length; i++) {
      var a = 1, b = 1;
      for(var j = 0; j < subsetsOfFactors[i][0].length; j++) {
        a *= subsetsOfFactors[i][0][j];
      }
      for(var j = 0; j < subsetsOfFactors[i][1].length; j++) {
        b *= subsetsOfFactors[i][1][j];
      }
      if(!presentMap[a+"__"+b]) pairsOfFactors.push([a, b]);
      presentMap[a+"__"+b] = 1;
    }
    this.pairsOfFactors[n] = pairsOfFactors;
    return pairsOfFactors;
  },
};

module.exports = factors;
