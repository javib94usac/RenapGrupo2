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
        dpimama: '0123456789123',
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
    connection.query('call setNacimiento(\''+parametos.nombres+'\',\''+parametos.apellidos+'\','+parametos.dpipapa+','+parametos.dpimama+',\''+parametos.fecha+'\',\''+parametos.genero+'\','+parametos.municipio+');', function(err, rows, fields) {  
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
    connection.query('call getNacimiento('+parametos.dpipadremadre+');', function(err, rows, fields) {  
      if (err) throw err;
      console.log(rows);
      var r=rows[0];
      r=r[0];

      if(r!=undefined)
      {
        
        var fila;
        var vecFila=[];
        console.log("dddd");
        for(var i=0;i<rows[0].length;i++)
        {
          fila=rows[0][i];
          vecFila.push(fila);
          //console.log(fila);
        }
        console.log("--------------");
        console.log(vecFila);
        r=vecFila;
        respuesta.estado="200";
        respuesta.mensaje="informacion obtenida  exitosamente"+parametos.dpipadremadre;
        respuesta.info=r;
      }
      else
      {
        respuesta.estado="401";
        respuesta.mensaje=" no se encontro infomracion del numero de acta "+parametos.dpipadremadreg;
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
    //call setMatrimonio("2019-12-26",1000002210102,1000002310102);
    connection.query('call setMatrimonio(\''+parametos.fecha+'\','+parametos.dpihombre+','+parametos.dpimujer+');', function(err, rows, fields) {
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
      mensaje:"ddd"
    };
    connection.query('call getMatrimonio('+parametos.dpi+');', function(err, rows, fields) {  
      if (err) throw err;
      console.log(rows);
      var r=rows[0];
      r=r[0];

      if(r!=undefined)
      {
        var fila;
        var vecFila=[];
        console.log("dddd");
        for(var i=0;i<rows[0].length;i++)
        {
          fila=rows[0][i];
          vecFila.push(fila);
          //console.log(fila);
        }
        console.log("--------------");
        console.log(vecFila);
        //console.log(r);
        r=vecFila;
        respuesta.estado="200";
        respuesta.mensaje="informacion obtenida  exitosamente matrimonio";
        respuesta.info=r;
      }
      else
      {
        respuesta.estado="401";
        respuesta.mensaje=" no se encontro infomracion del numero de acta "+parametos.dpi;
      }
     
      console.log(respuesta);
      res.end(JSON.stringify(respuesta));
    }); 
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
    //call setDefuncion(1000002410102,"2019-12-26");
    connection.query('call setDefuncion('+parametos.dpi+',\''+parametos.fecha+'\');', function(err, rows, fields) {
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
      mensaje:"ddd"
    };
    connection.query('call getDefuncion('+parametos.dpi+');', function(err, rows, fields) {  
      if (err) throw err;
      console.log(rows);
      var r=rows[0];
      r=r[0];

      if(r!=undefined)
      {
        var fila;
        var vecFila=[];
        console.log("dddd");
        for(var i=0;i<rows[0].length;i++)
        {
          fila=rows[0][i];
          vecFila.push(fila);
          //console.log(fila);
        }
        console.log("--------------");
        console.log(vecFila);
        //console.log(r);
        r=vecFila;
        respuesta.estado="200";
        respuesta.mensaje="informacion obtenida  exitosamente defuncion";
        respuesta.info=r;
      }
      else
      {
        respuesta.estado="401";
        respuesta.mensaje=" no se encontro infomracion del numero de acta "+parametos.dpi;
      }
     
      console.log(respuesta);
      res.end(JSON.stringify(respuesta));
    }); 
});

/*
    setDivorcio
    crear una nueva acta de divorcio
    parametros
    {
        dpiesposo //numero de dpi
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
    //call setDivorcio("2019-12-27",1000002210102,1000002310102);
    connection.query('call setDivorcio(\''+parametos.fecha+'\','+parametos.dpiesposo+','+parametos.dpiesposa+');', function(err, rows, fields) {
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
      mensaje:"ddd"
    };
    connection.query('call getDivorcio('+parametos.dpi+');', function(err, rows, fields) {  
      if (err) throw err;
      console.log(rows);
      var r=rows[0];
      r=r[0];
      
      if(r!=undefined)
      {
        var fila;
        var vecFila=[];
        console.log("dddd");
        for(var i=0;i<rows[0].length;i++)
        {
          fila=rows[0][i];
          vecFila.push(fila);
          //console.log(fila);
        }
        console.log("--------------");
        console.log(vecFila);
        //console.log(r);
        r=vecFila;
       // console.log(r);
        respuesta.estado="200";
        respuesta.mensaje="informacion obtenida  exitosamente del divorcio";
        respuesta.info=r;
      }
      else
      {
        respuesta.estado="401";
        respuesta.mensaje=" no se encontro infomracion del numero de acta "+parametos.dpi;
      }
     
      console.log(respuesta);
      res.end(JSON.stringify(respuesta));
    });
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
    //call setNuevaContrasena(1000002310102,"avengers");
    connection.query('call setNuevaContrasena('+parametos.dpi+',\''+clave+'\');', function(err, rows, fields) {
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
        respuesta.mensaje+=" la nueva contraseñan es :"+clave
        res.end(JSON.stringify(respuesta));
    });
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
      mensaje:"ddd"
    };
    connection.query('call getLogin('+parametos.dpi+',\''+parametos.clave+'\');', function(err, rows, fields) {  
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
        respuesta.mensaje="informacion obtenida  exitosamente";
        respuesta.info=r;
      }
      else
      {
        respuesta.estado="401"
        respuesta.mensaje=" informaccion de acceso erronea ";
      }
     
      console.log(respuesta);
      res.end(JSON.stringify(respuesta));
    }); 
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
    //call setDpi(1000002610102,10000018,'dfg');
    //var dp=parametos.numeroacta+""+;
    
    console.log(dp);
    connection.query('call setDpi('+parametos.numeroacta+','+'\'abcdefg\');', function(err, rows, fields) {
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
      mensaje:"ddd"
    };
    connection.query('call getDpi('+parametos.dpi+');', function(err, rows, fields) {  
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
        respuesta.mensaje="informacion obtenida  exitosamente de dpi "+parametos.dpi;
        respuesta.info=r;
      }
      else
      {
        respuesta.estado="401"
        respuesta.mensaje=" no se encontro infomracion del numero de dpi  "+parametos.dpi;
      }
     
      console.log(respuesta);
      res.end(JSON.stringify(respuesta));
    }); 
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
    //call setLicencia(1000002410102);
    connection.query('call setLicencia('+parametos.dpi+',\''+parametos.tipo+'\');', function(err, rows, fields) {
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
    //call setActualizar(1000002410102,"B");
    connection.query('call setActualizar('+parametos.dpi+',\''+parametos.tipo+'\');', function(err, rows, fields) {
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
/** */
app.post('/getLicencia',async(req,res)=>
{
    var parametos=req.body.params;
    console.log("enta  get DPI");
    console.log(parametos);
    var respuesta=
    {
      estado:"ok",
      mensaje:"ddd"
    };
    connection.query('call getLicencia('+parametos.dpi+');', function(err, rows, fields) {  
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
        respuesta.mensaje="informacion obtenida  exitosamente de licencia "+parametos.dpi;
        respuesta.info=r;
      }
      else
      {
        respuesta.estado="401";
        respuesta.mensaje=" no se encontro infomracion del numero de licencia  "+parametos.dpi;
      }
     
      console.log(respuesta);
      res.end(JSON.stringify(respuesta));
    }); 
});
/**
 * meto de inicio donde corre el puerto
 */
app.listen(9006,function(){
    console.log("microservicio almacenamiento esta vivo en el puerto 9006");
});