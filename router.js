//加载express.创建对象
const express = require('express');
const router = express.Router(); 

//加载path 
const path = require('path');
//加载db
const db = require('./db.js');
//定义标记
let islogin = false;
router.get('/index', (req, res) => {
    //查看标记不为true返回登陆页
    if (req.session.islogin !== true) {
        return res.redirect('/login');
    }
    db.query('select * from pa', (err, data) => {
        console.log(err)
        const obj = { list: data };
        res.render(path.join(__dirname, 'view', 'index.html'), obj);
    })
})

router.get('/add', (req, res) => {
      //查看标记不为true返回登陆页
    if (req.session.islogin !== true) {
        return res.redirect('/login');
    }
    res.sendFile(path.join(__dirname, 'view', 'add.html'));
});

//添加学生
router.post('/addstu', (req, res) => {
     //查看标记不为true返回登陆页
     if (req.session.islogin !== true) {
        return res.redirect('/login');
    }
    const obj = {
        sname: req.body.sname,
        sage: req.body.sage,
        sgender: req.body.sgender
    }

    const sql = `insert into pa set ?`
    //执行sql语句将数据添加到数据表
    db.query(sql, obj, (err, data) => {
        if (err) {
            console.log(err);
            return res.send('添加失败')
        }
        //重定向到首页
        res.redirect('/index');
    })

})


//删除学生
router.get('/delstu', (req, res) => {
     //查看标记不为true返回登陆页
     if (req.session.islogin !== true) {
        return res.redirect('/login');
    }
    //    console.log( req.query)
    //把get传送的数据给sid,作为删除的条件
    const sid = req.query.sid
    const sql = `delete from pa where sid = ?`;
    db.query(sql,sid,(err,data)=>{
        if (err) {
            console.log(err);
            return res.send('删除失败');
        }

        //重定向
        res.redirect('/index');
    })
})


//显示编辑页
router.get('/editstu',(req,res)=>{
     //查看标记不为true返回登陆页
     if (req.session.islogin !== true) {
        return res.redirect('/login');
    }
    const sid = req.query.sid;
    const sql = `select * from pa where sid = ?`;
    db.query(sql,sid,(err,data)=>{
        if (err) {
            console.log(err);
            return res.send('编辑失败');
        };
        console.log(data[0]);
        // data = [{sid:1,sname:'张三',sage:'18',sgender:'男'}] 
        res.render(path.join(__dirname,'view','edit.html'),data[0])
    })
})

//修改并显示
router.post('/modifystu',(req,res)=>{
     //查看标记不为true返回登陆页
     if (req.session.islogin !== true) {
        return res.redirect('/login');
    }
    const sid = req.body.sid;
    const obj = {
        sname:req.body.sname,
        sage:req.body.sage,
        sgender:req.body.sgender
    }

    const sql = `update pa set ? where sid = ?`
    db.query(sql,[obj,sid],(err,data)=>{
        if(err) {
            console.log(err);
            return res.send('编辑失败');
        }
        res.redirect('/index');
    })
})

//显示登陆页面
router.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'view','login.html'));
})

//登陆
router.post('/checklogin',(req,res)=>{
    const username = req.body.username;
    const pwd = req.body.pwd;

    const sql = `select * from login where username=? and pwd = ?`

    db.query(sql,[username,pwd],(err,data)=>{
        if (err) {
            console.log(err);
            return res.redirect('/login');
        }
        if (data.length==1) {
            //定义登录成功
            req.session.islogin = true;
            res.redirect('/index');
        }else {
            res.redirect('/login');
        }
    })
})
//导出router
module.exports = router;