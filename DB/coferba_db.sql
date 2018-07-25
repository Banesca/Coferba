-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-07-2018 a las 18:04:52
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
  `idCompanyKf` int(11) DEFAULT NULL,
  `priceUni` decimal(10,2) DEFAULT '0.00' COMMENT 'Precio por unidad',
  `priceManagement` decimal(10,2) DEFAULT '0.00' COMMENT 'Precio por Gestion',
  `priceShipping` decimal(10,2) DEFAULT '0.00' COMMENT 'Precio por envio ',
  `SA_ID_COMPANY` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Volcado de datos para la tabla `tb_addres`
--

INSERT INTO `tb_addres` (`idAdress`, `nameAdress`, `idCompanyKf`, `priceUni`, `priceManagement`, `priceShipping`, `SA_ID_COMPANY`) VALUES
(1, 'Cramer 1275', 1, '100.00', '0.00', '150.00', NULL),
(2, 'Blanco Encalada 2355', 1, '0.00', '0.00', '0.00', NULL),
(3, 'Cabildo 3510', 2, '0.00', '0.00', '0.00', NULL),
(4, 'Gral. La valle 1920', 2, '0.00', '0.00', '0.00', NULL),
(5, 'Parana 2568', 3, '0.00', '0.00', '0.00', NULL),
(6, 'Rivadavia 4530', 3, '0.00', '0.00', '0.00', NULL);

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
  `nameCompany` varchar(300) COLLATE utf8_swedish_ci DEFAULT NULL,
  `SA_ID_COMPANY` int(11) DEFAULT NULL,
  `mail_services` varchar(200) COLLATE utf8_swedish_ci DEFAULT '',
  `mail_request` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL,
  `mail_admin` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL,
  `isEdit` tinyint(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Volcado de datos para la tabla `tb_company`
--

INSERT INTO `tb_company` (`idCompany`, `nameCompany`, `SA_ID_COMPANY`, `mail_services`, `mail_request`, `mail_admin`, `isEdit`) VALUES
(1, 'Carlos Castaño', NULL, 'PRUEBA', 'PRUEBA', 'PRUEBA', 1),
(2, 'Talcahuano Propiedades', NULL, '', NULL, NULL, NULL),
(3, 'Toyota', NULL, '', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_company_type_keychains`
--

CREATE TABLE `tb_company_type_keychains` (
  `id` int(11) UNSIGNED NOT NULL,
  `idCompanyKf` int(11) DEFAULT NULL,
  `item` varchar(200) DEFAULT NULL,
  `value` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_company_type_keychains`
--

INSERT INTO `tb_company_type_keychains` (`id`, `idCompanyKf`, `item`, `value`) VALUES
(1, 1, 'nombre', '40.68'),
(2, 1, 'nombre 2', '80.89'),
(3, 2, 'nombr 3', '700.90');

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
  `idUserKf` int(11) DEFAULT NULL,
  `isAprobatedAdmin` tinyint(4) DEFAULT '0',
  `isRequesLowByProp` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_department`
--

INSERT INTO `tb_department` (`idDepartment`, `idAdressKf`, `departmentFloor`, `deparmentNumber`, `deparmentDescription`, `idStatusKf`, `idUserAdminRKf`, `idUserAdminPropietariKf`, `idUserKf`, `isAprobatedAdmin`, `isRequesLowByProp`) VALUES
(1, 1, 'Porteria', 0, '', 1, 1, NULL, 60, 1, 0),
(2, 1, '1-A', 0, '', 1, 1, NULL, 22, 1, 0),
(3, 1, '1-B', 0, '', 1, 1, NULL, 22, 1, 0),
(4, 1, '2-A', 0, '', 1, 1, NULL, 64, 1, 0),
(5, 1, '2-B', 0, '', 1, 1, NULL, 23, 1, 0),
(6, 1, '3-A', 0, '', 1, 1, NULL, NULL, 0, 0),
(7, 1, '3-B', 0, '', 1, 1, NULL, NULL, 0, 0),
(8, 1, '4-A', 0, '', 1, 1, NULL, NULL, 0, 0),
(9, 1, '4-B', 0, '', 1, 1, NULL, NULL, 0, 0),
(10, 1, '5-A', 0, '', 1, 1, NULL, NULL, 0, 0),
(11, 1, '5-B', 0, '', 1, 1, NULL, NULL, 0, 0),
(12, 2, '6-A', 0, '', 1, 1, NULL, 22, 1, 0),
(13, 2, '6-B', 0, '', 1, 1, NULL, 52, 1, 0),
(14, 2, '7-A', 0, '', 1, 1, NULL, 0, 0, 0),
(15, 2, '7-B', 0, '', 1, 1, NULL, NULL, 0, 0),
(16, 2, '8-A', 0, '', 1, 1, NULL, 53, 1, 0),
(17, 3, '8-B', 0, '', 1, 1, NULL, 60, 1, 0),
(18, 2, 'Porteria', 0, NULL, 1, 1, NULL, 67, 1, 0),
(19, 3, 'Porteria', 0, NULL, 1, 1, NULL, 64, 1, 0);

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
  `idProfile` int(11) UNSIGNED NOT NULL,
  `nameProfile` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_profile`
--

INSERT INTO `tb_profile` (`idProfile`, `nameProfile`) VALUES
(1, 'Coferba'),
(2, 'Empresa'),
(3, 'Propietario'),
(4, 'Admin Consorsio'),
(5, 'Inquilino'),
(6, 'Encargado');

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
('-1', 'Rechazado', '100'),
('1', 'Finalizado', '101'),
('10', 'Programado', '3'),
('2', 'Autorizacion Pendiente', '100'),
('3', 'Aprobado', '100'),
('4', 'Pendiente de envio ', '1'),
('5', 'En Ruta', '103'),
('6', 'Cancelado', '101'),
('7', 'Listo para Retirar', '2'),
('8', 'Solicitado', '3'),
('9', 'Pendiente', '102');

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
(1, '148', 'TK');

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
(7, 'ventas@coferba.com.ar', 'MAIL DE VENTAS'),
(8, 'tecnica@coferba.com.ar', 'MAIL SERVICO TECNICO'),
(9, 'cobranzas@coferba.com.ar', 'MAIL FACTURACION'),
(10, 'administracion@coferba.com.ar', 'MAIL ADMINISTRATIVO'),
(11, 'ULTIMA CONEXION SISTEMA ADMIN', '00:00:00');

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
  `dateCrated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `phoneNumberContactTenant` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_tenant`
--

INSERT INTO `tb_tenant` (`idTenant`, `fullNameTenant`, `idTypeKf`, `phoneNumberTenant`, `idDepartmentKf`, `emailTenant`, `idStatusKf`, `dateCrated`, `phoneNumberContactTenant`) VALUES
(1, 'David Eduardo Rincon Luengo', 1, '1126694918', NULL, 'rexx84@gmail.com', 1, '2017-10-18 07:07:25', '1122334455'),
(2, 'Alberto Fabian', 1, '54115778345', NULL, 'Alberto.Fabian@gmail.com', 1, '2017-10-18 07:07:25', '54115778345'),
(3, 'Eduardo Peliacani', 1, '54115778345', NULL, 'Eduardo.Peliacani@gmail.com', 1, '2017-10-18 07:07:25', '54115778345'),
(4, 'Carlos Lazarte', 1, '54115778345', NULL, 'Carlos.Lazarte@gmail.com', 1, '2017-10-18 07:07:25', '54115778345'),
(5, 'Marcos Padilla', 1, '54115778345', NULL, 'Marcos.Padilla@gmail.com', 1, '2017-10-18 07:07:25', '54115778345'),
(6, 'Nahuel Barrati', 1, '54115778345', NULL, 'Nahuel.Barrati@gmail.com', 1, '2017-10-18 07:07:25', '54115778345'),
(7, 'Jan Zambrano', 1, '54115778345', NULL, 'Jan.Zambrano@gmail.com', 1, '2017-10-18 07:07:25', '54115778345'),
(8, 'Marcos Quispes', 1, '54115778345', NULL, 'Marcos.Quispes@gmail.com', 1, '2017-10-18 07:07:25', '54115778345'),
(9, 'Beatriz Gonzalez', 1, '54115778345', NULL, 'Beatriz.Gonzalez@gmail.com', 1, '2017-10-18 07:07:25', '54115778345'),
(10, 'Juan de Vicenti', 1, '54115778345', NULL, 'juan.vicenti@gmail.com', 1, '2017-10-18 07:07:25', '54115778345'),
(11, 'Jorge Gutierrez', 2, '541189054333', NULL, 'jorguti85@gmail.com', 1, '2017-10-18 07:07:25', '541189054333'),
(12, 'Carlos Romero', 2, '541189054333', NULL, 'jorguti86@gmail.com', 1, '2017-10-18 07:07:25', '541189054333'),
(13, 'Jose Carrasco', 2, '541189054333', NULL, 'jorguti87@gmail.com', 1, '2017-10-18 07:07:25', '541189054333'),
(14, 'Alfredo Wirth', 2, '541189054333', NULL, 'jorguti88@gmail.com', 1, '2017-10-18 07:07:25', '541189054333'),
(15, 'Victor Machado', 2, '541189054333', NULL, 'jorguti89@gmail.com', 1, '2017-10-18 07:07:25', '541189054333'),
(16, 'Martin Hatchman', 2, '541189054333', NULL, 'jorguti90@gmail.com', 1, '2017-10-18 07:07:25', '541189054333'),
(17, 'Flavio Alfano', 2, '541189054333', NULL, 'jorguti91@gmail.com', 1, '2017-10-18 07:07:25', '541189054333'),
(18, 'Jorge Dangelo', 2, '541189054333', NULL, 'jorguti92@gmail.com', 1, '2017-10-18 07:07:25', '541189054333'),
(19, 'Jose Perez', 2, '222222222222', NULL, 'jose.perez@gmail.com', 1, '2017-11-10 20:10:02', '111111111111'),
(20, 'Roberto Vicuña', 1, '113344559966', NULL, 'roberto.vicuna@gmail.com', 1, '2017-11-10 21:08:15', '113445567788'),
(21, 'Jesus Antunez', 2, '222222222222', NULL, 'jesus.antunez@gmail.com', 1, '2017-11-11 17:27:42', '111111111111'),
(22, 'Carlos Villalobos', 1, '(054) 9 82 3213-5555', NULL, 'carlos.villalobos@gmail.com', 1, '2017-11-23 03:28:25', '(154) 1 11 1111-1111'),
(23, 'Jorge Gutierrez', 1, '116677889900', NULL, 'jorguti58@gmail.com', 1, '2017-11-23 08:36:21', '114455667788'),
(30, 'Teresa Carreño', 1, '11435436477', NULL, 'teresa.carreno@gmail.com', 1, '2017-12-01 02:43:16', '114325436436'),
(31, 'Osmel Sousa', 2, '112321432532', 2, 'osmel.sousa@gmail.com', 1, '2017-12-02 15:00:09', '(454) 4 44 4444-4444'),
(33, 'Karen Figueroa', 2, '(554) 5 55 5555-5555', 2, 'karen.figueroa@gmail.com', 1, '2017-12-02 15:06:50', '(854) 8 88 8888-3333'),
(34, 'Arturo Michelena', 2, '325325325325', 0, 'arturo.michelena@gmail.com', 1, '2017-12-02 15:13:30', '212432143243'),
(41, 'Gaston Martinez', 1, '(954) 9 99 9999-9999', NULL, 'gaston.martinez@gmail.com', 1, '2018-01-28 23:59:40', '(954) 9 99 9999-9999'),
(40, 'Rafael Correa', 1, '(054) 9 11 3333-3333', NULL, 'rafael.correa@gmail.com', 1, '2018-01-28 23:25:58', '(054) 9 33 3333-3333'),
(39, 'Daniel Contreras', 1, '(054) 9 11 3333-3333', NULL, 'daniel.contreras@gmail.com', 1, '2018-01-28 23:06:20', '(054) 9 11 2323-2323'),
(42, 'Nelva Zambrano', 1, '(054) 1 23 1321-2321', NULL, 'nelva.zambrano@gmail.com', 1, '2018-01-29 00:02:27', '(054) 1 92 1321-3123'),
(43, 'Luciano Alvarez', 1, '(054) 3 12 3921-3213', NULL, 'luciano.alvarez@gmail.com', 1, '2018-01-29 00:10:36', '(054) 9 12 9321-9321'),
(44, 'Dalia Campos', 2, '(054) 9 12 3213-1322', 12, 'dalia.campos@gmail.com', 1, '2018-01-29 10:34:11', '(054) 9 11 2323-2323'),
(46, 'Jairo Ramirez', 2, '(054) 9 11 2304-9544', 3, 'jairo.ramirez@gmail.com', 1, '2018-01-30 07:51:00', '(054) 9 11 2239-9999'),
(47, 'Yulimar Rios', 2, '(054) 9 40 2329-3244', 3, 'yulimar.rios@gmail.com', 1, '2018-01-30 07:55:50', '(054) 9 11 2323-3444'),
(48, 'Flor Antunez', 2, '(954) 9 99 9999-9999', 3, 'flor.antunez@gmail.com', 1, '2018-01-30 07:57:32', '(554) 5 55 5555-5555'),
(49, 'Carmen Gil', 1, '(054) 9 11 2222-2222', NULL, 'carmen.gil@hotmail.com', 1, '2018-01-31 09:58:19', '(054) 9 12 1111-1111'),
(50, 'Wilmer Azuaje', 1, '(054) 9 99 9999-9999', NULL, 'wilmer.azuaje@hotmail.com', 1, '2018-01-31 10:07:43', '(054) 9 88 8888-8888'),
(51, 'Enmauel Fonseca', 1, '(054) 9 99 9999-9999', NULL, 'enmanuel.fonseca@yahoo.com', 1, '2018-01-31 10:12:19', '(154) 1 11 1111-1111'),
(52, 'Humberto Moran', 1, '(054) 1 11 1111-1111', NULL, 'humberto.moran@gmail.com', 1, '2018-01-31 10:19:37', '(054) 2 22 2222-2222'),
(53, 'Xavi Hernandez', 1, '(054) 7 77 7777-7777', NULL, 'xavi.hernandez@yahoo.es', 1, '2018-01-31 10:24:30', '(054) 6 66 6666-6666'),
(54, 'Rigoberto Leal', 1, '(254) 2 22 2222-2222', NULL, 'rigoberto.leal@hotmail.com', 1, '2018-01-31 10:25:27', '(954) 9 99 9999-9999'),
(55, 'Florencia Coco', 2, '(054) 3 33 3333-3333', 16, 'florencia.coco@gmail.com', 1, '2018-01-31 10:39:02', '(054) 1 11 1111-1111'),
(56, 'Omar Vaquez', 2, '(054) 0 00 0000-0000', 13, 'omar.vasquez@gmail.com', 1, '2018-01-31 23:36:56', '(954) 9 99 9999-9999'),
(57, 'Paola Gonzalez', 2, '(154) 1 11 1111-1111', 13, 'paola.gonzalez@hotmail.com', 1, '2018-02-01 09:10:47', '(954) 9 99 9999-9999'),
(58, 'JORGE GUTIERREZ', 0, '12319283712', 0, 'adsaa@daas.djh', 1, '2018-02-07 01:28:05', '05491232132'),
(59, '8484845448841 65464848', 1, '(154) 1 11 1111-1111', NULL, '4494989@hotmail.com', 1, '2018-03-20 16:14:06', '(154) 1 11 1111-1111'),
(60, '654658464 654654654', 1, '(154) 1 11 2251-8504', NULL, 'angelgabrielceballos@gmail.com', 1, '2018-03-20 16:20:35', '(154) 1 11 2251-8504'),
(61, 'Pablo Landa', 2, '(054) 1 13 4163-576', 17, 'pablopablolandalanda@pablo.com', 1, '2018-03-21 20:43:07', '(054) 1 14 5555-5544'),
(62, 'juan perez', 1, '(154) 1 15 2251-8504', NULL, 'unico@gmail.com', 1, '2018-04-10 17:32:12', '(154) 1 15 2251-8504'),
(63, 'pablo marmol', 1, '(154) 1 11 1111-1111', NULL, 'marmol@gmail.com', 1, '2018-04-10 17:46:15', '(154) 1 11 1111-1111'),
(64, 'pedro perez', 1, '(154) 1 11 1111-1111', NULL, 'angel@gmail.com', 1, '2018-04-10 18:46:37', '(154) 1 11 1111-1111'),
(65, 'Adrian', 1, '(154) 1 11 1111-1111', NULL, 'adrian@gmail.com', 1, '2018-04-10 22:18:54', '(154) 1 11 1111-1111'),
(66, 'Claudia', 2, '(154) 1 11 1111-1111', 5, 'claudia@gmail.com', 1, '2018-04-10 22:20:31', '(154) 1 11 1111-1111'),
(67, 'Luis Roca', 2, '(354) 3 33 3333-3333', 0, 'luis.roca@gmail.com', 1, '2018-04-11 16:06:34', '(354) 3 33 3333-3333'),
(68, 'dd', 2, '', 2, 'fff@gfgg', 1, '2018-04-11 16:17:45', '9999999999999');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tickets`
--

CREATE TABLE `tb_tickets` (
  `idTicket` int(11) NOT NULL,
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
  `idTypeOfKeysKf` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'ID DE LOS TIPOS DE LLAVEROS A SOLICITAR',
  `idTypeDeliveryKf` int(11) DEFAULT NULL,
  `itemToDisabled` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'CODIGO Y TIPO DE LOS LLAVEROS A DAR DE BAJA',
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
  `isAprobatedAdmin` tinyint(4) DEFAULT '0',
  `isCancelTicket` tinyint(4) DEFAULT '0',
  `dateCancel` timestamp NULL DEFAULT NULL,
  `idTypeOfOptionKf` int(11) DEFAULT NULL COMMENT 'ID DEL TIPO DE SOLICITUD -ENCARGADO/OTRO/EDIFICIO',
  `idDepartmentKf` int(11) DEFAULT NULL COMMENT 'ID DEL DEPARTAMENTO',
  `idAdressKf` int(11) DEFAULT NULL COMMENT 'DIRECCION DEL TICKET',
  `dateAprovatedAdmin` timestamp NULL DEFAULT NULL,
  `idOtherKf` int(11) DEFAULT NULL COMMENT 'ID DEL ENGARGADO DE TIPO "Otro"',
  `idUserAttendantKfDelivery` int(11) DEFAULT NULL COMMENT 'ID DEL ENCARGADO QUE RECIBE LA LLAVE',
  `thirdPersonNames` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'NOMBRE DE LA TERCERA PERSONA QUE RECIBE O RETIRA',
  `thirdPersonPhone` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'TELEFONO DE LA TERCERA PERSONA',
  `thirdPersonId` int(11) DEFAULT NULL COMMENT 'DNI DE LA TERCERA PERSONA',
  `isNew` tinyint(4) DEFAULT NULL,
  `isChangueTypeSend` tinyint(4) DEFAULT NULL,
  `isAplicate` tinyint(4) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_tickets`
--

INSERT INTO `tb_tickets` (`idTicket`, `dateCreated`, `dateRecibedAdmin`, `dateRecibeCompany`, `idStatusTicketKf`, `codTicket`, `idTypeTicketKf`, `description`, `idRequestKf`, `idUserTenantKf`, `idUserAdminKf`, `idUserCompany`, `idUserEnterpriceKf`, `numberItemes`, `idTypeOfKeysKf`, `idTypeDeliveryKf`, `itemToDisabled`, `idOWnerKf`, `idTypeOuther`, `mailContactConsult`, `SA_NRO_ORDER`, `idReasonDisabledItemKf`, `descriptionOrder`, `idTypeServicesKf`, `totalService`, `addressConsul`, `idProfileKf`, `idOpcionLowTicketKf`, `idUserAttendantKf`, `idCompanyKf`, `isAprobatedAdmin`, `isCancelTicket`, `dateCancel`, `idTypeOfOptionKf`, `idDepartmentKf`, `idAdressKf`, `dateAprovatedAdmin`, `idOtherKf`, `idUserAttendantKfDelivery`, `thirdPersonNames`, `thirdPersonPhone`, `thirdPersonId`, `isNew`, `isChangueTypeSend`, `isAplicate`) VALUES
(1, '2018-02-14 07:46:44', NULL, NULL, 1, 'TK-00000117', 1, '', NULL, 22, 0, NULL, 0, 2, NULL, 2, NULL, 23, NULL, NULL, NULL, NULL, NULL, NULL, '350.00', NULL, NULL, NULL, 1, 1, 0, 0, NULL, NULL, 3, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, '2018-02-14 07:47:20', NULL, NULL, 1, 'TK-00000118', 1, '', NULL, 44, 0, NULL, 0, 1, NULL, 2, NULL, 23, NULL, NULL, NULL, NULL, NULL, NULL, '0.00', NULL, NULL, NULL, 3, 1, 0, 0, NULL, NULL, 12, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, '2018-02-14 07:58:16', NULL, NULL, 1, 'TK-00000120', 3, '', NULL, NULL, 0, 0, 17, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cambio de camara principal', NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, '2018-02-14 08:17:15', NULL, NULL, 1, 'TK-00000122', 4, 'Solicito que me hagan llegar la factura con el encargado del edificio', NULL, NULL, NULL, 0, 0, NULL, NULL, NULL, NULL, 23, 4, 'carlos.villalobos@gmail.com', NULL, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, '2018-02-14 16:36:36', NULL, NULL, 1, 'TK-00000123', 3, '', NULL, NULL, 30, 22, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Lector de Llave quemado.', NULL, NULL, NULL, NULL, NULL, NULL, 3, 0, 0, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, '2018-02-15 17:21:18', NULL, NULL, 2, 'TK-00000124', 1, '', NULL, 0, 0, NULL, 17, 1, NULL, 2, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, '250.00', NULL, NULL, NULL, 1, 1, 0, 0, NULL, 3, 0, 1, NULL, 31, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, '2018-02-15 17:24:03', NULL, NULL, 2, 'TK-00000125', 1, '', NULL, 0, 0, NULL, 17, 1, NULL, 2, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, '250.00', NULL, NULL, NULL, 1, 1, 0, 0, NULL, 1, 0, 1, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, '2018-02-15 21:57:15', NULL, NULL, 2, 'TK-00000126', 1, '', NULL, 0, 30, NULL, 0, 1, NULL, 2, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, '0.00', NULL, NULL, NULL, 3, 1, 0, 0, NULL, 2, 0, 2, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, '2018-02-15 22:06:22', NULL, NULL, 2, 'TK-00000127', 1, '', NULL, 0, 0, NULL, 17, 1, NULL, 2, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, '250.00', NULL, NULL, NULL, 1, 1, 0, 0, NULL, 3, 0, 1, NULL, 32, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, '2018-02-15 23:25:41', NULL, NULL, 2, 'TK-00000128', 1, '', NULL, 0, 0, NULL, 17, 1, NULL, 2, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, '0.00', NULL, NULL, NULL, 3, 1, 0, 0, NULL, 3, 0, 2, NULL, 37, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, '2018-02-16 03:23:06', NULL, NULL, 2, 'TK-00000129', 1, '', NULL, 22, 0, NULL, 0, 1, NULL, 2, NULL, 23, NULL, NULL, NULL, NULL, NULL, NULL, '250.00', NULL, NULL, NULL, 1, 0, 0, 0, NULL, NULL, 2, 1, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, '2018-02-16 03:31:10', NULL, NULL, 2, 'TK-00000130', 1, '', NULL, 22, 0, NULL, 0, 1, NULL, 2, NULL, 23, NULL, NULL, NULL, NULL, NULL, NULL, '250.00', NULL, NULL, NULL, 1, 1, 0, 0, NULL, NULL, 3, 1, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, '2018-02-16 04:54:41', NULL, NULL, 2, 'TK-00000131', 3, '', NULL, NULL, 0, 22, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'CAmbio', NULL, NULL, NULL, NULL, NULL, NULL, 3, 0, 0, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, '2018-02-16 08:29:59', NULL, NULL, 2, 'TK-00000132', 3, '', NULL, NULL, 0, 22, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Defectuoso', NULL, NULL, NULL, NULL, NULL, NULL, 3, 0, 0, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(19, '2018-02-16 08:40:07', NULL, NULL, 2, 'TK-00000135', 4, 'Prueba', NULL, NULL, NULL, 22, 0, NULL, NULL, NULL, NULL, 0, 4, 'luis.carreno@coca-cola.com', NULL, NULL, NULL, NULL, NULL, '5', NULL, NULL, NULL, 3, 0, 0, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(20, '2018-02-17 02:31:58', NULL, NULL, 2, 'TK-00000136', 3, '', NULL, NULL, 33, 17, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '411', NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 1, '2018-02-16 14:35:10', NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(21, '2018-03-23 18:26:44', NULL, NULL, 2, 'TK-00000137', 3, 'H6H6H6H66H6H6HHH6', NULL, NULL, 31, 17, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'HH6H6H6H6H6HH666H66HH6H6H6', NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(22, '2018-04-10 23:09:47', NULL, NULL, 2, 'TK-00000138', 2, 'robo', NULL, 63, 0, NULL, 40, 1, NULL, NULL, '456666', 0, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 2, 1, 0, 0, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(23, '2018-04-10 23:13:04', NULL, NULL, 2, 'TK-00000139', 3, 'ohjklñjklñ', NULL, NULL, 31, 39, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'hkblñhj', NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(24, '2018-04-10 23:17:06', NULL, NULL, 2, 'TK-00000140', 4, 'consulta', NULL, NULL, NULL, NULL, 40, NULL, NULL, NULL, NULL, 0, 3, 'leandro@gmail.com', NULL, NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(25, '2018-06-13 01:54:58', NULL, NULL, 2, 'TK-00000142', 1, '', NULL, 60, 31, NULL, 0, 1, NULL, 2, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, '250.00', NULL, NULL, NULL, 0, 1, 0, 0, NULL, NULL, 0, 1, NULL, 0, 60, '', '', 0, NULL, NULL, NULL),
(26, '2018-07-25 04:38:51', NULL, NULL, 2, 'TK-00000148', 2, '', NULL, NULL, 0, NULL, 0, 1, NULL, NULL, '{\"n1\":\"1111\",\"tk1\":\"1\"}', 23, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
(5, 'ADMINISTRATIVAS'),
(6, 'SEGURIDAD');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_type_services`
--

CREATE TABLE `tb_type_services` (
  `idTypeServices` int(11) NOT NULL,
  `typeServices` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `SA_ID_TYPE` int(11) DEFAULT NULL
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
  `passwordUser` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `idProfileKf` int(11) UNSIGNED DEFAULT NULL,
  `dateCreated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `idCompanyKf` int(11) DEFAULT NULL,
  `resetPasword` tinyint(4) DEFAULT '0',
  `idAddresKf` int(11) DEFAULT NULL,
  `idTyepeAttendantKf` int(11) UNSIGNED DEFAULT NULL COMMENT 'TIPO DE ENCARGADO',
  `descOther` text COLLATE utf8_spanish2_ci COMMENT 'ENCARGADO DE TIPO OTRO',
  `idDepartmentKf` int(11) DEFAULT NULL COMMENT 'DEPARTAMENTO DE EL INQUILINO O PROPIETARIO',
  `isEdit` tinyint(11) DEFAULT '0',
  `requireAuthentication` tinyint(11) DEFAULT '1',
  `idTypeTenantKf` int(11) DEFAULT NULL,
  `idStatusKf` int(11) UNSIGNED DEFAULT NULL,
  `tokenMail` varchar(300) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `isConfirmatedMail` tinyint(4) DEFAULT '0',
  `SA_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_user`
--

INSERT INTO `tb_user` (`idUser`, `fullNameUser`, `emailUser`, `phoneNumberUser`, `phoneLocalNumberUser`, `passwordUser`, `idProfileKf`, `dateCreated`, `idCompanyKf`, `resetPasword`, `idAddresKf`, `idTyepeAttendantKf`, `descOther`, `idDepartmentKf`, `isEdit`, `requireAuthentication`, `idTypeTenantKf`, `idStatusKf`, `tokenMail`, `isConfirmatedMail`, `SA_ID`) VALUES
(22, 'Luis Carreño', 'luis.carreno@coca-cola.com', '1199887766', '1144556677', '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 3, '2017-10-26 21:17:25', 3, 0, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, NULL, 0, NULL),
(23, 'Carlos Villalobos', 'carlos.villalobos@gmail.com', '91124564564', '1123453534', '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 3, '2017-11-23 03:28:25', NULL, 0, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1, NULL, 1, NULL),
(24, 'prueba editada', 'prueba', 'prueba', '123', '32e7092ddccc9af07299d6e8dac6fe731c6572d2', 1, '2017-11-23 08:36:20', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0, NULL),
(25, 'Jose Gomez', 'jose.gomez@gmail.com', '113443663346', '116678885464', '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 3, '2017-11-24 20:47:25', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, NULL),
(27, 'prueba de registro', 'prueba@prueba.com.ar', '(154) 2 32 1321-3213', '(254) 1 31 3213-1322', '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 3, '2018-01-26 06:26:01', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, NULL),
(28, 'Xavi Hernandez', 'xavi.hernandez@yahoo.es', '(454) 4 44 4444-4444', '(854) 8 88 8888-8888', '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 4, '2018-01-31 10:34:09', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, NULL),
(29, 'Humberto Moran', 'humberto.moran@gmail.com', '(054) 1 11 1111-1111', '(054) 2 22 2222-2222', '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 3, '2018-01-31 23:35:07', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, NULL),
(30, 'developer 1', 'developer1@gmail.com', '91145545435', '9115464566', '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 4, '2018-02-11 18:50:25', 1, 0, 1, NULL, NULL, NULL, 1, NULL, NULL, 1, NULL, 1, NULL),
(31, 'admin sistema', 'soporte@coferba.com.ar', '(054) 9 11 2323-2323', '(054) 9 11 2343-2324', 'fe703d258c7ef5f50b71e06565a65aa07194907f', 1, '2018-02-16 15:01:22', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 1, NULL),
(33, 'Gabriel Gamez', 'angelgabrielceballos@gmail.com', '(154) 1 11 2251-8504', '(154) 1 11 2251-8504', 'fe703d258c7ef5f50b71e06565a65aa07194907f', 3, '2018-03-20 16:20:35', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, NULL),
(35, 'Dario Tejada', 'drotejada@gmail.com', '(154) 1 11 1111-1111', '(154) 1 11 1111-1111', '2ae3d88f02f83ac3d4e5f74533e26d8cad86e4c5', 4, '2018-03-21 20:26:03', 2, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0, NULL),
(36, 'juan perez', 'unico@gmail.com', '(154) 1 15 2251-8504', '(154) 1 15 2251-8504', '26cf693eaa24a8c39e5dc92e06085058a3714f53', 3, '2018-04-10 17:32:12', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0, NULL),
(37, 'pablo marmol', 'marmol@gmail.com', '(154) 1 11 1111-1111', '(154) 1 11 1111-1111', '4394a732285f1875b62bdb074d7fe33acb519ed9', 3, '2018-04-10 17:46:15', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0, NULL),
(38, 'dario tejada', 'drotejada@gmail.com', '(154) 1 11 1111-1111', '(154) 1 11 1111-1122', '2432c46a664bdc63e4b6dbca654c509fbae10a89', 4, '2018-04-10 18:31:35', 2, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0, NULL),
(39, 'dario tejada', 'drotejada@gmail.com', '(154) 1 11 1111-1111', '(154) 1 11 1111-1111', '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 4, '2018-04-10 18:50:26', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, NULL),
(40, 'leandro figueroa', 'leandro@gmail.com', '(154) 1 11 1111-1111', '(154) 1 11 1111-1111', 'b9ca47c97508bf3d22aed0d806d923c2917c3e6e', 4, '2018-04-10 18:54:02', 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, NULL),
(41, 'Luis Roca', 'luis.roca@gmail.com', '(354) 3 33 3333-3333', '(354) 3 33 3333-3333', '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 3, '2018-04-11 16:06:33', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, NULL),
(59, 'David Rincon', 'rexx84@gmail.com', '91122343243', '1123432432', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 5, '2018-06-13 01:40:52', 1, 0, 1, NULL, NULL, 10, 1, NULL, 2, 1, '27UHl1IEJS', 1, NULL),
(60, 'Alberto Ramirez', 'aramirez@gmail.com', '91132483284', '1132832828', 'fe703d258c7ef5f50b71e06565a65aa07194907f', 6, '2018-06-13 01:49:30', 1, 0, 1, 2, NULL, 1, 1, 1, 1, 0, 'cmMSoqouKR', 0, NULL),
(62, 'Eduardo Rincon Luengo', 'davideduardo.luengo@hotmail.com', '44444444444', '2222222222', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 5, '2018-06-13 02:57:41', 1, 0, 2, NULL, NULL, 13, 1, NULL, 2, 1, 'BheFrB8hfP', 1, NULL),
(63, 'Luis Ochoa', 'lochoa@asdsadsad.com', '91123432435', '1123324327', 'fe703d258c7ef5f50b71e06565a65aa07194907f', 5, '2018-06-14 06:31:08', 1, 1, 1, NULL, NULL, 1, 1, NULL, 2, 0, 'AJxBPluqqW', 0, NULL),
(64, 'Jose Gomez', 'jgomez@asdsadasda.com', '91231231232', '1123424324', 'fe703d258c7ef5f50b71e06565a65aa07194907f', 3, '2018-06-14 15:03:58', 1, 1, NULL, NULL, NULL, NULL, 1, NULL, 1, 0, 'Eb8XX9rcdd', 0, NULL),
(65, 'Horacio Alcantara', 'halcantara@sadsad.com', '91132432432', '1121324324', 'fe703d258c7ef5f50b71e06565a65aa07194907f', 5, '2018-06-14 15:16:37', 1, 1, NULL, NULL, NULL, 14, 1, NULL, 2, 0, 'c2nV3lzEWr', 0, NULL),
(66, 'Juan Lopez', 'jlopez@dsfdfs.com', '', '7647657657', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 5, '2018-06-14 18:15:32', 1, 1, 1, NULL, NULL, 2, 1, NULL, 2, 0, 'E7bnE5SWNv', 0, NULL),
(67, 'Paul Asicovich', 'pasicovich@fdsfds.com', '91145645645', '1121423432', 'fe703d258c7ef5f50b71e06565a65aa07194907f', 6, '2018-06-24 03:06:16', 1, 1, 2, 2, NULL, 18, 1, 1, 1, 0, 'PZebUfTQzu', 0, NULL),
(68, 'Fernando Acuña', 'facuna@gmail.com', '91134545454', '1123423432', '67a74306b06d0c01624fe0d0249a570f4d093747', 6, '2018-06-24 03:42:40', 1, 1, 2, 1, 'Carpintero', 0, 1, 0, 0, 0, 'mohcEp1Q07', 0, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tb_addres`
--
ALTER TABLE `tb_addres`
  ADD PRIMARY KEY (`idAdress`);

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
-- Indices de la tabla `tb_company_type_keychains`
--
ALTER TABLE `tb_company_type_keychains`
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`idTenant`) USING BTREE;

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
  ADD PRIMARY KEY (`idUser`),
  ADD KEY `idProfileKf` (`idProfileKf`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tb_addres`
--
ALTER TABLE `tb_addres`
  MODIFY `idAdress` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
-- AUTO_INCREMENT de la tabla `tb_company_type_keychains`
--
ALTER TABLE `tb_company_type_keychains`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `idParam` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `tb_tenant`
--
ALTER TABLE `tb_tenant`
  MODIFY `idTenant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT de la tabla `tb_tickets`
--
ALTER TABLE `tb_tickets`
  MODIFY `idTicket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

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
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tb_user`
--
ALTER TABLE `tb_user`
  ADD CONSTRAINT `tb_user_ibfk_1` FOREIGN KEY (`idProfileKf`) REFERENCES `tb_profile` (`idProfile`) ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
