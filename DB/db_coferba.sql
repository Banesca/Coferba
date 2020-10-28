/*
SQLyog Ultimate v12.4.1 (64 bit)
MySQL - 10.1.31-MariaDB : Database - db_coferba
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_coferba` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `db_coferba`;

/*Table structure for table `tb_contratos` */

DROP TABLE IF EXISTS `tb_contratos`;

CREATE TABLE `tb_contratos` (
  `idContrato` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idClientFk` int(11) DEFAULT NULL,
  `fechaFirmaVigencia` varchar(255) DEFAULT NULL,
  `fechaFirmaActivacion` varchar(255) DEFAULT NULL,
  `numeroContrato` varchar(255) DEFAULT NULL,
  `contratoType` int(11) DEFAULT NULL,
  `maintenanceType` int(11) DEFAULT NULL,
  `idStatusFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idContrato`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `tb_contratos` */

insert  into `tb_contratos`(`idContrato`,`idClientFk`,`fechaFirmaVigencia`,`fechaFirmaActivacion`,`numeroContrato`,`contratoType`,`maintenanceType`,`idStatusFk`) values 
(1,109,'01/10/2020','10/10/2020','109-3NC/APP-051020',3,3,1);

/*Table structure for table `tb_servicios_del_contrato_cabecera` */

DROP TABLE IF EXISTS `tb_servicios_del_contrato_cabecera`;

CREATE TABLE `tb_servicios_del_contrato_cabecera` (
  `idServiciosDelContrato` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idServiceType` int(11) DEFAULT NULL,
  `serviceName` varchar(255) DEFAULT NULL,
  `idContratoFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idServiciosDelContrato`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `tb_servicios_del_contrato_cabecera` */

insert  into `tb_servicios_del_contrato_cabecera`(`idServiciosDelContrato`,`idServiceType`,`serviceName`,`idContratoFk`) values 
(1,1,'CONTROL DE ACCESO',1),
(2,2,'INTERNET',1),
(3,3,'TOTEM',1),
(4,4,'CAMARAS',1),
(5,5,'ALARMAS',1),
(6,6,'APP MONITOREO',1);

/*Table structure for table `tb_servicios_del_contrato_cuerpo` */

DROP TABLE IF EXISTS `tb_servicios_del_contrato_cuerpo`;

CREATE TABLE `tb_servicios_del_contrato_cuerpo` (
  `idServiciosDelContratoCuerpo` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idServiciosDelContratoFk` int(11) DEFAULT NULL,
  `qtty` varchar(255) DEFAULT NULL,
  `idAccCrtlDoor` int(11) DEFAULT NULL,
  `itemName` varchar(255) DEFAULT NULL,
  `itemAclaracion` varchar(255) DEFAULT NULL,
  `idServiceTypeFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idServiciosDelContratoCuerpo`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Data for the table `tb_servicios_del_contrato_cuerpo` */

insert  into `tb_servicios_del_contrato_cuerpo`(`idServiciosDelContratoCuerpo`,`idServiciosDelContratoFk`,`qtty`,`idAccCrtlDoor`,`itemName`,`itemAclaracion`,`idServiceTypeFk`) values 
(1,1,NULL,1,'Principal','Prueba aclaracion puerta',1),
(2,1,NULL,2,'Cochera','Prueba aclaracion puerta',1),
(3,2,NULL,NULL,'CableModem',NULL,2),
(4,2,NULL,NULL,'M2M',NULL,2),
(5,3,'8',NULL,'CAMARAS',NULL,3),
(6,4,'16',NULL,'CAMARAS',NULL,4),
(7,4,'8',NULL,'CAMARAS',NULL,4);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
