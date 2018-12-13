$(function(){
    //注册格式验证
    function checkUname(){//验证用户名格式
        var checkedUname=false;
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
                checkedUname=true;//格式验证正确
            }else{
                unameMsg.html(`<span class="text-danger">请输入至少一位字母开头,3到9位数字字母结尾或者3到9个汉字的用户名</span>`);
            }
                //查询用户是否存在
                $.ajax({
                    url:"http://localhost:3000/users/isExist",
                    type:"post",
                    dataType:"json",
                    data:{uname},
                    success:function(res){
                        if(res.ok==0){
                            unameMsg.css("color","red").html(res.msg);
                            checkedUname=false;//如果用户名存在 格式验证为false
                        }
                    }
                });
        }
        return checkedUname;
    }
    function checkUpwd(){//验证密码格式
            var checkedUpwd=false;
            var upwd=$("input[name=upwd]").val();
            var upwdMsg=$("p.upwdMsg");
            var cupwdMsg=$("p.cupwdMsg");
            if(upwd.length==0){
                upwdMsg.html(`<span class="text-danger">密码不能为空</span>`);
            }else{
                var reg=/^[A-Za-z]+[0-9A-Za-z]{6,9}$/;//至少一位大小写字母开头 3到9位数字字母
                if(reg.test(upwd)){
                    upwdMsg.html(`<span class="text-success">验证通过</span>` );
                    checkedUpwd=true;
                }else{
                    upwdMsg.html(`<span class="text-danger">请输入至少一位字母开头,6到9数字字母结尾的密码</span>`);
                }
            }
            return checkedUpwd;
    }
    function checkCupwd(){
        var upwd=$("input[name=upwd]").val();
        var cupwd=$("input[name=cupwd]").val();
        var cupwdMsg=$("p.cupwdMsg");
        var checkedCupwd=false;
        if(cupwd!=upwd){
            cupwdMsg.html(`<span class="text-danger">两次输入的密码不一致</span>` );
            return;
        }else {
            cupwdMsg.html(`<span class="text-success">验证通过</span>` );
            checkedCupwd=true;
        }
        return checkedCupwd;
    }

    function checkEmail(){
        var email=$("input[name=email]").val();
        var emailMsg=$("p.emailMsg");
        var checkedEmail=false;
        var reg=/^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/;
        if(email.length==0){
            emailMsg.html(`<span class="text-danger">邮箱不能为空</span>`)
        }else  if(reg.test(email)){
            emailMsg.html(`<span class="text-success">验证通过</span>`);
            checkedEmail=true;
        }else{
            emailMsg.html(`<span class="text-danger">请输入正确的邮箱格式</span>`)
        }
        return checkedEmail;
    }
    function checkPhone(){
        var phone=$("input[name=phone]").val();
        var phoneMsg=$("p.phoneMsg");
        var reg=/^1[3-8]\d{9}$/;
        var checkedPhone=false;
        if(phone.length==0){
            phoneMsg.html(`<span class="text-danger">手机号码不能为空</span>`)
        }else if(reg.test(phone)){
            phoneMsg.html(`<span class="text-success">验证通过</span>`);
            checkedPhone=true;
        }else{
            phoneMsg.html(`<span class="text-danger">请输入正确的手机号码格式</span>`)
        }
        return checkedPhone;
    }

    function checkAll(){//所有验证通过才允许登录
        var checkAll=checkUname()&&checkUpwd()&&checkCupwd&&checkEmail()&&checkPhone();
        return checkAll;
    }
    var uname=$("input[name=uname]");
    var upwd=$("input[name=upwd]");
    var cupwd=$("input[name=cupwd]");
    var email=$("input[name=email]");
    var phone=$("input[name=phone]");
    uname.change(function(){//验证用户名是否存在
        checkUname();

    });
    upwd.change(function(){
        checkUpwd();
    });
    cupwd.change(function(){
        checkCupwd();
    });
    email.change(function(){
        checkEmail();
    });
    phone.change(function(){
        checkPhone();
    })
    //注册
    var register=$("button.register");
    register.click(function(){
        if(checkAll()){
            (async function(){
                var uname=$("input[name=uname]").val();
                var upwd=$("input[name=upwd]").val();
                var email=$("input[name=email]").val();
                var phone=$("input[name=phone]").val();
                var res=await $.ajax({
                    url:"http://localhost:3000/users/register",
                    type:"post",
                    dataType:"json",
                    data:{uname,upwd,email,phone}
                });
                if(res.ok==1){
                    alert("注册成功,即将跳转到登录界面");
                    location.href="login.html";
                }
            })();
        }
    });
})