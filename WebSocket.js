// 服务端
const ws = require("ws")
;((ws)=>{
	const server = new ws.Server({port:8000})

	const init = () =>{
		bindEvent()
	}
	function bindEvent(){
		server.on('open',handleOpen)
		server.on('close',handleClose)
		server.on('error',handleError)
		server.on('connection',handleConnection)
	}
	function handleOpen(){
		console.log("open")
	}
	function handleClose(){
		console.log("close")
	}
	function handleError(){
		console.log("error")
	}
	function handleConnection(ws){
		console.log("connection")
        ws.on('message',handleMessage)
	}
	function handleMessage(msg){
		console.log(msg)
		server.clients.forEach(_=>_.send(msg))
	}
	init()

})(ws)

// 客户端伪代码

<template>
  <div class="home">
  	<input type="text" v-model.trim = "msg"  placeholder="发送的内容" />
  	<button @click = "butSend">发送</button>
   <ul>
   	<li v-for = "(item,index) in msgList" :key  = "index">{{item.msg}}</li>
   </ul>
  </div>
</template>

<script>
const ws = new WebSocket("ws://localhost:8000")
export default {
  data(){
  	return{
  		msg:"",
  		msgList:[]
  	}
  },
  mounted(){
    ws.addEventListener("open",this.handleWsOpen.bind(this),false)
    ws.addEventListener("close",this.handleWsClose.bind(this),false)
    ws.addEventListener("error",this.handleWsError.bind(this),false)
    ws.addEventListener("message",this.handleWsMessage.bind(this),false)
  },
  methods:{
  	butSend(){
  		if(this.msg){		
	  		ws.send(JSON.stringify({
	  			msg:this.msg
	  		}))
	  	}
  	},
  	handleWsOpen(e){
  		console.log("open")
  	},
  	handleWsClose(e){
  		console.log("close")
  	},
  	handleWsError(e){
  		console.log("error")
  	},
  	handleWsMessage(e){
  		this.msgList.push(JSON.parse(e.data))
  		console.log("message")

  	}
  }
};
</script>
