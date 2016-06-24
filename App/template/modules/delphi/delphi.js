/**
 * Created by Mesogene on 9/20/15.
 */


var btnTxt = "" //判断btn是保存还是修改 为add还是edit
var editId = ""//修改上传需要的id
var cou = 0//给name赋值，防止name重名
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

});

/*
* 表格查看详情删除事件 */
var operateEvents = {
    'click .edit': function (e, value, row, index) {
        $('#addques').click();
        btnTxt = "edit";
        editId = row.id;
        $('#save-ques').val("保存修改");
        $('#questionare').removeClass('hide');
        $('html,body').animate({scrollTop: $("#nav-middle").offset().top});

        /*读取问卷信息--单选*/
        $('#radioques .row').each(function () {
            var name = $(this).find('input:radio').prop('name');
            $(this).find('input[value='+row[name]+']').iCheck('check')
        })

        /*读取问卷信息--动态5个字段读取*/
        for (var i = 1; i < 6; i++) {

            if (row['other' + i] != null) {
                if(row['other' + i].label!="" || row['other' + i].value!=""){
                    var html = '<div class="row myrow">' +
                    '<div class="col-md-3"> <input type="text" class="supply" value='+row['other' + i].label+'></div> ' +
                    '<div class="col-md-2"> <input type="radio" name='+cou+' value="1"/><span>很重要</span> </div> ' +
                    '<div class="col-md-2"> <input type="radio" name='+cou+' value="2"/><span>比较重要</span> </div> ' +
                    '<div class="col-md-2"> <input type="radio" name='+cou+' value="3"/><span>一般</span> </div> ' +
                    '<div class="col-md-2"> <input type="radio" name='+cou+' value="4"/><span>不大重要</span> </div>'+
                    '<div class="col-md-1"> <span class="glyphicon glyphicon-remove" onclick="delete_div(this)"></span></div>' +
                  '</div>';
                    $("#radioques").append(html);
                    $('input[name='+cou+'][value='+row['other' + i].value+']').iCheck('check');
                    cou++;
                }
                else {
                    break;
                }
            }
        }

        /*读取问卷信息--多选*/
        for(var i=1;i<5;i++){
            if(row['choice'+i]){
                $('input[name="choice'+i+'"]').iCheck('check');
                $('textarea[name="review'+i+'"]').val(row['review'+i]);
            }
        }

        $('textarea[name="habits"]').val(row['habits']);

        //radio样式重载
        $('input').iCheck({
             checkboxClass: 'icheckbox_square-blue',
             radioClass: 'iradio_square-blue',
             increaseArea: '20%'
        });
    },
    'click .remove': function (e, value, row, index) {
        if (confirm("是否删除此条信息？")) {
            var outcome = restful('delete',"/delphi/" + row.id + "/","");
            if(outcome == "fail"){
                alert("删除失败！")
            }
            else{
               $("#delphiTable").bootstrapTable('remove', {
                        field: 'id',
                        values: [row.id]
                    });
                alert('删除成功')
            }
        }

    }
};


$("#delphiTable").bootstrapTable({
    columns: [{
        field: "id",
        title: "问卷编号",
        sortable: 'true',
        visible: false
    }, {
        field: "chest",
        title: "胸闷、胸痛",
        sortable: "true",
        visible: false
    }, {
        field: "bodyfat",
        title: "体胖",
        sortable: 'true',
        visible: false

    }, {
        field: 'bodyheavy',
        title: '肢体困重',
        sortable: 'true',
        visible: false
    }, {
        field: 'mouthstick',
        title: '口黏（粘）',
        sortable: 'true',
        visible: false
    }, {
        field: 'lips',
        title: '唇青紫',
        sortable: 'true',
        visible: false
    }, {
        field: 'facedark',
        title: '面色晦暗',
        sortable: 'true',
        visible: false
    }, {
        field: 'tonguepurple',
        title: '舌质暗紫',
        sortable: 'true',
        visible: false
    }, {
        field: 'tonguespots',
        title: '舌有淤斑、斑点',
        sortable: 'true',
        visible: false
    }, {
        field: 'tonguevein',
        title: '舌下脉络青紫',
        sortable: 'true',
        visible: false
    }, {
        field: 'mossgreasy',
        title: '苔腻',
        sortable: 'true',
        visible: false
    }, {
        field: 'slipperypluse',
        title: '脉弦滑',
        sortable: 'true',
        visible: false
    }, {
        field: 'astringentpulse',
        title: '脉弦涩',
        sortable: 'true',
        visible: false
    }, {
        field: 'other1',
        title: '补充1',
        sortable: 'true',
        visible: false
    }, {
        field: 'other2',
        title: '补充1',
        sortable: 'true',
        visible: false
    }, {
        field: 'other3',
        title: '补充1',
        sortable: 'true',
        visible: false
    }, {
        field: 'other4',
        title: '补充1',
        sortable: 'true',
        visible: false
    }, {
        field: 'other5',
        title: '补充1',
        sortable: 'true',
        visible: false
    }, {
        field: 'choice1',
        title: '第一个',
        sortable: 'true',
        visible: false
    }, {
        field: 'review1',
        title: '第一个评述',
        sortable: 'true',
        visible: false
    }, {
        field: 'choice2',
        title: '第二个',
        sortable: 'true',
        visible: false
    }, {
        field: 'review2',
        title: '第二个评述',
        sortable: 'true',
        visible: false
    }, {
        field: 'choice3',
        title: '第三个',
        sortable: 'true',
        visible: false
    }, {
        field: 'review3',
        title: '第三个评述',
        sortable: 'true',
        visible: false
    }, {
        field: 'choice4',
        title: '第四个',
        sortable: 'true',
        visible: false
    }, {
        field: 'review4',
        title: '第四个评述',
        sortable: 'true',
        visible: false
    }, {
        field: 'habits',
        title: '自己的辩证习惯',
        sortable: 'true',
        visible: false
    }, {
        field: 'author',
        title: '作者',
        sortable: 'true',
        visible: false
    }, {
        field: 'filltime',
        title: '时间',
        sortable: 'true',
        formatter: function(data){ return data.substring(0,10)}
    }, {
        field: 'authorname',
        title: '作者'
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
    pageList:"[10,30,50]",
    locale:"zh-CN",
    url: "/delphi/",
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
* 动态添加问卷条目*/

 $('#btnAdd').click(function () {
    var length = $('input[value="1"]').length + 1;
    if(length > 17){
        alert("已达到添加上限");
    }
    else{
       var html = '<div class="row myrow">' +
                    '<div class="col-md-3"> <input type="text" class="supply" value=""></div> ' +
                    '<div class="col-md-2"> <input type="radio" name='+cou+' value="1"/><span>很重要</span> </div> ' +
                    '<div class="col-md-2"> <input type="radio" name='+cou+' value="2"/><span>比较重要</span> </div> ' +
                    '<div class="col-md-2"> <input type="radio" name='+cou+' value="3"/><span>一般</span> </div> ' +
                    '<div class="col-md-2"> <input type="radio" name='+cou+' value="4"/><span>不大重要</span> </div>'+
                    '<div class="col-md-1"> <span class="glyphicon glyphicon-remove" onclick="delete_div(this)"></span></div>' +
                  '</div>';
        $("#radioques").append(html);

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
         $(this).parent().parent().parent().removeClass('alert alert-danger')
     });
});
/*
 * radio选中时，警告框消失*/
$('input').on('ifChanged', function (event) {
    $(this).parent().parent().parent().removeClass('alert alert-danger')
});

/*动态删除问卷条目*/
function delete_div(obj){
    $(obj).parent().parent().remove()
}
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
    $('textarea').val('');
    $('.row').removeClass('alert alert-danger'); //设置不要警告框
    $('.myrow').remove(); //设置去除动态添加属性的框
    $('#questionare').removeClass('hide');
    $('html,body').animate({scrollTop: $("#nav-middle").offset().top});
})

/*
* 向上图标回到顶部*/
$('#totop').click(function(){
    $('html,body').animate({scrollTop: $("#nav-head").offset().top});
})
//55fd0f86d3dae21587d3dc4f
//55fd09c7d3dae27d55ba68e1
/*
* 保存或者修改保存*/
$('#save-ques').click(function () {
    var judge = 0
    var position = 0;
    $("#radioques .row").each(function () {
        if($(this).find("input:checked").val() == null){
            $(this).addClass('alert alert-danger');
            judge = 1
            position = $(this).offset().top - $(window).height()/2
        }
    })
    if(judge == 1){
        alert("请填写完整再提交！")
        $('html,body').animate({scrollTop: position}); //回到最后一个没填写的选项
    }
    else{
        var chest = $('input[name="chest"]:checked').val();
        var bodyfat = $('input[name="bodyfat"]:checked').val();
        var bodyheavy = $('input[name="bodyheavy"]:checked').val();
        var mouthstick = $('input[name="mouthstick"]:checked').val();
        var lips = $('input[name="lips"]:checked').val();
        var facedark = $('input[name="facedark"]:checked').val();
        var tonguepurple = $('input[name="tonguepurple"]:checked').val();
        var tonguespots = $('input[name="tonguespots"]:checked').val();
        var tonguevein = $('input[name="tonguevein"]:checked').val();
        var mossgreasy = $('input[name="mossgreasy"]:checked').val();
        var slipperypluse = $('input[name="slipperypluse"]:checked').val();
        var astringentpulse = $('input[name="astringentpulse"]:checked').val();


        var choice1 = $('input[name="choice1"]').is(':checked');
        var review1 = $('textarea[name="review1"]').val();
        var choice2 = $('input[name="choice2"]').is(':checked');
        var review2 = $('textarea[name="review2"]').val();
        var choice3 = $('input[name="choice3"]').is(':checked');
        var review3 = $('textarea[name="review3"]').val();
        var choice4 = $('input[name="choice4"]').is(':checked');
        var review4 = $('textarea[name="review4"]').val();
        var habits = $('textarea[name="habits"]').val();


        var addObj = {
            'chest': chest,
            'bodyfat': bodyfat,
            'bodyheavy': bodyheavy,
            'mouthstick': mouthstick,
            'lips': lips,
            'facedark':facedark,
            'tonguepurple':tonguepurple,
            'tonguespots':tonguespots,
            'tonguevein':tonguevein,
            'mossgreasy':mossgreasy,
            'slipperypluse':slipperypluse,
            'astringentpulse':astringentpulse,
            'choice1':choice1,
            'review1':review1,
            'choice2':choice2,
            'review2':review2,
            'choice3':choice3,
            'review3':review3,
            'choice4':choice4,
            'review4':review4,
            'habits':habits
        }

        var i = 1;
        $(".myrow").each(function () {
            var txt_label = $(this).find(".supply").val();//对应属性值
            var txt_value = $(this).find("input:checked").val();//对应input的值
            if (txt_value != '' || txt_label != '') {
                addObj['other' + i] = {'label': txt_label, 'value': txt_value}
            }
            i++;
        });
        //其他字段置空
        for (i; i < 6; i++) {
            addObj['other' + i] = {'label': "", 'value': ""};
        }

        if(btnTxt == 'edit'){
            var outcome = restfulArray("put","/delphi/"+editId,addObj);
            if(outcome == "fail"){
                alert("修改失败！");
            }
            else{
                alert('保存成功')
                    $("#delphiTable").bootstrapTable('refresh', {});

                    btnTxt = "add";
                    $('input').iCheck('uncheck'); //设置全不选
                    $('input[type="text"]').val(''); //设置全为空
                    $('textarea').val('');
                    $('.row').removeClass('alert alert-danger'); //设置不要警告框
                    $('.myrow').remove(); //设置去除动态添加属性的框

                    $('#totop').click();
            }
        }
        else{
            addObj['author']= $('#userId').html();
            addObj['authorname'] = $.trim($('#username').text());
            var outcome = restfulArray("post","/delphi/",addObj);
            if(outcome == "fail"){
                 alert("添加数据失败");
            }
            else{
                alert('添加数据成功')
                $("#delphiTable").bootstrapTable('refresh', {});

                $('input').iCheck('uncheck'); //设置全不选
                $('input[type="text"]').val(''); //设置全为空
                $('textarea').val('');
                $('.row').removeClass('alert alert-danger'); //设置不要警告框
                $('.myrow').remove(); //设置去除动态添加属性的框

                $('#totop').click();
            }
        }

    }

})



/*按时间查找*/
function dateChange() {
    var headDate = $("#head-date").val();
    var footDate = $("#foot-date").val();
    if(headDate != "" && footDate != ""){
        $("#delphiTable").bootstrapTable("refresh", {url: '/delphi/?filltime__gte=' + headDate + "&filltime__lte=" + footDate + " 23:59:59"});
        //alert('/ahp/?filltime__gte=' + headDate + "&filltime__lte" + footDate + " 23:59:59");
    }
    else if (headDate != "" && footDate == "") {
        $("#delphiTable").bootstrapTable("refresh", {url: '/delphi/?filltime__gte=' + headDate})
    }
    else if(headDate == "" && footDate != ""){
        $("#delphiTable").bootstrapTable("refresh", {url: '/delphi/?filltime__lte=' + footDate + " 23:59:59"})
    }
}


