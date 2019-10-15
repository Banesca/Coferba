-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-10-2019 a las 17:34:23
-- Versión del servidor: 10.1.37-MariaDB
-- Versión de PHP: 7.0.33

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
  `IsInDebt` int(11) DEFAULT '0',
  `SA_ID_COMPANY` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Volcado de datos para la tabla `tb_addres`
--

INSERT INTO `tb_addres` (`idAdress`, `nameAdress`, `idCompanyKf`, `priceUni`, `priceManagement`, `priceShipping`, `IdSecurityCode`, `IsInDebt`, `SA_ID_COMPANY`) VALUES
(1, 'Cramer 1275', 1, '100.00', '0.00', '150.00', NULL, 0, NULL),
(2, 'Blanco Encalada 2355', 1, '0.00', '0.00', '0.00', NULL, 0, NULL),
(3, 'Cabildo 3510', 2, '0.00', '0.00', '0.00', NULL, 0, NULL),
(4, 'Gral. La valle 1920', 2, '0.00', '0.00', '0.00', NULL, 0, NULL),
(5, 'Parana 2568', 3, '0.00', '0.00', '0.00', NULL, 0, NULL),
(6, 'Rivadavia 4530', 3, '0.00', '0.00', '0.00', NULL, 0, NULL),
(11, 'DIRECCION DE PRUEBA', 5, '110.00', '260.00', '170.00', '54321', 0, 595),
(12, 'DIRECCION DE PRUEBA 2', 5, '260.00', '0.00', '310.00', '12345', 0, 596);

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
  `tlfCompany` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL COMMENT 'TELEFONO DE LA EMPRESA O ADMINISTRACION',
  `mail_services` varchar(200) COLLATE utf8_swedish_ci DEFAULT '',
  `mail_request` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL,
  `mail_admin` varchar(200) COLLATE utf8_swedish_ci DEFAULT NULL,
  `isEdit` tinyint(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Volcado de datos para la tabla `tb_company`
--

INSERT INTO `tb_company` (`idCompany`, `nameCompany`, `SA_ID_COMPANY`, `tlfCompany`, `mail_services`, `mail_request`, `mail_admin`, `isEdit`) VALUES
(1, 'Carlos Castaño', NULL, NULL, 'servicios@carloscastanoooo.com', 'pedidos@carloscastanoooo.com', 'admin@carloscastanoooo.com', 1),
(2, 'Talcahuano Propiedades', NULL, NULL, 'servicio@talcahuanossss.com', 'pedidos@talcahuanossss.com', 'admin@talcahuanossss.com', 1),
(3, 'Toyota', NULL, NULL, 'servicio@toyotaa.com', 'Pedidos@toyotaa.com', 'admin@toyotaa.com', 1),
(5, 'ADMINISTRACION DE PRUEBA', 686, NULL, 'angelgabrielceballos@gmail.com', 'angelgabrielceballos@gmail.com', 'angelgabrielceballos@gmail.com', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_company_type_keychains`
--

CREATE TABLE `tb_company_type_keychains` (
  `idKey` int(11) UNSIGNED NOT NULL,
  `idAddressKf` int(11) DEFAULT NULL,
  `item` varchar(200) DEFAULT NULL,
  `value` decimal(10,2) DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_company_type_keychains`
--

INSERT INTO `tb_company_type_keychains` (`idKey`, `idAddressKf`, `item`, `value`) VALUES
(1, 11, 'Llaveros', '10.99'),
(2, 11, 'Sticket Vehicular', '10.99'),
(3, 11, 'Credencial Movil', '10.99'),
(4, 12, 'Llaveros', '10.99'),
(5, 12, 'Sticket Vehicular', '10.99'),
(6, 5, 'Credencial Movil', '10.99'),
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
(2, 1, '1-A', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(3, 1, '1-B', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(4, 1, '2-A', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(5, 1, '2-B', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(6, 1, '3-A', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(7, 1, '3-B', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(8, 1, '4-A', 0, '', 1, 1, NULL, NULL, 0, 0, NULL),
(9, 1, '4-B', 0, '', 1, 1, NULL, 71, 1, 0, NULL),
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
(100, 11, '01-A', NULL, NULL, NULL, NULL, NULL, 71, 1, 0, 14143),
(101, 11, '01-B', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14144),
(102, 11, '01-C', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14145),
(103, 11, '02-A', NULL, NULL, NULL, NULL, NULL, 75, 1, 0, 14146),
(104, 11, '02-B', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14147),
(105, 11, '02-C', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14148),
(106, 11, '03-A', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14149),
(107, 11, '03-B', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14150),
(108, 11, '03-C', NULL, NULL, NULL, NULL, NULL, 78, 1, 0, 14151),
(109, 11, '04-A', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14152),
(110, 11, '04-B', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14153),
(111, 11, '04-C', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14154),
(112, 11, '05-A', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14155),
(113, 11, '05-B', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14156),
(114, 11, '05-C', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14157),
(115, 11, 'PB-A', NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, 14158),
(116, 12, 'PB-01', NULL, NULL, NULL, NULL, NULL, 73, 1, 0, 14159),
(117, 12, 'PB-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14160),
(118, 12, '01-01', NULL, NULL, NULL, NULL, NULL, 85, 0, 0, 14161),
(119, 12, '01-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14162),
(120, 12, '02-01', NULL, NULL, NULL, NULL, NULL, 71, 1, 0, 14163),
(121, 12, '02-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14164),
(122, 12, '03-01', NULL, NULL, NULL, NULL, NULL, 76, 1, 0, 14165),
(123, 12, '03-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14166),
(124, 12, '04-01', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14167),
(125, 12, '04-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14168),
(126, 12, '05-01', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14169),
(127, 12, '05-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14170),
(128, 12, '06-01', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14171),
(129, 12, '06-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14172),
(130, 12, '07-01', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14173),
(131, 12, '07-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14174),
(132, 12, '08-01', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14175),
(133, 12, '08-02', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 14176),
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
(1, 'LLaveros a dar de baja'),
(2, 'LLaveros en mi poder');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_pick_receive`
--

CREATE TABLE `tb_pick_receive` (
  `idWhoPickUp` int(11) DEFAULT NULL,
  `nameWhoPickUp` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_pick_receive`
--

INSERT INTO `tb_pick_receive` (`idWhoPickUp`, `nameWhoPickUp`) VALUES
(1, 'Titular'),
(2, 'Encargado'),
(3, 'Tercera persona');

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
(1, '279', 'TK');

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
  `urlToken` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'URL TOKEN UTILIZADO PARA APROBAR O RECHAZAR UN PEDIDO'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_tickets`
--

INSERT INTO `tb_tickets` (`idTicket`, `dateCreated`, `dateRecibeCompany`, `idStatusTicketKf`, `codTicket`, `idTypeTicketKf`, `idRequestKf`, `idUserTenantKf`, `idOWnerKf`, `idUserAdminKf`, `idUserCompany`, `idUserEnterpriceKf`, `idUserAttendantKf`, `numberItemes`, `idTypeOfKeysKf`, `itemToDisabled`, `idReasonDisabledItemKf`, `idTypeOuther`, `mailContactConsult`, `SA_NRO_ORDER`, `descriptionComment`, `descriptionOrder`, `isCommentOrDesccriptionChange`, `idTypeServicesKf`, `totalService`, `addressConsul`, `idProfileKf`, `idOpcionLowTicketKf`, `idTypeOfOptionKf`, `idCompanyKf`, `idAdressKf`, `idDepartmentKf`, `idUserCancelTicket`, `isCancelRequested`, `reasonForCancelTicket`, `dateCancel`, `idUserApprovedTicket`, `dateRecibedAdmin`, `idOtherKf`, `isChangeDeliverylRequested`, `idUserHasChangeTicket`, `idTypeDeliveryKf`, `idWhoPickUp`, `idUserAttendantKfDelivery`, `thirdPersonNames`, `thirdPersonPhone`, `thirdPersonId`, `isNew`, `isAplicate`, `idStatusTicketKfOld`, `sendUserNotification`, `totalGestion`, `totalLlave`, `totalEnvio`, `urlToken`) VALUES
(131, '2019-09-10 01:48:42', NULL, 2, 'TK-00000264', 1, 0, 82, 0, 31, NULL, 0, 0, 1, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '270.99', NULL, 1, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '10.99', '0.00', 'VWMWNeeu2oIFapiJnXpb'),
(132, '2019-09-10 02:00:40', NULL, 2, 'TK-00000265', 1, 0, 74, 71, 0, NULL, 0, 0, 1, '{\"keys\":[{\"idKeyKf\":\"4\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '320.99', NULL, 3, NULL, NULL, 5, 12, 120, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 2, 2, 77, NULL, NULL, NULL, 1, NULL, NULL, NULL, '0.00', '10.99', '310.00', 'AgYvWzRJ.BioZdKAZ6-h'),
(133, '2019-09-10 16:45:28', NULL, 2, 'TK-00000266', 1, 0, 0, 71, 0, NULL, 0, 0, 2, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '451.98', NULL, 3, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 2, 3, NULL, 'Carolina Vasquez', '112243242344', 95929321, 1, NULL, NULL, NULL, '260.00', '21.98', '170.00', 'mWGfB0Zck4.mGJStLnol'),
(134, '2019-09-10 17:05:14', NULL, 2, 'TK-00000267', 1, 0, 0, 0, 31, NULL, 0, 84, 2, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '281.98', NULL, 1, NULL, 1, 5, 11, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '21.98', '0.00', 'hUAAX:216vPAKcA0lZgP'),
(135, '2019-09-10 17:11:52', NULL, 2, 'TK-00000268', 1, 0, 0, 0, 31, NULL, 0, 76, 1, '{\"keys\":[{\"idKeyKf\":\"4\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '320.99', NULL, 1, NULL, 1, 5, 12, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 2, 2, 77, NULL, NULL, NULL, 1, NULL, NULL, 1, '0.00', '10.99', '310.00', '6.g3DR0TYX54F8jubqWa'),
(136, '2019-09-11 01:18:35', NULL, 2, 'TK-00000269', 1, 0, 0, 71, 31, NULL, 0, 0, 1, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '270.99', NULL, 1, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '10.99', '0.00', 'Qv4eEcdelsCe97BZAEx8'),
(137, '2019-09-11 01:20:51', NULL, 2, 'TK-00000270', 1, 0, 0, 71, 31, NULL, 0, 0, 1, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '270.99', NULL, 1, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '10.99', '0.00', '9IVjBWqHs.O1qjeP1k8V'),
(138, '2019-09-11 01:25:05', NULL, 2, 'TK-00000271', 1, 0, 0, 71, 31, NULL, 0, 0, 2, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '451.98', NULL, 1, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 2, 2, 89, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '21.98', '170.00', 'T7M3fmxLYARN-LuMz0v1'),
(139, '2019-09-11 01:26:43', NULL, 3, 'TK-00000272', 1, 0, 0, 71, 31, NULL, 0, 0, 2, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '451.98', NULL, 1, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, 31, '2019-09-11 03:30:03', 0, NULL, NULL, 2, 2, 84, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '21.98', '170.00', '5OK79n3RuzsjDbHIJ1QI'),
(140, '2019-09-11 01:27:36', NULL, 3, 'TK-00000273', 1, 0, 0, 71, 31, NULL, 0, 0, 2, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '281.98', NULL, 1, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, 31, '2019-09-11 03:30:00', 0, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '21.98', '0.00', 'VayOcRo.yvAxwjEw647H'),
(141, '2019-09-11 01:29:14', NULL, 3, 'TK-00000274', 1, 0, 0, 71, 31, NULL, 0, 0, 2, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '451.98', NULL, 1, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, 31, '2019-09-11 03:29:58', 0, NULL, NULL, 2, 2, 78, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '21.98', '170.00', 'cDQsHZraOMIjwFfyObvo'),
(142, '2019-09-11 01:31:06', NULL, 2, 'TK-00000275', 1, 0, 0, 71, 31, NULL, 0, 0, 2, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '451.98', NULL, 1, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 2, 2, 84, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '21.98', '170.00', 'ZQhaJab_lapt3T:4r9gf'),
(143, '2019-09-11 02:34:58', NULL, 2, 'TK-00000276', 1, 0, 0, 71, 31, NULL, 0, 0, 1, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '270.99', NULL, 1, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '10.99', '0.00', 'sxN1zFdxa47GUjVtvZj3'),
(144, '2019-09-11 02:41:02', NULL, 2, 'TK-00000277', 1, 0, 0, 71, 31, NULL, 0, 0, 1, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '440.99', NULL, 1, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 2, 2, 75, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '10.99', '170.00', '--RfxK.mYUf7DrK21_kn'),
(145, '2019-09-11 02:42:50', NULL, 2, 'TK-00000278', 1, 0, 0, 71, 31, NULL, 0, 0, 1, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '270.99', NULL, 1, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '10.99', '0.00', 'fQKigD_OB1WbFX4ohqe.'),
(146, '2019-09-11 02:54:26', NULL, 2, 'TK-00000279', 1, 0, 0, 71, 31, NULL, 0, 0, 1, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '270.99', NULL, 1, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '10.99', '0.00', 'h5RgaRWBPbxSsdGq:73g'),
(129, '2019-09-07 02:56:49', NULL, 3, 'TK-00000262', 1, 0, 0, 71, 0, NULL, 0, 0, 2, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1},{\"idKeyKf\":\"2\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '281.98', NULL, 3, NULL, NULL, 5, 11, 100, NULL, NULL, NULL, NULL, 31, '2019-09-07 05:19:56', 0, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, '260.00', '21.98', '0.00', 'tRHY0xO-xpP7ozeu1FJg'),
(130, '2019-09-07 03:35:58', NULL, 2, 'TK-00000263', 1, 0, 0, 0, 31, NULL, 0, 0, 1, '{\"keys\":[{\"idKeyKf\":\"1\",\"keyQty\":1}]}', 'null', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '440.99', NULL, 1, NULL, 2, 5, 11, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 2, 2, 89, NULL, NULL, NULL, 1, NULL, NULL, 1, '260.00', '10.99', '170.00', 'l7:LyXlS9ksUfLmp7y6E');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tmp_delivery_data`
--

CREATE TABLE `tb_tmp_delivery_data` (
  `idTmpDeliveryData` int(11) NOT NULL COMMENT 'ID DE LA INFO TEMPORAL ASOCIADO A UN TICKET',
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
  `dateOfRequestByUser` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

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
(31, 'admin sistema', 'soporte@coferba.com.ar', '(054) 9 11 2323-2323', '91124759596', 'fe703d258c7ef5f50b71e06565a65aa07194907f', 1, '2018-02-16 12:01:22', NULL, 0, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1, NULL, 1, NULL),
(71, 'David Eduardo Rincon', 'davideduardo.luengo@hotmail.com', '', '1122333444555666', '870e8768d555d80e0aeb44870c081f5563d90bd3', 3, '2018-10-22 02:33:22', 5, 0, 11, NULL, NULL, NULL, NULL, 0, NULL, 1, 1, '3Jh0NuqLHa', 1, NULL),
(72, 'leandro figueroa', 'lean.figueroa@gmail.com', '123213213213213', '123213213213213', '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 5, '2018-10-29 16:27:43', 5, 0, 12, NULL, NULL, 117, 1, 0, NULL, 2, 1, 'JbuVXny0Jr', 1, NULL),
(73, 'leandro2 figueroa2', 'leandro.figueroa@coferba.com.ar', '1122356388', '123213213213213', '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 3, '2018-10-29 16:48:52', 5, 0, 12, NULL, NULL, NULL, NULL, 1, NULL, 1, 1, 'OLtCaObFgO', 1, NULL),
(74, 'inquilino prueba', 'rexx84@gmail.com', '123213213213213', '123213213213213', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 5, '2018-10-29 16:58:23', 5, 0, 12, NULL, NULL, 120, 1, 0, NULL, 2, 1, 'XTrpLMkZiG', 1, NULL),
(75, 'Encargado Prueba', 'encargadoprueba@asdasda', '123213213213213', '1123232434333423', 'c4f9fcd7be6b041073f1b23a2bf80bd1d831292e', 6, '2018-12-19 17:30:57', 5, 1, 11, 4, NULL, 103, 1, 1, 1, 2, 1, 'gQuGxR2Zoo', 1, NULL),
(76, 'Roberto Higuera', 'rhiguera@fffff.com', '123213213213213', '123213213213213', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 6, '2019-01-18 04:10:24', 5, 0, 12, 2, NULL, NULL, NULL, 0, 1, 1, 1, 'ZWsfbNEEXB', 1, NULL),
(77, 'Esteban Moreli', 'emoreli@akjsdsadas.com', '123213213213213', '11233243253243', '44b07ccf74fd8a488be0b4aa0593beff5ac6f3ef', 6, '2019-01-18 04:31:36', 5, 1, 12, 3, NULL, NULL, NULL, 1, 0, 0, 1, 'uQzz412uH5', 1, NULL),
(78, 'Victor Gonzalez', 'vgonzalez@asdadsadwq.com', '77788787878', '', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 6, '2019-01-18 04:33:07', 5, 0, 11, 2, NULL, NULL, NULL, 1, 1, 1, 1, '69bMxpjXQ8', 1, NULL),
(79, 'Sofia Rincon', 'sofia.rincon@asdasdsad.com', '123213213213213', '123213213213213', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 4, '2019-01-22 04:06:32', 5, 0, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, 1, 'NaUwCkVwH4', 1, NULL),
(80, 'Daniela Becerra', 'daniela.becerra@hoasdsad.com', '123213213213213', '123213213213213', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 5, '2019-02-11 01:23:37', 5, 0, NULL, NULL, NULL, NULL, 1, 1, NULL, 2, 1, 'hXLcQRwWGn', 1, NULL),
(81, 'probando', 'probando@probando.com', '123213123213', '', 'f11131b2bcdf821dc9ff69b38e2712541439b9f8', 5, '2019-07-27 17:29:15', 5, 1, 11, NULL, NULL, 108, 1, 1, NULL, 2, 1, 'lxUXCkdgnZ', 1, NULL),
(82, 'asdsadas', 'asdsad@asdsad.com', '', '12321311312', 'b9f4327bafdb162ed16fe0d6d4a50bde306ee08e', 5, '2019-07-27 17:51:24', 5, 1, 11, NULL, NULL, 100, 1, 1, NULL, 2, 1, 'HCU6UgT88X', 1, NULL),
(83, 'erewrrewrew', 'wqewqew@asdsad.com', '', '121321321', '7be5fac0585900a65effd04d887cc62022b16a20', 5, '2019-07-27 18:38:43', 5, 1, 11, NULL, NULL, 100, 1, 1, NULL, 2, 1, 'yZAGdjTOLv', 1, NULL),
(84, 'Arturo Michelena', 'amichelena@asdas.com', '', '11232142132132', 'fc604011dbac13b0f6f0b89c81c0efe0271530c1', 6, '2019-07-27 18:59:58', 5, 1, 11, 2, NULL, NULL, NULL, 1, 0, 0, 1, 'WuYJFO1DZD', 1, NULL),
(85, 'Fernando Angulo', 'david.rincon.oracle@gmail.com', '', '123213213', '78d16ced1eedb4f436c83a861c91e052aaf3699f', 3, '2019-07-28 00:43:16', 5, 1, 12, NULL, NULL, NULL, NULL, 0, NULL, 1, 1, '7gVmCe4f3J', 1, NULL),
(86, 'David Eduardo Rincon', 'davideduardo.luengo2@hotmail.com', '', '01122356388', 'fa399d74e61282062d50aaf7eb6a9afc1b21f314', 5, '2019-08-21 03:20:44', 1, 1, 1, NULL, NULL, 2, 1, 1, NULL, 2, 1, 'K67aipTQu2', 1, NULL),
(87, 'Ernesto Araujo', 'earaujo@asdsad.com', '', '111232324324324', '5365642294a7a05378e5e13cd44fa91c5f9b546a', 6, '2019-08-29 23:12:26', 1, 1, 1, 2, NULL, NULL, NULL, 1, 0, 0, 1, 'FLTvvGz5wZ', 1, NULL),
(88, 'Gabriel Gonzalez', 'ggonzalez@hotmail.com', '', '112322424233', 'e47ed8dab1b69a560435c3f4bff9d2679ab12233', 6, '2019-08-29 23:13:21', 1, 1, 2, 2, NULL, NULL, NULL, 1, 0, 0, 1, 'WM7HECe4EL', 1, NULL),
(89, 'Dionisio Machado', 'dmachado@asdasd.com', '121232132134', '112143435556', '80662a250c92f9c05b965cbff69785fdc404d0c4', 6, '2019-08-29 23:22:06', 5, 1, 11, 1, 'Plomero', NULL, NULL, 1, 0, NULL, 1, 'YJh6f8Gxb0', 1, NULL);

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
-- Indices de la tabla `tb_tmp_delivery_data`
--
ALTER TABLE `tb_tmp_delivery_data`
  ADD PRIMARY KEY (`idTmpDeliveryData`);

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
  MODIFY `idTicket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=147;

--
-- AUTO_INCREMENT de la tabla `tb_tmp_delivery_data`
--
ALTER TABLE `tb_tmp_delivery_data`
  MODIFY `idTmpDeliveryData` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID DE LA INFO TEMPORAL ASOCIADO A UN TICKET';

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
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

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
