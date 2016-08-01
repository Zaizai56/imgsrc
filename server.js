var express = require("express");
var app = express();
var mongo = require('mongodb').MongoClient;
var https = require('https');
//this is the standard google search with my API key
var googleApi = "https://www.googleapis.com/customsearch/v1?cx=017568103372503135883%3Auxsdz2zrxry&num=10&searchType=image&key=AIzaSyCyRNyaQ6C_g8tXTeiMFgqARe8SQC3E63E&q=";

var port = process.env.PORT || 8080; // set our port

app.use(express.static(__dirname + "/app/public"));

app.get('/:url', function(req, res){
    var url = req.url.substring(1);
    var path = googleApi + url; //build the search complete url
    console.log(path);
    var req = https.request(path, (res) => {
        console.log('statusCode: ', res.statusCode);
        console.log('headers: ', res.headers);

        res.on('data', (d) => {
            process.stdout.write(d);
        });
    });
    req.end();
    
    req.on('error', (e) => {
      console.error(e);
    });
    //save this request in mongolab
});

app.listen(port, function() {
  console.log('Server listening on ' + port);
});