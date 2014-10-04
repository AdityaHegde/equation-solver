var factorial = {
  factorialMap : {
    0 : 1,
    1 : 1,
    2 : 2,
    3 : 6,
    4 : 24,
  },
  getFactorial : function(n) {
    if(this.factorialMap[n]) return this.factorialMap[n];
    var factorial = n * this.getFactorial(n - 1);
    this.factorialMap[n] = factorial;
    return factorial;
  },
};

module.exports = factorial;
