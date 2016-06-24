# -*- coding: utf-8 -*-
__author__ = 'Mesogene'
from App import app
from flask.ext.script import Manager, Server
from App.models import User, Literature

app = app
manager = Manager(app)
manager.add_command("runserver",
         Server(host='127.0.0.1', port=5000, use_debugger=True))
@manager.command
def save_todo():
    literature = Literature(
        literaturename="碘缺乏病的症候及预防",
        authorname="杨佳",
        interlink="http://www.cnki.com.cn/Article/CJFDTotal-GJYW2000Z1025.htm"
    )
    literature.save()

if __name__ == '__main__':
    app.run()