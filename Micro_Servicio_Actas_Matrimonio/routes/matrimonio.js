const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();

/* GET home page. */
router.post("/", function(req, res, next) {
  datos = {
    dpih: req.body.dpiHombre,
    dpim: req.body.dpiMujer,
    fecha: req.body.fecha,
    respuesta: "Acta en proceso"
  };
  console.log(datos);
  res.render("index", { datos });
});

module.exports = router;