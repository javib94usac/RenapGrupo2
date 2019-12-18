/*
    clase que comprueba que los 
    datos sean validos
        -dpi
        -nombre
        -fecha
        -municipio
        -departamentos
* */
class Comprobaciones {
    constructor(dpi1,correo) {
      
        this.dpi=dpi1;
        this.correo=correo;
    }
    get_vacio()
    {
        if(this.dpi!=""&&this.correo!="")
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    get_nombre_valido()
    {
        if(this.NoConetieneNumeros(this.correo))
        {
            return true;
        }
        else
        { 
            return false;
        }
        //return true;
    }
    get_dpi_validos()
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
        
        //return true;
    }
    get_es_numero()
    {
        var result= false;
        if(!isNaN(this.dpi))
        {
            result=true;
        }
        return result;
    }
    NoConetieneNumeros(cadena)
    {
        var numeros="0123456789"
        var result =true;
        for(var i=0;i<cadena.length;i++)
        {
            if(numeros.indexOf(cadena.charAt(i),0)!=-1)
            {
                result=false;
                break;
            }
        }
        return result;
    }

}
module.exports= Comprobaciones;