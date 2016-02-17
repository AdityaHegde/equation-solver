module.exports = function(term) {
  //if no sterm was specified then return 1, cos all sterm checks are to simplify or not
  //and we want to simpify everything if no sterm was specified
  if(!term) return true;
  //else check vari
  return this.vari === term.vari;
};
