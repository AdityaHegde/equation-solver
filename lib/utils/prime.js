var
prime = {
  //TODO : check why it breaks for very large numbers
  primeMap : {
    1 : 1,
    2 : 1,
    3 : 1,
    4 : 0,
    5 : 1,
    6 : 0,
    7 : 1,
    8 : 0,
    9 : 0,
  },
  isPrime : function(n) {
    if(prime.primeMap[n]) return prime.primeMap[n];
    else {
      var s = Math.round(Math.sqrt(n)), isPrime = 1;
      for(var i = 2; i <= s; i++) {
        if(n % i === 0) {
          isPrime = 0;
          break;
        }
      }
      prime.primeMap[n] = isPrime;
      return isPrime;
    }
  },
};
module.exports = prime;
