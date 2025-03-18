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



def profilTotal():
    requete = """ 
        SELECT
            COUNT(*) as total
        FROM 
            profiles
        WHERE
            status = 0
    """

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try :
        cursor.execute(requete)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
        return data[0]['total']

    except TypeError as e:
        return returnMessage("Bad Request " + str(e) , 500)


def profilesDataRequest( start, stop ):
    requete = """ 
        SELECT
            id,
            name,
            description
        FROM 
            profiles
        WHERE
            status = 0
        LIMIT %s, %s
    """
    dataRequete = (start, stop,)

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try :
        cursor.execute(requete, dataRequete)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
        return data

    except TypeError as e:
        return returnMessage("Bad Request " + str(e) , 500)

def profilesListLabel( ):
    requete = """ 
        SELECT
            id,
            label,
            profileId
        FROM 
            profileLabels
    """

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try :
        cursor.execute(requete)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
        return data

    except TypeError as e:
        return returnMessage("Bad Request " + str(e) , 500)

def returnProfilesListStructure(listProfiles, totalProfiles, listValueProfil, paginate):
    totalPage = ceil(int(totalProfiles) / paginate)
    arrayProfiles = []

    for item in listProfiles :
        arrayProfilLabel = []

        for label in listValueProfil:
            if label['profileId'] == item['id']:
                jsonLabl = {
                    "type" : "label",
                    "id": int(label['id'])
                }
                arrayProfilLabel.append(jsonLabl)

        jsonData = {
            "type":"profile",
            "id": int(item['id']),
            "attributes": {
                "name":item['name'],
                "description":item['description']
            },
            "relationships" : {
                "labels" : {
                    "data": arrayProfilLabel
                }
            }
        }
        arrayProfiles.append(jsonData)

    arrayLabelG = []
    for labelI in listValueProfil:
        jsonLabelG = {
            "type": "label",
            "id": int(labelI['id']),
            "attributes": { "label": labelI['label']}}
        arrayLabelG.append(jsonLabelG)

    jsonReturn =  {
        "meta":{"totalPages":totalPage,"total":totalProfiles},
        "data": arrayProfiles,
        "included" : arrayLabelG
    }

    return returnData(jsonReturn,200)

def profilesGetList():
    page = request.args.get("page")
    paginate = request.args.get("paginate")

    if paginate != 'all' :
        start = (int(page) - 1) * int(paginate)
        stop = (int(paginate) * int(page))
    else :
        start = 0
        stop = 10000
        paginate= "1"

    listProfiles = profilesDataRequest( start, stop )
    listValueProfil = profilesListLabel()
    totalProfiles = profilTotal()

    return returnProfilesListStructure(listProfiles,totalProfiles, listValueProfil, int(paginate))

def profilesCreation(name, description, userId):
    requete = """
    INSERT INTO 
    profiles
    (name, description, createdAt, createdBy, updatedAt) VALUES(
        %s,
        %s,
        NOW(),
        %s,
        NOW()
    )
    """
    dataRequete = (name, description, userId)
    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try :
        cursor.execute(requete, dataRequete)
        baseDeDonnees.commit()
        insertId = cursor.lastrowid
        cursor.close()
        baseDeDonnees.close()
        return insertId
    except TypeError as e:
        return returnMessage("Error : Impossible to save the emotion " + str(e), 500)

def profilesCreationLabel( profileId, labels ):

    labelsArray = []

    for item in labels:
        valTo = ( item['label'], profileId )
        labelsArray.append(valTo)


    requete = """
    INSERT INTO 
    profileLabels
    (label, createdAt, updatedAt, profileId) VALUES(
        %s,
        NOW(),
        NOW(),
        %s
    )
    """
    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try :
        cursor.executemany(requete, labelsArray)
        baseDeDonnees.commit()
        insertId = cursor.lastrowid
        cursor.close()
        baseDeDonnees.close()
        return insertId
    except TypeError as e:
        return returnMessage("Error : Impossible to save the emotion " + str(e), 500)

def profilesCreate():
    currentUser = get_jwt_identity()
    try :
        user = usersSearchByEmail(currentUser)
        userId = user[0]['id']
    except TypeError as e:
        return returnMessage("Bad Request " + str(e) , 500)

    request_data = request.get_json()

    description = None
    name = None
    labels = None

    if request_data :
        if 'description' in request_data:
            description = request_data['description']
        else :
            return returnMessage('Bad request',500)

        if 'name' in request_data :
            name = request_data['name']
        else :
            return returnMessage('Bad request', 500)

        if 'labels' in request_data :
            labels = request_data['labels']
        else :
            return returnMessage('Bad request', 500)

        lastRowInsert = profilesCreation( name, description, userId )
        createStatus = profilesCreationLabel( lastRowInsert, labels )

        return returnMessage('Insertion Ok', 200)
    else :
        return returnMessage('No data insert', 500)



def prolilesDeleteLabel( id ) :
    requete = """
    DELETE FROM
        profileLabels 
    WHERE 
        profileId = %s
    """
    dataRequete = (id, )
    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try :
        cursor.execute(requete, dataRequete)
        baseDeDonnees.commit()
        cursor.close()
        baseDeDonnees.close()
        return True
    except TypeError as e:
        return False

def prolilesDeleteLabel( id ) :
    requete = """
    DELETE FROM
        profiles 
    WHERE 
        id = %s
    """
    dataRequete = (id, )
    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try :
        cursor.execute(requete, dataRequete)
        baseDeDonnees.commit()
        cursor.close()
        baseDeDonnees.close()
        return returnMessage('success', 200)
    except TypeError as e:
        return returnMessage("Error : Impossible to delete the profile " + str(e), 500)

def profilesDelete( id ):

    if prolilesDeleteLabel( id ) :
        return prolilesDeleteLabel( id )
    else :
        return returnMessage("Error : Impossible to delete lable/profiles ", 500)

def getLabelValues(audioId):
    requete = """
       SELECT DISTINCT
                   pA.profileLabelId,
                   pA.profileValue,
                   pA.userId
               FROM
                   profileAnnotations pA,
                   campaigns c
               WHERE
                   pA.profileLabelId IS NOT NULL
               AND
                   pA.audioId = %s
    """
    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    dataRequete = (audioId,)

    try:
        cursor.execute(requete, dataRequete)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
        print(data)
        return data
    except TypeError as e:
        return returnMessage("Bad Request " + str(e), 500)
