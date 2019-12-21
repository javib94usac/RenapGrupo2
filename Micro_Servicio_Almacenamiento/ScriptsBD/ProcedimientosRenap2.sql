use renapgrupo2;


-- PROCEDIMIENTO PARA REGISTRAR NACIMIENTOS
-- ===========================================================================
-- JOSSIE CASTRILLO
-- DESCRIPCION: inserta o crea un nuevo nacimiento, necesita deptos y municipios
-- ===========================================================================
DELIMITER $$

create procedure insertarNacimiento(
in apellidos varchar(255),
in nombre varchar(255),
in dpiPadre bigint,
in dpiMadre bigint,
in fechaNacimiento varchar(200),
in genero varchar(1),
in idMunicipio bigint
)
begin
declare resultado text;
    -- excepcion para error
    declare exit handler for sqlexception
    begin
		set resultado='{
						"estado": "401",
                        "mensaje": "error al insertar nacimiento"
                        }
                        ';
		select resultado;
	end;
    -- sin errores
    start transaction;
    insert into Nacimiento(apellidos,nombre,dpiPadre,dpiMadre,fechaNacimiento,genero,idMunicipio) values(apellidos,nombre,dpiPadre,dpiMadre,fechaNacimiento,genero,idMunicipio);
    set resultado= '{
						"estado": "200",
                        "mensaje": "inserto bien"
                        }
                        ';
		select resultado;
END;

-- PROCEDIMIENTO PARA REGISTRAR DPIS
-- ===========================================================================
-- JOSSIE CASTRILLO
-- DESCRIPCION: inserta o crea un nuevo dpi en base a un nacimiento previo
-- ===========================================================================

DELIMITER $$
create procedure insertarDpi(
in noDpi bigint,
in idNacimiento bigint,
in contrasena varchar(45)
)
begin
declare resultado text;
    -- excepcion para error
    declare exit handler for sqlexception
    begin
		set resultado='{
						"estado": "401",
                        "mensaje": "error al insertar DPI"
                        }
                        ';
		select resultado;
	end;
    -- sin errores
    start transaction;
    insert into DPI(noDpi,idNacimiento,contrasena) values(noDpi,idNacimiento,contrasena);
    set resultado= '{
						"estado": "200",
                        "mensaje": "inserto bien"
                        }
                        ';
		select resultado;
END;


-- PROCEDIMIENTO PARA REGISTRAR DEFUNCIONES
-- ===========================================================================
-- JOSSIE CASTRILLO
-- DESCRIPCION: inserta o crea una defuncion con el numero de dpi y la fecha
-- ===========================================================================

DELIMITER $$
create procedure insertarDefuncion(
in fecha varchar(200),
in noDpi bigint
)
begin
declare resultado text;
    -- excepcion para error
    declare exit handler for sqlexception
    begin
		set resultado='{
						"estado": "401",
                        "mensaje": "error al insertar defuncion"
                        }
                        ';
		select resultado;
	end;
    -- sin errores
    start transaction;
    insert into Defuncion(fecha,noDpi) values(fecha,noDpi);
    set resultado= '{
						"estado": "200",
                        "mensaje": "inserto bien"
                        }
                        ';
		select resultado;
END;

-- PROCEDIMIENTO PARA REGISTRAR LICENCIAS
-- ===========================================================================
-- JOSSIE CASTRILLO
-- DESCRIPCION: inserta o crea una licencia nueva
-- ===========================================================================

DELIMITER $$
create procedure insertarLicencia(
in anosAntiguedad bigint,
in tipo varchar(1),
in noDpi bigint
)
begin
declare resultado text;
    -- excepcion para error
    declare exit handler for sqlexception
    begin
		set resultado='{
						"estado": "401",
                        "mensaje": "error al insertar defuncion"
                        }
                        ';
		select resultado;
	end;
    -- sin errores
    start transaction;
    insert into Licencia(anosAntiguedad,tipo,noDpi) values(anosAntiguedad,tipo,noDpi);
    set resultado= '{
						"estado": "200",
                        "mensaje": "inserto bien"
                        }
                        ';
		select resultado;
END;


-- PROCEDIMIENTO PARA REGISTRAR MATRIMONIOS
-- ===========================================================================
-- JOSSIE CASTRILLO
-- DESCRIPCION: inserta o crea un nuevo matrimonio
-- ===========================================================================

DELIMITER $$
create procedure insertarMatrimonio(
in fecha varchar(200),
in noDpiHombre bigint,
in noDpiMujer bigint,
in vigente tinyint
)
begin
declare resultado text;
    -- excepcion para error
    declare exit handler for sqlexception
    begin
		set resultado='{
						"estado": "401",
                        "mensaje": "error al insertar el matrimonio"
                        }
                        ';
		select resultado;
	end;
    -- sin errores
    start transaction;
    insert into Matrimonio(fecha,noDpiHombre,noDpiMujer,Vigente) values(fecha,noDpiHombre,noDpiMujer,vigente);
    set resultado= '{
						"estado": "200",
                        "mensaje": "inserto bien el matrimonio"
                        }
                        ';
		select resultado;
END;



-- PROCEDIMIENTO PARA REGISTRAR DIVORCIOS
-- ===========================================================================
-- JOSSIE CASTRILLO
-- DESCRIPCION: inserta o crea un nuevo divorcio
-- ===========================================================================

DELIMITER $$
create procedure insertarDivorcio(
in fecha varchar(200),
in dpiH bigint,
in dpiM bigint
)
begin
declare resultado text;
    -- excepcion para error
    declare exit handler for sqlexception
    begin
		set resultado='{
						"estado": "401",
                        "mensaje": "error al insertar divorcio"
                        }
                        ';
		select resultado;
	end;
    -- sin errores
    start transaction;
    insert into Divorcio(fecha,idMatrimonio) 
    select idMatrimonio from Matrimonio as M
    where 2338005140101=M.noDpiHombre and 2338005140102=M.noDpiMujer;
    set resultado= '{
						"estado": "200",
                        "mensaje": "inserto bien el divorcio :v"
                        }
                        ';
		select resultado;
END;


-- PROCEDIMIENTO PARA CONSULTAR NACIMIENTOS
-- ===========================================================================
-- JOSSIE CASTRILLO
-- DESCRIPCION: inserta o crea un nuevo divorcio
-- ===========================================================================

DELIMITER $$
CREATE PROCEDURE obtenerNacimiento (
		in idnacimiento bigint
	)
BEGIN
	declare resultado TEXT;
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION 
		BEGIN
			SET resultado = '{
				"estado": "401",
				"mensaje":"Error al buscar el nacimiento"
				}
				';
		END;
        
        START TRANSACTION;
        IF (idnacimiento is not null)THEN
				SELECT a.idNacimiento , a.nombre, a.apellidos,a.genero, a.fechaNacimiento , b.nombreMunicipio, c.nombreDepartamento
				FROM Nacimiento as a, Municipio as b, Departamento as c, DPI as d
				where idnacimiento=a.idnacimiento and a.idmunicipio= b.idMunicipio AND b.idDepartamento=c.idDepartamento ;

               
			ELSE
				SELECT a.idnacimiento , a.nombre, a.apellidos,a.genero, a.fechaNacimiento , b.nombreMunicipio, c.nombreDepartamento
				FROM Nacimiento as a, Municipio as b, Departamento as c, DPI as d
				where a.idmunicipio= b.idMunicipio AND b.idDepartamento=c.idDepartamento;
			END IF;
END;



-- PROCEDIMIENTO PARA CONSULTAR DPIs
-- ===========================================================================
-- JOSSIE CASTRILLO
-- DESCRIPCION: obtiene los datos de un nacimiento
-- ===========================================================================

DELIMITER $$
CREATE PROCEDURE obtenerDPI (
		in noDpi bigint
	)
BEGIN
	declare resultado TEXT;
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION 
		BEGIN
			SET resultado = '{
				"estado": "401",
				"mensaje":"Error al buscar el nacimiento"
				}
				';
		END;
        
        START TRANSACTION;
        IF (noDpi is not null)THEN
				SELECT noDpi, a.idnacimiento , a.nombre, a.apellidos,a.genero, a.fechaNacimiento , b.nombreMunicipio, c.nombreDepartamento                
				FROM Nacimiento as a, Municipio as b, Departamento as c, DPI as d
				where noDpi=d.noDpi and d.idnacimiento=a.idNacimiento and a.idmunicipio= b.idMunicipio AND b.idDepartamento=c.idDepartamento;
			ELSE
				SELECT noDpi, a.idnacimiento , a.nombre, a.apellidos,a.genero, a.fechaNacimiento , b.nombreMunicipio, c.nombreDepartamento
				FROM Nacimiento as a, Municipio as b, Departamento as c, DPI as d
				where noDpi=d.noDpi and d.idnacimiento=a.idNacimiento  and a.idmunicipio= b.idMunicipio AND b.idDepartamento=c.idDepartamento;
			END IF;
END;




-- PROCEDIMIENTO PARA CONSULTAR DEFUNCIONES
-- ===========================================================================
-- JOSSIE CASTRILLO
-- DESCRIPCION: obtiene los datos de una defuncion
-- ===========================================================================

DELIMITER $$
CREATE PROCEDURE obtenerDefuncion (
		in noDpi bigint
	)
BEGIN
	declare resultado TEXT;
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION 
		BEGIN
			SET resultado = '{
				"estado": "401",
				"mensaje":"Error al buscar la defuncion"
				}
				';
		END;
        
        START TRANSACTION;
        IF (noDpi is not null)THEN
				SELECT  a.iddefuncion,a.fecha , a.noDpi, c.nombre, c.apellidos           
				FROM Defuncion a, DPI b, Nacimiento c
				where  noDpi=a.noDpi and b.noDpi=a.noDpi and b.idnacimiento=c.idnacimiento;
			ELSE
				SELECT a.iddefuncion, a.fecha , a.noDpi, c.nombre, c.apellidos           
				FROM Defuncion a, DPI b, Nacimiento c
				where  b.noDpi=a.noDpi and b.idnacimiento=c.idnacimiento;
			END IF;
END;


-- PROCEDIMIENTO PARA CONSULTAR LICENCIAS
-- ===========================================================================
-- JOSSIE CASTRILLO
-- DESCRIPCION: obtiene los datos de una licencia
-- ===========================================================================

DELIMITER $$
CREATE PROCEDURE obtenerLicencia (
		in noDpi bigint
	)
BEGIN
	declare resultado TEXT;
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION 
		BEGIN
			SET resultado = '{
				"estado": "401",
				"mensaje":"Error al buscar la licencia"
				}
				';
		END;
        
        START TRANSACTION;
        IF (noDpi is not null)THEN
				SELECT   c.nombre,c.apellidos, a.tipo, a.anosAntiguedad         
				FROM Licencia as a, DPI as b, Nacimiento as c
				where  noDpi=a.noDpi and a.noDpi=b.noDpi and b.idnacimiento=c.idnacimiento;
			ELSE
				SELECT   c.nombre,c.apellidos, a.tipo, a.anosAntiguedad         
				FROM Licencia as a, DPI as b, Nacimiento as c
				where  a.noDpi=b.noDpi and b.idnacimiento=c.idnacimiento;
			END IF;
END;


-- PROCEDIMIENTO PARA CONSULTAR MATRIMONIOS
-- ===========================================================================
-- JOSSIE CASTRILLO
-- DESCRIPCION: obtiene los datos de una defuncion
-- ===========================================================================

DELIMITER $$
CREATE PROCEDURE obtenerMatrimonio (
		in noDpi bigint
	)
BEGIN
	declare resultado TEXT;
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION 
		BEGIN
			SET resultado = '{
				"estado": "401",
				"mensaje":"Error al buscar la defuncion"
				}
				';
		END;
        
        START TRANSACTION;
        IF (noDpi is not null)THEN
				SELECT  a.idmatrimonio,a.fecha , a.noDpiHombre, c.nombre ,a.noDpiMujer, c.nombre       
				FROM Matrimonio a, DPI b, Nacimiento c
				where  (noDpi=a.noDpiHombre or noDpi=a.noDpiMujer) ;
			ELSE
				SELECT  a.idmatrimonio,a.fecha , a.noDpiHombre, c.nombre ,a.noDpiMujer, c.nombre       
				FROM Matrimonio a, DPI b, Nacimiento c
				where  (noDpi=a.noDpiHombre or noDpi=a.noDpiMujer) ;
			END IF;
END;





-- PROCEDIMIENTO PARA GENERAR NUEVAS CLAVES
-- ===========================================================================
-- JOSSIE CASTRILLO
-- DESCRIPCION: inserta y modifica las claves de usuario
-- ===========================================================================
DELIMITER $$
create procedure insertarClave(
in dpi bigint,
in clave varchar(45)
)
begin
declare resultado text;
    -- excepcion para error
    declare exit handler for sqlexception
    begin
		set resultado='{
						"estado": "401",
                        "mensaje": "error al modificar clave"
                        }
                        ';
		select resultado;
	end;
    -- sin errores
    start transaction;
    update DPI set Contrasena=clave where dpi=noDpi;
    
    set resultado= '{
						"estado": "200",
                        "mensaje": "actualizo la clave correctamente"
                        }
                        ';
		select resultado;
END;




-- PROCEDIMIENTO PARA ACTUALIZAR LOS TIPOS DE LICENCIAS
-- ===========================================================================
-- JOSSIE CASTRILLO
-- DESCRIPCION: inserta y modifica los tipos de licencias
-- ===========================================================================
DELIMITER $$
create procedure actualizarTipoLicencia(
in dpi bigint,
in tipo varchar(1)
)
begin
declare resultado text;
    -- excepcion para error
    declare exit handler for sqlexception
    begin
		set resultado='{
						"estado": "401",
                        "mensaje": "error al modificar el tipo de licencia"
                        }
                        ';
		select resultado;
	end;
    -- sin errores
    start transaction;
     update Licencia set tipo=tipo where dpi=noDpi;
    
    set resultado= '{
						"estado": "200",
                        "mensaje": "actualizo la licencia correctamente"
                        }
                        ';
		select resultado;
END;
