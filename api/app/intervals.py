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


def intervalsDataRequest( start, stop ):
    requete = """ 
        SELECT
            id,
            label,
            value
        FROM 
            timeIntervals
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

def intervalsTotal():
    requete = """ 
        SELECT
            COUNT(*) as total
        FROM 
            timeIntervals
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

def returnIntervalsListStructure(listIntervals, totalIntervals, paginate):
    totalPage = ceil(int(totalIntervals) / paginate)
    arrayIntervals = []

    for item in listIntervals :
        jsonData = {"type":"timeInterval","id":item['id'],"attributes":{"label":item['label'],"value":item['value']}}
        arrayIntervals.append(jsonData)
        
    jsonReturn =  {
        "meta":{"totalPages":totalPage,"total":totalIntervals},
        "data": arrayIntervals }

    return returnData(jsonReturn,200)

def intervalsGetList():
    page = request.args.get("page")
    paginate = request.args.get("paginate")

    if paginate != 'all' :
        start = (int(page) - 1) * int(paginate)
        stop = (int(paginate) * int(page))
    else :
        start = 0
        stop = 10000
        paginate= "1"

    listIntervals = intervalsDataRequest( start, stop )
    totalIntervals = intervalsTotal()

    return returnIntervalsListStructure(listIntervals,totalIntervals, int(paginate) )



def intervalsCreation(label, value,userId):
    requete = """
    INSERT INTO 
    timeIntervals
    (label, value, status, createdAt, createdBy, updatedAt) VALUES (
        %s,
        %s,
        0,
        NOW(),
        %s,
        NOW()
    )
    """
    dataRequete = (label, value, userId)
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

def intervalsCreate():
    currentUser = get_jwt_identity()
    try :
        user = usersSearchByEmail(currentUser)
        userId = user[0]['id']
    except TypeError as e:
        return returnMessage("Bad Request " + str(e) , 500)

    request_data = request.get_json()

    label = None
    value = None

    if request_data :
        if 'label' in request_data:
            label = request_data['label']
        else :
            return returnMessage('Bad request',500)    

        if 'value' in request_data :
            value = request_data['value']
        else :
            return returnMessage('Bad request', 500)

        lastRowInsert = intervalsCreation(label, value,userId)
        json = {"data":{"type":"timeInterval","id":lastRowInsert,"attributes":{"label":label,"value":value}}}
        return returnData(json, 200)
    else :
        return returnMessage('No data insert', 500)


    return returnMessage('ok', 200)



def intervalsDelete( id ):
    requete = """
    DELETE FROM
        timeIntervals 
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
