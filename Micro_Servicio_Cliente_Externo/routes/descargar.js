var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var file = __dirname + '/reportes/reporte.pdf';
	res.download(file);        
});

module.exports = router;