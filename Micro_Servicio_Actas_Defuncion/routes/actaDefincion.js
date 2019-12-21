var express = require('express');
var compro = require("../public/javascripts/Comprobaciones.js");
var router = express.Router();
const axios = require("axios");

/* GET home page. */

router.post('/', function(req, res, next) {
  var datos=
  {
      dpi: req.body.dpi,
      fecha:req.body.fecha,
      resultado:"acta en proceso",
      
  }
  console.log(datos); 
  var comprobar= new compro(datos.dpi,datos.fecha);
  if(comprobar.get_vacio())
  {
    if (comprobar.get_dpi_valido())
    {
       
          datos.resultado="datos de acta correcto"

            var parametros = {
              url: "http://Almacenamiento:9006/setDefuncion",
              tipo: "POST",
              parametros : datos
              
            };
            let uri = "http://ServiceBus:10000/enrutar";
            axios.post(uri, parametros) // el json datos
              .then(function (response) {
                console.log("Todo correcto en el request POST");
                //console.log(response.data);
                //res.end(response);
                datos.resultado = response.data.mensaje;
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
                res.render('index', { datos });
              });
       
    }
    else 
    {
      datos.resultado="el numero de dpi no es valido deben ser solo numero sin guiones o signos y de longitud 13"
      res.render('index', { datos })
    }
  }
  else 
  {
  
      datos.resultado="debe llenar todos los campos"
      res.render('index', { datos })
  }

  
});

module.exports = router;