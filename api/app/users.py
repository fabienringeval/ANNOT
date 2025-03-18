from flask_jsonpify import jsonify
from datetime import datetime, timedelta 
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    create_refresh_token,
    get_jwt_identity
)
from flask import request
import bcrypt
from math import *
import mysql.connector
from .db.db import mysqlConnector
from .core.message import returnMessage, returnData


def usersSearchByEmail( email ):
    requete = """
    SELECT 
        id,
        email,
        password 
    FROM 
        users 
    WHERE 
        email = %s 
    AND 
        status = 0
    """
    dataRequete = (email,)

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try :
        cursor.execute(requete, dataRequete)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
        return data
    except TypeError as e:
        print(e)
        return jsonify('Bad request'), 400


def userCheckPassword( password, dataPassword ):
    if bcrypt.checkpw(password, dataPassword):
        return True
    else:
        return jsonify({'message' : 'Please check you email or your password'}), 401

def usersSaveToken(id, refreshToken):
    requete = """
    INSERT INTO 
        usersTokens
    (
        usersId,
        refreshToken,
        createdAt
    ) VALUES(
        %s,
        %s,
        NOW()
    )
    """
    dataRequete = (id, refreshToken )

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try :
        cursor.execute(requete, dataRequete)
        baseDeDonnees.commit()
        cursor.close()
        baseDeDonnees.close()
        return True
    except TypeError as e:
        return returnMessage("Error : Impossible to save refresh Token", 500)

def userCreateToken( id, mail ) :
    retour = {}
    retour['access_token'] = create_access_token(identity=mail)
    retour['refresh_token'] = create_refresh_token(identity=mail)
    if usersSaveToken(id, retour['refresh_token']) :
        return returnData(retour, 200)

def usersLogin():
    request_data = request.get_json()
    email = None
    password = None
    if request_data :
        if 'email' in request_data:
            email = request_data['email']
        else :
            return jsonify('Bad request'),500    

        if 'password' in request_data :
            password = request_data['password']
        else :
            return jsonify('Bad request'),500
        
        userSearchData = usersSearchByEmail( email )
        print(userSearchData)
        if len(userSearchData) == 1:
            passwdEncode = password.encode('utf-8')
            checkEncode = userSearchData[0]['password'].encode('utf-8')
            if userCheckPassword(passwdEncode, checkEncode):
                return userCreateToken(userSearchData[0]['id'], userSearchData[0]['email'])
        else :
            return returnMessage("Email/password not found", 403)

    else :
        return returnMessage("Bad Request", 500)
 


def usersLogout():
    return jsonify(True), 200


def userEncryptPassword( password ):
    salt = bcrypt.gensalt()
    passwordEncode = password.encode('utf-8')
    hashed = bcrypt.hashpw(passwordEncode, salt)
    return hashed.decode('utf-8')

def usersInsertionRole(insertId):
    requete = """
    INSERT INTO 
        usersRoles
    (
        usersId,
        roleId,
        createdAt
    ) VALUES (
        %s,
        1,
        NOW()
    )
    """
    dataRequete = (insertId, )
    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try :
        cursor.execute(requete, dataRequete)
        baseDeDonnees.commit()
        insertId = cursor.lastrowid
        cursor.close()
        baseDeDonnees.close()
        return True
    except TypeError as e:
        return returnMessage("Bad Request", 400)

def userCreateSql( postData, init = None ):
    requete = """
    INSERT INTO 
    users
    ( 
        firstName,
        lastName,
        email,
        password,
        createdAt,
        createdBy
    ) VALUES (
        %s,
        %s,
        %s,
        %s,
        NOW(),
        1
     )
    """
    dataRequete = (postData['firstName'], postData['lastName'], postData['email'], postData['password'] )

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try :
        cursor.execute(requete, dataRequete)
        baseDeDonnees.commit()
        insertId = cursor.lastrowid
        cursor.close()
        baseDeDonnees.close()
        usersInsertionRole(insertId)
        jsReturn = {
            "data":
            {
                "type":"user",
                "id":insertId,
                "attributes":
                {
                    "email":postData['email'],"firstName":postData['firstName'],"lastName":postData['lastName']}}}
        if init == True :
            return insertId
        else :  
            return returnData(jsReturn, 201)

    except TypeError as e:
        return returnMessage("Bad Request", 400)

def usersCreate():
    request_data = request.get_json()
    postData = {}

    if request_data :
        if 'firstName' in request_data:
            postData['firstName'] = request_data['firstName']
        else :
            return returnMessage("Bad Request - no firstName send", 401)

        if 'lastName' in request_data:
            postData['lastName'] = request_data['lastName']
        else :
            return returnMessage("Bad Request - no lastName send", 401)

        if 'email' in request_data:
            postData['email'] = request_data['email']
        else :
            return returnMessage("Bad Request - no email send", 401)

        if 'password' in request_data :
            password = request_data['password']
            postData['password'] = userEncryptPassword( password )
        else :
            return returnMessage("Bad Request - no password send", 401)
        
        userSearchData = usersSearchByEmail( postData['email'] )
        if len(userSearchData) == 0 :
            return userCreateSql( postData )
        else :
            return returnMessage("Impossible to create an account", 401)
    else :
        return returnMessage("Bad Request", 500)


def usersRefreshToken( ):
    current_user = get_jwt_identity()
    retourToken = {
        'access_token': create_access_token(identity=current_user)
    }
    return returnData(retourToken, 200)

def returnRoleDataStructure( data ) :
    tabRole = []
    for item in data :
        tabRole.append(item['name'])
    
    serviceJson = {"module": [], "role": tabRole, "serviceId": "6qI21Y5lVZnfaeR", "serviceName": "vianote"}
    dataJson = []
    dataJson.append(serviceJson)
    returnJson = {"services": dataJson }
    return returnData(returnJson, 200)

def usersRoleByEmail( email ):
    requete = """ 
        SELECT
            name 
        FROM 
            usersRoles,
            roles
        WHERE
        	usersRoles.roleId = roles.id
        AND
            usersRoles.usersId = (SELECT id FROM users WHERE email = %s AND status = 0)
    """
    dataRequete = (email,)

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try :
        cursor.execute(requete, dataRequete)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()

        if len(data) != 0 :
            return returnRoleDataStructure(data)
        else:
            return returnMessage("no roles detected", 404)
    except TypeError as e:
        return returnMessage("Bad Request " + str(e) , 500)

def usersRole():
    currentUser = get_jwt_identity()
    print(currentUser)
    return usersRoleByEmail( currentUser )

def usersDelete():
    currentUser = get_jwt_identity()

    return True

def getUserInfo( email ):

    requete = """ 
        SELECT
            firstName,
            lastName,
            email
        FROM 
            users
        WHERE
        	email = %s
        AND status = 0
    """
    dataRequete = (email,)

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try :
        cursor.execute(requete, dataRequete)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()

        if len(data) == 1 :
            jsonReturn = {"profil": data[0]}
            return returnData(jsonReturn, 200)
        else:
            return returnMessage("no user detected", 404)
    except TypeError as e:
        return returnMessage("Bad Request " + str(e) , 500)

def usersInfo():
    currentUser = get_jwt_identity()
    return getUserInfo( currentUser )


def returnListStructure(listUsers, totalUsers, paginate):
    totalPage = ceil(int(totalUsers) / paginate)

    arrayUser = []

    for user in listUsers :
        jsonData = {"type":"user","id":user['id'],"attributes":{"email":user['email'],"firstName":user['firstName'],"lastName": user['lastName']}}
        arrayUser.append(jsonData)

    returnJson = {
        "meta": {"totalPages":totalPage,"total":totalUsers},
        "data": arrayUser }
    return returnData(returnJson,200)

def usersGetTotalUsers():
    requete = """ 
        SELECT
            COUNT(*) as total
        FROM 
            users
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

def usersGetList():
    requete = """ 
        SELECT
            id,
            firstName,
            lastName,
            email,
            (SELECT COUNT(*) FROM users) as total
        FROM 
            users
        WHERE
            status = 0
        LIMIT 0, 1000 
    """

    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)
    try :
        cursor.execute(requete,)
        data = cursor.fetchall()
        cursor.close()
        baseDeDonnees.close()
        return data

    except TypeError as e:
        return returnMessage("Bad Request " + str(e) , 500)


def usersList():
    currentUser = get_jwt_identity()

    page = request.args.get("page")
    paginate = request.args.get("paginate")

    if paginate != 'all' :
        start = (int(page) - 1) * int(paginate)
        stop = (int(paginate) * int(page))
    else :
        start = 0
        stop = 10000
        paginate= "1"

    listUsers = usersGetList()
    totalUsers = usersGetTotalUsers()
    return returnListStructure(listUsers,totalUsers, int(paginate) )



def getAllRoles(cursor):
    requete = """
        SELECT id FROM roles
    """

    try :
        cursor.execute(requete)
        data = cursor.fetchall()
        return data

    except TypeError as e:
        return returnMessage("Bad Request " + str(e) , 500)

def userUpdateAllAcces(uid):
    baseDeDonnees = mysqlConnector()
    cursor = baseDeDonnees.cursor(dictionary=True, buffered=True)

    roleArray = getAllRoles(cursor)
    print(roleArray)

    for role in roleArray:
        requete = """
            insert into usersRoles (usersId, roleId)
            select usersId, roleId
            from ( select %s as usersId, %s as roleId from usersRoles  ) as temp
            where not exists (select usersId, roleId from usersRoles where usersId = temp.usersId AND roleId = temp.roleId)
            GROUP BY usersId
        """
        dataRequete = (uid, role['id'],)
        cursor.execute(requete, dataRequete)

    baseDeDonnees.commit()
    cursor.close()
    baseDeDonnees.close()
    return False