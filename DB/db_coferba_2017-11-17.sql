# ************************************************************
# Sequel Pro SQL dump
# Versión 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.1.26-MariaDB)
# Base de datos: db_coferba
# Tiempo de Generación: 2017-11-17 21:08:21 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Volcado de tabla tb_addres
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_addres`;

CREATE TABLE `tb_addres` (
  `idAdress` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nameAdress` varchar(300) COLLATE utf8_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`idAdress`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

LOCK TABLES `tb_addres` WRITE;
/*!40000 ALTER TABLE `tb_addres` DISABLE KEYS */;

INSERT INTO `tb_addres` (`idAdress`, `nameAdress`)
VALUES
	(1,'Ayacucho 55'),
	(2,'Martinez 100'),
	(3,'olivos 300');

/*!40000 ALTER TABLE `tb_addres` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_attendant
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_attendant`;

CREATE TABLE `tb_attendant` (
  `idAttendant` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nameAttendant` varchar(300) COLLATE utf8_swedish_ci DEFAULT NULL,
  `idAddresKf` int(11) DEFAULT NULL,
  `phoneAttendant` varchar(25) COLLATE utf8_swedish_ci DEFAULT NULL,
  `phoneLocalAttendant` varchar(25) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `mailAttendant` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL,
  `hoursWork` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`idAttendant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

LOCK TABLES `tb_attendant` WRITE;
/*!40000 ALTER TABLE `tb_attendant` DISABLE KEYS */;

INSERT INTO `tb_attendant` (`idAttendant`, `nameAttendant`, `idAddresKf`, `phoneAttendant`, `phoneLocalAttendant`, `mailAttendant`, `hoursWork`)
VALUES
	(1,'JORGE GUTIERREZ',1,'12319283712',NULL,'adsaa@daas.djh',NULL),
	(2,'DAVID',1,'31221312321',NULL,'adsaa@daas.djh',NULL),
	(3,'MIGUEL MARTINEZ',2,'312312312211',NULL,'adsaa@daas.djh',NULL),
	(4,'MARTINEZ JULO',3,'12321321312',NULL,'adsaa@daas.djh',NULL),
	(5,'leonador',1,'1323123213213',NULL,'adsaa@daas.djh',NULL),
	(6,'prueba',1,'31321321321',NULL,'DFSD@SDDDS.DF','08:40'),
	(7,'Francisco Ochoa',1,'113435476878','112345678757','fracisco.ochoa@gmail.com',NULL);

/*!40000 ALTER TABLE `tb_attendant` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_branch
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_branch`;

CREATE TABLE `tb_branch` (
  `idBranch` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `branchName` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL,
  `idCompanyKf` int(11) DEFAULT NULL,
  `idAdressKf` int(11) DEFAULT NULL,
  PRIMARY KEY (`idBranch`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

LOCK TABLES `tb_branch` WRITE;
/*!40000 ALTER TABLE `tb_branch` DISABLE KEYS */;

INSERT INTO `tb_branch` (`idBranch`, `branchName`, `idCompanyKf`, `idAdressKf`)
VALUES
	(1,'SUCURSAL 1',1,1),
	(2,'SUCURSAL 2',1,3),
	(3,'SUCURSAL 3',2,2),
	(4,'SUCURSAL 4',2,3);

/*!40000 ALTER TABLE `tb_branch` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_clients_tickets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_clients_tickets`;

CREATE TABLE `tb_clients_tickets` (
  `idTicketsCliets` int(11) NOT NULL AUTO_INCREMENT,
  `idTicketKf` int(11) DEFAULT NULL,
  `idClientKf` int(11) DEFAULT NULL,
  PRIMARY KEY (`idTicketsCliets`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

LOCK TABLES `tb_clients_tickets` WRITE;
/*!40000 ALTER TABLE `tb_clients_tickets` DISABLE KEYS */;

INSERT INTO `tb_clients_tickets` (`idTicketsCliets`, `idTicketKf`, `idClientKf`)
VALUES
	(1,19,2),
	(2,19,3),
	(3,19,1),
	(4,20,2),
	(5,20,3),
	(6,20,1),
	(7,21,2),
	(8,21,3),
	(9,21,1),
	(10,22,2),
	(11,22,3),
	(12,22,1),
	(13,23,2),
	(14,23,3),
	(15,23,1);

/*!40000 ALTER TABLE `tb_clients_tickets` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_company
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_company`;

CREATE TABLE `tb_company` (
  `idCompany` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nameCompany` varchar(300) COLLATE utf8_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`idCompany`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

LOCK TABLES `tb_company` WRITE;
/*!40000 ALTER TABLE `tb_company` DISABLE KEYS */;

INSERT INTO `tb_company` (`idCompany`, `nameCompany`)
VALUES
	(1,'COCA - COLA'),
	(2,'Oracle'),
	(3,'Pepsi');

/*!40000 ALTER TABLE `tb_company` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_department
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_department`;

CREATE TABLE `tb_department` (
  `idDepartment` int(11) NOT NULL AUTO_INCREMENT,
  `idAdressKf` int(255) DEFAULT NULL,
  `departmentFloor` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `deparmentNumber` int(11) DEFAULT NULL,
  `deparmentDescription` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idStatusKf` int(11) DEFAULT NULL,
  `idUserAdminRKf` int(11) DEFAULT NULL,
  `idUserAdminPropietariKf` int(11) DEFAULT NULL,
  `idTenantKf` int(11) DEFAULT NULL,
  `isAprobatedAdmin` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`idDepartment`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

LOCK TABLES `tb_department` WRITE;
/*!40000 ALTER TABLE `tb_department` DISABLE KEYS */;

INSERT INTO `tb_department` (`idDepartment`, `idAdressKf`, `departmentFloor`, `deparmentNumber`, `deparmentDescription`, `idStatusKf`, `idUserAdminRKf`, `idUserAdminPropietariKf`, `idTenantKf`, `isAprobatedAdmin`)
VALUES
	(1,1,'Porteria',700,'Capital Federal, Nuñez',1,1,NULL,3,1),
	(2,2,'1-A',700,'Capital Federal, Nuñez',0,1,NULL,1,0),
	(3,1,'1-B',700,'Capital Federal, Nuñez',1,1,NULL,2,0),
	(4,1,'2-A',700,'Capital Federal, Nuñez',1,1,NULL,3,0),
	(5,1,'2-B',700,'Capital Federal, Nuñez',1,1,NULL,1,0),
	(6,1,'3-A',700,'Capital Federal, Nuñez',1,1,NULL,1,0),
	(7,1,'3-B',700,'Capital Federal, Nuñez',1,1,NULL,NULL,0),
	(8,1,'4-A',700,'Capital Federal, Nuñez',1,1,NULL,NULL,0),
	(9,1,'4-B',700,'Capital Federal, Nuñez',1,1,NULL,NULL,0),
	(10,1,'5-A',700,'Capital Federal, Nuñez',1,1,NULL,NULL,0),
	(11,1,'5-B',700,'Capital Federal, Nuñez',1,1,NULL,1,0),
	(12,2,'6-A',700,'Capital Federal, Nuñez',1,1,NULL,1,0),
	(13,2,'6-B',700,'Capital Federal, Nuñez',1,1,NULL,NULL,0),
	(14,2,'7-A',700,'Capital Federal, Nuñez',1,1,NULL,NULL,0),
	(15,2,'7-B',700,'Capital Federal, Nuñez',1,1,NULL,NULL,0),
	(16,2,'8-A',700,'Capital Federal, Nuñez',1,1,NULL,NULL,0),
	(17,3,'8-B',700,'Capital Federal, Nuñez',1,1,NULL,1,0);

/*!40000 ALTER TABLE `tb_department` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_opcion_low
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_opcion_low`;

CREATE TABLE `tb_opcion_low` (
  `idOpcionLowTicket` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `opcionLowTicket` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`idOpcionLowTicket`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

LOCK TABLES `tb_opcion_low` WRITE;
/*!40000 ALTER TABLE `tb_opcion_low` DISABLE KEYS */;

INSERT INTO `tb_opcion_low` (`idOpcionLowTicket`, `opcionLowTicket`)
VALUES
	(1,'LLaveros en Mi poder'),
	(2,'LLaveros Quiero dar de Baja');

/*!40000 ALTER TABLE `tb_opcion_low` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_profile
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_profile`;

CREATE TABLE `tb_profile` (
  `idProfile` int(11) NOT NULL,
  `nameProfile` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idProfile`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

LOCK TABLES `tb_profile` WRITE;
/*!40000 ALTER TABLE `tb_profile` DISABLE KEYS */;

INSERT INTO `tb_profile` (`idProfile`, `nameProfile`)
VALUES
	(1,'Coferba'),
	(2,'Empresa'),
	(3,'Propietario'),
	(4,'Admin Consorsio');

/*!40000 ALTER TABLE `tb_profile` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_reason_disabled_item
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_reason_disabled_item`;

CREATE TABLE `tb_reason_disabled_item` (
  `idReasonDisabledItem` int(11) NOT NULL AUTO_INCREMENT,
  `reasonDisabledItem` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idReasonDisabledItem`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

LOCK TABLES `tb_reason_disabled_item` WRITE;
/*!40000 ALTER TABLE `tb_reason_disabled_item` DISABLE KEYS */;

INSERT INTO `tb_reason_disabled_item` (`idReasonDisabledItem`, `reasonDisabledItem`)
VALUES
	(1,'ROBO'),
	(2,'EXTRAVIO'),
	(3,'FALLA DEL LLAVERO');

/*!40000 ALTER TABLE `tb_reason_disabled_item` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_request
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_request`;

CREATE TABLE `tb_request` (
  `idRequest` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `RequestName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idRequest`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;



# Volcado de tabla tb_status
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_status`;

CREATE TABLE `tb_status` (
  `idStatusTenant` int(255) NOT NULL,
  `statusTenantName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idStatusTenant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci ROW_FORMAT=COMPACT;

LOCK TABLES `tb_status` WRITE;
/*!40000 ALTER TABLE `tb_status` DISABLE KEYS */;

INSERT INTO `tb_status` (`idStatusTenant`, `statusTenantName`)
VALUES
	(-1,'Eliminado'),
	(0,'Inactivo'),
	(1,'Activo');

/*!40000 ALTER TABLE `tb_status` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_statusticket
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_statusticket`;

CREATE TABLE `tb_statusticket` (
  `idStatus` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `statusName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idStatus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci ROW_FORMAT=COMPACT;

LOCK TABLES `tb_statusticket` WRITE;
/*!40000 ALTER TABLE `tb_statusticket` DISABLE KEYS */;

INSERT INTO `tb_statusticket` (`idStatus`, `statusName`, `idTypeTicketKf`)
VALUES
	('-1','Rechazado','-1'),
	('1','Finalizado','1'),
	('2','Pendiente de Aprobacion','2'),
	('3','Aprobado','3');

/*!40000 ALTER TABLE `tb_statusticket` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_sys_code
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_sys_code`;

CREATE TABLE `tb_sys_code` (
  `idCode` int(11) DEFAULT NULL,
  `code` varchar(200) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `description` varchar(3) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

LOCK TABLES `tb_sys_code` WRITE;
/*!40000 ALTER TABLE `tb_sys_code` DISABLE KEYS */;

INSERT INTO `tb_sys_code` (`idCode`, `code`, `description`)
VALUES
	(1,'54','TK');

/*!40000 ALTER TABLE `tb_sys_code` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_sys_param
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_sys_param`;

CREATE TABLE `tb_sys_param` (
  `idParam` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `value` varchar(100) COLLATE utf8_swedish_ci DEFAULT NULL,
  `description` varchar(100) COLLATE utf8_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`idParam`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

LOCK TABLES `tb_sys_param` WRITE;
/*!40000 ALTER TABLE `tb_sys_param` DISABLE KEYS */;

INSERT INTO `tb_sys_param` (`idParam`, `value`, `description`)
VALUES
	(1,'jorguti58@gmail.com','USUARIO SMT MAIL'),
	(2,'#*AdMg1210#*','CLAVE SMT MAIL'),
	(3,'0','PRECIO POR LLAVE'),
	(4,'0','VALOR GESTION'),
	(5,'20:00','HORA DE MAIL DE VERIFICACION DE MAIL PARA ADMINISTRADORES DE CONSORCIO');

/*!40000 ALTER TABLE `tb_sys_param` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_tenant
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_tenant`;

CREATE TABLE `tb_tenant` (
  `idTenant` int(11) NOT NULL AUTO_INCREMENT,
  `fullNameTenant` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeKf` int(11) DEFAULT NULL,
  `phoneNumberTenant` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idDepartmentKf` int(11) DEFAULT NULL,
  `emailTenant` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idStatusKf` int(11) DEFAULT NULL,
  `dateCrated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `phoneNumberContactTenant` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTenant`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

LOCK TABLES `tb_tenant` WRITE;
/*!40000 ALTER TABLE `tb_tenant` DISABLE KEYS */;

INSERT INTO `tb_tenant` (`idTenant`, `fullNameTenant`, `idTypeKf`, `phoneNumberTenant`, `idDepartmentKf`, `emailTenant`, `idStatusKf`, `dateCrated`, `phoneNumberContactTenant`)
VALUES
	(1,'David Eduardo Rincon Luengo',2,'1126694918',1,'rexx84@gmail.com',1,'2017-10-18 01:07:25','1122334455'),
	(2,'Alberto Fabian',1,'54115778345',2,'Alberto.Fabian@gmail.com',1,'2017-10-18 01:07:25','54115778345'),
	(3,'Eduardo Peliacani',1,'54115778345',3,'Eduardo.Peliacani@gmail.com',1,'2017-10-18 01:07:25','54115778345'),
	(4,'Carlos Lazarte',1,'54115778345',4,'Carlos.Lazarte@gmail.com',1,'2017-10-18 01:07:25','54115778345'),
	(5,'Marcos Padilla',1,'54115778345',5,'Marcos.Padilla@gmail.com',1,'2017-10-18 01:07:25','54115778345'),
	(6,'Nahuel Barrati',1,'54115778345',6,'Nahuel.Barrati@gmail.com',1,'2017-10-18 01:07:25','54115778345'),
	(7,'Jan Zambrano',1,'54115778345',7,'Jan.Zambrano@gmail.com',1,'2017-10-18 01:07:25','54115778345'),
	(8,'Marcos Quispes',1,'54115778345',8,'Marcos.Quispes@gmail.com',1,'2017-10-18 01:07:25','54115778345'),
	(9,'Beatriz Gonzalez',1,'54115778345',9,'Beatriz.Gonzalez@gmail.com',1,'2017-10-18 01:07:25','54115778345'),
	(10,'Juan de Vicenti',1,'54115778345',10,'juan.vicenti@gmail.com',1,'2017-10-18 01:07:25','54115778345'),
	(11,'Jorge Gutierrez',2,'541189054333',11,'jorguti85@gmail.com',1,'2017-10-18 01:07:25','541189054333'),
	(12,'Carlos Romero',2,'541189054333',12,'jorguti86@gmail.com',1,'2017-10-18 01:07:25','541189054333'),
	(13,'Jose Carrasco',2,'541189054333',13,'jorguti87@gmail.com',1,'2017-10-18 01:07:25','541189054333'),
	(14,'Alfredo Wirth',2,'541189054333',14,'jorguti88@gmail.com',1,'2017-10-18 01:07:25','541189054333'),
	(15,'Victor Machado',2,'541189054333',15,'jorguti89@gmail.com',1,'2017-10-18 01:07:25','541189054333'),
	(16,'Martin Hatchman',2,'541189054333',16,'jorguti90@gmail.com',1,'2017-10-18 01:07:25','541189054333'),
	(17,'Flavio Alfano',2,'541189054333',17,'jorguti91@gmail.com',1,'2017-10-18 01:07:25','541189054333'),
	(18,'Jorge Dangelo',2,'541189054333',18,'jorguti92@gmail.com',1,'2017-10-18 01:07:25','541189054333'),
	(19,'Jose Perez',2,'222222222222',5,'jose.perez@gmail.com',1,'2017-11-10 14:10:02','111111111111'),
	(20,'Roberto Vicuña',1,'113344559966',17,'roberto.vicuna@gmail.com',1,'2017-11-10 15:08:15','113445567788'),
	(21,'Jesus Antunez',2,'222222222222',2,'jesus.antunez@gmail.com',1,'2017-11-11 11:27:42','111111111111');

/*!40000 ALTER TABLE `tb_tenant` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_tickets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_tickets`;

CREATE TABLE `tb_tickets` (
  `idTicket` int(11) NOT NULL AUTO_INCREMENT,
  `dateCreated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dateRecibedAdmin` datetime DEFAULT NULL,
  `dateRecibeCompany` datetime DEFAULT NULL,
  `idStatusTicketKf` int(11) DEFAULT '1',
  `codTicket` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` int(11) DEFAULT NULL,
  `description` text COLLATE utf8_spanish2_ci,
  `idRequestKf` int(11) DEFAULT NULL,
  `idTenantKf` int(11) DEFAULT NULL,
  `idUserAdminKf` int(11) DEFAULT NULL COMMENT 'ADMINISTRADORES ',
  `idUserCompany` int(11) DEFAULT NULL,
  `idUserEnterpriceKf` int(11) DEFAULT NULL COMMENT 'ENCARGADO',
  `numberItemes` int(11) DEFAULT NULL COMMENT 'CANTIDAD DE LLAVEROS O ELEMENTOS ',
  `idTypeDeliveryKf` int(11) DEFAULT NULL,
  `numberItemDisabled` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idOWnerKf` int(11) DEFAULT NULL COMMENT 'PROPIETARIO',
  `idTypeOuther` int(11) DEFAULT NULL COMMENT 'TIPO DE CONSULTA',
  `mailContactConsult` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'MAIL DE CONTACTO PARA CONSULTAS',
  `SA_NRO_ORDER` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idReasonDisabledItemKf` int(11) DEFAULT NULL COMMENT 'Razon Cancelar item',
  `descriptionOrder` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'DESCRIPCION DEL PEDIDO',
  `idTypeServicesKf` int(11) DEFAULT NULL COMMENT 'SERVICIO SOBRE EL CUAL SE SOLICITA EL SERVICIO TECNICO',
  `addressConsul` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idProfileKf` int(11) DEFAULT NULL,
  `idOpcionLowTicketKf` int(11) DEFAULT NULL,
  `idAttendantKf` int(11) DEFAULT NULL,
  `idCompanyKf` int(11) DEFAULT NULL,
  `idBranchKf` int(11) DEFAULT NULL,
  `isAprobatedAdmin` tinyint(4) DEFAULT '0',
  `isCancelTicket` tinyint(4) DEFAULT '0',
  `dateCancel` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idTicket`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

LOCK TABLES `tb_tickets` WRITE;
/*!40000 ALTER TABLE `tb_tickets` DISABLE KEYS */;

INSERT INTO `tb_tickets` (`idTicket`, `dateCreated`, `dateRecibedAdmin`, `dateRecibeCompany`, `idStatusTicketKf`, `codTicket`, `idTypeTicketKf`, `description`, `idRequestKf`, `idTenantKf`, `idUserAdminKf`, `idUserCompany`, `idUserEnterpriceKf`, `numberItemes`, `idTypeDeliveryKf`, `numberItemDisabled`, `idOWnerKf`, `idTypeOuther`, `mailContactConsult`, `SA_NRO_ORDER`, `idReasonDisabledItemKf`, `descriptionOrder`, `idTypeServicesKf`, `addressConsul`, `idProfileKf`, `idOpcionLowTicketKf`, `idAttendantKf`, `idCompanyKf`, `idBranchKf`, `isAprobatedAdmin`, `isCancelTicket`, `dateCancel`)
VALUES
	(1,'2017-08-24 14:31:09',NULL,NULL,1,'',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2017-11-17 09:43:42'),
	(2,'2017-08-24 14:31:44',NULL,NULL,1,'',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(3,'2017-08-24 14:41:54',NULL,NULL,1,'',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(4,'2017-08-24 14:42:51',NULL,NULL,1,'',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(5,'2017-08-24 14:43:28',NULL,NULL,1,'',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(6,'2017-08-24 14:46:19',NULL,NULL,1,'',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(7,'2017-08-24 14:57:00',NULL,NULL,1,'',2,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(8,'2017-08-24 15:04:18',NULL,NULL,1,'',2,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(9,'2017-08-24 15:11:26',NULL,NULL,1,'',2,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,'2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(10,'2017-08-24 15:12:39',NULL,NULL,1,'',2,'aqui escribo algo',NULL,1,NULL,NULL,NULL,NULL,1,'2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(11,'2017-08-24 15:16:27',NULL,NULL,1,'',2,'aqui escribo algo',NULL,1,NULL,NULL,NULL,NULL,1,'2',NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(12,'2017-08-24 15:16:55',NULL,NULL,1,'',2,'aqui escribo algo',NULL,1,NULL,NULL,NULL,NULL,NULL,'2',NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(13,'2017-08-24 15:34:17',NULL,NULL,1,'',2,'aqui escribo algo',NULL,1,NULL,NULL,NULL,NULL,NULL,'2',NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(14,'2017-08-24 15:36:21',NULL,NULL,1,'',NULL,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(15,'2017-08-24 15:36:58',NULL,NULL,1,'',NULL,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(16,'2017-08-24 15:37:41',NULL,NULL,1,'',NULL,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(17,'2017-08-24 15:37:57',NULL,NULL,1,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(18,'2017-08-24 15:38:42',NULL,NULL,1,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(19,'2017-08-24 15:43:06',NULL,NULL,1,'',1,'aqui escribo algo',NULL,NULL,NULL,NULL,1,3,1,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(20,'2017-08-24 15:43:18',NULL,NULL,1,'',1,'aqui escribo algo',NULL,NULL,NULL,NULL,1,3,1,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(21,'2017-08-24 15:51:07',NULL,NULL,1,'',3,'aqui escribo algo',NULL,NULL,NULL,NULL,1,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(22,'2017-08-24 15:51:55',NULL,NULL,1,'',3,'aqui escribo algo',NULL,NULL,NULL,NULL,1,3,1,NULL,NULL,NULL,NULL,NULL,NULL,'DESCRIPCION DEL PEDIDO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(23,'2017-08-24 15:59:20',NULL,NULL,1,'',3,'aqui escribo algo',NULL,NULL,NULL,NULL,1,3,1,NULL,NULL,NULL,NULL,NULL,NULL,'DESCRIPCION DEL PEDIDO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(24,'2017-08-24 16:13:00',NULL,NULL,1,'',4,'COSNULATAAAAAA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'mail@mas.jf',NULL,NULL,NULL,NULL,'testing',NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(25,'2017-08-24 16:16:06',NULL,NULL,1,'',4,'COSNULATAAAAAA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'mail@mas.jf',NULL,NULL,NULL,NULL,'testing',NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(26,'2017-10-17 23:31:37',NULL,NULL,1,'',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(27,'2017-10-17 23:33:01',NULL,NULL,1,'',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(28,'2017-10-17 23:33:56',NULL,NULL,1,'',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(29,'2017-10-17 23:38:55',NULL,NULL,1,'',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(30,'2017-10-17 23:39:34',NULL,NULL,1,'',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(31,'2017-10-17 23:43:21',NULL,NULL,1,'TK-00000001',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(32,'2017-10-17 23:52:48',NULL,NULL,1,'TK-00000002',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(33,'2017-10-18 00:11:06',NULL,NULL,1,'TK-00000003',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(34,'2017-10-18 00:14:10',NULL,NULL,1,'TK-00000004',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(35,'2017-10-18 00:14:19',NULL,NULL,1,'TK-00000005',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(36,'2017-10-18 00:14:44',NULL,NULL,1,'TK-00000006',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(37,'2017-10-18 00:14:49',NULL,NULL,1,'TK-00000007',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(38,'2017-10-18 00:15:57',NULL,NULL,1,'TK-00000008',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(39,'2017-10-18 00:16:27',NULL,NULL,1,'TK-00000009',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(40,'2017-10-18 00:19:29',NULL,NULL,1,'TK-00000010',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(41,'2017-10-18 00:19:46',NULL,NULL,1,'TK-00000011',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(42,'2017-10-18 00:19:59',NULL,NULL,1,'TK-00000012',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(43,'2017-10-18 00:20:58',NULL,NULL,1,'TK-00000013',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(44,'2017-10-18 00:22:17',NULL,NULL,1,'TK-00000014',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(45,'2017-10-18 00:23:33',NULL,NULL,1,'TK-00000015',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(46,'2017-10-18 00:23:59',NULL,NULL,1,'TK-00000016',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(47,'2017-10-18 00:24:36',NULL,NULL,1,'TK-00000017',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(48,'2017-10-18 00:25:00',NULL,NULL,1,'TK-00000018',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(49,'2017-10-18 00:25:49',NULL,NULL,1,'TK-00000019',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(50,'2017-10-21 10:45:07',NULL,NULL,1,'TK-00000020',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(51,'2017-10-21 10:48:11',NULL,NULL,1,'TK-00000021',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(52,'2017-10-21 10:53:28',NULL,NULL,1,'TK-00000022',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(53,'2017-10-21 10:56:42',NULL,NULL,1,'TK-00000023',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(54,'2017-10-21 10:59:12',NULL,NULL,1,'TK-00000024',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(55,'2017-10-21 11:01:46',NULL,NULL,1,'TK-00000025',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(56,'2017-10-21 11:03:21',NULL,NULL,1,'TK-00000026',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(57,'2017-10-21 11:06:17',NULL,NULL,1,'TK-00000027',1,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(58,'2017-10-21 11:51:05',NULL,NULL,1,'TK-00000028',1,NULL,NULL,NULL,NULL,NULL,1,2,2,NULL,4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(59,'2017-10-21 12:22:06',NULL,NULL,1,'TK-00000029',1,NULL,NULL,NULL,NULL,NULL,1,1,1,NULL,16,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(60,'2017-10-21 12:25:27',NULL,NULL,1,'TK-00000030',4,'Estoy teniendo problemas con mi llavero no estoy seguro si es el lector o la llave.\n\nSaludos,\n\nJorge.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,'jorguti58@gmail.com',NULL,NULL,NULL,NULL,'Florida 4500',NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(61,'2017-10-21 12:50:59',NULL,NULL,1,'TK-00000031',2,'Codigo: 93338',NULL,NULL,NULL,NULL,1,NULL,NULL,'1',6,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(62,'2017-10-21 13:10:26',NULL,NULL,1,'TK-00000032',3,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'El lector de llave repentinamente dejo de funcionar, por favor verificar si es necesario realizar un reemplazo de la parte',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(63,'2017-10-27 01:07:47',NULL,NULL,1,'TK-00000033',1,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(64,'2017-10-27 02:01:00',NULL,NULL,1,'TK-00000034',1,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(65,'2017-10-27 02:06:52',NULL,NULL,1,'TK-00000035',1,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(66,'2017-10-28 12:15:46',NULL,NULL,1,'TK-00000036',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,NULL),
	(67,'2017-10-28 12:16:22',NULL,NULL,1,'TK-00000037',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,0,0,NULL),
	(68,'2017-10-28 12:22:23',NULL,NULL,1,'TK-00000038',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,0,0,NULL),
	(69,'2017-10-28 12:23:57',NULL,NULL,1,'TK-00000039',2,'aqui escribo algo',NULL,1,NULL,NULL,NULL,NULL,NULL,'2',NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,0,0,NULL),
	(70,'2017-11-10 02:26:49',NULL,NULL,1,'TK-00000041',1,'',NULL,NULL,0,NULL,0,2,2,NULL,17,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,0,0,NULL),
	(71,'2017-11-10 14:10:16',NULL,NULL,1,'TK-00000042',1,'GRacias',NULL,19,0,NULL,0,1,2,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,0,0,NULL),
	(72,'2017-11-10 15:08:43',NULL,NULL,1,'TK-00000043',1,'Notificar al cliente cuando se haya realizado el envio de las llaves.',NULL,NULL,17,NULL,0,2,2,NULL,17,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,NULL,NULL,0,0,NULL),
	(73,'2017-11-10 20:15:40',NULL,NULL,1,'TK-00000044',1,'No Conozco los seriales',NULL,19,0,NULL,0,1,NULL,NULL,17,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,7,NULL,NULL,0,0,NULL),
	(74,'2017-11-11 00:53:53',NULL,NULL,1,'TK-00000045',1,'',NULL,1,0,NULL,0,1,1,NULL,17,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,NULL,NULL,0,0,NULL),
	(75,'2017-11-11 01:28:43',NULL,NULL,1,'TK-00000046',1,'123213213',NULL,1,0,NULL,0,1,NULL,NULL,17,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,7,NULL,NULL,0,0,NULL),
	(76,'2017-11-11 01:29:46',NULL,NULL,1,'TK-00000047',1,'123213',NULL,1,0,NULL,0,1,NULL,NULL,17,NULL,NULL,NULL,2,NULL,NULL,NULL,NULL,NULL,7,NULL,NULL,0,0,NULL),
	(77,'2017-11-11 01:31:30',NULL,NULL,1,'TK-00000048',2,'12321323',NULL,1,0,NULL,0,1,NULL,NULL,17,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,7,NULL,NULL,0,0,NULL),
	(78,'2017-11-11 01:33:19',NULL,NULL,1,'TK-00000049',2,'1123144',NULL,19,0,NULL,0,1,NULL,NULL,17,NULL,NULL,NULL,2,NULL,NULL,NULL,NULL,NULL,7,NULL,NULL,0,0,NULL),
	(79,'2017-11-11 01:36:03',NULL,NULL,1,'TK-00000050',2,'12313214',NULL,1,0,NULL,0,1,NULL,NULL,17,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,7,NULL,NULL,0,0,NULL),
	(80,'2017-11-11 01:39:23',NULL,NULL,1,'TK-00000051',2,'123213, 12321',NULL,6,0,NULL,1,2,NULL,NULL,0,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,7,NULL,NULL,0,0,NULL),
	(81,'2017-11-11 03:04:58',NULL,NULL,1,'TK-00000052',3,'Notificar via mail la fecha de visita.',NULL,NULL,0,17,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Tenemos 3 cámaras con falla en la imagen.',NULL,NULL,NULL,NULL,NULL,1,1,0,0,NULL),
	(82,'2017-11-11 11:28:14',NULL,NULL,1,'TK-00000053',1,'Probando',NULL,21,0,NULL,0,2,2,NULL,17,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,0,0,NULL),
	(83,'2017-11-11 11:31:13',NULL,NULL,1,'TK-00000054',2,'123213, 123213',NULL,1,0,NULL,0,2,NULL,NULL,17,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,7,NULL,NULL,0,0,NULL);

/*!40000 ALTER TABLE `tb_tickets` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_type_delivery
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_type_delivery`;

CREATE TABLE `tb_type_delivery` (
  `idTypeDelivery` int(11) DEFAULT NULL,
  `typeDelivery` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `amount` decimal(18,2) DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

LOCK TABLES `tb_type_delivery` WRITE;
/*!40000 ALTER TABLE `tb_type_delivery` DISABLE KEYS */;

INSERT INTO `tb_type_delivery` (`idTypeDelivery`, `typeDelivery`, `amount`)
VALUES
	(1,'RETIRO POR OFICINA',NULL),
	(2,'ENTREGA EN EDIFICIO AL ENCARGADO/A',NULL);

/*!40000 ALTER TABLE `tb_type_delivery` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_type_outher
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_type_outher`;

CREATE TABLE `tb_type_outher` (
  `idTypeOuther` int(11) NOT NULL,
  `TypeOuther` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTypeOuther`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

LOCK TABLES `tb_type_outher` WRITE;
/*!40000 ALTER TABLE `tb_type_outher` DISABLE KEYS */;

INSERT INTO `tb_type_outher` (`idTypeOuther`, `TypeOuther`)
VALUES
	(1,'VENTA'),
	(2,'LLAVEROS'),
	(3,'SERVICIOS TECNICOS'),
	(4,'FACTURACION'),
	(5,'ADMINISTRATIVAS');

/*!40000 ALTER TABLE `tb_type_outher` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_type_services
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_type_services`;

CREATE TABLE `tb_type_services` (
  `idTypeServices` int(11) NOT NULL AUTO_INCREMENT,
  `typeServices` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTypeServices`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;



# Volcado de tabla tb_typetenant
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_typetenant`;

CREATE TABLE `tb_typetenant` (
  `idTypeTenant` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `typeTenantName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTypeTenant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

LOCK TABLES `tb_typetenant` WRITE;
/*!40000 ALTER TABLE `tb_typetenant` DISABLE KEYS */;

INSERT INTO `tb_typetenant` (`idTypeTenant`, `typeTenantName`)
VALUES
	('1','Inqulino'),
	('2','Propietario');

/*!40000 ALTER TABLE `tb_typetenant` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_typeticket
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_typeticket`;

CREATE TABLE `tb_typeticket` (
  `idTypeTicket` int(11) NOT NULL AUTO_INCREMENT,
  `TypeTicketName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTypeTicket`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

LOCK TABLES `tb_typeticket` WRITE;
/*!40000 ALTER TABLE `tb_typeticket` DISABLE KEYS */;

INSERT INTO `tb_typeticket` (`idTypeTicket`, `TypeTicketName`)
VALUES
	(1,'ALTA DE LLAVEROS'),
	(2,'BAJA DE LLAVEROS'),
	(3,'SERVICIO TECNICO'),
	(4,'OTRAS SOLICITUDES O CONSULTAS');

/*!40000 ALTER TABLE `tb_typeticket` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_user`;

CREATE TABLE `tb_user` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `fullNameUser` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `emailUser` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `phoneNumberUser` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `phoneLocalNumberUser` varchar(25) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `addresUser` varchar(150) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `passwordUser` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idProfileKf` int(11) DEFAULT NULL,
  `idStatusKf` int(11) DEFAULT NULL,
  `dateCreated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `idCompanyKf` int(11) DEFAULT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;

INSERT INTO `tb_user` (`idUser`, `fullNameUser`, `emailUser`, `phoneNumberUser`, `phoneLocalNumberUser`, `addresUser`, `passwordUser`, `idProfileKf`, `idStatusKf`, `dateCreated`, `idCompanyKf`)
VALUES
	(1,'Jorge Gutierrez','jorguti58@gmail.com','117788999003','112233445566',NULL,'fe703d258c7ef5f50b71e06565a65aa07194907f',1,1,NULL,NULL),
	(17,'David Eduardo Rincon','rexx84@gmail.com','333333333333','111111111111',NULL,'1f82ea75c5cc526729e2d581aeb3aeccfef4407e',3,1,'2017-10-25 23:16:00',1),
	(22,'Luis Carreño','luis.carreno@coca-cola.com','1199887766','1144556677',NULL,'1f82ea75c5cc526729e2d581aeb3aeccfef4407e',2,1,'2017-10-26 15:17:25',1);

/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
