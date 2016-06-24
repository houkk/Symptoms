var btnTxt = "" ;//判断btn是保存还是修改 为add还是edit
var editId = "";//修改上传需要的id
var cou = 0;//给name赋值，防止name重名
/*
* 加在问卷中radio的样式*/
$(document).ready(function () {
    $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
    });
    $('.form_date').datetimepicker({
        language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
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
* 表格查看详情删除事件 */
var operateEvents = {
    'click .edit': function (e, value, row, index) {
        $('input').iCheck('uncheck'); //设置全不选
        $('input[type="text"]').val(''); //设置全为空
        $('td').removeClass('alert alert-danger'); //设置不要警告框
        $('tr').removeClass('alert alert-danger'); //设置不要警告框
        $('div').removeClass('alert alert-danger'); //设置不要警告框

        btnTxt = "edit";
        editId = row.id;

        $('#save-ques').val("保存修改");
        $('#questionare').removeClass('hide');
        $('html,body').animate({scrollTop: $("#nav-middle").offset().top});

        //读取问卷信息
        $('#questionare input[type="text"]').each(function () {
            /*var name = $(this).find('input:radio').prop('name');
            $(this).find('input[value='+row[name]+']').iCheck('check')*/
            var key = $(this).parents('.table').attr('id');
            var name = $(this).prop('name');
            $(this).val(row[key][name]);
        });
        $('select[name="gender"]').val(row['peopledata']['gender']);
        $('select').selectator('refresh');
        console.log($('select[name="gender"]').val());


        $('#peoplename').attr('readonly','readonly');
        $('#questionare .row').each(function () {
            var key = $(this).parents('.panel').attr('id');
            if($(this).find('table').length==0){
                 var name = $(this).find('input:radio').prop('name');
                 $(this).find('input[value='+row[key][name]+']').iCheck('check');
            }
            else{
                $(this).find('tr').each(function(index,e){
                    var name = $(this).find('input:radio').prop('name');
                    $(e).find('input[value='+row[key][name]+']').iCheck('check');

                });
            }
        })


    },
    'click .remove': function (e, value, row, index) {
        if (confirm("是否删除此条信息？")) {
            var outcome = restful('delete',"/cliqueue/" + row.id + "/","");
            if(outcome == "fail"){
                alert("删除失败！")
            }
            else{
               $("#cliqueueTable").bootstrapTable('remove', {
                        field: 'id',
                        values: [row.id]
                    });
                alert('删除成功')
            }
        }

    }
};


$("#cliqueueTable").bootstrapTable({
    columns: [{
        field: "peopledata",
        title: "人口资源表",
        sortable: 'true',
        visible: false
    }, {
        field: "chd",
        title: "冠心病",
        sortable: "true",
        visible: false
    }, {
        field: "saq",
        title: "西雅图",
        sortable: 'true',
        visible: false
    }, {
        field: 'sf36',
        title: '年龄',
        sortable: 'true',
        visible: false
    }, {
        field: 'author',
        title: '作者',
        sortable: 'true',
        visible: false
    },{
        field: 'filltime',
        title: '时间',
        sortable: 'true',
        formatter: function(data){ return data.substring(0,10)}
    }, {
        field: 'authorname',
        title: '作者',
        sortable: 'true'
        //formatter: operateFormatter1
    }, {
        field: 'peoplename',
        title: '人口资料学',
        sortable: 'true'
        //formatter: operateFormatter1
    }, {
        field: 'operate',
        title: '设置',
        align: 'center',
        events: operateEvents,
        formatter: operateFormatter
    }],
    detailView:true,
    striped: true,
    pagination: true,
    pageSize: 10,
    pageNumber: 1,
    locale:"zh-CN",
    url: "/cliqueue/",
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

/*
* 创建新问卷*/
$('#addques').click(function(){
    btnTxt = "add";
    $('#save-ques').val("添加问卷");
    $('input').iCheck('uncheck'); //设置全不选
    $('input[type="text"]').val(''); //设置全为空
    $('select').prop('selectedIndex', 0); //下拉框设置为第一个
    $('#peoplename').removeAttr('readonly');//姓名框取消只读属性
    $('td').removeClass('alert alert-danger'); //设置不要警告框
    $('tr').removeClass('alert alert-danger'); //设置不要警告框
    $('div').removeClass('alert alert-danger'); //设置不要警告框
    $('#questionare').removeClass('hide');
    $('html,body').animate({scrollTop: $("#nav-middle").offset().top});
})

/*
* 向上图标回到顶部*/
$('#totop').click(function(){
    $('html,body').animate({scrollTop: $("#nav-head").offset().top});
})

/*
* 保存或者修改保存*/
$('#save-clin').click(function () {
    var judge = 0
    var position = 0;

    //人口资料表的数组
    var peopleObj = {};
    $('#peopledata input[type="text"]').each(function () {
        var key = $(this).attr('name');
        var value = $(this).val();
        if (value == "") {
            $(this).parent().addClass('alert alert-danger');
            judge = 1;
            position = $(this).offset().top - $(window).height() / 2;
        }
        else {
            peopleObj[key] = value;
        }

        /*
         * radio选中时，警告框消失*/
        $('input').on('change', function (event) {
            $(this).parent().removeClass('alert alert-danger')
        });

    });
    peopleObj['gender'] = $('#peopledata select[name="gender"]').val();

    //冠心病稳定型心绞痛(痰瘀互结证)证候疗效评价计分表
    var chdObj = {}
    var chdscore = 0;
    $('#chd input[value="1"]').each(function (index,e) {
        var key = $(this).attr('name');
        var value = $('input[name=' + key + ']:checked').val();

        if (value == null) {
            $(this).parent().parent().parent().addClass('alert alert-danger');
            judge = 1
            position = $(this).offset().top - $(window).height() / 2
        }
        else {
            chdObj[key] = value;
            if(index >= 0 && index <= 3){
                chdscore += parseInt(value) * 5.5;
            }
            if(index > 3 && index <= 7){
                chdscore += parseInt(value) * 3.5;
            }
            if(index == 8){
                chdscore += parseInt(value) * 3;
            }
            if(index == 9){
                chdscore += parseInt(value) * 2;
            }
            if(index == 10){
                chdscore += parseInt(value) * 1;
            }
            if(index == 11){
                chdscore += parseInt(value) * 2;
            }
        }
        /*
         * radio选中时，警告框消失*/
        $('input').on('ifChanged', function (event) {
            $(this).parent().parent().parent().removeClass('alert alert-danger')
        });
    });
    //西雅图心绞痛量表
    var saqObj = {};
    var saqlimitscore = 0;
    var saqstablescore = 0;
    var saqhappenscore = 0;
    var saqtreatscore = 0;
    var saqdiseasescore = 0;
    var saqscore = 0;
    $('#saq input[value="1"]').each(function (index,e) {
        var key = $(this).attr('name');
        var value = $('input[name=' + key + ']:checked').val();
        if (value == null) {
            $(this).parent().parent().parent().addClass('alert alert-danger');
            judge = 1
            position = $(this).offset().top - $(window).height() / 2;
        }
        else {
            saqObj[key] = value;
            if(index >= 0 && index <= 8){
                saqlimitscore += parseInt(value);
            }
            if(index == 9){
                saqstablescore += parseInt(value);

            }
            if(index > 9 && index <= 11){
                saqhappenscore += parseInt(value);

            }
            if(index > 11 && index <= 15){
                saqtreatscore += parseInt(value);

            }
            if(index > 15 && index <= 18){
                saqdiseasescore += parseInt(value);

            }
        }
        /*
         * radio选中时，警告框消失*/
        $('input').on('ifChanged', function (event) {
            $(this).parent().parent().parent().removeClass('alert alert-danger')
        });
    });
    saqlimitscore = (saqlimitscore - 9) / 45.0 * 100;
    saqstablescore = (saqstablescore - 1) / 4.0 * 100;
    saqhappenscore = (saqhappenscore - 2) / 10.0 * 100;
    saqtreatscore = (saqtreatscore - 4) / 17.0 * 100;
    saqdiseasescore = (saqdiseasescore -3) / 12.0 * 100;
    saqscore = saqlimitscore + saqstablescore + saqhappenscore + saqtreatscore + saqdiseasescore ;

    //SF-36量表
    var sf36Obj = {}
    $('#sf36 input[value="1"]').each(function () {
        var key = $(this).attr('name');
        var value = $('input[name=' + key + ']:checked').val();
        if (value == null) {
            $(this).parent().parent().parent().addClass('alert alert-danger');
            judge = 1
            position = $(this).offset().top - $(window).height() / 2
        }
        else {
            sf36Obj[key] = value;
        }
        /*
         * radio选中时，警告框消失*/
        $('input').on('ifChanged', function (event) {
            $(this).parent().parent().parent().removeClass('alert alert-danger')
        });
    });
    //脂质代谢指标
    var lipidObj = {};
    $('#lipiddata input[type="text"]').each(function () {
        var key = $(this).attr('name');
        var value = $(this).val();
        if (value == "") {
            $(this).parent().addClass('alert alert-danger');
            judge = 1;
            position = $(this).offset().top - $(window).height() / 2;
        }
        else {
            lipidObj[key] = value;
        }
        /*
         * radio选中时，警告框消失*/
        $('input').on('change', function (event) {
            $(this).parent().removeClass('alert alert-danger')
        });

    });
    //炎症介质指标
    var inflammationObj = {};
    $('#inflammation input[type="text"]').each(function () {
        var key = $(this).attr('name');
        var value = $(this).val();
        if (value == "") {
            $(this).parent().addClass('alert alert-danger');
            judge = 1;
            position = $(this).offset().top - $(window).height() / 2;
        }
        else {
            inflammationObj[key] = value;
        }
        /*
         * radio选中时，警告框消失*/
        $('input').on('change', function (event) {
            $(this).parent().removeClass('alert alert-danger')
        });

    });
    //内皮细胞损伤指标
    var celldamageObj = {};
    $('#celldamage input[type="text"]').each(function () {
        var key = $(this).attr('name');
        var value = $(this).val();
        if (value == "") {
            $(this).parent().addClass('alert alert-danger');
            judge = 1;
            position = $(this).offset().top - $(window).height() / 2;
        }
        else {
            celldamageObj[key] = value;
        }
        /*
         * radio选中时，警告框消失*/
        $('input').on('change', function (event) {
            $(this).parent().removeClass('alert alert-danger')
        });

    });
    //凝血功能指标
    var bloodfunctionObj = {};
    $('#bloodfunction input[type="text"]').each(function () {
        var key = $(this).attr('name');
        var value = $(this).val();
        if (value == "") {
            $(this).parent().addClass('alert alert-danger');
            judge = 1;
            position = $(this).offset().top - $(window).height() / 2;
        }
        else {
            bloodfunctionObj[key] = value;
        }
        /*
         * radio选中时，警告框消失*/
        $('input').on('change', function (event) {
            $(this).parent().removeClass('alert alert-danger')
        });

    });
     //SNP基因分型芯片结果
    var snpObj = {};
    $('#snp input[type="text"]').each(function () {
        var key = $(this).attr('name');
        var value = $(this).val();
        if (value == "") {
            $(this).parent().addClass('alert alert-danger');
            judge = 1;
            position = $(this).offset().top - $(window).height() / 2;
        }
        else {
            snpObj[key] = value;
        }
        /*
         * radio选中时，警告框消失*/
        $('input').on('change', function (event) {
            $(this).parent().removeClass('alert alert-danger')
        });

    });
     //代谢组学检测结果数据库
    var metabolismObj = {};
    $('#metabolism input[type="text"]').each(function () {
        var key = $(this).attr('name');
        var value = $(this).val();
        if (value == "") {
            $(this).parent().addClass('alert alert-danger');
            judge = 1;
            position = $(this).offset().top - $(window).height() / 2;
        }
        else {
            metabolismObj[key] = value;
        }
        /*
         * radio选中时，警告框消失*/
        $('input').on('change', function (event) {
            $(this).parent().removeClass('alert alert-danger')
        });

    });
     //基因组学检测结果数据库
    var geneObj = {};
    $('#gene input[type="text"]').each(function () {
        var key = $(this).attr('name');
        var value = $(this).val();
        if (value == "") {
            $(this).parent().addClass('alert alert-danger');
            judge = 1;
            position = $(this).offset().top - $(window).height() / 2;
        }
        else {
            geneObj[key] = value;
        }
        /*
         * radio选中时，警告框消失*/
        $('input').on('change', function (event) {
            $(this).parent().removeClass('alert alert-danger')
        });

    });

    if (judge == 1) {
        alert("请填写完整再提交！")
        $('html,body').animate({scrollTop: position}); //回到最后一个没填写的选项
    }

    else {
        var obj = {'chdscore':chdscore,'saqscore':saqscore,'saqlimitscore':saqlimitscore,'saqstablescore':saqstablescore,'saqhappenscore':saqhappenscore,'saqdiseasescore':saqdiseasescore,'saqtreatscore':saqtreatscore,'chd':chdObj,'saq':saqObj,'sf36':sf36Obj,'lipiddata':lipidObj,'inflammation':inflammationObj,'celldamage':celldamageObj,'bloodfunction':bloodfunctionObj,'snp':snpObj,"metabolism":metabolismObj,'gene':geneObj};
        if(btnTxt == 'edit'){
            var outcome1 = restfulArray("put","/cliqueue/"+editId,obj);
            var outcome2 = restfulArray("put","/people/"+outcome1.peopledata.id,peopleObj);
            if(outcome1 == "fail" || outcome2 == "fail"){
                alert("修改失败！");
            }
            else{
                alert('保存成功')
                turnPage("../template/modules/clinical-cohort/clinical-cohort.html");
            }
        }
        else{
            obj['author']= $('#userId').html();
            obj['authorname'] = $.trim($('#username').text());

            var edit = restfulArray("get","/people?name="+peopleObj.name,"");
            //新添加问卷的时候判断人口学资料信息是否存在，存在则修改人口学信息，不存在就新增人口学信息
            if(edit.data[0].count !=0){
                if(confirm('此人口学资料信息已存在,要在保存时修改吗？','提示')){
                    obj['peopledata'] = edit.data[0].id;
                    obj['peoplename'] = edit.data[0].name;
                    var outcome = restfulArray("post", "/cliqueue/", obj);
                    if (outcome == "fail") {
                        alert("添加数据失败");
                    }
                    else {
                        alert('添加数据成功')
                        turnPage("../template/modules/clinical-cohort/clinical-cohort.html");
                    }
                }
                else{
                    $('html,body').animate({scrollTop: $("#nav-middle").offset().top});
                    $('#peoplename').focus();
                }
            }
            else {
                $.ajax({
                    type: 'post',
                    url: '/people/',
                    //dataType:"json",
                    contentType: "application/json",
                    data: JSON.stringify(peopleObj),
                    success: function (data) {
                        obj['peopledata'] = data.id;
                        obj['peoplename'] = data.name;
                        var outcome = restfulArray("post", "/cliqueue/", obj);
                        if (outcome == "fail") {
                            alert("添加数据失败");
                        }
                        else {
                            alert('添加数据成功');
                            turnPage("../template/modules/clinical-cohort/clinical-cohort.html");
                        }
                    },
                    error: function () {
                        alert('添加人口学资料信息失败')
                    }
                });
            }

        }
    }



})



/*按时间查找*/
function dateChange() {
    var headDate = $("#head-date").val();
    var footDate = $("#foot-date").val();
    if(headDate != "" && footDate != ""){
        $("#cliqueueTable").bootstrapTable("refresh", {url: '/cliqueue/?filltime__gte=' + headDate + "&filltime__lte=" + footDate + " 23:59:59"});
        //alert('/ahp/?filltime__gte=' + headDate + "&filltime__lte" + footDate + " 23:59:59");
    }
    else if (headDate != "" && footDate == "") {
        $("#cliqueueTable").bootstrapTable("refresh", {url: '/cliqueue/?filltime__gte=' + headDate})
    }
    else if(headDate == "" && footDate != ""){
        $("#cliqueueTable").bootstrapTable("refresh", {url: '/cliqueue/?filltime__lte=' + footDate + " 23:59:59"})
    }
}


/*人口学资料姓名自动填充剩下信息*/
$('#peoplename').keypress(function (e) {
    var key = e.which;
    if(key == 13){
        var name = $(this).val();
        var msg = restfulArray("get", "/people/?name="+name, null);
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
                $('input[name="group"]').val(msg.data[0].group);
                $('select[name="gender"]').val(msg.data[0].gender);
                $('input[name="age"]').val(msg.data[0].age);
                $('input[name="national"]').val(msg.data[0].national);
                $('input[name="region"]').val(msg.data[0].region);
                $('input[name="bloodpressure"]').val(msg.data[0].bloodpressure);
                $('input[name="bloodsugar"]').val(msg.data[0].bloodsugar);
            }
        }
    }
})


/*年龄input框判断*/
function ageJudge(obj){
    var num = $(obj).val();
    if(!(/(^[1-9]\d*$)/.test(num))||num<1||num>150){
        alert('请输入1-150的整数');
        $(obj).focus();
    }
}