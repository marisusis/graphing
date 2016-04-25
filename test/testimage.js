var app = require('express')();
var path = require('path');

app.get('/*',function(req,res) {
  res.sendFile(path.resolve('./'+req.params[0]));
});

app.listen(3000);