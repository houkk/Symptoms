/**
 * Created by Mesogene on 9/20/15.
 */


var btnTxt = ""; //判断btn是保存还是修改 为add还是edit
var editId = ""; //修改上传需要的id
var cou = 0;//给name赋值，防止name重名

$(function () {
    $('input[type=radio]').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
    });
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
 * 表格修改、删除事件 */
var operateEvents = {
    'click .edit': function (e, value, row, index) {
        btnTxt = "edit";
        editId = row.id;
        $('#save-ques').html("保存修改");
        $('.myrow').remove();//移除动态添加框
        $('input').iCheck('uncheck'); //设置全不选
        $('input[type="text"]').val(''); //设置全为空
        $('td').removeClass('alert alert-danger'); //设置不要警告框
        $('div').removeClass('alert alert-danger'); //设置不要警告框
        $('#questionare').removeClass('hide');

        $('html,body').animate({scrollTop: $("#nav-middle").offset().top});

        //读取专家信息
        $('#expertdata td').each(function () {
            /*var name = $(this).find('input:radio').prop('name');
            $(this).find('input[value='+row[name]+']').iCheck('check')*/
            var name = $(this).children().prop('name');
            $(this).children().val(row['expert'][name]);
        });
        $('select').selectator('refresh');
        $('#expertname').attr('readonly','readonly');

        //理化指标
        $('#indicators .unedit').each(function () {
            var key = $(this).parents('.panel').attr('id');
            var name = $(this).find('input:radio').prop('name');
            $(this).find('input[value=' + row[key][name] + ']').iCheck('check');
        });
        //读取动态的5个字段
        /*读取问卷信息--动态5个字段读取*/
        for (var i = 1; i < 6; i++) {
            if (row['indicators']['ahpother' + i] != null) {
                if(row['indicators']['ahpother' + i].label!="" || row['indicators']['ahpother' + i].value!=""){
                     var value = row['indicators']['ahpother' + i].value;
                     var html = '<div class="row myrow">' +
                            '<div class="mycol-md-3"> <input type="text" class="supply" value="'+value+'"></div> ' +
                            '<div class="mycol-md-2"> <input type="radio" name=' + cou + ' value="1"/><span>很重要</span> </div> ' +
                            '<div class="mycol-md-2"> <input type="radio" name=' + cou + ' value="2"/><span>比较重要</span> </div> ' +
                            '<div class="mycol-md-2"> <input type="radio" name=' + cou + ' value="3"/><span>一般</span> </div> ' +
                            '<div class="mycol-md-2"> <input type="radio" name=' + cou + ' value="4"/><span>不大重要</span> </div>' +
                            '<div class="mycol-md-2"> <input type="radio" name=' + cou + ' value="5"/><span>一点也不重要</span> </div>' +
                            '<div class="mycol-md-1"> <span class="glyphicon glyphicon-remove" onclick="delete_div(this)"></span></div>' +
                            '</div>';
                    $("#additem").before(html);
                    $('input[name='+cou+'][value='+row['indicators']['ahpother' + i].value+']').iCheck('check');
                    cou++;
                }
                else {
                    break;
                }
            }
        }
        //radio样式重载
        $('input').iCheck({
             checkboxClass: 'icheckbox_square-blue',
             radioClass: 'iradio_square-blue',
             increaseArea: '20%'
        });


        /*读取问卷信息--填充数据*/
        /*冠心病一级*/
        var CHDLevel1_pulse = [];
        CHDLevel1_pulse = row.chdlevel1.pulse;
        for (var i = 0; i < CHDLevel1_pulse.length; i++) {
            $("#CHDLevel1_pulse input").eq(i).val(CHDLevel1_pulse[i]);
        }

        var CHDLevel1_tongue = [];
        CHDLevel1_tongue = row.chdlevel1.tongue;
        for (var i = 0; i < CHDLevel1_tongue.length; i++) {
            $("#CHDLevel1_tongue input").eq(i).val(CHDLevel1_tongue[i]);
        }


        /*冠心病二级临床症状*/
        var CHDLevel2clinical_bodyheavy = [];
        CHDLevel2clinical_bodyheavy = row.chdlevel2clinical.bodyheavy;
        for (var i = 0; i < CHDLevel2clinical_bodyheavy.length; i++) {
            $("#CHDLevel2clinical_bodyheavy input").eq(i).val(CHDLevel2clinical_bodyheavy[i]);
        }

        var CHDLevel2clinical_oue = [];
        CHDLevel2clinical_oue = row.chdlevel2clinical.oue;
        for (var i = 0; i < CHDLevel2clinical_oue.length; i++) {
            $("#CHDLevel2clinical_oue input").eq(i).val(CHDLevel2clinical_oue[i]);
        }

        var CHDLevel2clinical_abdominalfullness = [];
        CHDLevel2clinical_abdominalfullness = row.chdlevel2clinical.abdominalfullness;
        for (var i = 0; i < CHDLevel2clinical_abdominalfullness.length; i++) {
            $("#CHDLevel2clinical_abdominalfullness input").eq(i).val(CHDLevel2clinical_abdominalfullness[i]);
        }

        var CHDLevel2clinical_bodyfat = [];
        CHDLevel2clinical_bodyfat = row.chdlevel2clinical.bodyfat;
        for (var i = 0; i < CHDLevel2clinical_bodyfat.length; i++) {
            $("#CHDLevel2clinical_bodyfat input").eq(i).val(CHDLevel2clinical_bodyfat[i]);
        }

        var CHDLevel2clinical_anorexia = [];
        CHDLevel2clinical_anorexia = row.chdlevel2clinical.anorexia;
        for (var i = 0; i < CHDLevel2clinical_anorexia.length; i++) {
            $("#CHDLevel2clinical_anorexia input").eq(i).val(CHDLevel2clinical_anorexia[i]);
        }

        var CHDLevel2clinical_mouthstick = [];
        CHDLevel2clinical_mouthstick = row.chdlevel2clinical.mouthstick;
        for (var i = 0; i < CHDLevel2clinical_mouthstick.length; i++) {
            $("#CHDLevel2clinical_mouthstick input").eq(i).val(CHDLevel2clinical_mouthstick[i]);
        }

        var CHDLevel2clinical_facedark = [];
        CHDLevel2clinical_facedark = row.chdlevel2clinical.facedark;
        for (var i = 0; i < CHDLevel2clinical_facedark.length; i++) {
            $("#CHDLevel2clinical_facedark input").eq(i).val(CHDLevel2clinical_facedark[i]);
        }

        var CHDLevel2clinical_sleepiness = [];
        CHDLevel2clinical_sleepiness = row.chdlevel2clinical.sleepiness;
        for (var i = 0; i < CHDLevel2clinical_sleepiness.length; i++) {
            $("#CHDLevel2clinical_sleepiness input").eq(i).val(CHDLevel2clinical_sleepiness[i]);
        }

        /*冠心病二级舌象*/
        var CHDLevel2tongue_mossgreasy = [];
        CHDLevel2tongue_mossgreasy = row.chdlevel2tongue.mossgreasy;
        for (var i = 0; i < CHDLevel2tongue_mossgreasy.length; i++) {
            $("#CHDLevel2tongue_mossgreasy input").eq(i).val(CHDLevel2tongue_mossgreasy[i]);
        }

        var CHDLevel2tongue_mossgwhite = [];
        CHDLevel2tongue_mossgwhite = row.chdlevel2tongue.mossgwhite;
        for (var i = 0; i < CHDLevel2tongue_mossgwhite.length; i++) {
            $("#CHDLevel2tongue_mossgwhite input").eq(i).val(CHDLevel2tongue_mossgwhite[i]);
        }

        /*冠心病二级脉象*/
        var CHDLevel2pulse_pulsemoist = [];
        CHDLevel2pulse_pulsemoist = row.chdlevel2pulse.pulsemoist;
        for (var i = 0; i < CHDLevel2pulse_pulsemoist.length; i++) {
            $("#CHDLevel2pulse_pulsemoist input").eq(i).val(CHDLevel2pulse_pulsemoist[i]);
        }

        var CHDLevel2pulse_pulsedelay = [];
        CHDLevel2pulse_pulsedelay = row.chdlevel2pulse.pulsedelay;
        for (var i = 0; i < CHDLevel2pulse_pulsedelay.length; i++) {
            $("#CHDLevel2pulse_pulsedelay input").eq(i).val(CHDLevel2pulse_pulsedelay[i]);
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
        sortable: "true",
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
        field: 'chdlevel2pulse',
        title: '冠心病二级脉象',
        sortable: 'true',
        visible: false
    }, {
        field: 'indicators',
        title: '理化指标',
        sortable: 'true',
        visible: false
    },{
        field: 'filltime',
        title: '时间',
        sortable: 'true',
        formatter: operateFormatterTime
    }, {
        field: 'authorname',
        title: '上传者'
    },{
        field: 'expertname',
        title: '专家信息',
        sortable: 'true'
    },  {
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
    url: "/ahptanshi/",
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
    $('.myrow').remove();//移除动态添加框
    $('input').iCheck('uncheck'); //设置全不选
    $('input[type="text"]').val(''); //设置全为空
    $('select').prop('selectedIndex', 0); //下拉框设置为第一个
    $('select').selectator('refresh');
    $('#expertname').removeAttr('readonly');//姓名框取消只读属性
    $('td').removeClass('alert alert-danger'); //设置不要警告框
    $('div').removeClass('alert alert-danger'); //设置不要警告框
    $('#questionare').removeClass('hide');
    $('html,body').animate({scrollTop: $("#nav-middle").offset().top});
});
/*新问卷保存或者修改保存*/
$('#save-ques').click(function () {
    var judge = 0;
    var position = 0;

    //专家信息的数组1
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
    //理化指标
    var indicatorsObj = {};
    $('#indicators .unedit input[value="1"]').each(function () {
        var key = $(this).attr('name');
        var value = $('input[name=' + key + ']:checked').val();

        if (value == null) {
            $(this).parent().parent().parent().addClass('alert alert-danger');
            judge = 1
            position = $(this).offset().top - $(window).height() / 2
        }
        else {
            indicatorsObj[key] = value;
        }
        /*
         * radio选中时，警告框消失*/
        $('input').on('ifChanged', function (event) {
            $(this).parent().parent().parent().removeClass('alert alert-danger')
        });
    });
    var i = 1;//动态添加属性获取值
    $("#indicators .myrow").each(function () {
        var txt_label = $(this).find(".supply").val();//对应属性值
        var txt_value = $(this).find("input:checked").val();//对应input的值
        if (txt_value != '' || txt_label != '') {
            indicatorsObj['ahpother' + i] = {'label': txt_label, 'value': txt_value}
        }
        i++;
    });
    for (i; i < 6; i++) {//其他字段置空
        indicatorsObj['ahpother' + i] = {'label': "", 'value': ""};
    }
    console.log(indicatorsObj)

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
        var CHDLevel2clinical_sleepiness_input = [];
        for (var i = 0; i < 8; i++) {
            CHDLevel2clinical_sleepiness_input[i] = $("#CHDLevel2clinical_sleepiness input").eq(i).val();
        }
        var CHDLevel2clinical_facedark_input = [];
        for (var i = 0; i < 7; i++) {
            CHDLevel2clinical_facedark_input[i] = $("#CHDLevel2clinical_facedark input").eq(i).val();
        }
        var CHDLevel2clinical_mouthstick_input = [];
        for (var i = 0; i < 6; i++) {
            CHDLevel2clinical_mouthstick_input[i] = $("#CHDLevel2clinical_mouthstick input").eq(i).val();
        }
        var CHDLevel2clinical_anorexia_input = [];
        for (var i = 0; i < 5; i++) {
            CHDLevel2clinical_anorexia_input[i] = $("#CHDLevel2clinical_anorexia input").eq(i).val();
        }
        var CHDLevel2clinical_bodyfat_input = [];
        for (var i = 0; i < 4; i++) {
            CHDLevel2clinical_bodyfat_input[i] = $("#CHDLevel2clinical_bodyfat input").eq(i).val();
        }
        var CHDLevel2clinical_abdominalfullness_input = [];
        for (var i = 0; i < 3; i++) {
            CHDLevel2clinical_abdominalfullness_input[i] = $("#CHDLevel2clinical_abdominalfullness input").eq(i).val();
        }
        var CHDLevel2clinical_oue_input = [];
        for (var i = 0; i < 2; i++) {
            CHDLevel2clinical_oue_input[i] = $("#CHDLevel2clinical_oue input").eq(i).val();
        }
        var CHDLevel2clinical_bodyheavy_input = [];
        for (var i = 0; i < 1; i++) {
            CHDLevel2clinical_bodyheavy_input[i] = $("#CHDLevel2clinical_bodyheavy input").eq(i).val();
        }

        /*冠心病二级舌象*/
        var CHDLevel2tongue_mossgwhite_input = [];
        for (var i = 0; i < 2; i++) {
            CHDLevel2tongue_mossgwhite_input[i] = $("#CHDLevel2tongue_mossgwhite input").eq(i).val();
        }
        var CHDLevel2tongue_mossgreasy_input = [];
        for (var i = 0; i < 1; i++) {
            CHDLevel2tongue_mossgreasy_input[i] = $("#CHDLevel2tongue_mossgreasy input").eq(i).val();
        }

        /*冠心病二级脉象*/
        var CHDLevel2pulse_pulsedelay_input = [];
        for (var i = 0; i < 2; i++) {
            CHDLevel2pulse_pulsedelay_input[i] = $("#CHDLevel2pulse_pulsedelay input").eq(i).val();
        }
        var CHDLevel2pulse_pulsemoist_input = [];
        for (var i = 0; i < 1; i++) {
            CHDLevel2pulse_pulsemoist_input[i] = $("#CHDLevel2pulse_pulsemoist input").eq(i).val();
        }

        var addObj = {
            "chdlevel1": {"pulse": CHDLevel1_pulse_input, "tongue": CHDLevel1_tongue_input},
            "chdlevel2clinical": {
                "bodyheavy": CHDLevel2clinical_bodyheavy_input,
                "oue": CHDLevel2clinical_oue_input,
                "abdominalfullness": CHDLevel2clinical_abdominalfullness_input,
                "bodyfat": CHDLevel2clinical_bodyfat_input,
                "anorexia": CHDLevel2clinical_anorexia_input,
                "mouthstick": CHDLevel2clinical_mouthstick_input,
                "facedark": CHDLevel2clinical_facedark_input,
                "sleepiness": CHDLevel2clinical_sleepiness_input
            },
            "chdlevel2tongue": {
                "mossgreasy": CHDLevel2tongue_mossgreasy_input,
                "mossgwhite": CHDLevel2tongue_mossgwhite_input
            },
            "chdlevel2pulse": {
                "pulsemoist": CHDLevel2pulse_pulsemoist_input,
                "pulsedelay": CHDLevel2pulse_pulsedelay_input
            },
            "indicators":indicatorsObj
        };

        if (btnTxt == 'edit') {
            console.log(addObj)
            $.ajax({
                //async:false,
                type: "put",
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(addObj),
                url: "/ahptanshi/" + editId,
                success: function (data) {
                    var outcome = restfulArray("put","/expert/"+data.expert.id,expertObj);
                    if(outcome !='fail'){
                        alert('修改成功');
                        turnPage("../template/modules/level-analysis/levelAnalysis_phlegm.html");
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
                        url: "/ahptanshi/",
                        success: function (data) {
                            var outcome = restfulArray("put", "/expert/" + addObj['expert'], expertObj);
                            if (outcome != 'fail') {
                                alert('修改成功');
                                $("#levelAnalysisTable").bootstrapTable('refresh', {url: "/ahptanshi/"});
                                turnPage("../template/modules/level-analysis/levelAnalysis_phlegm.html");
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
        }

    }

});

/*按时间查找*/
function dateChange() {
    var headDate = $("#head-date").val();
    var footDate = $("#foot-date").val();
    if(headDate != "" && footDate != ""){
        $("#levelAnalysisTable").bootstrapTable("refresh", {url: '/ahptanshi/?filltime__gte=' + headDate + "&filltime__lte=" + footDate + " 23:59:59"});
        //alert('/ahp/?filltime__gte=' + headDate + "&filltime__lte" + footDate + " 23:59:59");
    }
    else if (headDate != "" && footDate == "") {
        $("#levelAnalysisTable").bootstrapTable("refresh", {url: '/ahptanshi/?filltime__gte=' + headDate})
    }
    else if(headDate == "" && footDate != ""){
        $("#levelAnalysisTable").bootstrapTable("refresh", {url: '/ahptanshi/?filltime__lte=' + footDate + " 23:59:59"})
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

/*
* 动态添加问卷条目*/

 $('#additem').click(function () {
    var length = $('#ahpindicators .myrow').length + 1;
    if(length > 5){
        alert("已达到添加上限");
    }
    else{
       var html = '<div class="row myrow">' +
                    '<div class="mycol-md-3"> <input type="text" class="supply"></div> ' +
                    '<div class="mycol-md-2"> <input type="radio" name='+cou+' value="1"/><span>很重要</span> </div> ' +
                    '<div class="mycol-md-2"> <input type="radio" name='+cou+' value="2"/><span>比较重要</span> </div> ' +
                    '<div class="mycol-md-2"> <input type="radio" name='+cou+' value="3"/><span>一般</span> </div> ' +
                    '<div class="mycol-md-2"> <input type="radio" name='+cou+' value="4"/><span>不大重要</span> </div>'+
                    '<div class="mycol-md-2"> <input type="radio" name='+cou+' value="5"/><span>一点也不重要</span> </div>'+
                    '<div class="mycol-md-1"> <span class="glyphicon glyphicon-remove" onclick="delete_div(this)"></span></div>' +
                  '</div>';
        $(this).before(html);

        //radio样式重载
        $('input').iCheck({
             checkboxClass: 'icheckbox_square-blue',
             radioClass: 'iradio_square-blue',
             increaseArea: '20%'
        });
        cou++;
    }

     /*
      * radio选中时，警告框消失*/
     $('input').on('ifChanged', function (event) {
         $(this).parent().parent().parent().removeClass('alert alert-danger');
     });
});

/*动态删除问卷条目*/
function delete_div(obj){
    $(obj).parent().parent().remove();
}

