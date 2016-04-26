require('canvas');
var graphing = require("graphing");
var Graph = graphing.Graph;
var graph = new Graph('red',400,400,-10,10);

graph.graphLines();
graph.addFunction('x^2');
graph.addFunction('x');
graph.drawFunction(0,'deeppink');
graph.drawFunction(1,'dodgerblue');
graph.getGraph();