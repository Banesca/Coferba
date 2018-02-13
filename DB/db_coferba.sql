-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-02-2018 a las 17:03:51
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
  `nameAdress` varchar(300) COLLATE utf8_swedish_ci DEFAULT NULL,
  `priceUni` decimal(10,2) DEFAULT '0.00' COMMENT 'Precio por unidad',
  `priceManagement` decimal(10,2) DEFAULT '0.00' COMMENT 'Precio por Gestion',
  `priceShipping` decimal(10,2) DEFAULT '0.00' COMMENT 'Precio por envio '
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Volcado de datos para la tabla `tb_addres`
--

INSERT INTO `tb_addres` (`idAdress`, `nameAdress`, `priceUni`, `priceManagement`, `priceShipping`) VALUES
(1, 'Cramer 1275', '100.00', '0.00', '150.00'),
(2, 'Blanco Encalada 2355', '0.00', '0.00', '0.00'),
(3, 'Cabildo 3510', '0.00', '0.00', '0.00'),
(4, 'Gral. La valle 1920', '0.00', '0.00', '0.00'),
(5, 'Parana 2568', '0.00', '0.00', '0.00'),
(6, 'Rivadavia 4530', '0.00', '0.00', '0.00');

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
  `mailAttendant` varchar(200) COLLATE utf8_swedish_ci NOT NULL,
  `hoursWork` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL,
  `idTyepeAttendantKf` int(11) DEFAULT NULL,
  `idStatusKf` int(11) DEFAULT '1',
  `descOther` text COLLATE utf8_swedish_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Volcado de datos para la tabla `tb_attendant`
--

INSERT INTO `tb_attendant` (`idAttendant`, `nameAttendant`, `idAddresKf`, `phoneAttendant`, `phoneLocalAttendant`, `mailAttendant`, `hoursWork`, `idTyepeAttendantKf`, `idStatusKf`, `descOther`) VALUES
(1, 'JORGE GUTIERREZ', 1, '12319283712', '05491232132', 'adsaa@daas.djh', '', 2, 1, NULL),
(2, 'DAVID', 1, '31221312321', '05491133455', 'adsaa@daas.djh', '', 2, 1, NULL),
(3, 'MIGUEL MARTINEZ', 2, '312312312211', '054919329491', 'adsaa@daas.djh', '', 2, 1, NULL),
(4, 'MARTINEZ JULO', 3, '12321321312', NULL, 'adsaa@daas.djh', NULL, 2, 1, NULL),
(5, 'prueba EDITE 2', 1, '31321321321', NULL, 'prueba@pruba.com', '08:40', 4, 1, NULL),
(6, 'prueba', 1, '31321321321', '05491124343', 'DFSD@SDDDS.DF', '09:00', 3, 1, NULL),
(7, 'Francisco Ochoa', 1, '(054) 9 22 2222-2222', '(054) 9 11 1111-1111', 'fracisco.ochoa@gmail.com', '', 3, 1, NULL),
(8, 'prueba', 1, '31321321321', NULL, 'prueba@pruba.com', '08:40', NULL, 1, NULL),
(9, 'prueba EDITE', 1, '31321321321', NULL, 'prueba@pruba.com', '08:40', 5, 1, NULL),
(10, 'Emilio Fanego', 1, '05491232132121', '05491232132131', 'emilio.fanego@gmail.com', '', 1, 1, 'Carpintero'),
(11, 'Javier Mendoza', 1, '0549123213213', '0549123213213', 'javier.mendoza@yahoo.com', '', 1, 1, 'Plomero'),
(12, 'Raul Medina', 1, '', '0549123213213', 'raul.medina@gmail.com', '', 1, 1, 'Plomero'),
(13, 'Esteban Gervasi', 2, '054912321321321', '054921321321321', 'esteban.gervasi@gmail.com', '', 1, 1, 'Obrero'),
(14, 'Wilmer Farias', 3, '054912321321321', '054912321321321', 'wilmer.farias@gmail.com', '', 1, 1, 'Techista'),
(15, 'Romulo Gomez', 1, '05491123432432445', '05491112321321434', 'romulo.gomez@gmail.com', '', 1, 1, 'Albañil'),
(16, 'Ricardo Cepeda', 1, '054912321321343', '054912321321321', 'ricardo.cepeda@gmail.com', '', 1, 1, 'Electricista'),
(23, 'Saul Martinez', 1, '123213213213', '213213213213', 'saul.martinez@gmail.com', '', 3, 1, 'Inmobiliaria'),
(24, 'Fernando Ramirez', 2, '213213214214214', '23432324323243', 'fernando.ramirez@gmail.com', '', 1, 1, 'Pintor'),
(25, 'Jorge Jimenez', 2, '23432432432', '23432432432', 'jorge.jimenez@gmail.com', '', 1, 1, 'Seguridad'),
(26, 'Roberto Rodriguez', 1, '2132132132134', '1232132131244', 'roberto.rodriguez@yahoo.com', '', 1, 1, 'Plomero'),
(27, 'Ruben Malave', 1, '123213213213213213', '232143213213213212', 'ruben.malave@gmail.com', '', 1, 1, 'Pintor'),
(30, 'Henry Gomez', 1, '', '05491123242424', 'henry.gomez@hotmail.com', '', 1, 1, 'Obrero');

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
  `isAprobatedAdmin` tinyint(4) DEFAULT '0',
  `isRequesLowByProp` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_department`
--

INSERT INTO `tb_department` (`idDepartment`, `idAdressKf`, `departmentFloor`, `deparmentNumber`, `deparmentDescription`, `idStatusKf`, `idUserAdminRKf`, `idUserAdminPropietariKf`, `idTenantKf`, `isAprobatedAdmin`, `isRequesLowByProp`) VALUES
(1, 1, 'Porteria', 0, '', 1, 1, NULL, 58, 1, 0),
(2, 1, '1-A', 0, '', 1, 1, NULL, 22, 1, 0),
(3, 1, '1-B', 0, '', 1, 1, NULL, 22, 1, 0),
(4, 1, '2-A', 0, '', 1, 1, NULL, NULL, 0, 0),
(5, 1, '2-B', 0, '', 1, 1, NULL, NULL, 0, 0),
(6, 1, '3-A', 0, '', 1, 1, NULL, NULL, 0, 0),
(7, 1, '3-B', 0, '', 1, 1, NULL, NULL, 0, 0),
(8, 1, '4-A', 0, '', 1, 1, NULL, NULL, 0, 0),
(9, 1, '4-B', 0, '', 1, 1, NULL, NULL, 0, 0),
(10, 1, '5-A', 0, '', 1, 1, NULL, NULL, 0, 0),
(11, 1, '5-B', 0, '', 1, 1, NULL, NULL, 0, 0),
(12, 2, '6-A', 0, '', 1, 1, NULL, 22, 1, 0),
(13, 2, '6-B', 0, '', 1, 1, NULL, 52, 1, 0),
(14, 2, '7-A', 0, '', 1, 1, NULL, NULL, 0, 0),
(15, 2, '7-B', 0, '', 1, 1, NULL, NULL, 0, 0),
(16, 2, '8-A', 0, '', 1, 1, NULL, 53, 1, 0),
(17, 3, '8-B', 0, '', 1, 1, NULL, 22, 0, 0),
(18, 2, 'Porteria', 0, NULL, 1, 1, NULL, 43, 1, 0),
(19, 3, 'Porteria', 0, NULL, 1, 1, NULL, NULL, 0, 0);

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
(1, '106', 'TK');

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
(6, '20:00', 'HORA DE MAIL DE VERIFICACION DE MAIL PARA ADMINISTRADORES DE CONSORCIO'),
(7, 'jorguti58@gmail.com', 'MAIL DE VENTAS'),
(8, 'jorguti58@gmail.com', 'MAIL SERVICO TECNICO'),
(9, 'jorguti58@gmail.com', 'MAIL FACTURACION');

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
(22, 'Carlos Villalobos', 1, '(054) 9 82 3213-5555', NULL, 'carlos.villalobos@gmail.com', 1, '2017-11-23 00:28:25', '(154) 1 11 1111-1111'),
(23, 'Jorge Gutierrez', 1, '116677889900', NULL, 'jorguti58@gmail.com', 1, '2017-11-23 05:36:21', '114455667788'),
(30, 'Teresa Carreño', 1, '11435436477', NULL, 'teresa.carreno@gmail.com', 1, '2017-11-30 23:43:16', '114325436436'),
(31, 'Osmel Sousa', 2, '112321432532', 2, 'osmel.sousa@gmail.com', 1, '2017-12-02 12:00:09', '(454) 4 44 4444-4444'),
(33, 'Karen Figueroa', 2, '(554) 5 55 5555-5555', 2, 'karen.figueroa@gmail.com', 1, '2017-12-02 12:06:50', '(854) 8 88 8888-3333'),
(34, 'Arturo Michelena', 2, '325325325325', 0, 'arturo.michelena@gmail.com', 1, '2017-12-02 12:13:30', '212432143243'),
(41, 'Gaston Martinez', 1, '(954) 9 99 9999-9999', NULL, 'gaston.martinez@gmail.com', 1, '2018-01-28 20:59:40', '(954) 9 99 9999-9999'),
(40, 'Rafael Correa', 1, '(054) 9 11 3333-3333', NULL, 'rafael.correa@gmail.com', 1, '2018-01-28 20:25:58', '(054) 9 33 3333-3333'),
(39, 'Daniel Contreras', 1, '(054) 9 11 3333-3333', NULL, 'daniel.contreras@gmail.com', 1, '2018-01-28 20:06:20', '(054) 9 11 2323-2323'),
(42, 'Nelva Zambrano', 1, '(054) 1 23 1321-2321', NULL, 'nelva.zambrano@gmail.com', 1, '2018-01-28 21:02:27', '(054) 1 92 1321-3123'),
(43, 'Luciano Alvarez', 1, '(054) 3 12 3921-3213', NULL, 'luciano.alvarez@gmail.com', 1, '2018-01-28 21:10:36', '(054) 9 12 9321-9321'),
(44, 'Dalia Campos', 2, '(054) 9 12 3213-1322', 12, 'dalia.campos@gmail.com', 1, '2018-01-29 07:34:11', '(054) 9 11 2323-2323'),
(46, 'Jairo Ramirez', 2, '(054) 9 11 2304-9544', 3, 'jairo.ramirez@gmail.com', 1, '2018-01-30 04:51:00', '(054) 9 11 2239-9999'),
(47, 'Yulimar Rios', 2, '(054) 9 40 2329-3244', 3, 'yulimar.rios@gmail.com', 1, '2018-01-30 04:55:50', '(054) 9 11 2323-3444'),
(48, 'Flor Antunez', 2, '(954) 9 99 9999-9999', 3, 'flor.antunez@gmail.com', 1, '2018-01-30 04:57:32', '(554) 5 55 5555-5555'),
(49, 'Carmen Gil', 1, '(054) 9 11 2222-2222', NULL, 'carmen.gil@hotmail.com', 1, '2018-01-31 06:58:19', '(054) 9 12 1111-1111'),
(50, 'Wilmer Azuaje', 1, '(054) 9 99 9999-9999', NULL, 'wilmer.azuaje@hotmail.com', 1, '2018-01-31 07:07:43', '(054) 9 88 8888-8888'),
(51, 'Enmauel Fonseca', 1, '(054) 9 99 9999-9999', NULL, 'enmanuel.fonseca@yahoo.com', 1, '2018-01-31 07:12:19', '(154) 1 11 1111-1111'),
(52, 'Humberto Moran', 1, '(054) 1 11 1111-1111', NULL, 'humberto.moran@gmail.com', 1, '2018-01-31 07:19:37', '(054) 2 22 2222-2222'),
(53, 'Xavi Hernandez', 1, '(054) 7 77 7777-7777', NULL, 'xavi.hernandez@yahoo.es', 1, '2018-01-31 07:24:30', '(054) 6 66 6666-6666'),
(54, 'Rigoberto Leal', 1, '(254) 2 22 2222-2222', NULL, 'rigoberto.leal@hotmail.com', 1, '2018-01-31 07:25:27', '(954) 9 99 9999-9999'),
(55, 'Florencia Coco', 2, '(054) 3 33 3333-3333', 16, 'florencia.coco@gmail.com', 1, '2018-01-31 07:39:02', '(054) 1 11 1111-1111'),
(56, 'Omar Vaquez', 2, '(054) 0 00 0000-0000', 13, 'omar.vasquez@gmail.com', 1, '2018-01-31 20:36:56', '(954) 9 99 9999-9999'),
(57, 'Paola Gonzalez', 2, '(154) 1 11 1111-1111', 13, 'paola.gonzalez@hotmail.com', 1, '2018-02-01 06:10:47', '(954) 9 99 9999-9999'),
(58, 'JORGE GUTIERREZ', 0, '12319283712', 0, 'adsaa@daas.djh', 1, '2018-02-06 22:28:05', '05491232132');

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
  `idTypeTicketKf` int(11) DEFAULT NULL COMMENT 'ID DEL TIPO DE TICKET',
  `description` text COLLATE utf8_spanish2_ci,
  `idRequestKf` int(11) DEFAULT NULL,
  `idTenantKf` int(11) DEFAULT NULL COMMENT 'ID DEL INQUILINO',
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
  `idAttendantKf` int(11) DEFAULT NULL COMMENT 'ID DEL ENCARGADO',
  `idCompanyKf` int(11) DEFAULT NULL,
  `idBranchKf` int(11) DEFAULT NULL,
  `isAprobatedAdmin` tinyint(4) DEFAULT '0',
  `isCancelTicket` tinyint(4) DEFAULT '0',
  `dateCancel` timestamp NULL DEFAULT NULL,
  `idDepartmentKf` int(11) DEFAULT NULL COMMENT 'ID DEL DEPARTAMENTO',
  `idAdressKf` int(11) DEFAULT NULL COMMENT 'DIRECCION DEL TICKET',
  `dateAprovatedAdmin` timestamp NULL DEFAULT NULL,
  `idOtherKf` int(11) DEFAULT NULL COMMENT 'Id de encargado de typo "Otro"'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_tickets`
--

INSERT INTO `tb_tickets` (`idTicket`, `dateCreated`, `dateRecibedAdmin`, `dateRecibeCompany`, `idStatusTicketKf`, `codTicket`, `idTypeTicketKf`, `description`, `idRequestKf`, `idTenantKf`, `idUserAdminKf`, `idUserCompany`, `idUserEnterpriceKf`, `numberItemes`, `idTypeDeliveryKf`, `numberItemDisabled`, `idOWnerKf`, `idTypeOuther`, `mailContactConsult`, `SA_NRO_ORDER`, `idReasonDisabledItemKf`, `descriptionOrder`, `idTypeServicesKf`, `totalService`, `addressConsul`, `idProfileKf`, `idOpcionLowTicketKf`, `idAttendantKf`, `idCompanyKf`, `idBranchKf`, `isAprobatedAdmin`, `isCancelTicket`, `dateCancel`, `idDepartmentKf`, `idAdressKf`, `dateAprovatedAdmin`, `idOtherKf`) VALUES
(1, '2018-02-13 04:21:45', NULL, NULL, 1, 'TK-00000101', 1, '', NULL, 22, 0, NULL, 0, 1, 2, NULL, 23, NULL, NULL, NULL, NULL, NULL, NULL, '250.00', NULL, NULL, NULL, 1, NULL, 1, 0, 0, NULL, 3, 1, NULL, 0),
(2, '2018-02-13 04:32:41', NULL, NULL, 1, 'TK-00000102', 1, '', NULL, 33, 0, NULL, 0, 1, 2, NULL, 23, NULL, NULL, NULL, NULL, NULL, NULL, '250.00', NULL, NULL, NULL, 1, NULL, 1, 0, 0, NULL, 2, 1, NULL, 0),
(3, '2018-02-13 05:02:05', NULL, NULL, 1, 'TK-00000103', 3, '', NULL, NULL, 17, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Reemplazar camara de entrada principal del edificio', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 0, 0, NULL, NULL, 1, NULL, NULL),
(4, '2018-02-13 12:06:07', NULL, NULL, 1, 'TK-00000104', 1, '', NULL, 56, 0, NULL, 17, 1, 2, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, '0.00', NULL, NULL, NULL, 3, 1, 2, 0, 0, NULL, 13, NULL, NULL, 0),
(5, '2018-02-13 12:13:29', NULL, NULL, 1, 'TK-00000105', 1, '', NULL, 0, 0, NULL, 17, 1, 2, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, '0.00', NULL, NULL, NULL, 3, 1, 2, 0, 0, NULL, 0, NULL, NULL, 0),
(6, '2018-02-13 13:29:01', NULL, NULL, 1, 'TK-00000106', 1, '', NULL, 0, 0, NULL, 17, 1, 2, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, '250.00', NULL, NULL, NULL, 0, 1, 1, 0, 0, NULL, 0, NULL, NULL, 30);

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
-- Estructura de tabla para la tabla `tb_type_attendant`
--

CREATE TABLE `tb_type_attendant` (
  `idTyepeAttendant` int(11) UNSIGNED NOT NULL,
  `nameTypeAttendant` varchar(100) COLLATE utf8_swedish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Volcado de datos para la tabla `tb_type_attendant`
--

INSERT INTO `tb_type_attendant` (`idTyepeAttendant`, `nameTypeAttendant`) VALUES
(1, 'Otro'),
(2, 'Titular'),
(3, 'Suplente'),
(4, 'Ayudante'),
(5, 'Intendente');

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
  `idCompanyKf` int(11) DEFAULT NULL,
  `resetPasword` tinyint(4) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_user`
--

INSERT INTO `tb_user` (`idUser`, `fullNameUser`, `emailUser`, `phoneNumberUser`, `phoneLocalNumberUser`, `addresUser`, `passwordUser`, `idProfileKf`, `idStatusKf`, `dateCreated`, `idCompanyKf`, `resetPasword`) VALUES
(24, 'prueba editada', 'prueba', 'prueba', '123', NULL, '32e7092ddccc9af07299d6e8dac6fe731c6572d2', 1, 1, '2017-11-23 05:36:20', NULL, 0),
(17, 'David Rincón Luengo', 'rexx84@gmail.com', '112235667799', '112345664556', NULL, '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 4, 1, '2017-10-26 02:16:00', 1, 0),
(22, 'Luis Carreño', 'luis.carreno@coca-cola.com', '1199887766', '1144556677', NULL, '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 2, 1, '2017-10-26 18:17:25', 3, 0),
(23, 'Carlos Villalobos', 'carlos.villalobos@gmail.com', '(054) 9 11 2235-6388', '(054) 9 11 2669-4918', NULL, '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 3, 0, '2017-11-23 00:28:25', NULL, 0),
(25, 'Jose Gomez', 'jose.gomez@gmail.com', '113443663346', '116678885464', NULL, '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 3, 0, '2017-11-24 17:47:25', NULL, 0),
(27, 'prueba de registro', 'prueba@prueba.com.ar', '(154) 2 32 1321-3213', '(254) 1 31 3213-1322', NULL, '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 3, 1, '2018-01-26 03:26:01', NULL, 1),
(28, 'Xavi Hernandez', 'xavi.hernandez@yahoo.es', '(454) 4 44 4444-4444', '(854) 8 88 8888-8888', NULL, '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 4, 1, '2018-01-31 07:34:09', NULL, 0),
(29, 'Humberto Moran', 'humberto.moran@gmail.com', '(054) 1 11 1111-1111', '(054) 2 22 2222-2222', NULL, '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 3, 0, '2018-01-31 20:35:07', NULL, 0),
(30, 'developer 1', 'developer1@gmail.com', '(054) 9 12 3213-2323', '(054) 9 11 2231-2321', NULL, '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 1, 1, '2018-02-11 15:50:25', NULL, 0);

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
  ADD PRIMARY KEY (`idAttendant`) USING BTREE,
  ADD KEY `idTyepeAttendantKf` (`idTyepeAttendantKf`);

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
-- Indices de la tabla `tb_type_attendant`
--
ALTER TABLE `tb_type_attendant`
  ADD PRIMARY KEY (`idTyepeAttendant`);

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
  MODIFY `idAttendant` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

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
  MODIFY `idDepartment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

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
  MODIFY `idParam` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `tb_tenant`
--
ALTER TABLE `tb_tenant`
  MODIFY `idTenant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT de la tabla `tb_tickets`
--
ALTER TABLE `tb_tickets`
  MODIFY `idTicket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tb_typeticket`
--
ALTER TABLE `tb_typeticket`
  MODIFY `idTypeTicket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tb_type_attendant`
--
ALTER TABLE `tb_type_attendant`
  MODIFY `idTyepeAttendant` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tb_type_services`
--
ALTER TABLE `tb_type_services`
  MODIFY `idTypeServices` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
