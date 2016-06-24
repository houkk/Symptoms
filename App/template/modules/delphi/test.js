/**
 * Created by Mesogene on 10/14/15.
 */
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
* 表格 查看详情/删除 事件 */
var operateEvents = {
    'click .edit': function (e, value, row, index) {
        $('.myrow').remove();//移除动态添加框
        $('input').iCheck('uncheck'); //设置全不选
        $('input[type="text"]').val(''); //设置全为空
        $('td').removeClass('alert alert-danger'); //设置不要警告框
        $('div').removeClass('alert alert-danger'); //设置不要警告框

        btnTxt = "edit";
        editId = row.id;

        $('#save-del').val("保存修改");
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
        //读取问卷信息
        $('#questionare .unedit').each(function () {
            var key = $(this).parents('.panel').attr('id');
            var name = $(this).find('input:radio').prop('name');
            $(this).find('input[value=' + row[key][name] + ']').iCheck('check');
        });
        //读取动态的5个字段
        /*读取问卷信息--动态5个字段读取*/
        var arr = ['wind','fire','poison'];
        for(j in arr){
            for (var i = 1; i < 6; i++) {
                var label = row[arr[j]][arr[j] + 'other' + i].label;
                var value = row[arr[j]][arr[j] + 'other' + i].value;
                if (row[arr[j]][arr[j] + 'other' + i] != null) {
                    if (label != "" || value != "") {
                        var html = '<div class="row myrow">' +
                            '<div class="mycol-md-3"> <input type="text" class="supply" value=' + label + '></div> ' +
                            '<div class="mycol-md-2"> <input type="radio" name=' + cou + ' value="1"/><span>很重要</span> </div> ' +
                            '<div class="mycol-md-2"> <input type="radio" name=' + cou + ' value="2"/><span>比较重要</span> </div> ' +
                            '<div class="mycol-md-2"> <input type="radio" name=' + cou + ' value="3"/><span>一般</span> </div> ' +
                            '<div class="mycol-md-2"> <input type="radio" name=' + cou + ' value="4"/><span>不大重要</span> </div>' +
                            '<div class="mycol-md-2"> <input type="radio" name=' + cou + ' value="5"/><span>一点也不重要</span> </div>' +
                            '<div class="mycol-md-1"> <span class="glyphicon glyphicon-remove" onclick="delete_div(this)"></span></div>' +
                            '</div>';
                        $('#' + arr[j] + ' button').before(html);
                        $('input[name=' + cou + '][value=' + value + ']').iCheck('check');
                        cou++;
                    }
                    else {
                        break;
                    }
                }
            }
        }
        //radio样式重载
        $('input').iCheck({
             checkboxClass: 'icheckbox_square-blue',
             radioClass: 'iradio_square-blue',
             increaseArea: '20%'
        });



    },
    'click .remove': function (e, value, row, index) {
        if (confirm("是否删除此条信息？")) {
            var outcome = restful('delete',"/delphifour/" + row.id + "/","");
            if(outcome == "fail"){
                alert("删除失败！")
            }
            else{
               $("#delphiFourTable").bootstrapTable('remove', {
                        field: 'id',
                        values: [row.id]
                    });
                alert('删除成功')
            }
        }

    }
};


$("#delphiFourTable").bootstrapTable({
    columns: [{
        field: "id",
        title: "id",
        sortable: 'true',
        visible: false
    },{
        field: "author",
        title: "填写问卷的登陆用户",
        sortable: 'true',
        visible: false
    }, {
        field: "expert",
        title: "专家信息",
        sortable: "true",
        visible: false
    }, {
        field: "wind",
        title: "阻络",
        sortable: 'true',
        visible: false
    }, {
        field: 'fire',
        title: '化火',
        sortable: 'true',
        visible: false
    }, {
        field: 'poison',
        title: '生毒',
        sortable: 'true',
        visible: false
    },{
        field: 'filltime',
        title: '时间',
        sortable: 'true',
        formatter: function(data){ return data.substring(0,10)}
    }, {
        field: 'authorname',
        title: '上传者',
        sortable: 'true'
    }, {
        field: 'expertname',
        title: '专家信息',
        sortable: 'true'
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
    url: "/delphifour/",
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
    $('.myrow').remove();//移除动态添加框
    $('input').iCheck('uncheck'); //设置全不选
    $('input[type="text"]').val(''); //设置全为空
    $('textarea').val(''); //设置全为空
    $('select').prop('selectedIndex', 0); //下拉框设置为第一个
    $('select').selectator('refresh');
    $('#expertname').removeAttr('readonly');//姓名框取消只读属性
    $('td').removeClass('alert alert-danger'); //设置不要警告框
    $('tr').removeClass('alert alert-danger'); //设置不要警告框
    $('div').removeClass('alert alert-danger'); //设置不要警告框
    $('#questionare').removeClass('hide');
    $('html,body').animate({scrollTop: $("#nav-middle").offset().top});
});

/*
* 向上图标回到顶部*/
$('#totop').click(function(){
    $('html,body').animate({scrollTop: $("#nav-head").offset().top});
});


/*
* 保存或者修改保存*/
$('#save-del').click(function () {
    var judge = 0
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

    //冠心病痰瘀互结 阻络 德尔菲法专家咨询问卷
    var windObj = {}
    $('#wind .unedit input[value="1"]').each(function () {
        var key = $(this).attr('name');
        var value = $('input[name=' + key + ']:checked').val();

        if (value == null) {
            $(this).parent().parent().parent().addClass('alert alert-danger');
            judge = 1
            position = $(this).offset().top - $(window).height() / 2
        }
        else {
            windObj[key] = value;
        }
        /*
         * radio选中时，警告框消失*/
        $('input').on('ifChanged', function (event) {
            $(this).parent().parent().parent().removeClass('alert alert-danger')
        });
    });
    var i = 1;//动态添加属性获取值
    $("#wind .myrow").each(function () {
        var txt_label = $(this).find(".supply").val();//对应属性值
        var txt_value = $(this).find("input:checked").val();//对应input的值
        if (txt_value != '' || txt_label != '') {
            windObj['windother' + i] = {'label': txt_label, 'value': txt_value}
        }
        i++;
    });
    for (i; i < 6; i++) {//其他字段置空
        windObj['windother' + i] = {'label': "", 'value': ""};
    }

    //冠心病痰瘀互结 化火 德尔菲法专家咨询问卷
    var fireObj = {}
    $('#fire input[value="1"]').each(function () {
        var key = $(this).attr('name');
        var value = $('input[name=' + key + ']:checked').val();

        if (value == null) {
            $(this).parent().parent().parent().addClass('alert alert-danger');
            judge = 1
            position = $(this).offset().top - $(window).height() / 2
        }
        else {
            fireObj[key] = value;
        }
        /*
         * radio选中时，警告框消失*/
        $('input').on('ifChanged', function (event) {
            $(this).parent().parent().parent().removeClass('alert alert-danger')
        });
    });
    var k = 1;//动态添加属性获取值
    $("#fire .myrow").each(function () {
        var txt_label = $(this).find(".supply").val();//对应属性值
        var txt_value = $(this).find("input:checked").val();//对应input的值
        if (txt_value != '' || txt_label != '') {
            fireObj['fireother' + k] = {'label': txt_label, 'value': txt_value}
        }
        k++;
    });
    for (k; k < 6; k++) {//其他字段置空
        fireObj['fireother' + k] = {'label': "", 'value': ""};
    }

    //冠心病痰瘀互结 生毒 德尔菲法专家咨询问卷
    var poisonObj = {}
    $('#poison input[value="1"]').each(function () {
        var key = $(this).attr('name');
        var value = $('input[name=' + key + ']:checked').val();

        if (value == null) {
            $(this).parent().parent().parent().addClass('alert alert-danger');
            judge = 1
            position = $(this).offset().top - $(window).height() / 2
        }
        else {
            poisonObj[key] = value;
        }
        /*
         * radio选中时，警告框消失*/
        $('input').on('ifChanged', function (event) {
            $(this).parent().parent().parent().removeClass('alert alert-danger')
        });
    });
    var m = 1;//动态添加属性获取值
    $("#poison .myrow").each(function () {
        var txt_label = $(this).find(".supply").val();//对应属性值
        var txt_value = $(this).find("input:checked").val();//对应input的值
        if (txt_value != '' || txt_label != '') {
            poisonObj['poisonother' + m] = {'label': txt_label, 'value': txt_value}
        }
        m++;
    });
    for (m; m < 6; m++) {//其他字段置空
        poisonObj['poisonother' + m] = {'label': "", 'value': ""};
    }


    if (judge == 1) {
        alert("请填写完整再提交！")
        $('html,body').animate({scrollTop: position}); //回到最后一个没填写的选项
    }

    else {
        var obj = {'wind':windObj,'fire':fireObj,'poison':poisonObj};
        if(btnTxt == 'edit'){
            var outcome1 = restfulArray("put","/delphifour/"+editId,obj);
            var outcome2 = restfulArray("put","/expert/"+outcome1.expert.id,expertObj);
            if(outcome1 == "fail" || outcome2 == "fail"){
                alert("修改失败！");
            }
            else{
                alert('保存成功')
                turnPage("../template/modules/delphi/delphi.html");
            }
        }
        else{
            obj['author']= $('#userId').html();
            obj['authorname'] = $.trim($('#username').text());

            var edit = restfulArray("get","/expert?expertname="+expertObj.expertname,"");

            //新添加问卷的时候判断专家信息是否存在，存在则修改专家信息，不存在就新增专家信息\
            console.log(edit);
            if(edit.data[0].count !=0){
                if(confirm('此专家信息已存在,要在保存时修改吗？','提示')){
                    console.log(edit)
                    obj['expert'] = edit.data[0].id;
                    obj['expertname'] = edit.data[0].expertname;
                    var outcome1 = restfulArray("post", "/delphifour/", obj);
                    var outcome2 = restfulArray("put","/expert/"+outcome1.expert.id,expertObj);
                    if (outcome1 == "fail" || outcome2 == "fail") {
                        alert("修改失败！");
                    }
                    else {
                        alert('添加数据成功')
                        turnPage("../template/modules/delphi/delphi.html");
                    }
                }
                else{
                    $('html,body').animate({scrollTop: $("#nav-middle").offset().top});
                    $('#expertname').focus();
                }
            }
            else {
                $.ajax({
                    type: 'post',
                    url: '/expert/',
                    //dataType:"json",
                    contentType: "application/json",
                    data: JSON.stringify(expertObj),
                    success: function (data) {
                        obj['expert'] = data.id;
                        obj['expertname'] = data.expertname;
                        var outcome = restfulArray("post", "/delphifour/", obj);
                        if (outcome == "fail") {
                            alert("添加问卷信息失败");
                        }
                        else {
                            alert('添加数据成功')
                            turnPage("../template/modules/delphi/delphi.html");
                        }
                    },
                    error: function () {
                        alert('添加专家信息失败')
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
        $("#delphiFourTable").bootstrapTable("refresh", {url: '/delphifour/?filltime__gte=' + headDate + "&filltime__lte=" + footDate + " 23:59:59"});
        //alert('/ahp/?filltime__gte=' + headDate + "&filltime__lte" + footDate + " 23:59:59");
    }
    else if (headDate != "" && footDate == "") {
        $("#delphiFourTable").bootstrapTable("refresh", {url: '/delphifour/?filltime__gte=' + headDate})
    }
    else if(headDate == "" && footDate != ""){
        $("#delphiFourTable").bootstrapTable("refresh", {url: '/delphifour/?filltime__lte=' + footDate + " 23:59:59"})
    }
}


/*人口学资料姓名自动填充剩下信息*/
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


/*
* 动态添加问卷条目*/

 $('button[name="additem"]').click(function () {
    var length = $(this).parent().find('.myrow').length + 1;
    if(length > 5){
        alert("已达到添加上限");
    }
    else{
       var html = '<div class="row myrow">' +
                    '<div class="mycol-md-3"> <input type="text" class="supply" value=""></div> ' +
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
