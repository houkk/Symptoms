/**
 * Created by Mesogene on 9/20/15.
 */


var btnTxt = ""; //判断btn是保存还是修改 为add还是edit
var editId = ""; //修改上传需要的id

$(function () {
    $('.form_date').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
     $('select').selectator({
        useSearch: false
    });
});


/*
 * 表格查看详情、删除事件 */
var operateEvents = {
    'click .edit': function (e, value, row, index) {
        $('#addques').click();
        btnTxt = "edit";
        editId = row.id;
        $('#save-ques').html("保存修改");

        //读取专家信息
        $('#expertdata td').each(function () {
            /*var name = $(this).find('input:radio').prop('name');
            $(this).find('input[value='+row[name]+']').iCheck('check')*/
            var name = $(this).children().prop('name');
            $(this).children().val(row['expert'][name]);
        });
        $('select').selectator('refresh');
        $('#expertname').attr('readonly','readonly');

        /*读取问卷信息--填充数据*/
        /*冠心病一级*/
        var CHDLevel1_tongue = [];
        CHDLevel1_tongue = row.chdlevel1.tongue;
        for (var i = 0; i < CHDLevel1_tongue.length; i++) {
            $("#CHDLevel1_tongue input").eq(i).val(CHDLevel1_tongue[i]);
        }

        var CHDLevel1_pulse = [];
        CHDLevel1_pulse = row.chdlevel1.pulse;
        for (var i = 0; i < CHDLevel1_pulse.length; i++) {
            $("#CHDLevel1_pulse input").eq(i).val(CHDLevel1_pulse[i]);
        }


        /*冠心病二级临床症状*/
        var CHDLevel2clinical_facedark = [];
        CHDLevel2clinical_facedark = row.chdlevel2clinical.facedark;
        for (var i = 0; i < CHDLevel2clinical_facedark.length; i++) {
            $("#CHDLevel2clinical_facedark input").eq(i).val(CHDLevel2clinical_facedark[i]);
        }

        var CHDLevel2clinical_bodyfat = [];
        CHDLevel2clinical_bodyfat = row.chdlevel2clinical.bodyfat;
        for (var i = 0; i < CHDLevel2clinical_bodyfat.length; i++) {
            $("#CHDLevel2clinical_bodyfat input").eq(i).val(CHDLevel2clinical_bodyfat[i]);
        }

        var CHDLevel2clinical_bodyheavy = [];
        CHDLevel2clinical_bodyheavy = row.chdlevel2clinical.bodyheavy;
        for (var i = 0; i < CHDLevel2clinical_bodyheavy.length; i++) {
            $("#CHDLevel2clinical_bodyheavy input").eq(i).val(CHDLevel2clinical_bodyheavy[i]);
        }

        var CHDLevel2clinical_mouthstick = [];
        CHDLevel2clinical_mouthstick = row.chdlevel2clinical.mouthstick;
        for (var i = 0; i < CHDLevel2clinical_mouthstick.length; i++) {
            $("#CHDLevel2clinical_mouthstick input").eq(i).val(CHDLevel2clinical_mouthstick[i]);
        }

        var CHDLevel2clinical_lips = [];
        CHDLevel2clinical_lips = row.chdlevel2clinical.lips;
        for (var i = 0; i < CHDLevel2clinical_lips.length; i++) {
            $("#CHDLevel2clinical_lips input").eq(i).val(CHDLevel2clinical_lips[i]);
        }

        /*冠心病二级舌象*/
        var CHDLevel2tongue_mossgreasy = [];
        CHDLevel2tongue_mossgreasy = row.chdlevel2tongue.mossgreasy;
        for (var i = 0; i < CHDLevel2tongue_mossgreasy.length; i++) {
            $("#CHDLevel2tongue_mossgreasy input").eq(i).val(CHDLevel2tongue_mossgreasy[i]);
        }

        var CHDLevel2tongue_tonguespots = [];
        CHDLevel2tongue_tonguespots = row.chdlevel2tongue.tonguespots;
        for (var i = 0; i < CHDLevel2tongue_tonguespots.length; i++) {
            $("#CHDLevel2tongue_tonguespots input").eq(i).val(CHDLevel2tongue_tonguespots[i]);
        }

        var CHDLevel2tongue_tonguevein = [];
        CHDLevel2tongue_tonguevein = row.chdlevel2tongue.tonguevein;
        for (var i = 0; i < CHDLevel2tongue_tonguevein.length; i++) {
            $("#CHDLevel2tongue_tonguevein input").eq(i).val(CHDLevel2tongue_tonguevein[i]);
        }


        /*痰症一级*/
        var PhlegmLevel1_pulse = [];
        PhlegmLevel1_pulse = row.phlegmlevel1.pulse;
        for (var i = 0; i < PhlegmLevel1_pulse.length; i++) {
            $("#PhlegmLevel1_pulse input").eq(i).val(PhlegmLevel1_pulse[i]);
        }

        var PhlegmLevel1_tongue = [];
        PhlegmLevel1_tongue = row.phlegmlevel1.tongue;
        for (var i = 0; i < PhlegmLevel1_tongue.length; i++) {
            $("#PhlegmLevel1_tongue input").eq(i).val(PhlegmLevel1_tongue[i]);
        }


        /*痰症二级临床症状*/
        var PhlegmLevel2clinical_languid = [];
        PhlegmLevel2clinical_languid = row.phlegmlevel2clinical.languid;
        for (var i = 0; i < PhlegmLevel2clinical_languid.length; i++) {
            $("#PhlegmLevel2clinical_languid input").eq(i).val(PhlegmLevel2clinical_languid[i]);
        }

        var PhlegmLevel2clinical_phlegm = [];
        PhlegmLevel2clinical_phlegm = row.phlegmlevel2clinical.phlegm;
        for (var i = 0; i < PhlegmLevel2clinical_phlegm.length; i++) {
            $("#PhlegmLevel2clinical_phlegm input").eq(i).val(PhlegmLevel2clinical_phlegm[i]);
        }

        var PhlegmLevel2clinical_massfullness = [];
        PhlegmLevel2clinical_massfullness = row.phlegmlevel2clinical.massfullness;
        for (var i = 0; i < PhlegmLevel2clinical_massfullness.length; i++) {
            $("#PhlegmLevel2clinical_massfullness input").eq(i).val(PhlegmLevel2clinical_massfullness[i]);
        }

        var PhlegmLevel2clinical_bodyfat = [];
        PhlegmLevel2clinical_bodyfat = row.phlegmlevel2clinical.bodyfat;
        for (var i = 0; i < PhlegmLevel2clinical_bodyfat.length; i++) {
            $("#PhlegmLevel2clinical_bodyfat input").eq(i).val(PhlegmLevel2clinical_bodyfat[i]);
        }

        var PhlegmLevel2clinical_anorexia = [];
        PhlegmLevel2clinical_anorexia = row.phlegmlevel2clinical.anorexia;
        for (var i = 0; i < PhlegmLevel2clinical_anorexia.length; i++) {
            $("#PhlegmLevel2clinical_anorexia input").eq(i).val(PhlegmLevel2clinical_anorexia[i]);
        }

        var PhlegmLevel2clinical_oue = [];
        PhlegmLevel2clinical_oue = row.phlegmlevel2clinical.oue;
        for (var i = 0; i < PhlegmLevel2clinical_oue.length; i++) {
            $("#PhlegmLevel2clinical_oue input").eq(i).val(PhlegmLevel2clinical_oue[i]);
        }

        var PhlegmLevel2clinical_headheavy = [];
        PhlegmLevel2clinical_headheavy = row.phlegmlevel2clinical.headheavy;
        for (var i = 0; i < PhlegmLevel2clinical_headheavy.length; i++) {
            $("#PhlegmLevel2clinical_headheavy input").eq(i).val(PhlegmLevel2clinical_headheavy[i]);
        }

        var PhlegmLevel2clinical_vertigo = [];
        PhlegmLevel2clinical_vertigo = row.phlegmlevel2clinical.vertigo;
        for (var i = 0; i < PhlegmLevel2clinical_vertigo.length; i++) {
            $("#PhlegmLevel2clinical_vertigo input").eq(i).val(PhlegmLevel2clinical_vertigo[i]);
        }

        var PhlegmLevel2clinical_sleepiness = [];
        PhlegmLevel2clinical_sleepiness = row.phlegmlevel2clinical.sleepiness;
        for (var i = 0; i < PhlegmLevel2clinical_sleepiness.length; i++) {
            $("#PhlegmLevel2clinical_sleepiness input").eq(i).val(PhlegmLevel2clinical_sleepiness[i]);
        }

        var PhlegmLevel2clinical_bodyheavy = [];
        PhlegmLevel2clinical_bodyheavy = row.phlegmlevel2clinical.bodyheavy;
        for (var i = 0; i < PhlegmLevel2clinical_bodyheavy.length; i++) {
            $("#PhlegmLevel2clinical_bodyheavy input").eq(i).val(PhlegmLevel2clinical_bodyheavy[i]);
        }


        /*痰症二级舌象*/
        var PhlegmLevel2tongue_mossgreasy = [];
        PhlegmLevel2tongue_mossgreasy = row.phlegmlevel2tongue.mossgreasy;
        for (var i = 0; i < PhlegmLevel2tongue_mossgreasy.length; i++) {
            $("#PhlegmLevel2tongue_mossgreasy input").eq(i).val(PhlegmLevel2tongue_mossgreasy[i]);
        }

        /*痰症二级脉象*/
        var PhlegmLevel2pulse_pulsestring = [];
        PhlegmLevel2pulse_pulsestring = row.phlegmlevel2pulse.pulsestring;
        for (var i = 0; i < PhlegmLevel2pulse_pulsestring.length; i++) {
            $("#PhlegmLevel2pulse_pulsestring input").eq(i).val(PhlegmLevel2pulse_pulsestring[i]);
        }

        var PhlegmLevel2pulse_pulsemoist = [];
        PhlegmLevel2pulse_pulsemoist = row.phlegmlevel2pulse.pulsemoist;
        for (var i = 0; i < PhlegmLevel2pulse_pulsemoist.length; i++) {
            $("#PhlegmLevel2pulse_pulsemoist input").eq(i).val(PhlegmLevel2pulse_pulsemoist[i]);
        }

    },

    /*删除事件*/
    'click .remove': function (e, value, row, index) {
        if (confirm("是否删除此条信息？")) {
            $.ajax({
                type: 'delete',
                url: "/ahp/" + row.id + "/",
                success: function (json) {
                    $("#levelAnalysisTable").bootstrapTable('remove', {
                        field: 'id',
                        values: [row.id]
                    });
                    alert('删除成功')
                }
            })
        }

    }
};


$("#levelAnalysisTable").bootstrapTable({
    columns: [{
        field: "id",
        title: "问卷编号",
        sortable: 'true',
        visible: false
    }, {
        field: "expert",
        title: "专家信息",
        sortable: 'true',
        visible: false
    }, {
        field: "chdlevel1",
        title: "冠心病一级",
        sortable: "true",
        visible: false
    }, {
        field: "chdlevel2clinical",
        title: "冠心病二级临床症状",
        sortable: 'true',
        visible: false
    }, {
        field: 'chdlevel2tongue',
        title: '冠心病二级舌象',
        sortable: 'true',
        visible: false
    }, {
        field: 'phlegmlevel1',
        title: '痰症一级',
        sortable: 'true',
        visible: false
    }, {
        field: 'phlegmlevel2clinical',
        title: '痰症二级临床症状',
        sortable: 'true',
        visible: false
    }, {
        field: 'phlegmlevel2tongue',
        title: '痰症二级舌象',
        sortable: 'true',
        visible: false
    }, {
        field: 'phlegmlevel2pulse',
        title: '痰症二级脉象',
        sortable: 'true',
        visible: false
    }, {
        field: 'filltime',
        title: '时间',
        sortable: 'true',
        formatter: operateFormatterTime
    }, {
        field: 'authorname',
        title: '上传者'
        //formatter: operateFormatter1
    }, {
        field: 'expertname',
        title: '专家信息'
    }, {
        field: 'operate',
        title: '设置',
        align: 'center',
        events: operateEvents,
        formatter: operateFormatter
    }],
    detailView: true,
    striped: true,
    pagination: true,
    pageSize: 10,
    pageNumber: 1,
    locale: "zh-CN",
    url: "/ahp/",
    sidePagination: 'server',
    queryParamsType: 'limit',
    responseHandler: function (res) {
        var count = res.data[res.data.length-1].count;
        res.data.pop();
        return {
            rows: res.data,
            total: count
        }

    },
    queryParams: function queryParams(params) {
        return {
            "_limit":params.limit,
            "_skip": params.offset
        };
    }
});


/*
 * 表格“设置”栏样式*/
function operateFormatter(value, row, index) {
    return [
        '<a class="edit"  title="修改">',
        '<i class="glyphicon glyphicon-edit"></i>',
        '</a>&nbsp;&nbsp;',
        '<a class="remove"  title="删除">',
        '<i class="glyphicon glyphicon-remove"></i>',
        '</a>'
    ].join('');
}

/*时间样式*/
function operateFormatterTime(value, row, index) {
    return value.substring(0, 10) + " " + value.substring(11, 19);
}

/*向上图标回到顶部*/
$('#totop').click(function () {
    $('html,body').animate({scrollTop: $("#nav-head").offset().top});
});

/*创建新问卷*/
$('#addques').click(function () {
    btnTxt = "add";
    $('#save-ques').html("添加问卷");
    $('input[type="text"]').val(''); //设置全为空
    $('textarea').val(''); //设置全为空
    $('select').prop('selectedIndex', 0); //下拉框设置为第一个
    $('select').selectator('refresh');
    $('#questionare').removeClass('hide');
    $('html,body').animate({scrollTop: $("#nav-middle").offset().top});
});

/*新问卷保存或者修改保存*/
$('#save-ques').click(function () {
    var judge = 0;
    var position = 0;

    //专家信息的数组
    var expertObj = {};
    $('#expertdata tbody td').each(function () {
        var key = $(this).children().attr('name');
        var value = $(this).children().val();
        if (value == "") {
            $(this).addClass('alert alert-danger');
            judge = 1;
            position = $(this).offset().top - $(window).height() / 2;
        }
        else {
            expertObj[key] = value;
        }

        /*
         * radio选中时，警告框消失*/
        $('input').on('change', function (event) {
            $(this).parent().removeClass('alert alert-danger')
        });

    });

    $("#table_input input").each(function () {
        if ($(this).val() == "") {
            judge = 1;
            position = $(this).offset().top - $(window).height() / 2
        }
    });
    if (judge == 1) {
        alert("请填写完整再提交！");
        $('html,body').animate({scrollTop: position}); //回到最后一个没填写的选项
    }
    else {
        var author = $("#userId").text();
        //alert(author);

        var authorName = $.trim($("#username").text());
        //alert("'"+authorName+"'");

        /*冠心病一级*/
        var CHDLevel1_pulse_input = [];
        for (var i = 0; i < 2; i++) {
            CHDLevel1_pulse_input[i] = $("#CHDLevel1_pulse input").eq(i).val();
        }
        var CHDLevel1_tongue_input = [];
        for (var i = 0; i < 1; i++) {
            CHDLevel1_tongue_input[i] = $("#CHDLevel1_tongue input").eq(i).val();
        }

        /*冠心病二级临床症状*/
        var CHDLevel2clinical_facedark_input = [];
        for (var i = 0; i < 5; i++) {
            CHDLevel2clinical_facedark_input[i] = $("#CHDLevel2clinical_facedark input").eq(i).val();
        }
        var CHDLevel2clinical_lips_input = [];
        for (var i = 0; i < 4; i++) {
            CHDLevel2clinical_lips_input[i] = $("#CHDLevel2clinical_lips input").eq(i).val();
        }
        var CHDLevel2clinical_mouthstick_input = [];
        for (var i = 0; i < 3; i++) {
            CHDLevel2clinical_mouthstick_input[i] = $("#CHDLevel2clinical_mouthstick input").eq(i).val();
        }
        var CHDLevel2clinical_bodyheavy_input = [];
        for (var i = 0; i < 2; i++) {
            CHDLevel2clinical_bodyheavy_input[i] = $("#CHDLevel2clinical_bodyheavy input").eq(i).val();
        }
        var CHDLevel2clinical_bodyfat_input = [];
        for (var i = 0; i < 1; i++) {
            CHDLevel2clinical_bodyfat_input[i] = $("#CHDLevel2clinical_bodyfat input").eq(i).val();
        }

        /*冠心病二级舌象*/
        var CHDLevel2tongue_mossgreasy_input = [];
        for (var i = 0; i < 3; i++) {
            CHDLevel2tongue_mossgreasy_input[i] = $("#CHDLevel2tongue_mossgreasy input").eq(i).val();
        }
        var CHDLevel2tongue_tonguevein_input = [];
        for (var i = 0; i < 2; i++) {
            CHDLevel2tongue_tonguevein_input[i] = $("#CHDLevel2tongue_tonguevein input").eq(i).val();
        }
        var CHDLevel2tongue_tonguespots_input = [];
        for (var i = 0; i < 1; i++) {
            CHDLevel2tongue_tonguespots_input[i] = $("#CHDLevel2tongue_tonguespots input").eq(i).val();
        }

        /*痰症一级*/
        var PhlegmLevel1_pulse_input = [];
        for (var i = 0; i < 2; i++) {
            PhlegmLevel1_pulse_input[i] = $("#PhlegmLevel1_pulse input").eq(i).val();
        }
        var PhlegmLevel1_tongue_input = [];
        for (var i = 0; i < 1; i++) {
            PhlegmLevel1_tongue_input[i] = $("#PhlegmLevel1_tongue input").eq(i).val();
        }

        /*痰症二级临床症状*/
        var PhlegmLevel2clinical_languid_input = [];
        for (var i = 0; i < 10; i++) {
            PhlegmLevel2clinical_languid_input[i] = $("#PhlegmLevel2clinical_languid input").eq(i).val();
        }
        var PhlegmLevel2clinical_bodyheavy_input = [];
        for (var i = 0; i < 9; i++) {
            PhlegmLevel2clinical_bodyheavy_input[i] = $("#PhlegmLevel2clinical_bodyheavy input").eq(i).val();
        }
        var PhlegmLevel2clinical_sleepiness_input = [];
        for (var i = 0; i < 8; i++) {
            PhlegmLevel2clinical_sleepiness_input[i] = $("#PhlegmLevel2clinical_sleepiness input").eq(i).val();
        }
        var PhlegmLevel2clinical_vertigo_input = [];
        for (var i = 0; i < 7; i++) {
            PhlegmLevel2clinical_vertigo_input[i] = $("#PhlegmLevel2clinical_vertigo input").eq(i).val();
        }
        var PhlegmLevel2clinical_headheavy_input = [];
        for (var i = 0; i < 6; i++) {
            PhlegmLevel2clinical_headheavy_input[i] = $("#PhlegmLevel2clinical_headheavy input").eq(i).val();
        }
        var PhlegmLevel2clinical_oue_input = [];
        for (var i = 0; i < 5; i++) {
            PhlegmLevel2clinical_oue_input[i] = $("#PhlegmLevel2clinical_oue input").eq(i).val();
        }
        var PhlegmLevel2clinical_anorexia_input = [];
        for (var i = 0; i < 4; i++) {
            PhlegmLevel2clinical_anorexia_input[i] = $("#PhlegmLevel2clinical_anorexia input").eq(i).val();
        }
        var PhlegmLevel2clinical_bodyfat_input = [];
        for (var i = 0; i < 3; i++) {
            PhlegmLevel2clinical_bodyfat_input[i] = $("#PhlegmLevel2clinical_bodyfat input").eq(i).val();
        }
        var PhlegmLevel2clinical_massfullness_input = [];
        for (var i = 0; i < 2; i++) {
            PhlegmLevel2clinical_massfullness_input[i] = $("#PhlegmLevel2clinical_massfullness input").eq(i).val();
        }
        var PhlegmLevel2clinical_phlegm_input = [];
        for (var i = 0; i < 1; i++) {
            PhlegmLevel2clinical_phlegm_input[i] = $("#PhlegmLevel2clinical_phlegm input").eq(i).val();
        }

        /*痰症二级舌象*/
        var PhlegmLevel2tongue_mossgreasy_input = [];
        for (var i = 0; i < 1; i++) {
            PhlegmLevel2tongue_mossgreasy_input[i] = $("#PhlegmLevel2tongue_mossgreasy input").eq(i).val();
        }

        /*痰症二级脉象*/
        var PhlegmLevel2pulse_pulsestring_input = [];
        for (var i = 0; i < 2; i++) {
            PhlegmLevel2pulse_pulsestring_input[i] = $("#PhlegmLevel2pulse_pulsestring input").eq(i).val();
        }
        var PhlegmLevel2pulse_pulsemoist_input = [];
        for (var i = 0; i < 1; i++) {
            PhlegmLevel2pulse_pulsemoist_input[i] = $("#PhlegmLevel2pulse_pulsemoist input").eq(i).val();
        }


        var addObj = {
            "chdlevel1": {"pulse": CHDLevel1_pulse_input, "tongue": CHDLevel1_tongue_input},
            "chdlevel2clinical": {
                "facedark": CHDLevel2clinical_facedark_input,
                "bodyfat": CHDLevel2clinical_bodyfat_input,
                "bodyheavy": CHDLevel2clinical_bodyheavy_input,
                "mouthstick": CHDLevel2clinical_mouthstick_input,
                "lips": CHDLevel2clinical_lips_input
            },
            "chdlevel2tongue": {
                "mossgreasy": CHDLevel2tongue_mossgreasy_input,
                "tonguespots": CHDLevel2tongue_tonguespots_input,
                "tonguevein": CHDLevel2tongue_tonguevein_input
            },
            "phlegmlevel1": {"pulse": PhlegmLevel1_pulse_input, "tongue": PhlegmLevel1_tongue_input},
            "phlegmlevel2clinical": {
                "languid": PhlegmLevel2clinical_languid_input,
                "phlegm": PhlegmLevel2clinical_phlegm_input,
                "massfullness": PhlegmLevel2clinical_massfullness_input,
                "bodyfat": PhlegmLevel2clinical_bodyfat_input,
                "anorexia": PhlegmLevel2clinical_anorexia_input,
                "oue": PhlegmLevel2clinical_oue_input,
                "headheavy": PhlegmLevel2clinical_headheavy_input,
                "vertigo": PhlegmLevel2clinical_vertigo_input,
                "sleepiness": PhlegmLevel2clinical_sleepiness_input,
                "bodyheavy": PhlegmLevel2clinical_bodyheavy_input
            },
            "phlegmlevel2tongue": {"mossgreasy": PhlegmLevel2tongue_mossgreasy_input},
            "phlegmlevel2pulse": {
                "pulsestring": PhlegmLevel2pulse_pulsestring_input,
                "pulsemoist": PhlegmLevel2pulse_pulsemoist_input
            }
        };

        if (btnTxt == 'edit') {
            $.ajax({
                //async:false,
                type: "put",
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(addObj),
                url: "/ahp/" + editId,
                success: function (data) {
                    var outcome = restfulArray("put","/expert/"+data.expert.id,expertObj);
                    if(outcome !='fail'){
                        alert('修改成功');
                        turnPage("../template/modules/level-analysis/level-analysis.html");
                    }
                },
                error: function (json) {
                    alert("修改失败");
                }
            });
        }
        if (btnTxt == 'add') {
            addObj["author"]=author;
            addObj["authorname"]=authorName;
            var edit = restfulArray("get","/expert?expertname="+expertObj.expertname,"");
            if(edit.data[0].count !=0){
                if(confirm('此专家信息已存在,要在保存时修改吗？','提示')){
                    addObj['expert'] = edit.data[0].id;
                    addObj['expertname'] = edit.data[0].expertname;
                    $.ajax({
                        //async:false,
                        type: "post",
                        dataType: 'json',
                        contentType: 'application/json',
                        data: JSON.stringify(addObj),
                        url: "/ahp/",
                        success: function (data) {
                            var outcome = restfulArray("put", "/expert/" + addObj['expert'], expertObj);
                            if (outcome != 'fail') {
                                alert('修改成功');
                                $("#levelAnalysisTable").bootstrapTable('refresh', {url: "/ahp/"});
                                turnPage("../template/modules/level-analysis/level-analysis.html");
                            }

                        },
                        error: function (json) {
                            alert("添加失败");
                        }
                    });
                }
                else{
                    $('html,body').animate({scrollTop: $("#nav-middle").offset().top});
                    $('#expertname').focus();
                }
            }
            else{
                $.ajax({
                    //async:false,
                    type: "post",
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(addObj),
                    url: "/ahp/",
                    success: function (data) {
                        var outcome = restfulArray("put", "/expert/" + addObj['expert'], expertObj);
                            if (outcome != 'fail') {
                                alert('修改成功');
                                $("#levelAnalysisTable").bootstrapTable('refresh', {url: "/ahp/"});
                                turnPage("../template/modules/level-analysis/level-analysis.html");
                            }
                    },
                    error: function (json) {
                        alert("添加失败");
                    }
                });
            }
        }

    }

});

/*按时间查找*/
function dateChange() {
    var headDate = $("#head-date").val();
    var footDate = $("#foot-date").val();
    if(headDate != "" && footDate != ""){
        $("#levelAnalysisTable").bootstrapTable("refresh", {url: '/ahp/?filltime__gte=' + headDate + "&filltime__lte=" + footDate + " 23:59:59"});
        //alert('/ahp/?filltime__gte=' + headDate + "&filltime__lte" + footDate + " 23:59:59");
    }
    else if (headDate != "" && footDate == "") {
        $("#levelAnalysisTable").bootstrapTable("refresh", {url: '/ahp/?filltime__gte=' + headDate})
    }
    else if(headDate == "" && footDate != ""){
        $("#levelAnalysisTable").bootstrapTable("refresh", {url: '/ahp/?filltime__lte=' + footDate + " 23:59:59"})
    }
}

/*专家信息自动填充剩下信息*/
$('#expertname').keypress(function (e) {
    var key = e.which;
    if(key == 13){
        var name = $(this).val();
        var msg = restfulArray("get", "/expert/?expertname="+name, null);
        if(msg == 'fail'){
            alert('查询失败')
        }
        else{
            if(msg.data[0] == null){
                if(!confirm('数据库中没有这个人,确认添加新人口数据吗？','提示')){
                    $(this).val('');
                }
            }
            else{
                $('#expertdata td').each(function (e) {
                    var name = $(this).children().prop('name');
                    $(this).children().val(msg.data[0][name]);
                });
                $('select').selectator('refresh');
            }
        }
    }
});
/*年龄input框判断*/
function ageJudge(obj){
    var num = $(obj).val();
    if(!(/(^[1-9]\d*$)/.test(num))||num<1||num>150){
        alert('请输入1-150的整数');
        $(obj).focus();
    }
}


/*电话input框判断*/
function phoneJudge(obj){
    var num = $(obj).val();
    if(!(/^1\d{10}$/.test(num))&&!(/^0\d{2,3}-?\d{7,8}$/.test(num))){
        alert('请输入正确的联系电话');
        $(obj).focus();
    }
}

/*邮件input框判断*/
function emailJudge(obj){
    var num = $(obj).val();
    if(!(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(num))){
        alert('请输入正确的邮箱');
        $(obj).focus();
    }
}

