use mydb;
select * from Nacimiento;
select * from dpi;
select * from defuncion;
select * from  licencia;
select * from matrimonio;
select * from divorcio;

insert into departamento(idDepartamento,nombreDepartamento) values( 01,"Guatemala");
insert into municipio(idMunicipio,nombreMunicipio,idDepartamento) values(0101,"villa nueva",01);


call insertarNacimiento('castrillo fajardo','jossie',15646545646,15454546,'06-12-1993','M',0101);
call insertarNacimiento('alguien mas','nombre',15646544444,15454546,'06-12-1993','M',0101);
drop procedure insertarNacimiento;
call insertarDpi(2338005140101,1,'asdsgh');
call insertarDpi(23345555,2,'asdh');

drop procedure insertarDpi;
call insertarDefuncion("12-12-2019",2147483647);
drop procedure insertarDefuncion;
call insertarLicencia(0,"C",2147483647);
drop procedure insertarLicencia;
call insertarMatrimonio("15-09-2018",2147483647,23345555,1);
drop procedure insertarMatrimonio;
call insertarDivorcio("15-09-2018",1);
drop procedure insertarDivorcio;
call obtenerNacimiento(2);
drop procedure obtenerNacimiento;
call obtenerDPI(2338005140101); 
drop procedure obtenerDPI;
call obtenerDefuncion(2338005140101);
drop procedure obtenerDefuncion;
call obtenerLicencia(2338005140101);
drop procedure obtenerLicencia;

call obtenerMatrimonio(2147483647);
drop procedure obtenerMatrimonio;


drop table defuncion;
drop table licencia;
drop table divorcio;
drop table matrimonio;
drop table dpi;
drop table nacimiento;
drop table municipio;
drop table departamento;


SELECT  a.fecha , a.noDpi, c.nombre, c.apellidos           
FROM defuncion a, dpi b, nacimiento c
where  noDpi=a.noDpi and b.noDpi=a.noDpi and b.idnacimiento=c.idnacimiento