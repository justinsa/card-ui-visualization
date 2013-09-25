'use strict';
var PORT = typeof(process.env.PORT) !== 'undefined' ? process.env.PORT : 8080;
var express = require('express');
var app = express();
app.use(express.static(__dirname));
app.get('/?', function(request, response) {
  response.sendfile(__dirname + '/index.html');
});
app.listen(PORT);