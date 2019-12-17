var pruebas =require('./functions');
/*

    verficar con datos validos
*/
test ('comprobar que dpi sea valido',()=>{
     var prueba=new pruebas();
     expect(prueba.comprobarDpi("1234567980123")).toBeTruthy();
});

test ('comprobar que los campos no venga vacios',()=>{
    var prueba=new pruebas();
    expect(prueba.comprobarCamposNoVenganBacios("1234567890123","ddd")).toBeTruthy();
});
/*

    verficar con no datos validos
*/
test ('comprobar que no dpi sea valido',()=>{
    var prueba=new pruebas();
    expect(prueba.comprobarDpi("1235-")).toBeFalsy();
});

test ('comprobar que los campos  venga vacios',()=>{
   var prueba=new pruebas();
   expect(prueba.comprobarCamposNoVenganBacios("","ddd")).toBeFalsy();
});