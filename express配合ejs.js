var express = require('express');
var expressStatic = require('express-static');
var mysql = require('mysql');
var url = require('url')
var ejs = require('ejs');
var server = express();

var sql = mysql.createConnection({
	host:'127.0.0.1',
	database:'zx',
	password:'123456',
	user:'root'
})
sql.connect();

server.get('/select',(req,res)=>{
	sql.query(`select * from meun`,(error,data)=>{
		if(!error){
			res.end(JSON.stringify(data));
		}else{
			console.log(error)
			res.end(error);
		}
	})
})
server.get('/add',(req,res)=>{
	var data = url.parse(req.url,true).query;
	var foodname = JSON.parse(data.data)
	console.log(data);
	sql.query(`insert into food values ('${data.username}','${foodname}','${data.num}') `,(error,data)=>{
		if(!error){
			res.end('success')
		}else{
			res.end('error');
			console.log(error);
		}
	})
})
server.get('/login',(req,res)=>{
	var data = url.parse(req.url,true).query;
	sql.query(`select * from user where username="${data.id}" and password="${data.password}"`,(error,data)=>{
		if(!error){
			if(data.length != 0){
				res.end('success');	
			}else{
				res.end('error');
			}
		}else{
			console.log(error)
		}
	})
})
server.get('/zhu',(req,res)=>{
	var data = url.parse(req.url,true).query;
	sql.query(`insert into user values (${data.id},${data.password})`,(error,data)=>{
		if(!error){
			res.end('success')
		}else{
			res.end('error');
			console.log(error);
		}
	})
})
server.get('/food',(req,res)=>{
	ejs.renderFile('public/index.html',{},(error,data)=>{
		if(!error){
			res.end(data);
		}else{
			console.log("好像不行");
		}
	})
})
setTimeout(function(){
	sql.query("delete from food")
},7200000)
server.use(expressStatic(__dirname+'/public'));
server.listen(100);
console.log('服务已开启')
