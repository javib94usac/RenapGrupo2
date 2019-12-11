var pruebas =require('./functions');

test ('comprobar que dpi sea valido',()=>{
     var prueba=new pruebas();
     expect(prueba.comprobarDpi("1234567890123","1234567890123")).toBeTruthy();
});

test ('comprobar que los campos no venga vacios',()=>{
    var prueba=new pruebas();
    expect(prueba.comprobarCamposNoVenganBacios("123456789012","1234567890123","iii","www","ddddd","www","ddd")).toBeTruthy();
});
test('comprobar que los nombres y apellidos sean validos',()=>{
    var prueba=new pruebas();
    expect(prueba.comprobarNombresApellidosCorectos("perez perez","ana sofia")).toBeTruthy();
});