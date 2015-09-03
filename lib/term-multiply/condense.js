module.exports = function() {
  this.sortAndStringify();
  var terms = this.terms;
  this.terms = [];
  for(var i = 0; i < terms.length - 1; i++) {
    if(terms[i] === 0) continue;
    for(var j = i + 1; j < terms.length; j++) {
      if(terms[j] === 0) continue;
      if(terms[i].equalTo(terms[j]) === 1) {
        terms[i].pwr += terms[j].pwr;
        terms[j] = 0;
      }
    }
    if(terms[i].pwr !== 0) {
      if(terms[i]) {
        this.addTerm(terms[i]);
        this.coeff *= terms[i].coeff;
        terms[i].coeff = 1;
      }
    }
  }
  if(terms[terms.length - 1] !== 0) this.addTerm(terms[terms.length - 1]);
  if(this.terms.length === 1) {
    this.terms[0].coeff *= this.coeff;
    return this.terms.pop();
  }
  if(this.terms.length === 0) return null;
  return this;
};
