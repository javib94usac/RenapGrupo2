var express = require('express');
var router = express.Router();
var compro = require("../public/javascripts/Comprobaciones.js");
const axios=require('axios');

//email route

/* GET home page. */


router.get('/', function(req, res, next) {
    datos=
    {
        dpi:req.query.dpi,
        tipo:req.query.tipo,
        años:0,
        resultado:req.query.dpi
        

    };
    console.log(datos);
    if(datos.resultado!=undefined)
    {
        var comprobar= new compro(datos.dpi,datos.tipo); 
        if(comprobar.get_vacio())
        {
            if(comprobar.get_dpi_validos())
            {
                datos.resultado="todo correcto";

                var parametros=
              {
                url:"http://10.5.0.3:9006/setLicencia", //localhost:3001/verdatos
                tipo:"POST",// si es post o get // post
                parametros:datos //mis datos 
              };
              let uri="http://10.5.0.10:10000/enrutar";
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
                  datos.resultado="error al conrectar esb";
                 
              })
              .then(function () {
                  // always executed
                  console.log("always executed");
                  //res.end(JSON.stringify({mess:"always executed"}));
                  res.render('setLicencia',{datos});
              });
                
                
               
            }
            else 
            {
                datos.resultado="debe ingresar un numero valido ";
                res.render('setLicencia',{datos});
            }
        } 
        else
        {
            datos.resultado="debe ingresar datos ";
            res.render('setLicencia',{datos});
        }
    }
    else
    {
        res.render('setLicencia',{datos});
    }
    

  
});

module.exports = router;
