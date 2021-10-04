-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: bdAplication_taxi
-- ------------------------------------------------------
-- Server version	5.7.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Cometarios`
--

DROP TABLE IF EXISTS `Cometarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Cometarios` (
  `idCometarios` int(11) NOT NULL AUTO_INCREMENT,
  `idViajeComent` int(11) NOT NULL,
  `Puntos` varchar(250) DEFAULT NULL,
  `Comentario` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`idCometarios`),
  KEY `fkComentarios_idx` (`idViajeComent`),
  CONSTRAINT `fkComentarios` FOREIGN KEY (`idViajeComent`) REFERENCES `Viajes` (`idViajes`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cometarios`
--

LOCK TABLES `Cometarios` WRITE;
/*!40000 ALTER TABLE `Cometarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `Cometarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DriverActivo`
--

DROP TABLE IF EXISTS `DriverActivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DriverActivo` (
  `idDriverActivo` int(11) NOT NULL AUTO_INCREMENT,
  `idDriverBd` int(11) NOT NULL,
  `estado` int(11) DEFAULT NULL,
  PRIMARY KEY (`idDriverActivo`),
  KEY `fkDriver_Estado_idx` (`idDriverBd`),
  CONSTRAINT `fkDriver_Estado` FOREIGN KEY (`idDriverBd`) REFERENCES `Drivers` (`idDriver`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DriverActivo`
--

LOCK TABLES `DriverActivo` WRITE;
/*!40000 ALTER TABLE `DriverActivo` DISABLE KEYS */;
INSERT INTO `DriverActivo` VALUES (9,16,1);
/*!40000 ALTER TABLE `DriverActivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Drivers`
--

DROP TABLE IF EXISTS `Drivers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Drivers` (
  `idDriver` int(11) NOT NULL AUTO_INCREMENT,
  `NameDriver` varchar(45) NOT NULL,
  `Nickname` varchar(45) NOT NULL,
  `PlacaDriver` varchar(45) NOT NULL,
  `Ruc` varchar(10) NOT NULL,
  `NumberPhone` varchar(45) NOT NULL,
  `AddressDriver` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `DateBirthday` date NOT NULL,
  `DateCreateDriver` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idDriver`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Drivers`
--

LOCK TABLES `Drivers` WRITE;
/*!40000 ALTER TABLE `Drivers` DISABLE KEYS */;
INSERT INTO `Drivers` VALUES (9,'Xavier Wilter Mora','XavierXx','DDDK-0099','1125138166','0993883882','Loja','djkevon23@gamil.com','$2a$08$a/.8mKwe4q3N6v4wmv5tt.mJoINyfPX3RIPKq6tXP/jxFCyvaESee','2021-08-14','2021-09-17 07:24:49'),(10,'Oswaldo','OWS','QQQ-EW1','1105138166','0993883882','Dan1','djkevin23@gamil.com','$2a$08$EMeLGHgXxBgpp3HKHGLOleky5KwW77bN.5.050BDGq/32j1a8YqLS','2021-08-11','2021-08-26 22:15:23'),(11,'Ramiro','POSTMAN','POO-921','1105138166','0993883882','DXAVI','djkevin23@gamil.com','$2a$08$5YmLpfM7uoHY41RT9EKE4.rzN1Lxr/VMsgw4voB3Kf/kn7zEjyyJ2','2021-08-05','2021-08-26 22:24:51'),(12,'assa','as','aas','12','212','as','we','dsd','2021-08-05','2021-09-15 19:48:29'),(16,'Daniel Conductor','Daniel22','ADL-0921','1105138166','0993883882','CUENCA','DanielNoriego@gmail.com','$2a$12$OS9uwuPTwzgrstKIpB8ewu64CpEmCxyANcZN2CqAVoE4Cnh0tmvA2','2021-09-10','2021-09-15 21:28:41'),(17,'Gonzalez Mora','Gonza123','ADD-0998','1105138166','0993883882','Loja','kdmora@tecnologicoloja.edu.com','$2a$12$xqcorMisFsR.nL5z6t1AB.flh0Q3ZlpEApkEuj8F8bpyEeGZTjczq','2012-02-09','2021-09-17 18:05:09'),(18,'Erika Paola','Erica69','ASSE-9090','1105138166','0993883882','Loja','djkevindaniel3@gmail.com','$2a$12$updtkhSPNPYSrpaFfnQnR.ffLuSI5fsCL/BXFGSCsKx3tPNpgxIv2','2021-09-17','2021-09-18 07:34:14'),(19,'Lucho Ojeda','Lucho123','AADE-POOW','1105138166','0993883882','lOJA','kdmora@tecnologicoloja.edu.ec.EDU','$2a$12$FDthLZ1XAKKg4R7.jvHeR.uBIU6/d0FxJKHI4EkYArbEgtk5dfrdS','2012-08-09','2021-09-18 15:23:13'),(20,'Daniel Jayo','dANTE23','AWWD-0992','1105138177','0993883882','Cuenca ','djkevindanie3@gmail.edu.ec','$2a$12$FgeIGLdi.LQwafH7FOPsPukmT4p2zJjHMLWkmUj2COYBnADFHXjXO','2021-09-09','2021-09-18 15:49:38');
/*!40000 ALTER TABLE `Drivers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ImgDrivers`
--

DROP TABLE IF EXISTS `ImgDrivers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ImgDrivers` (
  `idImgDriver` int(11) NOT NULL AUTO_INCREMENT,
  `idDriver` int(11) NOT NULL,
  `Type` varchar(200) NOT NULL,
  `Name` varchar(200) NOT NULL,
  `Data` longblob NOT NULL,
  PRIMARY KEY (`idImgDriver`),
  KEY `idDriverImgFk_idx` (`idDriver`),
  CONSTRAINT `idDriverImgFk` FOREIGN KEY (`idDriver`) REFERENCES `Drivers` (`idDriver`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ImgDrivers`
--

LOCK TABLES `ImgDrivers` WRITE;
/*!40000 ALTER TABLE `ImgDrivers` DISABLE KEYS */;
INSERT INTO `ImgDrivers` VALUES (5,16,'image/jpeg','8b83bb86-02c6-4918-80d0-80e026bc6dd0.jpg','/Users/danielmora/Documents/TecsicomAPPTaxi/src/public/updownImg/8b83bb86-02c6-4918-80d0-80e026bc6dd0.jpg'),(6,17,'image/jpeg','dc6147ce-c56f-4ba2-a732-37856609a959.jpeg','/Users/danielmora/Documents/TecsicomAPPTaxi/src/public/updownImg/dc6147ce-c56f-4ba2-a732-37856609a959.jpeg'),(7,18,'image/jpeg','6f97d8c6-a229-48b9-ad59-a4164f633e62.jpeg','/Users/danielmora/Documents/TecsicomAPPTaxi/src/public/updownImg/6f97d8c6-a229-48b9-ad59-a4164f633e62.jpeg'),(8,19,'image/jpeg','8776b860-83ca-48bf-b9ea-d77ef0178888.jpeg','/Users/danielmora/Documents/TecsicomAPPTaxi/src/public/updownImg/8776b860-83ca-48bf-b9ea-d77ef0178888.jpeg'),(9,20,'image/jpeg','437b3439-733b-449f-9c0c-50596451de2c.jpg','/Users/danielmora/Documents/TecsicomAPPTaxi/src/public/updownImg/437b3439-733b-449f-9c0c-50596451de2c.jpg');
/*!40000 ALTER TABLE `ImgDrivers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ImgUsers`
--

DROP TABLE IF EXISTS `ImgUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ImgUsers` (
  `id_Imagenes` int(11) NOT NULL AUTO_INCREMENT,
  `id_User` int(11) NOT NULL,
  `Type` varchar(200) NOT NULL,
  `Name` varchar(200) NOT NULL,
  `Data` longblob NOT NULL,
  PRIMARY KEY (`id_Imagenes`),
  KEY `id_user_img_fk_idx` (`id_User`),
  CONSTRAINT `id_user_img_fk` FOREIGN KEY (`id_User`) REFERENCES `User` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ImgUsers`
--

LOCK TABLES `ImgUsers` WRITE;
/*!40000 ALTER TABLE `ImgUsers` DISABLE KEYS */;
INSERT INTO `ImgUsers` VALUES (5,17,'image/jpeg','b7773d14-891a-4425-aef0-f2472f543307.jpg','/Users/danielmora/Documents/TecsicomAPPTaxi/src/public/updownImg/b7773d14-891a-4425-aef0-f2472f543307.jpg'),(6,21,'image/jpeg','12c8ef16-2136-4c6a-b656-9d83d0491a7f.jpg','/Users/danielmora/Documents/TecsicomAPPTaxi/src/public/updownImg/12c8ef16-2136-4c6a-b656-9d83d0491a7f.jpg'),(7,22,'image/png','d141f3ed-2f31-4fd5-a884-2168fb211d05.png','/Users/danielmora/Documents/TecsicomAPPTaxi/src/public/updownImg/d141f3ed-2f31-4fd5-a884-2168fb211d05.png'),(8,22,'image/jpeg','bc784d7a-1503-4d67-b223-b95e3d238d63.jpg','/Users/danielmora/Documents/TecsicomAPPTaxi/src/public/updownImg/bc784d7a-1503-4d67-b223-b95e3d238d63.jpg'),(9,23,'image/jpeg','6dbc781e-1b24-469f-b8e0-6e27258e2821.jpg','/Users/danielmora/Documents/TecsicomAPPTaxi/src/public/updownImg/6dbc781e-1b24-469f-b8e0-6e27258e2821.jpg');
/*!40000 ALTER TABLE `ImgUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Permissions`
--

DROP TABLE IF EXISTS `Permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Permissions` (
  `idPermissions` int(11) NOT NULL AUTO_INCREMENT,
  `Description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idPermissions`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Permissions`
--

LOCK TABLES `Permissions` WRITE;
/*!40000 ALTER TABLE `Permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `Permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Request`
--

DROP TABLE IF EXISTS `Request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Request` (
  `idRequest` int(11) NOT NULL AUTO_INCREMENT,
  `id_User` int(11) NOT NULL,
  `StartDirection` varchar(200) NOT NULL,
  `FinalDirection` varchar(200) NOT NULL,
  `Descriptions` varchar(200) DEFAULT NULL,
  `DateOrden` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idRequest`),
  KEY `id_User_Fk_idx` (`id_User`),
  CONSTRAINT `id_User_Fk` FOREIGN KEY (`id_User`) REFERENCES `USER` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Request`
--

LOCK TABLES `Request` WRITE;
/*!40000 ALTER TABLE `Request` DISABLE KEYS */;
INSERT INTO `Request` VALUES (5,29,'Av Jose Rizal y vivar castro','Terminal Terrestre Loja','Casa color azul Esquina','2021-09-23 18:58:49');
/*!40000 ALTER TABLE `Request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RequestLL`
--

DROP TABLE IF EXISTS `RequestLL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RequestLL` (
  `id_RequestLL` int(11) NOT NULL AUTO_INCREMENT,
  `idUserApp` varchar(50) NOT NULL,
  `Latitud` double NOT NULL,
  `Logitud` double NOT NULL,
  `Estado` int(11) NOT NULL,
  PRIMARY KEY (`id_RequestLL`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RequestLL`
--

LOCK TABLES `RequestLL` WRITE;
/*!40000 ALTER TABLE `RequestLL` DISABLE KEYS */;
INSERT INTO `RequestLL` VALUES (3,'Danie_MOra ',36.7275974,-4.4208521,0),(4,'Danie_MOra222 ',36.7275974,-4.4208521,1);
/*!40000 ALTER TABLE `RequestLL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `NameUser` varchar(65) NOT NULL,
  `NumberPhone` varchar(10) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Nickname` varchar(45) NOT NULL,
  `BirthdayDate` date NOT NULL,
  `Ruc` varchar(45) NOT NULL,
  `Direccion` varchar(45) NOT NULL,
  `DateCreateUser` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `permissions` int(11) DEFAULT NULL,
  `State` int(11) DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  KEY `FKPermissions_idx` (`permissions`),
  CONSTRAINT `FKPermissions` FOREIGN KEY (`permissions`) REFERENCES `Permissions` (`idPermissions`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (8,'Sonia Gozalez we','0993833882','djkevin2332@gamil.com','$2a$10$Jbsr8PU.WyYl/H2PJkFpIu0WjJt.JManT7c/RxWO7eru49m3/VzCC','Son12','2021-09-24','11041939966','Loja','2021-09-15 16:43:37',NULL,NULL),(10,'Sonia Gonzalez Francisca Miche','0993883882','DanielNoriego@gmail.com','$2a$10$N27JWd4hh6fUWvW06u.GuulnPK4mV2Kda0PenrfyYk6tHNRuYKIFC','Daniel24','2021-09-09','1105181888','CUENCA','2021-09-15 16:32:53',NULL,NULL),(11,'Jorgue Pullaguari Martines','','','$2a$10$kH5j17fEVfUQh2J6YZb4z.X4iVB1l2vn/Rpje8DSkenaP.ew/s6CS','','2012-03-09','','','2021-09-15 16:41:14',NULL,NULL),(13,'Sonia Gozalez','0993883882','djkevinddd@gmal.comXX','$2b$10$jx2Kah2gzJemrZQynQ7RbePsqiFwpjiItU.NiOu7N5UtgsuXEdIka','Daniel9090','2021-09-20','1105138166','Loja','2021-09-04 20:32:01',NULL,NULL),(14,'Daniel','0993883882','kdmora@tecnologicoloja.edu.ec','$2b$10$Q8ESW3FLhNaWbfcz6dWgeexffGamWF7igP1GEeul.qU/xWr86Jhs2','Daniel22','2021-02-09','1105138166','Loja','2021-09-05 23:01:12',NULL,NULL),(15,'Oswaldo','0993883882','kdmora@tecnologicoloja.edu.ec.XX','$2b$10$3Sks9AZ3GjJykynfjTTKdO7YcGQEQXDt.nkrClig7cLT9su92qtTi','dANTE23','2021-09-09','1105138166','CUENCA','2021-09-06 21:08:24',NULL,NULL),(16,'Lucho Ojeda','0993883882','djkevin23@gamil.comxxxxxxxxxxxxx','$2b$10$Mghq4PQZM2IkzNhhE395CO1MXVa9w9YNxr6ZCNwiLxW0tCpH843oq','Daniel22','2021-10-02','1105138166','Cuenca ','2021-09-07 20:21:54',NULL,NULL),(17,'Lucho Ojeda','0993883882','djkevin23@gamil.comxxxxxxxxxxxxx','$2a$10$6bweqLwTD.qkQStKfpITzOV9/V2/a0Wr/AVWc2QyTvJwwg8OAxboK','Dan9090','2021-09-21','1105138166','Loja','2021-09-08 07:57:35',NULL,NULL),(18,'as','09','67','65','we','2021-09-21','1212','Ecuador','2021-09-14 15:35:48',NULL,NULL),(19,'Daniel Gonzalez','0996969696','djkevin23@gamil.com','$2a$12$yN4Tk0st5bcxUX81nObGR.abjRJ64yhaei0vVzE2jbhDBbr3r6lge','Dan9090','2019-09-09','1105138166','Loja','2021-09-14 17:27:12',NULL,NULL),(20,'Emily Mora','0993883882','EmilyMora@gamil.com','$2a$12$eMmoiUCE55CM1JblZZQqReoB.NUzDnRgVLDdWb5Ud4bB1brwijcwa','Emy20','2019-02-09','1105138166','Loja','2021-09-14 17:42:36',NULL,NULL),(21,'Emily Mora','0993444443','EmilyMora@gamil.com','$2a$12$n01WlN5JbHcsu1MKEoG5/.k6pi.A4Yq9yULdggKlkWp2lXvVL5uCu','Emy20','2021-09-09','1102138166','Loja','2021-09-14 17:48:30',NULL,NULL),(22,'Daniel Noriego','0993883990','DanielNoriego@gmail.com','$2a$12$5UXl1/C0e9q0PChU74PuCO.575EUW4zwZwK1MkwOQvnWBEvCfC0SC','DanielNoriego1234','2012-09-09','1105138166','Loja','2021-09-14 19:28:45',NULL,NULL),(23,'Lucho Ojeda','0993883882','djkevinddd@gmal.com','$2a$12$RXoZcD.xWiERSschXsG2Z.7MvUCPUw96J/u7BVoAA2xH/g.dGHS8W','Dan34','2021-09-17','1105138166','Cuenca ','2021-09-15 17:15:23',NULL,NULL),(24,'Daniel po','0993883882','djkeciiiii@outlook.com','$2a$12$eANdAs/VcjIaipAneVn57.rGc1U1wQ8Wzc9kEZT8VXxz7beB6.HMW','Daniel00000','2021-02-09','1105138166','Loja','2021-09-21 21:38:32',NULL,NULL),(25,'Daniel po','0993883882','djkeciiiii@outlook.com','$2a$12$mStG7YvqiRLNyy8XIz.FveJYpJX/Y97Ah0.STw/DDtYvps5oKmeeK','Daniel00000','2021-02-09','1105138166','Loja','2021-09-21 21:46:42',NULL,NULL),(29,'Marcó Rojas','0993883882','marcoRojas@gmail.com','$2a$12$qfA39q4hQjAW09YVWQYq2.7HZ6eZmFvkQTH4gBtScPZdcU.pOSgY.','MarcoIng ','2021-02-09','1105138166','Sucumbiós','2021-09-23 18:54:53',NULL,NULL),(30,'Marcó Rojas','0993883882','marcoRojas@gmail.com','$2a$12$wSBUdP9efmERDC3kWy0iI.mmGJxxPnnfJyx0p1zMfOu1/RS0QyrDy','MarcoIng ','2021-02-09','1105138166','Sucumbiós','2021-09-23 18:54:58',NULL,NULL);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Viajes`
--

DROP TABLE IF EXISTS `Viajes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Viajes` (
  `idViajes` int(11) NOT NULL AUTO_INCREMENT,
  `idRequest` int(11) NOT NULL,
  `idDriverViaje` int(11) NOT NULL,
  `DateAssignment` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idViajes`),
  KEY `fkDriverViaje_idx` (`idDriverViaje`),
  KEY `idRequestFk_idx` (`idRequest`),
  CONSTRAINT `fkDriverViaje` FOREIGN KEY (`idDriverViaje`) REFERENCES `Drivers` (`idDriver`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idRequestFk` FOREIGN KEY (`idRequest`) REFERENCES `Request` (`idRequest`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Viajes`
--

LOCK TABLES `Viajes` WRITE;
/*!40000 ALTER TABLE `Viajes` DISABLE KEYS */;
INSERT INTO `Viajes` VALUES (6,5,16,'2021-09-23 19:00:30');
/*!40000 ALTER TABLE `Viajes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('-K3jOg9fSEFpWvAN6LnjnbTLbtV1ZjPH',1633243801,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('1McDCAyUGPxNRIc3gTflVO_fKe4NmInD',1633213238,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('2oTRwLceaf5LLgmWJdumvHke7OQ4RvF8',1633213173,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('5NVEAmsUuNypqj31trGl5XRjrdRq3fbF',1633213161,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('83oQykxqhfZJG6kOaDj7ZTf7EZ-XbMX_',1633213027,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('A4lRZddUAuH8_MIVYTvIxKCKFbRkUfUe',1633213185,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('CUlXN4XNDU4wqZIqjLAxoINtCe99CRVG',1633213169,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('Ccd-7VwAsI_u_kD4nU-zqOmxYsIX7hCG',1633329415,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('D2YEyM0SBFjBWN_rupU3NAom-_IEqooL',1633213151,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('Hf1z9tmIKRynq0lNw3JVG9Ba7vGxUPsA',1633212354,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('IuafQKmSSBg5N6l2GLqTvIlzFp84TTgw',1633244007,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('JVOmTNck-6l-IevPKH1W6XpB5iR6eqTg',1633211994,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('JisAv-qQpkKK7csio7i3ZNSqy-r5J9JE',1633211877,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('L5i5Nf9pPp-v0yWyI6d-f29rRyM7a3Tl',1633243453,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('SEPb1h7SwAUE9Ky6-s4gJ626pX6ivp3l',1633278482,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('T82oNGcmd-eylJ84m7pl_RbcI8PkjAuS',1633213697,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('ZrCIol2f1PDLGVsQuDo2r6yqTuHOdJ9c',1633330194,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":29}}'),('cdfNCs0fo6l1pFAs4oILXqtU_PY_sfl_',1633211868,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('dn1xrncJwn4jo1U-2kBP8JP8F4aLoBol',1633212609,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('dvuSftf5DbH8b9o03in--8Q9iLiohNt5',1633243442,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('g4AHu6zZIYgsq12qABKtO2dqkl6Ub9yE',1633213252,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('gLCFfStHndGPzteyXhJ5LsKbZloh4RDd',1633213564,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('ibjJhjCN3MPXNGO4BSBK2kOycor45ZiZ',1633211898,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),('jKKXV3OjXpw0NtaH5P0dthgS9Dc_eshG',1633213164,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('kPOR85eNJ0ZI7uvixvoIT4VIYwC3B-l5',1633213176,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('l1wWIEincWY5ZoOADx5WD2AYBGs9AbSE',1633211848,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('ngJ0fGa73GN733verOUsOIulMxqWLHjN',1633278325,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('rEB42VZy8PTI-L6wmhggoQmUhcf7CtQd',1633213246,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('s2rAiLorMBoSAHMxgx8Ovx5eSW2EkgkC',1633211873,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('wJOJGInzYO6J-HeCcdPKUgmHCdBWnPty',1633213158,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('wioikAgP1QffsFODZzKqFWBFoISzpEt8',1633278170,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('yGGB6C6gCCofAeCz89YOENW5Fi6LpZ4h',1633278678,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('ymrrq_c67cSsgrcUIuVrfprNi7Z0xwDj',1633209050,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'bdAplication_taxi'
--

--
-- Dumping routines for database 'bdAplication_taxi'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-03  1:53:12
