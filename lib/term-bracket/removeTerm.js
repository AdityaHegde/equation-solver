module.exports = function(term) {
  var idx = this.terms.indexOf(term);

  if(idx !== -1) {
    this.terms.splice(idx, 1);
    delete this.variMap[term.vari][term.pwr];
    if(Object.keys(this.variMap[term.vari]).length === 0) {
      delete this.variMap[term.vari];
    }

    delete this.termStrMap[term.termStr];
  }

  this.sortAndStringify();
};
