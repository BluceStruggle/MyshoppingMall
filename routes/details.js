const express=require("express");
const router=express.Router();
const pool=require("../pool.js");

router.get("/",(req,res)=>{
    var lid=req.query.lid;
    console.log(lid);
    var sql1="SELECT * FROM xz_laptop WHERE lid=?";
    var sql2="SELECT * FROM xz_laptop_pic WHERE laptop_id=?";//用lid查其图片
    var sql3="SELECT lid,spec FROM xz_laptop WHERE family_id=(SELECT family_id from xz_laptop WHERE lid=?)";//用lid查family_id 再用其查该商品同规格
    var output={product:{},pics:[],specs:[]};
    Promise.all([
        new Promise(function(open){
            pool.query(sql1,[lid],(err,result)=>{
                if(err) throw err;
                output.product=result[0];//将根据lid查询的结果中的result数组下标为0的给output.product
                /*result的打印结果:[ RowDataPacket {
    lid: 26,
    family_id: 7,
    title: '戴尔DELL灵越游匣15PR-2648B 15.6英寸游戏笔记本电脑(i5-6300HQ 4G 128SSD+500G GTX960M 4G独显 FHD)黑',
    subtitle: '【选游戏本还得看散热】960M 4G独显 预装128SSD 双硬盘游戏更劲爽 ！',
    price: 5299,
    promise: ' *退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货',
    spec: '精锐版 i5-6300HQ 4G GTX960 4G',
    lname: '戴尔游匣',
    os: 'Windows 10',
    memory: '4G',
    resolution: '全高清屏(1920×1080)',
    video_card: 'GTX960M',
    cpu: 'Intel i5标准电压版',
    video_memory: '4G',
    category: '游戏本',
    disk: '128G+1T',
    ... } ]
*/
                open();
            });
        }),
        new Promise(function(open){
            pool.query(sql2,[lid],(err,result)=>{
                if(err) throw err;
                output.pics=result;
                open();
            })
        }),
        new Promise(function(open){
            pool.query(sql3,[lid],(err,result)=>{
                if(err) throw err;
                output.specs=result;
                open();
            })
        })
    ]).then(function(){
        res.writeHead(200,{//设置允许json跨域
            "Content-Type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
        });
        res.write(JSON.stringify(output));//向请求的客户端发送响应的内容
        res.end();
    })
});
module.exports=router;