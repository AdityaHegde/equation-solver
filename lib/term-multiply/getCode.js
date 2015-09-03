module.exports = function () {
  var str = (this.coeff && this.coeff !== 1 ? this.coeff+"*":"");
  for(var i = 0; i < this.terms.length; i++) {
    var s = this.terms[i].getCode();
    if(s != "1") {
      str += ""+s;
      if(this.terms.length > 1 && i < this.terms.length - 1) str += "*";
    }
  }
  if(this.pwr && this.pwr !== 1) str = "Math.pow(" + str +", " + this.pwr + ")";
  return str;
};
