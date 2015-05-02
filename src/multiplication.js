/*
take last number and multiply it by result of previous multiplies until there is only a single result

split numbers into digits
  1 2 3
4 3 2 1
5 6 7 8
multiply each top number by each bottom number from right to left
shift each multiplied number over one place depending on the position of multiplying number on the bottom

*/
var multiply = function() {
  var elements = Array.prototype.map.call(arguments, function(item) {
    return item;
  });
  var a, b;
  if (elements.length > 2) {
    b = elements.pop();
    a = multiply.apply(this, elements);
  } else {
    b = elements[1];
    a = elements[0];
  }
  var aList = String(a).split('');
  var bList = String(b).split('');
  var zeros = '';
  var productList = [];
  while (aList.length) {
    var i = bList.length;
    var num = aList.pop();
    var numList = [];
    var carry = 0;
    while(i--) {
      var mult = num * bList[i] + carry;
      carry = Math.floor(mult/10);
      var s = String(mult);
      numList.unshift(s[s.length - 1]);
      if (i === 0 && carry > 0) {
        numList.unshift(carry);
      }
    }
    var res = parseInt(numList.join('') + zeros);
    productList.push(res);
    zeros += '0';
  }
  return productList.reduce(function(a, v) {
    return a + v;
  }, 0);
};

module.exports = multiply;
