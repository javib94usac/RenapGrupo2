var pruebas =require('./functions');


/*funcionaleidade que los valores sean validos */
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
/* pruebas con datos que no son correctos */

test ('comprobar que dpi no sea valido',()=>{
    var prueba=new pruebas();
    expect(prueba.comprobarDpi("1235678901232","1345678901233")).toBeFalsy();
});

test ('comprobar que los campos venga vacios',()=>{
   var prueba=new pruebas();
   expect(prueba.comprobarCamposNoVenganBacios("123456789012","","iii","www","ddddd","www","ddd")).toBeFalsy();
});
test('comprobar que los nombres y apellidos no sean validos',()=>{
   var prueba=new pruebas();
   expect(prueba.comprobarNombresApellidosCorectos("perez perez8","ana sofia9")).toBeFalsy();
});