const WebSocket = require('ws')

const WebSocketServer = WebSocket.Server;

const wss = new WebSocketServer({
	port:3000
})

wss.on('connection',function(ws){
	console.log(`建立连接`)
	ws.on('message',function(message){
		console.log(`接受消息: ${message}`)
		ws.send(`发送给客户端:world`,err=>{
			if(err){
				console.log(`err：${err}`)
			}
		})
	})
})


// 客户端  伪代码
// <script>
// const  ws = new WebSocket('ws://localhost:3000/test')

// 		ws.onopen = function(){
// 			console.log('open()')
// 			ws.send('hello')
// 		}
// 		ws.onmessage = function(msg){
// 			console.log(msg.data)
// 		}
// </script>