const  express = require('express');
const app = express();
const bodyParser = require('body-parser');
const api=require('./api.js');
//especificamos el subdirectorio donde se encuentran las páginas estáticas
app.use(express.static(__dirname+'/public'));

//extended: false significa que parsea solo string (no archivos de imagenes por ejemplo)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(api);


app.listen(10000,function(){
    console.log(" esta vivo en el puerto 10000");
});