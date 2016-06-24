# -*- coding: utf-8 -*-
from flask import request

__author__ = 'Mesogene'
from App import api
from App.resources import *
from flask.ext.mongorest.views import ResourceView
from flask.ext.mongorest import methods
from App.models import User

@api.register(name='literature', url='/literature/')
class Literatureview(ResourceView):
    # resource为文献resource
    resource = Literatureresource
    # 允许增删改查方法访问改接口
    methods = [methods.Create, methods.Delete, methods.Update, methods.List, methods.Fetch]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        if pk is None:
            objs = self._resource.get_objects()
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret



@api.register(name='delphi', url='/delphi/')
class Delphiview(ResourceView):
    """
    德尔菲
    """
    resource = Delphiresource
    methods = [methods.Create, methods.Delete, methods.Update, methods.List, methods.Fetch]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        if pk is None:
            objs = self._resource.get_objects()
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret

@api.register(name='alluser', url='/alluser/')
class Userview(ResourceView):
    """
    用户
    """
    resource = Userresource
    methods = [methods.Create, methods.Update, methods.List, methods.Fetch]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        if pk is None:
            objs = self._resource.get_objects()
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret


@api.register(name='people', url='/people/')
class PeopledataView(ResourceView):
    """
    人口学资料
    """
    resource = PeopleResource
    methods = [methods.Create, methods.Delete, methods.Update, methods.List, methods.Fetch]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        if pk is None:
            objs = self._resource.get_objects()
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret

@api.register(name='clinicalqueue', url='/cliqueue/')
class ClinicalqueueView(ResourceView):
    """
    临床队列
    """
    resource = ClinicalqueueResource
    methods = [methods.Create, methods.Delete, methods.Update, methods.List, methods.Fetch]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        if pk is None:
            objs = self._resource.get_objects()
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret

@api.register(name='ahpdata', url='/ahptanshi/')
class AhpdataView(ResourceView):
    """
    层次分析法:冠心病痰湿证
    """
    resource = AhpResource
    methods = [methods.Create, methods.Delete, methods.Update, methods.List, methods.Fetch]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        if pk is None:
            objs = self._resource.get_objects()
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret


@api.register(name='ahphujie', url='/ahp/')
class AhphujiedataView(ResourceView):
    """
    层次分析法:冠心病痰瘀互结证
    """
    resource = AhphuResource
    methods = [methods.Create, methods.Delete, methods.Update, methods.List, methods.Fetch]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        if pk is None:
            objs = self._resource.get_objects()
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret

@api.register(name='danloupian', url='/dan/')
class DanloupianView(ResourceView):
    resource = DanloupianResource
    methods = [methods.Create, methods.Delete, methods.Update, methods.List, methods.Fetch]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        if pk is None:
            objs = self._resource.get_objects()
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret

@api.register(name='basis', url='/basis/')
class BasisView(ResourceView):
    """
    医案数据库
    """
    # resource为文献resource
    resource = BasisResource
    # 允许增删改查方法访问改接口
    methods = [methods.Create, methods.Delete, methods.Update, methods.List, methods.Fetch]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        if pk is None:
            objs = self._resource.get_objects()
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret


@api.register(name='diseaseinfo', url='/diseaseinfo/')
class DiseaseView(ResourceView):
    """
    疾病基本信息
    """
    resource = DiseaseResource
    methods = [methods.Create, methods.Delete, methods.Update, methods.Fetch, methods.List]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        if pk is None:
            objs = self._resource.get_objects()
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret


@api.register(name='drugsinformation', url='/durgsinfor/')
class DrugsView(ResourceView):
    """
    药物基本信息
    """
    resource = DrugResource
    methods = [methods.Create, methods.Delete, methods.Update, methods.Fetch, methods.List]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        if pk is None:
            objs = self._resource.get_objects()
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret

@api.register(name='geneinformation', url='/geneinfor/')
class GeneInformationView(ResourceView):
    """
    基因基本信息
    """
    resource = GeneInrofationResource
    methods = [methods.Create, methods.Delete, methods.Update, methods.Fetch, methods.List]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        if pk is None:
            objs = self._resource.get_objects()
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret

@api.register(name='pathwayinformation', url='/pahtwayinfor/')
class PahtwayView(ResourceView):
    """
    通路基本信息
    """
    resource = PathwayResource
    methods = [methods.Create, methods.Delete, methods.Update, methods.Fetch, methods.List]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        if pk is None:
            objs = self._resource.get_objects()
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret

@api.register(name='drugtodrug', url='/drugtodrug/')
class DrugtodrugView(ResourceView):
    """
    药物-药物相互作用
    """
    resource = DrugtodrugResource
    methods = [methods.Create, methods.Delete, methods.Update, methods.Fetch, methods.List]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        if pk is None:
            objs = self._resource.get_objects()
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret

@api.register(name='drugtogene', url='/drugtogene/')
class DrugtogeneView(ResourceView):
    """
    药物-基因关联
    """
    resource = DrugtogeneResource
    methods = [methods.Create, methods.Delete, methods.Update, methods.Fetch, methods.List]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        if pk is None:
            objs = self._resource.get_objects()
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret

@api.register(name='diseasetogene', url='/diseasetogene/')
class DiseasetogeneView(ResourceView):
    """
    疾病-基因关联
    """
    resource = DiseasetogeneResource
    methods = [methods.Create, methods.Delete, methods.Update, methods.Fetch, methods.List]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        if pk is None:
            objs = self._resource.get_objects()
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret

@api.register(name='genetogene', url='/genetogene/')
class GenetogeneView(ResourceView):
    """
    基因-基因关联
    """
    resource = GenetogeneResource
    methods = [methods.Create, methods.Delete, methods.Update, methods.Fetch, methods.List]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        if pk is None:
            objs = self._resource.get_objects()
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret

@api.register(name='drugwithdrug', url='/drugwithdrug/')
class DrugwithdrugView(ResourceView):
    """
    药物组合
    """
    resource = DrugwithdrugResource
    methods = [methods.Create, methods.Delete, methods.Update, methods.Fetch, methods.List]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        if pk is None:
            objs = self._resource.get_objects()
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret

@api.register(name='expert', url='/expert/')
class ExpertView(ResourceView):
    """
    专家信息
    """
    resource = ExpertinfoResource
    methods = [methods.Create, methods.Delete, methods.Update, methods.List, methods.Fetch]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        if pk is None:
            objs = self._resource.get_objects()
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret


@api.register(name='delphifour', url='/delphifour/')
class DelphiFourview(ResourceView):
    """
    德尔菲四诊
    """
    resource = DelphiFourResource
    methods = [methods.Create, methods.Delete, methods.Update, methods.List, methods.Fetch]
    def get(self, **kwargs):
        pk = kwargs.pop('pk', None)
        if pk is None:
            objs = self._resource.get_objects()
            ret = [self._resource.serialize(obj, request.args) for obj in objs]
            ret.append({'count': objs.count()})
            return {'data': ret}
        else:
            obj = self._resource.get_object(pk)
            ret = self._resource.serialize(obj, request.args)
            return ret