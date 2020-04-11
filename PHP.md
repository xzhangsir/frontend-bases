## 1、PHP发送前端JSON数据

(1)

```
<?PHP
  header('Access-Control-Allow-Origin: *');//处理跨域访问
  $arr=array();
   $arr['id']=$_GET['id'];
   $arr['name']='nihao';
   $arr['age']=$_GET['age'];
   $arr['sex']=$_GET['sex'];
   echo json_encode($arr,JSON_UNESCAPED_UNICODE);
> 
```

(2)

```
<?php
/*echo '{
  "sites":
   [
 { "Name": "Google", "Url": "www.google.com", "Country": "USA" },
 { "Name": "Facebook", "Url": "www.facebook.com", "Country": "USA" },
 { "Name": "微博", "Url": "www.weibo.com", "Country": "CN" }
   ]
}';*/
//print $_POST['siteName'].$_POST['url'].$_POST['country'];
//print $_POST['siteName'];
//print json_encode($_POST['siteName'],JSON_UNESCAPED_UNICODE);
$siteName = json_encode($_POST['siteName'],JSON_UNESCAPED_UNICODE);
$url = json_encode($_POST['url'],JSON_UNESCAPED_UNICODE);
$country = json_encode($_POST['country'],JSON_UNESCAPED_UNICODE);
$sites = '
 {
   "sites":
   [
     { "Name": '.$siteName.', "Url":'.$url.', "Country": '.$country.' },
     { "Name": "Google", "Url": "www.google.com", "Country": "USA" },
     { "Name": "Facebook", "Url": "www.facebook.com", "Country": "USA" },
     { "Name": "微博", "Url": "www.weibo.com", "Country": "CN" }
   ]
 }
';
print $sites;
```

