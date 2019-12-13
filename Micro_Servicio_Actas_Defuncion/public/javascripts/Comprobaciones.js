/*
	clase de comprobaciones
*/
class Comprobaciones {
    constructor(dpi1,fecha) {
            
        this.dpi=dpi1;
        this.fecha=fecha;
       
    }
    get_vacio()
    {
        if(this.dpi!=""&&this.fecha!="")
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    get_dpi_valido()
    {
        if(!isNaN(this.dpi.trim()))
        {
           
            if(this.dpi.length==13)
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