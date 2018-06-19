# ************************************************************
# Sequel Pro SQL dump
# Versión 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.35)
# Base de datos: db_coferba
# Tiempo de Generación: 2018-06-12 16:41:41 +0000
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
  `priceUni` decimal(10,2) DEFAULT '0.00' COMMENT 'Precio por unidad',
  `priceManagement` decimal(10,2) DEFAULT '0.00' COMMENT 'Precio por Gestion',
  `priceShipping` decimal(10,2) DEFAULT '0.00' COMMENT 'Precio por envio ',
  `SA_ID_COMPANY` int(11) DEFAULT NULL,
  PRIMARY KEY (`idAdress`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

LOCK TABLES `tb_addres` WRITE;
/*!40000 ALTER TABLE `tb_addres` DISABLE KEYS */;

INSERT INTO `tb_addres` (`idAdress`, `nameAdress`, `priceUni`, `priceManagement`, `priceShipping`, `SA_ID_COMPANY`)
VALUES
	(1,'Cramer 1275',100.00,0.00,150.00,NULL),
	(2,'Blanco Encalada 2355',0.00,0.00,0.00,NULL),
	(3,'Cabildo 3510',0.00,0.00,0.00,NULL),
	(4,'Gral. La valle 1920',0.00,0.00,0.00,NULL),
	(5,'Parana 2568',0.00,0.00,0.00,NULL),
	(6,'Rivadavia 4530',0.00,0.00,0.00,NULL);

/*!40000 ALTER TABLE `tb_addres` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_branch
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_branch`;

CREATE TABLE `tb_branch` (
  `idBranch` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `branchName` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL,
  `idCompanyKf` int(11) DEFAULT NULL,
  `idAdressKf` int(11) DEFAULT NULL,
  `SA_ID_COMPANY` int(11) DEFAULT NULL,
  PRIMARY KEY (`idBranch`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

LOCK TABLES `tb_branch` WRITE;
/*!40000 ALTER TABLE `tb_branch` DISABLE KEYS */;

INSERT INTO `tb_branch` (`idBranch`, `branchName`, `idCompanyKf`, `idAdressKf`, `SA_ID_COMPANY`)
VALUES
	(1,'SUCURSAL 1',1,1,NULL),
	(2,'SUCURSAL 2',1,2,NULL),
	(3,'SUCURSAL 1',2,3,NULL),
	(4,'SUCURSAL 2',2,4,NULL),
	(5,'Toyota 1',3,5,NULL),
	(6,'Toyota 2',3,6,NULL);

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
  `SA_ID_COMPANY` int(11) DEFAULT NULL,
  PRIMARY KEY (`idCompany`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

LOCK TABLES `tb_company` WRITE;
/*!40000 ALTER TABLE `tb_company` DISABLE KEYS */;

INSERT INTO `tb_company` (`idCompany`, `nameCompany`, `SA_ID_COMPANY`)
VALUES
	(1,'Carlos Castaño',NULL),
	(2,'Talcahuano Propiedades',NULL),
	(3,'Toyota',NULL);

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
  `idUserKf` int(11) DEFAULT NULL,
  `isAprobatedAdmin` tinyint(4) DEFAULT '0',
  `isRequesLowByProp` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`idDepartment`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

LOCK TABLES `tb_department` WRITE;
/*!40000 ALTER TABLE `tb_department` DISABLE KEYS */;

INSERT INTO `tb_department` (`idDepartment`, `idAdressKf`, `departmentFloor`, `deparmentNumber`, `deparmentDescription`, `idStatusKf`, `idUserAdminRKf`, `idUserAdminPropietariKf`, `idUserKf`, `isAprobatedAdmin`, `isRequesLowByProp`)
VALUES
	(1,1,'Porteria',0,'',1,1,NULL,58,1,0),
	(2,1,'1-A',0,'',1,1,NULL,22,1,0),
	(3,1,'1-B',0,'',1,1,NULL,22,1,0),
	(4,1,'2-A',0,'',1,1,NULL,63,1,0),
	(5,1,'2-B',0,'',1,1,NULL,65,1,0),
	(6,1,'3-A',0,'',1,1,NULL,NULL,0,0),
	(7,1,'3-B',0,'',1,1,NULL,NULL,0,0),
	(8,1,'4-A',0,'',1,1,NULL,NULL,0,0),
	(9,1,'4-B',0,'',1,1,NULL,NULL,0,0),
	(10,1,'5-A',0,'',1,1,NULL,NULL,0,0),
	(11,1,'5-B',0,'',1,1,NULL,NULL,0,0),
	(12,2,'6-A',0,'',1,1,NULL,22,1,0),
	(13,2,'6-B',0,'',1,1,NULL,52,1,0),
	(14,2,'7-A',0,'',1,1,NULL,NULL,0,0),
	(15,2,'7-B',0,'',1,1,NULL,NULL,0,0),
	(16,2,'8-A',0,'',1,1,NULL,53,1,0),
	(17,3,'8-B',0,'',1,1,NULL,60,1,0),
	(18,2,'Porteria',0,NULL,1,1,NULL,43,1,0),
	(19,3,'Porteria',0,NULL,1,1,NULL,64,1,0);

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
  `idProfile` int(11) unsigned NOT NULL,
  `nameProfile` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idProfile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

LOCK TABLES `tb_profile` WRITE;
/*!40000 ALTER TABLE `tb_profile` DISABLE KEYS */;

INSERT INTO `tb_profile` (`idProfile`, `nameProfile`)
VALUES
	(1,'Coferba'),
	(2,'Empresa'),
	(3,'Propietario'),
	(4,'Admin Consorsio'),
	(5,'Inquilino'),
	(6,'Encargado');

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
	('-1','Rechazado','100'),
	('1','Finalizado','101'),
	('10','Programado','3'),
	('2','Autorizacion Pendiente','100'),
	('3','Aprobado','100'),
	('4','Pendiente de envio ','1'),
	('5','En Ruta','103'),
	('6','Cancelado','101'),
	('7','Listo para Retirar','2'),
	('8','Solicitado','3'),
	('9','Pendiente','102');

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
	(1,'140','TK');

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
	(6,'20:00','HORA DE MAIL DE VERIFICACION DE MAIL PARA ADMINISTRADORES DE CONSORCIO'),
	(7,'ventas@coferba.com.ar','MAIL DE VENTAS'),
	(8,'tecnica@coferba.com.ar','MAIL SERVICO TECNICO'),
	(9,'cobranzas@coferba.com.ar','MAIL FACTURACION'),
	(10,'administracion@coferba.com.ar','MAIL ADMINISTRATIVO');

/*!40000 ALTER TABLE `tb_sys_param` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_tickets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_tickets`;

CREATE TABLE `tb_tickets` (
  `idTicket` int(11) NOT NULL AUTO_INCREMENT,
  `dateCreated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dateRecibedAdmin` datetime DEFAULT NULL,
  `dateRecibeCompany` datetime DEFAULT NULL,
  `idStatusTicketKf` int(11) DEFAULT '2',
  `codTicket` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` int(11) DEFAULT NULL COMMENT 'ID DEL TIPO DE TICKET',
  `description` text COLLATE utf8_spanish2_ci,
  `idRequestKf` int(11) DEFAULT NULL,
  `idUserTenantKf` int(11) DEFAULT NULL COMMENT 'ID DEL INQUILINO',
  `idUserAdminKf` int(11) DEFAULT NULL COMMENT 'ID ADMIN COFERBA',
  `idUserCompany` int(11) DEFAULT NULL COMMENT 'ID USUARIO EMPRESA',
  `idUserEnterpriceKf` int(11) NOT NULL COMMENT 'ID ADMIN CONSORCIO',
  `numberItemes` int(11) DEFAULT NULL COMMENT 'CANTIDAD DE LLAVEROS O ELEMENTOS ',
  `idTypeDeliveryKf` int(11) DEFAULT NULL,
  `numberItemDisabled` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idOWnerKf` int(11) DEFAULT NULL COMMENT 'ID DEL PROPIETARIO',
  `idTypeOuther` int(11) DEFAULT NULL COMMENT 'TIPO DE CONSULTA',
  `mailContactConsult` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'MAIL DE CONTACTO PARA CONSULTAS',
  `SA_NRO_ORDER` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idReasonDisabledItemKf` int(11) DEFAULT NULL COMMENT 'Razon Cancelar item',
  `descriptionOrder` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'DESCRIPCION DEL PEDIDO',
  `idTypeServicesKf` int(11) DEFAULT NULL COMMENT 'SERVICIO SOBRE EL CUAL SE SOLICITA EL SERVICIO TECNICO',
  `totalService` decimal(18,2) DEFAULT '0.00' COMMENT 'MONTO TOTAL DEL SERVICIO',
  `addressConsul` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idProfileKf` int(11) DEFAULT NULL,
  `idOpcionLowTicketKf` int(11) DEFAULT NULL,
  `idUserAttendantKf` int(11) DEFAULT NULL COMMENT 'ID DEL ENCARGADO',
  `idCompanyKf` int(11) DEFAULT NULL,
  `idBranchKf` int(11) DEFAULT NULL,
  `isAprobatedAdmin` tinyint(4) DEFAULT '0',
  `isCancelTicket` tinyint(4) DEFAULT '0',
  `dateCancel` timestamp NULL DEFAULT NULL,
  `idTypeOfOptionKf` int(11) DEFAULT NULL COMMENT 'ID DEL TIPO DE SOLICITUD -ENCARGADO/OTRO/EDIFICIO',
  `idDepartmentKf` int(11) DEFAULT NULL COMMENT 'ID DEL DEPARTAMENTO',
  `idAdressKf` int(11) DEFAULT NULL COMMENT 'DIRECCION DEL TICKET',
  `dateAprovatedAdmin` timestamp NULL DEFAULT NULL,
  `idOtherKf` int(11) DEFAULT NULL COMMENT 'Id de encargado de typo "Otro"',
  PRIMARY KEY (`idTicket`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

LOCK TABLES `tb_tickets` WRITE;
/*!40000 ALTER TABLE `tb_tickets` DISABLE KEYS */;

INSERT INTO `tb_tickets` (`idTicket`, `dateCreated`, `dateRecibedAdmin`, `dateRecibeCompany`, `idStatusTicketKf`, `codTicket`, `idTypeTicketKf`, `description`, `idRequestKf`, `idUserTenantKf`, `idUserAdminKf`, `idUserCompany`, `idUserEnterpriceKf`, `numberItemes`, `idTypeDeliveryKf`, `numberItemDisabled`, `idOWnerKf`, `idTypeOuther`, `mailContactConsult`, `SA_NRO_ORDER`, `idReasonDisabledItemKf`, `descriptionOrder`, `idTypeServicesKf`, `totalService`, `addressConsul`, `idProfileKf`, `idOpcionLowTicketKf`, `idUserAttendantKf`, `idCompanyKf`, `idBranchKf`, `isAprobatedAdmin`, `isCancelTicket`, `dateCancel`, `idTypeOfOptionKf`, `idDepartmentKf`, `idAdressKf`, `dateAprovatedAdmin`, `idOtherKf`)
VALUES
	(1,'2018-02-14 04:46:44',NULL,NULL,1,'TK-00000117',1,'',NULL,22,0,NULL,0,2,2,NULL,23,NULL,NULL,NULL,NULL,NULL,NULL,350.00,NULL,NULL,NULL,1,1,1,0,0,NULL,NULL,3,NULL,NULL,0),
	(2,'2018-02-14 04:47:20',NULL,NULL,1,'TK-00000118',1,'',NULL,44,0,NULL,0,1,2,NULL,23,NULL,NULL,NULL,NULL,NULL,NULL,0.00,NULL,NULL,NULL,3,1,2,0,0,NULL,NULL,12,NULL,NULL,0),
	(4,'2018-02-14 04:58:16',NULL,NULL,1,'TK-00000120',3,'',NULL,NULL,0,0,17,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Cambio de camara principal',NULL,NULL,NULL,NULL,NULL,NULL,1,1,0,0,NULL,NULL,NULL,1,NULL,NULL),
	(6,'2018-02-14 05:17:15',NULL,NULL,1,'TK-00000122',4,'Solicito que me hagan llegar la factura con el encargado del edificio',NULL,NULL,NULL,0,0,NULL,NULL,NULL,23,4,'carlos.villalobos@gmail.com',NULL,NULL,NULL,NULL,NULL,'1',NULL,NULL,NULL,1,1,0,0,NULL,NULL,NULL,1,NULL,NULL),
	(7,'2018-02-14 13:36:36',NULL,NULL,1,'TK-00000123',3,'',NULL,NULL,30,22,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Lector de Llave quemado.',NULL,NULL,NULL,NULL,NULL,NULL,3,5,0,0,NULL,NULL,NULL,5,NULL,NULL),
	(8,'2018-02-15 14:21:18',NULL,NULL,2,'TK-00000124',1,'',NULL,0,0,NULL,17,1,2,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,250.00,NULL,NULL,NULL,1,1,1,0,0,NULL,3,0,1,NULL,31),
	(9,'2018-02-15 14:24:03',NULL,NULL,2,'TK-00000125',1,'',NULL,0,0,NULL,17,1,2,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,250.00,NULL,NULL,NULL,1,1,1,0,0,NULL,1,0,1,NULL,0),
	(10,'2018-02-15 18:57:15',NULL,NULL,2,'TK-00000126',1,'',NULL,0,30,NULL,0,1,2,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0.00,NULL,NULL,NULL,3,1,2,0,0,NULL,2,0,2,NULL,0),
	(11,'2018-02-15 19:06:22',NULL,NULL,2,'TK-00000127',1,'',NULL,0,0,NULL,17,1,2,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,250.00,NULL,NULL,NULL,1,1,1,0,0,NULL,3,0,1,NULL,32),
	(12,'2018-02-15 20:25:41',NULL,NULL,2,'TK-00000128',1,'',NULL,0,0,NULL,17,1,2,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0.00,NULL,NULL,NULL,3,1,2,0,0,NULL,3,0,2,NULL,37),
	(13,'2018-02-16 00:23:06',NULL,NULL,2,'TK-00000129',1,'',NULL,22,0,NULL,0,1,2,NULL,23,NULL,NULL,NULL,NULL,NULL,NULL,250.00,NULL,NULL,NULL,1,0,1,0,0,NULL,NULL,2,1,NULL,0),
	(14,'2018-02-16 00:31:10',NULL,NULL,2,'TK-00000130',1,'',NULL,22,0,NULL,0,1,2,NULL,23,NULL,NULL,NULL,NULL,NULL,NULL,250.00,NULL,NULL,NULL,1,1,1,0,0,NULL,NULL,3,1,NULL,0),
	(15,'2018-02-16 01:54:41',NULL,NULL,2,'TK-00000131',3,'',NULL,NULL,0,22,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'CAmbio',NULL,NULL,NULL,NULL,NULL,NULL,3,6,0,0,NULL,NULL,NULL,6,NULL,NULL),
	(16,'2018-02-16 05:29:59',NULL,NULL,2,'TK-00000132',3,'',NULL,NULL,0,22,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Defectuoso',NULL,NULL,NULL,NULL,NULL,NULL,3,5,0,0,NULL,NULL,NULL,5,NULL,NULL),
	(19,'2018-02-16 05:40:07',NULL,NULL,2,'TK-00000135',4,'Prueba',NULL,NULL,NULL,22,0,NULL,NULL,NULL,0,4,'luis.carreno@coca-cola.com',NULL,NULL,NULL,NULL,NULL,'5',NULL,NULL,NULL,3,5,0,0,NULL,NULL,NULL,5,NULL,NULL),
	(20,'2018-02-16 23:31:58',NULL,NULL,2,'TK-00000136',3,'',NULL,NULL,33,17,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'411',NULL,NULL,NULL,NULL,NULL,NULL,1,2,0,1,'2018-02-16 11:35:10',NULL,NULL,2,NULL,NULL),
	(21,'2018-03-23 15:26:44',NULL,NULL,2,'TK-00000137',3,'H6H6H6H66H6H6HHH6',NULL,NULL,31,17,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'HH6H6H6H6H6HH666H66HH6H6H6',NULL,NULL,NULL,NULL,NULL,NULL,1,1,0,0,NULL,NULL,NULL,1,NULL,NULL),
	(22,'2018-04-10 20:09:47',NULL,NULL,2,'TK-00000138',2,'robo',NULL,63,0,NULL,40,1,NULL,'456666',0,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,2,1,1,0,0,NULL,NULL,NULL,1,NULL,NULL),
	(23,'2018-04-10 20:13:04',NULL,NULL,2,'TK-00000139',3,'ohjklñjklñ',NULL,NULL,31,39,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'hkblñhj',NULL,NULL,NULL,NULL,NULL,NULL,1,1,0,0,NULL,NULL,NULL,1,NULL,NULL),
	(24,'2018-04-10 20:17:06',NULL,NULL,2,'TK-00000140',4,'consulta',NULL,NULL,NULL,NULL,40,NULL,NULL,NULL,0,3,'leandro@gmail.com',NULL,NULL,NULL,NULL,NULL,'1',NULL,NULL,NULL,1,1,0,0,NULL,NULL,NULL,1,NULL,NULL);

/*!40000 ALTER TABLE `tb_tickets` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_type_attendant
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_type_attendant`;

CREATE TABLE `tb_type_attendant` (
  `idTyepeAttendant` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nameTypeAttendant` varchar(100) COLLATE utf8_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`idTyepeAttendant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

LOCK TABLES `tb_type_attendant` WRITE;
/*!40000 ALTER TABLE `tb_type_attendant` DISABLE KEYS */;

INSERT INTO `tb_type_attendant` (`idTyepeAttendant`, `nameTypeAttendant`)
VALUES
	(1,'Otro'),
	(2,'Titular'),
	(3,'Suplente'),
	(4,'Ayudante'),
	(5,'Intendente');

/*!40000 ALTER TABLE `tb_type_attendant` ENABLE KEYS */;
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
	(5,'ADMINISTRATIVAS'),
	(6,'SEGURIDAD');

/*!40000 ALTER TABLE `tb_type_outher` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla tb_type_services
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_type_services`;

CREATE TABLE `tb_type_services` (
  `idTypeServices` int(11) NOT NULL AUTO_INCREMENT,
  `typeServices` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `SA_ID_TYPE` int(11) DEFAULT NULL,
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
	('1','Propietario'),
	('2','Inquilino');

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
  `passwordUser` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idProfileKf` int(11) unsigned DEFAULT NULL,
  `dateCreated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `idCompanyKf` int(11) DEFAULT NULL,
  `resetPasword` tinyint(4) DEFAULT '0',
  `idAddresKf` int(11) DEFAULT NULL,
  `idTyepeAttendantKf` int(11) unsigned DEFAULT NULL COMMENT 'TIPO DE ENCARGADO',
  `descOther` text COLLATE utf8_spanish2_ci COMMENT 'ENCARGADO DE TIPO OTRO',
  `idDepartmentKf` int(11) DEFAULT NULL COMMENT 'DEPARTAMENTO DE EL INQUILINO O PROPIETARIO',
  `isEdit` tinyint(11) DEFAULT '0',
  `requireAuthentication` tinyint(11) DEFAULT '1',
  `idTypeTenantKf` int(11) DEFAULT NULL,
  `idStatusKf` int(11) unsigned DEFAULT NULL,
  `tokenMail` varchar(300) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `isConfirmatedMail` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`idUser`),
  KEY `idProfileKf` (`idProfileKf`),
  CONSTRAINT `tb_user_ibfk_1` FOREIGN KEY (`idProfileKf`) REFERENCES `tb_profile` (`idProfile`) ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;

INSERT INTO `tb_user` (`idUser`, `fullNameUser`, `emailUser`, `phoneNumberUser`, `phoneLocalNumberUser`, `passwordUser`, `idProfileKf`, `dateCreated`, `idCompanyKf`, `resetPasword`, `idAddresKf`, `idTyepeAttendantKf`, `descOther`, `idDepartmentKf`, `isEdit`, `requireAuthentication`, `idTypeTenantKf`, `idStatusKf`, `tokenMail`, `isConfirmatedMail`)
VALUES
	(17,'ejempllo','ejempllo','ejempllo','ejempllo','63982e54a7aeb0d89910475ba6dbd3ca6dd4e5a1',1,'2017-10-26 02:16:00',0,0,1,0,'',1,NULL,1,0,1,NULL,0),
	(22,'Luis Carreño','luis.carreno@coca-cola.com','1199887766','1144556677','1f82ea75c5cc526729e2d581aeb3aeccfef4407e',2,'2017-10-26 18:17:25',3,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,0),
	(23,'Carlos Villalobos','carlos.villalobos@gmail.com','(054) 9 11 2235-6388','(054) 9 11 2669-4918','1f82ea75c5cc526729e2d581aeb3aeccfef4407e',3,'2017-11-23 00:28:25',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,0),
	(24,'prueba editada','prueba','prueba','123','32e7092ddccc9af07299d6e8dac6fe731c6572d2',1,'2017-11-23 05:36:20',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0),
	(25,'Jose Gomez','jose.gomez@gmail.com','113443663346','116678885464','1f82ea75c5cc526729e2d581aeb3aeccfef4407e',3,'2017-11-24 17:47:25',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,0),
	(27,'prueba de registro','prueba@prueba.com.ar','(154) 2 32 1321-3213','(254) 1 31 3213-1322','1f82ea75c5cc526729e2d581aeb3aeccfef4407e',3,'2018-01-26 03:26:01',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,0),
	(28,'Xavi Hernandez','xavi.hernandez@yahoo.es','(454) 4 44 4444-4444','(854) 8 88 8888-8888','1f82ea75c5cc526729e2d581aeb3aeccfef4407e',4,'2018-01-31 07:34:09',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,0),
	(29,'Humberto Moran','humberto.moran@gmail.com','(054) 1 11 1111-1111','(054) 2 22 2222-2222','1f82ea75c5cc526729e2d581aeb3aeccfef4407e',3,'2018-01-31 20:35:07',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,0),
	(30,'developer 1','developer1@gmail.com','(054) 9 12 3213-2323','(054) 9 11 2231-2321','1f82ea75c5cc526729e2d581aeb3aeccfef4407e',1,'2018-02-11 15:50:25',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,0),
	(31,'admin sistema','soporte@coferba.com.ar','(054) 9 11 2323-2323','(054) 9 11 2343-2324','fd8abdb9181ffaa820ac9b8c9fb97abca88c6c05',1,'2018-02-16 12:01:22',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,0),
	(32,'8484845448841 65464848','4494989@hotmail.com','(154) 1 11 1111-1111','(154) 1 11 1111-1111','090efb3bde54c755c679f99e82a4c4863d93035b',3,'2018-03-20 13:14:06',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0),
	(33,'Gabriel Gamez','angelgabrielceballos@gmail.com','(154) 1 11 2251-8504','(154) 1 11 2251-8504','fe703d258c7ef5f50b71e06565a65aa07194907f',3,'2018-03-20 13:20:35',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,0),
	(34,'654658464 654654654','angelgabrielceballos@gmail.com','(154) 1 11 2251-8504','(154) 1 11 2251-8504','fe703d258c7ef5f50b71e06565a65aa07194907f',3,'2018-03-20 18:30:38',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0),
	(35,'Dario Tejada','drotejada@gmail.com','(154) 1 11 1111-1111','(154) 1 11 1111-1111','2ae3d88f02f83ac3d4e5f74533e26d8cad86e4c5',4,'2018-03-21 17:26:03',2,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0),
	(36,'juan perez','unico@gmail.com','(154) 1 15 2251-8504','(154) 1 15 2251-8504','26cf693eaa24a8c39e5dc92e06085058a3714f53',3,'2018-04-10 14:32:12',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0),
	(37,'pablo marmol','marmol@gmail.com','(154) 1 11 1111-1111','(154) 1 11 1111-1111','4394a732285f1875b62bdb074d7fe33acb519ed9',3,'2018-04-10 14:46:15',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0),
	(38,'dario tejada','drotejada@gmail.com','(154) 1 11 1111-1111','(154) 1 11 1111-1122','2432c46a664bdc63e4b6dbca654c509fbae10a89',4,'2018-04-10 15:31:35',2,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,0),
	(39,'dario tejada','drotejada@gmail.com','(154) 1 11 1111-1111','(154) 1 11 1111-1111','1f82ea75c5cc526729e2d581aeb3aeccfef4407e',4,'2018-04-10 15:50:26',1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,0),
	(40,'leandro figueroa','leandro@gmail.com','(154) 1 11 1111-1111','(154) 1 11 1111-1111','b9ca47c97508bf3d22aed0d806d923c2917c3e6e',4,'2018-04-10 15:54:02',1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,0),
	(41,'Luis Roca','luis.roca@gmail.com','(354) 3 33 3333-3333','(354) 3 33 3333-3333','1f82ea75c5cc526729e2d581aeb3aeccfef4407e',3,'2018-04-11 13:06:33',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,0),
	(48,'prueba','prueba@mail.com','prueba','1136456765','63982e54a7aeb0d89910475ba6dbd3ca6dd4e5a1',1,'2018-04-29 10:44:18',0,1,0,1,'',1,0,1,NULL,0,NULL,0),
	(49,'prueba','prueba@mail.com','prueba','1136456765','63982e54a7aeb0d89910475ba6dbd3ca6dd4e5a1',1,'2018-04-29 10:44:53',0,1,0,1,'',1,0,1,NULL,0,NULL,0),
	(50,'prueba','prueba@mail.com','prueba','1136456765','63982e54a7aeb0d89910475ba6dbd3ca6dd4e5a1',1,'2018-04-29 10:47:23',0,1,0,1,'',1,0,1,NULL,0,NULL,0),
	(51,'prueba','prueba@mail.com','prueba','1136456765','63982e54a7aeb0d89910475ba6dbd3ca6dd4e5a1',1,'2018-04-29 10:48:23',0,1,0,1,'',1,0,1,NULL,0,NULL,0),
	(52,'prueba','prueba@mail.com','prueba','1136456765','63982e54a7aeb0d89910475ba6dbd3ca6dd4e5a1',1,'2018-04-29 10:48:55',0,1,0,1,'',1,0,1,NULL,0,NULL,0),
	(53,'prueba','prueba@mail.com','prueba','1136456765','63982e54a7aeb0d89910475ba6dbd3ca6dd4e5a1',1,'2018-04-29 10:49:37',0,1,0,1,'',1,0,1,NULL,0,NULL,0),
	(54,'prueba','prueba@mail.com','prueba','1136456765','63982e54a7aeb0d89910475ba6dbd3ca6dd4e5a1',1,'2018-04-29 10:58:02',0,1,0,1,'',1,0,1,NULL,0,NULL,0),
	(55,'prueba','prueba@mail.com','prueba','1136456765','63982e54a7aeb0d89910475ba6dbd3ca6dd4e5a1',1,'2018-04-29 10:59:01',0,1,0,1,'',1,0,1,NULL,0,NULL,0),
	(56,'prueba','prueba@mail.com','prueba','1136456765','63982e54a7aeb0d89910475ba6dbd3ca6dd4e5a1',1,'2018-04-29 10:59:24',0,1,0,1,'',1,0,1,NULL,0,NULL,0),
	(57,NULL,NULL,NULL,NULL,NULL,NULL,'2018-04-29 11:07:58',NULL,0,NULL,NULL,NULL,NULL,0,1,NULL,NULL,NULL,0),
	(58,'prueba','prueba@mail.com','prueba','1136456765','63982e54a7aeb0d89910475ba6dbd3ca6dd4e5a1',1,'2018-04-29 11:08:37',0,1,0,1,'',1,0,1,NULL,0,'hn1zmrDzz2',1);

/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
