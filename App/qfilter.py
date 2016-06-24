# -*- coding: utf-8 -*-
from flask.ext.mongorest.views import ResourceView
from App.resources import *
from flask.ext.mongorest import methods
from App import api
from flask import request
from mongoengine import Q


@api.register(name='literaturefilter', url='/litfilter/')
class Litfilterview(ResourceView):
    """
    全部字段filter接口
    """
    # resource为文献resource
    resource = Literatureresource
    # 允许增删改查方法访问改接口
    methods = [methods.List, methods.Fetch]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        strr = request.args.to_dict()['value']
        if pk is None:
            objs = self._resource.get_objects()\
                .filter(
                Q(literaturename__contains=strr) | Q(authorname__contains=strr) | Q(interlink__contains=strr)
            )
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret

@api.register(name='active', url='/active/')
class Userview(ResourceView):
    """
    用户
    """
    resource = Userresource
    methods = [methods.List, methods.Fetch]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        if pk is None:
            c = request.args.values()[0]
            if c == 'true' or c == 'True':
                c = True
            elif c == 'false' or c == 'False':
                c = False
            objs = User.objects.filter(is_active=c)
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})

            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret

@api.register(name='basisfilter', url='/basisfilter/')
class Basisfilterview(ResourceView):
    """
    医案数据库全部字段filter接口
    """
    # resource为文献resource
    resource = BasisResource
    # 允许增删改查方法访问改接口
    methods = [methods.List, methods.Fetch]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        strr = request.args.to_dict()['value']
        if pk is None:
            objs = self._resource.get_objects()\
                .filter(
                Q(basisname__contains=strr) | Q(expertsname__contains=strr) | Q(patientname__contains=strr) |
                Q(patientgender__contains=strr) | Q(patientage__contains=strr) | Q(mainsuit__contains=strr) |
                Q(medicalhistory__contains=strr) | Q(westdiagnosis__contains=strr) | Q(chdiagnosis__contains=strr) |
                Q(discriminate__contains=strr) | Q(prescription__contains=strr) | Q(editorial__contains=strr)
            )
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret

@api.register(name='drugtodrugfilter', url='/drugtodrugfilter/')
class DrugtodrugfilterView(ResourceView):
    """
    药物-药物相互作用
    """
    resource = DrugtodrugResource
    methods = [methods.Fetch, methods.List]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        strr = request.args.to_dict()['value']
        if pk is None:
            objs = self._resource.get_objects()\
                .filter(
                Q(drugaid=ObjectId(strr)) | Q(drugbid=ObjectId(strr))
            )
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret

@api.register(name='genetogenefilter', url='/genetogenefilter/')
class GenetotenefilterView(ResourceView):
    """
    基因-基因关联
    """
    resource = GenetogeneResource
    methods = [methods.Fetch, methods.List]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        strr = request.args.to_dict()['value']
        if pk is None:
            objs = self._resource.get_objects()\
                .filter(
                Q(geneaid=ObjectId(strr)) | Q(genebid=ObjectId(strr))
            )
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret


@api.register(name='drugtodrugsearch', url='/drugtodrugsearch/')
class DrugtodrugsearchView(ResourceView):
    """
    药物-药物相互作用
    """
    resource = DrugtodrugResource
    methods = [methods.Fetch, methods.List]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        strr = request.args.to_dict()['value']
        if pk is None:
            objs = self._resource.get_objects()\
                .filter(
                Q(druganame__contains=strr) | Q(drugbname__contains=strr) | Q(description__contains=strr)
            )
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret


@api.register(name='drugtogenesearch', url='/drugtogenesearch/')
class DrugtogenesearchView(ResourceView):
    """
    药物-基因关联
    """
    resource = DrugtogeneResource
    methods = [methods.Fetch, methods.List]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        strr = request.args.to_dict()['value']
        if pk is None:
            objs = self._resource.get_objects()\
                .filter(
                Q(drugname__contains=strr) | Q(genename__contains=strr) | Q(interactiontype__contains=strr) |
                Q(source__contains=strr) | Q(species__contains=strr) | Q(genesymbol__contains=strr) |
                Q(geneentrez__contains=strr)
            )
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret

@api.register(name='diseasetogenesearch', url='/diseasetogenesearch/')
class DiseasetogenesearchView(ResourceView):
    """
    疾病-基因关联
    """
    resource = DiseasetogeneResource
    methods = [methods.Fetch, methods.List]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        strr = request.args.to_dict()['value']
        if pk is None:
            objs = self._resource.get_objects()\
                .filter(
                Q(diseasename__contains=strr) | Q(genename__contains=strr) | Q(associationtype__contains=strr) |
                Q(sourcedatabase__contains=strr) | Q(genesymbol__contains=strr)
            )
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret


@api.register(name='genetogenesearch', url='/genetogenesearch/')
class GenetogenesearchView(ResourceView):
    """
    基因-基因关联
    """
    resource = GenetogeneResource
    methods = [methods.Fetch, methods.List]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        strr = request.args.to_dict()['value']
        if pk is None:
            objs = self._resource.get_objects()\
                .filter(
                Q(geneaname__contains=strr) | Q(genebname__contains=strr) | Q(detectionmethods__contains=strr) |
                Q(interactiontype__contains=strr) | Q(sourcedatabase__contains=strr)
            )
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret

@api.register(name='drugwithdrugsearch', url='/drugwithdrugsearch/')
class DrugwithdrugsearchView(ResourceView):
    """
    药物组合
    """
    resource = DrugwithdrugResource
    methods = [methods.Fetch, methods.List]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        strr = request.args.to_dict()['value']
        if pk is None:
            objs = self._resource.get_objects()\
                .filter(
                Q(drugcombinationdosage__contains=strr) | Q(drugcombinationformulation__contains=strr) | Q(disease__contains=strr) |
                Q(effect__contains=strr) | Q(synergy__contains=strr) | Q(clinicalphase__contains=strr) |
                Q(resource__contains=strr) | Q(ref__contains=strr) | Q(sideeffect__contains=strr)
            )
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret
