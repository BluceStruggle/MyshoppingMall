//创建mysql连接池
const mysql=require('mysql');
var pool=mysql.createPool({
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'',
    database:'xz',
    connectionLimit:20
});
//导出
module.exports=pool;