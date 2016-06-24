# -*- coding: utf-8 -*-
__author__ = 'Mesogene'
from App.models import *
from flask.ext.mongorest.resources import Resource
from flask.ext.mongorest import operators
from bson import ObjectId


class CHDLevel1Resource(Resource):
    document = CHDLevel1
class CHDLevel2clinicalResource(Resource):
    document = CHDLevel2clinical
class CHDLevel2tongueResource(Resource):
    document = CHDLevel2tongue
class CHDLevel2pulseResource(Resource):
    document = CHDLevel2pulse


class CHDhuLevel1Resource(Resource):
    document = CHDhuLevel1
class CHDhuLevel2clinicalResource(Resource):
    document = CHDhuLevel2clinical
class CHDhuLevel2tongueResource(Resource):
    document = CHDhuLevel2tongue
class PhlegmLevel1Resource(Resource):
    document = PhlegmLevel1
class PhlegmLevel2clinicalResource(Resource):
    document = PhlegmLevel2clinical
class PhlegmLevel2tongueResource(Resource):
    document = PhlegmLevel2tongue
class PhlegmLevel2pulseResource(Resource):
    document = PhlegmLevel2pulse


class LabelResource(Resource):
    document = Label
class LipiddataResource(Resource):
    document = Lipiddata
class InflammationResource(Resource):
    document = Inflammation
class CelldamageResource(Resource):
    document = Celldamage
class BloodfunctionResource(Resource):
    document = Bloodfunction
class SNPdataResource(Resource):
    document = SNPdata
class MetabolismResource(Resource):
    document = Metabolism
class GeneResource(Resource):
    document = Gene


class ChdResource(Resource):
    document = CHDdata
class PeopleResource(Resource):
    document = Peopledata
    # fields = ['id', 'name', 'group', 'gender', 'age', 'national', 'region', 'bloodpressure', 'bloodsugar']
    filters = {
        'name': [operators.Contains, operators.Exact],
    }
class SAQResource(Resource):
    document = SAQdata
class Sf36Resource(Resource):
    document = Sf36data


"""
德尔菲四诊
"""
class WindResource(Resource):
    document = Windresistance
    related_resources = {
        'windother1': LabelResource,
        'windother2': LabelResource,
        'windother3': LabelResource,
        'windother4': LabelResource,
        'windother5': LabelResource,
    }
class FireResource(Resource):
    document = Fire
    related_resources = {
        'fireother1': LabelResource,
        'fireother2': LabelResource,
        'fireother3': LabelResource,
        'fireother4': LabelResource,
        'fireother5': LabelResource,
    }
class PoisonResource(Resource):
    document = Poison
    related_resources = {
        'poisonother1': LabelResource,
        'poisonother2': LabelResource,
        'poisonother3': LabelResource,
        'poisonother4': LabelResource,
        'poisonother5': LabelResource,
    }
class AhpindicatorsResource(Resource):
    """
    理化指标
    """
    document = Ahpindicators
    related_resources = {
        'ahpother1': LabelResource,
        'ahpother2': LabelResource,
        'ahpother3': LabelResource,
        'ahpother4': LabelResource,
        'ahpother5': LabelResource,
    }


class ExpertinfoResource(Resource):
    """
    专家信息
    """
    document = Expertinfo
    filters = {
        'expertname': [operators.Contains, operators.Exact],
        'filltime': [operators.Lte, operators.Gte, operators.Exact, operators.Lt, operators.Gt],
    }


class Literatureresource(Resource):
    """
    文献Resource
    """
    # 文件对应Literature
    document = Literature
    # 过滤条件设置
    filters = {
        'literaturename': [operators.Contains, operators.Exact],
        'authorname': [operators.Contains, operators.Exact],
        'interlink': [operators.Contains, operators.Exact],
    }
    #新加字段
    related_resources = {
        'input3': LabelResource,
        'input4': LabelResource,
        'input5': LabelResource,
    }
    # def update_object(self, obj, data=None, save=True, parent_resources=None):
    #     print "ssssssssssssssss"
    #     data = data or self.data
    #     print data
    #     print data.keys()
    #     print self.get_fields()
    #     print self.document._fields.keys()
    #     print data['addone']
    #     # print obj['addone']
    #     for key in data.keys():
    #         if key not in self.get_fields():
    #             self.get_fields().append(key.encode('utf-8'))
    #     print self.get_fields()
    #     print self.document._fields.keys()
    #     print parent_resources
    #     for field in self.get_fields():
    #         print field
    #         if field not in self.readonly_fields and field in data:
    #             print field
    #             if field in self._related_resources:
    #                 field_instance = getattr(self.document, field)
    #                 if isinstance(field_instance, ReferenceField) or (isinstance(field_instance, ListField) and isinstance(field_instance.field, ReferenceField)):
    #                     continue # Not implemented.
    #             #setattr(obj, field, {"value": "123"})#self._get('update_object', data, field, parent_resources=parent_resources))
    #             obj[field] = data[field]
    #     if save:
    #         self._save(obj)
    #     return obj

class Userresource(Resource):
    """
    用户
    """
    document = User
    fields = ['id', 'username', 'email', 'is_admin', 'is_active', 'is_subjectone', 'is_subjecttwo', 'is_subjectthree']
    filters = {
        'username': [operators.Contains, operators.Exact],
        'email': [operators.Contains, operators.Exact],
    }

class Delphiresource(Resource):
    """
    德尔菲
    """
    document = Delphi
    filters = {
        'filltime': [operators.Lte, operators.Gte, operators.Exact, operators.Lt, operators.Gt],
        'chest': [operators.Contains, operators.Exact],
        'author': [operators.Exact],

    }
    related_resources = {
        'other1': LabelResource,
        'other2': LabelResource,
        'other3': LabelResource,
        'other4': LabelResource,
        'other5': LabelResource,
        'author': Userresource,
    }
    def create_object(self, data=None, save=True, parent_resources=None):
        kwargs = {}
        data = data or self.data
        self.get_fields().remove('author')
        d = self.document._fields.keys()
        d.remove('author')
        for field in self.get_fields():
            if field in d and field not in self.readonly_fields and (type(data) is list or (type(data) is dict and data.has_key(field))):
                kwargs[field] = self._get('create_object', data, field, parent_resources=parent_resources)
        kwargs['author'] = User.objects.filter(id=ObjectId(data['author'])).first()
        obj = self.document(**kwargs)
        if save:
            self._save(obj)
        return obj


class ClinicalqueueResource(Resource):
    """
    临床队列
    """
    document = Clinicalqueue
    filters = {
        'filltime': [operators.Lte, operators.Gte],
        'author': [operators.Exact],
        # 'peopledata': [operators.Exact],
    }
    related_resources = {
        'chd': ChdResource,
        'saq': SAQResource,
        'lipiddata': LipiddataResource,
        'inflammation': InflammationResource,
        'celldamage': CelldamageResource,
        'bloodfunction': BloodfunctionResource,
        'snp': SNPdataResource,
        'metabolism': MetabolismResource,
        'gene': GeneResource,
        'sf36': Sf36Resource,
        'author': Userresource,
        'peopledata': PeopleResource,
    }
    def create_object(self, data=None, save=True, parent_resources=None):
        kwargs = {}
        data = data or self.data
        self.get_fields().remove('author')
        self.get_fields().remove('peopledata')
        d = self.document._fields.keys()
        d.remove('author')
        d.remove('peopledata')
        for field in self.get_fields():
            if field in d and field not in self.readonly_fields and (type(data) is list or (type(data) is dict and data.has_key(field))):
                kwargs[field] = self._get('create_object', data, field, parent_resources=parent_resources)
        kwargs['author'] = User.objects.filter(id=ObjectId(data['author'])).first()
        kwargs['peopledata'] = Peopledata.objects.filter(id=ObjectId(data['peopledata'])).first()
        obj = self.document(**kwargs)
        if save:
            self._save(obj)
        return obj

class AhpResource(Resource):
    """
    层次分析法：冠心病痰湿证
    """
    document = Ahptanshidata
    filters = {
        'filltime': [operators.Lte, operators.Gte],
        'author': [operators.Exact],
        'expert': [operators.Exact],
    }
    related_resources = {
        'chdlevel1': CHDLevel1Resource,
        'chdlevel2clinical': CHDLevel2clinicalResource,
        'chdlevel2tongue': CHDLevel2tongueResource,
        'chdlevel2pulse': CHDLevel2pulseResource,
        'author': Userresource,
        'expert': ExpertinfoResource,
        'indicators': AhpindicatorsResource,
    }
    def create_object(self, data=None, save=True, parent_resources=None):
        kwargs = {}
        data = data or self.data
        self.get_fields().remove('author')
        self.get_fields().remove('expert')
        d = self.document._fields.keys()
        d.remove('author')
        d.remove('expert')
        for field in self.get_fields():
            if field in d and field not in self.readonly_fields and (type(data) is list or (type(data) is dict and data.has_key(field))):
                kwargs[field] = self._get('create_object', data, field, parent_resources=parent_resources)
        kwargs['author'] = User.objects.filter(id=ObjectId(data['author'])).first()
        kwargs['expert'] = Expertinfo.objects.filter(id=ObjectId(data['expert'])).first()
        obj = self.document(**kwargs)
        if save:
            self._save(obj)
        return obj

class AhphuResource(Resource):
    """
    层次分析法：冠心病痰瘀互结证
    """
    document = Ahpdata
    filters = {
        'filltime': [operators.Lte, operators.Gte],
        'author': [operators.Exact],
        'expert': [operators.Exact],
    }
    related_resources = {
        'chdlevel1': CHDhuLevel1Resource,
        'chdlevel2clinical': CHDhuLevel2clinicalResource,
        'chdlevel2tongue': CHDhuLevel2tongueResource,
        'phlegmlevel1': PhlegmLevel1Resource,
        'phlegmlevel2clinical': PhlegmLevel2clinicalResource,
        'phlegmlevel2tongue': PhlegmLevel2tongueResource,
        'phlegmlevel2pulse': PhlegmLevel2pulseResource,
        'author': Userresource,
        'expert': ExpertinfoResource,
    }
    def create_object(self, data=None, save=True, parent_resources=None):
        kwargs = {}
        data = data or self.data
        self.get_fields().remove('author')
        self.get_fields().remove('expert')
        d = self.document._fields.keys()
        d.remove('author')
        d.remove('expert')
        for field in self.get_fields():
            if field in d and field not in self.readonly_fields and (type(data) is list or (type(data) is dict and data.has_key(field))):
                kwargs[field] = self._get('create_object', data, field, parent_resources=parent_resources)
        kwargs['author'] = User.objects.filter(id=ObjectId(data['author'])).first()
        kwargs['expert'] = Expertinfo.objects.filter(id=ObjectId(data['expert'])).first()
        obj = self.document(**kwargs)
        if save:
            self._save(obj)
        return obj


class DanloupianResource(Resource):
    """
    用户
    """
    document = DanLouPian
    filters = {
        'ingredient': [operators.Contains, operators.Exact],
        'ingredientzh': [operators.Contains, operators.Exact],
        'cas': [operators.Contains, operators.Exact],
        'originalplants': [operators.Contains, operators.Exact],
        'reference': [operators.Contains, operators.Exact],
        'note': [operators.Contains, operators.Exact],
    }


class BasisResource(Resource):
    """
    医案数据库
    """
    document = Basis
    filters = {
        'basisname': [operators.Contains, operators.Exact],
        'expertsname': [operators.Contains, operators.Exact],
        'patientname': [operators.Contains, operators.Exact],
        'patientgender': [operators.Contains, operators.Exact],
        'patientage': [operators.Contains, operators.Exact],
        'clinicdate': [operators.Lte, operators.Gte],
        'mainsuit': [operators.Contains, operators.Exact],
        'medicalhistory': [operators.Contains, operators.Exact],
        'westdiagnosis': [operators.Contains, operators.Exact],
        'chdiagnosis': [operators.Contains, operators.Exact],
        'discriminate': [operators.Contains, operators.Exact],
        'prescription': [operators.Contains, operators.Exact],
        'editorial': [operators.Contains, operators.Exact],
    }

class DrugResource(Resource):
    """
    药物基本信息
    """
    document = Drugsinformation
    filters = {
        'genericname': [operators.Contains, operators.Exact],
        'status': [operators.Contains, operators.Exact],
        'formula': [operators.Contains, operators.Exact],
        'smile': [operators.Contains, operators.Exact],
        'pubchemid': [operators.Contains, operators.Exact],
        'indications': [operators.Contains, operators.Exact],
    }

class GeneInrofationResource(Resource):
    """
    基因基本信息
    """
    document = Geneinformation
    filters = {
        'genesymbol': [operators.Contains, operators.Exact],
        'genename': [operators.Contains, operators.Exact],
        'status': [operators.Contains, operators.Exact],
        'locustype': [operators.Contains, operators.Exact],
        'locusgroup': [operators.Contains, operators.Exact],
        'previoussymbols': [operators.Contains, operators.Exact],
        'previousname': [operators.Contains, operators.Exact],
        'synonyms': [operators.Contains, operators.Exact],
        'chrocmosome': [operators.Contains, operators.Exact],
        'entrezid': [operators.Contains, operators.Exact],
    }

class DiseaseResource(Resource):
    """
    疾病基本信息
    """
    document = Disease
    filters = {
        'diseasename': [operators.Contains, operators.Exact],
        'description': [operators.Contains, operators.Exact],
    }

class PathwayResource(Resource):
    """
    通路基本信息
    """
    document = Pathways
    filters = {
        'pathwayname': [operators.Contains, operators.Exact],
        'hyperlink': [operators.Contains, operators.Exact],
        'source1': [operators.Contains, operators.Exact],
        'source2': [operators.Contains, operators.Exact],
        'source3': [operators.Contains, operators.Exact],
        'source4': [operators.Contains, operators.Exact],
        'category': [operators.Contains, operators.Exact],
        'description': [operators.Contains, operators.Exact],
    }

class DrugtodrugResource(Resource):
    """
    药物-药物相互作用
    """
    document = Drugtodrug
    filters = {
        'druganame': [operators.Contains, operators.Exact],
        'drugbname': [operators.Contains, operators.Exact],
        'description': [operators.Contains, operators.Exact],
        'drugbid': [operators.Exact],
        'drugaid': [operators.Exact],
    }

class DrugtogeneResource(Resource):
    """
    药物-基因关联
    """
    document = Drugtogene
    filters = {
        'drugname': [operators.Contains, operators.Exact],
        'genename': [operators.Contains, operators.Exact],
        'interactiontype': [operators.Contains, operators.Exact],
        'source': [operators.Contains, operators.Exact],
        'species': [operators.Contains, operators.Exact],
        'genesymbol': [operators.Contains, operators.Exact],
        'drugid': [operators.Exact],
        'geneid': [operators.Exact],
    }

class DiseasetogeneResource(Resource):
    """
    疾病-基因关联
    """
    document = Diseasetogene
    filters = {
        'diseasename': [operators.Contains, operators.Exact],
        'genename': [operators.Contains, operators.Exact],
        'associationtype': [operators.Contains, operators.Exact],
        'sourcedatabase': [operators.Contains, operators.Exact],
        'genesymbol': [operators.Contains, operators.Exact],
        'diseaseid': [operators.Exact],
        'geneid': [operators.Exact],
    }

class GenetogeneResource(Resource):
    """
    基因-基因关联
    """
    document = Genetogene
    filters = {
        'geneaname': [operators.Contains, operators.Exact],
        'genebname': [operators.Contains, operators.Exact],
        'detectionmethods': [operators.Contains, operators.Exact],
        'interactiontype': [operators.Contains, operators.Exact],
        'sourcedatabase': [operators.Contains, operators.Exact],
        'geneaid': [operators.Exact],
        'genebid': [operators.Exact],
    }

class DrugwithdrugResource(Resource):
    """
    药物组合
    """
    document = Drugwithdrug
    filters = {
        'drugcombinationdosage': [operators.Contains, operators.Exact],
        'drugcombinationformulation': [operators.Contains, operators.Exact],
        'drugcombinationids': [operators.Exact],
        'disease': [operators.Contains, operators.Exact],
        'effect': [operators.Contains, operators.Exact],
        'synergy': [operators.Contains, operators.Exact],
        'clinicalphase': [operators.Contains, operators.Exact],
        'resource': [operators.Contains, operators.Exact],
        'ref': [operators.Contains, operators.Exact],
        'sideeffect': [operators.Contains, operators.Exact],
    }



class DelphiFourResource(Resource):
    """
    德尔菲四诊
    """
    document = DelphiFour
    filters = {
        'filltime': [operators.Lte, operators.Gte, operators.Exact, operators.Lt, operators.Gt],
        'expertname': [operators.Contains, operators.Exact],
        'expert': [operators.Exact],
        'author': [operators.Exact],

    }
    related_resources = {
        'wind': WindResource,
        'fire': FireResource,
        'poison': PoisonResource,
        'author': Userresource,
        'expert': ExpertinfoResource,
    }
    def create_object(self, data=None, save=True, parent_resources=None):
        kwargs = {}
        data = data or self.data
        self.get_fields().remove('author')
        self.get_fields().remove('expert')
        d = self.document._fields.keys()
        d.remove('author')
        d.remove('expert')
        for field in self.get_fields():
            if field in d and field not in self.readonly_fields and (type(data) is list or (type(data) is dict and data.has_key(field))):
                kwargs[field] = self._get('create_object', data, field, parent_resources=parent_resources)
        kwargs['author'] = User.objects.filter(id=ObjectId(data['author'])).first()
        kwargs['expert'] = Expertinfo.objects.filter(id=ObjectId(data['expert'])).first()
        obj = self.document(**kwargs)
        if save:
            self._save(obj)
        return obj


