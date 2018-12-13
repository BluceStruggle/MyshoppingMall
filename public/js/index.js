//动态加载主页内容
$(function(){
    $.ajax({
        url:"http://localhost:3000/index/getIndexProducts",
        type:"get",
        dataType:"json",//引入的ajax.js自动将其转为obj
        success:function(output){
            //动态加载轮播图
            var html="";
            for(var c of output.carousel){//遍历返回结果output对象里的carousel
                var {img,href}=c;
                html+=`<a href="${href}"><img src="${img}" alt=""></a>`//href里product_details.html?lid=*
            }
            var carouselImg=document.querySelector("div.carousel-img>div.list");
            carouselImg.innerHTML=html;//将动态加载的轮播图片放入

            //动态加载新品第一件商品
            var {title,details,price,href,pic}=output.indexProducts[6];//返回结果 output对象里的indexProducts
            var html=`<img src="${pic}" alt="" class="img-fluid ">
                            <div>
                                <ul class="list-unstyled text-center">
                                    <li class="small">分类</li>
                                    <li><a href="#" class="small text-dark font-weight-bold ">${title}</a></li>
                                    <li><b class="text-danger">￥${price.toFixed(2)}</b><s class="text-muted ">$990.00</s></li>
                                    <li class="text-danger ">*****</li>
                                    <li>
                                        <a href="#" class="small text-dark">喜欢</a>
                                        <a href="#" class="small text-dark">对比</a>
                                        <a href="#" class="small text-dark">浏览</a>
                                    </li>
                                    <li>
                                    <a class="btn btn-primary" href="${href}">查看详情</a>
                                    </li>
                                </ul>
                            </div>
                            <!-- 商品悬停样式 -->
                            <!-- 悬停加入购物车 -->
                            <div class="cartHide">
                                <a href="#" class="d-none btn btn-danger text-white font-weight-bold">
                                    加入购物车
                                </a>
                            </div>`;
            var divProduct=document.querySelector("div.product1");
            console.log(divProduct)
            divProduct.innerHTML=html;

            //新品第二件商品
            var {title,details,price,href,pic}=output.indexProducts[7];
            var html=`<img src="${pic}" alt="" class="img-fluid ">
                            <div>
                                <ul class="list-unstyled text-center">
                                    <li class="small">分类</li>
                                    <li><a href="#" class="small text-dark font-weight-bold ">${title}</a></li>
                                    <li><b class="text-danger">￥${price.toFixed(2)}</b><s class="text-muted ">$990.00</s></li>
                                    <li class="text-danger ">*****</li>
                                    <li>
                                        <a href="#" class="small text-dark">喜欢</a>
                                        <a href="#" class="small text-dark">对比</a>
                                        <a href="#" class="small text-dark">浏览</a>
                                    </li>
                                    <li>
                                    <a class="btn btn-primary" href="${href}">查看详情</a>
                                    </li>
                                </ul>
                            </div>
                            <!-- 商品悬停样式 -->
                            <!-- 悬停加入购物车 -->
                            <div class="cartHide">
                                <a href="#" class="d-none btn btn-danger text-white font-weight-bold">
                                    加入购物车
                                </a>
                            </div>`;
            var divProduct=document.querySelector("div.product2");
            divProduct.innerHTML=html;

            //新品第三件商品
            var {title,details,price,href,pic}=output.indexProducts[8];
            var html=`<img src="${pic}" alt="" class="img-fluid ">
                            <div>
                                <ul class="list-unstyled text-center">
                                    <li class="small">分类</li>
                                    <li><a href="#" class="small text-dark font-weight-bold ">${title}</a></li>
                                    <li><b class="text-danger">￥${price.toFixed(2)}</b><s class="text-muted ">$990.00</s></li>
                                    <li class="text-danger ">*****</li>
                                    <li>
                                        <a href="#" class="small text-dark">喜欢</a>
                                        <a href="#" class="small text-dark">对比</a>
                                        <a href="#" class="small text-dark">浏览</a>
                                    </li>
                                    <li>
                                    <a class="btn btn-primary" href="${href}">查看详情</a>
                                    </li>
                                </ul>
                            </div>
                            <!-- 商品悬停样式 -->
                            <!-- 悬停加入购物车 -->
                            <div class="cartHide">
                                <a href="#" class="d-none btn btn-danger text-white font-weight-bold">
                                    加入购物车
                                </a>
                            </div>`;
            var divProduct=document.querySelector("div.product3");
            divProduct.innerHTML=html;

            //新品第四件商品
            var {title,details,price,href,pic}=output.indexProducts[9];
            var html=`<img src="${pic}" alt="" class="img-fluid ">
                            <div>
                                <ul class="list-unstyled text-center">
                                    <li class="small">分类</li>
                                    <li><a href="#" class="small text-dark font-weight-bold ">${title}</a></li>
                                    <li><b class="text-danger">￥${price.toFixed(2)}</b><s class="text-muted ">$990.00</s></li>
                                    <li class="text-danger ">*****</li>
                                    <li>
                                        <a href="#" class="small text-dark">喜欢</a>
                                        <a href="#" class="small text-dark">对比</a>
                                        <a href="#" class="small text-dark">浏览</a>
                                    </li>
                                    <li>
                                    <a class="btn btn-primary" href="${href}">查看详情</a>
                                    </li>
                                </ul>
                            </div>
                            <!-- 商品悬停样式 -->
                            <!-- 悬停加入购物车 -->
                            <div class="cartHide">
                                <a href="#" class="d-none btn btn-danger text-white font-weight-bold">
                                    加入购物车
                                </a>
                            </div>`;
            var divProduct=document.querySelector("div.product4");
            divProduct.innerHTML=html;
        }
    })
    /*轮播*/
        var list=document.querySelector("div.list");
        var prev=document.querySelector("span.prev");
        var next=document.querySelector("span.next");
        var buttons=document.querySelector("div.buttons").children;

        function animate(offset){//offset 偏移量
            var newList=parseInt(list.style.left)+offset;
            list.style.left=newList+"px";
            if(newList<-3000)//第四张图的下一张时 变为第一张
                list.style.left=-1000+"px";
            if(newList>-1000)
                list.style.left=-3000+"px";
        }

        var index=1;
        function buttonsShow(){//如果有on 清除
            for(var i=0;i<buttons.length;i++){
                if(buttons[i].className=="on"){
                    buttons[i].className="";
                }
            }
            buttons[index-1].className="on";//默认第一个圆点 on 循环由0开始所以减一
        }

        prev.onclick=function(){
            index-=1;
            if(index<1)
                index=4;
            animate(1000);
            buttonsShow();
        }
        next.onclick=function(){
            index+=1;
            if(index>4)
                index=1;
            animate(-1000);
            buttonsShow();
        }
        //自动轮播
        var timer=null;
        function play(){
            timer=setInterval(function(){
                next.onclick();
            },2000)
        }
        play();
        //鼠标悬停停止
        var carousel=document.querySelector("div.carousel-img");
        function stop(){
            clearInterval(timer);
        }
    carousel.onmouseover=stop;
    carousel.onmouseout=play;
//点击圆点跳转对应图片
        var btn=document.querySelector("div.buttons");//
        btn.addEventListener("click",function(e){//绑定事件委托
            if(e.target.nodeName=="SPAN"){
                var span=e.target;//当前点击的圆点
                var clickIndex=parseInt(span.getAttribute("index"));
                if(index>clickIndex)
                var offset=-1000*(index-clickIndex);
                else
                     offset=-1000*(clickIndex-index);
                animate(offset);
                index=clickIndex;
                buttonsShow();
            }
        })

    /*鼠标移入三张大图内 放大图片*/
        var shop=$("div.shop");
        shop.hover(function(){
            var $shop=$(this);
            $shop.children().first().children().toggleClass("my_img_ts");
        })

        /*活动倒计时*/
        function task(){
            var end=new Date("2019/10/12 18:00:00");
            var now=new Date();
            var s=parseInt((end-now)/1000);
            if(s>0){
                var d=parseInt(s/3600/24);
                if(d<10) d="0"+d;
                //s/3600/24,再下取整
                var h=parseInt(s%(3600*24)/3600);
                if(h<10) h="0"+h;
                //s/(3600*24)的余数,再/3600,再下去整
                var m=parseInt(s%3600/60);
                if(m<10) m="0"+m;
                //s/3600的余数,再/60，再下取整
                s%=60;//s/60的余数
                if(s<10) s="0"+s;
                //距离下一个假期还有: ?天?小时?分?秒
                var day=$("h4.day");
                var hours=$("h4.hours");
                var mins=$("h4.mins");
                var secs=$("h4.secs");
                day.html(`${d}<br>天`);
                hours.html(`${h}<br>小时`);
                mins.html(`${m}<br>分`);
                secs.html(`${s}<br>秒`);
            }
        }
        task();
        setInterval(task,1000);
        /*轮播*/
    //左侧楼层滚动导航
    var ulFloor=$("ul.fixFloor");
    $(window).scroll(function() {
        var scrollTop=$(window).scrollTop();
        var innerHeight=$(window).height();
        if(scrollTop>300) {
            floorTitles=$("h3.floorTitle");
            ulFloor.show();
            floorTitles.each(function(index, floorTitle){
                var floorTitle=$(floorTitle);
                if(innerHeight+scrollTop - $(this).offset().top>innerHeight/2){
                       ulFloor.children().eq(index).addClass("floorActive").siblings().removeClass("floorActive");
                }
            })
        }else{
            ulFloor.hide();
        }
        ulFloor.on("click","li",function(){
            li=$(this);
            var i=li.index();
            var offsetTop=$(floorTitles[i]).offset().top;
            $("html,body").stop(true).animate({
                scrollTop: offsetTop
            },500);
        })
    })
});



