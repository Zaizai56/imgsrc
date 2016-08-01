var express = require("express");
var app = express();
var mongo = require('mongodb').MongoClient;
var tools = require('./app/api/tools');

var port = process.env.PORT || 8080; // set our port

app.use(express.static(__dirname + "/app/public"));


app.listen(port, function() {
  console.log('Server listening on ' + port);
});