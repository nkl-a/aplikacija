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
CREATE DATABASE IF NOT EXISTS `aplikacija` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `aplikacija`;

-- Dumping structure for table aplikacija.game
CREATE TABLE IF NOT EXISTS `game` (
  `game_id` int unsigned NOT NULL AUTO_INCREMENT,
  `game_players_id` int unsigned NOT NULL DEFAULT '0',
  `game_type_id` int unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `word_id` int unsigned NOT NULL,
  PRIMARY KEY (`game_id`),
  KEY `fk_game_players_id` (`game_players_id`) USING BTREE,
  KEY `fk_game_game_type_id` (`game_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- Dumping data for table aplikacija.game: ~2 rows (approximately)
DELETE FROM `game`;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` (`game_id`, `game_players_id`, `game_type_id`, `created_at`, `word_id`) VALUES
	(1, 1, 2, '2021-08-29 11:12:59', 0),
	(2, 1, 1, '2021-08-29 12:39:34', 0);
/*!40000 ALTER TABLE `game` ENABLE KEYS */;

-- Dumping structure for table aplikacija.game_player
CREATE TABLE IF NOT EXISTS `game_player` (
  `game_player_id` int unsigned NOT NULL AUTO_INCREMENT,
  `player_id` int unsigned NOT NULL DEFAULT '0',
  `game_id` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`game_player_id`),
  KEY `fk_game_player_player_id` (`player_id`),
  KEY `fk_game_player_game_id` (`game_id`),
  CONSTRAINT `fk_game_player_game_id` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_game_player_player_id` FOREIGN KEY (`player_id`) REFERENCES `player` (`player_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- Dumping data for table aplikacija.game_player: ~2 rows (approximately)
DELETE FROM `game_player`;
/*!40000 ALTER TABLE `game_player` DISABLE KEYS */;
INSERT INTO `game_player` (`game_player_id`, `player_id`, `game_id`) VALUES
	(1, 1, 1),
	(2, 2, 1);
/*!40000 ALTER TABLE `game_player` ENABLE KEYS */;

-- Dumping structure for table aplikacija.game_type
CREATE TABLE IF NOT EXISTS `game_type` (
  `game_type_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`game_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- Dumping data for table aplikacija.game_type: ~2 rows (approximately)
DELETE FROM `game_type`;
/*!40000 ALTER TABLE `game_type` DISABLE KEYS */;
INSERT INTO `game_type` (`game_type_id`, `name`) VALUES
	(1, 'private'),
	(2, 'public');
/*!40000 ALTER TABLE `game_type` ENABLE KEYS */;

-- Dumping structure for table aplikacija.latters
CREATE TABLE IF NOT EXISTS `latters` (
  `latter_id` int unsigned NOT NULL AUTO_INCREMENT,
  `latter` varchar(2) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `word_id` int unsigned NOT NULL DEFAULT '0',
  `hit` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`latter_id`),
  KEY `fk_latters_word_id` (`word_id`),
  CONSTRAINT `fk_latters_word_id` FOREIGN KEY (`word_id`) REFERENCES `word` (`word_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- Dumping data for table aplikacija.latters: ~2 rows (approximately)
DELETE FROM `latters`;
/*!40000 ALTER TABLE `latters` DISABLE KEYS */;
INSERT INTO `latters` (`latter_id`, `latter`, `word_id`, `hit`) VALUES
	(1, 's', 2, 0),
	(2, 't', 2, 0),
	(4, 'o', 2, 1);
/*!40000 ALTER TABLE `latters` ENABLE KEYS */;

-- Dumping structure for table aplikacija.player
CREATE TABLE IF NOT EXISTS `player` (
  `player_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `password_hash` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`player_id`),
  UNIQUE KEY `uq_player_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- Dumping data for table aplikacija.player: ~4 rows (approximately)
DELETE FROM `player`;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` (`player_id`, `username`, `password_hash`) VALUES
	(1, 'test', '123'),
	(2, 'pero', '123'),
	(3, 'pera', '7578B7AA0B7ED99396145F9A7B4048C177EBE356C90890817178D3A9B9DFBAE0E8EFDFF45D34516BC40C7E9054D8CCEB6860BD92EF378871C3D2150987D8DEF0'),
	(7, 'pera1', '6ECAF7CC1469AF498432C5013B513BC8FAEB9C9459EAD9E5E672AE511A2966D39C9907E43F1E3CA03CBA983C2EDA6F206DFAAEB75AD999C86E7527E6844B7F3C');
/*!40000 ALTER TABLE `player` ENABLE KEYS */;

-- Dumping structure for table aplikacija.word
CREATE TABLE IF NOT EXISTS `word` (
  `word_id` int unsigned NOT NULL AUTO_INCREMENT,
  `game_id` int unsigned NOT NULL DEFAULT '0',
  `word` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`word_id`),
  KEY `fk_words_game_id` (`game_id`),
  CONSTRAINT `fk_words_game_id` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- Dumping data for table aplikacija.word: ~0 rows (approximately)
DELETE FROM `word`;
/*!40000 ALTER TABLE `word` DISABLE KEYS */;
INSERT INTO `word` (`word_id`, `game_id`, `word`) VALUES
	(2, 1, 'sto');
/*!40000 ALTER TABLE `word` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
