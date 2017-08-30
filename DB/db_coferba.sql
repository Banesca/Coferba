/*
SQLyog Ultimate v9.02 
MySQL - 5.5.24-log : Database - db_coferba
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_coferba` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish2_ci */;

USE `db_coferba`;

/*Table structure for table `tb_clients_tickets` */

DROP TABLE IF EXISTS `tb_clients_tickets`;

CREATE TABLE `tb_clients_tickets` (
  `idTicketsCliets` int(11) NOT NULL AUTO_INCREMENT,
  `idTicketKf` int(11) DEFAULT NULL,
  `idClientKf` int(11) DEFAULT NULL,
  PRIMARY KEY (`idTicketsCliets`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

/*Data for the table `tb_clients_tickets` */

insert  into `tb_clients_tickets`(`idTicketsCliets`,`idTicketKf`,`idClientKf`) values (1,19,2),(2,19,3),(3,19,1),(4,20,2),(5,20,3),(6,20,1),(7,21,2),(8,21,3),(9,21,1),(10,22,2),(11,22,3),(12,22,1),(13,23,2),(14,23,3),(15,23,1);

/*Table structure for table `tb_department` */

DROP TABLE IF EXISTS `tb_department`;

CREATE TABLE `tb_department` (
  `idDepartment` int(11) NOT NULL AUTO_INCREMENT,
  `departmentAddress` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `departmentFloor` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `deparmentNumber` int(11) DEFAULT NULL,
  `departmentLat` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `departmentLon` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `deparmentDescription` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idStatusKf` int(11) DEFAULT NULL,
  PRIMARY KEY (`idDepartment`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

/*Data for the table `tb_department` */

insert  into `tb_department`(`idDepartment`,`departmentAddress`,`departmentFloor`,`deparmentNumber`,`departmentLat`,`departmentLon`,`deparmentDescription`,`idStatusKf`) values (1,' edite AYACUCHO 559 ,  LORIDA ','1-A',900,'11.2222122','-11.212112','NO,BRE DEPARTAMNETO',1),(2,'NO,BRE DEPARTAMNETO','1-A',900,'11.2222122','-11.212112','AYACUCHO 559 ,  LORIDA',1);

/*Table structure for table `tb_profile` */

DROP TABLE IF EXISTS `tb_profile`;

CREATE TABLE `tb_profile` (
  `idProfile` int(11) NOT NULL,
  `nameProfile` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idProfile`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

/*Data for the table `tb_profile` */

insert  into `tb_profile`(`idProfile`,`nameProfile`) values (1,'Admin'),(2,'Company'),(3,'Tenant'),(4,'Admin R');

/*Table structure for table `tb_reason_disabled_item` */

DROP TABLE IF EXISTS `tb_reason_disabled_item`;

CREATE TABLE `tb_reason_disabled_item` (
  `idReasonDisabledItem` int(11) NOT NULL AUTO_INCREMENT,
  `reasonDisabledItem` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idReasonDisabledItem`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

/*Data for the table `tb_reason_disabled_item` */

insert  into `tb_reason_disabled_item`(`idReasonDisabledItem`,`reasonDisabledItem`) values (1,'ROBO'),(2,'EXTRAVIO'),(3,'FALLA DEL LLAVERO');

/*Table structure for table `tb_request` */

DROP TABLE IF EXISTS `tb_request`;

CREATE TABLE `tb_request` (
  `idRequest` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `RequestName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idRequest`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

/*Data for the table `tb_request` */

/*Table structure for table `tb_status` */

DROP TABLE IF EXISTS `tb_status`;

CREATE TABLE `tb_status` (
  `idStatusTenant` int(255) NOT NULL,
  `statusTenantName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idStatusTenant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci ROW_FORMAT=COMPACT;

/*Data for the table `tb_status` */

insert  into `tb_status`(`idStatusTenant`,`statusTenantName`) values (-1,'Eliminado'),(0,'Inactivo'),(1,'Activo');

/*Table structure for table `tb_statusticket` */

DROP TABLE IF EXISTS `tb_statusticket`;

CREATE TABLE `tb_statusticket` (
  `idStatus` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `statusName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idStatus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci ROW_FORMAT=COMPACT;

/*Data for the table `tb_statusticket` */

/*Table structure for table `tb_sys_code` */

DROP TABLE IF EXISTS `tb_sys_code`;

CREATE TABLE `tb_sys_code` (
  `idCode` int(11) DEFAULT NULL,
  `code` varchar(200) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `description` varchar(3) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

/*Data for the table `tb_sys_code` */

/*Table structure for table `tb_tenant` */

DROP TABLE IF EXISTS `tb_tenant`;

CREATE TABLE `tb_tenant` (
  `idTenant` int(11) NOT NULL AUTO_INCREMENT,
  `fullNameTenant` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeKf` int(11) DEFAULT NULL,
  `phoneNumberTenant` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idDepartmentKf` int(11) DEFAULT NULL,
  `emailTenant` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idStatusKf` int(11) DEFAULT NULL,
  `dateCrated` timestamp NULL DEFAULT NULL,
  `phoneNumberContactTenant` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTenant`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

/*Data for the table `tb_tenant` */

insert  into `tb_tenant`(`idTenant`,`fullNameTenant`,`idTypeKf`,`phoneNumberTenant`,`idDepartmentKf`,`emailTenant`,`idStatusKf`,`dateCrated`,`phoneNumberContactTenant`) values (1,'prueba EDITADA',1,'+58 9112237373',1,'nuevavlave',0,NULL,NULL),(2,'prueba nombre',1,'21931232182',1,'nuevavlave',1,NULL,NULL);

/*Table structure for table `tb_tickets` */

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
  PRIMARY KEY (`idTicket`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

/*Data for the table `tb_tickets` */

insert  into `tb_tickets`(`idTicket`,`dateCreated`,`dateRecibedAdmin`,`dateRecibeCompany`,`idStatusTicketKf`,`codTicket`,`idTypeTicketKf`,`description`,`idRequestKf`,`idTenantKf`,`idUserAdminKf`,`idUserCompany`,`idUserEnterpriceKf`,`numberItemes`,`idTypeDeliveryKf`,`numberItemDisabled`,`idOWnerKf`,`idTypeOuther`,`mailContactConsult`,`SA_NRO_ORDER`,`idReasonDisabledItemKf`,`descriptionOrder`,`idTypeServicesKf`,`addressConsul`,`idProfileKf`) values (1,'2017-08-24 14:31:09',NULL,NULL,1,'',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'2017-08-24 14:31:44',NULL,NULL,1,'',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'2017-08-24 14:41:54',NULL,NULL,1,'',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'2017-08-24 14:42:51',NULL,NULL,1,'',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'2017-08-24 14:43:28',NULL,NULL,1,'',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'2017-08-24 14:46:19',NULL,NULL,1,'',1,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,'2017-08-24 14:57:00',NULL,NULL,1,'',2,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,'2017-08-24 15:04:18',NULL,NULL,1,'',2,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,'2017-08-24 15:11:26',NULL,NULL,1,'',2,'aqui escribo algo',NULL,1,NULL,NULL,NULL,3,1,'2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,'2017-08-24 15:12:39',NULL,NULL,1,'',2,'aqui escribo algo',NULL,1,NULL,NULL,NULL,NULL,1,'2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'2017-08-24 15:16:27',NULL,NULL,1,'',2,'aqui escribo algo',NULL,1,NULL,NULL,NULL,NULL,1,'2',NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL),(12,'2017-08-24 15:16:55',NULL,NULL,1,'',2,'aqui escribo algo',NULL,1,NULL,NULL,NULL,NULL,NULL,'2',NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL),(13,'2017-08-24 15:34:17',NULL,NULL,1,'',2,'aqui escribo algo',NULL,1,NULL,NULL,NULL,NULL,NULL,'2',NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL),(14,'2017-08-24 15:36:21',NULL,NULL,1,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,'2017-08-24 15:36:58',NULL,NULL,1,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,'2017-08-24 15:37:41',NULL,NULL,1,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,'2017-08-24 15:37:57',NULL,NULL,1,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,'2017-08-24 15:38:42',NULL,NULL,1,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,'2017-08-24 15:43:06',NULL,NULL,1,'',1,'aqui escribo algo',NULL,NULL,NULL,NULL,1,3,1,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,'2017-08-24 15:43:18',NULL,NULL,1,'',1,'aqui escribo algo',NULL,NULL,NULL,NULL,1,3,1,NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(21,'2017-08-24 15:51:07',NULL,NULL,1,'',3,'aqui escribo algo',NULL,NULL,NULL,NULL,1,3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(22,'2017-08-24 15:51:55',NULL,NULL,1,'',3,'aqui escribo algo',NULL,NULL,NULL,NULL,1,3,1,NULL,NULL,NULL,NULL,NULL,NULL,'DESCRIPCION DEL PEDIDO',NULL,NULL,NULL),(23,'2017-08-24 15:59:20',NULL,NULL,1,'',3,'aqui escribo algo',NULL,NULL,NULL,NULL,1,3,1,NULL,NULL,NULL,NULL,NULL,NULL,'DESCRIPCION DEL PEDIDO',NULL,NULL,NULL),(24,'2017-08-24 16:13:00',NULL,NULL,1,'',4,'COSNULATAAAAAA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'mail@mas.jf',NULL,NULL,NULL,NULL,'testing',NULL),(25,'2017-08-24 16:16:06',NULL,NULL,1,'',4,'COSNULATAAAAAA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'mail@mas.jf',NULL,NULL,NULL,NULL,'testing',NULL);

/*Table structure for table `tb_type_delivery` */

DROP TABLE IF EXISTS `tb_type_delivery`;

CREATE TABLE `tb_type_delivery` (
  `idTypeDelivery` int(11) DEFAULT NULL,
  `typeDelivery` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

/*Data for the table `tb_type_delivery` */

insert  into `tb_type_delivery`(`idTypeDelivery`,`typeDelivery`) values (1,'RETIRO POR OFICINA'),(2,'ENTREGA EN EDIFICIO AL ENCARGADO/A');

/*Table structure for table `tb_type_outher` */

DROP TABLE IF EXISTS `tb_type_outher`;

CREATE TABLE `tb_type_outher` (
  `idTypeOuther` int(11) NOT NULL,
  `TypeOuther` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTypeOuther`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

/*Data for the table `tb_type_outher` */

insert  into `tb_type_outher`(`idTypeOuther`,`TypeOuther`) values (1,'VENTA'),(2,'LLAVEROS'),(3,'SERVICIOS TECNICOS'),(4,'FACTURACION'),(5,'ADMINISTRATIVAS');

/*Table structure for table `tb_type_services` */

DROP TABLE IF EXISTS `tb_type_services`;

CREATE TABLE `tb_type_services` (
  `idTypeServices` int(11) NOT NULL AUTO_INCREMENT,
  `typeServices` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTypeServices`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

/*Data for the table `tb_type_services` */

/*Table structure for table `tb_typetenant` */

DROP TABLE IF EXISTS `tb_typetenant`;

CREATE TABLE `tb_typetenant` (
  `idTypeTenant` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `typeTenantName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTypeTenant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

/*Data for the table `tb_typetenant` */

insert  into `tb_typetenant`(`idTypeTenant`,`typeTenantName`) values ('1','Inqulino'),('2','Dueño Departamento');

/*Table structure for table `tb_typeticket` */

DROP TABLE IF EXISTS `tb_typeticket`;

CREATE TABLE `tb_typeticket` (
  `idTypeTicket` int(11) NOT NULL AUTO_INCREMENT,
  `TypeTicketName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTypeTicket`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

/*Data for the table `tb_typeticket` */

insert  into `tb_typeticket`(`idTypeTicket`,`TypeTicketName`) values (1,'ALTA DE LLAVEROS'),(2,'BAJA DE LLAVEROS'),(3,'SERVICIO TECNICO'),(4,'OTRAS SOLICITUDES O CONSULTAS');

/*Table structure for table `tb_user` */

DROP TABLE IF EXISTS `tb_user`;

CREATE TABLE `tb_user` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `fullNameUser` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `emailUser` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `phoneNumberUser` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `addresUser` varchar(150) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `passwordUser` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idProfileKf` int(11) DEFAULT NULL,
  `idStatusKf` int(11) DEFAULT NULL,
  `dateCreated` timestamp NULL DEFAULT NULL,
  `rezonSocial` varchar(150) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

/*Data for the table `tb_user` */

insert  into `tb_user`(`idUser`,`fullNameUser`,`emailUser`,`phoneNumberUser`,`addresUser`,`passwordUser`,`idProfileKf`,`idStatusKf`,`dateCreated`,`rezonSocial`) values (1,'prueba editada','prueba','prueba','prueba','32e7092ddccc9af07299d6e8dac6fe731c6572d2',1,-1,NULL,'prueba');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
