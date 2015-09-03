module.exports = function() {
  this.termStr = this.vari + (this.pwr !== 1 ? "^" + this.pwr : "");
  this.fullStr = this.getCoeffStr() + this.termStr;

  return this;
};
