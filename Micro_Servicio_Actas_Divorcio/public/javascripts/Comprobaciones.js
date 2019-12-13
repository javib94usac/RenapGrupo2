/*
 clase de comprobaciones
*/
class Comprobaciones {
    constructor(dpi1,dpi2, fecha) {
      
        
        this.dpiPadre=dpi1;
        this.dpiMadre=dpi2;
        this.fecha=fecha;
    }
    get_vacio()
    {
        if(this.dpiPadre!=""&&this.dpiMadre!=""&&this.fecha!="")
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    get_dpi_validos()
    {
        if(!isNaN(this.dpiPadre.trim())&&!isNaN(this.dpiMadre.trim()))
        {
            
            if(this.dpiPadre.length==13&&this.dpiMadre.length==13)
            {
                return true
            }
            else{return false;}
            
        }
        else
        {
           
            return false;
        }
    }
   
}
module.exports= Comprobaciones;