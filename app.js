//创建并开启服务器
const express = require('express');
const app = express();
app.listen(3000, () => {
    console.log('Student-Server is running...');
})

const path = require('path');

//加载 db.js 模块
const db = require('./db.js');
//加载模板引擎并配置
app.engine('html', require('express-art-template'));

//显示学生信息列表页 （index.html）
app.get('/index', (req, res) => {
    //查询student表的所有数据，再使用模板引擎将数据和index.html模板组装
    //再将组装好的数据响应给浏览器
    db.query('select * from student', (err, result) => {
        if (err) {
            return console.log(err);
        }
        
        //使用模板引擎将数据和模板组装并响应给浏览器
        const obj = {list: result};
        res.render(path.join(__dirname, 'view', 'index.html'), obj);  
    })
})