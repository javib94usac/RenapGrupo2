const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var compro = require("../public/javascripts/Comprobaciones.js");
const app = express();

/* Se extrae los datos de la vista para ejecutar el metodo post. */
router.post("/", function(req, res, next) {
  datos = {
    dpih: req.body.dpiHombre, //dpi  del hombre, futuro esposo
    dpim: req.body.dpiMujer, // dpi de la mujer, futura esposa
    fecha: req.body.fecha,    // fecha en la que se casaron
    respuesta: "Acta en proceso"
  };
  console.log(datos);
   var comprobar = new compro(datos.dpih,datos.dpim,datos.fecha);
   if (comprobar.get_vacio()){

      if (comprobar.get_dpi_validos()){
          datos.respuesta = "Datos a procesar correctos";

      }else{
          datos.respuesta = "Datos a procesar Incorrectos, los numeros de DPI deben de tener 13 caracteres";
      }

   }else {

          datos.respuesta = "Debe de completar los campos";

   }
   
   
   
   res.render("index", { datos });
});

module.exports = router;