const express = require('express');
const router = express.Router();
const axios = require('axios');
 
 router.post("/enrutar",async(req,res)=>{
    console.log("si le pego al uri de comunicacion");
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
   
      let verbo = req.body.tipo; // si es post o get
      let uri = req.body.url; //ruta a donde voy 
      verbo = verbo.toUpperCase();
      switch(verbo)
      {
         case 'GET':
            console.log("ENTRO A GET switch ESB");
            axios.get(uri,{params:req.body.parametros}) // el json datos
            .then(function (response) {
              console.log("Todo correcto en el request GET");
              res.end(JSON.stringify(response.data));

            })
            .catch(function (error) {
              console.log("Error en el request GET");
              console.log(error);
              res.end(JSON.stringify(error));
            })
            .then(function () {
              // always executed
              console.log("always executed");
              
            });
            break;
          case 'POST':           
            axios.post(uri, {params: req.body.parametros})
            .then(function (response) {
              console.log("Todo correcto en el request POST");
              res.end(JSON.stringify(response.data));
            })
            .catch(function (error) {
              console.log("Error en el request POST");
              console.log(error);
              res.end(JSON.stringify(error));
            })
            .then(function () {
              // always executed
              console.log("always executed");
            });  
            break;
          case 'DELETE':{
            //COMO CREO EL REQUEST???
            axios.delete(uri, {params:req.body.parametros})
            .then(function (response) {
              //console.log(response);
              res.end(JSON.stringify(response.data));
            })
            .catch(function (error) {
              console.log(error);
              res.end(JSON.stringify(error));
            })
            .then(function () {
              // always executed
              console.log("always executed");
            });  
            break;
          } 
          case 'PUT':{
            //COMO CREO EL REQUEST???
             axios.post(uri, req.body.parametros)
            .then(function (response) {
              //console.log(response);
              res.end(JSON.stringify(response.data));
            })
            .catch(function (error) {
              console.log(error);
              res.end(JSON.stringify(error));
            })
            .then(function () {
              // always executed
              console.log("always executed");
            });  
            break;
          }
          default:{
            console.log('Algo ocurrio mal con el TIPO del querest: '+verbo);
          }
      }  
    });

  module.exports = router;