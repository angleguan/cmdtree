---
title: 'JavaScript遍历对象的几种方法'
category: JavaScript
date: 2018-2-15 14:50:39
---

## 一、for ... in ...

> for...in 循环只遍历可枚举属性。像 Array和 Object使用内置构造函数所创建的对象都会继承自Object.prototype和String.prototype的不可枚举属性，例如 String 的 indexOf()  方法或 Object的toString()方法。循环将遍历对象本身的所有可枚举属性，以及对象从其构造函数原型中继承的属性（更接近原型链中对象的属性覆盖原型属性）。

示例：

```js
var obj = {a:1, b:2, c:3};
    
for (var prop in obj) {
  console.log("obj." + prop + " = " + obj[prop]);
}

// Output:
// "obj.a = 1"
// "obj.b = 2"
// "obj.c = 3"
```

这也是我们经常使用的一种方法，就不多说了。


## 二、Object.keys()

> Object.keys 返回一个所有元素为字符串的数组，其元素来自于从给定的对象上面可直接枚举的属性。这些属性的顺序与手动遍历该对象属性时的一致。

Object.keys()方法返回一个可枚举的对象的'key'值组成的数组

若传入的是对象是数组，只会返回每个元素的索引（index）值：

```js
let arr = ["a", "b", "c"];
console.log(Object.keys(arr)); 
// ['0', '1', '2']
```

Object对象：

```js
let obj = { foo: "bar", baz: 42 }, 
    keys = Object.keys(obj);
console.log(keys); 
// ["foo","baz"]
```

若想得到值，通常我们会跟`foreach()`搭配使用，例如：

```js
Object.keys(config.categories).forEach(item => {
  site_categories.push({
    'title': item,
    'path': config.categories[item] + '.html'
  })
});
```


## Object.getOwnPropertyNames()

> Object.getOwnPropertyNames() 返回一个数组，该数组对元素是 obj自身拥有的枚举或不可枚举属性名称字符串。 数组中枚举属性的顺序与通过 for...in 循环（或 Object.keys）迭代该对象属性时一致。数组中不可枚举属性的顺序未定义。


Object.getOwnPropertyNames()方法与Object.keys()相似，除了返回'key'值之外还会加上该对象的其它属性，例如length

```js
var arr = ["a", "b", "c"];
console.log(Object.getOwnPropertyNames(arr).sort()); // ["0", "1", "2", "length"]
```

该方法通常也跟foreach搭配使用

## for ... of ...

> for...of语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句。

例子：

```js
// Array
let iterable = [10, 20, 30];

for (let value of iterable) {
    value += 1;
    console.log(value);
}
// 11
// 21
// 31

// String 
let iterable = "boo";

for (let value of iterable) {
  console.log(value);
}
// "b"
// "o"
// "o"

// map
let iterable = new Map([["a", 1], ["b", 2], ["c", 3]]);

for (let entry of iterable) {
  console.log(entry);
}
// ["a", 1]
// ["b", 2]
// ["c", 3]

for (let [key, value] of iterable) {
  console.log(value);
}
// 1
// 2
// 3
```
