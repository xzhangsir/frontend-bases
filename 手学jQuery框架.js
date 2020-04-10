
		/*
		1.jQuery框架的本质是一个闭包 好处是可以避免和其他框架之间 出现 变量冲突
		2.jQuery如何让外界访问内部定义的局部变量
			(function(){
				var num = 10;
				window.num = num;
			})()
			window.xxx = xxx;
		3.jQuery为何要给自己传一个window参数
			为了方便压缩代码
			为了提升查找效率
		4.jQuery为何要给自己接受一个undefined参数
			为了方便压缩代码
			IE9以下的浏览器 undefined可以被修改 为了保证内部的undefined不被修改，所以需要接受一个正确的undefined
		 */
		/*
			console.log($());
			$() 中传入的数据
			1.传入 0 "" NAN undefined false null  和不传
				返回空的jQuery 对象
			2.传入字符串
				传入的是代码片段  会将创建好的DOM元素存储到jQuery对象中返回
				传入的是选择器  会将找到的所有元素存储到jQuery对象中返回
			3. 传入数组
				会将数组中存储的元素依次存储到jQuery对象中返回
			4. 传入其他 
				会将找传入的数据存储到jQuery对象中返回
		 */
		

		(function( window, undefined ) {
			
			var jQuery = function(selector) {
				return new jQuery.prototype.init(selector);
			}
			jQuery.prototype = {
				constructor:jQuery,
				init:function(selector){
					selector = jQuery.trim(selector)
					// 1.传入 0 "" NAN undefined false null  和不传
					if(!selector){
						return this;
					}//传入的是方法
					else if(jQuery.isFunction(selector)){
						jQuery.ready(selector);
					}
					//2.传入字符串
					else if(jQuery.isString(selector)){
						// 传入的是代码片段 
						if(jQuery.isHTML(selector)){
							// 根据代码片段创建所有元素
							var temp = document.createElement('div');
							temp.innerHTML = selector;
							//将创建好的一级元素添加到jQuery当中
							// for(var i = 0 ; i < temp.children.length;i++){
							// 	this[i] = temp.children[i];
							// }
							//jQuery对象添加length属性
							// this.length = temp.children.length;
							//上面的两步可以简化为下面这一步 将真数组转化为伪数组
							[].push.apply(this,temp.children);
							//返回加工好的this
							return this;
						}//传入的是选择器
						else{
							//根据传入的选择器找到对应的元素
							var res = document.querySelectorAll(selector);
							//将找到的元素添加到jQuery上
							// for(var i = 0 ; i < res.length ; i++){
							// 	this[i] = res[i];
							// }
							// this.length = res.length;
							//同样上面的代码可以被下面的替换
							[].push.apply(this,res);
							//返回加工好的this
							return this;

						}
					}//3.数组
					else if(jQuery.isArray(selector)){
						//真数组
						if(({}).toString.apply(selector) === "[object Array]"){
							[].push.apply(this,selector);
							return this;
						}//伪数组
						else{
							var arr = [].slice.call(selector);
							[].push.apply(this,arr);
							return this;
						}
					}//其他处理
					else{
						this[0] = selector;
						this.length = 1;
						return this;
					}
				},
				//返回当前版本号
				jQuery : "1.10.1",
				//实例默认选择器取值
				selector : "",
				//实例默认的长度
				length : 0,
				//给实例添加新的元素
				push : [].push,
				//对实例中的元素进行排序
				sort : [].sort,
				splice : [].splice,
				toArray:function(){
					return [].slice.call(this);
				},
				get:function(num){
					//没有传参数
					if(arguments.length === 0){
						return this.toArray();
					}//传的是正数
					else if(num >= 0){
						return this[num];
					}//传的是负数
					else{
						return this[this.length+num];
					}
				},
				eq:function(num){
					if(arguments.length === 0){
						return new jQuery;
					}else{
						return jQuery(this.get(num));
					}
				},
				first:function(){
					return this.eq(0);
				},
				last:function(){
					return this.eq(-1);
				},
				each:function(fn){
					return jQuery.each(this,fn);
				}
			}
			jQuery.extend = jQuery.prototype.extend =  function(obj){
				for(var key in obj){
					this[key] = obj[key];
				}
			}
			//下面是工具方法
			jQuery.extend({
					//判断是不是字符串
				isString : function(str){
					return typeof str === "string";
				},
				//判断是不是代码片段
				isHTML : function(str){
					if(str.charAt(0) === "<" && str.charAt( str.length - 1 ) === ">" && str.length >= 3 ){
						return true;
					}
					return false;
				},
				//去掉字符串两端的空格
				trim : function(str){
					if(!jQuery.isString(str)){
						return str;
					}
					//如果浏览器兼容 trim()方法 就用trim()方法
					if(str.trim){
						return str.trim();
					}else{
						//不兼容用这个replace()  传两个参数将第一个参数找到的东西用第二个参数来替换
						return str.replace(/^\s+|\s+$/g,"")
					}
				},
				//判断是不是对象
				isObject : function(str){
					return typeof str === "object";
				},
				//判断是不是window
				isWindow : function(str){
					return str === window;
				},
				//判断是不是数组
				isArray : function(str){
					if(jQuery.isObject(str) && !jQuery.isWindow(str) && "length" in str){
						return true;
					}
					return false;
				},
				//判断是不是函数
				isFunction : function(str){
					return typeof str === 'function';
				},
				//判断DOM元素是否加载完毕
				ready:function(fn){
					//onload 事件会等到DOM元素和资源全部加载完毕才会执行
					//DOMContentLoaded 事件只需要等到 DOM元素加载完毕就会执行 但是IE8以下慢悠悠这个事件
					//IE8以下用这个  document.readyState
					//readyState 属性返回当前文档的状态（载入中……）。
					// 该属性返回以下值:

					// uninitialized - 还未开始载入
					// loading - 载入中
					// interactive - 已加载，文档与用户可以开始交互
					// complete - 载入完成
					if(document.readyState === "complete"){
						fn();
					}else if(document.addEventListener){
						document.addEventListener('DOMContentLoaded',function(){
							fn();
						})

					}else{
						document.attachEvent("onreadyStateChange",function(){
							if(document.readyState === 'complete'){
								fn();
							}
						})
					}	
				},
				//遍历对象和数组
				each:function(obj,fn){
					//先判断是不是数组
					if(jQuery.isArray(obj)){
						for(var i = 0 ; i < obj.length ; i++){
							var bool = fn.call(obj[i],i,obj[i]);
							if(bool === true){
								continue;
							}else if(bool === false){
								break;
							}
						}
					}//是对象
					else if(jQuery.isObject(obj)){
						for(var key in obj){
							var bool = fn.call(obj[key],key,obj[key]);
							if(bool === true){
								continue;
							}else if(bool === false){
								break;
							}
						}
					}	
					return obj;
				},
				map:function(obj,fn){
					var arr = [];
					if(jQuery.isArray(obj)){
						for(var i = 0 ; i < obj.length ; i++){
							var temp = fn(obj[i],i);
							if(temp){
								arr.push(temp);
							}
							
						}
					}else if(jQuery.isObject(obj)){
						for(var key in obj){
							var temp = fn(obj[key],key);
							if(temp){
								arr.push(temp);
							}	

						}
					}
					return arr;
				}

			})
			//对象方法
			jQuery.prototype.extend({
				empty:function(){
					//遍历指定的元素
					this.each(function(key,value){
						//将遍历到的元素删除
						value.innerHTML = "";
					})
					//方便链式编程
					return this;
				},
				remove:function(sele){
					if(arguments.length === 0){
						//遍历指定的元素
						this.each(function(key,value){
							//根据找到的元素找到他的父元素   因jQuery中没办法元素自己删除自己
							var parent = value.parentNode;
							//删除父元素的子元素
							parent.removeChild(value);
						})
					}else{
						var $this = this;
						//根据传入的选择器找到指定的元素
						$(sele).each(function(key,value){
							//遍历找到的元素 获得对应的类型
							var type = value.tagName;
							//遍历指定的元素
							$this.each(function(key,value){
								// 获得指定元素的类型
							var t = value.tagName;
							if(t === type){
								//根据找到的元素找到他的父元素   因jQuery中没办法元素自己删除自己
								var parent = value.parentNode;
								//删除父元素的子元素
								parent.removeChild(value);
							}

							})
						})
					}
					
					return this;
				},
				html:function(content){
					if(arguments.length === 0){
						return this[0].innerHTML;
					}else{
						this.each(function(key,value){
							value.innerHTML = content;
						})
					}
					return this;
				},
				text:function(content){
					var res = "";
					if(arguments.length === 0){
						this.each(function(key,value){
							res += value.innerText;
						})
						return res;
					}else{
						this.each(function(key,value){
							value.innerText =content;
						})
					}
					return this;
				},
				appendTo:function(sele){
					var $target = $(sele);
					var $this = this;
					var res = [];
					$.each($target,function(key,value){
						$.each($this,function(k,v){
							if(key === 0){
								value.appendChild(v);
								res.push(v);
							}else{
								var temp = v.cloneNode(true);
								value.appendChild(temp);
								res.push(temp);

							}
						})
					})
					return $(res);
				}
			})


			jQuery.prototype.init.prototype = jQuery.prototype;
			window.jQuery = window.$ = jQuery;
		})( window );
		