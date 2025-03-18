from datetime import datetime, timedelta
import os
from flask_jwt_extended import (
    get_jwt_identity
)
from flask import request, make_response, send_file
from math import *

import mysql.connector
from .db.db import mysqlConnector
from .core.message import returnMessage, returnData
from .users import usersSearchByEmail


def audiosProfilesInsert(userId, audioId, labelId, profileId, profileValue):
    requete = """
    INSERT INTO 
        profileAnnotations
    (
        userId,
        audioId,
        profileId,
        profileLabelId,
        profileValue
    ) VALUES (
        %s,
        %s,
        %s,
        %s,
        %s
    )
    """
    dataRequete = (userId, audioId, profileId, labelId, profileValue)

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.execute(requete, dataRequete)
        baseDeDonnees.commit()
        insertId = cursor.lastrowid
        cursor.close()
        baseDeDonnees.close()
        return insertId
    except TypeError as e:
        return returnMessage("Bad Request", 400)


def audiosProfilesMAsterInsert(audioId, userId, annotationId):
    requete = """
    INSERT INTO 
        annotations
    (
        type,
        audioId,
        userId,
        annotationId
    ) VALUES (
        'profile',
        %s,
        %s,
        %s
    )
    """
    dataRequete = (audioId, userId, annotationId)

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.execute(requete, dataRequete)
        baseDeDonnees.commit()
        insertId = cursor.lastrowid
        cursor.close()
        baseDeDonnees.close()
        return insertId
    except TypeError as e:
        return returnMessage("Bad Request", 400)


def audiosProfiles(id):
    currentUser = get_jwt_identity()
    try:
        user = usersSearchByEmail(currentUser)
        userId = user[0]['id']
    except TypeError as e:
        return returnMessage("Bad Request " + str(e), 500)
    request_data = request.get_json()

    for item in request_data:
        print(item)
        lastInsert = audiosProfilesInsert(userId, id, item['labelId'], item['profileId'], item['value'])
        audiosProfilesMAsterInsert(id, userId, lastInsert)

    return returnMessage('Insertion OK', 200)


def audiosEmotionsMasterInsert(audioId, userId, annotationId, baseDeDonnees):
    requete = """
    INSERT INTO 
        annotations
    (
        type,
        audioId,
        userId,
        annotationId
    ) VALUES (
        'emotion',
        %s,
        %s,
        %s
    )
    """
    dataRequete = (audioId, userId, annotationId)

    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.execute(requete, dataRequete)
        baseDeDonnees.commit()
        insertId = cursor.lastrowid
        cursor.close()
        return insertId
    except TypeError as e:
        return returnMessage("Bad Request", 400)


def audiosEmotionsInsert(timestamp, value, audioId, emotionId, userId, baseDeDonnees):
    requete = """
    INSERT INTO 
        emotionalAnalysisAnnotations
    (
        audioId,
        userId,
        value,
        timestamp,
        emotionId
    ) VALUES(
        %s,
        %s,
        %s,
        %s,
        %s
    )
    """
    dataRequete = (audioId, userId, value, timestamp, emotionId)
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.execute(requete, dataRequete)
        baseDeDonnees.commit()
        insertId = cursor.lastrowid
        cursor.close()
        return insertId
    except TypeError as e:
        return returnMessage("Bad Request", 400)


def audiosEmotions(id, emoid):
    currentUser = get_jwt_identity()
    try:
        user = usersSearchByEmail(currentUser)
        userId = user[0]['id']
    except TypeError as e:
        return returnMessage("Bad Request " + str(e), 500)

    request_data = request.get_json()
    print('request: ', request_data)
    baseDeDonnees = mysqlConnector()
    for item in request_data:
        lastInsert = audiosEmotionsInsert(item['timestamp'], item['value'], id, emoid, userId, baseDeDonnees)
        audiosEmotionsMasterInsert(id, userId, lastInsert, baseDeDonnees)
    baseDeDonnees.close()

    return returnMessage('Insertion ok', 200)


def audiosSummaryInsert(value, audioId, emotionId, userId, baseDeDonnees):
    print('value', value)
    print('audioId', audioId)
   # print('EmoId', emotionId)
    print('userId', userId)

    requete = """
    INSERT INTO 
        emotionalSummaryAnnotations
    (
        audioId,
        userId,
        emotionId,
        value
    ) VALUES(
        %s,
        %s,
        %s,
        %s
    )
    """
    dataRequete = (audioId, userId, emotionId, value)
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.execute(requete, dataRequete)
        baseDeDonnees.commit()
        insertId = cursor.lastrowid
        cursor.close()
        return insertId
    except TypeError as e:
        return returnMessage("Bad Request", 400)


def audiosSummaryMasterInsert(audioId, userId, annotationId, baseDeDonnees):
    requete = """
    INSERT INTO 
        annotations
    (
        type,
        audioId,
        userId,
        annotationId
    ) VALUES (
        'summary',
        %s,
        %s,
        %s
    )
    """
    dataRequete = (audioId, userId, annotationId)

    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.execute(requete, dataRequete)
        baseDeDonnees.commit()
        insertId = cursor.lastrowid
        cursor.close()
        return insertId
    except TypeError as e:
        return returnMessage("Bad Request", 400)


def audiosSummary(id, emoid):
    currentUser = get_jwt_identity()
    try:
        user = usersSearchByEmail(currentUser)
        userId = user[0]['id']
    except TypeError as e:
        return returnMessage("Bad Request " + str(e), 500)

    emotionValue = request.get_json()
    print(emotionValue)
    baseDeDonnees = mysqlConnector()

    lastInsert = audiosSummaryInsert(emotionValue, id, emoid, userId, baseDeDonnees)
    audiosSummaryMasterInsert(id, userId, lastInsert, baseDeDonnees)

    baseDeDonnees.close()

    return returnMessage('Insertion ok', 200)


def audiosCommentsInsert(id, userId, comments, duration):
    requete = """
    INSERT INTO 
        campaignAudiosExtras
    (
        audioId,
        userId,
        comment,
        duration,
        createdAt,
        updatedAt
    ) VALUES (
        %s,
        %s,
        %s,
        %s,
        NOW(),
        NOW()
    )
    """
    dataRequete = (id, userId, comments, duration)

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.execute(requete, dataRequete)
        baseDeDonnees.commit()
        cursor.close()
        baseDeDonnees.close()
        return True
    except TypeError as e:
        return returnMessage("Bad Request", 400)


def audiosComments(id):
    currentUser = get_jwt_identity()
    try:
        user = usersSearchByEmail(currentUser)
        userId = user[0]['id']
    except TypeError as e:
        return returnMessage("Bad Request " + str(e), 500)
    request_data = request.get_json()

    comment = None
    duration = None

    if request_data:
        if 'comment' in request_data:
            comment = request_data['comment']
        else:
            return returnMessage("Bad Request - no comment send", 401)

        if 'duration' in request_data:
            duration = request_data['duration']
        else:
            return returnMessage("Bad Request - no duration send", 401)

        if audiosCommentsInsert(id, userId, comment, duration):
            return returnMessage('Insertion OK', 200)
        else:
            return returnMessage("Bad Request", 500)
    else:
        return returnMessage("Bad Request", 500)

def audiosServe(audioId):
    request = """
        SELECT
            link
        FROM
            audios
        WHERE
            id = %s
    """
    dataRequest = (audioId,)
    database = mysqlConnector()
    cursor = database.cursor(dictionary=True, buffered=True)
    try :
        cursor.execute(request, dataRequest)
        data = cursor.fetchall()
        cursor.close()
        database.close()
        audioPath = os.path.join(os.environ['VIDEOS_BASE_PATH'], data[0]['link'])
        print(audioPath)
        resp = make_response(send_file(audioPath))
        resp.headers['Content-Disposition'] = 'inline'
        return resp

    except TypeError as e:
        return returnMessage("Bad Request " + str(e) , 500) 
