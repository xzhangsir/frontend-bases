

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

## 4、前端模板渲染数据

### 4.1 数据如下

```
[
  {
    "menu":"Home",
    "submenu":["Yogo studion","Fitness club","Gym","Health club","Coach","Dance"]
  },
  {
    "menu":"Pages",
    "submenu":["About Us","Services","Reservations","Pricing Tables","Our Team","Content Elements"]
  },
  {
    "menu":"Events",
    "submenu":["All Events","Events One","Events Two","Events Three","Events Four","Single Event"]
  },
  {
    "menu":"PORTFOLIO",
    "submenu":["Column 3 Cols","Column 4 Cols Wide","4 Cols Masonry","Four Columns","Gallery"]
  },
  {
    "menu":"BLOG",
    "submenu":["About Us","Services","Reservations","Pricing Tables","Our Team","Content Elements"]
  }
]
```

### 4.2 定义模板

```
<template id="menu">
    {{ each data}}
    <li>
        <a href="#">{{$value.menu}}</a>
        <ul class="submenu">
            {{ each $value.submenu }}
            <li><a href="#">{{ $value }}</a></li>
            {{ /each }}
        </ul>
    </li>
    {{ /each }}
    {{ each data.BLOG}}
    <li>
        <a href="#">{{$value}}</a>
    </li>
    {{ /each }}
</template>
```

### 4.3 JS处理

```
<script src="js/template.js"></script>
<script>
    $.ajax({
        url:'/menu'  //接口创建如上三代码所示
    }).then(function (rs) {
        if(!rs.error_data){
            var html = template('menu',rs);
            $('.menu').html(html)
        }
    })
</script>
```

## 5、WebStorm支持ES6语法

1.File->Settings->Language and Frame->Javascript，选择ES6

2.打开命令窗口，输入：

```
npm install babel -g
```

## 6、前端请求并传参，后台接收参数

```
// 前端代码
$.ajax({
    url:'/coach/1',
}).then(function (rs) {
    ...
})

// 后台代码
router.get('/coach/:id',(req,res)=>{
    console.log(req.params.id)
});
```

## 7、node.js分页处理

```
<!-- 前端代码 -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        *{
            margin: 0;
            padding: 0;

        }
        li{
            width: 20px;
            height: 20px;
            list-style-type: none;
            cursor:pointer;
            float: left;
            margin-right: 10px;
            text-align: center;
        }
        .active{
            color:#fff;
            background-color: #999999;
        }
    </style>
</head>
<body>
<header>
    <ul class="menu"></ul>
    <ul class="coach"></ul>
    <ul class="pages"></ul>
</header>
<template id="menu">
    {{ each data}}
    <li>
        <a href="#">{{$value.menu}}</a>
        <ul class="submenu">
            {{ each $value.submenu }}
            <li><a href="#">{{ $value }}</a></li>
            {{ /each }}
        </ul>
    </li>
    {{ /each }}
    {{ each data.BLOG}}
    <li>
        <a href="#">{{$value}}</a>
    </li>
    {{ /each }}
</template>
</body>
<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
<script src="js/template.js"></script>
<script>
    $.ajax({
        url:'/coach/0',
    }).then(function (rs) {
        console.log(rs);
        let len = rs.len;
        for(var i=0;i<len/2;i++){
            $('.pages').append('<li>'+( i + 1 )+'</li>');
            $('.pages li:eq(0)').addClass('active');
        }
        $('.pages li').on('click',function () {
            $('.pages li').removeClass('active').eq($(this).index()).addClass('active');
            $.ajax({
                url:'/coach/'+$(this).html()
            }).then(function(res){
                console.log(res)；
            })
        })
    })
</script>
</html>
```

```
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
```
## 8、使用node搭建http服务器

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



## 9、使用node搭建https服务器

　　https服务器稍微复杂些，需要生成证书，当然这个证书在浏览器看来也是无效的，访问的时候需要添加信任。安装证书需要OpenSSL，这个可以通过安装git来安装，当然也可以自己去安装。

　　参考:<http://blog.fens.me/nodejs-https-server/>

## 10、node.js的 express框架

什么是 node.js？
​	node.js是一个基于chrome V8引擎的后端平台，JS是编程语言。 事件驱动、非阻塞 。。。	
什么是 express ？
​	基于 node.js平台的一个项目框架，可以快速创建自己的项目。	
express如何使用？

```
1. 安装
	npm -g install express-generator
2. 创建项目
	express -e 项目名	
3. 监听端口
	在 app.js 主模块中编写代码
	app.listen(80,function(){});	
4. 安装依赖包
	进入项目目录，才有 package.json
	npm i	
5. 运行项目
	node app	
6. 测试项目
	打开浏览器，执行 localhost
```

路由：

```
1. 什么是总路由？
	获取所有请求，对请求进行分配， app.js 就是总路由
2. 什么是分路由？
	处理总路由分配过来的请求，并且返回数据
	在 routes/ 目录下，一个文件（模块），处理一个网站模块的所有请求
```

## 11、GET/POST,node.js后台如何获取?

```
GET用req.query.变量获取，POST用req.body.变量获取，参数用req.params.参数变量名获取。
```

## 12、关闭被占用的80端口

```
如果80端口被占用，操作：
桌面->计算机->管理->服务->apache2a关闭
```

## 13、添加数据

```
router.get('/coach', function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

    var coachName = req.query.coachName;
    var coachSex = req.query.coachSex
    var coachExp = req.query.coachExp
    var coachPhoto = req.query.coachPhoto
    var  coachAddSql = 'insert into coach(coachName,coachSex,coachExp,coachPhoto) values(?,?,?,?)';
    var  coachAddSql_Params = [coachName,coachSex,coachExp,coachPhoto];
    connection.query(coachAddSql,coachAddSql_Params,function (error, result) {
        if(error){
            res.send('error')
        }else{
            res.send('success')
        }
    })

});
```

# **10.后端代理**

1）前端代码

```
//argent.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>后端代理</title>
</head>
<body>
<script>
    var ajax = new XMLHttpRequest();
    ajax.open('get','/test.json');
    ajax.onreadystatechange = function () {
        if(ajax.readyState == 4 && ajax.status ==200){
            console.log(ajax.responseText)
        }
    };
    ajax.send();
</script>
</body>
</html>
```

2）后端代码

```
//jsonp的实现
router.get('/data.json',function (req, res) {
    var data = {
        "id":"123",
        "name":"李四",
        "sex":"男"
    };   
    res.send(data);
});

//后端代理（由代理去获取数据，再发送给前端）
router.get('/test.json',function (req, res) {
   var http = require('http');
   http.get('http://127.0.0.1/data.json',function (rst) {
       var result = '';
       rst.on('data',function (data) {
           result += data;
       });
       rst.on('end',function () {
           res.send(result);
       })
   })
});
```

