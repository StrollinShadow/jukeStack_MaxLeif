---------------------------------------------------------------------------------------------------/*
Setup_JukeStackDB_MaxLeif.sql

This script completely sets up the CD database including all tables, 
attributes and indexes. It can be used for an automatic deployment.
 
Author: Max Foll / Leif Fieger , Kantonsschule Frauenfeld
 Date: 11.01.2023
 
 History:
 Version  Date	     Who 	 Changes
 1.1 	 12.01.2023	 Max      Autoinkrement auf 1000 und TNFTSongs
 1.0	 11.01.2023  Max/Leif  created

 
  Copyright © 2023 Kantonsschule Frauenfeld, Frauenfeld, Switzerland. All rights reserved.
------------------------------------------------------------------------------------------------*/


-- -----------------------------------------------------
-- Table TUsers
-- -----------------------------------------------------
DROP TABLE IF EXISTS TUsers ;

CREATE TABLE TUsers (
  UserId INT NOT NULL AUTO_INCREMENT,
  UserEmail VARCHAR(45) NOT NULL,
  UserPassword VARCHAR(45) NOT NULL,
  UserAdmin boolean NOT NULL default false,
  PRIMARY KEY (UserId))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table TNFTSongs
-- -----------------------------------------------------
DROP TABLE IF EXISTS TNFTSongs ;

CREATE TABLE TNFTSongs (
  NFTId INT NOT NULL AUTO_INCREMENT,
  NFTName VARCHAR(45) NOT NULL,
  NFTDuration TIME NOT NULL,
  TNFTRealease YEAR NOT NULL,
  NFTArtist VARCHAR(45) NOT NULL,
  PRIMARY KEY (NFTId))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table TAusleihen
-- -----------------------------------------------------
DROP TABLE IF EXISTS TAusleihen ;

CREATE TABLE  TAusleihen (
  UserId INT NOT NULL,
  AusDate TIMESTAMP NOT NULL,
  NFTId INT NOT NULL,
  PRIMARY KEY (UserId, NFTId))
ENGINE = InnoDB;

alter table TNFTSongs auto_increment=1000;
alter table TUsers auto_increment=1000;



INSERT INTO TNFTSongs (NFTName, NFTDuration, TNFTRealease, NFTArtist) VALUES ('Thriller', '00:05:57', 1982, 'Michael Jackson');
INSERT INTO TNFTSongs (NFTName, NFTDuration, TNFTRealease, NFTArtist) VALUES ('Bad', '00:04:07', 1987, 'Michael Jackson');
INSERT INTO TNFTSongs (NFTName, NFTDuration, TNFTRealease, NFTArtist) VALUES ('Smooth', '00:04:58', 1999, 'Santana ft. Rob Thomas');
INSERT INTO TNFTSongs (NFTName, NFTDuration, TNFTRealease, NFTArtist) VALUES ('Black or White', '00:04:16', 1991, 'Michael Jackson');
INSERT INTO TNFTSongs (NFTName, NFTDuration, TNFTRealease, NFTArtist) VALUES ('I Want it That Way', '00:03:33', 1999, 'Backstreet Boys');
INSERT INTO TNFTSongs (NFTName, NFTDuration, TNFTRealease, NFTArtist) VALUES ('Say You, Say Me', '00:04:01', 1985, 'Lionel Richie');
INSERT INTO TNFTSongs (NFTName, NFTDuration, TNFTRealease, NFTArtist) VALUES ('Every Breath You Take', '00:03:50', 1983, 'The Police');
INSERT INTO TNFTSongs (NFTName, NFTDuration, TNFTRealease, NFTArtist) VALUES ('Billie Jean', '00:04:54', 1982, 'Michael Jackson');
INSERT INTO TNFTSongs (NFTName, NFTDuration, TNFTRealease, NFTArtist) VALUES ('I Will Always Love You', '00:03:14', 1992, 'Whitney Houston');
INSERT INTO TNFTSongs (NFTName, NFTDuration, TNFTRealease, NFTArtist) VALUES ('Sweet Child o Mine', '00:05:56', 1987, 'Guns N Roses');



