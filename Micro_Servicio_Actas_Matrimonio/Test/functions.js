var Compro = require('../public/javascripts/Comprobaciones.js');

class pruebas
{

  constructor()
  {
    
  }
  comprobarDpi(dpi1,dpi2,)
  {
    var compo=new Compro(dpi1,dpi2,"");
    if(compo. get_dpi_validos())
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  comprobarVacios(dpi1,dpi2,fecha){
    var comprobar= new Compro(dpi1,dpi2,fecha);

    if (comprobar.get_vacio()){

        return true;

    }else{

        return false;

    }



  }
}

module.exports = pruebas;
