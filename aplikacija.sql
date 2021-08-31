-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               8.0.26 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for aplikacija
DROP DATABASE IF EXISTS `aplikacija`;
CREATE DATABASE IF NOT EXISTS `aplikacija` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `aplikacija`;

-- Dumping structure for table aplikacija.game
DROP TABLE IF EXISTS `game`;
CREATE TABLE IF NOT EXISTS `game` (
  `game_id` int unsigned NOT NULL AUTO_INCREMENT,
  `game_players_id` int unsigned NOT NULL DEFAULT '0',
  `game_type_id` int unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`game_id`),
  KEY `fk_game_players_id` (`game_players_id`) USING BTREE,
  KEY `fk_game_game_type_id` (`game_type_id`),
  CONSTRAINT `fk_game_game_type_id` FOREIGN KEY (`game_type_id`) REFERENCES `game_type` (`game_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- Dumping data for table aplikacija.game: ~0 rows (approximately)
DELETE FROM `game`;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
/*!40000 ALTER TABLE `game` ENABLE KEYS */;

-- Dumping structure for table aplikacija.game_player
DROP TABLE IF EXISTS `game_player`;
CREATE TABLE IF NOT EXISTS `game_player` (
  `game_player_id` int unsigned NOT NULL AUTO_INCREMENT,
  `player_id` int unsigned NOT NULL DEFAULT '0',
  `game_id` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`game_player_id`),
  KEY `fk_game_player_player_id` (`player_id`),
  KEY `fk_game_player_game_id` (`game_id`),
  CONSTRAINT `fk_game_player_game_id` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_game_player_player_id` FOREIGN KEY (`player_id`) REFERENCES `player` (`player_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- Dumping data for table aplikacija.game_player: ~0 rows (approximately)
DELETE FROM `game_player`;
/*!40000 ALTER TABLE `game_player` DISABLE KEYS */;
/*!40000 ALTER TABLE `game_player` ENABLE KEYS */;

-- Dumping structure for table aplikacija.game_type
DROP TABLE IF EXISTS `game_type`;
CREATE TABLE IF NOT EXISTS `game_type` (
  `game_type_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`game_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- Dumping data for table aplikacija.game_type: ~0 rows (approximately)
DELETE FROM `game_type`;
/*!40000 ALTER TABLE `game_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `game_type` ENABLE KEYS */;

-- Dumping structure for table aplikacija.latters
DROP TABLE IF EXISTS `latters`;
CREATE TABLE IF NOT EXISTS `latters` (
  `latter_id` int unsigned NOT NULL AUTO_INCREMENT,
  `latter` varchar(2) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `word_id` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`latter_id`),
  KEY `fk_latters_word_id` (`word_id`),
  CONSTRAINT `fk_latters_word_id` FOREIGN KEY (`word_id`) REFERENCES `words` (`word_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- Dumping data for table aplikacija.latters: ~0 rows (approximately)
DELETE FROM `latters`;
/*!40000 ALTER TABLE `latters` DISABLE KEYS */;
/*!40000 ALTER TABLE `latters` ENABLE KEYS */;

-- Dumping structure for table aplikacija.player
DROP TABLE IF EXISTS `player`;
CREATE TABLE IF NOT EXISTS `player` (
  `player_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `password_hash` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`player_id`),
  UNIQUE KEY `uq_player_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- Dumping data for table aplikacija.player: ~0 rows (approximately)
DELETE FROM `player`;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
/*!40000 ALTER TABLE `player` ENABLE KEYS */;

-- Dumping structure for table aplikacija.words
DROP TABLE IF EXISTS `words`;
CREATE TABLE IF NOT EXISTS `words` (
  `word_id` int unsigned NOT NULL AUTO_INCREMENT,
  `game_id` int unsigned NOT NULL DEFAULT '0',
  `word` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`word_id`),
  KEY `fk_words_game_id` (`game_id`),
  CONSTRAINT `fk_words_game_id` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- Dumping data for table aplikacija.words: ~0 rows (approximately)
DELETE FROM `words`;
/*!40000 ALTER TABLE `words` DISABLE KEYS */;
/*!40000 ALTER TABLE `words` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
