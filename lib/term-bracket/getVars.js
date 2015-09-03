module.exports = function(varRef) {
  for(var i = 0; i < this.terms.length; i++) {
    this.terms[i].getVars(varRef);
  }
};
