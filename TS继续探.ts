let name: string = "123"
let arr: number[] = [23]
let arr1: Array<number | string> = [23, 45, "123"]

let tuple: [number, number[], string] = [1, [2], '3']


let str: number | string = 123
str = name


// any  会绕过类型校验
// unknown 不会绕过


interface Arritf {
  [idx: number]: number | string
}
let arr2: Arritf = [1, 2, 3, 4, "23"]


interface Fnitf {
  (name: string): void
}
let fn: Fnitf = (name1: string) => { }
fn("12")

interface Name {
  name: string
}

interface Age {
  age?: number
}

interface Person extends Name, Age {
  readonly sex: string
}

let xiao: Person = {
  name: "xiaohua",
  age: 12,
  sex: "nv"
}


// 类型别名

type SN = string | number

let a: SN = "12"


type FnType = (name: string) => void

interface PItf {
  data: { a: number, b: number }[]
}

let p: Promise<PItf> = new Promise((resolve, reject) => {
  resolve({
    data: [{ a: 1, b: 2 }, { a: 2, b: 3 }]
  })
})

p.then(res => {
  res.data.map(_ => _.a)
})

enum StatusCode {
  success = 200
}

let code: number = 200;
if (code == StatusCode.success) {
  console.log(123);

}

enum Tets {
  a, b,
  c
}
console.log(Tets.a, Tets.b, Tets.c);

// extends number | string  泛型约束 可以不要
function fn1<T extends number | string>(num: T): T {
  return num
}

fn1<number>(100)


// 内置对象 
// Partial 部分的  可缺失的
// Required 必须的  不可缺的


interface AA {
  name: string,
  age: number,
  sex?: string
}
/**
 * Partial<AA>
 * 
 * {
 *  name?:string | undefined,
 *  age?:string | undefined
 * }
 * 
*/
let obj: Partial<AA> = {
  name: "12"
}

let obj2: Required<AA> = {
  name: "12",
  age: 12,
  sex: "nv"
}




// abstract 

// implements

// keyof
// in
// as 

// [key:string]:string



export { }