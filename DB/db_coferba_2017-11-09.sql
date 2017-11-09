# ************************************************************
# Sequel Pro SQL dump
# Versión 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.1.26-MariaDB)
# Base de datos: db_coferba
# Tiempo de Generación: 2017-11-09 20:06:33 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Volcado de tabla tb_branch
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tb_branch`;

CREATE TABLE `tb_branch` (
  `idBranch` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `branchName` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL,
  `idCompanyKf` int(11) DEFAULT NULL,
  `nameLocation` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`idBranch`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

LOCK TABLES `tb_branch` WRITE;
/*!40000 ALTER TABLE `tb_branch` DISABLE KEYS */;

INSERT INTO `tb_branch` (`idBranch`, `branchName`, `idCompanyKf`, `nameLocation`)
VALUES
	(1,'SUCURSAL 1',1,'AYACUCHO 50'),
	(2,'SUCURSAL 2',1,'AYACUCHO 50'),
	(3,'SUCURSAL 3',2,'MARTINEZ 2000'),
	(4,'SUCURSAL 4',2,'MARTINEZ 100');

/*!40000 ALTER TABLE `tb_branch` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
