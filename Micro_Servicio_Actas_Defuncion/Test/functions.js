var comprobar= require('../public/javascripts/comprobaciones.js')
//dpi1,fecha
class prueba
{
    constructor() {
        
    }
    comprobarDpi(dpi1,)
    {
        var compro= new comprobar(dpi1,"");
        var result= false;
        if(compro.get_dpi_valido())
        {
            result=true;
        }
        return result;
    }
    comprobarCamposNoVenganBacios(dpi1,fecha)
    {
        var compro=new comprobar(dpi1,fecha);
        var result=false;
        if (compro.get_vacio())
        {
            result=true;
        }
        return result;
    }
    
}
module.exports=prueba;