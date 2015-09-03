var
eqn_utils = require("./utils/eqn_utils.js"),
inheritance = require("./utils/inheritance.js"),
Tokens = require("./eqn-tokens.js"),
TermBracket = require("./eqn-bracket-term.js"),
Term = require("./eqn-term.js");

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

function TermMultiply(config) {
  TermMultiply.parent.call(this, config);

  this.type = 1;
}
TermMultiply.Term = Term;
TermMultiply.TermBracket = TermBracket;

inheritance.inherit(TermBracket, TermMultiply, {

  key : "TermMultiply",

  init : function() {
    this.coeff = this.coeff || 1;
    var terms = this.terms;
    this.terms = [];
    for(var i = 0; i < terms.length; i++) {
      this.coeff *= terms[i].coeff;
      if(terms[i].type === 2) {
        for(var j = 0; j < terms[i].terms.length; j++) {
          terms[i].terms[j].coeff = 1;
          this.terms.push(terms[i].terms[j]);
        }
      }
      else {
        terms[i].coeff = 1;
        this.terms.push(terms[i]);
      }
    }
    this.terms.sort(TermMultiply.Term.sortFun);
  },

  parse : function(tokens) {
    var t = tokens.next(), ct;
    if(this.terms.length === 0) {
      if(operators[t]) {
        if(t === "-") this.coeff = -this.coeff;
        else if(t === "/") this.pwr = -this.pwr;
        t = tokens.next();
      }
      if(NUMBER_REGEX.exec(t)) this.coeff *= Number(t);
      else tokens.back();
    }
    else tokens.back();
    while(!tokens.isEmpty()) {
      ct = new TermMultiply.Term({}).parse(tokens);
      this.addTerm(ct);
      t = tokens.next();
      if(t === "+" || t === "-" || t === ")") {
        tokens.back();
        return this;
      }
      else if(t) tokens.back();
    }
    return this;
  },

  addTerm : function(term) {
    if(term.type === 1 || term.type === 3) {
      if(term.vari) {
        for(var i = 0; i < this.terms.length; i++) {
          if(this.terms[i].equalTo(term, 1) === 1) {
            this.terms[i].pwr += term.pwr;
            if(this.terms[i].pwr === 0) {
              this.terms.splice(i, 1);
            }
            if(term.pwr >= 0) this.coeff *= term.coeff;
            else this.coeff /= term.coeff;
            term.coeff = 1;
            return;
          }
        }
      }
      this.terms.push(term);
      this.terms.sort(TermMultiply.Term.sortFun);
    }
    else if(term.type === 2) {
      for(var i = 0; i < term.terms.length; i++) {
        this.addTerm(term.terms[i]);
      }
    }
    if(term.pwr >= 0) this.coeff *= term.coeff;
    else this.coeff /= term.coeff;
    term.coeff = 1;
  },

  equalTo : function(term, typeOnly) {
    if(this.sortStr && term.sortStr) {
      if(this.sortStr === term.sortStr) return 1;
    }
    else if(term.terms && this.terms.length === term.terms.length) {
      for(var i = 0; i < this.terms.length; i++) {
        if(this.terms[i].equalTo(term.terms[i], typeOnly) === 0) {
          return 0;
        }
      }
      return 1;
    }
    return 0;
  },

  power : function(pwr, sterm) {
    if(pwr !== 0) {
      this.coeff = Math.pow(this.coeff, pwr);
      for(var i = 0; i < this.terms.length; i++) {
        this.terms[i].power(pwr, sterm);
      }
      this.pwr = 1;
      return this;
    }
    return null;
  },

  simplify : function(sterm) {
    var terms = this.terms;
    this.terms = [];
    for(var i = 0; i < terms.length; i++) {
      terms[i] = terms[i].simplify(sterm);
      if(terms[i]) {
        if(terms[i].type > 0 || terms[i].vari) {
          //if simplified term is not a just number
          //type check for TermMultiply or TermBracket
          //vari check for Term with a variable
          this.addTerm(terms[i]);
        }
        else if(terms[i].coeff !== 1) {
          //if the term is a number but not 1
          //TODO : handle real numbers
          this.coeff *= terms[i].coeff;
        }
      }
    }
    if(this.terms.length === 0) {
      //if no terms were retained after simplification, return a EQN.Term with just the coeff
      return new TermMultiply.Term({coeff : this.coeff});
    }

    /*  expand brackets inside the TermMultiply  */

    //codense the equation 1st to remove duplicate terms among other things
    //bt - 1st TermBracket
    //mts - TermBrackets not in bt
    //smt - a TermMultiply with terms in 'this' which is not TermBrackets, or doesnt have sterm
    var t = this.condense(),
        mts = [], stm = new TermMultiply({terms : []}), bt = null;
    //console.log("----");
    //console.log(t);
    if(t.type === 1) {
      //return the condensed term if it is a simple Term
      return t;
    }

    for(var i = 0; i < t.terms.length; i++) {
      if(t.terms[i].type === 1 || t.terms[i].pwr !== 1 || t.terms[i].hasSTerm(sterm) === 0) {
        //add to smt if terms[i] is Term, power is not 1 or doesnt have sterm
        stm.addTerm(t.terms[i]);
      }
      else {
        //else is a term with multiple child terms
        if(!bt) {
          //if 1st multi term, assign it to 'bt'
          bt = t.terms[i];
        }
        else {
          //else push to mts
          mts.push(t.terms[i]);
        }
      }
    }
    /*if(bt) {
      for(var i = 0; i < bt.terms.length; i++) {
        bt.terms[i].coeff *= this.coeff;
      }
    }*/
    if(stm.terms.length !== 0) {
      //if there are single terms
      if(!bt) {
        //if there are no multi term, return 't' as it needs no further simplification
        return t;
      }
      //else multiply the smt to bt
      bt = bt.multiply(stm, sterm);
    }

    for(var i = 0; i < mts.length; i++) {
      //multiply bt to all remaining 'multi term' terms
      bt = bt.multiply(mts[i], sterm);
    }

    //move the coeff from 'this' to 'bt'
    bt.coeff = this.coeff;
    //simplify all terms after expanding brackets
    bt = bt.simplify(sterm);
    if(bt.terms.length === 1) {
      //if simplified 'bt' has a single term return it
      bt.terms[0].coeff *= bt.coeff;
      return bt.terms.pop();
    }
    if(bt.terms.length === 0) {
      //if bt has no terms then return null
      return null;
    }

    return bt;
  },

  condense : function() {
    this.sortAndStringify();
    var terms = this.terms;
    this.terms = [];
    for(var i = 0; i < terms.length - 1; i++) {
      if(terms[i] === 0) continue;
      for(var j = i + 1; j < terms.length; j++) {
        if(terms[j] === 0) continue;
        if(terms[i].equalTo(terms[j]) === 1) {
          terms[i].pwr += terms[j].pwr;
          terms[j] = 0;
        }
      }
      if(terms[i].pwr !== 0) {
        if(terms[i]) {
          this.addTerm(terms[i]);
          this.coeff *= terms[i].coeff;
          terms[i].coeff = 1;
        }
      }
    }
    if(terms[terms.length - 1] !== 0) this.addTerm(terms[terms.length - 1]);
    if(this.terms.length === 1) {
      this.terms[0].coeff *= this.coeff;
      return this.terms.pop();
    }
    if(this.terms.length === 0) return null;
    return this;
  },

  multiply : function(term, sterm) {
    if(term.type === 3) return term.multiply(this, sterm);
    var ts = (term.terms ? term.terms:[term]);
    for(var i = 0; i < ts.length; i++) {
      this.addTerm(ts[i]);
    }
    return this;
  },

  copy : function() {
    var c = new TermMultiply({pwr : this.pwr, coeff : this.coeff, terms : []});
    for(var i = 0; i < this.terms.length; i++) {
      c.addTerm(this.terms[i].copy());
    }
    return c;
  },

  replace : function(term, withTerm) {
    for(var i = 0; i < this.terms.length; i++) {
      this.terms[i] = this.terms[i].replace(term, withTerm);
    }
    return this;
  },

  segregate : function(term, pwr) {
    var t = null;
    for(var i = 0; i < this.terms.length; i++) {
      if(this.terms[i].vari === term.vari && (!pwr || this.terms[i].pwr >= pwr)) {
        if(pwr && this.terms[i].pwr > pwr) {
          t = this.terms[i].copy();
          t.pwr = pwr;
          t.coeff = 1;
          this.terms[i].pwr -= pwr;
        }
        else {
          t = this.terms[i];
          this.terms.splice(i, 1);
        }
        break;
      }
    }
    return [t, this];
  },

  hasSTerm : function(sterm) {
    if(!sterm) return 1;
    for(var i = 0; i < this.terms.length; i++) {
      if(this.terms[i].hasSTerm(sterm) === 1) return 1;
    }
    return 0;
  },

  convertToString : function () {
    var str = (this.coeff !== 1 ? (this.coeff < 0 ? "("+this.coeff+")":this.coeff):"");
    for(var i = 0; i < this.terms.length; i++) {
      var s = this.terms[i].convertToString();
      if(s != "1") str += ""+s;
    }
    if(this.pwr && this.pwr !== 1) str += "^"+this.pwr;
    return str;
  },

  processForFactorization : function(termHeap, termRef, termsMeta, seperate) {
    var brackets = 0;
    for(var i = 0; i < this.terms.length; i++) {
      termsMeta.curParent = this;
      this.terms[i].processForFactorization(termHeap, termRef, termsMeta, 0);
      termsMeta.curParent = null;
      if(this.terms[i].type === 3) {
        brackets++;
      }
    }

    //TODO : support brackets also - use sortStr instead of var
    if(brackets === 0) {
      //possible term sets
      //returns [ <a set of terms - [ <a pair of term and its pwr within the bracket (not its inherent power) [Term, pwr]> ... ]> ... ]
      var pts = this._generatePossibleTermAndPowerPairs(this.terms);
      for(var i = 0; i < pts.length; i++) {
        var
        //key to be used for the bracket in the bracket hash map
        //will be <t1>--<p1>__<t2>--<p2>.....<tn>--<pn>__<p>
        //p - pwr of the bracket
        btkey = "",
        //key with just the terms
        //will be <t1>--<p1*p>__<t2>--<p2*p>.....<tn>--<pn*p>
        //p - pwr of the bracket
        tkey = [],
        //sum of powers of each individual term in the bracket - in ((a)^2+(b^2)^2), pwr = 4
        pwr = 0,
        //term objects in the bracket
        terms = [],
        //sum of inherent powers of each individual term in the bracket - in ((a)^2+(b^2)^2), pwr = 3
        pwrOfTerms = 0,
        //map of term's 'vari' to its pwr
        termToPwrMap = {};

        for(var j = 0; j < pts[i].length; j++) {
          var term = pts[i][j][0];
          terms.push(term);
          btkey += term.vari+"--"+term.pwr+"__";
          tkey.push(term.vari+"--"+(term.pwr * pts[i][j][1]));
          termToPwrMap[term.vari] = term.pwr;
          pwr += pts[i][j][1];
          pwrOfTerms += term.pwr;
        }
        btkey += pwr;
        tkey = tkey.join("__");

        if(!termRef[1].btref[btkey]) {
          var
          //entry for a bracket
          bt = {
            //term ref for terms in the bracket expanded, for (a+b) with pwr 2, entries for a^2, ab, b^2
            tref : {}, 
            //ref for the heap
            href : {
              //value to use in heapification
              //is the no of operations that will be decreased if factorized.
              //initial value is : - ( no of terms - 1 ) - ( powers of all terms - no of terms ) - ( power of the bracket - 1 )
              value : 3 - pwrOfTerms - pwr,
              //key in the bracket hash map
              key : btkey,
              //type
              type : 1,
            },
            //terms within the bracket
            terms : terms,
            //power of the term
            pwr : pwr,
          },
          //get all terms of the bracket when expanded
          bts = this._generateTermsForPower(terms, [], pwr),
          //keys of all the terms in the bracket expended
          _tkeys = [],
          //kets to be added to the terms to complete bracket with pwr
          _tkeysToAdd = [],
          //total terms already present
          present = 0,
          //operations for the terms that are not already present
          oprnsRemaining = 0;

          for(var j = 0; j < bts.length; j++) {
            var
            //terms for the multiple term in the bracket after expanding
            _terms = bts[j],
            // ?
            _pwrs = [],
            //key for the multiple term in the bracket after expanding
            //will be <t1>--<p1>__<t2>--<p2>.....<tn>--<pn>
            _tkey = [],
            //no of operations for the multiple term after expanding
            oprns = _terms.length - 1;

            for(var k = 0; k < _terms.length; k++) {
              if(_terms[k].pwr > 0) {
                //if the term is in the multiple term, add it to the key
                _tkey.push(_terms[k].vari+"--"+_terms[k].pwr);
              }
              //add the power of the term as in the bracket, for ((a^2)^1+(b^1)^2)^2, and term a^2b^2, add 1 and 2
              _pwrs.push(_terms[k].pwr / termToPwrMap[_terms[k].vari]);
              oprns += _terms[k].pwr - 1;
            }
            _tkey = _tkey.join("__");

            //entry for a term within a bracket
            bt.tref[_tkey] = {
              //0/1 indicating its presence
              present : 0,
              //coeff of the present multiple term
              presCoeff : 0,
              //expected coeff of the multiple term
              exCoeff : eqn_utils.coeffsForRaiseToPwr.getCoeffForAPwrSet(pwr, _pwrs),
              //total operations for the multiple term
              oprns : oprns,
            };

            if(termRef[1].tref[_tkey]) {
              if(termRef[1].tref[_tkey].coeff) {
                //if the multiple term is already present, update the various entries
                this._type1_add_tkey_to_bt(termHeap, bt, termsMeta, _tkey, termRef[1].tref[_tkey].coeff);
                present++;
              }
            }
            else {
              //else add the term to the 'to add to hash map' list
              _tkeysToAdd.push({tkey : _tkey, terms : _terms});
              oprnsRemaining += oprns;
            }
            _tkeys.push(_tkey);
          }

          //determine if there are enough terms to decrease no of operations only then add the bracket to hash map
          if(bt.href.value + oprnsRemaining * ( termsMeta.termsLeft / _tkeysToAdd.length ) > 0) {
            termRef[1].btref[btkey] = bt;
            for(var j = 0; j < _tkeysToAdd.length; j++) {
              termRef[1].tref[_tkeysToAdd[j].tkey] = {bts : [], terms : _tkeysToAdd[j].terms};
            }
            for(var j = 0; j < _tkeys.length; j++) {
              termRef[1].tref[_tkeys[j]].bts.push(bt);
            }
          }
          eqn_utils.heap.insert(termHeap, bt.href, TermMultiply.TermBracket.heapcmp);
        }
        if(termRef[1].tref[tkey]) {
          this._type1_add_tkey(termHeap, termRef, termsMeta, tkey);
        }
      }
    }
  },

  processForRemovalByFactorization : function(termHeap, termRef, termsMeta, seperate) {
    for(var i = 0; i < this.terms.length; i++) {
      termsMeta.curParent = this;
      this.terms[i].processForRemovalByFactorization(termHeap, termRef, termsMeta);
    }

    if(seperate) {
      var
      //key to be used for the bracket in the bracket hash map
      //will be <t1>--<p1>__<t2>--<p2>.....<tn>--<pn>__<p>
      //p - pwr of the bracket
      btkey = "",
      //key with just the terms
      //will be <t1>--<p1*p>__<t2>--<p2*p>.....<tn>--<pn*p>
      //p - pwr of the bracket
      tkey = [],
      //map of term's 'vari' to its pwr
      termToPwrMap = {};

      for(var i = 0; i < this.terms.length; i++) {
        var term = this.terms[i];
        tkey.push(term.vari+"--"+term.pwr);
      }
      tkey = tkey.join("__");

      if(termRef[1].tref[tkey]) {
        this._type1_remove_tkey(termHeap, termRef, termsMeta, tkey);
      }
    }
  },

  factorize : function(sterm) {
    for(var i = 0; i < this.terms.length;) {
      var rett = this.terms[i].factorize(sterm);
      if(this.terms[i].type === 3) {
        if(rett.type !== 2) {
          this.terms.splice(i, 1);
          this.addTerm(rett);
        }
        else {
          this.terms[i] = rett;
          i++;
        }
      }
      else {
        this.terms[i] = rett;
        i++;
      }
    }
    return this;
  },

  getVars : function(varRef) {
    for(var i = 0; i < this.terms.length; i++) {
      this.terms[i].getVars(varRef);
    }
  },

  getCode : function () {
    var str = (this.coeff && this.coeff !== 1 ? this.coeff+"*":"");
    for(var i = 0; i < this.terms.length; i++) {
      var s = this.terms[i].getCode();
      if(s != "1") {
        str += ""+s;
        if(this.terms.length > 1 && i < this.terms.length - 1) str += "*";
      }
    }
    if(this.pwr && this.pwr !== 1) str = "Math.pow(" + str +", " + this.pwr + ")";
    return str;
  },

  sortAndStringify : function() {
    this.fullStr = (this.coeff && this.coeff !== 1 ? (this.coeff < 0 ? "("+this.coeff+")": this.coeff):"");
    this.sortStr = "";
    for(var i = 0; i < this.terms.length; i++) {
      this.terms[i].sortAndStringify();
    }
    this.terms.sort(TermMultiply.TermBracket.sort_fun);
    for(var i = 0; i < this.terms.length; i++) {
      if(this.terms[i].fullStr != "1") this.sortStr += this.terms[i].fullStr;
    }
    if(this.pwr && this.pwr !== 1) this.sortStr += "^"+this.pwr;
    this.fullStr += this.sortStr;
  },

});

module.exports = TermMultiply;
