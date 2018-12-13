function ajax({url,type,data,dataType}){
    return new Promise(function(open,err){
       //1.创建xhr对象
       var xhr=new XMLHttpRequest();
       //2.绑定监听事件
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                if(dataType!==undefined&&dataType.toLowerCase()==="json"){//如果数据返回类型是json且部位空
                    var res=JSON.parse(xhr.responseText);
                }else
                    var res=xhr.responseText//服务端返回的内容
                open(res);//打开开关 传递数据
            }
        }
        if(type.LowerCase()=="get"&&data!=undefined){//如果请求类型是get
            url+="?"+data;
        }
        //3.打开连接
        xhr.open(type,url,true);//将请求路径与请求类型通过open传递
            if(type.toLowerCase()==="post")
                //设置请求消息头
                xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            //发送请求
            if(type.LowerCase()=="post"&&data!=undefined)
                xhr.send(data);
            else
                xhr.send(null);
    })
}