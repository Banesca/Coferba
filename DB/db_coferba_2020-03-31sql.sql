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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `tb_access_control_door` */

insert  into `tb_access_control_door`(`idAccessControlDoor`,`titulo`) values 
(1,'AC DE PRUEBA 1'),
(2,'AC DE PRUEBA 2'),
(3,'AC DE PRUEBA 3');

/*Table structure for table `tb_addres` */

DROP TABLE IF EXISTS `tb_addres`;

CREATE TABLE `tb_addres` (
  `idAdress` int(11) NOT NULL AUTO_INCREMENT,
  `nameAdress` varchar(300) COLLATE utf8_swedish_ci DEFAULT NULL,
  `idCompanyKf` int(11) DEFAULT NULL,
  `priceUni` decimal(10,2) DEFAULT '0.00' COMMENT 'Precio por unidad',
  `priceManagement` decimal(10,2) DEFAULT '0.00' COMMENT 'Precio por Gestion',
  `priceShipping` decimal(10,2) DEFAULT '0.00' COMMENT 'Precio por envio ',
  `IdSecurityCode` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL COMMENT 'Codigo de verificacion para mostrar direccion a propietarios/inquilinos',
  `IsInDebt` int(11) DEFAULT '0',
  `SA_ID_COMPANY` int(11) DEFAULT NULL,
  PRIMARY KEY (`idAdress`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `tb_agents` */

insert  into `tb_agents`(`idAgent`,`agent`) values 
(1,'COFERBA');

/*Table structure for table `tb_alarm_batery` */

DROP TABLE IF EXISTS `tb_alarm_batery`;

CREATE TABLE `tb_alarm_batery` (
  `idAlarmBatery` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nroInternal` varchar(200) DEFAULT NULL,
  `nroFabric` varchar(200) DEFAULT NULL,
  `dateExpired` date DEFAULT NULL,
  `isControlSchedule` int(11) DEFAULT NULL,
  `idClientServicesAlarmsFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idAlarmBatery`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tb_alarm_batery` */

/*Table structure for table `tb_alarm_line_phone` */

DROP TABLE IF EXISTS `tb_alarm_line_phone`;

CREATE TABLE `tb_alarm_line_phone` (
  `idAlarmLinePhone` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `company` varchar(100) DEFAULT NULL,
  `line` varchar(100) DEFAULT NULL,
  `idClientServicesAlarmsFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idAlarmLinePhone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tb_alarm_line_phone` */

/*Table structure for table `tb_alarm_module_gps` */

DROP TABLE IF EXISTS `tb_alarm_module_gps`;

CREATE TABLE `tb_alarm_module_gps` (
  `idAlarmModuleGps` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientServicesAlarmsFk` int(11) DEFAULT NULL,
  `moduleGpsr` varchar(200) DEFAULT NULL,
  `nroSerieFrabric` varchar(200) DEFAULT NULL,
  `nroSerieInternal` varchar(200) DEFAULT NULL,
  `codeProgram` varchar(200) DEFAULT NULL,
  `portProgram` varchar(200) DEFAULT NULL,
  `passwordAcces` varchar(200) DEFAULT NULL,
  `codePart1` varchar(200) DEFAULT NULL,
  `codePart2` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idAlarmModuleGps`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tb_alarm_module_gps` */

/*Table structure for table `tb_alarm_module_ip` */

DROP TABLE IF EXISTS `tb_alarm_module_ip`;

CREATE TABLE `tb_alarm_module_ip` (
  `idAlarmModuleIp` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `moduleIp` varchar(100) DEFAULT NULL,
  `nroSerieFrabric` varchar(100) DEFAULT NULL,
  `nroSerieInternal` varchar(100) DEFAULT NULL,
  `ip` int(11) DEFAULT NULL,
  `codeProgrm` varchar(100) DEFAULT NULL,
  `portProgrm` varchar(100) DEFAULT NULL,
  `passwordAcces` varchar(100) DEFAULT NULL,
  `codePart1` varchar(100) DEFAULT NULL,
  `codePart2` varchar(100) DEFAULT NULL,
  `idClientServicesAlarmsFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idAlarmModuleIp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `isUserSystem` tinyint(1) DEFAULT '0',
  `idUserSystemFk` int(11) DEFAULT NULL,
  `idClientServicesAlarmsAditionals` int(11) DEFAULT NULL,
  PRIMARY KEY (`idPersonAlert`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tb_alarm_person_alert` */

/*Table structure for table `tb_alarm_person_verific` */

DROP TABLE IF EXISTS `tb_alarm_person_verific`;

CREATE TABLE `tb_alarm_person_verific` (
  `idPersonVerific` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `isUserSystem` tinyint(1) DEFAULT '0',
  `idUserSystemFk` int(11) DEFAULT NULL,
  `link` varchar(200) DEFAULT NULL,
  `phone` varchar(200) DEFAULT NULL,
  `numberUser` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idPersonVerific`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tb_alarm_person_verific` */

/*Table structure for table `tb_alarm_services_aditionals` */

DROP TABLE IF EXISTS `tb_alarm_services_aditionals`;

CREATE TABLE `tb_alarm_services_aditionals` (
  `idAlarmServicesAditionals` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `alarmServicesAditionals` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idAlarmServicesAditionals`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `tb_alarm_type_client` */

insert  into `tb_alarm_type_client`(`idTypeClientAlarm`,`typeClientAlarm`) values 
(1,'CASA'),
(2,'COMERCIO'),
(3,'INDUSTRIA'),
(4,'OTROS');

/*Table structure for table `tb_backup_energy` */

DROP TABLE IF EXISTS `tb_backup_energy`;

CREATE TABLE `tb_backup_energy` (
  `idBackupEnergy` int(11) NOT NULL AUTO_INCREMENT,
  `idClientServicesCameraFk` int(11) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idBackupEnergy`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

/*Data for the table `tb_backup_energy` */

insert  into `tb_backup_energy`(`idBackupEnergy`,`idClientServicesCameraFk`,`description`) values 
(15,19,'bateria'),
(16,19,'ups');

/*Table structure for table `tb_bakups_order` */

DROP TABLE IF EXISTS `tb_bakups_order`;

CREATE TABLE `tb_bakups_order` (
  `idBakupsOrder` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `bakupsOrder` int(11) DEFAULT NULL,
  `idClientServicesCameraFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idBakupsOrder`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tb_bakups_order` */

/*Table structure for table `tb_battery_install_access_control` */

DROP TABLE IF EXISTS `tb_battery_install_access_control`;

CREATE TABLE `tb_battery_install_access_control` (
  `idBatteryInstallAccessControl` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `battery` varchar(100) DEFAULT NULL,
  `idClientServicesAccessControlFk` int(11) DEFAULT NULL,
  `nroSerieInternal` int(30) DEFAULT NULL,
  `nroSerieManufacturer` int(30) DEFAULT NULL,
  `dateUp` date DEFAULT NULL,
  PRIMARY KEY (`idBatteryInstallAccessControl`),
  KEY `idClientServicesAccessControlFk` (`idClientServicesAccessControlFk`),
  CONSTRAINT `tb_battery_install_access_control_ibfk_1` FOREIGN KEY (`idClientServicesAccessControlFk`) REFERENCES `tb_client_services_access_control` (`idClientServicesAccessControl`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `tb_battery_install_access_control` */

insert  into `tb_battery_install_access_control`(`idBatteryInstallAccessControl`,`battery`,`idClientServicesAccessControlFk`,`nroSerieInternal`,`nroSerieManufacturer`,`dateUp`) values 
(1,'5v',17,54,55,'2020-03-31');

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
  `coveredArea` int(11) DEFAULT NULL,
  `locationCamera` int(11) DEFAULT NULL,
  `nroSerieCamera` int(11) DEFAULT NULL,
  `nroFabricCamera` int(11) DEFAULT NULL,
  `dateExpireCamera` int(11) DEFAULT NULL,
  PRIMARY KEY (`idCamera`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

/*Data for the table `tb_cameras` */

insert  into `tb_cameras`(`idCamera`,`idClientServicesCameraFk`,`portCamera`,`coveredArea`,`locationCamera`,`nroSerieCamera`,`nroFabricCamera`,`dateExpireCamera`) values 
(11,16,21,2,0,5,48,2020),
(12,16,20,1,0,NULL,47,2020),
(13,17,21,2,0,5,48,2020),
(14,17,20,1,0,4,47,2020),
(15,18,21,2,0,5,48,2020),
(16,18,20,1,0,4,47,2020),
(17,19,21,2,0,5,48,2020),
(18,19,20,1,0,4,47,2020);

/*Table structure for table `tb_category_departament` */

DROP TABLE IF EXISTS `tb_category_departament`;

CREATE TABLE `tb_category_departament` (
  `idCategoryDepartament` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `categoryDepartament` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idCategoryDepartament`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `tb_category_departament` */

insert  into `tb_category_departament`(`idCategoryDepartament`,`categoryDepartament`) values 
(1,'Departamento'),
(2,'Cochera'),
(3,'Otros');

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
  PRIMARY KEY (`idAddressParticular`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `tb_client_address_particular` */

insert  into `tb_client_address_particular`(`idAddressParticular`,`idClientFk`,`address`,`depto`,`isBuilding`,`idProvinceFk`,`idLocationFk`,`clarification`) values 
(1,12,'TEST','depto',1,1,1,'TEST'),
(2,12,'TEST','depto',1,1,1,'TEST'),
(3,12,'TEST','depto',1,1,1,'TEST'),
(4,12,'TEST','depto',1,1,1,'TEST');

/*Table structure for table `tb_client_authorizing` */

DROP TABLE IF EXISTS `tb_client_authorizing`;

CREATE TABLE `tb_client_authorizing` (
  `idClientAuthorizing` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idUserFk` int(11) DEFAULT NULL,
  `isLevel1` tinyint(1) DEFAULT '0',
  `isLevel2` tinyint(1) DEFAULT '0',
  `idClientFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idClientAuthorizing`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tb_client_authorizing` */

/*Table structure for table `tb_client_billing_information` */

DROP TABLE IF EXISTS `tb_client_billing_information`;

CREATE TABLE `tb_client_billing_information` (
  `idBillingInfo` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientFk` int(11) DEFAULT NULL,
  `businessNameBilling` varchar(200) DEFAULT NULL,
  `cuitBilling` varchar(50) DEFAULT NULL,
  `idLocationBillingFk` int(11) DEFAULT NULL,
  `idProvinceBillingFk` int(11) DEFAULT NULL,
  `idTypeTaxFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idBillingInfo`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

/*Data for the table `tb_client_billing_information` */

insert  into `tb_client_billing_information`(`idBillingInfo`,`idClientFk`,`businessNameBilling`,`cuitBilling`,`idLocationBillingFk`,`idProvinceBillingFk`,`idTypeTaxFk`) values 
(1,1,'text','text',1,1,1),
(2,3,'text','text',1,1,1),
(3,4,'text','text',1,1,1),
(4,5,'text','text',1,1,1),
(5,6,'text','text',1,1,1),
(6,7,'text','text',1,1,1),
(7,8,'text','text',1,1,1),
(8,9,'text','text',1,1,1),
(9,10,'text','text',1,1,1),
(10,11,'text','text',1,1,1),
(11,12,'text','text',1,1,1),
(12,13,'text','text',1,1,1),
(13,14,'text','text',1,1,1);

/*Table structure for table `tb_client_camera` */

DROP TABLE IF EXISTS `tb_client_camera`;

CREATE TABLE `tb_client_camera` (
  `idClientCamera` int(11) NOT NULL AUTO_INCREMENT,
  `idClientFk` int(11) DEFAULT NULL,
  `idClientServicesCameraFk` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `user` varchar(100) DEFAULT NULL,
  `pass` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idClientCamera`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

/*Data for the table `tb_client_camera` */

insert  into `tb_client_camera`(`idClientCamera`,`idClientFk`,`idClientServicesCameraFk`,`name`,`user`,`pass`) values 
(15,1,16,'ale','aleUser','1234'),
(16,1,16,'ale','aleUser','1234'),
(17,1,17,'ale','aleUser','1234'),
(18,1,17,'ale','aleUser','1234'),
(19,1,18,'ale','aleUser','1234'),
(20,1,18,'ale','aleUser','1234'),
(21,1,19,'ale','aleUser','1234'),
(22,1,19,'ale','aleUser','1234');

/*Table structure for table `tb_client_departament` */

DROP TABLE IF EXISTS `tb_client_departament`;

CREATE TABLE `tb_client_departament` (
  `idClientDepartament` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientFk` int(11) DEFAULT NULL,
  `floor` varchar(11) DEFAULT NULL,
  `departament` varchar(11) DEFAULT NULL,
  `idCategoryDepartamentFk` int(11) DEFAULT NULL,
  `idStatusFk` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idClientDepartament`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `tb_client_departament` */

insert  into `tb_client_departament`(`idClientDepartament`,`idClientFk`,`floor`,`departament`,`idCategoryDepartamentFk`,`idStatusFk`,`created_at`) values 
(1,NULL,NULL,NULL,NULL,NULL,'2019-10-22 18:10:26'),
(4,NULL,'1','departament',0,1,'2020-03-06 15:00:01'),
(5,NULL,'1','departament',0,1,'2020-03-06 15:00:01'),
(6,NULL,'1','departament',0,1,'2020-03-06 15:00:03'),
(7,NULL,'1','departament',0,1,'2020-03-06 15:00:03'),
(8,3,'1','departament',0,1,'2020-03-06 15:01:13'),
(9,3,'1','departament',0,1,'2020-03-06 15:01:13');

/*Table structure for table `tb_client_files_list` */

DROP TABLE IF EXISTS `tb_client_files_list`;

CREATE TABLE `tb_client_files_list` (
  `idClientFiles` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientfK` int(11) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `urlFile` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idClientFiles`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tb_client_files_list` */

/*Table structure for table `tb_client_functional_units` */

DROP TABLE IF EXISTS `tb_client_functional_units`;

CREATE TABLE `tb_client_functional_units` (
  `idFunctionalUnits` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `identifier` varchar(100) DEFAULT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `idProviceFk` int(11) DEFAULT NULL,
  `idTaxTypeFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idFunctionalUnits`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tb_client_functional_units` */

/*Table structure for table `tb_client_phone_contact` */

DROP TABLE IF EXISTS `tb_client_phone_contact`;

CREATE TABLE `tb_client_phone_contact` (
  `idClientPhoneFk` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `phoneContact` varchar(80) DEFAULT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idClientPhoneFk`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

/*Data for the table `tb_client_phone_contact` */

insert  into `tb_client_phone_contact`(`idClientPhoneFk`,`phoneContact`,`idClientFk`) values 
(1,'text',NULL),
(2,'text',2),
(3,'text2',2),
(8,'text',1),
(9,'text2',1),
(12,'text',5),
(13,'text2',5),
(14,'text',1),
(15,'text2',1),
(16,'text',1),
(17,'text2',1),
(18,'text',1),
(19,'text2',1),
(20,'text',11),
(21,'text2',11),
(24,'text',1),
(25,'text2',1),
(26,'text',1),
(27,'text2',1),
(28,'text',14),
(29,'text2',14),
(30,'text',1),
(31,'text2',1),
(32,'text',1),
(33,'text2',1),
(34,'text',1),
(35,'text2',1);

/*Table structure for table `tb_client_schedule_atention` */

DROP TABLE IF EXISTS `tb_client_schedule_atention`;

CREATE TABLE `tb_client_schedule_atention` (
  `idScheduleAtention` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClienteFk` int(11) DEFAULT NULL,
  `day` int(11) DEFAULT NULL,
  `fronAm` time DEFAULT NULL,
  `toAm` time DEFAULT NULL,
  `fronPm` time DEFAULT NULL,
  `toPm` time DEFAULT NULL,
  PRIMARY KEY (`idScheduleAtention`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8;

/*Data for the table `tb_client_schedule_atention` */

insert  into `tb_client_schedule_atention`(`idScheduleAtention`,`idClienteFk`,`day`,`fronAm`,`toAm`,`fronPm`,`toPm`) values 
(3,2,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(4,2,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(5,NULL,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(6,NULL,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(7,NULL,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(8,NULL,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(9,NULL,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(10,NULL,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(29,NULL,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(30,NULL,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(31,NULL,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(32,NULL,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(37,5,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(38,5,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(45,6,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(46,6,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(47,7,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(48,7,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(59,1,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(60,1,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(61,1,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(62,1,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(63,1,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(64,1,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(65,1,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(66,1,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(67,1,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(68,1,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(69,1,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(70,1,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(71,1,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(72,1,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(73,1,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(74,1,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(75,1,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(76,1,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(77,13,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(78,13,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(79,14,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(80,14,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(81,1,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(82,1,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(83,1,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(84,1,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(85,1,0,'00:00:00','00:00:00','00:00:00','00:00:00'),
(86,1,0,'00:00:00','00:00:00','00:00:00','00:00:00');

/*Table structure for table `tb_client_services` */

DROP TABLE IF EXISTS `tb_client_services`;

CREATE TABLE `tb_client_services` (
  `idClientServices` int(11) NOT NULL AUTO_INCREMENT,
  `idClientFk` int(11) DEFAULT NULL,
  `idTipeServiceFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idClientServices`),
  KEY `idTipeServiceFk` (`idTipeServiceFk`),
  CONSTRAINT `tb_client_services_ibfk_1` FOREIGN KEY (`idTipeServiceFk`) REFERENCES `tb_type_services` (`idTypeServices`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

/*Data for the table `tb_client_services` */

insert  into `tb_client_services`(`idClientServices`,`idClientFk`,`idTipeServiceFk`) values 
(18,1,1),
(19,NULL,NULL),
(20,NULL,NULL),
(21,NULL,NULL),
(22,NULL,NULL),
(23,1,1),
(24,1,1),
(25,1,1),
(26,1,1),
(27,1,1),
(28,1,1),
(29,1,1),
(30,NULL,NULL),
(31,1,1),
(32,1,1),
(33,1,1),
(34,1,1),
(35,1,1),
(36,1,1),
(37,1,1),
(38,1,1),
(39,1,1),
(40,1,1),
(41,1,1);

/*Table structure for table `tb_client_services_access_control` */

DROP TABLE IF EXISTS `tb_client_services_access_control`;

CREATE TABLE `tb_client_services_access_control` (
  `idClientServicesAccessControl` int(11) NOT NULL AUTO_INCREMENT,
  `idDoorFk` int(11) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  `dateUp` date DEFAULT NULL,
  `dateDown` date DEFAULT NULL,
  `idAccessControlFk` int(11) DEFAULT NULL,
  `idInputReaderFk` int(11) DEFAULT NULL,
  `locationGabinet` text,
  `idFontFk` int(11) DEFAULT NULL,
  `aclaration` text,
  `idTypeMaintenanceFk` int(11) DEFAULT NULL,
  `lock` varchar(200) DEFAULT NULL,
  `ouputReader` varchar(200) DEFAULT NULL,
  `ouputButom` varchar(200) DEFAULT NULL,
  `isOuputReader` tinyint(1) DEFAULT '0',
  `isOuputButom` tinyint(1) DEFAULT '0',
  `isBlocklingScrew` tinyint(1) DEFAULT '0',
  `idEmergencyButtonFk` int(11) DEFAULT NULL,
  `idShutdownKeyFk` int(11) DEFAULT NULL,
  `acaration2` text,
  `address` varchar(100) DEFAULT NULL,
  `addressLat` varchar(100) DEFAULT NULL,
  `addressLon` varchar(100) DEFAULT NULL,
  `portNumberRouter` varchar(200) DEFAULT NULL,
  `addressClient` varchar(100) DEFAULT NULL,
  `addressVpn` varchar(100) DEFAULT NULL,
  `addressClientLat` varchar(100) DEFAULT NULL,
  `addressClientLon` varchar(100) DEFAULT NULL,
  `user` varchar(100) DEFAULT NULL,
  `useVpn` varchar(100) DEFAULT NULL,
  `passVpn` varchar(100) DEFAULT NULL,
  `pass` varchar(100) DEFAULT NULL,
  `portHttp` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`idClientServicesAccessControl`),
  KEY `idDoorFk` (`idDoorFk`),
  KEY `idAccessControlFk` (`idAccessControlFk`),
  KEY `idInputReaderFk` (`idInputReaderFk`),
  KEY `idFontFk` (`idFontFk`),
  KEY `idTypeMaintenanceFk` (`idTypeMaintenanceFk`),
  KEY `idEmergencyButtonFk` (`idEmergencyButtonFk`),
  KEY `tb_client_services_access_control_ibfk_7` (`idShutdownKeyFk`),
  CONSTRAINT `tb_client_services_access_control_ibfk_1` FOREIGN KEY (`idDoorFk`) REFERENCES `tb_access_control_door` (`idAccessControlDoor`),
  CONSTRAINT `tb_client_services_access_control_ibfk_2` FOREIGN KEY (`idAccessControlFk`) REFERENCES `tb_access_control` (`idAccessControl`),
  CONSTRAINT `tb_client_services_access_control_ibfk_3` FOREIGN KEY (`idInputReaderFk`) REFERENCES `tb_input_reader` (`idInputReader`),
  CONSTRAINT `tb_client_services_access_control_ibfk_4` FOREIGN KEY (`idFontFk`) REFERENCES `tb_font` (`idFonf`),
  CONSTRAINT `tb_client_services_access_control_ibfk_5` FOREIGN KEY (`idTypeMaintenanceFk`) REFERENCES `tb_type_maintenance` (`idTypeMaintenance`),
  CONSTRAINT `tb_client_services_access_control_ibfk_6` FOREIGN KEY (`idEmergencyButtonFk`) REFERENCES `tb_emergency_button` (`idEmergencyButton`),
  CONSTRAINT `tb_client_services_access_control_ibfk_7` FOREIGN KEY (`idShutdownKeyFk`) REFERENCES `tb_shutdown_key` (`idShutdownKey`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

/*Data for the table `tb_client_services_access_control` */

insert  into `tb_client_services_access_control`(`idClientServicesAccessControl`,`idDoorFk`,`idContracAssociated_SE`,`dateUp`,`dateDown`,`idAccessControlFk`,`idInputReaderFk`,`locationGabinet`,`idFontFk`,`aclaration`,`idTypeMaintenanceFk`,`lock`,`ouputReader`,`ouputButom`,`isOuputReader`,`isOuputButom`,`isBlocklingScrew`,`idEmergencyButtonFk`,`idShutdownKeyFk`,`acaration2`,`address`,`addressLat`,`addressLon`,`portNumberRouter`,`addressClient`,`addressVpn`,`addressClientLat`,`addressClientLon`,`user`,`useVpn`,`passVpn`,`pass`,`portHttp`) values 
(17,NULL,1,'2020-03-24','2020-03-24',NULL,NULL,'1',NULL,'1',NULL,'1','1','1',1,1,1,NULL,NULL,'1','1','1','1','1','1','1','1','1','1','1','1','1',1),
(21,1,1,'0000-00-00','0000-00-00',1,1,'1',1,'1',1,'1','1','1',1,1,1,1,1,'1','1','1','1','1','1','1','1','1','1','1','1','1',1),
(22,1,1,'0000-00-00','0000-00-00',1,1,'1',1,'1',1,'1','1','1',1,1,1,1,1,'1','1','1','1','1','1','1','1','1','1','1','1','1',1),
(23,1,1,'0000-00-00','0000-00-00',1,1,'1',1,'1',1,'1','1','1',1,1,1,1,1,'1','1','1','1','1','1','1','1','1','1','1','1','1',1),
(24,1,1,'0000-00-00','0000-00-00',1,1,'1',1,'1',1,'1','1','1',1,1,1,1,1,'1','1','1','1','1','1','1','1','1','1','1','1','1',1);

/*Table structure for table `tb_client_services_alarms` */

DROP TABLE IF EXISTS `tb_client_services_alarms`;

CREATE TABLE `tb_client_services_alarms` (
  `idClientServicesAlarms` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  `idTypeMaintenanceFk` int(11) DEFAULT NULL,
  `dateUp` date DEFAULT NULL,
  `dateDown` date DEFAULT NULL,
  `companyMonitor` varchar(200) DEFAULT NULL,
  `numberPay` varchar(50) DEFAULT NULL,
  `alarmPanel` varchar(50) DEFAULT NULL,
  `alarmKeyboard` varchar(11) DEFAULT NULL,
  `countZone` int(11) DEFAULT NULL,
  `panelAlarm` varchar(200) DEFAULT NULL,
  `keyboardAlarm` varchar(200) DEFAULT NULL,
  `countZoneIntaled` int(11) DEFAULT NULL,
  `isLinePhone` tinyint(1) DEFAULT '0',
  `isModuleIp` tinyint(1) DEFAULT '0',
  `isModuleGps` tinyint(1) DEFAULT '0',
  `observation` text,
  PRIMARY KEY (`idClientServicesAlarms`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tb_client_services_alarms` */

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
  `fron1` time DEFAULT NULL,
  `fron2` time DEFAULT NULL,
  `fron3` time DEFAULT NULL,
  `fron4` time DEFAULT NULL,
  `fron5` time DEFAULT NULL,
  `fron6` time DEFAULT NULL,
  `fron7` time DEFAULT NULL,
  `to1` time DEFAULT NULL,
  `to2` time DEFAULT NULL,
  `to3` time DEFAULT NULL,
  `to4` time DEFAULT NULL,
  `to5` time DEFAULT NULL,
  `to6` time DEFAULT NULL,
  `to7` time DEFAULT NULL,
  `fron11` time DEFAULT NULL,
  `fron22` time DEFAULT NULL,
  `fron33` time DEFAULT NULL,
  `fron44` time DEFAULT NULL,
  `fron55` time DEFAULT NULL,
  `fron66` time DEFAULT NULL,
  `fron77` time DEFAULT NULL,
  `to11` time DEFAULT NULL,
  `to22` time DEFAULT NULL,
  `to33` time DEFAULT NULL,
  `to44` time DEFAULT NULL,
  `to55` time DEFAULT NULL,
  `to66` time DEFAULT NULL,
  `to77` time DEFAULT NULL,
  `idFormatTramitioFk` int(11) DEFAULT NULL,
  `isAutomatic` tinyint(1) DEFAULT '0',
  `hourAutomatic` int(11) DEFAULT NULL,
  `numberUserAsalt` int(11) DEFAULT NULL,
  `passAsalt` varchar(100) DEFAULT NULL,
  `police` varchar(100) DEFAULT NULL,
  `phonePolice` varchar(100) DEFAULT NULL,
  `serviceEmergencyMedical` varchar(100) DEFAULT NULL,
  `numberPartner` int(11) DEFAULT NULL,
  `plaint` varchar(100) DEFAULT NULL,
  `observation` text,
  PRIMARY KEY (`idClientServicesAlarmsAditionals`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tb_client_services_alarms_aditional` */

/*Table structure for table `tb_client_services_camera` */

DROP TABLE IF EXISTS `tb_client_services_camera`;

CREATE TABLE `tb_client_services_camera` (
  `idClientServicesCamera` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  `idTypeMaintenanceFk` int(11) DEFAULT NULL,
  `dateUp` date DEFAULT NULL,
  `dateDown` date DEFAULT NULL,
  `idDvrNvr_tb_prod_classFk` int(11) DEFAULT NULL,
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
  `observation` text,
  `addessClient` varchar(100) DEFAULT NULL,
  `addessClientLat` varchar(100) DEFAULT NULL,
  `addessClientLot` varchar(100) DEFAULT NULL,
  `portHttp` int(11) DEFAULT NULL,
  `namePort` varchar(100) DEFAULT NULL,
  `port` int(11) DEFAULT NULL,
  PRIMARY KEY (`idClientServicesCamera`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

/*Data for the table `tb_client_services_camera` */

insert  into `tb_client_services_camera`(`idClientServicesCamera`,`name`,`idContracAssociated_SE`,`idTypeMaintenanceFk`,`dateUp`,`dateDown`,`idDvrNvr_tb_prod_classFk`,`location`,`locationLat`,`locationLon`,`maxCamera`,`numberPortRouter`,`addressVpn`,`nroPort1`,`nroPort2`,`namePort1`,`namePort2`,`observation`,`addessClient`,`addessClientLat`,`addessClientLot`,`portHttp`,`namePort`,`port`) values 
(16,'1',1,1,'2020-03-21','2020-03-21',1,'1','1','1',1,1,'1',1,1,'1','1','1','1','1','1',1,'1',1),
(17,'1',1,1,'2020-03-21','2020-03-21',1,'1','1','1',1,1,'1',1,1,'1','1','1','1','1','1',1,'1',1),
(18,'1',1,1,'2020-03-21','2020-03-21',1,'1','1','1',1,1,'1',1,1,'1','1','1','1','1','1',1,'1',1),
(19,'1',1,1,'2020-03-21','2020-03-21',1,'1','1','1',1,1,'1',1,1,'1','1','1','1','1','1',1,'1',1);

/*Table structure for table `tb_client_services_gps` */

DROP TABLE IF EXISTS `tb_client_services_gps`;

CREATE TABLE `tb_client_services_gps` (
  `idClientServicesGps` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientServicesFk` int(11) DEFAULT NULL,
  `idTypeGpsFk` int(11) DEFAULT NULL,
  `typeMaintenance` text,
  `dateUp` date DEFAULT NULL,
  `dateDown` date DEFAULT NULL,
  `modem` varchar(200) DEFAULT NULL,
  `idInternetCompanyFk` int(11) DEFAULT NULL COMMENT 'Empresa',
  `nroLine` varchar(200) DEFAULT NULL,
  `nroChip` varchar(200) DEFAULT NULL,
  `idServiceAsociateFk` int(11) DEFAULT NULL,
  `nroSerieInternal` varchar(200) DEFAULT NULL,
  `nroSerieManufacturer` varchar(200) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  PRIMARY KEY (`idClientServicesGps`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `tb_client_services_gps` */

insert  into `tb_client_services_gps`(`idClientServicesGps`,`idClientServicesFk`,`idTypeGpsFk`,`typeMaintenance`,`dateUp`,`dateDown`,`modem`,`idInternetCompanyFk`,`nroLine`,`nroChip`,`idServiceAsociateFk`,`nroSerieInternal`,`nroSerieManufacturer`,`idContracAssociated_SE`) values 
(8,34,1,'pser','2020-03-31','2020-03-31','1',1,'1','1',1,'1','1',1),
(9,38,1,'pser','2020-03-31','2020-03-31','1',1,'1','1',1,'1','1',1),
(10,39,1,'pser','2020-03-31','2020-03-31','1',1,'1','1',1,'1','1',1),
(11,40,1,'pser','2020-03-31','2020-03-31','1',1,'1','1',1,'1','1',1);

/*Table structure for table `tb_client_services_internet` */

DROP TABLE IF EXISTS `tb_client_services_internet`;

CREATE TABLE `tb_client_services_internet` (
  `idClientServicesInternet` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientServicesFk` int(11) DEFAULT NULL,
  `idTypeInternetFk` int(11) DEFAULT NULL,
  `typeMaintenance` text,
  `idServiceFk` int(11) DEFAULT NULL,
  `idServiceAsociateFk` int(11) DEFAULT NULL,
  `idRouterInternetFk` int(11) DEFAULT NULL,
  `numberSeria` varchar(100) DEFAULT NULL,
  `userAdmin` varchar(100) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  `idInternetCompanyFk` int(11) DEFAULT NULL,
  `modenMark` varchar(100) DEFAULT '',
  `dateDown` date DEFAULT NULL,
  `dateUp` date DEFAULT NULL,
  `isDown` tinyint(1) DEFAULT '0',
  `port` decimal(11,0) DEFAULT NULL,
  `passAdmin` varchar(200) DEFAULT NULL,
  `nroSerieInternal` varchar(200) DEFAULT NULL,
  `nroSerieManufacturer` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idClientServicesInternet`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `tb_client_services_internet` */

insert  into `tb_client_services_internet`(`idClientServicesInternet`,`idClientServicesFk`,`idTypeInternetFk`,`typeMaintenance`,`idServiceFk`,`idServiceAsociateFk`,`idRouterInternetFk`,`numberSeria`,`userAdmin`,`idContracAssociated_SE`,`idInternetCompanyFk`,`modenMark`,`dateDown`,`dateUp`,`isDown`,`port`,`passAdmin`,`nroSerieInternal`,`nroSerieManufacturer`) values 
(8,33,1,'psa',1,1,1,'1','1',1,1,'1','2020-03-19','2020-03-19',1,1,'1','1','1'),
(9,41,1,'psa',1,1,1,'1','1',1,1,'1','2020-03-19','2020-03-19',1,1,'1','1','1');

/*Table structure for table `tb_client_services_smart_panic` */

DROP TABLE IF EXISTS `tb_client_services_smart_panic`;

CREATE TABLE `tb_client_services_smart_panic` (
  `idClientServicesSmartPanic` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientServicesFk` int(11) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  `dateUp` date DEFAULT NULL,
  `dateDown` date DEFAULT NULL,
  `idTypeMaintenanceFk` int(11) DEFAULT NULL,
  `companyMonitor` varchar(200) DEFAULT NULL,
  `sucribeNumber` varchar(200) DEFAULT NULL,
  `idDetinationOfLicenseFk` varchar(200) DEFAULT NULL,
  `idDepartmentFk` int(11) DEFAULT NULL,
  `countNewLicense` int(11) DEFAULT NULL,
  `observation` text,
  PRIMARY KEY (`idClientServicesSmartPanic`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tb_client_services_smart_panic` */

/*Table structure for table `tb_client_services_totem` */

DROP TABLE IF EXISTS `tb_client_services_totem`;

CREATE TABLE `tb_client_services_totem` (
  `idClientServicesTotem` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientServicesFk` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `idContracAssociated_SE` int(11) DEFAULT NULL,
  `item_SE` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `idCompanyFk` int(11) DEFAULT NULL,
  `dvr_nvr` varchar(100) DEFAULT NULL,
  `addresss` varchar(100) DEFAULT NULL,
  `latAddress` varchar(100) DEFAULT NULL,
  `lonAddress` varchar(100) DEFAULT NULL,
  `maxCamera` int(11) DEFAULT NULL,
  `idTotenModelFk` int(11) DEFAULT NULL,
  `tipeMaintenance_SE` int(11) DEFAULT NULL,
  `dateDown` date DEFAULT NULL,
  `numerFertilizer` varchar(100) DEFAULT NULL,
  `numberPort` varchar(100) DEFAULT NULL,
  `addreesVpn` varchar(100) DEFAULT NULL,
  `namePort1` varchar(100) DEFAULT NULL,
  `numberPort1` varchar(100) DEFAULT NULL,
  `namePort2` varchar(100) DEFAULT NULL,
  `numberPort2` varchar(100) DEFAULT NULL,
  `addressClientInter` varchar(100) DEFAULT NULL,
  `portHttpInter` varchar(100) DEFAULT NULL,
  `namePortInter` varchar(100) DEFAULT NULL,
  `numberPortInter` varchar(100) DEFAULT NULL,
  `observatioGeneral` text,
  PRIMARY KEY (`idClientServicesTotem`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tb_client_services_totem` */

/*Table structure for table `tb_client_type` */

DROP TABLE IF EXISTS `tb_client_type`;

CREATE TABLE `tb_client_type` (
  `idClientType` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ClientType` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idClientType`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `tb_client_type_services` */

insert  into `tb_client_type_services`(`idClientTypeServices`,`clientTypeServices`) values 
(1,'CONTROL DE ACCESO'),
(2,'INTERNET'),
(3,'GPS'),
(4,'TOTEM'),
(5,'ALARMAS'),
(6,'CAMARAS'),
(7,'SMART PANIC');

/*Table structure for table `tb_client_ufc` */

DROP TABLE IF EXISTS `tb_client_ufc`;

CREATE TABLE `tb_client_ufc` (
  `idUfd` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `identificador` varchar(200) DEFAULT NULL,
  `idProvinceFk` int(11) DEFAULT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `idTypeTaxFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idUfd`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `tb_client_ufc` */

insert  into `tb_client_ufc`(`idUfd`,`identificador`,`idProvinceFk`,`idClientFk`,`idTypeTaxFk`) values 
(1,'test1',1,14,1),
(2,'test2',1,14,1),
(7,'EDITADO 111',1,4,1),
(8,'test2',1,4,1);

/*Table structure for table `tb_client_users` */

DROP TABLE IF EXISTS `tb_client_users`;

CREATE TABLE `tb_client_users` (
  `idClientUsers` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientFk` int(11) DEFAULT NULL,
  `idUserFk` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idClientUsers`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

/*Data for the table `tb_client_users` */

insert  into `tb_client_users`(`idClientUsers`,`idClientFk`,`idUserFk`,`created_at`) values 
(1,2,1,NULL),
(2,2,2,NULL),
(7,1,1,NULL),
(8,1,2,NULL),
(11,5,1,NULL),
(12,5,2,NULL),
(13,1,1,NULL),
(14,1,2,NULL),
(15,1,1,NULL),
(16,1,2,NULL),
(17,1,1,NULL),
(18,1,2,NULL),
(19,14,1,NULL),
(20,14,2,NULL),
(21,1,1,NULL),
(22,1,2,NULL),
(23,1,1,NULL),
(24,1,2,NULL),
(25,1,1,NULL),
(26,1,2,NULL);

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
  `CUIT` varchar(30) DEFAULT NULL,
  `idLocationFk` int(11) DEFAULT NULL,
  `idProvinceFk` int(11) DEFAULT NULL,
  `mobile` varchar(200) DEFAULT NULL,
  `mail` varchar(200) DEFAULT NULL,
  `observation` varchar(500) DEFAULT NULL,
  `pageWeb` varchar(200) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT NULL,
  `idStatusFk` int(11) DEFAULT NULL,
  `mailFronKey` varchar(100) DEFAULT NULL,
  `observationOrderKey` varchar(500) DEFAULT NULL,
  `isNotCliente` tinyint(1) DEFAULT '0',
  `idClientAdminFk` int(11) DEFAULT NULL,
  `mailServiceTecnic` varchar(100) DEFAULT NULL,
  `observationSericeTecnic` varchar(100) DEFAULT NULL,
  `mailCollection` varchar(100) DEFAULT NULL,
  `observationCollection` varchar(500) DEFAULT NULL,
  `idClientCompaniFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idClient`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

/*Data for the table `tb_clients` */

insert  into `tb_clients`(`idClient`,`idClientTypeFk`,`name`,`address`,`addressLat`,`addressLon`,`idAgentFk`,`businessName`,`CUIT`,`idLocationFk`,`idProvinceFk`,`mobile`,`mail`,`observation`,`pageWeb`,`created_at`,`update_at`,`idStatusFk`,`mailFronKey`,`observationOrderKey`,`isNotCliente`,`idClientAdminFk`,`mailServiceTecnic`,`observationSericeTecnic`,`mailCollection`,`observationCollection`,`idClientCompaniFk`) values 
(1,4,'edite','TEST','TEST','TEST',1,'text2','text',1,1,'text','text','TEST','text','2020-01-28 12:47:49',NULL,1,'text','text',1,1,'TEST','TEST','TEST','TEST',1),
(2,1,'te1xt','text','text','text',1,'text2','text',1,1,'text','text','text','text','2020-01-28 12:49:10',NULL,1,'text','text',0,1,'text','text','text','text',1),
(3,NULL,'edite la empresa TESaT','TEST','TEST','TEST',1,'TEST','TEST',1,1,NULL,NULL,'TEST','TEST','2020-03-06 14:47:01',NULL,1,NULL,NULL,NULL,NULL,'TEST','TEST','TEST','TEST',NULL),
(4,3,'edite la empresa TESaT','TEST','TEST','TEST',1,'TEST','TEST',1,1,NULL,NULL,'TEST','TEST','2020-03-06 15:12:48',NULL,1,NULL,NULL,NULL,NULL,'TEST','TEST','TEST','TEST',NULL),
(5,3,'TESaT','TEST','TEST','TEST',1,'TEST','TEST',1,1,NULL,NULL,'TEST','TEST','2020-03-06 15:14:29',NULL,NULL,NULL,NULL,0,NULL,'TEST','TEST','TEST','TEST',NULL),
(6,4,NULL,'TEST','TEST','TEST',NULL,NULL,NULL,1,1,NULL,NULL,'TEST',NULL,'2020-03-06 15:37:21',NULL,NULL,NULL,NULL,1,NULL,'TEST','TEST','TEST','TEST',1),
(7,4,NULL,'TEST','TEST','TEST',NULL,NULL,NULL,1,1,NULL,NULL,'TEST',NULL,'2020-03-06 15:38:07',NULL,NULL,NULL,NULL,1,NULL,'TEST','TEST','TEST','TEST',1),
(8,4,'TEST','TEST','TEST','TEST',NULL,NULL,NULL,1,1,NULL,NULL,'TEST',NULL,'2020-03-06 15:38:29',NULL,NULL,NULL,NULL,1,NULL,'TEST','TEST','TEST','TEST',1),
(9,4,'jorge edito','TEST','TEST','TEST',NULL,NULL,NULL,1,1,NULL,NULL,'TEST',NULL,'2020-03-06 15:39:14',NULL,NULL,NULL,NULL,1,NULL,'TEST','TEST','TEST','TEST',1),
(10,5,'TEST PARTICULR','TEST','TEST','TEST',1,NULL,NULL,1,1,'TEST',NULL,'TEST',NULL,'2020-03-06 16:00:49',NULL,1,NULL,NULL,NULL,NULL,'TEST',NULL,'TEST',NULL,NULL),
(11,5,'TEST PARTICaULR','TEST','TEST','TEST',1,NULL,NULL,1,1,'TEST',NULL,'TEST',NULL,'2020-03-06 16:03:40',NULL,NULL,NULL,NULL,0,NULL,'TEST',NULL,'TEST',NULL,NULL),
(12,5,'TEST PARdTICaULR editado','TEST','TEST','TEST',1,NULL,NULL,1,1,'TEST',NULL,'TEST',NULL,'2020-03-06 16:04:14',NULL,NULL,NULL,NULL,0,NULL,'TEST',NULL,'TEST',NULL,NULL),
(13,1,'te1ddxt','text','text','text',1,'text2','text',1,1,'text','text','text','text','2020-03-06 16:12:04',NULL,1,'text','text',0,1,'text','text','text','text',1),
(14,3,'jorge','TEST','TEST','TEST',1,'TEST','TEST',1,1,NULL,NULL,'TEST','TEST','2020-03-07 09:29:50',NULL,NULL,NULL,NULL,0,NULL,'TEST','TEST','TEST','TEST',NULL);

/*Table structure for table `tb_clients_phones` */

DROP TABLE IF EXISTS `tb_clients_phones`;

CREATE TABLE `tb_clients_phones` (
  `idClientPhones` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idClientFk` int(11) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `idStatusFk` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idClientPhones`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tb_clients_phones` */

/*Table structure for table `tb_clients_tickets` */

DROP TABLE IF EXISTS `tb_clients_tickets`;

CREATE TABLE `tb_clients_tickets` (
  `idTicketsCliets` int(11) NOT NULL AUTO_INCREMENT,
  `idTicketKf` int(11) DEFAULT NULL,
  `idClientKf` int(11) DEFAULT NULL,
  PRIMARY KEY (`idTicketsCliets`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

/*Data for the table `tb_clients_tickets` */

insert  into `tb_clients_tickets`(`idTicketsCliets`,`idTicketKf`,`idClientKf`) values 
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

/*Table structure for table `tb_company` */

DROP TABLE IF EXISTS `tb_company`;

CREATE TABLE `tb_company` (
  `idCompany` int(11) NOT NULL AUTO_INCREMENT,
  `nameCompany` varchar(300) COLLATE utf8_swedish_ci DEFAULT NULL,
  `SA_ID_COMPANY` int(11) DEFAULT NULL,
  `tlfCompany` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL COMMENT 'TELEFONO DE LA EMPRESA O ADMINISTRACION',
  `mail_services` varchar(200) COLLATE utf8_swedish_ci DEFAULT '',
  `mail_request` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL,
  `mail_admin` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL,
  `isEdit` tinyint(11) DEFAULT '0',
  PRIMARY KEY (`idCompany`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

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
  `value` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`idKey`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `tb_company_type_keychains` */

insert  into `tb_company_type_keychains`(`idKey`,`idAddressKf`,`item`,`value`) values 
(1,11,'Llaveros',10.99),
(2,11,'Sticket Vehicular',10.99),
(3,11,'Credencial Movil',10.99),
(4,12,'Llaveros',10.99),
(5,12,'Sticket Vehicular',10.99),
(6,5,'Credencial Movil',10.99),
(7,NULL,NULL,NULL);

/*Table structure for table `tb_department` */

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
  `SA_ID_DEPARMENT` int(11) DEFAULT NULL,
  PRIMARY KEY (`idDepartment`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

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
(18,2,'Porteria',0,NULL,1,1,NULL,NULL,0,0,NULL),
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
(116,12,'PB-01',NULL,NULL,NULL,NULL,NULL,73,1,0,14159),
(117,12,'PB-02',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14160),
(118,12,'01-01',NULL,NULL,NULL,NULL,NULL,85,0,0,14161),
(119,12,'01-02',NULL,NULL,NULL,NULL,NULL,NULL,0,0,14162),
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

/*Table structure for table `tb_detination_of_license` */

DROP TABLE IF EXISTS `tb_detination_of_license`;

CREATE TABLE `tb_detination_of_license` (
  `idDetinationOfLicense` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `detinationOfLicense` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idDetinationOfLicense`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `tb_detination_of_license` */

insert  into `tb_detination_of_license`(`idDetinationOfLicense`,`detinationOfLicense`) values 
(1,'PROPIETARIO / HABITANTE'),
(2,'ENCARGADO'),
(3,'ADMINISTRACION DE CONSORCIO');

/*Table structure for table `tb_divice_opening` */

DROP TABLE IF EXISTS `tb_divice_opening`;

CREATE TABLE `tb_divice_opening` (
  `idDiviceOpening` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `diviceOpening` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idDiviceOpening`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `tb_format_tramitio` */

insert  into `tb_format_tramitio`(`idFormatTramitio`,`formatTramitio`) values 
(1,'CONTACT-ID'),
(2,'4+2'),
(3,'SIA'),
(4,'CID');

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `tb_internet_company` */

insert  into `tb_internet_company`(`idInternetCompany`,`internetCompany`) values 
(1,'TELECENTRO'),
(2,'FIBERTEL'),
(3,'MOVISTAR');

/*Table structure for table `tb_location` */

DROP TABLE IF EXISTS `tb_location`;

CREATE TABLE `tb_location` (
  `idLocation` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `location` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idLocation`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `tb_location` */

insert  into `tb_location`(`idLocation`,`location`) values 
(1,'CABA'),
(2,'SAAVEDRA');

/*Table structure for table `tb_modules` */

DROP TABLE IF EXISTS `tb_modules`;

CREATE TABLE `tb_modules` (
  `idModule` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idModule`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

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

/*Table structure for table `tb_opcion_low` */

DROP TABLE IF EXISTS `tb_opcion_low`;

CREATE TABLE `tb_opcion_low` (
  `idOpcionLowTicket` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `opcionLowTicket` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`idOpcionLowTicket`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

/*Data for the table `tb_opcion_low` */

insert  into `tb_opcion_low`(`idOpcionLowTicket`,`opcionLowTicket`) values 
(1,'LLaveros a dar de baja'),
(2,'LLaveros en mi poder');

/*Table structure for table `tb_pick_receive` */

DROP TABLE IF EXISTS `tb_pick_receive`;

CREATE TABLE `tb_pick_receive` (
  `idWhoPickUp` int(11) DEFAULT NULL,
  `nameWhoPickUp` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `tb_pick_receive` */

insert  into `tb_pick_receive`(`idWhoPickUp`,`nameWhoPickUp`) values 
(1,'Titular'),
(2,'Encargado'),
(3,'Tercera persona');

/*Table structure for table `tb_products` */

DROP TABLE IF EXISTS `tb_products`;

CREATE TABLE `tb_products` (
  `idProduct` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `descriptionProduct` varchar(200) DEFAULT NULL,
  `codigoFabric` varchar(200) DEFAULT NULL,
  `brand` varchar(200) DEFAULT NULL,
  `model` varchar(200) DEFAULT NULL,
  `idProductClassificationFk` varchar(200) DEFAULT NULL,
  `isNumberSerieFabric` tinyint(1) DEFAULT '0',
  `isNumberSerieInternal` tinyint(1) DEFAULT '0',
  `isDateExpiration` tinyint(1) DEFAULT '0',
  `isControlSchedule` tinyint(1) DEFAULT '0',
  `priceFabric` decimal(18,2) DEFAULT '0.00',
  `idStatusFk` int(11) DEFAULT '1',
  PRIMARY KEY (`idProduct`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `tb_products` */

insert  into `tb_products`(`idProduct`,`descriptionProduct`,`codigoFabric`,`brand`,`model`,`idProductClassificationFk`,`isNumberSerieFabric`,`isNumberSerieInternal`,`isDateExpiration`,`isControlSchedule`,`priceFabric`,`idStatusFk`) values 
(1,'2Ejemplo3111','Ejemplo','Ejemplo','Ejemplo','5',1,0,1,1,120.38,1),
(2,'Ejemplo2','Ejemplo','Ejemplo','Ejemplo','5',1,0,0,0,120.38,1),
(3,'Ejemplo3','Ejemplo','Ejemplo','Ejemplo','5',1,0,1,0,120.38,1),
(4,'2Ejemplo3','Ejemplo','Ejemplo','Ejemplo','5',1,0,1,1,120.38,1),
(5,'2Ejemdplo3','Ejemplo','Ejemplo','Ejemplo','5',1,0,1,1,120.38,1);

/*Table structure for table `tb_products_classification` */

DROP TABLE IF EXISTS `tb_products_classification`;

CREATE TABLE `tb_products_classification` (
  `idProductClassification` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `classification` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idProductClassification`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

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
(18,'MODEM');

/*Table structure for table `tb_products_divice_opening` */

DROP TABLE IF EXISTS `tb_products_divice_opening`;

CREATE TABLE `tb_products_divice_opening` (
  `idProductsDiviceOpening` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idDiviceOpeningFk` int(11) DEFAULT NULL,
  `idProductFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idProductsDiviceOpening`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

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
(28,5,5);

/*Table structure for table `tb_profile` */

DROP TABLE IF EXISTS `tb_profile`;

CREATE TABLE `tb_profile` (
  `idProfile` int(11) unsigned NOT NULL,
  `nameProfile` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idProfile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

/*Data for the table `tb_profile` */

insert  into `tb_profile`(`idProfile`,`nameProfile`) values 
(1,'Coferba'),
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
  `idStatus` int(11) DEFAULT '1',
  PRIMARY KEY (`idProfiles`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

/*Data for the table `tb_profiles` */

insert  into `tb_profiles`(`idProfiles`,`name`,`idStatus`) values 
(8,'pefil coferba 1',-1),
(9,'PERFIL UNo',1),
(10,'PERFIL dos',1);

/*Table structure for table `tb_profiles_modules` */

DROP TABLE IF EXISTS `tb_profiles_modules`;

CREATE TABLE `tb_profiles_modules` (
  `idProfileModule` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idProfilesFk` int(11) DEFAULT NULL,
  `idModuleFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idProfileModule`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

/*Data for the table `tb_profiles_modules` */

insert  into `tb_profiles_modules`(`idProfileModule`,`idProfilesFk`,`idModuleFk`) values 
(19,8,1),
(21,8,3),
(29,8,1),
(30,8,2),
(31,8,4),
(32,8,7),
(33,9,1),
(34,9,2),
(35,10,1),
(36,10,2);

/*Table structure for table `tb_province` */

DROP TABLE IF EXISTS `tb_province`;

CREATE TABLE `tb_province` (
  `idProvince` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `province` varchar(200) DEFAULT NULL,
  `idLocationFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idProvince`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `tb_province` */

insert  into `tb_province`(`idProvince`,`province`,`idLocationFk`) values 
(1,'CABA ',1),
(2,'BUENOS AIRES',2);

/*Table structure for table `tb_reason_disabled_item` */

DROP TABLE IF EXISTS `tb_reason_disabled_item`;

CREATE TABLE `tb_reason_disabled_item` (
  `idReasonDisabledItem` int(11) NOT NULL AUTO_INCREMENT,
  `reasonDisabledItem` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idReasonDisabledItem`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

/*Data for the table `tb_reason_disabled_item` */

insert  into `tb_reason_disabled_item`(`idReasonDisabledItem`,`reasonDisabledItem`) values 
(1,'ROBO'),
(2,'EXTRAVIO'),
(3,'FALLA DEL LLAVERO');

/*Table structure for table `tb_request` */

DROP TABLE IF EXISTS `tb_request`;

CREATE TABLE `tb_request` (
  `idRequest` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `RequestName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idRequest`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

/*Data for the table `tb_request` */

/*Table structure for table `tb_router_internet` */

DROP TABLE IF EXISTS `tb_router_internet`;

CREATE TABLE `tb_router_internet` (
  `idRouterInternet` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `numberSeriaInternal` text,
  `numberSeriaFrabic` text,
  `titulo` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idRouterInternet`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `tb_router_internet` */

insert  into `tb_router_internet`(`idRouterInternet`,`numberSeriaInternal`,`numberSeriaFrabic`,`titulo`) values 
(1,'441jjh14458g4h','fgh5hfg4hgf54h','cisco router'),
(2,'5454jkkkk','1op7788888','TP LINK');

/*Table structure for table `tb_sensors_alarm` */

DROP TABLE IF EXISTS `tb_sensors_alarm`;

CREATE TABLE `tb_sensors_alarm` (
  `idSensorsAlarm` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `numberZoneSensor` varchar(200) DEFAULT NULL,
  `area` text,
  `nroZoneTamper` varchar(200) DEFAULT NULL,
  `location` varchar(200) DEFAULT NULL,
  `locationLat` varchar(200) DEFAULT NULL,
  `locationLon` varchar(200) DEFAULT NULL,
  `dvr` varchar(200) DEFAULT NULL,
  `idCameraFk` int(11) DEFAULT NULL,
  `nroInterno` varchar(200) DEFAULT NULL,
  `nroFrabric` varchar(200) DEFAULT NULL,
  `idClientServicesAlarmsFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idSensorsAlarm`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tb_sensors_alarm` */

/*Table structure for table `tb_services` */

DROP TABLE IF EXISTS `tb_services`;

CREATE TABLE `tb_services` (
  `idService` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `service` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idService`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tb_services_camera_users` */

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

/*Table structure for table `tb_status` */

DROP TABLE IF EXISTS `tb_status`;

CREATE TABLE `tb_status` (
  `idStatusTenant` int(255) NOT NULL,
  `statusTenantName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idStatusTenant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci ROW_FORMAT=COMPACT;

/*Data for the table `tb_status` */

insert  into `tb_status`(`idStatusTenant`,`statusTenantName`) values 
(-1,'Eliminado'),
(0,'Inactivo'),
(1,'Activo');

/*Table structure for table `tb_statusticket` */

DROP TABLE IF EXISTS `tb_statusticket`;

CREATE TABLE `tb_statusticket` (
  `idStatus` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `statusName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idStatus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci ROW_FORMAT=COMPACT;

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
  `code` varchar(200) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `description` varchar(3) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

/*Data for the table `tb_sys_code` */

insert  into `tb_sys_code`(`idCode`,`code`,`description`) values 
(1,'279','TK');

/*Table structure for table `tb_sys_param` */

DROP TABLE IF EXISTS `tb_sys_param`;

CREATE TABLE `tb_sys_param` (
  `idParam` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `value` varchar(100) COLLATE utf8_swedish_ci DEFAULT NULL,
  `description` varchar(100) COLLATE utf8_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`idParam`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

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

/*Table structure for table `tb_tax` */

DROP TABLE IF EXISTS `tb_tax`;

CREATE TABLE `tb_tax` (
  `idTypeTax` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `typeTax` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idTypeTax`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

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
  `dateCreated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `dateRecibeCompany` datetime DEFAULT NULL,
  `idStatusTicketKf` int(11) DEFAULT '2',
  `codTicket` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` int(11) NOT NULL COMMENT 'ID DEL TIPO DE TICKET',
  `idRequestKf` int(11) NOT NULL,
  `idUserTenantKf` int(11) DEFAULT NULL COMMENT 'ID DEL INQUILINO',
  `idOWnerKf` int(11) DEFAULT NULL COMMENT 'ID DEL PROPIETARIO',
  `idUserAdminKf` int(11) DEFAULT NULL COMMENT 'ID ADMIN COFERBA',
  `idUserCompany` int(11) DEFAULT NULL COMMENT 'ID USUARIO EMPRESA',
  `idUserEnterpriceKf` int(11) NOT NULL COMMENT 'ID ADMIN CONSORCIO',
  `idUserAttendantKf` int(11) DEFAULT NULL COMMENT 'ID DEL ENCARGADO',
  `numberItemes` int(11) DEFAULT NULL COMMENT 'CANTIDAD DE LLAVEROS O ELEMENTOS ',
  `idTypeOfKeysKf` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'ID DE LOS TIPOS DE LLAVEROS A SOLICITAR',
  `itemToDisabled` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'CODIGO Y TIPO DE LOS LLAVEROS A DAR DE BAJA',
  `idReasonDisabledItemKf` int(11) DEFAULT NULL COMMENT 'Razon Cancelar item',
  `idTypeOuther` int(11) DEFAULT NULL COMMENT 'TIPO DE CONSULTA',
  `mailContactConsult` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'MAIL DE CONTACTO PARA CONSULTAS',
  `SA_NRO_ORDER` int(255) DEFAULT NULL COMMENT 'ID DE NUMERO DE ORDEN QUE SERA ASIGNADO POR EL SISTEMA LOCAL',
  `descriptionComment` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `descriptionOrder` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'DESCRIPCION DEL PEDIDO',
  `isCommentOrDesccriptionChange` int(4) DEFAULT NULL,
  `idTypeServicesKf` int(11) DEFAULT NULL COMMENT 'ID DEL TIPO SERVICIO SOBRE EL CUAL SE SOLICITA EL SERVICIO TECNICO',
  `totalService` decimal(18,2) DEFAULT '0.00' COMMENT 'MONTO TOTAL DEL SERVICIO',
  `addressConsul` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idProfileKf` int(11) DEFAULT NULL,
  `idOpcionLowTicketKf` int(11) DEFAULT NULL,
  `idTypeOfOptionKf` int(11) DEFAULT NULL COMMENT 'ID DEL TIPO DE SOLICITUD -ENCARGADO/OTRO/EDIFICIO',
  `idCompanyKf` int(11) DEFAULT NULL,
  `idAdressKf` int(11) DEFAULT NULL COMMENT 'DIRECCION DEL TICKET',
  `idDepartmentKf` int(11) DEFAULT NULL COMMENT 'ID DEL DEPARTAMENTO',
  `idUserCancelTicket` int(11) DEFAULT NULL,
  `isCancelRequested` int(4) DEFAULT NULL COMMENT 'NOTIFICA A COFERBA SOBRE LA CANCELACION SUJETA A APROBACION',
  `reasonForCancelTicket` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'NOTA INDICANDO LA RAZON DE LA CANCELACION DEL TICKET',
  `dateCancel` datetime DEFAULT NULL,
  `idUserApprovedTicket` int(11) DEFAULT NULL,
  `dateRecibedAdmin` datetime DEFAULT NULL,
  `idOtherKf` int(11) DEFAULT NULL COMMENT 'ID DEL ENGARGADO DE TIPO "Otro"',
  `isChangeDeliverylRequested` int(4) DEFAULT NULL COMMENT 'NOTIFICA A COFERBA SOBRE EL CAMBIO DE ENVIO SUJETO A APROBACION',
  `idUserHasChangeTicket` tinyint(4) DEFAULT NULL,
  `idTypeDeliveryKf` int(11) DEFAULT NULL COMMENT 'ID DE LA OPCION DE ENVIO',
  `idWhoPickUp` int(11) DEFAULT NULL,
  `idUserAttendantKfDelivery` int(11) DEFAULT NULL COMMENT 'ID DEL ENCARGADO QUE RECIBE LA LLAVE',
  `thirdPersonNames` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'NOMBRE DE LA TERCERA PERSONA QUE RECIBE O RETIRA',
  `thirdPersonPhone` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'TELEFONO DE LA TERCERA PERSONA',
  `thirdPersonId` int(11) DEFAULT NULL COMMENT 'DNI DE LA TERCERA PERSONA',
  `isNew` tinyint(4) DEFAULT NULL,
  `isAplicate` tinyint(4) DEFAULT NULL,
  `idStatusTicketKfOld` int(11) DEFAULT NULL COMMENT 'ID DEL STATUS EN LA QUE SE ENCONTRABA EL TICKET ANTE DE UNA CANCELACION',
  `sendUserNotification` tinyint(4) DEFAULT NULL COMMENT 'Autorizar a notificar y permitir visualizar pedido al usuario o empresa',
  `totalGestion` decimal(18,2) DEFAULT '0.00',
  `totalLlave` decimal(18,2) DEFAULT '0.00',
  `totalEnvio` decimal(18,2) DEFAULT '0.00',
  `urlToken` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'URL TOKEN UTILIZADO PARA APROBAR O RECHAZAR UN PEDIDO',
  PRIMARY KEY (`idTicket`)
) ENGINE=MyISAM AUTO_INCREMENT=147 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

/*Data for the table `tb_tickets` */

insert  into `tb_tickets`(`idTicket`,`dateCreated`,`dateRecibeCompany`,`idStatusTicketKf`,`codTicket`,`idTypeTicketKf`,`idRequestKf`,`idUserTenantKf`,`idOWnerKf`,`idUserAdminKf`,`idUserCompany`,`idUserEnterpriceKf`,`idUserAttendantKf`,`numberItemes`,`idTypeOfKeysKf`,`itemToDisabled`,`idReasonDisabledItemKf`,`idTypeOuther`,`mailContactConsult`,`SA_NRO_ORDER`,`descriptionComment`,`descriptionOrder`,`isCommentOrDesccriptionChange`,`idTypeServicesKf`,`totalService`,`addressConsul`,`idProfileKf`,`idOpcionLowTicketKf`,`idTypeOfOptionKf`,`idCompanyKf`,`idAdressKf`,`idDepartmentKf`,`idUserCancelTicket`,`isCancelRequested`,`reasonForCancelTicket`,`dateCancel`,`idUserApprovedTicket`,`dateRecibedAdmin`,`idOtherKf`,`isChangeDeliverylRequested`,`idUserHasChangeTicket`,`idTypeDeliveryKf`,`idWhoPickUp`,`idUserAttendantKfDelivery`,`thirdPersonNames`,`thirdPersonPhone`,`thirdPersonId`,`isNew`,`isAplicate`,`idStatusTicketKfOld`,`sendUserNotification`,`totalGestion`,`totalLlave`,`totalEnvio`,`urlToken`) values 
(131,'2019-09-09 22:48:42',NULL,2,'TK-00000264',1,0,82,0,31,NULL,0,0,1,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,270.99,NULL,1,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,1,1,NULL,NULL,NULL,NULL,1,NULL,NULL,1,260.00,10.99,0.00,'VWMWNeeu2oIFapiJnXpb'),
(132,'2019-09-09 23:00:40',NULL,2,'TK-00000265',1,0,74,71,0,NULL,0,0,1,'{\"keys\":[{\"idKeyKf\":\"4\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,320.99,NULL,3,NULL,NULL,5,12,120,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,2,2,77,NULL,NULL,NULL,1,NULL,NULL,NULL,0.00,10.99,310.00,'AgYvWzRJ.BioZdKAZ6-h'),
(133,'2019-09-10 13:45:28',NULL,2,'TK-00000266',1,0,0,71,0,NULL,0,0,2,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,451.98,NULL,3,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,2,3,NULL,'Carolina Vasquez','112243242344',95929321,1,NULL,NULL,NULL,260.00,21.98,170.00,'mWGfB0Zck4.mGJStLnol'),
(134,'2019-09-10 14:05:14',NULL,2,'TK-00000267',1,0,0,0,31,NULL,0,84,2,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,'',NULL,1,NULL,281.98,NULL,1,NULL,1,5,11,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,1,1,NULL,NULL,NULL,NULL,1,NULL,NULL,1,260.00,21.98,0.00,'hUAAX:216vPAKcA0lZgP'),
(135,'2019-09-10 14:11:52',NULL,2,'TK-00000268',1,0,0,0,31,NULL,0,76,1,'{\"keys\":[{\"idKeyKf\":\"4\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,320.99,NULL,1,NULL,1,5,12,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,2,2,77,NULL,NULL,NULL,1,NULL,NULL,1,0.00,10.99,310.00,'6.g3DR0TYX54F8jubqWa'),
(136,'2019-09-10 22:18:35',NULL,2,'TK-00000269',1,0,0,71,31,NULL,0,0,1,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,270.99,NULL,1,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,1,1,NULL,NULL,NULL,NULL,1,NULL,NULL,1,260.00,10.99,0.00,'Qv4eEcdelsCe97BZAEx8'),
(137,'2019-09-10 22:20:51',NULL,2,'TK-00000270',1,0,0,71,31,NULL,0,0,1,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,270.99,NULL,1,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,1,1,NULL,NULL,NULL,NULL,1,NULL,NULL,1,260.00,10.99,0.00,'9IVjBWqHs.O1qjeP1k8V'),
(138,'2019-09-10 22:25:05',NULL,2,'TK-00000271',1,0,0,71,31,NULL,0,0,2,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,451.98,NULL,1,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,2,2,89,NULL,NULL,NULL,1,NULL,NULL,1,260.00,21.98,170.00,'T7M3fmxLYARN-LuMz0v1'),
(139,'2019-09-10 22:26:43',NULL,3,'TK-00000272',1,0,0,71,31,NULL,0,0,2,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,451.98,NULL,1,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,31,'2019-09-11 03:30:03',0,NULL,NULL,2,2,84,NULL,NULL,NULL,1,NULL,NULL,1,260.00,21.98,170.00,'5OK79n3RuzsjDbHIJ1QI'),
(140,'2019-09-10 22:27:36',NULL,3,'TK-00000273',1,0,0,71,31,NULL,0,0,2,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,281.98,NULL,1,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,31,'2019-09-11 03:30:00',0,NULL,NULL,1,1,NULL,NULL,NULL,NULL,1,NULL,NULL,1,260.00,21.98,0.00,'VayOcRo.yvAxwjEw647H'),
(141,'2019-09-10 22:29:14',NULL,3,'TK-00000274',1,0,0,71,31,NULL,0,0,2,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,451.98,NULL,1,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,31,'2019-09-11 03:29:58',0,NULL,NULL,2,2,78,NULL,NULL,NULL,1,NULL,NULL,1,260.00,21.98,170.00,'cDQsHZraOMIjwFfyObvo'),
(142,'2019-09-10 22:31:06',NULL,2,'TK-00000275',1,0,0,71,31,NULL,0,0,2,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,451.98,NULL,1,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,2,2,84,NULL,NULL,NULL,1,NULL,NULL,1,260.00,21.98,170.00,'ZQhaJab_lapt3T:4r9gf'),
(143,'2019-09-10 23:34:58',NULL,2,'TK-00000276',1,0,0,71,31,NULL,0,0,1,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,270.99,NULL,1,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,1,1,NULL,NULL,NULL,NULL,1,NULL,NULL,1,260.00,10.99,0.00,'sxN1zFdxa47GUjVtvZj3'),
(144,'2019-09-10 23:41:02',NULL,2,'TK-00000277',1,0,0,71,31,NULL,0,0,1,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,440.99,NULL,1,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,2,2,75,NULL,NULL,NULL,1,NULL,NULL,1,260.00,10.99,170.00,'--RfxK.mYUf7DrK21_kn'),
(145,'2019-09-10 23:42:50',NULL,3,'TK-00000278',1,0,0,71,31,NULL,0,0,1,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,100.99,NULL,1,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,1,'2020-03-19 03:36:58',0,NULL,1,1,1,NULL,NULL,NULL,NULL,1,NULL,NULL,1,260.00,10.99,0.00,'fQKigD_OB1WbFX4ohqe.'),
(146,'2019-09-10 23:54:26',NULL,6,'TK-00000279',1,0,0,71,31,NULL,0,0,1,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,100.99,NULL,1,NULL,NULL,5,11,100,1,NULL,'ghfghf','2020-03-19 03:37:53',NULL,NULL,0,NULL,1,1,1,NULL,NULL,NULL,NULL,1,NULL,NULL,1,260.00,10.99,0.00,'h5RgaRWBPbxSsdGq:73g'),
(129,'2019-09-06 23:56:49',NULL,3,'TK-00000262',1,0,0,71,0,NULL,0,0,2,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,281.98,NULL,3,NULL,NULL,5,11,100,NULL,NULL,NULL,NULL,31,'2019-09-07 05:19:56',0,NULL,NULL,1,1,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,260.00,21.98,0.00,'tRHY0xO-xpP7ozeu1FJg'),
(130,'2019-09-07 00:35:58',NULL,2,'TK-00000263',1,0,0,0,31,NULL,0,0,1,'{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}','null',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,440.99,NULL,1,NULL,2,5,11,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,2,2,89,NULL,NULL,NULL,1,NULL,NULL,1,260.00,10.99,170.00,'l7:LyXlS9ksUfLmp7y6E');

/*Table structure for table `tb_tmp_delivery_data` */

DROP TABLE IF EXISTS `tb_tmp_delivery_data`;

CREATE TABLE `tb_tmp_delivery_data` (
  `idTmpDeliveryData` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID DE LA INFO TEMPORAL ASOCIADO A UN TICKET',
  `tmp_idTicketKf` int(11) NOT NULL COMMENT 'ID DEL TICKET ',
  `tmp_thirdPersonNames` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'NOMBRE DE LA TERCERA PERSONA QUE RECIBE O RETIRA',
  `tmp_thirdPersonPhone` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'TELEFONO DE LA TERCERA PERSONA',
  `tmp_thirdPersonId` int(11) DEFAULT NULL COMMENT 'DNI DE LA TERCERA PERSONA',
  `tmp_idUserAttendantKfDelivery` int(11) DEFAULT NULL COMMENT 'ID DEL ENCARGADO QUE RECIBE LA LLAVE',
  `tmp_idTypeDeliveryKf` int(11) DEFAULT NULL,
  `tmp_totalService` decimal(18,2) DEFAULT NULL,
  `tmp_idWhoPickUpKf` int(11) DEFAULT NULL,
  `tmp_idUserRequestChOrCancel` int(11) DEFAULT NULL COMMENT 'ID DEL USUARIO QUE SOLICITA EL CAMBIO DE ENVIO O CANCELACION',
  `tmp_reasonForCancelTicket` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `tmp_isChApproved` int(4) DEFAULT NULL COMMENT 'VALOR SUMINISTRADO POR SISTEMA LOCAL COFERBA',
  `tmp_isCancelApproved` int(4) DEFAULT NULL COMMENT 'VALOR SUMINISTRADO POR SISTEMA LOCAL COFERBA',
  `tmp_isChOrCancelApplied` int(4) DEFAULT NULL,
  `dateOfRequestByUser` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idTmpDeliveryData`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

/*Data for the table `tb_tmp_delivery_data` */

/*Table structure for table `tb_totem_model` */

DROP TABLE IF EXISTS `tb_totem_model`;

CREATE TABLE `tb_totem_model` (
  `idTotenModel` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `totenModel` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`idTotenModel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tb_totem_model` */

/*Table structure for table `tb_type_attendant` */

DROP TABLE IF EXISTS `tb_type_attendant`;

CREATE TABLE `tb_type_attendant` (
  `idTyepeAttendant` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nameTypeAttendant` varchar(100) COLLATE utf8_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`idTyepeAttendant`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

/*Data for the table `tb_type_attendant` */

insert  into `tb_type_attendant`(`idTyepeAttendant`,`nameTypeAttendant`) values 
(1,'Otro'),
(2,'Titular'),
(3,'Suplente'),
(4,'Ayudante'),
(5,'Intendente');

/*Table structure for table `tb_type_delivery` */

DROP TABLE IF EXISTS `tb_type_delivery`;

CREATE TABLE `tb_type_delivery` (
  `idTypeDelivery` int(11) DEFAULT NULL,
  `typeDelivery` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `amount` decimal(18,2) DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `tb_type_gps` */

insert  into `tb_type_gps`(`idTypeGps`,`typeGps`) values 
(1,'GPS 1'),
(2,'GPS 2'),
(3,'GPS 3');

/*Table structure for table `tb_type_internet` */

DROP TABLE IF EXISTS `tb_type_internet`;

CREATE TABLE `tb_type_internet` (
  `idTypeInternet` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `typeInternet` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`idTypeInternet`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `tb_type_internet` */

insert  into `tb_type_internet`(`idTypeInternet`,`typeInternet`) values 
(1,'CABLEMODEM'),
(2,'SATELITAL'),
(3,'FIBRA');

/*Table structure for table `tb_type_maintenance` */

DROP TABLE IF EXISTS `tb_type_maintenance`;

CREATE TABLE `tb_type_maintenance` (
  `idTypeMaintenance` int(11) NOT NULL AUTO_INCREMENT,
  `typeMaintenance` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idTypeMaintenance`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `tb_type_maintenance` */

insert  into `tb_type_maintenance`(`idTypeMaintenance`,`typeMaintenance`) values 
(1,'PRUEBA DE TIPO DE MANTENIMIENTO');

/*Table structure for table `tb_type_outher` */

DROP TABLE IF EXISTS `tb_type_outher`;

CREATE TABLE `tb_type_outher` (
  `idTypeOuther` int(11) NOT NULL,
  `TypeOuther` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTypeOuther`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

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
  `typeServices` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `SA_ID_TYPE` int(11) DEFAULT NULL,
  PRIMARY KEY (`idTypeServices`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

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
  `idTypeTenant` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `typeTenantName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTypeTenant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

/*Data for the table `tb_typetenant` */

insert  into `tb_typetenant`(`idTypeTenant`,`typeTenantName`) values 
('1','Propietario'),
('2','Inquilino');

/*Table structure for table `tb_typeticket` */

DROP TABLE IF EXISTS `tb_typeticket`;

CREATE TABLE `tb_typeticket` (
  `idTypeTicket` int(11) NOT NULL AUTO_INCREMENT,
  `TypeTicketName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTypeTicket`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

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
  `isDepartmentApproved` tinyint(4) DEFAULT NULL COMMENT 'APROBADO O NO  EL DEPARTAMENTO DEL INQUILINO',
  `isEdit` tinyint(11) DEFAULT '0',
  `requireAuthentication` tinyint(11) DEFAULT '1',
  `idTypeTenantKf` int(11) DEFAULT NULL,
  `idStatusKf` int(11) unsigned DEFAULT NULL,
  `tokenMail` varchar(300) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `isConfirmatedMail` tinyint(4) DEFAULT '0',
  `SA_ID` int(11) DEFAULT NULL,
  `idSysProfileFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  KEY `idProfileKf` (`idProfileKf`),
  KEY `idAddresKf` (`idAddresKf`),
  KEY `idCompanyKf` (`idCompanyKf`),
  CONSTRAINT `tb_user_ibfk_1` FOREIGN KEY (`idProfileKf`) REFERENCES `tb_profile` (`idProfile`) ON UPDATE NO ACTION,
  CONSTRAINT `tb_user_ibfk_2` FOREIGN KEY (`idAddresKf`) REFERENCES `tb_addres` (`idAdress`),
  CONSTRAINT `tb_user_ibfk_3` FOREIGN KEY (`idCompanyKf`) REFERENCES `tb_company` (`idCompany`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

/*Data for the table `tb_user` */

insert  into `tb_user`(`idUser`,`fullNameUser`,`emailUser`,`phoneNumberUser`,`phoneLocalNumberUser`,`passwordUser`,`idProfileKf`,`dateCreated`,`idCompanyKf`,`resetPasword`,`idAddresKf`,`idTyepeAttendantKf`,`descOther`,`idDepartmentKf`,`isDepartmentApproved`,`isEdit`,`requireAuthentication`,`idTypeTenantKf`,`idStatusKf`,`tokenMail`,`isConfirmatedMail`,`SA_ID`,`idSysProfileFk`) values 
(1,'admin sistema','soporte@coferba.com.ar','(054) 9 11 2323-2323','91124759596','fe703d258c7ef5f50b71e06565a65aa07194907f',1,'2018-02-16 09:01:22',NULL,0,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,1,NULL,1,NULL,8),
(71,'David Eduardo Rincon','davideduardo.luengo@hotmail.com','','1122333444555666','870e8768d555d80e0aeb44870c081f5563d90bd3',3,'2018-10-21 23:33:22',5,0,11,NULL,NULL,NULL,NULL,0,NULL,1,1,'3Jh0NuqLHa',1,NULL,NULL),
(72,'leandro figueroa','lean.figueroa@gmail.com','123213213213213','123213213213213','1f82ea75c5cc526729e2d581aeb3aeccfef4407e',5,'2018-10-29 13:27:43',5,0,12,NULL,NULL,117,1,0,NULL,2,1,'JbuVXny0Jr',1,NULL,NULL),
(73,'leandro2 figueroa2','leandro.figueroa@coferba.com.ar','1122356388','123213213213213','1f82ea75c5cc526729e2d581aeb3aeccfef4407e',3,'2018-10-29 13:48:52',5,0,12,NULL,NULL,NULL,NULL,1,NULL,1,1,'OLtCaObFgO',1,NULL,NULL),
(74,'inquilino prueba','rexx84@gmail.com','123213213213213','123213213213213','03d000df4fa813c9d0c93e59a0ba3b6dc5c88399',5,'2018-10-29 13:58:23',5,0,12,NULL,NULL,120,1,0,NULL,2,1,'XTrpLMkZiG',1,NULL,NULL),
(75,'Encargado Prueba','encargadoprueba@asdasda','123213213213213','1123232434333423','c4f9fcd7be6b041073f1b23a2bf80bd1d831292e',6,'2018-12-19 14:30:57',5,1,11,4,NULL,103,1,1,1,2,1,'gQuGxR2Zoo',1,NULL,NULL),
(76,'Roberto Higuera','rhiguera@fffff.com','123213213213213','123213213213213','03d000df4fa813c9d0c93e59a0ba3b6dc5c88399',6,'2019-01-18 01:10:24',5,0,12,2,NULL,NULL,NULL,0,1,1,1,'ZWsfbNEEXB',1,NULL,NULL),
(77,'Esteban Moreli','emoreli@akjsdsadas.com','123213213213213','11233243253243','44b07ccf74fd8a488be0b4aa0593beff5ac6f3ef',6,'2019-01-18 01:31:36',5,1,12,3,NULL,NULL,NULL,1,0,0,1,'uQzz412uH5',1,NULL,NULL),
(78,'Victor Gonzalez','vgonzalez@asdadsadwq.com','77788787878','','03d000df4fa813c9d0c93e59a0ba3b6dc5c88399',6,'2019-01-18 01:33:07',5,0,11,2,NULL,NULL,NULL,1,1,1,1,'69bMxpjXQ8',1,NULL,NULL),
(79,'Sofia Rincon','sofia.rincon@asdasdsad.com','123213213213213','123213213213213','03d000df4fa813c9d0c93e59a0ba3b6dc5c88399',4,'2019-01-22 01:06:32',5,0,NULL,NULL,NULL,NULL,NULL,0,0,NULL,1,'NaUwCkVwH4',1,NULL,NULL),
(80,'Daniela Becerra','daniela.becerra@hoasdsad.com','123213213213213','123213213213213','03d000df4fa813c9d0c93e59a0ba3b6dc5c88399',5,'2019-02-10 22:23:37',5,0,NULL,NULL,NULL,NULL,1,1,NULL,2,1,'hXLcQRwWGn',1,NULL,NULL),
(81,'probando','probando@probando.com','123213123213','','f11131b2bcdf821dc9ff69b38e2712541439b9f8',5,'2019-07-27 14:29:15',5,1,11,NULL,NULL,108,1,1,NULL,2,1,'lxUXCkdgnZ',1,NULL,NULL),
(82,'asdsadas','asdsad@asdsad.com','','12321311312','b9f4327bafdb162ed16fe0d6d4a50bde306ee08e',5,'2019-07-27 14:51:24',5,1,11,NULL,NULL,100,1,1,NULL,2,1,'HCU6UgT88X',1,NULL,NULL),
(83,'erewrrewrew','wqewqew@asdsad.com','','121321321','7be5fac0585900a65effd04d887cc62022b16a20',5,'2019-07-27 15:38:43',5,1,11,NULL,NULL,100,1,1,NULL,2,1,'yZAGdjTOLv',1,NULL,NULL),
(84,'Arturo Michelena','amichelena@asdas.com','','11232142132132','fc604011dbac13b0f6f0b89c81c0efe0271530c1',6,'2019-07-27 15:59:58',5,1,11,2,NULL,NULL,NULL,1,0,0,1,'WuYJFO1DZD',1,NULL,NULL),
(85,'Fernando Angulo','david.rincon.oracle@gmail.com','','123213213','78d16ced1eedb4f436c83a861c91e052aaf3699f',3,'2019-07-27 21:43:16',5,1,12,NULL,NULL,NULL,NULL,0,NULL,1,1,'7gVmCe4f3J',1,NULL,NULL),
(86,'David Eduardo Rincon','davideduardo.luengo2@hotmail.com','','01122356388','fa399d74e61282062d50aaf7eb6a9afc1b21f314',5,'2019-08-21 00:20:44',1,1,1,NULL,NULL,2,1,1,NULL,2,1,'K67aipTQu2',1,NULL,NULL),
(87,'Ernesto Araujo','earaujo@asdsad.com','','111232324324324','5365642294a7a05378e5e13cd44fa91c5f9b546a',6,'2019-08-29 20:12:26',1,1,1,2,NULL,NULL,NULL,1,0,0,1,'FLTvvGz5wZ',1,NULL,NULL),
(88,'Gabriel Gonzalez','ggonzalez@hotmail.com','','112322424233','e47ed8dab1b69a560435c3f4bff9d2679ab12233',6,'2019-08-29 20:13:21',1,1,2,2,NULL,NULL,NULL,1,0,0,1,'WM7HECe4EL',1,NULL,NULL),
(89,'Dionisio Machado','dmachado@asdasd.com','121232132134','112143435556','80662a250c92f9c05b965cbff69785fdc404d0c4',6,'2019-08-29 20:22:06',5,1,11,1,'Plomero',NULL,NULL,1,0,NULL,1,'YJh6f8Gxb0',1,NULL,NULL),
(90,'prueba','prueba','prueba',NULL,'508bbdcf90061f63832be9aeaeb508ed1da6bd6b',1,'2019-11-09 16:25:55',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'fxvMqFzwGK',0,NULL,8),
(91,'prueba','sfsdfdsfdfds','prueba',NULL,'13a6d4daa92304298f07df965a8e71a42a6d2047',1,'2019-11-09 16:26:53',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'FAMIVpMRxv',0,NULL,8);

/*Table structure for table `tb_user_license` */

DROP TABLE IF EXISTS `tb_user_license`;

CREATE TABLE `tb_user_license` (
  `idUserLincese` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `fullName` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `key` varchar(100) DEFAULT NULL,
  `isAndroidOperantSystem` tinyint(1) DEFAULT '1',
  `profileUser` int(11) DEFAULT NULL,
  `idClientServicesSmartPanicFk` int(11) DEFAULT NULL,
  PRIMARY KEY (`idUserLincese`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tb_user_license` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
