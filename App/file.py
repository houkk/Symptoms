# -*- coding: utf-8 -*-
__author__ = 'Mesogene'
from flask import request, jsonify, Response, make_response, render_template
import pyexcel as pe
from flask.ext import excel
import pyexcel.ext.xls
import pyexcel.ext.xlsx
import simplejson
from StringIO import StringIO
from App.models import *
from App import app

@app.route("/upload/", methods=["POST"])
def uplaod_file():
    if request.method == 'POST':
        try:
            ac = request.get_array(field_name='file')
            result = ac[1:]
            for res in result:
                liter = []
                for re in res:
                    if type(re) == float:
                        liter.append(str(re))
                    else:
                        liter.append(re)
                print liter
                literature = Literature(literaturename=liter[0], authorname=liter[1], interlink=liter[2])
                literature.save()
            return jsonify({"result": "success"})
        except:
            return Response('fail')


@app.route('/test/')
def te():
    e = [u'文献名', u'作者', u'链接']
    a = []
    b = []
    b.append(e)
    c = Literature.objects.all()
    for d in c:
        a.append(d['literaturename'])
        a.append(d['authorname'])
        a.append(d['interlink'])
        print a
        b.append(a)
        a = []
    sheet = pe.Sheet(b)
    io = StringIO()
    sheet.save_to_memory("xls", io)
    output = make_response(io.getvalue())
    output.headers["Content-Disposition"] = "attachment; filename=aa.xls"
    output.headers["Content-type"] = "text/xls"
    return output

data = [
    [u'文献名', u'作者', u'链接'],
]
@app.route('/download/')
def download():
    sheet = pe.Sheet(data)
    io = StringIO()
    sheet.save_to_memory("xls", io)
    output = make_response(io.getvalue())
    output.headers["Content-Disposition"] = "attachment; filename=literature.xls"
    output.headers["Content-type"] = "text/xls"
    return output

@app.route('/basisdown/')
def basisdownload():
    basisdata = [
        [
            u'医案名称', u'专家姓名', u'患者姓名', u'患者性别',
            u'患者年龄', u'就诊日期', u'主诉', u'病史',
            u'西医诊断', u'中医诊断', u'辨证', u'处方',
            u'按语'
        ],
    ]
    sheet = pe.Sheet(basisdata)
    io = StringIO()
    sheet.save_to_memory("xls", io)
    output = make_response(io.getvalue())
    output.headers["Content-Disposition"] = "attachment; filename=basis.xls"
    output.headers["Content-type"] = "text/xls"
    return output

@app.route('/basisupload/', methods=['POST'])
def basisupload():
    if request.method == 'POST':
        try:
            ac = request.get_array(field_name='file')
            result = ac[1:]
            for resu in result:
                res = []
                for re in resu:
                    if type(re) == float:
                        res.append(str(re))
                    else:
                        res.append(re)
                print res
                basis = Basis(
                    basisname=res[0], expertsname=res[1], patientname=res[2],
                    patientgender=res[3], patientage=res[4], clinicdate=res[5],
                    mainsuit=res[6], medicalhistory=res[7], westdiagnosis=res[8],
                    chdiagnosis=res[9], discriminate=res[10], prescription=res[11],
                    editorial=res[12]
                )
                basis.save()

            return jsonify({"result": "success"})
        except:
            return Response('fail')



