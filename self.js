//通用获取节点方法
function $(selector){
  var str = selector.slice(1)
  if(selector[0] == "#"){
    return document.getElementById(str)
  }
  if(selector[0] == "."){
    return document.getElementsByClassName(str)
  }
  if(selector[0] !== "#" && selector[0] !== "."){
    return document.getElementsByTagName(selector)
  }
}

// 返回随机16进制颜色值
function getRandomColor(){
  var arr = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"]
  var result = "#";
  for(var i = 0; i < 6;i++){
    var random = Math.floor(Math.random()*16);
    result += arr[random];
  }
  return result;
}

// 16进制颜色
console.log('#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0'))

//实现insertAfter方法
function insertAfter(newElement,p3){
	var parent=p3.parentNode
	if (parent.lastChild == p3) {
		parent.appendChild(newElement)
	} else{
		parent.insertBefore(newElement,p3.nextSibling)
	}
}

// 过去7天的日期   减号变加号  就是未来7天
var arr = [...Array(7).keys()]
arr.map(days=>{
    console.log(new Date(Date.now() - 86400000 * days))
})

//解析URL
 var q = {};
 location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);
 console.log(q);
