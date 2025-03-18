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


def companiesDataRequest(start, stop):
    requete = """ 
        SELECT
            id,
            name,
            description
        FROM 
            companies
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

def companiesTotal():
    requete = """ 
        SELECT
            COUNT(*) as total
        FROM 
            companies
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

def returnCompanieListStructure(listCompanies, totalCompanie, paginate ):
    totalPage = ceil(int(totalCompanie) / paginate)
    arrayCompanies = []

    for companies in listCompanies :
        jsonData = {"type":"campany","id":companies['id'],"attributes":{"name":companies['name'],"description":companies['description']}}
        arrayCompanies.append(jsonData)
        
    jsonReturn =  {
        "meta":{"totalPages":totalPage,"total":totalCompanie},
        "data": arrayCompanies }

    return returnData(jsonReturn,200)

def companieGetList():

    page = request.args.get("page")
    paginate = request.args.get("paginate")

    if paginate != 'all' :
        start = (int(page) - 1) * int(paginate)
        stop = (int(paginate) * int(page))
    else :
        start = 0
        stop = 10000
        paginate= "1"

    listCompanies = companiesDataRequest( start, stop )
    totalCompanie = companiesTotal()
    return returnCompanieListStructure(listCompanies,totalCompanie, int(paginate) )


def companiesCreation(name, description, userId):
    requete = """
    INSERT INTO 
    companies
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
        return returnMessage("Error : Impossible to save the companie " + str(e), 500)

def companieCreate():
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

        lastRowInsert = companiesCreation(name, description,userId)
        json = {"data":{"type":"campany","id":lastRowInsert,"attributes":{"name":name,"description":description}}}
        return returnData(json, 200)
    else :
        return returnMessage('No data insert', 500)


def companieDelete(id):
    requete = """
    DELETE FROM
        companies 
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
        return returnMessage("Error : Impossible to save the companie " + str(e), 500)