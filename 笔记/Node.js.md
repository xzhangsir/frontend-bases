

## 1、node.js中引入数据连接文件

### 1.1 创建conn.js文件在public的js文件夹中

```
var mysql      = require('mysql');
var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'yoga'
});
module.exports = conn;
```

### 1.2 在配置路由的index.js文件引入，并调用数据库连接方法

```
var conn = require('../public/js/conn.js');
conn.connect();
```

## 2、读取test.json并输出get接口

```
var express = require('express'); //express框架模块
var path = require('path'); //系统路径模块
var fs = require('fs'); //文件模块
var bodyParser = require('body-parser'); //对post请求的请求体进行解析模块
var app = express();
app.use(bodyParser.urlencoded({ extended: false })); //bodyParser.urlencoded 用来解析request中body的 urlencoded字符，只支持utf-8的编码的字符，也支持自动的解析gzip和 zlib。返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
var hostName = '127.0.0.1'; //ip
var port = 8888; //端口

//设置允许跨域请求
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //访问控制允许来源：所有
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //访问控制允许报头 X-Requested-With: xhr请求
    res.header('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS'); //访问控制允许方法
    res.header('X-Powered-By', 'nodejs'); //自定义头信息，表示服务端用nodejs
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

//创建get接口
app.get('api/', function(req, res) {
    var file = path.join(__dirname, 'data/test.json'); //文件路径，__dirname为当前运行js文件的目录
    //var file = 'f:\\nodejs\\data\\test.json'; //也可以用这种方式指定路径

    //读取json文件
    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            res.send('文件读取失败');
        } else {
            res.send(data);
        }
    });
});

app.listen(port, hostName, function() {
    console.log(`服务器运行在http://${hostName}:${port}`);
});
```

## 3、node.js读取JSON文件

```
const fs = require('fs');

router.get('/menu', function(req, res) {
    var file = './public/data/menu.json';
    //读取json文件
    fs.readFile(file, 'utf-8', function(err, data) {
        if (err) {
            res.send('文件读取失败');
        } else {
            res.send(JSON.parse(data));
        }
    });
   /* fs.readFile("./public/data/menu.json", function(err, data) {
        res.send(data);
    })*/
});
```

## 4、node.js分页处理

// 后台代码
router.get('/coach/:page',(req,res)=>{
    let pageSize = 2;
    let  page = req.params.page > 0 ? req.params.page : 1;
    let skip = (page-1)*pageSize;
    let rss = {};

    conn.query('select * from team',(err,rs)=>{
        rss.len = rs.length;
    });

    conn.query('select * from team limit '+ skip + ','+pageSize,(err,rs)=>{
        rss.data = rs;
        res.send(rss);
    })
});

## 5、使用node搭建http服务器

```
var http = require("http");
url = require("url");  

function start() {
	function onRequest(request, response) {
	// 获取请求路径 
		var pathname = url.parse(request.url).pathname;
        // 关闭nodejs 默认访问 favicon.ico  
         if (!pathname.indexOf('/favicon.ico')) {
             return;
         };  
         // 返回数据  
         response.writeHead(200, {"Content-type": "text/plain"});  
         // 路由  
         switch(pathname) {
             case '/':
                 response.write('index'); 
                 break;
             case '/user/login':
                 response.write(JSON.stringify({ 
                     'code': 200,  
                     'msg': success
                 })); 
                 break;
              case '/user/logout':
                 response.write(JSON.stringify({ 
                     'code': 200,  
                     'msg': success  
                 }));  
                break;
              default:
                 response.write('default'); 
                 break;
           }  
           response.end();  
      }     

    http.createServer(onRequest).listen(8080);
    console.log("Server has start!");
}  

 start();  
```
