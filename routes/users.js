const express=require("express");
const router=express.Router();
const pool=require("../pool.js");

router.post("/login",(req,res)=>{
    var uname=req.body.uname;
    var upwd=req.body.upwd;
    var sql="SELECT * FROM xz_user WHERE uname=? and upwd=?";
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.writeHead(200);
            console.log(result);/*[ RowDataPacket {
    uid: 2,
    uname: 'dangdang',
    upwd: '123456',
    email: 'dang@qq.com',
    phone: '13501234568',
    avatar: 'img/avatar/default.png',
    user_name: '林当',
    gender: 1 } ]

*/
            var user=result[0];//uid:2
             req.session.uid=user.uid;
            res.write(JSON.stringify({ok:1}));
        }else{
            res.write(JSON.stringify({
                ok:0,
                msg:"用户名或密码有误!"
            }));
        }
            res.end();
    })
});

router.get("/isLogin",(req,res)=>{
        if(req.session.uid===undefined){
            res.write(JSON.stringify({ok:0}));
            res.end();
        }else{
            var uid=req.session.uid;
            var sql="SELECT * FROM xz_user WHERE uid=?";
            pool.query(sql,[uid],(err,result)=>{
                if(err) throw err;
                if(result.length>0){
                    var user=result[0];
                    res.write(JSON.stringify({ok:1,uname:user.uname}));
                    res.end();
                }
            });
        }
});
router.get("/loginOut",(req,res)=>{
       req.session.uid=undefined;
       res.end();
});
router.post("/register",(req,res)=>{
        var uname=req.body.uname;
        var upwd=req.body.upwd;
        var email=req.body.email;
        var phone=req.body.phone;
        var sql="INSERT INTO xz_user VALUE('',?,?,?,?,'','','')";
        pool.query(sql,[uname,upwd,email,phone],(err,result)=>{
           if(err) throw err;
           if(result.affectedRows>0){
                res.write(JSON.stringify({ok:1}));
                   res.end();
           }
        });
});
router.post("/isExist",(req,res)=>{
    var uname=req.body.uname;
    var sql="SELECT * FROM xz_user WHERE uname=?";
    pool.query(sql,[uname],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.write(JSON.stringify({ok:0,msg:"用户名已存在"}));
            res.end();
        }
    });
})
module.exports=router;