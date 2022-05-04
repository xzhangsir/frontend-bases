/*  安装  npm install typescript
 编译  tsc  xxx.ts */

/*
vscode配置自动编译

1.第一步   tsc --init 生成tsconfig.json   改 "outDir": "./js",

2、第二步 选择终端 - 运行任务  监视tsconfig.json
   或者 tsc  -p  tsconfig.json  --watch   //实时监测

*/


// let 和 var  可以类型推断
// const  值就是它的类型  字面量类型

/* typeScript中的数据类型

typescript中为了使编写的代码更规范，更有利于维护，增加了类型校验，在typescript中主要给我们提供了以下数据类型

    布尔类型（boolean）
    数字类型（number）
    字符串类型(string)
    数组类型（array）
    元组类型（tuple）
    枚举类型（enum ）
    任意类型（any）
    null 和 undefined
    void类型
    never类型
*/
var flag: boolean = true

// 使用构造函数Boolean创造的对象不是布尔值
// var newBoo:boolean = new  Boolean(1)   错误

// 实际上new Boolean()返回的是一个Boolean对象  
var newBoo:Boolean = new Boolean(1)

// 直接调用Boolean也可以返回一个boolean类型
var newA:boolean = Boolean(1)

// 上面的规程同样使用与number string  


var numA:number = NaN
var numB:number = Infinity
var numC:number = 0b1010   //二进制
var numD:number = 0o1010   //八进制
var numE:number = 0xff     //十六进制   这些都会被编译为十进制

// void空值 表示没有任何返回值的函数

function alertName(name:string):void{
    alert(name)
}
// alertName(`zx`)

// 声明一个void类型的变量没有意义  因为你只能将它赋值为undefined或者null
var vA:void = undefined

// 可以使用 null 和 undefined 来定义这两个原始数据类型：
var n:null = null
var u:undefined = undefined

// 与 void 的区别是，undefined 和 null 是所有类型的子类型
var uA:string = null   

// Any  表示任意类型   被赋值为任何类型都是可以的
// 声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值

// 如果一个变量在声明的时候，没有指定类型 ，那它就是任意类型

var AA:any = '我是字符串'
// console.log(AA.name)  //undefined
// console.log(AA.getName())


/* 
*  类型推论
*/

var str = '类型推论'   //  等价于  var str:string = '类型推论'
// str =  7   //这样会报错的

// 如果定义的时候没有赋值，
// 不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：
let str1;
str1 = 'seven';
str1 = 7;

/* 
*  联合类型   取值可以是多种类型中的一种
*/
var lA:string|number
lA = 7 
lA = '联合类型'

// 下面这样报错 因为length不是number 和  string 的公共属性  可以用类型断言解决
/* function getLen(some:string|number):number{
    return some.length;
}
 */
// 这样就是OK的  toString()  是 number 和 string 公共的方法
function getLen(some:string|number):string{
    return some.toString();
}

/*
*  接口  
 */
// interface Person{
//     name:string,
//     age:number
// }
//  实现Person 这个接口的时候 多一个属性和少一个属性都会报错
// var tom:Person = {
//     name:'zx',
//     age:18
// }

/* 可选属性   在这个属性的后面加一个 ？ 表示这个属性可选 
*  在实现的时候可以实现也可以不实现
*/
// interface Person{
//     name:string,
//     age:number,
//     sex?:string
// }

/* 任意属性 
*定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：
*/
// 下面这个有任意属性的接口就是OK的
// interface Person{
//     name:string,
//     age?:number,
//     [propname:string]:any
// }
//   这个就不可以 任意属性的值允许是 string，
//   但是可选属性 age 的值却是 number，number 不是 string 的子属性
// interface Person{
//     name:string,
//     age?:number,
//     [propname:string]:string
// }
// var zx:Person = {
//     name:'zx',
//     age:12,
//     sex:'male'
// }


/* 只读属性   readonly  */
// interface Person{
//     name:string,
//     age?:number,
//     readonly sex:string
// }
// var zx:Person = {
//     name:'zx',
//     sex:'male'
// }
// console.log(zx.sex)
// zx.sex = 'waa'    //readonly标识的属性只能读 不能写


/* 数组 */

// 数组的创建  

var arr1:number[] = [1,2,3]  //数组是number类型的  所以里面的数也只能是number
var arr4:any[]  = [1,'2']  //any 表示数组中允许出现任意类型

// 数组泛型

var arr2:Array<number> = [1,2,3]

// 用接口表示数组
// 这种表示数组很不方便  但是可以用来表示类数组
interface numArr {
    [index:number]:string  //索引的类型是number，值的类型是string。
}
var arr3:numArr = ['1','2','3']

// 类数组

function add(){
    var args:{
        [index:number]:number,
        length:number,
        callee:Function
    } = arguments
}
// add这个方法中  我们除了约束当索引的类型是数字时，值的类型必须是数字之外，
// 也约束了它还有 length 和 callee 两个属性


// 常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等：

function add1(){
    var agrs:IArguments = arguments
}
// 实际上IArguments这个接口就是 
interface IArguments{
    [index:number]:number,
    length:number,
    callee:Function
}


/* 
*函数
*/
// 在JS中声明函数有两种
// 函数表达式
// function sun(a,b){
//     return a+b
// }
// // 函数表达式
// let sum =  function(a,b){
//     return a+b
// }

// 在TS重需要对输入和输出进行约束

function sum(a:number,b:number):number{
    return a+b
}

let sum1 = function(a:number,b:number):number{
    return a+b
}
// 用接口定义函数类型
interface strfunc{
    (source:string,subString:string):boolean
}

let isStr:strfunc
isStr = function(source:string,subString:string){
    return source.search(subString) != -1
}

// 可选参数  ?  lastname  这个参数可有可无   
// 切记  可选参数必须在  必须参数的后面

function buildName(firstname:string,lastname?:string):string{
    if(lastname){
        return firstname+''+lastname
    }else{
        return firstname
    }
}

// 默认参数  TS  会将默认参数识别为可选参数  位置无所谓

function getName(firstname:string = 'zhang',lastname:string):string{
    return firstname+""+lastname
}

// 剩余参数

function push(arr:any[],...items:any[]){
 items.forEach(item => arr.push(item))
}
let arr5:any[] = []
push(arr5,1,4,7)

// 重载  同一个函数的不同的输入有不同的输处

function reverse(str:string):string;
function reverse(str:number):number;
function reverse(str:string|number):string|number{
    if(typeof str === 'string'){
        return '我叫'+str
    }else{
        return '我今年'+str
    }
}

/* 
* 类型断言  <类型>值  或者 值 as 类型   react中必须用最后一种 
*/
// 这样是不行的  因为length属性不是string和number都有的
// function getLength(something:string|number):number{
//         return something.length   
// }

// 此时可以使用类型断言  可以将somgthing 断言为string类型  并不是类型转化

function getLength(something:string|number):number{
    if((<string>something).length){
        return (<string>something).length
    }else{
        return something.toString().length
    }
}
