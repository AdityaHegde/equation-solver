module.exports = function() {
  var
  str = "",
  idx = this.INDEX_MAP[this.vari.charAt(0)];

  if(idx || idx === 0) {
    str += this.vari.substr(1) + "[" + idx + "]";
  }
  else {
    str += this.vari;
  }
  if(this.pwr !== 1) {
    str = "Math.pow(" + str +", " + this.pwr + ")";
  }
  if(this.coeff && this.coeff !== 1) {
    str = this.coeff + "*" + str;
  }
  return str;
};
