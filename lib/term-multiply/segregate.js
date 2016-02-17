module.exports = function(term, pwr) {
  var segregateThis = this.getTermClass().prototype.segregate.call(this, term, pwr);

  if(segregateThis[0]) {
    return segregateThis;
  }
  else {
    var t = null;
    //TODO : short the loop once segrated term is found
    this.forEachTerm(function(tterm) {
      var segregated = tterm.segregate(term, pwr);

      if(segregated[0]) {
        t = segregated[0];
      }

      return segregated[1];
    });
    return [t, this];
  }
};
