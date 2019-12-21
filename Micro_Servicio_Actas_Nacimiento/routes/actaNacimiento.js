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
      dpiPapa: req.body.dpiPapa,
      dpiMama: req.body.dpiMama,
      apellidos:req.body.apellidos,
      nombres: req.body.nombres,
      genero:req.body.genero,
      fecha:req.body.fecha,
      departamento:req.body.departamento,
      municipio:req.body.municipio,
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
        }
      }*/
  console.log(datos); 
  var comprobar= new compro(datos.dpiPapa,datos.dpiMama,datos.nombres,datos.apellidos,datos.municipio,datos.departamento,datos.fecha);
  if(comprobar.get_vacio())
  {
    if (comprobar.get_dpi_validos())
    {
        if(comprobar.get_nombre_valido())
        {
          datos.resultado="datos de acta correcto";
          var parametros=
          {
            url:"http://Almacenamiento:9006/setNacimiento", //localhost:3001/verdatos
            tipo:"POST",// si es post o get // post
            parametros:datos //mis datos 
          }; 
          // uri es la url del esp ip:puerto post/comunicacion
          let uri="http://ServiceBus:10000/enrutar";
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
           datos.resultado="nombre o apellidos  no es valido";
           res.render('index',{datos});
        }
    }
    else 
    {
    
      datos.resultado="el numero de dpi no es valido deben ser solo numero sin guiones o signos y de longitud 13"
      res.render('index',{datos});
    }
  }
  else 
  {
  
    datos.resultado="debe llenar todos los campos";
    res.render('index',{datos});
  }
  
  
});

module.exports = router;
