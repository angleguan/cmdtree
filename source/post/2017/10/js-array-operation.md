---
title: JavaScript数据结构与算法——数组操作
date: 2017-10-20T10:49:18+00:00
category: JavaScript
---
数组是一种最基本的数据结构，对于其它语言，如C语言，一个数组的元素只能是同一种，js则不然，你可以在任一一个数组中加入任何类型的数据类型。

## 创建数组

在js中，数组（Array）是一种引用类型，你可以像下面这样创建一个Array实例：

```js
var colors = new Array();
var colors = new Array(10);     // 传递数量（length）
var colors = new Array("red","blue","green");   // 传递包含的项

// 可以省略 new 操作符
var colors = Array();
```

当然，大部分情况下我们用的是下面这种字面量表示法：

```js
var colors = ["red","blue","green"];
```

### 数组元素访问

可以这样访问一个数组的具体值

```js
var getValue = colors[0];   // red
colors[3] = "yellow";   // 给数组赋新值
colors[2] = "black" // 修改数组第三个值为black
```

方括号中的索引值表示要访问的值，如果要访问的索引超过了现有的项数，会自动增加索引，如上述第二行就会增加索引为“3”的yellow字符串（最大索引是3，数组长度即为4）。

可以用`length`方法得到数组的长度

```js
alert(colors.length);   // 4
```

可以通过循环输出一个数组的所有值：

```js
for (var i = 0; i &lt; colors.length; i++) {
  console.log(colors[i]);
}
```

访问一个不存在的索引会返回`undefined`

## 操作数组

### 添加或删除数组

我们有一个数组 numbers ，初始化成0到9：

```js
var numbers = [0,1,2,3,4,5,6,7,8,9];
```

如果想给这个数组加上一个值（如10），直接给数组最后一个空位的元素赋值

```js
numbers[numbers.length] = 10;
```

#### 栈方法

ECMAScript提供了一种类似栈操作的方法：`push()`方法和`pop()`方法

```js
var colors = ["red","blue","green","yellow"];   // 创建一个数组
colors.push("black");   // 推入一个值，多个值用，隔开
alert(colors[4])    // black
```

```js
colors.pop();   // 移除最后一项同时减少length值
alert(colors.length);   // 4
```

#### 队列方法

队列方法与栈方法相反，提供了`shift()`方法和`unshift()`方法，同样是上面的数组。

```js
alert(colors[0]);   // red

colors.shift();     // 移除数组第一项
alert(colors[0]);   // blue
```

```js
colors.unshift("red");  // 向数组前端添加任意值，用，隔开
alert(colors[0]);   // red
```

### 数组转换

还是上面的数组，调用`toString()`方法会返回数值中每个值用逗号分隔的拼接起来的字符串

```js
alert(colors.toString());   // red,blue,green,yellow
```

但是这样或许还不能满足我们的需求，如果想自定义分隔符，可以调用`join()`方法，`join()`方法接受一个参数，作为拼接字符串时的分隔符

```js
alert(colors.join("|"));    // red|blue|green|yellow
```