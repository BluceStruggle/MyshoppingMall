$(function(){
    if(location.search.indexOf("lid=")!=-1){
        var lid=location.search.split("=")[1];
        console.log(lid);
        (async function(){
            var res=await $.ajax({
                url:"http://localhost:3000/details",
                type:"get",
                data:{lid},//请求携带的参数
                dataType:"json"
            });
            console.log(res);
            var {product,pics,specs}=res;//将请求响应的结果解构
            var {title,subtitle,price,promise}=product;//解构商品信息
            //查找title subtitle price promise元素位置
            var divDetailsInfo=document.querySelector("div.detailsInfo");//获取div.detailsInfo;
            // 标题
            divDetailsInfo.children[0].children[0].children[0].innerHTML=title;
            //副标题
            divDetailsInfo.children[0].children[1].children[0].innerHTML=subtitle;
            //价格
            divDetailsInfo.children[0].children[3].children[0].innerHTML=price;
            //承诺
            divDetailsInfo.children[0].children[4].children[0].innerHTML=promise;
            var html="";
            for(var sp of specs){
                html+=`<li><a class="btn btn-sm btn-outline-secondary 
${sp.lid==lid?'active':''}" href="product_details.html?lid=${sp.lid}">${sp.spec}</a></li>`
            }
            divDetailsInfo.children[0].children[5].innerHTML=html;//动态加载规格

            var ul=document.querySelector("ul.details_list");//小图列表区域
            var html="";
            for(pic of pics){
                var {sm,md,lg}=pic;
                html+=`<li class=" my_bd"><img src="${sm}" alt="" data-md="${md}" data-lg="${lg}"  class="img-fluid smImg"></li>`
            }
            ul.innerHTML=html;
            ul.style.heigth=200*pics.length+"px";
            var mdImg=document.querySelector("img.mdImg");//获取中图元素
            mdImg.src=pics[0].md;//中图设置为pics数组中第一组数剧中的中图;
            var lgImg=document.querySelector("div.lgImg");//获取大图元素
            lgImg.style.backgroundImage=`url(${pics[0].lg})`;//大图区域背景图设置为pics数组中第一组数剧中的大图

            //鼠标进入每个小图片，切换中图片和大图片
            ul.onmouseover=function(e){
                if(e.target.nodeName==="IMG"){
                    var img=e.target;
                    var md=img.dataset.md;
                    var lg=img.dataset.lg;
                    mdImg.src=md;//中图切换为鼠标移入的图片
                    lgImg.style.backgroundImage=`url(${lg})`;//大图区域大图切换为鼠标移入的图片
                }
            }
            //小图列表左右移动
            var $ul=$("ul.details_list");//移动的图片列表
            var $up=$("li.move>span.up-click");//获取上箭头
            var $down=$("li.move>span.down-click");//获取下箭头
            var num=pics.length;
            console.log(num);
            if(num<=3){//图片数小于3时 禁用下箭头
                $down.addClass("disabled");
            }
            var moved=0;//记录图片下移的次数
            $up.addClass("disabled");//先禁用上箭头
            $up.on("click",function(){
                var $up=$(this);
                if(!$up.is(".disabled")){
                    moved--;//已经下移的图片个数-1
                    $ul.css("marginTop",-200*moved);
                    $down.removeClass("disabled");
                    if(moved==0)
                        $up.addClass("disabled");
                }
            });
            $down.on("click",function(){
                var $down=$(this);
                if(!$down.is(".disabled")){
                    moved++;//已经上移的图片个数-1
                    $ul.css("marginTop",-200*moved);
                    $up.removeClass("disabled");
                    if(num-moved==3)
                        $down.addClass("disabled");
                }
            });
            //鼠标移进中图透明保护层 出现大图 移出隐藏大图
            //中图 获取半透明遮罩mask 透明保护层superMask 大图
            //var $mdImg=$("img.mdImg");
            var $mask=$("div.mask");
            var $superMask=$("div.superMask");
            var $lgImg=$("div.lgImg");
            var mSize=300;//mask的大小
            var Max=600-mSize;//mask的left top的最大值
            $superMask.hover(function(){
                $mask.toggle().css("display:none");
                $lgImg.toggle().css("display:none");
            }).mousemove(function(e){//放大镜
                var left=e.offsetX-mSize/2;
                var top=e.offsetY-mSize/2;//鼠标位于mask中心
                if(left<0) left=0;
                else if(left>Max) left=Max;
                if(top<0) top=0;
                else if(top>Max) top=Max;
                $mask.css({left,top});
                $lgImg.css("background-position",
                    `-${1.5*left}px -${1.5*top}px`);
            })
        })();
    }
    //描述详情评论tab切换
  var tabs=$("ul.tab>li");//获取所有tab
  var contents=$("div.content>div");//获取所有tab内容
  var currIndex=0;//当前显示的tab内容的下标
    contents[currIndex].style.display="block";//默认显示第一个tab内容
   tabs.click(function(){
          contents[currIndex].style.display="none";
          var index=$(this).index();//获取点击的li的下标
          contents[index].style.display="block";
          currIndex=index;
   })
});