
const pruebas = require('./functions')

/* Se realizara la comprobacion de la cantidad de caracteres que tendra el DPI sea la correcta
 DPI debe tener:
            8 caracteres para correlativo
            2 caracteres para departamento
            2 caracteres para municipio
            1 caracter de aceptacion
*/
test ('DPI con la cantidad de caracteres correctos', () =>{
    var prueba=new pruebas();
    expect(prueba.comprobarDpi("1234567891234", "1234567891234")).toBeTruthy();
});

/*  Al momento de realizar post de los campos de matrimonio no 
    debe de mandar datos vacios ya que generaria en la base de datos registros vacios

*/

test ('Campos No Vacios', () =>{
    var prueba = new pruebas();
    expect (prueba.comprobarVacios("2","3213","31321")).toBeTruthy();
})
/* Se realizara la comprobacion que el DPI no sea la correcta
 DPI debe tener:
            8 caracteres para correlativo
            2 caracteres para departamento
            2 caracteres para municipio
            1 caracter de aceptacion
*/
test ('DPI con la cantidad de caracteres incorrectos', () =>{
    var prueba=new pruebas();
    expect(prueba.comprobarDpi("12345", "12345")).toBeFalsy();
});

/*  
    revisar que los datos vengan vacios
*/

test ('Campos  Vacios', () =>{
    var prueba = new pruebas();
    expect (prueba.comprobarVacios("2","","31321")).toBeFalsy();
})