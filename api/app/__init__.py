from datetime import timedelta

import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager


app = Flask(__name__)
CORS(app, resources={ r"*": { "origins": "*" } })


app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')  # Change this!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=600)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=1)
jwt = JWTManager(app)


if os.environ['HTTPS'] == True:
    Talisman(app)

from app import routes
