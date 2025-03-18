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

def emotionsDataRequest( start, stop ):
    requete = """ 
        SELECT
            id,
            name,
            description
        FROM 
            emotions
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

def emotionsTotal():
    requete = """ 
        SELECT
            COUNT(*) as total
        FROM 
            emotions
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

def returnEmotionsListStructure(listEmotions, totalEmotions, paginate):
    totalPage = ceil(int(totalEmotions) / paginate)
    arrayEmotions = []

    for item in listEmotions :
        jsonData = {"type":"emotion","id":item['id'],"attributes":{"name":item['name'],"description":item['description']}}
        arrayEmotions.append(jsonData)
        
    jsonReturn =  {
        "meta":{"totalPages":totalPage,"total":totalEmotions},
        "data": arrayEmotions }

    return returnData(jsonReturn,200)

def emotionsGetList():
    page = request.args.get("page")
    paginate = request.args.get("paginate")

    if paginate != 'all' :
        start = (int(page) - 1) * int(paginate)
        stop = (int(paginate) * int(page))
    else :
        start = 0
        stop = 10000
        paginate= "1"
        
    listEmotions = emotionsDataRequest( start, stop )
    totalEmotions = emotionsTotal()

    return returnEmotionsListStructure(listEmotions,totalEmotions, int(paginate) )

def emotionsCreation(name, description, userId):
    requete = """
    INSERT INTO 
    emotions
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

def emotionsCreate():
    currentUser = get_jwt_identity()
    try :
        user = usersSearchByEmail(currentUser)
        userId = user[0]['id']
    except TypeError as e:
        return returnMessage("Bad Request " + str(e) , 500)

    request_data = request.get_json()

    description = None
    name = None

    if request_data :
        if 'description' in request_data:
            description = request_data['description']
        else :
            return returnMessage('Bad request',500)    

        if 'name' in request_data :
            name = request_data['name']
        else :
            return returnMessage('Bad request', 500)

        lastRowInsert = emotionsCreation(name, description,userId)
        json = {"data":{"type":"emotion","id":lastRowInsert,"attributes":{"name":name,"description":description}}}
        return returnData(json, 200)
    else :
        return returnMessage('No data insert', 500)

def emotionsDelete(id):
    requete = """
    DELETE FROM
        emotions 
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
        return returnMessage("Error : Impossible to delete the companie " + str(e), 500)

def getSummarieValues(emotionId, userId):
    requete = """
            SELECT
                esa.value
            FROM
                emotionalSummaryAnnotations esa
            WHERE
                esa.emotionId = %s
            AND
                esa.userId = %s
            ORDER BY 
                createdAt ASC
            
        """
    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    dataRequete = (emotionId, userId)

    try:
        cursor.execute(requete, dataRequete)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
        print(data)
        return data
    except TypeError as e:
        return returnMessage("Bad Request " + str(e), 500)