/*define the data model of docDatabase fuction
 *药物组合数据库表*/

$("#drug-groupTable").bootstrapTable({
    columns: [{
        field: 'state',
        checkbox: "true"
    }, {
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
        title: "文献数据库ID",
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
    url: "/drugwithdrug/",
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
 $("#drug-groupTable").bootstrapTable('refresh', {url: "/drugwithdrugsearch/?value=" + text});
 })*/;

function searchEvent() {
    var letter = $("#search").val();
    $("#drug-groupTable").bootstrapTable('refresh', {url: "/drugwithdrugsearch/?value=" + letter});
}

//这里
//var groupData ;
$('#addDoc').click(function () {
    tag = "add";
    $('#drugGroupTableOuter').css('display', 'none');
    $('#docPanel').css('display', 'block');
    $('select').selectator({
        useSearch: true,
        labels: {search: '搜索...'}
    });
});


/*这里注释*/
groupData = restful('get', '/durgsinfor/', '');
groupData.data.pop();
var options = "";
$.each(groupData.data, function (i, result) {
    options += '<option value=' + groupData.data[i].id + ' class="option_one">' + groupData.data[i].genericname + '</option>'
});
var html = '<div class="row myrow" style="padding-left: 25px;margin-top: 0px"> ' +
    '<div class="col-md-7"><select id="selectBox" name="selectBox" onchange="groupdata(this)">' + options + '</select></div> ' +
    '<div class="col-md-2"><input id="input0" type="text" class="form-control number"></div> ' +
        /* '<div class="col-md-2"> <input type="text" class="form-control" > </div> ' +*/
    '</div>';
var html1 = '<div class="row myrow " style="padding-left: 25px"> ' +
    '<div class="col-md-7"> <select name="selectBox">' + options + '</select></div> ' +
    '<div class="col-md-2"> <input type="text" class="form-control number"> </div> ' +
        /*  '<div class="col-md-2"> <input type="text" class="form-control" > </div> ' +*/
    '<div class="col-md-1"> <span class="glyphicon glyphicon-remove" aria-label="删除" onclick="del_span(this)"></span></div>' +
    '</div>';

$('#addGroup').before(html);

$('#addGroup').click(function () {
    $('#addGroup').before(html1);

    $('select').selectator({
        useSearch: true,
        labels: {search: '搜索...'}
    });
});

/*删除属性input框*/

function del_span(obj) {
    $(obj).parent().parent().remove();
    /*    var value = $(obj).parent().parent().find('select option:selected').val();
     alert(value);
     groupData.data.push(value);*/

}

function groupdata(obj) {
    var i = $(obj).val();
    groupData.data.splice(i - 1, 1);
}


$("form").submit(function (e) {
    e.preventDefault();
});

$('#editDoc').click(function () {
    if (temp == 1) {
        tag = "edit";
        var jsonObjectEdit = eval('(' + rowContent + ')');

        var countName = jsonObjectEdit.drugcombinationformulation;
        var countId = jsonObjectEdit.drugcombinationids;
        var countNumber = jsonObjectEdit.drugcombinationdosage;
        //alert(countName);

        /*$('select').selectator({
         useSearch: true,
         labels: {search: '搜索...'}
         });*/

        var htmlString = "";
        //alert(countName.length);
        for (var i = 1; i < countName.length; i++) {

            htmlString += '<div class="row myrow " style="padding-left: 25px"> ' +
            '<div class="col-md-7"><select id="selectBox' + i + '" name="selectBox">' + options + '</select></div> ' +
            '<div class="col-md-2"><input type="text" id="input' + i + '" class="form-control number"></div> ' +
                /*            '<div class="col-md-2"> <input type="text" class="form-control" > </div> ' +*/
            '<div class="col-md-1"><span class="glyphicon glyphicon-remove" aria-label="删除" onclick="del_span(this)"></span></div>' +
            '</div>';
        }
        //alert(htmlString);
        $('#addGroup').before(htmlString);
        $("select").html(options);

        $("#selectBox").val(countId[0]);
        $("#input0").val(countNumber[0]);
        for (var i = 1; i < countName.length; i++) {
            $("#selectBox" + i).val(countId[i]);
            $("#input" + i).val(countNumber[i]);
        }
        $('select').selectator({
            useSearch: true,
            labels: {search: '搜索...'}
        });
        $('#disease').val(jsonObjectEdit.disease);
        $('#effect').val(jsonObjectEdit.effect);
        $('#synergy').val(jsonObjectEdit.synergy);
        $('#clinicalphase').val(jsonObjectEdit.clinicalphase);
        $('#resource').val(jsonObjectEdit.resource);
        $('#ref').val(jsonObjectEdit.ref);
        $('#pubmedid').val(jsonObjectEdit.pubmedid);
        $('#sideeffect').val(jsonObjectEdit.sideeffect);

        $('#drugGroupTableOuter').css('display', 'none');
        $('#docPanel').css('display', 'block');
        $('#changePanelName').html("编辑信息");
        $('#create').html("确定");
    }
    else {
        alert("请选择编辑行");
    }

});


$('#cancel').click(function () {
    turnPage('../template/modules/network-pharmacology/drugGroup.html');
});

$('#create').click(function () {
    var jsonObject1 = eval('(' + rowContent + ')');

    //var temp=$("#docForm select");
    //alert(temp);
    var selectName = [];
    var selectId = [];
    $("#docForm select").each(function () {
        selectName.push($(this).find("option:selected").text());
        selectId.push($(this).find("option:selected").val());
    });
    //alert(selectId);
    //alert(selectName);


    //var tempNumber=$("#docForm .number");
    //alert(tempNumber);
    var inputName = [];
    $("#docForm .number").each(function () {
        inputName.push($(this).val());
    });
    //alert(inputName);


    var drugcombinationdosage = inputName;
    var drugcombinationformulation = selectName;
    var drugcombinationids = selectId;
    var disease = $("#disease").val();
    var effect = $("#effect").val();
    var synergy = $("#synergy").val();
    var clinicalphase = $("#clinicalphase").val();
    var resource = $("#resource").val();
    var ref = $("#ref").val();
    var pubmedid = $("#pubmedid").val();
    var sideeffect = $("#sideeffect").val();


    //
    var jsonObj1 = {
        'drugcombinationdosage': drugcombinationdosage,
        'drugcombinationformulation': drugcombinationformulation,
        'drugcombinationids': drugcombinationids,
        'disease': disease,
        'effect': effect,
        'synergy': synergy,
        'clinicalphase': clinicalphase,
        'resource': resource,
        'ref': ref,
        'pubmedid': pubmedid,
        'sideeffect': sideeffect
    };


    if (tag == "add") {
        // alert(jsonObj1);
        $.ajax({
            //async:false,
            type: "post",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(jsonObj1),
            url: "/drugwithdrug/",
            success: function (data) {
                turnPage('../template/modules/network-pharmacology/drugGroup.html');
            },
            error: function (json) {
                alert("插入失败");
                $('#drugGroupTableOuter').css('display', 'none');
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
            url: "/drugwithdrug/" + jsonObject1.id + "/",
            success: function (data) {
                turnPage('../template/modules/network-pharmacology/drugGroup.html');
            },
            error: function (json) {
                alert("修改失败");
                $('#drugGroupTableOuter').css('display', 'none');
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
                url: "/drugwithdrug/" + jsonObjectDelete.id + "/",
                success: function (json) {
                    turnPage('../template/modules/network-pharmacology/drugGroup.html');
                }
            })
        }
    }
    else {
        alert("请选择删除行");
    }
});



