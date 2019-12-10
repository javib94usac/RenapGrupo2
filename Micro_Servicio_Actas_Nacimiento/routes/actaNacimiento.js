var express = require('express');
var compro = require("../public/javascripts/Comprobaciones.js");
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  var datos=
  {
      dpiPapa: req.query.dpiPapa,
      dpiMama: req.query.dpiMama,
      apellidos:req.query.apellidos,
      nombres: req.query.nombres,
      genero:req.query.genero,
      fecha:req.query.fecha,
      departamento:req.query.departamento,
      municipio:req.query.municipio,
      resultado:"acta en proceso",
      
  }
  console.log(datos); 
  var comprobar= new compro(datos.dpiPapa,datos.dpiMama,datos.nombres,datos.apellidos);
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
           datos.resultado="el nombre no es valido"
        }
    }
    else 
    {
    
      datos.resultado="el numero de dpi no es valido deben ser solo numero sin guiones o sinos y de longitud 13"
    }
  }
  else 
  {
  
    datos.resultado="debe llenar todos los campos"
  }
  res.render('index',{datos})
  
});

module.exports = router;
