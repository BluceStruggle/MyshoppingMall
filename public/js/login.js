$(function(){
    //登录表单验证
    function checkUname(){//验证用户名格式
        var checkedUname=false;//是否验证成功
        //获取用户名输入框的值
        var uname=$("input[name=uname]").val();
        //获取用户名提示信息元素
        var unameMsg=$("p.unameMsg");
        if(uname.length==0){
                unameMsg.html(`<span class="text-danger">用户名不能为空</span>`);
        }else{
            var reg=/(^[A-Za-z]+[0-9A-Za-z]{3,9})|([\u4e00-\u9fa5]{3,9}$)/;//至少一位大小写字母开头 3到9位数字字母 或者3到9个汉字
            if(reg.test(uname)){
                unameMsg.html(`<span class="text-success">验证通过</span>` );
            }else{
                unameMsg.html(`<span class="text-danger">请输入至少一位字母开头,3到9位数字字母结尾或者3到9个汉字的用户名</span>`);
            }
            checkedUname=true;
        }
            return checkedUname;
    }
        function checkUpwd(){//验证密码格式
            var checkedUpwd=false;
            var upwd=$("input[name=upwd]").val();
            var upwdMsg=$("p.upwdMsg");
            if(upwd.length==0){
                upwdMsg.html(`<span class="text-danger">密码不能为空</span>`);
            }else{
            var reg=/^[A-Za-z]+[0-9A-Za-z]{6,9}$/;//至少一位大小写字母开头 3到9位数字字母
            if(reg.test(upwd)){
                upwdMsg.html(`<span class="text-success">验证通过</span>` );
            }else{
                upwdMsg.html(`<span class="text-danger">请输入至少一位字母开头,6到9数字字母结尾的密码</span>`);
            }
            checkedUpwd=true;
        }
            return checkedUpwd;
     }
     function checkAll(){//所有验证通过才允许登录
            var checkAll=checkUname()&&checkUpwd();
            return checkAll;
     }
    var uname=$("input[name=uname]");
    var upwd=$("input[name=upwd]")
    uname.change(function(){
        checkUname();
    });
    upwd.change(function(){
        checkUpwd();
    })


    $("button.login").click(function(){
        if(checkAll()){
            var uname = $("input[name=uname]").val();
            var upwd = $("input[name=upwd]").val();
            (async function () {
                var res = await $.ajax({
                    url: "http://localhost:3000/users/login",
                    type: "post",
                    dataType: "json",
                    data: {uname, upwd},
                });
                if (res.ok == 1) {
                    alert("登录成功!即将返回来时的页面!");
                    if (location.search.startsWith("?back=")) {
                        var url = location.search.slice(6);
                    } else {
                        var url = "index.html";//否则返回首页
                    }
                    location.href = url;
                } else {
                    var loginMsg=$("p.loginMsg");//登录失败时的提示信息
                    loginMsg.css("color","red").html(res.msg);
                }
            })();
        }
    })

})