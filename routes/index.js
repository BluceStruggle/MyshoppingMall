const express=require("express");
const router=express.Router();
const pool=require("../pool.js");

router.get("/getIndexProducts",(req,res)=>{
    var output={carousel:[],indexProducts:[]};//声明output对象存放轮播图和主页商品信息
    var sql1=`SELECT * FROM xz_index_carousel`;
    var sql2=`SELECT * FROM xz_index_product WHERE seq_recommended!=0 order by seq_recommended`;
    Promise.all([
        new Promise(function(open){
        pool.query(sql1,(err,result)=>{
            if(err) throw err;
            output.carousel=result;
            open();
    })
    }),
        new Promise(function(open){
            pool.query(sql2,[],(err,result)=>{
                if(err) throw err;
                output.indexProducts=result;
                open();
            })
        })
    ]).then(function(){
        //跨域请求
        res.writeHead(200,{
            "Content-Type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"//服务端允许跨域 *代表任意来源
        });
        res.write(JSON.stringify(output));//将对象转为字符串
        res.end();
    })

})
module.exports=router;