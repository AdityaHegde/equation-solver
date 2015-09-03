module.exports = function(termHeap, bt, termsMeta, tkey, coeff) {
  //set the present boolean to true (1) in the hash map of terms within the bracket data
  bt.tref[tkey].present = 1;
  //set the present coeff
  bt.tref[tkey].presCoeff = coeff;

  //if the coeff of the present term is equal to the expected term,
  //no additional term will have to be added to complete the bracket with power expansion
  //so increase the value of the heap element
  if(coeff === bt.tref[tkey].exCoeff) {
    bt.href.value += bt.tref[tkey].oprns;
    return true;
  }
  return false;
};
