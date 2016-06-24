/**
 * Created by Mesogene on 2015/9/16.
 */
/*$('#sample-table-sleep').bootstrapTable({
 url: '/literature/',
 columns: [{
 field: 'authorname',
 title: 'Item ID'
 }, {
 field: 'id',
 title: 'Item Name'
 }, {
 field: 'literaturename',
 title: 'Item Price'
 }],
 cache: false,
 height: 400,
 striped: true,
 pagination: true,
 pageSize: 50,
 pageList: [10, 25, 50, 100, 200],
 search: true,
 showColumns: true,
 showRefresh: true,
 minimumCountColumns: 2,
 clickToSelect: true
 sidePagination:'server',
 queryParamsType:'limit',
 responseHandler:function(res) {
 return {
 rows:res.results,
 total:res.count
 }
 },
 queryParams:function queryParams(params){
 return {
 "page":(params.offset/params.limit)+1,
 "page_size":params.limit
 };
 }
 });*/
/*function restful(typeInfo, urlInfo, dataInfo) {
 var result = null;
 $.ajax({
 async: false,
 type: typeInfo,
 dataType: "json",
 data: dataInfo,
 url: urlInfo,
 success: function (data) {
 result = data;
 },
 error: function (data) {
 result = " ";
 }
 });
 return result;
 }*/

$('#dynamicAdd').click(function () {

})

/*
 * btn 添加新属性按钮事件*/

$('#addAtt').click(function () {
    var count = 0; //判断能否继续添加，默认只能添加三个
    for (var i = 3; i < 6; i++) {
        var judge = $('#input' + i).parent().parent().is('.hide');
        if (judge) {
            count = 1;
            $('#input' + i).parent().parent().removeClass('hide');
            break;
        }
    }
    if (count == 0) {
        alert('已达到添加上限')
    }
})

/*
 * 删除属性input框*/

$('#add span').click(function () {
    $(this).parent().parent().addClass('hide');
})


$('#save').click(function () {
    var authorname = $('#authorname').val();
    var literaturename = $('#literaturename').val();
    var interlink = $('#interlink').val();

    var label3 = $('#label3').val();
    var label4 = $('#label4').val();
    var label5 = $('#label5').val();

    var input3 = $('#input3').val();
    var input4 = $('#input4').val();
    var input5 = $('#input5').val();


    var dataObj = {
        'authorname': authorname,
        'literaturename': literaturename,
        'interlink': interlink,
        'input3': {'label': label3, 'value': input3},
        'input4': {'label': label4, 'value': input4},
        'input5': {'label': label5, 'value': input5}
    };
    $.ajax({
        //async: false,
        type: 'post',
        contentType: "application/json",
        data: JSON.stringify(dataObj),
        url: '/literature/',
        success: function (data) {
            alert('ok')
        },
        error: function (data) {
            alert('fail')
        }
    });
})

/*
 * 上传excel文件*/

function Uploadfile() {
    if ($('#file1').val().length <= 0) {
        alert("请选择xls或者csv文件进行上传！！！")
    }
    else {
        $.ajaxFileUpload({
            //url: 'http://127.0.0.1:8000/tbexerciseinfo/152/?format=json',
            url: '/upload/',
            type: 'post',
            //secureuri: false,
            fileElementId: 'file1',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                alert("上传成功！");
            },
            error: function (data) {
                alert('请选择xls或者csv文件进行上传!!!');
            }
        })
    }

}


