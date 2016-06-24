/*define the data model of docDatabase fuction
 *文献数据库表*/

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

var temp = 0;
var rowContent = null;
var tag = null;

$("#conName").val() == "";

$("#consoliaTable").bootstrapTable({
    columns: [{
        field: 'state',
        checkbox: "true"
    }, {
        field: "id",
        title: "医案id",
        sortable: 'true',
        visible: false
    }, {
        field: "basisname",
        title: "医案名",
        sortable: "true",
        sorter: 'starsSorter'
    }, {
        field: "expertsname",
        title: "专家姓名",
        sortable: 'true'
    }, {
        field: "patientgender",
        title: "患者性别",
        sortable: 'true',
        visible: false

    }, {
        field: "patientname",
        title: "患者姓名",
        sortable: 'true'
    }, {
        field: "patientage",
        title: "患者年龄",
        sortable: 'true',
        visible: false
    }, {
        field: 'clinicdate',
        title: '就诊日期',
        sortable: 'true',
        formatter: function(data){ return data.substring(0,10)}
    }, {
        field: 'mainsuit',
        title: '主诉',
        sortable: 'true'
    }, {
        field: 'medicalhistory',
        title: '病史',
        sortable: 'true'
    }, {
        field: 'westdiagnosis',
        title: '西医诊断',
        sortable: 'true'
    }, {
        field: 'chdiagnosis',
        title: '中医诊断',
        sortable: 'true'
    }, {
        field: 'discriminate',
        title: '辩证',
        sortable: 'true',
        visible: false

    }, {
        field: 'prescription',
        title: '处方',
        sortable: 'true'
    }, {
        field: 'editorial',
        title: '按语',
        sortable: 'true',
        visible: false

    }],
    striped: true,
    pagination: true,
    pageList: [10, 20, 50],
    pageSize: 10,
    pageNumber: 1,
    clickToSelect: true,
    smartDisplay: true,
    singleSelect: true,
    url: "/basis/",
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


}).on('uncheck.bs.table', function (e, row) {
    temp = 0;
}).on('check.bs.table', function (e, row) {
    temp = 1;
    rowContent = JSON.stringify(row);  //把json对象解析成string对象
})/*.on('search.bs.table', function (e, text) {
      $("#consoliaTable").bootstrapTable('refresh',{url:"/basisfilter/?value="+text});
})*/;


function searchEvent(){
    var letter=$("#search").val();
    $("#consoliaTable").bootstrapTable('refresh',{url:"/basisfilter/?value="+letter});
}

$('#addCon').click(function () {
    tag = "add";
    $('#table').css('display', 'none');
    $('#conPanel').css('display', 'block');
});

$("form").submit(function (e) {
    e.preventDefault();
});

$('#editCon').click(function () {
    if (temp == 1) {
        tag = "edit";
        var consiliaObj = eval('(' + rowContent + ')');
        //读取填充数据
        if(consiliaObj.patientgender == '女'){
            $('input[name="patientgender"][value="女"]').iCheck('check');
            $('input[name="patientgender"][value="男"]').iCheck('uncheck');
        }
        $('#conForm .form-control').each(function(){
            var key = $(this).attr('name');
            var value = consiliaObj[key];
            if(key == 'clinicdate'){
                value = value.substring(0,10);
            }
            $(this).val(value);
        });

        $('#table').css('display', 'none');
        $('#conPanel').css('display', 'block');
        $('#changePanelName').html("编辑医案数据");
        $('#create').html("确定");
    }
    else {
        alert("请选择编辑行");
    }


});


$('#cancel').click(function () {
    turnPage('../template/modules/consilia/consilia.html');
});

$('#create').click(function () {

    if ($("#conName").val() == "") {
        alert("请填写医案名称");
    }
    else {
        //判断rowContent是否为空，解决Uncaught TypeError: Cannot set property 'basisname' of null问题
        var conObj;
        if(rowContent != null){
            conObj = eval('(' + rowContent + ')');
        }
        else{
            conObj = {};
        }


        $('#conForm .form-control').each(function(){
            var key = $(this).attr('name');
            var value = $(this).val();
            console.log(key+":"+value)
            conObj[key]=value;
            console.log(conObj)
        });
        conObj["patientgender"] = $('input[name="patientgender"]:checked').val();

        if (tag == "add") {
            $.ajax({
                //async:false,
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(conObj),
                url: "/basis/",
                success: function (data) {
                    turnPage('../template/modules/consilia/consilia.html');
                },
                error: function (json) {
                    alert("插入失败");
                    $('#table').css('display', 'none');
                    $('#conPanel').css('display', 'block');
                }
            });
        } else {
            $.ajax({
                //async:false,
                type: "put",
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(conObj),
                url: "/basis/" + conObj.id + "/",
                success: function (data) {
                    turnPage('../template/modules/consilia/consilia.html');
                },
                error: function (json) {
                    alert("修改失败");
                    $('#table').css('display', 'none');
                    $('#conPanel').css('display', 'block');
                }
            });
        }
    }

});
$('#deleteCon').click(function () {
    if (temp == 1) {
        var jsonObjectDelete = eval('(' + rowContent + ')');
        //确认是否删除
        if (confirm("是否删除此条信息？")) {
            $.ajax({
                type: 'delete',
                url: "/basis/" + jsonObjectDelete.id + "/",
                success: function (json) {
                    turnPage('../template/modules/consilia/consilia.html');
                }
            })
        }
    }
    else {
        alert("请选择删除行");
    }
});


/*
 * 上传excel文件*/

function Uploadfile() {
    if ($('#file1').val().length <= 0) {
        alert("请选择xls或者csv文件进行上传！！！")
    }
    else {
        $.ajaxFileUpload({
            //url: 'http://127.0.0.1:8000/tbexerciseinfo/152/?format=json',
            url: '/basisupload/',
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
