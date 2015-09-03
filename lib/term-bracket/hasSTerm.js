module.exports = function(sterm) {
  if(!sterm) return 1;
  for(var i = 0; i < this.terms.length; i++) {
    if(this.terms[i].hasSTerm(sterm) === 1) return 1;
  }
  return 0;
};
