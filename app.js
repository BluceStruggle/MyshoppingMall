const express=require('express');
const bodyParse=require('body-parser');
const session=require('express-session');
//引入路由模块
const index=require("./routes/index");
const details=require("./routes/details");
const users=require("./routes/users");
const products=require("./routes/products");
const cart=require("./routes/cart");
var app=express();
var server=app.listen(3000);
//使用body-parser中间件
app.use(bodyParse.urlencoded({extended:false}));
//托管静态资源到pulic目录下
app.use(express.static('public'));
app.use(session({
    secret:'128位随机字符串',
    resave:false,
    saveUninitialized:true,
}));

//路由器管理路由
app.use("/index",index);
app.use("/details",details);
app.use("/users",users);
app.use("/products",products);
app.use("/cart",cart);