module.exports = function(term, typeOnly) {
  if(typeOnly) {
  //if typeOnly then only check the core variable
  //eg : in a^5, equalTo with a and typeOnly will be true
    if(this.vari === term.vari) return 1
  }
  else {
  //else check the termStr without the coeffecient
    if(this.termStr === term.termStr) return 1
  }
  return 0;
};
