var eqn_utils = require("../utils/eqn_utils");

module.exports = function(termHeap, termRef, termsMeta, seperate) {
  for(var i = 0; i < this.terms.length; i++) {
    termsMeta.curParent = this;
    this.terms[i].processForFactorization(termHeap, termRef, termsMeta, 0);
    termsMeta.curParent = null;
  }

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
            this._type1_add_tkey_to_bt(termHeap, bt, termsMeta, _tkey, termRef[1].tref[_tkey].coeff)
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
      if(bt.href.value + oprnsRemaining * ( termsMeta.termsLeft - _tkeysToAdd.length ) > 0) {
        termRef[1].btref[btkey] = bt;
        for(var j = 0; j < _tkeysToAdd.length; j++) {
          termRef[1].tref[_tkeysToAdd[j].tkey] = {bts : [], terms : _tkeysToAdd[j].terms};
        }
        for(var j = 0; j < _tkeys.length; j++) {
          termRef[1].tref[_tkeys[j]].bts.push(bt);
        }
        //console.log("For tkey : " + tkey);
        //console.log(bt);
        eqn_utils.heap.insert(termHeap, bt.href, eqn_utils.heapcmp);
      }
    }
    if(termRef[1].tref[tkey]) {
      this._type1_add_tkey(termHeap, termRef, termsMeta, tkey);
    }
  }
};
