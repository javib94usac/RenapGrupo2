const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var compro = require("../public/javascripts/Comprobaciones.js");
const app = express();
const axios = require('axios');

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
          var parametros {
              url: "http://localhost:9006/setMatrimonio",
              tipo: 'POST',
              parametros: datos

          };
          let uri="http://localhost:10000/enrutar";
          axios.post(uri,parametros) // el json datos
          .then(function (response) {
              console.log("Todo correcto en el request POST");
              //console.log(response.data);
              //res.end(response);
              datos.resultado=response.data.mensaje;
              console.log(datos.resultado);
             

          })
          .catch(function (error) {
              console.log("Error en el request POST");
              console.log(error);
              //res.end(JSON.stringify(error));
          })
          .then(function () {
              // always executed
              console.log("always executed");
              //res.end(JSON.stringify({mess:"always executed"}));
              res.render('index',{datos});
          });

      }else{
          datos.respuesta = "Datos a procesar Incorrectos, los numeros de DPI deben de tener 13 caracteres";
             res.render("index", { datos });
      }

   }else {

          datos.respuesta = "Debe de completar los campos";
             res.render("index", { datos });

   }
   
   
   

});



module.exports = router;