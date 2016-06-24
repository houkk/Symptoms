//ajax函数定义
function restful(typeInfo, urlInfo, dataInfo) {
    /**typeInfo:操作类型；
     * urlInfo:地址；
     * dataInfo:json数据；
     * 操作类型：
     * get：获取（dataInfo为空时，查询所有；dataInfo不为空，条件查询）；
     * 查询(数据分页，暂时每页是十条数据，可后台更改)
     * post：上传；
     * put：更新(按照id)；
     * delete：删除数据（id）；
     * */

    var result = null;
    $.ajax({
        async: false,
        type: typeInfo,
        url: urlInfo,
        dataType: "json",
        //contentType:"application/json",
        data: dataInfo,
        success: function (json) {
            result = json;
        },
        error: function () {
            result = "fail";
        }
    });
    //	.success(function (json) {
    //	//result = json;
    //	result= json;
    //	return result;
    //}).error(function(json){
    //	result = json;
    //	return result;
    //});
    return result;
}

//ajax函数定义——提交数组
function restfulArray(typeInfo, urlInfo, dataInfo) {
    /**typeInfo:操作类型；
     * urlInfo:地址；
     * dataInfo:json数据；
     * 操作类型：
     * get：获取（dataInfo为空时，查询所有；dataInfo不为空，条件查询）；
     * 查询(数据分页，暂时每页是十条数据，可后台更改)
     * post：上传；
     * put：更新(按照id)；
     * delete：删除数据（id）；
     * */

    var result = null;
    $.ajax({
        async: false,
        type: typeInfo,
        url: urlInfo,
        //dataType:"json",
        contentType: "application/json",
        data: JSON.stringify(dataInfo),
        success: function (json) {
            result = json;
        },
        error: function () {
            result = "fail";
        }
    });
    //	.success(function (json) {
    //	//result = json;
    //	result= json;
    //	return result;
    //}).error(function(json){
    //	result = json;
    //	return result;
    //});
    return result;
}


/* 点击切换中间content */
function turnPage(res) {    //url:请求的url  res：存放网页的地址，使用相对地址，django会在自动搜索app的templates文件夹，子目录要自己写  url和res参数格式是 String
    $.ajax({
        type: "get",
        url: res,
        cache: false,
        dateType: "html",
        data: {area: res},
        success: function (html) {
            $('#content').empty();    //首先清空centent区
            $('#content').html(html);  //把下载的html文件添加到centent区中
        },
        error: function () {
            $('#content').empty();
            $('#content').html('<p>出了一些差错，请耐心等待修复：）</p>');
        }
    });
}


$(function () {

    /*加载用户信息*/
    $.ajax({
        type: "get",
        dataType: "json",
        url: "/current/",
        success: function (msg) {
            var username = msg.username;
            var email = msg.email;
            var userId = msg.id;
            $("#userId").html(userId);
            $("#username").html("<i class='fa fa-user fa-fw'></i>&nbsp;&nbsp;" + username);
            $("#email").html("<i class='fa fa-envelope fa-fw'></i>&nbsp;" + email);
        }

    });

    /*页面开始加载时根据用户权限加载不同树*/
    var subject1, subject2, subject3, authSetting;
    var msg = restful("get", "/current/", null);
    subject1 = msg.is_subjectone;
    subject2 = msg.is_subjecttwo;
    subject3 = msg.is_subjectthree;
    authSetting = msg.is_admin;
    var treeOne = "<ul class='topnav nav nav-sidebar accordion' id='accordion'>" +
        "<li class='banner'>课题一</li>" +
        "<li onclick='turnPage(\"../template/modules/document/document.html\")'><a href='#'>文献数据库</a></li>" +
        "<li class='link'><a>层次分析法数据库<i class='fa fa-chevron-down'></i></a></li>" +
            "<ul class='nav submenu' style='display: none;'>" +
                "<li onclick='turnPage(\"../template/modules/level-analysis/level-analysis.html\")'><a>冠心病痰瘀互结证专家咨询问卷</a></li>" +
                "<li onclick='turnPage(\"../template/modules/level-analysis/levelAnalysis_phlegm.html\")'><a>冠心病痰湿证专家咨询问卷</a></li>" +
            "</ul>" +
        "<li onclick='turnPage(\"../template/modules/delphi/delphi.html\")'><a href='#'>改良德尔菲法专家问卷数据库</a></li>" +
/*        "<li class='link'><a>四诊数据库<i class='fa fa-chevron-down'></i></a></li>" +

        "<ul class='nav submenu' style='display: none;'>" +
        "<li onclick='turnPage(\"../template/modules/404.html\")'><a>望诊信息数据库</a></li>" +
        "<li onclick='turnPage(\"../template/modules/404.html\")'><a>闻诊信息数据库</a></li>" +
        "<li onclick='turnPage(\"../template/modules/404.html\")'><a>问诊信息数据库</a></li>" +
        "<li onclick='turnPage(\"../template/modules/404.html\")'><a>切诊信息数据库</a></li>" +
        "</ul>" +*/
        "</ul>";
    var treeTwo = "<ul class='topnav nav nav-sidebar'>" +
        "<li class='banner'>课题二</li>" +
        "<li onclick='turnPage(\"../template/modules/clinical-cohort/clinical-cohort.html\")'><a href='#'>临床队列研究数据库</a></li>" +
        "<li onclick='turnPage(\"../template/modules/404.html\")'><a href='#'>动物实验研究数据库</a></li>" +
        "<li onclick='turnPage(\"../template/modules/404.html\")'><a href='#'>细胞实验研究数据库</a></li>" +
        "<li onclick='turnPage(\"../template/modules/network-pharmacology/network-pharmacology.html\")'><a href='#'>网络药理学研究数据库</a></li>" +
        "</ul>";
    var treeThree = "<ul class='topnav nav nav-sidebar'>" +
        "<li class='banner'>课题三</li>" +
        "<li onclick='turnPage(\"../template/modules/consilia/consilia.html\")'><a href='#'>医案数据库</a></li>" +
        "<li onclick='turnPage(\"../template/modules/404.html\")'><a href='#'>访谈资料数据库</a></li>" +
        "</ul>";
    var treeSetting = "<ul class='topnav nav nav-sidebar'>" +
        "<li class='banner'>设置</li>" +
        "<li onclick='turnPage(\"../template/modules/authority/authority.html\")'><a href='#'>权限设置</a></li>" +
        "</ul>";

    if (subject1 == true) {
        $(".sidebar").append(treeOne);
    }
    if (subject2 == true) {
        $(".sidebar").append(treeTwo);
    }
    if (subject3 == true) {
        $(".sidebar").append(treeThree);
    }
    if (authSetting == true) {
        $(".sidebar").append(treeSetting);
    }

    $(".sidebar:first-child li").eq(1).click();
    $(".sidebar:first-child li").eq(1).addClass('active');


    /*侧边栏鼠标点击颜色切换*/
    $('.topnav li').click(function () {
        $('.topnav li.active').removeClass('active');
        $(this).addClass('active');
    });


    /*点击显示下拉效果*/
    $(".link").click(function () {
        /*$(".submenu").show("6000");
        $(".submenu").css({"display": "block"});*/
        $(".submenu").toggle(500);
    });


    /*注销*/
    $("#logout").click(function () {
        window.open('/logout/', '_self');
    });

    /*修改密码*/
    $("#changePassword").click(function () {
        window.open('/fixpassword/', '_self');
    });

});





