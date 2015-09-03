module.exports = function(term, sterm) {
  if(term.type > 1) {
    //if 'term' is a TermBracket or a TermMultiply multiply 'this' to 'term'
    return term.multiply(this, sterm);
  }
  else if(term.type === 0) {
    //else if term is a simple number, multiply it to coeff and return 'this'
    this.coeff *= term.coeff;
    return this;
  }

  //else create a TermMultiply with 'this' as a child term
  var t = this.createTermMultiply({terms : [this]});
  //and multiply 'term' to it
  return t.multiply(term, sterm);
};
