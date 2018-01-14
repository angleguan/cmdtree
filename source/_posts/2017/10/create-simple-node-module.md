---
date: 2017-10-07 14:31:29 +0800
title: "编写一个简单的Node.js模块"
category: 学习笔记
---

模块化是Node.js的一个特点，模块是一个Node.js应用程序的基本组成部分，一个文件就可以是一个模块，用来负责一个功能。

调用模块的方式有很多，当我们使用自己编写的模块时，可以这样调用：

```js
var hello = require('./hello');
```

这样就会引入当前文件夹下的hello.js文件，这个文件就是一个模块，里面有各种具体的方法，想让这个模块里面的方法可以像上面那样被引用，就需要把这些方法暴露出去，给外部提供一个接口——即`module.exports`和`exports`对象，例如这样：

```js
exports.hello = hello;
module.exports = hello;
```

或者直接这样：

```js
module.exports = function() {
  // code
}
```

例如新建一个hello.js文件：

```js
function hello(name) {
    console.log('Hello ' + name);
}

exports.hello = hello;

```

通过`exports`方法把hello作为一个访问接口，然后在目录下新建一个index.js文件，通过下列代码加载这个模块

```js
var hello = require('./hello')
```

然后便可以在index.js文件中访问到exports下的函数了。

```js
hello.hello('Fan');
```

接着用node执行一下index.js就可以看到效果了

```
$ node index
Hello Fan
```