var pruebas =require('./functions');

test ('comprobar que dpi sea valido',()=>{
     var prueba=new pruebas();
     expect(prueba.comprobarDpi("1234567890123")).toBeTruthy();
});

test ('comprobar que los campos no venga vacios',()=>{
    var prueba=new pruebas();
    expect(prueba.comprobarCamposNoVenganBacios("123456789012","ddd")).toBeTruthy();
});
