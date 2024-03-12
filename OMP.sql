CREATE DATABASE  IF NOT EXISTS `ompdatabase` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ompdatabase`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ompdatabase
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cartID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `itemID` int NOT NULL,
  `itemPrice` decimal(10,2) DEFAULT NULL,
  `imagePath` varchar(255) DEFAULT NULL,
  `itemName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cartID`),
  KEY `userID` (`userID`),
  KEY `itemID` (`itemID`),
  KEY `fk_itemName` (`itemName`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `userdata` (`userID`),
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`itemID`) REFERENCES `listings` (`itemID`),
  CONSTRAINT `cart_ibfk_3` FOREIGN KEY (`itemID`) REFERENCES `listings` (`itemID`),
  CONSTRAINT `cart_ibfk_4` FOREIGN KEY (`itemID`) REFERENCES `listing_images` (`itemID`),
  CONSTRAINT `fk_itemName` FOREIGN KEY (`itemName`) REFERENCES `listings` (`itemName`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (6,2,1,9999.00,'..\\..\\assets\\listings\\a31d981f-2b4c-406d-bbce-d5d583003af9.jpg','Doggos'),(7,2,2,10000000.00,'..\\..\\assets\\listings\\f40ee822-132e-46fe-b771-dfcfedf9d026.png','Ayala Building'),(8,2,3,38247834.00,'..\\..\\assets\\listings\\2c783f6b-9e76-47cf-b6e4-79d4f0cabf2e.png','Tools'),(9,2,4,98989898.00,'..\\..\\assets\\listings\\084d1048-28df-4496-8556-d6a54f79778d.png','Vehicles'),(10,2,7,1247.00,'..\\..\\assets\\listings\\00b7fe89-5f64-44c5-9a08-daf842864412.png','Electronics'),(11,2,1,9999.00,'..\\..\\assets\\listings\\a31d981f-2b4c-406d-bbce-d5d583003af9.jpg','Doggos'),(12,2,5,99.00,'..\\..\\assets\\listings\\a2ce04d3-75d8-49ff-8e73-a18b09850e8a.png','OMP LOGO'),(13,2,6,189.00,'..\\..\\assets\\listings\\69364b71-8b40-437c-8152-1dea6f0eed1c.jpg','Random Papers');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listing_images`
--

DROP TABLE IF EXISTS `listing_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listing_images` (
  `imageID` int NOT NULL AUTO_INCREMENT,
  `itemID` int DEFAULT NULL,
  `imagePath` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`imageID`),
  KEY `itemID` (`itemID`),
  CONSTRAINT `listing_images_ibfk_1` FOREIGN KEY (`itemID`) REFERENCES `listings` (`itemID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listing_images`
--

LOCK TABLES `listing_images` WRITE;
/*!40000 ALTER TABLE `listing_images` DISABLE KEYS */;
INSERT INTO `listing_images` VALUES (1,1,'..\\..\\assets\\listings\\a31d981f-2b4c-406d-bbce-d5d583003af9.jpg'),(2,1,'..\\..\\assets\\listings\\f9fd8ca2-11a7-4dc3-ba8f-d6405efcbf42.jpg'),(3,2,'..\\..\\assets\\listings\\f40ee822-132e-46fe-b771-dfcfedf9d026.png'),(4,3,'..\\..\\assets\\listings\\2c783f6b-9e76-47cf-b6e4-79d4f0cabf2e.png'),(5,4,'..\\..\\assets\\listings\\084d1048-28df-4496-8556-d6a54f79778d.png'),(6,4,'..\\..\\assets\\listings\\0b6b1695-cdba-438c-95e3-231e19865e33.png'),(7,4,'..\\..\\assets\\listings\\115a4c3c-aded-46ee-960b-d1177d9fce57.png'),(8,4,'..\\..\\assets\\listings\\b6a56795-eb00-4fc7-ad38-45eaaa7d1068.png'),(9,4,'..\\..\\assets\\listings\\7e4fb0b3-2b79-4861-9064-6aa53037c7e8.png'),(10,5,'..\\..\\assets\\listings\\a2ce04d3-75d8-49ff-8e73-a18b09850e8a.png'),(11,5,'..\\..\\assets\\listings\\03a85d06-5ee8-409f-bda5-68d9ecae0ce1.png'),(12,6,'..\\..\\assets\\listings\\69364b71-8b40-437c-8152-1dea6f0eed1c.jpg'),(13,6,'..\\..\\assets\\listings\\6c203b7b-7b67-45e7-b488-c8473e437323.jpg'),(14,6,'..\\..\\assets\\listings\\6749904b-fe9b-407b-892b-356d1d4ac1b0.jpg'),(15,7,'..\\..\\assets\\listings\\00b7fe89-5f64-44c5-9a08-daf842864412.png'),(16,8,'..\\..\\assets\\listings\\80935264-ff57-4c41-a18b-c952b1e4c748.png'),(17,9,'..\\..\\assets\\listings\\2516f22f-f1d7-4793-bd73-1b30a0b9983e.png'),(18,10,'..\\..\\assets\\listings\\f4c18117-fa1d-4cec-9b98-4d3115bf2718.jpg'),(19,11,'..\\..\\assets\\listings\\5496529d-d6b9-4285-826f-1234042f3619.png');
/*!40000 ALTER TABLE `listing_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listings`
--

DROP TABLE IF EXISTS `listings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listings` (
  `itemID` int NOT NULL AUTO_INCREMENT,
  `itemName` varchar(255) DEFAULT NULL,
  `itemDescription` text,
  `userID` int DEFAULT NULL,
  `itemPrice` decimal(10,2) DEFAULT NULL,
  `itemCategory` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`itemID`),
  KEY `userID` (`userID`),
  KEY `idx_itemName` (`itemName`),
  CONSTRAINT `listings_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `userdata` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listings`
--

LOCK TABLES `listings` WRITE;
/*!40000 ALTER TABLE `listings` DISABLE KEYS */;
INSERT INTO `listings` VALUES (1,'Doggos','HEV ABI ENJOYER LABRADOR',2,9999.00,'Properties'),(2,'Ayala Building','Ayala Building at Ayala, Alabang',2,10000000.00,'Properties'),(3,'Tools','isldfjsdjfdsklf',2,38247834.00,'Tools-and-Equipment'),(4,'Vehicles','Vehicles',2,98989898.00,'Vehicles'),(5,'OMP LOGO','Free Logo',2,99.00,'Tools-and-Equipment'),(6,'Random Papers','For School',2,189.00,'Tools-and-Equipment'),(7,'Electronics','Electronics',2,1247.00,'Electronics'),(8,'TOOLS','Hard Hat, Hammer, Measuring Tape, and Belt Holster',2,1900.00,'Tools-and-Equipment'),(9,'qweqw','12434',2,123.00,'Electronics'),(10,'POGING TAO','Poging Tao',2,9999999.00,'Tools-and-Equipment'),(11,'all','ashdkjahd',2,12938.00,'Properties');
/*!40000 ALTER TABLE `listings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userdata`
--

DROP TABLE IF EXISTS `userdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userdata` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userdata`
--

LOCK TABLES `userdata` WRITE;
/*!40000 ALTER TABLE `userdata` DISABLE KEYS */;
INSERT INTO `userdata` VALUES (1,'test','test@gmail.com','1234','192, New York'),(2,'admin','admin@gmail.com','1234567890','777, Batangas City');
/*!40000 ALTER TABLE `userdata` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-12 19:30:51
