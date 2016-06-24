/*define the data model of docDatabase fuction
 *药物-基因数据库表*/


var temp = 0;
var rowContent = null;
var tag = null;

/*$("#docName").val() == "";*/

$("#drug-geneTable").bootstrapTable({
    columns: [{
        field: 'state',
        checkbox: "true"
    }, {
        field: "id",
        title: "药物-基因关联编号",
        sortable: 'true',
        visible: false
    }, {
        field: "drugid",
        title: "药物编号",
        sortable: 'true',
        visible: false
    }, {
        field: "drugname",
        title: "药物名称",
        sortable: 'true'
    }, {
        field: "geneid",
        title: "基因编号",
        sortable: 'true',
        visible: false
    }, {
        field: "genename",
        title: "基因名称",
        sortable: 'true'
    }, {
        field: "interactiontype",
        title: "交互类型",
        sortable: 'true'
    }, {
        field: "source",
        title: "来源",
        sortable: "true"
    }, {
        field: "species",
        title: "物种",
        sortable: "true"
    }, {
        field: "genesymbol",
        title: "基因特征",
        sortable: "true"
    }, {
        field: "geneentrez",
        title: "基因Entrez",
        sortable: "true"
    }],
    striped: true,
    pagination: true,
    pageList: [10, 20, 50],
    pageSize: 10,
    pageNumber: 1,
    clickToSelect: true,
    smartDisplay: true,
    singleSelect: true,
    url: "/drugtogene/",
    sidePagination: 'server',
    queryParamsType: 'limit',
    responseHandler: function (res) {
        var count = res.data[res.data.length - 1].count;
        res.data.pop();
        return {
            rows: res.data,
            total: count
        }

    },
    queryParams: function queryParams(params) {
        return {
            "_limit": params.limit,
            "_skip": params.offset
        };
    }
}).on('uncheck.bs.table', function (e, row) {
    temp = 0;
}).on('check.bs.table', function (e, row) {
    temp = 1;
    rowContent = JSON.stringify(row);  //把json对象解析成string对象
})/*.on('search.bs.table', function (e, text) {
 $("#drug-geneTable").bootstrapTable('refresh', {url: "/drugtogenesearch/?value=" + text});
 })*/;


function searchEvent() {
    var letter = $("#search").val();
    $("#drug-geneTable").bootstrapTable('refresh', {url: "/drugtogenesearch/?value=" + letter});
}


$('#addDoc').click(function () {
    tag = "add";
    $('#drug-geneTableOuter').css('display', 'none');
    $('#docPanel').css('display', 'block');
    $('select').selectator({
        useSearch: true,
        labels: {search: '搜索...'}
    });
});

$("form").submit(function (e) {
    e.preventDefault();
});

$('#editDoc').click(function () {
    if (temp == 1) {
        tag = "edit";
        var jsonObjectEdit = eval('(' + rowContent + ')');

        $('#drugname').val(jsonObjectEdit.drugid);
        //$("#drugA").find("option[text='"+jsonObjectEdit.druganame+"'].attr('selected',true)");
        //$('#drugA').text(jsonObjectEdit.druganame).selected;

        //$('#drugB').text(jsonObjectEdit.drugbname);
        $('#genename').val(jsonObjectEdit.geneid);
        $('select').selectator({
            useSearch: true,
            labels: {search: '搜索...'}
        });
        $('#interactiontype').val(jsonObjectEdit.interactiontype);
        $('#source').val(jsonObjectEdit.source);
        $('#species').val(jsonObjectEdit.species);
        $('#genesymbol').val(jsonObjectEdit.genesymbol);
        $('#geneentrezid').val(jsonObjectEdit.geneentrez);


        /* for (var i = 3; i < 6; i++) {
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
         }*/

        $('#drug-geneTableOuter').css('display', 'none');
        $('#docPanel').css('display', 'block');
        $('#changePanelName').html("编辑信息");
        $('#create').html("确定");
    }
    else {
        alert("请选择编辑行");
    }

});


$('#cancel').click(function () {
    turnPage('../template/modules/network-pharmacology/drug-gene.html');
});

$('#create').click(function () {
    /*    if ($("#docName").val() == "") {
     alert("请填写文献名");
     }
     else {*/
    var jsonObject1 = eval('(' + rowContent + ')');

    var drugValue = $("#drugname").find("option:selected").val();
    //alert(drugAValue);
    var drugText = $("#drugname").find("option:selected").text();
    //alert(drugAText);
    var geneValue = $("#genename").find("option:selected").val();
    var geneText = $("#genename").find("option:selected").text();
    var interactiontype = $("#interactiontype").val();
    var source = $("#source").val();
    var species = $("#species").val();
    var genesymbol = $("#genesymbol").val();
    var geneentrezid = $("#geneentrezid").val();


    //
    var jsonObj1 = {
        'drugid': drugValue,
        'drugname': drugText,
        'geneid': geneValue,
        'genename': geneText,
        'interactiontype': interactiontype,
        "source": source,
        "species": species,
        "genesymbol": genesymbol,
        "geneentrez": geneentrezid
    };
    /*var i = 3;
     $("div[name='loop']").each(function () {
     alert(i)
     var txt_label = $(this).find("input[name='label']").val();//对应属性值
     var txt_input = $(this).find("input[name='input']").val();//对应input的值
     if (txt_input != '' || txt_label != '') {
     jsonObj1['input' + i] = {'label': txt_label, 'value': txt_input}
     }
     i++;
     });*/
    //其他字段置空
    /*for(i;i<6;i++){
     jsonObj1['input' + i] = {'label': "", 'value': ""};
     }*/

    if (tag == "add") {
        // alert(jsonObj1);
        $.ajax({
            //async:false,
            type: "post",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(jsonObj1),
            url: "/drugtogene/",
            success: function (data) {
                turnPage('../template/modules/network-pharmacology/drug-gene.html');
            },
            error: function (json) {
                alert("插入失败");
                $('#drug-geneTableOuter').css('display', 'none');
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
            url: "/drugtogene/" + jsonObject1.id + "/",
            success: function (data) {
                turnPage('../template/modules/network-pharmacology/drug-gene.html');
            },
            error: function (json) {
                alert("修改失败");
                $('#drug-geneTableOuter').css('display', 'none');
                $('#docPanel').css('display', 'block');
            }
        });
    }
    //  }

});
$('#deleteDoc').click(function () {
    if (temp == 1) {
        var jsonObjectDelete = eval('(' + rowContent + ')');
        //确认是否删除
        if (confirm("是否删除此条信息？")) {
            $.ajax({
                type: 'delete',
                url: "/drugtogene/" + jsonObjectDelete.id + "/",
                success: function (json) {
                    turnPage('../template/modules/network-pharmacology/drug-gene.html');
                }
            })
        }
    }
    else {
        alert("请选择删除行");
    }
});

/*
 * btn 添加新属性按钮事件*//*

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
 });*/

/*
 * 删除属性input框*/

/*function del_span(obj){
 $(obj).parent().parent().remove();
 }*/


$(function () {

    var selectA = restful("get", '/durgsinfor/', null);
    var string1 = "";
    //alert(selectA);
    for (var i = 0; i < selectA.data.length - 1; i++) {
        string1 += "<option value=" + selectA.data[i].id + ">" + selectA.data[i].genericname + "</option>";
        //alert(string1);
    }
    $("#drugname").html(string1);

    var select = restful("get", '/geneinfor/', null);
    var string2 = "";
    //alert(selectA);
    for (var i = 0; i < select.data.length - 1; i++) {
        string2 += "<option value=" + select.data[i].id + ">" + select.data[i].genename + "</option>";
        //alert(string1);
    }
    $("#genename").html(string2);
});
