$(function () {

    var username2 = $("#username2");    //注册页面用户名

    username2.focus();
    var password2 = $("#password2");    //注册页面密码
    var passwordConfirm = $("#passwordConfirm");   //注册页面确认密码
    var email = $("#email");     //注册页面邮箱


    username2.blur(function () {
        //alert(username2.val());
        if (username2.val() == "") {
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
                data: {"name": username2.val()},
                success: function (msg) {
                    password2.focus();
                },
                error: function (msg) {
                    alert("该用户名已注册!");
                    // alert(msg.responseText);
                    username2.val("");
                    username2.focus();
                }
            })
        }
    });

        password2.blur(function () {
        if (password2.val() == "") {
            $(this).parent().children("label").removeClass("hide");
        }
        else {
            $(this).parent().children("label").addClass("hide");
            passwordConfirm.focus();
        }
    });

    passwordConfirm.blur(function () {
        if (passwordConfirm.val() == "") {
            $(this).parent().children("label").removeClass("hide");
        }
        else {
            $(this).parent().children("label").addClass("hide");
            if (password2.val() == passwordConfirm.val()) {
                email.focus();
            }
            else {
                alert("两次输入密码不一致");
                passwordConfirm.val("");
                passwordConfirm.focus();
            }
        }
    });



    email.blur(function () {
        var ema = email.val();
        if (ema == "") {
            $(this).parent().children("label").removeClass("hide");
        }
        else {
            $(this).parent().children("label").addClass("hide");
            var myReg = /(\S)+[@]{1}(\S)+[.]{1}(\w)+/;
            if (!myReg.test(ema)) {
                alert("email格式不正确!");
                email.val("");
                email.focus();
            }
            else {
                $.ajax({
                    //async: false,
                    type: "post",
                    dataType: "json",
                    url: "/email/",
                    data: {"email": ema},
                    success: function (msg) {

                    },
                    error: function (msg) {
                        alert("该邮箱已注册!");
                        // alert(msg.responseText);
                        email.val("");
                        email.focus();
                    }
                })
            }
        }
    });





    $("#register").click(function () {
        if (username2.val() == "" || password2.val() == "" || passwordConfirm.val() == "" || email.val() == "") {
            alert("请将信息填写完整");
        }
        else {
            $.ajax({
                //async: false,
                type: "post",
                dataType: "json",
                url: "/register/",
                data: {"email": email.val(), "password": password2.val(), "name": username2.val()},
                success: function (msg) {
                    alert("注册成功，请等待管理员审核");
                    username2.val("");
                    username2.focus();
                    password2.val("");
                    passwordConfirm.val("");
                    email.val("");
                },
                error: function (msg) {
                    alert("注册失败!");
                    //alert(msg.responseText);
                }
            })
        }
    });

            document.onkeydown = function (event) {
            e = event ? event : (window.event ? window.event : null);
            if (e.keyCode == 13) {
                $("#register").click();
            }
        };


        /*页面跳转*/

    $("#returnLogin").click(function () {
        window.open('/loginhtml/', '_self');
    });








});