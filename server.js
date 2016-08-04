var express = require("express");
var app = express();
var mongo = require('mongodb').MongoClient;
var https = require('https');
var request = require("request");
//this is the standard google search with my API key
var googleApi = "https://www.googleapis.com/customsearch/v1?cx=017568103372503135883%3Auxsdz2zrxry&alt=json&searchType=image&key=AIzaSyCyRNyaQ6C_g8tXTeiMFgqARe8SQC3E63E&&num=";

var port = process.env.PORT || 8080; // set our port

app.use(express.static(__dirname + "/app/public"));

app.get('/:url', function(req, res){
    var searchterm = req.path.substring(1);
    var path = googleApi + req.query.offset + "&q=" + searchterm; //build the search complete url
    console.log(path);
    request(path, function (error, response, body) {
      var data = JSON.parse(body);
      var answer = [];
      if (!error && response.statusCode == 200) {
        var i;
        for (i=0;i<10;i++){
          var url = data.items[i].link;
          var snippet = data.items[i].title;
          var thumbnail = data.items[i].image.thumbnailLink;
          var context = data.items[i].image.contextLink;
          answer.push({url:url,snippet:snippet,thumbnail:thumbnail,context:context});
        }
        res.send(answer);
      }
    });
    mongo.connect('mongodb://ZaiZai:orffyreus88@ds139735.mlab.com:39735/imgsrc', function(err, db) {
        if (err) throw err;
        var newSrc = {searchterm : searchterm, date : Date().now};
            JSON.stringify(newSrc);
            db.collection('imgsrc').insert(newSrc, function(err, data) {
                if (err) throw err;
                res.send(newSrc);
                db.close();
            });
    });
});

app.listen(port, function() {
  console.log('Server listening on ' + port);
});