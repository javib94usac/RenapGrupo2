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
                        "mensaje": "error al insertar defuncion"
                        }
                        ';
		select resultado;
	end;
    -- sin errores
    start transaction;
    insert into Matrimonio(fecha,noDpiHombre,noDpiMujer,Vigente) values(fecha,noDpiHombre,noDpiMujer,vigente);
    set resultado= '{
						"estado": "200",
                        "mensaje": "inserto bien"
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
in idMatrimonio bigint
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
    insert into Divorcio(fecha,idMatrimonio) values(fecha,idMatrimonio);
    set resultado= '{
						"estado": "200",
                        "mensaje": "inserto bien"
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