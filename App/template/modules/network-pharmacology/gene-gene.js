/*define the data model of docDatabase fuction
 *药物数据库表*/


var temp = 0;
var rowContent = null;
var tag = null;

/*$("#docName").val() == "";*/

$("#gene-gene-Table").bootstrapTable({
    columns: [{
        field: 'state',
        checkbox: "true"
    }, {
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
    clickToSelect: true,
    smartDisplay: true,
    singleSelect: true,
    url: "/genetogene/",
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
 $("#gene-gene-Table").bootstrapTable('refresh',{url:"/genetogenesearch/?value="+text});
 })*/;

function searchEvent() {
    var letter = $("#search").val();
    $("#gene-gene-Table").bootstrapTable('refresh', {url: "/genetogenesearch/?value=" + letter});
}

$('#addDoc').click(function () {
    tag = "add";
    $('#geneTableOuter').css('display', 'none');
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

        $('#geneaname').val(jsonObjectEdit.geneaid);
        $('#genebname').val(jsonObjectEdit.genebid);
        $('select').selectator({
            useSearch: true,
            labels: {search: '搜索...'}
        });
        $('#detectionmethods').val(jsonObjectEdit.detectionmethods);
        $('#pubmedid').val(jsonObjectEdit.pubmedid);
        $('#interactiontype').val(jsonObjectEdit.interactiontype);
        $('#sourcedatabase').val(jsonObjectEdit.sourcedatabase);
        $('#geneaentrezid').val(jsonObjectEdit.geneaentrezid);
        $('#genebentrezid').val(jsonObjectEdit.genebentrezid);


        $('#geneTableOuter').css('display', 'none');
        $('#docPanel').css('display', 'block');
        $('#changePanelName').html("编辑信息");
        $('#create').html("确定");
    }
    else {
        alert("请选择编辑行");
    }

});


$('#cancel').click(function () {
    turnPage('../template/modules/network-pharmacology/gene-gene.html');
});

$('#create').click(function () {
    var jsonObject1 = eval('(' + rowContent + ')');

    var geneaid = $("#geneaname option:selected").val();
    var geneaname = $("#geneaname option:selected").text();
    var genebid = $("#genebname option:selected").val();
    var genebname = $("#genebname option:selected").text();
    var detectionmethods = $("#detectionmethods").val();
    var pubmedid = $("#pubmedid").val();
    var interactiontype = $("#interactiontype").val();
    var sourcedatabase = $("#sourcedatabase").val();
    var geneaentrezid = $("#geneaentrezid").val();
    var genebentrezid = $("#genebentrezid").val();

    //
    var jsonObj1 = {
        'geneaid': geneaid,
        'geneaname': geneaname,
        'genebid': genebid,
        'genebname': genebname,
        'detectionmethods': detectionmethods,
        'pubmedid': pubmedid,
        'interactiontype': interactiontype,
        'sourcedatabase': sourcedatabase,
        'geneaentrezid': geneaentrezid,
        'genebentrezid': genebentrezid
    };


    if (tag == "add") {
        // alert(jsonObj1);
        $.ajax({
            //async:false,
            type: "post",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(jsonObj1),
            url: "/genetogene/",
            success: function (data) {
                console.log('ok')
                turnPage('../template/modules/network-pharmacology/gene-gene.html');
            },
            error: function (json) {
                alert("插入失败");
                $('geneTableOuter').css('display', 'none');
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
            url: "/genetogene/" + jsonObject1.id + "/",
            success: function (data) {
                turnPage('../template/modules/network-pharmacology/gene-gene.html');
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
                url: "/genetogene/" + jsonObjectDelete.id + "/",
                success: function (json) {
                    turnPage('../template/modules/network-pharmacology/gene-gene.html');
                }
            })
        }
    }
    else {
        alert("请选择删除行");
    }
});

$(function () {

    var selectA = restful("get", '/geneinfor/', null);
    var string1 = "";
    //alert(selectA);
    for (var i = 0; i < selectA.data.length - 1; i++) {
        string1 += "<option value=" + selectA.data[i].id + ">" + selectA.data[i].genename + "</option>";
        //alert(string1);
    }
    $("#geneaname").html(string1);
    $("#genebname").html(string1);
});


