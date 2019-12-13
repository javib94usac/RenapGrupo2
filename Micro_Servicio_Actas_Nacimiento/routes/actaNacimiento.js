var express = require('express');
var compro = require("../public/javascripts/Comprobaciones.js");
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
      
  }
  console.log(datos); 
  var comprobar= new compro(datos.dpiPapa,datos.dpiMama,datos.nombres,datos.apellidos,datos.municipio,datos.departamento,datos.fecha);
  if(comprobar.get_vacio())
  {
    if (comprobar.get_dpi_validos())
    {
        if(comprobar.get_nombre_valido())
        {
          datos.resultado="datos de acta correcto"
        }
        else
        {
           datos.resultado="nombre o apellidos  no es valido"
        }
    }
    else 
    {
    
      datos.resultado="el numero de dpi no es valido deben ser solo numero sin guiones o signos y de longitud 13"
    }
  }
  else 
  {
  
    datos.resultado="debe llenar todos los campos"
  }
  res.render('index',{datos})
  
});

module.exports = router;
