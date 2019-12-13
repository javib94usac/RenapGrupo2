var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  datos=
  {
    titulo:"Bienvenido al Sistema de actas de nacimiento",
    mensaje:""
  }
  res.render('index', {datos});
});

module.exports = router;
