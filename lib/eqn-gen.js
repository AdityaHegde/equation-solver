var
inheritance = require("./utils/inheritance.js"),
eqn_utils = require("./utils/eqn_utils.js"),
Term = require("./term/Term.js"),
TermNumber = require("./term-number/TermNumber.js"),
TermBracket = require("./term-bracket/TermBracket.js"),
TermMultiply = require("./term-multiply/TermMultiply.js");
Term.TermNumber = TermNumber;
Term.TermBracket = TermBracket;
Term.TermMultiply = TermMultiply;

function EqnGen(config) {
  EqnGen.parent.call(this, config);

  this.equations = this.equations || [];
  this.unknowns = this.unknowns || {};
  this.vars = {};
  this.lhsTerms = this.lhsTerms || [];
  var unknsF = 1;//(this.unknowns.length === 0);

  for(var i = 0; i < this.equationStrings.length; i++) {
    var eqn = new Eqn({equationString : this.equationStrings[i]}),
        lhsTerm = new Term({vari : this.lhsVariables[i], op : "+"});
    this.equations.push(eqn);
    for(var v in eqn.vars) {
      this.vars[v] = this.vars[v] || [];
      this.vars[v].push(i);
    }
    this.lhsTerms.push(lhsTerm);
    if(unknsF) this.unknowns[this.lhsVariables[i]] = 1;
  }
}

inheritance.inherit(inheritance.Base, EqnGen, {

  simplify : function() {
    for(var i = 0; i < this.equationStrings.length; i++) {
      if(i !== this.mainIndex) this.equations[i].simplify(this.lhsTerms[this.mainIndex]);
      this.equations[i].getVars(this.unknowns);
    }
  },

  buildMainEqn : function() {
    for(var i = 0; i < this.equations.length; i++) {
      if(i !== this.mainIndex) {
        this.equations[this.mainIndex].replace(this.lhsTerms[i], this.equations[i].equation, this.lhsTerms[this.mainIndex]);
      }
    }
    this.equations[this.mainIndex].simplify(this.lhsTerms[this.mainIndex]);
    this.equations[this.mainIndex].getVars(this.unknowns);
  },

  getMainEqn : function() {
    return this.equations[this.mainIndex].sortAndStringify().fullStr;
  },

  segregate : function() {
    this.equations[this.mainIndex].segregate(this.lhsTerms[this.mainIndex]);
    this.equations[this.mainIndex].sortAndStringify();
    this.equations[this.mainIndex].factorize(this.lhsTerms[this.mainIndex]);
    this.equations[this.mainIndex].getVars(this.unknowns);
    this.equations[this.mainIndex].sortAndStringify();
    this.equations[this.mainIndex].segregated = this.equations[this.mainIndex].segregated.condense();
    return this.equations[this.mainIndex].segregated.sortAndStringify().fullStr;
  },

  convertToString : function() {
    var str = "";
    for(var i = 0; i < this.equations.length; i++) {
      if(i === this.mainIndex) str += "M: ";
      if(this.lhsTerms[i].vari) str += this.lhsTerms[i].vari+" = ";
      str += this.equations[i].sortAndStringify().fullStr;
      if(i < this.equations.length - 1) str += "<br>";
    }
    return str;
  },

  factorize : function() {
    this.equations[this.mainIndex].factorize(this.lhsTerms[this.mainIndex]);
  },

  getCode : function() {
    var mainEqn = this.equations[this.mainIndex], mainTerm = this.lhsTerms[this.mainIndex],
        code = "", eqns = [], varsUsed = {};
    for(var i = 0; i < this.equations.length; i++) {
      eqns.push(this.equations[i].copy());
    }
    eqns[this.mainIndex] = 0;
    for(var i = 0; i < this.equations.length; i++) {
      if(this.equations[i].hasUnknowns === 0) {
        if(!this.equations[i]) this.equations[i].segregate(this.lhsTerms[i]);
        code += EqnSolver.solve_single_var_master(eqns, this.lhsTerms[i], this.equations[i], this.unknowns, this.lhsTerms, varsUsed);
        this.equations[i] = 0;
      }
    }
    code += EqnSolver.solve_single_var_master(eqns, mainTerm, mainEqn, this.unknowns, this.lhsTerms, {});
    return code;
  },

  sortAndStringify : function() {
    this.equations[this.mainIndex].sortAndStringify();
  },

  getSortedStr : function() {
    return this.equations[this.mainIndex].getSortedStr();
  },

});

module.exports = EqnGen;
