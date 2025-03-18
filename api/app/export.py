from flask_jsonpify import jsonify
from datetime import datetime, timedelta
from flask_jwt_extended import (
    get_jwt_identity
)
from flask import request
import bcrypt
from math import *
import json
import time
import os
import sys
import numbers


import mysql.connector
from .db.db import mysqlConnector
from .core.message import returnMessage, returnData
from .emotions import getSummarieValues
from .profiles import getLabelValues


def add_if_key_not_exist(dict_obj, keyLabel, valueLabel, key, value):
    isToAdd = True
    if len(dict_obj) == 0:
        isToAdd = True
    else :
        for item in dict_obj :
            if item[keyLabel] == key :
                item[valueLabel] = value
                isToAdd = False
                break

    if isToAdd :
        dict_obj.append({keyLabel: key, valueLabel: value})

    return dict_obj

def selectUniqueCampaign( id ) :
    requete = """
        SELECT
            campaigns.id, 
            campaigns.name,
            timeIntervals.label as timeInterval,
            timeIntervals.value as timeIntervalValue,
            sliderConfigurations.minScale as sliderMinScale,
            sliderConfigurations.maxScale as sliderMaxScale,
            sliderConfigurations.tickInterval as sliderTickInterval,
            sliderConfigurations.startValue as sliderTickstartValue,
            users.firstname as creatorFirstName,
            users.lastname as creatorLastName,
            users.email as creatorEmail,
            users.id as creatorId
        FROM  
            campaigns,
            timeIntervals,
            sliderConfigurations,
            users
        WHERE
            campaigns.emotionalAnalysisTimeIntervalId = timeIntervals.id
        AND
            campaigns.emotionalAnalysisSliderConfigurationId = sliderConfigurations.id
        AND 
            campaigns.createdBy = users.id
        AND
            campaigns.id = %s
    """
    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try :
        dataRequete = (id,)
        cursor.execute(requete, dataRequete)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
    except mysql.connector.Error as err:
        print("Something went wrong: {}".format(err))
    return data

def campaignEmotion(campaignId):
    requete = """
        SELECT 
            emotions.id as id,
            emotions.name as name,
            emotions.description as description
        FROM
        campaignEmotions,
        emotions
        WHERE
            campaignEmotions.EmotionId = emotions.id
        AND
            campaignEmotions.campaignId = %s
    """
    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    param = (campaignId,)
    try :
        cursor.execute(requete, param)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
    except mysql.connector.Error as err:
        print("Something went wrong: {}".format(err))

    return data

def campaignAudio( campaignId ):
    requete = """
    SELECT 
        audios.name as name,
        audios.id as id,
        audios.type as type,
        audios.size as size,
        audios.duration as duration,
        SUBSTRING_INDEX(link,'/',  -2) as link
    FROM
        campaignAudios,
        audios
    WHERE
        campaignAudios.audioId = audios.id
    AND
        campaignAudios.campaignId = %s
    """
    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    param = (campaignId,)
    try :
        cursor.execute(requete, param)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
    except mysql.connector.Error as err:
        print("Something went wrong: {}".format(err))

    return data

def campaignUser( campaignId, creator ):
    requete = """
        SELECT 
            users.id,
            users.firstName,
            users.lastName,
            users.email	
        FROM
        campaignUsers,
        users
        WHERE
            campaignUsers.userId = users.id
        AND
            campaignUsers.campaignId = %s
    """
    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    param = (campaignId,)
    try :
        cursor.execute(requete, param)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
    except mysql.connector.Error as err:
        print("Something went wrong: {}".format(err))

    data.append(creator)
    return data

def campaignProfilExec( campaignId ):
    requete = """
        SELECT 
            profiles.id as id,
            profiles.name as name,
            profiles.description as description
        FROM
            campaignProfiles,
            profiles
        WHERE
            campaignProfiles.profileId = profiles.id
        AND
            campaignProfiles.campaignId = %s
    """
    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    param = (campaignId,)
    try :
        cursor.execute(requete, param)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
    except mysql.connector.Error as err:
        print("Something went wrong: {}".format(err))

    return data

def profilesLabel( profileId ):
    requete = """
        SELECT 
            profileLabels.id as id,
            profileLabels.label as name
        FROM
            profileLabels
        WHERE
            profileId = %s
    """
    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    param = (profileId,)
    try :
        cursor.execute(requete, param)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
    except mysql.connector.Error as err:
        print("Something went wrong: {}".format(err))

    return data

def campaignProfiles( campaignId ) :
    profilesList = campaignProfilExec(campaignId)

    for profiles in profilesList:
        labelList = profilesLabel(profiles['id'])
        profiles['label'] = labelList
    return profilesList

def construireProfileAudio ( dataProfileAudio ):
    listeUsersProfiles = []
    tmpListUser = []
    for profiliUniq in dataProfileAudio :
        if profiliUniq['userId'] not in tmpListUser :
            tmpListUser.append(profiliUniq['userId'])

    for userId in tmpListUser :
        jsonDataProfil = { 'user' : userId }
        recapProfil = []
        for profile in dataProfileAudio :
            if profile['userId'] == userId :
                recapProfil = add_if_key_not_exist(recapProfil, 'profile', 'profileLabel', profile['profile'], profile['profileLabel'])
        jsonDataProfil['value'] = recapProfil
        listeUsersProfiles.append(jsonDataProfil)

    return listeUsersProfiles

def profileAudio( audioId ):
    requete = """
    SELECT 
        annotations.id as id,
        users.id as userId,
        profiles.name as profile,
        profileLabels.label as profileLabel
    FROM
        annotations,
        profileAnnotations,
        profiles,
        profileLabels,
        users
    WHERE 
        type = 'profile'
    AND
        annotations.annotationId = profileAnnotations.id
    AND
        profileAnnotations.profileId = profiles.id
    AND 
        profileLabels.id = profileAnnotations.profileLabelId
    AND
        users.id = annotations.userId
    AND
        annotations.audioId=%s
    ORDER BY profileAnnotations.createdAt ASC
    """
    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    param = (audioId, )
    try :
        cursor.execute(requete, param)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
    except mysql.connector.Error as err:
        print("Something went wrong: {}".format(err))

    return construireProfileAudio( data )

def construireEmotionAudio( dataListEmotionTs, startValue ):

    listeUsers = []
    tmpListUser = []
    tmpListEmotion = []

    for emotionUid in dataListEmotionTs :
        if emotionUid['userId'] not in tmpListUser :
            tmpListUser.append(emotionUid['userId'])
        if emotionUid['tsEmotionId'] not in tmpListEmotion :
            tmpListEmotion.append(emotionUid['tsEmotionId'] )

    for userId in tmpListUser :
        jsonDataUserData = { 'user' : userId }
        arrayByUser = [d for d in dataListEmotionTs if d['userId'] == userId]
        tmpArrayListEmotion = []

        for emotion in tmpListEmotion :
            arrayByEmotion = [d for d in arrayByUser if d['tsEmotionId'] == emotion]
            jsonEmotionBase = {
                'id': emotion,
                'summaryValues': getSummarieValues(emotion, userId),
                'name': arrayByEmotion[0]['tsEmotionName']
            }
            tmpTimeSeries = []
            tmpTimeSeries.append(
                {
                    'value': startValue,
                    'time': 0
                }
            )

            for timeSerie in arrayByEmotion :
                tmpTimeSeries = add_if_key_not_exist(tmpTimeSeries, 'time',  'value' , timeSerie['tsTime'], timeSerie['tsValue'])

            jsonEmotionBase['timeseries'] = tmpTimeSeries
            tmpArrayListEmotion.append(jsonEmotionBase)
        jsonDataUserData['emotion'] = tmpArrayListEmotion
        listeUsers.append(jsonDataUserData)

    return listeUsers


def timeserieAudio ( audioId, startValue ):
    requete = """
        SELECT 
            annotations.audioId as audioId,
            annotations.userId as userId,
            emotionalAnalysisAnnotations.id as tsId,
            emotionalAnalysisAnnotations.value as tsValue,
            emotionalAnalysisAnnotations.timestamp as tsTime,
            emotionalAnalysisAnnotations.emotionId as tsEmotionId,
            emotions.name as tsEmotionName
        FROM
            annotations,
            emotionalAnalysisAnnotations,
            emotions
        WHERE 
            type = 'emotion'
        AND
            emotionalAnalysisAnnotations.id = annotations.annotationId
        AND
            emotionalAnalysisAnnotations.emotionId = emotions.id
        AND 
            annotations.audioId = %s
        ORDER BY 
        	emotionalAnalysisAnnotations.id  ASC,
            emotionalAnalysisAnnotations.timestamp  ASC
    """
    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    param = (audioId, )
    try :
        cursor.execute(requete, param)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
    except mysql.connector.Error as err:
        print("Something went wrong: {}".format(err))

    return construireEmotionAudio( data, startValue )

def extraSortieComments(data, dataUidAudio):
    addUser = True
    for item in dataUidAudio :
        if item['user'] == data['userId']:
            item['comment'] = data['comment']
            item['duration'] = item['duration']  + data['duration']
            addUser = False
            break

    if addUser :
        jsonExtra = {
            'user' : data['userId'],
            'comment': data['comment'],
            'duration': data['duration']
        }
        dataUidAudio.append(jsonExtra)

    return dataUidAudio


def construireMetaAudio( dataMetaExtra ):
    dataUidAudio = []
    for metaArray in dataMetaExtra :
        dataUidAudio = extraSortieComments(metaArray, dataUidAudio)

    return dataUidAudio

def metaAudios(audioId):
    requete = """
        SELECT 
            comment,
            duration,
            userId
        FROM
            campaignAudiosExtras
        WHERE 
            audioId = %s
        ORDER BY 
            audioId  ASC
    """
    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    param = (audioId, )
    try :
        cursor.execute(requete, param)
        dataMeta = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
    except mysql.connector.Error as err:
        print("Something went wrong: {}".format(err))

    return construireMetaAudio( dataMeta )

def campaignAnnotation( arrayAudioList, startValue ):
    resultAudioAnnot = []
    for audioDataItem in arrayAudioList :
        jsonDataAnnotation = {}
        jsonDataAnnotation['audio'] = audioDataItem['link']
        jsonDataAnnotation['duration'] = audioDataItem['duration']
       # jsonDataAnnotation['labels'] = profileAudio( audioDataItem['id'] )
        jsonDataAnnotation['labels'] = getLabelValues(audioDataItem['id'])
        jsonDataAnnotation['timeseries'] = timeserieAudio( audioDataItem['id'], startValue )
        jsonDataAnnotation['duration_comment'] = metaAudios( audioDataItem['id'] )

        resultAudioAnnot.append(jsonDataAnnotation)
    return resultAudioAnnot


def campaignsExport( id ):
    campaingTab = selectUniqueCampaign(id)
    print( campaingTab )
    campaing = campaingTab[0]
    jsonData = {}
    jsonData['name'] = campaing['name']
    jsonData['CampaignId'] = campaing['id']
    if campaing['timeInterval'] and campaing['sliderMinScale'] :
        jsonData['slider'] = {
            'timeInterval' : campaing['timeInterval'],
            'timeIntervalValue' : campaing['timeIntervalValue'],
            'minScale' : campaing['sliderMinScale'],
            'maxScale' : campaing['sliderMaxScale'],
            'tickInterval' : campaing['sliderTickInterval'],
            'startValue': campaing['sliderTickstartValue']
        }
    jsonData['creator'] = {
        'id': campaing['creatorId'],
        'firstname': campaing['creatorFirstName'],
        'lastname':campaing['creatorLastName'],
        'email':campaing['creatorEmail'],
    }

    jsonData['emotions'] =  campaignEmotion( campaing['id'] )
    audioList = campaignAudio( campaing['id'] )
    jsonData['audios'] = audioList
    jsonData['users'] =  campaignUser( campaing['id'],jsonData['creator'] )
    jsonData['profiles'] = campaignProfiles( campaing['id'] )
    jsonData['annotation'] = campaignAnnotation( audioList, campaing['sliderTickstartValue'] )

    return returnData(jsonData, 200)