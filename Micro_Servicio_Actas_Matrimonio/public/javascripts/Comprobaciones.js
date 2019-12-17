class Comprobaciones {
  constructor(dpi1, dpi2, fecha) {
    this.fecha = fecha;
    this.dpiPadre = dpi1;
    this.dpiMadre = dpi2;
  }
  get_vacio() {
    if (
      this.fecha != "" &&
      this.dpiPadre != "" &&
      this.dpiMadre != ""
    ) {
      return true;
    } else {
      return false;
    }
  }
  /*
      get_dpi_validos transforma los parametros recibidos dpi1 y dpi2 y los convierte en numero, 
      asi como les elimina  los espacios en blanco para determinar la cantidad de caracteres que tendra el dpi
  */
  get_dpi_validos() {
    if (!isNaN(this.dpiPadre.trim()) && !isNaN(this.dpiMadre.trim())) {
     // console.log("-----");
      //console.log(this.dpiPadre.length);
      ///console.log(this.dpiMadre.length);
      if (this.dpiPadre.length == 13 && this.dpiMadre.length == 13) {
        return true;
      } else {
        return false;
      }
    } else {
      //console.log(this.dpiPadre.length);
      //console.log(this.dpiMadre.length);
      return false;
    }
  }
}
module.exports = Comprobaciones;
