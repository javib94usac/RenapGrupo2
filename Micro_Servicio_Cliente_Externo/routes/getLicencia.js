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
      dpi: req.body.acta,
      resultado:"acta en proceso",
      info:''
      
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
  var comprobar= new compro(datos.dpi,"adfadf");
  if(comprobar.get_vacio())
  {
    if (comprobar.get_es_numero())
    {
        
          datos.resultado="datos de acta correcto";
          var ip =req.body.esb;
          var parametros=
          {
            url:"http://"+ip+":9006/getLicencia", //localhost:3001/verdatos
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
              if(response.data.estado='200')
              {
                datos.info=JSON.stringify(response.data.info);
                var vec=response.data.info;
                var cuerpo="reporte Licencia \n";
                for(var i=0;i<vec.length;i++)
                { 
                  
                  cuerpo+="nombre: "+vec[i].nombre+"\n";
                  cuerpo+="apellidos: "+vec[i].apellidos+"\n";
                  cuerpo+="fechanac: "+vec[i].fechanac+"\n";
                  cuerpo+="tipo: "+vec[i].tipo+"\n";
                  cuerpo+="anosAntiguedad: "+vec[i].anosAntiguedad+"\n";
                  cuerpo+="genero: "+vec[i].genero+"\n";
                  cuerpo+="dpi: "+vec[i].dpi+"\n";
                  cuerpo+= "----------------------\n";

                }
                datos.info=vec;
                var doc = new PDF();
                doc.pipe(fs.createWriteStream(__dirname + '/reportes/reporte.pdf'));
                doc.text(cuerpo,{
	              align: 'justify'
                });
                doc.end();
                datos.reporte=__dirname + '/reportes/reporte.pdf';
              }

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
              res.render('menu',{datos});
              
          });
        
       
    }
    else 
    {
    
      datos.resultado="el numero de dpi no es valido";
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
