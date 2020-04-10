## 1、截取到指定字符之前

​     'akdfd?jk'.substr(0, 'akdfd?jk'.indexOf('?'));

 eg:

```
var hash = location.hash;
hash = hash.substr(0,hash.indexOf('?'));
hash = hash.slice(1);
hash = hash.replace(/^\//,'');
hash = hash.split('/');
console.log(hash)
```

## 2、\x21-\x7e是键盘上的所有可见字符

## 3、template.js模板

　　template.js 一款javascript模板引擎，简单，好用，支持webpack和fis。

**功能概述**

　　提供一套模板语法，用户可以写一个模板区块，每次根据传入的数据，生成对应数据产生的HTML片段，渲染不同的效果。

　　参考：

　　　　http://www.jb51.net/article/100095.htm

　　　　https://www.cnblogs.com/theWayToAce/p/7929428.html 

　　　　http://www.jq22.com/jquery-info1097

　　　　https://aui.github.io/art-template/zh-cn/docs/installation.html

　　template.js下载：

　　　　https://github.com/yanhaijing/template.js

```
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <title>include-demo</title>
    <script src="./public/js/template.js"></script>
</head>

<body>
<div id="content"></div>
<script id="test" type="text/html">
    <h1>{{title}}</h1>
    {{include 'list'}}
</script>
<script id="list" type="text/html">
    <ul>
        {{each list as value i}}
        <li>索引 {{i + 1}} ：{{value}}</li>
        {{/each}}
    </ul>
</script>

<script>
    var data = {
        title: '嵌入子模板',
        list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
    };
    var html = template('test', data);
    document.getElementById('content').innerHTML = html;
</script>
</body>
</html>
```

### 模板文件操作步骤：

第1步：引入模板文件template.js，或者安装

```
<script src="../js/template.js"></script>
```

第2步：定义模板

```
<script type="text/html" id="userstmpl">
    {{each users as value index}}
        <tr class="odd gradeX">
            <td class="center"><input type="checkbox"/></td>
            <td>{{value.account}}</td>
            <td>{{value.username}}</td>
            <td>{{value.role}}</td>
            <td class="center">{{value.department}}</td>
            <td class="center">
                {{if value.flag == '1'}}
                    <input type="checkbox" checked="checked" disabled="disabled"/>
                {{else}}
                    <input type="checkbox" disabled="disabled"/>
                {{/if}}
            </td>
            <td>{{value.numorder}}</td>
        </tr>
    {{/each}}
</script>
```

第3步：用数据渲染模板 

```
<script>
    $.get('/showusers.html',function (data) {
        console.log(data);
        var html = template('userstmpl',{"users":data});
        console.log(html);
        $('tbody').html(html);
    })
</script>
```

## 4、JavaScript异步请求

```
var xhr = new XMLHttpRequest();
xhr.open('post','data/data.json');
xhr.onreadystatechange = function () {
    if(xhr.readyState ==4 && xhr.status == 200){
        var rst = xhr.responseText;
        console.log(rst);
    }
};
xhr.send();
```

## 5、IIFE

　　$IIFE（Immediately-invoked function expression）立即执行函数表达式$。

　　写法：(function(){})(); 

## 6、全国省市区数据-json

<https://blog.csdn.net/youshi520000/article/details/70808580>

## 7、require

**定义：**

```
$define('模块名’,[依赖列表],实现模块功能函数);
```

　　注：通常不写模块名，文件名就是模块名。

**调用**：

```
$require([模块文件名列表],function(参数列表)｛｝
```

　　注：参数列表一定要与模块文件一一对应。 

```
//test.js
define(function () {
    return {
        show:function () {
            console.log('This is show!')
        },
        info:function (x) {
            alert(x)
        }
    }
});
```

```
//test2.js
define(['https://cdn.bootcss.com/jquery/3.3.1/jquery.js'],function () {//jQuery变成全局的了
    return{
        aa:function () {
            var obj = {
                id:'123',
                name:'mikle',
                age:15,
                addr:'aaaaaaaaaaaaaaa'
            };
            return obj;
        }
    }
});
```

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>    
    <script src="https://cdn.bootcss.com/require.js/2.3.5/require.js"></script>
    <script>
        require(['javascripts/test','javascripts/test2'],function (rst,rst1) {
            console.log(rst.show());
            rst.show();
            rst.info('aaaaaaaaaaaaaaaaaa');
            console.log(rst1.aa());
            console.log(rst1.aa().name)
            $.each(rst1.aa(),function (attr,value) {
                console.log(attr + ':' + value)
            })
        })
    </script>
</head>
<body>
    <h1>这是一次测试</h1>
</body>
</html>
```

## ８、前端mock数据

　　作为前端经常需要模拟后台数据，我们称之为mock。通常的方式为自己搭建一个服务器，返回我们想要的数据。

　　项目中遇到的请求链接是类似这样子的：www.abc.com/user/login，而不是请求某个文件，如果采用PHP+Apache的方式就需要做路径重写，太麻烦。这里用的是nodejs搭建。

　　一般来说，请求的链接无非是http或者https的。但有个问题，如果用的是mac电脑，在mac和Linux上是不允许绑定1024以下的端口号的。网上的建议是加sudo权限，但实际操作中，80端口可以绑定，443端口绑定失败，提示权限不足，即使用了root账户。可以用端口转发(port forward)的方式解决。　

## 9、OpenSSL生成证书

　　路径替换成自己的路径就好了

**生成私钥key文件：**

```
your_path > penssl genrsa -out privatekey.pem 1024
Generating RSA private key, 1024 bit long modulus
...........................++++++
........++++++
e is 65537 (0x10001)
```

**通过私钥生成CSR证书签名**

```
your_path > openssl req -new -key privatekey.pem -out certrequest.csr
 You are about to be asked to enter information that will be incorporated
 into your certificate request.
 What you are about to enter is what is called a Distinguished Name or a DN.
 There are quite a few fields but you can leave some blank
 For some fields there will be a default value,
 If you enter '.', the field will be left blank.
------
 Country Name (2 letter code) [AU]:CN
 State or Province Name (full name) [Some-State]:Beijing
 Locality Name (eg, city) []:Beijing
 Organization Name (eg, company) [Internet Widgits Pty Ltd]:fens.me
 Organizational Unit Name (eg, section) []:fens.me
 Common Name (eg, YOUR name) []:Conan Zhang
 Email Address []:bsspirit@gmail.com

 Please enter the following 'extra' attributes
 to be sent with your certificate request
 A challenge password []:
 An optional company name []:
```

**通过私钥和证书签名生成证书文件**

```
 your_path > openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem
 Signature ok
 subject=/C=CN/ST=Beijing/L=Beijing/O=fens.me/OU=fens.me/CN=Conan Zhang/emailAddress=bsspirit@gmail.com 
```

## 10、根据证书创建https服务器

```
var https = require('https'),
url = require("url"),
fs = require("fs");
var options = {
  key: fs.readFileSync('./privatekey.pem'),
  cert: fs.readFileSync('./certificate.pem')
};

function onRequest(request, response) {
     // 获取请求路径
     var pathname = url.parse(request.url).pathname;
     // 关闭nodejs 默认访问 favicon.ico
     if (!pathname.indexOf('/favicon.ico')) {
       return;
     };
     // 收到来自 pathname 的请求
     console.log("Request for " + pathname + " received.");
     // 返回数据
     response.writeHead(200, {"Content-type": "text/json"});
     response.write('hello world');
     response.end();
     }
 	https.createServer(options, onRequest).listen(8443, function () {
 	console.log('Https server listening on port ' + 8443);
});
```

## 11、端口转发(Port Forward)

　　刚才上面两个服务器监听的分别是8080和8443，而我们想要的是80和443。其实也可以直接绑定80和443，用sudo，但不知为何我的电脑加了sudo依旧绑定不了443，所以就找了另一个方法:端口转发。即绑定其他端口，但将80和443端口的请求转发到绑定的端口。

　　参考<http://salferrarello.com/mac-pfctl-port-forwarding/>

　　将以下代码贴进命令行执行：	

```
echo "  
	rdr pass inet proto tcp from any to any port 80 -> 127.0.0.1 port 8080
	rdr pass inet proto tcp from any to any port 443 -> 127.0.0.1 port 8443 
	" | sudo pfctl -ef -  
```

　　这段代码的意思是将80端口的请求转发到8080，将443端口的请求转发到8443。

　　执行完之后命令行会提示* disabled，可以不必理会。

　　需要解除转发的话，在命令行贴以下代码：	

```
sudo pfctl -F all -f /etc/pf.conf  
```

　　 查看当前所有转发规则：	

```
sudo pfctl -s nat  
```

 　　最后的最后，别忘了将请求的地址绑定到本地。将以下添加进hosts：	

```
127.0.0.1 www.abc.com  
```

## 12、移动端左右滑屏

```
<!--test.html-->
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        # element{
            width: 100%;
            height: 1000px;
            background: #ccc;
            font-size: 40px;
        }
    </style>
</head>
<body>
<div id="element">这是首页</div>
<script src="https://cdn.bootcss.com/jquery/2.2.3/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/jquery.touch/1.0.0/jquery.touch.min.js"></script>
<script>
    $('#element').touch();
    $('#element').on('tap', function(event) {
    	alert('单击!');
    })
    $('#element').on('doubleTap', function(event) {
    	alert('双击!');
    })
    $('#element').on('swipeRight', function(event) {
    	location.href="demo.html"
    });
</script>
</body>
</html>
```

```
<!—demo.html-->
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        # element{
            width: 100%;
            height: 1000px;
            background: lightblue;
            font-size: 30px;
        }
    </style>
</head>
<body>
    <div id="element">demo页</div>
    <script src="https://cdn.bootcss.com/jquery/2.2.3/jquery.min.js"></script>
    <script src="https://cdn.bootcss.com/jquery.touch/1.0.0/jquery.touch.min.js"></script>
    <script>
        $('#element').touch();
        $('#element').on('swipeLeft', function(event) {
        	location.href="test.html"
        });
    </script>
</body>
</html>
```

## 13、Javascript学习总结

### 1.JavaScript中的对象分为3种。 

 　　（1）JavaScript的内置对象 

　　常用的有Date,Array,String,Math,对象,这些都是经常会用到的，一定要掌握好。 

 　　（2）文档对象模型(Document Object Model,DOM) 

　　这个对象表示了当前浏览器的多个组件和当前的HTML文档。DOM我认为是JS中最重要的一个对象，通过他可以获得任何一个HTML元素。

　　1.通过document.form1.name得到，这种是浏览器支持的dom对象，不属于js，

　　2.常用的是document.getElementById("name"),这种是w3c组织制定的一级DOM对象标准。

 　　（3）自定义对象 

　　我总认为js的自定义对象没必要用，如果你是按照面向对象的编程思想，那么应该用Java，而不是用js的对象。 

### 2.DOM对象,history以及location 

　　为了操控浏览器和文档，js使用分层的父对象和子对象，这就是DOM。这些对象的组织类似一个树形结构，并表示一个Web文档的所有内容组件。 

#### Window是所有对象的父对象 

####  document对象几种常用方法  

```
document.URL：指明了文档的URL地址。不可改变，如果需要给用户不同的地址应该用window.location对象 
 document.write:列出了当前页面的标题 
 document.referrer:用户所浏览的上一个页面的URL地址。 
 document.lastModified：文档最后修改日期 
 document.cookie 允许读取和设置一个文档的cookie 
```

####  history对象的几种常用方法 

```
 history.length();保存了历史列表的长度 
 history.go();打开历史列表中一个网址，要指定一个正数或者负数。 
 history.back();历史列表中的前一个网址，相当于后退按钮。 
 historay.forward();历史列表中的后一个网址，相当于后退按钮。 
```

#### location对象的几种常用方法 

```
location.protocol:网址的协议部分---http 
location.hostname:网址的主机名---www.aaa.com 
location.port:网址的端口号---80 
location.pathname:网址的文件名部分---tese.do 
location.search:网址的查询部分---lines=1 
location.hash:网址中使用的anchor名---#anchor 
location对象的两个方法 
location.reload() 刷新当前文档，浏览器中的刷新按钮。 
location.replace()替换一个新的位置
```

### 3.JavaScript中的变量名称，表达式，运算符，数据类型 

####  数据类型 

 　　1.数字：整数，浮点数 

　　 2.布尔值：真，假。 

　　 3.字符型：字符串对象 

　　 4.空值，null。 

　　 parseInt()----将一个字符串转换为整数值。 

　　 parseFloat----将一个字符串转换为浮点小数 

 　　字符串中有一些常用的方法，如subString,charAt等，与Java中的很像，就不叙述了 

### 4.JavaScript中的函数 

　　函数定义的最佳位置是文档中的<head>部分，因为<head>部分语句会首先执行。

　　函数中可以带有参数列表，但是参数都没有类型，也不需要在定义函数的时候声明返回值，想有返回值的话，直接return即可，和Java不同。 

 　　如：

　　 Js代码 

```
function greet(who){
	alert(“Gadsden” + who);
	return “asdasd”;
}
```

###  5.JavaScript中的对象 

 　　他和Java中的对象很相似，之前我曾说不需要用到他，用Java的就够了，昨天看了一个人的文章，说你要想用好一门语言，就要尊重这门语言，就像现在的JavaScript，如果简单的把他当做一门脚本语言，那可能只能停留在入门和初级阶段。 

####  如何扩展内置对象 

 　　使用prototype关键字，可以向现有对象中添加属性和方法。 
　　 例如：  
 　　Js代码  

```
<script type="text/javascript" language="JavaScript">
    function addHead(level){
        html = "H" + level;
        text = this.toString();
        start = "<" + html +">";
        end = "</" + html +">";
        return start + text + end;
    }
    String.prototype.heading = addHead;
    document.write("this is a test".heading(1));
    document.write("this is a test".heading(2));
    document.write("this is a test".heading(3));
</script>
```

　　这样就为String对象又新增添了一个方法，heading，并指明每次调用heading的时候，他都会去调用addHead方法。 

### 6.JavaScript中的Data Math等内置对象 

 　　他们与Java中的又是很相似，不多介绍了，有一个关键字需要说说，就是with。

 　　with关键字制定一个对象，后面跟着括在大括号中的一大块语句。对于块语句中的每一条语句，没有指定对象的属性都将被假定为该对象的属性。 

　　 如： 

　　 Js代码 

```
<script type="text/javascript" language="JavaScript">
    a = "niechao";
    with(a){
        window.alert("长度是"+ length)
        document.write(toUpperCase());
	}
</script>
```

　　注:这里不用在定义a的时候带有类型信息，如String a = “niechao”;这样会报错，如果非要加上，也只能是var a = “niechao”; 

### 7.JavaScript中使用第三方程序库 

 　　每个程序库都有自己的名字，一般的名字是xxx.js，包含到你要用的jsp页面里就行了。 

 　　Js代码 

```
  <script type="text/javascript" language="JavaScript" src="prototype.js">
```

　　现在流行的有几种，比如：ext,jquery,dojo等，老一辈的也有prototype这些。选一种合适自己的就行了，自己用着顺手的，可以满足项目需要的，我暂时选的而是jquery。

### 8.JavaScript中 的事件相应 

 　　不必使用标签来定义事件处理函数。 

　　 可以不在HTML中指定时间处理函数，而是使用JavaScript把一个函数指定为事件处理函数。

 　　首先找到元素的对象，使用obj = document.getElementById("aa")。

 　　定义一个函数，把该函数指定为事件处理函数。

　　 Js代码  

```
function mousealert(){
    alert("");
}
bj.onclick = mousealert;
```

　　JavaScript中由属性，方法，事件组成对象，许多常用的事件处理函数都是document对象中的属性。 

### 9.JavaScript中使用event对象 

　　要是用event对象，可以把他传递给事件处理程序函数。 

　　火狐和IE，对event的处理方式不同，火狐是直接自动传递的，IE是将最近发生的事件存放在window.event对象中。 

　　 Js代码  

```
function getKey(e){
	if(!e) e=window.event;
}
```

　　它检查了是否已经定义了e，若未定义，它将获取window.event对象，并将其存入e，这样确保任何一个浏览器中都会得到一个有效的event对象。 
　　以下是IE4.0及更高版本的一些常用event对象属性。

```
event.button：按下的鼠标键。对于鼠标左键，属性值为1，对于鼠标右键，属性值为2
event.clientX:事件发生位置的x轴坐标（列，以像素为单位）
event.clientY:事件发生位置的y轴坐标（行，以像素为单位）
event.altkey:该标志表示事件发生时是否按下Alt键
event.ctrlkey:该标志表示事件发生时是否按下Ctrl键
event.shiftkey:该标志表示事件发生时是否按下Shift键
event.keyCode：所按键的键码（用Unicode表示）
event.srcElement:元素出现的对象
```

　　以下是Netscape4.0及更高版本的一些常用event对象属性

```
event.modifiers:表示事件发生时按下了哪一个修饰键(Shift,Ctrl,Alt)。该属性是一个整数，表示不同键的2进制的组合
event.pageX:事件在网页中x轴坐标
event.pageY:事件在网页中y轴坐标
event.which:键盘事件键码，或者鼠标事件按下的键
event.button:按下的鼠标按键，其原理与IE一样，只是左键的属性值为0，右键为2
event.target:元素出现的对象
```

### 10.JavaScript中使用鼠标事件 

　　 鼠标事件中的几个函数(他们都属于document对象) 

 　　1.onMouseOver:鼠标指针移动到链接上时被调用 

 　　2.onMouseOut:鼠标移出对象边缘时被调用 

　　 3.onMouseMove:只要鼠标移动，就会触发(浏览器在，默认情况下不支持，需要使用事件捕捉技术) 

 　　4.onClick:鼠标按键何时被单击，如果onClick事件处理程序返回false，则链接不会被打开（如果对象是一个链接） 

 　　Js代码 

```
<a href="<http://www.cctv.com>" onclick="return(window.confirm('Are you sure?'));">Click here</a>
```

　　5.onDblClick: 鼠标按键何时被双击 

　　6.onMouseDown:按鼠标按键时 

　　7.onMouseUp:松开鼠标按键时 

 　　注意：单击鼠标左键，会发生3个事件，onMouseDown,onMouseUp,onClick。 

　　观察鼠标点击超链接时，触发的对象： 

　　 Html代码: 

```
<html>
<head><title>Simple jsp page</title></head>
<body>
    <h2><a href="#" id="testlink">Test Link</a></h2>
    <form name="form1">
    	<textarea rows="10" cols="70" name="info"></textarea>
    </form>
<script type="text/javascript" language="JavaScript" src="click.js"></script>
</body>
</html>
```

　　Js代码 : 

```
function mousestatus(e){
    if(!e) e=window.event;
    btn = e.button;
    whichone = (btn<2)?"left":"right";
    message=e.type+":"+whichone+"\n";
    document.form1.info.value+=message;
}
obj = document.getElementById("testlink");
obj.onmousedown = mousestatus;
obj.onmouseup = mousestatus;
obj.onclick = mousestatus;
obj.ondblclick = mousestatus;
```

###  11.JavaScript中使用键盘事件 

　　可以通过event知道用户按下的是哪个键，它会在事件发生时被传递到事件处理函数，其中Firefox中存在event.which中，而IE存在event.keyCode中 
 　　如果想处理实际的字符而非键码,可以使用函数转换 
 　　　　如：Key = String.fromCharCode(event.which); 
　　 因为两种浏览器支持的不同，所以要写成通用的，可以这样写: 
　　 Js代码: 

```
function DisplayKey(e){
    if(e.keyCode) keycode =e. keyCode;
    else  keycode = e.which;
    chacater = String.fromCharCode(keycode);
    k = document.getElementById(“keys”);
    k.innerHTML += chacater;
}
```

　　innerHTML代表某dom对象中HTML元素从 开始标签 直到 结束标签中的HTML文档。

### 12.JavaScript中的onLoad和onUnload 

 　　当前页面（包括所有图像）完成从服务器上的加载时，就会发生onLoad。 
 　　由于onLoad事件发生在HTML文档加载和显示完毕之后,所以不能在onLoad事件处理程序中使用document.write或document.open，否则会覆盖当前文档。 
 　　下面是一个一放到超链接，就显示名字的小例子。 
 　　HTML代码如下 
 　　Html代码  

```
<ul>
    <li><a href="order.html" id="order">Order Form</a>
    <li><a href="email.html" id="email">Email</a>
    <li><a href="complain.html" id="complain">Complaint Department</a>
</ul>
<h2 id="description"></h2>
<script language="JavaScript" type="text/javascript" src="linkdesc.js"></script>
```

　　Js代码 
　　linkdesc.js

```
function cleardesc() {
   d = document.getElementById("description");
     d.innerHTML = "";
}
function hover(e) {
    if (!e) var e = window.event;
    // which link was the mouse over?
    whichlink = (e.target) ? e.target.id : e.srcElement.id;
     // choose the appropriate description
     if (whichlink=="order") desc = "Order a product";
     else if (whichlink=="email") desc = "Send us a message";
     else if (whichlink=="complain") desc = "Insult us, our products, or our families";
     // display the description in the H2
     d = document.getElementById("description");
     d.innerHTML = desc;
 }

 orderlink = document.getElementById("order");
 orderlink.onmouseover=hover;
 orderlink.onmouseout=cleardesc;
 emaillink = document.getElementById("email");
 emaillink.onmouseover=hover;
 emaillink.onmouseout=cleardesc;
 complainlink = document.getElementById("complain");
 complainlink.onmouseover=hover;
 complainlink.onmouseout=cleardesc;
```

　　其中e.target代表元素所对应的对象，e.target.id代表对象的DOM对象的id。
　　如果同时定义了onKeyDown和onKeyPress事件处理函数,则先调用onKeyDown，如果返回true，则再调用onKeyPress。

###  13.JavaScript中的window对象 

#### Window对象的属性 

```
 closed 窗口是否关闭 
 defaultStatus 窗口状态栏的默认文本 
 document Document对象 
 history History对象 
 length Window对象的frame个数 
 location Location对象 
 name Window对象的名称 
 opener 打开当前Window的窗口的引用 
 parent 父窗口 
 self 返回当前窗口的引用 
 status 窗口状态栏文本 
 top 最顶层窗口 
```

#### Window对象的方法 

```
alert([Message]) 显示带有警告信息Message的窗口，并有“确定”按钮 
blur() 移除本窗口的焦点 
clearInterval(iIntervalID) 取消先前用setInterval方法开始的标识为iIntervalID的间隔事件 
clearTimeout(iTimeoutID) 取消先前用setTimeout方法开始的标识为iTimeoutID的超时事件 
close() 关闭当前窗口 
confirm([message]) 显示带有确认信息message的窗口，有“确定”和“取消”按钮 
createPopup() 创建弹出窗口，返回该窗口对象的引用 
focus() 使本窗口获得焦点 
moveBy(x,y) 将窗口的位置移动到指定的x和y偏移值 
moveTo(x,y) 将窗口左上角的屏幕位置移动到指定的x和y位置 
open() 打开新窗口，显示指定的页面 
print() 打印与窗口关联的文档 
prompt([message][,defaultValue]) 显示提示对话框，带有提示消息message和默认值defaultValue的输入框，返回用户输入的字符串 
resizeBy(x,y) 更改窗口的当前位置缩放指定的x和y偏移量 
resizeTo(x,y) 将窗口的大小更改为指定的宽度值x和高度值y 
scrollBy(x,y) 将窗口滚动x和y偏移量 
scrollTo(x,y) 将窗口滚动到指定的x和y偏移量 
setInterval(code,ms[,language]) 每经过ms毫秒后执行代码code,language指定语言属性。返回整形标识,以便clearInterval方法取消该定时器 
setTimeout(code,ms[,language]) 经过ms毫秒后执行代码code,language指定语言属性。返回整形标识，以便clearTimeout方法取消该定时器
```

### 14.JavaScript中利用表单获取数据 

####  Javascript form对象 

```
name 返回表单的名称，也就是<form name="...">属性。 
action 返回/设定表单的提交地址，也就是<form action="...">属性。 
method 返回/设定表单的提交方法，也就是<form method="...">属性。 
target 返回/设定表单提交后返回的窗口，也就是<form target="...">属性。 
encoding 返回/设定表单提交内容的编码方式，也就是<form enctype="...">属性。 
length 返回该表单所含元素的数目。 
```

####  方法  

```
reset() 重置表单。这与按下“重置”按钮是一样的。 
submit() 提交表单。这与按下“提交”按钮是一样的。 
```

###  15.W3C DOM 

 访问DOM中的节点  

```
parentNode( ).这个方法可以访问父节点。 
firstChild( ).这个方法可以访问该节点的第一个子节点，不存在就返回空。 
nextSibling( ). 这个方法可以访问下一个兄弟节点，不存在就返回空。 
previousSibling( ). 这个方法可以访问上一个兄弟节点，不存在就返回空。 
```

 文档方法  

```
getElementsByTagName(elementname):取得一个在文件或是某一部分文件中具有这个名字的所有元素的列表；创建了这样的NodeList,就可以通过索引来访问这些命名了的节点了。 
createElement( )方法：将新元素的标记名做为参数，所创建的元素对象可以接受属性及取值。 
createDocumentFragment( )方法：创建一个documentFragment节点。 
createTextNode( )、createComment( )和createCDATASection( )方法：创建如它们名字所示的节点，它们的参数将成为节点内容的字符串。 
```

 节点的方法  

```
insertBefore( )方法：将新的子节点插入到引用子节点并返回new_node: 
	dummy = node_object.insertBefore(new_node,reference_node) 
	这时dummy包含被插入的节点的一个副本。 
replaceChild( )方法：替换子节点并返回被替换的节点 
	dummy = node_object.replaceChild(new_node,reference_node) 
	这时dummy包含被插入的节点的一个副本。 
removeChild( )方法：删除被引用的子节点并返回被删除的节点 
	dummy = node_object.removeChild(reference_node) 
	这时dummy包含被删除的节点的部分。 
appendChild( )方法：将新节点加入到其他子节点的后面并返回新节点 
	dummy = node_object.appendChild(new_node) 
	这时dummy包含新节点的一个副本。 
hasChildNodes( )方法：返回一个布尔值，它是给定节点是否有子节点的测试结果。 
cloneNode( )方法：建立被Clone节点的一个副本，用true和false做为参数 
	true：除Clone元素本身外，还Clone它的所有内容 
	false：仅Clone元素本身。 
	clone的节点是一个孤儿。
```

  显示和隐藏对象  

```
Object.style.visibility = “hidden”; 
Object.style.visibility = “visible”; 
```

####  显示和隐藏对象的例子 

 Js代码  

```
<script language="Javascript" type="text/javascript">
 function ShowHide() {
 if (!document.getElementById) return;
    var head1 = document.getElementById("head1");
    var head2 = document.getElementById("head2");
    var showhead1 = document.form1.head1.checked;
    var showhead2 = document.form1.head2.checked;
    head1.style.visibility=(showhead1) ? "visible" : "hidden";
    head2.style.visibility=(showhead2) ? "visible" : "hidden";
  }
  </script>
  </head>
<body> 
```

 Html代码 

```
 <h1 ID="head1">This is the first heading</h1>
 <h1 ID="head2">This is the second heading</h1>
 <p>Using the W3C DOM, you can choose
 whether to show or hide the headings on
 this page using the checkboxes below.</p>
 <form name="form1">
 <input type="checkbox" name="head1"
    checked onClick="ShowHide();">
 <b>Show first heading</b><br>
  <input type="checkbox" name="head2"
     checked onClick="ShowHide();">
  <b>Show second heading</b><br>
  </form>
```

#### 在页面中修改文本的例子 

 Js代码 

```
<script language="Javascript" type="text/javascript">
    function ChangeTitle() {
        if (!document.getElementById) return;
        var newtitle = document.form1.newtitle.value;
        var head1 = document.getElementById("head1");
        head1.firstChild.nodeValue=newtitle;
    }
</script>
```

 Html代码 

```
<h1 ID="head1">Dynamic Text in JavaScript</h1>
<p>Using the W3C DOM, you can dynamically
change the heading at the top of this
page. Enter a new title and click the
Change button.</p>
<form name="form1">
    <input type="text" name="newtitle" size="25">
    <input type="button" value="Change!" onClick="ChangeTitle();">
</form>
```

####  为页面中添加文本的例子 

 Html代码 

```
<title>Adding to a page</title>
<script language="Javascript" type="text/javascript">
function AddText() {
   if (!document.getElementById) return;
   var sentence=document.form1.sentence.value;
   var node=document.createTextNode(" " + sentence);
   document.getElementById("p1").appendChild(node);
   document.form1.sentence.value="";
}
 </script>
 </head>
 <body>
 <h1>Create Your Own Content</h1>
 <p ID="p1">Using the W3C DOM, you can dynamically
 add sentences to this paragraph. Type a sentence
 and click the Add button.</p><form name="form1">
 <input type="text" name="sentence" size="65">
 <input type="button" value="Add" onClick="AddText();">
 </form>
```

#### 创建导航树的小例子 

```
 Html代码 
 <html>
 <head><title>Creating a Navigation Tree</title>
 <style>
    A {text-decoration: none;}
	productsmenu,#supportmenu,#contactmenu {
      display: none;
      margin-left: 2em;
    }
 </style>
  </head>
  <body>
  <h1>Navigation Tree Example</h1>
  <p>The navigation tree below allows you to expand and
  collapse items.</p>
  <ul>
   <li><a id="products" href="#">[+] Products</a>
     <ul ID="productsmenu">
        <li><a href="prodlist.html">Product List</a></li>      <li><a href="order.html">Order Form</a></li>
        <li><a href="pricelist.html">Price List</a></li>
     </ul>
   </li>
   <li><a id="support" href="#">[+] Support</a>
     <ul id="supportmenu">
        <li><a href="scontact.html">Contact Support</a></li>
     </ul>
   </li>
   <li><a ID="contact" href="#">[+] Contact Us</a>
     <ul id="contactmenu">
        <li><a href="contact1.html">Service Department</a></li>
        <li><a href="contact2.html">Sales Department</a></li>
     </ul>
   </li>
  </ul>
  <script language="javascript" type="text/javascript"
     src="tree.js">
  </script>
  </body>
  </html>
```

Js代码  

```
function Toggle(e) {
    // Don't try this in old browsers
    if (!document.getElementById) return;
    // Get the event object
    if (!e) var e = window.event;
    // Which link was clicked?
    whichlink = (e.target) ? e.target.id : e.srcElement.id;
    // get the menu object
  obj=document.getElementById(whichlink+"menu");
   // Is the menu visible?   visible=(obj.style.display=="block")
     // Get the key object (the link itself)
     key=document.getElementById(whichlink);
     // Get the name (Products, Contact, etc.)
   keyname = key.firstChild.nodeValue.substring(3);
    if (visible) {     // hide the menu
       obj.style.display="none";
       key.firstChild.nodeValue = "[+]" + keyname;
     } else {
       // show the menu
       obj.style.display="block";
       key.firstChild.nodeValue = "[-]" + keyname;
     }
  }
  document.getElementById("products").onclick=Toggle;
  document.getElementById("support").onclick=Toggle;
  document.getElementById("contact").onclick=Toggle;
```

### 16.通用的ajax库 

 Js代码  

```
var ajaxreq=false, ajaxCallback;
 // ajaxRequest: Sets up a request
 function ajaxRequest(filename) {
    try {
     // Firefox / IE7 / Others
     ajaxreq= new XMLHttpRequest();
    } catch (error) {
     try {
       // IE 5 / IE 6
        ajaxreq = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (error) {
        return false;
      }
     }
     ajaxreq.open("GET",filename);
     ajaxreq.onreadystatechange = ajaxResponse;
     ajaxreq.send(null);
  }
  // ajaxResponse: Waits for response and calls a function
  function ajaxResponse() {
     if (ajaxreq.readyState !=4) return;
     if (ajaxreq.status==200) {
        // if the request succeeded...
        if (ajaxCallback) ajaxCallback();
     } else alert("Request failed: " + ajaxreq.statusText);
     return true;
  }
```

#### ajax的小例子 

 Html代码 

```
 <html>
 <head><title>Ajax Test</title>
 <script language="JavaScript" type="text/javascript"
    src="ajax.js">
 </script>
 </head>
 <body>
 <h1>Ajax Quiz Example</h1>
 <form>
  <p><b>Question:</b>
  <span id="question">...
  </span>
  </p>
  <p><b>Answer:</b>
  <input type="text" name="answer" id="answer">
  <input type="button" value="Submit" id="submit">
  </p>
  <input type="button" value="Start the Quiz" id="startq">
  </form>
  <script language="JavaScript" type="text/javascript"
     src="quiz.js">
  </script>
  </body>
  </html>
```

Xml 代码 

```
 <?xml version="1.0" ?>
 <questions>
     <q>What DOM object contains URL information for the window?</q>
     <a>location</a>
     <q>Which method of the document object finds the object for an element?</q>
     <a>getElementById</a>
     <q>If you declare a variable outside a function, is it global or local?</q>
     <a>global</a>
     <q>What is the formal standard for the JavaScript language called?</q>
      <a>ECMAScript</a>
  </questions>
```

Js代码  

```
var qn=0;
 // load the questions from the XML file
 function getQuestions() {
    obj=document.getElementById("question");
    obj.firstChild.nodeValue="(please wait)";
    ajaxCallback = nextQuestion;
    ajaxRequest("questions.xml");
 }
 // display the next question
  function nextQuestion() {
     questions = ajaxreq.responseXML.getElementsByTagName("q");
     obj=document.getElementById("question");
     if (qn < questions.length) {
        q = questions[qn].firstChild.nodeValue;
        obj.firstChild.nodeValue=q;
     } else {
        obj.firstChild.nodeValue="(no more questions)";
     }
  }
  // check the user's answer
  function checkAnswer() {
     answers = ajaxreq.responseXML.getElementsByTagName("a");
     a = answers[qn].firstChild.nodeValue;
     answerfield = document.getElementById("answer");
     if (a == answerfield.value) {
        alert("Correct!");
     }
     else {
        alert("Incorrect. The correct answer is: " + a);
     }
     qn = qn + 1;
     answerfield.value="";
     nextQuestion();
  }
  // Set up the event handlers for the buttons
  obj=document.getElementById("startq");
  obj.onclick=getQuestions;
  ans=document.getElementById("submit");
  ans.onclick=checkAnswer;
```

### 16、图片懒加载

#### 16.1 什么是懒加载

懒加载其实就是延迟加载，是一种对网页性能优化的方式，比如当访问一个页面的时候，优先显示可视区域的图片而不一次性加载所有图片，当需要显示的时候再发送图片请求，避免打开网页时加载过多资源。

#### 16.2 什么时候用懒加载

当页面中需要一次性载入很多图片的时候，往往都是需要用懒加载的。

#### 16.3 懒加载原理

```
	我们都知道HTML中的<img>标签是代表文档中的一个图像，<img>标签有一个属性是src，用来表示图像的URL，当这个属性的值不为空时，浏览器就会根据这个值发送请求。如果没有src属性，就不会发送请求。
	我们可以利用一下这点，先不设置`src`，需要的时候再设置。
	我们先不给<img>设置`src`，把图片真正的URL放在另一个属性`data-src`中，在需要的时候也就是图片进入可视区域的之前，将URL取出放到`src`中。
```

#### 16.4 使用方法

　　1. 引用jquery和jquery.lazyload.js到你的页面

```
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="jquery.lazyload.js"></script>
```

 　　2. 你必须改变图片的标签。图像的地址必须放在`data-original`属性上。给懒加载图像一个特定的class（例如:lazy）。这样你可以很容易地进行图像插件捆绑。代码如下：

　　HTML：

```
<img class="lazy" alt="" width="640" height="480" data-original="img/img01.jpg" />
```

　　js：

```
$(function() {
    $("img.lazy").lazyload();
});
```

　　这将使所有 class 为 `lazy` 的图片将被延迟加载。

#### 16.5 设置临界点

　　默认情况下图片会出现在屏幕时加载. 如果你想提前加载图片, 可以设置`threshold `选项, 设置 threshold 为 200 令图片在距离屏幕 200 像素时提前加载。

```
$("img.lazy").lazyload({
    threshold : 200
});
```

#### 16.6 设置事件来触发加载

　　你可以使用jQuery事件，例如`click`和`mouseover`。也可以使用自定义事件，如`sporty`、`foobar`默认情况下是要等到用户向下滚动并且图像出现在视口中时。

　　只有当用户点击它们才加载图片：

```
$("img.lazy").lazyload({
    event : "click"
});
```

#### 16.7 使用特效

　　默认情况下，插件等待图像完全加载并调用`show()`。你可以使用任何你想要的效果。下面的代码使用`fadeIn `（淡入效果）。

```
$("img.lazy").lazyload({
    effect : "fadeIn"
});
```

#### 16.8 针对不启用javaScript的情况

　　几乎所有浏览器的 JavaScript 都是激活的. 然而可能你仍希望能在不支持 JavaScript 的客户端展示真实图片. 当浏览器不支持 JavaScript 时优雅降级, 你可以将真实的图片片段写在 `<noscript>` 标签内.

```
<img class="lazy" data-original="img/example.jpg"  width="640" heigh="480">
<noscript><img src="img/img01.jpg" width="640" heigh="480"></noscript>
```

　　可以通过 CSS 隐藏占位符.

```
.lazy {
    display: none;
}
```

　　在支持 JavaScript 的浏览器中, 你必须在 DOM ready 时将占位符显示出来, 这可以在插件初始化的同时完成.

```
$("img.lazy").show().lazyload();
```

#### 16.9 图片在容器中

　　你可以将插件用在可滚动容器的图片上, 例如带滚动条的 DIV 元素. 你要做的只是将容器定义为 jQuery 对象并作为参数传到初始化方法里面.

```
$("img.lazy").lazyload({
　　container: $("#container"), // 对某容器中的图片实现效果 // container,值为某容器.lazyload默认在拉动浏览器滚动条时生效,这个参数可以让你在拉动某DIV的滚动条时依次加载其中的图片
});
```

#### 16.10 加载隐藏的图片

　　可能在你的页面上埋藏可很多隐藏的图片. 比如插件用在对列表的筛选, 你可以不断地修改列表中各条目的显示状态. 为了提升性能, Lazy Load 默认忽略了隐藏图片. 如果你想要加载隐藏图片, 　　请将 `skip_invisible` 设为 `false`

```
$("img.lazy").lazyload({ 
    skip_invisible : false
});
```

#### 16.11 参数设置

```
$("img.lazy").lazyload({
  placeholder : "img/grey.gif", //用图片提前占位
    // placeholder,值为某一图片路径.此图片用来占据将要加载的图片的位置,待图片加载时,占位图则会隐藏
  effect: "fadeIn", // 载入使用何种效果
    // effect(特效),值有show(直接显示),fadeIn(淡入),slideDown(下拉)等,常用fadeIn
  threshold: 200, // 提前开始加载
    // threshold,值为数字,代表页面高度.如设置为200,表示滚动条在离目标位置还有200的高度时就开始加载图片,可以做到不让用户察觉
  event: 'click',  // 事件触发时才加载
    // event,值有click(点击),mouseover(鼠标划过),sporty(运动的),foobar(…).可以实现鼠标莫过或点击图片才开始加载,后两个值未测试…
  container: $("#container"),  // 对某容器中的图片实现效果
    // container,值为某容器.lazyload默认在拉动浏览器滚动条时生效,这个参数可以让你在拉动某DIV的滚动条时依次加载其中的图片
  failurelimit : 10 // 图片排序混乱时
     // failurelimit,值为数字.lazyload默认在找到第一张不在可见区域里的图片时则不再继续加载,但当HTML容器混乱的时候可能出现可见区域内图片并没加载出来的情况,failurelimit意在加载N张可见区域外的图片,以避免出现这个问题.
});
```

![img](https://upload-images.jianshu.io/upload_images/12421329-4ce35d43fe885873?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)

#### 16.12 另附JavaScript原生实现

```
// 图片懒加载类
class LazyLoad {
    constructor(el) {
        this.imglist = Array.from(document.querySelectorAll(el)); // 需使用懒加载的图片集合
        this.init(); // 初始化
    }
    // 判断是否该图片是否可以加载
    canILoad() {
        let imglist = this.imglist;
        for (let i = imglist.length; i--;) {
            // 缩写，相当于if true
            this.getBound(imglist[i]) && this.loadImage(imglist[i], i);
        }
    }
    // 获取图片与窗口的信息
    getBound(el) {
        let bound = el.getBoundingClientRect();
        let clientHeight = window.innerHeight;
        // 图片距离顶部的距离 <= 浏览器可视化的高度，从而推算出是否需要加载
        return bound.top <= clientHeight - 100; // -100是为了看到效果，您也可以去掉
    }
    // 加载图片
    loadImage(el, index) {
        // 获取之前设置好的data-original值
        let src = el.getAttribute('data-original');
        // 赋值到src，从而请求资源
        el.src = src;
        // 避免重复判断，已经确定加载的图片应当从imglist移除
        this.imglist.splice(index, 1);
    }
    // 当浏览器滚动的时候，继续判断
    bindEvent() {
        window.addEventListener('scroll', () => {
            this.imglist.length && this.canILoad();
        });
    }
    // 初始化
    init() {
        this.canILoad();
        this.bindEvent();
    }
}
// 实例化对象，参数则是需要使用懒加载的图片类名
const lazy = new LazyLoad('.lazyload')
```

 完整代码参照：

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>图片懒加载</title>
    <style>
        body {
            text-align: center;
        }
        img {
            width: 100%;
            max-width: 300px;
            height: 200px;
            margin-bottom: 0px;
        }
        .lazyload {
        　　display: none;
　　　　}
    </style>
</head>
<body>
    <img class="lazyload" data-original="https://media3.giphy.com/media/k5GuJn7VslbpGQqHUB/200w.webp">
    <img class="lazyload" data-original="https://media1.giphy.com/media/2A7yoKf2B87kotTApZ/200w.webp">
    <img class="lazyload" data-original="https://media2.giphy.com/media/3h1rwFW1PpLxD9xLUR/200w.webp">
    <img class="lazyload" data-original="https://media0.giphy.com/media/igHgY3xzYxmRcxwZBs/200w.webp">
    <img class="lazyload" data-original="https://media0.giphy.com/media/69v5dFsLtzdpaFZz2N/200w.webp">
    <img class="lazyload" data-original="https://media3.giphy.com/media/k5GuJn7VslbpGQqHUB/200w.webp">
    <img class="lazyload" data-original="https://media1.giphy.com/media/2A7yoKf2B87kotTApZ/200w.webp">
    <img class="lazyload" data-original="https://media2.giphy.com/media/3h1rwFW1PpLxD9xLUR/200w.webp">
    <img class="lazyload" data-original="https://media0.giphy.com/media/igHgY3xzYxmRcxwZBs/200w.webp">
    <img class="lazyload" data-original="https://media0.giphy.com/media/69v5dFsLtzdpaFZz2N/200w.webp">
</body>
<script>
   // 图片懒加载类
   class LazyLoad {
       constructor(el) {
           this.imglist = Array.from(document.querySelectorAll(el)); // 需使用懒加载的图片集合
           this.init(); // 初始化
       }
       // 判断是否该图片是否可以加载
       canILoad() {
           let imglist = this.imglist;
           for (let i = imglist.length; i--;) {
               // 缩写，相当于if true
               this.getBound(imglist[i]) && this.loadImage(imglist[i], i);
           }
       }
       // 获取图片与窗口的信息
       getBound(el) {
           let bound = el.getBoundingClientRect();
           let clientHeight = window.innerHeight;
           // 图片距离顶部的距离 <= 浏览器可视化的高度，从而推算出是否需要加载
           return bound.top <= clientHeight - 100; // -100是为了看到效果，您也可以去掉
       }
       // 加载图片
       loadImage(el, index) {
           // 获取之前设置好的data-original值
           let src = el.getAttribute('data-original');
           // 赋值到src，从而请求资源
           el.src = src;
           // 避免重复判断，已经确定加载的图片应当从imglist移除
           this.imglist.splice(index, 1);
       }
       // 当浏览器滚动的时候，继续判断
       bindEvent() {
           window.addEventListener('scroll', () => {
               this.imglist.length && this.canILoad();
           });
       }
       // 初始化
       init() {
           this.canILoad();
           this.bindEvent();
       }
   }
   // 实例化对象，参数则是需要使用懒加载的图片类名
   const lazy = new LazyLoad('.lazyload');
</script>
</html>
```