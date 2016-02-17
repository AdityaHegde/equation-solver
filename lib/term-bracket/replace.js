module.exports = function(term, withTerm) {
  var replaceThis = this._super(term, withTerm);

  if(replaceThis === this) {
    this.forEachTerm(function(tterm) {
      return tterm.replace(term, withTerm);
    });
    return this.sortAndStringify();
  }

  return replaceThis;
};
