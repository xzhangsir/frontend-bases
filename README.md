##ts实践
#准备工作
vue cli 3
vue 2.6
node 10.0
##新建一个基于ts的vue项目
#自定义选项 - Manually select features
#添加ts支持 - TypeScript
#基于类的组件 - y
#tslint
###在已存在项目中安装typescript
#类型注解和编译时类型检查
#变量后面通过冒号+类型来做类型注解
##数组类型
#任意类型
vue add @vue/typescript
// test.ts
let title1: string; // 类型注解
title1 = "学习"; // 正确
title1 = 4; // 错误
let title2 = "xx"; // 类型推论
title2 = 2;// 错误
let names: string[];
names = ['Tom'];//或A
let foo:any;
foo = 'xx'
foo = 3
//any类型也可用于数组
let list: any[];
list = [1, true, "free"];
list[1] = 100;
function greeting(person: string): string {
return 'Hello, ' + person;
}
//void类型，常用于没有返回值的函数
function warnUser(): void { alert("This is my warning message"); }
<template>
<div>
<input type="text" placeholder="输入新特性" @keyup.enter="addFeature">
<ul>
<li v-for="feature in features" :key="feature">{{feature}}</li>
</ul>
</div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class Hello extends Vue {
features: string[];
constructor() {
super();
this.features = ["类型注解", "编译型语言"];
}
private addFeature(event: any) {
console.log(event);
this.features.push(event.target.value);
event.target.value = '';
}
}
</script>
class MyComp extends Parent {
// 访问修饰符
private _foo = 'foo'; // 私有属性，不能在类的外部访问
protected bar = 'bar';// 保护属性，还可以在派生类中访问
范例：利用getter设置计算属性
接口
接口仅约束结构，不要求实现，使用更简单
范例：声明接口类型约束数据结构，HelloWorld.vue
readonly mua = 'mua'; // 只读属性必须在声明时或构造函数里初始化
// 构造函数：初始化成员变量
// 参数加上修饰符，能够定义并初始化一个属性
constructor ( private tua = 'tua') {
super();
}
// 方法也有修饰符
private someMethod() {}
// 存取器：暴露存取数据时可添加额外逻辑；在vue里面可以用作计算属性
get foo() { return this._foo }
set foo(val) { this._foo = val }
}
const comp = new MyComp()
comp.foo
<template>
<li>特性数量：{{count}}</li>
</template>
<script lang="ts">
export default class HelloWorld extends Vue {
// 定义getter作为计算属性
get count() {
return this.features.length;
}
}
</script>
interface Person {
firstName: string;
lastName: string;
}
function greeting(person: Person) {
return 'Hello, ' + person.firstName + ' ' + person.lastName;
}
const user = {firstName: 'Jane', lastName: 'User'};
console.log(greeting(user));
<template>
<!-- template中的变化 -->
<li v-for="feature in features" :key="feature.id">
泛型
泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定
类型的一种特性。
范例：使用泛型约束接口返回类型
使用接口
{{feature.name}}
</li>
</template>
<script lang="ts">
// 定义一个特性接口约束HelloWorld中的数据结构
interface Feature {
id: number;
name: string;
}
// 可以对获取的数据类型做约束
@Component
export default class HelloWorld extends Vue {
private features: Feature[];
constructor() {
super();
this.features = [
{ id: 1, name: "类型注解" },
{ id: 2, name: "编译型语言" }
];
}
}
</script>
// 不用泛型
// interface Result {
// data: Feature[];
// }
// 使用泛型
interface Result<T> {
data: T;
}
function getData<T>(): Result<T> {
const data: any = [
{ id: 1, name: "类型注解", version: "2.0" },
{ id: 2, name: "编译型语言", version: "1.0" }
];
return { data };
}
甚至返回Promise
使用
装饰器
装饰器用于扩展类或者它的属性和方法。
属性声明：@Prop
除了在@Component中声明，还可以采用@Prop的方式声明组件属性
事件处理：@Emit
新增特性时派发事件通知，Hello.vue
变更监测：@Watch
constructor() {
this.features = getData<Feature[]>().data;
}
function getData<T>(): Promise<Result<T>> {
const data: any = [
{ id: 1, name: "类型注解", version: "2.0" },
{ id: 2, name: "编译型语言", version: "1.0" }
];
return Promise.resolve<Result<T>>({ data });
}
async mounted() {
this.features = (await getData<Feature[]>()).data;
}
export default class HelloWorld extends Vue {
// Props()参数是为vue提供属性选项
// !称为明确赋值断言，它是提供给ts的
@Prop({type: String, required: true})
private msg!: string;
}
// 通知父类新增事件，若未指定事件名则函数名作为事件名（羊肉串形式）
@Emit()
private addFeature(event: any) {// 若没有返回值形参将作为事件参数
const feature = { name: event.target.value, id: this.features.length + 1 };
this.features.push(feature);
event.target.value = "";
return feature;// 若有返回值则返回值作为事件参数
}
装饰器原理
装饰器本质是工厂函数，修改传入的类、方法、属性等
类装饰器
实战一下Component，新建Decor.vue
@Watch('msg')
onRouteChange(val:string, oldVal:any){
console.log(val, oldVal);
}
//类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。
function log(target: Function) {
// target是构造函数
console.log(target === Foo); // true
target.prototype.log = function() {
console.log(this.bar);
}
// 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。
}
@log
class Foo {
bar = 'bar'
}
const foo = new Foo();
// @ts-ignore
foo.log();
<template>
<div>{{msg}}</div>
</template>
<script lang='ts'>
import { Vue } from "vue-property-decorator";
function Component(options: any) {
return function(target: any) {
return Vue.extend(options);
};
}
@Component({
props: {
msg: {
type: String,
default: ""
}
}
})
export default class Decor extends Vue{}
</script>
