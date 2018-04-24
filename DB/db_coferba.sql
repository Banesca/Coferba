/*
 Navicat Premium Data Transfer

 Source Server         : coferba2
 Source Server Type    : MySQL
 Source Server Version : 100119
 Source Host           : 167.250.5.44:3306
 Source Schema         : coferba_db

 Target Server Type    : MySQL
 Target Server Version : 100119
 File Encoding         : 65001

 Date: 24/04/2018 14:13:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tb_addres
-- ----------------------------
DROP TABLE IF EXISTS `tb_addres`;
CREATE TABLE `tb_addres`  (
  `idAdress` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nameAdress` varchar(300) CHARACTER SET utf8 COLLATE utf8_swedish_ci DEFAULT NULL,
  `priceUni` decimal(10, 2) DEFAULT 0.00 COMMENT 'Precio por unidad',
  `priceManagement` decimal(10, 2) DEFAULT 0.00 COMMENT 'Precio por Gestion',
  `priceShipping` decimal(10, 2) DEFAULT 0.00 COMMENT 'Precio por envio ',
  PRIMARY KEY (`idAdress`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tb_addres
-- ----------------------------
INSERT INTO `tb_addres` VALUES (1, 'Cramer 1275', 100.00, 0.00, 150.00);
INSERT INTO `tb_addres` VALUES (2, 'Blanco Encalada 2355', 0.00, 0.00, 0.00);
INSERT INTO `tb_addres` VALUES (3, 'Cabildo 3510', 0.00, 0.00, 0.00);
INSERT INTO `tb_addres` VALUES (4, 'Gral. La valle 1920', 0.00, 0.00, 0.00);
INSERT INTO `tb_addres` VALUES (5, 'Parana 2568', 0.00, 0.00, 0.00);
INSERT INTO `tb_addres` VALUES (6, 'Rivadavia 4530', 0.00, 0.00, 0.00);

-- ----------------------------
-- Table structure for tb_attendant
-- ----------------------------
DROP TABLE IF EXISTS `tb_attendant`;
CREATE TABLE `tb_attendant`  (
  `idAttendant` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nameAttendant` varchar(300) CHARACTER SET utf8 COLLATE utf8_swedish_ci DEFAULT NULL,
  `idAddresKf` int(11) DEFAULT NULL,
  `phoneAttendant` varchar(25) CHARACTER SET utf8 COLLATE utf8_swedish_ci DEFAULT NULL,
  `phoneLocalAttendant` varchar(25) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `mailAttendant` varchar(200) CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL,
  `hoursWork` varchar(200) CHARACTER SET utf8 COLLATE utf8_swedish_ci DEFAULT NULL,
  `idTyepeAttendantKf` int(11) DEFAULT NULL,
  `idStatusKf` int(11) DEFAULT 1,
  `descOther` text CHARACTER SET utf8 COLLATE utf8_swedish_ci,
  PRIMARY KEY (`idAttendant`) USING BTREE,
  INDEX `idTyepeAttendantKf`(`idTyepeAttendantKf`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8 COLLATE = utf8_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tb_attendant
-- ----------------------------
INSERT INTO `tb_attendant` VALUES (1, 'JORGE GUTIERREZ', 1, '12319283712', '05491232132', 'adsaa@daas.djh', '', 2, 1, NULL);
INSERT INTO `tb_attendant` VALUES (2, 'DAVID', 1, '31221312321', '05491133455', 'adsaa@daas.djh', '', 2, 1, NULL);
INSERT INTO `tb_attendant` VALUES (3, 'MIGUEL MARTINEZ', 2, '312312312211', '054919329491', 'adsaa@daas.djh', '', 2, 1, NULL);
INSERT INTO `tb_attendant` VALUES (4, 'MARTINEZ JULO', 3, '12321321312', NULL, 'adsaa@daas.djh', NULL, 2, 1, NULL);
INSERT INTO `tb_attendant` VALUES (7, 'Francisco Ochoa', 1, '(054) 9 22 2222-2222', '(054) 9 11 1111-1111', 'fracisco.ochoa@gmail.com', '', 3, 1, NULL);
INSERT INTO `tb_attendant` VALUES (9, 'prueba EDITE', 1, '31321321321', NULL, 'prueba@pruba.com', '08:40', 5, 1, NULL);
INSERT INTO `tb_attendant` VALUES (31, 'Ernesto Miranda', 1, '054911324666666', '054911234345353', 'ernesto.miranda@gmail.com', '', 1, 1, 'Obrero');
INSERT INTO `tb_attendant` VALUES (32, 'Raul Flores', 1, '', '0549113243243253223', 'raul.flores@hotmail.com', '', 1, 1, 'Techista');
INSERT INTO `tb_attendant` VALUES (37, 'Hernan Araujo', 2, '', '054911324324325543', 'hernan.araujo@gmail.com', '', 1, 1, 'Carpintero');

-- ----------------------------
-- Table structure for tb_branch
-- ----------------------------
DROP TABLE IF EXISTS `tb_branch`;
CREATE TABLE `tb_branch`  (
  `idBranch` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `branchName` varchar(200) CHARACTER SET utf8 COLLATE utf8_swedish_ci DEFAULT NULL,
  `idCompanyKf` int(11) DEFAULT NULL,
  `idAdressKf` int(11) DEFAULT NULL,
  PRIMARY KEY (`idBranch`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tb_branch
-- ----------------------------
INSERT INTO `tb_branch` VALUES (1, 'SUCURSAL 1', 1, 1);
INSERT INTO `tb_branch` VALUES (2, 'SUCURSAL 2', 1, 2);
INSERT INTO `tb_branch` VALUES (3, 'SUCURSAL 1', 2, 3);
INSERT INTO `tb_branch` VALUES (4, 'SUCURSAL 2', 2, 4);
INSERT INTO `tb_branch` VALUES (5, 'Toyota 1', 3, 5);
INSERT INTO `tb_branch` VALUES (6, 'Toyota 2', 3, 6);

-- ----------------------------
-- Table structure for tb_clients_tickets
-- ----------------------------
DROP TABLE IF EXISTS `tb_clients_tickets`;
CREATE TABLE `tb_clients_tickets`  (
  `idTicketsCliets` int(11) NOT NULL AUTO_INCREMENT,
  `idTicketKf` int(11) DEFAULT NULL,
  `idClientKf` int(11) DEFAULT NULL,
  PRIMARY KEY (`idTicketsCliets`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_spanish2_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tb_clients_tickets
-- ----------------------------
INSERT INTO `tb_clients_tickets` VALUES (1, 19, 2);
INSERT INTO `tb_clients_tickets` VALUES (2, 19, 3);
INSERT INTO `tb_clients_tickets` VALUES (3, 19, 1);
INSERT INTO `tb_clients_tickets` VALUES (4, 20, 2);
INSERT INTO `tb_clients_tickets` VALUES (5, 20, 3);
INSERT INTO `tb_clients_tickets` VALUES (6, 20, 1);
INSERT INTO `tb_clients_tickets` VALUES (7, 21, 2);
INSERT INTO `tb_clients_tickets` VALUES (8, 21, 3);
INSERT INTO `tb_clients_tickets` VALUES (9, 21, 1);
INSERT INTO `tb_clients_tickets` VALUES (10, 22, 2);
INSERT INTO `tb_clients_tickets` VALUES (11, 22, 3);
INSERT INTO `tb_clients_tickets` VALUES (12, 22, 1);
INSERT INTO `tb_clients_tickets` VALUES (13, 23, 2);
INSERT INTO `tb_clients_tickets` VALUES (14, 23, 3);
INSERT INTO `tb_clients_tickets` VALUES (15, 23, 1);

-- ----------------------------
-- Table structure for tb_company
-- ----------------------------
DROP TABLE IF EXISTS `tb_company`;
CREATE TABLE `tb_company`  (
  `idCompany` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nameCompany` varchar(300) CHARACTER SET utf8 COLLATE utf8_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`idCompany`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tb_company
-- ----------------------------
INSERT INTO `tb_company` VALUES (1, 'Carlos Castaño');
INSERT INTO `tb_company` VALUES (2, 'Talcahuano Propiedades');
INSERT INTO `tb_company` VALUES (3, 'Toyota');

-- ----------------------------
-- Table structure for tb_department
-- ----------------------------
DROP TABLE IF EXISTS `tb_department`;
CREATE TABLE `tb_department`  (
  `idDepartment` int(11) NOT NULL AUTO_INCREMENT,
  `idAdressKf` int(255) DEFAULT NULL,
  `departmentFloor` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `deparmentNumber` int(11) DEFAULT NULL,
  `deparmentDescription` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idStatusKf` int(11) DEFAULT NULL,
  `idUserAdminRKf` int(11) DEFAULT NULL,
  `idUserAdminPropietariKf` int(11) DEFAULT NULL,
  `idTenantKf` int(11) DEFAULT NULL,
  `isAprobatedAdmin` tinyint(4) DEFAULT 0,
  `isRequesLowByProp` tinyint(4) DEFAULT 0,
  PRIMARY KEY (`idDepartment`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_spanish2_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tb_department
-- ----------------------------
INSERT INTO `tb_department` VALUES (1, 1, 'Porteria', 0, '', 1, 1, NULL, 58, 1, 0);
INSERT INTO `tb_department` VALUES (2, 1, '1-A', 0, '', 1, 1, NULL, 22, 1, 0);
INSERT INTO `tb_department` VALUES (3, 1, '1-B', 0, '', 1, 1, NULL, 22, 1, 0);
INSERT INTO `tb_department` VALUES (4, 1, '2-A', 0, '', 1, 1, NULL, 63, 1, 0);
INSERT INTO `tb_department` VALUES (5, 1, '2-B', 0, '', 1, 1, NULL, 65, 1, 0);
INSERT INTO `tb_department` VALUES (6, 1, '3-A', 0, '', 1, 1, NULL, NULL, 0, 0);
INSERT INTO `tb_department` VALUES (7, 1, '3-B', 0, '', 1, 1, NULL, NULL, 0, 0);
INSERT INTO `tb_department` VALUES (8, 1, '4-A', 0, '', 1, 1, NULL, NULL, 0, 0);
INSERT INTO `tb_department` VALUES (9, 1, '4-B', 0, '', 1, 1, NULL, NULL, 0, 0);
INSERT INTO `tb_department` VALUES (10, 1, '5-A', 0, '', 1, 1, NULL, NULL, 0, 0);
INSERT INTO `tb_department` VALUES (11, 1, '5-B', 0, '', 1, 1, NULL, NULL, 0, 0);
INSERT INTO `tb_department` VALUES (12, 2, '6-A', 0, '', 1, 1, NULL, 22, 1, 0);
INSERT INTO `tb_department` VALUES (13, 2, '6-B', 0, '', 1, 1, NULL, 52, 1, 0);
INSERT INTO `tb_department` VALUES (14, 2, '7-A', 0, '', 1, 1, NULL, NULL, 0, 0);
INSERT INTO `tb_department` VALUES (15, 2, '7-B', 0, '', 1, 1, NULL, NULL, 0, 0);
INSERT INTO `tb_department` VALUES (16, 2, '8-A', 0, '', 1, 1, NULL, 53, 1, 0);
INSERT INTO `tb_department` VALUES (17, 3, '8-B', 0, '', 1, 1, NULL, 60, 1, 0);
INSERT INTO `tb_department` VALUES (18, 2, 'Porteria', 0, NULL, 1, 1, NULL, 43, 1, 0);
INSERT INTO `tb_department` VALUES (19, 3, 'Porteria', 0, NULL, 1, 1, NULL, 64, 1, 0);

-- ----------------------------
-- Table structure for tb_opcion_low
-- ----------------------------
DROP TABLE IF EXISTS `tb_opcion_low`;
CREATE TABLE `tb_opcion_low`  (
  `idOpcionLowTicket` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `opcionLowTicket` varchar(200) CHARACTER SET utf8 COLLATE utf8_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`idOpcionLowTicket`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tb_opcion_low
-- ----------------------------
INSERT INTO `tb_opcion_low` VALUES (1, 'LLaveros en Mi poder');
INSERT INTO `tb_opcion_low` VALUES (2, 'LLaveros Quiero dar de Baja');

-- ----------------------------
-- Table structure for tb_profile
-- ----------------------------
DROP TABLE IF EXISTS `tb_profile`;
CREATE TABLE `tb_profile`  (
  `idProfile` int(11) NOT NULL,
  `nameProfile` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idProfile`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_spanish2_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_profile
-- ----------------------------
INSERT INTO `tb_profile` VALUES (1, 'Coferba');
INSERT INTO `tb_profile` VALUES (2, 'Empresa');
INSERT INTO `tb_profile` VALUES (3, 'Propietario');
INSERT INTO `tb_profile` VALUES (4, 'Admin Consorsio');

-- ----------------------------
-- Table structure for tb_reason_disabled_item
-- ----------------------------
DROP TABLE IF EXISTS `tb_reason_disabled_item`;
CREATE TABLE `tb_reason_disabled_item`  (
  `idReasonDisabledItem` int(11) NOT NULL AUTO_INCREMENT,
  `reasonDisabledItem` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idReasonDisabledItem`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_spanish2_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tb_reason_disabled_item
-- ----------------------------
INSERT INTO `tb_reason_disabled_item` VALUES (1, 'ROBO');
INSERT INTO `tb_reason_disabled_item` VALUES (2, 'EXTRAVIO');
INSERT INTO `tb_reason_disabled_item` VALUES (3, 'FALLA DEL LLAVERO');

-- ----------------------------
-- Table structure for tb_request
-- ----------------------------
DROP TABLE IF EXISTS `tb_request`;
CREATE TABLE `tb_request`  (
  `idRequest` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `RequestName` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idRequest`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_spanish2_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for tb_status
-- ----------------------------
DROP TABLE IF EXISTS `tb_status`;
CREATE TABLE `tb_status`  (
  `idStatusTenant` int(255) NOT NULL,
  `statusTenantName` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idStatusTenant`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_spanish2_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tb_status
-- ----------------------------
INSERT INTO `tb_status` VALUES (-1, 'Eliminado');
INSERT INTO `tb_status` VALUES (0, 'Inactivo');
INSERT INTO `tb_status` VALUES (1, 'Activo');

-- ----------------------------
-- Table structure for tb_statusticket
-- ----------------------------
DROP TABLE IF EXISTS `tb_statusticket`;
CREATE TABLE `tb_statusticket`  (
  `idStatus` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `statusName` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idStatus`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_spanish2_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tb_statusticket
-- ----------------------------
INSERT INTO `tb_statusticket` VALUES ('-1', 'Rechazado', '-1');
INSERT INTO `tb_statusticket` VALUES ('1', 'Finalizado', '1');
INSERT INTO `tb_statusticket` VALUES ('2', 'Pendiente de Aprobacion', '2');
INSERT INTO `tb_statusticket` VALUES ('3', 'Aprobado', '3');

-- ----------------------------
-- Table structure for tb_sys_code
-- ----------------------------
DROP TABLE IF EXISTS `tb_sys_code`;
CREATE TABLE `tb_sys_code`  (
  `idCode` int(11) DEFAULT NULL,
  `code` varchar(200) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `description` varchar(3) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_spanish2_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tb_sys_code
-- ----------------------------
INSERT INTO `tb_sys_code` VALUES (1, '140', 'TK');

-- ----------------------------
-- Table structure for tb_sys_param
-- ----------------------------
DROP TABLE IF EXISTS `tb_sys_param`;
CREATE TABLE `tb_sys_param`  (
  `idParam` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `value` varchar(100) CHARACTER SET utf8 COLLATE utf8_swedish_ci DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`idParam`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tb_sys_param
-- ----------------------------
INSERT INTO `tb_sys_param` VALUES (1, 'rexx84@gmail.com', 'USUARIO SMT MAIL');
INSERT INTO `tb_sys_param` VALUES (2, '..,:;\"david387504odrauderexx', 'CLAVE SMT MAIL');
INSERT INTO `tb_sys_param` VALUES (6, '20:00', 'HORA DE MAIL DE VERIFICACION DE MAIL PARA ADMINISTRADORES DE CONSORCIO');
INSERT INTO `tb_sys_param` VALUES (7, 'ventas@coferba.com.ar', 'MAIL DE VENTAS');
INSERT INTO `tb_sys_param` VALUES (8, 'tecnica@coferba.com.ar', 'MAIL SERVICO TECNICO');
INSERT INTO `tb_sys_param` VALUES (9, 'cobranzas@coferba.com.ar', 'MAIL FACTURACION');
INSERT INTO `tb_sys_param` VALUES (10, 'administracion@coferba.com.ar', 'MAIL ADMINISTRATIVO');

-- ----------------------------
-- Table structure for tb_tenant
-- ----------------------------
DROP TABLE IF EXISTS `tb_tenant`;
CREATE TABLE `tb_tenant`  (
  `idTenant` int(11) NOT NULL AUTO_INCREMENT,
  `fullNameTenant` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeKf` int(11) DEFAULT NULL,
  `phoneNumberTenant` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idDepartmentKf` int(11) DEFAULT NULL,
  `emailTenant` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idStatusKf` int(11) DEFAULT NULL,
  `dateCrated` timestamp(0) DEFAULT CURRENT_TIMESTAMP,
  `phoneNumberContactTenant` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTenant`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 69 CHARACTER SET = utf8 COLLATE = utf8_spanish2_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_tenant
-- ----------------------------
INSERT INTO `tb_tenant` VALUES (1, 'David Eduardo Rincon Luengo', 1, '1126694918', NULL, 'rexx84@gmail.com', 1, '2017-10-18 04:07:25', '1122334455');
INSERT INTO `tb_tenant` VALUES (2, 'Alberto Fabian', 1, '54115778345', NULL, 'Alberto.Fabian@gmail.com', 1, '2017-10-18 04:07:25', '54115778345');
INSERT INTO `tb_tenant` VALUES (3, 'Eduardo Peliacani', 1, '54115778345', NULL, 'Eduardo.Peliacani@gmail.com', 1, '2017-10-18 04:07:25', '54115778345');
INSERT INTO `tb_tenant` VALUES (4, 'Carlos Lazarte', 1, '54115778345', NULL, 'Carlos.Lazarte@gmail.com', 1, '2017-10-18 04:07:25', '54115778345');
INSERT INTO `tb_tenant` VALUES (5, 'Marcos Padilla', 1, '54115778345', NULL, 'Marcos.Padilla@gmail.com', 1, '2017-10-18 04:07:25', '54115778345');
INSERT INTO `tb_tenant` VALUES (6, 'Nahuel Barrati', 1, '54115778345', NULL, 'Nahuel.Barrati@gmail.com', 1, '2017-10-18 04:07:25', '54115778345');
INSERT INTO `tb_tenant` VALUES (7, 'Jan Zambrano', 1, '54115778345', NULL, 'Jan.Zambrano@gmail.com', 1, '2017-10-18 04:07:25', '54115778345');
INSERT INTO `tb_tenant` VALUES (8, 'Marcos Quispes', 1, '54115778345', NULL, 'Marcos.Quispes@gmail.com', 1, '2017-10-18 04:07:25', '54115778345');
INSERT INTO `tb_tenant` VALUES (9, 'Beatriz Gonzalez', 1, '54115778345', NULL, 'Beatriz.Gonzalez@gmail.com', 1, '2017-10-18 04:07:25', '54115778345');
INSERT INTO `tb_tenant` VALUES (10, 'Juan de Vicenti', 1, '54115778345', NULL, 'juan.vicenti@gmail.com', 1, '2017-10-18 04:07:25', '54115778345');
INSERT INTO `tb_tenant` VALUES (11, 'Jorge Gutierrez', 2, '541189054333', NULL, 'jorguti85@gmail.com', 1, '2017-10-18 04:07:25', '541189054333');
INSERT INTO `tb_tenant` VALUES (12, 'Carlos Romero', 2, '541189054333', NULL, 'jorguti86@gmail.com', 1, '2017-10-18 04:07:25', '541189054333');
INSERT INTO `tb_tenant` VALUES (13, 'Jose Carrasco', 2, '541189054333', NULL, 'jorguti87@gmail.com', 1, '2017-10-18 04:07:25', '541189054333');
INSERT INTO `tb_tenant` VALUES (14, 'Alfredo Wirth', 2, '541189054333', NULL, 'jorguti88@gmail.com', 1, '2017-10-18 04:07:25', '541189054333');
INSERT INTO `tb_tenant` VALUES (15, 'Victor Machado', 2, '541189054333', NULL, 'jorguti89@gmail.com', 1, '2017-10-18 04:07:25', '541189054333');
INSERT INTO `tb_tenant` VALUES (16, 'Martin Hatchman', 2, '541189054333', NULL, 'jorguti90@gmail.com', 1, '2017-10-18 04:07:25', '541189054333');
INSERT INTO `tb_tenant` VALUES (17, 'Flavio Alfano', 2, '541189054333', NULL, 'jorguti91@gmail.com', 1, '2017-10-18 04:07:25', '541189054333');
INSERT INTO `tb_tenant` VALUES (18, 'Jorge Dangelo', 2, '541189054333', NULL, 'jorguti92@gmail.com', 1, '2017-10-18 04:07:25', '541189054333');
INSERT INTO `tb_tenant` VALUES (19, 'Jose Perez', 2, '222222222222', NULL, 'jose.perez@gmail.com', 1, '2017-11-10 17:10:02', '111111111111');
INSERT INTO `tb_tenant` VALUES (20, 'Roberto Vicuña', 1, '113344559966', NULL, 'roberto.vicuna@gmail.com', 1, '2017-11-10 18:08:15', '113445567788');
INSERT INTO `tb_tenant` VALUES (21, 'Jesus Antunez', 2, '222222222222', NULL, 'jesus.antunez@gmail.com', 1, '2017-11-11 14:27:42', '111111111111');
INSERT INTO `tb_tenant` VALUES (22, 'Carlos Villalobos', 1, '(054) 9 82 3213-5555', NULL, 'carlos.villalobos@gmail.com', 1, '2017-11-23 00:28:25', '(154) 1 11 1111-1111');
INSERT INTO `tb_tenant` VALUES (23, 'Jorge Gutierrez', 1, '116677889900', NULL, 'jorguti58@gmail.com', 1, '2017-11-23 05:36:21', '114455667788');
INSERT INTO `tb_tenant` VALUES (30, 'Teresa Carreño', 1, '11435436477', NULL, 'teresa.carreno@gmail.com', 1, '2017-11-30 23:43:16', '114325436436');
INSERT INTO `tb_tenant` VALUES (31, 'Osmel Sousa', 2, '112321432532', 2, 'osmel.sousa@gmail.com', 1, '2017-12-02 12:00:09', '(454) 4 44 4444-4444');
INSERT INTO `tb_tenant` VALUES (33, 'Karen Figueroa', 2, '(554) 5 55 5555-5555', 2, 'karen.figueroa@gmail.com', 1, '2017-12-02 12:06:50', '(854) 8 88 8888-3333');
INSERT INTO `tb_tenant` VALUES (34, 'Arturo Michelena', 2, '325325325325', 0, 'arturo.michelena@gmail.com', 1, '2017-12-02 12:13:30', '212432143243');
INSERT INTO `tb_tenant` VALUES (41, 'Gaston Martinez', 1, '(954) 9 99 9999-9999', NULL, 'gaston.martinez@gmail.com', 1, '2018-01-28 20:59:40', '(954) 9 99 9999-9999');
INSERT INTO `tb_tenant` VALUES (40, 'Rafael Correa', 1, '(054) 9 11 3333-3333', NULL, 'rafael.correa@gmail.com', 1, '2018-01-28 20:25:58', '(054) 9 33 3333-3333');
INSERT INTO `tb_tenant` VALUES (39, 'Daniel Contreras', 1, '(054) 9 11 3333-3333', NULL, 'daniel.contreras@gmail.com', 1, '2018-01-28 20:06:20', '(054) 9 11 2323-2323');
INSERT INTO `tb_tenant` VALUES (42, 'Nelva Zambrano', 1, '(054) 1 23 1321-2321', NULL, 'nelva.zambrano@gmail.com', 1, '2018-01-28 21:02:27', '(054) 1 92 1321-3123');
INSERT INTO `tb_tenant` VALUES (43, 'Luciano Alvarez', 1, '(054) 3 12 3921-3213', NULL, 'luciano.alvarez@gmail.com', 1, '2018-01-28 21:10:36', '(054) 9 12 9321-9321');
INSERT INTO `tb_tenant` VALUES (44, 'Dalia Campos', 2, '(054) 9 12 3213-1322', 12, 'dalia.campos@gmail.com', 1, '2018-01-29 07:34:11', '(054) 9 11 2323-2323');
INSERT INTO `tb_tenant` VALUES (46, 'Jairo Ramirez', 2, '(054) 9 11 2304-9544', 3, 'jairo.ramirez@gmail.com', 1, '2018-01-30 04:51:00', '(054) 9 11 2239-9999');
INSERT INTO `tb_tenant` VALUES (47, 'Yulimar Rios', 2, '(054) 9 40 2329-3244', 3, 'yulimar.rios@gmail.com', 1, '2018-01-30 04:55:50', '(054) 9 11 2323-3444');
INSERT INTO `tb_tenant` VALUES (48, 'Flor Antunez', 2, '(954) 9 99 9999-9999', 3, 'flor.antunez@gmail.com', 1, '2018-01-30 04:57:32', '(554) 5 55 5555-5555');
INSERT INTO `tb_tenant` VALUES (49, 'Carmen Gil', 1, '(054) 9 11 2222-2222', NULL, 'carmen.gil@hotmail.com', 1, '2018-01-31 06:58:19', '(054) 9 12 1111-1111');
INSERT INTO `tb_tenant` VALUES (50, 'Wilmer Azuaje', 1, '(054) 9 99 9999-9999', NULL, 'wilmer.azuaje@hotmail.com', 1, '2018-01-31 07:07:43', '(054) 9 88 8888-8888');
INSERT INTO `tb_tenant` VALUES (51, 'Enmauel Fonseca', 1, '(054) 9 99 9999-9999', NULL, 'enmanuel.fonseca@yahoo.com', 1, '2018-01-31 07:12:19', '(154) 1 11 1111-1111');
INSERT INTO `tb_tenant` VALUES (52, 'Humberto Moran', 1, '(054) 1 11 1111-1111', NULL, 'humberto.moran@gmail.com', 1, '2018-01-31 07:19:37', '(054) 2 22 2222-2222');
INSERT INTO `tb_tenant` VALUES (53, 'Xavi Hernandez', 1, '(054) 7 77 7777-7777', NULL, 'xavi.hernandez@yahoo.es', 1, '2018-01-31 07:24:30', '(054) 6 66 6666-6666');
INSERT INTO `tb_tenant` VALUES (54, 'Rigoberto Leal', 1, '(254) 2 22 2222-2222', NULL, 'rigoberto.leal@hotmail.com', 1, '2018-01-31 07:25:27', '(954) 9 99 9999-9999');
INSERT INTO `tb_tenant` VALUES (55, 'Florencia Coco', 2, '(054) 3 33 3333-3333', 16, 'florencia.coco@gmail.com', 1, '2018-01-31 07:39:02', '(054) 1 11 1111-1111');
INSERT INTO `tb_tenant` VALUES (56, 'Omar Vaquez', 2, '(054) 0 00 0000-0000', 13, 'omar.vasquez@gmail.com', 1, '2018-01-31 20:36:56', '(954) 9 99 9999-9999');
INSERT INTO `tb_tenant` VALUES (57, 'Paola Gonzalez', 2, '(154) 1 11 1111-1111', 13, 'paola.gonzalez@hotmail.com', 1, '2018-02-01 06:10:47', '(954) 9 99 9999-9999');
INSERT INTO `tb_tenant` VALUES (58, 'JORGE GUTIERREZ', 0, '12319283712', 0, 'adsaa@daas.djh', 1, '2018-02-06 22:28:05', '05491232132');
INSERT INTO `tb_tenant` VALUES (59, '8484845448841 65464848', 1, '(154) 1 11 1111-1111', NULL, '4494989@hotmail.com', 1, '2018-03-20 13:14:06', '(154) 1 11 1111-1111');
INSERT INTO `tb_tenant` VALUES (60, '654658464 654654654', 1, '(154) 1 11 2251-8504', NULL, 'angelgabrielceballos@gmail.com', 1, '2018-03-20 13:20:35', '(154) 1 11 2251-8504');
INSERT INTO `tb_tenant` VALUES (61, 'Pablo Landa', 2, '(054) 1 13 4163-576', 17, 'pablopablolandalanda@pablo.com', 1, '2018-03-21 17:43:07', '(054) 1 14 5555-5544');
INSERT INTO `tb_tenant` VALUES (62, 'juan perez', 1, '(154) 1 15 2251-8504', NULL, 'unico@gmail.com', 1, '2018-04-10 14:32:12', '(154) 1 15 2251-8504');
INSERT INTO `tb_tenant` VALUES (63, 'pablo marmol', 1, '(154) 1 11 1111-1111', NULL, 'marmol@gmail.com', 1, '2018-04-10 14:46:15', '(154) 1 11 1111-1111');
INSERT INTO `tb_tenant` VALUES (64, 'pedro perez', 1, '(154) 1 11 1111-1111', NULL, 'angel@gmail.com', 1, '2018-04-10 15:46:37', '(154) 1 11 1111-1111');
INSERT INTO `tb_tenant` VALUES (65, 'Adrian', 1, '(154) 1 11 1111-1111', NULL, 'adrian@gmail.com', 1, '2018-04-10 19:18:54', '(154) 1 11 1111-1111');
INSERT INTO `tb_tenant` VALUES (66, 'Claudia', 2, '(154) 1 11 1111-1111', 5, 'claudia@gmail.com', 1, '2018-04-10 19:20:31', '(154) 1 11 1111-1111');
INSERT INTO `tb_tenant` VALUES (67, 'Luis Roca', 2, '(354) 3 33 3333-3333', 0, 'luis.roca@gmail.com', 1, '2018-04-11 13:06:34', '(354) 3 33 3333-3333');
INSERT INTO `tb_tenant` VALUES (68, 'dd', 2, '', 2, 'fff@gfgg', 1, '2018-04-11 13:17:45', '9999999999999');

-- ----------------------------
-- Table structure for tb_tickets
-- ----------------------------
DROP TABLE IF EXISTS `tb_tickets`;
CREATE TABLE `tb_tickets`  (
  `idTicket` int(11) NOT NULL AUTO_INCREMENT,
  `dateCreated` timestamp(0) DEFAULT CURRENT_TIMESTAMP,
  `dateRecibedAdmin` datetime(0) DEFAULT NULL,
  `dateRecibeCompany` datetime(0) DEFAULT NULL,
  `idStatusTicketKf` int(11) DEFAULT 2,
  `codTicket` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` int(11) DEFAULT NULL COMMENT 'ID DEL TIPO DE TICKET',
  `description` text CHARACTER SET utf8 COLLATE utf8_spanish2_ci,
  `idRequestKf` int(11) DEFAULT NULL,
  `idTenantKf` int(11) DEFAULT NULL COMMENT 'ID DEL INQUILINO',
  `idUserAdminKf` int(11) DEFAULT NULL COMMENT 'ID ADMIN COFERBA',
  `idUserCompany` int(11) DEFAULT NULL COMMENT 'ID USUARIO EMPRESA',
  `idUserEnterpriceKf` int(11) NOT NULL COMMENT 'ID ADMIN CONSORCIO',
  `numberItemes` int(11) DEFAULT NULL COMMENT 'CANTIDAD DE LLAVEROS O ELEMENTOS ',
  `idTypeDeliveryKf` int(11) DEFAULT NULL,
  `numberItemDisabled` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idOWnerKf` int(11) DEFAULT NULL COMMENT 'ID DEL PROPIETARIO',
  `idTypeOuther` int(11) DEFAULT NULL COMMENT 'TIPO DE CONSULTA',
  `mailContactConsult` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'MAIL DE CONTACTO PARA CONSULTAS',
  `SA_NRO_ORDER` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idReasonDisabledItemKf` int(11) DEFAULT NULL COMMENT 'Razon Cancelar item',
  `descriptionOrder` varchar(500) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'DESCRIPCION DEL PEDIDO',
  `idTypeServicesKf` int(11) DEFAULT NULL COMMENT 'SERVICIO SOBRE EL CUAL SE SOLICITA EL SERVICIO TECNICO',
  `totalService` decimal(18, 2) DEFAULT 0.00 COMMENT 'MONTO TOTAL DEL SERVICIO',
  `addressConsul` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idProfileKf` int(11) DEFAULT NULL,
  `idOpcionLowTicketKf` int(11) DEFAULT NULL,
  `idAttendantKf` int(11) DEFAULT NULL COMMENT 'ID DEL ENCARGADO',
  `idCompanyKf` int(11) DEFAULT NULL,
  `idBranchKf` int(11) DEFAULT NULL,
  `isAprobatedAdmin` tinyint(4) DEFAULT 0,
  `isCancelTicket` tinyint(4) DEFAULT 0,
  `dateCancel` timestamp(0) DEFAULT NULL,
  `idTypeOfOptionKf` int(11) DEFAULT NULL COMMENT 'ID DEL TIPO DE SOLICITUD -ENCARGADO/OTRO/EDIFICIO',
  `idDepartmentKf` int(11) DEFAULT NULL COMMENT 'ID DEL DEPARTAMENTO',
  `idAdressKf` int(11) DEFAULT NULL COMMENT 'DIRECCION DEL TICKET',
  `dateAprovatedAdmin` timestamp(0) DEFAULT NULL,
  `idOtherKf` int(11) DEFAULT NULL COMMENT 'Id de encargado de typo \"Otro\"',
  PRIMARY KEY (`idTicket`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_spanish2_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_tickets
-- ----------------------------
INSERT INTO `tb_tickets` VALUES (1, '2018-02-14 04:46:44', NULL, NULL, 1, 'TK-00000117', 1, '', NULL, 22, 0, NULL, 0, 2, 2, NULL, 23, NULL, NULL, NULL, NULL, NULL, NULL, 350.00, NULL, NULL, NULL, 1, 1, 1, 0, 0, NULL, NULL, 3, NULL, NULL, 0);
INSERT INTO `tb_tickets` VALUES (2, '2018-02-14 04:47:20', NULL, NULL, 1, 'TK-00000118', 1, '', NULL, 44, 0, NULL, 0, 1, 2, NULL, 23, NULL, NULL, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL, 3, 1, 2, 0, 0, NULL, NULL, 12, NULL, NULL, 0);
INSERT INTO `tb_tickets` VALUES (4, '2018-02-14 04:58:16', NULL, NULL, 1, 'TK-00000120', 3, '', NULL, NULL, 0, 0, 17, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cambio de camara principal', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 0, 0, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `tb_tickets` VALUES (6, '2018-02-14 05:17:15', NULL, NULL, 1, 'TK-00000122', 4, 'Solicito que me hagan llegar la factura con el encargado del edificio', NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, 23, 4, 'carlos.villalobos@gmail.com', NULL, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, 1, 1, 0, 0, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `tb_tickets` VALUES (7, '2018-02-14 13:36:36', NULL, NULL, 1, 'TK-00000123', 3, '', NULL, NULL, 30, 22, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Lector de Llave quemado.', NULL, NULL, NULL, NULL, NULL, NULL, 3, 5, 0, 0, NULL, NULL, NULL, 5, NULL, NULL);
INSERT INTO `tb_tickets` VALUES (8, '2018-02-15 14:21:18', NULL, NULL, 2, 'TK-00000124', 1, '', NULL, 0, 0, NULL, 17, 1, 2, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 250.00, NULL, NULL, NULL, 1, 1, 1, 0, 0, NULL, 3, 0, 1, NULL, 31);
INSERT INTO `tb_tickets` VALUES (9, '2018-02-15 14:24:03', NULL, NULL, 2, 'TK-00000125', 1, '', NULL, 0, 0, NULL, 17, 1, 2, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 250.00, NULL, NULL, NULL, 1, 1, 1, 0, 0, NULL, 1, 0, 1, NULL, 0);
INSERT INTO `tb_tickets` VALUES (10, '2018-02-15 18:57:15', NULL, NULL, 2, 'TK-00000126', 1, '', NULL, 0, 30, NULL, 0, 1, 2, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL, 3, 1, 2, 0, 0, NULL, 2, 0, 2, NULL, 0);
INSERT INTO `tb_tickets` VALUES (11, '2018-02-15 19:06:22', NULL, NULL, 2, 'TK-00000127', 1, '', NULL, 0, 0, NULL, 17, 1, 2, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 250.00, NULL, NULL, NULL, 1, 1, 1, 0, 0, NULL, 3, 0, 1, NULL, 32);
INSERT INTO `tb_tickets` VALUES (12, '2018-02-15 20:25:41', NULL, NULL, 2, 'TK-00000128', 1, '', NULL, 0, 0, NULL, 17, 1, 2, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0.00, NULL, NULL, NULL, 3, 1, 2, 0, 0, NULL, 3, 0, 2, NULL, 37);
INSERT INTO `tb_tickets` VALUES (13, '2018-02-16 00:23:06', NULL, NULL, 2, 'TK-00000129', 1, '', NULL, 22, 0, NULL, 0, 1, 2, NULL, 23, NULL, NULL, NULL, NULL, NULL, NULL, 250.00, NULL, NULL, NULL, 1, 0, 1, 0, 0, NULL, NULL, 2, 1, NULL, 0);
INSERT INTO `tb_tickets` VALUES (14, '2018-02-16 00:31:10', NULL, NULL, 2, 'TK-00000130', 1, '', NULL, 22, 0, NULL, 0, 1, 2, NULL, 23, NULL, NULL, NULL, NULL, NULL, NULL, 250.00, NULL, NULL, NULL, 1, 1, 1, 0, 0, NULL, NULL, 3, 1, NULL, 0);
INSERT INTO `tb_tickets` VALUES (15, '2018-02-16 01:54:41', NULL, NULL, 2, 'TK-00000131', 3, '', NULL, NULL, 0, 22, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'CAmbio', NULL, NULL, NULL, NULL, NULL, NULL, 3, 6, 0, 0, NULL, NULL, NULL, 6, NULL, NULL);
INSERT INTO `tb_tickets` VALUES (16, '2018-02-16 05:29:59', NULL, NULL, 2, 'TK-00000132', 3, '', NULL, NULL, 0, 22, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Defectuoso', NULL, NULL, NULL, NULL, NULL, NULL, 3, 5, 0, 0, NULL, NULL, NULL, 5, NULL, NULL);
INSERT INTO `tb_tickets` VALUES (19, '2018-02-16 05:40:07', NULL, NULL, 2, 'TK-00000135', 4, 'Prueba', NULL, NULL, NULL, 22, 0, NULL, NULL, NULL, 0, 4, 'luis.carreno@coca-cola.com', NULL, NULL, NULL, NULL, NULL, '5', NULL, NULL, NULL, 3, 5, 0, 0, NULL, NULL, NULL, 5, NULL, NULL);
INSERT INTO `tb_tickets` VALUES (20, '2018-02-16 23:31:58', NULL, NULL, 2, 'TK-00000136', 3, '', NULL, NULL, 33, 17, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '411', NULL, NULL, NULL, NULL, NULL, NULL, 1, 2, 0, 1, '2018-02-16 11:35:10', NULL, NULL, 2, NULL, NULL);
INSERT INTO `tb_tickets` VALUES (21, '2018-03-23 15:26:44', NULL, NULL, 2, 'TK-00000137', 3, 'H6H6H6H66H6H6HHH6', NULL, NULL, 31, 17, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'HH6H6H6H6H6HH666H66HH6H6H6', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 0, 0, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `tb_tickets` VALUES (22, '2018-04-10 20:09:47', NULL, NULL, 2, 'TK-00000138', 2, 'robo', NULL, 63, 0, NULL, 40, 1, NULL, '456666', 0, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 2, 1, 1, 0, 0, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `tb_tickets` VALUES (23, '2018-04-10 20:13:04', NULL, NULL, 2, 'TK-00000139', 3, 'ohjklñjklñ', NULL, NULL, 31, 39, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'hkblñhj', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 0, 0, NULL, NULL, NULL, 1, NULL, NULL);
INSERT INTO `tb_tickets` VALUES (24, '2018-04-10 20:17:06', NULL, NULL, 2, 'TK-00000140', 4, 'consulta', NULL, NULL, NULL, NULL, 40, NULL, NULL, NULL, 0, 3, 'leandro@gmail.com', NULL, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, 1, 1, 0, 0, NULL, NULL, NULL, 1, NULL, NULL);

-- ----------------------------
-- Table structure for tb_type_attendant
-- ----------------------------
DROP TABLE IF EXISTS `tb_type_attendant`;
CREATE TABLE `tb_type_attendant`  (
  `idTyepeAttendant` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nameTypeAttendant` varchar(100) CHARACTER SET utf8 COLLATE utf8_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`idTyepeAttendant`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tb_type_attendant
-- ----------------------------
INSERT INTO `tb_type_attendant` VALUES (1, 'Otro');
INSERT INTO `tb_type_attendant` VALUES (2, 'Titular');
INSERT INTO `tb_type_attendant` VALUES (3, 'Suplente');
INSERT INTO `tb_type_attendant` VALUES (4, 'Ayudante');
INSERT INTO `tb_type_attendant` VALUES (5, 'Intendente');

-- ----------------------------
-- Table structure for tb_type_delivery
-- ----------------------------
DROP TABLE IF EXISTS `tb_type_delivery`;
CREATE TABLE `tb_type_delivery`  (
  `idTypeDelivery` int(11) DEFAULT NULL,
  `typeDelivery` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `amount` decimal(18, 2) DEFAULT 0.00
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_spanish2_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tb_type_delivery
-- ----------------------------
INSERT INTO `tb_type_delivery` VALUES (1, 'RETIRO POR OFICINA', NULL);
INSERT INTO `tb_type_delivery` VALUES (2, 'ENTREGA EN EDIFICIO AL ENCARGADO/A', NULL);

-- ----------------------------
-- Table structure for tb_type_outher
-- ----------------------------
DROP TABLE IF EXISTS `tb_type_outher`;
CREATE TABLE `tb_type_outher`  (
  `idTypeOuther` int(11) NOT NULL,
  `TypeOuther` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTypeOuther`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_spanish2_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tb_type_outher
-- ----------------------------
INSERT INTO `tb_type_outher` VALUES (1, 'VENTA');
INSERT INTO `tb_type_outher` VALUES (2, 'LLAVEROS');
INSERT INTO `tb_type_outher` VALUES (3, 'SERVICIOS TECNICOS');
INSERT INTO `tb_type_outher` VALUES (4, 'FACTURACION');
INSERT INTO `tb_type_outher` VALUES (5, 'ADMINISTRATIVAS');

-- ----------------------------
-- Table structure for tb_type_services
-- ----------------------------
DROP TABLE IF EXISTS `tb_type_services`;
CREATE TABLE `tb_type_services`  (
  `idTypeServices` int(11) NOT NULL AUTO_INCREMENT,
  `typeServices` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTypeServices`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_spanish2_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for tb_typetenant
-- ----------------------------
DROP TABLE IF EXISTS `tb_typetenant`;
CREATE TABLE `tb_typetenant`  (
  `idTypeTenant` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `typeTenantName` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTypeTenant`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_spanish2_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tb_typetenant
-- ----------------------------
INSERT INTO `tb_typetenant` VALUES ('1', 'Propietario');
INSERT INTO `tb_typetenant` VALUES ('2', 'Inquilino');

-- ----------------------------
-- Table structure for tb_typeticket
-- ----------------------------
DROP TABLE IF EXISTS `tb_typeticket`;
CREATE TABLE `tb_typeticket`  (
  `idTypeTicket` int(11) NOT NULL AUTO_INCREMENT,
  `TypeTicketName` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`idTypeTicket`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_spanish2_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tb_typeticket
-- ----------------------------
INSERT INTO `tb_typeticket` VALUES (1, 'ALTA DE LLAVEROS');
INSERT INTO `tb_typeticket` VALUES (2, 'BAJA DE LLAVEROS');
INSERT INTO `tb_typeticket` VALUES (3, 'SERVICIO TECNICO');
INSERT INTO `tb_typeticket` VALUES (4, 'OTRAS SOLICITUDES O CONSULTAS');

-- ----------------------------
-- Table structure for tb_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user`  (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `fullNameUser` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `emailUser` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `phoneNumberUser` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `phoneLocalNumberUser` varchar(25) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `addresUser` varchar(150) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `passwordUser` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idProfileKf` int(11) DEFAULT NULL,
  `idStatusKf` int(11) DEFAULT NULL,
  `dateCreated` timestamp(0) DEFAULT CURRENT_TIMESTAMP,
  `idCompanyKf` int(11) DEFAULT NULL,
  `resetPasword` tinyint(4) DEFAULT 0,
  PRIMARY KEY (`idUser`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 42 CHARACTER SET = utf8 COLLATE = utf8_spanish2_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_user
-- ----------------------------
INSERT INTO `tb_user` VALUES (24, 'prueba editada', 'prueba', 'prueba', '123', NULL, '32e7092ddccc9af07299d6e8dac6fe731c6572d2', 1, -1, '2017-11-23 05:36:20', NULL, 0);
INSERT INTO `tb_user` VALUES (17, 'David Rincón Luengo', 'rexx84@gmail.com', '112235667799', '112345664556', NULL, '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 4, 1, '2017-10-26 02:16:00', 1, 0);
INSERT INTO `tb_user` VALUES (22, 'Luis Carreño', 'luis.carreno@coca-cola.com', '1199887766', '1144556677', NULL, '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 2, 1, '2017-10-26 18:17:25', 3, 0);
INSERT INTO `tb_user` VALUES (23, 'Carlos Villalobos', 'carlos.villalobos@gmail.com', '(054) 9 11 2235-6388', '(054) 9 11 2669-4918', NULL, '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 3, 1, '2017-11-23 00:28:25', NULL, 0);
INSERT INTO `tb_user` VALUES (25, 'Jose Gomez', 'jose.gomez@gmail.com', '113443663346', '116678885464', NULL, '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 3, 1, '2017-11-24 17:47:25', NULL, 0);
INSERT INTO `tb_user` VALUES (27, 'prueba de registro', 'prueba@prueba.com.ar', '(154) 2 32 1321-3213', '(254) 1 31 3213-1322', NULL, '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 3, 1, '2018-01-26 03:26:01', NULL, 1);
INSERT INTO `tb_user` VALUES (28, 'Xavi Hernandez', 'xavi.hernandez@yahoo.es', '(454) 4 44 4444-4444', '(854) 8 88 8888-8888', NULL, '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 4, 1, '2018-01-31 07:34:09', NULL, 0);
INSERT INTO `tb_user` VALUES (29, 'Humberto Moran', 'humberto.moran@gmail.com', '(054) 1 11 1111-1111', '(054) 2 22 2222-2222', NULL, '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 3, 1, '2018-01-31 20:35:07', NULL, 0);
INSERT INTO `tb_user` VALUES (30, 'developer 1', 'developer1@gmail.com', '(054) 9 12 3213-2323', '(054) 9 11 2231-2321', NULL, '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 1, 1, '2018-02-11 15:50:25', NULL, 0);
INSERT INTO `tb_user` VALUES (31, 'admin sistema', 'soporte@coferba.com.ar', '(054) 9 11 2323-2323', '(054) 9 11 2343-2324', NULL, 'fd8abdb9181ffaa820ac9b8c9fb97abca88c6c05', 1, 1, '2018-02-16 12:01:22', NULL, 0);
INSERT INTO `tb_user` VALUES (32, '8484845448841 65464848', '4494989@hotmail.com', '(154) 1 11 1111-1111', '(154) 1 11 1111-1111', NULL, '090efb3bde54c755c679f99e82a4c4863d93035b', 3, 0, '2018-03-20 13:14:06', NULL, 1);
INSERT INTO `tb_user` VALUES (33, 'Gabriel Gamez', 'angelgabrielceballos@gmail.com', '(154) 1 11 2251-8504', '(154) 1 11 2251-8504', NULL, 'fe703d258c7ef5f50b71e06565a65aa07194907f', 3, 1, '2018-03-20 13:20:35', NULL, 1);
INSERT INTO `tb_user` VALUES (34, '654658464 654654654', 'angelgabrielceballos@gmail.com', '(154) 1 11 2251-8504', '(154) 1 11 2251-8504', NULL, 'fe703d258c7ef5f50b71e06565a65aa07194907f', 3, 0, '2018-03-20 18:30:38', NULL, 1);
INSERT INTO `tb_user` VALUES (35, 'Dario Tejada', 'drotejada@gmail.com', '(154) 1 11 1111-1111', '(154) 1 11 1111-1111', NULL, '2ae3d88f02f83ac3d4e5f74533e26d8cad86e4c5', 4, -1, '2018-03-21 17:26:03', 2, 0);
INSERT INTO `tb_user` VALUES (36, 'juan perez', 'unico@gmail.com', '(154) 1 15 2251-8504', '(154) 1 15 2251-8504', NULL, '26cf693eaa24a8c39e5dc92e06085058a3714f53', 3, 0, '2018-04-10 14:32:12', NULL, 0);
INSERT INTO `tb_user` VALUES (37, 'pablo marmol', 'marmol@gmail.com', '(154) 1 11 1111-1111', '(154) 1 11 1111-1111', NULL, '4394a732285f1875b62bdb074d7fe33acb519ed9', 3, 0, '2018-04-10 14:46:15', NULL, 0);
INSERT INTO `tb_user` VALUES (38, 'dario tejada', 'drotejada@gmail.com', '(154) 1 11 1111-1111', '(154) 1 11 1111-1122', NULL, '2432c46a664bdc63e4b6dbca654c509fbae10a89', 4, -1, '2018-04-10 15:31:35', 2, 0);
INSERT INTO `tb_user` VALUES (39, 'dario tejada', 'drotejada@gmail.com', '(154) 1 11 1111-1111', '(154) 1 11 1111-1111', NULL, '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 4, 1, '2018-04-10 15:50:26', 1, 1);
INSERT INTO `tb_user` VALUES (40, 'leandro figueroa', 'leandro@gmail.com', '(154) 1 11 1111-1111', '(154) 1 11 1111-1111', NULL, 'b9ca47c97508bf3d22aed0d806d923c2917c3e6e', 4, 1, '2018-04-10 15:54:02', 1, 0);
INSERT INTO `tb_user` VALUES (41, 'Luis Roca', 'luis.roca@gmail.com', '(354) 3 33 3333-3333', '(354) 3 33 3333-3333', NULL, '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 3, 1, '2018-04-11 13:06:33', NULL, 1);

SET FOREIGN_KEY_CHECKS = 1;
