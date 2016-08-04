var express = require("express");
var app = express();
var router = express.Router();

app.use('/index', express.static(process.cwd() + '/public'));
app.use('/', router);
router.use('/src', require('./src'));
router.use('/history_src', require('./src_history'));

module.exports = router;

var port = process.env.PORT || 8080; // set our port
app.listen(port, function() {
  console.log('Server listening on ' + port);
});