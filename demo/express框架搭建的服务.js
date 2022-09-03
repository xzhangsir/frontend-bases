const express = require('express');
const url = require('url');
const  mysql = require('mysql');

// const bodyParser = require('body-parser');//如果是POST请求的第一步

var server = express();
var sql = mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'123456',
	database:'jin_man'
})
sql.connect()

// post请求的第二步  
// server.use(bodyParser.urlencoded({
//     extended:true
// }));
// server.use(bodyParser.json());

//解决跨域
server.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});

server.get('/name',(req,res)=>{
	// POST的请求的第三步 使用req.body 接受
	console.log(url.parse(req.url,true))
	sql.query(`select * from user`,(err,data)=>{
		if(!err){
			res.send(data);
		}else{
			console.log(err);
		}
	})
})

server.use(express.static(__dirname+'/public'));
server.listen(100);