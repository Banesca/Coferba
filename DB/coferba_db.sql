-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-02-2020 a las 04:46:49
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.2.27

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
  `priceUni` decimal(10,2) DEFAULT 0.00 COMMENT 'Precio por unidad',
  `priceManagement` decimal(10,2) DEFAULT 0.00 COMMENT 'Precio por Gestion',
  `priceShipping` decimal(10,2) DEFAULT 0.00 COMMENT 'Precio por envio ',
  `IdSecurityCode` varchar(255) COLLATE utf8_swedish_ci DEFAULT NULL COMMENT 'Codigo de verificacion para mostrar direccion a propietarios/inquilinos',
  `IsInDebt` int(11) DEFAULT 0,
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
-- Estructura de tabla para la tabla `tb_agents`
--

CREATE TABLE `tb_agents` (
  `idAgent` int(11) UNSIGNED NOT NULL,
  `agent` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_agents`
--

INSERT INTO `tb_agents` (`idAgent`, `agent`) VALUES
(1, 'TASS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_alarm_batery`
--

CREATE TABLE `tb_alarm_batery` (
  `idAlarmBatery` int(11) UNSIGNED NOT NULL,
  `nroInternal` varchar(200) DEFAULT NULL,
  `nroFabric` varchar(200) DEFAULT NULL,
  `dateExpired` date DEFAULT NULL,
  `isControlSchedule` int(11) DEFAULT NULL,
  `idClientServicesAlarmsFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_alarm_line_phone`
--

CREATE TABLE `tb_alarm_line_phone` (
  `idAlarmLinePhone` int(11) UNSIGNED NOT NULL,
  `company` varchar(100) DEFAULT NULL,
  `line` varchar(100) DEFAULT NULL,
  `idClientServicesAlarmsFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_alarm_module_gps`
--

CREATE TABLE `tb_alarm_module_gps` (
  `idAlarmModuleGps` int(11) UNSIGNED NOT NULL,
  `idClientServicesAlarmsFk` int(11) DEFAULT NULL,
  `moduleGpsr` varchar(200) DEFAULT NULL,
  `nroSerieFrabric` varchar(200) DEFAULT NULL,
  `nroSerieInternal` varchar(200) DEFAULT NULL,
  `codeProgram` varchar(200) DEFAULT NULL,
  `portProgram` varchar(200) DEFAULT NULL,
  `passwordAcces` varchar(200) DEFAULT NULL,
  `codePart1` varchar(200) DEFAULT NULL,
  `codePart2` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_alarm_module_ip`
--

CREATE TABLE `tb_alarm_module_ip` (
  `idAlarmModuleIp` int(11) UNSIGNED NOT NULL,
  `moduleIp` varchar(100) DEFAULT NULL,
  `nroSerieFrabric` varchar(100) DEFAULT NULL,
  `nroSerieInternal` varchar(100) DEFAULT NULL,
  `ip` int(11) DEFAULT NULL,
  `codeProgrm` varchar(100) DEFAULT NULL,
  `portProgrm` varchar(100) DEFAULT NULL,
  `passwordAcces` varchar(100) DEFAULT NULL,
  `codePart1` varchar(100) DEFAULT NULL,
  `codePart2` varchar(100) DEFAULT NULL,
  `idClientServicesAlarmsFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_alarm_person_alert`
--

CREATE TABLE `tb_alarm_person_alert` (
  `idPersonAlert` int(11) UNSIGNED NOT NULL,
  `fullName` varchar(200) DEFAULT NULL,
  `link` varchar(200) DEFAULT NULL,
  `stringKey` varchar(200) DEFAULT NULL,
  `phone` varchar(200) DEFAULT NULL,
  `numberUser` varchar(200) DEFAULT NULL,
  `isUserSystem` tinyint(1) DEFAULT 0,
  `idUserSystemFk` int(11) DEFAULT NULL,
  `idClientServicesAlarmsAditionals` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_alarm_person_verific`
--

CREATE TABLE `tb_alarm_person_verific` (
  `idPersonVerific` int(11) UNSIGNED NOT NULL,
  `isUserSystem` tinyint(1) DEFAULT 0,
  `idUserSystemFk` int(11) DEFAULT NULL,
  `link` varchar(200) DEFAULT NULL,
  `phone` varchar(200) DEFAULT NULL,
  `numberUser` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_alarm_services_aditionals`
--

CREATE TABLE `tb_alarm_services_aditionals` (
  `idAlarmServicesAditionals` int(11) UNSIGNED NOT NULL,
  `alarmServicesAditionals` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_alarm_services_aditionals`
--

INSERT INTO `tb_alarm_services_aditionals` (`idAlarmServicesAditionals`, `alarmServicesAditionals`) VALUES
(1, 'CONTROL HORARIO'),
(2, 'REPORTE MENSUAL AUTOMATICO'),
(3, 'REPORTES AUTOMATICOS'),
(4, 'VIDEO VERIFICACION'),
(5, 'APP');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_alarm_type_client`
--

CREATE TABLE `tb_alarm_type_client` (
  `idTypeClientAlarm` int(11) UNSIGNED NOT NULL,
  `typeClientAlarm` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_alarm_type_client`
--

INSERT INTO `tb_alarm_type_client` (`idTypeClientAlarm`, `typeClientAlarm`) VALUES
(1, 'CASA'),
(2, 'COMERCIO'),
(3, 'INDUSTRIA'),
(4, 'OTROS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_bakups_order`
--

CREATE TABLE `tb_bakups_order` (
  `idBakupsOrder` int(11) UNSIGNED NOT NULL,
  `bakupsOrder` int(11) DEFAULT NULL,
  `idClientServicesCameraFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_batery_install`
--

CREATE TABLE `tb_batery_install` (
  `idBateryInstall` int(11) UNSIGNED NOT NULL,
  `batery` varchar(100) DEFAULT NULL,
  `idClientServicesAccesControlFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_cameras`
--

CREATE TABLE `tb_cameras` (
  `idCamera` int(11) UNSIGNED NOT NULL,
  `idClientServicesCameraFk` int(11) DEFAULT NULL,
  `portCamera` int(11) DEFAULT NULL,
  `coveredArea` int(11) DEFAULT NULL,
  `locationCamera` int(11) DEFAULT NULL,
  `nroSerieCamera` int(11) DEFAULT NULL,
  `nroFabricCamera` int(11) DEFAULT NULL,
  `dateExpireCamera` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_category_departament`
--

CREATE TABLE `tb_category_departament` (
  `idCategoryDepartament` int(11) UNSIGNED NOT NULL,
  `categoryDepartament` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_category_departament`
--

INSERT INTO `tb_category_departament` (`idCategoryDepartament`, `categoryDepartament`) VALUES
(1, 'Departamento'),
(2, 'Cochera'),
(3, 'Otros');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_clients`
--

CREATE TABLE `tb_clients` (
  `idClient` int(11) UNSIGNED NOT NULL,
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
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `update_at` timestamp NULL DEFAULT NULL,
  `idStatusFk` int(11) DEFAULT NULL,
  `mailFronKey` varchar(100) DEFAULT NULL,
  `observationOrderKey` varchar(500) DEFAULT NULL,
  `isNotCliente` tinyint(1) DEFAULT 0,
  `idClientAdminFk` int(11) DEFAULT NULL,
  `mailServiceTecnic` varchar(100) DEFAULT NULL,
  `observationSericeTecnic` varchar(100) DEFAULT NULL,
  `mailCollection` varchar(100) DEFAULT NULL,
  `observationCollection` varchar(500) DEFAULT NULL,
  `idClientCompaniFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_clients`
--

INSERT INTO `tb_clients` (`idClient`, `idClientTypeFk`, `name`, `address`, `addressLat`, `addressLon`, `idAgentFk`, `businessName`, `CUIT`, `idLocationFk`, `idProvinceFk`, `mobile`, `mail`, `observation`, `pageWeb`, `created_at`, `update_at`, `idStatusFk`, `mailFronKey`, `observationOrderKey`, `isNotCliente`, `idClientAdminFk`, `mailServiceTecnic`, `observationSericeTecnic`, `mailCollection`, `observationCollection`, `idClientCompaniFk`) VALUES
(1, 1, 'CIVILE PROPIEDADES', 'Vidal 3527', '-27.49623307399331', '-58.84119207801569', 1, 'text2', 'text', 42, 1, 'text', 'civile@civleprop.com.ar', 'text', 'text', '2020-01-28 15:47:49', NULL, 1, 'text', 'text', 0, 1, 'text', 'text', 'text', 'text', 1),
(2, 1, 'ARGENPROP', 'Tronador 1452', '-34.57778506103314', '-58.46673352594009', 1, 'text2', 'text', 37, 1, 'text', 'agenprop@argenprop.com.ar', 'text', 'text', '2020-01-28 15:49:10', NULL, 1, 'text', 'text', 0, 1, 'text', 'text', 'text', 'text', 1),
(4, 1, 'text', 'text', 'text', 'text', 1, 'text', 'text', 1, 1, 'text', 'text', 'text', 'text', '2020-02-27 01:26:31', NULL, 1, 'text', 'text', 0, 1, 'text', 'text', 'text', 'text', 1),
(5, NULL, 'ADMIN SUPERIOR', 'GARCIA DEL RIO 4044', '-34.554323584571', '-58.484865178333', 1, 'admin superior s.a', '234324324-4', 37, NULL, NULL, NULL, NULL, 'adminsuperior.com.ar', '2020-02-27 02:01:43', NULL, 1, NULL, NULL, NULL, NULL, 'soporte@coferba.com.ar', NULL, 'soporte@coferba.com.ar', NULL, NULL),
(6, NULL, 'ADMIN SUPERIOR1', 'GARCIA DEL RIO 4044', '-34.554323584571', '-58.484865178333', 1, 'ADMIN SUPERIOR1', '23324342-4', 37, NULL, NULL, NULL, NULL, '', '2020-02-27 03:44:28', NULL, 1, NULL, NULL, NULL, NULL, 'asdsadasd@asdsad', NULL, 'asdsadasd@asdsad', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_clients_phones`
--

CREATE TABLE `tb_clients_phones` (
  `idClientPhones` int(11) UNSIGNED NOT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `idStatusFk` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
-- Estructura de tabla para la tabla `tb_client_address_particular`
--

CREATE TABLE `tb_client_address_particular` (
  `idAddressParticular` int(11) UNSIGNED NOT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `address` int(200) DEFAULT NULL,
  `depto` varchar(100) DEFAULT NULL,
  `isBuilding` int(11) DEFAULT NULL,
  `idProvinceFk` int(11) DEFAULT NULL,
  `idLocationFk` int(11) DEFAULT NULL,
  `clarification` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_authorizing`
--

CREATE TABLE `tb_client_authorizing` (
  `idClientAuthorizing` int(11) UNSIGNED NOT NULL,
  `idUserFk` int(11) DEFAULT NULL,
  `isLevel1` tinyint(1) DEFAULT 0,
  `isLevel2` tinyint(1) DEFAULT 0,
  `idClientFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_billing_information`
--

CREATE TABLE `tb_client_billing_information` (
  `idBillingInfo` int(11) UNSIGNED NOT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `businessNameBilling` varchar(200) DEFAULT NULL,
  `cuitBilling` varchar(50) DEFAULT NULL,
  `idLocationBillingFk` int(11) DEFAULT NULL,
  `idProvinceBillingFk` int(11) DEFAULT NULL,
  `idTypeTaxFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_client_billing_information`
--

INSERT INTO `tb_client_billing_information` (`idBillingInfo`, `idClientFk`, `businessNameBilling`, `cuitBilling`, `idLocationBillingFk`, `idProvinceBillingFk`, `idTypeTaxFk`) VALUES
(1, 2, 'text', 'text', 1, 1, 1),
(2, 3, 'text', 'text', 1, 1, 1),
(3, 4, 'text', 'text', 1, 1, 1),
(4, 5, 'admin superior s.a', '234324324-4', 37, 1, 1),
(5, 6, 'ADMIN SUPERIOR1', '23324342-4', 37, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_departament`
--

CREATE TABLE `tb_client_departament` (
  `idClientDepartament` int(11) UNSIGNED NOT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `floor` varchar(11) DEFAULT NULL,
  `departament` varchar(11) DEFAULT NULL,
  `idCategoryDepartamentFk` int(11) DEFAULT NULL,
  `idStatusFk` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_client_departament`
--

INSERT INTO `tb_client_departament` (`idClientDepartament`, `idClientFk`, `floor`, `departament`, `idCategoryDepartamentFk`, `idStatusFk`, `created_at`) VALUES
(1, NULL, NULL, NULL, NULL, NULL, '2019-10-22 21:10:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_files_list`
--

CREATE TABLE `tb_client_files_list` (
  `idClientFiles` int(11) UNSIGNED NOT NULL,
  `idClientfK` int(11) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `urlFile` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_functional_units`
--

CREATE TABLE `tb_client_functional_units` (
  `idFunctionalUnits` int(11) UNSIGNED NOT NULL,
  `identifier` varchar(100) DEFAULT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `idProviceFk` int(11) DEFAULT NULL,
  `idTaxTypeFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_phone_contact`
--

CREATE TABLE `tb_client_phone_contact` (
  `idClientPhoneFk` int(11) UNSIGNED NOT NULL,
  `phoneTag` varchar(80) DEFAULT NULL COMMENT 'Etiqueta del telefono de contacto Ejmp: Guardia/Urgencia',
  `phoneContact` varchar(80) DEFAULT NULL,
  `idClientFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_client_phone_contact`
--

INSERT INTO `tb_client_phone_contact` (`idClientPhoneFk`, `phoneTag`, `phoneContact`, `idClientFk`) VALUES
(1, NULL, 'text', NULL),
(2, NULL, 'text', 2),
(3, NULL, 'text2', 2),
(4, 'Comercial', '234324324', 3),
(5, 'Urgente', '3243232432', 3),
(6, 'Comercial', '234324324', 4),
(7, 'Urgente', '3243232432', 4),
(8, 'comercial', '1143254354355', 5),
(9, 'guardia', '11324324324243', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_schedule_atention`
--

CREATE TABLE `tb_client_schedule_atention` (
  `idScheduleAtention` int(11) UNSIGNED NOT NULL,
  `idClienteFk` int(11) DEFAULT NULL,
  `day` int(11) DEFAULT NULL,
  `fronAm` time DEFAULT NULL,
  `toAm` time DEFAULT NULL,
  `fronPm` time DEFAULT NULL,
  `toPm` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_client_schedule_atention`
--

INSERT INTO `tb_client_schedule_atention` (`idScheduleAtention`, `idClienteFk`, `day`, `fronAm`, `toAm`, `fronPm`, `toPm`) VALUES
(1, 1, 0, '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(2, 1, 0, '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(3, 2, 0, '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(4, 2, 0, '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(5, 3, 0, '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(6, 3, 0, '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(7, 4, 0, '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(8, 4, 0, '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
(9, 5, 0, NULL, '13:00:00', NULL, '18:00:00'),
(10, 5, 0, NULL, '13:00:00', NULL, '18:00:00'),
(11, 5, 0, NULL, '13:00:00', NULL, '18:00:00'),
(12, 5, 0, NULL, '13:00:00', NULL, '18:00:00'),
(13, 5, 0, NULL, '13:00:00', NULL, '18:00:00'),
(14, 6, 0, NULL, '13:00:00', NULL, '18:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_services`
--

CREATE TABLE `tb_client_services` (
  `idClientServices` int(11) UNSIGNED NOT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `idTipeServiceFk` int(11) DEFAULT NULL,
  `idClientServicesBodyFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_client_services`
--

INSERT INTO `tb_client_services` (`idClientServices`, `idClientFk`, `idTipeServiceFk`, `idClientServicesBodyFk`) VALUES
(1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_services_acces_control`
--

CREATE TABLE `tb_client_services_acces_control` (
  `idClientServicesAccesControl` int(11) UNSIGNED NOT NULL,
  `door` varchar(100) DEFAULT NULL,
  `contract` text DEFAULT NULL,
  `dateUp` date DEFAULT NULL,
  `dateDown` date DEFAULT NULL,
  `accesControl` varchar(100) DEFAULT NULL,
  `readerEntry` varchar(100) DEFAULT NULL,
  `locationGabinet` varchar(100) DEFAULT NULL,
  `font` varchar(100) DEFAULT NULL,
  `aclaration` text DEFAULT NULL,
  `idTypeMaintenanceFk` int(11) DEFAULT NULL,
  `lock` varchar(200) DEFAULT NULL,
  `ouputReader` varchar(200) DEFAULT NULL,
  `ouputButom` varchar(200) DEFAULT NULL,
  `isOuputReader` tinyint(1) DEFAULT 0,
  `isOuputButom` tinyint(1) DEFAULT 0,
  `isBlocklingScrew` tinyint(1) DEFAULT 0,
  `butonEmergency` varchar(200) DEFAULT NULL,
  `keyboardOff` varchar(200) DEFAULT NULL,
  `acaration2` text DEFAULT NULL,
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
  `portHttp` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_services_alarms`
--

CREATE TABLE `tb_client_services_alarms` (
  `idClientServicesAlarms` int(11) UNSIGNED NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `contract` text DEFAULT NULL,
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
  `isLinePhone` tinyint(1) DEFAULT 0,
  `isModuleIp` tinyint(1) DEFAULT 0,
  `isModuleGps` tinyint(1) DEFAULT 0,
  `observation` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_services_alarms_aditional`
--

CREATE TABLE `tb_client_services_alarms_aditional` (
  `idClientServicesAlarmsAditionals` int(11) UNSIGNED NOT NULL,
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
  `isAutomatic` tinyint(1) DEFAULT 0,
  `hourAutomatic` int(11) DEFAULT NULL,
  `numberUserAsalt` int(11) DEFAULT NULL,
  `passAsalt` varchar(100) DEFAULT NULL,
  `police` varchar(100) DEFAULT NULL,
  `phonePolice` varchar(100) DEFAULT NULL,
  `serviceEmergencyMedical` varchar(100) DEFAULT NULL,
  `numberPartner` int(11) DEFAULT NULL,
  `plaint` varchar(100) DEFAULT NULL,
  `observation` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_services_camera`
--

CREATE TABLE `tb_client_services_camera` (
  `idClientServicesCamera` int(11) UNSIGNED NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `contract` text DEFAULT NULL,
  `idTypeMaintenanceFk` int(11) DEFAULT NULL,
  `dateUp` date DEFAULT NULL,
  `dateDown` date DEFAULT NULL,
  `DVR/NVR` varchar(200) DEFAULT NULL,
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
  `observation` text DEFAULT NULL,
  `addessClient` varchar(100) DEFAULT NULL,
  `addessClientLat` varchar(100) DEFAULT NULL,
  `addessClientLot` varchar(100) DEFAULT NULL,
  `portHttp` int(11) DEFAULT NULL,
  `namePort` varchar(100) DEFAULT NULL,
  `port` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_services_gps`
--

CREATE TABLE `tb_client_services_gps` (
  `idClientServicesGps` int(11) UNSIGNED NOT NULL,
  `idTypeGpsFk` int(11) DEFAULT NULL,
  `idTypeMaintenanceFk` int(11) DEFAULT NULL,
  `dateUp` date DEFAULT NULL,
  `dateDown` date DEFAULT NULL,
  `moden` varchar(200) DEFAULT NULL,
  `contract` text DEFAULT NULL,
  `idInternetCompanyFk` int(11) DEFAULT NULL,
  `nroLine` varchar(200) DEFAULT NULL,
  `nroChip` varchar(200) DEFAULT NULL,
  `idServiceAsociateFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_services_internet`
--

CREATE TABLE `tb_client_services_internet` (
  `idClientServicesInternet` int(11) UNSIGNED NOT NULL,
  `idClientServicesFk` int(11) DEFAULT NULL,
  `idTypeInternetFk` int(11) DEFAULT NULL,
  `idTypeMaintenanceFk` int(11) DEFAULT NULL,
  `idServiceFk` int(11) DEFAULT NULL,
  `idServiceAsociateFk` int(11) DEFAULT NULL,
  `idRouterInternetFk` int(11) DEFAULT NULL,
  `numberSeria` varchar(100) DEFAULT NULL,
  `userAdmin` varchar(100) DEFAULT NULL,
  `contract` text DEFAULT NULL,
  `idInternetCompanyFk` int(11) DEFAULT NULL,
  `modenMark` varchar(100) DEFAULT '',
  `dateDown` date DEFAULT NULL,
  `isDown` tinyint(1) DEFAULT 0,
  `port` decimal(11,0) DEFAULT NULL,
  `passAdmin` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_services_smart_panic`
--

CREATE TABLE `tb_client_services_smart_panic` (
  `idClientServicesSmartPanic` int(11) UNSIGNED NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `contract` text DEFAULT NULL,
  `dateUp` date DEFAULT NULL,
  `dateDown` date DEFAULT NULL,
  `idTypeMaintenanceFk` int(11) DEFAULT NULL,
  `companyMonitor` varchar(200) DEFAULT NULL,
  `sucribeNumber` varchar(200) DEFAULT NULL,
  `idDetinationOfLicenseFk` varchar(200) DEFAULT NULL,
  `idDepartmentFk` int(11) DEFAULT NULL,
  `countNewLicense` int(11) DEFAULT NULL,
  `observation` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_type`
--

CREATE TABLE `tb_client_type` (
  `idClientType` int(11) UNSIGNED NOT NULL,
  `ClientType` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_client_type`
--

INSERT INTO `tb_client_type` (`idClientType`, `ClientType`) VALUES
(1, 'Administracion'),
(2, 'Edificio'),
(3, 'Empresa'),
(4, 'Sucursal'),
(5, 'Particular');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_type_services`
--

CREATE TABLE `tb_client_type_services` (
  `idClientTypeServices` int(11) UNSIGNED NOT NULL,
  `clientTypeServices` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_client_type_services`
--

INSERT INTO `tb_client_type_services` (`idClientTypeServices`, `clientTypeServices`) VALUES
(1, 'CONTROL DE ACCESO'),
(2, 'INTERNET'),
(3, 'GPS'),
(4, 'TOTEM'),
(5, 'ALARMAS'),
(6, 'CAMARAS'),
(7, 'SMART PANIC');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_client_users`
--

CREATE TABLE `tb_client_users` (
  `idClientUsers` int(11) UNSIGNED NOT NULL,
  `idClientFk` int(11) DEFAULT NULL,
  `idUserFk` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_client_users`
--

INSERT INTO `tb_client_users` (`idClientUsers`, `idClientFk`, `idUserFk`, `created_at`) VALUES
(1, 2, 1, NULL),
(2, 2, 2, NULL),
(3, 3, 1, NULL),
(4, 3, 2, NULL),
(5, 4, 1, NULL),
(6, 4, 2, NULL),
(7, 5, 89, NULL),
(8, 6, 86, NULL);

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
  `isEdit` tinyint(11) DEFAULT 0
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
  `value` decimal(10,2) DEFAULT 0.00
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
  `isAprobatedAdmin` tinyint(4) DEFAULT 0,
  `isRequesLowByProp` tinyint(4) DEFAULT 0,
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
-- Estructura de tabla para la tabla `tb_detination_of_license`
--

CREATE TABLE `tb_detination_of_license` (
  `idDetinationOfLicense` int(11) UNSIGNED NOT NULL,
  `detinationOfLicense` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_detination_of_license`
--

INSERT INTO `tb_detination_of_license` (`idDetinationOfLicense`, `detinationOfLicense`) VALUES
(1, 'PROPIETARIO / HABITANTE'),
(2, 'ENCARGADO'),
(3, 'ADMINISTRACION DE CONSORCIO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_divice_opening`
--

CREATE TABLE `tb_divice_opening` (
  `idDiviceOpening` int(11) UNSIGNED NOT NULL,
  `diviceOpening` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_divice_opening`
--

INSERT INTO `tb_divice_opening` (`idDiviceOpening`, `diviceOpening`) VALUES
(1, 'Llavero marien'),
(2, 'Llavero hid'),
(3, 'Llavero hid ex'),
(4, 'Llaver pct ss'),
(5, 'Stiker Vehicular '),
(6, 'Movible hid'),
(7, 'Movible hid ex');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_format_tramitio`
--

CREATE TABLE `tb_format_tramitio` (
  `idFormatTramitio` int(11) UNSIGNED NOT NULL,
  `formatTramitio` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_format_tramitio`
--

INSERT INTO `tb_format_tramitio` (`idFormatTramitio`, `formatTramitio`) VALUES
(1, 'CONTACT-ID'),
(2, '4+2'),
(3, 'SIA'),
(4, 'CID');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_internet_company`
--

CREATE TABLE `tb_internet_company` (
  `idInternetCompany` int(11) UNSIGNED NOT NULL,
  `internetCompany` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_internet_company`
--

INSERT INTO `tb_internet_company` (`idInternetCompany`, `internetCompany`) VALUES
(1, 'TELECENTRO'),
(2, 'FIBERTEL'),
(3, 'MOVISTAR');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_location`
--

CREATE TABLE `tb_location` (
  `idLocation` int(11) UNSIGNED NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `idProvinceFK` int(11) DEFAULT NULL COMMENT 'ID DE LA PROVINCIA A LA QUE SE ASOCIA LA LOCALIDAD'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_location`
--

INSERT INTO `tb_location` (`idLocation`, `location`, `idProvinceFK`) VALUES
(1, 'CIUDAD DE BUENOS AIRES', 1),
(2, 'CONSTITUCION', 1),
(3, 'MONSERRAT', 1),
(4, 'PUERTO MADERO', 1),
(5, 'RETIRO', 1),
(6, 'SAN NICOLAS', 1),
(7, 'SAN TELMO', 1),
(8, 'RECOLETA', 1),
(9, 'BALVANERA', 1),
(10, 'SAN CRISTOBAL', 1),
(11, 'BARRACAS', 1),
(12, 'BOCA', 1),
(13, 'NUEVA POMPEYA', 1),
(14, 'PARQUE PATRICIOS', 1),
(15, 'ALMAGRO', 1),
(16, 'BOEDO', 1),
(17, 'CABALLITO', 1),
(18, 'FLORES', 1),
(19, 'PARQUE CHACABUCO', 1),
(20, 'VILLA LUGANO', 1),
(21, 'VILLA RIACHUELO', 1),
(22, 'VILLA SOLDATI', 1),
(23, 'LINIERS', 1),
(24, 'MATADEROS', 1),
(25, 'PARQUE AVELLANEDA', 1),
(26, 'FLORESTA', 1),
(27, 'MONTE CASTRO', 1),
(28, 'VELEZ SARSFIELD', 1),
(29, 'VERSALLES', 1),
(30, 'VILLA LURO', 1),
(31, 'VILLA REAL', 1),
(32, 'VILLA DEL PARQUE', 1),
(33, 'VILLA DEVOTO', 1),
(34, 'VILLA GENERAL MITRE', 1),
(35, 'VILLA SANTA RITA', 1),
(36, 'COGHLAN', 1),
(37, 'SAAVEDRA', 1),
(38, 'VILLA PUEYRREDON', 1),
(39, 'VILLA URQUIZA', 1),
(40, 'BELGRANO', 1),
(41, 'COLEGIALES', 1),
(42, 'NUÑEZ', 1),
(43, 'PALERMO', 1),
(44, 'AGRONOMIA', 1),
(45, 'CHACARITA', 1),
(46, 'PARQUE CHAS', 1),
(47, 'PATERNAL', 1),
(48, 'VILLA CRESPO', 1),
(49, 'VILLA ORTUZAR', 1),
(50, 'CARHUE', 2),
(51, 'COLONIA SAN MIGUEL ARCANGEL', 2),
(52, 'DELFIN HUERGO', 2),
(53, 'ESPARTILLAR', 2),
(54, 'ESTEBAN AGUSTIN GASCON', 2),
(55, 'LA PALA', 2),
(56, 'MAZA', 2),
(57, 'RIVERA', 2),
(58, 'VILLA MARGARITA', 2),
(59, 'YUTUYACO', 2),
(60, 'ADOLFO GONZALES CHAVES', 2),
(61, 'DE LA GARMA', 2),
(62, 'JUAN E. BARRA', 2),
(63, 'VASQUEZ', 2),
(64, 'ALBERTI', 2),
(65, 'CORONEL SEGUI', 2),
(66, 'MECHITA', 2),
(67, 'PLA', 2),
(68, 'VILLA GRISOLIA', 2),
(69, 'VILLA MARIA', 2),
(70, 'VILLA ORTIZ', 2),
(71, 'ADROGUE', 2),
(72, 'BURZACO', 2),
(73, 'CLAYPOLE', 2),
(74, 'DON ORIONE', 2),
(75, 'GLEW', 2),
(76, 'JOSE MARMOL', 2),
(77, 'LONGCHAMPS', 2),
(78, 'MALVINAS ARGENTINAS', 2),
(79, 'MINISTRO RIVADAVIA', 2),
(80, 'RAFAEL CALZADA', 2),
(81, 'SAN FRANCISCO SOLANO', 2),
(82, 'SAN JOSE', 2),
(83, 'AREA CINTURON ECOLOGICO', 2),
(84, 'AVELLANEDA', 2),
(85, 'CRUCESITA', 2),
(86, 'DOCK SUD', 2),
(87, 'GERLI', 2),
(88, 'PIÑEYRO', 2),
(89, 'SARANDI', 2),
(90, 'VILLA DOMINICO', 2),
(91, 'WILDE', 2),
(92, 'AYACUCHO', 2),
(93, 'LA CONSTANCIA', 2),
(94, 'SOLANET', 2),
(95, 'UDAQUIOLA', 2),
(96, 'ARIEL', 2),
(97, 'AZUL', 2),
(98, 'CACHARI', 2),
(99, 'CHILLAR', 2),
(100, '16 DE JULIO', 2),
(101, 'BAHIA BLANCA', 2),
(102, 'GRÜNBEIN', 2),
(103, 'INGENIERO WHITE', 2),
(104, 'VILLA BORDEAU', 2),
(105, 'VILLA ESPORA', 2),
(106, 'CABILDO', 2),
(107, 'GENERAL DANIEL CERRI', 2),
(108, 'BALCARCE', 2),
(109, 'LOS PINOS', 2),
(110, 'NAPALEOFU', 2),
(111, 'RAMOS OTERO', 2),
(112, 'SAN AGUSTIN', 2),
(113, 'VILLA LAGUNA LA BRAVA', 2),
(114, 'BARADERO', 2),
(115, 'IRINEO PORTELA', 2),
(116, 'SANTA COLOMA', 2),
(117, 'VILLA ALSINA', 2),
(118, 'ARRECIFES', 2),
(119, 'TODD', 2),
(120, 'VI¥A', 2),
(121, 'BARKER', 2),
(122, 'BENITO JUAREZ', 2),
(123, 'LOPEZ', 2),
(124, 'TEDIN URIBURU', 2),
(125, 'VILLA CACIQUE', 2),
(126, 'BERAZATEGUI', 2),
(127, 'BERAZATEGUI OESTE', 2),
(128, 'CARLOS TOMAS SOURIGUES', 2),
(129, 'EL PATO', 2),
(130, 'GUILLERMO ENRIQUE HUDSON', 2),
(131, 'JUAN MARIA GUTIERREZ', 2),
(132, 'PEREYRA', 2),
(133, 'PLATANOS', 2),
(134, 'RANELAGH', 2),
(135, 'VILLA ESPAÑA', 2),
(136, 'BARRIO BANCO PROVINCIA', 2),
(137, 'BARRIO EL CARMEN (ESTE)', 2),
(138, 'BARRIO UNIVERSITARIO', 2),
(139, 'BERISSO', 2),
(140, 'LOS TALAS', 2),
(141, 'VILLA ARGÜELLO', 2),
(142, 'VILLA DOLORES', 2),
(143, 'VILLA INDEPENDENCIA', 2),
(144, 'VILLA NUEVA', 2),
(145, 'VILLA PORTEÑA', 2),
(146, 'VILLA PROGRESO', 2),
(147, 'VILLA SAN CARLOS', 2),
(148, 'VILLA ZULA', 2),
(149, 'HALE', 2),
(150, 'JUAN F. IBARRA', 2),
(151, 'PAULA', 2),
(152, 'PIROVANO', 2),
(153, 'SAN CARLOS DE BOLIVAR', 2),
(154, 'URDAMPILLETA', 2),
(155, 'VILLA LYNCH PUEYRREDON', 2),
(156, 'ASAMBLEA', 2),
(157, 'BRAGADO', 2),
(158, 'COMODORO PY', 2),
(159, 'GENERAL O\'BRIEN', 2),
(160, 'IRALA', 2),
(161, 'LA LIMPIA', 2),
(162, 'MAXIMO FERNANDEZ', 2),
(163, 'MECHITA', 2),
(164, 'OLASCOAGA', 2),
(165, 'WARNES', 2),
(166, 'ALTAMIRANO', 2),
(167, 'BARRIO EL MIRADOR', 2),
(168, 'BARRIO LAS GOLONDRINAS', 2),
(169, 'BARRIO LOS BOSQUECITOS', 2),
(170, 'BARRIO PARQUE LAS ACACIAS', 2),
(171, 'CAMPOS DE ROCA', 2),
(172, 'CORONEL BRANDSEN', 2),
(173, 'CLUB DE CAMPO LAS MALVINAS', 2),
(174, 'GOMEZ', 2),
(175, 'JEPPENER', 2),
(176, 'OLIDEN', 2),
(177, 'POSADA DE LOS LAGOS', 2),
(178, 'SAMBOROMBON', 2),
(179, 'ALTO LOS CARDALES', 2),
(180, 'BARRIO LOS PIONEROS', 2),
(181, 'CAMPANA', 2),
(182, 'CHACRAS DEL RIO LUJAN', 2),
(183, 'LOMAS DEL RIO LUJAN', 2),
(184, 'ALEJANDRO PETION', 2),
(185, 'BARRIO EL TALADRO', 2),
(186, 'CA¥UELAS', 2),
(187, 'GOBERNADOR UDAONDO', 2),
(188, 'BARRIO BELGRANO', 2),
(189, 'MAXIMO PAZ', 2),
(190, 'SANTA ROSA', 2),
(191, 'URIBELARREA', 2),
(192, 'VICENTE CASARES', 2),
(193, 'CAPITAN SARMIENTO', 2),
(194, 'LA LUISA', 2),
(195, 'BELLOCQ', 2),
(196, 'CADRET', 2),
(197, 'CARLOS CASARES', 2),
(198, 'COLONIA MAURICIO', 2),
(199, 'HORTENSIA', 2),
(200, 'LA SOFIA', 2),
(201, 'MAURICIO HIRSCH', 2),
(202, 'MOCTEZUMA', 2),
(203, 'ORDOQUI', 2),
(204, 'SANTO TOMAS', 2),
(205, 'SMITH', 2),
(206, 'CARLOS TEJEDOR', 2),
(207, 'COLONIA SERE', 2),
(208, 'CURARU', 2),
(209, 'TIMOTE', 2),
(210, 'TRES ALGARROBOS', 2),
(211, 'CARMEN DE ARECO', 2),
(212, 'PUEBLO GOUIN', 2),
(213, 'TRES SARGENTOS', 2),
(214, 'CASTELLI', 2),
(215, 'CENTRO GUERRERO', 2),
(216, 'CERRO DE LA GLORIA (CANAL 15)', 2),
(217, 'COLON', 2),
(218, 'EL ARBOLITO', 2),
(219, 'PEARSON', 2),
(220, 'SARASA', 2),
(221, 'BAJO HONDO', 2),
(222, 'BALNEARIO PEHUEN CO', 2),
(223, 'PAGO CHICO', 2),
(224, 'PUNTA ALTA', 2),
(225, 'PUNTA ALTA', 2),
(226, 'VILLA DEL MAR', 2),
(227, 'VILLA GENERAL ARIAS', 2),
(228, 'APARICIO', 2),
(229, 'BALNEARIO MARISOL', 2),
(230, 'CORONEL DORREGO', 2),
(231, 'EL PERDIDO', 2),
(232, 'FARO', 2),
(233, 'IRENE', 2),
(234, 'ORIENTE', 2),
(235, 'LA RUTA', 2),
(236, 'SAN ROMAN', 2),
(237, 'CORONEL PRINGLES', 2),
(238, 'EL DIVISORIO', 2),
(239, 'EL PENSAMIENTO', 2),
(240, 'INDIO RICO', 2),
(241, 'LARTIGAU', 2),
(242, 'CASCADAS', 2),
(243, 'CORONEL SUAREZ', 2),
(244, 'CURA MALAL', 2),
(245, 'D\'ORBIGNY', 2),
(246, 'HUANGUELEN', 2),
(247, 'PASMAN', 2),
(248, 'SAN JOSE', 2),
(249, 'SANTA MARIA', 2),
(250, 'SANTA TRINIDAD', 2),
(251, 'VILLA LA ARCADIA', 2),
(252, 'CASTILLA', 2),
(253, 'CHACABUCO', 2),
(254, 'LOS ANGELES', 2),
(255, 'O\'HIGGINS', 2),
(256, 'RAWSON', 2),
(257, 'BARRIO LOMAS ALTAS', 2),
(258, 'CHASCOMUS', 2),
(259, 'BARRIO SAN CAYETANO', 2),
(260, 'LAGUNA VITEL', 2),
(261, 'MANUEL J. COBO', 2),
(262, 'VILLA PARQUE GIRADO', 2),
(263, 'BENITEZ', 2),
(264, 'CHIVILCOY', 2),
(265, 'EMILIO AYARZA', 2),
(266, 'GOROSTIAGA', 2),
(267, 'LA RICA', 2),
(268, 'MOQUEHUA', 2),
(269, 'RAMON BIAUS', 2),
(270, 'SAN SEBASTIAN', 2),
(271, 'ANDANT', 2),
(272, 'ARBOLEDAS', 2),
(273, 'DAIREAUX', 2),
(274, 'LA LARGA', 2),
(275, 'SALAZAR', 2),
(276, 'DOLORES', 2),
(277, 'SEVIGNE', 2),
(278, 'DIQUE Nº 1', 2),
(279, 'ENSENADA', 2),
(280, 'ISLA SANTIAGO (OESTE)', 2),
(281, 'PUNTA LARA', 2),
(282, 'VILLA CATELA', 2),
(283, 'BELEN DE ESCOBAR', 2),
(284, 'EL CAZADOR', 2),
(285, 'GARIN', 2),
(286, 'INGENIERO MASCHWITZ', 2),
(287, 'LOMA VERDE', 2),
(288, 'MATHEU', 2),
(289, 'MAQUINISTA F. SAVIO ESTE', 2),
(290, 'CANNING', 2),
(291, 'EL JAGÜEL', 2),
(292, 'LUIS GUILLON', 2),
(293, 'MONTE GRANDE', 2),
(294, '9 DE ABRIL', 2),
(295, 'ARROYO DE LA CRUZ', 2),
(296, 'CAPILLA DEL SE¥OR', 2),
(297, 'DIEGO GAYNOR', 2),
(298, 'LOS CARDALES', 2),
(299, 'PARADA ORLANDO', 2),
(300, 'EL REMANSO', 2),
(301, 'PARADA ROBLES', 2),
(302, 'PAVON', 2),
(303, 'AEROPUERTO INTERNACIONAL EZEIZA', 2),
(304, 'CANNING', 2),
(305, 'CARLOS SPEGAZZINI', 2),
(306, 'JOSE MARIA EZEIZA', 2),
(307, 'LA UNION', 2),
(308, 'TRISTAN SUAREZ', 2),
(309, 'BOSQUES', 2),
(310, 'ESTANISLAO SEVERO ZEBALLOS', 2),
(311, 'FLORENCIO VARELA', 2),
(312, 'GOBERNADOR JULIO A. COSTA', 2),
(313, 'INGENIERO JUAN ALLAN', 2),
(314, 'VILLA BROWN', 2),
(315, 'VILLA SAN LUIS', 2),
(316, 'VILLA SANTA ROSA', 2),
(317, 'VILLA VATTEONE', 2),
(318, 'EL TROPEZON', 2),
(319, 'LA CAPILLA', 2),
(320, 'BLAQUIER', 2),
(321, 'FLORENTINO AMEGHINO', 2),
(322, 'PORVENIR', 2),
(323, 'CENTINELA DEL MAR', 2),
(324, 'COMANDANTE NICANOR OTAMENDI', 2),
(325, 'MAR DEL SUR', 2),
(326, 'MECHONGUE', 2),
(327, 'MIRAMAR', 2),
(328, 'GENERAL ALVEAR', 2),
(329, 'ARRIBE¥OS', 2),
(330, 'ASCENSION', 2),
(331, 'ESTACION ARENALES', 2),
(332, 'FERRE', 2),
(333, 'GENERAL ARENALES', 2),
(334, 'LA ANGELITA', 2),
(335, 'LA TRINIDAD', 2),
(336, 'GENERAL BELGRANO', 2),
(337, 'GORCHS', 2),
(338, 'GENERAL GUIDO', 2),
(339, 'LABARDEN', 2),
(340, 'BARRIO KENNEDY', 2),
(341, 'GENERAL JUAN MADARIAGA', 2),
(342, 'GENERAL LA MADRID', 2),
(343, 'LA COLINA', 2),
(344, 'LAS MARTINETAS', 2),
(345, 'LIBANO', 2),
(346, 'PONTAUT', 2),
(347, 'GENERAL HORNOS', 2),
(348, 'GENERAL LAS HERAS', 2),
(349, 'LA CHOZA', 2),
(350, 'PLOMER', 2),
(351, 'VILLARS', 2),
(352, 'GENERAL LAVALLE', 2),
(353, 'PAVON', 2),
(354, 'BARRIO RIO SALADO', 2),
(355, 'LOMA VERDE', 2),
(356, 'RANCHOS', 2),
(357, 'VILLANUEVA', 2),
(358, 'COLONIA SAN RICARDO', 2),
(359, 'GENERAL PINTO', 2),
(360, 'GERMANIA', 2),
(361, 'GUNTHER', 2),
(362, 'VILLA FRANCIA', 2),
(363, 'VILLA ROTH', 2),
(364, 'BARRIO EL BOQUERON', 2),
(365, 'BARRIO LA GLORIA', 2),
(366, 'BARRIO SANTA PAULA', 2),
(367, 'BATAN', 2),
(368, 'CHAPADMALAL', 2),
(369, 'EL MARQUESADO', 2),
(370, 'ESTACION CHAPADMALAL', 2),
(371, 'CAMET', 2),
(372, 'ESTACION CAMET', 2),
(373, 'MAR DEL PLATA', 2),
(374, 'PUNTA MOGOTES', 2),
(375, 'BARRIO EL CASAL', 2),
(376, 'SIERRA DE LOS PADRES', 2),
(377, 'BARRIO COLINAS VERDES', 2),
(378, 'BARRIO EL COYUNCO', 2),
(379, 'SIERRA DE LOS PADRES', 2),
(380, 'GENERAL RODRIGUEZ', 2),
(381, 'BARRIO MORABO', 2),
(382, 'BARRIO RUTA 24 KM. 10', 2),
(383, 'C.C. BOSQUE REAL', 2),
(384, 'GENERAL RODRGUEZ', 2),
(385, 'BARRIO PARQUE GENERAL SAN MARTIN', 2),
(386, 'BILLINGHURST', 2),
(387, 'CIUDAD DEL LIBERTADOR GENERAL SAN MARTIN', 2),
(388, 'CIUDAD JARDIN EL LIBERTADOR', 2),
(389, 'VILLA AYACUCHO', 2),
(390, 'VILLA BALLESTER', 2),
(391, 'VILLA BERNARDO MONTEAGUDO', 2),
(392, 'VILLA CHACABUCO', 2),
(393, 'VILLA CORONEL JOSE M. ZAPIOLA', 2),
(394, 'VILLA GENERAL ANTONIO J. DE SUCRE', 2),
(395, 'VILLA GENERAL EUGENIO NECOCHEA', 2),
(396, 'VILLA GENERAL JOSE TOMAS GUIDO', 2),
(397, 'VILLA GENERAL JUAN G. LAS HERAS', 2),
(398, 'VILLA GODOY CRUZ', 2),
(399, 'VILLA GRANADEROS DE SAN MARTIN', 2),
(400, 'VILLA GREGORIA MATORRAS', 2),
(401, 'VILLA JOSE LEON SUAREZ', 2),
(402, 'VILLA JUAN MARTIN DE PUEYRREDON', 2),
(403, 'VILLA LIBERTAD', 2),
(404, 'VILLA LYNCH', 2),
(405, 'VILLA MAIPU', 2),
(406, 'VILLA MARIA IRENE DE LOS REMEDIOS DE ESCALADA', 2),
(407, 'VILLA MARQUES ALEJANDRO MARIA DE AGUADO', 2),
(408, 'VILLA PARQUE PRESIDENTE FIGUEROA ALCORTA', 2),
(409, 'VILLA PARQUE SAN LORENZO', 2),
(410, 'VILLA SAN ANDRES', 2),
(411, 'VILLA YAPEYU', 2),
(412, 'BAIGORRITA', 2),
(413, 'LA DELFINA', 2),
(414, 'LOS TOLDOS', 2),
(415, 'SAN EMILIO', 2),
(416, 'ZAVALIA', 2),
(417, 'BANDERALO', 2),
(418, 'CA¥ADA SECA', 2),
(419, 'CORONEL CHARLONE', 2),
(420, 'EMILIO V. BUNGE', 2),
(421, 'GENERAL VILLEGAS', 2),
(422, 'MASSEY', 2),
(423, 'PICHINCHA', 2),
(424, 'PIEDRITAS', 2),
(425, 'SANTA ELEODORA', 2),
(426, 'SANTA REGINA', 2),
(427, 'VILLA SABOYA', 2),
(428, 'VILLA SAUZE', 2),
(429, 'ARROYO VENADO', 2),
(430, 'CASBAS', 2),
(431, 'GARRE', 2),
(432, 'GUAMINI', 2),
(433, 'LAGUNA ALSINA', 2),
(434, 'HENDERSON', 2),
(435, 'HERRERA VEGAS', 2),
(436, 'HURLINGHAM', 2),
(437, 'VILLA SANTOS TESEI', 2),
(438, 'WILLIAM C. MORRIS', 2),
(439, 'ITUZAINGO CENTRO', 2),
(440, 'ITUZAINGO SUR', 2),
(441, 'VILLA GOBERNADOR UDAONDO', 2),
(442, 'DEL VISO', 2),
(443, 'JOSE C. PAZ', 2),
(444, 'TORTUGUITAS', 2),
(445, 'AGUSTIN ROCA', 2),
(446, 'AGUSTINA', 2),
(447, 'BALNEARIO LAGUNA DE GOMEZ', 2),
(448, 'FORTIN TIBURCIO', 2),
(449, 'JUNIN', 2),
(450, 'LA AGRARIA', 2),
(451, 'LAPLACETTE', 2),
(452, 'MORSE', 2),
(453, 'SAFORCADA', 2),
(454, 'LAS TONINAS', 2),
(455, 'AGUAS VERDES', 2),
(456, 'LUCILA DEL MAR', 2),
(457, 'MAR DE AJO', 2),
(458, 'MAR DE AJO NORTE', 2),
(459, 'SAN BERNARDO', 2),
(460, 'SAN CLEMENTE DEL TUYU', 2),
(461, 'MAR DEL TUYU', 2),
(462, 'SANTA TERESITA', 2),
(463, 'ALDO BONZI', 2),
(464, 'CIUDAD EVITA', 2),
(465, 'GONZALEZ CATAN', 2),
(466, 'GREGORIO DE LAFERRERE', 2),
(467, 'ISIDRO CASANOVA', 2),
(468, 'LA TABLADA', 2),
(469, 'LOMAS DEL MIRADOR', 2),
(470, 'RAFAEL CASTILLO', 2),
(471, 'RAMOS MEJIA', 2),
(472, 'SAN JUSTO', 2),
(473, 'TAPIALES', 2),
(474, '20 DE JUNIO', 2),
(475, 'VILLA EDUARDO MADERO', 2),
(476, 'VILLA LUZURIAGA', 2),
(477, 'VIRREY DEL PINO', 2),
(478, 'GERLI', 2),
(479, 'LANUS ESTE', 2),
(480, 'LANUS OESTE', 2),
(481, 'MONTE CHINGOLO', 2),
(482, 'REMEDIOS ESCALADA DE SAN MARTIN', 2),
(483, 'VALENTIN ALSINA', 2),
(484, 'COUNTRY CLUB EL RODEO', 2),
(485, 'IGNACIO CORREAS', 2),
(486, 'ABASTO', 2),
(487, 'ANGEL ETCHEVERRY', 2),
(488, 'ARANA', 2),
(489, 'ARTURO SEGUI', 2),
(490, 'BARRIO EL CARMEN (OESTE)', 2),
(491, 'BARRIO GAMBIER', 2),
(492, 'BARRIO LAS MALVINAS', 2),
(493, 'BARRIO LAS QUINTAS', 2),
(494, 'CITY BELL', 2),
(495, 'EL RETIRO', 2),
(496, 'JOAQUIN GORINA', 2),
(497, 'JOSE HERNANDEZ', 2),
(498, 'JOSE MELCHOR ROMERO', 2),
(499, 'LA CUMBRE', 2),
(500, 'LA PLATA', 2),
(501, 'LISANDRO OLMOS', 2),
(502, 'LOS HORNOS', 2),
(503, 'MANUEL B. GONNET', 2),
(504, 'RINGUELET', 2),
(505, 'RUFINO DE ELIZALDE', 2),
(506, 'TOLOSA', 2),
(507, 'TRANSRADIO', 2),
(508, 'VILLA ELISA', 2),
(509, 'VILLA ELVIRA', 2),
(510, 'VILLA GARIBALDI', 2),
(511, 'VILLA MONTORO', 2),
(512, 'VILLA PARQUE SICARDI', 2),
(513, 'LOMAS DE COPELLO', 2),
(514, 'BARRIO RUTA SOL', 2),
(515, 'LAPRIDA', 2),
(516, 'PUEBLO NUEVO', 2),
(517, 'PUEBLO SAN JORGE', 2),
(518, 'CORONEL BOERR', 2),
(519, 'EL TRIGO', 2),
(520, 'LAS FLORES', 2),
(521, 'PARDO', 2),
(522, 'ALBERDI VIEJO', 2),
(523, 'EL DORADO', 2),
(524, 'FORTIN ACHA', 2),
(525, 'JUAN BAUTISTA ALBERDI', 2),
(526, 'LEANDRO N. ALEM', 2),
(527, 'VEDIA', 2),
(528, 'ARENAZA', 2),
(529, 'BAYAUCA', 2),
(530, 'BERMUDEZ', 2),
(531, 'CARLOS SALAS', 2),
(532, 'CORONEL MARTINEZ DE HOZ', 2),
(533, 'EL TRIUNFO', 2),
(534, 'LAS TOSCAS', 2),
(535, 'LINCOLN', 2),
(536, 'PASTEUR', 2),
(537, 'ROBERTS', 2),
(538, 'TRIUNVIRATO', 2),
(539, 'ARENAS VERDES', 2),
(540, 'LICENCIADO MATIENZO', 2),
(541, 'LOBERIA', 2),
(542, 'PIERES', 2),
(543, 'SAN MANUEL', 2),
(544, 'TAMANGUEYU', 2),
(545, 'ANTONIO CARBONI', 2),
(546, 'ELVIRA', 2),
(547, 'LAGUNA DE LOBOS', 2),
(548, 'LOBOS', 2),
(549, 'SALVADOR MARIA', 2),
(550, 'BANFIELD', 2),
(551, 'LLAVALLOL', 2),
(552, 'LOMAS DE ZAMORA', 2),
(553, 'TEMPERLEY', 2),
(554, 'TURDERA', 2),
(555, 'VILLA CENTENARIO', 2),
(556, 'VILLA FIORITO', 2),
(557, 'CARLOS KEEN', 2),
(558, 'CLUB DE CAMPO LOS PUENTES', 2),
(559, 'LUJAN', 2),
(560, 'BARRIO LAS CASUARINAS', 2),
(561, 'CORTINES', 2),
(562, 'LEZICA Y TORREZURI', 2),
(563, 'LUJAN', 2),
(564, 'VILLA FLANDRIA NORTE (PUEBLO NUEVO)', 2),
(565, 'VILLA FLANDRIA SUR (EST. JAUREGUI)', 2),
(566, 'COUNTRY CLUB LAS PRADERAS', 2),
(567, 'OPEN DOOR', 2),
(568, 'OLIVERA', 2),
(569, 'TORRES', 2),
(570, 'ATALAYA', 2),
(571, 'GENERAL MANSILLA', 2),
(572, 'LOS NARANJOS', 2),
(573, 'MAGDALENA', 2),
(574, 'ROBERTO J. PAYRO', 2),
(575, 'VIEYTES', 2),
(576, 'LAS ARMAS', 2),
(577, 'MAIPU', 2),
(578, 'SANTO DOMINGO', 2),
(579, 'AREA DE PROMOCION EL TRIANGULO', 2),
(580, 'GRAND BOURG', 2),
(581, 'INGENIERO ADOLFO SOURDEAUX', 2),
(582, 'INGENIERO PABLO NOGUES', 2),
(583, 'LOS POLVORINES', 2),
(584, 'TORTUGUITAS', 2),
(585, 'VILLA DE MAYO', 2),
(586, 'CORONEL VIDAL', 2),
(587, 'GENERAL PIRAN', 2),
(588, 'LA ARMONIA', 2),
(589, 'MAR CHIQUITA', 2),
(590, 'LA BALIZA', 2),
(591, 'LA CALETA', 2),
(592, 'MAR DE COBO', 2),
(593, 'ATLANTIDA', 2),
(594, 'CAMET NORTE', 2),
(595, 'FRENTE MAR', 2),
(596, 'PLAYA DORADA', 2),
(597, 'SANTA CLARA DEL MAR', 2),
(598, 'SANTA ELENA', 2),
(599, 'VIVORATA', 2),
(600, 'BARRIO SANTA ROSA', 2),
(601, 'BARRIOS LISANDRO DE LA TORRE Y SANTA MARTA', 2),
(602, 'MARCOS PAZ', 2),
(603, 'GOLDNEY', 2),
(604, 'GOWLAND', 2),
(605, 'MERCEDES', 2),
(606, 'TOMAS JOFRE', 2),
(607, 'LIBERTAD', 2),
(608, 'MARIANO ACOSTA', 2),
(609, 'MERLO', 2),
(610, 'PONTEVEDRA', 2),
(611, 'SAN ANTONIO DE PADUA', 2),
(612, 'ABBOTT', 2),
(613, 'SAN MIGUEL DEL MONTE', 2),
(614, 'ZENON VIDELA DORNA', 2),
(615, 'BALNEARIO SAUCE GRANDE', 2),
(616, 'MONTE HERMOSO', 2),
(617, 'CUARTEL V', 2),
(618, 'FRANCISCO ALVAREZ', 2),
(619, 'LA REJA', 2),
(620, 'MORENO', 2),
(621, 'PASO DEL REY', 2),
(622, 'TRUJUI', 2),
(623, 'CASTELAR', 2),
(624, 'EL PALOMAR', 2),
(625, 'HAEDO', 2),
(626, 'MORON', 2),
(627, 'VILLA SARMIENTO', 2),
(628, 'JOSE JUAN ALMEYRA', 2),
(629, 'LAS MARIANAS', 2),
(630, 'NAVARRO', 2),
(631, 'VILLA MOLL', 2),
(632, 'CLARAZ', 2),
(633, 'ENERGIA', 2),
(634, 'JUAN N. FERNANDEZ', 2),
(635, 'NECOCHEA', 2),
(636, 'QUEQUEN', 2),
(637, 'COSTA BONITA', 2),
(638, 'NICANOR OLIVERA', 2),
(639, 'RAMON SANTAMARINA', 2),
(640, 'ALFREDO DEMARCHI', 2),
(641, 'CARLOS MARIA NAON', 2),
(642, '12 DE OCTUBRE', 2),
(643, 'DUDIGNAC', 2),
(644, 'LA AURORA', 2),
(645, 'MANUEL B. GONNET', 2),
(646, 'MARCELINO UGARTE', 2),
(647, 'MOREA', 2),
(648, 'NORUMBEGA', 2),
(649, '9 DE JULIO', 2),
(650, 'PATRICIOS', 2),
(651, 'VILLA GENERAL FOURNIER', 2),
(652, 'BLANCAGRANDE', 2),
(653, 'COLONIA NIEVAS', 2),
(654, 'COLONIA SAN MIGUEL', 2),
(655, 'ESPIGAS', 2),
(656, 'HINOJO', 2),
(657, 'COLONIA HINOJO', 2),
(658, 'HINOJO', 2),
(659, 'OLAVARRIA', 2),
(660, 'RECALDE', 2),
(661, 'SANTA LUISA', 2),
(662, 'SIERRA CHICA', 2),
(663, 'SIERRAS BAYAS', 2),
(664, 'VILLA ARRIETA', 2),
(665, 'VILLA ALFREDO FORTABAT', 2),
(666, 'VILLA LA SERRANIA', 2),
(667, 'BAHIA SAN BLAS', 2),
(668, 'CARDENAL CAGLIERO', 2),
(669, 'CARMEN DE PATAGONES', 2),
(670, 'JOSE B. CASAS', 2),
(671, 'JUAN A. PRADERE', 2),
(672, 'STROEDER', 2),
(673, 'VILLALONGA', 2),
(674, 'CAPITAN CASTRO', 2),
(675, 'CHICLANA', 2),
(676, 'FRANCISCO MADERO', 2),
(677, 'INOCENCIO SOSA', 2),
(678, 'JUAN JOSE PASO', 2),
(679, 'MAGDALA', 2),
(680, 'MONES CAZON', 2),
(681, 'NUEVA PLATA', 2),
(682, 'PEHUAJO', 2),
(683, 'SAN BERNARDO', 2),
(684, 'BOCAYUVA', 2),
(685, 'DE BARY', 2),
(686, 'PELLEGRINI', 2),
(687, 'ACEVEDO', 2),
(688, 'FONTEZUELA', 2),
(689, 'GUERRICO', 2),
(690, 'JUAN A. DE LA PE¥A', 2),
(691, 'JUAN ANCHORENA', 2),
(692, 'LA VIOLETA', 2),
(693, 'MANUEL OCAMPO', 2),
(694, 'MARIANO BENITEZ', 2),
(695, 'MARIANO H. ALFONZO', 2),
(696, 'PERGAMINO', 2),
(697, 'PINZON', 2),
(698, 'RANCAGUA', 2),
(699, 'VILLA ANGELICA', 2),
(700, 'VILLA SAN JOSE', 2),
(701, 'CASALINS', 2),
(702, 'PILA', 2),
(703, 'DEL VISO', 2),
(704, 'FATIMA', 2),
(705, 'LA LONJA', 2),
(706, 'LOS CACHORROS', 2),
(707, 'MANZANARES', 2),
(708, 'MANZONE', 2),
(709, 'MAQUINISTA F. SAVIO (OESTE)', 2),
(710, 'PILAR', 2),
(711, 'PRESIDENTE DERQUI', 2),
(712, 'ROBERTO DE VICENZO', 2),
(713, 'SANTA TERESA', 2),
(714, 'TORTUGUITAS', 2),
(715, 'VILLA ASTOLFI', 2),
(716, 'VILLA ROSA', 2),
(717, 'ZELAYA', 2),
(718, 'CARILO', 2),
(719, 'OSTENDE', 2),
(720, 'PINAMAR', 2),
(721, 'VALERIA DEL MAR', 2),
(722, 'BARRIO AMERICA UNIDA', 2),
(723, 'GUERNICA', 2),
(724, 'AZOPARDO', 2),
(725, 'BORDENAVE', 2),
(726, 'DARREGUEIRA', 2),
(727, '17 DE AGOSTO', 2),
(728, 'ESTELA', 2),
(729, 'FELIPE SOLA', 2),
(730, 'LOPEZ LECUBE', 2),
(731, 'PUAN', 2),
(732, 'SAN GERMAN', 2),
(733, 'VILLA CASTELAR', 2),
(734, 'VILLA IRIS', 2),
(735, 'ALVAREZ JONTE', 2),
(736, 'PIPINAS', 2),
(737, 'PUNTA INDIO', 2),
(738, 'VERONICA', 2),
(739, 'BERNAL', 2),
(740, 'BERNAL OESTE', 2),
(741, 'DON BOSCO', 2),
(742, 'EZPELETA', 2),
(743, 'EZPELETA OESTE', 2),
(744, 'QUILMES', 2),
(745, 'QUILMES OESTE', 2),
(746, 'SAN FRANCISCO SOLANO', 2),
(747, 'VILLA LA FLORIDA', 2),
(748, 'EL PARAISO', 2),
(749, 'LAS BAHAMAS', 2),
(750, 'PEREZ MILLAN', 2),
(751, 'RAMALLO', 2),
(752, 'VILLA GENERAL SAVIO', 2),
(753, 'VILLA RAMALLO', 2),
(754, 'RAUCH', 2),
(755, 'AMERICA', 2),
(756, 'FORTIN OLAVARRIA', 2),
(757, 'GONZALEZ MORENO', 2),
(758, 'MIRA PAMPA', 2),
(759, 'ROOSEVELT', 2),
(760, 'SAN MAURICIO', 2),
(761, 'SANSINENA', 2),
(762, 'SUNDBLAD', 2),
(763, 'LA BEBA', 2),
(764, 'LAS CARABELAS', 2),
(765, 'LOS INDIOS', 2),
(766, 'RAFAEL OBLIGADO', 2),
(767, 'ROBERTO CANO', 2),
(768, 'ROJAS', 2),
(769, 'BARRIO LAS MARGARITAS', 2),
(770, 'ROJAS', 2),
(771, 'VILLA PARQUE CECIR', 2),
(772, 'ESTACION SOL DE MAYO', 2),
(773, 'VILLA MANUEL POMAR', 2),
(774, 'CARLOS BEGUERIE', 2),
(775, 'ROQUE PEREZ', 2),
(776, 'ARROYO CORTO', 2),
(777, 'COLONIA SAN MARTIN', 2),
(778, 'DUFAUR', 2),
(779, 'ESPARTILLAR (E)', 2),
(780, 'GOYENA', 2),
(781, 'LAS ENCADENADAS', 2),
(782, 'PIGUE', 2),
(783, 'SAAVEDRA', 2),
(784, 'ALVAREZ DE TOLEDO', 2),
(785, 'CAZON', 2),
(786, 'DEL CARRIL', 2),
(787, 'POLVAREDAS', 2),
(788, 'SALADILLO', 2),
(789, 'ARROYO DULCE', 2),
(790, 'BERDIER', 2),
(791, 'GAHAN', 2),
(792, 'INES INDART', 2),
(793, 'LA INVENCIBLE', 2),
(794, 'SALTO', 2),
(795, 'QUENUMA', 2),
(796, 'SALLIQUELO', 2),
(797, 'AZCUENAGA', 2),
(798, 'CULULLU', 2),
(799, 'FRANKLIN', 2),
(800, 'SAN ANDRES DE GILES', 2),
(801, 'SOLIS', 2),
(802, 'VILLA ESPIL', 2),
(803, 'VILLA RUIZ', 2),
(804, 'DUGGAN', 2),
(805, 'SAN ANTONIO DE ARECO', 2),
(806, 'VILLA LIA', 2),
(807, 'BALNEARIO SAN CAYETANO', 2),
(808, 'OCHANDIO', 2),
(809, 'SAN CAYETANO', 2),
(810, 'SAN FERNANDO', 2),
(811, 'VICTORIA', 2),
(812, 'VIRREYES', 2),
(813, 'ACASSUSO', 2),
(814, 'BECCAR', 2),
(815, 'BOULOGNE SUR MER', 2),
(816, 'MARTINEZ', 2),
(817, 'SAN ISIDRO', 2),
(818, 'VILLA ADELINA', 2),
(819, 'BELLA VISTA', 2),
(820, 'CAMPO DE MAYO', 2),
(821, 'MUÑIZ', 2),
(822, 'SAN MIGUEL', 2),
(823, 'CONESA', 2),
(824, 'EREZCANO', 2),
(825, 'GENERAL ROJO', 2),
(826, 'LA EMILIA', 2),
(827, 'VILLA CAMPI', 2),
(828, 'VILLA CANTO', 2),
(829, 'VILLA RICCIO', 2),
(830, 'CAMPOS SALLES', 2),
(831, 'SAN NICOLAS DE LOS ARROYOS', 2),
(832, 'VILLA ESPERANZA', 2),
(833, 'GOBERNADOR CASTRO', 2),
(834, 'INGENIERO MONETA', 2),
(835, 'OBLIGADO', 2),
(836, 'PUEBLO DOYLE', 2),
(837, 'RIO TALA', 2),
(838, 'SAN PEDRO', 2),
(839, 'SANTA LUCIA', 2),
(840, 'ALEJANDRO KORN', 2),
(841, 'SAN VICENTE', 2),
(842, 'DOMSELAAR', 2),
(843, 'GENERAL RIVAS', 2),
(844, 'SUIPACHA', 2),
(845, 'DE LA CANAL', 2),
(846, 'GARDEY', 2),
(847, 'MARIA IGNACIA', 2),
(848, 'TANDIL', 2),
(849, 'CROTTO', 2),
(850, 'TAPALQUE', 2),
(851, 'VELLOSO', 2),
(852, 'BENAVIDEZ', 2),
(853, 'DIQUE LUJAN', 2),
(854, 'DON TORCUATO ESTE', 2),
(855, 'DON TORCUATO OESTE', 2),
(856, 'EL TALAR', 2),
(857, 'GENERAL PACHECO', 2),
(858, 'LOS TRONCOS DEL TALAR', 2),
(859, 'RICARDO ROJAS', 2),
(860, 'RINCON DE MILBERG', 2),
(861, 'TIGRE', 2),
(862, 'GENERAL CONESA', 2),
(863, 'CHASICO', 2),
(864, 'SALDUNGARAY', 2),
(865, 'SIERRA DE LA VENTANA', 2),
(866, 'TORNQUIST', 2),
(867, 'TRES PICOS', 2),
(868, 'VILLA SERRANA LA GRUTA', 2),
(869, 'VILLA VENTANA', 2),
(870, 'BERUTTI', 2),
(871, 'GIRODIAS', 2),
(872, 'LA CARRETA', 2),
(873, '30 DE AGOSTO', 2),
(874, 'TRENQUE LAUQUEN', 2),
(875, 'TRONGE', 2),
(876, 'BALNEARIO ORENSE', 2),
(877, 'CLAROMECO', 2),
(878, 'DUNAMAR', 2),
(879, 'COPETONAS', 2),
(880, 'LIN CALEL', 2),
(881, 'MICAELA CASCALLARES', 2),
(882, 'ORENSE', 2),
(883, 'RETA', 2),
(884, 'SAN FRANCISCO DE BELLOCQ', 2),
(885, 'SAN MAYOL', 2),
(886, 'TRES ARROYOS', 2),
(887, 'VILLA RODRIGUEZ', 2),
(888, 'CASEROS', 2),
(889, 'CHURRUCA', 2),
(890, 'CIUDAD JARDIN LOMAS DEL PALOMAR', 2),
(891, 'CIUDADELA', 2),
(892, 'EL LIBERTADOR', 2),
(893, 'JOSE INGENIEROS', 2),
(894, 'LOMA HERMOSA', 2),
(895, 'MARTIN CORONADO', 2),
(896, '11 DE SEPTIEMBRE', 2),
(897, 'PABLO PODESTA', 2),
(898, 'REMEDIOS DE ESCALADA', 2),
(899, 'SAENZ PEÑA', 2),
(900, 'SANTOS LUGARES', 2),
(901, 'VILLA BOSCH (EST. JUAN MARIA BOSCH)', 2),
(902, 'VILLA RAFFO', 2),
(903, 'INGENIERO THOMPSON', 2),
(904, 'TRES LOMAS', 2),
(905, 'AGUSTIN MOSCONI', 2),
(906, 'DEL VALLE', 2),
(907, 'ERNESTINA', 2),
(908, 'GOBERNADOR UGARTE', 2),
(909, 'LUCAS MONTEVERDE', 2),
(910, 'NORBERTO DE LA RIESTRA', 2),
(911, 'PEDERNALES', 2),
(912, 'SAN ENRIQUE', 2),
(913, 'VALDES', 2),
(914, '25 DE MAYO', 2),
(915, 'CARAPACHAY', 2),
(916, 'FLORIDA', 2),
(917, 'FLORIDA OESTE', 2),
(918, 'LA LUCILA', 2),
(919, 'MUNRO', 2),
(920, 'OLIVOS', 2),
(921, 'VICENTE LOPEZ', 2),
(922, 'VILLA ADELINA', 2),
(923, 'VILLA MARTELLI', 2),
(924, 'MAR AZUL', 2),
(925, 'MAR DE LAS PAMPAS', 2),
(926, 'VILLA GESELL', 2),
(927, 'ARGERICH', 2),
(928, 'COLONIA SAN ADOLFO', 2),
(929, 'COUNTRY LOS MEDANOS', 2),
(930, 'HILARIO ASCASUBI', 2),
(931, 'JUAN COUSTE', 2),
(932, 'MAYOR BURATOVICH', 2),
(933, 'MEDANOS', 2),
(934, 'PEDRO LURO', 2),
(935, 'TENIENTE ORIGONE', 2),
(936, 'COUNTRY CLUB EL CASCO', 2),
(937, 'ESCALADA', 2),
(938, 'LIMA', 2),
(939, 'ZARATE', 2),
(940, 'BARRIO SAAVEDRA', 2),
(941, 'ZARATE', 2),
(942, 'BARRIO RUTA 24 KILOMETRO 10', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_modules`
--

CREATE TABLE `tb_modules` (
  `idModule` int(11) UNSIGNED NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_modules`
--

INSERT INTO `tb_modules` (`idModule`, `name`) VALUES
(1, 'monitor'),
(2, 'llaveros'),
(3, 'edificios'),
(4, 'configuracion'),
(5, 'perfil de usuario'),
(6, 'cliente'),
(7, 'servicio'),
(8, 'producto');

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
-- Estructura de tabla para la tabla `tb_products`
--

CREATE TABLE `tb_products` (
  `idProduct` int(11) UNSIGNED NOT NULL,
  `descriptionProduct` varchar(200) DEFAULT NULL,
  `codigoFabric` varchar(200) DEFAULT NULL,
  `brand` varchar(200) DEFAULT NULL,
  `model` varchar(200) DEFAULT NULL,
  `idProductClassificationFk` varchar(200) DEFAULT NULL,
  `isNumberSerieFabric` tinyint(1) DEFAULT 0,
  `isNumberSerieInternal` tinyint(1) DEFAULT 0,
  `isDateExpiration` tinyint(1) DEFAULT 0,
  `isControlSchedule` tinyint(1) DEFAULT 0,
  `priceFabric` decimal(18,2) DEFAULT 0.00,
  `idStatusFk` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_products`
--

INSERT INTO `tb_products` (`idProduct`, `descriptionProduct`, `codigoFabric`, `brand`, `model`, `idProductClassificationFk`, `isNumberSerieFabric`, `isNumberSerieInternal`, `isDateExpiration`, `isControlSchedule`, `priceFabric`, `idStatusFk`) VALUES
(1, '2Ejemplo3111', 'Ejemplo', 'Ejemplo', 'Ejemplo', '5', 1, 0, 1, 1, '120.38', 1),
(2, 'Ejemplo2', 'Ejemplo', 'Ejemplo', 'Ejemplo', '5', 1, 0, 0, 0, '120.38', 1),
(3, 'Ejemplo3', 'Ejemplo', 'Ejemplo', 'Ejemplo', '5', 1, 0, 1, 0, '120.38', 1),
(4, '2Ejemplo3', 'Ejemplo', 'Ejemplo', 'Ejemplo', '5', 1, 0, 1, 1, '120.38', 1),
(5, '2Ejemdplo3', 'Ejemplo', 'Ejemplo', 'Ejemplo', '5', 1, 0, 1, 1, '120.38', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_products_classification`
--

CREATE TABLE `tb_products_classification` (
  `idProductClassification` int(11) UNSIGNED NOT NULL,
  `classification` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_products_classification`
--

INSERT INTO `tb_products_classification` (`idProductClassification`, `classification`) VALUES
(1, 'CONTROL DE ACCESOS'),
(2, 'CERRADURA'),
(3, 'LECTOR'),
(4, 'FUENTE'),
(5, 'BATERIA'),
(6, 'PULSADOR DE EMERGENCIA'),
(7, 'TECLA DE APAGADO'),
(8, 'DVR'),
(9, 'NVR'),
(10, 'UPS'),
(11, 'CAMARA'),
(12, 'PANEL DE ALARMA'),
(13, 'TECLADO DE ALARMA'),
(14, 'SENSOR DE ALARMA'),
(15, 'MODULO IP DE ALARMA'),
(16, 'MODULO GPRS DE ALARMA'),
(17, 'ROUTER'),
(18, 'MODEM');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_products_divice_opening`
--

CREATE TABLE `tb_products_divice_opening` (
  `idProductsDiviceOpening` int(11) UNSIGNED NOT NULL,
  `idDiviceOpeningFk` int(11) DEFAULT NULL,
  `idProductFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_products_divice_opening`
--

INSERT INTO `tb_products_divice_opening` (`idProductsDiviceOpening`, `idDiviceOpeningFk`, `idProductFk`) VALUES
(5, 2, 2),
(6, 3, 2),
(7, 4, 2),
(8, 5, 2),
(9, 2, 3),
(10, 3, 3),
(11, 4, 3),
(12, 5, 3),
(13, 2, 4),
(14, 3, 4),
(15, 4, 4),
(16, 5, 4),
(21, 2, 1),
(22, 3, 1),
(23, 4, 1),
(24, 5, 1),
(25, 2, 5),
(26, 3, 5),
(27, 4, 5),
(28, 5, 5);

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
-- Estructura de tabla para la tabla `tb_profiles`
--

CREATE TABLE `tb_profiles` (
  `idProfiles` int(11) UNSIGNED NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `idStatus` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_profiles`
--

INSERT INTO `tb_profiles` (`idProfiles`, `name`, `idStatus`) VALUES
(8, 'pefil coferba 1', -1),
(9, 'PERFIL UNo', 1),
(10, 'PERFIL dos', 1),
(11, 'TASS', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_profiles_modules`
--

CREATE TABLE `tb_profiles_modules` (
  `idProfileModule` int(11) UNSIGNED NOT NULL,
  `idProfilesFk` int(11) DEFAULT NULL,
  `idModuleFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_profiles_modules`
--

INSERT INTO `tb_profiles_modules` (`idProfileModule`, `idProfilesFk`, `idModuleFk`) VALUES
(19, 8, 1),
(21, 8, 3),
(29, 8, 1),
(30, 8, 2),
(31, 8, 4),
(32, 8, 7),
(35, 10, 1),
(36, 10, 2),
(48, 9, 1),
(49, 9, 2),
(50, 9, 3),
(51, 9, 4),
(52, 9, 5),
(53, 9, 8),
(66, 11, 1),
(67, 11, 2),
(68, 11, 3),
(69, 11, 4),
(70, 11, 5),
(71, 11, 6),
(72, 11, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_province`
--

CREATE TABLE `tb_province` (
  `idProvince` int(11) UNSIGNED NOT NULL,
  `province` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_province`
--

INSERT INTO `tb_province` (`idProvince`, `province`) VALUES
(1, 'Ciudad Autonoma de Buenos Aires'),
(2, 'Buenos Aires'),
(3, 'Misiones'),
(4, 'San Luis'),
(5, 'San Juan'),
(6, 'Entre Rios'),
(7, 'Santa Cruz'),
(8, 'Rio Negro'),
(9, 'Chubut'),
(10, 'Cordoba'),
(11, 'Mendoza'),
(12, 'La Rioja'),
(13, 'Catamarca'),
(14, 'La Pampa'),
(15, 'Santiago del Estero'),
(16, 'Corrientes'),
(17, 'Santa Fe'),
(18, 'Tucuman'),
(19, 'Neuquen'),
(20, 'Salta'),
(21, 'Chaco'),
(22, 'Formosa'),
(23, 'Jujuy'),
(24, 'Tierra del Fuego, Antartida e Islas del Atlántico Sur');

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
-- Estructura de tabla para la tabla `tb_router_internet`
--

CREATE TABLE `tb_router_internet` (
  `idRouterInternet` int(11) UNSIGNED NOT NULL,
  `numberSeriaInternal` varchar(200) DEFAULT NULL,
  `numberSeriaFrabic` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_sensors_alarm`
--

CREATE TABLE `tb_sensors_alarm` (
  `idSensorsAlarm` int(11) UNSIGNED NOT NULL,
  `numberZoneSensor` varchar(200) DEFAULT NULL,
  `area` text DEFAULT NULL,
  `nroZoneTamper` varchar(200) DEFAULT NULL,
  `location` varchar(200) DEFAULT NULL,
  `locationLat` varchar(200) DEFAULT NULL,
  `locationLon` varchar(200) DEFAULT NULL,
  `dvr` varchar(200) DEFAULT NULL,
  `idCameraFk` int(11) DEFAULT NULL,
  `nroInterno` varchar(200) DEFAULT NULL,
  `nroFrabric` varchar(200) DEFAULT NULL,
  `idClientServicesAlarmsFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_services`
--

CREATE TABLE `tb_services` (
  `idService` int(11) UNSIGNED NOT NULL,
  `service` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_services_camera_users`
--

CREATE TABLE `tb_services_camera_users` (
  `idServicesCameraUsers` int(11) UNSIGNED NOT NULL,
  `idUserFk` int(11) DEFAULT NULL,
  `idClientServicesCamera` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
-- Estructura de tabla para la tabla `tb_tax`
--

CREATE TABLE `tb_tax` (
  `idTypeTax` int(11) UNSIGNED NOT NULL,
  `typeTax` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_tax`
--

INSERT INTO `tb_tax` (`idTypeTax`, `typeTax`) VALUES
(1, 'CONSUMIDOR FINAL'),
(2, 'RESP. INSCRIPTO'),
(3, 'MONOTRIBUTO'),
(4, 'EXENTO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tickets`
--

CREATE TABLE `tb_tickets` (
  `idTicket` int(11) NOT NULL,
  `dateCreated` timestamp NULL DEFAULT current_timestamp(),
  `dateRecibeCompany` datetime DEFAULT NULL,
  `idStatusTicketKf` int(11) DEFAULT 2,
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
  `totalService` decimal(18,2) DEFAULT 0.00 COMMENT 'MONTO TOTAL DEL SERVICIO',
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
  `totalGestion` decimal(18,2) DEFAULT 0.00,
  `totalLlave` decimal(18,2) DEFAULT 0.00,
  `totalEnvio` decimal(18,2) DEFAULT 0.00,
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
  `dateOfRequestByUser` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
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
  `amount` decimal(18,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_type_delivery`
--

INSERT INTO `tb_type_delivery` (`idTypeDelivery`, `typeDelivery`, `amount`) VALUES
(1, 'RETIRO POR OFICINA', NULL),
(2, 'ENTREGA EN EL EDIFICIO', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_type_gps`
--

CREATE TABLE `tb_type_gps` (
  `idTypeGps` int(11) UNSIGNED NOT NULL,
  `typeGps` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_type_internet`
--

CREATE TABLE `tb_type_internet` (
  `idTypeInternet` int(11) UNSIGNED NOT NULL,
  `typeInternet` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_type_maintenance`
--

CREATE TABLE `tb_type_maintenance` (
  `idTypeMaintenance` int(11) UNSIGNED NOT NULL,
  `typeMaintenance` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `dateCreated` timestamp NULL DEFAULT current_timestamp(),
  `idCompanyKf` int(11) DEFAULT NULL,
  `resetPasword` tinyint(4) DEFAULT 0,
  `idAddresKf` int(11) DEFAULT NULL,
  `idTyepeAttendantKf` int(11) UNSIGNED DEFAULT NULL COMMENT 'TIPO DE ENCARGADO',
  `descOther` text COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'ENCARGADO DE TIPO OTRO',
  `idDepartmentKf` int(11) DEFAULT NULL COMMENT 'DEPARTAMENTO DE EL INQUILINO O PROPIETARIO',
  `isDepartmentApproved` tinyint(4) DEFAULT NULL COMMENT 'APROBADO O NO  EL DEPARTAMENTO DEL INQUILINO',
  `isEdit` tinyint(11) DEFAULT 0,
  `requireAuthentication` tinyint(11) DEFAULT 1,
  `idTypeTenantKf` int(11) DEFAULT NULL,
  `idStatusKf` int(11) UNSIGNED DEFAULT NULL,
  `tokenMail` varchar(300) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `isConfirmatedMail` tinyint(4) DEFAULT 0,
  `SA_ID` int(11) DEFAULT NULL,
  `idSysProfileFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tb_user`
--

INSERT INTO `tb_user` (`idUser`, `fullNameUser`, `emailUser`, `phoneNumberUser`, `phoneLocalNumberUser`, `passwordUser`, `idProfileKf`, `dateCreated`, `idCompanyKf`, `resetPasword`, `idAddresKf`, `idTyepeAttendantKf`, `descOther`, `idDepartmentKf`, `isDepartmentApproved`, `isEdit`, `requireAuthentication`, `idTypeTenantKf`, `idStatusKf`, `tokenMail`, `isConfirmatedMail`, `SA_ID`, `idSysProfileFk`) VALUES
(31, 'admin sistema', 'soporte@coferba.com.ar', '(054) 9 11 2323-2323', '91124759596', 'fe703d258c7ef5f50b71e06565a65aa07194907f', 1, '2018-02-16 12:01:22', NULL, 0, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, 1, NULL, 1, NULL, 11),
(71, 'David Eduardo Rincon', 'davideduardo.luengo@hotmail.com', '', '1122333444555666', '870e8768d555d80e0aeb44870c081f5563d90bd3', 3, '2018-10-22 02:33:22', 5, 0, 11, NULL, NULL, NULL, NULL, 0, NULL, 1, 1, '3Jh0NuqLHa', 1, NULL, NULL),
(72, 'leandro figueroa', 'lean.figueroa@gmail.com', '123213213213213', '123213213213213', '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 5, '2018-10-29 16:27:43', 5, 0, 12, NULL, NULL, 117, 1, 0, NULL, 2, 1, 'JbuVXny0Jr', 1, NULL, NULL),
(73, 'leandro2 figueroa2', 'leandro.figueroa@coferba.com.ar', '1122356388', '123213213213213', '1f82ea75c5cc526729e2d581aeb3aeccfef4407e', 3, '2018-10-29 16:48:52', 5, 0, 12, NULL, NULL, NULL, NULL, 1, NULL, 1, 1, 'OLtCaObFgO', 1, NULL, NULL),
(74, 'inquilino prueba', 'rexx84@gmail.com', '123213213213213', '123213213213213', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 5, '2018-10-29 16:58:23', 5, 0, 12, NULL, NULL, 120, 1, 0, NULL, 2, 1, 'XTrpLMkZiG', 1, NULL, NULL),
(75, 'Encargado Prueba', 'encargadoprueba@asdasda', '123213213213213', '1123232434333423', 'c4f9fcd7be6b041073f1b23a2bf80bd1d831292e', 6, '2018-12-19 17:30:57', 5, 1, 11, 4, NULL, 103, 1, 1, 1, 2, 1, 'gQuGxR2Zoo', 1, NULL, NULL),
(76, 'Roberto Higuera', 'rhiguera@fffff.com', '123213213213213', '123213213213213', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 6, '2019-01-18 04:10:24', 5, 0, 12, 2, NULL, NULL, NULL, 0, 1, 1, 1, 'ZWsfbNEEXB', 1, NULL, NULL),
(77, 'Esteban Moreli', 'emoreli@akjsdsadas.com', '123213213213213', '11233243253243', '44b07ccf74fd8a488be0b4aa0593beff5ac6f3ef', 6, '2019-01-18 04:31:36', 5, 1, 12, 3, NULL, NULL, NULL, 1, 0, 0, 1, 'uQzz412uH5', 1, NULL, NULL),
(78, 'Victor Gonzalez', 'vgonzalez@asdadsadwq.com', '77788787878', '', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 6, '2019-01-18 04:33:07', 5, 0, 11, 2, NULL, NULL, NULL, 1, 1, 1, 1, '69bMxpjXQ8', 1, NULL, NULL),
(79, 'Sofia Rincon', 'sofia.rincon@asdasdsad.com', '123213213213213', '123213213213213', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 4, '2019-01-22 04:06:32', 5, 0, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, 1, 'NaUwCkVwH4', 1, NULL, NULL),
(80, 'Daniela Becerra', 'daniela.becerra@hoasdsad.com', '123213213213213', '123213213213213', '03d000df4fa813c9d0c93e59a0ba3b6dc5c88399', 5, '2019-02-11 01:23:37', 5, 0, NULL, NULL, NULL, NULL, 1, 1, NULL, 2, 1, 'hXLcQRwWGn', 1, NULL, NULL),
(81, 'probando', 'probando@probando.com', '123213123213', '', 'f11131b2bcdf821dc9ff69b38e2712541439b9f8', 5, '2019-07-27 17:29:15', 5, 1, 11, NULL, NULL, 108, 1, 1, NULL, 2, 1, 'lxUXCkdgnZ', 1, NULL, NULL),
(82, 'asdsadas', 'asdsad@asdsad.com', '', '12321311312', 'b9f4327bafdb162ed16fe0d6d4a50bde306ee08e', 5, '2019-07-27 17:51:24', 5, 1, 11, NULL, NULL, 100, 1, 1, NULL, 2, 1, 'HCU6UgT88X', 1, NULL, NULL),
(83, 'erewrrewrew', 'wqewqew@asdsad.com', '', '121321321', '7be5fac0585900a65effd04d887cc62022b16a20', 5, '2019-07-27 18:38:43', 5, 1, 11, NULL, NULL, 100, 1, 1, NULL, 2, 1, 'yZAGdjTOLv', 1, NULL, NULL),
(84, 'Arturo Michelena', 'amichelena@asdas.com', '', '11232142132132', 'fc604011dbac13b0f6f0b89c81c0efe0271530c1', 6, '2019-07-27 18:59:58', 5, 1, 11, 2, NULL, NULL, NULL, 1, 0, 0, 1, 'WuYJFO1DZD', 1, NULL, NULL),
(85, 'Fernando Angulo', 'david.rincon.oracle@gmail.com', '', '123213213', '78d16ced1eedb4f436c83a861c91e052aaf3699f', 3, '2019-07-28 00:43:16', 5, 1, 12, NULL, NULL, NULL, NULL, 0, NULL, 1, 1, '7gVmCe4f3J', 1, NULL, NULL),
(86, 'David Eduardo Rincon', 'davideduardo.luengo2@hotmail.com', '', '01122356388', 'fa399d74e61282062d50aaf7eb6a9afc1b21f314', 5, '2019-08-21 03:20:44', 1, 1, 1, NULL, NULL, 2, 1, 1, NULL, 2, 1, 'K67aipTQu2', 1, NULL, NULL),
(87, 'Ernesto Araujo', 'earaujo@asdsad.com', '', '111232324324324', '5365642294a7a05378e5e13cd44fa91c5f9b546a', 6, '2019-08-29 23:12:26', 1, 1, 1, 2, NULL, NULL, NULL, 1, 0, 0, 1, 'FLTvvGz5wZ', 1, NULL, NULL),
(88, 'Gabriel Gonzalez', 'ggonzalez@hotmail.com', '', '112322424233', 'e47ed8dab1b69a560435c3f4bff9d2679ab12233', 6, '2019-08-29 23:13:21', 1, 1, 2, 2, NULL, NULL, NULL, 1, 0, 0, 1, 'WM7HECe4EL', 1, NULL, NULL),
(89, 'Dionisio Machado', 'dmachado@asdasd.com', '121232132134', '112143435556', '80662a250c92f9c05b965cbff69785fdc404d0c4', 6, '2019-08-29 23:22:06', 5, 1, 11, 1, 'Plomero', NULL, NULL, 1, 0, NULL, 0, 'YJh6f8Gxb0', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_user_license`
--

CREATE TABLE `tb_user_license` (
  `idUserLincese` int(11) UNSIGNED NOT NULL,
  `fullName` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `key` varchar(100) DEFAULT NULL,
  `isAndroidOperantSystem` tinyint(1) DEFAULT 1,
  `profileUser` int(11) DEFAULT NULL,
  `idClientServicesSmartPanicFk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tb_addres`
--
ALTER TABLE `tb_addres`
  ADD PRIMARY KEY (`idAdress`);

--
-- Indices de la tabla `tb_agents`
--
ALTER TABLE `tb_agents`
  ADD PRIMARY KEY (`idAgent`);

--
-- Indices de la tabla `tb_alarm_batery`
--
ALTER TABLE `tb_alarm_batery`
  ADD PRIMARY KEY (`idAlarmBatery`);

--
-- Indices de la tabla `tb_alarm_line_phone`
--
ALTER TABLE `tb_alarm_line_phone`
  ADD PRIMARY KEY (`idAlarmLinePhone`);

--
-- Indices de la tabla `tb_alarm_module_gps`
--
ALTER TABLE `tb_alarm_module_gps`
  ADD PRIMARY KEY (`idAlarmModuleGps`);

--
-- Indices de la tabla `tb_alarm_module_ip`
--
ALTER TABLE `tb_alarm_module_ip`
  ADD PRIMARY KEY (`idAlarmModuleIp`);

--
-- Indices de la tabla `tb_alarm_person_alert`
--
ALTER TABLE `tb_alarm_person_alert`
  ADD PRIMARY KEY (`idPersonAlert`);

--
-- Indices de la tabla `tb_alarm_person_verific`
--
ALTER TABLE `tb_alarm_person_verific`
  ADD PRIMARY KEY (`idPersonVerific`);

--
-- Indices de la tabla `tb_alarm_services_aditionals`
--
ALTER TABLE `tb_alarm_services_aditionals`
  ADD PRIMARY KEY (`idAlarmServicesAditionals`);

--
-- Indices de la tabla `tb_alarm_type_client`
--
ALTER TABLE `tb_alarm_type_client`
  ADD PRIMARY KEY (`idTypeClientAlarm`);

--
-- Indices de la tabla `tb_bakups_order`
--
ALTER TABLE `tb_bakups_order`
  ADD PRIMARY KEY (`idBakupsOrder`);

--
-- Indices de la tabla `tb_batery_install`
--
ALTER TABLE `tb_batery_install`
  ADD PRIMARY KEY (`idBateryInstall`);

--
-- Indices de la tabla `tb_cameras`
--
ALTER TABLE `tb_cameras`
  ADD PRIMARY KEY (`idCamera`);

--
-- Indices de la tabla `tb_category_departament`
--
ALTER TABLE `tb_category_departament`
  ADD PRIMARY KEY (`idCategoryDepartament`);

--
-- Indices de la tabla `tb_clients`
--
ALTER TABLE `tb_clients`
  ADD PRIMARY KEY (`idClient`);

--
-- Indices de la tabla `tb_clients_phones`
--
ALTER TABLE `tb_clients_phones`
  ADD PRIMARY KEY (`idClientPhones`);

--
-- Indices de la tabla `tb_clients_tickets`
--
ALTER TABLE `tb_clients_tickets`
  ADD PRIMARY KEY (`idTicketsCliets`);

--
-- Indices de la tabla `tb_client_address_particular`
--
ALTER TABLE `tb_client_address_particular`
  ADD PRIMARY KEY (`idAddressParticular`);

--
-- Indices de la tabla `tb_client_authorizing`
--
ALTER TABLE `tb_client_authorizing`
  ADD PRIMARY KEY (`idClientAuthorizing`);

--
-- Indices de la tabla `tb_client_billing_information`
--
ALTER TABLE `tb_client_billing_information`
  ADD PRIMARY KEY (`idBillingInfo`);

--
-- Indices de la tabla `tb_client_departament`
--
ALTER TABLE `tb_client_departament`
  ADD PRIMARY KEY (`idClientDepartament`);

--
-- Indices de la tabla `tb_client_files_list`
--
ALTER TABLE `tb_client_files_list`
  ADD PRIMARY KEY (`idClientFiles`);

--
-- Indices de la tabla `tb_client_functional_units`
--
ALTER TABLE `tb_client_functional_units`
  ADD PRIMARY KEY (`idFunctionalUnits`);

--
-- Indices de la tabla `tb_client_phone_contact`
--
ALTER TABLE `tb_client_phone_contact`
  ADD PRIMARY KEY (`idClientPhoneFk`);

--
-- Indices de la tabla `tb_client_schedule_atention`
--
ALTER TABLE `tb_client_schedule_atention`
  ADD PRIMARY KEY (`idScheduleAtention`);

--
-- Indices de la tabla `tb_client_services`
--
ALTER TABLE `tb_client_services`
  ADD PRIMARY KEY (`idClientServices`);

--
-- Indices de la tabla `tb_client_services_acces_control`
--
ALTER TABLE `tb_client_services_acces_control`
  ADD PRIMARY KEY (`idClientServicesAccesControl`);

--
-- Indices de la tabla `tb_client_services_alarms`
--
ALTER TABLE `tb_client_services_alarms`
  ADD PRIMARY KEY (`idClientServicesAlarms`);

--
-- Indices de la tabla `tb_client_services_alarms_aditional`
--
ALTER TABLE `tb_client_services_alarms_aditional`
  ADD PRIMARY KEY (`idClientServicesAlarmsAditionals`);

--
-- Indices de la tabla `tb_client_services_camera`
--
ALTER TABLE `tb_client_services_camera`
  ADD PRIMARY KEY (`idClientServicesCamera`);

--
-- Indices de la tabla `tb_client_services_gps`
--
ALTER TABLE `tb_client_services_gps`
  ADD PRIMARY KEY (`idClientServicesGps`);

--
-- Indices de la tabla `tb_client_services_internet`
--
ALTER TABLE `tb_client_services_internet`
  ADD PRIMARY KEY (`idClientServicesInternet`);

--
-- Indices de la tabla `tb_client_services_smart_panic`
--
ALTER TABLE `tb_client_services_smart_panic`
  ADD PRIMARY KEY (`idClientServicesSmartPanic`);

--
-- Indices de la tabla `tb_client_type`
--
ALTER TABLE `tb_client_type`
  ADD PRIMARY KEY (`idClientType`);

--
-- Indices de la tabla `tb_client_type_services`
--
ALTER TABLE `tb_client_type_services`
  ADD PRIMARY KEY (`idClientTypeServices`);

--
-- Indices de la tabla `tb_client_users`
--
ALTER TABLE `tb_client_users`
  ADD PRIMARY KEY (`idClientUsers`);

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
-- Indices de la tabla `tb_detination_of_license`
--
ALTER TABLE `tb_detination_of_license`
  ADD PRIMARY KEY (`idDetinationOfLicense`);

--
-- Indices de la tabla `tb_divice_opening`
--
ALTER TABLE `tb_divice_opening`
  ADD PRIMARY KEY (`idDiviceOpening`);

--
-- Indices de la tabla `tb_format_tramitio`
--
ALTER TABLE `tb_format_tramitio`
  ADD PRIMARY KEY (`idFormatTramitio`);

--
-- Indices de la tabla `tb_internet_company`
--
ALTER TABLE `tb_internet_company`
  ADD PRIMARY KEY (`idInternetCompany`);

--
-- Indices de la tabla `tb_location`
--
ALTER TABLE `tb_location`
  ADD PRIMARY KEY (`idLocation`);

--
-- Indices de la tabla `tb_modules`
--
ALTER TABLE `tb_modules`
  ADD PRIMARY KEY (`idModule`);

--
-- Indices de la tabla `tb_opcion_low`
--
ALTER TABLE `tb_opcion_low`
  ADD PRIMARY KEY (`idOpcionLowTicket`);

--
-- Indices de la tabla `tb_products`
--
ALTER TABLE `tb_products`
  ADD PRIMARY KEY (`idProduct`);

--
-- Indices de la tabla `tb_products_classification`
--
ALTER TABLE `tb_products_classification`
  ADD PRIMARY KEY (`idProductClassification`);

--
-- Indices de la tabla `tb_products_divice_opening`
--
ALTER TABLE `tb_products_divice_opening`
  ADD PRIMARY KEY (`idProductsDiviceOpening`);

--
-- Indices de la tabla `tb_profile`
--
ALTER TABLE `tb_profile`
  ADD PRIMARY KEY (`idProfile`);

--
-- Indices de la tabla `tb_profiles`
--
ALTER TABLE `tb_profiles`
  ADD PRIMARY KEY (`idProfiles`);

--
-- Indices de la tabla `tb_profiles_modules`
--
ALTER TABLE `tb_profiles_modules`
  ADD PRIMARY KEY (`idProfileModule`);

--
-- Indices de la tabla `tb_province`
--
ALTER TABLE `tb_province`
  ADD PRIMARY KEY (`idProvince`);

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
-- Indices de la tabla `tb_router_internet`
--
ALTER TABLE `tb_router_internet`
  ADD PRIMARY KEY (`idRouterInternet`);

--
-- Indices de la tabla `tb_sensors_alarm`
--
ALTER TABLE `tb_sensors_alarm`
  ADD PRIMARY KEY (`idSensorsAlarm`);

--
-- Indices de la tabla `tb_services`
--
ALTER TABLE `tb_services`
  ADD PRIMARY KEY (`idService`);

--
-- Indices de la tabla `tb_services_camera_users`
--
ALTER TABLE `tb_services_camera_users`
  ADD PRIMARY KEY (`idServicesCameraUsers`);

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
-- Indices de la tabla `tb_tax`
--
ALTER TABLE `tb_tax`
  ADD PRIMARY KEY (`idTypeTax`);

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
-- Indices de la tabla `tb_type_gps`
--
ALTER TABLE `tb_type_gps`
  ADD PRIMARY KEY (`idTypeGps`);

--
-- Indices de la tabla `tb_type_internet`
--
ALTER TABLE `tb_type_internet`
  ADD PRIMARY KEY (`idTypeInternet`);

--
-- Indices de la tabla `tb_type_maintenance`
--
ALTER TABLE `tb_type_maintenance`
  ADD PRIMARY KEY (`idTypeMaintenance`);

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
-- Indices de la tabla `tb_user_license`
--
ALTER TABLE `tb_user_license`
  ADD PRIMARY KEY (`idUserLincese`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tb_addres`
--
ALTER TABLE `tb_addres`
  MODIFY `idAdress` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `tb_agents`
--
ALTER TABLE `tb_agents`
  MODIFY `idAgent` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tb_alarm_batery`
--
ALTER TABLE `tb_alarm_batery`
  MODIFY `idAlarmBatery` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_alarm_line_phone`
--
ALTER TABLE `tb_alarm_line_phone`
  MODIFY `idAlarmLinePhone` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_alarm_module_gps`
--
ALTER TABLE `tb_alarm_module_gps`
  MODIFY `idAlarmModuleGps` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_alarm_module_ip`
--
ALTER TABLE `tb_alarm_module_ip`
  MODIFY `idAlarmModuleIp` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_alarm_person_alert`
--
ALTER TABLE `tb_alarm_person_alert`
  MODIFY `idPersonAlert` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_alarm_person_verific`
--
ALTER TABLE `tb_alarm_person_verific`
  MODIFY `idPersonVerific` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_alarm_services_aditionals`
--
ALTER TABLE `tb_alarm_services_aditionals`
  MODIFY `idAlarmServicesAditionals` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tb_alarm_type_client`
--
ALTER TABLE `tb_alarm_type_client`
  MODIFY `idTypeClientAlarm` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tb_bakups_order`
--
ALTER TABLE `tb_bakups_order`
  MODIFY `idBakupsOrder` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_batery_install`
--
ALTER TABLE `tb_batery_install`
  MODIFY `idBateryInstall` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_cameras`
--
ALTER TABLE `tb_cameras`
  MODIFY `idCamera` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_category_departament`
--
ALTER TABLE `tb_category_departament`
  MODIFY `idCategoryDepartament` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_clients`
--
ALTER TABLE `tb_clients`
  MODIFY `idClient` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tb_clients_phones`
--
ALTER TABLE `tb_clients_phones`
  MODIFY `idClientPhones` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_clients_tickets`
--
ALTER TABLE `tb_clients_tickets`
  MODIFY `idTicketsCliets` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `tb_client_address_particular`
--
ALTER TABLE `tb_client_address_particular`
  MODIFY `idAddressParticular` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_client_authorizing`
--
ALTER TABLE `tb_client_authorizing`
  MODIFY `idClientAuthorizing` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_client_billing_information`
--
ALTER TABLE `tb_client_billing_information`
  MODIFY `idBillingInfo` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tb_client_departament`
--
ALTER TABLE `tb_client_departament`
  MODIFY `idClientDepartament` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tb_client_files_list`
--
ALTER TABLE `tb_client_files_list`
  MODIFY `idClientFiles` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_client_functional_units`
--
ALTER TABLE `tb_client_functional_units`
  MODIFY `idFunctionalUnits` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_client_phone_contact`
--
ALTER TABLE `tb_client_phone_contact`
  MODIFY `idClientPhoneFk` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `tb_client_schedule_atention`
--
ALTER TABLE `tb_client_schedule_atention`
  MODIFY `idScheduleAtention` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `tb_client_services`
--
ALTER TABLE `tb_client_services`
  MODIFY `idClientServices` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tb_client_services_acces_control`
--
ALTER TABLE `tb_client_services_acces_control`
  MODIFY `idClientServicesAccesControl` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_client_services_alarms`
--
ALTER TABLE `tb_client_services_alarms`
  MODIFY `idClientServicesAlarms` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_client_services_alarms_aditional`
--
ALTER TABLE `tb_client_services_alarms_aditional`
  MODIFY `idClientServicesAlarmsAditionals` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_client_services_camera`
--
ALTER TABLE `tb_client_services_camera`
  MODIFY `idClientServicesCamera` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_client_services_gps`
--
ALTER TABLE `tb_client_services_gps`
  MODIFY `idClientServicesGps` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_client_services_internet`
--
ALTER TABLE `tb_client_services_internet`
  MODIFY `idClientServicesInternet` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_client_services_smart_panic`
--
ALTER TABLE `tb_client_services_smart_panic`
  MODIFY `idClientServicesSmartPanic` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_client_type`
--
ALTER TABLE `tb_client_type`
  MODIFY `idClientType` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tb_client_type_services`
--
ALTER TABLE `tb_client_type_services`
  MODIFY `idClientTypeServices` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tb_client_users`
--
ALTER TABLE `tb_client_users`
  MODIFY `idClientUsers` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
-- AUTO_INCREMENT de la tabla `tb_detination_of_license`
--
ALTER TABLE `tb_detination_of_license`
  MODIFY `idDetinationOfLicense` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_divice_opening`
--
ALTER TABLE `tb_divice_opening`
  MODIFY `idDiviceOpening` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tb_format_tramitio`
--
ALTER TABLE `tb_format_tramitio`
  MODIFY `idFormatTramitio` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tb_internet_company`
--
ALTER TABLE `tb_internet_company`
  MODIFY `idInternetCompany` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_location`
--
ALTER TABLE `tb_location`
  MODIFY `idLocation` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=943;

--
-- AUTO_INCREMENT de la tabla `tb_modules`
--
ALTER TABLE `tb_modules`
  MODIFY `idModule` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tb_opcion_low`
--
ALTER TABLE `tb_opcion_low`
  MODIFY `idOpcionLowTicket` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tb_products`
--
ALTER TABLE `tb_products`
  MODIFY `idProduct` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tb_products_classification`
--
ALTER TABLE `tb_products_classification`
  MODIFY `idProductClassification` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `tb_products_divice_opening`
--
ALTER TABLE `tb_products_divice_opening`
  MODIFY `idProductsDiviceOpening` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `tb_profiles`
--
ALTER TABLE `tb_profiles`
  MODIFY `idProfiles` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `tb_profiles_modules`
--
ALTER TABLE `tb_profiles_modules`
  MODIFY `idProfileModule` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT de la tabla `tb_province`
--
ALTER TABLE `tb_province`
  MODIFY `idProvince` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `tb_reason_disabled_item`
--
ALTER TABLE `tb_reason_disabled_item`
  MODIFY `idReasonDisabledItem` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_router_internet`
--
ALTER TABLE `tb_router_internet`
  MODIFY `idRouterInternet` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_sensors_alarm`
--
ALTER TABLE `tb_sensors_alarm`
  MODIFY `idSensorsAlarm` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_services`
--
ALTER TABLE `tb_services`
  MODIFY `idService` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_services_camera_users`
--
ALTER TABLE `tb_services_camera_users`
  MODIFY `idServicesCameraUsers` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_sys_param`
--
ALTER TABLE `tb_sys_param`
  MODIFY `idParam` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `tb_tax`
--
ALTER TABLE `tb_tax`
  MODIFY `idTypeTax` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
-- AUTO_INCREMENT de la tabla `tb_type_gps`
--
ALTER TABLE `tb_type_gps`
  MODIFY `idTypeGps` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_type_internet`
--
ALTER TABLE `tb_type_internet`
  MODIFY `idTypeInternet` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tb_type_maintenance`
--
ALTER TABLE `tb_type_maintenance`
  MODIFY `idTypeMaintenance` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT de la tabla `tb_user_license`
--
ALTER TABLE `tb_user_license`
  MODIFY `idUserLincese` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

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
