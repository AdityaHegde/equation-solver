var tmp;

var heap = {
  insert : function(array, element, comparator) {
    comparator = comparator || heap.comparator;

    element.heapIdx = array.length;
    array.push(element);

    heap.moveUp(array, array.length - 1, comparator);
  },

  remove : function(array, comparator) {
    comparator = comparator || heap.comparator;
    if(array.length > 0) {
      var ele = array[0];
      array[0] = array[array.length - 1];
      array[0].heapIdx = 0;
      array.pop();
      heap.moveDown(array, 0, comparator);

      delete ele.heapIdx;
      return ele;
    }
    return null;
  },

  removeEle : function(array, element, comparator) {
    comparator = comparator || heap.comparator;
    //console.log("Remove Ele");
    //console.log(array);
    if(array.length > 0 && typeof element.heapIdx === "number") {
      if(element.heapIdx === array.length - 1) {
        delete element.heapIdx;
        return array.pop();
      }
      else if(element.heapIdx === 0) {
        return heap.remove(array, comparator);
      }
      else {
        var last = array[array.length - 1];
        array[element.heapIdx] = last;
        last.heapIdx = element.heapIdx;
        array.pop();
        heap.modified(array, last, comparator);
        delete element.heapIdx;
        return element;
      }
    }
  },

  modified : function(array, element, comparator) {
    heap.moveUp(array, element.heapIdx, comparator);
    heap.moveDown(array, element.heapIdx, comparator);
  },

  moveUp : function(array, i, comparator) {
    //console.log("moveUp");
    //console.log(array);
    var j = Math.floor((i - 1)/2);
    while(j >= 0) {
      if(comparator(array[i], array[j]) > 0.0) {
        tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
        array[i].heapIdx = i;
        array[j].heapIdx = j;
        i = j;
        j = Math.floor((i - 1)/2);
      }
      else {
        break;
      }
    }
  },

  moveDown : function(array, i, comparator) {
    //console.log("moveDown");
    //console.log(array);
    var j = 2*i + 1, k;
    while(j < array.length) {
      k = j;
      if(j + 1 < array.length && comparator(array[j], array[j + 1]) < 0.0) {
        k = j + 1;
      }
      if(comparator(array[i], array[k]) < 0.0) {
        tmp = array[i];
        array[i] = array[k];
        array[k] = tmp;
        array[i].heapIdx = i;
        array[k].heapIdx = k;
        i = k;
        j = 2*i + 1;
      }
      else {
        break;
      }
    }
  },

  comparator : function(a, b) {
    return b - a;
  },
};
module.exports = heap;
