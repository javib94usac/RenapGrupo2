class Comprobaciones {
    constructor(dpi1,dpi2, nombres,apellisdos,municiopio,departamento) {
      
        this.nombres=nombres;
        this.apellisdos=apellisdos;
        this.dpiPadre=dpi1;
        this.dpiMadre=dpi2;
        this.municiopio=municiopio;
        this.departamento=departamento;
    }
    get_vacio()
    {
        if(this.nombres!=""&&this.apellisdos!=""&&this.dpiPadre!=""&&this.dpiMadre!=""&&this.municiopio!=""&&this.departamento!="")
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
        if(this.NoConetieneNumeros(this.nombres)&&this.NoConetieneNumeros(this.apellisdos.trim()))
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
            console.log('-----');
            console.log(this.dpiPadre.length);
            console.log(this.dpiMadre.length);
            if(this.dpiPadre.length==13&&this.dpiMadre.length==13)
            {
                return true
            }
            else{return false;}
            
        }
        else
        {
            console.log(this.dpiPadre.length);
            console.log(this.dpiMadre.length);
            return false;
        }
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