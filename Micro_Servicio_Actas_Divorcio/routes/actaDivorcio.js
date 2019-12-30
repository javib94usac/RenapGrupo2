var express = require('express');
var compro = require("../public/javascripts/Comprobaciones.js");
const axios = require('axios');
var router = express.Router();

/* GET home page. */

router.post('/', function(req, res, next) {
  var datos=
  {
      dpiesposo: req.body.dpiEsposo,
      dpiesposa: req.body.dpiEsposa,
      fecha:req.body.fecha,
      resultado:"acta en proceso",
      
  }
  console.log(datos); 
  var comprobar= new compro(datos.dpiesposa,datos.dpiesposo,datos.fecha);
  if(comprobar.get_vacio())
  {
    if (comprobar.get_dpi_validos())
    {
        datos.resultado="datos de acta correcto";
      var ip = req.body.esb; 
        var parametros=
          {
            url:"http://"+ip+":9006/setDivorcio", //localhost:3001/verdatos
            tipo:"POST",// si es post o get // post
            parametros:datos //mis datos 
          }; 
          let uri = "http://" + ip + ":10000/post/comunicacionesb"; 
          
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
    }
    else 
    {
    
      datos.resultado="el numero de dpi no es valido deben ser solo numero sin guiones o signos y de longitud 13";
      res.render('index',{datos})
    }
  }
  else 
  {
  
    datos.resultado="debe llenar todos los campos";
    res.render('index',{datos})
  }
 
  
});

module.exports = router;