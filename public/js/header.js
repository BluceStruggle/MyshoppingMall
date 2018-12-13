$(function(){
    //1.动态创建link引用header.css
    $("<link rel='stylesheet' href='css/header.css'>").appendTo("head");//将引用的header放进head标签末尾
    //2.ajax请求header html片段
    $.ajax({
        url:"http://localhost:3000/header.html",
        type:"get",
        success:function(res){
            $("#header").replaceWith(res);//用请求到的headerhtml替换index页面中的header
            //查找触发事件元素
            var $btnSearch=$("button.search");//获取搜索按钮
            var $inputSearch=$btnSearch.prev();//获取搜索输入框
            //绑定事件处理函数
            $btnSearch.click(function(){
                //查找要修改元素
                //修改元素
                var kw=$inputSearch.val().trim();//将输入框的值给kw
                if(kw!==""){
                    location.href=`products.html?kwords=${kw}`;
                }
            });
            $inputSearch.keyup(function(e){
                    if(e.keyCode==13){//输入框回车事件
                            $btnSearch.click();//模拟触发
                    }
            });
            if(location.search.indexOf("kwords")!=-1){//location.search返回当前url中查询部分(?后的内容)
                var kwords=decodeURI(//解码
                    location.href.split("=")[1]//按"="切割本地url,获得=后的内容
                );
                $inputSearch.val(kwords);//将解码后的kwords作为输入框的值
            }
            //登录跳转 可返回登录前页面
                var $login=$("a.login");
                $login.click(function(){
                    location.href="login.html?back="+location.href;//login.html?back=拼接上当前url路径 赋值给当前路径作为跳转的新页面
                });
                //注册跳转
            var $register=$("a.register");
            $register.click(function(){
                location.href="register.html?back="+location.href;
            });
                 $.ajax({
                    url:"http://localhost:3000/users/islogin",
                    type:"get",
                    dataType:"json",
                    success:function(res){
                        if(res.ok==1){
                            var userLogin=$("span.userHead>a:first-child");
                            var html=`<span class="text-white">欢迎${res.uname}</span>`
                            userLogin.replaceWith(html);
                        }else{
                            $("div>span.userLike_cart a").hide();
                            $("span.userHead>a.loginOut").hide();
                        }
                    }
                });
                 //注销
                var loginOut=$("span.userHead>a.loginOut");
                loginOut.click(function(){
                    $.ajax({
                        url:"http://localhost:3000/users/loginOut",
                        type:"get",
                        success:function(){
                            history.go(0);
                        }
                    })
                });
        }
    })
})