const express = require('express');
const app = express();
app.listen(3000, () => {
    console.log('服务启动...')
});


app.engine('html', require('express-art-template'));

const bp = require('body-parser');
app.use(bp.urlencoded({ extended: false }));

//加载express-session
const session = require('express-session');
//注册中间件
app.use(session({
    secret:'u9ud0w9w0euw9ufe',
    resave:false,
    saveUninitiallized:false
}))

//加載路由模块并注册中间件
const router = require('./router.js');
app.use(router);