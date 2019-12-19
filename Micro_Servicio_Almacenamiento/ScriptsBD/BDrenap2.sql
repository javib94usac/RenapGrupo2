-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Departamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Departamento` (
  `idDepartamento` INT NOT NULL,
  `nombreDepartamento` VARCHAR(100) NULL,
  PRIMARY KEY (`idDepartamento`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Municipio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Municipio` (
  `idMunicipio` INT NOT NULL,
  `nombreMunicipio` VARCHAR(100) NULL,
  `idDepartamento` INT NOT NULL,
  PRIMARY KEY (`idMunicipio`),
  INDEX `fk_Municipio_Departamento1_idx` (`idDepartamento` ASC),
  CONSTRAINT `fk_Municipio_Departamento1`
    FOREIGN KEY (`idDepartamento`)
    REFERENCES `mydb`.`Departamento` (`idDepartamento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Nacimiento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Nacimiento` (
  `idnacimiento` INT NOT NULL AUTO_INCREMENT,
  `apellidos` VARCHAR(255) NULL,
  `nombre` VARCHAR(255) NULL,
  `dpiPadre` INT NULL,
  `dpiMadre` INT NULL,
  `fechaNacimiento` VARCHAR(200) NULL,
  `genero` VARCHAR(1) NULL,
  `idMunicipio` INT NOT NULL,
  PRIMARY KEY (`idnacimiento`),
  INDEX `fk_Nacimiento_Municipio1_idx` (`idMunicipio` ASC),
  CONSTRAINT `fk_Nacimiento_Municipio1`
    FOREIGN KEY (`idMunicipio`)
    REFERENCES `mydb`.`Municipio` (`idMunicipio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`DPI`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`DPI` (
  `noDpi` INT NOT NULL,
  `idNacimiento` INT NOT NULL,
  `Contrasena` VARCHAR(45) NULL,
  PRIMARY KEY (`noDpi`),
  INDEX `fk_DPI_Nacimiento_idx` (`idNacimiento` ASC),
  CONSTRAINT `fk_DPI_Nacimiento`
    FOREIGN KEY (`idNacimiento`)
    REFERENCES `mydb`.`Nacimiento` (`idnacimiento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Matrimonio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Matrimonio` (
  `idMatrimonio` INT NOT NULL AUTO_INCREMENT,
  `fecha` VARCHAR(200) NULL,
  `noDpiHombre` INT NOT NULL,
  `noDpiMujer` INT NOT NULL,
  `Vigente` TINYINT NULL,
  PRIMARY KEY (`idMatrimonio`),
  INDEX `fk_Matrimonio_DPI1_idx` (`noDpiHombre` ASC),
  INDEX `fk_Matrimonio_DPI2_idx` (`noDpiMujer` ASC),
  CONSTRAINT `fk_Matrimonio_DPI1`
    FOREIGN KEY (`noDpiHombre`)
    REFERENCES `mydb`.`DPI` (`noDpi`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Matrimonio_DPI2`
    FOREIGN KEY (`noDpiMujer`)
    REFERENCES `mydb`.`DPI` (`noDpi`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Defuncion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Defuncion` (
  `idDefuncion` INT NOT NULL AUTO_INCREMENT,
  `fecha` VARCHAR(200) NULL,
  `noDpi` INT NOT NULL,
  PRIMARY KEY (`idDefuncion`),
  INDEX `fk_Defuncion_DPI1_idx` (`noDpi` ASC),
  CONSTRAINT `fk_Defuncion_DPI1`
    FOREIGN KEY (`noDpi`)
    REFERENCES `mydb`.`DPI` (`noDpi`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Licencia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Licencia` (
  `idLicencia` INT NOT NULL AUTO_INCREMENT,
  `anosAntiguedad` INT NULL,
  `tipo` VARCHAR(1) NULL,
  `noDpi` INT NOT NULL,
  PRIMARY KEY (`idLicencia`),
  INDEX `fk_Licencia_DPI1_idx` (`noDpi` ASC),
  CONSTRAINT `fk_Licencia_DPI1`
    FOREIGN KEY (`noDpi`)
    REFERENCES `mydb`.`DPI` (`noDpi`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Divorcio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Divorcio` (
  `idDivorcio` INT NOT NULL AUTO_INCREMENT,
  `fecha` VARCHAR(200) NULL,
  `idMatrimonio` INT NOT NULL,
  PRIMARY KEY (`idDivorcio`),
  INDEX `fk_Divorcio_Matrimonio1_idx` (`idMatrimonio` ASC),
  CONSTRAINT `fk_Divorcio_Matrimonio1`
    FOREIGN KEY (`idMatrimonio`)
    REFERENCES `mydb`.`Matrimonio` (`idMatrimonio`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
