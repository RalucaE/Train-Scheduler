-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: test
-- ------------------------------------------------------
-- Server version	8.0.33
create database test;
use test;
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
-- Table structure for table `city_distants`
--
create database test;
use test;

DROP TABLE IF EXISTS `city_distants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city_distants` (
  `id` bigint NOT NULL,
  `destinatie` varchar(255) DEFAULT NULL,
  `km` int DEFAULT NULL,
  `origin` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city_distants`
--

LOCK TABLES `city_distants` WRITE;
/*!40000 ALTER TABLE `city_distants` DISABLE KEYS */;
INSERT INTO `city_distants` VALUES (1,'Predeal',26,'Brasov'),(2,'Azuga',8,'Predeal'),(3,'Busteni',5,'Azuga'),(4,'Sinaia',8,'Busteni'),(5,'Comarnic',17,'Sinaia'),(6,'Campina',18,'Comarnic'),(7,'Floriesti Prahova',15,'Campina'),(8,'Ploiesti Vest',50,'Floriesti Prahova'),(9,'Bucuresti Nord',62,'Ploiesti Vest'),(10,'Ploiesti Sud',58,'Bucuresti Nord'),(11,'Mizil',34,'Ploiesti Sud'),(12,'Buzau',35,'Mizil'),(13,'Ploiesti Sud',2,'Ploiesti Vest');
/*!40000 ALTER TABLE `city_distants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refreshtoken`
--

DROP TABLE IF EXISTS `refreshtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refreshtoken` (
  `id` bigint NOT NULL,
  `token` varchar(255) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_or156wbneyk8noo4jstv55ii3` (`token`),
  KEY `FKa652xrdji49m4isx38pp4p80p` (`user_id`),
  CONSTRAINT `FKa652xrdji49m4isx38pp4p80p` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refreshtoken`
--

LOCK TABLES `refreshtoken` WRITE;
/*!40000 ALTER TABLE `refreshtoken` DISABLE KEYS */;
INSERT INTO `refreshtoken` VALUES (352,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBlbWFpbC5jb20iLCJpYXQiOjE2ODQzMTU3MTAsImV4cCI6MTY4NDQwMjExMH0.IvHmGes3DEU1xAd9ogui7FnydnejIRaDTahb-7mSkM2IAo5Hlplz9m6SF6aoS1xxILeDLYHe6pUbBcYD7p7DqA',3),(402,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBlbWFpbC5jb20iLCJpYXQiOjE2ODQzMjA4MjEsImV4cCI6MTY4NDQwNzIyMX0.zvXdYXRCE6ye30jbqr9P6YXCHQ4VWHnBUWFY133D4XlBYdkuQb06VwJRtTgm4J67jDkXOqGhK16-E8nTY9i4Gg',3),(403,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBlbWFpbC5jb20iLCJpYXQiOjE2ODQzMjIyMTYsImV4cCI6MTY4NDQwODYxNn0.JcOBlBf35aPU4HShxSXqZBtDrCaYGdu8OvmOFQuxK-IcZLt9nRfqhdtanP5uB9lbe0r4cii7pUq0X4RQkSrESA',3),(404,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBlbWFpbC5jb20iLCJpYXQiOjE2ODQzMjM0MTAsImV4cCI6MTY4NDQwOTgxMH0.pDS8KrzEBt7FvafFIBQEWQZBQLEW8p5_4rI66VUDhPFjk1C880Eqe7na2yGHmTzsgOwUUqkUcw95Jny77IkLFw',3),(452,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBlbWFpbC5jb20iLCJpYXQiOjE2ODY3NDQxNzIsImV4cCI6MTY4NjgzMDU3Mn0.1D5aPILo0WdIBboABe0K_Vb7O4_DaY5y8oVtBuyMP6aALyEg8K3-1C5Ay9Qa90M7LKySwV7YLg6PnxkY7B2oUQ',3),(502,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBlbWFpbC5jb20iLCJpYXQiOjE2ODczNDM3NDAsImV4cCI6MTY4NzQzMDE0MH0.gSUM1TuNLLO_h5cwIS2tBBP5seKtvzrgHJT6UynXKn22ZwI5LyAgpl07ahS_g1QMe0o-J6l0ChSuk7ujumf4lA',3),(552,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBlbWFpbC5jb20iLCJpYXQiOjE2ODgzOTkzMzgsImV4cCI6MTY4ODQ4NTczOH0.khV7Z5yQ-ILo3JAVM5nSosKB2qLhF2bDlrZFFZ2z8wi8J01EtZ_7LGA5jRHERnEAXKCvx88R4C2tKDk7fJuOAw',3),(553,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBlbWFpbC5jb20iLCJpYXQiOjE2ODg0MDExNDUsImV4cCI6MTY4ODQ4NzU0NX0.714UYBKjcniBQKKs3oATJMJu7FApXVC_JH1TPTVgrjMeb2DeN36h04g6pF50meLJBAQVacYLRUNYGp1kQmBTJQ',3),(554,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBlbWFpbC5jb20iLCJpYXQiOjE2ODg0MDMwNTAsImV4cCI6MTY4ODQ4OTQ1MH0.40VzqLQOJ1l_WPkGQc9NinR__4JcYCaT0dto5WABxnPgekDlzCL6TlkebXfWagFUqkl0q5Ob69BD2VO8Y95BeA',3),(602,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBlbWFpbC5jb20iLCJpYXQiOjE2ODg0NzQ5MjMsImV4cCI6MTY4ODU2MTMyM30.Y7DkQ844eIDUCTP4Sm7Y_7-Mo6CzPQgUjwkkbnDCzaN_-bKwfNzglxtJ-qSqD-xJuSFhmuuoUSTXoyrG9TA3Yg',3),(603,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBlbWFpbC5jb20iLCJpYXQiOjE2ODg0NzY3MzMsImV4cCI6MTY4ODU2MzEzM30.e-iq3hYtzlsMxaAwVzU7QIBHJFDKPIErOfy4zM1gOUak8q-cjz3tFtFVLfE1343Mv9bnLJyXcBRF4Gw4zMeLOQ',3),(604,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBlbWFpbC5jb20iLCJpYXQiOjE2ODg0Nzg4NDUsImV4cCI6MTY4ODU2NTI0NX0.CPwzIu2pgkCNzzZmFpUFC8PSH-nBi0k7hBHr1Vhww2Oc35jYpVbPkZCi6a8htT_YpGBO5FoBt-b1SjA9m8_HLw',3),(652,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBlbWFpbC5jb20iLCJpYXQiOjE2ODg0ODE2NzcsImV4cCI6MTY4ODU2ODA3N30.zZwvVKTZequEM1www0QHwEAVRJOhupYQoa27ezJylmhfKjEWwKtH-xfrIJJtI_wsteH-21UdxfoTqEAGBcVIYQ',3),(702,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBlbWFpbC5jb20iLCJpYXQiOjE2ODg0ODI5MTksImV4cCI6MTY4ODU2OTMxOX0.dSzNUCtw4wGR4NNpSypBvLtsoPTl4OpCW-BLXAjsmPUbrc4AfrzkrGx6eP0SQtLCP_eGSj_aflrF4gX7SQy6Yw',3),(752,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBlbWFpbC5jb20iLCJpYXQiOjE2ODg0ODQ3ODksImV4cCI6MTY4ODU3MTE4OX0.h8InsXNLIgeb8u70Fz5DMGVQwRscUDuSXvWUeQPD3XHdd2iNEFuDGY3kdAiEGGnoxXFouO-Kt5X6S5TCPs6neA',3),(802,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBlbWFpbC5jb20iLCJpYXQiOjE2ODg1NTU2NDEsImV4cCI6MTY4ODY0MjA0MX0.gGyduwViHVQGvAE4Ww3vdRw-20m2yK-0lCebCSKV6SWWv0Y-O9EkDAaUPpnshWildxMP5SuVxkmuGjSpUcpwXg',3),(852,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBlbWFpbC5jb20iLCJpYXQiOjE2ODg5OTczMjEsImV4cCI6MTY4OTA4MzcyMX0._AKcrRq4UG13MckKE2ovwc_HtbI6k31yY1kDjx2tk77rn3VzAFQcej4y95eaIvSedtdXSQrkEZD9URK-8nvmgg',3),(853,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBlbWFpbC5jb20iLCJpYXQiOjE2ODg5OTgzMzcsImV4cCI6MTY4OTA4NDczN30.YVaxR3UTtVI473Lc9_h2qrS43vhQcKm_fcI8ooAZLgUrB4TE1wiePvN2nEF522HbR-PsoaeDpHpYMxaCNTlhUg',3),(854,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBlbWFpbC5jb20iLCJpYXQiOjE2ODg5OTgzNTksImV4cCI6MTY4OTA4NDc1OX0.W62JDavK90H4iZFBfBi8-RRgLEBz6fCpaFuHkz5TWF_lJA6h4Pm4uezlNP8VEVMcHoCEjksO2pvOJMPzkoKoRA',3),(902,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBlbWFpbC5jb20iLCJpYXQiOjE2ODg5OTg0OTgsImV4cCI6MTY4OTA4NDg5OH0.nmtUSgikSqtBuqKY4rf4o_fYNNnT6fvf2qVqYu6Tf8_ExmzeM4FvRg7-JRk0r5T3qaDmZNiSCTAzK551M2h51w',3),(903,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NUBlbWFpbC5jb20iLCJpYXQiOjE2ODkwMDA1OTksImV4cCI6MTY4OTA4Njk5OX0.N6lyfY24IfLDebhUwsOKbv8JhKMETh7jtN7pmO86K_K4RclYReCVY8GXeUD1xicyysEuy3joS883bDs4GJG9Xg',3),(952,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYWx1Y2EyQHRlc3QuY29tIiwiaWF0IjoxNjg5MTUwMjM0LCJleHAiOjE2ODkyMzY2MzR9.BI_XnEtwnhqMZc75nhuMXV2ljIIR4zSNcj3cWBJ9g_xRwqp4allbkl0V79rcdOE9qK0LJOEhj3TOmpaC9lk7Ng',4);
/*!40000 ALTER TABLE `refreshtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refreshtoken_seq`
--

DROP TABLE IF EXISTS `refreshtoken_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refreshtoken_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refreshtoken_seq`
--

LOCK TABLES `refreshtoken_seq` WRITE;
/*!40000 ALTER TABLE `refreshtoken_seq` DISABLE KEYS */;
INSERT INTO `refreshtoken_seq` VALUES (1051);
/*!40000 ALTER TABLE `refreshtoken_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ROLE_USER'),(2,'ROLE_MODERATOR'),(3,'ROLE_ADMIN');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routes`
--

DROP TABLE IF EXISTS `routes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routes` (
  `id` bigint NOT NULL,
  `date_time` varchar(255) DEFAULT NULL,
  `oras_destinatie` varchar(255) DEFAULT NULL,
  `oras_origine` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routes`
--

LOCK TABLES `routes` WRITE;
/*!40000 ALTER TABLE `routes` DISABLE KEYS */;
/*!40000 ALTER TABLE `routes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routes_sequence`
--

DROP TABLE IF EXISTS `routes_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routes_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routes_sequence`
--

LOCK TABLES `routes_sequence` WRITE;
/*!40000 ALTER TABLE `routes_sequence` DISABLE KEYS */;
INSERT INTO `routes_sequence` VALUES (1);
/*!40000 ALTER TABLE `routes_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stations`
--

DROP TABLE IF EXISTS `stations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `station_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stations`
--

LOCK TABLES `stations` WRITE;
/*!40000 ALTER TABLE `stations` DISABLE KEYS */;
INSERT INTO `stations` VALUES (1,'Predeal'),(2,'Azuga'),(3,'Busteni'),(4,'Sinaia'),(5,'Comarnic'),(6,'Câmpina'),(7,'Floriesti Prahova'),(8,'Ploiesti Vest'),(9,'Ploiesti Sud'),(10,'Mizil');
/*!40000 ALTER TABLE `stations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_id`
--

DROP TABLE IF EXISTS `student_id`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_id` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_student` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `nume` varchar(255) DEFAULT NULL,
  `prenume` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9vptdyvwoq6vlpryumvd92nu1` (`user_id`),
  CONSTRAINT `FK9vptdyvwoq6vlpryumvd92nu1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_id`
--

LOCK TABLES `student_id` WRITE;
/*!40000 ALTER TABLE `student_id` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_id` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_history`
--

DROP TABLE IF EXISTS `ticket_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `class_type` varchar(255) DEFAULT NULL,
  `data_cumparare_ticket` varchar(255) DEFAULT NULL,
  `numar_tren` varchar(255) DEFAULT NULL,
  `nume_pasager` varchar(255) DEFAULT NULL,
  `ora_plecare` varchar(255) DEFAULT NULL,
  `ora_sosire` varchar(255) DEFAULT NULL,
  `oras_plecare` varchar(255) DEFAULT NULL,
  `oras_sosire` varchar(255) DEFAULT NULL,
  `pret` varchar(255) DEFAULT NULL,
  `tip_ticket` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKd7glwt6l4hgq6bskwcmllsj4c` (`user_id`),
  CONSTRAINT `FKd7glwt6l4hgq6bskwcmllsj4c` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_history`
--

LOCK TABLES `ticket_history` WRITE;
/*!40000 ALTER TABLE `ticket_history` DISABLE KEYS */;
INSERT INTO `ticket_history` VALUES (1,'2','13/05/2023 17:41:57','IR 1628','Andrei Mihai','04:55','07:32','Brasov','Bucuresti Nord','23','Adult',3),(2,'2','13/05/2023 17:41:57','IR 1628','Marius Constantin','04:55','07:32','Brasov','Bucuresti Nord','23','Student',3),(3,'2','13/05/2023 17:41:57','IR 1573','Andrei Mihai','08:11','09:54','Bucuresti Nord','Buzau','25','Adult',3),(4,'2','13/05/2023 17:41:57','IR 1573','Marius Constantin','08:11','09:54','Bucuresti Nord','Buzau','25','Student',3),(5,'2','17/05/2023 13:54:22','IR 1628','Marcel Ionut','04:55','07:32','Brasov','Bucuresti Nord','36.75','Adult',3),(6,'2','17/05/2023 13:54:22','IR 1573','Marcel Ionut','08:11','09:54','Bucuresti Nord','Buzau','47.25','Adult',3),(7,'2','17/05/2023 14:18:31','IR 1628','Marcel Ionut','04:55','07:32','Brasov','Bucuresti Nord','36.75','Adult',3),(8,'2','17/05/2023 14:18:31','IR 1628','Sergiu Andrei','04:55','07:32','Brasov','Bucuresti Nord','16.5375','Child',3),(9,'2','17/05/2023 14:18:31','IR 1573','Marcel Ionut','08:11','09:54','Bucuresti Nord','Buzau','47.25','Adult',3),(10,'2','17/05/2023 14:18:31','IR 1573','Sergiu Andrei','08:11','09:54','Bucuresti Nord','Buzau','21.2625','Child',3),(11,'2','17/05/2023 14:23:29','IR 1628','Marcel Ionut','04:55','07:32','Brasov','Bucuresti Nord','36.75','Adult',3),(12,'2','17/05/2023 14:23:29','IR 1573','Marcel Ionut','08:11','09:54','Bucuresti Nord','Buzau','47.25','Adult',3),(13,'2','05/07/2023 14:38:44','IR 1628','Marcel Ionut','04:55','07:32','Brasov','Bucuresti Nord','16.5375','Child',3),(14,'2','05/07/2023 14:38:44','IR 1628','Nicolae Florin','04:55','07:32','Brasov','Bucuresti Nord','16.5375','Child',3),(15,'2','05/07/2023 14:38:44','IR 1628','Vasile Ion','04:55','07:32','Brasov','Bucuresti Nord','16.5375','Child',3),(16,'2','05/07/2023 14:38:44','IR 1628','Ion Creabga','04:55','07:32','Brasov','Bucuresti Nord','16.5375','Child',3),(17,'2','05/07/2023 14:38:44','IR 1573','Marcel Ionut','08:11','09:54','Bucuresti Nord','Buzau','21.2625','Child',3),(18,'2','05/07/2023 14:38:44','IR 1573','Nicolae Florin','08:11','09:54','Bucuresti Nord','Buzau','21.2625','Child',3),(19,'2','05/07/2023 14:38:45','IR 1573','Vasile Ion','08:11','09:54','Bucuresti Nord','Buzau','21.2625','Child',3),(20,'2','05/07/2023 14:38:45','IR 1573','Ion Creabga','08:11','09:54','Bucuresti Nord','Buzau','21.2625','Child',3),(21,'2','12/07/2023 11:24:44','IR 1730','Marcel Ionut','17:20','20:24','Brasov','Buzau','54.5','Adult',4),(22,'2','12/07/2023 11:24:44','IR 1730','Nicolae Florin','17:20','20:24','Brasov','Buzau','54.5','Adult',4);
/*!40000 ALTER TABLE `ticket_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `train_points`
--

DROP TABLE IF EXISTS `train_points`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `train_points` (
  `train_id` int NOT NULL,
  `cities_id` bigint NOT NULL,
  PRIMARY KEY (`train_id`,`cities_id`),
  KEY `FK4iebc6sd0sja8a1dlkqijlo3p` (`cities_id`),
  CONSTRAINT `FK2kae16nh6cfr2d7q6val4qk3x` FOREIGN KEY (`train_id`) REFERENCES `trains` (`id`),
  CONSTRAINT `FK4iebc6sd0sja8a1dlkqijlo3p` FOREIGN KEY (`cities_id`) REFERENCES `city_distants` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `train_points`
--

LOCK TABLES `train_points` WRITE;
/*!40000 ALTER TABLE `train_points` DISABLE KEYS */;
INSERT INTO `train_points` VALUES (1,1),(3,1),(4,1),(1,2),(3,2),(4,2),(1,3),(3,3),(4,3),(1,4),(3,4),(4,4),(1,5),(3,5),(4,5),(1,6),(3,6),(4,6),(1,7),(3,7),(4,7),(1,8),(3,8),(4,8),(2,9),(2,10),(2,11),(3,11),(4,11),(2,12),(3,12),(4,12),(3,13),(4,13);
/*!40000 ALTER TABLE `train_points` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `train_routes`
--

DROP TABLE IF EXISTS `train_routes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `train_routes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ora_plecare` varchar(255) DEFAULT NULL,
  `ora_sosire` varchar(255) DEFAULT NULL,
  `tren_schimbare_1` int DEFAULT NULL,
  `tren_schimbare_2` int DEFAULT NULL,
  `tren_schimbare_3` int DEFAULT NULL,
  `tren_schimbare_4` int DEFAULT NULL,
  `oras_destinatie` varchar(255) DEFAULT NULL,
  `oras_origine` varchar(255) DEFAULT NULL,
  `date_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKo10jrw9sgohdsyb111ic7sjc4` (`tren_schimbare_1`),
  KEY `FKfarhspul5l2x54d3qq1firl3j` (`tren_schimbare_2`),
  KEY `FK4bd8jcxee70ctxpcdhvnxeked` (`tren_schimbare_3`),
  KEY `FKg4vdx8wg7pvy8fdmu0tcw5j6j` (`tren_schimbare_4`),
  CONSTRAINT `FK4bd8jcxee70ctxpcdhvnxeked` FOREIGN KEY (`tren_schimbare_3`) REFERENCES `trains` (`id`),
  CONSTRAINT `FKfarhspul5l2x54d3qq1firl3j` FOREIGN KEY (`tren_schimbare_2`) REFERENCES `trains` (`id`),
  CONSTRAINT `FKg4vdx8wg7pvy8fdmu0tcw5j6j` FOREIGN KEY (`tren_schimbare_4`) REFERENCES `trains` (`id`),
  CONSTRAINT `FKo10jrw9sgohdsyb111ic7sjc4` FOREIGN KEY (`tren_schimbare_1`) REFERENCES `trains` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `train_routes`
--

LOCK TABLES `train_routes` WRITE;
/*!40000 ALTER TABLE `train_routes` DISABLE KEYS */;
INSERT INTO `train_routes` VALUES (1,'04:55','09:54',1,2,NULL,NULL,'Buzau','Brasov','2023-11-03'),(2,'17:20','20:24',3,NULL,NULL,NULL,'Buzau','Brasov','2023-11-03'),(3,'08:45','12:23',4,NULL,NULL,NULL,'Brasov','Buzau','2023-11-03');
/*!40000 ALTER TABLE `train_routes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `train_stations`
--

DROP TABLE IF EXISTS `train_stations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `train_stations` (
  `train_id` int NOT NULL,
  `station_id` int NOT NULL,
  PRIMARY KEY (`train_id`,`station_id`),
  KEY `FKhlxsnap38uaq1owp3tlo438v` (`station_id`),
  CONSTRAINT `FKd39y3so4bhjfs9p9x1cgf3a4d` FOREIGN KEY (`train_id`) REFERENCES `trains` (`id`),
  CONSTRAINT `FKhlxsnap38uaq1owp3tlo438v` FOREIGN KEY (`station_id`) REFERENCES `stations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `train_stations`
--

LOCK TABLES `train_stations` WRITE;
/*!40000 ALTER TABLE `train_stations` DISABLE KEYS */;
INSERT INTO `train_stations` VALUES (1,1),(3,1),(4,1),(1,2),(3,2),(4,2),(1,3),(3,3),(4,3),(1,4),(3,4),(4,4),(1,5),(1,6),(3,6),(4,6),(1,7),(1,8),(3,8),(4,8),(2,9),(3,9),(4,9),(2,10),(3,10),(4,10);
/*!40000 ALTER TABLE `train_stations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trains`
--

DROP TABLE IF EXISTS `trains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trains` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numar_tren` varchar(255) DEFAULT NULL,
  `ora_plecare` varchar(255) DEFAULT NULL,
  `ora_sosire` varchar(255) DEFAULT NULL,
  `oras_destinatie` varchar(255) DEFAULT NULL,
  `oras_origine` varchar(255) DEFAULT NULL,
  `data_time` varchar(255) DEFAULT NULL,
  `cuseta` bit(1) NOT NULL,
  `first_class` bit(1) NOT NULL,
  `second_class` bit(1) NOT NULL,
  `bicicleta` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trains`
--

LOCK TABLES `trains` WRITE;
/*!40000 ALTER TABLE `trains` DISABLE KEYS */;
INSERT INTO `trains` VALUES (1,'IR 1628','04:55','07:32','Bucuresti Nord','Brasov','04/28/2023',_binary '',_binary '',_binary '',_binary '\0'),(2,'IR 1573','08:11','09:54','Buzau','Bucuresti Nord','04/28/2023',_binary '\0',_binary '',_binary '',_binary '\0'),(3,'IR 1730','17:20','20:24','Buzau','Brasov','04/28/2023',_binary '\0',_binary '',_binary '',_binary ''),(4,'IR 1731','08:45','12:23','Brasov','Buzau','04/28/2023',_binary '\0',_binary '',_binary '',_binary '\0');
/*!40000 ALTER TABLE `trains` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trains_station`
--

DROP TABLE IF EXISTS `trains_station`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trains_station` (
  `id` int NOT NULL AUTO_INCREMENT,
  `station_order` int DEFAULT NULL,
  `stations_id` int DEFAULT NULL,
  `train_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5swr24tuulwrj70eeno45tjp` (`stations_id`),
  KEY `FK8kqwpm5w3djeasriow5nw4595` (`train_id`),
  CONSTRAINT `FK5swr24tuulwrj70eeno45tjp` FOREIGN KEY (`stations_id`) REFERENCES `stations` (`id`),
  CONSTRAINT `FK8kqwpm5w3djeasriow5nw4595` FOREIGN KEY (`train_id`) REFERENCES `trains` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trains_station`
--

LOCK TABLES `trains_station` WRITE;
/*!40000 ALTER TABLE `trains_station` DISABLE KEYS */;
INSERT INTO `trains_station` VALUES (1,1,1,1),(2,2,2,1),(3,3,3,1),(4,4,4,1),(5,5,5,1),(6,6,6,1),(7,7,7,1),(8,8,8,1),(9,9,9,2),(10,10,10,2),(11,1,10,4),(12,2,9,4),(13,3,8,4),(14,4,6,4),(15,5,4,4),(16,6,3,4),(17,7,2,4),(18,8,1,4),(19,1,1,3),(20,2,2,3),(21,3,3,3),(22,4,4,3),(23,5,6,3),(24,6,8,3),(25,7,9,3),(26,8,10,3);
/*!40000 ALTER TABLE `trains_station` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` bigint NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`),
  CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,1),(2,1),(3,1),(4,1);
INSERT INTO `user_roles` VALUES (1,1),(2,1),(3,1),(4,1);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cnp` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `student_id` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `validation` bit(1) DEFAULT NULL,
  `pupil_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,'dragomirsergiu23@gmail.com',NULL,'$2a$10$81Yk65VgbD0PUHlRD5E59.lJstfp44lmfjfPlkicrh.I0AwJ7qD7S',NULL,'sergiu',NULL,NULL),(2,NULL,'test3@gmail.com',NULL,'$2a$10$bJqvrykZ4ba/TyqCswc1BOSQhOJe33Ay8x0TgC0GsyCKPiMUNtrS6',NULL,'andrei',NULL,NULL),(3,NULL,'test5@email.com',NULL,'$2a$10$J7qAn34RgWnGnKjaB3XYPudwQrcmlPm65LMl09BQdik05gFIkRDt2','1','test5',NULL,NULL),(4,NULL,'raluca2@test.com',NULL,'$2a$10$VzrYkutiB4csoQYBR..hbueV4EFO.1IHWYKU6kWm6LfauBVb243wW',NULL,'raluca',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wagon`
--

DROP TABLE IF EXISTS `wagon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wagon` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `train_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKenfhv9cy7gtp4jbly0789wmyy` (`train_id`),
  CONSTRAINT `FKenfhv9cy7gtp4jbly0789wmyy` FOREIGN KEY (`train_id`) REFERENCES `trains` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wagon`
--

LOCK TABLES `wagon` WRITE;
/*!40000 ALTER TABLE `wagon` DISABLE KEYS */;
INSERT INTO `wagon` VALUES (1,1),(2,1),(3,1),(4,1),(5,2),(6,2),(7,2),(8,2),(9,2),(10,3),(11,3),(12,3),(13,3),(14,4),(15,4),(16,4),(17,4);
/*!40000 ALTER TABLE `wagon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wagon_seats`
--

DROP TABLE IF EXISTS `wagon_seats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wagon_seats` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `seat_number` int DEFAULT NULL,
  `seat_state` int DEFAULT NULL,
  `wagon_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnsk9mx8eb94h2os6sue6dy0bd` (`wagon_id`),
  CONSTRAINT `FKnsk9mx8eb94h2os6sue6dy0bd` FOREIGN KEY (`wagon_id`) REFERENCES `wagon` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=681 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wagon_seats`
--

LOCK TABLES `wagon_seats` WRITE;
/*!40000 ALTER TABLE `wagon_seats` DISABLE KEYS */;
INSERT INTO `wagon_seats` VALUES (1,1,1,1),(2,2,1,1),(3,3,1,1),(4,4,1,1),(5,5,1,1),(6,6,2,1),(7,7,2,1),(8,8,2,1),(9,9,2,1),(10,10,2,1),(11,11,1,1),(12,12,1,1),(13,13,1,1),(14,14,1,1),(15,15,1,1),(16,16,2,1),(17,17,0,1),(18,18,0,1),(19,19,2,1),(20,20,2,1),(21,1,1,2),(22,2,1,2),(23,3,2,2),(24,4,2,2),(25,5,1,2),(26,6,1,2),(27,7,2,2),(28,8,2,2),(29,9,1,2),(30,10,1,2),(31,11,2,2),(32,12,2,2),(33,13,1,2),(34,14,1,2),(35,15,2,2),(36,16,2,2),(37,17,2,2),(38,18,2,2),(39,19,2,2),(40,20,2,2),(41,1,2,3),(42,2,2,3),(43,3,2,3),(44,4,2,3),(45,5,2,3),(46,6,2,3),(47,7,2,3),(48,8,2,3),(49,9,2,3),(50,10,2,3),(51,11,2,3),(52,12,2,3),(53,13,2,3),(54,14,2,3),(55,15,2,3),(56,16,2,3),(57,17,2,3),(58,18,2,3),(59,19,2,3),(60,20,2,3),(61,1,2,4),(62,2,2,4),(63,3,2,4),(64,4,2,4),(65,5,2,4),(66,6,2,4),(67,7,2,4),(68,8,2,4),(69,9,2,4),(70,10,2,4),(71,11,2,4),(72,12,2,4),(73,13,2,4),(74,14,2,4),(75,15,2,4),(76,16,2,4),(77,17,2,4),(78,18,2,4),(79,19,2,4),(80,20,2,4),(81,1,2,5),(82,2,2,5),(83,3,2,5),(84,4,2,5),(85,5,2,5),(86,6,2,5),(87,7,2,5),(88,8,2,5),(89,9,2,5),(90,10,2,5),(91,11,2,5),(92,12,2,5),(93,13,2,5),(94,14,2,5),(95,15,2,5),(96,16,2,5),(97,17,2,5),(98,18,2,5),(99,19,2,5),(100,20,2,5),(101,1,2,6),(102,2,2,6),(103,3,2,6),(104,4,2,6),(105,5,2,6),(106,6,2,6),(107,7,2,6),(108,8,2,6),(109,9,2,6),(110,10,2,6),(111,11,2,6),(112,12,2,6),(113,13,2,6),(114,14,2,6),(115,15,2,6),(116,16,2,6),(117,17,2,6),(118,18,2,6),(119,19,2,6),(120,20,2,6),(121,1,2,7),(122,2,2,7),(123,3,2,7),(124,4,2,7),(125,5,2,7),(126,6,2,7),(127,7,2,7),(128,8,2,7),(129,9,2,7),(130,10,2,7),(131,11,2,7),(132,12,2,7),(133,13,2,7),(134,14,2,7),(135,15,2,7),(136,16,2,7),(137,17,2,7),(138,18,2,7),(139,19,2,7),(140,20,2,7),(141,1,2,8),(142,2,2,8),(143,3,2,8),(144,4,2,8),(145,5,2,8),(146,6,2,8),(147,7,2,8),(148,8,2,8),(149,9,2,8),(150,10,2,8),(151,11,2,8),(152,12,2,8),(153,13,2,8),(154,14,2,8),(155,15,2,8),(156,16,2,8),(157,17,2,8),(158,18,2,8),(159,19,2,8),(160,20,2,8),(161,1,2,9),(162,2,2,9),(163,3,2,9),(164,4,2,9),(165,5,2,9),(166,6,2,9),(167,7,2,9),(168,8,2,9),(169,9,2,9),(170,10,2,9),(171,11,2,9),(172,12,2,9),(173,13,2,9),(174,14,2,9),(175,15,2,9),(176,16,2,9),(177,17,2,9),(178,18,2,9),(179,19,2,9),(180,20,2,9),(181,1,2,10),(182,2,2,10),(183,3,2,10),(184,4,2,10),(185,5,2,10),(186,6,2,10),(187,7,2,10),(188,8,2,10),(189,9,0,10),(190,10,0,10),(191,11,2,10),(192,12,2,10),(193,13,2,10),(194,14,2,10),(195,15,2,10),(196,16,0,10),(197,17,2,10),(198,18,2,10),(199,19,2,10),(200,20,2,10),(201,1,2,11),(202,2,2,11),(203,3,2,11),(204,4,2,11),(205,5,2,11),(206,6,2,11),(207,7,2,11),(208,8,2,11),(209,9,2,11),(210,10,2,11),(211,11,2,11),(212,12,2,11),(213,13,2,11),(214,14,2,11),(215,15,2,11),(216,16,2,11),(217,17,2,11),(218,18,2,11),(219,19,2,11),(220,20,2,11),(221,1,2,12),(222,2,2,12),(223,3,2,12),(224,4,2,12),(225,5,2,12),(226,6,2,12),(227,7,2,12),(228,8,2,12),(229,9,2,12),(230,10,2,12),(231,11,2,12),(232,12,2,12),(233,13,2,12),(234,14,2,12),(235,15,2,12),(236,16,2,12),(237,17,2,12),(238,18,2,12),(239,19,2,12),(240,20,2,12),(241,1,2,13),(242,2,2,13),(243,3,2,13),(244,4,2,13),(245,5,2,13),(246,6,2,13),(247,7,2,13),(248,8,2,13),(249,9,2,13),(250,10,2,13),(251,11,2,13),(252,12,2,13),(253,13,2,13),(254,14,2,13),(255,15,2,13),(256,16,2,13),(257,17,2,13),(258,18,2,13),(259,19,2,13),(260,20,2,13),(261,1,2,14),(262,2,2,14),(263,3,2,14),(264,4,2,14),(265,5,2,14),(266,6,2,14),(267,7,2,14),(268,8,2,14),(269,9,2,14),(270,10,2,14),(271,11,2,14),(272,12,2,14),(273,13,2,14),(274,14,2,14),(275,15,2,14),(276,16,2,14),(277,17,2,14),(278,18,2,14),(279,19,2,14),(280,20,2,14),(281,1,2,15),(282,2,2,15),(283,3,2,15),(284,4,2,15),(285,5,2,15),(286,6,2,15),(287,7,2,15),(288,8,2,15),(289,9,2,15),(290,10,2,15),(291,11,2,15),(292,12,2,15),(293,13,2,15),(294,14,2,15),(295,15,2,15),(296,16,2,15),(297,17,2,15),(298,18,2,15),(299,19,2,15),(300,20,2,15),(301,1,2,16),(302,2,2,16),(303,3,2,16),(304,4,2,16),(305,5,2,16),(306,6,2,16),(307,7,2,16),(308,8,2,16),(309,9,2,16),(310,10,2,16),(311,11,2,16),(312,12,2,16),(313,13,2,16),(314,14,2,16),(315,15,2,16),(316,16,2,16),(317,17,2,16),(318,18,2,16),(319,19,2,16),(320,20,2,16),(321,1,2,17),(322,2,2,17),(323,3,2,17),(324,4,2,17),(325,5,2,17),(326,6,2,17),(327,7,2,17),(328,8,2,17),(329,9,2,17),(330,10,2,17),(331,11,2,17),(332,12,2,17),(333,13,2,17),(334,14,2,17),(335,15,2,17),(336,16,2,17),(337,17,2,17),(338,18,2,17),(339,19,2,17),(340,20,2,17),(341,1,2,1),(342,2,2,1),(343,3,2,1),(344,4,2,1),(345,5,2,1),(346,6,2,1),(347,7,2,1),(348,8,2,1),(349,9,2,1),(350,10,2,1),(351,11,2,1),(352,12,2,1),(353,13,2,1),(354,14,2,1),(355,15,2,1),(356,16,2,1),(357,17,2,1),(358,18,2,1),(359,19,2,1),(360,20,2,1),(361,1,2,2),(362,2,2,2),(363,3,2,2),(364,4,2,2),(365,5,2,2),(366,6,2,2),(367,7,2,2),(368,8,2,2),(369,9,2,2),(370,10,2,2),(371,11,2,2),(372,12,2,2),(373,13,2,2),(374,14,2,2),(375,15,2,2),(376,16,2,2),(377,17,2,2),(378,18,2,2),(379,19,2,2),(380,20,2,2),(381,1,2,3),(382,2,2,3),(383,3,2,3),(384,4,2,3),(385,5,2,3),(386,6,2,3),(387,7,2,3),(388,8,2,3),(389,9,2,3),(390,10,2,3),(391,11,2,3),(392,12,2,3),(393,13,2,3),(394,14,2,3),(395,15,2,3),(396,16,2,3),(397,17,2,3),(398,18,2,3),(399,19,2,3),(400,20,2,3),(401,1,2,4),(402,2,2,4),(403,3,2,4),(404,4,2,4),(405,5,2,4),(406,6,2,4),(407,7,2,4),(408,8,2,4),(409,9,2,4),(410,10,2,4),(411,11,2,4),(412,12,2,4),(413,13,2,4),(414,14,2,4),(415,15,2,4),(416,16,2,4),(417,17,2,4),(418,18,2,4),(419,19,2,4),(420,20,2,4),(421,1,2,5),(422,2,2,5),(423,3,2,5),(424,4,2,5),(425,5,2,5),(426,6,2,5),(427,7,2,5),(428,8,2,5),(429,9,2,5),(430,10,2,5),(431,11,2,5),(432,12,2,5),(433,13,2,5),(434,14,2,5),(435,15,2,5),(436,16,2,5),(437,17,2,5),(438,18,2,5),(439,19,2,5),(440,20,2,5),(441,1,2,6),(442,2,2,6),(443,3,2,6),(444,4,2,6),(445,5,2,6),(446,6,2,6),(447,7,2,6),(448,8,2,6),(449,9,2,6),(450,10,2,6),(451,11,2,6),(452,12,2,6),(453,13,2,6),(454,14,2,6),(455,15,2,6),(456,16,2,6),(457,17,2,6),(458,18,2,6),(459,19,2,6),(460,20,2,6),(461,1,2,7),(462,2,2,7),(463,3,2,7),(464,4,2,7),(465,5,2,7),(466,6,2,7),(467,7,2,7),(468,8,2,7),(469,9,2,7),(470,10,2,7),(471,11,2,7),(472,12,2,7),(473,13,2,7),(474,14,2,7),(475,15,2,7),(476,16,2,7),(477,17,2,7),(478,18,2,7),(479,19,2,7),(480,20,2,7),(481,1,2,8),(482,2,2,8),(483,3,2,8),(484,4,2,8),(485,5,2,8),(486,6,2,8),(487,7,2,8),(488,8,2,8),(489,9,2,8),(490,10,2,8),(491,11,2,8),(492,12,2,8),(493,13,2,8),(494,14,2,8),(495,15,2,8),(496,16,2,8),(497,17,2,8),(498,18,2,8),(499,19,2,8),(500,20,2,8),(501,1,2,9),(502,2,2,9),(503,3,2,9),(504,4,2,9),(505,5,2,9),(506,6,2,9),(507,7,2,9),(508,8,2,9),(509,9,2,9),(510,10,2,9),(511,11,2,9),(512,12,2,9),(513,13,2,9),(514,14,2,9),(515,15,2,9),(516,16,2,9),(517,17,2,9),(518,18,2,9),(519,19,2,9),(520,20,2,9),(521,1,2,10),(522,2,2,10),(523,3,2,10),(524,4,2,10),(525,5,2,10),(526,6,2,10),(527,7,2,10),(528,8,2,10),(529,9,2,10),(530,10,2,10),(531,11,2,10),(532,12,2,10),(533,13,2,10),(534,14,2,10),(535,15,2,10),(536,16,2,10),(537,17,2,10),(538,18,2,10),(539,19,2,10),(540,20,2,10),(541,1,2,11),(542,2,2,11),(543,3,2,11),(544,4,2,11),(545,5,2,11),(546,6,2,11),(547,7,2,11),(548,8,2,11),(549,9,2,11),(550,10,2,11),(551,11,2,11),(552,12,2,11),(553,13,2,11),(554,14,2,11),(555,15,2,11),(556,16,2,11),(557,17,2,11),(558,18,2,11),(559,19,2,11),(560,20,2,11),(561,1,2,12),(562,2,2,12),(563,3,2,12),(564,4,2,12),(565,5,2,12),(566,6,2,12),(567,7,2,12),(568,8,2,12),(569,9,2,12),(570,10,2,12),(571,11,2,12),(572,12,2,12),(573,13,2,12),(574,14,2,12),(575,15,2,12),(576,16,2,12),(577,17,2,12),(578,18,2,12),(579,19,2,12),(580,20,2,12),(581,1,2,13),(582,2,2,13),(583,3,2,13),(584,4,2,13),(585,5,2,13),(586,6,2,13),(587,7,2,13),(588,8,2,13),(589,9,2,13),(590,10,2,13),(591,11,2,13),(592,12,2,13),(593,13,2,13),(594,14,2,13),(595,15,2,13),(596,16,2,13),(597,17,2,13),(598,18,2,13),(599,19,2,13),(600,20,2,13),(601,1,2,14),(602,2,2,14),(603,3,2,14),(604,4,2,14),(605,5,2,14),(606,6,2,14),(607,7,2,14),(608,8,2,14),(609,9,2,14),(610,10,2,14),(611,11,2,14),(612,12,2,14),(613,13,2,14),(614,14,2,14),(615,15,2,14),(616,16,2,14),(617,17,2,14),(618,18,2,14),(619,19,2,14),(620,20,2,14),(621,1,2,15),(622,2,2,15),(623,3,2,15),(624,4,2,15),(625,5,2,15),(626,6,2,15),(627,7,2,15),(628,8,2,15),(629,9,2,15),(630,10,2,15),(631,11,2,15),(632,12,2,15),(633,13,2,15),(634,14,2,15),(635,15,2,15),(636,16,2,15),(637,17,2,15),(638,18,2,15),(639,19,2,15),(640,20,2,15),(641,1,2,16),(642,2,2,16),(643,3,2,16),(644,4,2,16),(645,5,2,16),(646,6,2,16),(647,7,2,16),(648,8,2,16),(649,9,2,16),(650,10,2,16),(651,11,2,16),(652,12,2,16),(653,13,2,16),(654,14,2,16),(655,15,2,16),(656,16,2,16),(657,17,2,16),(658,18,2,16),(659,19,2,16),(660,20,2,16),(661,1,2,17),(662,2,2,17),(663,3,2,17),(664,4,2,17),(665,5,2,17),(666,6,2,17),(667,7,2,17),(668,8,2,17),(669,9,2,17),(670,10,2,17),(671,11,2,17),(672,12,2,17),(673,13,2,17),(674,14,2,17),(675,15,2,17),(676,16,2,17),(677,17,2,17),(678,18,2,17),(679,19,2,17),(680,20,2,17);
/*!40000 ALTER TABLE `wagon_seats` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-12 11:49:28
