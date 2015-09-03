module.exports = function(varRef) {
  var arr = /^(.*?)\[\d+\]$/.exec(this.vari);
  if(arr) varRef[arr[1]] = {Array : 1};
  varRef[this.vari] = varRef[this.vari] || {};
  varRef[this.vari][this.pwr || 1] = 1;
};
