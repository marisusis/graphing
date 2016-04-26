var graphing = require('../');
var log = require('util').log;
var math = require('mathjs');

var graph = new graphing.Graph('blue');

graph.addPlot('f(x) = x*x');
graph.drawPlot(0);
