/*define the data model of docDatabase fuction
 *药物数据库表*/


var temp = 0;
var rowContent = null;
var tag = null;


/*查看详情*/
var operateEvents = {
    'click .detail': function (e, value, row, index) {
        //alert(row.id);
        $("#drug_drugTable").bootstrapTable({
            columns: [{
                field: "id",
                title: "药物相互作用编号",
                sortable: 'true',
                visible: false
            }, {
                field: "drugaid",
                title: "药物A编号",
                sortable: 'true',
                visible: false
            }, {
                field: "druganame",
                title: "药物A名称",
                sortable: 'true'
            }, {
                field: "drugbid",
                title: "药物B编号",
                sortable: 'true',
                visible: false
            }, {
                field: "drugbname",
                title: "药物B名称",
                sortable: "true"
            }, {
                field: "description",
                title: "描述",
                sortable: "true"
            }],
            striped: true,
            pagination: true,
            pageList: [10, 20, 50],
            pageSize: 10,
            pageNumber: 1,
            // clickToSelect: true,
            smartDisplay: true,
            singleSelect: true
            // url: "/drugtodrugfilter/?value=" + row.id
        });
        $("#drug_drugTable").bootstrapTable('refresh', {url: "/drugtodrugfilter/?value=" + row.id});


        $("#drug_geneTable").bootstrapTable({
            columns: [{
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
            //clickToSelect: true,
            smartDisplay: true,
            singleSelect: true,
            //url: "/drugtogene/?drugid="+row.id,
            responseHandler: function (res) {
                var count = res.data[res.data.length - 1].count;
                res.data.pop();
                return res
            }
        });
        $("#drug_geneTable").bootstrapTable('refresh', {url: "/drugtogene/?drugid=" + row.id});

        $("#drugGroup").bootstrapTable({
            columns: [{
                field: "id",
                title: "药物组合",
                sortable: 'true',
                visible: false
            }, {
                field: "drugcombinationdosage",
                title: "药物剂量组合",
                sortable: 'true'
            }, {
                field: "drugcombinationformulation",
                title: "药物组合配方",
                sortable: 'true'
            }, {
                field: "drugcombinationids",
                title: "药物id组合",
                sortable: 'true',
                visible: false
            }, {
                field: "disease",
                title: "疾病",
                sortable: 'true'
            }, {
                field: "effect",
                title: "效果",
                sortable: "true"
            }, {
                field: "synergy",
                title: "协同作用",
                sortable: "true"
            }, {
                field: "clinicalphase",
                title: "临床阶段",
                sortable: "true"
            }, {
                field: "resource",
                title: "资源",
                sortable: "true"
            }, {
                field: "ref",
                title: "依据",
                sortable: "true"
            }, {
                field: "pubmedid",
                title: "文献数据库id",
                sortable: "true"
            }, {
                field: "sideeffect",
                title: "副作用",
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
            //url: "/drugwithdrug/",
            responseHandler: function (res) {
                var count = res.data[res.data.length - 1].count;
                res.data.pop();
                return res
            }
        });
        $("#drugGroup").bootstrapTable('refresh', {url: "/drugwithdrug/?drugcombinationids=" + row.id});

        $("#tablePanel").css("display", "block");

    }
};

function operateFormatter() {
    return '<a class="detail"  title="查看详情"><i class="glyphicon glyphicon-eye-open"></i>'
}

/*$("#docName").val() == "";*/

$("#drugTable").bootstrapTable({
    columns: [{
        field: 'state',
        checkbox: "true"
    }, {
        field: "id",
        title: "药物编号",
        sortable: 'true',
        visible: false
    }, {
        field: "genericname",
        title: "药物通用名称",
        sortable: 'true'
    }, {
        field: "status",
        title: "状态",
        sortable: "true"
    }, {
        field: "formula",
        title: "配方",
        sortable: 'true'
    }, {
        field: 'smile',
        title: 'SMILE',
        sortable: 'true'
    }, {
        field: 'pubchemid',
        title: 'PubChem ID'
    }, {
        field: 'indications',
        title: '迹象'
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
    url: "/durgsinfor/",
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
 $("#drugTable").bootstrapTable('refresh', {url: "/durgsinfor/?genericname__contains=" + text});
 $("#tablePanel").css("display", "none");
 })*/;

$('#addDoc').click(function () {
    tag = "add";
    $("#tablePanel").css("display", "none");
    $('#drugTableOuter').css('display', 'none');
    $('#docPanel').css('display', 'block');
});

$("form").submit(function (e) {
    e.preventDefault();
});

function searchEvent() {
    var letter = $("#search").val();
    $("#drugTable").bootstrapTable('refresh', {url: "/durgsinfor/?genericname__contains=" + letter});
    $("#tablePanel").css("display", "none");
}

$('#editDoc').click(function () {
    if (temp == 1) {
        tag = "edit";
        var jsonObjectEdit = eval('(' + rowContent + ')');

        $('#genericName').val(jsonObjectEdit.genericname);
        $('#status').val(jsonObjectEdit.status);
        $('#formula').val(jsonObjectEdit.formula);
        $('#smile').val(jsonObjectEdit.smile);
        $('#pubchemid').val(jsonObjectEdit.pubchemid);
        $('#indications').val(jsonObjectEdit.indications);

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
        $('#drugTableOuter').css('display', 'none');
        $('#docPanel').css('display', 'block');
        $('#changePanelName').html("编辑药物信息");
        $('#create').html("确定");
    }
    else {
        alert("请选择编辑行");
    }
});

$('#cancel').click(function () {
    turnPage('../template/modules/network-pharmacology/drug.html');
});

$('#create').click(function () {

    /*    if ($("#docName").val() == "") {
     alert("请填写文献名");
     }
     else {*/
    var jsonObject1 = eval('(' + rowContent + ')');

    var genericName = $("#genericName").val();
    var status = $("#status").val();
    var formula = $("#formula").val();
    var smile = $("#smile").val();
    var pubchemid = $("#pubchemid").val();
    var indications = $("#indications").val();


    //
    var jsonObj1 = {
        'genericname': genericName, 'status': status, 'formula': formula, 'smile': smile,
        'pubchemid': pubchemid, 'indications': indications
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
            url: "/durgsinfor/",
            success: function (data) {
                turnPage('../template/modules/network-pharmacology/drug.html');
            },
            error: function (json) {
                alert("插入失败");
                $('#drugTableOuter').css('display', 'none');
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
            url: "/durgsinfor/" + jsonObject1.id + "/",
            success: function (data) {
                turnPage('../template/modules/network-pharmacology/drug.html');
            },
            error: function (json) {
                alert("修改失败");
                $('#drugTableOuter').css('display', 'none');
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
                url: "/durgsinfor/" + jsonObjectDelete.id + "/",
                success: function (json) {
                    turnPage('../template/modules/network-pharmacology/drug.html');
                    //$("#tablePanel").css("display", "none");
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

