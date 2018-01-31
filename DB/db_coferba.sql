# ************************************************************
# Sequel Pro SQL dump
# Versión 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.35)
# Base de datos: db_coferba
# Tiempo de Generación: 2018-01-31 14:42:52 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


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
  `idTyepeAttendantKf` int(11) DEFAULT NULL,
  `idStatusKf` int(11) DEFAULT '1',
  `descOther` text COLLATE utf8_swedish_ci,
  PRIMARY KEY (`idAttendant`),
  KEY `idTyepeAttendantKf` (`idTyepeAttendantKf`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

LOCK TABLES `tb_attendant` WRITE;
/*!40000 ALTER TABLE `tb_attendant` DISABLE KEYS */;

INSERT INTO `tb_attendant` (`idAttendant`, `nameAttendant`, `idAddresKf`, `phoneAttendant`, `phoneLocalAttendant`, `mailAttendant`, `hoursWork`, `idTyepeAttendantKf`, `idStatusKf`, `descOther`)
VALUES
	(1,'JORGE GUTIERREZ',1,'12319283712',NULL,'adsaa@daas.djh',NULL,NULL,1,NULL),
	(2,'DAVID',1,'31221312321',NULL,'adsaa@daas.djh',NULL,NULL,1,NULL),
	(3,'MIGUEL MARTINEZ',2,'312312312211',NULL,'adsaa@daas.djh',NULL,NULL,NULL,NULL),
	(4,'MARTINEZ JULO',3,'12321321312',NULL,'adsaa@daas.djh',NULL,NULL,NULL,NULL),
	(5,'prueba EDITE 2',1,'31321321321',NULL,'prueba@pruba.com','08:40',2,NULL,NULL),
	(6,'prueba',1,'31321321321',NULL,'DFSD@SDDDS.DF','08:40',NULL,NULL,NULL),
	(7,'Francisco Ochoa',1,'113435476878','112345678757','fracisco.ochoa@gmail.com',NULL,NULL,NULL,NULL),
	(8,'prueba',1,'31321321321',NULL,'prueba@pruba.com','08:40',NULL,1,NULL),
	(9,'prueba EDITE',1,'31321321321',NULL,'prueba@pruba.com','08:40',2,1,NULL);

/*!40000 ALTER TABLE `tb_attendant` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
