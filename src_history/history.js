var express = require("express");
var app = express();
var mongo = require('mongodb').MongoClient;

var port = process.env.PORT || 8080; // set our port

app.get('/', function(req, res){
    mongo.connect('mongodb://ZaiZai:orffyreus88@ds139735.mlab.com:39735/imgsrc', function(err, db) {
        if (err) throw err;
            db.collection('imgsrc').find().sort({
                date:1
            }).limit(50).toArray(function(err, documents) {
                if (err) res.send("invalid easyurl");
                res.send(documents);
            });
    });
});
                
app.listen(port, function() {
  console.log('Server listening on ' + port);
});