//TODO : calculate (a1+a2+....ar)^n ∑ (n!/(p1!*p2!...pr!)) a1^p1 * a2^p2 * .... a^n*p^n, p1+p2+...pr = n
//       no of terms = n+r-1Cn
module.exports = function(pwr, sterm, dontRaisePwr) {
  var ncr = 1, ts = this.terms,
      st, mt, terms = [],
      br = 0, stf = 0,
      endPwr = pwr / Math.abs(pwr);

  pwr = Math.abs(pwr);

  if(pwr === 0) return null;

  for(var i = 0; i < ts.length; i++) {
    if(ts[i].hasTerm(sterm)) {
      terms.unshift(ts[i]);
      stf = 1;
    }
    else terms.push(ts[i]);
  }
  if(stf === 0) {
    if(!dontRaisePwr) this.pwr *= pwr;
    return this;
  }
  st = terms.shift();

  this.terms = [];
  if(terms.length !== 1) {
    mt = this.createTermBracket({terms : terms});
    br = 1;
  }
  else {
    mt = terms.shift();
  }
  for(var i = 0; i <= pwr; i++) {
    var sti = st.copy(), mti = mt.copy();
    sti = sti.power(pwr - i, sterm);
    mti = mti.power(i, sterm);
    var ct = sti || mti;
    if(sti && mti) ct = ct.multiply(mti);
    ct.coeff *= ncr;
    ct = ct.condense();
    this.addTerm(ct);
    ncr *= (pwr - i)/(i + 1);
  }
  this.pwr = endPwr;
  return this.condense();
};
