var express = require("express"),
  router = express.Router(),
  mongo = require('mongodb').MongoClient,
  request = require("request");

router.use(function(req, res){
  var googleApi = "https://www.googleapis.com/customsearch/v1?cx=017568103372503135883%3Auxsdz2zrxry&alt=json&searchType=image&key=AIzaSyCyRNyaQ6C_g8tXTeiMFgqARe8SQC3E63E";
  console.log("new search");
  var searchterm = req.path.substring(1);
  if (searchterm != ""){
  var offset = "";
  if (req.query.offset != null){
    console.log("search with offset");
    offset = "&start=" + req.query.offset;
  }
  var path = googleApi + offset + "&q=" + searchterm; //build the search complete url
  console.log(path);
  request(path, function (error, response, body) {
    var data = JSON.parse(body);
    var answer = [];
    console.log("requested");
    if (!error && response.statusCode == 200) {
      var i;
      console.log("google replied");
      for (i=0;i<10;i++){
        console.log(i);
        var url = data.items[i].link;
        var snippet = data.items[i].title;
        var thumbnail = data.items[i].image.thumbnailLink;
        var context = data.items[i].image.contextLink;
        answer.push({url:url,snippet:snippet,thumbnail:thumbnail,context:context});
      }
    mongo.connect('mongodb://user:zaizai@ds139735.mlab.com:39735/imgsrc', function(err, db) {
        if (err) throw err;
        var date = new Date().toISOString();
        var newSrc = {searchterm : searchterm, date : date};
            JSON.stringify(newSrc);
            db.collection('imgsrc').insert(newSrc, function(err, data) {
                if (err) throw err;
                db.close();
            });
    });
        res.send(answer);
        console.log("replied");
      }
    });
  } else res.send("empty research string");
});

module.exports = router;