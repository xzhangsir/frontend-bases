const koa = require('koa')
const app = new koa()
const router = require('koa-router')()
// 处理POST请求的中间件
const bodyParser = require('koa-bodyparser')
// 连接mysql的中间件
const  sql = require('mysql2-promise')();
// 解决跨域
const cors = require('koa2-cors')
// 处理上传文件的中间件  如果是文件 切记form表达的enctype="multipart/form-data"
const multer = require('koa-multer')

var storage = multer.diskStorage({
	//文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'uploads/')  //这个文件夹需要手动生成
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
   }
})
var upload = multer({storage:storage})

sql.configure({
	host:'127.0.0.1',
	user:'root',
	password:'1234567',
	database:'zx'
})

app.use(async (ntx,next)=>{
	await next()
})


router.get('/test', async (ctx, next) => {
	var [data] = await sql.query(`SELECT * FROM STUDENT`)
	ctx.body = {
		code:200,
		data
	}
})

router.get('/hello',async (ctx,next)=>{
	// ctx.request.query  获取请求的参数 返回对象
	// ctx.request.querystring  获取请求的参数 返回字符串
	
	var {name} = ctx.request.query
	ctx.response.body = `<h1>Hello, ${name}!</h1>`
})

// 处理post请求
router.post('/login',async (ctx,next)=>{
	var username = ctx.request.body.username || ''
	var psd = ctx.request.body.psd || ''
	console.log(username,psd)
})

// 
router.post('/img', upload.single('img'), async (ctx, next)=>{
	console.log(ctx)
	// ctx.body = {
	// 	img:ctx.request.body.img
	// }
})
// 绑定处理跨域
app.use(cors())
// 绑定处理post请求的中间件
app.use(bodyParser())
// 绑定路由
app.use(router.routes());
// 监听3000端口
app.listen(3000);
