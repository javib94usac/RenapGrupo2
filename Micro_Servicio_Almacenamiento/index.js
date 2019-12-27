const  express = require('express');
const app = express();
const bodyParser = require('body-parser');
var generatePassword = require('password-generator');
var mysql = require('mysql');
//especificamos el subdirectorio donde se encuentran las páginas estáticas
app.use(express.static(__dirname+'/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const connection = mysql.createConnection({
    host: '35.226.255.150', // ip de la base datos
    user: 'root',
    password:'##ContraseñaDificil123',
    database: 'renapgrupo2'
  })
connection.connect(); // siempre hay que dajar la conexion abierta! 
app.get('/',function(req,res){
    
    /** s
     *  ejemplo de como usar la base datos y regesar la info desde el res.send
     */
   /*connection.query('call setNacimiento(\'abraham 6\',\'elias 6\',1000000310102,1000000410102,\'1993-12-06\',\'M\',10102);', function(err, rows, fields) {
        if (err) throw err;
        console.log('The solution is: ', rows);
        res.send('servico de almacenamiento arriba');
      });*/
      //connection.connect();
      connection.query('select * from persona;', function(err, rows, fields) {
        if (err) throw err;
        console.log('The solution is: ', rows);
        //connection.end();
        res.send('servico de almacenamiento arriba');
      });
   
});
/*set de almacenamineto 
    crear una nueva acta de nacimiento
    parametro 
    {
         dpiPapa: '0123456789123',
        dpiMama: '0123456789123',
        apellidos: 'perez lopez',
        nombres: 'maria jose',
        genero: 'Maculino',
        fecha: '2019-12-03',
        departamento: 'guatemala',
        municipio: 'Guatemala',
        resultado: 'datos de acta correcto' // devolver ok o error ok numero de acta
    }
*/
app.post('/setNacimiento',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("enta en setNacimientos");
    console.log(parametos);
   /* var respuesta=
    {
      estado:"ok",
      mensaje:"llego a set nacimineto set nacimento"
    };
    res.end(JSON.stringify(respuesta));*/
    connection.query('call setNacimiento(\''+parametos.nombres+'\',\''+parametos.apellidos+'\','+parametos.dpiPapa+','+parametos.dpiMama+',\''+parametos.fecha+'\',\''+parametos.genero+'\','+parametos.municipio+');', function(err, rows, fields) {  
      if (err) throw err;
      console.log(rows);
      var r=rows[0];
      r=r[0];
      r=JSON.stringify(r);
      r=r.replace('@','');
      console.log(r);
      r=JSON.parse(r);
      console.log(r);
      r=r.resultadoB;
      r=JSON.parse(r);
      console.log(r);
      var respuesta= r;
      res.end(JSON.stringify(respuesta));
    });
});
/**
 *  get Matrimonio
 *  regresa información del acta
 *  parametros
 *  {
 *      dpi // numero dpi
 *      resultado // devuelve ok o erro si ok devolver informacion
 *  }
 */
app.post('/getNacimiento',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("enta en getNacimientos");
    console.log(parametos);
    var respuesta=
    {
      estado:"ok",
      mensaje:"ddd"
    };
    connection.query('call getNacimiento('+parametos.acta+');', function(err, rows, fields) {  
      if (err) throw err;
      console.log(rows);
      var r=rows[0];
      r=r[0];

      if(r!=undefined)
      {
        r=JSON.stringify(r);
        console.log(r);
        r=JSON.parse(r);
        console.log(r);
        respuesta.estado="200";
        respuesta.mensaje="informacion obtenida  exitosamente"
        respuesta.info=r;
      }
      else
      {
        respuesta.estado="401"
        respuesta.mensaje=" no se encontro infomracion del numero de acta "+parametos.acta
      }
     
      console.log(respuesta);
      res.end(JSON.stringify(respuesta));
    });
});
/* servicios matrimonio
    crear una nueva acta de defunción
    parametros
    {
        dpih: '0123456789123', // dpi hombre
        dpim: '0123456789123', // dpi mujer
        fecha: '2019-12-03', // fecha
        resultado: respuesta error o ok si es ok regresar numero de acta
    }
*/
app.post('/setMatrimonio',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("enta en setMatriminio");
    console.log(parametos);
    connection.query('call setMatrimonio(\''+parametos.fecha+'\','+parametos.dpiHombre+','+parametos.dpiMujer+');', function(err, rows, fields) {
      if (err) throw err;
      var algo= rows[0];  //JSON.stringify(rows[0])
      var algo2=algo[0];
      console.log(algo[0].resultado);
      //console.log('The solution is: ', rows[0].solution);
      var respuesta=algo[0].resultado;
      console.log(respuesta);
      console.log(JSON.parse(respuesta));
      respuesta=JSON.parse(respuesta);
    res.end(JSON.stringify(respuesta));
    });  
});
/***
 *  getdefuncion
 *  regresa información del acta
 *  parametros
 * {
 *     acta // numero
 *     resultado : devuelve ok o error si ok toda la informacion
 * }
 * */ 
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
/* defuncions procedimientos
*   crear una nueva acta de defunción
    parametros
    {
        dpi // numero de dpi
        fecha // fecha
        resultado devolver ok o error si ok devor id del acta   
    }
*/
app.post('/setDefuncion',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("entra en setDefuncion");
    console.log(parametos);
    /*var respuesta=
    {
      estado:"ok",
      mensaje:"llego a set defuncion"
    };
    res.end(JSON.stringify(respuesta));  */
    connection.query('call insertarDefuncion(\''+parametos.fecha+'\','+parametos.dpi+');', function(err, rows, fields) {
      if (err) throw err;
      var algo= rows[0];  //JSON.stringify(rows[0])
      var algo2=algo[0];
      console.log(algo[0].resultado);
      //console.log('The solution is: ', rows[0].solution);
      var respuesta=algo[0].resultado;
      console.log(respuesta);
      console.log(JSON.parse(respuesta));
      respuesta=JSON.parse(respuesta);
    res.end(JSON.stringify(respuesta));
    });
    
});
/**
 * get Defuncion
 * regresa información del acta
 *  parametros
 * {
 *      dpi //numero
 *      repuesta // error o ok si es ok devolver info
 * }
 */
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

/*
    setDivorcio
    crear una nueva acta de divorcio
    parametros
    {
        dpiEsposo //numero de dpi
        dpiEsposa //nmero de dpi
        fecha // fecha
        resltado // devuelve ok o error ok numero de acta divorcio
    }
*/
app.post('/setDivorcio',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("enta en setDivorcio");
    console.log(parametos);
    connection.query('call insertarDivorcio(\''+parametos.fecha+'\','+parametos.dpiEsposo+','+parametos.dpiEsposa+');', function(err, rows, fields) {
      if (err) throw err;
      var algo= rows[0];  //JSON.stringify(rows[0])
      var algo2=algo[0];
      console.log(algo[0].resultado);
      //console.log('The solution is: ', rows[0].solution);
      var respuesta=algo[0].resultado;
      console.log(respuesta);
      console.log(JSON.parse(respuesta));
      respuesta=JSON.parse(respuesta);
    res.end(JSON.stringify(respuesta));
    });
});
/**
 *  get divorcio
 *  regresa información del acta
 * parametros
 * {
 *      dpi: numero de dpi
 *      resultado : // devolver la informacion del acta del divorcio
 * }
 */
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
/*
    setNuevaContraseña
        en este metodo le vamos a mandar a la base de datos el numero dpi y la contrase
        para insertar la nueva clave
        parametos de la variable parametros
            {
                dpi, // este si lo vamos usar
                correo, // este no
                resultado, // devolvenis el mesage si fue una insercion exitosa o no
            }
 */
app.post('/setNuevaContraseña',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("enta set nueva contraseña");
    console.log(parametos);
    var clave=generatePassword(); // genero la nueva clave
    respuesta=
    {
      estado:"ok",
      mensaje:"la nueva clave generada es "+clave
    
    };
    res.end(JSON.stringify(respuesta));
    /*connection.query('call insertarClave('+parametos.dpi+',\''+clave+'\');', function(err, rows, fields) {
      if (err) throw err;
      var algo= rows[0];  //JSON.stringify(rows[0])
      var algo2=algo[0];
      console.log(algo[0].resultado);
      //console.log('The solution is: ', rows[0].solution);
      var respuesta=algo[0].resultado;
      console.log(respuesta);
      console.log(JSON.parse(respuesta));
      respuesta=JSON.parse(respuesta);
      res.end(JSON.stringify(respuesta));
    });*/
});
/** getLogin
 *      la usamos para saber si el usuario exist
 *      parametos
 *      {
 *          dpi : //numero de dpi
 *          clave :// trae la clave
 *          resultado: // devuelve un ok o error
 *      }
 */
app.post('/getLogin',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("enta  getLogin");
    console.log(parametos);
    
    var respuesta=
    {
      estado:"ok",
      mensaje:"error en el login "
    };
    res.end(JSON.stringify(respuesta));  
});
/* set dpi 
        se utiliza para generar un nuevo numero de dpi
        parametros
        {
            numero acta: //numero del acta
            resultado: //regresa el de mensaje ok o error si es ok debe debolver el numero dpi generado
        }
*/
app.post('/setDPI',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("enta  set DPI");
    console.log(parametos);
    var respuesta=
    {
      estado:"ok",
      mensaje:"el numero de dpi es 0123456789"
    };
    res.end(JSON.stringify(respuesta));  
    /*connection.query('call insertarDpi('+parametos.apellidos+','+parametos.numeroacta+','+'\'abcdefg\');', function(err, rows, fields) {
      if (err) throw err;
      var algo= rows[0];  //JSON.stringify(rows[0])
      var algo2=algo[0];
      console.log(algo[0].resultado);
      //console.log('The solution is: ', rows[0].solution);
      var respuesta=algo[0].resultado;
      console.log(respuesta);
      console.log(JSON.parse(respuesta));
      respuesta=JSON.parse(respuesta);
    res.end(JSON.stringify(respuesta));
    });*/
});
/**getDPI
 *      se devulve la informacion del dpi enviado
 *      parametros
 *      {
 *          dpi : numero de depi
 *          resultado : ok o error si es ok devulbe toda la informacion ta encontrada
 *      }
 * 
 */
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
/*  set licencia 
    se guarda el nuevo numero de licencia
    parametros
    {
        dpi //numeor de dpi
        tipo // tipo de licencia como es nuevo solo dos opciones C para carro y M para moto
        resulado // debuelbo ok  o error si ok todo esta bien
    }
*/
app.post('/setLicencia',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("enta  set licencia");
    console.log(parametos);  
   /* var respuesta=
    {
      estado:"ok",
      mensaje:"entro en set licencia"
    };
    res.end(JSON.stringify(respuesta));  */
    connection.query('call insertarLicencia(0,\''+parametos.tipo+'\','+parametos.dpi+');', function(err, rows, fields) {
      if (err) throw err;
      var algo= rows[0];  //JSON.stringify(rows[0])
      var algo2=algo[0];
      console.log(algo[0].resultado);
      //console.log('The solution is: ', rows[0].solution);
      var respuesta=algo[0].resultado;
      console.log(respuesta);
      console.log(JSON.parse(respuesta));
      respuesta=JSON.parse(respuesta);
    res.end(JSON.stringify(respuesta));
    });
});
/**setActualizar
 * metodo para actializar licencia solo B o A
 * parametros
 * {
 *      dpi // numero de dpi
 *      tipo // tipo de licencia B o A
 *      resultado // devolber ok o error ok si se pudo actualizar
 * }
 */
app.post('/setActualizar',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("enta  set actualizar");
    console.log(parametos);
    connection.query('call actualizarTipoLicencia('+parametos.dpi+',\''+parametos.tipo+'\');', function(err, rows, fields) {
      if (err) throw err;
      var algo= rows[0];  //JSON.stringify(rows[0])
      var algo2=algo[0];
      console.log(algo[0].resultado);
      //console.log('The solution is: ', rows[0].solution);
      var respuesta=algo[0].resultado;
      console.log(respuesta);
      console.log(JSON.parse(respuesta));
      respuesta=JSON.parse(respuesta);
    res.end(JSON.stringify(respuesta));
    }); 
});
/**
 * meto de inicio donde corre el puerto
 */
app.listen(9006,function(){
    console.log("microservicio almacenamiento esta vivo en el puerto 9006");
});