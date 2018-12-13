const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/add",(req,res)=>{
    var lid=req.query.lid;
    var count=req.query.count;
    var uid=req.session.uid;
    var sql1="SELECT * FROM xz_shoppingcart_item WHERE user_id=? and product_id=?";
    pool.query(sql1,[uid,lid],(err,result)=>{
        if(err) throw err;
        if(result.length==0){//购物车中没有其数据 就插入
            var sql2="INSERT INTO xz_shoppingcart_item VALUE(null,?,?,?,0)";
            pool.query(sql2,[uid,lid,count],(err,result)=>{
                if(err) throw err;
                res.end();
            })
        }else{
            var sql3="UPDATE xz_shoppingcart_item SET count=count+? WHERE user_id=? and product_id=?";
            pool.query(sql3,[count,uid,lid],(err,result)=>{
                if(err) throw err;
                res.end();
            })
        }
    })
});

router.get("/items",(req,res)=>{
    var uid=req.session.uid;
    var sql="SELECT *,(SELECT md from xz_laptop_pic where laptop_id=product_id limit 1)as md from xz_shoppingcart_item inner join xz_laptop on product_id=lid where user_id=?";
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.writeHead(200);
            res.write(JSON.stringify(result));
            res.end();
        }
    });
});

router.get("/update",(req,res)=>{
    var iid=req.query.iid;
    var count=req.query.count;
    if(count>0){
        var sql="update xz_shoppingcart_item set count=? where iid=?";
        var data=[count,iid];
    }else{//count小于0时删除
        var sql="delete from xz_shoppingcart_item where iid=?";
        var data=[iid];
    }
    pool.query(sql,data,(err,result)=>{
        if(err) throw err;
        res.end();
    });
});

router.get("/clearCart",(req,res)=>{
    var uid=req.session.uid;
    var sql="delete from xz_shoppingcart_item where user_id=? and iid>0";
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        res.write(JSON.stringify({ok:1,msg:"购物车已清空"}));
        res.end();
    })
})
module.exports=router;