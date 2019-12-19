const  express = require('express');
const app = express();
const bodyParser = require('body-parser');
var generatePassword = require('password-generator');
//especificamos el subdirectorio donde se encuentran las páginas estáticas
app.use(express.static(__dirname+'/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){

     res.send('servico de almacenamiento arriba');
});
/*set de almacenamineto */
app.post('/setNacimiento',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("enta en setNacimientos");

    console.log(parametos);
    var respuesta=
    {
      estado:"ok",
      mensaje:"llego a set nacimineto set nacimento"
    };
    res.end(JSON.stringify(respuesta));  
});

app.post('/getNacimiento',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("enta en getNacimientos");
    console.log(parametos);
    var respuesta=
    {
      estado:"ok",
      mensaje:"llego a get nacimineto"
    };
    res.end(JSON.stringify(respuesta));  
});
/* servicios matrimonio */
app.post('/setMatrimonio',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("enta en setMatriminio");
    console.log(parametos);
    var respuesta=
    {
      estado:"ok",
      mensaje:"llego a set matrimonio"
    };
    res.end(JSON.stringify(respuesta));  
});

app.post('/getMatrimonio',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("enta en getMatrimonio");
    console.log(parametos);
    var respuesta=
    {
      estado:"ok",
      mensaje:"llego a get matrimonio"
    };
    res.end(JSON.stringify(respuesta));  
});
/* defuncions procedimientos */
app.post('/setDefuncion',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("entra en setDefuncion");
    console.log(parametos);
    var respuesta=
    {
      estado:"ok",
      mensaje:"llego a set defuncion"
    };
    res.end(JSON.stringify(respuesta));  
});

app.post('/getDefuncion',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("enta en get defuncion");
    console.log(parametos);
    var respuesta=
    {
      estado:"ok",
      mensaje:"llego a get defuncion"
    };
    res.end(JSON.stringify(respuesta));  
});

/* */
app.post('/setDivorcio',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("enta en setDivorcio");
    console.log(parametos);
    var respuesta=
    {
      estado:"ok",
      mensaje:"llego a set divorcio"
    };
    res.end(JSON.stringify(respuesta));  
});

app.post('/getDivorcio',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("enta en get divorcio");
    console.log(parametos);
    var respuesta=
    {
      estado:"ok",
      mensaje:"llego a get divorcio"
    };
    res.end(JSON.stringify(respuesta));  
});
/*setNuevaContraseña */
app.post('/setNuevaContraseña',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("enta set nueva contraseña");
    console.log(parametos);
    var clave=generatePassword()
    var respuesta=
    {
      estado:"ok",
      mensaje:""+clave
    };
    res.end(JSON.stringify(respuesta));  
});
/** getLogin */
app.post('/getLogin',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("enta  getLogin");
    console.log(parametos);
    
    var respuesta=
    {
      estado:"ok",
      mensaje:"get login"
    };
    res.end(JSON.stringify(respuesta));  
});
/* set dpi */
app.post('/setDPI',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("enta  set DPI");
    console.log(parametos);
    
    var respuesta=
    {
      estado:"ok",
      mensaje:"el numero de dpi es"
    };
    res.end(JSON.stringify(respuesta));  
});
/**getDPI */
app.post('/getDPI',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("enta  get DPI");
    console.log(parametos);
    
    var respuesta=
    {
      estado:"ok",
      mensaje:"el numero de dpi es"
    };
    res.end(JSON.stringify(respuesta));  
});
/*set licencia */
app.post('/setLicencia',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("enta  set licencia");
    console.log(parametos);
    
    var respuesta=
    {
      estado:"ok",
      mensaje:"entro en set licencia"
    };
    res.end(JSON.stringify(respuesta));  
});
/**setActualizar */
app.post('/setActualizar',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("enta  set actualizar");
    console.log(parametos);
    
    var respuesta=
    {
      estado:"ok",
      mensaje:"entro en set actualizar"
    };
    res.end(JSON.stringify(respuesta));  
});

app.listen(9006,function(){
    console.log("microservicio almacenamiento esta vivo en el puerto 9006");
});