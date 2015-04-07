/*
given a list
split list into two halves
sort each half, then merge the two halves
base case: n <= 1
*/

var mergeSort = function(list) {
  if (list.length > 1) {
    var a = list.slice(0, Math.floor(list.length/2));
    var b = list.slice(Math.floor(list.length/2));
    a = mergeSort(a);
    b = mergeSort(b);
    var i = 0;
    var j = 0;
    var mergeList = [];
    var targetLength = a.length + b.length;
    var itemA;
    var itemB;
    while (mergeList.length < targetLength) {
      if (i < a.length) {
        itemA = a[i];
      }
      if (j < b.length) {
        itemB = b[j];
      }
      if(itemA < itemB && itemA !== null && itemB !== null) {
        mergeList.push(itemA);
        i++;
      } else if (itemB !== null) {
        mergeList.push(itemB);
        j++;
      } else if (itemA !== null) {
        mergeList.push(itemA);
        i++;
      }
      itemA = null;
      itemB = null;
    }
    return mergeList;
  } else {
    return list;
  }
};

console.log(mergeSort([5,3,4,6,1,8]));
console.log(mergeSort([7,9,10,2,5,3,4,6,1,8]));