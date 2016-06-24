# -*- coding: utf-8 -*-
__author__ = 'Mesogene'
import simplejson
from flask import render_template, request, redirect, Response, jsonify
from App import lm, flask_bcrypt
from App.models import User
from App import app
from flask.ext.login import (login_required, login_user, logout_user, current_user, fresh_login_required)


# @app.route("/loginhtml/")
# def loginhtml():
#     return render_template('login.html')


@lm.user_loader
def load_user(id):
    """
    获取登陆用户
    :param id:
    :return:
    """
    return User.objects.get(id=id)

def loginuser(user):
    """
    用户信息格式重建(个人不喜欢mongoengine的to_json的id形式，索性全换了)
    :param user:
    :return:
    """
    result = {}
    result['id'] = str(user['id'])
    result['username'] = user['username']
    result['email'] = user['email']
    result['is_admin'] = user['is_admin']
    result['is_subjectone'] = user['is_subjectone']
    result['is_subjecttwo'] = user['is_subjecttwo']
    result['is_subjectthree'] = user['is_subjectthree']
    return result


@app.route("/login/", methods=["POST"])
def login():
    """
    登录
    :return:
    """
    if request.method == "POST" and "name" in request.form:
        name = request.form["name"]
        user = User.objects.filter(username=name).first()
        if user:
            if flask_bcrypt.check_password_hash(user['password'], request.form['password']):
                if user.is_active:
                    if request.form['remember'] == 'false':
                        remember = False
                    elif request.form['remember'] == 'true':
                        remember = True
                    if login_user(user, remember=remember):
                        return jsonify(result="success")
                    else:
                        return Response("登陆失败！")
                else:
                    return Response("等待管理员验证中......")
            else:
                return Response("密码错误")
        else:
            return Response("该用户不存在")
    return Response('Method not Allowed')

@app.route("/register/", methods=["POST"])
def register():
    """
    注册新用户
    :return:
    """
    if request.method == "POST":
        email = request.form['email']
        name = request.form['name']
        password = request.form['password']
        if User.objects.filter(email=email):
            return Response("该邮箱已注册！")
        else:
            if User.objects.filter(username=name):
                return Response("该用户名已存在！")
            else:
                password_hask = flask_bcrypt.generate_password_hash(password)
                user = User(email=email, password=password_hask, username=name)
                try:
                    user.save()
                    return jsonify(result="success")
                except Exception as e:
                    return Response("注册失败")
    return Response("Method not Allowed")


@app.route('/')
@login_required
def index():
    return render_template("index.html")

@app.route("/current/")
@login_required
def current():
    c = current_user
    # print c.email
    # # d = json_util.dumps(c._collection_obj.find(c._query))
    # print c.to_json()
    return jsonify(loginuser(c))

@app.route("/logout/")
@login_required
def logout():
    """
    注销登陆
    :return:
    """
    logout_user()
    return redirect('/loginhtml/')


@lm.unauthorized_handler
def unauthorized_callback():
    """
    是否登陆验证
    :return:
    """
    return redirect('/loginhtml/')

@app.route('/registerhtml/')
def registerredict():
    """
    进入注册页面
    :return:
    """
    return render_template('modules/register/register.html')

@app.route('/loginhtml/')
def loginredict():
    """
    访问登陆界面
    :return:
    """
    return render_template('modules/login/login.html')
    # return render_template('login.html')

@app.route("/changepass/", methods=["POST"])
@fresh_login_required
def changepassword():
    """
    修改密码
    :return:
    """
    if request.method == "POST":
        user = current_user
        if user and flask_bcrypt.check_password_hash(user['password'], request.form['password']):
            user.password = flask_bcrypt.generate_password_hash(request.form["newpassword"])
            user.save()
            return jsonify(result="success")
        else:
            return Response("原密码错误！！")
    else:
        return Response("Method not Allowed")

@app.route('/username/', methods=['POST'])
def username():
    """
    验证用户名是否存在
    :return:
    """
    if request.method == "POST":
        username = request.form['name']
        if User.objects.filter(username=username):
            return Response("该用户已存在！")
        else:
            return jsonify(result="success")

@app.route('/email/', methods=['POST'])
def email():
    """
    验证邮箱是否存在
    :return:
    """
    if request.method == "POST":
        email = request.form['email']
        if User.objects.filter(email=email):
            return Response('该邮箱已注册！')
        else:
            return jsonify(result="success")

@app.route('/fixpassword/')
def fixpassword():
    return render_template('modules/login/fixPassword.html')