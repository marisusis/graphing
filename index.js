var Canvas = require('canvas');
var math = require('mathjs');
var log = require('util').log;

function Graph(color, width, height, minx, maxx) {
  this.width = width;
  this.height = height;
  this.color = color;
  this.canvas = new Canvas(width, height);
  this.ctx = this.canvas.getContext('2d');
  this.plots = [];
  this.points = [];
  this.minx = minx;
  this.maxx = maxx;
  this.miny = (minx * this.height / this.width);
  this.maxy = (maxx * this.height / this.width);
  this.XC = function(x) {
    return(x - this.minx) / (this.maxx - this.minx) * this.width;
  }

  // Returns the physical y-coordinate of a logical y-coordinate:
  this.YC = function(y) {
    return this.height - (y - this.miny) / ((this.maxx * this.height / this.width) - (minx * this.height / this.width)) * this.height;
  }
}

Graph.prototype.addFunction = function(s) {
  var plot = {};
  plot.f = math.eval(s);
  plot.coords = [];
  for(var x = this.minx*10; x < this.maxx*10; x++) {
    plot.coords.push([x / 10, plot.f(x / 10)]);
  }
  this.plots.push(plot);
}


Graph.prototype.addPoint = function(s) {
  var coords = s.replace(/[^,\d]/g, '').split(/,/g);
  this.points.push([this.XC(coords[0]), this.YC(coords[1])]);
}

Graph.prototype.drawPoint = function(n) {
  this.ctx.fillStyle = 'red';
  var c = this.points[0];
  this.ctx.fillRect(c[0]-5, c[1]-5, 10, 10);
}

Graph.prototype.drawFunction = function(n) {
  this.ctx.lineWidth = 3;
  this.ctx.strokeStyle = this.color;
  var coords = this.plots[n].coords;
  this.ctx.beginPath();
  this.ctx.lineTo(this.XC(coords[0][0]), this.YC(coords[0][1]));
  for(var i = 1; i < coords.length; i++) {
    this.ctx.lineTo(this.XC(coords[i][0]), this.YC(coords[i][1]));
  }
  this.ctx.stroke();
}

Graph.prototype.graphLines = function(color) {

  this.ctx.strokeStyle = '#bbb';
  var totalx = Math.abs(this.minx) + Math.abs(this.maxx);
  var totaly = Math.abs(this.miny) + Math.abs(this.maxy);
  for(var x = 0; x < totalx; x++) {
    if(x == Math.floor(totalx / 2)) {
      this.ctx.strokeStyle = '#000';
      this.ctx.lineWidth = 2;
    } else {
      this.ctx.strokeStyle = '#bbb';
      this.ctx.lineWidth = 2;
    }
    this.ctx.beginPath();
    this.ctx.moveTo(x * this.width / totalx, 0);
    this.ctx.lineTo(x * this.width / totalx, this.height);
    this.ctx.stroke();
  }
  for(var y = 0; y < totaly; y++) {
    if(y == Math.floor(totaly / 2)) {
      this.ctx.strokeStyle = '#000';
      this.ctx.lineWidth = 2;
    } else {
      this.ctx.strokeStyle = '#bbb';
      this.ctx.lineWidth = 2;
    }
    this.ctx.beginPath();
    this.ctx.moveTo(0, y * this.height / totaly);
    this.ctx.lineTo(this.width, y * this.height / totaly);
    this.ctx.stroke();
  }
}

Graph.prototype.getGraph = function() {
  return this.canvas.toDataURL();
}

module.exports = {
  Graph: Graph
}