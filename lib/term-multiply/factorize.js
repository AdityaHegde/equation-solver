module.exports = function(sterm) {
  for(var i = 0; i < this.terms.length;) {
    var rett = this.terms[i].factorize(sterm);
    if(this.terms[i].type === 3) {
      if(rett.type !== 2) {
        this.terms.splice(i, 1);
        this.addTerm(rett);
      }
      else {
        this.terms[i] = rett;
        i++;
      }
    }
    else {
      this.terms[i] = rett;
      i++;
    }
  }
  return this;
};
