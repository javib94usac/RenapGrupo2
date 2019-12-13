var pruebas =require('./functions');

/*
    comprobar que los campos vengan bien
*/
test ('comprobar que dpi sea valido',()=>{
     var prueba=new pruebas();
     expect(prueba.comprobarDpi("1234567890123","1234567890123")).toBeTruthy();
});

test ('comprobar que los campos no venga vacios',()=>{
    var prueba=new pruebas();
    expect(prueba.comprobarCamposNoVenganBacios("1234567890123","1234567890123","d")).toBeTruthy();
});
/*
    comprobar que los compos no vengan bien
*/
test ('comprobar que dpi sea valido',()=>{
    var prueba=new pruebas();
    expect(prueba.comprobarDpi("1234","1234")).toBeFalsy();
});

test ('comprobar que los campos no venga vacios',()=>{
   var prueba=new pruebas();
   expect(prueba.comprobarCamposNoVenganBacios("","1234567890123","")).toBeFalsy();
});