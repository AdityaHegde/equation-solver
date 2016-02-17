module.exports = function(term, sterm) {
  var retTerm = this;
  switch(term.type) {
    case 0:
      //if 'term' is a simple number, multiply it to coeff and return 'this'
      this.coeff *= term.coeff;
      this.sortAndStringify();
      break;

    case 1:
      //if 'term' is a simple variable term, create a TermMultiply with 'this' and 'term'
      retTerm = this.createTermMultiply({ terms : [this, term] });
      break;

    case 2:
    case 3:
      //if 'term' is a TermBracket or a TermMultiply multiply 'this' to 'term'
      retTerm = term.multiply(this, sterm);
      break;

    default: break;
  }

  return retTerm;
};
