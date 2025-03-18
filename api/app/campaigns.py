from flask_jsonpify import jsonify
from datetime import datetime, timedelta
from flask_jwt_extended import (
    get_jwt_identity
)
from flask import request
from math import *

import mysql.connector
from .db.db import mysqlConnector
from .core.message import returnMessage, returnData
from .users import usersSearchByEmail


def campaignsTotal(userId):
    requete = """ 
        SELECT
            COUNT(*) as total
        FROM 
            campaigns, 
            campaignUsers
        WHERE
            campaigns.id = campaignUsers.campaignId
        AND
            campaignUsers.userId = %s
        AND
            status = 0
    """
    dataRequete = (userId,)

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.execute(requete, dataRequete)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
        return data[0]['total']

    except TypeError as e:
        return returnMessage("Bad Request " + str(e), 500)


def campaignsDataRequest(start, stop, userId):
    start = 0
    stop = 1000
    requete = """ 
        SELECT
            cp.id as id,
            cp.name as name,
            (SELECT COUNT(*) FROM campaignAudios WHERE campaignId = cp.id) as audioCount,
            (SELECT COUNT(*) FROM campaignAudiosExtras WHERE campaignAudiosExtras.audioId IN (SELECT audioId FROM campaignAudios WHERE campaignId = cp.id) AND  campaignAudiosExtras.userId=%s ) as achievedProcessCount,
            cp.emotionalAnalysis as emotionalAnalysis,
            cp.audioTranscription as audioTranscription,
            cp.ended as ended
        FROM 
            campaigns as cp, 
            campaignUsers as cu
        WHERE
            cp.id = cu.campaignId
        AND
            cu.userId = %s
        AND
            status = 0
        LIMIT %s, %s
    """
    dataRequete = (userId, userId, start, stop)

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.execute(requete, dataRequete)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
        return data

    except TypeError as e:
        return returnMessage("Bad Request " + str(e), 500)


def returnCompaignsListStructure(listCampaigns, totalCampaigns, paginate):
    totalPage = ceil(int(totalCampaigns) / paginate)
    arrayCampaigns = []

    for item in listCampaigns:
        jsonData = {
            "type": "campaign",
            "id": item['id'],
            "meta": {
                "audioCount": item['audioCount'],
                "averageAudioDuration": None,
                "achievedProcessCount": item['achievedProcessCount']
            },
            "attributes": {

                "name": item['name'],
                "emotionalAnalysis": item['emotionalAnalysis'],
                "audioTranscription": item['audioTranscription'],
                "ended": item['ended']
            }
        }
        arrayCampaigns.append(jsonData)

    jsonReturn = {
        "meta": {"totalPages": totalPage, "total": totalCampaigns},
        "data": arrayCampaigns}

    return returnData(jsonReturn, 200)


def campaignsGet():
    currentUser = get_jwt_identity()
    try:
        user = usersSearchByEmail(currentUser)
        userId = user[0]['id']
    except TypeError as e:
        return returnMessage("Bad Request " + str(e), 500)

    page = request.args.get("page")
    paginate = request.args.get("paginate")

    if paginate != 'all':
        start = (int(page) - 1) * int(paginate)
        stop = (int(paginate) * int(page))
    else:
        start = 0
        stop = 10000
        paginate = "1"

    listCampaigns = campaignsDataRequest(start, stop, userId)
    totalCampaigns = campaignsTotal(userId)
    return returnCompaignsListStructure(listCampaigns, totalCampaigns, int(paginate))


def campaignsCreation(name, userId, companyId, emotionalAnalysis, emotionalAnalysisTimeIntervalId,
                      emotionalAnalysisSliderConfigurationId):
    requete = """
        INSERT INTO 
            campaigns 
        (
            name, 
            status,
            createdAt, 
            createdBy,
            updatedAt,
            companyId,
            emotionalAnalysis,
            emotionalAnalysisTimeIntervalId,
            emotionalAnalysisSliderConfigurationId,
            audioTranscription,
            audioTranscriptionReviewPercentage,
            audioTranscriptionMaxReviewUsers,
            ended
        ) VALUES (
            %s,
            0,
            NOW(),
            %s,
            NOW(),
            %s,
            %s,
            %s,
            %s,
            0,
            NULL,
            NULL,
            0
        )
    """
    dataRequete = (
        name, userId, companyId, emotionalAnalysis, emotionalAnalysisTimeIntervalId,
        emotionalAnalysisSliderConfigurationId)
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
        return returnMessage("Error : Impossible to save the companie " + str(e), 500)

def incrementor():
    requete = """
        SELECT 
            count(*)
        FROM
            sliderConfigurations
    """
    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.execute(requete,)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
        info = data[0]['count(*)']
        return info

    except TypeError as e:
        return returnMessage("Bad Request " + str(e), 500)



def campaignsCreateSliderConfiguration(sliderObjet, userId):
    number = incrementor()
    nom = 'slider' + str(number)
    requete = """
        INSERT INTO 
            sliderConfigurations 
        (
            name, 
            minScale,
            maxScale, 
            startValue,
            tickInterval,
            status,
            createdAt,
            createdBy,
            updatedAt
        ) VALUES (
            %s,
            %s,
            %s,
            %s,
            %s,
            0,
            NOW(),
            %s,
            NOW()
        )
    """
    dataRequete = (
        nom, sliderObjet['minScale'], sliderObjet['maxScale'], sliderObjet['startValue'], sliderObjet['tickInterval'],
        userId)
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
        return returnMessage("Error : Impossible to save the companie " + str(e), 500)


def campaignsCreateInsertionUtilisateur(campainId, userId):
    requete = """
        INSERT INTO 
            campaignUsers 
        (
            userId, 
            campaignId,
            createdAt, 
            updatedAt

        ) VALUES (
            %s,
            %s,
            NOW(),
            NOW()
        )
    """
    dataRequete = (userId, campainId)
    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.execute(requete, dataRequete)
        baseDeDonnees.commit()
        cursor.close()
        baseDeDonnees.close()
        return True
    except TypeError as e:
        return returnMessage("Error : Impossible to save the companie " + str(e), 500)


def campaignsCreateEmotions(emotions, campainId):
    dataArray = []

    for item in emotions:
        valTo = (item, campainId)
        dataArray.append(valTo)

    requete = """
        INSERT INTO 
            campaignEmotions 
        (
            EmotionId, 
            campaignId,
            createdAt, 
            updatedAt

        ) VALUES (
            %s,
            %s,
            NOW(),
            NOW()
        )
    """
    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.executemany(requete, dataArray)
        baseDeDonnees.commit()
        cursor.close()
        baseDeDonnees.close()
        return True
    except TypeError as e:
        return returnMessage("Error : Impossible to save the companie " + str(e), 500)


def campaignsCreateProfiles(profiles, campainId):
    dataArray = []

    for item in profiles:
        valTo = (item, campainId)
        dataArray.append(valTo)

    requete = """
        INSERT INTO 
            campaignProfiles 
        (
            profileId, 
            campaignId,
            createdAt, 
            updatedAt

        ) VALUES (
            %s,
            %s,
            NOW(),
            NOW()
        )
    """
    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.executemany(requete, dataArray)
        baseDeDonnees.commit()
        cursor.close()
        baseDeDonnees.close()
        return True
    except TypeError as e:
        return returnMessage("Error : Impossible to save the companie " + str(e), 500)


def campaignsCreate():
    currentUser = get_jwt_identity()
    try:
        user = usersSearchByEmail(currentUser)
        userId = user[0]['id']
    except TypeError as e:
        return returnMessage("Bad Request " + str(e), 500)

    request_data = request.get_json()

    audioTranscription = None
    companyId = None
    emotionalAnalysis = None
    emotionalAnalysisSliderConfiguration = None
    emotionalAnalysisTimeIntervalId = None
    emotions = []
    name = None
    profiles = []

    if request_data:
        if 'audioTranscription' in request_data:
            audioTranscription = request_data['audioTranscription']
        else:
            return returnMessage('Bad request', 500)

        if 'companyId' in request_data:
            companyId = request_data['companyId']
        else:
            return returnMessage('Bad request', 500)

        if 'emotionalAnalysis' in request_data:
            emotionalAnalysis = request_data['emotionalAnalysis']
        else:
            return returnMessage('Bad request', 500)

        if 'emotionalAnalysisSliderConfiguration' in request_data:
            emotionalAnalysisSliderConfiguration = request_data['emotionalAnalysisSliderConfiguration']
        else:
            return returnMessage('Bad request', 500)

        if 'emotionalAnalysisTimeIntervalId' in request_data:
            emotionalAnalysisTimeIntervalId = request_data['emotionalAnalysisTimeIntervalId']
        else:
            return returnMessage('Bad request', 500)

        if 'emotions' in request_data:
            emotions = request_data['emotions']

        if 'profiles' in request_data:
            profiles = request_data['profiles']

        if 'name' in request_data:
            name = request_data['name']
        else:
            return returnMessage('Bad request', 500)

        sliderId = campaignsCreateSliderConfiguration(emotionalAnalysisSliderConfiguration, userId)
        campainId = campaignsCreation(name, userId, companyId, emotionalAnalysis, emotionalAnalysisTimeIntervalId,
                                      sliderId)
        campaignsCreateInsertionUtilisateur(campainId, userId)

        if len(emotions) > 0:
            campaignsCreateEmotions(emotions, campainId)

        if len(profiles) > 0:
            campaignsCreateProfiles(profiles, campainId)

        json = {"data": {"type": "campaign", "id": campainId, "meta": {},
                         "attributes": {"name": name, "emotionalAnalysis": emotionalAnalysis,
                                        "audioTranscription": audioTranscription, "ended": 0}}}
        return returnData(json, 200)
    else:
        return returnMessage('No data insert', 500)


def campaingGetInformation(campainsId, userId):
    requete = """ 
        SELECT
            cp.id as id,
            cp.name as name,
            (SELECT COUNT(*) FROM campaignAudios WHERE campaignId = cp.id) as audioCount,
            (SELECT COUNT(*) FROM campaignAudiosExtras WHERE campaignAudiosExtras.audioId IN (SELECT audioId FROM campaignAudios WHERE campaignId = cp.id)) as achievedProcessCount,
            cp.emotionalAnalysis as emotionalAnalysis,
            cp.audioTranscription as audioTranscription,
            cp.ended as ended
        FROM 
            campaigns as cp, 
            campaignUsers as cu
        WHERE
            cp.id = %s
        AND
            cp.id IN ( SELECT id FROM campaignUsers WHERE userId = %s )
        AND
            status = 0
    """
    dataRequete = (campainsId, userId)

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.execute(requete, dataRequete)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
        return data[0]

    except TypeError as e:
        return returnMessage("Bad Request " + str(e), 500)


def campaignsInformation(id):
    currentUser = get_jwt_identity()
    try:
        user = usersSearchByEmail(currentUser)
        userId = user[0]['id']
    except TypeError as e:
        return returnMessage("Bad Request " + str(e), 500)

    dataCampain = campaingGetInformation(id, userId)

    json = {"data": {"type": "campaign", "id": dataCampain['id'],
                     "meta": {"audioCount": dataCampain['audioCount'], "averageAudioDuration": None,
                              "achievedProcessCount": dataCampain['achievedProcessCount']},
                     "attributes": {"name": dataCampain['name'], "emotionalAnalysis": dataCampain['emotionalAnalysis'],
                                    "audioTranscription": dataCampain['audioTranscription'],
                                    "ended": dataCampain['audioTranscription']}}}
    return returnData(json, 200)


def campaignsGetInfoProfil(campaignId):
    requete = """ 
        SELECT
            profiles.id as id,
            profiles.name as name,
            profiles.description as description
        FROM 
            campaignProfiles,
            profiles
        WHERE
            campaignProfiles.campaignId = %s
        AND
            campaignProfiles.profileId = profiles.id
    """
    dataRequete = (campaignId,)

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.execute(requete, dataRequete)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
        return data

    except TypeError as e:
        return returnMessage("Bad Request " + str(e), 500)


def campaignsGetRelationShip(campaignId):
    requete = """
        SELECT
            campaignProfiles.profileId as profileId,
            profileLabels.id as id,
            profileLabels.label as label
        FROM 
            campaignProfiles,
            profileLabels
        WHERE
            campaignProfiles.campaignId = %s
        AND
        	campaignProfiles.profileId = profileLabels.profileId
    """
    dataRequete = (campaignId,)

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.execute(requete, dataRequete)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
        return data

    except TypeError as e:
        return returnMessage("Bad Request " + str(e), 500)


def campaignsGetLabelByProfil(profildId, arrayLabel):
    arrayToLabel = []
    for item in arrayLabel:
        if item['profileId'] == profildId:
            jsonData = {"type": "label", "id": item['id']}
            arrayToLabel.append(jsonData)
    return arrayToLabel


def campaignsGetListLabelInclude(arrayLabel):
    arrayToLabel = []
    for item in arrayLabel:
        jsonTo = {
            "type": "label",
            "id": item['id'],
            "attributes": {
                "label": item['label']
            }
        }
        arrayToLabel.append(jsonTo)

    return arrayToLabel


def campaignsInformationProfiles(id):
    dataInfoProfil = campaignsGetInfoProfil(id)
    listLabelCampaigns = campaignsGetRelationShip(id)

    arrayProfiles = []
    for item in dataInfoProfil:
        arrayLabels = campaignsGetLabelByProfil(item['id'], listLabelCampaigns)
        jsonReturn = {
            "type": "profile",
            "id": item['id'],
            "attributes": {"name": item['name'], "description": item['description']},
            "relationships": {"labels": {"data": arrayLabels}}
        }

        arrayProfiles.append(jsonReturn)

    json = {
        "meta": {"totalPages": 1, "total": len(dataInfoProfil)},
        "data": arrayProfiles,
        "included": campaignsGetListLabelInclude(listLabelCampaigns)
    }

    return returnData(json, 200)


def campaignsGetInfoEmotions(campaignId):
    requete = """ 
        SELECT
            emotions.id as id,
            emotions.name as name,
            emotions.description as description
        FROM 
            campaignEmotions,
            emotions
        WHERE
            campaignEmotions.campaignId = %s
        AND
            campaignEmotions.EmotionId = emotions.id
    """
    dataRequete = (campaignId,)

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.execute(requete, dataRequete)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
        return data

    except TypeError as e:
        return returnMessage("Bad Request " + str(e), 500)


def campaignsInformationEmotions(id):
    dataEmotions = campaignsGetInfoEmotions(id)
    arrayEmotions = []
    for item in dataEmotions:
        jsonReturn = {
            "type": "emotion",
            "id": item['id'],
            "attributes": {"name": item['name'], "description": item['description']}}
        arrayEmotions.append(jsonReturn)

    json = {
        "meta": {"totalPages": 1, "total": 1},
        "data": arrayEmotions}
    return returnData(json, 200)


def campaignsGetInfoTimeInterval(campaignId):
    requete = """ 
        SELECT
            timeIntervals.id as id,
            timeIntervals.label as label,
            timeIntervals.value as value
        FROM 
            campaigns,
            timeIntervals
        WHERE
            campaigns.id = %s
        AND
            timeIntervals.id = campaigns.emotionalAnalysisTimeIntervalId
    """
    dataRequete = (campaignId,)

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.execute(requete, dataRequete)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
        return data[0]

    except TypeError as e:
        return returnMessage("Bad Request " + str(e), 500)


def campaignsInformationTimeInterval(id):
    dataInterval = campaignsGetInfoTimeInterval(id)
    json = {"data": {"type": "timeInterval", "id": dataInterval['id'],
                     "attributes": {"label": dataInterval['label'], "value": dataInterval['value']}}}
    return returnData(json, 200)


def campaignsGetInfoSliderConfiguration(campaignId):
    requete = """ 
        SELECT
            sliderConfigurations.id as id,
            sliderConfigurations.name as name,
            sliderConfigurations.minScale as minScale,
            sliderConfigurations.maxScale as maxScale,
            sliderConfigurations.startValue as startValue,
            sliderConfigurations.tickInterval as tickInterval
        FROM 
            campaigns,
            sliderConfigurations
        WHERE
            campaigns.id = %s
        AND
            sliderConfigurations.id = campaigns.emotionalAnalysisSliderConfigurationId
    """
    dataRequete = (campaignId,)

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.execute(requete, dataRequete)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
        return data[0]

    except TypeError as e:
        return returnMessage("Bad Request " + str(e), 500)


def campaignsInformationSliderConfiguration(id):
    dataSlider = campaignsGetInfoSliderConfiguration(id)
    jsonSlider = {"data": {"type": "sliderConfiguration", "id": dataSlider['id'],
                           "attributes": {"name": dataSlider['name'], "minScale": dataSlider['minScale'],
                                          "maxScale": dataSlider['maxScale'], "startValue": dataSlider['startValue'],
                                          "tickInterval": dataSlider['tickInterval']}}}
    return returnData(jsonSlider, 200)


def campaignsGetAudio(start, stop, id):
    requete = """ 
        SELECT
            audios.id as id,
            audios.name as name,
            audios.size as size,
            audios.type as type,
            audios.link as link
        FROM  
            campaignAudios, 
            audios
        WHERE
            audios.id = campaignAudios.audioId
        AND
            campaignAudios.campaignId = %s
        ORDER BY LENGTH(audios.name), audios.name
        LIMIT %s,%s
    """
    dataRequete = (id, start, stop)

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.execute(requete, dataRequete)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
        return data

    except TypeError as e:
        return returnMessage("Bad Request " + str(e), 500)


def campaignsGetTotalAudio(id):
    requete = """ 
        SELECT
            COUNT(*) as total
        FROM 
            campaignAudios
        WHERE
            campaignAudios.campaignId = %s
    """
    dataRequete = (id,)

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.execute(requete, dataRequete)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
        return data[0]['total']

    except TypeError as e:
        return returnMessage("Bad Request " + str(e), 500)

def campaignsInfoAudioReturn(listAudio, totalAudio, paginate):
    totalPage = ceil(int(totalAudio) / paginate)
    arrayAudio = []
    currentUser = get_jwt_identity()
    try:
        user = usersSearchByEmail(currentUser)
        userId = user[0]['id']
    except TypeError as e:
        return returnMessage("Bad Request " + str(e), 500)

    for item in listAudio:
        id = checkInAudiosExtra(item.get('id'), userId)
        try:
            if id == item['id']:
                jsonData = {"type": "audio", "id": item['id'],
                            "attributes": {"name": item['name'], "size": item['size'],
                                           "type": item['type'], "link": item['link'],
                                           "duration": None, "annotated": True}}
                arrayAudio.append(jsonData)
            else:
                jsonData = {"type": "audio", "id": item['id'],
                            "attributes": {"name": item['name'], "size": item['size'],
                                           "type": item['type'], "link": item['link'],
                                           "duration": None, "annotated": False}}
                arrayAudio.append(jsonData)
        except IndexError:
            jsonData = {"type": "audio", "id": item['id'],
                        "attributes": {"name": item['name'], "size": item['size'],
                                       "type": item['type'], "link": item['link'],
                                       "duration": None, "annotated": False}}

            arrayAudio.append(jsonData)

    returnJson = {
        "meta": {"totalPages": totalPage, "total": totalAudio},
        "data": arrayAudio}

    return returnData(returnJson, 200)


def campaignsInformationAudios(id):
    page = request.args.get("page")
    paginate = request.args.get("paginate")

    if paginate != 'all':
        start = (int(page) - 1) * int(paginate)
        stop = (int(paginate) * int(page))
    else:
        start = 0
        stop = 10000
        paginate = "1"

    listAudio = campaignsGetAudio(start, stop, id)
    totalAudio = campaignsGetTotalAudio(id)
    return campaignsInfoAudioReturn(listAudio, totalAudio, int(paginate))


def checkInAudiosExtra(id, userId):
    requete = """ 
        SELECT
            campaignAudiosExtras.audioId
        FROM  
            audios, campaignAudiosExtras
        WHERE
            audios.id = campaignAudiosExtras.audioId 
        AND campaignAudiosExtras.audioId = %s AND campaignAudiosExtras.userId = %s
            

    """
    dataRequete = (id, userId)

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.execute(requete, dataRequete)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
        if len(data) > 0:
            return data[0]['audioId']

    except TypeError as e:
        return returnMessage("Bad Request " + str(e), 500)


def campaignsGetUsers(start, stop, id):
    requete = """ 
        SELECT
            users.id as id,
            users.firstName as firstName,
            users.lastName as lastName,
            users.email as email
        FROM  
            campaignUsers, 
            users
        WHERE
            users.id = campaignUsers.userId
        AND
            campaignUsers.campaignId = %s

        LIMIT %s,%s
    """
    dataRequete = (id, start, stop)

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.execute(requete, dataRequete)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
        return data

    except TypeError as e:
        return returnMessage("Bad Request " + str(e), 500)


def campaignsGetTotalUsers(id):
    requete = """ 
        SELECT
            COUNT(*) as total
        FROM 
            campaignUsers
        WHERE
            campaignUsers.campaignId = %s
    """
    dataRequete = (id,)

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.execute(requete, dataRequete)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
        return data[0]['total']

    except TypeError as e:
        return returnMessage("Bad Request " + str(e), 500)


def campaignsInfoUsersReturn(listUsers, totalUsers, paginate):
    totalPage = ceil(int(totalUsers) / paginate)

    arrayUsers = []

    for item in listUsers:
        jsonData = {"type": "user", "id": item['id'],
                    "attributes": {"email": item['email'], "firstName": item['firstName'],
                                   "lastName": item['lastName']}}
        arrayUsers.append(jsonData)

    returnJson = {
        "meta": {"totalPages": totalPage, "total": totalUsers},
        "data": arrayUsers}

    return returnData(returnJson, 200)


def campaignsInformationUsers(id):
    page = request.args.get("page")
    paginate = request.args.get("paginate")

    if paginate != 'all':
        start = (int(page) - 1) * int(paginate)
        stop = (int(paginate) * int(page))
    else:
        start = 0
        stop = 10000
        paginate = "1"

    listUsers = campaignsGetUsers(start, stop, id)
    totalUsers = campaignsGetTotalUsers(id)
    return campaignsInfoUsersReturn(listUsers, totalUsers, int(paginate))


def campaignsUsersInsertion(users, campaignId):
    arrayVal = []
    for item in users:
        ret = (item, campaignId, item, campaignId)
        arrayVal.append(ret)

    requete = """
    INSERT INTO 
        campaignUsers ( userId, campaignId)
    SELECT * FROM (SELECT %s as uID, %s as cID) AS tmp
    WHERE NOT EXISTS (
        SELECT userId  FROM campaignUsers WHERE userId = %s AND campaignId = %s
    ) LIMIT 1;
    """
    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try:
        cursor.executemany(requete, arrayVal)
        baseDeDonnees.commit()
        cursor.close()
        baseDeDonnees.close()
        return returnMessage('ok', 200)
    except TypeError as e:
        return returnMessage("Error : Impossible to save the companie " + str(e), 500)


def campaignsUsersInsert(id):
    request_data = request.get_json()
    return campaignsUsersInsertion(request_data, id)
