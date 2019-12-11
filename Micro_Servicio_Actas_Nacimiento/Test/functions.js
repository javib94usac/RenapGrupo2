var comprobar= require('../public/javascripts/comprobaciones.js')
//dpi1,dpi2, nombres,apellisdos,municiopio,departamento,fecha
class prueba
{
    constructor() {
        
    }
    comprobarDpi(dpi1,dpi2)
    {
        var compro= new comprobar(dpi1,dpi2,"","","","","");
        var result= false;
        if(compro.get_dpi_validos())
        {
            result=true;
        }
        return result;
    }
    comprobarCamposNoVenganBacios(dpi1,dpi2,nombres,apellisdos,municiopio,departamento,fecha)
    {
        var compro=new comprobar(dpi1,dpi2,nombres,apellisdos,municiopio,departamento,fecha);
        var result=false;
        if (compro.get_vacio())
        {
            result=true;
        }
        return result;
    }
    comprobarNombresApellidosCorectos(nombres,apellisdos)
    {
        var compro=new comprobar("","",nombres,apellisdos,"","","");
        var result=false;
        if (compro.get_nombre_valido())
        {
            result=true;
        }
        return result; 
    }
}
module.exports=prueba;