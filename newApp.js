const express = require('express');
const app = express();
app.listen(3000,()=>{
    console.log('服务启动...')
});

const db = require('./db.js');

const path = require('path');

app.engine('html',require('express-art-template'));

app.get('/index',(req,res)=>{
    db.query('select * from pa',(err,data)=>{
        console.log(err)
        const obj = {list:data};
        res.render(path.join(__dirname,'view','index.html'),obj);
    })
})