var comprobar= require('../public/javascripts/comprobaciones.js')

class prueba
{
    constructor() {
        
    }
    comprobarDpi(dpi1,dpi2)
    {
        var compro= new comprobar(dpi1,dpi2,"");
        var result= false;
        if(compro.get_dpi_validos())
        {
            result=true;
        }
        return result;
    }
    comprobarCamposNoVenganBacios(dpi1,dpi2,fecha)
    {
        var compro=new comprobar(dpi1,dpi2,fecha);
        var result=false;
        if (compro.get_vacio())
        {
            result=true;
        }
        return result;
    }
}
module.exports=prueba;