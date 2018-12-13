const express=require("express");
const router=express.Router();
const pool=require("../pool.js");

router.get("/",(req,res)=>{
        var kwords=req.query.kwords;//"mackbook i5 128g"
        var arr=kwords.split(" ");//arr[mackbook,i5,128g]
        for(var i=0;i<arr.length;i++){
            arr[i]=`title like '%${arr[i]}%' `;
        }
        //join拼接为字符串
        var where=" where "+arr.join(" and ");//拼接为where title like '%macbook%' and title like '%i5%' and title like '%128g%'
        //根据传来的pno要回发客户端的分页对象
        var output={pageSize:9};//页大小9
        output.pno=req.query.pno;//接受客户端请求时传来的pno
        var sql="SELECT *,(SELECT md FROM xz_laptop_pic WHERE laptop_id=lid LIMIT 1)as md FROM xz_laptop ";
        pool.query(sql+where,[],(err,result)=>{
                if(err) throw err;
                output.count=result.length;
                output.pageCount=Math.ceil(output.count/output.pageSize);
                output.products=result.slice(output.pno*output.pageSize,output.pno*output.pageSize+output.pageSize);//根据传入的页号 截取对应的商品信息
                res.writeHead(200,{
                    "Content-Type":"application/json;charset=utf-8",
                    "Access-Control-Allow-Origin":"*"
                });
                res.write(JSON.stringify(output));
                res.end();
        });
});
module.exports=router;