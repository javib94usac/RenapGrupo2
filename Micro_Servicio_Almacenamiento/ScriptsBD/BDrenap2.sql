-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema renapgrupo2
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema renapgrupo2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `renapgrupo2` DEFAULT CHARACTER SET utf8 ;
USE `renapgrupo2` ;

-- -----------------------------------------------------
-- Table `renapgrupo2`.`Departamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `renapgrupo2`.`Departamento` (
  `idDepartamento` BIGINT NOT NULL,
  `nombreDepartamento` VARCHAR(100) NULL,
  PRIMARY KEY (`idDepartamento`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `renapgrupo2`.`Municipio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `renapgrupo2`.`Municipio` (
  `idMunicipio` BIGINT NOT NULL,
  `nombreMunicipio` VARCHAR(100) NULL,
  `idDepartamento` BIGINT NOT NULL,
  PRIMARY KEY (`idMunicipio`),
  INDEX `fk_Municipio_Departamento1_idx` (`idDepartamento` ASC),
  CONSTRAINT `fk_Municipio_Departamento1`
    FOREIGN KEY (`idDepartamento`)
    REFERENCES `renapgrupo2`.`Departamento` (`idDepartamento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `renapgrupo2`.`Nacimiento`
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS `renapgrupo2`.`Nacimiento` (
  `idnacimiento` BIGINT NOT NULL AUTO_INCREMENT,
  `apellidos` VARCHAR(255) NULL,
  `nombre` VARCHAR(255) NULL,
  `dpiPadre` BIGINT NULL,
  `dpiMadre` BIGINT NULL,
  `fechaNacimiento` VARCHAR(200) NULL,
  `genero` VARCHAR(1) NULL,
  `idMunicipio` BIGINT NOT NULL,
  PRIMARY KEY (`idnacimiento`),
  INDEX `fk_Nacimiento_Municipio1_idx` (`idMunicipio` ASC),
  CONSTRAINT `fk_Nacimiento_Municipio1`
    FOREIGN KEY (`idMunicipio`)
    REFERENCES `renapgrupo2`.`Municipio` (`idMunicipio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `renapgrupo2`.`DPI`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `renapgrupo2`.`DPI` (
  `noDpi` BIGINT NOT NULL,
  `idNacimiento` BIGINT NOT NULL,
  `Contrasena` VARCHAR(45) NULL,
  PRIMARY KEY (`noDpi`),
  INDEX `fk_DPI_Nacimiento_idx` (`idNacimiento` ASC),
  CONSTRAINT `fk_DPI_Nacimiento`
    FOREIGN KEY (`idNacimiento`)
    REFERENCES `renapgrupo2`.`Nacimiento` (`idnacimiento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `renapgrupo2`.`Matrimonio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `renapgrupo2`.`Matrimonio` (
  `idMatrimonio` BIGINT NOT NULL AUTO_INCREMENT,
  `fecha` VARCHAR(200) NULL,
  `noDpiHombre` BIGINT NOT NULL,
  `noDpiMujer` BIGINT NOT NULL,
  `Vigente` TINYINT NULL,
  PRIMARY KEY (`idMatrimonio`),
  INDEX `fk_Matrimonio_DPI1_idx` (`noDpiHombre` ASC),
  INDEX `fk_Matrimonio_DPI2_idx` (`noDpiMujer` ASC),
  CONSTRAINT `fk_Matrimonio_DPI1`
    FOREIGN KEY (`noDpiHombre`)
    REFERENCES `renapgrupo2`.`DPI` (`noDpi`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Matrimonio_DPI2`
    FOREIGN KEY (`noDpiMujer`)
    REFERENCES `renapgrupo2`.`DPI` (`noDpi`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `renapgrupo2`.`Defuncion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `renapgrupo2`.`Defuncion` (
  `idDefuncion` BIGINT NOT NULL AUTO_INCREMENT,
  `fecha` VARCHAR(200) NULL,
  `noDpi` BIGINT NOT NULL,
  PRIMARY KEY (`idDefuncion`),
  INDEX `fk_Defuncion_DPI1_idx` (`noDpi` ASC),
  CONSTRAINT `fk_Defuncion_DPI1`
    FOREIGN KEY (`noDpi`)
    REFERENCES `renapgrupo2`.`DPI` (`noDpi`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `renapgrupo2`.`Licencia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `renapgrupo2`.`Licencia` (
  `idLicencia` BIGINT NOT NULL AUTO_INCREMENT,
  `anosAntiguedad` BIGINT NULL,
  `tipo` VARCHAR(1) NULL,
  `noDpi` BIGINT NOT NULL,
  PRIMARY KEY (`idLicencia`),
  INDEX `fk_Licencia_DPI1_idx` (`noDpi` ASC),
  CONSTRAINT `fk_Licencia_DPI1`
    FOREIGN KEY (`noDpi`)
    REFERENCES `renapgrupo2`.`DPI` (`noDpi`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `renapgrupo2`.`Divorcio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `renapgrupo2`.`Divorcio` (
  `idDivorcio` BIGINT NOT NULL AUTO_INCREMENT,
  `fecha` VARCHAR(200) NULL,
  `idMatrimonio` BIGINT NOT NULL,
  PRIMARY KEY (`idDivorcio`),
  INDEX `fk_Divorcio_Matrimonio1_idx` (`idMatrimonio` ASC),
  CONSTRAINT `fk_Divorcio_Matrimonio1`
    FOREIGN KEY (`idMatrimonio`)
    REFERENCES `renapgrupo2`.`Matrimonio` (`idMatrimonio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
