var
eqn_utils = require("./utils/eqn_utils.js"),
inheritance = require("./utils/inheritance.js"),
Tokens = require("./eqn-tokens.js");

var operators = {
  '+' : 1,
  '-' : 1,
  '*' : 1,
  '/' : 1,
},
NUMBER_REGEX = /^[0-9]*(?:\.[0-9]+)?$/,
indexMap = {
  'x' : 0,
  'y' : 1,
  'z' : 2,
};

function Term(config) {
  Term.parent.call(this, config);
  this.type = 0;
  //to add it to json object
  this.key = this.key;

  this.pwr = this.pwr || 1;
  this.coeff = this.coeff || 1;
  
  this.init();
}

Term.sortFun = function(a, b) {
  return b.vari < a.vari;
};
inheritance.inherit(inheritance.Base, Term, {

  key : "Term",

  init : function() {
    this.vari = this.vari || "";
    this.coeff = Number(this.coeff) || 1;
  },

  fromString : function(str) {
    str = str.replace(/\s+/g, " ");
    str = str.replace(/([^\s])(\(|\)|\+|-|\*|\/|\^)([^\s])/g, "$1 $2 $3");
    str = str.replace(/(\(|\)|\+|-|\*|\/|\^)([^\s])/g, "$1 $2");
    str = str.replace(/([^\s])(\(|\)|\+|-|\*|\/|\^)/g, "$1 $2");
    var tokens = new Tokens(str.split(" "));
    return this.parse(tokens);
  },

  parse : function(tokens) {
    var t = tokens.next();
    this.vari = "";
    //if the term begins with an operator
    if(operators[t]) {
      this.op = t;
      if(this.op === "-") {
        //if operator is -, negate coeff and set operator to +
        this.coeff = -this.coeff;
        this.op = "+";
      }
      else if(this.op === "/") {
        //if operator is /, negate pwr and set operator to *
        this.coeff = 1/this.coeff;
        this.op = "*";
        if(this.pwr) this.pwr = -this.pwr;
      }
      t = tokens.next();
    }
    if(t === "(") {
      //if the next token is an open brace, put the operator and bracket back and parse TermBracket
      tokens.back(2);
      return new Term.TermBracket({terms : []}).parse(tokens);
    }
    var isNum = 0;
    if(NUMBER_REGEX.exec(t)) {
      //if the next token is a number, assign it to coeff
      this.coeff *= Number(t);
      t = tokens.next();
      isNum = 1;
    }
    if(operators[t]) {
      if(t === "+" || t === "-" || t === ")") {
        //if next token is +/-/), put back the operator and start parsing next term
        tokens.back();
        return this;
      }
      else {
        /*if(isNum === 1) {
          tokens.back();
          return this;
        }*/
        if(t === "*" || t === "/") {
          //if operator is /, negate pwr
          if(t === "/") this.pwr = -this.pwr;
          t = tokens.next();
        }
        else if(t === "^") {
          //if operator is ^, compute pwr
          t = tokens.next();
          this.coeff = Math.pow(this.coeff, Number(t));
          return this;
        }
      }
    }
    //the next token is always a vairable
    this.vari = t;
    t = tokens.next();
    if(t === "^") {
      //if next token is ^, compute pwr
      t = tokens.next();
      if(t === "-") {
        //negate the pwr if token operate is -
        this.pwr = -this.pwr;
        t = tokens.next();
      }
      this.pwr *= Number(t);
      return this;
    }
    if(t) tokens.back();
    return this;
  },

  equalTo : function(term, typeOnly) {
    //if sortStr is calculated, compare them
    if(this.sortStr && term.sortStr) {
      if(this.sortStr === term.sortStr) return 1
    }
    else if(term.vari) {
      if(this.vari === term.vari && (typeOnly || this.pwr === term.pwr)) return 1
    }
    //else if(Ember.isEmpty(term.vari) && Ember.isEmpty(this.vari)) return 1;
    return 0;
  },

  add : function(term) {
    //if the terms are equal (var and pwr) then add them
    if(this.equalTo(term) === 1) {
      this.coeff = this.coeff + term.coeff;
      return 1;
    }
    return 0;
  },

  power : function(pwr) {
    if(pwr !== 0) {
      //multiply the pwr and raise coeff
      this.pwr = (this.pwr ? this.pwr * pwr : pwr);
      this.coeff = Math.pow(this.coeff, pwr);
      return this;
    }
    else {
      this.pwr = 0;
    }
    return null;
  },

  simplify : function(sterm) {
    return this;
  },

  condense : function() {
    this.sortAndStringify();
    return this;
  },

  multiply : function(term, sterm) {
    //if 'term' is a TermBracket or a TermMultiply multiply 'this' to 'term'
    if(term.type > 0) return term.multiply(this, sterm);
    //else create a TermMultiply with 'this' as a child term
    var t = new Term.TermMultiply({terms : [this]});
    //and multiply 'term' to it
    return t.multiply(term, sterm);
  },

  copy : function() {
    return new Term({coeff : this.coeff, vari : this.vari, pwr : this.pwr, op : this.op});
  },

  replace : function(term, withTerm) {
    //the place where the replace actually happens
    //replace only if 'this' is the same variable as 'term'
    if(term.vari && term.vari === this.vari) {
      //create a copy of 'withTerm'
      var ret = withTerm.copy();
      //multiply pwr of 'this' to it
      ret.pwr *= this.pwr;
      if(ret.type === 3) {
        //if 'ret' is a TermBracket, multiply coeff to each term
        for(var i = 0; i < ret.terms.length; i++) {
          ret.terms[i].coeff *= this.coeff;
        }
      }
      else {
        //else multiply the coeff to 'ret' itself
        ret.coeff *= this.coeff;
      }
      return ret;
    }
    return this;
  },

  segregate : function(term, pwr) {
    var t = null;
    //execute only if it is 'this' is the same variable as 'term'
    //and has a greater pwr that the one passed, if passed
    if(this.vari === term.vari && (!pwr || this.pwr >= pwr)) {
      //create a copy of 'this'
      t = this.copy();
      t.coeff = 1;
      if(pwr && this.pwr > pwr) {
        //if a 'pwr' is passed, segragate only that portion of pwr
        this.pwr -= pwr;
        t.pwr = pwr;
      }
      else {
        //else segregate all of the var and retain a number
        this.vari = "";
        this.pwr = 1;
      }
    }
    return [t, this];
  },

  hasSTerm : function(sterm) {
    if(!sterm) return 1;
    if(this.vari && sterm.vari === this.vari) return 1;
    return 0;
  },

  convertToString : function () {
    if(this.vari) {
      return (this.coeff !== 1 ? (this.coeff < 0 ? "("+this.coeff+")":this.coeff):"") + this.vari + (this.pwr !== 1 ? "^"+this.pwr : "");
    }
    else {
      return (this.coeff < 0 ? "("+this.coeff+")":this.coeff);
    }
  },

  //for a^2bc, expand (a+b+c)^4
  //give a better function name
  _generateTermsForPower : function(terms, pwrs, pwr) {
    if(!pwr) {
      pwr = 0;
      for(var i = 0; i < pwrs.length; i++) {
        pwr += pwrs[i];
      }
    }
    var pwrDist = eqn_utils.distributePwrsFor_N_R.distributePwrsFor_N_R(pwr, terms.length),
        //coeffs = eqn_utils.coeffsForRaiseToPwr.getCoeffs(pwr, terms.length),
        retTermSets = [];
    for(var i = 0; i < pwrDist.length; i++) {
      var retTermSet = [];
      for(var j = 0; j < pwrDist[i].length; j++) {
        var t = terms[j].copy();
        t.power(pwrDist[i][j]);
        retTermSet.push(t);
      }
      retTermSets.push(retTermSet);
    }
    return retTermSets;
  },

  //for a^4b^2c :  (a^2)^2(b)^2c, (a^2)^2b^2c, a^4b^2c, etc
  _generatePossibleTermAndPowerPairs : function(terms) {
    terms = terms || this.terms || [];
    //terms and powers
    var tsnps = [];
    for(var i = 0; i < terms.length; i++) {
      //possible power pairs
      //powers for terms
      var ppp = eqn_utils.factors.getPairsOfFactors(terms[i].pwr), psft = [];
      for(var j = 0; j < ppp.length; j++) {
        psft.push([new Term({vari : terms[i].vari, pwr : ppp[j][0]}), ppp[j][1]]);
      }
      tsnps.push(psft);
    }
    return eqn_utils.combinations.selectionProblem(tsnps);
  },

  _type1_add_tkey : function(termHeap, termRef, termsMeta, tkey, addNew) {
    if(termRef[1].tref[tkey]) {
      for(var i = 0; i < termRef[1].tref[tkey].bts.length; i++) {
        var p = termRef[1].tref[tkey].bts[i];
        if(p.tref[tkey].present === 0) {
          this._type1_add_tkey_to_bt(termHeap, p, termsMeta, tkey, this.coeff);

          //modify the heap
          eqn_utils.heap.modified(termHeap, p.href, Term.TermBracket.heapcmp);
        }
      }
      //update the coeff of the term entry
      termRef[1].tref[tkey].coeff = this.coeff;
    }
    else if(addNew) {
      termRef[1].tref[tkey] = {bts : [], coeff : this.coeff, terms : [this.copy()]};
    }
  },

  _type1_add_tkey_to_bt : function(termHeap, bt, termsMeta, tkey, coeff) {
    //set the present boolean to true (1) in the hash map of terms within the bracket data
    bt.tref[tkey].present = 1;
    //set the present coeff
    bt.tref[tkey].presCoeff = coeff;

    //if the coeff of the present term is equal to the expected term,
    //no additional term will have to be added to complete the bracket with power expansion
    //so increase the value of the heap element
    if(coeff === bt.tref[tkey].exCoeff) {
      bt.href.value += bt.tref[tkey].oprns;
    }
  },

  processForFactorization : function(termHeap, termRef, termsMeta, seperate) {
    if(this.vari) {
      var key;
      for(var i = 1; i <= this.pwr; i++) {
        key = this.vari+"--"+i;
        if(termRef[0][key]) {
          termRef[0][key].value += i;
          termRef[0][key].terms.push(termsMeta.curParent || this);
          eqn_utils.heap.modified(termHeap, termRef[0][key], Term.TermBracket.heapcmp);
        }
        else {
          termRef[0][key] = {
            //no of operations decreased
            value : -1,
            //type, 0 - simple term occurance
            type : 0,
            //key
            key : this.vari,
            //pwr
            pwr : i,
            //terms having this var
            terms : [termsMeta.curParent || this],
          };
          eqn_utils.heap.insert(termHeap, termRef[0][key], Term.TermBracket.heapcmp);
        }
      }
      if(seperate) {
        this._type1_add_tkey(termHeap, termRef, termsMeta, key, 1);
      }
    }
  },

  _type1_remove_tkey : function(termHeap, termRef, termsMeta, tkey) {
    //console.log("-----");
    //console.log(tkey);
    for(var i = 0; i < termRef[1].tref[tkey].bts.length;) {
      var p = termRef[1].tref[tkey].bts[i],
      modified = 0;
      //if expected coeff is equal to present coeff,
      //the term will be removed, so set present to 0
      //update the heap value of the bracket term
      //console.log("--");
      //console.log(p.tref[tkey]);
      //console.log(p.href);
      //console.log(p.href.key);
      if(p.tref[tkey].presCoeff === p.tref[tkey].exCoeff) {
        p.href.value -= p.tref[tkey].oprns;
        modified = 1;
        p.tref[tkey].present = 0;
        //console.log("removed from : " + p.href.key);
      }
      //update the present coeff
      p.tref[tkey].presCoeff = p.tref[tkey].presCoeff - p.tref[tkey].exCoeff;

      if(p.href.value <= 0) {
        //if value is negative or zero, remove it from heap
        eqn_utils.heap.removeEle(termHeap, p.href, Term.TermBracket.heapcmp);
        //console.log("removed bracket term " + p.href.key);
        //console.log(termHeap);
        delete termRef[1].btref[p.href.key];
        termRef[1].tref[tkey].bts.splice(i, 1);
        
        for(var t in p.tref) {
          if(p.tref.hasOwnProperty(t)) {
            for(var j = 0; j < termRef[1].tref[t].bts.length; j++) {
              if(termRef[1].tref[t].bts[j].href.key === p.href.key) {
                termRef[1].tref[t].bts.splice(j, 1);
                break;
              }
            }
          }
        }
      }
      else {
        //else call modify and increment i
        eqn_utils.heap.modified(termHeap, p.href, Term.TermBracket.heapcmp);
        i++;
      }
    }
    delete termRef[1].tref[tkey].coeff;
  },

  processForRemovalByFactorization : function(termHeap, termRef, termsMeta, seperate) {
    if(this.vari) {
      var key;
      for(var i = 1; i <= this.pwr; i++) {
        key = this.vari+"--"+i;
        if(termRef[0][key]) {
          //decrease the value
          termRef[0][key].value -= i;
          //remove from terms array for this vari
          termRef[0][key].terms.splice(termRef[0][key].terms.indexOf(termsMeta.curParent || this), 1);
          if(termRef[0][key].value <= 0) {
            //if the value is negative or zero, remove it from heap
            //console.log("for (type 0) " + key + " removed from heap");
            //console.log(termRef[0][key]);
            //console.log(termHeap);
            eqn_utils.heap.removeEle(termHeap, termRef[0][key], Term.TermBracket.heapcmp);
            delete termRef[0][key];
          }
          else {
            //else call modify
            eqn_utils.heap.modified(termHeap, termRef[0][key], Term.TermBracket.heapcmp);
          }
        }
      }
      if(termRef[1].tref[key] && seperate) {
        this._type1_remove_tkey(termHeap, termRef, termsMeta, key, this.coeff);
      }
    }
  },

  factorize : function(sterm) {
    return this;
  },

  getVars : function(varRef) {
    if(this.vari) {
      var arr = /^(.*?)\[\d+\]$/.exec(this.vari);
      if(arr) varRef[arr[1]] = {Array : 1};
      varRef[this.vari] = varRef[this.vari] || {};
      varRef[this.vari][this.pwr || 1] = 1;
    }
  },

  getCode : function() {
    var str = "", cf = 0;
    if(this.vari) {
      var idx = indexMap[this.vari.charAt(0)];
      if(idx || idx === 0) {
        str += this.vari.substr(1) + "[" + idx + "]";
      }
      else {
        str += this.vari;
      }
      cf = 1;
    }
    if(this.pwr !== 1) {
      str = "Math.pow(" + str +", " + this.pwr + ")";
      cf = 1;
    }
    if(this.coeff && (cf === 0 || this.coeff !== 1)) {
      str = this.coeff + (cf === 1 ? "*":"") + str;
    }
    return str;
  },

  sortAndStringify : function() {
    if(this.vari) {
      this.sortStr = this.vari + (this.pwr !== 1 ? "^"+this.pwr : "");
      this.fullStr = (this.coeff !== 1 ? (this.coeff < 0 ? "("+this.coeff+")":this.coeff):"") + this.sortStr;
    }
    else {
      this.sortStr = 1;
      this.fullStr = (this.coeff < 0 ? "("+this.coeff+")":this.coeff);
    }
  },

});

module.exports = Term;
