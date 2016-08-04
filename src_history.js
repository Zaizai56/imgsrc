var express = require("express");
var router = express.Router();
var mongo = require('mongodb').MongoClient;

router.use(function(req, res){
    console.log("history lookup");
    mongo.connect('mongodb://user:zaizai@ds139735.mlab.com:39735/imgsrc', function(err, db) {
        if (err) throw err;
        db.collection('imgsrc').find({ },{_id: 0}).sort({date:1}).limit(50).toArray(function(err, documents) {
            if (err) res.send("invalid easyurl");
            res.send(documents);
        });
    });
});

module.exports = router;
