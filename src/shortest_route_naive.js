// build route
// does current node contain finish?
// is next node a new node?
// is next node a dead end?
// are there any more nodes?

/*
  routes
    route
      distance
      visited nodes

*/

var nodes = [
  {id: 0, name: 'point kiukiu',
    roads:[[1, 19], [3, 15], [5,15]]},
  {id: 1, name: 'hanaiapa',
    roads:[[0, 19], [2, 6]]},
  {id: 2, name: 'airport',
    roads:[[1, 6], [3, 5], [9, 11], [6, 4]]},
  {id: 3, name: 'mt feani',
    roads:[[0, 15], [2, 5], [4, 8]]},
  {id: 4, name: 'mt temetiu',
    roads:[[3, 8], [5, 4]]},
  {id: 5, name: 'taaoa',
    roads:[[0, 15], [4, 4], [6, 3]]},
  {id: 6, name: 'atuona',
    roads:[[2, 4], [5, 3], [7, 1]]},
  {id: 7, name: 'hanakee pearl lodge',
    roads:[[6, 1], [8, 6]]},
  {id: 8, name: 'cemetery',
    roads:[[7, 6], [9, 5]]},
  {id: 9, name: 'mt ootua',
    roads:[[2, 11], [8, 5], [10, 3], [11, 13]]},
  {id: 10, name: 'hanapaoa',
    roads:[[9, 3]]},
  {id: 11, name: 'puamua',
    roads:[[9, 13], [12, 14]]},
  {id: 12, name: 'point',
    roads: [[11, 14]]},
];

var shortestDistance = -1;

var buildRoutes = function(start, end, distance, visitedNodes, route) {
  var i = nodes[start].roads.length;
  var roads = nodes[start].roads;
  var newVisited = visitedNodes.slice(0);
  var newRoute = route.slice(0);
  newRoute.push(start);
  var newDistance = 0;
  var addRoute = false;
  var routes = [];

  while(i--) {
    // currentNode is end
    if (roads[i][0] === end) {
      newVisited.push(roads[i][0]);
      newDistance = distance + roads[i][1];
      addRoute = (((shortestDistance > -1) && (newDistance < shortestDistance)) || (shortestDistance === -1));
      if (addRoute) {
        newRoute.push(end);
        shortestDistance = newDistance;
        return {route: newRoute, distance: shortestDistance};
      }
      break;
    // next node is new node
    } else if (visitedNodes.indexOf(roads[i][0]) === -1) {
      newVisited.push(roads[i][0]);
      newDistance = distance + roads[i][1];
      addRoute = (((shortestDistance > -1) && (newDistance < shortestDistance)) || (shortestDistance === -1));
      if (addRoute) {
        var builtRoute = buildRoutes(roads[i][0], end, distance + roads[i][1], newVisited, newRoute);
        if (builtRoute && (builtRoute.distance <= shortestDistance)) {
          routes.push(builtRoute);
        }
      }
    }
  }
  routes = routes.filter(function(route) {
    return (route.distance <= shortestDistance);
  });
  if (routes.length > 0) {
    return routes[0];
  } else {
    return null;
  }
};

var shortestRoute = function(start, end) {
  var route = buildRoutes(start, end, 0, [], []);
  console.log(start, end, route.route, route.distance);
  shortestDistance = -1;
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