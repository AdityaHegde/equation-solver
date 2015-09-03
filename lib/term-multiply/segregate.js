module.exports = function(term, pwr) {
  var t = null;
  for(var i = 0; i < this.terms.length; i++) {
    if(this.terms[i].vari === term.vari && (!pwr || this.terms[i].pwr >= pwr)) {
      if(pwr && this.terms[i].pwr > pwr) {
        t = this.terms[i].copy();
        t.pwr = pwr;
        t.coeff = 1;
        this.terms[i].pwr -= pwr;
      }
      else {
        t = this.terms[i];
        this.terms.splice(i, 1);
      }
      break;
    }
  }
  return [t, this];
};
