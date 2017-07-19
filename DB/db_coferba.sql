/*
Navicat MySQL Data Transfer

Source Server         : MyServer
Source Server Version : 100125
Source Host           : localhost:3306
Source Database       : db_coferba

Target Server Type    : MYSQL
Target Server Version : 100125
File Encoding         : 65001

Date: 2017-07-18 22:54:56
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tb_department
-- ----------------------------
DROP TABLE IF EXISTS `tb_department`;
CREATE TABLE `tb_department` (
  `idDepartment` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `departmentAddress` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `departmentFloor` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `deparmentNumber` int(11) DEFAULT NULL,
  `departmentLat` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `departmentLon` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `deparmentDescription` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idDepartment`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- ----------------------------
-- Records of tb_department
-- ----------------------------

-- ----------------------------
-- Table structure for tb_profile
-- ----------------------------
DROP TABLE IF EXISTS `tb_profile`;
CREATE TABLE `tb_profile` (
  `idProfile` int(11) NOT NULL,
  `nameProfile` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idProfile`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- ----------------------------
-- Records of tb_profile
-- ----------------------------

-- ----------------------------
-- Table structure for tb_request
-- ----------------------------
DROP TABLE IF EXISTS `tb_request`;
CREATE TABLE `tb_request` (
  `idRequest` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `RequestName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idRequest`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- ----------------------------
-- Records of tb_request
-- ----------------------------

-- ----------------------------
-- Table structure for tb_status
-- ----------------------------
DROP TABLE IF EXISTS `tb_status`;
CREATE TABLE `tb_status` (
  `idStatusTenant` int(255) NOT NULL,
  `statusTenantName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idStatusTenant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of tb_status
-- ----------------------------

-- ----------------------------
-- Table structure for tb_statusticket
-- ----------------------------
DROP TABLE IF EXISTS `tb_statusticket`;
CREATE TABLE `tb_statusticket` (
  `idStatus` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `statusName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idStatus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of tb_statusticket
-- ----------------------------

-- ----------------------------
-- Table structure for tb_tenant
-- ----------------------------
DROP TABLE IF EXISTS `tb_tenant`;
CREATE TABLE `tb_tenant` (
  `idTenant` int(11) NOT NULL AUTO_INCREMENT,
  `fullNameTenant` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeKf` int(11) DEFAULT NULL,
  `phoneNumberTenant` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idDepartmentKf` int(11) DEFAULT NULL,
  `emailTenant` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idStatuKf` int(11) DEFAULT NULL,
  `dateCrated` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idTenant`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- ----------------------------
-- Records of tb_tenant
-- ----------------------------

-- ----------------------------
-- Table structure for tb_tickets
-- ----------------------------
DROP TABLE IF EXISTS `tb_tickets`;
CREATE TABLE `tb_tickets` (
  `idTicket` int(11) NOT NULL AUTO_INCREMENT,
  `dateCreated` datetime DEFAULT NULL,
  `dateRecibedAdmin` datetime DEFAULT NULL,
  `dateRecibeCompany` datetime DEFAULT NULL,
  `idStatusTicketKf` int(11) DEFAULT NULL,
  `codTicket` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` int(11) DEFAULT NULL,
  `description` text COLLATE utf8_spanish2_ci,
  `idRequestKf` int(11) DEFAULT NULL,
  `idTenantKf` int(11) DEFAULT NULL,
  `idUserAdminKf` int(11) DEFAULT NULL,
  `idUserCompany` int(11) DEFAULT NULL,
  `idUserEnterpriceKf` int(11) DEFAULT NULL,
  PRIMARY KEY (`idTicket`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- ----------------------------
-- Records of tb_tickets
-- ----------------------------

-- ----------------------------
-- Table structure for tb_typetenant
-- ----------------------------
DROP TABLE IF EXISTS `tb_typetenant`;
CREATE TABLE `tb_typetenant` (
  `idTypeTenant` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `typeTenantName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTypeTenant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- ----------------------------
-- Records of tb_typetenant
-- ----------------------------

-- ----------------------------
-- Table structure for tb_typeticket
-- ----------------------------
DROP TABLE IF EXISTS `tb_typeticket`;
CREATE TABLE `tb_typeticket` (
  `idTypeTicket` int(255) NOT NULL,
  `TypeTicketName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTypeTicket`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- ----------------------------
-- Records of tb_typeticket
-- ----------------------------

-- ----------------------------
-- Table structure for tb_user
-- ----------------------------
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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- ----------------------------
-- Records of tb_user
-- ----------------------------
SET FOREIGN_KEY_CHECKS=1;
