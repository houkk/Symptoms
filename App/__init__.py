# -*- coding: utf-8 -*-

__author__ = 'Mesogene'
from flask import Flask
from flask.ext.mongoengine import MongoEngine
from flask.ext.mongorest import MongoRest
from flask.ext.login import LoginManager
from flask.ext.bcrypt import Bcrypt
from flask.ext.cors import CORS

app = Flask(__name__, template_folder='template', static_folder='template')

CORS(app)

app.config.from_object("config")

api = MongoRest(app)

db = MongoEngine(app)

lm = LoginManager()

lm.init_app(app)

flask_bcrypt = Bcrypt(app)

from App import models, views, login, resources, resourceview, file, qfilter