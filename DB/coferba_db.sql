/*
SQLyog Ultimate v12.4.1 (64 bit)
MySQL - 10.6.5-MariaDB-log : Database - db_coferba2
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_coferba2` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `db_coferba2`;

/*Table structure for table `tb_access_control` */

DROP TABLE IF EXISTS `tb_access_control`;

CREATE TABLE `tb_access_control` (
  `idAccessControl` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idAccessControl`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `tb_access_control` */

insert  into `tb_access_control`(`idAccessControl`,`titulo`) values 
(1,'Prueba de control de acceso');

/*Table structure for table `tb_access_control_door` */

DROP TABLE IF EXISTS `tb_access_control_door`;

CREATE TABLE `tb_access_control_door` (
  `idAccessControlDoor` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idAccessControlDoor`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

/*Data for the table `tb_access_control_door` */

insert  into `tb_access_control_door`(`idAccessControlDoor`,`titulo`) values 
(1,'Principal'),
(2,'Cochera'),
(3,'Servicio'),
(4,'Terraza'),
(5,'Escalera'),
(6,'Sum'),
(7,'Otros'),
(8,'Ascensor'),
(9,'Oficina'),
(10,'Adicional');

/*Table structure for table `tb_addres` */

DROP TABLE IF EXISTS `tb_addres`;

CREATE TABLE `tb_addres` (
  `idAdress` int(11) NOT NULL AUTO_INCREMENT,
  `nameAdress` varchar(300) COLLATE utf8mb3_swedish_ci DEFAULT NULL,
  `idCompanyKf` int(11) DEFAULT NULL,
  `priceUni` decimal(10,2) DEFAULT 0.00 COMMENT 'Precio por unidad',
  `priceManagement` decimal(10,2) DEFAULT 0.00 COMMENT 'Precio por Gestion',
  `priceShipping` decimal(10,2) DEFAULT 0.00 COMMENT 'Precio por envio ',
  `IdSecurityCode` varchar(255) COLLATE utf8mb3_swedish_ci DEFAULT NULL COMMENT 'Codigo de verificacion para mostrar direccion a propietarios/inquilinos',
  `IsInDebt` int(11) DEFAULT 0,
  `SA_ID_COMPANY` int(11) DEFAULT NULL,
  PRIMARY KEY (`idAdress`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_swedish_ci;

/*Data for the table `tb_addres` */

insert  into `tb_addres`(`idAdress`,`nameAdress`,`idCompanyKf`,`priceUni`,`priceManagement`,`priceShipping`,`IdSecurityCode`,`IsInDebt`,`SA_ID_COMPANY`) values 
(1,'Cramer 1275',1,100.00,0.00,150.00,NULL,0,NULL),
(2,'Blanco Encalada 2355',1,0.00,0.00,0.00,NULL,0,NULL),
(3,'Cabildo 3510',2,0.00,0.00,0.00,NULL,0,NULL),
(4,'Gral. La valle 1920',2,0.00,0.00,0.00,NULL,0,NULL),
(5,'Parana 2568',3,0.00,0.00,0.00,NULL,0,NULL),
(6,'Rivadavia 4530',3,0.00,0.00,0.00,NULL,0,NULL),
(11,'DIRECCION DE PRUEBA',5,110.00,260.00,170.00,'54321',0,595),
(12,'DIRECCION DE PRUEBA 2',5,260.00,0.00,310.00,'12345',0,596);

/*Table structure for table `tb_agents` */

DROP TABLE IF EXISTS `tb_agents`;

CREATE TABLE `tb_agents` (
  `idAgent` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `agent` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idAgent`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_agents` */

insert  into `tb_agents`(`idAgent`,`agent`) values 
(1,'TASS');

/*Table structure for table `tb_alarm_batery` */

DROP TABLE IF EXISTS `tb_alarm_batery`;

CREATE TABLE `tb_alarm_batery` (
  `idAlarmBatery` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idProductoFk` int(11) NOT NULL,
  `nroInternal` varchar(200) DEFAULT NULL,
  `nroFabric` varchar(200) DEFAULT NULL,
  `dateExpired` varchar(50) DEFAULT '',
  `fkidClientServicesAlarms` int(11) DEFAULT NULL,
  PRIMARY KEY (`idAlarmBatery`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_alarm_batery` */

insert  into `tb_alarm_batery`(`idAlarmBatery`,`idProductoFk`,`nroInternal`,`nroFabric`,`dateExpired`,`fkidClientServicesAlarms`) values 
(121,9,'123124124123','123123123243','31/12/2022',57),
(122,14,'123123213123',NULL,'31/12/2023',57),
(131,9,'11','11','31/12/2022',58),
(132,9,'777777777777777777777','77777777777777777777','31/12/2025',55),
(133,14,'111111111111111111111111111111',NULL,'31/12/2030',55);

/*Table structure for table `tb_alarm_line_phone` */

DROP TABLE IF EXISTS `tb_alarm_line_phone`;

CREATE TABLE `tb_alarm_line_phone` (
  `idAlarmLinePhone` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `company` varchar(100) DEFAULT NULL,
  `line` varchar(100) DEFAULT NULL,
  `idClientServicesAlarmsFk` int(11) DEFAULT NULL,
  `fk_idDatoAdicionalAlarma` int(11) DEFAULT NULL,
  PRIMARY KEY (`idAlarmLinePhone`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_alarm_line_phone` */

insert  into `tb_alarm_line_phone`(`idAlarmLinePhone`,`company`,`line`,`idClientServicesAlarmsFk`,`fk_idDatoAdicionalAlarma`) values 
(64,'Claro','11234353534',NULL,57),
(73,'Claro','1123423423432',NULL,58),
(74,'Claro','11234234235234',NULL,55);

/*Table structure for table `tb_alarm_module_gps` */

DROP TABLE IF EXISTS `tb_alarm_module_gps`;

CREATE TABLE `tb_alarm_module_gps` (
  `idAlarmModuleGps` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `moduleGprs` varchar(200) DEFAULT '',
  `nroSerieFrabric` varchar(200) DEFAULT '',
  `nroSerieInternal` varchar(200) DEFAULT '',
  `codeProgram` varchar(200) DEFAULT '',
  `portProgram` varchar(200) DEFAULT '',
  `passwordAcces` varchar(200) DEFAULT '',
  `codePart1` varchar(200) DEFAULT '',
  `codePart2` varchar(200) DEFAULT '',
  `idClientServicesAlarmsFk` int(11) DEFAULT NULL,
  `fk_idDatoAdicionalAlarma` int(11) DEFAULT NULL,
  PRIMARY KEY (`idAlarmModuleGps`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_alarm_module_gps` */

insert  into `tb_alarm_module_gps`(`idAlarmModuleGps`,`moduleGprs`,`nroSerieFrabric`,`nroSerieInternal`,`codeProgram`,`portProgram`,`passwordAcces`,`codePart1`,`codePart2`,`idClientServicesAlarmsFk`,`fk_idDatoAdicionalAlarma`) values 
(50,'27','11111111111111111','322342342343244','123123','12312','3123123','1231231231','23123123',NULL,58);

/*Table structure for table `tb_alarm_module_ip` */

DROP TABLE IF EXISTS `tb_alarm_module_ip`;

CREATE TABLE `tb_alarm_module_ip` (
  `idAlarmModuleIp` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `moduleIp` varchar(100) DEFAULT NULL,
  `nroSerieFrabric` varchar(100) DEFAULT NULL,
  `nroSerieInternal` varchar(100) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `codeProgrm` varchar(100) DEFAULT NULL,
  `portProgrm` varchar(100) DEFAULT NULL,
  `passwordAcces` varchar(100) DEFAULT NULL,
  `codePart1` varchar(100) DEFAULT NULL,
  `codePart2` varchar(100) DEFAULT NULL,
  `idClientServicesAlarmsFk` int(11) DEFAULT NULL,
  `fk_idDatoAdicionalAlarma` int(11) DEFAULT NULL,
  PRIMARY KEY (`idAlarmModuleIp`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_alarm_module_ip` */

/*Table structure for table `tb_alarm_person_alert` */

DROP TABLE IF EXISTS `tb_alarm_person_alert`;

CREATE TABLE `tb_alarm_person_alert` (
  `idPersonAlert` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `fullName` varchar(200) DEFAULT NULL,
  `link` varchar(200) DEFAULT NULL,
  `stringKey` varchar(200) DEFAULT NULL,
  `phone` varchar(200) DEFAULT NULL,
  `numberUser` varchar(200) DEFAULT NULL,
  `isUserSystem` tinyint(1) DEFAULT 0,
  `idUserSystemFk` int(11) DEFAULT NULL,
  `idClientServicesAlarmsAditionals` int(11) DEFAULT NULL,
  PRIMARY KEY (`idPersonAlert`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_alarm_person_alert` */

/*Table structure for table `tb_alarm_person_verific` */

DROP TABLE IF EXISTS `tb_alarm_person_verific`;

CREATE TABLE `tb_alarm_person_verific` (
  `idPersonVerific` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `isUserSystem` tinyint(1) DEFAULT 0,
  `idUserSystemFk` int(11) DEFAULT NULL,
  `link` varchar(200) DEFAULT NULL,
  `phone` varchar(200) DEFAULT NULL,
  `numberUser` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idPersonVerific`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_alarm_person_verific` */

/*Table structure for table `tb_alarm_services_aditionals` */

DROP TABLE IF EXISTS `tb_alarm_services_aditionals`;

CREATE TABLE `tb_alarm_services_aditionals` (
  `idAlarmServicesAditionals` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `alarmServicesAditionals` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idAlarmServicesAditionals`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_alarm_services_aditionals` */

insert  into `tb_alarm_services_aditionals`(`idAlarmServicesAditionals`,`alarmServicesAditionals`) values 
(1,'CONTROL HORARIO'),
(2,'REPORTE MENSUAL AUTOMATICO'),
(3,'REPORTES AUTOMATICOS'),
(4,'VIDEO VERIFICACION'),
(5,'APP');

/*Table structure for table `tb_alarm_type_client` */

DROP TABLE IF EXISTS `tb_alarm_type_client`;

CREATE TABLE `tb_alarm_type_client` (
  `idTypeClientAlarm` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `typeClientAlarm` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idTypeClientAlarm`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_alarm_type_client` */

insert  into `tb_alarm_type_client`(`idTypeClientAlarm`,`typeClientAlarm`) values 
(1,'CASA'),
(2,'COMERCIO'),
(3,'INDUSTRIA'),
(4,'OTROS');

/*Table structure for table `tb_app_monitor_application` */

DROP TABLE IF EXISTS `tb_app_monitor_application`;

CREATE TABLE `tb_app_monitor_application` (
  `idApplication` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `applicationName` varchar(100) DEFAULT '',
  PRIMARY KEY (`idApplication`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_app_monitor_application` */

insert  into `tb_app_monitor_application`(`idApplication`,`applicationName`) values 
(1,'RAM'),
(2,'SMART PANIC');

/*Table structure for table `tb_backup_energy` */

DROP TABLE IF EXISTS `tb_backup_energy`;

CREATE TABLE `tb_backup_energy` (
  `idBackupEnergy` int(11) NOT NULL AUTO_INCREMENT,
  `idClientServicesFk` int(11) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `idBatteryFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idBackupEnergy`),
  KEY `idClientServicesCameraFk` (`idClientServicesFk`),
  KEY `idBatteryFk` (`idBatteryFk`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=latin1;

/*Data for the table `tb_backup_energy` */

insert  into `tb_backup_energy`(`idBackupEnergy`,`idClientServicesFk`,`description`,`idBatteryFk`) values 
(90,51,'Bateria Alarma 12v 7ah 7a Recargable',9),
(91,52,'BATERIA',9),
(95,55,'BATERIA',9),
(96,56,'BATERIA',9),
(103,50,'Bateria Alarma 12v 7ah 7a Recargable',9),
(104,50,'BATERIA 12V 7A',14),
(105,50,'Ups Estabilizador Lyonn 800va',17);

/*Table structure for table `tb_backup_energy_totem` */

DROP TABLE IF EXISTS `tb_backup_energy_totem`;

CREATE TABLE `tb_backup_energy_totem` (
  `idBackupEnergyTotem` int(11) NOT NULL AUTO_INCREMENT,
  `idClientServicesTotemFk` int(11) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `idBatteryFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idBackupEnergyTotem`),
  KEY `idClientServicesCameraFk` (`idClientServicesTotemFk`),
  KEY `idBatteryFk` (`idBatteryFk`),
  CONSTRAINT `tb_backup_energy_totem_ibfk_3` FOREIGN KEY (`idBatteryFk`) REFERENCES `tb_products` (`idProduct`)
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=latin1;

/*Data for the table `tb_backup_energy_totem` */

insert  into `tb_backup_energy_totem`(`idBackupEnergyTotem`,`idClientServicesTotemFk`,`description`,`idBatteryFk`) values 
(158,29,'Bateria Alarma 12v 7ah 7a Recargable',9),
(159,30,'BATERIA',14),
(166,28,'Bateria Alarma 12v 7ah 7a Recargable',9),
(167,28,'Ups Estabilizador Lyonn 800va',17),
(168,28,'BATERIA 12V 7A',14);

/*Table structure for table `tb_bakups_order` */

DROP TABLE IF EXISTS `tb_bakups_order`;

CREATE TABLE `tb_bakups_order` (
  `idBakupsOrder` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `bakupsOrder` int(11) DEFAULT NULL,
  `idClientServicesCameraFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idBakupsOrder`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_bakups_order` */

/*Table structure for table `tb_battery_install_access_control` */

DROP TABLE IF EXISTS `tb_battery_install_access_control`;

CREATE TABLE `tb_battery_install_access_control` (
  `idBatteryInstallAccessControl` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientServicesAccessControlFk` int(11) DEFAULT NULL,
  `idBatteryFk` int(11) DEFAULT NULL,
  `numberSerieInternal` varchar(255) DEFAULT NULL,
  `numberSerieFabric` varchar(255) DEFAULT NULL,
  `dateExpiration` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idBatteryInstallAccessControl`)
) ENGINE=InnoDB AUTO_INCREMENT=514 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_battery_install_access_control` */

insert  into `tb_battery_install_access_control`(`idBatteryInstallAccessControl`,`idClientServicesAccessControlFk`,`idBatteryFk`,`numberSerieInternal`,`numberSerieFabric`,`dateExpiration`) values 
(497,105,9,'124124123123','1231241123123','13/21/2312'),
(502,106,9,'223423432432423','4324234324234423','31/12/2025'),
(508,102,14,'1231231231232',NULL,'12/31/2312'),
(509,103,9,'888888888888888','888888888888888','11/11/1111'),
(510,103,14,'123112312',NULL,'31/23/1231'),
(512,107,9,'123213213','123123123','31/12/2021'),
(513,108,14,'12312321312',NULL,'31/12/2022');

/*Table structure for table `tb_battery_install_alarm` */

DROP TABLE IF EXISTS `tb_battery_install_alarm`;

CREATE TABLE `tb_battery_install_alarm` (
  `idBatteryInstallAlarm` int(11) NOT NULL AUTO_INCREMENT,
  `battery` varchar(100) DEFAULT NULL,
  `idClientServicesAlarmsFk` int(11) DEFAULT NULL,
  `nroSerieInternal` int(30) DEFAULT NULL,
  `nroSerieManufacturer` int(30) DEFAULT NULL,
  `dateUp` date DEFAULT NULL,
  PRIMARY KEY (`idBatteryInstallAlarm`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tb_battery_install_alarm` */

/*Table structure for table `tb_cameras` */

DROP TABLE IF EXISTS `tb_cameras`;

CREATE TABLE `tb_cameras` (
  `idCamera` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientServicesCameraFk` int(11) DEFAULT NULL,
  `portCamera` int(11) DEFAULT NULL,
  `coveredArea` varchar(255) DEFAULT '',
  `locationCamera` varchar(255) DEFAULT '',
  `nroSerieCamera` varchar(255) DEFAULT '',
  `nroFabricCamera` varchar(255) DEFAULT '',
  `dateExpireCamera` varchar(255) DEFAULT '',
  `idProductFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idCamera`),
  KEY `idClientServicesCameraFk` (`idClientServicesCameraFk`)
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_cameras` */

insert  into `tb_cameras`(`idCamera`,`idClientServicesCameraFk`,`portCamera`,`coveredArea`,`locationCamera`,`nroSerieCamera`,`nroFabricCamera`,`dateExpireCamera`,`idProductFk`) values 
(126,51,1,'Prueba','Prueba','5555555555555','5555555555555',NULL,18),
(127,51,2,'Prueba 2','66666666666','66666666666','66666666666',NULL,18),
(128,51,3,'Prueba','Prueba','123123213445356634564','123123213445356634564',NULL,18),
(129,51,4,'Prueba','Prueba','56435643676768574635','56435643676768574635',NULL,18),
(130,51,5,'Probando123','Probando123','23432465767890','23432465767890',NULL,18),
(131,51,6,'Probando123','Probando123','234567895764853423','234567895764853423',NULL,18),
(132,51,7,'Probando123','Probando123','23456789000978675465','23456789000978675465',NULL,18),
(133,51,8,'Prueba nueva','Prueba nueva','4356786543256786546576543','4356786543256786546576543',NULL,18),
(134,52,1,'Prueba camara','Prueba camara','Prueba camara','Prueba camara',NULL,18),
(138,55,1,'Prueba','Prueba','12312343256545345','4363463453453455',NULL,18),
(139,55,2,'Prueba','Prueba','123123454634645','13414322432424',NULL,18),
(140,56,1,'Probando','Probando','324535673454353454','324535673454353454',NULL,18),
(141,56,2,'Probando','Probando','11111111111111111122222','445454545444444445444',NULL,18),
(142,56,3,'Probando','Probando','4567809980780954735324','6113134245678908775464543',NULL,18),
(149,50,1,'Prueba','Prueba','12845493589','12845493589',NULL,18),
(150,50,2,'Prueba 2','Prueba 2','23457689876','23457689876',NULL,18),
(151,50,3,'Prueba 3','Prueba 3','23456789675','23456789675',NULL,18);

/*Table structure for table `tb_cameras_totem` */

DROP TABLE IF EXISTS `tb_cameras_totem`;

CREATE TABLE `tb_cameras_totem` (
  `idCameraTotem` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientServicesCameraTotemFk` int(11) DEFAULT NULL,
  `portCamera` int(11) DEFAULT NULL,
  `coveredArea` varchar(255) DEFAULT '',
  `locationCamera` varchar(255) DEFAULT '',
  `nroSerieCamera` varchar(255) DEFAULT '',
  `nroFabricCamera` varchar(255) DEFAULT '',
  `dateExpireCamera` varchar(255) DEFAULT '',
  `idProductFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idCameraTotem`),
  KEY `idClientServicesCameraFk` (`idClientServicesCameraTotemFk`)
) ENGINE=InnoDB AUTO_INCREMENT=279 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_cameras_totem` */

insert  into `tb_cameras_totem`(`idCameraTotem`,`idClientServicesCameraTotemFk`,`portCamera`,`coveredArea`,`locationCamera`,`nroSerieCamera`,`nroFabricCamera`,`dateExpireCamera`,`idProductFk`) values 
(260,29,1,'PruebaTotem','PruebaTotem','657864546754567','654365464354643',NULL,18),
(261,29,2,'PruebaTotem','PruebaTotem','45643534534634','6346346345',NULL,18),
(262,29,3,'PruebaTotem','PruebaTotem','3534534435435435','43543534534545435',NULL,18),
(263,29,4,'PruebaTotem','PruebaTotem','345634535435345435','34534534534543435',NULL,18),
(264,29,5,'PruebaTotem','PruebaTotem','345313541312312425346563463244','32423423423423412412423434234432',NULL,18),
(265,29,6,'PruebaTotem','PruebaTotem','2312312321312','3123123123123',NULL,18),
(266,30,2,'Prueba','Prueba','22312','3123213213',NULL,18),
(275,28,1,'Probando','Probando','23423434532423432','23423434532423432',NULL,18),
(276,28,3,'Probando','Probando','34543564364564365476','34543564364564365476',NULL,18),
(277,28,4,'Probando','Probando','5678877565476734754687','5678877565476734754687',NULL,18),
(278,28,2,'Probando','Probando','12345356579099098','12345356579099098',NULL,18);

/*Table structure for table `tb_category_departament` */

DROP TABLE IF EXISTS `tb_category_departament`;

CREATE TABLE `tb_category_departament` (
  `idCategoryDepartament` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `categoryDepartament` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idCategoryDepartament`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_category_departament` */

insert  into `tb_category_departament`(`idCategoryDepartament`,`categoryDepartament`) values 
(1,'Departamento'),
(2,'Cochera'),
(3,'Baulera'),
(4,'Local'),
(5,'Porteria'),
(6,'Mixto');

/*Table structure for table `tb_category_keychain` */

DROP TABLE IF EXISTS `tb_category_keychain`;

CREATE TABLE `tb_category_keychain` (
  `idCategory` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idCategory`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Data for the table `tb_category_keychain` */

insert  into `tb_category_keychain`(`idCategory`,`name`) values 
(1,'Departamento'),
(2,'Stock'),
(3,'Reserva'),
(4,'Apertura'),
(5,'Administracion');

/*Table structure for table `tb_client_address_particular` */

DROP TABLE IF EXISTS `tb_client_address_particular`;

CREATE TABLE `tb_client_address_particular` (
  `idAddressParticular` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientFk` int(11) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `depto` varchar(100) DEFAULT NULL,
  `isBuilding` int(11) DEFAULT NULL,
  `idProvinceFk` int(11) DEFAULT NULL,
  `idLocationFk` int(11) DEFAULT NULL,
  `clarification` varchar(200) DEFAULT NULL,
  `idParticularDepartamentKf` int(11) DEFAULT NULL COMMENT 'Id del departamento dependiendo del tipo de inmueble',
  `idZonaFk` varchar(255) DEFAULT NULL,
  `idTipoInmuebleFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idAddressParticular`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_client_address_particular` */

/*Table structure for table `tb_client_authorizing` */

DROP TABLE IF EXISTS `tb_client_authorizing`;

CREATE TABLE `tb_client_authorizing` (
  `idClientAuthorizing` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idUserFk` int(11) DEFAULT NULL,
  `isLevel1` tinyint(1) DEFAULT 0,
  `isLevel2` tinyint(1) DEFAULT 0,
  `idClientFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idClientAuthorizing`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_client_authorizing` */

/*Table structure for table `tb_client_billing_information` */

DROP TABLE IF EXISTS `tb_client_billing_information`;

CREATE TABLE `tb_client_billing_information` (
  `idBillingInfo` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientFk` int(11) DEFAULT NULL,
  `businessAddress` varchar(200) DEFAULT NULL,
  `businessNameBilling` varchar(200) DEFAULT NULL,
  `cuitBilling` varchar(50) DEFAULT NULL,
  `idLocationBillingFk` int(11) DEFAULT NULL,
  `idProvinceBillingFk` int(11) DEFAULT NULL,
  `idTypeTaxFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idBillingInfo`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_client_billing_information` */

insert  into `tb_client_billing_information`(`idBillingInfo`,`idClientFk`,`businessAddress`,`businessNameBilling`,`cuitBilling`,`idLocationBillingFk`,`idProvinceBillingFk`,`idTypeTaxFk`) values 
(1,2,NULL,'CARLOS MARSAN','20-10550239-8',1,1,2),
(2,3,NULL,'CONSORCIO SAN PEDRITO 636','30-66123727-5',1,1,2),
(3,4,NULL,'CONSORCIO MONROE 3846/48','30-70999275-5',1,1,1),
(4,5,NULL,'CONSORCIO BELAUSTEGUI 1115','30-71158873-2',1,1,1),
(5,6,NULL,'CONSORCIO SAN JUAN 3688','30-66303996-9',1,1,1),
(6,7,NULL,'CONSORCIOS REPUBLICA ARABE SIRIA 2763','33-53891758-9',1,1,1),
(7,8,NULL,'CONSORCIO AV. SAN JUAN 3655','30-59623849-8',1,1,1),
(8,9,NULL,'CONSORCIO URUGUAY 1038/42','30-53595230-9',1,1,1),
(9,11,'ARREGUI 3146','CONSTANZA TETTAMANTI','27-25790019-9',1,1,2),
(10,12,'LAVALLE 357','CONSORCIO LAVALLE 357','30-53414898-0',1,1,1),
(11,13,'MANUEL UGARTE 3580','CONSORCIO UGARTE 3580','30-71112623-2',1,1,1),
(12,15,'HIDALGO 462','DORA SILVIA MARJBEIN','27-11018302-5',1,1,3),
(13,16,'AV EVA PERON 1155','CONSORCIO EVA PERON 1155','30-71550934-9',1,1,1),
(14,17,'JULIAN ALVAREZ 647','CONSORCIO JULIAN ALVAREZ 647','30-61287840-0',1,1,1),
(15,18,'HUMBERTO 1 2630','CONSORCIO HUMBERTO PRIMO 2630','33-52229082-9',1,1,1),
(16,19,NULL,'CONSORCIO GURRUCHAGA 2230','30-66155337-1',1,1,1),
(17,20,NULL,'CONSORCIO NEUQUEN 554','30-58020580-8',1,1,1),
(18,21,NULL,'CONSORCIO PLANES 636','30-53772707-8',1,1,1),
(19,22,NULL,'CONSORCIO SOLER 4196/98','30-62687526-9',1,1,1),
(20,23,NULL,'CONSORCIO HIDALGO 619/23','30-68254780-0',1,1,1),
(21,24,NULL,'ARGERICH 1723 S.A.','30-71515362-5',1,1,2),
(22,26,'VIRREY DEL PINO 4130','SEBASTIAN REYES','20-22472909-0',1,1,3),
(23,27,NULL,'CONSORCIO AV. FEDERICO LACROZE 3541/45','30-71469960-8',1,1,1),
(24,28,NULL,'CONSORCIO GUEVARA 456/60','30-71469967-5',1,1,1),
(25,29,NULL,'CONSORCIO AV. MENDOZA 5123/5125','30-71605813-8',1,1,1),
(26,31,'AV RIVADAVIA 2358','FRANCISCA ELENA ANTONELLI','27-13071755-7',1,1,2),
(27,32,NULL,'CONSORCIO VENEZUELA 1867/69','30-55692953-6',1,1,1),
(28,33,NULL,'CONSORCIO CHARCAS 2956','30-54533701-7',1,1,1),
(29,34,NULL,'CONSORCIO SANTA FE 2086','30-59272355-3',1,1,1),
(30,35,'CHILE 2154','CONSORCIO CHILE 2154','30-55993131-0',1,1,1),
(31,36,'YATAY 120','MARIA FERNANDA ALIPRANDI','27-20009140-5',1,1,3),
(32,37,NULL,'CONSORCIO BOGADO 4538','30-71117670-1',1,1,1),
(33,38,NULL,'CONSORCIO SAN JOSE DE CALASANZ 481','30-71425179-8',1,1,1),
(34,39,NULL,'CONSORCIO VALLE 1215','30-71219834-2',1,1,1),
(35,40,NULL,'CONSORCIO RIVADAVIA 4965','30-53581480-1',1,1,1),
(36,41,NULL,'CONSORCIO MALVINAS ARGENTINAS 251/253/255','30-67895315-2',1,1,1),
(37,42,NULL,'CONSORCIO HORTIGUERA 473/475','CONSORCIO HORTIGUERA 473/475',1,1,1),
(38,NULL,'GABRIELA MISTRAL 4099','GABRIELA MISTRAL S.A','343454354355',1,1,2),
(39,1,'GABRIELA MISTRAL 4099','GABRIELA MISTRAL S.A','23432424532523',1,1,2),
(40,10,'ARREGUI 3146','ARREGUI S.A','23436345635345',1,1,2),
(41,14,'HIDALGO 462','HIDALGO S.A','23435436436435',1,1,2),
(42,25,'VIRREY DEL PINO 4130','VIRREY DEL PINO 4130','23435446546456546',1,1,2),
(43,44,'GARCIA DEL RIO 4044','Prueba','Prueba',37,1,1),
(44,46,'GARCIA DEL RIO 4045','Prueba2','Prueba2',37,1,1),
(45,45,'GARCIA DEL RIO 4045','GARCIA DEL RIO 4045','20-324234324-4',37,1,1),
(46,49,'GARCIA DEL RIO 4049','New Prueba SRL','1123123123123',37,1,2),
(47,50,NULL,NULL,NULL,NULL,NULL,NULL);

/*Table structure for table `tb_client_camera` */

DROP TABLE IF EXISTS `tb_client_camera`;

CREATE TABLE `tb_client_camera` (
  `idClientCamera` int(11) NOT NULL AUTO_INCREMENT,
  `idClientFk` int(11) DEFAULT NULL,
  `idClientServicesCameraFk` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `userProfile` varchar(255) DEFAULT NULL,
  `qrBase64` text DEFAULT NULL,
  PRIMARY KEY (`idClientCamera`),
  KEY `idClientServicesCameraFk` (`idClientServicesCameraFk`),
  CONSTRAINT `tb_client_camera_ibfk_1` FOREIGN KEY (`idClientServicesCameraFk`) REFERENCES `tb_client_services_camera` (`idClientServicesCamera`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=latin1;

/*Data for the table `tb_client_camera` */

insert  into `tb_client_camera`(`idClientCamera`,`idClientFk`,`idClientServicesCameraFk`,`name`,`user`,`pass`,`userProfile`,`qrBase64`) values 
(80,93,51,'David Eduardo Rincon Luengo','rexx84','12345','admin','data:image/png;base64,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'),
(86,76,50,'Roberto Higuera','robertoh','admin3','admin3','data:image/png;base64,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'),
(87,NULL,50,'Carlos','carlos00','admin','admin','data:image/png;base64,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');

/*Table structure for table `tb_client_departament` */

DROP TABLE IF EXISTS `tb_client_departament`;

CREATE TABLE `tb_client_departament` (
  `idClientDepartament` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientFk` int(11) DEFAULT NULL,
  `floor` varchar(11) DEFAULT NULL,
  `departament` varchar(11) DEFAULT NULL,
  `idCategoryDepartamentFk` int(11) DEFAULT NULL,
  `idStatusFk` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `numberUNF` int(11) DEFAULT NULL,
  `autoApproveFloor` int(11) DEFAULT NULL,
  `autoApproveDepto` int(11) DEFAULT NULL,
  PRIMARY KEY (`idClientDepartament`)
) ENGINE=InnoDB AUTO_INCREMENT=984 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_client_departament` */

insert  into `tb_client_departament`(`idClientDepartament`,`idClientFk`,`floor`,`departament`,`idCategoryDepartamentFk`,`idStatusFk`,`created_at`,`numberUNF`,`autoApproveFloor`,`autoApproveDepto`) values 
(1,1,'2','A',1,1,'2020-07-23 21:37:02',NULL,1,1),
(2,3,'pb','1',5,1,'2020-07-23 21:48:46',0,NULL,NULL),
(3,3,'1','A',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(4,3,'1','B',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(5,3,'1','C',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(6,3,'1','D',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(7,3,'1','E',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(8,3,'1','F',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(9,3,'1','G',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(10,3,'2','A',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(11,3,'2','B',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(12,3,'2','C',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(13,3,'2','D',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(14,3,'2','E',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(15,3,'2','F',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(16,3,'2','G',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(17,3,'3','A',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(18,3,'3','B',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(19,3,'3','C',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(20,3,'3','D',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(21,3,'3','E',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(22,3,'3','F',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(23,3,'3','G',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(24,3,'4','A',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(25,3,'4','B',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(26,3,'4','C',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(27,3,'4','D',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(28,3,'4','E',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(29,3,'4','F',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(30,3,'4','G',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(31,3,'5','A',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(32,3,'5','B',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(33,3,'5','C',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(34,3,'5','D',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(35,3,'5','E',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(36,3,'5','F',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(37,3,'5','G',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(38,3,'6','A',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(39,3,'6','B',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(40,3,'6','C',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(41,3,'6','D',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(42,3,'6','E',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(43,3,'6','F',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(44,3,'6','G',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(45,3,'7','A',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(46,3,'7','B',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(47,3,'7','C',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(48,3,'7','D',1,1,'2020-07-23 21:48:46',0,NULL,NULL),
(49,3,'7','E',1,1,'2020-07-23 21:48:47',0,NULL,NULL),
(50,3,'7','F',1,1,'2020-07-23 21:48:47',0,NULL,NULL),
(51,3,'7','G',1,1,'2020-07-23 21:48:47',0,NULL,NULL),
(52,3,'8','A',1,1,'2020-07-23 21:48:47',0,NULL,NULL),
(53,3,'8','B',1,1,'2020-07-23 21:48:47',0,NULL,NULL),
(54,3,'8','C',1,1,'2020-07-23 21:48:47',0,NULL,NULL),
(55,3,'8','D',1,1,'2020-07-23 21:48:47',0,NULL,NULL),
(56,3,'8','E',1,1,'2020-07-23 21:48:47',0,NULL,NULL),
(57,3,'8','F',1,1,'2020-07-23 21:48:47',0,NULL,NULL),
(58,3,'8','G',1,1,'2020-07-23 21:48:47',0,NULL,NULL),
(59,4,'pb','1',1,1,'2020-07-24 12:21:36',0,NULL,NULL),
(60,4,'1','A',1,1,'2020-07-24 12:21:36',0,NULL,NULL),
(61,4,'1','B',1,1,'2020-07-24 12:21:36',0,NULL,NULL),
(62,4,'2','A',1,1,'2020-07-24 12:21:36',0,NULL,NULL),
(63,4,'2','B',1,1,'2020-07-24 12:21:36',0,NULL,NULL),
(64,4,'3','A',1,1,'2020-07-24 12:21:36',0,NULL,NULL),
(65,4,'3','B',1,1,'2020-07-24 12:21:36',0,NULL,NULL),
(66,4,'4','A',1,1,'2020-07-24 12:21:36',0,NULL,NULL),
(67,4,'4','B',1,1,'2020-07-24 12:21:36',0,NULL,NULL),
(68,4,'5','A',1,1,'2020-07-24 12:21:36',0,NULL,NULL),
(69,4,'5','B',1,1,'2020-07-24 12:21:36',0,NULL,NULL),
(70,4,'6','A',1,1,'2020-07-24 12:21:36',0,NULL,NULL),
(71,4,'6','B',1,1,'2020-07-24 12:21:36',0,NULL,NULL),
(72,4,'7','A',1,1,'2020-07-24 12:21:36',0,NULL,NULL),
(73,4,'7','B',1,1,'2020-07-24 12:21:36',0,NULL,NULL),
(74,4,'8','A',1,1,'2020-07-24 12:21:36',0,NULL,NULL),
(75,4,'8','B',1,1,'2020-07-24 12:21:36',0,NULL,NULL),
(76,4,'9','A',1,1,'2020-07-24 12:21:36',0,NULL,NULL),
(77,4,'9','B',1,1,'2020-07-24 12:21:36',0,NULL,NULL),
(78,5,'pb','1',5,1,'2020-07-24 12:26:03',0,NULL,NULL),
(79,5,'1','A',1,1,'2020-07-24 12:26:03',0,NULL,NULL),
(80,5,'1','B',1,1,'2020-07-24 12:26:03',0,NULL,NULL),
(81,5,'1','C',1,1,'2020-07-24 12:26:03',0,NULL,NULL),
(82,5,'2','A',1,1,'2020-07-24 12:26:03',0,NULL,NULL),
(83,5,'2','B',1,1,'2020-07-24 12:26:03',0,NULL,NULL),
(84,5,'2','C',1,1,'2020-07-24 12:26:03',0,NULL,NULL),
(85,5,'3','A',1,1,'2020-07-24 12:26:04',0,NULL,NULL),
(86,5,'3','B',1,1,'2020-07-24 12:26:04',0,NULL,NULL),
(87,5,'3','C',1,1,'2020-07-24 12:26:04',0,NULL,NULL),
(88,5,'4','A',1,1,'2020-07-24 12:26:04',0,NULL,NULL),
(89,5,'4','B',1,1,'2020-07-24 12:26:04',0,NULL,NULL),
(90,5,'4','C',1,1,'2020-07-24 12:26:04',0,NULL,NULL),
(91,5,'5','A',1,1,'2020-07-24 12:26:04',0,NULL,NULL),
(92,5,'5','B',1,1,'2020-07-24 12:26:04',0,NULL,NULL),
(93,5,'5','C',1,1,'2020-07-24 12:26:04',0,NULL,NULL),
(94,5,'6','A',1,1,'2020-07-24 12:26:04',0,NULL,NULL),
(95,5,'6','B',1,1,'2020-07-24 12:26:04',0,NULL,NULL),
(96,5,'6','C',1,1,'2020-07-24 12:26:04',0,NULL,NULL),
(97,5,'7','A',1,1,'2020-07-24 12:26:04',0,NULL,NULL),
(98,5,'7','B',1,1,'2020-07-24 12:26:04',0,NULL,NULL),
(99,5,'7','C',1,1,'2020-07-24 12:26:04',0,NULL,NULL),
(100,5,'8','A',1,1,'2020-07-24 12:26:04',0,NULL,NULL),
(101,5,'8','B',1,1,'2020-07-24 12:26:04',0,NULL,NULL),
(102,5,'8','C',1,1,'2020-07-24 12:26:05',0,NULL,NULL),
(103,6,'lo','1',4,1,'2020-07-24 12:36:39',0,NULL,NULL),
(104,6,'pb','1',5,1,'2020-07-24 12:36:39',0,NULL,NULL),
(105,6,'1','A',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(106,6,'1','B',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(107,6,'1','C',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(108,6,'2','A',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(109,6,'2','B',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(110,6,'2','C',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(111,6,'3','A',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(112,6,'3','B',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(113,6,'3','C',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(114,6,'4','A',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(115,6,'4','B',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(116,6,'4','C',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(117,6,'5','A',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(118,6,'5','B',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(119,6,'5','C',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(120,6,'6','A',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(121,6,'6','B',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(122,6,'6','C',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(123,6,'7','A',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(124,6,'7','B',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(125,6,'7','C',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(126,6,'8','A',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(127,6,'8','B',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(128,6,'8','C',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(129,6,'9','A',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(130,6,'9','B',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(131,6,'10','A',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(132,6,'10','B',1,1,'2020-07-24 12:36:39',0,NULL,NULL),
(133,7,'pb','1',1,1,'2020-07-24 12:47:16',0,NULL,NULL),
(134,7,'pb','2',1,1,'2020-07-24 12:47:16',0,NULL,NULL),
(135,7,'1','A',1,1,'2020-07-24 12:47:16',0,NULL,NULL),
(136,7,'1','B',1,1,'2020-07-24 12:47:16',0,NULL,NULL),
(137,7,'2','A',1,1,'2020-07-24 12:47:16',0,NULL,NULL),
(138,7,'2','B',1,1,'2020-07-24 12:47:16',0,NULL,NULL),
(139,7,'3','A',1,1,'2020-07-24 12:47:16',0,NULL,NULL),
(140,7,'3','B',1,1,'2020-07-24 12:47:17',0,NULL,NULL),
(141,7,'4','A',1,1,'2020-07-24 12:47:17',0,NULL,NULL),
(142,7,'4','B',1,1,'2020-07-24 12:47:17',0,NULL,NULL),
(143,7,'5','A',1,1,'2020-07-24 12:47:17',0,NULL,NULL),
(144,7,'5','B',1,1,'2020-07-24 12:47:17',0,NULL,NULL),
(145,7,'6','A',1,1,'2020-07-24 12:47:17',0,NULL,NULL),
(146,7,'6','B',1,1,'2020-07-24 12:47:17',0,NULL,NULL),
(147,7,'7','A',1,1,'2020-07-24 12:47:17',0,NULL,NULL),
(148,7,'7','B',1,1,'2020-07-24 12:47:17',0,NULL,NULL),
(149,7,'8','A',1,1,'2020-07-24 12:47:17',0,NULL,NULL),
(150,7,'8','B',1,1,'2020-07-24 12:47:17',0,NULL,NULL),
(151,7,'9','A',1,1,'2020-07-24 12:47:17',0,NULL,NULL),
(152,7,'9','B',1,1,'2020-07-24 12:47:17',0,NULL,NULL),
(153,7,'10','A',1,1,'2020-07-24 12:47:17',0,NULL,NULL),
(154,7,'10','B',1,1,'2020-07-24 12:47:17',0,NULL,NULL),
(155,7,'11','A',1,1,'2020-07-24 12:47:17',0,NULL,NULL),
(156,7,'11','B',1,1,'2020-07-24 12:47:17',0,NULL,NULL),
(157,7,'12','A',1,1,'2020-07-24 12:47:17',0,NULL,NULL),
(158,7,'12','B',1,1,'2020-07-24 12:47:17',0,NULL,NULL),
(159,8,'pb','1',5,1,'2020-07-24 12:56:29',0,NULL,NULL),
(160,8,'1','A',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(161,8,'1','B',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(162,8,'1','C',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(163,8,'1','D',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(164,8,'1','E',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(165,8,'1','F',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(166,8,'1','G',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(167,8,'2','A',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(168,8,'2','B',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(169,8,'2','C',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(170,8,'2','D',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(171,8,'2','E',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(172,8,'2','F',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(173,8,'2','G',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(174,8,'3','A',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(175,8,'3','B',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(176,8,'3','C',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(177,8,'3','D',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(178,8,'3','E',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(179,8,'4','A',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(180,8,'4','B',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(181,8,'4','C',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(182,8,'4','D',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(183,8,'4','E',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(184,8,'5','A',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(185,8,'5','B',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(186,8,'5','C',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(187,8,'5','D',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(188,8,'5','E',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(189,8,'6','A',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(190,8,'6','B',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(191,8,'6','C',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(192,8,'6','D',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(193,8,'6','E',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(194,8,'7','A',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(195,8,'7','B',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(196,8,'7','C',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(197,8,'7','D',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(198,8,'7','E',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(199,8,'8','A',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(200,8,'8','B',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(201,8,'8','C',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(202,8,'8','D',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(203,8,'8','E',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(204,8,'9','A',1,1,'2020-07-24 12:56:29',0,NULL,NULL),
(205,8,'9','B',1,1,'2020-07-24 12:56:30',0,NULL,NULL),
(206,8,'9','C',1,1,'2020-07-24 12:56:30',0,NULL,NULL),
(207,8,'9','D',1,1,'2020-07-24 12:56:30',0,NULL,NULL),
(208,8,'10','A',1,1,'2020-07-24 12:56:30',0,NULL,NULL),
(209,8,'10','B',1,1,'2020-07-24 12:56:30',0,NULL,NULL),
(210,8,'10','C',1,1,'2020-07-24 12:56:30',0,NULL,NULL),
(211,8,'10','D',1,1,'2020-07-24 12:56:30',0,NULL,NULL),
(212,9,'pb','1',1,1,'2020-07-24 13:03:23',0,NULL,NULL),
(213,9,'1','A',1,1,'2020-07-24 13:03:23',0,NULL,NULL),
(214,9,'1','B',1,1,'2020-07-24 13:03:23',0,NULL,NULL),
(215,9,'2','A',1,1,'2020-07-24 13:03:23',0,NULL,NULL),
(216,9,'2','B',1,1,'2020-07-24 13:03:23',0,NULL,NULL),
(217,9,'3','A',1,1,'2020-07-24 13:03:23',0,NULL,NULL),
(218,9,'3','B',1,1,'2020-07-24 13:03:23',0,NULL,NULL),
(219,9,'4','A',1,1,'2020-07-24 13:03:23',0,NULL,NULL),
(220,9,'4','B',1,1,'2020-07-24 13:03:24',0,NULL,NULL),
(221,9,'5','A',1,1,'2020-07-24 13:03:24',0,NULL,NULL),
(222,9,'5','B',1,1,'2020-07-24 13:03:24',0,NULL,NULL),
(223,9,'6','A',1,1,'2020-07-24 13:03:24',0,NULL,NULL),
(224,9,'6','B',1,1,'2020-07-24 13:03:24',0,NULL,NULL),
(225,9,'7','A',1,1,'2020-07-24 13:03:24',0,NULL,NULL),
(226,9,'7','B',1,1,'2020-07-24 13:03:24',0,NULL,NULL),
(227,9,'8','A',1,1,'2020-07-24 13:03:24',0,NULL,NULL),
(228,9,'8','B',1,1,'2020-07-24 13:03:24',0,NULL,NULL),
(229,9,'9','A',1,1,'2020-07-24 13:03:24',0,NULL,NULL),
(230,9,'9','B',1,1,'2020-07-24 13:03:24',0,NULL,NULL),
(231,9,'10','A',1,1,'2020-07-24 13:03:24',0,NULL,NULL),
(232,10,'8','1',1,1,'2020-07-24 13:10:47',0,NULL,NULL),
(233,12,'pb','1',5,1,'2020-07-24 13:16:00',0,NULL,NULL),
(234,12,'1','1',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(235,12,'1','2',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(236,12,'1','3',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(237,12,'1','4',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(238,12,'1','5',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(239,12,'1','6',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(240,12,'1','7',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(241,12,'1','8',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(242,12,'2','1',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(243,12,'2','2',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(244,12,'2','3',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(245,12,'2','4',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(246,12,'2','5',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(247,12,'2','6',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(248,12,'2','7',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(249,12,'2','8',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(250,12,'3','1',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(251,12,'3','2',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(252,12,'3','3',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(253,12,'3','4',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(254,12,'3','5',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(255,12,'3','6',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(256,12,'3','7',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(257,12,'3','8',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(258,12,'4','1',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(259,12,'4','2',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(260,12,'4','3',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(261,12,'4','4',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(262,12,'4','5',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(263,12,'4','6',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(264,12,'4','7',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(265,12,'4','8',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(266,12,'5','1',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(267,12,'5','2',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(268,12,'5','3',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(269,12,'5','4',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(270,12,'5','5',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(271,12,'5','6',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(272,12,'5','7',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(273,12,'5','8',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(274,12,'6','1',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(275,12,'6','2',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(276,12,'6','3',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(277,12,'6','4',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(278,12,'6','5',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(279,12,'6','6',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(280,12,'6','7',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(281,12,'6','8',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(282,12,'7','1',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(283,12,'7','2',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(284,12,'7','3',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(285,12,'7','4',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(286,12,'7','5',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(287,12,'7','6',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(288,12,'7','7',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(289,12,'7','8',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(290,12,'8','1',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(291,12,'8','2',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(292,12,'8','3',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(293,12,'8','4',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(294,12,'8','5',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(295,12,'8','6',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(296,12,'8','7',1,1,'2020-07-24 13:16:00',0,NULL,NULL),
(297,12,'8','8',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(298,12,'9','1',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(299,12,'9','2',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(300,12,'9','3',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(301,12,'9','4',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(302,12,'9','5',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(303,12,'9','6',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(304,12,'9','7',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(305,12,'9','8',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(306,12,'10','1',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(307,12,'10','2',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(308,12,'10','3',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(309,12,'10','4',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(310,12,'10','5',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(311,12,'10','6',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(312,12,'10','7',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(313,12,'10','8',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(314,12,'11','1',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(315,12,'11','2',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(316,12,'11','3',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(317,12,'11','4',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(318,12,'11','5',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(319,12,'11','6',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(320,12,'11','7',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(321,12,'11','8',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(322,12,'12','1',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(323,12,'12','2',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(324,12,'12','3',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(325,12,'12','4',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(326,12,'12','5',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(327,12,'12','6',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(328,12,'12','7',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(329,12,'12','8',1,1,'2020-07-24 13:16:01',0,NULL,NULL),
(330,13,'pb','1',5,-1,'2020-07-24 13:21:15',0,NULL,NULL),
(331,13,'1','A',1,1,'2020-07-24 13:21:15',0,NULL,NULL),
(332,13,'1','B',1,1,'2020-07-24 13:21:15',0,NULL,NULL),
(333,13,'1','C',1,1,'2020-07-24 13:21:15',0,NULL,NULL),
(334,13,'1','D',1,1,'2020-07-24 13:21:15',0,NULL,NULL),
(335,13,'2','A',1,1,'2020-07-24 13:21:15',0,NULL,NULL),
(336,13,'2','B',1,1,'2020-07-24 13:21:15',0,NULL,NULL),
(337,13,'2','C',1,1,'2020-07-24 13:21:15',0,NULL,NULL),
(338,13,'2','D',1,1,'2020-07-24 13:21:15',0,NULL,NULL),
(339,13,'3','A',1,1,'2020-07-24 13:21:15',0,NULL,NULL),
(340,13,'3','B',1,1,'2020-07-24 13:21:15',0,NULL,NULL),
(341,13,'3','C',1,1,'2020-07-24 13:21:15',0,NULL,NULL),
(342,13,'3','D',1,1,'2020-07-24 13:21:15',0,NULL,NULL),
(343,13,'4','A',1,1,'2020-07-24 13:21:15',0,NULL,NULL),
(344,13,'4','B',1,1,'2020-07-24 13:21:15',0,NULL,NULL),
(345,13,'4','C',1,1,'2020-07-24 13:21:15',0,NULL,NULL),
(346,13,'4','D',1,1,'2020-07-24 13:21:15',0,NULL,NULL),
(347,13,'5','A',1,1,'2020-07-24 13:21:15',0,NULL,NULL),
(348,13,'5','B',1,1,'2020-07-24 13:21:15',0,NULL,NULL),
(349,13,'5','C',1,1,'2020-07-24 13:21:15',0,NULL,NULL),
(350,13,'5','D',1,1,'2020-07-24 13:21:15',0,NULL,NULL),
(351,14,'1','A',1,1,'2020-07-24 19:32:36',0,NULL,NULL),
(352,16,'pb','1',5,1,'2020-07-24 19:38:17',0,NULL,NULL),
(353,16,'1','A',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(354,16,'1','B',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(355,16,'1','C',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(356,16,'2','A',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(357,16,'2','B',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(358,16,'2','C',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(359,16,'3','A',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(360,16,'3','B',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(361,16,'3','C',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(362,16,'4','A',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(363,16,'4','B',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(364,16,'4','C',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(365,16,'5','A',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(366,16,'5','B',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(367,16,'5','C',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(368,16,'6','A',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(369,16,'6','B',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(370,16,'6','C',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(371,16,'7','A',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(372,16,'7','B',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(373,16,'7','C',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(374,16,'8','A',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(375,16,'8','B',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(376,16,'8','C',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(377,16,'9','A',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(378,16,'9','B',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(379,16,'9','C',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(380,16,'10','A',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(381,16,'10','B',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(382,16,'10','C',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(383,16,'11','A',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(384,16,'11','B',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(385,16,'12','A',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(386,16,'13','A',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(387,16,'13','B',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(388,16,'14','A',1,1,'2020-07-24 19:38:17',0,NULL,NULL),
(389,17,'pb','1',1,-1,'2020-07-24 19:45:01',0,NULL,NULL),
(390,17,'pb','2',1,-1,'2020-07-24 19:45:01',0,NULL,NULL),
(391,17,'pb','3',1,-1,'2020-07-24 19:45:01',0,NULL,NULL),
(392,17,'pb','4',1,-1,'2020-07-24 19:45:01',0,NULL,NULL),
(393,17,'pb','5',1,-1,'2020-07-24 19:45:01',0,NULL,NULL),
(394,17,'pb','6',1,-1,'2020-07-24 19:45:01',0,NULL,NULL),
(395,17,'pb','7',1,-1,'2020-07-24 19:45:01',0,NULL,NULL),
(396,17,'pb','8',1,-1,'2020-07-24 19:45:01',0,NULL,NULL),
(397,17,'pb','9',1,-1,'2020-07-24 19:45:01',0,NULL,NULL),
(398,17,'1','A',1,1,'2020-07-24 19:45:01',0,NULL,NULL),
(399,17,'1','B',1,1,'2020-07-24 19:45:01',0,NULL,NULL),
(400,17,'1','C',1,1,'2020-07-24 19:45:01',0,NULL,NULL),
(401,17,'1','D',1,1,'2020-07-24 19:45:01',0,NULL,NULL),
(402,17,'2','A',1,1,'2020-07-24 19:45:01',0,NULL,NULL),
(403,17,'2','B',1,1,'2020-07-24 19:45:01',0,NULL,NULL),
(404,17,'2','C',1,1,'2020-07-24 19:45:01',0,NULL,NULL),
(405,17,'2','D',1,1,'2020-07-24 19:45:01',0,NULL,NULL),
(406,17,'3','A',1,1,'2020-07-24 19:45:01',0,NULL,NULL),
(407,17,'3','B',1,1,'2020-07-24 19:45:01',0,NULL,NULL),
(408,17,'3','C',1,1,'2020-07-24 19:45:01',0,NULL,NULL),
(409,17,'3','D',1,1,'2020-07-24 19:45:01',0,NULL,NULL),
(410,17,'4','A',1,1,'2020-07-24 19:45:01',0,NULL,NULL),
(411,17,'4','B',1,1,'2020-07-24 19:45:01',0,NULL,NULL),
(412,17,'4','C',1,1,'2020-07-24 19:45:01',0,NULL,NULL),
(413,17,'4','D',1,1,'2020-07-24 19:45:02',0,NULL,NULL),
(414,17,'5','A',1,1,'2020-07-24 19:45:02',0,NULL,NULL),
(415,17,'5','B',1,1,'2020-07-24 19:45:02',0,NULL,NULL),
(416,17,'5','C',1,1,'2020-07-24 19:45:02',0,NULL,NULL),
(417,17,'5','D',1,1,'2020-07-24 19:45:02',0,NULL,NULL),
(418,17,'6','A',1,1,'2020-07-24 19:45:02',0,NULL,NULL),
(419,17,'6','B',1,1,'2020-07-24 19:45:02',0,NULL,NULL),
(420,17,'6','C',1,1,'2020-07-24 19:45:02',0,NULL,NULL),
(421,17,'6','D',1,1,'2020-07-24 19:45:02',0,NULL,NULL),
(422,17,'7','A',1,1,'2020-07-24 19:45:02',0,NULL,NULL),
(423,17,'7','B',1,1,'2020-07-24 19:45:02',0,NULL,NULL),
(424,17,'7','C',1,1,'2020-07-24 19:45:02',0,NULL,NULL),
(425,17,'7','D',1,1,'2020-07-24 19:45:02',0,NULL,NULL),
(426,17,'8','A',1,1,'2020-07-24 19:45:02',0,NULL,NULL),
(427,17,'8','B',1,1,'2020-07-24 19:45:02',0,NULL,NULL),
(428,17,'8','C',1,1,'2020-07-24 19:45:02',0,NULL,NULL),
(429,17,'8','D',1,1,'2020-07-24 19:45:02',0,NULL,NULL),
(430,18,'pb','1',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(431,18,'1','1',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(432,18,'1','2',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(433,18,'1','3',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(434,18,'1','4',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(435,18,'2','5',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(436,18,'2','6',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(437,18,'2','7',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(438,18,'3','8',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(439,18,'3','9',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(440,18,'3','10',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(441,18,'4','11',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(442,18,'4','12',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(443,18,'4','13',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(444,18,'5','14',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(445,18,'5','15',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(446,18,'5','16',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(447,18,'6','17',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(448,18,'6','18',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(449,18,'6','19',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(450,18,'7','20',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(451,18,'7','21',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(452,18,'7','22',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(453,18,'8','23',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(454,18,'8','24',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(455,18,'8','25',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(456,18,'9','26',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(457,18,'9','27',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(458,18,'9','28',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(459,18,'10','29',1,1,'2020-07-27 12:54:50',0,NULL,NULL),
(460,19,'pb','1',1,1,'2020-07-27 13:04:08',0,NULL,NULL),
(461,19,'pb','2',1,1,'2020-07-27 13:04:08',0,NULL,NULL),
(462,19,'1','1',1,1,'2020-07-27 13:04:08',0,NULL,NULL),
(463,19,'1','2',1,1,'2020-07-27 13:04:08',0,NULL,NULL),
(464,19,'1','3',1,1,'2020-07-27 13:04:08',0,NULL,NULL),
(465,19,'1','4',1,1,'2020-07-27 13:04:08',0,NULL,NULL),
(466,19,'2','5',1,1,'2020-07-27 13:04:08',0,NULL,NULL),
(467,19,'2','6',1,1,'2020-07-27 13:04:08',0,NULL,NULL),
(468,19,'3','7',1,1,'2020-07-27 13:04:08',0,NULL,NULL),
(469,19,'3','8',1,1,'2020-07-27 13:04:08',0,NULL,NULL),
(470,19,'4','9',1,1,'2020-07-27 13:04:08',0,NULL,NULL),
(471,19,'4','10',1,1,'2020-07-27 13:04:08',0,NULL,NULL),
(472,20,'pb','1',1,1,'2020-07-27 13:09:23',0,NULL,NULL),
(473,20,'pb','2',1,1,'2020-07-27 13:09:23',0,NULL,NULL),
(474,20,'1','A',1,1,'2020-07-27 13:09:23',0,NULL,NULL),
(475,20,'1','B',1,1,'2020-07-27 13:09:23',0,NULL,NULL),
(476,20,'2','A',1,1,'2020-07-27 13:09:23',0,NULL,NULL),
(477,20,'2','B',1,1,'2020-07-27 13:09:23',0,NULL,NULL),
(478,20,'3','A',1,1,'2020-07-27 13:09:23',0,NULL,NULL),
(479,20,'3','B',1,1,'2020-07-27 13:09:23',0,NULL,NULL),
(480,20,'4','A',1,1,'2020-07-27 13:09:23',0,NULL,NULL),
(481,20,'4','B',1,1,'2020-07-27 13:09:23',0,NULL,NULL),
(482,20,'5','A',1,1,'2020-07-27 13:09:23',0,NULL,NULL),
(483,20,'5','B',1,1,'2020-07-27 13:09:23',0,NULL,NULL),
(484,20,'6','A',1,1,'2020-07-27 13:09:23',0,NULL,NULL),
(485,20,'6','B',1,1,'2020-07-27 13:09:24',0,NULL,NULL),
(486,20,'7','A',1,1,'2020-07-27 13:09:24',0,NULL,NULL),
(487,20,'7','B',1,1,'2020-07-27 13:09:24',0,NULL,NULL),
(488,20,'8','A',1,1,'2020-07-27 13:09:24',0,NULL,NULL),
(489,20,'8','B',1,1,'2020-07-27 13:09:24',0,NULL,NULL),
(490,21,'pb','1',1,1,'2020-07-27 13:19:25',0,NULL,NULL),
(491,21,'pb','2',1,1,'2020-07-27 13:19:25',0,NULL,NULL),
(492,21,'pb','3',1,1,'2020-07-27 13:19:25',0,NULL,NULL),
(493,21,'pb','4',1,1,'2020-07-27 13:19:25',0,NULL,NULL),
(494,21,'1','A',1,1,'2020-07-27 13:19:25',0,NULL,NULL),
(495,21,'1','B',1,1,'2020-07-27 13:19:25',0,NULL,NULL),
(496,21,'1','C',1,1,'2020-07-27 13:19:25',0,NULL,NULL),
(497,21,'2','A',1,1,'2020-07-27 13:19:25',0,NULL,NULL),
(498,21,'2','B',1,1,'2020-07-27 13:19:25',0,NULL,NULL),
(499,21,'2','C',1,1,'2020-07-27 13:19:25',0,NULL,NULL),
(500,21,'3','A',1,1,'2020-07-27 13:19:25',0,NULL,NULL),
(501,21,'3','B',1,1,'2020-07-27 13:19:25',0,NULL,NULL),
(502,21,'3','C',1,1,'2020-07-27 13:19:25',0,NULL,NULL),
(503,21,'4','A',1,1,'2020-07-27 13:19:25',0,NULL,NULL),
(504,21,'4','B',1,1,'2020-07-27 13:19:25',0,NULL,NULL),
(505,21,'4','C',1,1,'2020-07-27 13:19:25',0,NULL,NULL),
(506,21,'5','A',1,1,'2020-07-27 13:19:25',0,NULL,NULL),
(507,21,'5','B',1,1,'2020-07-27 13:19:25',0,NULL,NULL),
(508,21,'5','C',1,1,'2020-07-27 13:19:25',0,NULL,NULL),
(509,21,'6','A',1,1,'2020-07-27 13:19:25',0,NULL,NULL),
(510,21,'6','B',1,1,'2020-07-27 13:19:25',0,NULL,NULL),
(511,21,'6','C',1,1,'2020-07-27 13:19:25',0,NULL,NULL),
(512,22,'pb','1',5,1,'2020-07-27 13:37:21',0,NULL,NULL),
(513,22,'1','A',1,1,'2020-07-27 13:37:21',0,NULL,NULL),
(514,22,'1','B',1,1,'2020-07-27 13:37:21',0,NULL,NULL),
(515,22,'2','A',1,1,'2020-07-27 13:37:21',0,NULL,NULL),
(516,22,'2','B',1,1,'2020-07-27 13:37:21',0,NULL,NULL),
(517,22,'3','A',1,1,'2020-07-27 13:37:21',0,NULL,NULL),
(518,22,'3','B',1,1,'2020-07-27 13:37:21',0,NULL,NULL),
(519,22,'4','A',1,1,'2020-07-27 13:37:21',0,NULL,NULL),
(520,22,'4','B',1,1,'2020-07-27 13:37:21',0,NULL,NULL),
(521,22,'5','A',1,1,'2020-07-27 13:37:21',0,NULL,NULL),
(522,22,'5','B',1,1,'2020-07-27 13:37:21',0,NULL,NULL),
(523,22,'6','A',1,1,'2020-07-27 13:37:21',0,NULL,NULL),
(524,22,'6','B',1,1,'2020-07-27 13:37:21',0,NULL,NULL),
(525,22,'7','A',1,1,'2020-07-27 13:37:21',0,NULL,NULL),
(526,22,'7','B',1,1,'2020-07-27 13:37:21',0,NULL,NULL),
(527,22,'8','A',1,1,'2020-07-27 13:37:21',0,NULL,NULL),
(528,23,'pb','1',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(529,23,'pb','2',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(530,23,'pb','3',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(531,23,'pb','4',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(532,23,'pb','5',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(533,23,'pb','6',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(534,23,'pb','7',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(535,23,'pb','8',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(536,23,'pb','9',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(537,23,'1','A',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(538,23,'1','B',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(539,23,'1','C',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(540,23,'1','D',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(541,23,'1','E',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(542,23,'1','F',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(543,23,'1','G',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(544,23,'1','I',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(545,23,'2','A',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(546,23,'2','B',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(547,23,'2','C',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(548,23,'2','D',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(549,23,'2','E',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(550,23,'2','F',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(551,23,'2','G',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(552,23,'2','I',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(553,23,'3','A',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(554,23,'3','B',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(555,23,'3','C',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(556,23,'3','D',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(557,23,'3','E',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(558,23,'3','F',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(559,23,'3','G',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(560,23,'3','I',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(561,23,'4','A',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(562,23,'4','B',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(563,23,'4','C',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(564,23,'4','D',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(565,23,'4','E',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(566,23,'4','F',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(567,23,'4','G',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(568,23,'4','I',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(569,23,'5','A',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(570,23,'5','B',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(571,23,'5','C',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(572,23,'5','D',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(573,23,'5','E',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(574,23,'5','F',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(575,23,'5','G',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(576,23,'5','I',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(577,23,'6','A',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(578,23,'6','B',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(579,23,'6','C',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(580,23,'6','D',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(581,23,'6','E',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(582,23,'6','F',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(583,23,'6','G',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(584,23,'6','I',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(585,23,'7','A',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(586,23,'7','B',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(587,23,'7','C',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(588,23,'7','D',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(589,23,'7','E',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(590,23,'7','F',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(591,23,'7','G',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(592,23,'7','I',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(593,23,'8','A',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(594,23,'8','B',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(595,23,'8','C',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(596,23,'8','D',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(597,23,'8','E',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(598,23,'8','F',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(599,23,'8','G',1,1,'2020-07-27 14:01:29',0,NULL,NULL),
(600,23,'8','I',1,1,'2020-07-27 14:01:30',0,NULL,NULL),
(601,24,'pb','1',1,1,'2020-07-27 14:06:33',0,NULL,NULL),
(602,24,'1','A',1,1,'2020-07-27 14:06:34',0,NULL,NULL),
(603,24,'1','B',1,1,'2020-07-27 14:06:35',0,NULL,NULL),
(604,24,'1','C',1,1,'2020-07-27 14:06:36',0,NULL,NULL),
(605,24,'2','A',1,1,'2020-07-27 14:06:37',0,NULL,NULL),
(606,24,'2','B',1,1,'2020-07-27 14:06:37',0,NULL,NULL),
(607,24,'3','A',1,1,'2020-07-27 14:06:37',0,NULL,NULL),
(608,24,'3','B',1,1,'2020-07-27 14:06:37',0,NULL,NULL),
(609,24,'4','A',1,1,'2020-07-27 14:06:37',0,NULL,NULL),
(610,24,'4','B',1,1,'2020-07-27 14:06:37',0,NULL,NULL),
(611,24,'4','C',1,1,'2020-07-27 14:06:37',0,NULL,NULL),
(612,24,'5','A',1,1,'2020-07-27 14:06:37',0,NULL,NULL),
(613,24,'5','B',1,1,'2020-07-27 14:06:37',0,NULL,NULL),
(614,24,'6','A',1,1,'2020-07-27 14:06:37',0,NULL,NULL),
(615,24,'6','B',1,1,'2020-07-27 14:06:37',0,NULL,NULL),
(616,24,'7','A',1,1,'2020-07-27 14:06:37',0,NULL,NULL),
(617,25,'3','C',1,1,'2020-07-27 14:20:17',NULL,NULL,NULL),
(618,27,'pb','1',1,1,'2020-07-28 18:00:20',0,NULL,NULL),
(619,27,'pb','2',5,1,'2020-07-28 18:00:20',0,NULL,NULL),
(620,27,'1','A',1,1,'2020-07-28 18:00:20',0,NULL,NULL),
(621,27,'1','B',1,1,'2020-07-28 18:00:20',0,NULL,NULL),
(622,27,'1','C',1,1,'2020-07-28 18:00:20',0,NULL,NULL),
(623,27,'2','A',1,1,'2020-07-28 18:00:20',0,NULL,NULL),
(624,27,'2','B',1,1,'2020-07-28 18:00:21',0,NULL,NULL),
(625,27,'2','C',1,1,'2020-07-28 18:00:21',0,NULL,NULL),
(626,27,'3','A',1,1,'2020-07-28 18:00:21',0,NULL,NULL),
(627,27,'3','B',1,1,'2020-07-28 18:00:21',0,NULL,NULL),
(628,27,'3','C',1,1,'2020-07-28 18:00:21',0,NULL,NULL),
(629,27,'4','A',1,1,'2020-07-28 18:00:21',0,NULL,NULL),
(630,27,'4','B',1,1,'2020-07-28 18:00:21',0,NULL,NULL),
(631,27,'4','C',1,1,'2020-07-28 18:00:22',0,NULL,NULL),
(632,27,'5','A',1,1,'2020-07-28 18:00:22',0,NULL,NULL),
(633,27,'5','B',1,1,'2020-07-28 18:00:22',0,NULL,NULL),
(634,27,'5','C',1,1,'2020-07-28 18:00:22',0,NULL,NULL),
(635,27,'6','A',1,1,'2020-07-28 18:00:22',0,NULL,NULL),
(636,27,'6','B',1,1,'2020-07-28 18:00:22',0,NULL,NULL),
(637,27,'6','C',1,1,'2020-07-28 18:00:22',0,NULL,NULL),
(638,27,'7','A',1,1,'2020-07-28 18:00:22',0,NULL,NULL),
(639,27,'7','B',1,1,'2020-07-28 18:00:22',0,NULL,NULL),
(640,27,'7','C',1,1,'2020-07-28 18:00:22',0,NULL,NULL),
(641,27,'8','A',1,1,'2020-07-28 18:00:22',0,NULL,NULL),
(642,27,'8','B',1,1,'2020-07-28 18:00:22',0,NULL,NULL),
(643,27,'8','C',1,1,'2020-07-28 18:00:22',0,NULL,NULL),
(644,27,'9','A',1,1,'2020-07-28 18:00:22',0,NULL,NULL),
(645,27,'9','B',1,1,'2020-07-28 18:00:22',0,NULL,NULL),
(646,27,'9','C',1,1,'2020-07-28 18:00:22',0,NULL,NULL),
(647,28,'pb','1',5,1,'2020-07-28 18:05:25',0,NULL,NULL),
(648,28,'1','A',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(649,28,'1','B',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(650,28,'1','C',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(651,28,'1','D',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(652,28,'2','A',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(653,28,'2','B',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(654,28,'2','C',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(655,28,'2','D',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(656,28,'3','A',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(657,28,'3','B',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(658,28,'3','C',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(659,28,'3','D',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(660,28,'4','A',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(661,28,'4','B',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(662,28,'4','C',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(663,28,'4','D',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(664,28,'5','A',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(665,28,'5','B',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(666,28,'5','C',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(667,28,'5','D',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(668,28,'6','A',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(669,28,'6','B',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(670,28,'6','C',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(671,28,'6','D',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(672,28,'7','A',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(673,28,'7','B',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(674,28,'7','C',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(675,28,'7','D',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(676,28,'8','A',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(677,28,'8','B',1,1,'2020-07-28 18:05:25',0,NULL,NULL),
(678,28,'8','C',1,1,'2020-07-28 18:05:26',0,NULL,NULL),
(679,28,'8','D',1,1,'2020-07-28 18:05:26',0,NULL,NULL),
(680,28,'9','A',1,1,'2020-07-28 18:05:26',0,NULL,NULL),
(681,28,'9','B',1,1,'2020-07-28 18:05:26',0,NULL,NULL),
(682,28,'9','C',1,1,'2020-07-28 18:05:26',0,NULL,NULL),
(683,28,'9','D',1,1,'2020-07-28 18:05:26',0,NULL,NULL),
(684,28,'10','A',1,1,'2020-07-28 18:05:26',0,NULL,NULL),
(685,28,'10','B',1,1,'2020-07-28 18:05:26',0,NULL,NULL),
(686,28,'10','C',1,1,'2020-07-28 18:05:26',0,NULL,NULL),
(687,28,'10','D',1,1,'2020-07-28 18:05:26',0,NULL,NULL),
(688,29,'pb','1',1,1,'2020-07-28 18:23:17',0,NULL,NULL),
(689,29,'1','A',1,1,'2020-07-28 18:23:17',0,NULL,NULL),
(690,29,'1','B',1,1,'2020-07-28 18:23:17',0,NULL,NULL),
(691,29,'2','A',1,1,'2020-07-28 18:23:17',0,NULL,NULL),
(692,29,'2','B',1,1,'2020-07-28 18:23:17',0,NULL,NULL),
(693,29,'3','A',1,1,'2020-07-28 18:23:17',0,NULL,NULL),
(694,29,'3','B',1,1,'2020-07-28 18:23:17',0,NULL,NULL),
(695,29,'4','A',1,1,'2020-07-28 18:23:17',0,NULL,NULL),
(696,29,'4','B',1,1,'2020-07-28 18:23:17',0,NULL,NULL),
(697,29,'5','A',1,1,'2020-07-28 18:23:17',0,NULL,NULL),
(698,29,'5','B',1,1,'2020-07-28 18:23:17',0,NULL,NULL),
(699,29,'6','A',1,1,'2020-07-28 18:23:17',0,NULL,NULL),
(700,29,'6','B',1,1,'2020-07-28 18:23:17',0,NULL,NULL),
(701,29,'7','A',1,1,'2020-07-28 18:23:17',0,NULL,NULL),
(702,29,'7','B',1,1,'2020-07-28 18:23:17',0,NULL,NULL),
(703,29,'8','A',1,1,'2020-07-28 18:23:17',0,NULL,NULL),
(704,29,'8','B',1,1,'2020-07-28 18:23:17',0,NULL,NULL),
(705,29,'9','A',1,1,'2020-07-28 18:23:17',0,NULL,NULL),
(706,29,'9','B',1,1,'2020-07-28 18:23:17',0,NULL,NULL),
(707,29,'10','A',1,1,'2020-07-28 18:23:17',0,NULL,NULL),
(708,29,'10','B',1,1,'2020-07-28 18:23:17',0,NULL,NULL),
(709,29,'11','A',1,1,'2020-07-28 18:23:17',0,NULL,NULL),
(710,29,'11','B',1,1,'2020-07-28 18:23:17',0,NULL,NULL),
(711,29,'12','A',1,1,'2020-07-28 18:23:17',0,NULL,NULL),
(712,30,'3','3',1,1,'2020-07-30 20:49:44',NULL,NULL,NULL),
(713,32,'pb','00',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(714,32,'1','A',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(715,32,'1','B',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(716,32,'1','C',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(717,32,'1','D',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(718,32,'1','E',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(719,32,'1','F',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(720,32,'1','G',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(721,32,'2','A',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(722,32,'2','B',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(723,32,'2','C',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(724,32,'2','D',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(725,32,'2','E',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(726,32,'2','F',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(727,32,'2','G',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(728,32,'3','A',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(729,32,'3','B',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(730,32,'3','C',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(731,32,'4','A',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(732,32,'4','B',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(733,32,'4','C',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(734,32,'4','D',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(735,32,'4','E',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(736,32,'5','A',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(737,32,'5','B',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(738,32,'5','C',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(739,32,'5','D',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(740,32,'5','E',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(741,32,'6','A',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(742,32,'6','B',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(743,32,'6','C',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(744,32,'6','D',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(745,32,'7','A',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(746,32,'7','B',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(747,32,'7','C',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(748,32,'7','D',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(749,32,'7','E',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(750,32,'8','A',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(751,32,'8','B',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(752,32,'8','C',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(753,32,'8','D',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(754,32,'8','E',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(755,32,'9','A',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(756,32,'9','B',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(757,32,'9','C',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(758,32,'10','A',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(759,32,'10','B',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(760,32,'10','C',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(761,32,'10','D',1,1,'2020-07-31 13:44:31',0,NULL,NULL),
(762,33,'pb','a',1,1,'2020-07-31 13:57:08',0,NULL,NULL),
(763,33,'pb','B',1,1,'2020-07-31 13:57:08',0,NULL,NULL),
(764,33,'pb','C',1,1,'2020-07-31 13:57:08',0,NULL,NULL),
(765,33,'pb','D',1,1,'2020-07-31 13:57:08',0,NULL,NULL),
(766,33,'pb','E',1,1,'2020-07-31 13:57:08',0,NULL,NULL),
(767,33,'pb','F',1,1,'2020-07-31 13:57:08',0,NULL,NULL),
(768,33,'1','A',1,1,'2020-07-31 13:57:08',0,NULL,NULL),
(769,33,'1','B',1,1,'2020-07-31 13:57:08',0,NULL,NULL),
(770,33,'1','C',1,1,'2020-07-31 13:57:08',0,NULL,NULL),
(771,33,'1','D',1,1,'2020-07-31 13:57:08',0,NULL,NULL),
(772,33,'1','E',1,1,'2020-07-31 13:57:08',0,NULL,NULL),
(773,33,'1','F',1,1,'2020-07-31 13:57:08',0,NULL,NULL),
(774,33,'2','A',1,1,'2020-07-31 13:57:08',0,NULL,NULL),
(775,33,'2','B',1,1,'2020-07-31 13:57:08',0,NULL,NULL),
(776,33,'2','C',1,1,'2020-07-31 13:57:08',0,NULL,NULL),
(777,33,'2','D',1,1,'2020-07-31 13:57:08',0,NULL,NULL),
(778,33,'2','E',1,1,'2020-07-31 13:57:08',0,NULL,NULL),
(779,33,'2','F',1,1,'2020-07-31 13:57:08',0,NULL,NULL),
(780,34,'pb','A',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(781,34,'1','A',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(782,34,'1','B',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(783,34,'1','C',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(784,34,'1','D',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(785,34,'2','A',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(786,34,'2','B',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(787,34,'2','C',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(788,34,'2','D',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(789,34,'3','A',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(790,34,'3','B',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(791,34,'3','C',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(792,34,'3','D',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(793,34,'4','A',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(794,34,'4','B',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(795,34,'4','C',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(796,34,'4','D',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(797,34,'5','A',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(798,34,'5','B',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(799,34,'5','C',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(800,34,'5','D',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(801,34,'6','A',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(802,34,'6','B',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(803,34,'6','C',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(804,34,'6','D',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(805,34,'7','A',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(806,34,'7','B',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(807,34,'7','C',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(808,34,'7','D',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(809,34,'8','A',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(810,34,'8','B',1,1,'2020-07-31 14:04:55',0,NULL,NULL),
(811,34,'8','C',1,1,'2020-07-31 14:04:56',0,NULL,NULL),
(812,34,'8','D',1,1,'2020-07-31 14:04:56',0,NULL,NULL),
(813,34,'9','A',1,1,'2020-07-31 14:04:56',0,NULL,NULL),
(814,34,'9','B',1,1,'2020-07-31 14:04:56',0,NULL,NULL),
(815,34,'9','C',1,1,'2020-07-31 14:04:56',0,NULL,NULL),
(816,34,'9','D',1,1,'2020-07-31 14:04:56',0,NULL,NULL),
(817,34,'10','A',1,1,'2020-07-31 14:04:56',0,NULL,NULL),
(818,34,'10','B',1,1,'2020-07-31 14:04:56',0,NULL,NULL),
(819,34,'10','C',1,1,'2020-07-31 14:04:56',0,NULL,NULL),
(820,34,'11','A',1,1,'2020-07-31 14:04:56',0,NULL,NULL),
(821,34,'11','B',1,1,'2020-07-31 14:04:56',0,NULL,NULL),
(822,34,'11','C',1,1,'2020-07-31 14:04:56',0,NULL,NULL),
(823,34,'12','A',1,1,'2020-07-31 14:04:56',0,NULL,NULL),
(824,34,'12','B',1,1,'2020-07-31 14:04:56',0,NULL,NULL),
(825,34,'12','C',1,1,'2020-07-31 14:04:56',0,NULL,NULL),
(826,34,'13','A',1,1,'2020-07-31 14:04:56',0,NULL,NULL),
(827,34,'14','A',1,1,'2020-07-31 14:04:56',0,NULL,NULL),
(828,35,'1','A',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(829,35,'1','B',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(830,35,'1','C',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(831,35,'1','D',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(832,35,'2','A',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(833,35,'2','B',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(834,35,'2','C',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(835,35,'2','D',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(836,35,'3','A',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(837,35,'3','B',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(838,35,'3','C',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(839,35,'3','D',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(840,35,'4','A',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(841,35,'4','B',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(842,35,'4','C',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(843,35,'4','D',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(844,35,'4','E',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(845,35,'5','A',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(846,35,'5','B',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(847,35,'5','C',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(848,35,'5','D',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(849,35,'5','E',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(850,35,'6','A',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(851,35,'6','B',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(852,35,'6','C',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(853,35,'6','D',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(854,35,'6','E',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(855,35,'7','A',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(856,35,'7','B',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(857,35,'7','C',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(858,35,'7','D',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(859,35,'7','E',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(860,35,'8','A',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(861,35,'8','B',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(862,35,'8','C',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(863,35,'8','D',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(864,35,'8','E',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(865,35,'9','A',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(866,35,'9','B',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(867,35,'9','C',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(868,35,'9','D',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(869,35,'10','A',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(870,35,'10','B',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(871,35,'10','D',1,1,'2020-07-31 14:40:30',0,NULL,NULL),
(872,37,'pb','00',1,1,'2020-08-13 18:16:53',0,NULL,NULL),
(873,37,'1','A',1,1,'2020-08-13 18:16:53',0,NULL,NULL),
(874,37,'1','B',1,1,'2020-08-13 18:16:53',0,NULL,NULL),
(875,37,'2','A',1,1,'2020-08-13 18:16:53',0,NULL,NULL),
(876,37,'2','B',1,1,'2020-08-13 18:16:53',0,NULL,NULL),
(877,37,'3','A',1,1,'2020-08-13 18:16:53',0,NULL,NULL),
(878,37,'3','B',1,1,'2020-08-13 18:16:53',0,NULL,NULL),
(879,37,'4','A',1,1,'2020-08-13 18:16:53',0,NULL,NULL),
(880,37,'4','B',1,1,'2020-08-13 18:16:53',0,NULL,NULL),
(881,37,'5','A',1,1,'2020-08-13 18:16:53',0,NULL,NULL),
(882,37,'5','B',1,1,'2020-08-13 18:16:53',0,NULL,NULL),
(883,37,'6','A',1,1,'2020-08-13 18:16:53',0,NULL,NULL),
(884,37,'6','B',1,1,'2020-08-13 18:16:53',0,NULL,NULL),
(885,37,'7','A',1,1,'2020-08-13 18:16:53',0,NULL,NULL),
(886,37,'7','B',1,1,'2020-08-13 18:16:53',0,NULL,NULL),
(887,37,'8','A',1,1,'2020-08-13 18:16:53',0,NULL,NULL),
(888,37,'8','B',1,1,'2020-08-13 18:16:53',0,NULL,NULL),
(889,38,'1','A',1,1,'2020-08-13 18:59:09',0,NULL,NULL),
(890,38,'2','A',1,1,'2020-08-13 18:59:09',0,NULL,NULL),
(891,38,'3','A',1,1,'2020-08-13 18:59:09',0,NULL,NULL),
(892,38,'4','A',1,1,'2020-08-13 18:59:09',0,NULL,NULL),
(893,38,'5','A',1,1,'2020-08-13 18:59:09',0,NULL,NULL),
(894,38,'6','A',1,1,'2020-08-13 18:59:09',0,NULL,NULL),
(895,38,'7','A',1,1,'2020-08-13 18:59:09',0,NULL,NULL),
(896,39,'1','A',1,1,'2020-08-13 19:05:21',0,NULL,NULL),
(897,39,'2','A',1,1,'2020-08-13 19:05:21',0,NULL,NULL),
(898,39,'3','A',1,1,'2020-08-13 19:05:21',0,NULL,NULL),
(899,39,'4','A',1,1,'2020-08-13 19:05:21',0,NULL,NULL),
(900,39,'5','A',1,1,'2020-08-13 19:05:21',0,NULL,NULL),
(901,39,'6','A',1,1,'2020-08-13 19:05:21',0,NULL,NULL),
(902,39,'7','A',1,1,'2020-08-13 19:05:21',0,NULL,NULL),
(903,39,'8','A',1,1,'2020-08-13 19:05:21',0,NULL,NULL),
(904,39,'9','A',1,1,'2020-08-13 19:05:21',0,NULL,NULL),
(905,40,'1','A',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(906,40,'1','B',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(907,40,'1','C',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(908,40,'1','D',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(909,40,'2','A',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(910,40,'2','B',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(911,40,'2','C',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(912,40,'2','D',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(913,40,'3','A',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(914,40,'3','B',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(915,40,'3','C',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(916,40,'3','D',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(917,40,'4','A',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(918,40,'4','B',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(919,40,'4','C',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(920,40,'4','D',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(921,40,'5','A',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(922,40,'5','B',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(923,40,'5','C',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(924,40,'5','D',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(925,40,'6','A',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(926,40,'6','B',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(927,40,'6','C',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(928,40,'6','D',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(929,40,'7','A',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(930,40,'7','B',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(931,40,'7','C',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(932,40,'7','D',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(933,40,'8','A',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(934,40,'8','B',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(935,40,'8','C',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(936,40,'8','D',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(937,40,'9','A',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(938,40,'9','B',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(939,40,'9','C',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(940,40,'9','D',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(941,40,'10','A',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(942,40,'10','B',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(943,40,'10','C',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(944,40,'10','D',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(945,40,'11','A',1,1,'2020-08-13 19:18:58',0,NULL,NULL),
(946,41,'pb','00',1,1,'2020-08-13 19:23:58',0,NULL,NULL),
(947,41,'1','1',1,1,'2020-08-13 19:23:58',0,NULL,NULL),
(948,41,'2','2',1,1,'2020-08-13 19:23:58',0,NULL,NULL),
(949,41,'3','3',1,1,'2020-08-13 19:23:58',0,NULL,NULL),
(950,41,'4','4',1,1,'2020-08-13 19:23:58',0,NULL,NULL),
(951,41,'5','5',1,1,'2020-08-13 19:23:58',0,NULL,NULL),
(952,41,'6','6',1,1,'2020-08-13 19:23:58',0,NULL,NULL),
(953,41,'7','7',1,1,'2020-08-13 19:23:58',0,NULL,NULL),
(954,41,'8','8',1,1,'2020-08-13 19:23:58',0,NULL,NULL),
(955,42,'pb','00',1,1,'2020-08-13 19:28:31',0,NULL,NULL),
(956,42,'1','A',1,1,'2020-08-13 19:28:31',0,NULL,NULL),
(957,42,'1','B',1,1,'2020-08-13 19:28:31',0,NULL,NULL),
(958,42,'2','A',1,1,'2020-08-13 19:28:32',0,NULL,NULL),
(959,42,'2','B',1,1,'2020-08-13 19:28:32',0,NULL,NULL),
(960,42,'3','A',1,1,'2020-08-13 19:28:32',0,NULL,NULL),
(961,42,'3','B',1,1,'2020-08-13 19:28:32',0,NULL,NULL),
(962,42,'4','A',1,1,'2020-08-13 19:28:32',0,NULL,NULL),
(963,42,'4','B',1,1,'2020-08-13 19:28:32',0,NULL,NULL),
(964,42,'5','A',1,1,'2020-08-13 19:28:32',0,NULL,NULL),
(965,42,'5','B',1,1,'2020-08-13 19:28:32',0,NULL,NULL),
(966,42,'6','A',1,1,'2020-08-13 19:28:32',0,NULL,NULL),
(967,42,'6','B',1,1,'2020-08-13 19:28:32',0,NULL,NULL),
(968,42,'7','A',1,1,'2020-08-13 19:28:32',0,NULL,NULL),
(969,42,'7','B',1,1,'2020-08-13 19:28:32',0,NULL,NULL),
(970,17,'pb','A',1,1,'2020-09-07 20:23:14',0,NULL,NULL),
(971,17,'pb','a',6,-1,'2020-09-07 20:23:14',0,NULL,NULL),
(972,17,'pb','B',1,1,'2020-09-07 20:23:14',0,NULL,NULL),
(973,17,'pb','b',6,-1,'2020-09-07 20:23:14',0,NULL,NULL),
(974,17,'pb','c',6,1,'2020-09-07 20:23:14',0,NULL,NULL),
(975,17,'pb','d',6,1,'2020-09-07 20:23:14',0,NULL,NULL),
(976,17,'pb','C',1,-1,'2020-09-07 20:23:14',0,NULL,NULL),
(977,17,'pb','e',6,1,'2020-09-07 20:23:14',0,NULL,NULL),
(978,17,'pb','D',1,-1,'2020-09-07 20:23:14',0,NULL,NULL),
(979,17,'pb','f',6,1,'2020-09-07 20:23:14',0,NULL,NULL),
(980,17,'pb','E',1,-1,'2020-09-07 20:23:14',0,NULL,NULL),
(981,17,'pb','g',6,1,'2020-09-07 20:23:14',0,NULL,NULL),
(982,17,'pb','h',6,1,'2020-09-07 20:23:14',0,NULL,NULL),
(983,17,'pb','i',6,1,'2020-09-07 20:23:14',0,NULL,NULL);

/*Table structure for table `tb_client_files_list` */

DROP TABLE IF EXISTS `tb_client_files_list`;

CREATE TABLE `tb_client_files_list` (
  `idClientFiles` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientfK` int(11) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `urlFile` varchar(200) DEFAULT NULL,
  `typeFile` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idClientFiles`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_client_files_list` */

insert  into `tb_client_files_list`(`idClientFiles`,`idClientfK`,`title`,`urlFile`,`typeFile`) values 
(12,11,'11_ROG_wallpaper_keystone_3440x1440_20210422.jpg','/files/11_ROG_wallpaper_keystone_3440x1440_20210422.jpg','image/jpeg'),
(14,11,'11_change_ejecutar_cerrar_-_v_1_20210422.pdf','/files/11_change_ejecutar_cerrar_-_v_1_20210422.pdf','application/pdf'),
(15,11,'11_change_ejecutar_cerrar_-_v_1_0_20210422.pdf','/files/11_change_ejecutar_cerrar_-_v_1_0_20210422.pdf','application/pdf'),
(16,11,'11_813526_20210422.jpg','/files/11_813526_20210422.jpg','image/jpeg'),
(19,11,'11_prueba_titulo_20210424.pdf','/files/11_prueba_titulo_20210424.pdf','application/pdf');

/*Table structure for table `tb_client_functional_units` */

DROP TABLE IF EXISTS `tb_client_functional_units`;

CREATE TABLE `tb_client_functional_units` (
  `idFunctionalUnits` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `identifier` varchar(100) DEFAULT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `idProviceFk` int(11) DEFAULT NULL,
  `idTaxTypeFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idFunctionalUnits`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_client_functional_units` */

/*Table structure for table `tb_client_mails` */

DROP TABLE IF EXISTS `tb_client_mails`;

CREATE TABLE `tb_client_mails` (
  `idClientMail` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idClientFk` int(11) DEFAULT NULL,
  `mailTag` varchar(255) DEFAULT NULL,
  `mailContact` varchar(255) DEFAULT NULL,
  `idTipoDeMailFk` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`idClientMail`)
) ENGINE=InnoDB AUTO_INCREMENT=621 DEFAULT CHARSET=latin1;

/*Data for the table `tb_client_mails` */

insert  into `tb_client_mails`(`idClientMail`,`idClientFk`,`mailTag`,`mailContact`,`idTipoDeMailFk`,`status`) values 
(1,75,'prueba','prueba@gail.conm',1,0),
(2,77,'prueba','prueba@gail.conm',1,0),
(3,80,'prueba','prueba@gail.conm',1,0),
(4,81,'prueba','prueba@gail.conm',1,0),
(5,82,'prueba','prueba@gail.conm',1,0),
(6,83,'prueba','prueba@gail.conm',1,0),
(7,84,'prueba','prueba@gail.conm',1,0),
(8,85,'prueba','prueba@gail.conm',1,0),
(9,86,'prueba','prueba@gail.conm',1,0),
(10,87,'prueba','prueba@gail.conm',1,0),
(11,88,'prueba','prueba@gail.conm',1,0),
(12,89,'prueba','prueba@gail.conm',1,0),
(13,90,'prueba','prueba@gail.conm',1,0),
(17,98,'prueba','prueba@gail.conm',1,0),
(18,99,'prueba','prueba@gail.conm',1,0),
(19,100,'prueba','prueba@gail.conm',1,0),
(26,91,'prueba','prueba@gail.conm',1,0),
(30,107,'prueba','prueba@gail.conm',1,0),
(35,108,NULL,'llaveros@pruebaadmin.com.ar',1,1),
(36,108,NULL,'servicios@pruebaadmin.com.ar',2,1),
(37,108,NULL,'pagos@pruebaadmin.com.ar',3,1),
(44,111,NULL,'llaves@pruebaadmin2.com.ar',1,1),
(45,111,NULL,'servicio@pruebaadmin2.com.ar',2,1),
(46,111,NULL,'pagos@pruebaadmin2.com.ar',3,1),
(50,114,NULL,'asdsadsad@fdfsdf',1,1),
(51,114,NULL,'asdsadasd@fdgfgfdg',2,1),
(52,114,NULL,'asdsadasd@dfsdfdsf',3,1),
(72,22,NULL,'servicios@inversionesjc.com.ar',2,1),
(73,22,NULL,'pagos@inversionesjc.com.ar',3,1),
(74,22,NULL,'admin@inversionesjc.com.ar',4,1),
(184,110,NULL,'llaves@pruebaadmin2.com.ar',1,1),
(185,110,NULL,'servicio@pruebaadmin2.com.ar',2,1),
(186,110,NULL,'pagos@pruebaadmin2.com.ar',3,1),
(246,112,NULL,'llaves@pruebaadmin2.com.ar',1,1),
(247,112,NULL,'servicio@pruebaadmin2.com.ar',2,1),
(248,112,NULL,'pagos@pruebaadmin2.com.ar',3,1),
(313,60,NULL,'services@ccocacola.com.ar',2,1),
(314,60,NULL,'pagos@ccocacola.com.ar',3,1),
(320,109,NULL,'llaveros@pruebaadmin.com.ar',1,1),
(321,109,NULL,'servicios@pruebaadmin.com.ar',2,1),
(322,109,NULL,'pagos@pruebaadmin.com.ar',3,1),
(323,109,NULL,'admin@pruebaadmin.com.ar',4,1),
(324,109,NULL,'admin@pruebaadmin.com.ar',5,1),
(328,15,NULL,'llaves@gmaill.com',1,1),
(329,15,NULL,'services@gmaill.com',2,1),
(330,15,NULL,'admin@gmaill.com',4,1),
(379,26,NULL,'SERVICE.CHOLAKIAN@cholakian.com',2,1),
(380,26,NULL,'KEYS.CHOLAKIAN@cholakian.com',1,1),
(381,26,NULL,'ADMIN.CHOLAKIAN@cholakian.com',4,1),
(418,35,NULL,'SERVICE.CHOLAKIAN@cholakian.com',2,1),
(419,35,NULL,'KEYS.CHOLAKIAN@cholakian.com',1,1),
(420,35,NULL,'ADMIN.CHOLAKIAN@cholakian.com',4,1),
(463,13,NULL,'dsdsadsad@asdasdas.com',1,1),
(506,10,NULL,'SERVICE.CHOLAKIAN@cholakian.com',2,1),
(507,10,NULL,'KEYS.CHOLAKIAN@cholakian.com',1,1),
(508,10,NULL,'ADMIN.CHOLAKIAN@cholakian.com',4,1),
(516,14,NULL,'llavestettamanti@gmail.com',1,1),
(517,14,NULL,'serviciostettamanti@gmail.com',2,1),
(518,14,NULL,'admintettamanti@gmail.com',4,1),
(519,25,NULL,'llavestettamanti@gmail.com',1,1),
(520,25,NULL,'serviciostettamanti@gmail.com',2,1),
(521,25,NULL,'admintettamanti@gmail.com',4,1),
(522,36,NULL,'aliprandi_palena@hotmail.com',1,1),
(523,36,NULL,'aliprandi_palena@hotmail.com',2,1),
(524,36,NULL,'aliprandi_palena@hotmail.com',3,1),
(525,44,NULL,'Prueba@Prueba.com',1,1),
(526,44,NULL,'Prueba@Prueba.com',2,1),
(527,44,NULL,'Prueba@Prueba.com',3,1),
(528,44,NULL,'Prueba@Prueba.com',4,1),
(549,45,NULL,'Prueba2@prueba2.com',1,1),
(550,45,NULL,'Prueba2@prueba2.com',2,1),
(551,45,NULL,'Prueba2@prueba2.com',3,1),
(552,45,NULL,'Prueba2@prueba2.com',4,1),
(604,1,NULL,'gabrielamistral@saraza.com',1,1),
(605,1,NULL,'gabrielamistral@saraza.com',2,1),
(606,1,NULL,'gabrielamistral@saraza.com',3,1),
(607,1,NULL,'gabrielamistral@saraza.com',4,1),
(608,11,NULL,'llavestettamanti@gmail.com',1,1),
(609,11,NULL,'serviciostettamanti@gmail.com',2,1),
(610,11,NULL,'admintettamanti@gmail.com',4,1),
(611,12,NULL,'llavestettamanti@gmail.com',1,1),
(612,12,NULL,'serviciostettamanti@gmail.com',2,1),
(613,12,NULL,'admintettamanti@gmail.com',4,1),
(614,46,NULL,'Prueba2@prueba2.com',1,1),
(615,46,NULL,'Prueba2@prueba2.com',2,1),
(616,46,NULL,'Prueba2@prueba2.com',3,1),
(617,46,NULL,'Prueba2@prueba2.com',4,1),
(618,49,NULL,'llaves@newprueba.com.ar',1,1),
(619,49,NULL,'services@newprueba.com.ar',2,1),
(620,49,NULL,'pagos@newprueba.com.ar',3,1);

/*Table structure for table `tb_client_phone_contact` */

DROP TABLE IF EXISTS `tb_client_phone_contact`;

CREATE TABLE `tb_client_phone_contact` (
  `idClientPhoneFk` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `phoneTag` varchar(80) DEFAULT NULL COMMENT 'Etiqueta del telefono de contacto Ejmp: Guardia/Urgencia',
  `phoneContact` varchar(80) DEFAULT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idClientPhoneFk`)
) ENGINE=InnoDB AUTO_INCREMENT=254 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_client_phone_contact` */

insert  into `tb_client_phone_contact`(`idClientPhoneFk`,`phoneTag`,`phoneContact`,`idClientFk`) values 
(1,'comercial','45019504',2),
(5,'comercial','45556276',28),
(6,'comercial','45556276',29),
(9,'comercial','4951-8506',32),
(10,'comercial','4951-8506',33),
(11,'comercial','4951-8506',34),
(15,'comercial','1550152504',37),
(17,'comercial','4901-6193',15),
(49,'comercial','45556276',26),
(77,'comercial','113453454543',35),
(78,'guardia','113453454543',35),
(79,'urgente','113453454543',35),
(115,'comercial','11231234324',18),
(116,'guardia','11231234324',18),
(117,'urgente','11231234324',18),
(126,'movil comercial','11342434234',13),
(156,'fijo comercial','343456456',10),
(157,'fijo guardia','343456456',10),
(158,'movil comercial','113243535435',10),
(165,'fijo comercial','34354354355',14),
(166,'fijo guardia','34354354355',14),
(167,'movil comercial','113433324234',14),
(168,'fijo comercial','34545456',25),
(169,'movil comercial','11324235324',25),
(173,'comercial','49581624',36),
(174,'comercial','49581473',36),
(175,'comercial','1566619566',36),
(176,'comercial','4951-8506',31),
(177,'comercial','4952-0757',31),
(178,'fijo comercial','1122356788',44),
(179,'fijo guardia','1122356788',44),
(180,'movil comercial','1122356788',44),
(181,'movil guardia','1122356788',44),
(241,'fijo comercial','34456234',1),
(242,'fijo guardia','34456234',1),
(243,'movil guardia','112342345453',1),
(244,'comercial','45028872',11),
(245,'comercial','45028872',12),
(246,'fijo comercial','11224354563453',46),
(247,'fijo guardia','11224354563453',46),
(248,'movil comercial','11224354563453',46),
(249,'movil guardia','11224354563453',46),
(250,'urgente','11224354563453',46),
(251,'fijo comercial','11123213232',49),
(252,'fijo guardia','11123213232',49),
(253,'movil comercial','11123213232',49);

/*Table structure for table `tb_client_schedule_atention` */

DROP TABLE IF EXISTS `tb_client_schedule_atention`;

CREATE TABLE `tb_client_schedule_atention` (
  `idScheduleAtention` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClienteFk` int(11) DEFAULT NULL,
  `day` varchar(11) DEFAULT '' COMMENT 'Dia de la semana',
  `fronAm` time DEFAULT NULL,
  `toAm` time DEFAULT NULL,
  `fronPm` time DEFAULT NULL,
  `toPm` time DEFAULT NULL,
  PRIMARY KEY (`idScheduleAtention`)
) ENGINE=InnoDB AUTO_INCREMENT=617 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_client_schedule_atention` */

insert  into `tb_client_schedule_atention`(`idScheduleAtention`,`idClienteFk`,`day`,`fronAm`,`toAm`,`fronPm`,`toPm`) values 
(1,2,'Martes','08:00:00','12:00:00','17:00:00','20:00:00'),
(2,2,'Miercoles','00:00:00','00:00:00','00:00:00','00:00:00'),
(3,2,'Jueves','00:00:00','00:00:00','00:00:00','00:00:00'),
(4,2,'Viernes','00:00:00','00:00:00','00:00:00','00:00:00'),
(5,2,'Sabado','00:00:00','00:00:00','00:00:00','00:00:00'),
(6,3,'Martes','00:00:00','00:00:00','00:00:00','00:00:00'),
(7,3,'Miercoles','00:00:00','00:00:00','00:00:00','00:00:00'),
(8,3,'Jueves','00:00:00','00:00:00','00:00:00','00:00:00'),
(9,3,'Viernes','00:00:00','00:00:00','00:00:00','00:00:00'),
(10,4,'Martes','00:00:00','00:00:00','00:00:00','00:00:00'),
(11,4,'Miercoles','00:00:00','00:00:00','00:00:00','00:00:00'),
(12,4,'Jueves','00:00:00','00:00:00','00:00:00','00:00:00'),
(13,4,'Viernes','00:00:00','00:00:00','00:00:00','00:00:00'),
(14,5,'Martes','00:00:00','00:00:00','00:00:00','00:00:00'),
(15,5,'Miercoles','00:00:00','00:00:00','00:00:00','00:00:00'),
(16,5,'Jueves','00:00:00','00:00:00','00:00:00','00:00:00'),
(17,5,'Viernes','00:00:00','00:00:00','00:00:00','00:00:00'),
(18,6,'Martes','00:00:00','00:00:00','00:00:00','00:00:00'),
(19,6,'Miercoles','00:00:00','00:00:00','00:00:00','00:00:00'),
(20,6,'Jueves','00:00:00','00:00:00','00:00:00','00:00:00'),
(21,6,'Viernes','00:00:00','00:00:00','00:00:00','00:00:00'),
(22,6,'Sabado','00:00:00','00:00:00','00:00:00','00:00:00'),
(23,7,'Martes','00:00:00','00:00:00','00:00:00','00:00:00'),
(24,7,'Miercoles','00:00:00','00:00:00','00:00:00','00:00:00'),
(25,7,'Jueves','00:00:00','00:00:00','00:00:00','00:00:00'),
(26,7,'Viernes','00:00:00','00:00:00','00:00:00','00:00:00'),
(27,8,'Martes','00:00:00','00:00:00','00:00:00','00:00:00'),
(28,8,'Miercoles','00:00:00','00:00:00','00:00:00','00:00:00'),
(29,8,'Jueves','00:00:00','00:00:00','00:00:00','00:00:00'),
(30,8,'Viernes','00:00:00','00:00:00','00:00:00','00:00:00'),
(31,9,'Martes','00:00:00','00:00:00','00:00:00','00:00:00'),
(32,9,'Miercoles','00:00:00','00:00:00','00:00:00','00:00:00'),
(33,9,'Jueves','00:00:00','00:00:00','00:00:00','00:00:00'),
(34,9,'Viernes','00:00:00','00:00:00','00:00:00','00:00:00'),
(63,19,'Martes','00:00:00','00:00:00','00:00:00','00:00:00'),
(64,19,'Miercoles','00:00:00','00:00:00','00:00:00','00:00:00'),
(65,19,'Jueves','00:00:00','00:00:00','00:00:00','00:00:00'),
(66,19,'Viernes','00:00:00','00:00:00','00:00:00','00:00:00'),
(71,21,'Martes','00:00:00','00:00:00','00:00:00','00:00:00'),
(72,21,'Miercoles','00:00:00','00:00:00','00:00:00','00:00:00'),
(73,21,'Jueves','00:00:00','00:00:00','00:00:00','00:00:00'),
(74,21,'Viernes','00:00:00','00:00:00','00:00:00','00:00:00'),
(75,22,'Martes','00:00:00','00:00:00','00:00:00','00:00:00'),
(76,22,'Miercoles','00:00:00','00:00:00','00:00:00','00:00:00'),
(77,22,'Jueves','00:00:00','00:00:00','00:00:00','00:00:00'),
(78,22,'Viernes','00:00:00','00:00:00','00:00:00','00:00:00'),
(79,23,'Martes','00:00:00','00:00:00','00:00:00','00:00:00'),
(80,23,'Miercoles','00:00:00','00:00:00','00:00:00','00:00:00'),
(81,23,'Jueves','00:00:00','00:00:00','00:00:00','00:00:00'),
(82,23,'Viernes','00:00:00','00:00:00','00:00:00','00:00:00'),
(83,24,'Martes','00:00:00','00:00:00','00:00:00','00:00:00'),
(84,24,'Miercoles','00:00:00','00:00:00','00:00:00','00:00:00'),
(85,24,'Jueves','00:00:00','00:00:00','00:00:00','00:00:00'),
(86,24,'Viernes','00:00:00','00:00:00','00:00:00','00:00:00'),
(91,27,'Martes','00:00:00','00:00:00','17:00:00','20:00:00'),
(92,27,'Miercoles','00:00:00','00:00:00','17:00:00','20:00:00'),
(93,27,'Jueves','00:00:00','00:00:00','17:00:00','20:00:00'),
(94,27,'Viernes','00:00:00','00:00:00','17:00:00','20:00:00'),
(95,27,'Lunes','00:00:00','00:00:00','17:00:00','20:00:00'),
(96,28,'Martes','00:00:00','00:00:00','17:00:00','20:00:00'),
(97,28,'Miercoles','00:00:00','00:00:00','17:00:00','20:00:00'),
(98,28,'Jueves','00:00:00','00:00:00','17:00:00','20:00:00'),
(99,28,'Viernes','00:00:00','00:00:00','17:00:00','20:00:00'),
(100,28,'Lunes','00:00:00','00:00:00','17:00:00','20:00:00'),
(101,29,'Martes','08:00:00','00:00:00','17:00:00','20:00:00'),
(102,29,'Miercoles','08:00:00','12:00:00','18:00:00','20:00:00'),
(103,29,'Jueves','08:00:00','00:00:00','17:00:00','20:00:00'),
(104,29,'Viernes','08:00:00','12:00:00','17:00:00','20:00:00'),
(105,29,'Lunes','08:00:00','00:00:00','17:00:00','20:00:00'),
(111,32,'Lunes','08:00:00','12:00:00','17:00:00','20:00:00'),
(112,32,'Martes','08:00:00','12:00:00','17:00:00','20:00:00'),
(113,32,'Miercoles','08:00:00','12:00:00','17:00:00','20:00:00'),
(114,32,'Jueves','08:00:00','12:00:00','17:00:00','20:00:00'),
(115,32,'Viernes','08:00:00','12:00:00','17:00:00','20:00:00'),
(116,33,'Lunes','08:00:00','12:00:00','17:00:00','20:00:00'),
(117,33,'Martes','08:00:00','12:00:00','17:00:00','20:00:00'),
(118,33,'Miercoles','08:00:00','12:00:00','17:00:00','20:00:00'),
(119,33,'Jueves','08:00:00','12:00:00','17:00:00','20:00:00'),
(120,33,'Viernes','08:00:00','12:00:00','17:00:00','20:00:00'),
(121,34,'Lunes','08:00:00','12:00:00','17:00:00','20:00:00'),
(122,34,'Martes','08:00:00','12:00:00','17:00:00','20:00:00'),
(123,34,'Miercoles','08:00:00','12:00:00','17:00:00','20:00:00'),
(124,34,'Jueves','08:00:00','12:00:00','17:00:00','20:00:00'),
(125,34,'Viernes','08:00:00','12:00:00','17:00:00','20:00:00'),
(135,37,'Lunes','08:00:00','12:00:00','17:00:00','20:00:00'),
(136,37,'Martes','08:00:00','12:00:00','17:00:00','20:00:00'),
(137,37,'Miercoles','08:00:00','12:00:00','17:00:00','20:00:00'),
(138,37,'Jueves','08:00:00','12:00:00','17:00:00','20:00:00'),
(139,37,'Viernes','08:00:00','12:00:00','17:00:00','20:00:00'),
(140,38,'Lunes','08:00:00','12:00:00','17:00:00','20:00:00'),
(141,38,'Martes','08:00:00','12:00:00','17:00:00','20:00:00'),
(142,38,'Miercoles','08:00:00','12:00:00','17:00:00','20:00:00'),
(143,38,'Jueves','08:00:00','12:00:00','17:00:00','20:00:00'),
(144,38,'Viernes','08:00:00','12:00:00','17:00:00','20:00:00'),
(145,39,'Lunes','08:00:00','12:00:00','17:00:00','20:00:00'),
(146,39,'Martes','08:00:00','12:00:00','17:00:00','20:00:00'),
(147,39,'Miercoles','08:00:00','12:00:00','17:00:00','20:00:00'),
(148,39,'Jueves','08:00:00','12:00:00','17:00:00','20:00:00'),
(149,39,'Viernes','08:00:00','12:00:00','17:00:00','20:00:00'),
(150,40,'Lunes','07:00:00','12:00:00','17:00:00','20:00:00'),
(151,40,'Martes','07:00:00','12:00:00','17:00:00','20:00:00'),
(152,40,'Miercoles','07:00:00','12:00:00','17:00:00','20:00:00'),
(153,40,'Jueves','07:00:00','12:00:00','17:00:00','20:00:00'),
(154,40,'Viernes','07:00:00','12:00:00','17:00:00','20:00:00'),
(155,41,'Lunes','07:00:00','12:00:00','17:00:00','20:00:00'),
(156,41,'Martes','07:00:00','12:00:00','17:00:00','20:00:00'),
(157,41,'Miercoles','07:00:00','12:00:00','17:00:00','20:00:00'),
(158,41,'Jueves','07:00:00','12:00:00','17:00:00','20:00:00'),
(159,41,'Viernes','07:00:00','12:00:00','17:00:00','20:00:00'),
(160,42,'Lunes','07:00:00','12:00:00','17:00:00','20:00:00'),
(161,42,'Martes','07:00:00','12:00:00','17:00:00','20:00:00'),
(162,42,'Miercoles','07:00:00','12:00:00','17:00:00','20:00:00'),
(163,42,'Jueves','07:00:00','12:00:00','17:00:00','20:00:00'),
(164,42,'Viernes','07:00:00','12:00:00','17:00:00','20:00:00'),
(175,16,'Lunes','08:00:00','12:00:00','17:00:00','20:00:00'),
(176,16,'Martes','08:00:00','12:00:00','17:00:00','20:00:00'),
(177,16,'Miercoles','08:00:00','12:00:00','17:00:00','20:00:00'),
(178,16,'Jueves','08:00:00','12:00:00','17:00:00','20:00:00'),
(179,16,'Viernes','08:00:00','12:00:00','17:00:00','20:00:00'),
(190,17,'Lunes','08:00:00','12:00:00','17:00:00','20:00:00'),
(191,17,'Martes','08:00:00','12:00:00','17:00:00','20:00:00'),
(192,17,'Miercoles','08:00:00','12:00:00','17:00:00','20:00:00'),
(193,17,'Jueves','08:00:00','12:00:00','17:00:00','20:00:00'),
(194,17,'Viernes','08:00:00','12:00:00','17:00:00','20:00:00'),
(195,15,'Lunes','08:00:00','12:00:00','17:00:00','20:00:00'),
(196,15,'Martes','08:00:00','12:00:00','17:00:00','20:00:00'),
(197,15,'Miercoles','08:00:00','12:00:00','17:00:00','20:00:00'),
(198,15,'Jueves','08:00:00','12:00:00','17:00:00','20:00:00'),
(199,15,'Viernes','08:00:00','12:00:00','17:00:00','20:00:00'),
(230,20,'Martes','00:00:00','00:00:00','00:00:00','00:00:00'),
(231,20,'Miercoles','00:00:00','00:00:00','00:00:00','00:00:00'),
(232,20,'Jueves','00:00:00','00:00:00','00:00:00','00:00:00'),
(233,20,'Viernes','00:00:00','00:00:00','00:00:00','00:00:00'),
(284,26,'Lunes','08:00:00','12:00:00','17:00:00','20:00:00'),
(285,26,'Martes','08:00:00','12:00:00','17:00:00','20:00:00'),
(286,26,'Miercoles','08:00:00','12:00:00','17:00:00','20:00:00'),
(287,26,'Jueves','08:00:00','12:00:00','17:00:00','20:00:00'),
(288,26,'Viernes','08:00:00','12:00:00','17:00:00','20:00:00'),
(324,35,'Lunes','08:00:00','12:00:00','17:00:00','20:00:00'),
(325,35,'Martes','08:00:00','12:00:00','17:00:00','20:00:00'),
(326,35,'Miercoles','08:00:00','12:00:00','17:00:00','20:00:00'),
(327,35,'Jueves','08:00:00','12:00:00','17:00:00','20:00:00'),
(328,35,'Viernes','08:00:00','12:00:00','17:00:00','20:00:00'),
(379,18,'Lunes','08:00:00','12:00:00','17:00:00','20:00:00'),
(380,18,'Martes','08:00:00','12:00:00','17:00:00','20:00:00'),
(381,18,'Miercoles','08:00:00','12:00:00','17:00:00','20:00:00'),
(382,18,'Jueves','08:00:00','12:00:00','17:00:00','20:00:00'),
(383,18,'Viernes','08:00:00','12:00:00','17:00:00','20:00:00'),
(394,13,'Lunes','08:00:00','12:00:00','17:00:00','20:00:00'),
(395,13,'Martes','08:00:00','12:00:00','17:00:00','20:00:00'),
(396,13,'Miercoles','08:00:00','12:00:00','17:00:00','20:00:00'),
(397,13,'Jueves','08:00:00','12:00:00','17:00:00','20:00:00'),
(398,13,'Viernes','08:00:00','12:00:00','17:00:00','20:00:00'),
(454,10,'Lunes','08:00:00','12:00:00','17:00:00','20:00:00'),
(455,10,'Martes','08:00:00','12:00:00','17:00:00','20:00:00'),
(456,10,'Miercoles','08:00:00','12:00:00','17:00:00','20:00:00'),
(457,10,'Jueves','08:00:00','12:00:00','17:00:00','20:00:00'),
(458,10,'Viernes','08:00:00','12:00:00','17:00:00','20:00:00'),
(469,14,'Lunes','08:00:00','12:00:00','17:00:00','20:00:00'),
(470,14,'Martes','08:00:00','12:00:00','17:00:00','20:00:00'),
(471,14,'Miercoles','08:00:00','12:00:00','17:00:00','20:00:00'),
(472,14,'Jueves','08:00:00','12:00:00','17:00:00','20:00:00'),
(473,14,'Viernes','08:00:00','12:00:00','17:00:00','20:00:00'),
(474,25,'Lunes','08:00:00','12:00:00','17:00:00','20:00:00'),
(475,25,'Martes','08:00:00','12:00:00','17:00:00','20:00:00'),
(476,25,'Miercoles','08:00:00','12:00:00','17:00:00','20:00:00'),
(477,25,'Jueves','08:00:00','12:00:00','17:00:00','20:00:00'),
(478,25,'Viernes','08:00:00','12:00:00','17:00:00','20:00:00'),
(483,36,'Lunes','10:00:00','00:00:00','00:00:00','16:00:00'),
(484,36,'Martes','10:00:00','00:00:00','00:00:00','16:00:00'),
(485,36,'Miercoles','10:00:00','00:00:00','00:00:00','16:00:00'),
(486,36,'Jueves','10:00:00','00:00:00','00:00:00','16:00:00'),
(487,31,'Lunes','10:00:00','13:00:00','14:00:00','17:00:00'),
(488,31,'Martes','10:00:00','13:00:00','14:00:00','17:00:00'),
(489,31,'Miercoles','10:00:00','13:00:00','14:00:00','17:00:00'),
(490,31,'Jueves','10:00:00','13:00:00','14:00:00','17:00:00'),
(491,31,'Viernes','10:00:00','13:00:00','14:00:00','17:00:00'),
(492,44,'Lunes','08:00:00','12:00:00','17:00:00','20:00:00'),
(493,44,'Martes','08:00:00','12:00:00','17:00:00','20:00:00'),
(494,44,'Miercoles','08:00:00','12:00:00','17:00:00','20:00:00'),
(495,44,'Jueves','08:00:00','12:00:00','17:00:00','20:00:00'),
(496,44,'Viernes','08:00:00','12:00:00','17:00:00','20:00:00'),
(522,45,'Lunes','08:00:00','12:00:00','17:00:00','20:00:00'),
(523,45,'Martes','08:00:00','12:00:00','17:00:00','20:00:00'),
(524,45,'Miercoles','08:00:00','12:00:00','17:00:00','20:00:00'),
(525,45,'Jueves','08:00:00','12:00:00','17:00:00','20:00:00'),
(526,45,'Viernes','08:00:00','12:00:00','17:00:00','20:00:00'),
(592,1,'Lunes','08:00:00','12:00:00','17:00:00','20:00:00'),
(593,1,'Martes','08:00:00','12:00:00','17:00:00','20:00:00'),
(594,1,'Miercoles','08:00:00','12:00:00','17:00:00','20:00:00'),
(595,1,'Jueves','08:00:00','12:00:00','17:00:00','20:00:00'),
(596,1,'Viernes','08:00:00','12:00:00','17:00:00','20:00:00'),
(597,11,'Lunes','08:00:00','12:00:00','17:00:00','20:00:00'),
(598,11,'Martes','08:00:00','12:00:00','17:00:00','20:00:00'),
(599,11,'Miercoles','08:00:00','12:00:00','17:00:00','20:00:00'),
(600,11,'Jueves','08:00:00','12:00:00','17:00:00','20:00:00'),
(601,11,'Viernes','08:00:00','12:00:00','17:00:00','20:00:00'),
(602,12,'Lunes','08:00:00','12:00:00','17:00:00','20:00:00'),
(603,12,'Martes','08:00:00','12:00:00','17:00:00','20:00:00'),
(604,12,'Miercoles','08:00:00','12:00:00','17:00:00','20:00:00'),
(605,12,'Jueves','08:00:00','12:00:00','17:00:00','20:00:00'),
(606,12,'Viernes','08:00:00','12:00:00','17:00:00','20:00:00'),
(607,46,'Lunes','08:00:00','12:00:00','17:00:00','20:00:00'),
(608,46,'Martes','08:00:00','12:00:00','17:00:00','20:00:00'),
(609,46,'Miercoles','08:00:00','12:00:00','17:00:00','20:00:00'),
(610,46,'Jueves','08:00:00','12:00:00','17:00:00','20:00:00'),
(611,46,'Viernes','08:00:00','12:00:00','17:00:00','20:00:00'),
(612,49,'Lunes','08:00:00','12:00:00','17:00:00','20:00:00'),
(613,49,'Martes','08:00:00','12:00:00','17:00:00','20:00:00'),
(614,49,'Miercoles','08:00:00','12:00:00','17:00:00','20:00:00'),
(615,49,'Jueves','08:00:00','12:00:00','17:00:00','20:00:00'),
(616,49,'Viernes','08:00:00','12:00:00','17:00:00','20:00:00');

/*Table structure for table `tb_client_services` */

DROP TABLE IF EXISTS `tb_client_services`;

CREATE TABLE `tb_client_services` (
  `idClientServices` int(11) NOT NULL AUTO_INCREMENT,
  `idClientFk` int(11) DEFAULT NULL,
  `idTipeServiceFk` int(11) DEFAULT NULL,
  `nameDataBase` varchar(255) DEFAULT NULL,
  `idServicesFk` int(11) DEFAULT NULL,
  `nameId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idClientServices`),
  KEY `idTipeServiceFk` (`idTipeServiceFk`),
  CONSTRAINT `tb_client_services_ibfk_1` FOREIGN KEY (`idTipeServiceFk`) REFERENCES `tb_type_services` (`idTypeServices`)
) ENGINE=InnoDB AUTO_INCREMENT=316 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_client_services` */

insert  into `tb_client_services`(`idClientServices`,`idClientFk`,`idTipeServiceFk`,`nameDataBase`,`idServicesFk`,`nameId`) values 
(277,35,1,'tb_client_services_access_control',102,'idClientServicesAccessControl'),
(278,35,2,'tb_client_services_internet',39,'idClientServicesInternet'),
(279,35,3,'tb_client_services_totem',28,'idClientServicesTotem'),
(280,35,4,'tb_client_services_camera',50,'idClientServicesCamera'),
(281,35,6,'tb_client_services_smart_panic',24,'idClientServicesSmartPanic'),
(286,35,5,'tb_client_services_alarms',55,'idClientServicesAlarms'),
(287,34,2,'tb_client_services_internet',40,'idClientServicesInternet'),
(288,34,1,'tb_client_services_access_control',103,'idClientServicesAccessControl'),
(290,34,1,'tb_client_services_access_control',105,'idClientServicesAccessControl'),
(291,35,1,'tb_client_services_access_control',106,'idClientServicesAccessControl'),
(292,35,2,'tb_client_services_internet',41,'idClientServicesInternet'),
(293,33,4,'tb_client_services_camera',51,'idClientServicesCamera'),
(296,33,3,'tb_client_services_totem',29,'idClientServicesTotem'),
(297,34,4,'tb_client_services_camera',52,'idClientServicesCamera'),
(300,33,4,'tb_client_services_camera',55,'idClientServicesCamera'),
(301,33,4,'tb_client_services_camera',56,'idClientServicesCamera'),
(303,33,5,'tb_client_services_alarms',57,'idClientServicesAlarms'),
(304,33,2,'tb_client_services_internet',42,'idClientServicesInternet'),
(305,34,5,'tb_client_services_alarms',58,'idClientServicesAlarms'),
(306,34,6,'tb_client_services_smart_panic',25,'idClientServicesSmartPanic'),
(307,34,6,'tb_client_services_smart_panic',26,'idClientServicesSmartPanic'),
(308,34,6,'tb_client_services_smart_panic',27,'idClientServicesSmartPanic'),
(309,34,6,'tb_client_services_smart_panic',28,'idClientServicesSmartPanic'),
(310,34,6,'tb_client_services_smart_panic',29,'idClientServicesSmartPanic'),
(311,46,6,'tb_client_services_smart_panic',30,'idClientServicesSmartPanic'),
(312,46,1,'tb_client_services_access_control',107,'idClientServicesAccessControl'),
(313,46,1,'tb_client_services_access_control',108,'idClientServicesAccessControl'),
(314,46,2,'tb_client_services_internet',43,'idClientServicesInternet'),
(315,46,3,'tb_client_services_totem',30,'idClientServicesTotem');

/*Table structure for table `tb_client_services_access_control` */

DROP TABLE IF EXISTS `tb_client_services_access_control`;

CREATE TABLE `tb_client_services_access_control` (
  `idClientServicesAccessControl` int(11) NOT NULL AUTO_INCREMENT,
  `idDoorFk` int(11) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  `dateUp` varchar(255) DEFAULT NULL,
  `dateDown` varchar(255) DEFAULT NULL,
  `idAccessControlFk` int(11) DEFAULT NULL,
  `idInputReaderFk` int(11) DEFAULT NULL,
  `locationGabinet` text DEFAULT NULL,
  `idFontFk` int(11) DEFAULT NULL,
  `aclaration` text DEFAULT NULL,
  `idTypeMaintenanceFk` int(11) DEFAULT NULL,
  `lock` varchar(200) DEFAULT NULL,
  `ouputReader` varchar(200) DEFAULT NULL,
  `ouputButom` varchar(200) DEFAULT NULL,
  `isOuputReader` tinyint(1) DEFAULT 0,
  `isOuputButom` tinyint(1) DEFAULT 0,
  `isBlocklingScrew` tinyint(1) DEFAULT 0,
  `idEmergencyButtonFk` int(11) DEFAULT NULL,
  `idShutdownKeyFk` int(11) DEFAULT NULL,
  `acaration2` text DEFAULT NULL,
  `portNumberRouter` varchar(200) DEFAULT NULL,
  `addressClient` varchar(100) DEFAULT NULL,
  `addressVpn` varchar(100) DEFAULT NULL,
  `user` varchar(100) DEFAULT NULL,
  `useVpn` varchar(100) DEFAULT NULL,
  `passVpn` varchar(100) DEFAULT NULL,
  `pass` varchar(100) DEFAULT NULL,
  `portHttp` varchar(10) DEFAULT '',
  `locationEmergencyButton` varchar(255) DEFAULT NULL,
  `locationOffKey` varchar(255) DEFAULT NULL,
  `idClientServicesFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idClientServicesAccessControl`),
  KEY `idDoorFk` (`idDoorFk`),
  KEY `idAccessControlFk` (`idAccessControlFk`),
  KEY `idInputReaderFk` (`idInputReaderFk`),
  KEY `idFontFk` (`idFontFk`),
  KEY `idTypeMaintenanceFk` (`idTypeMaintenanceFk`),
  KEY `idEmergencyButtonFk` (`idEmergencyButtonFk`),
  KEY `tb_client_services_access_control_ibfk_7` (`idShutdownKeyFk`),
  CONSTRAINT `tb_client_services_access_control_ibfk_1` FOREIGN KEY (`idDoorFk`) REFERENCES `tb_access_control_door` (`idAccessControlDoor`),
  CONSTRAINT `tb_client_services_access_control_ibfk_2` FOREIGN KEY (`idAccessControlFk`) REFERENCES `tb_products` (`idProduct`),
  CONSTRAINT `tb_client_services_access_control_ibfk_3` FOREIGN KEY (`idInputReaderFk`) REFERENCES `tb_products` (`idProduct`),
  CONSTRAINT `tb_client_services_access_control_ibfk_4` FOREIGN KEY (`idFontFk`) REFERENCES `tb_products` (`idProduct`),
  CONSTRAINT `tb_client_services_access_control_ibfk_6` FOREIGN KEY (`idEmergencyButtonFk`) REFERENCES `tb_products` (`idProduct`),
  CONSTRAINT `tb_client_services_access_control_ibfk_7` FOREIGN KEY (`idShutdownKeyFk`) REFERENCES `tb_products` (`idProduct`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_client_services_access_control` */

insert  into `tb_client_services_access_control`(`idClientServicesAccessControl`,`idDoorFk`,`idContracAssociated_SE`,`dateUp`,`dateDown`,`idAccessControlFk`,`idInputReaderFk`,`locationGabinet`,`idFontFk`,`aclaration`,`idTypeMaintenanceFk`,`lock`,`ouputReader`,`ouputButom`,`isOuputReader`,`isOuputButom`,`isBlocklingScrew`,`idEmergencyButtonFk`,`idShutdownKeyFk`,`acaration2`,`portNumberRouter`,`addressClient`,`addressVpn`,`user`,`useVpn`,`passVpn`,`pass`,`portHttp`,`locationEmergencyButton`,`locationOffKey`,`idClientServicesFk`) values 
(102,1,6,'14/03/2021',NULL,7,10,'Sotano',8,'Prueba Aclaracion',1,'6','10',NULL,1,NULL,1,11,13,'Probando Tornillo Bloqueador','4','chile2154.seguridadtass.com.ar','chile2154.seguridadtass.com.ar','admin','admin','root','root','8081','Prueba ubicación de pulsador de emergencia.','Prueba ubicación de Tecla de apagado',277),
(103,1,9,'09/06/2021',NULL,7,10,'Sotano',8,'Prueba',1,'6',NULL,'10',NULL,1,1,11,13,'Prueba','asdadasd','asdasd','dsadasd','asddasd','dasdasdasd','dasdasd','dasdasd','8080','Prueba','Prueba',288),
(105,7,9,'17/06/2021',NULL,15,10,'Terraza',8,'Probando',1,'31','10',NULL,1,NULL,1,11,13,'dsfsdfdsf','8','admin.localhost','admin.localhost','admin','admin','admin','admin','8080','ewrwrewrwerewr','werwererewr',290),
(106,2,6,'22/06/2021',NULL,15,10,'Sala',8,'Probando',1,'31','10',NULL,1,NULL,1,11,13,'Probando','8','automation.tass.com.ar','automation.tass.com.ar','admin','admin','admin','admin','8080','Probando','Probando',291),
(107,1,17,'08/09/2021',NULL,15,10,'Sotano',8,'Prueba',1,'31','10',NULL,1,NULL,1,11,13,'prueba','4','https://saraza.com.ar','https://saraza.com.ar','admin','admin','admin','admin','8080','prueba','prueba',312),
(108,2,17,'08/09/2021',NULL,7,10,'Servicio',8,'Prueba',1,'6',NULL,'21',NULL,1,1,11,13,'Prueba',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Prueba','Prueba',313);

/*Table structure for table `tb_client_services_alarms` */

DROP TABLE IF EXISTS `tb_client_services_alarms`;

CREATE TABLE `tb_client_services_alarms` (
  `idClientServicesAlarms` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `idContracAssociated_SE` varchar(255) DEFAULT NULL,
  `idTypeMaintenanceFk` int(11) DEFAULT NULL,
  `dateUp` varchar(255) DEFAULT NULL,
  `dateDown` varchar(255) DEFAULT NULL,
  `companyMonitor` varchar(200) DEFAULT NULL,
  `numberPay` varchar(50) DEFAULT NULL,
  `panelAlarm` varchar(200) DEFAULT NULL,
  `keyboardAlarm` varchar(200) DEFAULT NULL,
  `countZoneIntaled` int(11) DEFAULT NULL,
  `observation` text DEFAULT NULL,
  `idClientServicesFk` int(11) DEFAULT NULL,
  `idTypeConectionRemote` int(11) DEFAULT NULL,
  PRIMARY KEY (`idClientServicesAlarms`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_client_services_alarms` */

insert  into `tb_client_services_alarms`(`idClientServicesAlarms`,`name`,`idContracAssociated_SE`,`idTypeMaintenanceFk`,`dateUp`,`dateDown`,`companyMonitor`,`numberPay`,`panelAlarm`,`keyboardAlarm`,`countZoneIntaled`,`observation`,`idClientServicesFk`,`idTypeConectionRemote`) values 
(55,'Prueba de Alarma','6',1,'07/06/2021','','1','123456789','23','24',3,'Prueba de observacion general del servicio',286,1),
(57,'Prueba Alarmas','14',1,'19/08/2021','','1','124234322352','23','24',4,'pruebas pruebas',303,1),
(58,'Prueba Alarma','9',1,'20/08/2021','','1','123124142','23','24',4,NULL,305,3);

/*Table structure for table `tb_client_services_alarms_aditional` */

DROP TABLE IF EXISTS `tb_client_services_alarms_aditional`;

CREATE TABLE `tb_client_services_alarms_aditional` (
  `idClientServicesAlarmsAditionals` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idTypeClientAlarmFk` int(11) DEFAULT NULL,
  `idUserChargeFk` int(11) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `lateralStreets` varchar(200) DEFAULT NULL,
  `rearStreets` varchar(200) DEFAULT NULL,
  `idAlarmServicesAditionalsFk` int(11) DEFAULT NULL,
  `mailFornReport` varchar(100) DEFAULT NULL,
  `idFormatTramitioFk` int(11) DEFAULT NULL,
  `isAutomatic` tinyint(1) DEFAULT 0,
  `hourAutomatic` int(11) DEFAULT NULL,
  `numberUserAsalt` int(11) DEFAULT NULL,
  `passAsalt` varchar(100) DEFAULT NULL,
  `police` varchar(100) DEFAULT NULL,
  `phonePolice` varchar(100) DEFAULT NULL,
  `serviceEmergencyMedical` varchar(100) DEFAULT NULL,
  `numberPartner` int(11) DEFAULT NULL,
  `plaint` varchar(100) DEFAULT NULL,
  `observation` text DEFAULT NULL,
  PRIMARY KEY (`idClientServicesAlarmsAditionals`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_client_services_alarms_aditional` */

/*Table structure for table `tb_client_services_camera` */

DROP TABLE IF EXISTS `tb_client_services_camera`;

CREATE TABLE `tb_client_services_camera` (
  `idClientServicesCamera` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  `idTypeMaintenanceFk` int(11) DEFAULT NULL,
  `dateUp` varchar(255) DEFAULT NULL,
  `dateDown` varchar(255) DEFAULT NULL,
  `idDvr_nvrFk` int(11) DEFAULT NULL,
  `location` varchar(200) DEFAULT NULL,
  `locationLat` varchar(200) DEFAULT NULL,
  `locationLon` varchar(200) DEFAULT NULL,
  `maxCamera` int(11) DEFAULT NULL,
  `numberPortRouter` int(11) DEFAULT NULL,
  `addressVpn` varchar(200) DEFAULT NULL,
  `nroPort1` int(11) DEFAULT NULL,
  `nroPort2` int(11) DEFAULT NULL,
  `namePort1` varchar(200) DEFAULT NULL,
  `namePort2` varchar(200) DEFAULT NULL,
  `observation` text DEFAULT NULL,
  `addessClient` varchar(100) DEFAULT NULL,
  `addessClientLat` varchar(100) DEFAULT NULL,
  `addessClientLot` varchar(100) DEFAULT NULL,
  `portHttp` int(11) DEFAULT NULL,
  `namePort` varchar(100) DEFAULT NULL,
  `port` int(11) DEFAULT NULL,
  `idClientServicesFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idClientServicesCamera`),
  KEY `idClientServicesFk` (`idClientServicesFk`),
  KEY `idTypeMaintenanceFk` (`idTypeMaintenanceFk`),
  KEY `idDvrNvr_tb_prod_classFk` (`idDvr_nvrFk`),
  CONSTRAINT `tb_client_services_camera_ibfk_1` FOREIGN KEY (`idClientServicesFk`) REFERENCES `tb_client_services` (`idClientServices`),
  CONSTRAINT `tb_client_services_camera_ibfk_2` FOREIGN KEY (`idTypeMaintenanceFk`) REFERENCES `tb_type_maintenance` (`idTypeMaintenance`),
  CONSTRAINT `tb_client_services_camera_ibfk_3` FOREIGN KEY (`idDvr_nvrFk`) REFERENCES `tb_products` (`idProduct`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_client_services_camera` */

insert  into `tb_client_services_camera`(`idClientServicesCamera`,`name`,`idContracAssociated_SE`,`idTypeMaintenanceFk`,`dateUp`,`dateDown`,`idDvr_nvrFk`,`location`,`locationLat`,`locationLon`,`maxCamera`,`numberPortRouter`,`addressVpn`,`nroPort1`,`nroPort2`,`namePort1`,`namePort2`,`observation`,`addessClient`,`addessClientLat`,`addessClientLot`,`portHttp`,`namePort`,`port`,`idClientServicesFk`) values 
(50,'Prueba de camaras',6,1,'24/03/2021',NULL,16,'Terraza',NULL,NULL,3,6,'chile2154.seguridadtass.com.ar',443,8000,'HTTPS','SERVIDOR','Probando nuevo servicio de camaras Modificacion','chile2154.seguridadtass.com.ar',NULL,NULL,8080,'RTSP',554,280),
(51,'Camaras',14,1,'06/08/2021',NULL,16,'',NULL,NULL,8,NULL,NULL,NULL,NULL,NULL,NULL,'probandocamaras','',NULL,NULL,NULL,NULL,NULL,293),
(52,'Prueba camara',12,1,'23/23/1321',NULL,16,'Prueba camara',NULL,NULL,2,0,NULL,NULL,NULL,NULL,NULL,'','',NULL,NULL,NULL,NULL,NULL,297),
(55,'Pruebas camaras',14,1,'18/08/2021',NULL,37,'Sotano',NULL,NULL,16,0,NULL,NULL,NULL,NULL,NULL,'Prueba','',NULL,NULL,NULL,NULL,NULL,300),
(56,'Camaras',16,1,'10/05/2016',NULL,16,'Servicios',NULL,NULL,8,0,NULL,NULL,NULL,NULL,NULL,'','',NULL,NULL,NULL,NULL,NULL,301);

/*Table structure for table `tb_client_services_gps` */

DROP TABLE IF EXISTS `tb_client_services_gps`;

CREATE TABLE `tb_client_services_gps` (
  `idClientServicesGps` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientServicesFk` int(11) DEFAULT NULL,
  `idTypeGpsFk` int(11) DEFAULT NULL,
  `typeMaintenance` text DEFAULT NULL,
  `dateUp` varchar(255) DEFAULT NULL,
  `dateDown` varchar(255) DEFAULT NULL,
  `modem` varchar(200) DEFAULT NULL,
  `idInternetCompanyFk` int(11) DEFAULT NULL COMMENT 'Empresa',
  `nroLine` varchar(200) DEFAULT NULL,
  `nroChip` varchar(200) DEFAULT NULL,
  `idServiceAsociateFk` int(11) DEFAULT NULL,
  `nroSerieInternal` varchar(200) DEFAULT NULL,
  `nroSerieManufacturer` varchar(200) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  PRIMARY KEY (`idClientServicesGps`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_client_services_gps` */

/*Table structure for table `tb_client_services_internet` */

DROP TABLE IF EXISTS `tb_client_services_internet`;

CREATE TABLE `tb_client_services_internet` (
  `idClientServicesInternet` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientServicesFk` int(11) DEFAULT NULL,
  `idTypeInternetFk` int(11) DEFAULT NULL,
  `idTypeMaintenanceFk` text DEFAULT NULL,
  `idServiceFk` int(11) DEFAULT NULL,
  `idServiceAsociateFk` varchar(255) DEFAULT '',
  `idRouterInternetFk` int(11) DEFAULT NULL,
  `userAdmin` varchar(100) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  `idInternetCompanyFk` int(11) DEFAULT NULL,
  `idModemInternetFk` varchar(100) DEFAULT '',
  `dateDown` varchar(255) DEFAULT NULL,
  `dateUp` varchar(255) DEFAULT NULL,
  `isDown` tinyint(1) DEFAULT 0,
  `port` decimal(11,0) DEFAULT NULL,
  `passAdmin` varchar(200) DEFAULT NULL,
  `userWifi` varchar(255) DEFAULT NULL,
  `passWifi` varchar(255) DEFAULT NULL,
  `macAddress` varchar(255) DEFAULT NULL,
  `numberLine` varchar(255) DEFAULT NULL,
  `numberChip` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idClientServicesInternet`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_client_services_internet` */

insert  into `tb_client_services_internet`(`idClientServicesInternet`,`idClientServicesFk`,`idTypeInternetFk`,`idTypeMaintenanceFk`,`idServiceFk`,`idServiceAsociateFk`,`idRouterInternetFk`,`userAdmin`,`idContracAssociated_SE`,`idInternetCompanyFk`,`idModemInternetFk`,`dateDown`,`dateUp`,`isDown`,`port`,`passAdmin`,`userWifi`,`passWifi`,`macAddress`,`numberLine`,`numberChip`) values 
(39,278,1,'1',1,'[\"277\",\"280\",\"291\"]',20,'admin',6,1,'19',NULL,'19/03/2021',NULL,5,'admin','admin','admin','df-dg-45-64-56-54',NULL,NULL),
(40,287,1,'1',1,'[\"290\"]',20,'admin',9,1,'19',NULL,'09/06/2021',NULL,8080,'admin','admin','admin','1d-fs-d2-34-fs-df',NULL,NULL),
(41,292,4,'1',2,'[\"277\",\"281\",\"286\",\"291\"]',NULL,NULL,6,1,'19',NULL,'02/08/2021',NULL,NULL,NULL,NULL,NULL,NULL,'234343243242423','4234324234'),
(42,304,1,'1',3,'[\"293\",\"296\",\"300\",\"301\",\"303\"]',20,'admin',14,1,'19',NULL,'20/08/2021',NULL,80,'admin','admin','admin','12-jk-j1-23-23-4j',NULL,NULL),
(43,314,1,'1',3,'[\"311\",\"312\",\"313\",\"315\"]',20,'admin',17,2,'19',NULL,'08/09/2021',NULL,8,'admin','admin','admin','sd-fs-df-34-23-24',NULL,NULL);

/*Table structure for table `tb_client_services_smart_panic` */

DROP TABLE IF EXISTS `tb_client_services_smart_panic`;

CREATE TABLE `tb_client_services_smart_panic` (
  `idClientServicesSmartPanic` int(11) NOT NULL AUTO_INCREMENT,
  `idClientServicesFk` int(11) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  `dateUp` varchar(255) DEFAULT NULL,
  `dateDown` varchar(255) DEFAULT NULL,
  `idTypeMaintenanceFk` int(11) DEFAULT NULL,
  `idCompanyMonitorFK` int(11) DEFAULT NULL,
  `sucribeNumber` varchar(200) NOT NULL,
  `idApplicationFk` int(11) DEFAULT NULL,
  `passwdApp` varchar(50) DEFAULT NULL,
  `countNewLicense` int(11) DEFAULT NULL,
  `observation` text DEFAULT NULL,
  PRIMARY KEY (`idClientServicesSmartPanic`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_client_services_smart_panic` */

insert  into `tb_client_services_smart_panic`(`idClientServicesSmartPanic`,`idClientServicesFk`,`name`,`idContracAssociated_SE`,`dateUp`,`dateDown`,`idTypeMaintenanceFk`,`idCompanyMonitorFK`,`sucribeNumber`,`idApplicationFk`,`passwdApp`,`countNewLicense`,`observation`) values 
(24,281,'Prueba app monitor',6,'24/03/2021',NULL,1,1,'438459357134853',2,'Prueba',2,'Prueba de nuevo servicio app monitor Modificacion'),
(29,310,'Prueba app monitor',9,'06/09/2021',NULL,1,1,'11111111111',1,NULL,100,'prueba Edicion'),
(30,311,'Prueba app monitor',17,'08/09/2021',NULL,1,1,'4567435345345',1,NULL,2,'Prueba en Cliente Administracion');

/*Table structure for table `tb_client_services_totem` */

DROP TABLE IF EXISTS `tb_client_services_totem`;

CREATE TABLE `tb_client_services_totem` (
  `idClientServicesTotem` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientServicesFk` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  `item_SE` varchar(100) DEFAULT NULL,
  `dateUp` varchar(255) DEFAULT '',
  `dateDown` varchar(255) DEFAULT NULL,
  `idCompanyFk` int(11) DEFAULT NULL,
  `idDvr_nvrFk` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT '',
  `maxCamera` int(11) DEFAULT NULL,
  `idTotenModelFk` int(11) DEFAULT NULL,
  `idTypeMaintenanceFk` int(11) DEFAULT NULL,
  `numberPortRouter` varchar(100) DEFAULT '',
  `addreesVpn` varchar(100) DEFAULT NULL,
  `namePort1` varchar(100) DEFAULT NULL,
  `numberPort1` varchar(100) DEFAULT NULL,
  `namePort2` varchar(100) DEFAULT NULL,
  `numberPort2` varchar(100) DEFAULT NULL,
  `addressClientInter` varchar(100) DEFAULT NULL,
  `portHttpInter` varchar(100) DEFAULT NULL,
  `namePortInter` varchar(100) DEFAULT NULL,
  `numberPortInter` varchar(100) DEFAULT NULL,
  `observation` text DEFAULT NULL,
  `numberAbonado` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idClientServicesTotem`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_client_services_totem` */

insert  into `tb_client_services_totem`(`idClientServicesTotem`,`idClientServicesFk`,`name`,`idContracAssociated_SE`,`item_SE`,`dateUp`,`dateDown`,`idCompanyFk`,`idDvr_nvrFk`,`location`,`maxCamera`,`idTotenModelFk`,`idTypeMaintenanceFk`,`numberPortRouter`,`addreesVpn`,`namePort1`,`numberPort1`,`namePort2`,`numberPort2`,`addressClientInter`,`portHttpInter`,`namePortInter`,`numberPortInter`,`observation`,`numberAbonado`) values 
(28,279,'PRUEBA DE TOTEM',6,NULL,'22/03/2021',NULL,1,'16','Sala de servicios',4,2,1,'4','chile2154.seguridadtass.com.ar','HTTPS','443','SERVIDOR','8000','chile2154.seguridadtass.com.ar','8080','RTSP','554','Prueba de modificacion','438459357134853'),
(29,296,'TOTEM',14,NULL,'07/08/2021',NULL,1,'16','Sotano',6,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'PruebaTotem2','32423432432432'),
(30,315,'Prueba TOTEM',17,NULL,'08/09/2021',NULL,1,'16','Entrada',8,1,1,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Prueba','13243423423');

/*Table structure for table `tb_client_totem` */

DROP TABLE IF EXISTS `tb_client_totem`;

CREATE TABLE `tb_client_totem` (
  `idClientTotem` int(11) NOT NULL AUTO_INCREMENT,
  `idClientFk` int(11) DEFAULT NULL,
  `idClientServicesTotemFk` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `userProfile` varchar(255) DEFAULT NULL,
  `qrBase64` text DEFAULT NULL,
  PRIMARY KEY (`idClientTotem`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=latin1;

/*Data for the table `tb_client_totem` */

insert  into `tb_client_totem`(`idClientTotem`,`idClientFk`,`idClientServicesTotemFk`,`name`,`user`,`pass`,`userProfile`,`qrBase64`) values 
(122,93,30,'David Eduardo Rincon Luengo','admin','admin','admin','data:image/png;base64,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'),
(127,93,28,'David Eduardo Rincon Luengo','drincon','admin','admin','data:image/png;base64,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'),
(128,NULL,28,'Carlos Villalobos','carlitos','admin','admin','data:image/png;base64,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');

/*Table structure for table `tb_client_type` */

DROP TABLE IF EXISTS `tb_client_type`;

CREATE TABLE `tb_client_type` (
  `idClientType` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ClientType` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idClientType`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_client_type` */

insert  into `tb_client_type`(`idClientType`,`ClientType`) values 
(1,'Administracion'),
(2,'Edificio'),
(3,'Empresa'),
(4,'Sucursal'),
(5,'Particular');

/*Table structure for table `tb_client_type_services` */

DROP TABLE IF EXISTS `tb_client_type_services`;

CREATE TABLE `tb_client_type_services` (
  `idClientTypeServices` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `clientTypeServices` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idClientTypeServices`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_client_type_services` */

insert  into `tb_client_type_services`(`idClientTypeServices`,`clientTypeServices`) values 
(1,'CONTROL DE ACCESO'),
(2,'INTERNET'),
(3,'TOTEM'),
(4,'CAMARAS'),
(5,'ALARMAS'),
(6,'APP MONITOREO');

/*Table structure for table `tb_client_ufc` */

DROP TABLE IF EXISTS `tb_client_ufc`;

CREATE TABLE `tb_client_ufc` (
  `idUfd` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `identificador` varchar(200) DEFAULT NULL,
  `idProvinceFk` int(11) DEFAULT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `idTypeTaxFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idUfd`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_client_ufc` */

/*Table structure for table `tb_client_users` */

DROP TABLE IF EXISTS `tb_client_users`;

CREATE TABLE `tb_client_users` (
  `idClientUsers` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientFk` int(11) DEFAULT NULL,
  `idUserFk` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idClientUsers`)
) ENGINE=InnoDB AUTO_INCREMENT=188 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_client_users` */

insert  into `tb_client_users`(`idClientUsers`,`idClientFk`,`idUserFk`,`created_at`) values 
(2,2,2,NULL),
(12,5,2,NULL),
(28,19,2,NULL),
(32,23,2,NULL),
(34,24,2,NULL),
(38,15,72,NULL),
(59,26,80,NULL),
(79,35,92,NULL),
(80,35,80,NULL),
(106,18,72,NULL),
(115,13,93,NULL),
(138,10,80,NULL),
(144,14,93,NULL),
(145,14,92,NULL),
(146,14,89,NULL),
(147,25,93,NULL),
(148,25,92,NULL),
(149,25,89,NULL),
(150,44,93,NULL),
(156,45,93,NULL),
(178,1,93,NULL),
(179,1,92,NULL),
(180,11,93,NULL),
(181,11,92,NULL),
(182,11,89,NULL),
(183,12,93,NULL),
(184,12,92,NULL),
(185,12,89,NULL),
(186,46,93,NULL),
(187,49,79,NULL);

/*Table structure for table `tb_clients` */

DROP TABLE IF EXISTS `tb_clients`;

CREATE TABLE `tb_clients` (
  `idClient` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientTypeFk` int(11) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `addressLat` varchar(100) DEFAULT NULL,
  `addressLon` varchar(100) DEFAULT NULL,
  `idAgentFk` int(200) DEFAULT NULL,
  `businessName` varchar(200) DEFAULT NULL,
  `idClientAssociated_SE` int(11) DEFAULT NULL,
  `CUIT` varchar(30) DEFAULT NULL,
  `idLocationFk` int(11) DEFAULT NULL,
  `idProvinceFk` int(11) DEFAULT NULL,
  `phoneMobile` varchar(200) DEFAULT NULL COMMENT 'Telefono movil de un particular',
  `phoneLocal` varchar(200) DEFAULT NULL COMMENT 'Telefono local de un particular',
  `mail` varchar(200) DEFAULT NULL,
  `observation` varchar(500) DEFAULT NULL,
  `pageWeb` varchar(200) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `update_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `idStatusFk` int(11) DEFAULT NULL,
  `mailFronKey` varchar(100) DEFAULT NULL,
  `observationOrderKey` varchar(500) DEFAULT NULL,
  `isNotCliente` tinyint(1) DEFAULT 0,
  `idClientAdminFk` int(11) DEFAULT NULL,
  `mailServiceTecnic` varchar(100) DEFAULT NULL,
  `idSecurityCode` varchar(100) DEFAULT NULL,
  `observationSericeTecnic` varchar(100) DEFAULT NULL,
  `mailCollection` varchar(100) DEFAULT NULL,
  `observationCollection` varchar(500) DEFAULT NULL,
  `idClientCompaniFk` int(11) DEFAULT NULL,
  `idZonaFk` int(11) DEFAULT NULL,
  `idClientDepartamentFk` int(11) DEFAULT NULL,
  `idTipoInmuebleFk` int(11) DEFAULT NULL,
  `IsInDebt` int(11) DEFAULT NULL COMMENT 'para indicar que el edificio está en mora',
  `departmentUnit` int(11) DEFAULT NULL COMMENT 'Designacion de Edificio Tipos {Letras o Numeros}',
  `departmentCorrelation` int(11) DEFAULT NULL COMMENT 'Designacion de correlacion {por piso o todo el edificio}',
  `autoApproveAll` int(11) DEFAULT NULL,
  `chargeForExpenses` int(11) DEFAULT NULL COMMENT 'cobro por expensas',
  PRIMARY KEY (`idClient`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_clients` */

insert  into `tb_clients`(`idClient`,`idClientTypeFk`,`name`,`address`,`addressLat`,`addressLon`,`idAgentFk`,`businessName`,`idClientAssociated_SE`,`CUIT`,`idLocationFk`,`idProvinceFk`,`phoneMobile`,`phoneLocal`,`mail`,`observation`,`pageWeb`,`created_at`,`update_at`,`idStatusFk`,`mailFronKey`,`observationOrderKey`,`isNotCliente`,`idClientAdminFk`,`mailServiceTecnic`,`idSecurityCode`,`observationSericeTecnic`,`mailCollection`,`observationCollection`,`idClientCompaniFk`,`idZonaFk`,`idClientDepartamentFk`,`idTipoInmuebleFk`,`IsInDebt`,`departmentUnit`,`departmentCorrelation`,`autoApproveAll`,`chargeForExpenses`) values 
(1,2,'GABRIELA MISTRAL 4099','GABRIELA MISTRAL 4099','-34.596312317965','-58.516365731706',NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,'2020-07-23 21:37:02','2022-02-04 22:35:51',1,NULL,NULL,0,36,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,1,1,1,1,1),
(2,1,'DUGGANCO MARSAN','GABRIELA MISTRAL 4099','-34.596312317965','-58.516365731706',1,'CARLOS MARSAN',NULL,'20-10550239-8',1,1,NULL,NULL,NULL,'','www.marsan.com.ar','2020-07-23 21:37:02',NULL,1,'dugganco@gmail.com','',0,0,'dugganco@gmail.com',NULL,'','duggancopagos@gmail.com','',0,1,1,1,NULL,NULL,NULL,NULL,NULL),
(3,2,'SAN PEDRITO 636','SAN PEDRITO 636','-34.638248176437','-58.466290724568',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-07-23 21:48:46',NULL,1,'dugganco@gmail.com','',0,2,'dugganco@gmail.com',NULL,'','duggancopagos@gmail.com','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(4,2,'AV MONROE 3846','AV MONROE 3846','-34.566909593671','-58.473782463583',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-07-24 12:21:35',NULL,1,'dugganco@gmail.com','',0,2,'dugganco@gmail.com',NULL,'','duggancopagos@gmail.com','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(5,2,'DR LUIS BELAUSTEGUI 1115','DR LUIS BELAUSTEGUI 1115','-34.60552842687767','-58.45638311971346',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-07-24 12:26:02',NULL,1,'dugganco@gmail.com','',0,2,'dugganco@gmail.com',NULL,'','duggancopagos@gmail.com','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(6,2,'AV SAN JUAN 3688','AV SAN JUAN 3688','-34.625635395556','-58.417501922526',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-07-24 12:36:39',NULL,1,'dugganco@gmail.com','',0,2,'dugganco@gmail.com',NULL,'','duggancopagos@gmail.com','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(7,2,'REPUBLICA ARABE SIRIA 2763','REPUBLICA ARABE SIRIA 2763','-34.58273652608','-58.415093425803',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-07-24 12:47:16',NULL,1,'dugganco@gmail.com','',0,2,'dugganco@gmail.com',NULL,'','duggancopagos@gmail.com','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(8,2,'AV SAN JUAN 3655','AV SAN JUAN 3655','-34.62555820985','-58.416969238364',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-07-24 12:56:29',NULL,1,'dugganco@gmail.com','',0,2,'dugganco@gmail.com',NULL,'','duggancopagos@gmail.com','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(9,2,'URUGUAY 1038','URUGUAY 1038','-34.596555598811','-58.387099762717',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-07-24 13:03:23',NULL,1,'dugganco@gmail.com','',0,2,'dugganco@gmail.com',NULL,'','duggancopagos@gmail.com','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(10,2,'ARREGUI 3146','ARREGUI 3146','-34.607451066225','-58.489197639921',NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,'2020-07-24 13:10:47','2021-06-22 20:47:57',1,NULL,NULL,0,26,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,2,3,NULL,NULL),
(11,1,'CONSTANZA TETTAMANTI','GARCIA DEL RIO 4049','-34.554347131346','-58.48490977337',1,'CONSTANZA TETTAMANTI',134534583,'27-25790019-9',37,1,NULL,NULL,NULL,'prueba','constanzatettamanti.com.ar','2020-07-24 13:10:47','2021-08-11 18:53:19',1,'administracion@adctettamanti.com.ar','prueba',0,0,'administracion@adctettamanti.com.ar',NULL,'prueba','administracion@adctettamanti.com.ar','prueba',0,1,1091,1,NULL,NULL,NULL,NULL,NULL),
(12,2,'LAVALLE 357','LAVALLE 357','-34.601997409805','-58.371944634111',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'Observaciones Generales (new)',NULL,'2020-07-24 13:16:00','2021-08-12 13:43:23',1,'administracion@adctettamanti.com.ar','Observaciones de pedidos de llaveros (new)',0,11,'administracion@adctettamanti.com.ar',NULL,'Observaciones de servicios técnicos (new)','administracion@adctettamanti.com.ar','Observaciones de Cobranzas (new)',NULL,1,NULL,NULL,NULL,2,3,NULL,NULL),
(13,2,'MANUEL UGARTE 3580','MANUEL UGARTE 3580','-34.562495783889','-58.473842045079',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-07-24 13:21:15','2021-06-11 01:11:57',1,'administracion@adctettamanti.com.ar','prueba',0,11,'administracion@adctettamanti.com.ar',NULL,'','administracion@adctettamanti.com.ar','',NULL,1,NULL,NULL,NULL,1,1,NULL,NULL),
(14,2,'HIDALGO 462','HIDALGO 462','-34.614010711042','-58.439875711967',NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,'2020-07-24 19:32:36','2021-06-23 13:12:40',1,NULL,NULL,0,11,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,1,1,NULL,NULL),
(15,1,'ESTUDIO MARJBEIN-SUCHMON','HIDALGO 462','-34.614010711042','-58.439875711967',1,'DORA SILVIA MARJBEIN',135643543,'27-11018302-5',1,1,NULL,NULL,NULL,'','','2020-07-24 19:32:36','2021-03-27 22:39:05',1,'proveedores@em-s.com.ar','',0,0,'proveedores@em-s.com.ar',NULL,'','proveedores@em-s.com.ar','',0,1,351,1,NULL,NULL,NULL,NULL,NULL),
(16,2,'AV EVA PERON 1155','AV EVA PERON 1155','-34.630617058881','-58.441633624559',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-07-24 19:38:17',NULL,1,'proveedores@em-s.com.ar','',0,15,'proveedores@em-s.com.ar',NULL,'','proveedores@em-s.com.ar','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(17,2,'JULIAN ALVAREZ 647','JULIAN ALVAREZ 647','-34.599024958043','-58.433565151432',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-07-24 19:45:01','2020-09-07 20:23:14',1,'proveedores@em-s.com.ar','',0,15,'proveedores@em-s.com.ar',NULL,'','proveedores@em-s.com.ar','',NULL,1,NULL,NULL,NULL,1,1,NULL,NULL),
(18,2,'HUMBERTO 1 2630','HUMBERTO 1 2630','-34.622350637143','-58.401702364025',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-07-27 12:54:50','2021-05-24 16:34:54',1,'proveedores@em-s.com.ar','',0,15,'proveedores@em-s.com.ar',NULL,'','proveedores@em-s.com.ar','',NULL,1,NULL,NULL,NULL,2,2,NULL,NULL),
(19,2,'GURRUCHAGA 2230','GURRUCHAGA 2230','-34.585151263659','-58.42288892944',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-07-27 13:04:08',NULL,1,'proveedores@em-s.com.ar','',0,15,'proveedores@em-s.com.ar',NULL,'','proveedores@em-s.com.ar','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(20,2,'NEUQUEN 554','NEUQUEN 554','-36.663492212454','-56.684565495017',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-07-27 13:09:23',NULL,1,'proveedores@em-s.com.ar','',0,15,'proveedores@em-s.com.ar',NULL,'','proveedores@em-s.com.ar','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(21,2,'PLANES 636','PLANES 636','-34.609259386073','-58.441812083249',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-07-27 13:19:25',NULL,1,'proveedores@em-s.com.ar','',0,15,'proveedores@em-s.com.ar',NULL,'','proveedores@em-s.com.ar','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(22,2,'SOLER 4196','SOLER 4196','-34.590089325845','-58.420209648228',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-07-27 13:37:21',NULL,1,'proveedores@em-s.com.ar','',0,15,'proveedores@em-s.com.ar',NULL,'','proveedores@em-s.com.ar','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(23,2,'HIDALGO 619','HIDALGO 619','-34.612366139591','-58.440569517803',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-07-27 14:01:29',NULL,1,'proveedores@em-s.com.ar','',0,15,'proveedores@em-s.com.ar',NULL,'','proveedores@em-s.com.ar','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(24,2,'ARGERICH 1723','ARGERICH 1723','-34.61488205388','-58.480494908741',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-07-27 14:06:33',NULL,1,'proveedores@em-s.com.ar','',0,15,'proveedores@em-s.com.ar',NULL,'','proveedores@em-s.com.ar','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(25,2,'VIRREY DEL PINO 4130','VIRREY DEL PINO 4130','-34.576279462042','-58.47115818738',NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,'2020-07-27 14:20:17','2021-06-24 01:15:38',1,NULL,NULL,0,11,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,1,1,NULL,NULL),
(26,1,'REYES CHOLAKIAN','VIRREY DEL PINO 4130','-34.576279462042','-58.47115818738',1,'SEBASTIAN REYES',NULL,'20-22472909-0',1,1,NULL,NULL,NULL,'Probando','','2020-07-27 14:20:17','2021-05-19 02:27:21',1,'admreyescholakian@gmail.com','Probando',0,0,'admreyescholakian@gmail.com',NULL,'Probando','admreyescholakian@gmail.com','Probando',0,1,617,1,NULL,NULL,NULL,NULL,NULL),
(27,2,'AV FEDERICO LACROZE 3541','AV FEDERICO LACROZE 3541','-34.580871507962','-58.451187995348',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-07-28 18:00:18',NULL,1,'admreyescholakian@gmail.com','',0,26,'admreyescholakian@gmail.com',NULL,'','admreyescholakian@gmail.com','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(28,2,'GUEVARA 456','GUEVARA 456','-34.586609107101','-58.451108912433',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-07-28 18:05:25',NULL,1,'admreyescholakian@gmail.com','',0,26,'admreyescholakian@gmail.com',NULL,'','admreyescholakian@gmail.com','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(29,2,'MENDOZA 5123','MENDOZA 5123','-34.577352270774','-58.484039386476',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-07-28 18:23:17',NULL,1,'admreyescholakian@gmail.com','',0,26,'admreyescholakian@gmail.com',NULL,'','admreyescholakian@gmail.com','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(30,2,'AV RIVADAVIA 2358','AV RIVADAVIA 2358','-34.609760181381','-58.399901004654',NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,'2020-07-30 20:49:44',NULL,0,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(31,1,'GRUPO BETA','AV RIVADAVIA 2358','-34.609760181381','-58.399901004654',1,'FRANCISCA ELENA ANTONELLI',NULL,'27-13071755-7',1,1,NULL,NULL,NULL,'','','2020-07-30 20:49:44',NULL,1,'consorcios@grupobeta.com.ar','',0,0,'consorcios@grupobeta.com.ar',NULL,'','consorcios@grupobeta.com.ar','',0,1,712,1,NULL,NULL,NULL,NULL,NULL),
(32,2,'VENEZUELA 1867','VENEZUELA 1867','-34.614994141794','-58.392704942701',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-07-31 13:44:31',NULL,1,'consorcios@grupobeta.com.ar','',0,31,'consorcios@grupobeta.com.ar',NULL,'','consorcios@grupobeta.com.ar','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(33,2,'CHARCAS 2956','CHARCAS 2956','-34.593294765959','-58.407892065368',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-07-31 13:57:08',NULL,1,'consorcios@grupobeta.com.ar','',0,31,'consorcios@grupobeta.com.ar',NULL,'','consorcios@grupobeta.com.ar','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(34,2,'AV SANTA FE 2086','AV SANTA FE 2086','-34.595587631448','-58.397203472386',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-07-31 14:04:55',NULL,1,'consorcios@grupobeta.com.ar','',0,31,'consorcios@grupobeta.com.ar',NULL,'','consorcios@grupobeta.com.ar','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(35,2,'CHILE 2154','CHILE 2154','-34.617267693675','-58.396904886312',0,NULL,2147483647,NULL,1,1,NULL,NULL,NULL,'Observaciones Generales',NULL,'2020-07-31 14:40:30','2021-06-16 13:31:46',1,'consorcios@grupobeta.com.ar','Observaciones de pedidos de llaveros',0,26,'consorcios@grupobeta.com.ar',NULL,'Observaciones de servicios técnicos','consorcios@grupobeta.com.ar','Observaciones de Cobranzas',NULL,1,NULL,NULL,NULL,1,1,NULL,NULL),
(36,1,'ALIPRANDI PALENA','YATAY 120','-34.612744100574','-58.428597216874',1,'MARIA FERNANDA ALIPRANDI',NULL,'27-20009140-5',1,1,NULL,NULL,NULL,'','','2020-08-13 18:07:19',NULL,1,'aliprandi_palena@hotmail.com','',0,0,'aliprandi_palena@hotmail.com',NULL,'','aliprandi_palena@hotmail.com','',0,1,NULL,3,NULL,NULL,NULL,NULL,NULL),
(37,2,'BOGADO 4538','BOGADO 4538','-34.604973522529','-58.429553867589',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-08-13 18:16:53',NULL,1,'aliprandi_palena@hotmail.com','',0,36,'aliprandi_palena@hotmail.com',NULL,'','aliprandi_palena@hotmail.com','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(38,2,'SAN JOSE DE CALASANZ 481','SAN JOSE DE CALASANZ 481','-34.624428090988','-58.437713587696',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-08-13 18:59:09',NULL,1,'aliprandi_palena@hotmail.com','',0,36,'aliprandi_palena@hotmail.com',NULL,'','aliprandi_palena@hotmail.com','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(39,2,'VALLE 1215','VALLE 1215','-34.625393441154','-58.444797164656',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-08-13 19:05:21',NULL,1,'aliprandi_palena@hotmail.com','',0,36,'aliprandi_palena@hotmail.com',NULL,'','aliprandi_palena@hotmail.com','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(40,2,'AV RIVADAVIA 4965','AV RIVADAVIA 4965','-34.617896441747','-58.435550242969',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-08-13 19:18:58',NULL,1,'aliprandi_palena@hotmail.com','',0,36,'aliprandi_palena@hotmail.com',NULL,'','aliprandi_palena@hotmail.com','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(41,2,'MALVINAS ARGENTINAS 251','MALVINAS ARGENTINAS 251','-34.62755403111','-58.450679583446',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-08-13 19:23:57',NULL,1,'aliprandi_palena@hotmail.com','',0,36,'aliprandi_palena@hotmail.com',NULL,'','aliprandi_palena@hotmail.com','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(42,2,'HORTIGUERA 473','HORTIGUERA 473','-34.628049430079','-58.44512915586',0,NULL,NULL,NULL,1,1,NULL,NULL,NULL,'',NULL,'2020-08-13 19:28:31',NULL,1,'aliprandi_palena@hotmail.com','',0,36,'aliprandi_palena@hotmail.com',NULL,'','aliprandi_palena@hotmail.com','',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(43,2,'GARCIA DEL RIO 4044','GARCIA DEL RIO 4044','-34.554323584571','-58.484865178333',NULL,NULL,NULL,NULL,37,1,NULL,NULL,NULL,NULL,NULL,'2021-08-10 20:22:25','2021-08-11 02:16:01',0,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(44,1,'Prueba','GARCIA DEL RIO 4044','-34.554323584571','-58.484865178333',1,'Prueba',0,'Prueba',37,1,NULL,NULL,NULL,'','','2021-08-10 20:22:25','2021-08-10 20:22:25',1,NULL,'',0,0,NULL,NULL,'',NULL,'',0,1,1071,1,NULL,NULL,NULL,NULL,NULL),
(45,2,'GARCIA DEL RIO 4045','GARCIA DEL RIO 4045','-34.554328293926','-58.484874097341',NULL,NULL,NULL,NULL,37,1,NULL,NULL,NULL,NULL,NULL,'2021-08-11 00:19:35','2021-08-11 00:21:48',1,NULL,NULL,0,46,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,2,2,NULL,NULL),
(46,1,'Prueba2','GARCIA DEL RIO 4045','-34.554328293926','-58.484874097341',1,'Prueba2',NULL,'Prueba2',37,1,NULL,NULL,NULL,'Prueba','','2021-08-11 00:19:35','2021-08-23 16:25:46',1,NULL,'Prueba',0,0,NULL,NULL,'Prueba',NULL,'Prueba',0,1,1089,1,NULL,NULL,NULL,NULL,NULL),
(47,2,'GARCIA DEL RIO 4048','GARCIA DEL RIO 4048','-34.554342421991','-58.484900854362',NULL,NULL,NULL,NULL,37,1,NULL,NULL,NULL,NULL,NULL,'2021-08-11 10:56:59','2021-08-11 10:56:59',0,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(48,2,'GARCIA DEL RIO 4049','GARCIA DEL RIO 4049','-34.554347131346','-58.48490977337',NULL,NULL,NULL,NULL,37,1,NULL,NULL,NULL,NULL,NULL,'2021-08-11 18:53:19','2021-08-11 18:53:19',0,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
(49,1,'New Prueba','GARCIA DEL RIO 4049','-34.554347131346','-58.48490977337',1,'New Prueba SRL',1000,'1123123123123',37,1,NULL,NULL,NULL,'','newprueba.com.ar','2021-09-14 01:27:58','2021-09-14 01:27:58',1,NULL,'',0,0,NULL,NULL,'',NULL,'',0,1,1099,1,NULL,NULL,NULL,NULL,NULL),
(50,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2022-01-29 12:27:21','2022-01-29 12:27:21',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

/*Table structure for table `tb_clients_phones` */

DROP TABLE IF EXISTS `tb_clients_phones`;

CREATE TABLE `tb_clients_phones` (
  `idClientPhones` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientFk` int(11) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `idStatusFk` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idClientPhones`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_clients_phones` */

/*Table structure for table `tb_clients_tickets` */

DROP TABLE IF EXISTS `tb_clients_tickets`;

CREATE TABLE `tb_clients_tickets` (
  `idTicketsCliets` int(11) NOT NULL AUTO_INCREMENT,
  `idTicketKf` int(11) DEFAULT NULL,
  `idClientKf` int(11) DEFAULT NULL,
  PRIMARY KEY (`idTicketsCliets`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

/*Data for the table `tb_clients_tickets` */

/*Table structure for table `tb_company` */

DROP TABLE IF EXISTS `tb_company`;

CREATE TABLE `tb_company` (
  `idCompany` int(11) NOT NULL AUTO_INCREMENT,
  `nameCompany` varchar(300) COLLATE utf8mb3_swedish_ci DEFAULT NULL,
  `SA_ID_COMPANY` int(11) DEFAULT NULL,
  `tlfCompany` varchar(255) COLLATE utf8mb3_swedish_ci DEFAULT NULL COMMENT 'TELEFONO DE LA EMPRESA O ADMINISTRACION',
  `mail_services` varchar(200) COLLATE utf8mb3_swedish_ci DEFAULT '',
  `mail_request` varchar(200) COLLATE utf8mb3_swedish_ci DEFAULT NULL,
  `mail_admin` varchar(200) COLLATE utf8mb3_swedish_ci DEFAULT NULL,
  `isEdit` tinyint(11) DEFAULT 0,
  PRIMARY KEY (`idCompany`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_swedish_ci;

/*Data for the table `tb_company` */

insert  into `tb_company`(`idCompany`,`nameCompany`,`SA_ID_COMPANY`,`tlfCompany`,`mail_services`,`mail_request`,`mail_admin`,`isEdit`) values 
(1,'Carlos Castaño',NULL,NULL,'servicios@carloscastanoooo.com','pedidos@carloscastanoooo.com','admin@carloscastanoooo.com',1),
(2,'Talcahuano Propiedades',NULL,NULL,'servicio@talcahuanossss.com','pedidos@talcahuanossss.com','admin@talcahuanossss.com',1),
(3,'Toyota',NULL,NULL,'servicio@toyotaa.com','Pedidos@toyotaa.com','admin@toyotaa.com',1),
(5,'ADMINISTRACION DE PRUEBA',686,NULL,'angelgabrielceballos@gmail.com','angelgabrielceballos@gmail.com','angelgabrielceballos@gmail.com',0);

/*Table structure for table `tb_company_type_keychains` */

DROP TABLE IF EXISTS `tb_company_type_keychains`;

CREATE TABLE `tb_company_type_keychains` (
  `idKey` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idAddressKf` int(11) DEFAULT NULL,
  `item` varchar(200) DEFAULT NULL,
  `value` decimal(10,2) DEFAULT 0.00,
  PRIMARY KEY (`idKey`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_company_type_keychains` */

insert  into `tb_company_type_keychains`(`idKey`,`idAddressKf`,`item`,`value`) values 
(1,11,'Llaveros',10.99),
(2,11,'Sticket Vehicular',10.99),
(3,11,'Credencial Movil',10.99),
(4,12,'Llaveros',10.99),
(5,12,'Sticket Vehicular',10.99),
(6,5,'Credencial Movil',10.99);

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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

/*Data for the table `tb_contratos` */

insert  into `tb_contratos`(`idContrato`,`idClientFk`,`fechaFirmaVigencia`,`fechaFirmaActivacion`,`numeroContrato`,`contratoType`,`maintenanceType`,`idStatusFk`) values 
(6,35,'1/3/2021','18/04/2021','35-3NC/APP-1321',3,1,1),
(7,36,'24/3/2021',NULL,'36-3NC/APP-24321',3,1,0),
(9,34,'8/6/2021','14/6/2021','34-2NC/APP-8621',3,1,1),
(12,34,'23/7/2021','23/7/2021','34-2NC-23721',1,1,1),
(13,34,'25/7/2021','30/7/2021','34-2NC-25721',2,2,1),
(14,33,'28/7/2021','3/8/2021','33-3NC/APP-28721',3,1,1),
(16,33,'18/8/2021','18/8/2021','33-4/1NC-18821',3,1,1),
(17,46,'8/9/2021','8/9/2021','46-3NC/APP-8921',3,1,1);

/*Table structure for table `tb_datos_adicionales_alarmas` */

DROP TABLE IF EXISTS `tb_datos_adicionales_alarmas`;

CREATE TABLE `tb_datos_adicionales_alarmas` (
  `idDatoAdicionalAlarma` int(11) NOT NULL AUTO_INCREMENT,
  `fk_idTipoCliente` int(11) DEFAULT NULL,
  `typeOfClient_others` varchar(255) DEFAULT NULL,
  `fk_idEncargado` int(11) DEFAULT NULL,
  `nombresEncargadoManual` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `calles_laterales` text DEFAULT NULL,
  `calle_trasera` text DEFAULT NULL,
  `fk_idServiciosAdicionales` varchar(255) DEFAULT NULL,
  `mail_reporte` varchar(255) DEFAULT NULL,
  `fk_idFormatoTransmision` int(11) DEFAULT NULL,
  `fk_idAutomarcado` int(11) DEFAULT NULL,
  `n_usuario_asalto` varchar(255) DEFAULT NULL,
  `contrasena_asalto` varchar(255) DEFAULT '',
  `comisaria` varchar(255) DEFAULT NULL,
  `tlf_comisaria` varchar(255) DEFAULT NULL,
  `servicio_emergencia_medica` varchar(255) DEFAULT NULL,
  `n_de_socio` varchar(255) DEFAULT NULL,
  `plan` varchar(255) DEFAULT NULL,
  `observacion_general` varchar(255) DEFAULT NULL,
  `horario_automarcado` varchar(255) DEFAULT NULL,
  `fkidClientServicesAlarms` int(11) DEFAULT NULL,
  PRIMARY KEY (`idDatoAdicionalAlarma`)
) ENGINE=InnoDB AUTO_INCREMENT=212 DEFAULT CHARSET=latin1;

/*Data for the table `tb_datos_adicionales_alarmas` */

insert  into `tb_datos_adicionales_alarmas`(`idDatoAdicionalAlarma`,`fk_idTipoCliente`,`typeOfClient_others`,`fk_idEncargado`,`nombresEncargadoManual`,`telefono`,`calles_laterales`,`calle_trasera`,`fk_idServiciosAdicionales`,`mail_reporte`,`fk_idFormatoTransmision`,`fk_idAutomarcado`,`n_usuario_asalto`,`contrasena_asalto`,`comisaria`,`tlf_comisaria`,`servicio_emergencia_medica`,`n_de_socio`,`plan`,`observacion_general`,`horario_automarcado`,`fkidClientServicesAlarms`) values 
(201,1,NULL,93,NULL,'1122333334','Estomba','Tronador','[\"1\",\"2\",\"3\",\"4\",\"5\"]','probando@probando.com.ar',1,1,'123','123','123','123','123','123','123',NULL,'06:00',57),
(210,4,'Probando',NULL,'Pablo Perez','114234234234','Probando','Probando','[\"1\",\"2\",\"4\",\"3\"]','Probando@Probando.com.ar',1,1,'Probando','Probando','Probando','Probando','Probando','Probando','Probando',NULL,'09:00',58),
(211,1,NULL,93,NULL,'1122333334','Estomba y Tronador','Balvin','[\"1\",\"2\",\"4\",\"3\",\"5\"]','rexx84@gmail.com',1,1,'admin','admin','n°12','1123432434234','Swiss Medical','123456789','210','Prueba de observacion de datos adicionales','10:00',55);

/*Table structure for table `tb_department` */

DROP TABLE IF EXISTS `tb_department`;

CREATE TABLE `tb_department` (
  `idDepartment` int(11) NOT NULL AUTO_INCREMENT,
  `idAdressKf` int(255) DEFAULT NULL,
  `departmentFloor` varchar(255) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  `deparmentNumber` int(11) DEFAULT NULL,
  `deparmentDescription` varchar(255) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  `idStatusKf` int(11) DEFAULT NULL,
  `idUserAdminRKf` int(11) DEFAULT NULL,
  `idUserAdminPropietariKf` int(11) DEFAULT NULL,
  `idUserKf` int(11) DEFAULT NULL,
  `isAprobatedAdmin` tinyint(4) DEFAULT 0,
  `isRequesLowByProp` tinyint(4) DEFAULT 0,
  `SA_ID_DEPARMENT` int(11) DEFAULT NULL,
  PRIMARY KEY (`idDepartment`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

/*Data for the table `tb_department` */

insert  into `tb_department`(`idDepartment`,`idAdressKf`,`departmentFloor`,`deparmentNumber`,`deparmentDescription`,`idStatusKf`,`idUserAdminRKf`,`idUserAdminPropietariKf`,`idUserKf`,`isAprobatedAdmin`,`isRequesLowByProp`,`SA_ID_DEPARMENT`) values 
(1,1,'Porteria',0,'',1,1,NULL,NULL,0,0,NULL),
(2,1,'1-A',0,'',1,1,NULL,NULL,0,0,NULL),
(3,1,'1-B',0,'',1,1,NULL,NULL,0,0,NULL),
(4,1,'2-A',0,'',1,1,NULL,NULL,0,0,NULL),
(5,1,'2-B',0,'',1,1,NULL,NULL,0,0,NULL),
(6,1,'3-A',0,'',1,1,NULL,NULL,0,0,NULL),
(7,1,'3-B',0,'',1,1,NULL,NULL,0,0,NULL),
(8,1,'4-A',0,'',1,1,NULL,NULL,0,0,NULL),
(9,1,'4-B',0,'',1,1,NULL,71,1,0,NULL),
(10,1,'5-A',0,'',1,1,NULL,NULL,0,0,NULL),
(11,1,'5-B',0,'',1,1,NULL,NULL,0,0,NULL),
(12,2,'6-A',0,'',1,1,NULL,NULL,0,0,NULL),
(13,2,'6-B',0,'',1,1,NULL,NULL,0,0,NULL),
(14,2,'7-A',0,'',1,1,NULL,NULL,0,0,NULL),
(15,2,'7-B',0,'',1,1,NULL,NULL,0,0,NULL),
(16,2,'8-A',0,'',1,1,NULL,NULL,0,0,NULL),
(17,3,'8-B',0,'',1,1,NULL,NULL,0,0,NULL),
(18,2,'Porteria',0,NULL,1,1,NULL,92,1,0,NULL),
(19,3,'Porteria',0,NULL,1,1,NULL,NULL,0,0,NULL),
(100,11,'01-A',NULL,NULL,NULL,NULL,NULL,71,1,0,14143),
(101,11,'01-B',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14144),
(102,11,'01-C',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14145),
(103,11,'02-A',NULL,NULL,NULL,NULL,NULL,75,1,0,14146),
(104,11,'02-B',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14147),
(105,11,'02-C',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14148),
(106,11,'03-A',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14149),
(107,11,'03-B',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14150),
(108,11,'03-C',NULL,NULL,NULL,NULL,NULL,78,1,0,14151),
(109,11,'04-A',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14152),
(110,11,'04-B',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14153),
(111,11,'04-C',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14154),
(112,11,'05-A',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14155),
(113,11,'05-B',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14156),
(114,11,'05-C',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14157),
(115,11,'PB-A',NULL,NULL,NULL,NULL,NULL,NULL,1,0,14158),
(116,12,'PB-01',NULL,NULL,NULL,NULL,NULL,0,0,0,14159),
(117,12,'PB-02',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14160),
(118,12,'01-01',NULL,NULL,NULL,NULL,NULL,85,1,0,14161),
(119,12,'01-02',NULL,NULL,NULL,NULL,NULL,0,0,0,14162),
(120,12,'02-01',NULL,NULL,NULL,NULL,NULL,71,1,0,14163),
(121,12,'02-02',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14164),
(122,12,'03-01',NULL,NULL,NULL,NULL,NULL,76,1,0,14165),
(123,12,'03-02',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14166),
(124,12,'04-01',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14167),
(125,12,'04-02',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14168),
(126,12,'05-01',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14169),
(127,12,'05-02',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14170),
(128,12,'06-01',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14171),
(129,12,'06-02',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14172),
(130,12,'07-01',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14173),
(131,12,'07-02',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14174),
(132,12,'08-01',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14175),
(133,12,'08-02',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14176),
(134,12,'09-01',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14177),
(135,12,'09-02',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14178),
(136,12,'10-01',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14179),
(137,12,'10-02',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14180),
(138,12,'11-ENCARGADO',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14181),
(139,12,'ADM-ADM',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14182);

/*Table structure for table `tb_detalles_control_acceso` */

DROP TABLE IF EXISTS `tb_detalles_control_acceso`;

CREATE TABLE `tb_detalles_control_acceso` (
  `idControlAcceso` int(11) NOT NULL AUTO_INCREMENT,
  `numberSerieFabric` varchar(255) DEFAULT NULL,
  `numberSerieInternal` varchar(255) DEFAULT NULL,
  `dateExpiration` varchar(255) DEFAULT NULL,
  `idProductoFk` int(11) DEFAULT NULL,
  `idServicesFk` int(11) DEFAULT NULL,
  `optAux` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idControlAcceso`)
) ENGINE=InnoDB AUTO_INCREMENT=2088 DEFAULT CHARSET=latin1;

/*Data for the table `tb_detalles_control_acceso` */

insert  into `tb_detalles_control_acceso`(`idControlAcceso`,`numberSerieFabric`,`numberSerieInternal`,`dateExpiration`,`idProductoFk`,`idServicesFk`,`optAux`) values 
(1790,NULL,'123213213213',NULL,15,290,NULL),
(1791,'23423423432324234',NULL,NULL,31,290,NULL),
(1792,NULL,'5235233423432423',NULL,10,290,'entrance'),
(1793,'432432423434234','4545455345323',NULL,8,290,NULL),
(1794,NULL,'456546456546456',NULL,10,290,'exit'),
(1795,'53454354353455','345435435345435',NULL,11,290,NULL),
(1796,'2342342342344','23432423234324',NULL,13,290,NULL),
(1797,'12321321321',NULL,NULL,19,287,NULL),
(1798,'123123213123',NULL,NULL,20,287,NULL),
(1820,NULL,'123123213213213214213',NULL,15,291,NULL),
(1821,'32432423234234234',NULL,NULL,31,291,NULL),
(1822,NULL,'12312312312124124123',NULL,10,291,'entrance'),
(1823,'13123123123123123123','124124123123213213',NULL,8,291,NULL),
(1824,NULL,'12312312312312312323',NULL,10,291,'exit'),
(1825,'23423423423432444','23242344234234324',NULL,11,291,NULL),
(1826,'34543543545545454555','345435435345345435345',NULL,13,291,NULL),
(1864,'1111111111111','1111111111111',NULL,7,277,NULL),
(1865,'2222222222222','2222222222222',NULL,6,277,NULL),
(1866,'33333333333333','33333333333333',NULL,10,277,'entrance'),
(1867,'44444444444444','44444444444444','31/12/2022',8,277,NULL),
(1868,'555555555555555','555555555555555',NULL,10,277,'exit'),
(1869,'88888888888888','88888888888888',NULL,13,277,NULL),
(1870,NULL,NULL,NULL,28,277,NULL),
(1871,'4123213','22412412',NULL,11,277,NULL),
(1879,NULL,'123213123123',NULL,10,288,'entrance'),
(1880,'4234234234234234','23423423423423',NULL,6,288,NULL),
(1881,'455768980897865','123243546464645',NULL,8,288,NULL),
(1882,NULL,'131231312312312312312323123',NULL,10,288,'exit'),
(1883,'665757654785464756','2345654675 46754675',NULL,13,288,NULL),
(1884,'856856858568568568','456765486556856856','31/12/2025',9,288,NULL),
(1885,'123123123123123','123213312123123',NULL,7,288,NULL),
(1886,NULL,NULL,NULL,28,288,NULL),
(1905,'111111111111','111111111111',NULL,16,293,NULL),
(1906,'2222222222222','2222222222222','31/12/2022',9,293,NULL),
(1909,'234234234324','23423234234',NULL,16,296,NULL),
(1910,'667435345234523','2343243256','31/12/2022',9,296,NULL),
(1915,'423434234','3242344',NULL,16,297,NULL),
(1916,'3243243','234324','32/42/3423',9,297,NULL),
(1935,'32432452352342344','123213124323532534',NULL,37,300,NULL),
(1936,'345345463454355','123424543345345','31/12/2022',9,300,NULL),
(1937,'2349823523985723984732','934857349583475984375',NULL,16,301,NULL),
(1938,'6454563464534545','2342354346345645','31/12/2022',9,301,NULL),
(1965,'324324324324234','324324324324234',NULL,19,278,NULL),
(1966,'4657886545676543','4657886545676543',NULL,20,278,NULL),
(1976,'123123',NULL,NULL,19,304,NULL),
(1977,'123123213',NULL,NULL,20,304,NULL),
(2000,'123123123123','123213213123',NULL,23,303,NULL),
(2001,'3213123123123','12312312321',NULL,24,303,NULL),
(2002,'34234523523','42342342342352',NULL,26,303,NULL),
(2024,'322342342343244','11111111111111111',NULL,27,305,NULL),
(2025,'333','3333',NULL,23,305,NULL),
(2026,'4543634','34343',NULL,24,305,NULL),
(2034,NULL,'1',NULL,15,312,NULL),
(2035,'1',NULL,NULL,31,312,NULL),
(2036,NULL,'1',NULL,10,312,'entrance'),
(2037,'3123123','2',NULL,8,312,NULL),
(2038,NULL,'2',NULL,10,312,'exit'),
(2039,'123123','12312',NULL,11,312,NULL),
(2040,'3123123123','12312321',NULL,13,312,NULL),
(2041,'3123123123','1312312',NULL,7,313,NULL),
(2042,'123123123','13123123123',NULL,6,313,NULL),
(2043,NULL,'123123123',NULL,10,313,'entrance'),
(2044,'123123123','123123123',NULL,8,313,NULL),
(2045,'312312321312','12312312',NULL,21,313,'exit'),
(2046,'23123123123','1232131231',NULL,11,313,NULL),
(2047,'123213123','12312323',NULL,13,313,NULL),
(2050,'13123123','123123123',NULL,16,315,NULL),
(2051,NULL,'1312312323','31/12/2022',14,315,NULL),
(2058,'123123123123',NULL,NULL,19,314,NULL),
(2059,'123123123',NULL,NULL,20,314,NULL),
(2060,'222222222222222','111111111111111111',NULL,23,286,NULL),
(2061,'444444444444444','333333333333333',NULL,24,286,NULL),
(2062,'677777777777777777777','666666666666666666666',NULL,26,286,NULL),
(2067,'43543534534',NULL,NULL,19,292,NULL),
(2072,'6666666666666666','6666666666666666',NULL,16,280,NULL),
(2073,'01010101010100101','01010101010100101','01/01/2025',9,280,NULL),
(2074,NULL,'12321321312312','12/32/1312',14,280,NULL),
(2075,'9999999999999999','99999999999999999',NULL,17,280,NULL),
(2084,'234323243242432424','234323243242432424',NULL,16,279,NULL),
(2085,'9919191911919','9919191911919','31/12/2022',9,279,NULL),
(2086,'598434583249234','598434583249234',NULL,17,279,NULL),
(2087,NULL,'55555555555555555','31/12/2041',14,279,NULL);

/*Table structure for table `tb_detination_of_license` */

DROP TABLE IF EXISTS `tb_detination_of_license`;

CREATE TABLE `tb_detination_of_license` (
  `idDetinationOfLicense` int(11) NOT NULL AUTO_INCREMENT,
  `detinationOfLicense` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idDetinationOfLicense`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_detination_of_license` */

insert  into `tb_detination_of_license`(`idDetinationOfLicense`,`detinationOfLicense`) values 
(1,'PROPIETARIO / HABITANTE'),
(2,'ENCARGADO'),
(3,'ADMINISTRACION');

/*Table structure for table `tb_divice_opening` */

DROP TABLE IF EXISTS `tb_divice_opening`;

CREATE TABLE `tb_divice_opening` (
  `idDiviceOpening` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `diviceOpening` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idDiviceOpening`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_divice_opening` */

insert  into `tb_divice_opening`(`idDiviceOpening`,`diviceOpening`) values 
(1,'Llavero marien'),
(2,'Llavero hid'),
(3,'Llavero hid ex'),
(4,'Llaver pct ss'),
(5,'Stiker Vehicular '),
(6,'Movible hid'),
(7,'Movible hid ex');

/*Table structure for table `tb_emergency_button` */

DROP TABLE IF EXISTS `tb_emergency_button`;

CREATE TABLE `tb_emergency_button` (
  `idEmergencyButton` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idEmergencyButton`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `tb_emergency_button` */

insert  into `tb_emergency_button`(`idEmergencyButton`,`titulo`) values 
(1,'PULSADOR DE EMERGENCIA 1'),
(2,'PULSADOR DE EMERGENCIA 2');

/*Table structure for table `tb_font` */

DROP TABLE IF EXISTS `tb_font`;

CREATE TABLE `tb_font` (
  `idFonf` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idFonf`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `tb_font` */

insert  into `tb_font`(`idFonf`,`titulo`) values 
(1,'PRUEBA DE FUENTE');

/*Table structure for table `tb_format_tramitio` */

DROP TABLE IF EXISTS `tb_format_tramitio`;

CREATE TABLE `tb_format_tramitio` (
  `idFormatTramitio` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `formatTramitio` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idFormatTramitio`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_format_tramitio` */

insert  into `tb_format_tramitio`(`idFormatTramitio`,`formatTramitio`) values 
(1,'CONTACT-ID'),
(2,'4+2'),
(3,'SIA'),
(4,'CID');

/*Table structure for table `tb_formato_transmision` */

DROP TABLE IF EXISTS `tb_formato_transmision`;

CREATE TABLE `tb_formato_transmision` (
  `idFormatoTransmision` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idFormatoTransmision`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `tb_formato_transmision` */

insert  into `tb_formato_transmision`(`idFormatoTransmision`,`descripcion`) values 
(1,'CONTACT-ID'),
(2,'4+2'),
(3,'GID'),
(4,'SIA');

/*Table structure for table `tb_franja_horaria_alarmas` */

DROP TABLE IF EXISTS `tb_franja_horaria_alarmas`;

CREATE TABLE `tb_franja_horaria_alarmas` (
  `id_franja_horaria` int(11) NOT NULL AUTO_INCREMENT,
  `day` varchar(255) DEFAULT NULL,
  `fronAm` varchar(255) DEFAULT NULL,
  `toAm` varchar(255) DEFAULT NULL,
  `fronPm` varchar(255) DEFAULT NULL,
  `toPm` varchar(255) DEFAULT NULL,
  `fk_idDatoAdicionalAlarma` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_franja_horaria`)
) ENGINE=InnoDB AUTO_INCREMENT=803 DEFAULT CHARSET=latin1;

/*Data for the table `tb_franja_horaria_alarmas` */

insert  into `tb_franja_horaria_alarmas`(`id_franja_horaria`,`day`,`fronAm`,`toAm`,`fronPm`,`toPm`,`fk_idDatoAdicionalAlarma`) values 
(443,'Lunes','09:00','12:00','13:00','18:00',135),
(444,'Martes','09:00','12:00','13:00','18:00',135),
(445,'Miercoles','09:00','12:00','13:00','18:00',135),
(446,'Jueves','09:00','12:00','13:00','18:00',135),
(447,'Viernes','09:00','12:00','13:00','18:00',135),
(448,'Sabado','09:00','12:00','13:00','18:00',135),
(449,'Lunes','09:00','12:00','13:00','18:00',136),
(450,'Martes','09:00','12:00','13:00','18:00',136),
(451,'Miercoles','09:00','12:00','13:00','18:00',136),
(452,'Jueves','09:00','12:00','13:00','18:00',136),
(453,'Viernes','09:00','12:00','13:00','18:00',136),
(454,'Sabado','09:00','12:00','13:00','18:00',136),
(455,'Lunes','09:00','12:00','13:00','18:00',137),
(456,'Martes','09:00','12:00','13:00','18:00',137),
(457,'Miercoles','09:00','12:00','13:00','18:00',137),
(458,'Jueves','09:00','12:00','13:00','18:00',137),
(459,'Viernes','09:00','12:00','13:00','18:00',137),
(460,'Sabado','09:00','12:00','13:00','18:00',137),
(461,'Lunes','09:00','12:00','13:00','18:00',138),
(462,'Martes','09:00','12:00','13:00','18:00',138),
(463,'Miercoles','09:00','12:00','13:00','18:00',138),
(464,'Jueves','09:00','12:00','13:00','18:00',138),
(465,'Viernes','09:00','12:00','13:00','18:00',138),
(466,'Sabado','09:00','12:00','13:00','18:00',138),
(467,'Lunes','09:00','12:00','13:00','18:00',139),
(468,'Martes','09:00','12:00','13:00','18:00',139),
(469,'Miercoles','09:00','12:00','13:00','18:00',139),
(470,'Jueves','09:00','12:00','13:00','18:00',139),
(471,'Viernes','09:00','12:00','13:00','18:00',139),
(472,'Sabado','09:00','12:00','13:00','18:00',139),
(473,'Lunes','09:00','12:00','13:00','18:00',140),
(474,'Martes','09:00','12:00','13:00','18:00',140),
(475,'Miercoles','09:00','12:00','13:00','18:00',140),
(476,'Jueves','09:00','12:00','13:00','18:00',140),
(477,'Viernes','09:00','12:00','13:00','18:00',140),
(478,'Lunes','09:00','12:00','13:00','18:00',141),
(479,'Martes','09:00','12:00','13:00','18:00',141),
(480,'Miercoles','09:00','12:00','13:00','18:00',141),
(481,'Jueves','09:00','12:00','13:00','18:00',141),
(482,'Viernes','09:00','12:00','13:00','18:00',141),
(483,'Lunes','09:00','12:00','13:00','18:00',142),
(484,'Martes','09:00','12:00','13:00','18:00',142),
(485,'Miercoles','09:00','12:00','13:00','18:00',142),
(486,'Jueves','09:00','12:00','13:00','18:00',142),
(487,'Viernes','09:00','12:00','13:00','18:00',142),
(488,'Lunes','09:00','12:00','13:00','18:00',143),
(489,'Martes','09:00','12:00','13:00','18:00',143),
(490,'Miercoles','09:00','12:00','13:00','18:00',143),
(491,'Jueves','09:00','12:00','13:00','18:00',143),
(492,'Viernes','09:00','12:00','13:00','18:00',143),
(493,'Lunes','09:00','12:00','13:00','18:00',144),
(494,'Martes','09:00','12:00','13:00','18:00',144),
(495,'Miercoles','09:00','12:00','13:00','18:00',144),
(496,'Jueves','09:00','12:00','13:00','18:00',144),
(497,'Viernes','09:00','12:00','13:00','18:00',144),
(498,'Lunes','09:00','12:00','13:00','18:00',145),
(499,'Martes','09:00','12:00','13:00','18:00',145),
(500,'Miercoles','09:00','12:00','13:00','18:00',145),
(501,'Jueves','09:00','12:00','13:00','18:00',145),
(502,'Viernes','09:00','12:00','13:00','18:00',145),
(503,'Lunes','09:00','12:00','13:00','18:00',146),
(504,'Martes','09:00','12:00','13:00','18:00',146),
(505,'Miercoles','09:00','12:00','13:00','18:00',146),
(506,'Jueves','09:00','12:00','13:00','18:00',146),
(507,'Viernes','09:00','12:00','13:00','18:00',146),
(508,'Lunes','09:00','12:00','13:00','18:00',147),
(509,'Martes','09:00','12:00','13:00','18:00',147),
(510,'Miercoles','09:00','12:00','13:00','18:00',147),
(511,'Jueves','09:00','12:00','13:00','18:00',147),
(512,'Viernes','09:00','12:00','13:00','18:00',147),
(513,'Lunes','09:00','12:00','13:00','18:00',148),
(514,'Martes','09:00','12:00','13:00','18:00',148),
(515,'Miercoles','09:00','12:00','13:00','18:00',148),
(516,'Jueves','09:00','12:00','13:00','18:00',148),
(517,'Viernes','09:00','12:00','13:00','18:00',148),
(518,'Lunes','09:00','12:00','13:00','18:00',149),
(519,'Martes','09:00','12:00','13:00','18:00',149),
(520,'Miercoles','09:00','12:00','13:00','18:00',149),
(521,'Jueves','09:00','12:00','13:00','18:00',149),
(522,'Viernes','09:00','12:00','13:00','18:00',149),
(523,'Lunes','09:00','12:00','13:00','18:00',150),
(524,'Martes','09:00','12:00','13:00','18:00',150),
(525,'Miercoles','09:00','12:00','13:00','18:00',150),
(526,'Jueves','09:00','12:00','13:00','18:00',150),
(527,'Viernes','09:00','12:00','13:00','18:00',150),
(528,'Sabado','09:00','12:00','13:00','18:00',150),
(529,'Lunes','09:00','12:00','13:00','18:00',151),
(530,'Martes','09:00','12:00','13:00','18:00',151),
(531,'Miercoles','09:00','12:00','13:00','18:00',151),
(532,'Jueves','09:00','12:00','13:00','18:00',151),
(533,'Viernes','09:00','12:00','13:00','18:00',151),
(534,'Sabado','09:00','12:00','13:00','18:00',151),
(535,'Lunes','09:00','12:00','13:00','18:00',152),
(536,'Martes','09:00','12:00','13:00','18:00',152),
(537,'Miercoles','09:00','12:00','13:00','18:00',152),
(538,'Jueves','09:00','12:00','13:00','18:00',152),
(539,'Viernes','09:00','12:00','13:00','18:00',152),
(540,'Sabado','09:00','12:00','13:00','18:00',152),
(541,'Lunes','09:00','12:00','13:00','18:00',153),
(542,'Martes','09:00','12:00','13:00','18:00',153),
(543,'Miercoles','09:00','12:00','13:00','18:00',153),
(544,'Jueves','09:00','12:00','13:00','18:00',153),
(545,'Viernes','09:00','12:00','13:00','18:00',153),
(546,'Sabado','09:00','12:00','13:00','18:00',153),
(547,'Lunes','09:00','12:00','13:00','18:00',154),
(548,'Martes','09:00','12:00','13:00','18:00',154),
(549,'Miercoles','09:00','12:00','13:00','18:00',154),
(550,'Jueves','09:00','12:00','13:00','18:00',154),
(551,'Viernes','09:00','12:00','13:00','18:00',154),
(552,'Sabado','09:00','12:00','13:00','18:00',154),
(553,'Lunes','09:00','12:00','13:00','18:00',155),
(554,'Martes','09:00','12:00','13:00','18:00',155),
(555,'Miercoles','09:00','12:00','13:00','18:00',155),
(556,'Jueves','09:00','12:00','13:00','18:00',155),
(557,'Viernes','09:00','12:00','13:00','18:00',155),
(558,'Sabado','09:00','12:00','13:00','18:00',155),
(559,'Lunes','09:00','12:00','13:00','18:00',156),
(560,'Martes','09:00','12:00','13:00','18:00',156),
(561,'Miercoles','09:00','12:00','13:00','18:00',156),
(562,'Jueves','09:00','12:00','13:00','18:00',156),
(563,'Viernes','09:00','12:00','13:00','18:00',156),
(564,'Sabado','09:00','12:00','13:00','18:00',156),
(565,'Lunes','09:00','12:00','13:00','18:00',157),
(566,'Martes','09:00','12:00','13:00','18:00',157),
(567,'Miercoles','09:00','12:00','13:00','18:00',157),
(568,'Jueves','09:00','12:00','13:00','18:00',157),
(569,'Viernes','09:00','12:00','13:00','18:00',157),
(570,'Sabado','09:00','12:00','13:00','18:00',157),
(571,'Lunes','08:00','12:00','17:00','20:00',158),
(572,'Martes','08:00','12:00','17:00','20:00',158),
(573,'Miercoles','08:00','12:00','17:00','20:00',158),
(574,'Jueves','08:00','12:00','17:00','20:00',158),
(575,'Viernes','08:00','12:00','17:00','20:00',158),
(576,'Lunes','08:00','12:00','17:00','20:00',159),
(577,'Martes','08:00','12:00','17:00','20:00',159),
(578,'Miercoles','08:00','12:00','17:00','20:00',159),
(579,'Jueves','08:00','12:00','17:00','20:00',159),
(580,'Viernes','08:00','12:00','17:00','20:00',159),
(601,'Lunes','08:00','12:00','17:00','20:00',164),
(602,'Martes','08:00','12:00','17:00','20:00',164),
(603,'Miercoles','08:00','12:00','17:00','20:00',164),
(604,'Jueves','08:00','12:00','17:00','20:00',164),
(605,'Viernes','08:00','12:00','17:00','20:00',164),
(606,'lunes','07:00','12:00','17:00','20:00',165),
(607,'martes','07:00','12:00','17:00','20:00',165),
(608,'Lunes','08:00','12:00','17:00','20:00',166),
(609,'Martes','08:00','12:00','17:00','20:00',166),
(610,'Miercoles','08:00','12:00','17:00','20:00',166),
(611,'Jueves','08:00','12:00','17:00','20:00',166),
(612,'Viernes','08:00','12:00','17:00','20:00',166),
(613,'Lunes','08:00','12:00','17:00','20:00',167),
(614,'Martes','08:00','12:00','17:00','20:00',167),
(615,'Miercoles','08:00','12:00','17:00','20:00',167),
(616,'Jueves','08:00','12:00','17:00','20:00',167),
(617,'Viernes','08:00','12:00','17:00','20:00',167),
(750,'Lunes','08:00','12:00','17:00','20:00',192),
(751,'Martes','08:00','12:00','17:00','20:00',192),
(752,'Miercoles','08:00','12:00','17:00','20:00',192),
(753,'Jueves','08:00','12:00','17:00','20:00',192),
(754,'Viernes','08:00','12:00','17:00','20:00',192),
(785,'Lunes','08:00','12:00','17:00','20:00',201),
(786,'Martes','08:00','12:00','17:00','20:00',201),
(787,'Miercoles','08:00','12:00','17:00','20:00',201),
(788,'Jueves','08:00','12:00','17:00','20:00',201),
(789,'Viernes','08:00','12:00','17:00','20:00',201),
(790,'Lunes','08:00','12:00','17:00','20:00',210),
(791,'Martes','08:00','12:00','17:00','20:00',210),
(792,'Miercoles','08:00','12:00','17:00','20:00',210),
(793,'Jueves','08:00','12:00','17:00','20:00',210),
(794,'Viernes','08:00','12:00','17:00','20:00',210),
(795,'Sabado','08:00','12:00','17:00','20:00',210),
(796,'Domingo','08:00','12:00','17:00','20:00',210),
(797,'Lunes','08:00','12:00','17:00','20:00',211),
(798,'Martes','08:00','12:00','17:00','20:00',211),
(799,'Miercoles','08:00','12:00','17:00','20:00',211),
(800,'Jueves','08:00','12:00','17:00','20:00',211),
(801,'Viernes','08:00','12:00','17:00','20:00',211),
(802,'Sabado','08:00','12:00','13:00','18:00',211);

/*Table structure for table `tb_input_reader` */

DROP TABLE IF EXISTS `tb_input_reader`;

CREATE TABLE `tb_input_reader` (
  `idInputReader` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idInputReader`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `tb_input_reader` */

insert  into `tb_input_reader`(`idInputReader`,`titulo`) values 
(1,'LECTOR DE SALIDA'),
(2,'PULSADOR DE SALIDA');

/*Table structure for table `tb_internet_company` */

DROP TABLE IF EXISTS `tb_internet_company`;

CREATE TABLE `tb_internet_company` (
  `idInternetCompany` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `internetCompany` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idInternetCompany`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_internet_company` */

insert  into `tb_internet_company`(`idInternetCompany`,`internetCompany`) values 
(1,'TELECENTRO'),
(2,'FIBERTEL'),
(3,'MOVISTAR'),
(4,'FIBERCORP'),
(5,'PERSONAL'),
(6,'CLARO');

/*Table structure for table `tb_keychain` */

DROP TABLE IF EXISTS `tb_keychain`;

CREATE TABLE `tb_keychain` (
  `idKeychain` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idProductKf` varchar(255) DEFAULT NULL,
  `codExt` varchar(255) DEFAULT NULL,
  `codigo` varchar(255) DEFAULT NULL,
  `idDepartmenKf` int(11) DEFAULT NULL COMMENT 'Departamento',
  `idClientKf` int(11) DEFAULT NULL COMMENT 'Cliente tipo Edificio',
  `idUserKf` int(11) DEFAULT NULL COMMENT 'Habitante',
  `idCategoryKf` int(11) DEFAULT NULL,
  `isKeyTenantOnly` tinyint(1) DEFAULT NULL COMMENT 'Se habilita para que el usuario se pueda asociar al inquilino',
  PRIMARY KEY (`idKeychain`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=latin1;

/*Data for the table `tb_keychain` */

insert  into `tb_keychain`(`idKeychain`,`idProductKf`,`codExt`,`codigo`,`idDepartmenKf`,`idClientKf`,`idUserKf`,`idCategoryKf`,`isKeyTenantOnly`) values 
(1,'1','1','0',1,1,NULL,1,1),
(2,'1','1','0',1,1,NULL,1,1),
(3,'41','lorem ipsum','08119109',2,0,NULL,0,NULL),
(4,'41','lorem ipsum','08119110',2,0,NULL,0,NULL),
(5,'41','lorem ipsum','08119111',3,0,NULL,0,NULL),
(6,'41','lorem ipsum','08119112',3,0,NULL,0,NULL),
(7,'41','lorem ipsum','08119113',3,0,NULL,0,NULL),
(8,'41','lorem ipsum','08119114',4,0,NULL,0,NULL),
(9,'41','lorem ipsum','08119115',4,0,NULL,0,NULL),
(10,'41','lorem ipsum','08119116',4,0,NULL,0,NULL),
(11,'41','lorem ipsum','08119117',4,0,NULL,0,NULL),
(12,'41','lorem ipsum','08119118',5,0,NULL,0,NULL),
(13,'41','lorem ipsum','08119119',6,0,NULL,0,NULL),
(14,'41','lorem ipsum','08119120',7,0,NULL,0,NULL),
(15,'41','lorem ipsum','08119121',8,0,NULL,0,NULL),
(16,'41','lorem ipsum','08119122',9,0,NULL,0,NULL),
(17,'41','lorem ipsum','08119123',10,0,NULL,0,NULL),
(18,'41','lorem ipsum','08119124',11,0,NULL,0,NULL),
(19,'41','lorem ipsum','08119125',12,0,NULL,0,NULL),
(20,'41','lorem ipsum','08119126',13,0,NULL,0,NULL),
(21,'41','lorem ipsum','08119127',14,0,NULL,0,NULL),
(22,'41','lorem ipsum','08119128',15,0,NULL,0,NULL),
(23,'41','lorem ipsum','08119129',16,0,NULL,0,NULL),
(24,'41','lorem ipsum','08119130',17,0,NULL,0,NULL),
(25,'41','lorem ipsum','08119131',18,0,NULL,0,NULL),
(26,'41','lorem ipsum','08119132',19,0,NULL,0,NULL),
(27,'41','lorem ipsum','08119133',20,0,NULL,0,NULL),
(28,'41','lorem ipsum','08119134',21,0,NULL,0,NULL),
(29,'41','lorem ipsum','08119135',22,0,NULL,0,NULL),
(30,'41','lorem ipsum','08119136',23,0,NULL,0,NULL),
(31,'41','lorem ipsum','08119137',24,0,NULL,0,NULL),
(32,'41','lorem ipsum','08119138',25,0,NULL,0,NULL),
(33,'41','lorem ipsum','08119139',26,0,NULL,0,NULL),
(34,'41','lorem ipsum','08119140',27,0,NULL,0,NULL),
(35,'41','lorem ipsum','08119141',28,0,NULL,0,NULL),
(36,'41','lorem ipsum','08119142',29,0,NULL,0,NULL),
(37,'41','lorem ipsum','08119143',30,0,NULL,0,NULL),
(38,'41','lorem ipsum','08119144',31,0,NULL,0,NULL),
(39,'41','lorem ipsum','08119145',32,0,NULL,0,NULL),
(40,'41','lorem ipsum','08119146',33,0,NULL,0,NULL),
(41,'41','lorem ipsum','08119147',34,0,NULL,0,NULL),
(42,'41','lorem ipsum','08119148',35,0,NULL,0,NULL),
(43,'41','lorem ipsum','08119149',36,0,NULL,0,NULL),
(44,'41','lorem ipsum','08119150',37,0,NULL,0,NULL),
(45,'41','lorem ipsum','08119151',38,0,NULL,0,NULL),
(46,'41','lorem ipsum','08119152',39,0,NULL,0,NULL),
(47,'41','lorem ipsum','08119153',40,0,NULL,0,NULL),
(48,'41','lorem ipsum','08119154',41,0,NULL,0,NULL),
(49,'41','lorem ipsum','08119155',42,0,NULL,0,NULL),
(50,'41','lorem ipsum','08119156',43,0,NULL,0,NULL),
(51,'41','lorem ipsum','08119157',44,0,NULL,0,NULL),
(52,'41','lorem ipsum','08119158',45,0,NULL,0,NULL),
(53,'41','lorem ipsum','08119159',46,0,NULL,0,NULL),
(54,'41','lorem ipsum','08119160',47,0,NULL,0,NULL),
(55,'41','lorem ipsum','08119161',48,0,NULL,0,NULL),
(56,'41','lorem ipsum','08119162',49,0,NULL,0,NULL),
(57,'41','lorem ipsum','08119163',50,0,NULL,0,NULL),
(58,'41','lorem ipsum','08119164',51,0,NULL,0,NULL),
(59,'41','lorem ipsum','08119165',52,0,NULL,0,NULL),
(60,'41','lorem ipsum','08119166',53,0,NULL,0,NULL),
(61,'41','lorem ipsum','08119167',54,0,NULL,0,NULL),
(62,'41','lorem ipsum','08119168',55,0,NULL,0,NULL),
(63,'41','lorem ipsum','08119169',56,0,NULL,0,NULL),
(64,'41','lorem ipsum','08119170',57,0,NULL,0,NULL),
(65,'41','lorem ipsum','08119171',58,0,NULL,0,NULL),
(66,'41','lorem ipsum','08119172',0,3,NULL,0,NULL),
(67,'41','lorem ipsum','08119173',0,3,NULL,0,NULL),
(68,'41','lorem ipsum','08119174',0,3,NULL,0,NULL);

/*Table structure for table `tb_keychains_history` */

DROP TABLE IF EXISTS `tb_keychains_history`;

CREATE TABLE `tb_keychains_history` (
  `idKeyHistory` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idUserKf` int(11) DEFAULT NULL COMMENT 'Usuario del llavero',
  `idKeychainKf` int(11) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `idTicketsKf` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `idUserAdmin` int(11) DEFAULT NULL COMMENT '(Usuario que ejecuta la accion, no siempre estara lleno pues puede venir de un ticket) id Usuario de administracion o usuario del sistema',
  PRIMARY KEY (`idKeyHistory`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `tb_keychains_history` */

/*Table structure for table `tb_location` */

DROP TABLE IF EXISTS `tb_location`;

CREATE TABLE `tb_location` (
  `idLocation` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `location` varchar(100) DEFAULT NULL,
  `idProvinceFK` int(11) DEFAULT NULL COMMENT 'ID DE LA PROVINCIA A LA QUE SE ASOCIA LA LOCALIDAD',
  PRIMARY KEY (`idLocation`)
) ENGINE=InnoDB AUTO_INCREMENT=943 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_location` */

insert  into `tb_location`(`idLocation`,`location`,`idProvinceFK`) values 
(1,'CIUDAD DE BUENOS AIRES',1),
(2,'CONSTITUCION',1),
(3,'MONSERRAT',1),
(4,'PUERTO MADERO',1),
(5,'RETIRO',1),
(6,'SAN NICOLAS',1),
(7,'SAN TELMO',1),
(8,'RECOLETA',1),
(9,'BALVANERA',1),
(10,'SAN CRISTOBAL',1),
(11,'BARRACAS',1),
(12,'BOCA',1),
(13,'NUEVA POMPEYA',1),
(14,'PARQUE PATRICIOS',1),
(15,'ALMAGRO',1),
(16,'BOEDO',1),
(17,'CABALLITO',1),
(18,'FLORES',1),
(19,'PARQUE CHACABUCO',1),
(20,'VILLA LUGANO',1),
(21,'VILLA RIACHUELO',1),
(22,'VILLA SOLDATI',1),
(23,'LINIERS',1),
(24,'MATADEROS',1),
(25,'PARQUE AVELLANEDA',1),
(26,'FLORESTA',1),
(27,'MONTE CASTRO',1),
(28,'VELEZ SARSFIELD',1),
(29,'VERSALLES',1),
(30,'VILLA LURO',1),
(31,'VILLA REAL',1),
(32,'VILLA DEL PARQUE',1),
(33,'VILLA DEVOTO',1),
(34,'VILLA GENERAL MITRE',1),
(35,'VILLA SANTA RITA',1),
(36,'COGHLAN',1),
(37,'SAAVEDRA',1),
(38,'VILLA PUEYRREDON',1),
(39,'VILLA URQUIZA',1),
(40,'BELGRANO',1),
(41,'COLEGIALES',1),
(42,'NUÑEZ',1),
(43,'PALERMO',1),
(44,'AGRONOMIA',1),
(45,'CHACARITA',1),
(46,'PARQUE CHAS',1),
(47,'PATERNAL',1),
(48,'VILLA CRESPO',1),
(49,'VILLA ORTUZAR',1),
(50,'CARHUE',2),
(51,'COLONIA SAN MIGUEL ARCANGEL',2),
(52,'DELFIN HUERGO',2),
(53,'ESPARTILLAR',2),
(54,'ESTEBAN AGUSTIN GASCON',2),
(55,'LA PALA',2),
(56,'MAZA',2),
(57,'RIVERA',2),
(58,'VILLA MARGARITA',2),
(59,'YUTUYACO',2),
(60,'ADOLFO GONZALES CHAVES',2),
(61,'DE LA GARMA',2),
(62,'JUAN E. BARRA',2),
(63,'VASQUEZ',2),
(64,'ALBERTI',2),
(65,'CORONEL SEGUI',2),
(66,'MECHITA',2),
(67,'PLA',2),
(68,'VILLA GRISOLIA',2),
(69,'VILLA MARIA',2),
(70,'VILLA ORTIZ',2),
(71,'ADROGUE',2),
(72,'BURZACO',2),
(73,'CLAYPOLE',2),
(74,'DON ORIONE',2),
(75,'GLEW',2),
(76,'JOSE MARMOL',2),
(77,'LONGCHAMPS',2),
(78,'MALVINAS ARGENTINAS',2),
(79,'MINISTRO RIVADAVIA',2),
(80,'RAFAEL CALZADA',2),
(81,'SAN FRANCISCO SOLANO',2),
(82,'SAN JOSE',2),
(83,'AREA CINTURON ECOLOGICO',2),
(84,'AVELLANEDA',2),
(85,'CRUCESITA',2),
(86,'DOCK SUD',2),
(87,'GERLI',2),
(88,'PIÑEYRO',2),
(89,'SARANDI',2),
(90,'VILLA DOMINICO',2),
(91,'WILDE',2),
(92,'AYACUCHO',2),
(93,'LA CONSTANCIA',2),
(94,'SOLANET',2),
(95,'UDAQUIOLA',2),
(96,'ARIEL',2),
(97,'AZUL',2),
(98,'CACHARI',2),
(99,'CHILLAR',2),
(100,'16 DE JULIO',2),
(101,'BAHIA BLANCA',2),
(102,'GRÜNBEIN',2),
(103,'INGENIERO WHITE',2),
(104,'VILLA BORDEAU',2),
(105,'VILLA ESPORA',2),
(106,'CABILDO',2),
(107,'GENERAL DANIEL CERRI',2),
(108,'BALCARCE',2),
(109,'LOS PINOS',2),
(110,'NAPALEOFU',2),
(111,'RAMOS OTERO',2),
(112,'SAN AGUSTIN',2),
(113,'VILLA LAGUNA LA BRAVA',2),
(114,'BARADERO',2),
(115,'IRINEO PORTELA',2),
(116,'SANTA COLOMA',2),
(117,'VILLA ALSINA',2),
(118,'ARRECIFES',2),
(119,'TODD',2),
(120,'VI¥A',2),
(121,'BARKER',2),
(122,'BENITO JUAREZ',2),
(123,'LOPEZ',2),
(124,'TEDIN URIBURU',2),
(125,'VILLA CACIQUE',2),
(126,'BERAZATEGUI',2),
(127,'BERAZATEGUI OESTE',2),
(128,'CARLOS TOMAS SOURIGUES',2),
(129,'EL PATO',2),
(130,'GUILLERMO ENRIQUE HUDSON',2),
(131,'JUAN MARIA GUTIERREZ',2),
(132,'PEREYRA',2),
(133,'PLATANOS',2),
(134,'RANELAGH',2),
(135,'VILLA ESPAÑA',2),
(136,'BARRIO BANCO PROVINCIA',2),
(137,'BARRIO EL CARMEN (ESTE)',2),
(138,'BARRIO UNIVERSITARIO',2),
(139,'BERISSO',2),
(140,'LOS TALAS',2),
(141,'VILLA ARGÜELLO',2),
(142,'VILLA DOLORES',2),
(143,'VILLA INDEPENDENCIA',2),
(144,'VILLA NUEVA',2),
(145,'VILLA PORTEÑA',2),
(146,'VILLA PROGRESO',2),
(147,'VILLA SAN CARLOS',2),
(148,'VILLA ZULA',2),
(149,'HALE',2),
(150,'JUAN F. IBARRA',2),
(151,'PAULA',2),
(152,'PIROVANO',2),
(153,'SAN CARLOS DE BOLIVAR',2),
(154,'URDAMPILLETA',2),
(155,'VILLA LYNCH PUEYRREDON',2),
(156,'ASAMBLEA',2),
(157,'BRAGADO',2),
(158,'COMODORO PY',2),
(159,'GENERAL O\'BRIEN',2),
(160,'IRALA',2),
(161,'LA LIMPIA',2),
(162,'MAXIMO FERNANDEZ',2),
(163,'MECHITA',2),
(164,'OLASCOAGA',2),
(165,'WARNES',2),
(166,'ALTAMIRANO',2),
(167,'BARRIO EL MIRADOR',2),
(168,'BARRIO LAS GOLONDRINAS',2),
(169,'BARRIO LOS BOSQUECITOS',2),
(170,'BARRIO PARQUE LAS ACACIAS',2),
(171,'CAMPOS DE ROCA',2),
(172,'CORONEL BRANDSEN',2),
(173,'CLUB DE CAMPO LAS MALVINAS',2),
(174,'GOMEZ',2),
(175,'JEPPENER',2),
(176,'OLIDEN',2),
(177,'POSADA DE LOS LAGOS',2),
(178,'SAMBOROMBON',2),
(179,'ALTO LOS CARDALES',2),
(180,'BARRIO LOS PIONEROS',2),
(181,'CAMPANA',2),
(182,'CHACRAS DEL RIO LUJAN',2),
(183,'LOMAS DEL RIO LUJAN',2),
(184,'ALEJANDRO PETION',2),
(185,'BARRIO EL TALADRO',2),
(186,'CA¥UELAS',2),
(187,'GOBERNADOR UDAONDO',2),
(188,'BARRIO BELGRANO',2),
(189,'MAXIMO PAZ',2),
(190,'SANTA ROSA',2),
(191,'URIBELARREA',2),
(192,'VICENTE CASARES',2),
(193,'CAPITAN SARMIENTO',2),
(194,'LA LUISA',2),
(195,'BELLOCQ',2),
(196,'CADRET',2),
(197,'CARLOS CASARES',2),
(198,'COLONIA MAURICIO',2),
(199,'HORTENSIA',2),
(200,'LA SOFIA',2),
(201,'MAURICIO HIRSCH',2),
(202,'MOCTEZUMA',2),
(203,'ORDOQUI',2),
(204,'SANTO TOMAS',2),
(205,'SMITH',2),
(206,'CARLOS TEJEDOR',2),
(207,'COLONIA SERE',2),
(208,'CURARU',2),
(209,'TIMOTE',2),
(210,'TRES ALGARROBOS',2),
(211,'CARMEN DE ARECO',2),
(212,'PUEBLO GOUIN',2),
(213,'TRES SARGENTOS',2),
(214,'CASTELLI',2),
(215,'CENTRO GUERRERO',2),
(216,'CERRO DE LA GLORIA (CANAL 15)',2),
(217,'COLON',2),
(218,'EL ARBOLITO',2),
(219,'PEARSON',2),
(220,'SARASA',2),
(221,'BAJO HONDO',2),
(222,'BALNEARIO PEHUEN CO',2),
(223,'PAGO CHICO',2),
(224,'PUNTA ALTA',2),
(225,'PUNTA ALTA',2),
(226,'VILLA DEL MAR',2),
(227,'VILLA GENERAL ARIAS',2),
(228,'APARICIO',2),
(229,'BALNEARIO MARISOL',2),
(230,'CORONEL DORREGO',2),
(231,'EL PERDIDO',2),
(232,'FARO',2),
(233,'IRENE',2),
(234,'ORIENTE',2),
(235,'LA RUTA',2),
(236,'SAN ROMAN',2),
(237,'CORONEL PRINGLES',2),
(238,'EL DIVISORIO',2),
(239,'EL PENSAMIENTO',2),
(240,'INDIO RICO',2),
(241,'LARTIGAU',2),
(242,'CASCADAS',2),
(243,'CORONEL SUAREZ',2),
(244,'CURA MALAL',2),
(245,'D\'ORBIGNY',2),
(246,'HUANGUELEN',2),
(247,'PASMAN',2),
(248,'SAN JOSE',2),
(249,'SANTA MARIA',2),
(250,'SANTA TRINIDAD',2),
(251,'VILLA LA ARCADIA',2),
(252,'CASTILLA',2),
(253,'CHACABUCO',2),
(254,'LOS ANGELES',2),
(255,'O\'HIGGINS',2),
(256,'RAWSON',2),
(257,'BARRIO LOMAS ALTAS',2),
(258,'CHASCOMUS',2),
(259,'BARRIO SAN CAYETANO',2),
(260,'LAGUNA VITEL',2),
(261,'MANUEL J. COBO',2),
(262,'VILLA PARQUE GIRADO',2),
(263,'BENITEZ',2),
(264,'CHIVILCOY',2),
(265,'EMILIO AYARZA',2),
(266,'GOROSTIAGA',2),
(267,'LA RICA',2),
(268,'MOQUEHUA',2),
(269,'RAMON BIAUS',2),
(270,'SAN SEBASTIAN',2),
(271,'ANDANT',2),
(272,'ARBOLEDAS',2),
(273,'DAIREAUX',2),
(274,'LA LARGA',2),
(275,'SALAZAR',2),
(276,'DOLORES',2),
(277,'SEVIGNE',2),
(278,'DIQUE Nº 1',2),
(279,'ENSENADA',2),
(280,'ISLA SANTIAGO (OESTE)',2),
(281,'PUNTA LARA',2),
(282,'VILLA CATELA',2),
(283,'BELEN DE ESCOBAR',2),
(284,'EL CAZADOR',2),
(285,'GARIN',2),
(286,'INGENIERO MASCHWITZ',2),
(287,'LOMA VERDE',2),
(288,'MATHEU',2),
(289,'MAQUINISTA F. SAVIO ESTE',2),
(290,'CANNING',2),
(291,'EL JAGÜEL',2),
(292,'LUIS GUILLON',2),
(293,'MONTE GRANDE',2),
(294,'9 DE ABRIL',2),
(295,'ARROYO DE LA CRUZ',2),
(296,'CAPILLA DEL SE¥OR',2),
(297,'DIEGO GAYNOR',2),
(298,'LOS CARDALES',2),
(299,'PARADA ORLANDO',2),
(300,'EL REMANSO',2),
(301,'PARADA ROBLES',2),
(302,'PAVON',2),
(303,'AEROPUERTO INTERNACIONAL EZEIZA',2),
(304,'CANNING',2),
(305,'CARLOS SPEGAZZINI',2),
(306,'JOSE MARIA EZEIZA',2),
(307,'LA UNION',2),
(308,'TRISTAN SUAREZ',2),
(309,'BOSQUES',2),
(310,'ESTANISLAO SEVERO ZEBALLOS',2),
(311,'FLORENCIO VARELA',2),
(312,'GOBERNADOR JULIO A. COSTA',2),
(313,'INGENIERO JUAN ALLAN',2),
(314,'VILLA BROWN',2),
(315,'VILLA SAN LUIS',2),
(316,'VILLA SANTA ROSA',2),
(317,'VILLA VATTEONE',2),
(318,'EL TROPEZON',2),
(319,'LA CAPILLA',2),
(320,'BLAQUIER',2),
(321,'FLORENTINO AMEGHINO',2),
(322,'PORVENIR',2),
(323,'CENTINELA DEL MAR',2),
(324,'COMANDANTE NICANOR OTAMENDI',2),
(325,'MAR DEL SUR',2),
(326,'MECHONGUE',2),
(327,'MIRAMAR',2),
(328,'GENERAL ALVEAR',2),
(329,'ARRIBE¥OS',2),
(330,'ASCENSION',2),
(331,'ESTACION ARENALES',2),
(332,'FERRE',2),
(333,'GENERAL ARENALES',2),
(334,'LA ANGELITA',2),
(335,'LA TRINIDAD',2),
(336,'GENERAL BELGRANO',2),
(337,'GORCHS',2),
(338,'GENERAL GUIDO',2),
(339,'LABARDEN',2),
(340,'BARRIO KENNEDY',2),
(341,'GENERAL JUAN MADARIAGA',2),
(342,'GENERAL LA MADRID',2),
(343,'LA COLINA',2),
(344,'LAS MARTINETAS',2),
(345,'LIBANO',2),
(346,'PONTAUT',2),
(347,'GENERAL HORNOS',2),
(348,'GENERAL LAS HERAS',2),
(349,'LA CHOZA',2),
(350,'PLOMER',2),
(351,'VILLARS',2),
(352,'GENERAL LAVALLE',2),
(353,'PAVON',2),
(354,'BARRIO RIO SALADO',2),
(355,'LOMA VERDE',2),
(356,'RANCHOS',2),
(357,'VILLANUEVA',2),
(358,'COLONIA SAN RICARDO',2),
(359,'GENERAL PINTO',2),
(360,'GERMANIA',2),
(361,'GUNTHER',2),
(362,'VILLA FRANCIA',2),
(363,'VILLA ROTH',2),
(364,'BARRIO EL BOQUERON',2),
(365,'BARRIO LA GLORIA',2),
(366,'BARRIO SANTA PAULA',2),
(367,'BATAN',2),
(368,'CHAPADMALAL',2),
(369,'EL MARQUESADO',2),
(370,'ESTACION CHAPADMALAL',2),
(371,'CAMET',2),
(372,'ESTACION CAMET',2),
(373,'MAR DEL PLATA',2),
(374,'PUNTA MOGOTES',2),
(375,'BARRIO EL CASAL',2),
(376,'SIERRA DE LOS PADRES',2),
(377,'BARRIO COLINAS VERDES',2),
(378,'BARRIO EL COYUNCO',2),
(379,'SIERRA DE LOS PADRES',2),
(380,'GENERAL RODRIGUEZ',2),
(381,'BARRIO MORABO',2),
(382,'BARRIO RUTA 24 KM. 10',2),
(383,'C.C. BOSQUE REAL',2),
(384,'GENERAL RODRGUEZ',2),
(385,'BARRIO PARQUE GENERAL SAN MARTIN',2),
(386,'BILLINGHURST',2),
(387,'CIUDAD DEL LIBERTADOR GENERAL SAN MARTIN',2),
(388,'CIUDAD JARDIN EL LIBERTADOR',2),
(389,'VILLA AYACUCHO',2),
(390,'VILLA BALLESTER',2),
(391,'VILLA BERNARDO MONTEAGUDO',2),
(392,'VILLA CHACABUCO',2),
(393,'VILLA CORONEL JOSE M. ZAPIOLA',2),
(394,'VILLA GENERAL ANTONIO J. DE SUCRE',2),
(395,'VILLA GENERAL EUGENIO NECOCHEA',2),
(396,'VILLA GENERAL JOSE TOMAS GUIDO',2),
(397,'VILLA GENERAL JUAN G. LAS HERAS',2),
(398,'VILLA GODOY CRUZ',2),
(399,'VILLA GRANADEROS DE SAN MARTIN',2),
(400,'VILLA GREGORIA MATORRAS',2),
(401,'VILLA JOSE LEON SUAREZ',2),
(402,'VILLA JUAN MARTIN DE PUEYRREDON',2),
(403,'VILLA LIBERTAD',2),
(404,'VILLA LYNCH',2),
(405,'VILLA MAIPU',2),
(406,'VILLA MARIA IRENE DE LOS REMEDIOS DE ESCALADA',2),
(407,'VILLA MARQUES ALEJANDRO MARIA DE AGUADO',2),
(408,'VILLA PARQUE PRESIDENTE FIGUEROA ALCORTA',2),
(409,'VILLA PARQUE SAN LORENZO',2),
(410,'VILLA SAN ANDRES',2),
(411,'VILLA YAPEYU',2),
(412,'BAIGORRITA',2),
(413,'LA DELFINA',2),
(414,'LOS TOLDOS',2),
(415,'SAN EMILIO',2),
(416,'ZAVALIA',2),
(417,'BANDERALO',2),
(418,'CA¥ADA SECA',2),
(419,'CORONEL CHARLONE',2),
(420,'EMILIO V. BUNGE',2),
(421,'GENERAL VILLEGAS',2),
(422,'MASSEY',2),
(423,'PICHINCHA',2),
(424,'PIEDRITAS',2),
(425,'SANTA ELEODORA',2),
(426,'SANTA REGINA',2),
(427,'VILLA SABOYA',2),
(428,'VILLA SAUZE',2),
(429,'ARROYO VENADO',2),
(430,'CASBAS',2),
(431,'GARRE',2),
(432,'GUAMINI',2),
(433,'LAGUNA ALSINA',2),
(434,'HENDERSON',2),
(435,'HERRERA VEGAS',2),
(436,'HURLINGHAM',2),
(437,'VILLA SANTOS TESEI',2),
(438,'WILLIAM C. MORRIS',2),
(439,'ITUZAINGO CENTRO',2),
(440,'ITUZAINGO SUR',2),
(441,'VILLA GOBERNADOR UDAONDO',2),
(442,'DEL VISO',2),
(443,'JOSE C. PAZ',2),
(444,'TORTUGUITAS',2),
(445,'AGUSTIN ROCA',2),
(446,'AGUSTINA',2),
(447,'BALNEARIO LAGUNA DE GOMEZ',2),
(448,'FORTIN TIBURCIO',2),
(449,'JUNIN',2),
(450,'LA AGRARIA',2),
(451,'LAPLACETTE',2),
(452,'MORSE',2),
(453,'SAFORCADA',2),
(454,'LAS TONINAS',2),
(455,'AGUAS VERDES',2),
(456,'LUCILA DEL MAR',2),
(457,'MAR DE AJO',2),
(458,'MAR DE AJO NORTE',2),
(459,'SAN BERNARDO',2),
(460,'SAN CLEMENTE DEL TUYU',2),
(461,'MAR DEL TUYU',2),
(462,'SANTA TERESITA',2),
(463,'ALDO BONZI',2),
(464,'CIUDAD EVITA',2),
(465,'GONZALEZ CATAN',2),
(466,'GREGORIO DE LAFERRERE',2),
(467,'ISIDRO CASANOVA',2),
(468,'LA TABLADA',2),
(469,'LOMAS DEL MIRADOR',2),
(470,'RAFAEL CASTILLO',2),
(471,'RAMOS MEJIA',2),
(472,'SAN JUSTO',2),
(473,'TAPIALES',2),
(474,'20 DE JUNIO',2),
(475,'VILLA EDUARDO MADERO',2),
(476,'VILLA LUZURIAGA',2),
(477,'VIRREY DEL PINO',2),
(478,'GERLI',2),
(479,'LANUS ESTE',2),
(480,'LANUS OESTE',2),
(481,'MONTE CHINGOLO',2),
(482,'REMEDIOS ESCALADA DE SAN MARTIN',2),
(483,'VALENTIN ALSINA',2),
(484,'COUNTRY CLUB EL RODEO',2),
(485,'IGNACIO CORREAS',2),
(486,'ABASTO',2),
(487,'ANGEL ETCHEVERRY',2),
(488,'ARANA',2),
(489,'ARTURO SEGUI',2),
(490,'BARRIO EL CARMEN (OESTE)',2),
(491,'BARRIO GAMBIER',2),
(492,'BARRIO LAS MALVINAS',2),
(493,'BARRIO LAS QUINTAS',2),
(494,'CITY BELL',2),
(495,'EL RETIRO',2),
(496,'JOAQUIN GORINA',2),
(497,'JOSE HERNANDEZ',2),
(498,'JOSE MELCHOR ROMERO',2),
(499,'LA CUMBRE',2),
(500,'LA PLATA',2),
(501,'LISANDRO OLMOS',2),
(502,'LOS HORNOS',2),
(503,'MANUEL B. GONNET',2),
(504,'RINGUELET',2),
(505,'RUFINO DE ELIZALDE',2),
(506,'TOLOSA',2),
(507,'TRANSRADIO',2),
(508,'VILLA ELISA',2),
(509,'VILLA ELVIRA',2),
(510,'VILLA GARIBALDI',2),
(511,'VILLA MONTORO',2),
(512,'VILLA PARQUE SICARDI',2),
(513,'LOMAS DE COPELLO',2),
(514,'BARRIO RUTA SOL',2),
(515,'LAPRIDA',2),
(516,'PUEBLO NUEVO',2),
(517,'PUEBLO SAN JORGE',2),
(518,'CORONEL BOERR',2),
(519,'EL TRIGO',2),
(520,'LAS FLORES',2),
(521,'PARDO',2),
(522,'ALBERDI VIEJO',2),
(523,'EL DORADO',2),
(524,'FORTIN ACHA',2),
(525,'JUAN BAUTISTA ALBERDI',2),
(526,'LEANDRO N. ALEM',2),
(527,'VEDIA',2),
(528,'ARENAZA',2),
(529,'BAYAUCA',2),
(530,'BERMUDEZ',2),
(531,'CARLOS SALAS',2),
(532,'CORONEL MARTINEZ DE HOZ',2),
(533,'EL TRIUNFO',2),
(534,'LAS TOSCAS',2),
(535,'LINCOLN',2),
(536,'PASTEUR',2),
(537,'ROBERTS',2),
(538,'TRIUNVIRATO',2),
(539,'ARENAS VERDES',2),
(540,'LICENCIADO MATIENZO',2),
(541,'LOBERIA',2),
(542,'PIERES',2),
(543,'SAN MANUEL',2),
(544,'TAMANGUEYU',2),
(545,'ANTONIO CARBONI',2),
(546,'ELVIRA',2),
(547,'LAGUNA DE LOBOS',2),
(548,'LOBOS',2),
(549,'SALVADOR MARIA',2),
(550,'BANFIELD',2),
(551,'LLAVALLOL',2),
(552,'LOMAS DE ZAMORA',2),
(553,'TEMPERLEY',2),
(554,'TURDERA',2),
(555,'VILLA CENTENARIO',2),
(556,'VILLA FIORITO',2),
(557,'CARLOS KEEN',2),
(558,'CLUB DE CAMPO LOS PUENTES',2),
(559,'LUJAN',2),
(560,'BARRIO LAS CASUARINAS',2),
(561,'CORTINES',2),
(562,'LEZICA Y TORREZURI',2),
(563,'LUJAN',2),
(564,'VILLA FLANDRIA NORTE (PUEBLO NUEVO)',2),
(565,'VILLA FLANDRIA SUR (EST. JAUREGUI)',2),
(566,'COUNTRY CLUB LAS PRADERAS',2),
(567,'OPEN DOOR',2),
(568,'OLIVERA',2),
(569,'TORRES',2),
(570,'ATALAYA',2),
(571,'GENERAL MANSILLA',2),
(572,'LOS NARANJOS',2),
(573,'MAGDALENA',2),
(574,'ROBERTO J. PAYRO',2),
(575,'VIEYTES',2),
(576,'LAS ARMAS',2),
(577,'MAIPU',2),
(578,'SANTO DOMINGO',2),
(579,'AREA DE PROMOCION EL TRIANGULO',2),
(580,'GRAND BOURG',2),
(581,'INGENIERO ADOLFO SOURDEAUX',2),
(582,'INGENIERO PABLO NOGUES',2),
(583,'LOS POLVORINES',2),
(584,'TORTUGUITAS',2),
(585,'VILLA DE MAYO',2),
(586,'CORONEL VIDAL',2),
(587,'GENERAL PIRAN',2),
(588,'LA ARMONIA',2),
(589,'MAR CHIQUITA',2),
(590,'LA BALIZA',2),
(591,'LA CALETA',2),
(592,'MAR DE COBO',2),
(593,'ATLANTIDA',2),
(594,'CAMET NORTE',2),
(595,'FRENTE MAR',2),
(596,'PLAYA DORADA',2),
(597,'SANTA CLARA DEL MAR',2),
(598,'SANTA ELENA',2),
(599,'VIVORATA',2),
(600,'BARRIO SANTA ROSA',2),
(601,'BARRIOS LISANDRO DE LA TORRE Y SANTA MARTA',2),
(602,'MARCOS PAZ',2),
(603,'GOLDNEY',2),
(604,'GOWLAND',2),
(605,'MERCEDES',2),
(606,'TOMAS JOFRE',2),
(607,'LIBERTAD',2),
(608,'MARIANO ACOSTA',2),
(609,'MERLO',2),
(610,'PONTEVEDRA',2),
(611,'SAN ANTONIO DE PADUA',2),
(612,'ABBOTT',2),
(613,'SAN MIGUEL DEL MONTE',2),
(614,'ZENON VIDELA DORNA',2),
(615,'BALNEARIO SAUCE GRANDE',2),
(616,'MONTE HERMOSO',2),
(617,'CUARTEL V',2),
(618,'FRANCISCO ALVAREZ',2),
(619,'LA REJA',2),
(620,'MORENO',2),
(621,'PASO DEL REY',2),
(622,'TRUJUI',2),
(623,'CASTELAR',2),
(624,'EL PALOMAR',2),
(625,'HAEDO',2),
(626,'MORON',2),
(627,'VILLA SARMIENTO',2),
(628,'JOSE JUAN ALMEYRA',2),
(629,'LAS MARIANAS',2),
(630,'NAVARRO',2),
(631,'VILLA MOLL',2),
(632,'CLARAZ',2),
(633,'ENERGIA',2),
(634,'JUAN N. FERNANDEZ',2),
(635,'NECOCHEA',2),
(636,'QUEQUEN',2),
(637,'COSTA BONITA',2),
(638,'NICANOR OLIVERA',2),
(639,'RAMON SANTAMARINA',2),
(640,'ALFREDO DEMARCHI',2),
(641,'CARLOS MARIA NAON',2),
(642,'12 DE OCTUBRE',2),
(643,'DUDIGNAC',2),
(644,'LA AURORA',2),
(645,'MANUEL B. GONNET',2),
(646,'MARCELINO UGARTE',2),
(647,'MOREA',2),
(648,'NORUMBEGA',2),
(649,'9 DE JULIO',2),
(650,'PATRICIOS',2),
(651,'VILLA GENERAL FOURNIER',2),
(652,'BLANCAGRANDE',2),
(653,'COLONIA NIEVAS',2),
(654,'COLONIA SAN MIGUEL',2),
(655,'ESPIGAS',2),
(656,'HINOJO',2),
(657,'COLONIA HINOJO',2),
(658,'HINOJO',2),
(659,'OLAVARRIA',2),
(660,'RECALDE',2),
(661,'SANTA LUISA',2),
(662,'SIERRA CHICA',2),
(663,'SIERRAS BAYAS',2),
(664,'VILLA ARRIETA',2),
(665,'VILLA ALFREDO FORTABAT',2),
(666,'VILLA LA SERRANIA',2),
(667,'BAHIA SAN BLAS',2),
(668,'CARDENAL CAGLIERO',2),
(669,'CARMEN DE PATAGONES',2),
(670,'JOSE B. CASAS',2),
(671,'JUAN A. PRADERE',2),
(672,'STROEDER',2),
(673,'VILLALONGA',2),
(674,'CAPITAN CASTRO',2),
(675,'CHICLANA',2),
(676,'FRANCISCO MADERO',2),
(677,'INOCENCIO SOSA',2),
(678,'JUAN JOSE PASO',2),
(679,'MAGDALA',2),
(680,'MONES CAZON',2),
(681,'NUEVA PLATA',2),
(682,'PEHUAJO',2),
(683,'SAN BERNARDO',2),
(684,'BOCAYUVA',2),
(685,'DE BARY',2),
(686,'PELLEGRINI',2),
(687,'ACEVEDO',2),
(688,'FONTEZUELA',2),
(689,'GUERRICO',2),
(690,'JUAN A. DE LA PE¥A',2),
(691,'JUAN ANCHORENA',2),
(692,'LA VIOLETA',2),
(693,'MANUEL OCAMPO',2),
(694,'MARIANO BENITEZ',2),
(695,'MARIANO H. ALFONZO',2),
(696,'PERGAMINO',2),
(697,'PINZON',2),
(698,'RANCAGUA',2),
(699,'VILLA ANGELICA',2),
(700,'VILLA SAN JOSE',2),
(701,'CASALINS',2),
(702,'PILA',2),
(703,'DEL VISO',2),
(704,'FATIMA',2),
(705,'LA LONJA',2),
(706,'LOS CACHORROS',2),
(707,'MANZANARES',2),
(708,'MANZONE',2),
(709,'MAQUINISTA F. SAVIO (OESTE)',2),
(710,'PILAR',2),
(711,'PRESIDENTE DERQUI',2),
(712,'ROBERTO DE VICENZO',2),
(713,'SANTA TERESA',2),
(714,'TORTUGUITAS',2),
(715,'VILLA ASTOLFI',2),
(716,'VILLA ROSA',2),
(717,'ZELAYA',2),
(718,'CARILO',2),
(719,'OSTENDE',2),
(720,'PINAMAR',2),
(721,'VALERIA DEL MAR',2),
(722,'BARRIO AMERICA UNIDA',2),
(723,'GUERNICA',2),
(724,'AZOPARDO',2),
(725,'BORDENAVE',2),
(726,'DARREGUEIRA',2),
(727,'17 DE AGOSTO',2),
(728,'ESTELA',2),
(729,'FELIPE SOLA',2),
(730,'LOPEZ LECUBE',2),
(731,'PUAN',2),
(732,'SAN GERMAN',2),
(733,'VILLA CASTELAR',2),
(734,'VILLA IRIS',2),
(735,'ALVAREZ JONTE',2),
(736,'PIPINAS',2),
(737,'PUNTA INDIO',2),
(738,'VERONICA',2),
(739,'BERNAL',2),
(740,'BERNAL OESTE',2),
(741,'DON BOSCO',2),
(742,'EZPELETA',2),
(743,'EZPELETA OESTE',2),
(744,'QUILMES',2),
(745,'QUILMES OESTE',2),
(746,'SAN FRANCISCO SOLANO',2),
(747,'VILLA LA FLORIDA',2),
(748,'EL PARAISO',2),
(749,'LAS BAHAMAS',2),
(750,'PEREZ MILLAN',2),
(751,'RAMALLO',2),
(752,'VILLA GENERAL SAVIO',2),
(753,'VILLA RAMALLO',2),
(754,'RAUCH',2),
(755,'AMERICA',2),
(756,'FORTIN OLAVARRIA',2),
(757,'GONZALEZ MORENO',2),
(758,'MIRA PAMPA',2),
(759,'ROOSEVELT',2),
(760,'SAN MAURICIO',2),
(761,'SANSINENA',2),
(762,'SUNDBLAD',2),
(763,'LA BEBA',2),
(764,'LAS CARABELAS',2),
(765,'LOS INDIOS',2),
(766,'RAFAEL OBLIGADO',2),
(767,'ROBERTO CANO',2),
(768,'ROJAS',2),
(769,'BARRIO LAS MARGARITAS',2),
(770,'ROJAS',2),
(771,'VILLA PARQUE CECIR',2),
(772,'ESTACION SOL DE MAYO',2),
(773,'VILLA MANUEL POMAR',2),
(774,'CARLOS BEGUERIE',2),
(775,'ROQUE PEREZ',2),
(776,'ARROYO CORTO',2),
(777,'COLONIA SAN MARTIN',2),
(778,'DUFAUR',2),
(779,'ESPARTILLAR (E)',2),
(780,'GOYENA',2),
(781,'LAS ENCADENADAS',2),
(782,'PIGUE',2),
(783,'SAAVEDRA',2),
(784,'ALVAREZ DE TOLEDO',2),
(785,'CAZON',2),
(786,'DEL CARRIL',2),
(787,'POLVAREDAS',2),
(788,'SALADILLO',2),
(789,'ARROYO DULCE',2),
(790,'BERDIER',2),
(791,'GAHAN',2),
(792,'INES INDART',2),
(793,'LA INVENCIBLE',2),
(794,'SALTO',2),
(795,'QUENUMA',2),
(796,'SALLIQUELO',2),
(797,'AZCUENAGA',2),
(798,'CULULLU',2),
(799,'FRANKLIN',2),
(800,'SAN ANDRES DE GILES',2),
(801,'SOLIS',2),
(802,'VILLA ESPIL',2),
(803,'VILLA RUIZ',2),
(804,'DUGGAN',2),
(805,'SAN ANTONIO DE ARECO',2),
(806,'VILLA LIA',2),
(807,'BALNEARIO SAN CAYETANO',2),
(808,'OCHANDIO',2),
(809,'SAN CAYETANO',2),
(810,'SAN FERNANDO',2),
(811,'VICTORIA',2),
(812,'VIRREYES',2),
(813,'ACASSUSO',2),
(814,'BECCAR',2),
(815,'BOULOGNE SUR MER',2),
(816,'MARTINEZ',2),
(817,'SAN ISIDRO',2),
(818,'VILLA ADELINA',2),
(819,'BELLA VISTA',2),
(820,'CAMPO DE MAYO',2),
(821,'MUÑIZ',2),
(822,'SAN MIGUEL',2),
(823,'CONESA',2),
(824,'EREZCANO',2),
(825,'GENERAL ROJO',2),
(826,'LA EMILIA',2),
(827,'VILLA CAMPI',2),
(828,'VILLA CANTO',2),
(829,'VILLA RICCIO',2),
(830,'CAMPOS SALLES',2),
(831,'SAN NICOLAS DE LOS ARROYOS',2),
(832,'VILLA ESPERANZA',2),
(833,'GOBERNADOR CASTRO',2),
(834,'INGENIERO MONETA',2),
(835,'OBLIGADO',2),
(836,'PUEBLO DOYLE',2),
(837,'RIO TALA',2),
(838,'SAN PEDRO',2),
(839,'SANTA LUCIA',2),
(840,'ALEJANDRO KORN',2),
(841,'SAN VICENTE',2),
(842,'DOMSELAAR',2),
(843,'GENERAL RIVAS',2),
(844,'SUIPACHA',2),
(845,'DE LA CANAL',2),
(846,'GARDEY',2),
(847,'MARIA IGNACIA',2),
(848,'TANDIL',2),
(849,'CROTTO',2),
(850,'TAPALQUE',2),
(851,'VELLOSO',2),
(852,'BENAVIDEZ',2),
(853,'DIQUE LUJAN',2),
(854,'DON TORCUATO ESTE',2),
(855,'DON TORCUATO OESTE',2),
(856,'EL TALAR',2),
(857,'GENERAL PACHECO',2),
(858,'LOS TRONCOS DEL TALAR',2),
(859,'RICARDO ROJAS',2),
(860,'RINCON DE MILBERG',2),
(861,'TIGRE',2),
(862,'GENERAL CONESA',2),
(863,'CHASICO',2),
(864,'SALDUNGARAY',2),
(865,'SIERRA DE LA VENTANA',2),
(866,'TORNQUIST',2),
(867,'TRES PICOS',2),
(868,'VILLA SERRANA LA GRUTA',2),
(869,'VILLA VENTANA',2),
(870,'BERUTTI',2),
(871,'GIRODIAS',2),
(872,'LA CARRETA',2),
(873,'30 DE AGOSTO',2),
(874,'TRENQUE LAUQUEN',2),
(875,'TRONGE',2),
(876,'BALNEARIO ORENSE',2),
(877,'CLAROMECO',2),
(878,'DUNAMAR',2),
(879,'COPETONAS',2),
(880,'LIN CALEL',2),
(881,'MICAELA CASCALLARES',2),
(882,'ORENSE',2),
(883,'RETA',2),
(884,'SAN FRANCISCO DE BELLOCQ',2),
(885,'SAN MAYOL',2),
(886,'TRES ARROYOS',2),
(887,'VILLA RODRIGUEZ',2),
(888,'CASEROS',2),
(889,'CHURRUCA',2),
(890,'CIUDAD JARDIN LOMAS DEL PALOMAR',2),
(891,'CIUDADELA',2),
(892,'EL LIBERTADOR',2),
(893,'JOSE INGENIEROS',2),
(894,'LOMA HERMOSA',2),
(895,'MARTIN CORONADO',2),
(896,'11 DE SEPTIEMBRE',2),
(897,'PABLO PODESTA',2),
(898,'REMEDIOS DE ESCALADA',2),
(899,'SAENZ PEÑA',2),
(900,'SANTOS LUGARES',2),
(901,'VILLA BOSCH (EST. JUAN MARIA BOSCH)',2),
(902,'VILLA RAFFO',2),
(903,'INGENIERO THOMPSON',2),
(904,'TRES LOMAS',2),
(905,'AGUSTIN MOSCONI',2),
(906,'DEL VALLE',2),
(907,'ERNESTINA',2),
(908,'GOBERNADOR UGARTE',2),
(909,'LUCAS MONTEVERDE',2),
(910,'NORBERTO DE LA RIESTRA',2),
(911,'PEDERNALES',2),
(912,'SAN ENRIQUE',2),
(913,'VALDES',2),
(914,'25 DE MAYO',2),
(915,'CARAPACHAY',2),
(916,'FLORIDA',2),
(917,'FLORIDA OESTE',2),
(918,'LA LUCILA',2),
(919,'MUNRO',2),
(920,'OLIVOS',2),
(921,'VICENTE LOPEZ',2),
(922,'VILLA ADELINA',2),
(923,'VILLA MARTELLI',2),
(924,'MAR AZUL',2),
(925,'MAR DE LAS PAMPAS',2),
(926,'VILLA GESELL',2),
(927,'ARGERICH',2),
(928,'COLONIA SAN ADOLFO',2),
(929,'COUNTRY LOS MEDANOS',2),
(930,'HILARIO ASCASUBI',2),
(931,'JUAN COUSTE',2),
(932,'MAYOR BURATOVICH',2),
(933,'MEDANOS',2),
(934,'PEDRO LURO',2),
(935,'TENIENTE ORIGONE',2),
(936,'COUNTRY CLUB EL CASCO',2),
(937,'ESCALADA',2),
(938,'LIMA',2),
(939,'ZARATE',2),
(940,'BARRIO SAAVEDRA',2),
(941,'ZARATE',2),
(942,'BARRIO RUTA 24 KILOMETRO 10',2);

/*Table structure for table `tb_modules` */

DROP TABLE IF EXISTS `tb_modules`;

CREATE TABLE `tb_modules` (
  `idModule` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idModule`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_modules` */

insert  into `tb_modules`(`idModule`,`name`) values 
(1,'monitor'),
(2,'llaveros'),
(3,'edificios'),
(4,'configuracion'),
(5,'perfil de usuario'),
(6,'cliente'),
(7,'servicio'),
(8,'producto');

/*Table structure for table `tb_monitor_company` */

DROP TABLE IF EXISTS `tb_monitor_company`;

CREATE TABLE `tb_monitor_company` (
  `idMonitorCompany` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `monitorCompany` varchar(100) DEFAULT '',
  PRIMARY KEY (`idMonitorCompany`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_monitor_company` */

insert  into `tb_monitor_company`(`idMonitorCompany`,`monitorCompany`) values 
(1,'RAM'),
(2,'SPS');

/*Table structure for table `tb_opcion_low` */

DROP TABLE IF EXISTS `tb_opcion_low`;

CREATE TABLE `tb_opcion_low` (
  `idOpcionLowTicket` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `opcionLowTicket` varchar(200) COLLATE utf8mb3_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`idOpcionLowTicket`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_swedish_ci;

/*Data for the table `tb_opcion_low` */

insert  into `tb_opcion_low`(`idOpcionLowTicket`,`opcionLowTicket`) values 
(1,'LLaveros a dar de baja'),
(2,'LLaveros en mi poder');

/*Table structure for table `tb_open_devices_access_control` */

DROP TABLE IF EXISTS `tb_open_devices_access_control`;

CREATE TABLE `tb_open_devices_access_control` (
  `idOpenDeviceAccessControl` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idOPClientServicesAccessControlFk` int(11) DEFAULT NULL,
  `idOpenDevice` int(11) DEFAULT NULL,
  `numberSerieInternal` varchar(255) CHARACTER SET utf8mb3 DEFAULT '',
  `numberSerieFabric` varchar(255) CHARACTER SET utf8mb3 DEFAULT '',
  `dateExpiration` varchar(255) CHARACTER SET utf8mb3 DEFAULT '',
  PRIMARY KEY (`idOpenDeviceAccessControl`)
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=latin1;

/*Data for the table `tb_open_devices_access_control` */

insert  into `tb_open_devices_access_control`(`idOpenDeviceAccessControl`,`idOPClientServicesAccessControlFk`,`idOpenDevice`,`numberSerieInternal`,`numberSerieFabric`,`dateExpiration`) values 
(140,105,36,'124214124112412','4124214124241',NULL),
(144,106,36,'23434234234234234','3423423423434',NULL),
(150,102,36,'121211212121212121','35353433535343434',NULL),
(151,103,36,'34343434343434','343434343434',NULL),
(153,107,36,'1','1',NULL),
(154,108,36,'1231232','132131312',NULL);

/*Table structure for table `tb_personas_para_dar_aviso_alarmas` */

DROP TABLE IF EXISTS `tb_personas_para_dar_aviso_alarmas`;

CREATE TABLE `tb_personas_para_dar_aviso_alarmas` (
  `idPersona_aviso` int(11) NOT NULL AUTO_INCREMENT,
  `fk_idUserSystema` int(11) DEFAULT NULL COMMENT 'puede ser null',
  `vinculo` varchar(255) DEFAULT NULL,
  `palabra_clave` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `numero_del_usuario` varchar(255) DEFAULT NULL,
  `fk_idDatoAdicionalAlarma` int(11) DEFAULT NULL,
  `nombre_apellido` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idPersona_aviso`)
) ENGINE=InnoDB AUTO_INCREMENT=183 DEFAULT CHARSET=latin1;

/*Data for the table `tb_personas_para_dar_aviso_alarmas` */

insert  into `tb_personas_para_dar_aviso_alarmas`(`idPersona_aviso`,`fk_idUserSystema`,`vinculo`,`palabra_clave`,`telefono`,`numero_del_usuario`,`fk_idDatoAdicionalAlarma`,`nombre_apellido`) values 
(161,93,'Vecino','Halcon','1122333334','123123213',192,'David Eduardo Rincon Luengo'),
(162,89,'Administrador','pibe','121232132134',NULL,192,'Dionisio Machado'),
(163,NULL,'Hija','Papa','112423423423',NULL,192,'Sofia Rincon'),
(172,92,'Hermano','123','1123432432444','123',201,'German Malaver'),
(181,84,'Amigo','Probando','1123324324324',NULL,210,'Arturo Michelena'),
(182,88,'Hijo','Auto','11223544564356346','123123123',211,'Gabriel Gonzalez');

/*Table structure for table `tb_personas_para_verificar_en_lugar` */

DROP TABLE IF EXISTS `tb_personas_para_verificar_en_lugar`;

CREATE TABLE `tb_personas_para_verificar_en_lugar` (
  `idPersona_aviso_lugar` int(11) NOT NULL AUTO_INCREMENT,
  `fk_idUserSystema` int(11) DEFAULT NULL COMMENT 'puede ser null',
  `vinculo` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `numero_del_usuario` varchar(255) DEFAULT NULL,
  `fk_idDatoAdicionalAlarma` int(11) DEFAULT NULL,
  `nombre_apellido` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idPersona_aviso_lugar`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=latin1;

/*Data for the table `tb_personas_para_verificar_en_lugar` */

insert  into `tb_personas_para_verificar_en_lugar`(`idPersona_aviso_lugar`,`fk_idUserSystema`,`vinculo`,`telefono`,`numero_del_usuario`,`fk_idDatoAdicionalAlarma`,`nombre_apellido`) values 
(113,93,'Vecino','1122333334','123123213',192,'David Eduardo Rincon Luengo'),
(122,NULL,'Hermano','11234234324324',NULL,201,'Pablo Perez'),
(131,74,'Administrador','123213213213213',NULL,210,'Eduardo Rincon'),
(132,88,'Hijo','11223544564356346','123123123',211,'Gabriel Gonzalez');

/*Table structure for table `tb_pick_receive` */

DROP TABLE IF EXISTS `tb_pick_receive`;

CREATE TABLE `tb_pick_receive` (
  `idWhoPickUp` int(11) DEFAULT NULL,
  `nameWhoPickUp` varchar(255) COLLATE utf8mb3_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

/*Data for the table `tb_pick_receive` */

insert  into `tb_pick_receive`(`idWhoPickUp`,`nameWhoPickUp`) values 
(1,'Titular'),
(2,'Encargado'),
(3,'Tercera persona');

/*Table structure for table `tb_products` */

DROP TABLE IF EXISTS `tb_products`;

CREATE TABLE `tb_products` (
  `idProduct` int(11) NOT NULL AUTO_INCREMENT,
  `descriptionProduct` varchar(200) DEFAULT NULL,
  `codigoFabric` varchar(200) DEFAULT NULL,
  `brand` varchar(200) DEFAULT NULL,
  `model` varchar(200) DEFAULT NULL,
  `idProductClassificationFk` varchar(200) DEFAULT NULL,
  `isNumberSerieFabric` tinyint(1) DEFAULT 0,
  `isNumberSerieInternal` tinyint(1) DEFAULT 0,
  `isDateExpiration` tinyint(1) DEFAULT 0,
  `isControlSchedule` tinyint(1) DEFAULT 0,
  `isRequestNumber` tinyint(1) DEFAULT 0,
  `priceFabric` decimal(18,2) DEFAULT 0.00,
  `idStatusFk` int(11) DEFAULT 1,
  PRIMARY KEY (`idProduct`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_products` */

insert  into `tb_products`(`idProduct`,`descriptionProduct`,`codigoFabric`,`brand`,`model`,`idProductClassificationFk`,`isNumberSerieFabric`,`isNumberSerieInternal`,`isDateExpiration`,`isControlSchedule`,`isRequestNumber`,`priceFabric`,`idStatusFk`) values 
(6,'Cerradura Multilock','234324322352','Multilock','Multilock-500','2',1,1,0,0,0,4500.00,1),
(7,'Control de Acceso con huella y horario','32324324324','Libertech','FCM052','1',1,1,0,1,0,3200.00,1),
(8,'FUENTE - CARGADOR 12V 3A','UPS-70W-13.8V','INTELEKTRON','UPS-70W-13.8V','4',1,1,0,0,0,38.00,1),
(9,'Bateria Alarma 12v 7ah 7a Recargable','234324324324','Kaise','12V7AH','5',1,1,1,NULL,0,1250.00,1),
(10,'LECTOR HID R10','900NTNNEK00000','HID','R10SE','3',0,1,0,0,0,90.75,1),
(11,'Pulsador Emergencia Golpe De Puño Por Giro C/ Retencion','286036/286032/1','BAW','B5bs542','6',1,1,0,NULL,0,400.00,1),
(12,'PULSADOR NO TOUCH','CSSNT850','Punto Control','CSSNT850','20',0,1,0,0,0,12.00,1),
(13,'Teclado de Apagado','234324325325','TEBAS','M-M','7',1,1,0,NULL,0,4000.00,1),
(14,'BATERIA 12V 7A','NP7A-12','Ristobat','NP7A-12','5',0,1,1,0,0,12.20,1),
(15,'PCT 201','PCT 201','Punto Control','PCT 201','1',0,1,0,1,0,99.00,1),
(16,'Dvr Seguridad 8ch Hikvision P2p Hdmi','12312321432432','Hikvision','DS7208HGHI','8',1,1,0,NULL,0,6700.00,1),
(17,'Ups Estabilizador Lyonn 800va','111232423g','Lyonn','CTB-800V','10',1,1,0,NULL,0,7400.00,1),
(18,'Camara Seguridad Hikvision 2mp Full Hd 1080p','12345454FGHYT','Hikvision','DS-2CE16D0T-IPF','11',1,1,0,NULL,0,1800.00,1),
(19,'MK - CABLEMODEM RB951','RB951UI-2ND','MIKROTIK','RB951UI-2ND','18',1,0,0,0,0,55.00,1),
(20,'MK-4G R11E','4752224002945','MIKROTIK','R11E-4G','17',1,0,0,0,0,199.00,1),
(21,'Boton De Salida Pulsador Control Acceso','21312323ADR','Disbyte','EXMET','20',1,1,0,NULL,0,400.00,1),
(22,'Boton Pulsador De Salida Cerraduras Electricas','123123RRR','Cygnus','EX-905','20',1,1,0,NULL,0,1400.00,1),
(23,'Panel Alarma Casa Domiciliaria Inalambrica Wifi','1237sdb23h4234','Security Factory','Marshall IP','12',1,1,0,NULL,0,17895.00,1),
(24,'Teclado Panel Remoto Pantalla cristal Liquido','12312434tgv345','X-28','TLCD-MPXH','13',1,1,0,NULL,0,8955.00,1),
(25,'Sensor Detector De Movimiento Exterior','1232134tgert345','Geneve','79.06.92','14',1,1,0,NULL,0,750.00,1),
(26,'Modulo Ip Wifi Universal','123134535654','Dx Control','Dx Full Wifi','15',1,1,0,NULL,0,9500.00,1),
(27,'Modulo Lan Y Gprs Para Alarmas Doble Tarjeta Sim Ant Externa','1111111111111','Intelbras','XEG4000','16',1,1,0,NULL,0,8.43,1),
(28,'CAJA VERDE \"ROMPA EL VIDRIO\"','CPK-860A','YLI','CPK-860A','6',0,0,0,NULL,0,5.50,1),
(29,'PCT 202','PCT 202','Punto Control','PCT 202','1',1,0,0,1,0,126.50,1),
(30,'PCT 300-1','PCT 300-1','Punto Control','PCT 300-1','1',1,0,0,1,0,168.00,1),
(31,'PERNO YB-700A','YB-700A(LED)','YLI','YB-700A(LED)','2',1,0,0,NULL,0,70.00,1),
(32,'PERNO YB-700B','YB-700B(LED)','YLI','YB-700B(LED)','2',1,0,0,NULL,0,110.00,1),
(33,'PERNO YB-500U','YB-500U(LED)','YLI','YB-500U(LED)','2',1,0,0,NULL,0,75.00,1),
(34,'IMAN 300K YM-280NLED','YM-280NLED','YLI','YM-280NLED','2',1,0,0,NULL,0,40.00,1),
(35,'IMAN 150K YM-180NLED','YM-180NLED','YLI','YM-180NLED','2',1,0,0,NULL,0,25.00,1),
(36,'Dispositivo de Apertura','124335345','HulkLock','Ap-100','19',1,1,0,0,1,2000.00,1),
(37,'Dvr Seguridad 16ch Hikvision P2p Hdmi','1111113333333322','Hikvision','DS7216HGHI','8',1,1,0,NULL,0,100000.00,1);

/*Table structure for table `tb_products_classification` */

DROP TABLE IF EXISTS `tb_products_classification`;

CREATE TABLE `tb_products_classification` (
  `idProductClassification` int(11) NOT NULL AUTO_INCREMENT,
  `classification` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idProductClassification`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

/*Data for the table `tb_products_classification` */

insert  into `tb_products_classification`(`idProductClassification`,`classification`) values 
(1,'CONTROL DE ACCESOS'),
(2,'CERRADURA'),
(3,'LECTOR'),
(4,'FUENTE'),
(5,'BATERIA'),
(6,'PULSADOR DE EMERGENCIA'),
(7,'TECLA DE APAGADO'),
(8,'DVR'),
(9,'NVR'),
(10,'UPS'),
(11,'CAMARA'),
(12,'PANEL DE ALARMA'),
(13,'TECLADO DE ALARMA'),
(14,'SENSOR DE ALARMA'),
(15,'MODULO IP DE ALARMA'),
(16,'MODULO GPRS DE ALARMA'),
(17,'ROUTER'),
(18,'MODEM'),
(19,'DISPOSITIVO DE APERTURA'),
(20,'PULSADOR DE SALIDA');

/*Table structure for table `tb_products_divice_opening` */

DROP TABLE IF EXISTS `tb_products_divice_opening`;

CREATE TABLE `tb_products_divice_opening` (
  `idProductsDiviceOpening` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idDiviceOpeningFk` int(11) DEFAULT NULL,
  `idProductFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idProductsDiviceOpening`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_products_divice_opening` */

insert  into `tb_products_divice_opening`(`idProductsDiviceOpening`,`idDiviceOpeningFk`,`idProductFk`) values 
(5,2,2),
(6,3,2),
(7,4,2),
(8,5,2),
(9,2,3),
(10,3,3),
(11,4,3),
(12,5,3),
(13,2,4),
(14,3,4),
(15,4,4),
(16,5,4),
(21,2,1),
(22,3,1),
(23,4,1),
(24,5,1),
(25,2,5),
(26,3,5),
(27,4,5),
(28,5,5),
(29,2,6),
(30,3,6),
(31,4,6),
(32,5,6);

/*Table structure for table `tb_profile` */

DROP TABLE IF EXISTS `tb_profile`;

CREATE TABLE `tb_profile` (
  `idProfile` int(11) unsigned NOT NULL,
  `nameProfile` varchar(50) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idProfile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

/*Data for the table `tb_profile` */

insert  into `tb_profile`(`idProfile`,`nameProfile`) values 
(1,'TASS'),
(2,'Empresa'),
(3,'Propietario'),
(4,'Admin Consorsio'),
(5,'Inquilino'),
(6,'Encargado');

/*Table structure for table `tb_profiles` */

DROP TABLE IF EXISTS `tb_profiles`;

CREATE TABLE `tb_profiles` (
  `idProfiles` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `idStatus` int(11) DEFAULT 1,
  PRIMARY KEY (`idProfiles`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_profiles` */

insert  into `tb_profiles`(`idProfiles`,`name`,`idStatus`) values 
(8,'Admin',1),
(9,'PERFIL UNo',1),
(10,'Habitantes',1);

/*Table structure for table `tb_profiles_modules` */

DROP TABLE IF EXISTS `tb_profiles_modules`;

CREATE TABLE `tb_profiles_modules` (
  `idProfileModule` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idProfilesFk` int(11) DEFAULT NULL,
  `idModuleFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idProfileModule`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_profiles_modules` */

insert  into `tb_profiles_modules`(`idProfileModule`,`idProfilesFk`,`idModuleFk`) values 
(77,8,1),
(78,8,2),
(79,8,3),
(80,8,4),
(81,8,5),
(82,8,6),
(83,8,7),
(84,8,8),
(85,9,1),
(86,9,2),
(87,9,3),
(88,9,4),
(89,9,5),
(90,9,6),
(91,9,7),
(92,9,8),
(110,10,1),
(111,10,2),
(112,10,5);

/*Table structure for table `tb_province` */

DROP TABLE IF EXISTS `tb_province`;

CREATE TABLE `tb_province` (
  `idProvince` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `province` varchar(200) DEFAULT NULL,
  `idProvinceAPIGobFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idProvince`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_province` */

insert  into `tb_province`(`idProvince`,`province`,`idProvinceAPIGobFk`) values 
(1,'Ciudad Autonoma de Buenos Aires',2),
(2,'Buenos Aires',6),
(3,'Misiones',54),
(4,'San Luis',74),
(5,'San Juan',70),
(6,'Entre Rios',30),
(7,'Santa Cruz',78),
(8,'Rio Negro',62),
(9,'Chubut',26),
(10,'Cordoba',14),
(11,'Mendoza',50),
(12,'La Rioja',46),
(13,'Catamarca',10),
(14,'La Pampa',42),
(15,'Santiago del Estero',86),
(16,'Corrientes',18),
(17,'Santa Fe',82),
(18,'Tucuman',90),
(19,'Neuquen',58),
(20,'Salta',66),
(21,'Chaco',22),
(22,'Formosa',34),
(23,'Jujuy',38),
(24,'Tierra del Fuego, Antartida e Islas del Atlántico Sur',94);

/*Table structure for table `tb_reason_disabled_item` */

DROP TABLE IF EXISTS `tb_reason_disabled_item`;

CREATE TABLE `tb_reason_disabled_item` (
  `idReasonDisabledItem` int(11) NOT NULL AUTO_INCREMENT,
  `reasonDisabledItem` varchar(100) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idReasonDisabledItem`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

/*Data for the table `tb_reason_disabled_item` */

insert  into `tb_reason_disabled_item`(`idReasonDisabledItem`,`reasonDisabledItem`) values 
(1,'ROBO'),
(2,'EXTRAVIO'),
(3,'FALLA DEL LLAVERO');

/*Table structure for table `tb_request` */

DROP TABLE IF EXISTS `tb_request`;

CREATE TABLE `tb_request` (
  `idRequest` varchar(255) COLLATE utf8mb3_spanish2_ci NOT NULL,
  `RequestName` varchar(255) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` varchar(255) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idRequest`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

/*Data for the table `tb_request` */

/*Table structure for table `tb_router_internet` */

DROP TABLE IF EXISTS `tb_router_internet`;

CREATE TABLE `tb_router_internet` (
  `idRouterInternet` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `numberSeriaInternal` text DEFAULT NULL,
  `numberSeriaFrabic` text DEFAULT NULL,
  `titulo` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idRouterInternet`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_router_internet` */

/*Table structure for table `tb_sensors_alarm` */

DROP TABLE IF EXISTS `tb_sensors_alarm`;

CREATE TABLE `tb_sensors_alarm` (
  `idSensorsAlarm` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idSensorProduct` int(11) DEFAULT NULL,
  `numberZoneSensor` varchar(200) DEFAULT NULL,
  `isWirelessSensor` int(11) DEFAULT NULL,
  `area` text DEFAULT NULL,
  `nroZoneTamper` varchar(200) DEFAULT NULL,
  `locationLon` varchar(200) DEFAULT NULL,
  `idDvr` int(11) DEFAULT NULL,
  `idCameraFk` int(11) DEFAULT NULL,
  `nroInterno` varchar(200) DEFAULT NULL,
  `nroFrabric` varchar(200) DEFAULT NULL,
  `fkidClientServicesAlarms` int(11) DEFAULT NULL,
  PRIMARY KEY (`idSensorsAlarm`)
) ENGINE=InnoDB AUTO_INCREMENT=177 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_sensors_alarm` */

insert  into `tb_sensors_alarm`(`idSensorsAlarm`,`idSensorProduct`,`numberZoneSensor`,`isWirelessSensor`,`area`,`nroZoneTamper`,`locationLon`,`idDvr`,`idCameraFk`,`nroInterno`,`nroFrabric`,`fkidClientServicesAlarms`) values 
(153,25,'1',0,'Probando','2','Probando',16,142,'123123','12312312312',57),
(154,25,'3',0,'Probando','2','Probando',16,133,'124234235','235234234',57),
(155,25,'4',0,'Probando','2','Probando',37,138,'123213123123','123123142412412',57),
(172,25,'1',1,'Probando',NULL,'Probando',16,134,'11','11',58),
(173,25,'2',1,'Probando',NULL,'Probando',16,134,'11','11',58),
(174,25,'1',1,'',NULL,'Prueba1',16,135,'123123','123123',55),
(175,25,'2',1,'',NULL,'Prueba2',16,135,'123123','123123',55),
(176,25,'3',1,'',NULL,'Prueba',16,137,'123123','123123',55);

/*Table structure for table `tb_services` */

DROP TABLE IF EXISTS `tb_services`;

CREATE TABLE `tb_services` (
  `idService` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `service` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idService`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_services` */

insert  into `tb_services`(`idService`,`service`) values 
(1,'INSTALACION'),
(2,'MANTENIMIENTO'),
(3,'REPARACION');

/*Table structure for table `tb_services_camera_users` */

DROP TABLE IF EXISTS `tb_services_camera_users`;

CREATE TABLE `tb_services_camera_users` (
  `idServicesCameraUsers` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idUserFk` int(11) DEFAULT NULL,
  `idClientServicesCamera` int(11) DEFAULT NULL,
  PRIMARY KEY (`idServicesCameraUsers`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_services_camera_users` */

/*Table structure for table `tb_servicios_del_contrato_cabecera` */

DROP TABLE IF EXISTS `tb_servicios_del_contrato_cabecera`;

CREATE TABLE `tb_servicios_del_contrato_cabecera` (
  `idServiciosDelContrato` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idServiceType` int(11) DEFAULT NULL,
  `serviceName` varchar(255) DEFAULT NULL,
  `idContratoFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idServiciosDelContrato`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=latin1;

/*Data for the table `tb_servicios_del_contrato_cabecera` */

insert  into `tb_servicios_del_contrato_cabecera`(`idServiciosDelContrato`,`idServiceType`,`serviceName`,`idContratoFk`) values 
(55,1,'CONTROL DE ACCESO',6),
(56,2,'INTERNET',6),
(57,3,'TOTEM',6),
(58,4,'CAMARAS',6),
(59,5,'ALARMAS',6),
(60,6,'APP MONITOREO',6),
(61,1,'CONTROL DE ACCESO',7),
(62,2,'INTERNET',7),
(63,3,'TOTEM',7),
(64,4,'CAMARAS',7),
(65,5,'ALARMAS',7),
(66,6,'APP MONITOREO',7),
(67,1,'CONTROL DE ACCESO',8),
(68,2,'INTERNET',8),
(69,3,'TOTEM',8),
(70,4,'CAMARAS',8),
(71,5,'ALARMAS',8),
(72,6,'APP MONITOREO',8),
(73,1,'CONTROL DE ACCESO',9),
(74,2,'INTERNET',9),
(75,3,'TOTEM',9),
(76,4,'CAMARAS',9),
(77,5,'ALARMAS',9),
(78,6,'APP MONITOREO',9),
(79,1,'CONTROL DE ACCESO',12),
(80,2,'INTERNET',12),
(81,3,'TOTEM',12),
(82,4,'CAMARAS',12),
(83,5,'ALARMAS',12),
(84,6,'APP MONITOREO',12),
(85,1,'CONTROL DE ACCESO',13),
(86,2,'INTERNET',13),
(87,3,'TOTEM',13),
(88,4,'CAMARAS',13),
(89,5,'ALARMAS',13),
(90,6,'APP MONITOREO',13),
(91,1,'CONTROL DE ACCESO',14),
(92,2,'INTERNET',14),
(93,3,'TOTEM',14),
(94,4,'CAMARAS',14),
(95,5,'ALARMAS',14),
(96,6,'APP MONITOREO',14),
(103,1,'CONTROL DE ACCESO',16),
(104,2,'INTERNET',16),
(105,3,'TOTEM',16),
(106,4,'CAMARAS',16),
(107,5,'ALARMAS',16),
(108,6,'APP MONITOREO',16),
(109,1,'CONTROL DE ACCESO',17),
(110,2,'INTERNET',17),
(111,3,'TOTEM',17),
(112,4,'CAMARAS',17),
(113,5,'ALARMAS',17),
(114,6,'APP MONITOREO',17);

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
) ENGINE=InnoDB AUTO_INCREMENT=613 DEFAULT CHARSET=latin1;

/*Data for the table `tb_servicios_del_contrato_cuerpo` */

insert  into `tb_servicios_del_contrato_cuerpo`(`idServiciosDelContratoCuerpo`,`idServiciosDelContratoFk`,`qtty`,`idAccCrtlDoor`,`itemName`,`itemAclaracion`,`idServiceTypeFk`) values 
(89,61,NULL,1,'Principal',NULL,1),
(90,61,NULL,2,'Cochera',NULL,1),
(91,61,NULL,3,'Servicio',NULL,1),
(92,61,NULL,4,'Terraza',NULL,1),
(93,62,NULL,1,'Cable Modem - TASS',NULL,2),
(94,62,NULL,4,'3G/LTE',NULL,2),
(95,63,'2',NULL,'CAMARAS',NULL,3),
(96,64,'8',NULL,'CAMARAS',NULL,4),
(97,65,NULL,NULL,'ALARMAS',NULL,5),
(98,66,NULL,NULL,'APP MONITOREO',NULL,6),
(99,67,NULL,1,'Principal',NULL,1),
(100,67,NULL,2,'Cochera',NULL,1),
(101,67,NULL,4,'Terraza',NULL,1),
(102,68,NULL,1,'Cable Modem - TASS',NULL,2),
(103,68,NULL,4,'3G/LTE',NULL,2),
(104,69,'4',NULL,'CAMARAS',NULL,3),
(105,70,'8',NULL,'CAMARAS',NULL,4),
(106,71,NULL,NULL,'ALARMAS',NULL,5),
(107,72,NULL,NULL,'APP MONITOREO',NULL,6),
(312,73,'4',1,'Principal',NULL,1),
(313,73,'1',7,'Otros','Prueba',1),
(314,73,'4',2,'Cochera','',1),
(315,74,NULL,1,'Cable Modem - TASS',NULL,2),
(316,74,NULL,2,'Cable Modem - CLIENTE',NULL,2),
(317,74,NULL,3,'GPRS',NULL,2),
(318,75,'4',NULL,'CAMARAS',NULL,3),
(319,76,'8',NULL,'CAMARAS',NULL,4),
(320,77,NULL,NULL,'ALARMAS',NULL,5),
(321,78,NULL,NULL,'APP MONITOREO',NULL,6),
(460,79,NULL,1,'Principal',NULL,1),
(461,79,NULL,2,'Cochera',NULL,1),
(462,79,NULL,7,'Otros','probando',1),
(463,80,NULL,1,'Cable Modem - TASS',NULL,2),
(464,80,NULL,4,'3G/LTE',NULL,2),
(465,81,'4',NULL,'CAMARAS',NULL,3),
(466,82,'8',NULL,'CAMARAS',NULL,4),
(467,82,'2',NULL,'CAMARAS',NULL,4),
(468,83,NULL,NULL,'ALARMAS',NULL,5),
(469,84,NULL,NULL,'APP MONITOREO',NULL,6),
(484,85,NULL,1,'Principal',NULL,1),
(485,89,NULL,NULL,'ALARMAS',NULL,5),
(507,55,'1',1,'Principal',NULL,1),
(508,55,'2',2,'Cochera',NULL,1),
(509,56,NULL,1,'Cable Modem - TASS',NULL,2),
(510,56,NULL,4,'3G/LTE',NULL,2),
(511,57,'10',NULL,'CAMARAS',NULL,3),
(512,57,'10',NULL,'CAMARAS',NULL,3),
(513,58,'10',NULL,'CAMARAS',NULL,4),
(514,58,'10',NULL,'CAMARAS',NULL,4),
(515,58,'30',NULL,'CAMARAS',NULL,4),
(516,59,NULL,NULL,'ALARMAS',NULL,5),
(517,60,NULL,NULL,'APP MONITOREO',NULL,6),
(578,91,'1',3,'Servicio',NULL,1),
(579,91,'1',4,'Terraza',NULL,1),
(580,91,'1',5,'Escalera',NULL,1),
(581,92,'1',1,'Cable Modem - TASS',NULL,2),
(582,92,'1',2,'Cable Modem - CLIENTE',NULL,2),
(583,92,'1',4,'3G/LTE',NULL,2),
(584,93,'5',NULL,'CAMARAS',NULL,3),
(585,93,'1',NULL,'CAMARAS',NULL,3),
(586,94,'2',NULL,'CAMARAS',NULL,4),
(587,94,'2',NULL,'CAMARAS',NULL,4),
(588,94,'2',NULL,'CAMARAS',NULL,4),
(589,94,'2',NULL,'CAMARAS',NULL,4),
(590,94,'12',NULL,'CAMARAS',NULL,4),
(591,95,'1',NULL,'ALARMAS',NULL,5),
(592,96,'1',NULL,'APP MONITOREO',NULL,6),
(593,106,'8',NULL,'CAMARAS',NULL,4),
(603,109,'1',1,'Principal',NULL,1),
(604,109,'1',2,'Cochera',NULL,1),
(605,109,'1',3,'Servicio',NULL,1),
(606,109,'1',4,'Terraza',NULL,1),
(607,110,'1',1,'Cable Modem - TASS',NULL,2),
(608,110,'1',2,'Cable Modem - CLIENTE',NULL,2),
(609,111,'8',NULL,'CAMARAS',NULL,3),
(610,112,'8',NULL,'CAMARAS',NULL,4),
(611,113,'1',NULL,'ALARMAS',NULL,5),
(612,114,'1',NULL,'APP MONITOREO',NULL,6);

/*Table structure for table `tb_sesores_alarmas` */

DROP TABLE IF EXISTS `tb_sesores_alarmas`;

CREATE TABLE `tb_sesores_alarmas` (
  `idSensorAlarma` int(11) NOT NULL AUTO_INCREMENT,
  `fk_idServicesAlarma` int(11) DEFAULT NULL,
  `n_zona_sensor` int(11) DEFAULT NULL,
  `area_cubierta` text DEFAULT NULL,
  `n_zona_tamper` int(11) DEFAULT NULL,
  `ubicacion` text DEFAULT NULL,
  `idDvr` int(11) DEFAULT NULL,
  `idCamara` int(11) DEFAULT NULL,
  `n_serie_interno` text DEFAULT NULL,
  `n_serie_fabricante` text DEFAULT NULL,
  PRIMARY KEY (`idSensorAlarma`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tb_sesores_alarmas` */

/*Table structure for table `tb_shutdown_key` */

DROP TABLE IF EXISTS `tb_shutdown_key`;

CREATE TABLE `tb_shutdown_key` (
  `idShutdownKey` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idShutdownKey`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `tb_shutdown_key` */

insert  into `tb_shutdown_key`(`idShutdownKey`,`titulo`) values 
(1,'TECLA DE APAGADO 1'),
(2,'TECLA DE APAGADO 2'),
(3,'TECLA DE APAGADO 3');

/*Table structure for table `tb_sistemas_operativos` */

DROP TABLE IF EXISTS `tb_sistemas_operativos`;

CREATE TABLE `tb_sistemas_operativos` (
  `idSistemaOperativo` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idSistemaOperativo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `tb_sistemas_operativos` */

insert  into `tb_sistemas_operativos`(`idSistemaOperativo`,`descripcion`) values 
(1,'IOS'),
(2,'ANDROID');

/*Table structure for table `tb_smart_panic_license_pivote` */

DROP TABLE IF EXISTS `tb_smart_panic_license_pivote`;

CREATE TABLE `tb_smart_panic_license_pivote` (
  `idPivoteLicense` int(11) NOT NULL AUTO_INCREMENT,
  `idClientServicesSmartPanicFk` int(11) NOT NULL,
  `idUserLinceseFk` int(11) NOT NULL,
  PRIMARY KEY (`idPivoteLicense`),
  KEY `idClientServicesSmartPanicFk` (`idClientServicesSmartPanicFk`),
  KEY `idUserLinceseFk` (`idUserLinceseFk`),
  CONSTRAINT `tb_smart_panic_license_pivote_ibfk_1` FOREIGN KEY (`idClientServicesSmartPanicFk`) REFERENCES `tb_client_services_smart_panic` (`idClientServicesSmartPanic`),
  CONSTRAINT `tb_smart_panic_license_pivote_ibfk_2` FOREIGN KEY (`idUserLinceseFk`) REFERENCES `tb_user_license` (`idUserLicense`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tb_smart_panic_license_pivote` */

/*Table structure for table `tb_status` */

DROP TABLE IF EXISTS `tb_status`;

CREATE TABLE `tb_status` (
  `idStatusTenant` int(255) NOT NULL,
  `statusTenantName` varchar(255) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idStatusTenant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci ROW_FORMAT=COMPACT;

/*Data for the table `tb_status` */

insert  into `tb_status`(`idStatusTenant`,`statusTenantName`) values 
(-1,'Eliminado'),
(0,'Inactivo'),
(1,'Activo');

/*Table structure for table `tb_statusticket` */

DROP TABLE IF EXISTS `tb_statusticket`;

CREATE TABLE `tb_statusticket` (
  `idStatus` varchar(255) COLLATE utf8mb3_spanish2_ci NOT NULL,
  `statusName` varchar(255) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` varchar(255) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idStatus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci ROW_FORMAT=COMPACT;

/*Data for the table `tb_statusticket` */

insert  into `tb_statusticket`(`idStatus`,`statusName`,`idTypeTicketKf`) values 
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

/*Table structure for table `tb_sys_code` */

DROP TABLE IF EXISTS `tb_sys_code`;

CREATE TABLE `tb_sys_code` (
  `idCode` int(11) DEFAULT NULL,
  `code` varchar(200) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  `description` varchar(3) COLLATE utf8mb3_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

/*Data for the table `tb_sys_code` */

insert  into `tb_sys_code`(`idCode`,`code`,`description`) values 
(1,'279','TK');

/*Table structure for table `tb_sys_param` */

DROP TABLE IF EXISTS `tb_sys_param`;

CREATE TABLE `tb_sys_param` (
  `idParam` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `value` varchar(100) COLLATE utf8mb3_swedish_ci DEFAULT NULL,
  `description` varchar(100) COLLATE utf8mb3_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`idParam`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_swedish_ci;

/*Data for the table `tb_sys_param` */

insert  into `tb_sys_param`(`idParam`,`value`,`description`) values 
(1,'sistemaonline@coferba.com.ar','USUARIO SMT MAIL'),
(2,'Sistema2018Online','CLAVE SMT MAIL'),
(6,'20:00','HORA DE MAIL DE VERIFICACION DE MAIL PARA ADMINISTRADORES DE CONSORCIO'),
(7,'ventas@coferba.com.ar','MAIL DE VENTAS'),
(8,'tecnica@coferba.com.ar','MAIL SERVICO TECNICO'),
(9,'cobranzas@coferba.com.ar','MAIL FACTURACION'),
(10,'administracion@coferba.com.ar','MAIL ADMINISTRATIVO'),
(11,'ULTIMA CONEXION SISTEMA ADMIN','00:00:00');

/*Table structure for table `tb_systemunderlock` */

DROP TABLE IF EXISTS `tb_systemunderlock`;

CREATE TABLE `tb_systemunderlock` (
  `idSystemUnderLock` int(11) NOT NULL AUTO_INCREMENT,
  `idContratoFk` int(11) DEFAULT NULL,
  `isSystemUnderLock` int(11) DEFAULT NULL COMMENT 'Value is 1 or 0 (yes/no)',
  `customerHasKeys` int(11) DEFAULT NULL COMMENT 'value it will be 1 if has the key.',
  `companyHasKeys` int(11) DEFAULT NULL COMMENT 'value it will be 1 if has the key.',
  `comment_systemUnderLock` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idSystemUnderLock`),
  UNIQUE KEY `idContratoFk_INDEX_1` (`idContratoFk`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `tb_systemunderlock` */

insert  into `tb_systemunderlock`(`idSystemUnderLock`,`idContratoFk`,`isSystemUnderLock`,`customerHasKeys`,`companyHasKeys`,`comment_systemUnderLock`) values 
(1,6,1,1,0,'Probando'),
(2,9,1,1,1,'activo'),
(3,12,1,0,1,'Activo'),
(4,17,1,1,1,'Todo OK');

/*Table structure for table `tb_tax` */

DROP TABLE IF EXISTS `tb_tax`;

CREATE TABLE `tb_tax` (
  `idTypeTax` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `typeTax` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idTypeTax`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_tax` */

insert  into `tb_tax`(`idTypeTax`,`typeTax`) values 
(1,'CONSUMIDOR FINAL'),
(2,'RESP. INSCRIPTO'),
(3,'MONOTRIBUTO'),
(4,'EXENTO');

/*Table structure for table `tb_tickets` */

DROP TABLE IF EXISTS `tb_tickets`;

CREATE TABLE `tb_tickets` (
  `idTicket` int(11) NOT NULL AUTO_INCREMENT,
  `dateCreated` timestamp NULL DEFAULT current_timestamp(),
  `dateRecibeCompany` datetime DEFAULT NULL,
  `idStatusTicketKf` int(11) DEFAULT 2,
  `codTicket` varchar(50) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` int(11) NOT NULL COMMENT 'ID DEL TIPO DE TICKET',
  `idRequestKf` int(11) NOT NULL,
  `idUserTenantKf` int(11) DEFAULT NULL COMMENT 'ID DEL INQUILINO',
  `idOWnerKf` int(11) DEFAULT NULL COMMENT 'ID DEL PROPIETARIO',
  `idUserAdminKf` int(11) DEFAULT NULL COMMENT 'ID ADMIN COFERBA',
  `idUserCompany` int(11) DEFAULT NULL COMMENT 'ID USUARIO EMPRESA',
  `idUserEnterpriceKf` int(11) NOT NULL COMMENT 'ID ADMIN CONSORCIO',
  `idUserAttendantKf` int(11) DEFAULT NULL COMMENT 'ID DEL ENCARGADO',
  `numberItemes` int(11) DEFAULT NULL COMMENT 'CANTIDAD DE LLAVEROS O ELEMENTOS ',
  `idTypeOfKeysKf` varchar(255) COLLATE utf8mb3_spanish2_ci DEFAULT NULL COMMENT 'ID DE LOS TIPOS DE LLAVEROS A SOLICITAR',
  `itemToDisabled` varchar(255) COLLATE utf8mb3_spanish2_ci DEFAULT NULL COMMENT 'CODIGO Y TIPO DE LOS LLAVEROS A DAR DE BAJA',
  `idReasonDisabledItemKf` int(11) DEFAULT NULL COMMENT 'Razon Cancelar item',
  `idTypeOuther` int(11) DEFAULT NULL COMMENT 'TIPO DE CONSULTA',
  `mailContactConsult` varchar(255) COLLATE utf8mb3_spanish2_ci DEFAULT NULL COMMENT 'MAIL DE CONTACTO PARA CONSULTAS',
  `SA_NRO_ORDER` int(255) DEFAULT NULL COMMENT 'ID DE NUMERO DE ORDEN QUE SERA ASIGNADO POR EL SISTEMA LOCAL',
  `descriptionComment` varchar(255) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  `descriptionOrder` varchar(500) COLLATE utf8mb3_spanish2_ci DEFAULT NULL COMMENT 'DESCRIPCION DEL PEDIDO',
  `isCommentOrDesccriptionChange` int(4) DEFAULT NULL,
  `idTypeServicesKf` int(11) DEFAULT NULL COMMENT 'ID DEL TIPO SERVICIO SOBRE EL CUAL SE SOLICITA EL SERVICIO TECNICO',
  `totalService` decimal(18,2) DEFAULT 0.00 COMMENT 'MONTO TOTAL DEL SERVICIO',
  `addressConsul` varchar(255) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  `idProfileKf` int(11) DEFAULT NULL,
  `idOpcionLowTicketKf` int(11) DEFAULT NULL,
  `idTypeOfOptionKf` int(11) DEFAULT NULL COMMENT 'ID DEL TIPO DE SOLICITUD -ENCARGADO/OTRO/EDIFICIO',
  `idCompanyKf` int(11) DEFAULT NULL,
  `idAdressKf` int(11) DEFAULT NULL COMMENT 'DIRECCION DEL TICKET',
  `idDepartmentKf` int(11) DEFAULT NULL COMMENT 'ID DEL DEPARTAMENTO',
  `idUserCancelTicket` int(11) DEFAULT NULL,
  `isCancelRequested` int(4) DEFAULT NULL COMMENT 'NOTIFICA A COFERBA SOBRE LA CANCELACION SUJETA A APROBACION',
  `reasonForCancelTicket` varchar(255) COLLATE utf8mb3_spanish2_ci DEFAULT NULL COMMENT 'NOTA INDICANDO LA RAZON DE LA CANCELACION DEL TICKET',
  `dateCancel` datetime DEFAULT NULL,
  `idUserApprovedTicket` int(11) DEFAULT NULL,
  `dateRecibedAdmin` datetime DEFAULT NULL,
  `idOtherKf` int(11) DEFAULT NULL COMMENT 'ID DEL ENGARGADO DE TIPO "Otro"',
  `isChangeDeliverylRequested` int(4) DEFAULT NULL COMMENT 'NOTIFICA A COFERBA SOBRE EL CAMBIO DE ENVIO SUJETO A APROBACION',
  `idUserHasChangeTicket` tinyint(4) DEFAULT NULL,
  `idTypeDeliveryKf` int(11) DEFAULT NULL COMMENT 'ID DE LA OPCION DE ENVIO',
  `idWhoPickUp` int(11) DEFAULT NULL,
  `idUserAttendantKfDelivery` int(11) DEFAULT NULL COMMENT 'ID DEL ENCARGADO QUE RECIBE LA LLAVE',
  `thirdPersonNames` varchar(255) COLLATE utf8mb3_spanish2_ci DEFAULT NULL COMMENT 'NOMBRE DE LA TERCERA PERSONA QUE RECIBE O RETIRA',
  `thirdPersonPhone` varchar(255) COLLATE utf8mb3_spanish2_ci DEFAULT NULL COMMENT 'TELEFONO DE LA TERCERA PERSONA',
  `thirdPersonId` int(11) DEFAULT NULL COMMENT 'DNI DE LA TERCERA PERSONA',
  `isNew` tinyint(4) DEFAULT NULL,
  `isAplicate` tinyint(4) DEFAULT NULL,
  `idStatusTicketKfOld` int(11) DEFAULT NULL COMMENT 'ID DEL STATUS EN LA QUE SE ENCONTRABA EL TICKET ANTE DE UNA CANCELACION',
  `sendUserNotification` tinyint(4) DEFAULT NULL COMMENT 'Autorizar a notificar y permitir visualizar pedido al usuario o empresa',
  `totalGestion` decimal(18,2) DEFAULT 0.00,
  `totalLlave` decimal(18,2) DEFAULT 0.00,
  `totalEnvio` decimal(18,2) DEFAULT 0.00,
  `urlToken` varchar(255) COLLATE utf8mb3_spanish2_ci DEFAULT NULL COMMENT 'URL TOKEN UTILIZADO PARA APROBAR O RECHAZAR UN PEDIDO',
  PRIMARY KEY (`idTicket`)
) ENGINE=MyISAM AUTO_INCREMENT=147 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

/*Data for the table `tb_tickets` */

insert  into `tb_tickets`(`idTicket`,`dateCreated`,`dateRecibeCompany`,`idStatusTicketKf`,`codTicket`,`idTypeTicketKf`,`idRequestKf`,`idUserTenantKf`,`idOWnerKf`,`idUserAdminKf`,`idUserCompany`,`idUserEnterpriceKf`,`idUserAttendantKf`,`numberItemes`,`idTypeOfKeysKf`,`itemToDisabled`,`idReasonDisabledItemKf`,`idTypeOuther`,`mailContactConsult`,`SA_NRO_ORDER`,`descriptionComment`,`descriptionOrder`,`isCommentOrDesccriptionChange`,`idTypeServicesKf`,`totalService`,`addressConsul`,`idProfileKf`,`idOpcionLowTicketKf`,`idTypeOfOptionKf`,`idCompanyKf`,`idAdressKf`,`idDepartmentKf`,`idUserCancelTicket`,`isCancelRequested`,`reasonForCancelTicket`,`dateCancel`,`idUserApprovedTicket`,`dateRecibedAdmin`,`idOtherKf`,`isChangeDeliverylRequested`,`idUserHasChangeTicket`,`idTypeDeliveryKf`,`idWhoPickUp`,`idUserAttendantKfDelivery`,`thirdPersonNames`,`thirdPersonPhone`,`thirdPersonId`,`isNew`,`isAplicate`,`idStatusTicketKfOld`,`sendUserNotification`,`totalGestion`,`totalLlave`,`totalEnvio`,`urlToken`) values 
(131,'2019-09-09 22:48:42',NULL,2,'TK-00000264',1,0,82,0,31,NULL,0,0,1,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,270.99,NULL,1,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,1,1,NULL,NULL,NULL,NULL,1,NULL,NULL,1,260.00,10.99,0.00,'VWMWNeeu2oIFapiJnXpb'),
(132,'2019-09-09 23:00:40',NULL,2,'TK-00000265',1,0,74,71,0,NULL,0,0,1,'{\"keys\":[{\"idKeyKf\":\"4\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,320.99,NULL,3,NULL,NULL,5,12,120,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,2,2,77,NULL,NULL,NULL,1,NULL,NULL,NULL,0.00,10.99,310.00,'AgYvWzRJ.BioZdKAZ6-h'),
(133,'2019-09-10 13:45:28',NULL,2,'TK-00000266',1,0,0,71,0,NULL,0,0,2,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,451.98,NULL,3,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,2,3,NULL,'Carolina Vasquez','112243242344',95929321,1,NULL,NULL,NULL,260.00,21.98,170.00,'mWGfB0Zck4.mGJStLnol'),
(134,'2019-09-10 14:05:14',NULL,2,'TK-00000267',1,0,0,0,31,NULL,0,84,2,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,'',NULL,1,NULL,281.98,NULL,1,NULL,1,5,11,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,1,1,NULL,NULL,NULL,NULL,1,NULL,NULL,1,260.00,21.98,0.00,'hUAAX:216vPAKcA0lZgP'),
(135,'2019-09-10 14:11:52',NULL,2,'TK-00000268',1,0,0,0,31,NULL,0,76,1,'{\"keys\":[{\"idKeyKf\":\"4\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,320.99,NULL,1,NULL,1,5,12,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,2,2,77,NULL,NULL,NULL,1,NULL,NULL,1,0.00,10.99,310.00,'6.g3DR0TYX54F8jubqWa'),
(136,'2019-09-10 22:18:35',NULL,2,'TK-00000269',1,0,0,71,31,NULL,0,0,1,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,270.99,NULL,1,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,1,1,NULL,NULL,NULL,NULL,1,NULL,NULL,1,260.00,10.99,0.00,'Qv4eEcdelsCe97BZAEx8'),
(137,'2019-09-10 22:20:51',NULL,3,'TK-00000270',1,0,0,71,31,NULL,0,0,1,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,270.99,NULL,1,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,1,'2020-07-30 04:41:48',0,NULL,NULL,1,1,NULL,NULL,NULL,NULL,1,NULL,NULL,1,260.00,10.99,0.00,'9IVjBWqHs.O1qjeP1k8V'),
(138,'2019-09-10 22:25:05',NULL,3,'TK-00000271',1,0,0,71,31,NULL,0,0,2,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,451.98,NULL,1,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,1,'2020-07-30 04:41:44',0,NULL,NULL,2,2,89,NULL,NULL,NULL,1,NULL,NULL,1,260.00,21.98,170.00,'T7M3fmxLYARN-LuMz0v1'),
(139,'2019-09-10 22:26:43',NULL,3,'TK-00000272',1,0,0,71,31,NULL,0,0,2,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,451.98,NULL,1,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,31,'2019-09-11 03:30:03',0,NULL,NULL,2,2,84,NULL,NULL,NULL,1,NULL,NULL,1,260.00,21.98,170.00,'5OK79n3RuzsjDbHIJ1QI'),
(140,'2019-09-10 22:27:36',NULL,3,'TK-00000273',1,0,0,71,31,NULL,0,0,2,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,281.98,NULL,1,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,31,'2019-09-11 03:30:00',0,NULL,NULL,1,1,NULL,NULL,NULL,NULL,1,NULL,NULL,1,260.00,21.98,0.00,'VayOcRo.yvAxwjEw647H'),
(141,'2019-09-10 22:29:14',NULL,3,'TK-00000274',1,0,0,71,31,NULL,0,0,2,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,451.98,NULL,1,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,31,'2019-09-11 03:29:58',0,NULL,NULL,2,2,78,NULL,NULL,NULL,1,NULL,NULL,1,260.00,21.98,170.00,'cDQsHZraOMIjwFfyObvo'),
(142,'2019-09-10 22:31:06',NULL,3,'TK-00000275',1,0,0,71,31,NULL,0,0,2,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,451.98,NULL,1,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,1,'2020-07-30 04:41:38',0,NULL,NULL,2,2,84,NULL,NULL,NULL,1,NULL,NULL,1,260.00,21.98,170.00,'ZQhaJab_lapt3T:4r9gf'),
(143,'2019-09-10 23:34:58',NULL,3,'TK-00000276',1,0,0,71,31,NULL,0,0,1,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,270.99,NULL,1,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,1,'2020-07-30 04:41:32',0,NULL,NULL,1,1,NULL,NULL,NULL,NULL,1,NULL,NULL,1,260.00,10.99,0.00,'sxN1zFdxa47GUjVtvZj3'),
(144,'2019-09-10 23:41:02',NULL,3,'TK-00000277',1,0,0,71,31,NULL,0,0,1,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,440.99,NULL,1,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,1,'2020-07-30 04:41:27',0,NULL,1,2,2,89,NULL,NULL,NULL,1,NULL,NULL,1,260.00,10.99,170.00,'--RfxK.mYUf7DrK21_kn'),
(145,'2019-09-10 23:42:50',NULL,6,'TK-00000278',1,0,0,71,31,NULL,0,0,1,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,100.99,NULL,1,NULL,NULL,5,11,100,71,NULL,'prueba','2021-02-27 12:55:57',1,'2020-03-19 03:36:58',0,NULL,1,1,1,NULL,NULL,NULL,NULL,1,NULL,NULL,1,260.00,10.99,0.00,'fQKigD_OB1WbFX4ohqe.'),
(146,'2019-09-10 23:54:26',NULL,6,'TK-00000279',1,0,0,71,31,NULL,0,0,1,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,'asdsadas',NULL,1,NULL,100.99,NULL,1,NULL,NULL,5,11,100,1,NULL,'ghfghf','2020-03-19 03:37:53',NULL,NULL,0,NULL,1,1,1,NULL,NULL,NULL,NULL,1,NULL,NULL,1,260.00,10.99,0.00,'h5RgaRWBPbxSsdGq:73g'),
(129,'2019-09-06 23:56:49',NULL,3,'TK-00000262',1,0,0,71,0,NULL,0,0,2,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,281.98,NULL,3,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,31,'2019-09-07 05:19:56',0,NULL,NULL,1,1,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,260.00,21.98,0.00,'tRHY0xO-xpP7ozeu1FJg'),
(130,'2019-09-07 00:35:58',NULL,2,'TK-00000263',1,0,0,0,31,NULL,0,0,1,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,440.99,NULL,1,NULL,2,5,11,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,2,2,89,NULL,NULL,NULL,1,NULL,NULL,1,260.00,10.99,170.00,'l7:LyXlS9ksUfLmp7y6E');

/*Table structure for table `tb_tipo_conexion_remoto` */

DROP TABLE IF EXISTS `tb_tipo_conexion_remoto`;

CREATE TABLE `tb_tipo_conexion_remoto` (
  `idTipoConexionRemoto` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `tabla` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idTipoConexionRemoto`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `tb_tipo_conexion_remoto` */

insert  into `tb_tipo_conexion_remoto`(`idTipoConexionRemoto`,`descripcion`,`tabla`) values 
(1,'Línea Telefónica','tb_alarm_line_phone'),
(2,'Módulo IP','tb_alarm_module_ip'),
(3,'Módulo GPRS','tb_alarm_module_gps');

/*Table structure for table `tb_tipo_inmueble` */

DROP TABLE IF EXISTS `tb_tipo_inmueble`;

CREATE TABLE `tb_tipo_inmueble` (
  `idTipoInmueble` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idTipoInmueble`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `tb_tipo_inmueble` */

insert  into `tb_tipo_inmueble`(`idTipoInmueble`,`descripcion`) values 
(1,'Departamento'),
(2,'Casa'),
(3,'Local');

/*Table structure for table `tb_tipo_mails` */

DROP TABLE IF EXISTS `tb_tipo_mails`;

CREATE TABLE `tb_tipo_mails` (
  `idTipoMail` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idTipoMail`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `tb_tipo_mails` */

insert  into `tb_tipo_mails`(`idTipoMail`,`descripcion`) values 
(1,'LLAVEROS'),
(2,'SERVICIOS'),
(3,'COBRANZA'),
(4,'ADMINISTRATIVO'),
(5,'GUARDIA'),
(6,'EMERGENCIA');

/*Table structure for table `tb_tipos_servicios_internet` */

DROP TABLE IF EXISTS `tb_tipos_servicios_internet`;

CREATE TABLE `tb_tipos_servicios_internet` (
  `idTipoServicioInternet` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idTipoServicioInternet`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `tb_tipos_servicios_internet` */

insert  into `tb_tipos_servicios_internet`(`idTipoServicioInternet`,`nombre`) values 
(1,'Cable Modem - TASS'),
(2,'Cable Modem - CLIENTE'),
(3,'GPRS'),
(4,'3G/LTE');

/*Table structure for table `tb_tmp_delivery_data` */

DROP TABLE IF EXISTS `tb_tmp_delivery_data`;

CREATE TABLE `tb_tmp_delivery_data` (
  `idTmpDeliveryData` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID DE LA INFO TEMPORAL ASOCIADO A UN TICKET',
  `tmp_idTicketKf` int(11) NOT NULL COMMENT 'ID DEL TICKET ',
  `tmp_thirdPersonNames` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish2_ci DEFAULT NULL COMMENT 'NOMBRE DE LA TERCERA PERSONA QUE RECIBE O RETIRA',
  `tmp_thirdPersonPhone` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish2_ci DEFAULT NULL COMMENT 'TELEFONO DE LA TERCERA PERSONA',
  `tmp_thirdPersonId` int(11) DEFAULT NULL COMMENT 'DNI DE LA TERCERA PERSONA',
  `tmp_idUserAttendantKfDelivery` int(11) DEFAULT NULL COMMENT 'ID DEL ENCARGADO QUE RECIBE LA LLAVE',
  `tmp_idTypeDeliveryKf` int(11) DEFAULT NULL,
  `tmp_totalService` decimal(18,2) DEFAULT NULL,
  `tmp_idWhoPickUpKf` int(11) DEFAULT NULL,
  `tmp_idUserRequestChOrCancel` int(11) DEFAULT NULL COMMENT 'ID DEL USUARIO QUE SOLICITA EL CAMBIO DE ENVIO O CANCELACION',
  `tmp_reasonForCancelTicket` varchar(255) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `tmp_isChApproved` int(4) DEFAULT NULL COMMENT 'VALOR SUMINISTRADO POR SISTEMA LOCAL COFERBA',
  `tmp_isCancelApproved` int(4) DEFAULT NULL COMMENT 'VALOR SUMINISTRADO POR SISTEMA LOCAL COFERBA',
  `tmp_isChOrCancelApplied` int(4) DEFAULT NULL,
  `dateOfRequestByUser` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`idTmpDeliveryData`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

/*Data for the table `tb_tmp_delivery_data` */

/*Table structure for table `tb_totem_model` */

DROP TABLE IF EXISTS `tb_totem_model`;

CREATE TABLE `tb_totem_model` (
  `idTotenModel` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `totenModel` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`idTotenModel`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_totem_model` */

insert  into `tb_totem_model`(`idTotenModel`,`totenModel`) values 
(1,'DE PIE'),
(2,'DE PARED');

/*Table structure for table `tb_type_attendant` */

DROP TABLE IF EXISTS `tb_type_attendant`;

CREATE TABLE `tb_type_attendant` (
  `idTyepeAttendant` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nameTypeAttendant` varchar(100) COLLATE utf8mb3_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`idTyepeAttendant`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_swedish_ci;

/*Data for the table `tb_type_attendant` */

insert  into `tb_type_attendant`(`idTyepeAttendant`,`nameTypeAttendant`) values 
(1,'Otro'),
(2,'Titular'),
(3,'Suplente'),
(4,'Ayudante'),
(5,'Intendente');

/*Table structure for table `tb_type_contrato` */

DROP TABLE IF EXISTS `tb_type_contrato`;

CREATE TABLE `tb_type_contrato` (
  `idTypeContrato` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idTypeContrato`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `tb_type_contrato` */

insert  into `tb_type_contrato`(`idTypeContrato`,`description`) values 
(1,'VENTA'),
(2,'COMODATO'),
(3,'INTEGRA 3.0 – COMODATO'),
(4,'INTEGRA 2.0 – VENTA'),
(5,'INTEGRA 2.0 – COMODATO'),
(6,'MANTENIMIENTO EQUIPO INSTALADO');

/*Table structure for table `tb_type_delivery` */

DROP TABLE IF EXISTS `tb_type_delivery`;

CREATE TABLE `tb_type_delivery` (
  `idTypeDelivery` int(11) DEFAULT NULL,
  `typeDelivery` varchar(255) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  `amount` decimal(18,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

/*Data for the table `tb_type_delivery` */

insert  into `tb_type_delivery`(`idTypeDelivery`,`typeDelivery`,`amount`) values 
(1,'RETIRO POR OFICINA',NULL),
(2,'ENTREGA EN EL EDIFICIO',NULL);

/*Table structure for table `tb_type_gps` */

DROP TABLE IF EXISTS `tb_type_gps`;

CREATE TABLE `tb_type_gps` (
  `idTypeGps` int(11) NOT NULL AUTO_INCREMENT,
  `typeGps` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idTypeGps`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_type_gps` */

insert  into `tb_type_gps`(`idTypeGps`,`typeGps`) values 
(1,'GPS 1'),
(2,'GPS 2'),
(3,'GPS 3');

/*Table structure for table `tb_type_internet` */

DROP TABLE IF EXISTS `tb_type_internet`;

CREATE TABLE `tb_type_internet` (
  `idTypeInternet` int(50) unsigned NOT NULL AUTO_INCREMENT,
  `typeInternet` varchar(50) DEFAULT '',
  PRIMARY KEY (`idTypeInternet`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_type_internet` */

insert  into `tb_type_internet`(`idTypeInternet`,`typeInternet`) values 
(1,'M2M - 10Mbps'),
(2,'M2M - 25Mbps'),
(3,'DATOS - 500Mbps'),
(4,'10/1 Mbps'),
(5,'50/1 Mbps'),
(6,'DATOS - 25 Mbps');

/*Table structure for table `tb_type_maintenance` */

DROP TABLE IF EXISTS `tb_type_maintenance`;

CREATE TABLE `tb_type_maintenance` (
  `idTypeMaintenance` int(11) NOT NULL AUTO_INCREMENT,
  `typeMaintenance` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idTypeMaintenance`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_type_maintenance` */

insert  into `tb_type_maintenance`(`idTypeMaintenance`,`typeMaintenance`) values 
(1,'MANO DE OBRA Y MATERIALES'),
(2,'SOLO MANO DE OBRA'),
(3,'MIXTO');

/*Table structure for table `tb_type_outher` */

DROP TABLE IF EXISTS `tb_type_outher`;

CREATE TABLE `tb_type_outher` (
  `idTypeOuther` int(11) NOT NULL,
  `TypeOuther` varchar(255) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTypeOuther`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

/*Data for the table `tb_type_outher` */

insert  into `tb_type_outher`(`idTypeOuther`,`TypeOuther`) values 
(1,'VENTA'),
(2,'LLAVEROS'),
(3,'SERVICIOS TECNICOS'),
(4,'FACTURACION'),
(5,'ADMINISTRATIVAS'),
(6,'SEGURIDAD');

/*Table structure for table `tb_type_services` */

DROP TABLE IF EXISTS `tb_type_services`;

CREATE TABLE `tb_type_services` (
  `idTypeServices` int(11) NOT NULL AUTO_INCREMENT,
  `typeServices` varchar(255) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  `SA_ID_TYPE` int(11) DEFAULT NULL,
  PRIMARY KEY (`idTypeServices`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

/*Data for the table `tb_type_services` */

insert  into `tb_type_services`(`idTypeServices`,`typeServices`,`SA_ID_TYPE`) values 
(1,'Cambio de Camara',NULL),
(2,'Cambio de Lector de llave HID',NULL),
(3,'Cambio de Cerradura Electromagnetica',NULL),
(4,'Cambio de Lector de llave HID',NULL),
(5,'Cambio de Molinete',NULL),
(6,'Cambio de Control de Acceso',NULL);

/*Table structure for table `tb_typetenant` */

DROP TABLE IF EXISTS `tb_typetenant`;

CREATE TABLE `tb_typetenant` (
  `idTypeTenant` varchar(255) COLLATE utf8mb3_spanish2_ci NOT NULL,
  `typeTenantName` varchar(255) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTypeTenant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

/*Data for the table `tb_typetenant` */

insert  into `tb_typetenant`(`idTypeTenant`,`typeTenantName`) values 
('1','Propietario'),
('2','Inquilino');

/*Table structure for table `tb_typeticket` */

DROP TABLE IF EXISTS `tb_typeticket`;

CREATE TABLE `tb_typeticket` (
  `idTypeTicket` int(11) NOT NULL AUTO_INCREMENT,
  `TypeTicketName` varchar(255) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTypeTicket`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

/*Data for the table `tb_typeticket` */

insert  into `tb_typeticket`(`idTypeTicket`,`TypeTicketName`) values 
(1,'ALTA DE LLAVEROS'),
(2,'BAJA DE LLAVEROS'),
(3,'SERVICIO TECNICO'),
(4,'OTRAS SOLICITUDES O CONSULTAS');

/*Table structure for table `tb_user` */

DROP TABLE IF EXISTS `tb_user`;

CREATE TABLE `tb_user` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `fullNameUser` varchar(50) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  `emailUser` varchar(50) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  `phoneNumberUser` varchar(50) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  `phoneLocalNumberUser` varchar(25) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  `passwordUser` varchar(50) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  `idProfileKf` int(11) unsigned DEFAULT NULL,
  `dateCreated` timestamp NULL DEFAULT current_timestamp(),
  `idCompanyKf` int(11) DEFAULT NULL,
  `resetPasword` tinyint(4) DEFAULT 0,
  `idAddresKf` int(11) DEFAULT NULL,
  `idTyepeAttendantKf` int(11) unsigned DEFAULT NULL COMMENT 'TIPO DE ENCARGADO',
  `descOther` text COLLATE utf8mb3_spanish2_ci DEFAULT NULL COMMENT 'ENCARGADO DE TIPO OTRO',
  `idDepartmentKf` int(11) DEFAULT NULL COMMENT 'DEPARTAMENTO DE EL INQUILINO O PROPIETARIO',
  `isDepartmentApproved` tinyint(4) DEFAULT NULL COMMENT 'APROBADO O NO  EL DEPARTAMENTO DEL INQUILINO',
  `isEdit` tinyint(11) DEFAULT 0,
  `requireAuthentication` tinyint(11) DEFAULT 1,
  `idTypeTenantKf` int(11) DEFAULT NULL,
  `idStatusKf` int(11) unsigned DEFAULT NULL,
  `tokenMail` varchar(300) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  `isConfirmatedMail` tinyint(4) DEFAULT 0,
  `SA_ID` int(11) DEFAULT NULL,
  `idSysProfileFk` int(11) DEFAULT NULL,
  `dni` varchar(50) COLLATE utf8mb3_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  KEY `idProfileKf` (`idProfileKf`),
  KEY `idAddresKf` (`idAddresKf`),
  KEY `idCompanyKf` (`idCompanyKf`),
  CONSTRAINT `tb_user_ibfk_1` FOREIGN KEY (`idProfileKf`) REFERENCES `tb_profile` (`idProfile`) ON UPDATE NO ACTION,
  CONSTRAINT `tb_user_ibfk_2` FOREIGN KEY (`idAddresKf`) REFERENCES `tb_addres` (`idAdress`),
  CONSTRAINT `tb_user_ibfk_3` FOREIGN KEY (`idCompanyKf`) REFERENCES `tb_company` (`idCompany`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

/*Data for the table `tb_user` */

insert  into `tb_user`(`idUser`,`fullNameUser`,`emailUser`,`phoneNumberUser`,`phoneLocalNumberUser`,`passwordUser`,`idProfileKf`,`dateCreated`,`idCompanyKf`,`resetPasword`,`idAddresKf`,`idTyepeAttendantKf`,`descOther`,`idDepartmentKf`,`isDepartmentApproved`,`isEdit`,`requireAuthentication`,`idTypeTenantKf`,`idStatusKf`,`tokenMail`,`isConfirmatedMail`,`SA_ID`,`idSysProfileFk`,`dni`) values 
(1,'admin sistema','soporte@coferba.com.ar','(054) 9 11 2323-2323','91124759596','fe703d258c7ef5f50b71e06565a65aa07194907f',1,'2018-02-16 09:01:22',NULL,0,NULL,NULL,'',NULL,NULL,1,NULL,NULL,1,'',1,NULL,8,'565656'),
(71,'David Eduardo Rincon','davideduardo.luengo@hotmail.com','1122333444555666','1122333444555666','870e8768d555d80e0aeb44870c081f5563d90bd3',1,'2018-10-21 23:33:22',5,0,11,NULL,NULL,NULL,NULL,1,NULL,1,1,'3Jh0NuqLHa',1,3833,8,NULL),
(72,'leandro figueroa','lean.figueroa@gmail.com','123213213213213','123213213213213','1f82ea75c5cc526729e2d581aeb3aeccfef4407e',5,'2018-10-29 13:27:43',5,0,12,NULL,NULL,117,1,0,NULL,2,1,'JbuVXny0Jr',1,NULL,NULL,NULL),
(73,'leandro2 figueroa2','leandro.figueroa@coferba.com.ar','1122356388','123213213213213','1f82ea75c5cc526729e2d581aeb3aeccfef4407e',3,'2018-10-29 13:48:52',5,0,12,NULL,NULL,NULL,NULL,1,NULL,1,1,'OLtCaObFgO',1,NULL,NULL,NULL),
(74,'Eduardo Rincon','rexx84@gmail.com','123213213213213','123213213213213','870e8768d555d80e0aeb44870c081f5563d90bd3',5,'2018-10-29 13:58:23',5,0,12,NULL,NULL,120,1,1,NULL,2,1,'XTrpLMkZiG',1,NULL,10,NULL),
(75,'Encargado Prueba','encargadoprueba@asdasda','123213213213213','1123232434333423','c4f9fcd7be6b041073f1b23a2bf80bd1d831292e',6,'2018-12-19 14:30:57',5,1,11,4,NULL,103,1,1,1,2,1,'gQuGxR2Zoo',1,NULL,NULL,NULL),
(76,'Roberto Higuera','rhiguera@fffff.com','123213213213214','123213213213213','03d000df4fa813c9d0c93e59a0ba3b6dc5c88399',6,'2019-01-18 01:10:24',5,0,12,2,NULL,NULL,NULL,1,NULL,1,1,'ZWsfbNEEXB',1,NULL,NULL,NULL),
(77,'Esteban Moreli','emoreli@akjsdsadas.com','123213213213213','11233243253243','44b07ccf74fd8a488be0b4aa0593beff5ac6f3ef',6,'2019-01-18 01:31:36',5,1,12,3,NULL,NULL,NULL,1,0,0,1,'uQzz412uH5',1,NULL,NULL,NULL),
(78,'Victor Gonzalez','vgonzalez@asdadsadwq.com','77788787878','','03d000df4fa813c9d0c93e59a0ba3b6dc5c88399',6,'2019-01-18 01:33:07',5,0,11,2,NULL,NULL,NULL,1,1,1,1,'69bMxpjXQ8',1,NULL,NULL,NULL),
(79,'Sofia Rincon','sofia.rincon@asdasdsad.com','123213213213213','123213213213213','03d000df4fa813c9d0c93e59a0ba3b6dc5c88399',4,'2019-01-22 01:06:32',5,0,NULL,NULL,NULL,NULL,NULL,0,0,NULL,1,'NaUwCkVwH4',1,NULL,NULL,NULL),
(80,'Daniela Becerra','daniela.becerra@hoasdsad.com','123213213213213','123213213213213','03d000df4fa813c9d0c93e59a0ba3b6dc5c88399',5,'2019-02-10 22:23:37',5,0,12,NULL,NULL,128,1,1,NULL,2,1,'hXLcQRwWGn',1,NULL,NULL,NULL),
(81,'probando','probando@probando.com','123213123213','','f11131b2bcdf821dc9ff69b38e2712541439b9f8',5,'2019-07-27 14:29:15',5,1,11,NULL,NULL,108,1,1,NULL,2,1,'lxUXCkdgnZ',1,NULL,NULL,NULL),
(82,'asdsadas','asdsad@asdsad.com','11234234234234','12321311312','b9f4327bafdb162ed16fe0d6d4a50bde306ee08e',5,'2019-07-27 14:51:24',5,1,11,NULL,NULL,100,1,0,NULL,2,1,'HCU6UgT88X',1,NULL,NULL,NULL),
(83,'erewrrewrew','wqewqew@asdsad.com','11232132131','121321321','7be5fac0585900a65effd04d887cc62022b16a20',5,'2019-07-27 15:38:43',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,1,'yZAGdjTOLv',1,NULL,NULL,NULL),
(84,'Arturo Michelena','amichelena@asdas.com','','11232142132132','fc604011dbac13b0f6f0b89c81c0efe0271530c1',6,'2019-07-27 15:59:58',5,1,11,2,NULL,NULL,NULL,1,0,0,1,'WuYJFO1DZD',1,NULL,NULL,NULL),
(85,'Fernando Angulo','david.rincon.oracle@gmail.com','123213213','123213213','870e8768d555d80e0aeb44870c081f5563d90bd3',3,'2019-07-27 21:43:16',5,0,12,NULL,NULL,NULL,NULL,1,NULL,1,1,'7gVmCe4f3J',1,NULL,NULL,NULL),
(86,'David Eduardo Rincon','davideduardo.luengo2@hotmail.com','','01122356388','fa399d74e61282062d50aaf7eb6a9afc1b21f314',5,'2019-08-21 00:20:44',1,1,1,NULL,NULL,2,1,1,NULL,2,1,'K67aipTQu2',1,NULL,NULL,NULL),
(87,'Ernesto Araujo','earaujo@asdsad.com','','111232324324324','5365642294a7a05378e5e13cd44fa91c5f9b546a',6,'2019-08-29 20:12:26',1,1,1,2,NULL,NULL,NULL,1,0,0,1,'FLTvvGz5wZ',1,NULL,NULL,NULL),
(88,'Gabriel Gonzalez','ggonzalez@hotmail.com','11223544564356346','112322424233','e47ed8dab1b69a560435c3f4bff9d2679ab12233',6,'2019-08-29 20:13:21',1,1,2,2,NULL,NULL,NULL,1,0,0,1,'WM7HECe4EL',1,NULL,NULL,NULL),
(89,'Dionisio Machado','dmachado@asdasd.com','121232132134','112143435556','80662a250c92f9c05b965cbff69785fdc404d0c4',6,'2019-08-29 20:22:06',5,1,11,1,'Plomero',NULL,NULL,1,0,NULL,1,'YJh6f8Gxb0',1,NULL,NULL,NULL),
(90,'tester','tester@seguridadtass.com.ar','','1134343242423','c4bfc8777fbb8f54e03f4d5bcd1ff28fe347da3a',1,'2019-11-09 16:25:55',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'fxvMqFzwGK',1,NULL,8,NULL),
(91,'prueba','sfsdfdsfdfds','prueba',NULL,'13a6d4daa92304298f07df965a8e71a42a6d2047',1,'2019-11-09 16:26:53',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'FAMIVpMRxv',0,NULL,8,NULL),
(92,'German Malaver','german.malaver@asdasd.com','1123432432444','1123423432432','6956aa2ea365aa0cf67ba52265436016d751bd3e',6,'2020-07-10 20:32:47',1,1,2,2,NULL,NULL,NULL,1,NULL,1,1,'8S3z3UtLlR',1,NULL,NULL,NULL),
(93,'David Eduardo Rincon Luengo','rexx85@gmail.com','1122333334','1122356388','29474f7249c08b13cf44a0dce3c819183fc031d4',3,'2020-08-21 05:57:06',5,1,12,NULL,NULL,NULL,NULL,0,NULL,1,1,'RNqMUvoiqi',1,NULL,NULL,NULL);

/*Table structure for table `tb_user_license` */

DROP TABLE IF EXISTS `tb_user_license`;

CREATE TABLE `tb_user_license` (
  `idUserLicense` int(11) NOT NULL AUTO_INCREMENT,
  `idUserFk` int(11) DEFAULT NULL,
  `fullName` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `keyword` varchar(100) DEFAULT NULL,
  `idOS` tinyint(1) DEFAULT 1,
  `numberUserPassword` varchar(50) DEFAULT NULL,
  `profileUser` varchar(100) DEFAULT '',
  `idClientServicesSmartPanicFk` int(11) DEFAULT NULL,
  `idDetinationOfLicenseFk` int(11) DEFAULT NULL,
  `idDepartmentFk` int(11) unsigned DEFAULT NULL,
  `idParticularAddressFk` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`idUserLicense`),
  KEY `tb_client_services_smart_panic_ibfk_1` (`idDetinationOfLicenseFk`),
  KEY `tb_client_services_smart_panic_ibfk_2` (`idDepartmentFk`),
  KEY `tb_client_services_smart_panic_ibfk_3` (`idParticularAddressFk`),
  KEY `tb_client_services_smart_panic_ibfk_4` (`idUserFk`) USING BTREE,
  CONSTRAINT `tb_client_services_smart_panic_ibfk_1` FOREIGN KEY (`idDetinationOfLicenseFk`) REFERENCES `tb_detination_of_license` (`idDetinationOfLicense`),
  CONSTRAINT `tb_client_services_smart_panic_ibfk_2` FOREIGN KEY (`idDepartmentFk`) REFERENCES `tb_client_departament` (`idClientDepartament`),
  CONSTRAINT `tb_client_services_smart_panic_ibfk_3` FOREIGN KEY (`idParticularAddressFk`) REFERENCES `tb_client_address_particular` (`idAddressParticular`),
  CONSTRAINT `tb_client_services_smart_panic_ibfk_4` FOREIGN KEY (`idUserFk`) REFERENCES `tb_user` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb3;

/*Data for the table `tb_user_license` */

insert  into `tb_user_license`(`idUserLicense`,`idUserFk`,`fullName`,`email`,`phone`,`keyword`,`idOS`,`numberUserPassword`,`profileUser`,`idClientServicesSmartPanicFk`,`idDetinationOfLicenseFk`,`idDepartmentFk`,`idParticularAddressFk`) values 
(77,93,'David Eduardo Rincon Luengo','rexx85@gmail.com','1122333334','22222222',1,'Prueba','Admin',29,1,781,NULL),
(78,89,'Dionisio Machado','dmachado@asdasd.com','121232132134','pajaro',2,'prueba','Admin',29,3,NULL,NULL),
(79,NULL,'Pedro Castillo','pedro.castillo@asdasds.com','1123423432432','prueba',1,'prueba','Admin',29,2,NULL,NULL),
(81,92,'German Malaver','german.malaver@asdasd.com','1123432432444','prueba',2,'prueba','Admin',30,NULL,NULL,NULL),
(84,92,'German Malaver','german.malaver@asdasd.com','1123432432444','Patata',1,'11111','admin',24,2,NULL,NULL),
(85,88,'Gabriel Gonzalez','ggonzalez@hotmail.com','11223544564356346','pelota',1,'22222','admin',24,2,NULL,NULL);

/*Table structure for table `tb_zonas` */

DROP TABLE IF EXISTS `tb_zonas`;

CREATE TABLE `tb_zonas` (
  `idZona` int(11) NOT NULL AUTO_INCREMENT,
  `n_zona` int(11) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `costo_envio` float DEFAULT NULL,
  `valor_envio` float DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`idZona`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

/*Data for the table `tb_zonas` */

insert  into `tb_zonas`(`idZona`,`n_zona`,`descripcion`,`costo_envio`,`valor_envio`,`status`) values 
(1,1,'zona este',450,1003,1),
(2,2,'zona norte',300,14003,1),
(3,3,'zona oeste',200,13093,1),
(11,4,'zona sur',9993,9983,1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
