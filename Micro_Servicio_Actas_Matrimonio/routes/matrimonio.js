const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var compro = require("../public/javascripts/Comprobaciones.js");
const app = express();
const axios = require('axios');

/* Se extrae los datos de la vista para ejecutar el metodo post. */
router.post("/", function(req, res, next) {
  datos = {
    dpihombre: req.body.dpiHombre, //dpi  del hombre, futuro esposo
    dpimujer: req.body.dpiMujer, // dpi de la mujer, futura esposa
    fecha: req.body.fecha,    // fecha en la que se casaron
    resultado: "Acta en proceso"
  };
  console.log(datos);
   var comprobar = new compro(datos.dpihombre,datos.dpimujer,datos.fecha);
   if (comprobar.get_vacio()){

      if (comprobar.get_dpi_validos()){

          
          datos.resultado = "Datos a procesar correctos";
          var ip = req.body.esb; // GENERAR LA VARIABLE DE LA IP, VERIFICAR SI ES POST O GET
          var parametros ={
              url: "http://"+ip+":9006/setMatrimonio",
              tipo: 'POST',
              parametros: datos

          };
          let uri = "http://" + ip + ":10000/post/comunicacionesb"; // SE TOMA TODA ESTA LINEA COMPLETA EN CADA MICROSERVICIO
          
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
          datos.resultado = "Datos a procesar Incorrectos, los numeros de DPI deben de tener 13 caracteres";
             res.render("index", { datos });
      }

   }else {

          datos.resultado = "Debe de completar los campos";
             res.render("index", { datos });

   }
   
   
   

});



module.exports = router;