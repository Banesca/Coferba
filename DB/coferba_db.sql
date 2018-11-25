-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-11-2018 a las 18:24:17
-- Versión del servidor: 10.1.34-MariaDB
-- Versión de PHP: 7.0.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `coferba_db`
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
  `IdSecurityCode` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL COMMENT 'Codigo de verificacion para mostrar direccion a propietarios/inquilinos',
  `SA_ID_COMPANY` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Volcado de datos para la tabla `tb_addres`
--

INSERT INTO `tb_addres` (`idAdress`, `nameAdress`, `idCompanyKf`, `priceUni`, `priceManagement`, `priceShipping`, `IdSecurityCode`, `SA_ID_COMPANY`) VALUES
(1, 'Cramer 1275', 1, '100.00', '0.00', '150.00', '', NULL),
(2, 'Blanco Encalada 2355', 1, '0.00', '0.00', '0.00', '1234533', NULL),
(3, 'Cabildo 3510', 2, '0.00', '0.00', '0.00', '12359', NULL),
(4, 'Gral. La valle 1920', 2, '0.00', '0.00', '0.00', '123522', NULL),
(5, 'Parana 2568', 3, '0.00', '0.00', '0.00', '12345211', NULL),
(6, 'Rivadavia 4530', 3, '0.00', '0.00', '0.00', '1235667', NULL),
(11, 'DIRECCION DE PRUEBA', 5, '110.00', '260.00', '170.00', '1234123', 595),
(12, 'DIRECCION DE PRUEBA 2', 5, '260.00', '0.00', '310.00', '1231223', 596);

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
(1, 'Carlos Castaño', NULL, 'servicios@carloscastanoooo.com', 'pedidos@carloscastanoooo.com', 'admin@carloscastanoooo.com', 1),
(2, 'Talcahuano Propiedades', NULL, 'servicio@talcahuanossss.com', 'pedidos@talcahuanossss.com', 'admin@talcahuanossss.com', 1),
(3, 'Toyota', NULL, 'servicio@toyotaa.com', 'Pedidos@toyotaa.com', 'admin@toyotaa.com', 1),
(5, 'ADMINISTRACION DE PRUEBA', 686, 'angelgabrielceballos@gmail.com', 'angelgabrielceballos@gmail.com', 'angelgabrielceballos@gmail.com', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_company_type_keychains`
--

CREATE TABLE `tb_company_type_keychains` (
  `idKey` int(11) UNSIGNED NOT NULL,
  `idAddressKf` int(11) DEFAULT NULL,
  `item` varchar(200) DEFAULT NULL,
  `value` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_company_type_keychains`
--

INSERT INTO `tb_company_type_keychains` (`idKey`, `idAddressKf`, `item`, `value`) VALUES
(1, 11, 'Llaveros', '50'),
(2, 11, 'Sticket Vehicular', '75'),
(3, 11, 'Credencial Movil', '100'),
(4, 12, 'Llaveros', '80'),
(5, 12, 'Sticket Vehicular', '100'),
(6, 5, 'Credencial Movil', '80'),
(7, NULL, NULL, NULL);

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
  `isRequesLowByProp` tinyint(4) DEFAULT '0',
  `SA_ID_DEPARMENT` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_department`
--

INSERT INTO `tb_department` (`idDepartment`, `idAdressKf`, `departmentFloor`, `deparmentNumber`, `deparmentDescription`, `idStatusKf`, `idUserAdminRKf`, `idUserAdminPropietariKf`, `idUserKf`, `isAprobatedAdmin`, `isRequesLowByProp`, `SA_ID_DEPARMENT`) VALUES
(1, 1, 'Porteria', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(2, 1, '1-A', 0, '', 1, 1, NULL, 75, 1, 0, NULL),
(3, 1, '1-B', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(4, 1, '2-A', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(5, 1, '2-B', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(6, 1, '3-A', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(7, 1, '3-B', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(8, 1, '4-A', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(9, 1, '4-B', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(10, 1, '5-A', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(11, 1, '5-B', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(12, 2, '6-A', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(13, 2, '6-B', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(14, 2, '7-A', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(15, 2, '7-B', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(16, 2, '8-A', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(17, 3, '8-B', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(18, 2, 'Porteria', 0, NULL, 1, 1, NULL, NULL, 0, 0, NULL),
(19, 3, 'Porteria', 0, NULL, 1, 1, NULL, NULL, 0, 0, NULL),
(100, 11, '01-A', NULL, NULL, NULL, NULL, NULL, 52, 1, 0, 14143),
(101, 11, '01-B', NULL, NULL, NULL, NULL, NULL, 51, 1, 0, 14144),
(102, 11, '01-C', NULL, NULL, NULL, NULL, NULL, 76, 1, 0, 14145),
(103, 11, '02-A', NULL, NULL, NULL, NULL, NULL, 60, 1, 0, 14146),
(104, 11, '02-B', NULL, NULL, NULL, NULL, NULL, 51, 1, 0, 14147),
(105, 11, '02-C', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14148),
(106, 11, '03-A', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14149),
(107, 11, '03-B', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14150),
(108, 11, '03-C', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14151),
(109, 11, '04-A', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14152),
(110, 11, '04-B', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14153),
(111, 11, '04-C', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14154),
(112, 11, '05-A', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14155),
(113, 11, '05-B', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14156),
(114, 11, '05-C', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14157),
(115, 11, 'PB-A', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14158),
(116, 12, 'PB-01', NULL, NULL, NULL, NULL, NULL, 72, 1, 0, 14159),
(117, 12, 'PB-02', NULL, NULL, NULL, NULL, NULL, 72, 1, 0, 14160),
(118, 12, '01-01', NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 14161),
(119, 12, '01-02', NULL, NULL, NULL, NULL, NULL, 56, 1, 0, 14162),
(120, 12, '02-01', NULL, NULL, NULL, NULL, NULL, 56, 1, 0, 14163),
(121, 12, '02-02', NULL, NULL, NULL, NULL, NULL, 76, 1, 0, 14164),
(122, 12, '03-01', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14165),
(123, 12, '03-02', NULL, NULL, NULL, NULL, NULL, 70, 1, 0, 14166),
(124, 12, '04-01', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14167),
(125, 12, '04-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14168),
(126, 12, '05-01', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14169),
(127, 12, '05-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14170),
(128, 12, '06-01', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14171),
(129, 12, '06-02', NULL, NULL, NULL, NULL, NULL, 56, 1, 0, 14172),
(130, 12, '07-01', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14173),
(131, 12, '07-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14174),
(132, 12, '08-01', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14175),
(133, 12, '08-02', NULL, NULL, NULL, NULL, NULL, 56, 1, 0, 14176),
(134, 12, '09-01', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14177),
(135, 12, '09-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14178),
(136, 12, '10-01', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14179),
(137, 12, '10-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14180),
(138, 12, '11-ENCARGADO', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14181),
(139, 12, 'ADM-ADM', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14182);

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
(1, '215', 'TK');

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
(1, 'sistemaonline@coferba.com.ar', 'USUARIO SMT MAIL'),
(2, 'Sistema2018Online', 'CLAVE SMT MAIL'),
(6, '20:00', 'HORA DE MAIL DE VERIFICACION DE MAIL PARA ADMINISTRADORES DE CONSORCIO'),
(7, 'ventas@coferba.com.ar', 'MAIL DE VENTAS'),
(8, 'tecnica@coferba.com.ar', 'MAIL SERVICO TECNICO'),
(9, 'cobranzas@coferba.com.ar', 'MAIL FACTURACION'),
(10, 'administracion@coferba.com.ar', 'MAIL ADMINISTRATIVO'),
(11, 'ULTIMA CONEXION SISTEMA ADMIN', '00:00:00');

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
  `idTypeServicesKf` int(11) DEFAULT NULL COMMENT 'ID DEL TIPO SERVICIO SOBRE EL CUAL SE SOLICITA EL SERVICIO TECNICO',
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
  `isAplicate` tinyint(4) DEFAULT NULL,
  `sendUserNotification` tinyint(4) DEFAULT NULL COMMENT 'Autorizar a notificar y permitir visualizar pedido al usuario o empresa'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_tickets`
--

INSERT INTO `tb_tickets` (`idTicket`, `dateCreated`, `dateRecibedAdmin`, `dateRecibeCompany`, `idStatusTicketKf`, `codTicket`, `idTypeTicketKf`, `description`, `idRequestKf`, `idUserTenantKf`, `idUserAdminKf`, `idUserCompany`, `idUserEnterpriceKf`, `numberItemes`, `idTypeOfKeysKf`, `idTypeDeliveryKf`, `itemToDisabled`, `idOWnerKf`, `idTypeOuther`, `mailContactConsult`, `SA_NRO_ORDER`, `idReasonDisabledItemKf`, `descriptionOrder`, `idTypeServicesKf`, `totalService`, `addressConsul`, `idProfileKf`, `idOpcionLowTicketKf`, `idUserAttendantKf`, `idCompanyKf`, `isAprobatedAdmin`, `isCancelTicket`, `dateCancel`, `idTypeOfOptionKf`, `idDepartmentKf`, `idAdressKf`, `dateAprovatedAdmin`, `idOtherKf`, `idUserAttendantKfDelivery`, `thirdPersonNames`, `thirdPersonPhone`, `thirdPersonId`, `isNew`, `isChangueTypeSend`, `isAplicate`, `sendUserNotification`) VALUES
(51, '2018-11-17 01:55:17', NULL, NULL, 2, 'TK-00000204', 1, NULL, NULL, 72, 31, NULL, 0, 2, '{\"keys\":[{\"idKeyKf\":\"4\",\"keyQty\":1},{\"idKeyKf\":\"5\",\"keyQty\":1}]}', 1, 'null', 0, NULL, NULL, NULL, NULL, NULL, NULL, '180.00', NULL, 0, NULL, 0, 5, 0, 0, NULL, NULL, 116, 12, NULL, 0, NULL, NULL, NULL, NULL, 1, NULL, NULL, 0),
(52, '2018-11-19 02:56:43', NULL, NULL, 2, 'TK-00000205', 3, 'adadsdsa', NULL, NULL, 31, NULL, 0, NULL, 'null', NULL, 'null', NULL, NULL, NULL, NULL, NULL, 'asdasdasd', NULL, NULL, NULL, NULL, NULL, NULL, 5, 0, 0, NULL, NULL, NULL, 11, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1),
(53, '2018-11-19 03:01:46', NULL, NULL, 2, 'TK-00000206', 3, 'Prueba', NULL, NULL, 31, NULL, 0, NULL, 'null', NULL, 'null', NULL, NULL, NULL, NULL, NULL, 'Prueba', 2, NULL, NULL, NULL, NULL, NULL, 5, 0, 0, NULL, NULL, NULL, 12, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1),
(54, '2018-11-19 04:15:29', NULL, NULL, 2, 'TK-00000207', 1, NULL, NULL, 76, 0, NULL, 0, 2, '{\"keys\":[{\"idKeyKf\":\"4\",\"keyQty\":1},{\"idKeyKf\":\"5\",\"keyQty\":1}]}', 1, 'null', 76, NULL, NULL, NULL, NULL, NULL, NULL, '180.00', NULL, 3, NULL, 0, 5, 0, 0, NULL, NULL, 121, 12, NULL, 0, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL),
(55, '2018-11-22 01:15:43', NULL, NULL, 2, 'TK-00000208', 1, NULL, NULL, 61, 31, NULL, 0, 11, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"3\",\"keyQty\":1}]}', 2, 'null', 0, NULL, NULL, NULL, NULL, NULL, NULL, '580.00', NULL, 0, NULL, 0, 5, 0, 0, NULL, NULL, 100, 11, NULL, 0, 51, NULL, NULL, NULL, 1, NULL, NULL, 1),
(56, '2018-11-22 02:30:21', NULL, NULL, 2, 'TK-00000209', 1, NULL, NULL, 70, 31, NULL, 0, 1, '{\"keys\":[{\"idKeyKf\":\"4\",\"keyQty\":1}]}', 2, 'null', 0, NULL, NULL, NULL, NULL, NULL, NULL, '390.00', NULL, 0, NULL, 0, 5, 0, 0, NULL, NULL, 123, 12, NULL, 0, NULL, 'Gabriel Gomez', '91123343434', 30945888, 1, NULL, NULL, 1),
(57, '2018-11-22 02:49:09', NULL, NULL, 2, 'TK-00000210', 1, NULL, NULL, 73, 0, NULL, 0, 1, '{\"keys\":[{\"idKeyKf\":\"4\",\"keyQty\":1}]}', 2, 'null', 0, NULL, NULL, NULL, NULL, NULL, NULL, '390.00', NULL, 5, NULL, 0, 5, 0, 0, NULL, NULL, 116, 12, NULL, 0, 64, NULL, NULL, NULL, 1, NULL, NULL, NULL),
(58, '2018-11-22 03:17:29', NULL, NULL, 2, 'TK-00000211', 1, NULL, NULL, 71, 0, NULL, 0, 11, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"3\",\"keyQty\":1}]}', 2, 'null', 0, NULL, NULL, NULL, NULL, NULL, NULL, '580.00', NULL, 5, NULL, 0, 5, 0, 0, NULL, NULL, 102, 11, NULL, 0, 67, NULL, NULL, NULL, 1, NULL, NULL, NULL),
(59, '2018-11-24 02:57:26', NULL, NULL, 2, 'TK-00000212', 1, NULL, NULL, 0, 31, NULL, 0, 1, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 2, 'null', 0, NULL, NULL, NULL, NULL, NULL, NULL, '480.00', NULL, 0, NULL, 0, 5, 0, 0, NULL, 2, 0, 11, NULL, 0, 68, NULL, NULL, NULL, 1, NULL, NULL, 0),
(60, '2018-11-24 03:05:42', NULL, NULL, 2, 'TK-00000213', 1, NULL, NULL, 0, 31, NULL, 0, 1, '{\"keys\":[{\"idKeyKf\":\"4\",\"keyQty\":1}]}', 1, 'null', 0, NULL, NULL, NULL, NULL, NULL, NULL, '80.00', NULL, 1, NULL, 0, 5, 0, 0, NULL, 2, 0, 12, NULL, 0, NULL, NULL, NULL, NULL, 1, NULL, NULL, 0),
(61, '2018-11-24 03:08:21', NULL, NULL, 2, 'TK-00000214', 1, NULL, NULL, 0, 0, NULL, 74, 1, '{\"keys\":[{\"idKeyKf\":\"4\",\"keyQty\":1}]}', 2, 'null', 0, NULL, NULL, NULL, NULL, NULL, NULL, '390.00', NULL, 4, NULL, 0, 5, 0, 0, NULL, 2, 0, 12, NULL, 0, 64, NULL, NULL, NULL, 1, NULL, NULL, NULL),
(62, '2018-11-24 03:13:18', NULL, NULL, 2, 'TK-00000215', 1, NULL, NULL, 0, 0, NULL, 74, 1, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 1, 'null', 0, NULL, NULL, NULL, NULL, NULL, NULL, '310.00', NULL, 4, NULL, 0, 5, 0, 0, NULL, 2, 0, 11, NULL, 0, NULL, 'Fran Marquez', '91293213213', 95490931, 1, NULL, NULL, NULL),
(50, '2018-11-17 00:30:47', NULL, NULL, 2, 'TK-00000203', 3, NULL, NULL, NULL, 31, NULL, 0, NULL, 'null', NULL, 'null', NULL, NULL, NULL, NULL, NULL, 'Por favor cambiar camara de entrada al edificio', NULL, NULL, NULL, NULL, NULL, NULL, 5, 0, 0, NULL, NULL, NULL, 11, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1);

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
(2, 'ENTREGA EN EL EDIFICIO', NULL);

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
(3, 'FACTURACION'),
(4, 'ADMINISTRATIVAS'),
(5, 'SEGURIDAD');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_type_services`
--

CREATE TABLE `tb_type_services` (
  `idTypeServices` int(11) NOT NULL,
  `typeServices` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `SA_ID_TYPE` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_type_services`
--

INSERT INTO `tb_type_services` (`idTypeServices`, `typeServices`, `SA_ID_TYPE`) VALUES
(1, 'Cambio de Camara', NULL),
(2, 'Cambio de Lector de llave HID', NULL),
(3, 'Cambio de Cerradura Electromagnetica', NULL),
(4, 'Cambio de Lector de llave HID', NULL),
(5, 'Cambio de Molinete', NULL),
(6, 'Cambio de Control de Acceso', NULL);

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
  `isDepartmentApproved` tinyint(4) DEFAULT NULL COMMENT 'APROBADO O NO  EL DEPARTAMENTO DEL INQUILINO',
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

INSERT INTO `tb_user` (`idUser`, `fullNameUser`, `emailUser`, `phoneNumberUser`, `phoneLocalNumberUser`, `passwordUser`, `idProfileKf`, `dateCreated`, `idCompanyKf`, `resetPasword`, `idAddresKf`, `idTyepeAttendantKf`, `descOther`, `idDepartmentKf`, `isDepartmentApproved`, `isEdit`, `requireAuthentication`, `idTypeTenantKf`, `idStatusKf`, `tokenMail`, `isConfirmatedMail`, `SA_ID`) VALUES
(31, 'admin sistema', 'soporte@coferba.com.ar', '(054) 9 11 2323-2323', '(054) 9 11 2343-2324', 'fe703d258c7ef5f50b71e06565a65aa07194907f', 1, '2018-02-16 12:01:22', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 1, NULL),
(51, 'Eduardo Luengo', 'davideduardo.luegoss@hotmail.com', '33333333333333', '22222222222222', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 6, '2018-09-22 22:58:14', 5, 0, 11, 2, NULL, 104, NULL, 0, 1, 1, 1, 'kwOVz7xSJ9', 1, NULL),
(52, 'David Rincon', 'rexx84@gmail.com', '222222222222222', '12321321321', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 3, '2018-09-22 23:18:08', 5, 0, 11, NULL, NULL, NULL, NULL, 0, NULL, 1, 1, 'SeA7VYdpQj', 1, NULL),
(53, 'Fernando Chacon', 'fchacon@asdasddsa.com', '1111111111111111', '12321321313', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 5, '2018-09-26 21:02:24', 5, 0, 11, NULL, NULL, 101, 1, 0, NULL, 2, 1, 'oBIkWeeWA1', 1, NULL),
(54, 'Emiliano Kasieri', 'emiliano@dadsdsad.com', '11111111111111111', '1231232133', '2865258e4c3c988ffd09ace858c1ff259e7c8ce3', 2, '2018-09-29 00:25:00', 5, 1, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, 1, '3V0ruqQUKq', 1, NULL),
(55, 'Roberto Caceres', 'roberto@dadasd.com', '111111111111', '12321321321312', 'f4bb4469fe14e2a95692d771c985fe90ee887888', 2, '2018-09-29 03:16:16', 5, 1, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, 1, 'NCW12A3TBf', 1, NULL),
(56, 'Alejandro Garcia', 'alejandro@dadasds.com', '22222222222222', '111111111111111', '1a3fd04aed13f43b0b7f34452b819d6c5ccad7fe', 6, '2018-09-29 03:41:38', 5, 1, 12, 3, NULL, 133, 1, 1, NULL, 2, 1, 'BnXuX7nAwW', 1, NULL),
(57, 'David Rincon', 'davideduardo.luengoooo@hotmail.com', '112222223433', '112322332323', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 4, '2018-10-01 19:12:54', 5, 0, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, 1, 'PED8IQpNow', 1, NULL),
(58, 'Jorgasdasd', 'sdasds@asdas', '2123213131232213213232132', '213213213', 'eaa07189e6e7c4bf1897a69c5d0e6a1e1931173e', 3, '2018-10-01 19:17:31', 5, 1, 11, NULL, NULL, NULL, NULL, 1, NULL, 1, 1, 'LYPCjjCble', 1, NULL),
(59, 'sadsadasdsa', 'asdasdsad@qwdeasd.com', '', '213213123231233123123123', '6a5e737ea7866e8562e8cc7e2789a70878479420', 5, '2018-10-01 19:18:36', NULL, 1, NULL, NULL, NULL, NULL, NULL, 1, NULL, 2, 1, 'hxXbHUK7CI', 1, NULL),
(60, 'Veronica Calelo', 'rexx84213231@gmail.com', '1212322121322132132132132', '2132132133', '6036284a14eb3dee8a6335c906afc3426d8d9b50', 3, '2018-10-01 19:22:07', 5, 1, 11, NULL, NULL, NULL, NULL, 1, NULL, 1, 1, '0PHfV4Szaa', 1, NULL),
(61, 'Genesis Carmon', 'genesiscarmona@asdasdasd.com', '22222222222', '12313123313', '7b72317635557fbf9e4ff338626d6823d444d3ce', 5, '2018-10-01 19:42:09', 5, 1, 11, NULL, NULL, 100, 1, 1, NULL, 2, 1, 'PeC8q6KTj7', 0, NULL),
(62, 'Fernando Gutierrez', 'fgutierrez@asdasds.com', '', '123213213123', '3888373256ed2bf1b0a9801b710112f5653811c6', 5, '2018-10-01 19:50:23', 5, 1, 11, NULL, NULL, 104, 1, 1, NULL, 2, 1, 'kUdKO4y7Xn', 0, NULL),
(63, 'qwewqewqewqe', '2143213213123@sdsadsad', '', '21321321321', '3f9d1caac6722358bb7a80c69908af838dd6488d', 5, '2018-10-01 19:57:59', 5, 1, 12, NULL, NULL, 123, 1, 1, NULL, 2, 1, 'yDO32axeqq', 0, NULL),
(64, 'Indira Lugo', 'indiralugo@asdadd.com', '119293484938492', '11213232432444444', '73c046f679e99054c5e37c710b62f74689d5bd3d', 6, '2018-10-01 21:37:56', 5, 1, 12, 2, NULL, NULL, NULL, 1, 0, 0, 1, 'HhD0rv198f', 1, NULL),
(65, 'Rafito los palotes', 'rafito@sadsadasd', '', '2132121323', '3912557543073a3d02e08da924b83d67d874c42f', 5, '2018-10-01 21:59:24', 5, 1, 11, NULL, NULL, 108, 1, 1, NULL, 2, 1, 'IfpVRYaTpL', 0, NULL),
(66, 'Chachi', 'chachi@asdasd', '', '123213213213', 'cef31d07664d5b1d6e348a76fd2268460fd00bcf', 5, '2018-10-01 21:59:58', 5, 1, 11, NULL, NULL, 108, 1, 1, NULL, 2, 1, 'qEUZlR5qKF', 0, NULL),
(67, 'Gabriel Vasquez', 'gvasquez@asdsadad.com', '11111111111111111', '123123213213213', '75c67600afe762574121e418bf9456761a17b7d9', 6, '2018-10-01 22:31:25', 5, 1, 11, 2, NULL, NULL, NULL, 1, 0, 0, 1, 'pF2rzYLAWl', 1, NULL),
(68, 'Alfonzo Marquez', 'amarquez@asdsadsad.com', '11111111111111111111', '1123213213213213', 'b403c087637dabe8b511636784292052e4698f88', 6, '2018-10-02 01:45:08', 5, 1, 11, 3, NULL, 112, 1, 1, NULL, 2, 1, '20ymbCMJOn', 1, NULL),
(69, 'Fernando Carrasco', 'fcarrasco@dasdsadasd.com', '1231232132132132132133213', '1232132132132132132132132', 'edd928aca114215182458cd67203e7b150bf1fbe', 5, '2018-10-09 18:02:39', 5, 1, 11, NULL, NULL, 100, 1, 1, NULL, 2, 1, 'xKG0pux1CM', 0, NULL),
(70, 'Jairo Gomez', 'jgomez@dasdsadasdsa.com', '123283823232939233', '112112112123213213', '9b0c7294db056f5e097fbe88533101d3d2bb6ce0', 3, '2018-10-18 02:13:33', 5, 1, 12, NULL, NULL, NULL, NULL, 1, NULL, 1, 1, 'X9o4Esy9Fj', 1, NULL),
(71, 'Lucia Finol', 'david.rincon.oracle@gmail.com', '111111111111111', '1123213214444', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 5, '2018-10-24 02:41:20', 5, 0, 11, NULL, NULL, 102, 1, 1, NULL, 2, 1, 'wia3HATd4Y', 1, NULL),
(72, 'David Rincon', 'davideduardo.luengo2@hotmail.com', NULL, '1122326388', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 3, '2018-10-25 12:54:01', 5, 0, 12, NULL, NULL, NULL, NULL, 0, NULL, 1, 1, '4Pl5A7eVtM', 1, NULL),
(73, 'Daniel Mendez', 'dmendez@sadsadsa.com', '', '12321321321321', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 5, '2018-10-29 02:44:53', 5, 0, 12, NULL, NULL, 116, 1, 0, NULL, 2, 1, '8qo5QrIVyp', 1, NULL),
(74, 'Humberto Moran', 'davideduardo.luengo@hotmail.com', NULL, '1212323244555', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 4, '2018-10-29 15:24:56', 5, 0, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, 1, 'TG6slDmwua', 1, NULL),
(75, 'asdsad sadsad', 'sadsadsad@asdsada', '', '12321321321321', '8f65a5cc8f86a94842ac2808dd5ca6ff0fa48695', 3, '2018-10-29 16:28:59', 1, 1, 1, NULL, NULL, NULL, NULL, 1, NULL, 1, 0, 'X7nAwW5GRx', 0, NULL),
(76, 'David Rincon', 'davideduardo.luego@hotmail.com', '', '11223344555545', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 3, '2018-11-07 01:23:26', 5, 0, 12, NULL, NULL, NULL, NULL, 0, NULL, 1, 1, 'Y9Ma7JmyO0', 1, NULL),
(78, 'Sandra Vilchez', 'svilchez@asdsad.com', '11232323234', '11232323232', '227d5094b8a76a8ac0680126d996350df33200eb', 5, '2018-11-22 03:20:50', 5, 1, 12, NULL, NULL, 121, 1, 1, NULL, 2, 0, 'pgP7mhaYX5', 0, NULL);

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
  ADD PRIMARY KEY (`idKey`);

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
  MODIFY `idAdress` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `tb_clients_tickets`
--
ALTER TABLE `tb_clients_tickets`
  MODIFY `idTicketsCliets` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `tb_company`
--
ALTER TABLE `tb_company`
  MODIFY `idCompany` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tb_company_type_keychains`
--
ALTER TABLE `tb_company_type_keychains`
  MODIFY `idKey` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tb_department`
--
ALTER TABLE `tb_department`
  MODIFY `idDepartment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

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
-- AUTO_INCREMENT de la tabla `tb_tickets`
--
ALTER TABLE `tb_tickets`
  MODIFY `idTicket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

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
  MODIFY `idTypeServices` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

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
