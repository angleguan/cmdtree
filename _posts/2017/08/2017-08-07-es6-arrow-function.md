---
title: ES6箭头函数详解
date: 2017-08-07T20:15:10+00:00
layout: post
category: JavaScript
---

箭头函数是es6新增的非常有意思的特性，初次写起来，可能会觉得别扭，习惯之后，会发现很精简.

# 什么是箭头函数?

箭头函数是一种使用箭头( => )定义函数的新语法, 主要有以下特性:

- 不能通过new关键字调用
- 没有原型, 因为不能通过new调用，所以没有原型
- 没有this, super，arguments和new.target绑定, new.target和super关键字是es6新增的
- 箭头函数中的this，取决于他的上层非箭头函数的this指向
- 没有arguments对象，但是可以获取到外层函数的arguments
- call,apply,bind不能改变箭头函数的this指向
- 箭头函数语法由函数参数、箭头、函数体组成.

**第一种形式: 没有参数的写法**

```js
 /*
     (): 空括号代表: 没有传递参数
     函数体： console.log( 'zhiyang' ),  只有这一句话,可以不加花括号{}
 */

 let show = () => console.log( 'zhiyang' );
 show();     // zhiyang
```

```js
  //函数体只有一句话，当然也可以加花括号

 let show = () => { console.log( 'zhiyang' ); }
 show();    // zhiyang

```

**第二种形式: 带一个参数的写法**

```js
 /*
     第一个a 表示 参数a
     第二个a 表示函数体a, 相当于 return a
 */

 let show = a => a;
 console.log( show( 10 ) );    // 10
```

```js
  //如果函数体加了花括号，要用return

  let show = a => { return a; };
  console.log( show( 10 ) );    // 10

  // 当然也可以加小括号

  let show = (a) => { return a; };
  console.log( show( 10 ) );    // 10
```
 
```js
// let show = ( a ) => console.log( a );
// show( 100 );     //100

// 当函数体有return的时候，必须要加花括号

let show = ( a ) => return a;     //错误
```

**第三种形式: 带2个以上参数的写法**

```js
//当函数有2个以上参数的时候，一定要用小括号

let add = ( a, b ) => a + b;
console.log( add( 10, 20 ) );     //30

let add = a, b => a + b;     // 错误，没有小括号

let add = (a, b) => return a + b;    // 错误，有return需要加花括号

// 你也可以这样写
let add = (a, b) => console.log( a + b );
add( 10, 20 );     //30

// 或者这样写
let add = ( a, b ) => { return a + b; };
console.log( add( 10, 20 ) );     //30
```

返回值如果是对象:

```js
let show = name => ( { 'user' : name } );    //返回值是对象，为了以示区分，用小括号
let oUser = show( 'zhiyang' );
console.log( oUser.user );    // zhiyang

let show = name => { return { 'user' : name } };    //用了return关键字，要用花括号{}
let oUser = show( 'zhiyang' );
console.log( oUser.user );

//对象与传参用法
let show = ( name, age ) => {
    return {
        'uName' : name,
        'uAge' : age                
    };
}

let oUser = show( 'zhiyang', 22 );
console.log( oUser.uName , oUser.uAge ); //zhiyang, 22
```

立即表达式的写法:

```js
 //立即表达式的写法
 
 let oUser = ((name, age)=>{
     return {
         "uName" : name,
         "uAge" : age
     }
 })('zhiyang', 16 );
 console.log( oUser.uName , oUser.uAge );
```

箭头函数不能new

```js
let User = () => 'zhiyang';
console.log( User() );
console.log( new User() );     //报错，箭头函数不能new
```

箭头函数中的this，取决于他的上层非箭头函数的this指向

```js
//this指向他的外层window

var a = 10;
let user = () => {
    console.log( this.a );     //this->window
 }
user(); //10
```

```js
    // 箭头函数中的this取决于外层函数的this
   function User( name ) {
       this.name = name;
       this.getName = () => {
          console.log(this); //this指向oUser
           return this.name;
       };
   }
    var oUser = new User( 'zhiyang' );
    console.log( oUser.getName() );
```

箭头函数可以简化数组的处理

```js
 //箭头函数简化数组处理

let arr = [10,100,0,3,-5];
arr.sort( ( a, b ) => a - b );
arr.sort( ( a, b ) => b - a );
console.log( arr );
```

箭头函数取到的是外层的arguments

```js
let show = function( name ){
    return () => arguments[0];     // zhiyang, 箭头函数获取到的是外层的arguments
}

let fn = show( 'zhiyang' );
console.log( fn() );
```

call,bind,apply都不能改变箭头函数中this的指向

```js
var n1 = 100;
var n2 = 200;
let add = () => {
    return this.n1 + this.n2;
};
console.log(add.call(null)); //300
console.log(add.apply(null)); //300
console.log(add.bind(null)()); //300
```


> 原文:http://www.cnblogs.com/zhiyang 略有修改