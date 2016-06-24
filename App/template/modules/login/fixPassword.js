$(function () {

        var originPass = $("#originPass");      //修改密码页面原密码
    originPass.focus();
    var pass = $("#pass");               //修改密码页面新密码
    var passConfirm = $("#passConfirm");  //修改密码页面确认新密码


    originPass.blur(function () {
        if (originPass.val() == "") {
            $(this).parent().children("label").removeClass("hide");
        }
        else {
            $(this).parent().children("label").addClass("hide");
            pass.focus();
        }
    });

    pass.blur(function () {
        if (pass.val() == "") {
            $(this).parent().children("label").removeClass("hide");
        }
        else {
            $(this).parent().children("label").addClass("hide");
            passConfirm.focus();
        }
    });

    passConfirm.blur(function () {
        if (passConfirm.val() == "") {
            $(this).parent().children("label").removeClass("hide");
        }
        else {
            $(this).parent().children("label").addClass("hide");
            if (pass.val() != passConfirm.val()) {
                alert("两次输入密码不一致");
                passConfirm.val("");
                passConfirm.focus();
            }
        }
    });


        /*修改密码页面处理*/
    $("#change").click(function () {
        if (originPass.val() == "" || pass.val() == "" || passConfirm.val() == "") {
            alert("请将信息填写完整");
        }
        else {
            $.ajax({
                type: "post",
                dataType: "json",
                url: "/changepass/",
                data: {"password": originPass.val(), "newpassword": pass.val()},
                success: function (msg) {
                    alert("修改成功！");
                    window.open('/logout/', '_self');
                },
                error: function (msg) {
                    //alert("1112");
                    alert(msg.responseText);
                    originPass.val("");
                    originPass.focus();
                }
            });
        }
    });


    $("#cancelChange").click(function () {
        window.open('/', '_self');
    });


         document.onkeydown = function (event) {
            e = event ? event : (window.event ? window.event : null);
            if (e.keyCode == 13) {
                $("#change").click();
            }
        };








});