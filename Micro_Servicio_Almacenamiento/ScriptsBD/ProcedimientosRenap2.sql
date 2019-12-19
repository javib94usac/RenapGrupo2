use test;

-- PROCEDIMIENTO PARA REGISTRAR NACIMIENTOS
-- ===========================================================================
-- JOSSIE CASTRILLO
-- DESCRIPCION: inserta o crea un nuevo nacimiento, necesita deptos y municipios
-- ===========================================================================
DELIMITER $$

create procedure insertarNacimiento(
in apellidos varchar(255),
in nombre varchar(255),
in dpiPadre int,
in dpiMadre int,
in fechaNacimiento varchar(200),
in genero varchar(1),
in idMunicipio int
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
in noDpi int,
in idNacimiento int,
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
in noDpi int
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
    insert into defuncion(fecha,noDpi) values(fecha,noDpi);
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
in anosAntiguedad int,
in tipo varchar(1),
in noDpi int
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
    insert into licencia(anosAntiguedad,tipo,noDpi) values(anosAntiguedad,tipo,noDpi);
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
in noDpiHombre int,
in noDpiMujer int,
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
    insert into matrimonio(fecha,noDpiHombre,noDpiMujer,Vigente) values(fecha,noDpiHombre,noDpiMujer,vigente);
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
in idMatrimonio int
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
    insert into divorcio(fecha,idMatrimonio) values(fecha,idMatrimonio);
    set resultado= '{
						"estado": "200",
                        "mensaje": "inserto bien"
                        }
                        ';
		select resultado;
END;

