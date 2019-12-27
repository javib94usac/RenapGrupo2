var express = require('express');
var compro = require("../public/javascripts/Comprobaciones.js");
const axios=require('axios');
var router = express.Router();

/* GET home page. */
/*
  controlador del la pagina
  si los datos estan correctos 
  se manda al esb
  sino da el mensaje de error
*/
router.post('/', function(req, res, next) {
  var datos=
  {
      acta: req.body.acta,
      resultado:"acta en proceso",
      
  };
  /*
      Esto en maso manos lo que tendria que venir en el body
      {
        “url”:”/ruta/consumir/microservicio”,
        “tipo”:”TIPO_COMUNICACION”,
        “parámetros”:{
             “parametro1”:”parametro1”,
             “parametro2”:”parametro2”
              get_es_numero()
        }
      }*/
  console.log(datos); 
  var comprobar= new compro(datos.acta,"adfadf");
  if(comprobar.get_vacio())
  {
    if (comprobar.get_es_numero())
    {
        
          datos.resultado="datos de acta correcto";
          var ip=req.body.esb
          var parametros=
          {
            url:"http://"+ip+":9006/getMatrimonio", //localhost:3001/verdatos
            tipo:"POST",// si es post o get // post
            parametros:datos //mis datos 
          }; 
          // uri es la url del esp ip:puerto post/comunicacion
          let uri="http://"+ip+":10000/post/comunicacionesb";
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
              res.render('menu',{datos})
              
          });
        
       
    }
    else 
    {
    
      datos.resultado="el numero de acta no es valido";
      res.render('menu',{datos});
    }
  }
  else 
  {
  
    datos.resultado="debe llenar todos los campos";
    res.render('menu',{datos});
  }
  
  
});

module.exports = router;
