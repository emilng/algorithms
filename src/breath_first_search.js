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

var buildPath = function(previous, start, end) {
  var path = [end];
  var vertex = end;
  while(vertex !== start) {
    vertex = previous[vertex];
    path.push(vertex);
  }
  return path;
};

var bfs = function(graph, start, end) {
  var q = [start];
  var discovered = [];
  var previous = {};
  while (q.length) {
    var vertex = q.shift();
    var neighbors = graph[vertex];
    for (var i = 0, len = neighbors.length; i < len; i++) {
      var neighbor = neighbors[i];
      var unvisited = (discovered.indexOf(neighbor) === -1);
      if (unvisited) {
        q.push(neighbor);
        discovered.push(neighbor);
        previous[neighbor] = vertex;
      }
      if (neighbor === end) {
        return buildPath(previous, start, end);
      }
    }
  }
};

console.log(bfs(g, 1, 10));