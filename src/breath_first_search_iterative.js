/*

1----2----3    11
|    |         |
4    5----6----10
|    |    |
7    8    9----12       13  <-- 13 is not accessible from any

*/

var g = [[],
 [2, 4],
 [1, 3, 5],
 [2],
 [1, 7],
 [2, 6, 8],
 [5, 9, 10],
 [4],
 [5],
 [6, 12],
 [6, 11],
 [10],
 [9],
 []];

// write a program that finds a path from 1 to 10.


var traversePath = function(discovered, previous) {
  var currentNode = discovered[discovered.length - 1];
  var path = [currentNode];
  while(true) {
    previousNode = previous[discovered.indexOf(currentNode)];
    path.push(previousNode);
    currentNode = discovered[discovered.indexOf(previousNode)];
    console.log(previousNode, discovered.indexOf(previousNode), currentNode);
    if (previousNode === discovered[0]) {
      console.log(path);
      return;
    }
  }
};

// breath first search until target node is reached
// calls traverse path to retrieve path from previous nodes
var bfs = function(g, v, target) {
  var q = [v];
  var discovered = [v];
  var previous = [v];
  while (q.length) {
    v = q.shift();
    var p = g[v];
    for (var i = 0; i < p.length; i++) {
      var w = p[i];
      w.previous = v;
      if (discovered.indexOf(w) === -1) {
        q.push(w);
        discovered.push(w);
        previous.push(v);
      }
      if (w === target) {
        console.log(discovered);
        console.log(previous);
        traversePath(discovered, previous);
        return;
      }
    }
  }
};

bfs(g, 1, 10);
