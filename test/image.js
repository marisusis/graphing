var app = require('express')();
var path = require('path');
var graphing = require('../');
var fs = require('fs');
var Canvas = require('canvas'),
  Image = Canvas.Image;




// console.log('<img src="' + canvas.toDataURL() + '" />');


app.get('/-/*', function(req, res) {
  res.sendFile(path.resolve('./' + req.params[0]));
});

app.get('/image/view', function(req, res) {
  var graph = new graphing.Graph('blue',800,800,-10,10);
  graph.addFunction(req.query.fa);
  graph.addFunction(req.query.fb);
//  graph.addPoint(req.query.p);
  graph.graphLines();
  graph.drawFunction(0,'red');
  graph.drawFunction(1,'blue');
//   graph.drawPoint(0);
  res.send('<img src="' + graph.getGraph() + '" />');
});

app.get('/image/dl', function(req, res) {
  var graph = new graphing.Graph('blue',800,800,-10,10);
  graph.addFunction(req.query.fa);
  graph.addFunction(req.query.fb);
 graph.addPoint(req.query.p);
  graph.graphLines();
  graph.drawFunction(0);
  graph.drawFunction(1);
  graph.drawPoint(0);
  var buffer = bd(graph.getGraph());
  var stream = new BufferStream(buffer);
  stream.pipe(res);
// var stream = 
//   stream.pipe(res);
});

function bd(base64str) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    return bitmap;
//     console.log('******** File created from base64 encoded string ********');
}

app.listen(3000);