//防抖    triggleNow ture 第一次进来就执行  false 延时time后执行
function debounce(fn, time, triggleNow) {
  var t = null
  var debounce = function () {
    var _self = this,
      args = arguments
    if (t) {
      clearTimeout(t)
    }
    if (triggleNow) {
      var exec = !t
      t = setTimeout(function () {
        t = null
      }, time)
      if (exec) {
        fn.apply(_self, args)
      }
    } else {
      t = setTimeout(function () {
        fn.apply(_self, args)
      }, time)
    }
  }
  debounce.remove = function () {
    clearTimeout(t)
    t = null
  }
  return debounce
}
// 节流
function throttle(fn, delay) {
  var t = null,
    begin = new Date().getTime()
  return function () {
    var _self = this,
      args = arguments,
      cut = new Date().getTime()
    clearTimeout(t)
    if (cut - begin >= delay) {
      fn.apply(_self, args)
      begin = cut
    } else {
      t = setTimeout(function () {
        fn.apply(_self, args)
      }, delay - (cut - begin))
    }
  }
}
// 惰性函数
var getTimeStamp = function () {
  var timeStamp = new Date().getTime()
  // 复写自己
  getTimeStamp = function () {
    return timeStamp
  }
  return getTimeStamp()
}

// 动态替换属性值

/* var data = [
  {
    name: '第一张',
    img: 'https://xxx.jpg'
  },
  {
    name: '第二张',
    img: 'https://xxx.png'
  }
]
var list = ''
var ul = `<li>
              <img src="" data-src = "{{img}}" alt = "{{name}}"/>
        </li>`
data.forEach(function (elem) {
  list += ul.replace(/{{(.*?)}}/g, function (node, key) {
    return {
      img: elem.img,
      name: elem.name
    }[key]
  })
})
console.log(list) */

//剔除假值
/* function compactObject(val) {
  const data = Array.isArray(val) ? val.filter(Boolean) : val
  return Object.keys(data).reduce(
    (acc, key) => {
      const value = data[key]
      if (value) {
        acc[key] = typeof value === 'object' ? compactObject(value) : value
      }
      return acc
    },
    Array.isArray(data) ? [] : {}
  )
} */

//简易节流
/*
function throttle(func, delay) {
  let pre = 0
  return function () {
    let now = new Date()
    const context = this,
      args = arguments
    if (now - pre > delay) {
      func.apply(context, args)
      pre = now
    }
  }
}

window.addEventListener(
  'resize',
  throttle(function () {
    console.log(123)
  }, 1000)
)
*/

//简易防抖
/*
function debounce(func, delay) {
  let timer
  return function () {
    const context = this,
      args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      func.apply(context, args)
    }, delay)
  }
}
*/

//scroll 图片懒加载
/**
  const images = document.querySelectorAll("img");

  window.addEventListener("scroll", (e)=>{
    images.forEach(image=>{
      const imgTop = image.getBoundingClientRect().top;
      if(imgTop <= window.innerHeight){
        const src = image.getAttribute("src")
        if(!src){
          const data_src = image.getAttribute("data-src")
          image.setAttribute("src",data_src)
        }
      }
      console.log("gun")
    })
  })
*/

//IntersectionObserver图片懒加载

/**		
const images = document.querySelectorAll("img")

const callback = (entries)=>{

  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const image = entry.target;
      const data_src = image.getAttribute("data-src")
      image.setAttribute("src",data_src)
      observer.unobserve(image)
      console.log("触发")
    }
  })
}

const observer = new IntersectionObserver(callback)

images.forEach(image=>{
  observer.observe(image)
})const images = document.querySelectorAll("img")
*/

//通用获取节点方法
/* function $(selector) {
  var str = selector.slice(1)
  if (selector[0] == '#') {
    return document.getElementById(str)
  }
  if (selector[0] == '.') {
    return document.getElementsByClassName(str)
  }
  if (selector[0] !== '#' && selector[0] !== '.') {
    return document.getElementsByTagName(selector)
  }
}
 */
// 返回随机16进制颜色值
/* function getRandomColor() {
  var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
  var result = '#'
  for (var i = 0; i < 6; i++) {
    var random = Math.floor(Math.random() * 16)
    result += arr[random]
  }
  return result
} */

// 16进制颜色
/* console.log(
  '#' +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padEnd(6, '0')
) */

//实现insertAfter方法
/* function insertAfter(newElement, p3) {
  var parent = p3.parentNode
  if (parent.lastChild == p3) {
    parent.appendChild(newElement)
  } else {
    parent.insertBefore(newElement, p3.nextSibling)
  }
} */

// 过去7天的日期   减号变加号  就是未来7天
/* var arr = [...Array(7).keys()]
arr.map((days) => {
  console.log(new Date(Date.now() - 86400000 * days))
}) */

//解析URL
/*  var q = {};
 location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);
 console.log(q);
 */

//  图片合并
/* <canvas width = "430" height="430"></canvas>
var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
var img = new Image()
img.src = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQGc8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAydGRjZDVTOUVhRVUxMDAwME0wN2YAAgQ84mNhAwQAAAAA`
img.onload = () => {
    ctx.drawImage(img, 0, 0)
    draw()
}
function draw() {
    var img2 = new Image()
    img2.src = 'apple.jpg'
    img2.onload = () => {
         ctx.drawImage(img2, 167,167,96,96)
        // console.log(canvas.toDataURL())
    }
} */

//图片文件上传预览

/* 	<input type="file" id = "fileDom">
	<img src="" alt="" id = "imgDom">
<script>
			$("#fileDom").change((w)=>{
				console.log($("#fileDom").get(0).files[0])
				$("#imgDom").attr('src',URL.createObjectURL($("#fileDom").get(0).files[0]))
			})
</script> */

// 节点路径查找
/*  var list = [
   {
     id: "ab",
     children: [
       {
         id: "cd",
         children: [
           {
             id: "ef",
             children: []
           }
         ]
       },
       {
         id: "fg",
         children: []
       }
     ]
   }
 ]
 function findPathByLeafId(leafId, nodes, path = []) {
   for (var i = 0; i < nodes.length; i++) {
     path.push(nodes[i].id);
     if (leafId == nodes[i].id) return path;
     if (nodes[i].children) {
       var findResult = findPathByLeafId(leafId, nodes[i].children, path);
       if (findResult) return findResult;
     }
   }
 }
 console.log(findPathByLeafId('ef', list))
 */

//  arrayToTree
/* const arr = [
  { id: 1, parentId: null, name: 'a' },
  { id: 2, parentId: null, name: 'b' },
  { id: 3, parentId: 1, name: 'c' },
  { id: 4, parentId: 2, name: 'd' },
  { id: 5, parentId: 1, name: 'e' },
  { id: 6, parentId: 3, name: 'f' },
  { id: 7, parentId: 4, name: 'g' },
  { id: 8, parentId: 7, name: 'h' }
]

function arrayToTree(arr) {
  if (!Array.isArray(arr) || !arr.length) return
  let map = {}
  arr.forEach((item) => (map[item.id] = item))

  let roots = []
  arr.forEach((item) => {
    const parent = map[item.parentId]
    if (parent) {
      ;(parent.children || (parent.children = [])).push(item)
    } else {
      roots.push(item)
    }
  })

  return roots
}

console.log(arrayToTree(arr)) */

// 移动端适配
/*
    //获取手机横向的设备独立像素
    const dip = document.documentElement.clientWidth
    // 计算根字体的大小  设备独立像素 * 100 / 设计稿的宽度
    const rootFontSize = (dip * 100) / 375
    //设置根字体
    document.documentElement.style.fontSize = rootFontSiz

*/
