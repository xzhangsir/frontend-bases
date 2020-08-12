
//防抖    triggleNow ture 第一次进来就执行  false 延时time后执行
function debounce(fn, time, triggleNow) {
  var t = null
  var debounce = function () {
    var _self = this,
      args = arguments;
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
      cut = new Date().getTime();
    clearTimeout(t)
    if (cur - begin >= delay) {
      fn.apply(_self, args)
      begin = cur
    } else {
      t = setTimeout(function () {
        fn.apply(_self, args)
      }, delay - (cur - begin))
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


