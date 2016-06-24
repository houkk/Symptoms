# -*- coding: utf-8 -*-
__author__ = 'Mesogene'
import datetime
from mongoengine import *
from App import db

class User(db.Document):
    # id = db.IntField(primary_key=True)
    username = db.StringField(max_length=64, unique=True)
    email = db.StringField(max_length=120, unique=True)
    password = db.StringField(max_length=120)
    is_admin = db.BooleanField(default=False)
    is_active = db.BooleanField(default=False)
    is_subjectone = db.BooleanField(default=False)
    is_subjecttwo = db.BooleanField(default=False)
    is_subjectthree = db.BooleanField(default=False)

    def is_authenticated(self):
        return True

    # def is_active(self):
    #     return True

    def is_anonymous(self):
        return False

    def get_id(self):
        try:
            return unicode(self.id)  # python 2
        except NameError:
            return str(self.id)  # python 3

    meta = {
        'ordering': ['-id']
    }

class Label(db.EmbeddedDocument):
    label = db.StringField()
    value = db.StringField()

class Literature(db.DynamicDocument):
    """
    文献
    """
    literaturename = db.StringField(required=True, max_length=50)
    authorname = db.StringField(max_length=20)
    interlink = db.StringField()
    input3 = db.EmbeddedDocumentField(Label)
    input4 = db.EmbeddedDocumentField(Label)
    input5 = db.EmbeddedDocumentField(Label)
    meta = {
        'ordering': ['-id']
    }

class Delphi(db.DynamicDocument):
    """
    德尔菲
    """
    author = db.ReferenceField(User, reverse_delete_rule=DO_NOTHING)
    authorname = StringField(max_length=20)
    # 填写问卷的登陆用户
    chest = db.StringField(max_length=5)
    # 胸闷、胸痛
    bodyfat = db.StringField(max_length=5)
    # 体胖
    bodyheavy = db.StringField(max_length=5)
    # 肢体困重
    mouthstick = db.StringField(max_length=5)
    # 口粘
    lips = db.StringField(max_length=5)
    # 唇青紫
    facedark = db.StringField(max_length=5)
    # 面色晦暗
    tonguepurple = db.StringField(max_length=5)
    # 舌暗紫
    tonguespots = db.StringField(max_length=5)
    # 舌斑点
    tonguevein = db.StringField(max_length=5)
    # 舌脉络青紫
    mossgreasy = db.StringField(max_length=5)
    # 苔腻
    slipperypluse = db.StringField(max_length=5)
    # 脉弦滑
    astringentpulse = db.StringField(max_length=5)
    # 脉弦涩
    other1 = db.EmbeddedDocumentField(Label)
    other2 = db.EmbeddedDocumentField(Label)
    other3 = db.EmbeddedDocumentField(Label)
    other4 = db.EmbeddedDocumentField(Label)
    other5 = db.EmbeddedDocumentField(Label)
    choice1 = db.BooleanField(default=False)
    review1 = db.StringField()
    choice2 = db.BooleanField(default=False)
    review2 = db.StringField()
    choice3 = db.BooleanField(default=False)
    review3 = db.StringField()
    choice4 = db.BooleanField(default=False)
    review4 = db.StringField()
    habits = db.StringField()
    filltime = db.DateTimeField(default=datetime.datetime.now())
    meta = {
        'ordering': ['-filltime']
    }

class Peopledata(db.Document):
    """
    人口学资料
    """
    name = db.StringField(max_length=10, unique=True)
    group = db.StringField(max_length=10)
    gender = db.StringField(max_length=10)
    age = db.StringField(max_length=5)
    # 民族
    national = db.StringField(max_length=10)
    # 地区
    region = db.StringField(max_length=50)
    # 血压
    bloodpressure = db.StringField(max_length=20)
    # 空腹血糖
    bloodsugar = db.StringField(max_length=10)

class CHDdata(db.EmbeddedDocument):
    """
    冠心病稳定型心绞痛(痰瘀互结证)证候疗效评价计分表
    """
    # 胸痛(chestpain）频率
    cpfrequency = db.StringField(max_length=5)
    # 胸痛时长
    cplasttime = db.StringField(max_length=5)
    # 胸痛程度
    cpdegree = db.StringField(max_length=5)
    # 胸痛运动耐量
    cpextolerance = db.StringField(max_length=5)
    # 胸闷(chesttightness)频率
    ctgrequency = db.StringField(max_length=5)
    # 胸闷时长
    ctlasttime = db.StringField(max_length=5)
    # 胸闷程度
    ctdegree = db.StringField(max_length=5)
    # 胸闷运动耐量
    ctextolerance = db.StringField(max_length=5)
    # 气短
    shortbreath = db.StringField(max_length=5)
    # 心悸
    heartpalpitations = db.StringField(max_length=5)
    # 肢体沉重
    bodyheavy = db.StringField(max_length=5)
    # 口唇紫暗
    oralpurple = db.StringField(max_length=5)

class SAQdata(db.EmbeddedDocument):
    """
    西雅图心绞痛量表
    """
    # [过去4周内]自己穿衣
    selfdress = StringField(max_length=5)
    # [过去4周内]]室内走路
    walkindoor = db.StringField(max_length=5)
    # [过去4周内]淋浴
    shower = db.StringField(max_length=5)
    # [过去4周内]爬坡或楼梯(三层，不停)
    climbing = db.StringField(max_length=5)
    # [过去4周内]户外活动或提杂物
    outdooravtivities = db.StringField(max_length=5)
    # [过去4周内]]轻快步行一段路 (一公里)
    briskwalking = db.StringField(max_length=5)
    # [过去4周内]慢跑(一公里)
    jogging = db.StringField(max_length=5)
    # [过去4周内]提起或移动重物
    liftheavy = db.StringField(max_length=5)
    # [过去4周内]剧烈运动(如游泳或打球)
    stenuousexercise = db.StringField(max_length=5)
    # 与4周前比较，作最大强度的活动时，胸痛、胸部紧榨感和心绞痛的发作情况
    onset = db.StringField(max_length=5)
    # 过去4周内，胸痛、胸部紧榨感和心绞痛的平均发作次数
    averageattacktimes = db.StringField(max_length=5)
    # 过去4周内，胸痛、胸部紧榨感和心绞痛服用硝基药物(如硝酸甘油)平均次数
    averagedrugstimes = db.StringField(max_length=5)
    # 因胸痛、胸部紧榨感和心绞痛遵守医嘱服药带来的烦恼
    trouble = db.StringField(max_length=5)
    # 对治疗胸痛、胸部紧榨感和心绞痛的各种措施的满意程度
    measuressatisfaction = db.StringField(max_length=5)
    # 对医生就胸痛、胸部紧榨感和心绞痛的解释满意程度
    explainsatisfaction = db.StringField(max_length=5)
    # 总的来说，对目前胸痛、胸部紧榨感和心绞痛的治疗满意程度
    treatmentsatisfaction = db.StringField(max_length=5)
    # 过去4周内，胸痛、胸部紧榨感和心绞痛影响生活乐趣的程度
    saqinfluencedegree = db.StringField(max_length=5)
    # 在您的未来生活中如果还有胸痛、胸部紧榨感和心绞痛，您会感觉怎样
    feel = db.StringField(max_length=5)
    # 对心脏病发作和突然死亡的担心程度
    feardeath = db.StringField(max_length=5)

class Sf36data(db.EmbeddedDocument):
    """
    SF-36量表内容
    """
    # 总体来讲，您的健康状况是
    healthstate = db.StringField(max_length=5)
    # 跟1年以前比您觉得自己的健康状况是
    comparehealth = db.StringField(max_length=5)
    # [健康状况是否限制]重体力活动。如跑步举重、参加剧烈运动等
    limitheavy = db.StringField(max_length=5)
    # [健康状况是否限制]适度的活动。如移动一张桌子、扫地、打太极拳、做简单体操等
    limitmoderate = db.StringField(max_length=5)
    # [健康状况是否限制]手提日用品。如买菜、购物等
    limitdailyproduct = db.StringField(max_length=5)
    # [健康状况是否限制]上几层楼梯
    limitseveralfloors = db.StringField(max_length=5)
    # [健康状况是否限制]上一层楼梯
    limitonefloor = db.StringField(max_length=5)
    # [健康状况是否限制]弯腰、屈膝、下蹲
    limitbend = db.StringField(max_length=5)
    # 健康状况是否限制]步行1500米以上的路程
    limit1500 = db.StringField(max_length=5)
    # [健康状况是否限制]步行1000米的路程
    limit1000 = db.StringField(max_length=5)
    # [健康状况是否限制]步行100米的路程
    limit100 = db.StringField(max_length=5)
    # [健康状况是否限制]自己洗澡、穿衣
    limitshower = db.StringField(max_length=5)
    # [过去4周有无因为身体健康问题而出现]减少了工作或其他活动时间
    healthreducetime = db.StringField(max_length=5)
    # [过去4周有无因为身体健康问题而出现]本来想要做的事情只能完成一部分
    healthcompletepart = db.StringField(max_length=5)
    # [过去4周有无因为身体健康问题而出现]想要干的工作或活动种类受到限制
    healthlimitwork = db.StringField(max_length=5)
    # [过去4周有无因为身体健康问题而出现]完成工作或其他活动困难增多（比如需要额外的努力）
    healthmoredifficulty = db.StringField(max_length=5)
    # [过去4周有无因为情绪问题（如压抑或忧虑）而出现]减少了工作或活动时间
    moodreducetime = db.StringField(max_length=5)
    # [过去4周有无因为情绪问题（如压抑或忧虑）而出现]本来想要做的事情只能完成一部分
    moodcompletepart = db.StringField(max_length=5)
    # [过去4周有无因为情绪问题（如压抑或忧虑）而出现]干事情不如平时仔细
    moodnotcareful = db.StringField(max_length=5)
    # 在过去4个星期里，您的健康或情绪不好在多大程度上影响了您与家人、朋友、邻居或集体的正常社会交往？
    sf36influencedegree = db.StringField(max_length=5)
    # 在过去4个星期里，您有身体疼痛吗？
    physicalpain = db.StringField(max_length=5)
    # 在过去4个星期里，您的身体疼痛影响了您的工作和家务吗？
    influencework = db.StringField(max_length=5)
    # [过去1个月]您觉得生活充实
    enrichment = db.StringField(max_length=5)
    # [过去1个月]您是一个敏感的人
    sensitive = db.StringField(max_length=5)
    # [过去1个月]您的情绪非常不好，什么事都不能使您高兴起来
    badmood = db.StringField(max_length=5)
    # [过去1个月]您的心理很平静
    calmmood = db.StringField(max_length=5)
    # [过去1个月]您做事精力充沛
    fullenergy = db.StringField(max_length=5)
    # [过去1个月]您的情绪低落
    lowmood = db.StringField(max_length=5)
    # [过去1个月]您觉得筋疲力尽
    exhausted = db.StringField(max_length=5)
    # [过去1个月]您是个快乐的人
    happy = db.StringField(max_length=5)
    # [过去1个月]您感觉厌烦
    tired = db.StringField(max_length=5)
    # 不健康影响了您的社会活动（如走亲访友）
    influenceactivity = db.StringField(max_length=5)
    # 我好象比别人容易生病
    easysick = db.StringField(max_length=5)
    # 我跟周围人一样健康
    ashealthy = db.StringField(max_length=5)
    # 我认为我的健康状况在变坏
    badhealth = db.StringField(max_length=5)
    # 我的健康状况非常好
    nicehealth = db.StringField(max_length=5)

class Lipiddata(db.EmbeddedDocument):
    """
    脂质代谢指标
    """
    # 总胆固醇
    totalcholesterol = db.StringField(max_length=10)
    # 甘油三酯
    triglycerides = db.StringField(max_length=10)
    # HDL-C
    hdlc = db.StringField(max_length=10)
    # LDL-C
    ldlc = db.StringField(max_length=10)
    # Apo AI
    apoai = db.StringField(max_length=10)
    # Apo B
    apob = db.StringField(max_length=10)

class Inflammation(EmbeddedDocument):
    """
    炎症介质指标
    """
    # NF-kB
    nfkb = StringField(max_length=10)
    # TNF-a
    tnfa = StringField(max_length=10)
    # IL-1
    il1 = StringField(max_length=10)
    # IL-6
    il6 = StringField(max_length=10)
    # MCP-1
    mcp1 = StringField(max_length=10)
    # sCD40L
    scd40l = StringField(max_length=10)
    # GM-CSF
    gmcsf = StringField(max_length=10)

class Celldamage(EmbeddedDocument):
    """
    内皮细胞损伤指标
    """
    # ET-1
    et1 = StringField(max_length=10)
    # 血管紧张素
    angiotensin = StringField(max_length=10)

class Bloodfunction(EmbeddedDocument):
    """
    凝血功能指标
    """
    # 凝血酶原时间
    pt = StringField(max_length=10)
    # 活动度和比率
    actandrat = StringField(max_length=10)
    # 凝血酶时间
    tt = StringField(max_length=10)
    # 活化部分凝血活酶时间
    aptt = StringField(max_length=10)
    # 纤维蛋白浓度
    fibrinogenlevels = StringField(max_length=10)
    # 反映时间
    reactiontime = StringField(max_length=10)


class SNPdata(EmbeddedDocument):
    """
    SNP基因分型芯片结果
    """
    # 姓名
    name = StringField(max_length=10)
    group = StringField(max_length=10)
    # 位点1
    site1 = StringField(max_length=10)
    # 位点2
    site2 = StringField(max_length=10)
    # 位点3
    site3 = StringField(max_length=10)
    # 位点4
    site4 = StringField(max_length=10)
    # 位点5
    site5 = StringField(max_length=10)

class Metabolism(EmbeddedDocument):
    """
    代谢组
    """
    # 姓名
    name = StringField(max_length=10)
    group = StringField(max_length=10)
    # 代谢产物1
    metabolites1 = StringField(max_length=10)
    # 代谢产物2
    metabolites2 = StringField(max_length=10)
    # 代谢产物3
    metabolites3 = StringField(max_length=10)
    # 代谢产物4
    metabolites4 = StringField(max_length=10)
    # 代谢产物5
    metabolites5 = StringField(max_length=10)


class Gene(EmbeddedDocument):
    """
    基因组
    """
    # 姓名
    name = StringField(max_length=10)
    group = StringField(max_length=10)
    # 基因1
    gene1 = StringField(max_length=10)
    # 基因2
    gene2 = StringField(max_length=10)
    # 基因3
    gene3 = StringField(max_length=10)
    # 基因4
    gene4 = StringField(max_length=10)
    # 基因5
    gene5 = StringField(max_length=10)



class Clinicalqueue(db.DynamicDocument):
    """
    临床队列研究数据
    """
    # 填写用户
    author = db.ReferenceField(User, reverse_delete_rule=DO_NOTHING)
    authorname = StringField(max_length=20)
    filltime = db.DateTimeField(default=datetime.datetime.now())
    peopledata = db.ReferenceField(Peopledata, reverse_delete_rule=DO_NOTHING)
    peoplename = StringField(max_length=20)
    chd = db.EmbeddedDocumentField(CHDdata)
    saq = db.EmbeddedDocumentField(SAQdata)
    sf36 = db.EmbeddedDocumentField(Sf36data)
    # 脂质代谢指标
    lipiddata = db.EmbeddedDocumentField(Lipiddata)
    # 炎症介质指标
    inflammation = db.EmbeddedDocumentField(Inflammation)
    # 内皮细胞损伤指标
    celldamage = db.EmbeddedDocumentField(Celldamage)
    # 凝血功能指标
    bloodfunction = db.EmbeddedDocumentField(Bloodfunction)
    # SNP基因分型芯片结果
    snp = db.EmbeddedDocumentField(SNPdata)
    # 代谢组学检测结果数据库
    metabolism = db.EmbeddedDocumentField(Metabolism)
    # 基因组学检测结果数据库
    gene = db.EmbeddedDocumentField(Gene)
    chdscore = FloatField()
    saqlimitscore = FloatField()
    saqstablescore = FloatField()
    saqhappenscore = FloatField()
    saqtreatscore = FloatField()
    saqdiseasescore = FloatField()
    saqscore = FloatField()

class Expertinfo(db.Document):
    """
    专家信息
    """
    expertname = StringField(max_length=20, unique=True)
    expertgender = StringField(max_length=10)
    expertage = StringField(max_length=10)
    professionaltitle = StringField(max_length=20)
    workunits = StringField(max_length=100)
    researchdirection = StringField(max_length=1024)
    phonenumber = StringField(max_length=30)
    expertemail = StringField(max_length=50)
    filltime = db.DateTimeField(default=datetime.datetime.now())
    # shuming
    signature = StringField(max_length=10)
    meta = {
        'ordering': 'id'
    }



"""
层次分析法：冠心病痰湿证
"""
class CHDLevel1(db.EmbeddedDocument):
    """
    冠心病痰湿证辨证一级指标判断矩阵
    """
    # 临床症状
    clinical = ListField(StringField(max_length=10))
    # 舌象
    tongue = ListField(StringField(max_length=10))
    # 脉象
    pulse = ListField(StringField(max_length=10))

class CHDLevel2clinical(db.EmbeddedDocument):
    """
    冠心病痰湿证辨证二级指标临床症状判断矩阵
    """
    # 胸闷、胸痛
    chest = ListField(StringField(max_length=10))
    # 肢体沉重
    bodyheavy = ListField(StringField(max_length=10))
    # 呕恶
    oue = ListField(StringField(max_length=10))
    # 脘腹痞满
    abdominalfullness = ListField(StringField(max_length=10))
    # 体胖
    bodyfat = ListField(StringField(max_length=10))
    # 纳呆
    anorexia = ListField(StringField(max_length=10))
    # 口黏
    mouthstick = ListField(StringField(max_length=10))
    # # 唇青紫
    # lips = ListField(StringField(max_length=10))
    # 面色晦暗
    facedark = ListField(StringField(max_length=10))
    # 嗜睡
    sleepiness = ListField(StringField(max_length=10))

class CHDLevel2tongue(db.EmbeddedDocument):
    """
    冠心病痰湿证辨证二级指标舌象判断矩阵
    """
    tonguefat = ListField(StringField(max_length=10))
    # 舌胖边有齿痕
    mossgreasy = ListField(StringField(max_length=10))
    # 苔腻
    mossgwhite = ListField(StringField(max_length=10))
    # 苔白滑

class CHDLevel2pulse(db.EmbeddedDocument):
    """
    冠心病痰湿证二级指标脉象判断矩阵
    """
    # 脉滑
    pulseslide = ListField(StringField(max_length=10))
    # 脉濡
    pulsemoist = ListField(StringField(max_length=10))
    # 脉缓
    pulsedelay = ListField(StringField(max_length=10))

class Ahpindicators(EmbeddedDocument):
    """
    冠心病痰湿证理化指标
    """
    # 血脂
    bloodfat = StringField(max_length=10)
    # 血糖
    bloodsugar = StringField(max_length=10)
    # 血浆同型半胱氨酸
    hcy = StringField(max_length=10)
    # C反应蛋白
    crp = StringField(max_length=10)
    # 脂蛋白
    lipoprotein = StringField(max_length=10)
    # 炎症因子
    inflammation = StringField(max_length=10)
    # 超声心动图
    ultrasoniccardiogram = StringField(max_length=10)
    # 冠状动脉造影
    coronaryangiography = StringField(max_length=10)
    ahpother1 = EmbeddedDocumentField(Label)
    ahpother2 = EmbeddedDocumentField(Label)
    ahpother3 = EmbeddedDocumentField(Label)
    ahpother4 = EmbeddedDocumentField(Label)
    ahpother5 = EmbeddedDocumentField(Label)

class Ahptanshidata(db.DynamicDocument):
    """
    层次分析法：冠心病痰湿证
    """
    # 填写用户名
    author = db.ReferenceField(User, reverse_delete_rule=DO_NOTHING)
    authorname = StringField(max_length=20)
    expert = db.ReferenceField(Expertinfo, reverse_delete_rule=DO_NOTHING)
    expertname = StringField(max_length=20)
    filltime = db.DateTimeField(default=datetime.datetime.now())
    # 冠心病痰湿证辨证一级指标判断矩阵
    chdlevel1 = db.EmbeddedDocumentField(CHDLevel1)
    # 冠心病痰湿证辨证二级指标临床症状判断矩阵
    chdlevel2clinical = db.EmbeddedDocumentField(CHDLevel2clinical)
    # 冠心病痰湿证辨证二级指标舌象判断矩阵
    chdlevel2tongue = db.EmbeddedDocumentField(CHDLevel2tongue)
    # 冠心病痰湿证辨证二级指标脉象判断矩阵
    chdlevel2pulse = db.EmbeddedDocumentField(CHDLevel2pulse)
    # 理化指标
    indicators = EmbeddedDocumentField(Ahpindicators)






"""
层次分析法：冠心病痰瘀互结证
"""
class CHDhuLevel1(db.EmbeddedDocument):
    """
    冠心病痰瘀互结证辨证一级指标判断矩阵
    """
    # 临床症状
    clinical = ListField(StringField(max_length=10))
    # 舌象
    tongue = ListField(StringField(max_length=10))
    # 脉象
    pulse = ListField(StringField(max_length=10))

class CHDhuLevel2clinical(db.EmbeddedDocument):
    """
    冠心病痰瘀互结证辨证二级指标临床症状判断矩阵
    """
    # 胸闷、胸痛
    chest = ListField(StringField(max_length=10))
    # 体胖
    bodyfat = ListField(StringField(max_length=10))
    # 肢体沉重
    bodyheavy = ListField(StringField(max_length=10))
    # 口黏
    mouthstick = ListField(StringField(max_length=10))
    # 唇青紫
    lips = ListField(StringField(max_length=10))
    # 面色晦暗
    facedark = ListField(StringField(max_length=10))

class CHDhuLevel2tongue(db.EmbeddedDocument):
    """
    冠心病痰瘀互结证辨证二级指标舌象判断矩阵
    """
    tonguepurple = ListField(StringField(max_length=10))
    # 舌暗紫
    tonguespots = ListField(StringField(max_length=10))
    # 舌斑点
    tonguevein = ListField(StringField(max_length=10))
    # 舌脉络青紫
    mossgreasy = ListField(StringField(max_length=10))
    # 苔腻

class PhlegmLevel1(db.EmbeddedDocument):
    """
    痰证辨证一级指标判断矩阵
    """
    # 临床症状
    clinical = ListField(StringField(max_length=10))
    # 舌象
    tongue = ListField(StringField(max_length=10))
    # 脉象
    pulse = ListField(StringField(max_length=10))

class PhlegmLevel2clinical(db.EmbeddedDocument):
    """
    痰证辨证二级指标临床症状判断矩阵
    """
    # 胸闷
    chest = ListField(StringField(max_length=10))
    # 痰多
    phlegm = ListField(StringField(max_length=10))
    # 痞满
    massfullness = ListField(StringField(max_length=10))
    # 体胖
    bodyfat = ListField(StringField(max_length=10))
    # 纳呆
    anorexia = ListField(StringField(max_length=10))
    # 呕恶
    oue = ListField(StringField(max_length=10))
    # 头重
    headheavy = ListField(StringField(max_length=10))
    # 眩晕
    vertigo = ListField(StringField(max_length=10))
    # 嗜睡
    sleepiness = ListField(StringField(max_length=10))
    # 肢体沉重
    bodyheavy = ListField(StringField(max_length=10))
    # 倦怠乏力
    languid = ListField(StringField(max_length=10))

class PhlegmLevel2tongue(db.EmbeddedDocument):
    """
    痰证辨证二级指标舌象判断矩阵
    """
    # 舌淡
    paletongue = ListField(StringField(max_length=10))
    # 苔腻
    mossgreasy = ListField(StringField(max_length=10))

class PhlegmLevel2pulse(db.EmbeddedDocument):
    """
    痰证辨证二级指标脉象判断矩阵
    """
    # 脉滑
    pulseslide = ListField(StringField(max_length=10))
    # 脉濡
    pulsemoist = ListField(StringField(max_length=10))
    # 脉弦
    pulsestring = ListField(StringField(max_length=10))


class Ahpdata(db.DynamicDocument):
    """
    层次分析法：冠心病痰瘀互结证
    """
    # 填写用户名
    author = db.ReferenceField(User, reverse_delete_rule=DO_NOTHING)
    authorname = StringField(max_length=20)
    expert = ReferenceField(Expertinfo, reverse_delete_rule=DO_NOTHING)
    expertname = StringField(max_length=20)
    filltime = db.DateTimeField(default=datetime.datetime.now())
    # 冠心病痰瘀互结证辨证一级指标判断矩阵
    chdlevel1 = db.EmbeddedDocumentField(CHDhuLevel1)
    # 冠心病痰瘀互结证辨证二级指标临床症状判断矩阵
    chdlevel2clinical = db.EmbeddedDocumentField(CHDhuLevel2clinical)
    # 冠心病痰瘀互结证辨证二级指标舌象判断矩阵
    chdlevel2tongue = db.EmbeddedDocumentField(CHDhuLevel2tongue)
    # 痰证辨证一级指标判断矩阵
    phlegmlevel1 = db.EmbeddedDocumentField(PhlegmLevel1)
    # 痰证辨证二级指标临床症状判断矩阵
    phlegmlevel2clinical = db.EmbeddedDocumentField(PhlegmLevel2clinical)
    # 痰证辨证二级指标舌象判断矩阵
    phlegmlevel2tongue = db.EmbeddedDocumentField(PhlegmLevel2tongue)
    # 痰证辨证二级指标脉象判断矩阵
    phlegmlevel2pulse = db.EmbeddedDocumentField(PhlegmLevel2pulse)



class DanLouPian(DynamicDocument):
    """
    丹篓片化学成分
    """
    # 成分
    ingredient = StringField(max_length=20)
    # 成分中文名
    ingredientzh = StringField(max_length=20)
    # CAS号
    cas = StringField(max_length=20)
    # 原植物
    originalplants = StringField(max_length=20)
    # 引用
    reference = StringField(max_length=1024)
    # 备注
    note = StringField(max_length=1024)

class Basis(DynamicDocument):
    """
    医案数据库
    """
    # 医案名称
    basisname = StringField(max_length=20)
    # 专家姓名
    expertsname = StringField(max_length=15)
    # 患者姓名
    patientname = StringField(max_length=15)
    # 患者性别
    patientgender = StringField(max_length=10)
    # 患者年龄
    patientage = StringField(max_length=5)
    # 就诊日期
    clinicdate = DateTimeField(default=datetime.datetime.now())
    # 主诉
    mainsuit = StringField(max_length=1024)
    # 病史
    medicalhistory = StringField(max_length=1024)
    # 西医诊断
    westdiagnosis = StringField(max_length=1024)
    # 中医诊断
    chdiagnosis = StringField(max_length=1024)
    # 辨证
    discriminate = StringField(max_length=1024)
    # 处方
    prescription = StringField(max_length=1024)
    # 按语
    editorial = StringField(max_length=1024)
    meta = {
        'ordering': ['clinicdate']
    }


class Drugsinformation(DynamicDocument):
    """
    药物基本信息
    """
    # 通用名称
    genericname = StringField(max_length=20, unique=True)
    # 状态
    status = StringField(max_length=20)
    # 配方、处方
    formula = StringField(max_length=200)
    #
    smile = StringField(max_length=20)
    #
    pubchemid = StringField(max_length=20)
    # 迹象
    indications = StringField(max_length=200)


class Geneinformation(DynamicDocument):
    """
    基因基本信息
    """
    # 基因特征
    genesymbol = StringField(max_length=200)
    # 基因名字
    genename = StringField(max_length=20, unique=True)
    # 状态
    status = StringField(max_length=20)
    # 轨迹类型
    locustype = StringField(max_length=20)
    # 轨迹组
    locusgroup = StringField(max_length=20)
    # 之前的特征
    previoussymbols = StringField(max_length=200)
    # 之前的名字
    previousname = StringField(max_length=20)
    # 同义词
    synonyms = StringField(max_length=20)
    # 染色体
    chrocmosome = StringField(max_length=20)
    # entrezid
    entrezid = StringField(max_length=20)

class Pathways(DynamicDocument):
    """
    通路基本信息
    """
    # 通路名称
    pathwayname = StringField(max_length=20, unique=True)
    # 超链接
    hyperlink = StringField(max_length=100)
    # 源1
    source1 = StringField(max_length=20)
    # 源2
    source2 = StringField(max_length=20)
    # 源3
    source3 = StringField(max_length=20)
    # 源4
    source4 = StringField(max_length=20)
    # 类别
    category = StringField(max_length=20)
    # 描述
    description = StringField(max_length=1024)


class Disease(DynamicDocument):
    """
    疾病基本信息
    """
    # 疾病名称
    diseasename = StringField(max_length=20, unique=True)
    # 描述
    description = StringField(max_length=1024)

class Drugtodrug(DynamicDocument):
    """
    药物-药物相互作用
    """
    # 药物A
    drugaid = ReferenceField(Drugsinformation)
    # 药物A name
    druganame = StringField(max_length=20)
    # 药物B
    drugbid = ReferenceField(Drugsinformation)
    # 药物B name
    drugbname = StringField(max_length=20)
    # 描述
    description = StringField(max_length=1024)

class Drugtogene(DynamicDocument):
    """
    药物-基因关联
    """
    # 药物id
    drugid = ReferenceField(Drugsinformation)
    # 药物name
    drugname = StringField(max_length=20)
    # 基因id
    geneid = ReferenceField(Geneinformation)
    # 基因name
    genename = StringField(max_length=20)
    # 交互类型
    interactiontype = StringField(max_length=20)
    source = StringField(max_length=50)
    # 物种
    species = StringField(max_length=20)
    # 基因特征(以下两个和基因可能和基因基本信息有关)
    genesymbol = StringField(max_length=200)
    geneentrez = StringField(max_length=20)

class Diseasetogene(DynamicDocument):
    """
    疾病-基因关联
    """
    # 疾病id
    diseaseid = ReferenceField(Disease)
    # 疾病name
    diseasename = StringField(max_length=20)
    # 基因id
    geneid = ReferenceField(Geneinformation)
    # 基因name
    genename = StringField(max_length=20)
    # 关联类型
    associationtype = StringField(max_length=20)
    # 源数据库
    sourcedatabase = StringField(max_length=50)
    # 基因特征(以下两个和基因可能和基因基本信息有关)
    genesymbol = StringField(max_length=200)
    geneentrezid = StringField(max_length=20)

class Genetogene(DynamicDocument):
    """
    基因-基因关联
    """
    # 基因aid
    geneaid = ReferenceField(Geneinformation)
    # 基因aname
    geneaname = StringField(max_length=20)
    # 基因bid
    genebid = ReferenceField(Geneinformation)
    # 基因bname
    genebname = StringField(max_length=20)
    # 监测方法
    detectionmethods = StringField(max_length=200)
    # 貌似是文献数据库id
    pubmedid = StringField(max_length=20)
    # 交互类型
    interactiontype = StringField(max_length=20)
    # 源数据库
    sourcedatabase = StringField(max_length=50)
    # (以下两个和基因可能和基因基本信息有关)
    geneaentrezid = StringField(max_length=20)
    genebentrezid = StringField(max_length=20)

class Drugwithdrug(DynamicDocument):
    """
    药物组合
    """
    # 药物剂量组合
    drugcombinationdosage = ListField(StringField(max_length=20))
    # 药物组合配方
    drugcombinationformulation = ListField(StringField(max_length=20))
    # 药物id组合
    drugcombinationids = ListField(ReferenceField(Drugsinformation))
    # 疾病
    disease = StringField(max_length=200)
    # 效果
    effect = StringField(max_length=1024)
    # 协同作用
    synergy = StringField(max_length=1024)
    # 临床阶段
    clinicalphase = StringField(max_length=1024)
    # 资源
    resource = StringField(max_length=1024)
    # 依据，参照
    ref = StringField(max_length=1024)
    # 貌似是文献数据库id
    pubmedid = StringField(max_length=20)
    # 副作用
    sideeffect = StringField(max_length=1024)


class Windresistance(EmbeddedDocument):
    """
    阻络
    """
    # 胸痛
    chestpain = StringField(max_length=10)
    # 胸闷
    chesttight = StringField(max_length=10)
    # 心悸
    heartpal = StringField(max_length=10)
    # 肢体麻木
    numbness = StringField(max_length=10)
    # 烦躁
    agitated = StringField(max_length=10)
    # 脉弦
    pulsestring = StringField(max_length=10)
    # 脉涩
    pulseacerbity = StringField(max_length=10)
    windother1 = db.EmbeddedDocumentField(Label)
    windother2 = db.EmbeddedDocumentField(Label)
    windother3 = db.EmbeddedDocumentField(Label)
    windother4 = db.EmbeddedDocumentField(Label)
    windother5 = db.EmbeddedDocumentField(Label)
class Fire(EmbeddedDocument):
    """
    化火
    """
    # 心痛
    heartpain = StringField(max_length=10)
    # 咽干
    drythroat = StringField(max_length=10)
    # 口苦
    mouthbitter = StringField(max_length=10)
    # 烦躁
    fireagitated = StringField(max_length=10)
    # 溲黄
    souyellow = StringField(max_length=10)
    # 便秘
    constipation = StringField(max_length=10)
    # 舌红
    redtongue = StringField(max_length=10)
    # 苔黄
    mossyellow = StringField(max_length=10)
    # 脉数
    pulsenumber = StringField(max_length=10)
    fireother1 = db.EmbeddedDocumentField(Label)
    fireother2 = db.EmbeddedDocumentField(Label)
    fireother3 = db.EmbeddedDocumentField(Label)
    fireother4 = db.EmbeddedDocumentField(Label)
    fireother5 = db.EmbeddedDocumentField(Label)
class Poison(EmbeddedDocument):
    """
    生毒
    """
    # 中、重度心绞痛
    severheartpain = StringField(max_length=10)
    # 重度口苦
    severmouthbitter = StringField(max_length=10)
    # 咽痛
    sorethroat = StringField(max_length=10)
    # 口疮
    cankersores = StringField(max_length=10)
    # 病情凶险
    dangerousillness = StringField(max_length=10)
    # 老舌
    oldtongue = StringField(max_length=10)
    # 舌青或青紫
    greentongue = StringField(max_length=10)
    # 剥苔
    peelmoss = StringField(max_length=10)
    # 舌下络脉紫红或绛紫
    purpletongue = StringField(max_length=10)
    # 脉涩
    poisonpulseacerbity = StringField(max_length=10)
    # 脉结代
    clavusgeneration = StringField(max_length=10)
    poisonother1 = db.EmbeddedDocumentField(Label)
    poisonother2 = db.EmbeddedDocumentField(Label)
    poisonother3 = db.EmbeddedDocumentField(Label)
    poisonother4 = db.EmbeddedDocumentField(Label)
    poisonother5 = db.EmbeddedDocumentField(Label)


class DelphiFour(db.DynamicDocument):
    """
    德尔菲四诊
    """
    author = db.ReferenceField(User, reverse_delete_rule=DO_NOTHING)
    authorname = StringField(max_length=20)
    # 填写问卷的登陆用户
    expert = ReferenceField(Expertinfo, reverse_delete_rule=DO_NOTHING)
    expertname = StringField(max_length=20)
    wind = EmbeddedDocumentField(Windresistance)
    fire = EmbeddedDocumentField(Fire)
    poison = EmbeddedDocumentField(Poison)
    filltime = db.DateTimeField(default=datetime.datetime.now())
    meta = {
        'ordering': ['-filltime']
    }