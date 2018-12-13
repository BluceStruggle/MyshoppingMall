$(function(){
    if(location.search.indexOf("kwords=")!=-1){
        var kwords=decodeURI(location.search.split("=")[1]);
        //分页
        var pno=0;
        function loadPage(no=0){//no新页号
                pno=no;
                $.ajax({
                    url:"http://localhost:3000/products",
                    type:"get",
                    data:{kwords,pno},
                    dataType:"json",
                    success:function(output){
                            var {products,pageCount}=output;
                            var html="";
                            for(var p of products){
                                var{lid,title,price,md}=p;
                                html+=`<div class="col-xl-4 mb-3">
                                    <div class="my_pro_bd my_pro_hv product"><!-- product js事件标识类 -->
                                <!--  --><img src="${md}" alt="" class="img-fluid ">
                                    <div>
                                        <ul class="list-unstyled text-center">
                                        <li class="small">分类</li>
                                        <li><a href="product_details.html?lid=${lid}" class="small text-dark font-weight-bold ">${title}</a></li>
                                        <li><b class="text-danger">￥${price.toFixed(2)}</b><s class="text-muted ">$990.00</s></li>
                                        <li class="text-danger ">*****</li>
                                        <li>
                                            <a href="#" class="small text-dark">喜欢</a>
                                            <a href="#" class="small text-dark">对比</a>
                                            <a href="#" class="small text-dark">浏览</a>
                                        </li>
                                        <button class="myQtyBtn" type="button">-</button>
                <input type="text" style="width: 40px;" class="myQtyInput" value="1">
                <button class="myQtyBtn" type="button">+</button>
                 <!-- 商品悬停样式 -->
                                        <!-- 悬停加入购物车 -->
                                        <div class="cart">
                                            <a href="#" class="btn btn-danger text-white font-weight-bold" data-lid="${lid}">
                                                加入购物车
                                            </a>
                                        </div>
                                        <!-- 商品悬停样式结束 -->
                                    </ul>
                                </div>
                             
                            </div>
                        </div>`
                            }
                            var productRow=$("div.productList").children().first();
                                    productRow.html(html);
                                    //页码
                            var html="";
                            for(var i=1;i<=pageCount;i++){
                                html+=`<li class="page-item ${i==pno+1?'active':' '}"><a href="#" class="page-link text-dark">${i}</a></li>`
                            }
                            var ul=$("div.productList").next().find("div>ul");
                            ul.children(":not(:first-child):not(:last-child)").remove();//先删除上一页下一页间的li
                            ul.children().first().after(html);//将上面html片段追加在ul后
                            if(pno==0){
                                ul.children().first().addClass("disabled");//此时的ul的第一个孩子是上一页
                            }else{
                                ul.children().first().removeClass("disabled");
                            }
                            if(pno==pageCount-1){
                                ul.children().last().addClass("disabled");//下一页禁用
                            }else{
                                ul.children().last().removeClass("disabled");
                            }
                    }
                });//ajax结束
        }
        loadPage();
        //点击跳转对应的页码
        var productList=$("div.productList");
        var ul=productList.next().find("div>ul");
        ul.on("click","a",function(e){
               e.preventDefault();
                var a=$(this);
                if(!a.parent().is(".disabled,.active")){
                    if(a.parent().is(":first-child")){//上一页
                            var no=pno-1;
                    }else if(a.parent().is(":last-child")){//下一页
                            var no=pno+1;
                    }else{
                        var no=a.html()-1;//按钮内容减一
                    }
                    loadPage(no);//重新加载页面
                }
        });
        //商品+ -按钮 加入购物车
        productList.on("click","button,a.btn",function(e){
            e.preventDefault();
            var btn=$(this);
            if(btn.is("button")){
                var input=btn.siblings("input");//button所有的input兄弟
                var n=parseInt(input.val());//输入框的内容
                if(btn.html()=="+")
                    n++;
                else if(n>1)
                    n--;
                input.val(n);//将改变后的值给input
            }else{//点击加入购物车 div.cart a.btn
                (async function(){
                    var res=await $.ajax({
                        url:"http://localhost:3000/users/islogin",
                        type:"get",
                        dataType:"json"
                    });
                    if(res.ok==1){
                        var lid=btn.attr("data-lid");
                        var count=btn.parent().siblings("input").val();//a.btn的父亲div.cart
                        await $.ajax({
                            url:"http://localhost:3000/cart/add",
                            type:"get",
                            data:{lid,count}
                        });
                        btn.siblings("input").val(1);//添加购物车成功后 输入框中的值变为1
                        alert("添加成功");
                    }else{
                        alert("请登录");
                    }
                })();
            }
        });
        //未登录不能使用购物车
        async function loadCart(){
            var res=await $.ajax({
                url:"http://localhost:3000/users/isLogin",
                type:"get",
                dataType:"json"
            });
            if(res.ok==0){
                alert("暂未登录,无法使用购物车");
            }else{//加载购物车
                var res=await $.ajax({
                    url:"http://localhost:3000/cart/items",
                    type:"get",
                    dataType:"json"
                });
                var html="",totalPrice=0;
                for(var item of res){
                    var {iid,title,count,price}=item;
                    totalPrice+=price*count;
                     html+=`<li>
                                    <span class="title">${title}</span>
                                    <button data-iid="${iid}">-</button>
                                    <input type="text" class="count" value="${count}">
                                    <button data-iid="${iid}">+</button>
                                    <span>￥${(price*count).toFixed(2)}</span>
                                </li>`
                }
                //购物车
                var myCart=document.getElementsByClassName("myCart")[0];
                //每次加载前删除除了li头和li尾的其余li
                /*var lis=document.querySelectorAll("div.cartList ul li:nth-child(n+2));//获取除了第一个和最后一个li  有错误*/
                var cartUl=document.querySelector("div.cartList>ul");//获取ul
                $(cartUl).children(":gt(0):not(:last)").remove();
                var cartInput=myCart.children[1].children[0].children[1].children[1];//获取数量input输入框
                cartInput.value="";
                var cartFoot=document.getElementsByClassName("cartFoot")[0];//获取购物车尾部li
                cartFoot.children[2].innerHTML="总价:"+`￥${ totalPrice.toFixed(2)}`;//总价
                var cartHead=myCart.children[1].children[0].children[0];//购物车头部
               /*var frag=document.createDocumentFragment();//文档片段
                frag.appendChild(html);此处问题 appendChild需要一个节点 而html是一个字符串
                cartHead.appendChild(frag);
                */
                $(cartHead).after(html);
            }
        }
        loadCart();
        //+ -
        var cartUl=document.querySelector("div.cartList>ul");//获取ul
        cartUl.onclick=function(e){
                if(e.target.tagName=="BUTTON"){
                    var btn=e.target;
                    (async function(){
                        var iid=btn.getAttribute("data-iid");
                        var count=btn.parentElement.children[2].value;//获取input值
                        if(btn.innerHTML=="+")
                            count++;
                        else
                            count--;
                        if(count==0)
                            if(!confirm("是否删除该商品"))
                                return;
                            await $.ajax({
                                url:"http://localhost:3000/cart/update",
                                type:"get",
                                data:{iid,count}
                            });
                            loadCart()
                    })();
                }
        }
             //清空购物车
         var clearCart=document.getElementsByClassName("cartFoot")[0].children[0];//清空按钮
        clearCart.onclick=function(){
            if(!confirm("是否清空购物车"))
                return;
            (async function(){
                var res=await $.ajax({
                    url:"http://localhost:3000/cart/clearCart",
                    type:"get",
                    dataType:"json"
                });
                    if(res.ok==1){
                        alert(res.msg);
                        history.go(0);
                    }
            })();
        }
        //结算

    }



    /*鼠标移入出现加入购物车*/

    /*右侧固定导航个人中心 购物车 回到顶部*/
    //个人中心

    //购物车 鼠标进入购物车时 出现我的购物车列表 移出隐藏
    var divCart=document.getElementsByClassName("myCart")[0];
    var divCartList=divCart.children[1];
    divCart.onclick=function(){
        if(divCartList.style.display=="none")
            divCartList.style.display="block";
        else
            divCartList.style.display="none";
    }
    //回到顶部
    function goTop(acceleration, time) {     //修改参数可调整返回顶部的速度
        acceleration = acceleration || 0.1;
        time = time || 10;
        var speed = 1 + acceleration;
        function getScrollTop() {   //取得滚动条的竖直距离
            return document.documentElement.scrollTop || document.body.scrollTop;
        }
        function setScrollTop(value) { //设置滚动条的竖直距离,实现效果的关键就是在很短的间隔时间内不断地修改滚动条的竖直距离,以实现滚动效果
            document.documentElement.scrollTop = value;
            document.body.scrollTop = value;
        }
        var goUp=document.querySelector("div.goUp");
        goUp.onclick = function () {
            var timer = setInterval(function() {
                setScrollTop(Math.floor(getScrollTop() / speed));  //这行代码是关键，取得滚动条竖直距离，除以speed后再给滚动条设置竖直距离
                if (getScrollTop() == 0)
                    clearInterval(timer);
            }, time);
        };
    }
    goTop(0.5, 20);

})