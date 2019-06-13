// //封装数据库操作前三步固定流程
// const mysql = require('mysql');

// const conn = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'root',
//     database: 'demo'
// })

// conn.connect();

// //将 conn 导出
// module.exports = conn;



//练习
const mysql = require('mysql');
const conn = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'student'
})

conn.connect();

module.exports = conn;