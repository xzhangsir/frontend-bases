## 1、position定位后，如何让内容自适应居中？

```
  .content{
    width:1000px;
    position: absolute;
    top:44px;
    left:50%;
    margin-left:-500px;
}
```

## 2、如何向文字后面添加多个空格？

```
<div class="header-top">
   <div class="header-content">
      <a href="login.html">登录</a>&nbsp;
      <a href="register.html">注册</a>
   </div>
</div>
```

**向文字后添加空格**

```
.header-content a:last-child:after{
    content: "\00A0\00A0\00A0\00A0\00A0\00A0\00A0\00A0\00A0\00A0\00A0\00A0";
}
```

## 3、!important

!important是CSS1就定义的语法，作用是提高指定样式规则的应用优先权。

语法格式{ cssRule !important }，即写在定义的最后面，例如：box{color:red !important;}

在CSS中，通过对某一样式声明! important ，可以更改默认的CSS样式优先级规则，使该条样式属性声明具有最高优先级，也就是相当于写在最下面。

W3c的解释

CSS企图创造一个平衡作者和用户之间的级层样式表。

默认情况下,CSS规则按级层覆盖，例如在.CSS文件中的定义可以被html文件中<style type="text/css"></style>里的定义覆盖，反之不行；书写在下面的定义可以覆盖写在上面的定义，反之不行。

然而,对覆盖平衡而言,加上一个“!important”就优先于正常的CSS规则。

例:

```
p { [text-indent](https://baike.baidu.com/item/text-indent): 1em ! important }
p { font-style: italic ! important }
p { [font-size](https://baike.baidu.com/item/font-size): 18pt }
p { text-indent: 1.5em}
p { font: normal 12pt sans-serif}
p { font-size: 24pt }
```

在这些规则中 未被覆盖的有：

```
p { text-indent: 1em ! important }
p { font-style: italic ! important }
p { font-size: 24pt }
```

## 4、浏览器识别

　　[ie7](https://baike.baidu.com/item/ie7),[ie8](https://baike.baidu.com/item/ie8),[firefox](https://baike.baidu.com/item/firefox),[chrome](https://baike.baidu.com/item/chrome)等高端浏览器下，已经可以识别 !important属性， 但是IE 6.0仍然不能完全识别. important的样式属性和覆盖它的样式属性单独使用时(不在一个{}里)，IE 6.0认为! important优先级较高，否则当含! important的样式属性被同一个{}里的样式覆盖时，IE 6.0认为! important较低!

```
important，最主要是为了IE 6.0浏览器。
```

## 5、**text-overflow**：clip | ellipsis

默认值：clip

适用于：所有元素

clip： 当对象内文本溢出时不显示省略标记（...），而是将溢出的部分裁切掉。 
 ellipsis： 当对象内文本溢出时显示省略标记（...）。

在使用的时候，有时候发现不会出现省略标记效果，经过测试发现，使用ellipsis的时候，必须配合overflow:hidden; white-space:nowrap; width:50%;这三个样式共同使用才会有效果，示例代码：

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        ul li{
          width:200px;
          overflow:hidden;
          white-space:nowrap;
          text-overflow:ellipsis;
        }
    </style>
</head>
<body>
  <ul>
    <li><a href="">前百度投资并购高管方益民加盟创新工场担任合伙人</a></li>
    <li><a href="">乌镇的两场顶级互联网饭局：没聊手机聊猪肉</a></li>
    <li><a href="">江南嘉捷开盘封跌停 曾连续收获18个涨停</a></li>
    <li><a href="">Faceook和谷歌伤害媒体行业？澳大利亚展开调查</a></li>
    <li><a href="">纳斯达克明年将推比特币期货，加密货币走进主流</a></li>
  </ul>
</body>
</html>
```

## 6、常用CSS缩写语法总结

 使用缩写可以帮助减少你CSS文件的大小，更加容易阅读。css缩写的主要规则如下：

**颜色**

16进制的色彩值，如果每两位的值相同，可以缩写一半，例如：
 \#000000可以缩写为#000;#336699可以缩写为#369;

**盒尺寸**

通常有下面四种书写方法:         

```
property:value1; 表示所有边都是一个值value1；
property:value1 value2; 表示top和bottom的值是value1,right和left的值是value2
property:value1 value2 value3; 表示top的值是value1，right和left的值是value2，bottom的值是value3
property:value1 value2 value3 value4; 四个值依次表示top,right,bottom,left
```

方便的记忆方法是顺时针，上右下左。具体应用在margin和padding的例子如下：

```
margin:1em 0 2em 0.5em;
```

**边框**(border)

边框的属性如下：        

```
border-width:1px;
border-style:solid;
border-color:#000;
```

可以缩写为一句：

```
border:1px solid #000;
```

语法是border:width style color;

**背景**(Backgrounds)

背景的属性如下：        

```
background-color:#f00;
background-image:url(background.gif);
background-repeat:no-repeat;
background-attachment:fixed;
background-position:0 0;
```

可以缩写为一句：

```
background:#f00 url(background.gif) no-repeat fixed 0 0;
```

语法是background:color image repeat attachment position;

你可以省略其中一个或多个属性值，如果省略，该属性值将用浏览器默认值，默认值为：        

```
color: transparent;
image: none;
repeat: repeat;
attachment: scroll;
position: 0% 0%;
```

**字体**(fonts)

字体的属性如下：         

```
font-style:italic;         
font-variant:small-caps;         
font-weight:bold;         
font-size:1em;         
line-height:140%;         
font-family:"Lucida Grande",sans-serif;
```

可以缩写为一句：

```
font:italic small-caps bold 1em/140% "Lucida Grande",sans-serif;
```

注意，如果你缩写字体定义，至少要定义font-size和font-family两个值。

**列表**(lists)

取消默认的圆点和序号可以这样写list-style:none;,

list的属性如下:         

```
list-style-type:square;
list-style-position:inside;
list-style-image:url(image.gif);

```

可以缩写为一句：

```
list-style:square inside url(image.gif);

```

## 7、CSS图片下面有间隙的6种解决方案

```
1、将图片转换为块级对像
    即设置img为：
    display：block；
    IE6/7无效
2、设置图片的垂直对齐方式
    即设置图片的vertical-align属性为「top，text-top，bottom，text-bottom」也可以解决。
    如： #sub img {vertical-align:top;}
3、设置父对象的文字大小为0px
    如在#sub中添加一行： font-size:0;
    但这也引发了新的问题，在父对像中的文字都无法显示。
    就算文字部分被子对像括起来，设置子对像文字大小依然可以显示，但在CSS效验的时候会提示文字过小的错误。
4、改变父对象的属性
    如果父对象的宽、高固定，图片大小随父对像而定，那麽可以设置： overflow:hidden; 来解决。
    如： width:88px;height:31px;overflow:hidden;
5、设置图片的浮动属性
    即在增加一行CSS代码： #sub img {float:left;}
    如果要实现图文混排，这种方法是很好的选择。
6、取消图片标签和其父对象的最後一个结束标签之间的空格。
    在实际开发中该方法可能会出乱子，因为在写代码的时候为了让代码更体现语义和层次清晰，
    难免要通过IDE提供代码缩进显示，这必然会让标签和其他标签换行显示。
```

## 8、CSS3重点总结

CSS3概述
　　css3是css规范的最新版本，是css2.1的升级，css层叠样式表告诉浏览器如何渲染web页面
CSS3新特性
　　文本效果　　　　

```
文本溢出  text-overflow
	语法
		text-overflow:  clip|ellipsis
		参数说明
			clip  表示直接裁剪
			ellipsis  以省略号表示裁剪的内容
		注意事项
			1.需要结合以下属性使用
				text-overflow:ellipsis; 
				white-space:nowrap; 
				overflow:hidden;
			2.如果是标题，最好加一个title属性显示的标题内容
			3.只能用于水平方向进行裁剪，垂直高度的内容需要后台使用字符数来设置
			
文本阴影  text-shadow
	参数说明  
		参数1：表示水平方向的偏移值,值可正可负  
		参数2：表示垂直方向偏移值,值可正可负  
		参数3：设置阴影的模糊值  
		参数4：表示阴影的颜色    
		color的值
	语法
		text-shadow:水平偏移值 垂直偏移值 模糊值 阴影的颜色,可以写多个样式，并且使用逗号分隔
	可以设置多个阴影
	
文本换行  word-wrap
	语法
		word-wrap:normal | break-word
		默认取值是normal
	参数说明
		normal:允许内容定能够顶开或者溢出指定的容器边界
		break-word:内容将在边界内换行。如果需要，单词内部允许断行
		用在英文，中文没有那么长。。。
```

​		选择器
​			

```
基本选择器回顾
				1.通用选择器   （星号选择器）
				2.ID选择器
				3.类选择器
				4.标签选择器
				5.选择器的分组（基本选择器的灵活运用）
			层次选择器
				1.后代选择器（E F）
				2.父子选择器  （E>F）
					主要用于下拉菜单
				3.相邻选择器 （E+F）
					选择紧贴E元素后面的F元素     只选中紧贴的一个元素
				兄弟选择器 （E~F）
					选择E元素后面所有的F元素     只能选择同一级中指定元素的兄弟元素
			伪类选择器
				概念
					动态伪类选择器        指：鼠标的四种状态    L V H A    最简式：L H
					目标伪类选择器        指：锚点链接    主要是根据  #后面的值来判定是否选中
					语言伪类选择器        主要用于制作多版本网站时使用，    lang     值  zh中文   en 英文 
					UI状态伪类选择器       focus   
					结构伪类选择器    
						结构伪类选择器总共分（2类）： Child系列和Type系列
							Child
								E:first-child	匹配父元素的第一个子元素E。E元素必须是某个元素的子元素，
										父级最高是body，first-child必须是兄弟中的第一个（正着找）
								E:last-child	匹配父元素的最后一个子元素E   （倒着找）
								E:only-child	匹配父元素仅有的一个子元素E。 主要用于：没有数据时的提示信息
								注意
									是否在第一个位置，如果指定元素是第一位置的标签，会被选中，如果不是则选不中，
					主要强调，指定元素在“当前父无素”下，子元素的位置；
								E:nth-child(n)	匹配父元素的第n个子元素E。(正着找)
								E:nth-last-child(n)	匹配父元素的倒数第n个子元素E。(倒着找)	
								说明
									n   参数1：使用数字      n从1开始 
						参数2：使用n   好比数学里的表达式    2n 偶数   2n+1   奇数
						参数3：英文中的奇偶      奇数 odd   偶数 even
							type
								E:first-of-type		当前父元素下，匹配同类型中的第一个同级兄弟元素E。说明：同类型的标签元素
								E:last-of-type		当前父元素下，匹配同类型中的最后一个同级兄弟元素E。
								E:only-of-type		当前父元素下，匹配同类型中的唯一的一个同级兄弟元素E。
								E:nth-of-type(n)		当前父元素下，匹配同类型中的第n个同级兄弟元素E。(正着找)
								E:nth-last-of-type(n)		当前父元素下，匹配同类型中的倒数第n个同级兄弟元素E。(倒着找)
								规则
									1.当前父元素下面的子元素都是type系例的范围
									2.可以选择指定（id或class）定义的样式，进行范围的选择
							empty
								匹配没有任何子元素（包括text节点）的元素E。
								空格和回车也算text节点
								作用：判定子元素里面是否有内容
					否定伪类选择器
						否定伪类选择器（排除选择器）
							E:not(s)	匹配不含有s选择符的元素E。
					伪元素选择器
						说明：在期CSS版本中，没有对伪类和伪元素做具体说明
						区别
							1.从语法上来区分：使用一个“:”表示伪类，使用双“::”表示伪元素
							2.从dom结构上来区分，判定标准，是否有新元素被创建
						伪类：表示指定元素的临时状态，只操作时才会出现  ，加深理解：：hover 
						伪元素：表示在dom结构上新产生元素  加深理解：::before   ::after
						其他两个伪元素选择器
							::placeholder 伪元素用于控制表单输入框提示符的外观
								

					兼容语法：
						input::-webkit-input-placeholder  // chrome
						input:-ms-input-placeholder // IE10+
						input:-moz-placeholder   // Firefox4-18
						input::-moz-placeholder  // Firefox19+
							::selection是用来匹配鼠标选中的文本。
								只能使用background 和color
				语法
					:
			属性选择器
				E[att]	选择具有att属性的E元素。
				E[att="val"]	选择具有att属性且属性值等于val的E元素。
				E[att~="val"]	选择具有att属性且属性值为一个用空格分隔的字词列表，其中一个等于val的E元素。
				E[att^="val"]	选择具有att属性且属性值为以val开头的字符串的E元素。强调 val的位置，必需是开始位置
				E[att$="val"]	选择具有att属性且属性值为以val结尾的字符串的E元素。
				E[att*="val"]	选择具有att属性且属性值为包含val的字符串的E元素。
				E[att|="val"]	选择具有att属性且属性值为以val开头并用连接符"-"分隔的字符串的E元素，如果属性值仅为val，也将被选择。
```

​		阴影和边框
​			

```
box-shadow  作用：设置盒子阴影
				参数：
					参数1：水平偏移值。可以为负值
					参数2：垂直偏移值。可以为负值
					参数3：盒子阴影的模糊值。只能为正值
					参数4：外延值  只能为正值
					参数5：颜色 
					参数6：阴影类型为内阴影
				.盒子阴影主要用于列表项选中突出的效果
			圆角边框   border-radius：设置边框为圆角
				border-radius：[ <length> | <percentage> ]{1,4} [ / [ <length> | <percentage> ]{1,4} ]?
				注意
					1.写一个值时，表示四个角的值相同
				2.写两个值时，第一个值为左上与右下，第二个值为右上与左下
				3.写三个值时，第一个值为左上角, 第二个值为右上角和左下角，第三个值为右下角
				4.写四个值时，第一个值为左上角，第二个值为右上角，第三个值为右下角，第四个值为左下角
					border-top-left-radius  表示左上角
				border-top-right-radius 表示右上角
				border-bottom-left-radius 表示左下角
				border-bottom-right-radius 表示右下角
			图像边框     使用图像做边框
				语法：border-image:引入图像的地址（url） 裁切的宽度   平铺方式；
				参数说明：
					fill:表示使用最中央的图进行平铺
					平铺方式：
						round：会自动压缩图像进行平铺
						repeat:默认的平铺
						stretch： 指定用拉伸方式来填充边框背景图
					注意：   使用前必需接合border属性来使用
```

​		背景属性回顾
​			

```
背景属性回顾
				1.background-color:设置背景颜色
				2.background-image（背景图片）
				3.background-repeat（背景图片展示方式）
				4.background-position（背景图片位置）
					使用方位词：
								水平方向上：left center right
								垂直方向上：top  center bottom
					精灵图的结合使用
						1引入图像素材，2确定图标宽高，3.指定图像坐标
				5.background-attachment（背景图片是固定还是滚动）	
					参数说明
						scroll:好比把图像背景和body进行绑定
						fixed:好比把图像背景和窗口进行绑定
				背景复合属性：把单个的属性的综合运用
		CSS3新的背景属性
			background-size：    设置背景图片的大小；
				参数
					cover： 将背景图像等比缩放到完全覆盖容器，背景图像有可能超出容器。 
					contain： 将背景图像等比缩放到宽度或高度与容器的宽度或高度相等，背景图像始终被包含在容器内
			background-origin：  作用：设置背景原点的位置
				参数说明
					padding-box:从padding的外边缘显示图像
					border-box:从border的外边缘显示图像
					content-box:从content的外边缘显示图像
			background-clip  作用：定义背景图像的裁剪区域
				参数说明
					border-box:从border区域（不含border）开始向外裁剪背景
					padding-box： 从padding区域（不含padding）开始向外裁剪背景
					content-box： 从content区域开始向外裁剪背景
			多背景图
				使用多背景方式来实现
				background-image:
					注意事项
						1.使用多背景操作时，需要使用单个的属性来设置，并且对应属性的值一一对应
						2.放置背景的顺序，单张的图在最前，需要平铺的图放在最后边
						3.一般用于制作背景单一或有渐变的效果，其它的不太实用
```

​		颜色值
​			

```
HSL
				H： Hue(色调)。0(或360)表示红色，120表示绿色，240表示蓝色，也可取其他数值来指定颜色。取	值为：0 - 360 
				S： Saturation(饱和度)。取值为：0.0% - 100.0%   稀释的程度
				L： Lightness(亮度)。取值为：0.0% - 100.0%   明暗程度   0%最黑， 100%最亮
				HSLA
					A表示透明度 0-1
```

​		渐变
​			

```
线性渐变   linear-gradient
				作用：颜色必需是两个或多个颜色
				语法：   linear-gradient（参数1，参数2 参数3,参数2 参数3,…………）
				参数说明
					参数1：表示渐变位置（角度 deg/to 方位词(left right top bottom)
					参数2：起始位置的颜色值
					参数3：对应length/百分比   过渡的区域
				注意：
					1,如果浏览器不显，请把兼容性前缀加上
					2,加前缀时，不能使用带to的方位词来修饰
				重复线性渐变使用repeating-linear-gradient属性代替线性渐变linear-gradient
			径向渐变  radial-gradient
				语法：radial-gradient(参数1,参数2……)
				参数说明
					参数一
						1.使用形状来设置：circle(正圆)  ellipse： 椭圆
						2.size:表示圆的半径
						3.at 圆心的位置   方位词，length,百分比
					参数二
						表示过渡的颜色，可以有多个值   至少是两个或两个以上的颜色	
					注意事项
						 注意：
					 	参数1，中的前面个二选一即可
					 	
					 	椭圆效果的实现并是设置参数可以实现，需求设置对象的宽度或高度来确定椭圆的方向
```

​		盒子模型
​			

```
盒子模型回顾
				标准盒子模型
					padding和border不被包含在指定width和height内
				怪异盒子模型
					padding和border被包含在指定width和height内
				标准和怪异盒子模型的转换
					box-sizing:content-box 将对象定义为标准模式下的盒模型。 
					box-sizing:border-box  将对象定义为怪异模式下的盒模型
```

​			内容溢出   overflow:
​				CSS3中新增了两个属性
​					overflow-x
​					overflow-y
​			text-area的自由缩放   resize:
​				作用：textarea禁用户拖动
​					resize:none;(重点) 不让用户操作
​					both:为textarea的默认值
​					horizontal: 用户可以水平拖动元素
​					vertical: 用户可以垂直拖动元素
​			外轮廓属性
​				注意：外轮廓与border属性不要搞混了，外轮廓不占有空间，border占有指宽度或高度
​				属性
​					outline-width： 指定轮廓边框的宽度。
​					outline-style： 指定轮廓边框的样式
​					outline-color： 指定轮廓边框的颜色。 
​					outline-offset:  设置或检索对象外的线条轮廓偏移容器的值
​				注意事项
​					可以设置对象外边的外轮廓，通常使用伪类的方法来实现获取焦点改变外轮廓的线
​		布局
​			多列布局
​				column-width	设置或检索对象每列的宽度
​				column-count	设置或检索对象的列数
​				column-gap	设置或检索对象的列与列之间的间隙
​				column-rule:表示边框样式的复合属性
​				主要用于新闻类的网页从pc到移动端的自动转换，如电子报纸
​		伸缩布局
​			概念
​				Flexbox并不是一个属性，而是一个模块。包括多个css3属性(是一堆CSS属性的集合)
​				作用：主要用于移动端的单行布局（主要针对一行元素中的子元素的排版问题）
​				运用场景：主要用于移动端，wap网站，APP（webview 窗口视图层）
​			伸缩布局轴的概念
​				主轴：横向的称为主轴
​				侧轴：与主轴垂直的轴称为侧轴
​				主轴的方向：就是在水平方向的延伸，默认情况：从左到右
​				主轴的起点：在默认认情况下，最左边的点，称为主轴的起点
​				主轴的终点：在默认认情况下，最右边的点，称为主轴的终点
​				主轴长度：由width或height来管理
​				属性说明：
​					flex-direction：设置伸缩布局的方向
​						语法：flex-direction：row | row-reverse | column | column-reverse
​						表示主轴在水平方向
​							row:默认值，表示子元素排列的顺序为从左到右，示例中的1 2 3 4
​							row-reverse：表示子元素排列的顺序为从右到左，示例中的4 3 2 1
​						表示主轴在垂直方向
​							column：表示子元素排列的顺序为从上到下，示例中的1 2 3 4
​							column-reverse：表示子元素排列的顺序为从下到上  ，示例中 4 3 2 1
​					flex-wrap：设置子元素是否换行
​						语法：flex-wrap：nowrap | wrap | wrap-reverse
​							nowrap ：默认值，不换行
​							wrap ：设置子元素换行
​							wrap-reverse:倒着换行（在垂直方向进行颠倒）
​					justify-content	设置子元素在主轴（横轴）方向上的对齐方式。
​						justify-content：flex-start | flex-end | center | space-between | space-around
​							flex-start ：默认值，伸缩盒子开始的位置
​							flex-end ：伸缩盒子结束的位置
​							center ：伸缩盒子中间的位置
​							主要设置父级中除去子元素宽度后的多余空间的分配
​							space-between :把多余的部分分配给，第一个元素，和最一个元素，平均分配给中间子元素
​							space-around:把多余的部分，分配给每个元素的两侧（平均）
​							主要用于，所有子元素的宽度小于父级的情况
​					align-items	：侧轴中的子元素对齐方式
​						align-items：flex-start | flex-end | center | baseline | stretch
​	
​							flex-start :表示在侧轴方向上，开始的位置进行对齐
​							flex-end :表示在侧轴方向上，结束的位置进行对齐
​							center ：:表示在侧轴方向上，居中对齐
​							baseline :以侧轴上，指定元素（不同的元素）的最高基线作为对齐的标准，进行对齐
​							stretch:需要使用侧轴上的height为auto,或者没有设置时，该属性值才生效,作用进行侧轴上进行拉伸
​					align-content：侧轴中的子元素对齐方式（多行）
​						align-content：flex-start | flex-end | center | space-between | space-around | stretch
​							space-between :在侧轴上，两侧的边没有多余空白，子元素平分多余空白
​							space-around:在侧轴上，子元素垂直方向上平分多余的空白
​							stretch：使用拉伸来铺满多多余空间
​					伸缩布局轴的侧轴中－子元素自身的对齐方式   align-self
​						align-self：auto | flex-start | flex-end | center | baseline | stretch
​							flex-start :表示在侧轴方向上，开始的位置进行对齐
​							flex-end :表示在侧轴方向上，结束的位置进行对齐
​							center ：:表示在侧轴方向上，居中对齐
​							baseline :以侧轴上，指定元素（不同的元素）的最高基线作为对齐的标准，进行对齐
​							stretch:需要使用侧轴上的height为auto,或者没有设置时，该属性值才生效,作用进行侧轴上进行拉伸
​							align-self:主要针对单个子元素的个性化操作，如果使用baseline时，需要结合多个子元素使用
​							针对父对象中单个子元素的个性化操作（如柱图，使用CSS3的方式来实现图表操作）
​					子项目属性顺序说明
​						在HTML中属性：tabIndex 属性规定元素的 tab 键控制次序
​							order:属性主要用于设置子元素的排列顺序 ，会根据order的值来显示对应元素的顺序，不需要改变dom结构
​					伸缩布局－扩展比  flex-grow
​						作用：主要用于子元素分配父元素多余的宽度
​						flex-grow:默认值为0，表示不分配，
​						注意：
​							1扩展比主要用于所有子元素的和小于父容器时，内部子元素分配多余空间（实现把父容器撑满的效果）
​					伸缩盒子－压缩比  flex-shrink
​						作用：所有子元素的和值大于，父容器的宽度时
​						flex-shrink：默认值为1；收缩时都按1：1进行收缩
​					固定盒子的绝对居中
​						方式一：定位1:使用绝对定位和margin为负值
​						方式二:使用伪元素来实现，inline-block（只需知道实现的原理即可）
​						方式三：使用伸缩盒子布局制作
​		web字体
​			传统方式的字体引入
​			字体图标
​		过渡
​			概念：
​				CSS3的过渡指的是：针对指定一个元素的属性，从一个（初始）值，到改变后（结束）值变化的过程
​				transition:过渡动画
​					参数1： transition-property：参与过渡动画属性
​					参数2： transition-duration：表示过渡执行的时间   单位：s
​					参数3：transition-timing-function：表示过渡动画的类型（均速运动，先快后慢，先慢后快）
​						linear： 均速过渡。
​						ease： 平滑过渡。 
​						ease-in： 由慢到快。
​						ease-out： 由快到慢。 
​						ease-in-out： 由慢到快再到慢。
​					参数4： transition-delay：设置过渡动画延迟执行
​				注意事项
​					1.如果使用过渡动画，参数2执行的时间需须大于0，如果等于0，过渡效果不生效
​					2.元素的属性，主要针对有值的过渡，才可以实现过渡效果，
​						如果没有特定指明那个属性的过渡，可以使用all来代替所有属性
​					3.如果设置过渡中显示/隐藏效果
​						display:不能使用该属性
​						overflow:不能使用该属性
​						opacity:可以使用使用该属性设置对象的透明度来实现显示/隐藏
​		变形
​			概念：变形是CSS3一些效果的集合，如平移、旋转、缩放和倾斜，使用变形函数来实现指定效果
​			语法：transform:变形函数，可以有多个
​				缩放  scale	
​					1.该属性是缩放的复合属性
​					2.参数为第一个值是x轴，第二个值是y轴，如果设置为一个值时，表示x,y轴相同倍数缩放
​				平移     translate(<length>[, <length>])
​					第一个参数对应X轴，第二个参数对应Y轴
​						translateX(<length>)： 指定对象X轴（水平方向）的平移 
​						translateY(<length>)： 指定对象Y轴（垂直方向）的平移 
​				旋转
​					rotate(<angle>)：  定义 2D 旋转，在参数中规定角度。
​					rotateX(angle) 	定义沿着 X 轴的 3D 旋转。 	
​					rotateY(angle) 	定义沿着 Y 轴的 3D 旋转。 	
​					rotateZ(angle) 	定义沿着 Z 轴的 3D 旋转。
​				斜切
​					skew(<angle> [, <angle>])： 指定对象skew 
​						transformation（斜切扭曲）。第一个参数对应X轴，第二个参数对应Y轴。如果第二个参数未提供，则默认值为0 
​							skewX(<angle>)： 指定对象X轴的（水平方向）扭曲 ,y轴的长度在变，x轴的长度没变
​							skewY(<angle>)： 指定对象Y轴的（垂直方向）扭曲 ，x轴的长度在变，y轴的长度没有变
​				设置对象的原点 transform-origin
​		动画
​			CSS中动画主要指通过“关键帧”定制更加复杂的效果
​				实现动画效果步骤：
​					1.定义动画
​						使用指令  @keyframes  动画的名称{
​								from{开始动画效果}
​								to{结束动画效果}
​							}
​					2.执行动画
​						作用：将定义好的动画绑定到指定元素上
​						通过animation属性来设置动画
​						参数说明：
​							参数1： animation-name   指定执行动画的名称
​							参数2：animation-duration  设置动画执行的时间
​							参数3：animation-timing-function   设置动画的类型
​								linear： 线性过渡。
​								ease： 平滑过渡。
​								ease-in： 由慢到快。 
​								ease-out： 由快到慢。
​								ease-in-out： 由慢到快再到慢。
​							参数4：animation-delay 延迟动画执行时间	
​							参数5：animation-iteration-count   循环次数  默认值执行一次
​								1.给次执行的次数
​								2.infinite： 无限循环 
​							参数6：animation-direction   设置动画运动的方向		
​								normal 默认值，从左到右运动
​								reverse   从右到左运动
​								alternate  动画先正常运行再反方向运行，并持续交替运行
​								alternate-reverse
​						动画的状态     animation-play-state
​							1.running 表示开始
​							2.paused 表示暂停
​						animation-fill-mode  动画结束时的停止位置
​							forwards： 设置动画结束时停止的位置为－结束位置
​							backwards： 设置动画结束时停止的位置为－开始位置
​					注意兼容性问题