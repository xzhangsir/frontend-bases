
		const fs = require("fs");

		function getFile(path){
			return new Promise(function(resolve,reject){
				fs.readFile(path,'utf-8',function(err,data){
					if(err) return reject(err)
					resolve(data);
				})
			})
		}
		/*
		如果第一个文件读取失败  这样操作可以防止后面文件的 读取失败
		// 读取第一个文件
		getFile('./1.txt')
			.then(res=>{
				console.log(res+"成功");			
				//读取第二个文件
				return getFile('./2.txt');
			},rel=>{
				// 失败的回调函数可以不写
				console.log('失败');
				return getFile('./2.txt');
			})
			.then(res=>{
				console.log(res+'成功');
				// 读取第三个文件
				return getFile('./3.txt');
			},rel=>{
				console.log("失败");
				return getFile('./3.txt');
			})
			.then(res=>{
				console.log(res+"成功");
			},rel=>{
				console.log("失败");
			})
		 */
		
		/*如果第一个读取失败 那么我们就终止所有的读取操作*/
		 getFile('./11.txt')
		 	.then(res=>{
		 		console.log(res+'成功');
		 		return getFile('./2.txt');
		 	})
		 	.then(res=>{
		 		console.log(res+'成功');
		 		return getFile('./3.txt');
		 	})
		 	.then(res=>{
		 		console.log(res+'成功');
		 	})
		 	.catch(err=>{//如果前面有一个promise 执行失败 则终止所有的promise 执行
		 		console.log("报错了"+err.message);
		 	})
