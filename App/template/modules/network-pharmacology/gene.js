/*define the data model of docDatabase fuction
 *基因数据库表*/


var temp = 0;
var rowContent = null;
var tag = null;

var operateEvents = {
    'click .detail': function (e, value, row, index) {
        $("#gene_diseaseTable").bootstrapTable({
            columns: [{
                field: "id",
                title: "疾病-基因关联编号",
                sortable: 'true',
                visible: false
            }, {
                field: "diseaseid",
                title: "疾病编号",
                sortable: 'true',
                visible: false
            }, {
                field: "diseasename",
                title: "疾病名称",
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
                field: "associationtype",
                title: "关联类型",
                sortable: 'true',
                visible: false
            }, {
                field: "sourcedatabase",
                title: "源数据库",
                sortable: "true"
            }, {
                field: "genesymbol",
                title: "基因特征",
                sortable: "true"
            }, {
                field: "geneentrezid",
                title: "基因Entrez ID",
                sortable: "true"
            }],
            striped: true,
            pagination: true,
            pageList: [10, 20, 50],
            pageSize: 10,
            pageNumber: 1,
            //clickToSelect: true,
            smartDisplay: true,
            singleSelect: true,
           // url: "/diseasetogene/?geneid=" + row.id,
            responseHandler: function (res) {
                var count = res.data[res.data.length - 1].count;
                res.data.pop();
                return res
            }
        });
        $("#gene_diseaseTable").bootstrapTable('refresh', {url:"/diseasetogene/?geneid=" + row.id});

        $("#gene_geneTable").bootstrapTable({
            columns: [{
                field: "id",
                title: "基因-基因编号",
                sortable: 'true',
                visible: false
            }, {
                field: "geneaid",
                title: "基因Aid",
                sortable: 'true',
                visible: false
            }, {
                field: "geneaname",
                title: "基因A名称",
                sortable: "true"
            }, {
                field: "genebid",
                title: "基因Bid",
                sortable: 'true',
                visible: false
            }, {
                field: 'genebname',
                title: '基因B名称',
                sortable: 'true'
            }, {
                field: 'detectionmethods',
                title: '监测方法'
            }, {
                field: 'pubmedid',
                title: '文献数据库id'
            }, {
                field: 'interactiontype',
                title: '交互类型'
            }, {
                field: 'sourcedatabase',
                title: '源数据库'
            }, {
                field: 'geneaentrezid',
                title: '基因A基本信息'
            }, {
                field: 'genebentrezid',
                title: '基因B基本信息'
            }],
            striped: true,
            pagination: true,
            pageList: [10, 20, 50],
            pageSize: 10,
            pageNumber: 1,
            //clickToSelect: true,
            smartDisplay: true,
            singleSelect: true
           // url: "/genetogenefilter/?value=" + row.id
        });
        $("#gene_geneTable").bootstrapTable('refresh', {url:"/genetogenefilter/?value=" + row.id});

        $("#drug_geneTable").bootstrapTable({
            columns: [ {
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
            //url: "/drugtogene/?geneid="+row.id,
            responseHandler: function (res) {
                var count = res.data[res.data.length - 1].count;
                res.data.pop();
                return res
            }
        });
        $("#drug_geneTable").bootstrapTable('refresh', {url:"/drugtogene/?geneid="+row.id});

        $("#tablePanel").css("display", "block");
    }
};

function operateFormatter() {
    return '<a class="detail"  title="查看详情"><i class="glyphicon glyphicon-eye-open"></i>'
}

/*$("#docName").val() == "";*/

$("#geneTable").bootstrapTable({
    columns: [{
        field: 'state',
        checkbox: "true"
    }, {
        field: "id",
        title: "基因编号",
        sortable: 'true',
        visible: false
    }, {
        field: "genesymbol",
        title: "基因特征",
        sortable: 'true'
    }, {
        field: "genename",
        title: "基因名称",
        sortable: "true"
    }, {
        field: "status",
        title: "状态",
        sortable: 'true'
    }, {
        field: 'locustype',
        title: '轨迹类型',
        sortable: 'true'
    }, {
        field: 'locusgroup',
        title: '轨迹组'
    }, {
        field: 'previoussymbols',
        title: '之前特征'
    }, {
        field: 'previousname',
        title: '之前名称'
    }, {
        field: 'synonyms',
        title: '同义词'
    }, {
        field: 'chrocmosome',
        title: '染色体'
    }, {
        field: 'entrezid',
        title: 'Entrez ID'
    }, {
        field: 'operate',
        title: '详情',
        events: operateEvents,
        formatter: operateFormatter
    }],
    striped: true,
    pagination: true,
    pageList: [10, 20, 50],
    pageSize: 10,
    pageNumber: 1,
    clickToSelect: true,
    smartDisplay: true,
    singleSelect: true,
    url: "/geneinfor/",
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
    $("#geneTable").bootstrapTable('refresh', {url: "/geneinfor/?genename__contains=" + text});
    $("#tablePanel").css("display", "none");
})*/;

function searchEvent(){
    var letter=$("#search").val();
    $("#geneTable").bootstrapTable('refresh',{url:"/geneinfor/?genename__contains="+letter});
    $("#tablePanel").css("display", "none");
}

$('#addDoc').click(function () {
    tag = "add";
    $("#tablePanel").css("display", "none");
    $('#geneTableOuter').css('display', 'none');
    $('#docPanel').css('display', 'block');
});

$("form").submit(function (e) {
    e.preventDefault();
});

$('#editDoc').click(function () {
    if (temp == 1) {
        tag = "edit";
        var jsonObjectEdit = eval('(' + rowContent + ')');

        $('#geneSymbol').val(jsonObjectEdit.genesymbol);
        $('#geneName').val(jsonObjectEdit.genename);
        $('#status').val(jsonObjectEdit.status);
        $('#locusType').val(jsonObjectEdit.locustype);
        $('#locusGroup').val(jsonObjectEdit.locusgroup);
        $('#previousSymbols').val(jsonObjectEdit.previoussymbols);
        $('#previousName').val(jsonObjectEdit.previousname);
        $('#synonyms').val(jsonObjectEdit.synonyms);
        $('#chrocmosome').val(jsonObjectEdit.chrocmosome);
        $('#EntrezId').val(jsonObjectEdit.entrezid);

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
        $("#tablePanel").css("display", "none");
        $('#geneTableOuter').css('display', 'none');
        $('#docPanel').css('display', 'block');
        $('#changePanelName').html("编辑基因信息");
        $('#create').html("确定");
    }
    else {
        alert("请选择编辑行");
    }


});


$('#cancel').click(function () {
    turnPage('../template/modules/network-pharmacology/network-pharmacology.html');
});

$('#create').click(function () {

    /*    if ($("#docName").val() == "") {
     alert("请填写文献名");
     }
     else {*/
    var jsonObject1 = eval('(' + rowContent + ')');

    var geneSymbol = $("#geneSymbol").val();
    var geneName = $("#geneName").val();
    var status = $("#status").val();
    var locusType = $("#locusType").val();
    var locusGroup = $("#locusGroup").val();
    var previousSymbols = $("#previousSymbols").val();
    var previousName = $("#previousName").val();
    var synonyms = $("#synonyms").val();
    var chrocmosome = $("#chrocmosome").val();
    var EntrezId = $("#EntrezId").val();


    //
    var jsonObj1 = {
        'genesymbol': geneSymbol,
        'genename': geneName,
        'status': status,
        'locustype': locusType,
        'locusgroup': locusGroup,
        'previoussymbols': previousSymbols,
        'previousname': previousName,
        'synonyms': synonyms,
        'chrocmosome': chrocmosome,
        'entrezid': EntrezId
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
            url: "/geneinfor/",
            success: function (data) {
                turnPage('../template/modules/network-pharmacology/network-pharmacology.html');
            },
            error: function (json) {
                alert("插入失败");
                $('#geneTableOuter').css('display', 'none');
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
            url: "/geneinfor/" + jsonObject1.id + "/",
            success: function (data) {
                turnPage('../template/modules/network-pharmacology/network-pharmacology.html');
            },
            error: function (json) {
                alert("修改失败");
                $('#geneTableOuter').css('display', 'none');
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
                url: "/geneinfor/" + jsonObjectDelete.id + "/",
                success: function (json) {
                    turnPage('../template/modules/network-pharmacology/network-pharmacology.html');
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

