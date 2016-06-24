/*权限设置 interface:/alluser/*/


/*用户权限修改、审核*/
var operateEvent = {
    'click .send': function (e, value, row, index) {
        /*        alert(row.is_subjectone);
         alert(row.is_subjecttwo);

         alert(row.is_subjectthree);*/
        var subOneState,subTwoState,subThreeState,adminState;
        subOneState=row.is_subjectone;
        subTwoState=row.is_subjecttwo;
        subThreeState= row.is_subjectthree;
        adminState= row.is_admin;
        if(subOneState==false && subTwoState==false && subThreeState==false && adminState==false){
            alert("提交前请分配权限！");
        }
        else{
               $.ajax({
            type: "put",
            contentType: 'application/json',
            dataType: "json",
            url: "/alluser/" + row.id,
            data: JSON.stringify({
                "is_subjectone": subOneState,
                "is_subjecttwo":subTwoState ,
                "is_subjectthree":subThreeState,
                "is_admin":adminState,
                "is_active": true
            }),
            success: function (msg) {
                alert("操作成功");
                $("#docTable").bootstrapTable('refresh', {url: "/alluser/"});
            }
        })
        }

    }
};

var operateEventSub1 = {
    'click input[type=checkbox]': function (e, value, row, index) {
        //alert(value);
        if (value == true) {
            row.is_subjectone = false;
        }
        else {
            row.is_subjectone = true;
        }
    }
};
var operateEventSub2 = {
    'click input[type=checkbox]': function (e, value, row, index) {
        //alert(value);
        if (value == true) {
            row.is_subjecttwo = false;
        }
        else {
            row.is_subjecttwo = true;
        }
    }
};
var operateEventSub3 = {
    'click input[type=checkbox]': function (e, value, row, index) {
        //alert(value);
        if (value == true) {
            row.is_subjectthree = false;
        }
        else {
            row.is_subjectthree = true;
        }
    }
};
var operateEventAdmin = {
    'click input[type=checkbox]': function (e, value, row, index) {
        //alert(value);
        if (value == true) {
            row.is_admin = false;
        }
        else {
            row.is_admin = true;
        }
    }
};

$("#docTable").bootstrapTable({
    columns: [{
        field: "id",
        title: "用户编号",
        sortable: 'true',
        visible: false
    }, {
        field: "is_active",
        title: "状态",
        sortable: "true",
        formatter: userState
    }, {
        field: "username",
        title: "用户名",
        sortable: "true"
    }, {
        field: 'is_subjectone',
        title: "课题一权限",
        events: operateEventSub1,
        formatter: userSub1
    }, {
        field: 'is_subjecttwo',
        title: "课题二权限",
        events: operateEventSub2,
        formatter: userSub2
    }, {
        field: 'is_subjectthree',
        title: "课题三权限",
        events: operateEventSub3,
        formatter: userSub3
    }, {
        field: 'is_admin',
        title: "管理员权限",
        events: operateEventAdmin,
        formatter: userAdmin
    }, {
        field: "operate",
        title: "操作",
        events: operateEvent,
        formatter: userOperation
    }],
    striped: true,
    pagination: true,
    pageList: [10, 20, 50],
    pageSize: 10,
    pageNumber: 1,
    smartDisplay: true,
    singleSelect: true,
    url: "/alluser/",
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
}).on('search.bs.table', function (e, text) {
    $("#docTable").bootstrapTable('refresh', {url: "/alluser/?username__contains=" + text});
});

/*绑定checkbox和label*/

/*用户权限显示*/

function userSub1(value) {
    var sub1;
    //sub1=value===true?"<div><input type='checkbox'>keti</div>":"<div>111</div>";
    sub1 = value === true ? "<input type='checkbox' checked='checked' name='checkbox'><label>课题一</label>" :
        "<input type='checkbox' name='checkbox'><label>课题一</label>";
    //alert(sub1);
    return sub1;
}

function userSub2(value) {
    var sub2;
    //sub1=value===true?"<div><input type='checkbox'>keti</div>":"<div>111</div>";
    sub2 = value === true ? "<input type='checkbox' checked='checked' name='checkbox'><label>课题二</label>" :
        "<input type='checkbox' name='checkbox'><label>课题二</label>";
    //alert(sub1);
    return sub2;
}

function userSub3(value) {
    var sub3;
    //sub1=value===true?"<div><input type='checkbox'>keti</div>":"<div>111</div>";
    sub3 = value === true ? "<input type='checkbox' checked='checked' name='checkbox'><label>课题三</label>" :
        "<input type='checkbox' name='checkbox'><label>课题三</label>";
    //alert(sub1);
    return sub3;
}

function userAdmin(value) {
    var userAdmin;
    userAdmin = value === true ? "<input type='checkbox'checked='checked' name='checkbox'><label>管理员</label>" :
        "<input type='checkbox' name='checkbox'><label>管理员</label>";
    return userAdmin;
}

/*用户审核状态*/
function userState(value) {
    //alert(value);
    var mark = "";
    mark = value === false ? "<div style='color: red'>未审核</div> " : "<div>已审核</div>";
    return mark;

}

/*用户操作*/
function userOperation(value, row) {

    var operationName = "";
    operationName = row.is_active === false ? "<a href='javascript:void(0)' class='send' style='text-decoration: none;cursor: pointer;color: red'>确定</a>" : "<a class='send' style='text-decoration: none;cursor: pointer'>修改</a>"
    return [operationName].join('');

    //return "<a class='send' style='text-decoration: none;cursor: pointer'>确定</a>"
}

/*筛选未审核用户*/
$("#notYet").click(function () {
    var checkbox = document.getElementById("notYet").checked;
    //alert(checkbox);
    if (checkbox == true) {
        $("#docTable").bootstrapTable('refresh', {url: "/active/?is_active=" + false});
    }
    else {
        $("#docTable").bootstrapTable('refresh', {url: "/alluser/"});
    }
});
