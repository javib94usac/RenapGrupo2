class Comprobaciones {
    constructor(dpi1,dpi2, nombres,apellisdos) {
      
        this.nombres=nombres;
        this.apellisdos=apellisdos;
        this.dpiPadre=dpi1;
        this.dpiMadre=dpi2;
    }
    get_vacio()
    {
        if(this.nombres!=""&&this.apellisdos!=""&&this.dpiPadre!=""&&this.dpiMadre!="")
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
        if(isNaN(this.nombres.trim())&&isNaN(this.apellisdos.trim()))
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


}
module.exports= Comprobaciones;