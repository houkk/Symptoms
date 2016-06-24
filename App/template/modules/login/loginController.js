$(function () {



    var username = $("#username");      //登录页面用户名

    username.focus();
    var password = $("#password");        //登录页面密码


    /*登录界面功能*/

    username.blur(function () {
        if (username.val() == "") {
            $(this).parent().children("label").removeClass("hide");
        }
        else {
            $(this).parent().children("label").addClass("hide");
            //alert(username2.val());
            $.ajax({
                //async: false,
                type: "post",
                dataType: "json",
                url: "/username/",
                data: {"name": username.val()},
                success: function (msg) {
                    alert("该用户名不存在");
                    username.val("");
                    username.focus();
                },
                error: function (msg) {
                    // alert(msg.responseText);
                    password.focus();
                }
            })
        }
    });


    password.blur(function () {
        if (password.val() == "") {
            $(this).parent().children("label").removeClass("hide");
        }
        else {
            $(this).parent().children("label").addClass("hide");
        }
    });

    $("#login").click(function () {
        // var checkbox=$(".rememberSign").attr("checked");
        var checkbox = document.getElementById("checkRem").checked;
        if (username.val() == "" || password.val() == "") {
            alert("请将信息填写完整");
            //alert(checkbox);
        }
        else {
            $.ajax({
                //async: false,
                type: "post",
                dataType: "json",
                url: "/login/",
                data: {"name": username.val(), "password": password.val(), "remember": checkbox},
                success: function (msg) {
                    window.open('/', '_self');
                    // alert(msg);
                },
                error: function (msg) {
                    alert(msg.responseText);
                    password.val("");
                    password.focus();
                }
            })
        }

    });

        $(".register").click(function () {
        window.open('/registerhtml/', '_self');
    });


        document.onkeydown = function (event) {
            e = event ? event : (window.event ? window.event : null);
            if (e.keyCode == 13) {
                $("#login").click();
            }
        };

});
