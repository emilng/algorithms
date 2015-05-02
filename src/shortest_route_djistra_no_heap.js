var nodes = [
  {id: 0, name: 'point kiukiu',
    edges:[[1, 19], [3, 15], [5,15]]},
  {id: 1, name: 'hanaiapa',
    edges:[[0, 19], [2, 6]]},
  {id: 2, name: 'airport',
    edges:[[1, 6], [3, 5], [9, 11], [6, 4]]},
  {id: 3, name: 'mt feani',
    edges:[[0, 15], [2, 5], [4, 8]]},
  {id: 4, name: 'mt temetiu',
    edges:[[3, 8], [5, 4]]},
  {id: 5, name: 'taaoa',
    edges:[[0, 15], [4, 4], [6, 3]]},
  {id: 6, name: 'atuona',
    edges:[[2, 4], [5, 3], [7, 1]]},
  {id: 7, name: 'hanakee pearl lodge',
    edges:[[6, 1], [8, 6]]},
  {id: 8, name: 'cemetery',
    edges:[[7, 6], [9, 5]]},
  {id: 9, name: 'mt ootua',
    edges:[[2, 11], [8, 5], [10, 3], [11, 13]]},
  {id: 10, name: 'hanapaoa',
    edges:[[9, 3]]},
  {id: 11, name: 'puamua',
    edges:[[9, 13], [12, 14]]},
  {id: 12, name: 'point',
    edges: [[11, 14]]},
];
/*
1. Assign to every node a tentative distance value: set it to zero for our initial node and to infinity for all other nodes.

2. Set the initial node as current. Mark all other nodes unvisited. Create a set of all the unvisited nodes called the unvisited set.

3. For the current node, consider all of its unvisited neighbors and calculate their tentative distances.
Compare the newly calculated tentative distance to the current assigned value and assign the smaller one.
For example, if the current node A is marked with a distance of 6, and the edge connecting it with a neighbor B has length 2,
then the distance to B (through A) will be 6 + 2 = 8. If B was previously marked with a distance greater than 8 then change it to 8.
Otherwise, keep the current value.

4. When we are done considering all of the neighbors of the current node, mark the current node as visited and remove it from the unvisited set.
A visited node will never be checked again.

5. If the destination node has been marked visited (when planning a route between two specific nodes) or if the smallest tentative distance
among the nodes in the unvisited set is infinity (when planning a complete traversal; occurs when there is no connection between the initial
node and remaining unvisited nodes), then stop. The algorithm has finished.

6. Select the unvisited node that is marked with the smallest tentative distance, and set it as the new "current node" then go back to step 3.

7. If path has been found - backtrack through visited nodes with the shortest distance to find shortest route
*/

var shortestRoute = function(start, end) {
  var currentNode = nodes[start];
  var unvisitedNodes = [];

  // initialize unvisited nodes
  nodes.forEach(function(node) {
    if (node === currentNode) {
      node.distance = 0;
    } else {
      node.distance = Infinity;
    }
    node.visited = false;
    unvisitedNodes.push(node);
  });

  while(true) {

    // calculate neighbor distances
    currentNode.edges.forEach(function(edge) {
      var nodeIndex = edge[0];
      var edgeDistance = edge[1];
      var neighbor = nodes[nodeIndex];
      var newDistance = currentNode.distance + edgeDistance;
      if (newDistance < neighbor.distance) {
        neighbor.distance = newDistance;
      }
    });

    // remove current index
    var currentIndex = unvisitedNodes.indexOf(currentNode);
    unvisitedNodes.splice(currentIndex, 1);
    currentNode.visited = true;

    // set current node to node with smallest distance
    var smallestDistance = Infinity;
    for (var i = 0, len = unvisitedNodes.length; i < len; i++) {
      if (unvisitedNodes[i].distance < smallestDistance) {
        currentNode = unvisitedNodes[i];
        smallestDistance = currentNode.distance;
      }
    }

    if (smallestDistance === Infinity) {
      console.log('No path found');
      break;
    }

    // trace shortest route
    if (nodes.indexOf(currentNode) === end) {
      var routeNode = nodes[end];
      route = [end];
      var distance = routeNode.distance;
      smallestDistance = distance;
      while (routeNode !== nodes[start]) {
        var nextIndex = null;
        routeNode.edges.forEach(function(edge) {
          var nodeIndex = edge[0];
          var neighbor = nodes[nodeIndex];
          if ((neighbor.visited === true) && (neighbor.distance < smallestDistance)) {
            smallestDistance = neighbor.distance;
            nextIndex = nodeIndex;
          }
        });
        routeNode = nodes[nextIndex];
        route.push(nextIndex);
      }
      console.log(start, end, route.reverse(), distance);
      break;
    }
  }

};

shortestRoute(0, 2);
shortestRoute(0, 4);
shortestRoute(0, 6);
shortestRoute(0, 8);
shortestRoute(1, 3);
shortestRoute(1, 5);
shortestRoute(1, 7);
shortestRoute(1, 9);
shortestRoute(2, 4);
shortestRoute(2, 6);
shortestRoute(2, 8);
shortestRoute(2, 10);
shortestRoute(3, 5);
shortestRoute(3, 7);
shortestRoute(3, 9);
shortestRoute(3, 11);