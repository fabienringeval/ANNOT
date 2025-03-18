import json
from app import app
from flask_jsonpify import jsonify
from flask import abort, request
from flask_jwt_extended import (
    jwt_required, 
    get_jwt_identity
)
from .users import usersLogin, usersLogout, usersCreate, usersRefreshToken, usersRole, usersDelete, usersInfo, usersList
from .campaigns import campaignsGet, campaignsCreate, campaignsInformation, campaignsInformationProfiles, campaignsInformationEmotions,campaignsInformationTimeInterval,campaignsInformationSliderConfiguration, campaignsInformationAudios, campaignsInformationUsers, campaignsUsersInsert 
from .companies import companieGetList,companieCreate, companieDelete
from .emotions import emotionsGetList, emotionsCreate, emotionsDelete
from .profiles import profilesGetList, profilesCreate, profilesDelete
from .intervals import intervalsGetList, intervalsCreate, intervalsDelete
from .audios import audiosProfiles, audiosEmotions, audiosComments, audiosServe, audiosSummary
from .export import campaignsExport
from .install import installDb

@app.route("/", methods = ["GET"])
def index():
    retour = {'message' : 'ready', 'api': 'v1'}
    return jsonify(retour), 200

##############################
##############################

@app.route("/v1/auth/login", methods = ["POST"])
def login():
    return usersLogin()
    

@app.route("/v1/auth/logout", methods = ["DELETE"])
@jwt_required(refresh=False)
def logout():
    return usersLogout()

@app.route('/v1/auth/access-tokens', methods=['GET'])
@jwt_required(refresh=True)
def refresh():
    return usersRefreshToken( )

##############################
##############################

@app.route("/v1/users", methods = ["POST"])
@jwt_required(refresh=False)
def createUser():
    return usersCreate()

@app.route("/v1/users/role", methods = ["GET"])
@jwt_required(refresh=False)
def roleUser():
    return usersRole()

@app.route("/v1/users/info", methods = ["GET"])
@jwt_required(refresh=False)
def infoUser():
    return usersInfo()

@app.route("/v1/users", methods = ["GET"])
@jwt_required(refresh=False)
def listUser():
    return usersList()

@app.route("/v1/users/<id>", methods = ["DELETE"])
@jwt_required(refresh=False)
def deleteUser():
    return usersDelete(id)


##############################
##############################

@app.route("/v1/companies", methods = ["GET"])
@jwt_required(refresh=False)
def getCompanies():
    return companieGetList()

@app.route("/v1/companies", methods = ["POST"])
@jwt_required(refresh=False)
def createCompanies():
    return companieCreate()

@app.route("/v1/companies/<id>", methods = ["DELETE"])
@jwt_required(refresh=False)
def deleteCompanies(id):
    return companieDelete(id)

##############################
##############################

@app.route("/v1/emotions", methods = ["GET"])
@jwt_required(refresh=False)
def getEmotions():
    return emotionsGetList()

@app.route("/v1/emotions", methods = ["POST"])
@jwt_required(refresh=False)
def createEmotions():
    return emotionsCreate()

@app.route("/v1/emotions/<id>", methods = ["DELETE"])
@jwt_required(refresh=False)
def deleteEmotions(id):
    return emotionsDelete(id)

##############################
##############################

@app.route("/v1/profiles", methods = ["GET"])
@jwt_required(refresh=False)
def getProfiles():
    return profilesGetList()

@app.route("/v1/profiles", methods = ["POST"])
@jwt_required(refresh=False)
def createProfiles():
    return profilesCreate()

@app.route("/v1/profiles/<id>", methods = ["DELETE"])
@jwt_required(refresh=False)
def deleteProfiles(id):
    return profilesDelete(id)

##############################
##############################

@app.route("/v1/time-intervals", methods = ["GET"])
@jwt_required(refresh=False)
def getIntervals():
    return intervalsGetList()

@app.route("/v1/time-intervals", methods = ["POST"])
@jwt_required(refresh=False)
def createIntervals():
    return intervalsCreate()

@app.route("/v1/time-intervals/<id>", methods = ["DELETE"])
@jwt_required(refresh=False)
def deleteIntervals(id):
    return intervalsDelete(id)

##############################
##############################

@app.route("/v1/campaigns", methods = ["GET"])
@jwt_required(refresh=False)
def getCampaigns():
    return campaignsGet()

@app.route("/v1/campaigns", methods = ["POST"])
@jwt_required(refresh=False)
def createCampaigns():
    return campaignsCreate()

@app.route("/v1/campaigns/<id>", methods = ["GET"])
@jwt_required(refresh=False)
def informationCampaigns(id):
    return campaignsInformation( id )

@app.route("/v1/campaigns/<id>/profiles", methods = ["GET"])
@jwt_required(refresh=False)
def informationCampaignsProfiles(id):
    return campaignsInformationProfiles( id )

@app.route("/v1/campaigns/<id>/emotions", methods = ["GET"])
@jwt_required(refresh=False)
def informationCampaignsEmotions(id):
    return campaignsInformationEmotions( id )

@app.route("/v1/campaigns/<id>/emotional-analysis-time-interval", methods = ["GET"])
@jwt_required(refresh=False)
def informationCampaignsTimeInterva(id):
    return campaignsInformationTimeInterval(id)

@app.route("/v1/campaigns/<id>/emotional-analysis-slider-configuration", methods = ["GET"])
@jwt_required(refresh=False)
def informationCampaignsSliderConfiguration( id ):
    return campaignsInformationSliderConfiguration( id )

@app.route("/v1/campaigns/<id>/audios", methods = ["GET"])
@jwt_required(refresh=False)
def informationCampaignsAudios( id ):
    return campaignsInformationAudios( id )

@app.route("/v1/campaigns/<id>/users", methods = ["GET"])
@jwt_required(refresh=False)
def informationCampaignsUsers( id ):
    return campaignsInformationUsers( id )

@app.route("/v1/campaigns/<id>/users", methods = ["POST"])
@jwt_required(refresh=False)
def insertCampaignsUser( id ):
    return campaignsUsersInsert( id )

@app.route("/v1/campaigns/<id>/export", methods = ["GET"])
@jwt_required(refresh=False)
def exportCampaigns( id ):
    return campaignsExport( id )

##############################
##############################

@app.route("/v1/audios/<id>/profiles", methods = ["POST"])
@jwt_required(refresh=False)
def profilesAudios( id ):
    return audiosProfiles( id )

@app.route("/v1/audios/<id>/emotions/<emoid>/annotations", methods = ["POST"])
@jwt_required(refresh=False)
def emotionAudios( id, emoid ):
    return audiosEmotions (id, emoid )

@app.route("/v1/audios/<id>/emotions/<emoid>/summary", methods = ["POST"])
@jwt_required(refresh=False)
def SummaryAudios(id, emoid):
    return audiosSummary(id, emoid)

@app.route("/v1/audios/<id>/comments", methods = ["POST"])
@jwt_required(refresh=False)
def commentsAudios( id ):
    return audiosComments( id )

@app.route("/v1/audios/<id>/serve", methods = ["GET"])
@jwt_required(refresh=False, locations=["headers", "query_string"])
def serveAudio( id ):
    return audiosServe( id )


@app.route("/v1/install", methods = ["POST"])
def dbInstall(  ):
    return installDb(  )

