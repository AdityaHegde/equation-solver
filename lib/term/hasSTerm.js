module.exports = function(sterm) {
  if(!sterm) return 1;
  if(this.vari && sterm.vari === this.vari) return 1;
  return 0;
};
