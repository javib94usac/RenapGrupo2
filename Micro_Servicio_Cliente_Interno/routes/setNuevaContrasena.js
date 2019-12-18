var express = require('express');
var router = express.Router();
var compro = require("../public/javascripts/Comprobaciones.js");
const axios=require('axios');
const nodemailer=require("nodemailer");
//email route

/* GET home page. */


router.get('/', function(req, res, next) {
    datos=
    {
        dpi:req.query.dpi,
        correo:req.query.correo,
        resultado:req.query.dpi
        

    };
    console.log(datos);
    if(datos.resultado!=undefined)
    {
        var comprobar= new compro(datos.dpi,datos.correo); 
        if(comprobar.get_vacio())
        {
            if(comprobar.get_dpi_validos())
            {
                datos.resultado="todo correcto";

                var parametros=
              {
                url:"http://localhost:9006/setNuevaContraseña", //localhost:3001/verdatos
                tipo:"POST",// si es post o get // post
                parametros:datos //mis datos 
              };
              let uri="http://localhost:10000/enrutar";
              axios.post(uri,parametros) // el json datos
              .then(function (response) {
                  console.log("Todo correcto en el request POST");
                  //console.log(response.data);
                  //res.end(response);
                  datos.resultado=response.data.mensaje;
                  console.log(datos.resultado);
                  var transporter = nodemailer.createTransport({
                    service: 'gmail', //al usar un servicio bien conocido, no es necesario proveer un nombre de servidor.
                    auth: {
                      user: 'hboiton2308@gmail.com',
                      pass: 'sa201911'
                    },
                  });
                  var mailOptions = {
                    from: 'hboiton2308@gmail.com',
                    to: datos.correo,
                    subject: 'Clave usuario renap',
                    text: 'la nueva clave es: '+datos.resultado
                  };
                console.log("sending email", mailOptions);
                transporter.sendMail(mailOptions, function (error, info) {
                    console.log("senMail returned!");
                    if (error) {
                      console.log("ERROR!!!!!!", error);
                      datos.resultado="error al mandar el correo"
                    } else {
                      console.log('Email sent: ' + info.response);
                      datos.resultado="correo enviado exitosamente";
                    }
                    res.render('setNuevaContrasena',{datos});
                  });
    
              })
              .catch(function (error) {
                  console.log("Error en el request POST");
                  console.log(error);
                  //res.end(JSON.stringify(error));
                  datos.resultado="error al conrectar esb";
                  res.render('setNuevaContrasena',{datos});
              })
              .then(function () {
                  // always executed
                  console.log("always executed");
                  //res.end(JSON.stringify({mess:"always executed"}));
                  //res.render('index',{datos});
              });
                
                
               
            }
            else 
            {
                datos.resultado="debe ingresar un numero de dpi valido ";
                res.render('setNuevaContrasena',{datos});
            }
        } 
        else
        {
            datos.resultado="debe ingresar datos ";
            res.render('setNuevaContrasena',{datos});
        }
    }
    else
    {
        res.render('setNuevaContrasena',{datos});
    }
    

  
});

module.exports = router;
