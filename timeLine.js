/**
 * created by xin.Zhang
 * version 1.0
 * createTime 2020-10-13 09:34
 */

$.fn.extend({
  timeline(config = {}) {
    config.num = Array.isArray(config.data) && config.data.length || 0
    config.current = config.num && config.current || 3
    let width = 90 / (config.num - 1).toFixed(2)
    if (config.current >= 1) {
      $(`<div class = "firstpoint hover"><div class = "text"><div class = "name">${config.data[0].name}</div><div class = "opacity">${config.data[0].user}</div><div class = "opacity">${config.data[0].time}</div></div></div>`).appendTo($(this))
      for (let i = 1; i < config.current; i++) {
        $(`<div class="line hover" style = "width:${width}%"><div class = "point hover"></div><div class = "text"><div class = "name">${config.data[i].name}</div><div class = "opacity">${config.data[i].user}</div><div class = "opacity">${config.data[i].time}</div></div></div>`).appendTo($(this))
      }
    } else {
      $(`<div class = "firstpoint"><div class = "text"><div class = "name opacity">${config.data[0].name}</div><div class = "opacity">${config.data[0].text}</div></div></div>`).appendTo($(this))
    }
    if (config.current !== 0) {
      $(`<div class="line" style = "width:${width}%"><div class = "point"></div><div class = "text"><div class ="name currentname">${config.data[config.current].name}</div><div class = "currenttext ">${config.data[config.current].text}</div></div></div>`).appendTo($(this))
    }
    for (let j = config.current + 1; j < config.num; j++) {
      $(`<div class="line" style = "width:${width}%"><div class = "point"></div><div class = "text"><div class ="name opacity">${config.data[j].name}</div><div class = "opacity">${config.data[j].text}</div></div></div>`).appendTo($(this))
    }

    this.css({
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginTop: '40px',
      position: 'relative',
      height: '100px'
    })
    this.find('.firstpoint').css({
      position: 'absolute',
      width: "10px",
      height: "10px",
      border: '2px solid #fff',
      borderRadius: "50%",
      background: "#e9e9e9",
      top: "0",
      left: '5%',
      transform: "translateY(-4px)",
      zIndex: 99
    })
    this.find('.line').css({
      height: "6px",
      background: '#e9e9e9',
      position: "relative"
    })
    this.find('.line>.point').css({
      position: "absolute",
      width: "8px",
      height: "8px",
      border: '2px solid #fff',
      borderRadius: "50%",
      background: "#e9e9e9",
      top: "50%",
      right: 0,
      transform: "translateY(-50%)"
    })
    this.find('.hover').css({
      background: "#1890FF"
    })
    this.find('.firstpoint>.text').css({
      width: '140px',
      height: '100px',
      position: "absolute",
      bottom: '-100px',
      right: `-70px`,
      textAlign: 'center'
    })
    this.find('.line>.text').css({
      width: '80%',
      height: '100px',
      position: "absolute",
      bottom: '-100px',
      right: `-40%`,
      textAlign: 'center'
    })
    this.find('.currentname').css({
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#000'
    })
    this.find('.currenttext').css({
      color: '#1890FF'
    })
    this.find('.opacity').css({
      opacity: 0.4
    })
  }
})