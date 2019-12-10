var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  datos = {
    respuesta: ""
  };
  res.render("index", { datos });
});

module.exports = router;