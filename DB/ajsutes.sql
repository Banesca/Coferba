 ALTER TABLE `tb_tickets` ADD `totalGestion` DECIMAL(18,2)  NULL  DEFAULT '0'  AFTER `sendUserNotification`;
 ALTER TABLE `tb_tickets` ADD `totalLlave` DECIMAL(18,2)  NULL  DEFAULT '0'  AFTER `totalGestion`;
 ALTER TABLE `tb_tickets` ADD `totalEnvio` DECIMAL(18,2)  NULL  DEFAULT '0'  AFTER `totalLlave`;

