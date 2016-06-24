/*define the data model of docDatabase fuction
 *文献数据库表*/


var temp = 0;
var rowContent = null;
var tag = null;

$("#docName").val() == "";

$("#docTable").bootstrapTable({
    columns: [{
        field: 'state',
        checkbox: "true"
    }, {
        field: "id",
        title: "文献编号",
        formatter: 'nameFormatter',
        sortable: 'true',
        visible: false
    }, {
        field: "literaturename",
        title: "文献名",
        sortable: "true",
        sorter: 'starsSorter'
    }, {
        field: "authorname",
        title: "作者",
        sortable: 'true'
    }, {
        field: 'interlink',
        title: '链接',
        sortable: 'true'
    }, {
        field: 'input3.value',
        title: '预留借口',
        visible: false
    }, {
        field: 'input4.value',
        title: '预留借口',
        visible: false
    }, {
        field: 'input5.value',
        title: '预留借口',
        visible: false
    }],
    striped: true,
    pagination: true,
    pageSize: 10,
    pageNumber: 1,
    pageList:"[10,30,50]",
    locale:"zh-CN",
    clickToSelect: true,
    smartDisplay: true,
    singleSelect: true,
    url: "/literature/",
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
      $("#docTable").bootstrapTable('refresh',{url:"/litfilter/?value="+text});
})*/;

function searchEvent(){
    var letter=$("#search").val();
    $("#docTable").bootstrapTable('refresh',{url:"/litfilter/?value="+letter});
}

$('#addDoc').click(function () {
    tag = "add";
    $('#table').css('display', 'none');
    $('#docPanel').css('display', 'block');
});

$("form").submit(function (e) {
    e.preventDefault();
});

$('#editDoc').click(function () {
    if (temp == 1) {
        tag = "edit";
        var jsonObjectEdit = eval('(' + rowContent + ')');

        $('#docName').val(jsonObjectEdit.literaturename);
        $('#docAuthor').val(jsonObjectEdit.authorname);
        $('#docLink').val(jsonObjectEdit.interlink);

        for (var i = 3; i < 6; i++) {
            if (jsonObjectEdit['input' + i] != null) {
                if(jsonObjectEdit['input' + i].label!="" || jsonObjectEdit['input' + i].value!=""){
                    var html = " <div class='row myrow' name='loop'> " +
                        "<div class='col-md-2'>" +
                        "<input name='label' type='text' class='form-control'> " +
                        "</div> " +
                        "<div class='col-md-9'> " +
                        "<input name='input' type='text' class='form-control'>" +
                        "</div>" +
                        "<div class='col-md-1'> " +
                        "<span class='glyphicon glyphicon-remove' aria-label='删除' onclick='del_span(this)'></span> " +
                        "</div>" +
                        "</div>"
                    $('#btn-attr').before(html);
                    $('#adddiv').children().eq(i).find('input[name="label"]').val(jsonObjectEdit['input' + i].label);
                    $('#adddiv').children().eq(i).find('input[name="input"]').val(jsonObjectEdit['input' + i].value);
                }
                else {
                    break;
                }
            }
        }
        $('#table').css('display', 'none');
        $('#docPanel').css('display', 'block');
        $('#changePanelName').html("编辑文献数据");
        $('#create').html("确定");
    }
    else {
        alert("请选择编辑行");
    }


});


$('#cancel').click(function () {
    turnPage('../template/modules/document/document.html');
});

$('#create').click(function () {

    if ($("#docName").val() == "") {
        alert("请填写文献名");
    }
    else {
        var jsonObject1 = eval('(' + rowContent + ')');

        var authorname = $("input[name='authorname']").val();
        var literaturename = $("input[name='literaturename']").val();
        var interlink = $("input[name='interlink']").val();

        //
        var jsonObj1 = {'authorname': authorname, 'literaturename': literaturename, 'interlink': interlink}
        var i = 3;
        $("div[name='loop']").each(function () {
            alert(i)
            var txt_label = $(this).find("input[name='label']").val();//对应属性值
            var txt_input = $(this).find("input[name='input']").val();//对应input的值
            if (txt_input != '' || txt_label != '') {
                jsonObj1['input' + i] = {'label': txt_label, 'value': txt_input}
            }
            i++;
        });
        //其他字段置空
        for(i;i<6;i++){
            jsonObj1['input' + i] = {'label': "", 'value': ""};
        }

        if (tag == "add") {
            // alert(jsonObj1);
            $.ajax({
                //async:false,
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(jsonObj1),
                url: "/literature/",
                success: function (data) {
                    turnPage('../template/modules/document/document.html');
                },
                error: function (json) {
                    alert("插入失败");
                    $('#table').css('display', 'none');
                    $('#docPanel').css('display', 'block');
                }
            });
        } else {
            $.ajax({
                //async:false,
                type: "put",
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(jsonObj1),
                url: "/literature/" + jsonObject1.id + "/",
                success: function (data) {
                    turnPage('../template/modules/document/document.html');
                },
                error: function (json) {
                    alert("修改失败");
                    $('#table').css('display', 'none');
                    $('#docPanel').css('display', 'block');
                }
            });
        }
    }

});
$('#deleteDoc').click(function () {
    if (temp == 1) {
        var jsonObjectDelete = eval('(' + rowContent + ')');
        //确认是否删除
        if (confirm("是否删除此条信息？")) {
            $.ajax({
                type: 'delete',
                url: "/literature/" + jsonObjectDelete.id + "/",
                success: function (json) {
                    turnPage('../template/modules/document/document.html');
                }
            })
        }
    }
    else {
        alert("请选择删除行");
    }
});

/*
 * btn 添加新属性按钮事件*/

$('#addAtt').click(function () {
    if($('div[name="loop"]').length >= 3)
    {
        alert('添加达到上限')
    }
    else{
        var html = " <div class='row myrow' name='loop'> " +
            "<div class='col-md-2'>" +
            "<input name='label' type='text' class='form-control'> " +
            "</div> " +
            "<div class='col-md-9'> " +
            "<input name='input' type='text' class='form-control'>" +
            "</div>" +
            "<div class='col-md-1'> " +
            "<span class='glyphicon glyphicon-remove' onclick='del_span(this)'></span> " +
            "</div>" +
            "</div>"
        $('#btn-attr').before(html);
    }
});

/*
 * 删除属性input框*/

function del_span(obj){
    $(obj).parent().parent().remove();
}


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

