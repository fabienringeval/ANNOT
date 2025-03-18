import os

from .db.db import mysqlConnector
from .core.message import returnMessage, returnData
from .users import userCreateSql, userUpdateAllAcces, userEncryptPassword


def lockFile():
    fp = open('lock.lock', 'w')
    fp.write('lock')
    fp.close()

def installDb():
    if os.path.isfile('lock.lock'):
        return returnMessage('Error lock file detected', 500)

    tabData = []

    requete = """
        DROP TABLE IF EXISTS `annotations`;"""
    tabData.append(requete)

    requete = """
        CREATE TABLE `annotations` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `type` varchar(255) NOT NULL,
        `status` int(11) NOT NULL DEFAULT 0,
        `audioId` int(11) DEFAULT NULL,
        `userId` int(11) DEFAULT NULL,
        `annotationId` int(11) DEFAULT NULL,
        `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        PRIMARY KEY (`id`),
        KEY `audioId` (`audioId`),
        KEY `userId` (`userId`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
    tabData.append(requete)

    requete = """
        DROP TABLE IF EXISTS `audios`;"""
    tabData.append(requete)

    requete = """
        CREATE TABLE `audios` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `name` varchar(255) NOT NULL,
        `type` varchar(255) DEFAULT NULL,
        `duration` varchar(11) DEFAULT NULL,
        `status` int(11) NOT NULL DEFAULT 0,
        `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `createdBy` int(11) DEFAULT NULL,
        `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `size` int(11) NOT NULL,
        `link` varchar(255) NOT NULL,
        PRIMARY KEY (`id`),
        constraint audios_link_uindex unique (link),
        KEY `createdBy` (`createdBy`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
    tabData.append(requete)

    requete = """
        DROP TABLE IF EXISTS `campaignAudios`;"""
    tabData.append(requete)

    requete = """
        CREATE TABLE `campaignAudios` (
        `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `campaignId` int(11) NOT NULL,
        `audioId` int(11) NOT NULL,
        KEY `campaignId` (`campaignId`),
        KEY `audioId` (`audioId`),
        constraint campaignAudios_campaignId_audioId_uindex  unique (campaignId, audioId)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
    tabData.append(requete)

    requete = """
        DROP TABLE IF EXISTS `campaignAudiosExtras`;"""
    tabData.append(requete)

    requete = """
        CREATE TABLE `campaignAudiosExtras` (
        `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
        `audioId` int(11) NOT NULL,
        `userId` int(11) NOT NULL,
        `comment` varchar(500) DEFAULT '',
        `duration` float DEFAULT 0,
        `createdAt` datetime DEFAULT NULL,
        `updatedAt` datetime DEFAULT NULL,
        PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
    tabData.append(requete)

    requete = """
        DROP TABLE IF EXISTS `campaignEmotions`;"""
    tabData.append(requete)

    requete = """
        CREATE TABLE `campaignEmotions` (
        `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `campaignId` int(11) NOT NULL,
        `EmotionId` int(11) NOT NULL,
        constraint campaignEmotions_campaignId_EmotionId_uindex  unique (campaignId, EmotionId),
        KEY `campaignId` (`campaignId`),
        KEY `EmotionId` (`EmotionId`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
    tabData.append(requete)

    requete = """
        DROP TABLE IF EXISTS `campaignProfiles`;"""
    tabData.append(requete)

    requete = """
        CREATE TABLE `campaignProfiles` (
        `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `campaignId` int(11) NOT NULL,
        `profileId` int(11) NOT NULL,
        constraint campaignProfiles_campaignId_profileId_uindex unique (campaignId, profileId),
        KEY `campaignId` (`campaignId`),
        KEY `profileId` (`profileId`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
    tabData.append(requete)

    requete = """
        DROP TABLE IF EXISTS `campaigns`;"""
    tabData.append(requete)

    requete = """
        CREATE TABLE `campaigns` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `name` varchar(255) NOT NULL,
        `status` int(11) NOT NULL DEFAULT 0,
        `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `createdBy` int(11) DEFAULT NULL,
        `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `companyId` int(11) DEFAULT NULL,
        `emotionalAnalysis` tinyint(1) NOT NULL,
        `emotionalAnalysisTimeIntervalId` int(11) DEFAULT NULL,
        `emotionalAnalysisSliderConfigurationId` int(11) DEFAULT NULL,
        `audioTranscription` tinyint(1) NOT NULL,
        `audioTranscriptionReviewPercentage` int(11) DEFAULT NULL,
        `audioTranscriptionMaxReviewUsers` int(11) DEFAULT NULL,
        `ended` tinyint(1) NOT NULL,
        PRIMARY KEY (`id`),
        constraint campaigns_name_uindex unique (name),
        KEY `createdBy` (`createdBy`),
        KEY `campaigns_companyId_foreign_idx` (`companyId`),
        KEY `campaigns_emotionalAnalysisTimeIntervalId_foreign_idx` (`emotionalAnalysisTimeIntervalId`),
        KEY `campaigns_emotionalAnalysisSliderConfigurationId_foreign_idx` (`emotionalAnalysisSliderConfigurationId`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
    tabData.append(requete)

    requete = """
        DROP TABLE IF EXISTS `campaignUsers`;"""
    tabData.append(requete)

    requete = """
        CREATE TABLE `campaignUsers` (
        `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `campaignId` int(11) NOT NULL,
        `userId` int(11) NOT NULL,
        constraint campaignUsers_campaignId_userId_uindex unique (campaignId, userId),
        KEY `campaignId` (`campaignId`),
        KEY `userId` (`userId`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
    tabData.append(requete)

    requete = """
        DROP TABLE IF EXISTS `companies`;"""
    tabData.append(requete)

    requete = """
        CREATE TABLE `companies` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `name` varchar(255) NOT NULL,
        `description` text NOT NULL,
        `status` int(11) NOT NULL DEFAULT 0,
        `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `createdBy` int(11) NOT NULL,
        `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        PRIMARY KEY (`id`),
        KEY `createdBy` (`createdBy`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
    tabData.append(requete)

    requete = """
        DROP TABLE IF EXISTS `emotionalAnalysisAnnotations`;"""
    tabData.append(requete)

    requete = """
        CREATE TABLE `emotionalAnalysisAnnotations` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `audioId` int(11) DEFAULT NULL,
        `userId` int(11) DEFAULT NULL,
        `value` float NOT NULL,
        `timestamp` int(11) NOT NULL,
        `emotionId` int(11) DEFAULT NULL,
        `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        PRIMARY KEY (`id`),
        KEY `emotionId` (`emotionId`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
    tabData.append(requete)

    requete = """
        DROP TABLE IF EXISTS `emotionalSummaryAnnotations`;"""
    tabData.append(requete)

    requete = """
        CREATE TABLE `emotionalSummaryAnnotations` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `audioId` int(11) NOT NULL,
        `userId` int(11) NOT NULL,
        `emotionId` int(11) NOT NULL,
        `value` float NOT NULL,
        `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
         PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
    tabData.append(requete)

    requete = """
        DROP TABLE IF EXISTS `emotions`;"""
    tabData.append(requete)

    requete = """
        CREATE TABLE `emotions` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `name` varchar(255) NOT NULL,
        `description` text NOT NULL,
        `status` int(11) NOT NULL DEFAULT 0,
        `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `createdBy` int(11) DEFAULT NULL,
        `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        PRIMARY KEY (`id`),
        KEY `createdBy` (`createdBy`),
        constraint emotions_name_uindex unique (name)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
    tabData.append(requete)

    requete = """
        DROP TABLE IF EXISTS `processes`;"""
    tabData.append(requete)

    requete = """
        CREATE TABLE `processes` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `achieved` tinyint(1) NOT NULL,
        `status` int(11) NOT NULL DEFAULT 0,
        `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `campaignId` int(11) NOT NULL,
        `annotatorId` int(11) NOT NULL,
        `audioId` int(11) NOT NULL,
        `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        PRIMARY KEY (`id`),
        KEY `campaignId` (`campaignId`),
        KEY `annotatorId` (`annotatorId`),
        KEY `audioId` (`audioId`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
    tabData.append(requete)

    requete = """
        DROP TABLE IF EXISTS `profileAnnotations`;"""
    tabData.append(requete)

    requete = """
        CREATE TABLE `profileAnnotations` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `userId` int(11) DEFAULT NULL,
        `audioId` int(11) DEFAULT NULL,
        `profileId` int(11) DEFAULT NULL,
        `profileLabelId` int(11) DEFAULT NULL,
        `profileValue` float,
        `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        PRIMARY KEY (`id`),
        KEY `profileId` (`profileId`),
        KEY `profileLabelId` (`profileLabelId`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
    tabData.append(requete)

    requete = """
        DROP TABLE IF EXISTS `profileLabels`;"""
    tabData.append(requete)

    requete = """
        CREATE TABLE `profileLabels` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `label` varchar(255) NOT NULL,
        `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `profileId` int(11) NOT NULL,
        PRIMARY KEY (`id`),
        KEY `profileId` (`profileId`),
        constraint labels_name_uindex unique (label)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
    tabData.append(requete)

    requete = """
        DROP TABLE IF EXISTS `profiles`;"""
    tabData.append(requete)

    requete = """
        CREATE TABLE `profiles` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `name` varchar(255) NOT NULL,
        `description` text NOT NULL,
        `status` int(11) NOT NULL DEFAULT 0,
        `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `createdBy` int(11) DEFAULT NULL,
        `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        PRIMARY KEY (`id`),
        KEY `createdBy` (`createdBy`),
        constraint profiles_name_uindex unique (name)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
    tabData.append(requete)

    requete = """
        DROP TABLE IF EXISTS `roles`;"""
    tabData.append(requete)

    requete = """
        CREATE TABLE `roles` (
        `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
        `name` varchar(15) NOT NULL DEFAULT '',
        PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
    tabData.append(requete)

    requete = """
        DROP TABLE IF EXISTS `SequelizeMeta`;"""
    tabData.append(requete)

    requete = """

        CREATE TABLE `SequelizeMeta` (
        `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
        PRIMARY KEY (`name`),
        UNIQUE KEY `name` (`name`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;"""
    tabData.append(requete)

    requete = """
        DROP TABLE IF EXISTS `sliderConfigurations`;"""
    tabData.append(requete)

    requete = """
        CREATE TABLE `sliderConfigurations` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `name` varchar(255) NOT NULL,
        `minScale` int(11) NOT NULL DEFAULT 0,
        `maxScale` int(11) NOT NULL DEFAULT 100,
        `startValue` float NOT NULL DEFAULT 50,
        `tickInterval` float NOT NULL DEFAULT 1,
        `status` int(11) NOT NULL DEFAULT 0,
        `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `createdBy` int(11) DEFAULT NULL,
        `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        PRIMARY KEY (`id`),
        KEY `createdBy` (`createdBy`),
        constraint sliderConfigurations_name_uindex unique (name)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
    tabData.append(requete)

    requete = """
        DROP TABLE IF EXISTS `timeIntervals`;"""
    tabData.append(requete)

    requete = """
        CREATE TABLE `timeIntervals` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `label` varchar(255) NOT NULL,
        `value` int(11) NOT NULL DEFAULT 100,
        `status` int(11) NOT NULL DEFAULT 0,
        `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `createdBy` int(11) DEFAULT NULL,
        `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        PRIMARY KEY (`id`),
        KEY `createdBy` (`createdBy`),
        constraint timeIntervals_label_uindex unique (label)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
    tabData.append(requete)

    requete = """
        DROP TABLE IF EXISTS `users`;"""
    tabData.append(requete)

    requete = """
        CREATE TABLE `users` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `firstName` varchar(255) NOT NULL,
        `lastName` varchar(255) NOT NULL,
        `email` varchar(255) NOT NULL,
        `password` varchar(150) DEFAULT NULL,
        `status` int(11) NOT NULL DEFAULT 0,
        `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `createdBy` int(11) DEFAULT NULL,
        `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
        `companyId` int(11) DEFAULT NULL,
        PRIMARY KEY (`id`),
        KEY `createdBy` (`createdBy`),
        KEY `users_companyId_foreign_idx` (`companyId`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
    tabData.append(requete)

    requete = """
        DROP TABLE IF EXISTS `usersRoles`;"""
    tabData.append(requete)

    requete = """
        DROP TABLE IF EXISTS `usersRoles`;
        CREATE TABLE `usersRoles` (
        `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
        `usersId` int(11) NOT NULL,
        `roleId` int(11) NOT NULL,
        `createdAt` datetime NOT NULL DEFAULT current_timestamp(3),
        `createdBy` int(11) NOT NULL DEFAULT 0,
        PRIMARY KEY (`id`),
        KEY `usersKey` (`usersId`),
        KEY `roleKey` (`roleId`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
    tabData.append(requete)

    requete = """
        DROP TABLE IF EXISTS `usersTokens`;"""
    tabData.append(requete)

    requete = """
        CREATE TABLE `usersTokens` (
        `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
        `usersId` int(11) NOT NULL,
        `refreshToken` varchar(500) NOT NULL DEFAULT '',
        `createdAt` datetime NOT NULL DEFAULT current_timestamp(3),
        `revoqued` int(1) NOT NULL DEFAULT 0,
        PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;"""
    tabData.append(requete)

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor()

    try:
        for item in tabData:
            rep = cursor.execute(item, multi=True)
            rep.send(None)
        baseDeDonnees.commit()

    except TypeError as e:
        return returnMessage(e, 500)

    requete = """
        INSERT INTO roles 
        (`id`, `name`)
        VALUES
            (1,'ROLE_AGENT'),
            (2,'ROLE_MANAGER'),
            (3,'ROLE_ADMIN')"""
    rep = cursor.execute(requete)
    baseDeDonnees.commit()
    cursor.close()
    baseDeDonnees.close()

    data = {
        'firstName': "admin",
        'lastName': "admin",
        'email': "admin@internal.local",
        'password': userEncryptPassword("admin")
    }
    createUser = userCreateSql(data, True)
    if createUser:
        print(createUser)
        userUpdateAllAcces(createUser)
        lockFile()

        return returnData(data, 200)
    else:
        return returnMessage('Error', 500)
