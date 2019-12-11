var express = require('express');
var compro = require("../public/javascripts/Comprobaciones.js");
var router = express.Router();

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