var eqn_utils = require("../utils/eqn_utils");

module.exports = function(term, push) {
  var updatedTerm = term;
  switch(term.type) {
    case 1:
    case 3:
      //if 'term' is a Term or a TermBracket,
      //check whether a similar term is present in variMap
      if(this.variMap[term.vari]) {
        var presentTerm = this.variMap[term.vari][Object.keys(this.variMap[term.vari])[0]];

        delete this.termStrMap[presentTerm.termStr];
        //if similar term was present then update the power
        presentTerm.pwr += term.pwr;
        if(presentTerm.pwr === 0) {
          //if power is zero then remove the term all together
          this.removeTerm(presentTerm);
          updatedTerm = null;
        }
        else {
          presentTerm.sortAndStringify();
          updatedTerm = presentTerm;
        }
      }
      else /*if(push) */{
        //else if 'push' was true then pust the 'term', it will be sorted later
        this.terms.push(term);
      }
      //else {
        //else insert the 'term' in the right place
        //this.insertTerm(term);
      //}

      break;

    case 2:
      //if 'term' is TermMultiply, add the individual terms instead of the whole 'term'
      for(var i = 0; i < term.terms.length; i++) {
        this.addTerm(term.terms[i], push);
      }
      //dont update the vari and termStr maps in this case too
      updatedTerm = null;
      break;

    default: break;
  }

  //update the coeff with the on in the 'term'
  if(term.pwr >= 0) this.coeff *= term.coeff;
  else this.coeff /= term.coeff;
  term.coeff = 1;

  if(updatedTerm) {
    //update the 'variMap' and 'termStrMap'
    this.variMap[updatedTerm.vari] = {};
    this.variMap[updatedTerm.vari][updatedTerm.pwr] = updatedTerm;
    this.termStrMap[updatedTerm.termStr] = updatedTerm;
  }

  this.sortAndStringify();
};
