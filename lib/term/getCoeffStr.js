module.exports = function() {
  var coeffStr = "";
  if(this.coeff !== 1) {
    if(this.coeff === -1) {
      coeffStr = "-";
    }
    else {
      coeffStr = this.coeff + "";
    }
  }
  return coeffStr;
};
