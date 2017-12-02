-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-12-2017 a las 14:08:23
-- Versión del servidor: 10.1.28-MariaDB
-- Versión de PHP: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_coferba`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_addres`
--

CREATE TABLE `tb_addres` (
  `idAdress` int(11) UNSIGNED NOT NULL,
  `nameAdress` varchar(300) COLLATE utf8_swedish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Volcado de datos para la tabla `tb_addres`
--

INSERT INTO `tb_addres` (`idAdress`, `nameAdress`) VALUES
(1, 'Cramer 1275'),
(2, 'Blanco Encalada 2355'),
(3, 'Cabildo 3510'),
(4, 'Gral. La valle 1920'),
(5, 'Parana 2568'),
(6, 'Rivadavia 4530');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_attendant`
--

CREATE TABLE `tb_attendant` (
  `idAttendant` int(11) UNSIGNED NOT NULL,
  `nameAttendant` varchar(300) COLLATE utf8_swedish_ci DEFAULT NULL,
  `idAddresKf` int(11) DEFAULT NULL,
  `phoneAttendant` varchar(25) COLLATE utf8_swedish_ci DEFAULT NULL,
  `phoneLocalAttendant` varchar(25) CHARACTER SET utf8 COLLATE utf8_spanish2_ci DEFAULT NULL,
  `mailAttendant` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL,
  `hoursWork` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Volcado de datos para la tabla `tb_attendant`
--

INSERT INTO `tb_attendant` (`idAttendant`, `nameAttendant`, `idAddresKf`, `phoneAttendant`, `phoneLocalAttendant`, `mailAttendant`, `hoursWork`) VALUES
(1, 'JORGE GUTIERREZ', 1, '12319283712', NULL, 'adsaa@daas.djh', NULL),
(2, 'DAVID', 1, '31221312321', NULL, 'adsaa@daas.djh', NULL),
(3, 'MIGUEL MARTINEZ', 2, '312312312211', NULL, 'adsaa@daas.djh', NULL),
(4, 'MARTINEZ JULO', 3, '12321321312', NULL, 'adsaa@daas.djh', NULL),
(5, 'leonador', 1, '1323123213213', NULL, 'adsaa@daas.djh', NULL),
(6, 'prueba', 1, '31321321321', NULL, 'DFSD@SDDDS.DF', '08:40'),
(7, 'Francisco Ochoa', 1, '113435476878', '112345678757', 'fracisco.ochoa@gmail.com', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_branch`
--

CREATE TABLE `tb_branch` (
  `idBranch` int(11) UNSIGNED NOT NULL,
  `branchName` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL,
  `idCompanyKf` int(11) DEFAULT NULL,
  `idAdressKf` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Volcado de datos para la tabla `tb_branch`
--

INSERT INTO `tb_branch` (`idBranch`, `branchName`, `idCompanyKf`, `idAdressKf`) VALUES
(1, 'SUCURSAL 1', 1, 1),
(2, 'SUCURSAL 2', 1, 2),
(3, 'SUCURSAL 1', 2, 3),
(4, 'SUCURSAL 2', 2, 4),
(5, 'Toyota 1', 3, 5),
(6, 'Toyota 2', 3, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_clients_tickets`
--

CREATE TABLE `tb_clients_tickets` (
  `idTicketsCliets` int(11) NOT NULL,
  `idTicketKf` int(11) DEFAULT NULL,
  `idClientKf` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_clients_tickets`
--

INSERT INTO `tb_clients_tickets` (`idTicketsCliets`, `idTicketKf`, `idClientKf`) VALUES
(1, 19, 2),
(2, 19, 3),
(3, 19, 1),
(4, 20, 2),
(5, 20, 3),
(6, 20, 1),
(7, 21, 2),
(8, 21, 3),
(9, 21, 1),
(10, 22, 2),
(11, 22, 3),
(12, 22, 1),
(13, 23, 2),
(14, 23, 3),
(15, 23, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_company`
--

CREATE TABLE `tb_company` (
  `idCompany` int(11) UNSIGNED NOT NULL,
  `nameCompany` varchar(300) COLLATE utf8_swedish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Volcado de datos para la tabla `tb_company`
--

INSERT INTO `tb_company` (`idCompany`, `nameCompany`) VALUES
(1, 'Carlos Castaño'),
(2, 'Talcahuano Propiedades'),
(3, 'Toyota');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_department`
--

CREATE TABLE `tb_department` (
  `idDepartment` int(11) NOT NULL,
  `idAdressKf` int(255) DEFAULT NULL,
  `departmentFloor` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `deparmentNumber` int(11) DEFAULT NULL,
  `deparmentDescription` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idStatusKf` int(11) DEFAULT NULL,
  `idUserAdminRKf` int(11) DEFAULT NULL,
  `idUserAdminPropietariKf` int(11) DEFAULT NULL,
  `idTenantKf` int(11) DEFAULT NULL,
  `isAprobatedAdmin` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_department`
--

INSERT INTO `tb_department` (`idDepartment`, `idAdressKf`, `departmentFloor`, `deparmentNumber`, `deparmentDescription`, `idStatusKf`, `idUserAdminRKf`, `idUserAdminPropietariKf`, `idTenantKf`, `isAprobatedAdmin`) VALUES
(1, 1, 'Porteria', 0, '', 1, 1, NULL, NULL, 0),
(2, 1, '1-A', 0, '', 1, 1, NULL, 22, 1),
(3, 1, '1-B', 0, '', 1, 1, NULL, 22, 1),
(4, 1, '2-A', 0, '', 1, 1, NULL, NULL, 0),
(5, 1, '2-B', 0, '', 1, 1, NULL, NULL, 0),
(6, 1, '3-A', 0, '', 1, 1, NULL, NULL, 0),
(7, 1, '3-B', 0, '', 1, 1, NULL, NULL, 0),
(8, 1, '4-A', 0, '', 1, 1, NULL, NULL, 0),
(9, 1, '4-B', 0, '', 1, 1, NULL, NULL, 0),
(10, 1, '5-A', 0, '', 1, 1, NULL, NULL, 0),
(11, 1, '5-B', 0, '', 1, 1, NULL, NULL, 0),
(12, 2, '6-A', 0, '', 1, 1, NULL, 22, 0),
(13, 0, '6-B', 0, '', 1, 1, NULL, NULL, 0),
(14, 2, '7-A', 0, '', 1, 1, NULL, NULL, 0),
(15, 2, '7-B', 0, '', 1, 1, NULL, NULL, 0),
(16, 2, '8-A', 0, '', 1, 1, NULL, NULL, 0),
(17, 3, '8-B', 0, '', 1, 1, NULL, 22, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_opcion_low`
--

CREATE TABLE `tb_opcion_low` (
  `idOpcionLowTicket` int(11) UNSIGNED NOT NULL,
  `opcionLowTicket` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Volcado de datos para la tabla `tb_opcion_low`
--

INSERT INTO `tb_opcion_low` (`idOpcionLowTicket`, `opcionLowTicket`) VALUES
(1, 'LLaveros en Mi poder'),
(2, 'LLaveros Quiero dar de Baja');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_profile`
--

CREATE TABLE `tb_profile` (
  `idProfile` int(11) NOT NULL,
  `nameProfile` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_profile`
--

INSERT INTO `tb_profile` (`idProfile`, `nameProfile`) VALUES
(1, 'Coferba'),
(2, 'Empresa'),
(3, 'Propietario'),
(4, 'Admin Consorsio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_reason_disabled_item`
--

CREATE TABLE `tb_reason_disabled_item` (
  `idReasonDisabledItem` int(11) NOT NULL,
  `reasonDisabledItem` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_reason_disabled_item`
--

INSERT INTO `tb_reason_disabled_item` (`idReasonDisabledItem`, `reasonDisabledItem`) VALUES
(1, 'ROBO'),
(2, 'EXTRAVIO'),
(3, 'FALLA DEL LLAVERO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_request`
--

CREATE TABLE `tb_request` (
  `idRequest` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `RequestName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_status`
--

CREATE TABLE `tb_status` (
  `idStatusTenant` int(255) NOT NULL,
  `statusTenantName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `tb_status`
--

INSERT INTO `tb_status` (`idStatusTenant`, `statusTenantName`) VALUES
(-1, 'Eliminado'),
(0, 'Inactivo'),
(1, 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_statusticket`
--

CREATE TABLE `tb_statusticket` (
  `idStatus` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `statusName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeTicketKf` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `tb_statusticket`
--

INSERT INTO `tb_statusticket` (`idStatus`, `statusName`, `idTypeTicketKf`) VALUES
('-1', 'Rechazado', '-1'),
('1', 'Finalizado', '1'),
('2', 'Pendiente de Aprobacion', '2'),
('3', 'Aprobado', '3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_sys_code`
--

CREATE TABLE `tb_sys_code` (
  `idCode` int(11) DEFAULT NULL,
  `code` varchar(200) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `description` varchar(3) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_sys_code`
--

INSERT INTO `tb_sys_code` (`idCode`, `code`, `description`) VALUES
(1, '73', 'TK');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_sys_param`
--

CREATE TABLE `tb_sys_param` (
  `idParam` int(11) UNSIGNED NOT NULL,
  `value` varchar(100) COLLATE utf8_swedish_ci DEFAULT NULL,
  `description` varchar(100) COLLATE utf8_swedish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Volcado de datos para la tabla `tb_sys_param`
--

INSERT INTO `tb_sys_param` (`idParam`, `value`, `description`) VALUES
(1, 'jorguti58@gmail.com', 'USUARIO SMT MAIL'),
(2, '#*AdMg1210#*', 'CLAVE SMT MAIL'),
(3, '500', 'PRECIO POR LLAVE'),
(4, '1000', 'VALOR GESTION'),
(5, '200', 'VALOR ENVIO'),
(6, '20:00', 'HORA DE MAIL DE VERIFICACION DE MAIL PARA ADMINISTRADORES DE CONSORCIO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tenant`
--

CREATE TABLE `tb_tenant` (
  `idTenant` int(11) NOT NULL,
  `fullNameTenant` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idTypeKf` int(11) DEFAULT NULL,
  `phoneNumberTenant` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idDepartmentKf` int(11) DEFAULT NULL,
  `emailTenant` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idStatusKf` int(11) DEFAULT NULL,
  `dateCrated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `phoneNumberContactTenant` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_tenant`
--

INSERT INTO `tb_tenant` (`idTenant`, `fullNameTenant`, `idTypeKf`, `phoneNumberTenant`, `idDepartmentKf`, `emailTenant`, `idStatusKf`, `dateCrated`, `phoneNumberContactTenant`) VALUES
(1, 'David Eduardo Rincon Luengo', 1, '1126694918', NULL, 'rexx84@gmail.com', 1, '2017-10-18 04:07:25', '1122334455'),
(2, 'Alberto Fabian', 1, '54115778345', NULL, 'Alberto.Fabian@gmail.com', 1, '2017-10-18 04:07:25', '54115778345'),
(3, 'Eduardo Peliacani', 1, '54115778345', NULL, 'Eduardo.Peliacani@gmail.com', 1, '2017-10-18 04:07:25', '54115778345'),
(4, 'Carlos Lazarte', 1, '54115778345', NULL, 'Carlos.Lazarte@gmail.com', 1, '2017-10-18 04:07:25', '54115778345'),
(5, 'Marcos Padilla', 1, '54115778345', NULL, 'Marcos.Padilla@gmail.com', 1, '2017-10-18 04:07:25', '54115778345'),
(6, 'Nahuel Barrati', 1, '54115778345', NULL, 'Nahuel.Barrati@gmail.com', 1, '2017-10-18 04:07:25', '54115778345'),
(7, 'Jan Zambrano', 1, '54115778345', NULL, 'Jan.Zambrano@gmail.com', 1, '2017-10-18 04:07:25', '54115778345'),
(8, 'Marcos Quispes', 1, '54115778345', NULL, 'Marcos.Quispes@gmail.com', 1, '2017-10-18 04:07:25', '54115778345'),
(9, 'Beatriz Gonzalez', 1, '54115778345', NULL, 'Beatriz.Gonzalez@gmail.com', 1, '2017-10-18 04:07:25', '54115778345'),
(10, 'Juan de Vicenti', 1, '54115778345', NULL, 'juan.vicenti@gmail.com', 1, '2017-10-18 04:07:25', '54115778345'),
(11, 'Jorge Gutierrez', 2, '541189054333', NULL, 'jorguti85@gmail.com', 1, '2017-10-18 04:07:25', '541189054333'),
(12, 'Carlos Romero', 2, '541189054333', NULL, 'jorguti86@gmail.com', 1, '2017-10-18 04:07:25', '541189054333'),
(13, 'Jose Carrasco', 2, '541189054333', NULL, 'jorguti87@gmail.com', 1, '2017-10-18 04:07:25', '541189054333'),
(14, 'Alfredo Wirth', 2, '541189054333', NULL, 'jorguti88@gmail.com', 1, '2017-10-18 04:07:25', '541189054333'),
(15, 'Victor Machado', 2, '541189054333', NULL, 'jorguti89@gmail.com', 1, '2017-10-18 04:07:25', '541189054333'),
(16, 'Martin Hatchman', 2, '541189054333', NULL, 'jorguti90@gmail.com', 1, '2017-10-18 04:07:25', '541189054333'),
(17, 'Flavio Alfano', 2, '541189054333', NULL, 'jorguti91@gmail.com', 1, '2017-10-18 04:07:25', '541189054333'),
(18, 'Jorge Dangelo', 2, '541189054333', NULL, 'jorguti92@gmail.com', 1, '2017-10-18 04:07:25', '541189054333'),
(19, 'Jose Perez', 2, '222222222222', NULL, 'jose.perez@gmail.com', 1, '2017-11-10 17:10:02', '111111111111'),
(20, 'Roberto Vicuña', 1, '113344559966', NULL, 'roberto.vicuna@gmail.com', 1, '2017-11-10 18:08:15', '113445567788'),
(21, 'Jesus Antunez', 2, '222222222222', NULL, 'jesus.antunez@gmail.com', 1, '2017-11-11 14:27:42', '111111111111'),
(22, 'Carlos Villalobos', 1, '114446456474', NULL, 'carlos.villalobos@gmail.com', 1, '2017-11-23 00:28:25', '113532532476'),
(23, 'Jorge Gutierrez', 1, '116677889900', NULL, 'jorguti58@gmail.com', 1, '2017-11-23 05:36:21', '114455667788'),
(30, 'Teresa Carreño', 1, '11435436477', NULL, 'teresa.carreno@gmail.com', 1, '2017-11-30 23:43:16', '114325436436'),
(31, 'Osmel Sousa', 2, '112321432532', 2, 'osmel.sousa@gmail.com', 1, '2017-12-02 12:00:09', '123243253253'),
(33, 'Karen Figueroa', 2, '113543643763', 3, 'karen.figueroa@gmail.com', 1, '2017-12-02 12:06:50', '112435434354'),
(34, 'Arturo Michelena', 2, '325325325325', 3, 'arturo.michelena@gmail.com', 1, '2017-12-02 12:13:30', '212432143243');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tickets`
--

CREATE TABLE `tb_tickets` (
  `idTicket` int(11) NOT NULL,
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
  `idTotalService` double DEFAULT NULL COMMENT 'MONTO TOTAL DEL SERVICIO',
  `addressConsul` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idProfileKf` int(11) DEFAULT NULL,
  `idOpcionLowTicketKf` int(11) DEFAULT NULL,
  `idAttendantKf` int(11) DEFAULT NULL,
  `idCompanyKf` int(11) DEFAULT NULL,
  `idBranchKf` int(11) DEFAULT NULL,
  `isAprobatedAdmin` tinyint(4) DEFAULT '0',
  `isCancelTicket` tinyint(4) DEFAULT '0',
  `dateCancel` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_tickets`
--

INSERT INTO `tb_tickets` (`idTicket`, `dateCreated`, `dateRecibedAdmin`, `dateRecibeCompany`, `idStatusTicketKf`, `codTicket`, `idTypeTicketKf`, `description`, `idRequestKf`, `idTenantKf`, `idUserAdminKf`, `idUserCompany`, `idUserEnterpriceKf`, `numberItemes`, `idTypeDeliveryKf`, `numberItemDisabled`, `idOWnerKf`, `idTypeOuther`, `mailContactConsult`, `SA_NRO_ORDER`, `idReasonDisabledItemKf`, `descriptionOrder`, `idTypeServicesKf`, `idTotalService`, `addressConsul`, `idProfileKf`, `idOpcionLowTicketKf`, `idAttendantKf`, `idCompanyKf`, `idBranchKf`, `isAprobatedAdmin`, `isCancelTicket`, `dateCancel`) VALUES
(1, '2017-08-24 17:31:09', NULL, NULL, 1, '', 1, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, '2017-11-17 12:43:42'),
(2, '2017-08-24 17:31:44', NULL, NULL, 1, '', 1, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(3, '2017-08-24 17:41:54', NULL, NULL, 1, '', 1, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(4, '2017-08-24 17:42:51', NULL, NULL, 1, '', 1, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(5, '2017-08-24 17:43:28', NULL, NULL, 1, '', 1, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(6, '2017-08-24 17:46:19', NULL, NULL, 1, '', 1, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(7, '2017-08-24 17:57:00', NULL, NULL, 1, '', 2, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(8, '2017-08-24 18:04:18', NULL, NULL, 1, '', 2, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(9, '2017-08-24 18:11:26', NULL, NULL, 1, '', 2, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, '2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(10, '2017-08-24 18:12:39', NULL, NULL, 1, '', 2, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, NULL, 1, '2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(11, '2017-08-24 18:16:27', NULL, NULL, 1, '', 2, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, NULL, 1, '2', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(12, '2017-08-24 18:16:55', NULL, NULL, 1, '', 2, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, NULL, NULL, '2', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(13, '2017-08-24 18:34:17', NULL, NULL, 1, '', 2, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, NULL, NULL, '2', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(14, '2017-08-24 18:36:21', NULL, NULL, 1, '', NULL, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(15, '2017-08-24 18:36:58', NULL, NULL, 1, '', NULL, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(16, '2017-08-24 18:37:41', NULL, NULL, 1, '', NULL, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(17, '2017-08-24 18:37:57', NULL, NULL, 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(18, '2017-08-24 18:38:42', NULL, NULL, 1, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(19, '2017-08-24 18:43:06', NULL, NULL, 1, '', 1, 'aqui escribo algo', NULL, NULL, NULL, NULL, 1, 3, 1, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(20, '2017-08-24 18:43:18', NULL, NULL, 1, '', 1, 'aqui escribo algo', NULL, NULL, NULL, NULL, 1, 3, 1, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(21, '2017-08-24 18:51:07', NULL, NULL, 1, '', 3, 'aqui escribo algo', NULL, NULL, NULL, NULL, 1, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(22, '2017-08-24 18:51:55', NULL, NULL, 1, '', 3, 'aqui escribo algo', NULL, NULL, NULL, NULL, 1, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'DESCRIPCION DEL PEDIDO', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(23, '2017-08-24 18:59:20', NULL, NULL, 1, '', 3, 'aqui escribo algo', NULL, NULL, NULL, NULL, 1, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'DESCRIPCION DEL PEDIDO', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(24, '2017-08-24 19:13:00', NULL, NULL, 1, '', 4, 'COSNULATAAAAAA', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'mail@mas.jf', NULL, NULL, NULL, NULL, NULL, 'testing', NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(25, '2017-08-24 19:16:06', NULL, NULL, 1, '', 4, 'COSNULATAAAAAA', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'mail@mas.jf', NULL, NULL, NULL, NULL, NULL, 'testing', NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(26, '2017-10-18 02:31:37', NULL, NULL, 1, '', 1, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(27, '2017-10-18 02:33:01', NULL, NULL, 1, '', 1, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(28, '2017-10-18 02:33:56', NULL, NULL, 1, '', 1, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(29, '2017-10-18 02:38:55', NULL, NULL, 1, '', 1, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(30, '2017-10-18 02:39:34', NULL, NULL, 1, '', 1, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(31, '2017-10-18 02:43:21', NULL, NULL, 1, 'TK-00000001', 1, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(32, '2017-10-18 02:52:48', NULL, NULL, 1, 'TK-00000002', 1, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(33, '2017-10-18 03:11:06', NULL, NULL, 1, 'TK-00000003', 1, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(34, '2017-10-18 03:14:10', NULL, NULL, 1, 'TK-00000004', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(35, '2017-10-18 03:14:19', NULL, NULL, 1, 'TK-00000005', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(36, '2017-10-18 03:14:44', NULL, NULL, 1, 'TK-00000006', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(37, '2017-10-18 03:14:49', NULL, NULL, 1, 'TK-00000007', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(38, '2017-10-18 03:15:57', NULL, NULL, 1, 'TK-00000008', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(39, '2017-10-18 03:16:27', NULL, NULL, 1, 'TK-00000009', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(40, '2017-10-18 03:19:29', NULL, NULL, 1, 'TK-00000010', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(41, '2017-10-18 03:19:46', NULL, NULL, 1, 'TK-00000011', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(42, '2017-10-18 03:19:59', NULL, NULL, 1, 'TK-00000012', 1, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(43, '2017-10-18 03:20:58', NULL, NULL, 1, 'TK-00000013', 1, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(44, '2017-10-18 03:22:17', NULL, NULL, 1, 'TK-00000014', 1, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(45, '2017-10-18 03:23:33', NULL, NULL, 1, 'TK-00000015', 1, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(46, '2017-10-18 03:23:59', NULL, NULL, 1, 'TK-00000016', 1, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(47, '2017-10-18 03:24:36', NULL, NULL, 1, 'TK-00000017', 1, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(48, '2017-10-18 03:25:00', NULL, NULL, 1, 'TK-00000018', 1, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(49, '2017-10-18 03:25:49', NULL, NULL, 1, 'TK-00000019', 1, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(50, '2017-10-21 13:45:07', NULL, NULL, 1, 'TK-00000020', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(51, '2017-10-21 13:48:11', NULL, NULL, 1, 'TK-00000021', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(52, '2017-10-21 13:53:28', NULL, NULL, 1, 'TK-00000022', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(53, '2017-10-21 13:56:42', NULL, NULL, 1, 'TK-00000023', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(54, '2017-10-21 13:59:12', NULL, NULL, 1, 'TK-00000024', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(55, '2017-10-21 14:01:46', NULL, NULL, 1, 'TK-00000025', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(56, '2017-10-21 14:03:21', NULL, NULL, 1, 'TK-00000026', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(57, '2017-10-21 14:06:17', NULL, NULL, 1, 'TK-00000027', 1, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(58, '2017-10-21 14:51:05', NULL, NULL, 1, 'TK-00000028', 1, NULL, NULL, NULL, NULL, NULL, 1, 2, 2, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(59, '2017-10-21 15:22:06', NULL, NULL, 1, 'TK-00000029', 1, NULL, NULL, NULL, NULL, NULL, 1, 1, 1, NULL, 16, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(60, '2017-10-21 15:25:27', NULL, NULL, 1, 'TK-00000030', 4, 'Estoy teniendo problemas con mi llavero no estoy seguro si es el lector o la llave.\n\nSaludos,\n\nJorge.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, 'jorguti58@gmail.com', NULL, NULL, NULL, NULL, NULL, 'Florida 4500', NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(61, '2017-10-21 15:50:59', NULL, NULL, 1, 'TK-00000031', 2, 'Codigo: 93338', NULL, NULL, NULL, NULL, 1, NULL, NULL, '1', 6, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(62, '2017-10-21 16:10:26', NULL, NULL, 1, 'TK-00000032', 3, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'El lector de llave repentinamente dejo de funcionar, por favor verificar si es necesario realizar un reemplazo de la parte', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(63, '2017-10-27 04:07:47', NULL, NULL, 1, 'TK-00000033', 1, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(64, '2017-10-27 05:01:00', NULL, NULL, 1, 'TK-00000034', 1, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(65, '2017-10-27 05:06:52', NULL, NULL, 1, 'TK-00000035', 1, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(66, '2017-10-28 15:15:46', NULL, NULL, 1, 'TK-00000036', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL),
(67, '2017-10-28 15:16:22', NULL, NULL, 1, 'TK-00000037', 1, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 0, 0, NULL),
(68, '2017-10-28 15:22:23', NULL, NULL, 1, 'TK-00000038', 1, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 0, 0, NULL),
(69, '2017-10-28 15:23:57', NULL, NULL, 1, 'TK-00000039', 2, 'aqui escribo algo', NULL, 1, NULL, NULL, NULL, NULL, NULL, '2', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 0, 0, NULL),
(70, '2017-11-10 05:26:49', NULL, NULL, 1, 'TK-00000041', 1, '', NULL, NULL, 0, NULL, 0, 2, 2, NULL, 17, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, 0, 0, NULL),
(71, '2017-11-10 17:10:16', NULL, NULL, 1, 'TK-00000042', 1, 'GRacias', NULL, 19, 0, NULL, 0, 1, 2, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, 0, 0, NULL),
(72, '2017-11-10 18:08:43', NULL, NULL, 1, 'TK-00000043', 1, 'Notificar al cliente cuando se haya realizado el envio de las llaves.', NULL, NULL, 17, NULL, 0, 2, 2, NULL, 17, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, NULL, NULL, 0, 0, NULL),
(73, '2017-11-10 23:15:40', NULL, NULL, 1, 'TK-00000044', 1, 'No Conozco los seriales', NULL, 19, 0, NULL, 0, 1, NULL, NULL, 17, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, 0, 0, NULL),
(74, '2017-11-11 03:53:53', NULL, NULL, 1, 'TK-00000045', 1, '', NULL, 1, 0, NULL, 0, 1, 1, NULL, 17, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, 0, 0, NULL),
(75, '2017-11-11 04:28:43', NULL, NULL, 1, 'TK-00000046', 1, '123213213', NULL, 1, 0, NULL, 0, 1, NULL, NULL, 17, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, 0, 0, NULL),
(76, '2017-11-11 04:29:46', NULL, NULL, 1, 'TK-00000047', 1, '123213', NULL, 1, 0, NULL, 0, 1, NULL, NULL, 17, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, 0, 0, NULL),
(77, '2017-11-11 04:31:30', NULL, NULL, 1, 'TK-00000048', 2, '12321323', NULL, 1, 0, NULL, 0, 1, NULL, NULL, 17, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, 0, 0, NULL),
(78, '2017-11-11 04:33:19', NULL, NULL, 1, 'TK-00000049', 2, '1123144', NULL, 19, 0, NULL, 0, 1, NULL, NULL, 17, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, 0, 0, NULL),
(79, '2017-11-11 04:36:03', NULL, NULL, 1, 'TK-00000050', 2, '12313214', NULL, 1, 0, NULL, 0, 1, NULL, NULL, 17, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, 0, 0, NULL),
(80, '2017-11-11 04:39:23', NULL, NULL, 1, 'TK-00000051', 2, '123213, 12321', NULL, 6, 0, NULL, 1, 2, NULL, NULL, 0, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, 0, 0, NULL),
(81, '2017-11-11 06:04:58', NULL, NULL, 1, 'TK-00000052', 3, 'Notificar via mail la fecha de visita.', NULL, NULL, 0, 17, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tenemos 3 cámaras con falla en la imagen.', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 0, 0, NULL),
(82, '2017-11-11 14:28:14', NULL, NULL, 1, 'TK-00000053', 1, 'Probando', NULL, 21, 0, NULL, 0, 2, 2, NULL, 17, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, 0, 0, NULL),
(83, '2017-11-11 14:31:13', NULL, NULL, 1, 'TK-00000054', 2, '123213, 123213', NULL, 1, 0, NULL, 0, 2, NULL, NULL, 17, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, 0, 0, NULL),
(84, '2017-11-21 00:06:52', NULL, NULL, 1, 'TK-00000055', 2, '123345', NULL, 21, 0, NULL, 0, 1, NULL, NULL, 17, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, 0, 0, NULL),
(85, '2017-11-21 00:07:11', NULL, NULL, 1, 'TK-00000056', 1, '', NULL, 17, 0, NULL, 0, 1, 2, NULL, 17, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, NULL, NULL, 0, 0, NULL),
(86, '2017-11-23 04:17:15', NULL, NULL, 1, 'TK-00000057', 3, '', NULL, NULL, 17, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cambiar camara de entrada.', NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 0, 0, NULL),
(87, '2017-11-29 01:34:09', NULL, NULL, 1, 'TK-00000058', 1, '', NULL, NULL, 17, NULL, 0, 1, 1, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, 0, NULL),
(88, '2017-11-30 02:08:22', NULL, NULL, 1, 'TK-00000059', 1, '', NULL, NULL, 0, NULL, 24, 1, 2, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, 1, '2017-11-30 09:55:37'),
(89, '2017-12-01 18:58:24', NULL, NULL, 1, 'TK-00000060', 1, '', NULL, 0, 0, NULL, 0, 1, 2, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 0, 0, NULL),
(90, '2017-12-02 03:39:36', NULL, NULL, 1, 'TK-00000061', 1, '', NULL, 22, 0, NULL, 24, 4, 2, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, 0, 0, NULL),
(91, '2017-12-02 11:13:21', NULL, NULL, 1, 'TK-00000062', 1, 'El propietario entregara pago del servicio al encargado seleccionado.', NULL, 22, 0, NULL, 24, 1, 2, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, 0, 0, NULL),
(92, '2017-12-02 11:22:50', NULL, NULL, 1, 'TK-00000063', 1, '', NULL, 22, 0, NULL, 24, 2, 1, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, 0, 0, NULL),
(93, '2017-12-02 11:24:33', NULL, NULL, 1, 'TK-00000064', 1, '', NULL, 22, 0, NULL, 24, 1, 1, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, 0, 0, NULL),
(94, '2017-12-02 11:25:25', NULL, NULL, 1, 'TK-00000065', 1, '', NULL, 22, 0, NULL, 24, 1, 1, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, 0, 0, NULL),
(95, '2017-12-02 11:30:24', NULL, NULL, 1, 'TK-00000066', 1, '', NULL, 22, 0, NULL, 24, 2, 2, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, 0, 0, NULL),
(96, '2017-12-02 11:56:26', NULL, NULL, 1, 'TK-00000067', 1, '', NULL, 22, 0, NULL, 24, 1, 1, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, 0, 0, NULL),
(97, '2017-12-02 11:58:41', NULL, NULL, 1, 'TK-00000068', 1, '', NULL, 22, 0, NULL, 24, 1, 1, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, 0, 0, NULL),
(98, '2017-12-02 12:01:58', NULL, NULL, 1, 'TK-00000069', 1, '', NULL, 31, 0, NULL, 0, 1, 2, NULL, 23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, 0, 0, NULL),
(99, '2017-12-02 12:09:37', NULL, NULL, 1, 'TK-00000070', 1, '', NULL, 33, 0, NULL, 0, 1, 2, NULL, 23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, 0, 0, NULL),
(100, '2017-12-02 12:13:45', NULL, NULL, 1, 'TK-00000071', 1, '', NULL, 34, 0, NULL, 0, 2, 2, NULL, 23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, 0, 0, NULL),
(101, '2017-12-02 12:27:14', NULL, NULL, 1, 'TK-00000072', 2, '', NULL, 31, 0, NULL, 0, 1, NULL, '1234214', 23, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, 0, 0, NULL),
(102, '2017-12-02 12:45:30', NULL, NULL, 1, 'TK-00000073', 1, '', NULL, 22, 17, NULL, 0, 1, 2, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7, NULL, NULL, 0, 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_typetenant`
--

CREATE TABLE `tb_typetenant` (
  `idTypeTenant` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `typeTenantName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_typetenant`
--

INSERT INTO `tb_typetenant` (`idTypeTenant`, `typeTenantName`) VALUES
('1', 'Propietario'),
('2', 'Inquilino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_typeticket`
--

CREATE TABLE `tb_typeticket` (
  `idTypeTicket` int(11) NOT NULL,
  `TypeTicketName` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_typeticket`
--

INSERT INTO `tb_typeticket` (`idTypeTicket`, `TypeTicketName`) VALUES
(1, 'ALTA DE LLAVEROS'),
(2, 'BAJA DE LLAVEROS'),
(3, 'SERVICIO TECNICO'),
(4, 'OTRAS SOLICITUDES O CONSULTAS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_type_delivery`
--

CREATE TABLE `tb_type_delivery` (
  `idTypeDelivery` int(11) DEFAULT NULL,
  `typeDelivery` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `amount` decimal(18,2) DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_type_delivery`
--

INSERT INTO `tb_type_delivery` (`idTypeDelivery`, `typeDelivery`, `amount`) VALUES
(1, 'RETIRO POR OFICINA', NULL),
(2, 'ENTREGA EN EDIFICIO AL ENCARGADO/A', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_type_outher`
--

CREATE TABLE `tb_type_outher` (
  `idTypeOuther` int(11) NOT NULL,
  `TypeOuther` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_type_outher`
--

INSERT INTO `tb_type_outher` (`idTypeOuther`, `TypeOuther`) VALUES
(1, 'VENTA'),
(2, 'LLAVEROS'),
(3, 'SERVICIOS TECNICOS'),
(4, 'FACTURACION'),
(5, 'ADMINISTRATIVAS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_type_services`
--

CREATE TABLE `tb_type_services` (
  `idTypeServices` int(11) NOT NULL,
  `typeServices` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_user`
--

CREATE TABLE `tb_user` (
  `idUser` int(11) NOT NULL,
  `fullNameUser` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `emailUser` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `phoneNumberUser` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `phoneLocalNumberUser` varchar(25) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `addresUser` varchar(150) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `passwordUser` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idProfileKf` int(11) DEFAULT NULL,
  `idStatusKf` int(11) DEFAULT NULL,
  `dateCreated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `idCompanyKf` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_user`
--

INSERT INTO `tb_user` (`idUser`, `fullNameUser`, `emailUser`, `phoneNumberUser`, `phoneLocalNumberUser`, `addresUser`, `passwordUser`, `idProfileKf`, `idStatusKf`, `dateCreated`, `idCompanyKf`) VALUES
(24, 'Jorge Gutierrez', 'jorguti58@gmail.com', '116348575939', '119948585748', NULL, '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 1, 1, '2017-11-23 05:36:20', NULL),
(17, 'David Rincón Luengo', 'rexx84@gmail.com', '112235667799', '112345664556', NULL, '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 4, 1, '2017-10-26 02:16:00', 1),
(22, 'Luis Carreño', 'luis.carreno@coca-cola.com', '1199887766', '1144556677', NULL, '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 2, 1, '2017-10-26 18:17:25', 3),
(23, 'Carlos Villalobos', 'carlos.villalobos@gmail.com', '113243545556', '114567677888', NULL, '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 3, 0, '2017-11-23 00:28:25', NULL),
(25, 'Jose Gomez', 'jose.gomez@gmail.com', '113443663346', '116678885464', NULL, '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 3, 0, '2017-11-24 17:47:25', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tb_addres`
--
ALTER TABLE `tb_addres`
  ADD PRIMARY KEY (`idAdress`);

--
-- Indices de la tabla `tb_attendant`
--
ALTER TABLE `tb_attendant`
  ADD PRIMARY KEY (`idAttendant`);

--
-- Indices de la tabla `tb_branch`
--
ALTER TABLE `tb_branch`
  ADD PRIMARY KEY (`idBranch`);

--
-- Indices de la tabla `tb_clients_tickets`
--
ALTER TABLE `tb_clients_tickets`
  ADD PRIMARY KEY (`idTicketsCliets`);

--
-- Indices de la tabla `tb_company`
--
ALTER TABLE `tb_company`
  ADD PRIMARY KEY (`idCompany`);

--
-- Indices de la tabla `tb_department`
--
ALTER TABLE `tb_department`
  ADD PRIMARY KEY (`idDepartment`);

--
-- Indices de la tabla `tb_opcion_low`
--
ALTER TABLE `tb_opcion_low`
  ADD PRIMARY KEY (`idOpcionLowTicket`);

--
-- Indices de la tabla `tb_profile`
--
ALTER TABLE `tb_profile`
  ADD PRIMARY KEY (`idProfile`);

--
-- Indices de la tabla `tb_reason_disabled_item`
--
ALTER TABLE `tb_reason_disabled_item`
  ADD PRIMARY KEY (`idReasonDisabledItem`);

--
-- Indices de la tabla `tb_request`
--
ALTER TABLE `tb_request`
  ADD PRIMARY KEY (`idRequest`);

--
-- Indices de la tabla `tb_status`
--
ALTER TABLE `tb_status`
  ADD PRIMARY KEY (`idStatusTenant`);

--
-- Indices de la tabla `tb_statusticket`
--
ALTER TABLE `tb_statusticket`
  ADD PRIMARY KEY (`idStatus`);

--
-- Indices de la tabla `tb_sys_param`
--
ALTER TABLE `tb_sys_param`
  ADD PRIMARY KEY (`idParam`);

--
-- Indices de la tabla `tb_tenant`
--
ALTER TABLE `tb_tenant`
  ADD PRIMARY KEY (`idTenant`);

--
-- Indices de la tabla `tb_tickets`
--
ALTER TABLE `tb_tickets`
  ADD PRIMARY KEY (`idTicket`);

--
-- Indices de la tabla `tb_typetenant`
--
ALTER TABLE `tb_typetenant`
  ADD PRIMARY KEY (`idTypeTenant`);

--
-- Indices de la tabla `tb_typeticket`
--
ALTER TABLE `tb_typeticket`
  ADD PRIMARY KEY (`idTypeTicket`);

--
-- Indices de la tabla `tb_type_outher`
--
ALTER TABLE `tb_type_outher`
  ADD PRIMARY KEY (`idTypeOuther`);

--
-- Indices de la tabla `tb_type_services`
--
ALTER TABLE `tb_type_services`
  ADD PRIMARY KEY (`idTypeServices`);

--
-- Indices de la tabla `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tb_addres`
--
ALTER TABLE `tb_addres`
  MODIFY `idAdress` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tb_attendant`
--
ALTER TABLE `tb_attendant`
  MODIFY `idAttendant` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tb_branch`
--
ALTER TABLE `tb_branch`
  MODIFY `idBranch` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tb_clients_tickets`
--
ALTER TABLE `tb_clients_tickets`
  MODIFY `idTicketsCliets` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `tb_company`
--
ALTER TABLE `tb_company`
  MODIFY `idCompany` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_department`
--
ALTER TABLE `tb_department`
  MODIFY `idDepartment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `tb_opcion_low`
--
ALTER TABLE `tb_opcion_low`
  MODIFY `idOpcionLowTicket` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tb_reason_disabled_item`
--
ALTER TABLE `tb_reason_disabled_item`
  MODIFY `idReasonDisabledItem` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_sys_param`
--
ALTER TABLE `tb_sys_param`
  MODIFY `idParam` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tb_tenant`
--
ALTER TABLE `tb_tenant`
  MODIFY `idTenant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `tb_tickets`
--
ALTER TABLE `tb_tickets`
  MODIFY `idTicket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT de la tabla `tb_typeticket`
--
ALTER TABLE `tb_typeticket`
  MODIFY `idTypeTicket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tb_type_services`
--
ALTER TABLE `tb_type_services`
  MODIFY `idTypeServices` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
