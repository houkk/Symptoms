# -*- coding: utf-8 -*-
__author__ = 'Mesogene'
from flask.ext.restful import reqparse, abort, fields

from flask import render_template, request
from flask.ext.mongorest.views import ResourceView
from flask.ext.mongorest.resources import Resource
from flask.ext.mongorest import methods, operators
from App import app, api
from flask.ext.login import login_required, current_user


@app.route('/ceshi/')
@login_required
def ceshi():
    c = current_user
    # print c['email']
    return "true"

@app.route('/ee/')
def ee():
    return render_template('ee.html')