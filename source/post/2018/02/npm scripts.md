---
title: npm scripts
category: 学习笔记
date: 2018-2-21 14:24:30
---

## npm scripts

npm scripts是定义在node项目中package.json文件中scripts字段的脚本命令。

例如：

```json
{
  // ...
  "scripts": {
    "build": "gulp build"
  }
}
```

上面的scripts值是一个对象，里面的每一项属性都是一个命令，对应的值就是一段命令。可以通过使用`npm run  <脚本名>`的形式运行命令。

例如上例中运行`npm run build`实则就是运行`gulp build`。

可以通过运行`npm run`命令查看当前项目中所有可用的命令。

## 命令类型

`npm scripts`运行命令的本质就是创建一个shell环境来运行命令，因此，一般普通的shell命令都可以在npm scripts中使用。

`npm scripts`同时也支持shell的一般特性。

## 传参

要向`npm scripts`中传递参数，要用双横杠`--`标明。

```json
"lint": "jshint **.js"
```

向上面的npm run lint命令传入参数，必须写成下面这样。

```sh
$ npm run lint --  --reporter checkstyle > checkstyle.xml
```

也可以在package.json里面再封装一个命令。

```json
"lint": "jshint **.js",
"lint:checkstyle": "npm run lint -- --reporter checkstyle > checkstyle.xml"
```

## 多个命令

一个`npm script`里可以运行多个命令，使用&或者&&隔开即可。

## 默认值

`npm script`默认提供了两个默认命令，可以不定义直接运行：

```json
"start": "node server.js"，
"install": "node-gyp rebuild"
```

上面代码中，npm run start的默认值是node server.js，前提是项目根目录下有server.js这个脚本；npm run install的默认值是node-gyp rebuild，前提是项目根目录下有binding.gyp文件。

## 钩子

在`npm script`中存在两个钩子，`pre`和`post`，就拿下面的`lines`脚本来说，它的钩子脚本就是`prelines` 和`postlines`

```json
"scripts":{
  "prelines": "node prelines.js",
  "lines": "find src -name \"*.js\" | xargs cat | wc -l",
  "postlines": "node postlines"
}
```

执行`npm run lines`，会先执行`prelines`再执行`lines`之后再执行`postlines`。

## 生命周期事件

还有一些`script`会在模块安装，发布，卸载等不同的生命周期被执行。

```
prepublish, publish, postpublish：发布模块

preinstall, install, postinstall：安装模块

preuninstall, uninstall, postuninstall：卸载模块

preversion, version, postversion：在使用 npm version 修改版本号的时候执行

pretest, test, posttest：执行 npm test 的时候

prestop, stop, poststop：执行 npm stop 的时候

prestart, start, poststart：执行 npm start 的时候

prerestart, restart, postrestart：执行 npm restart 的时候
```

这些 script 会在不同的时刻自动被执行，这也是为什么`npm run test`可以简写为`npm test`的原因了，在执行 npm test 的时候会以次执行 pretest、test 和 posttest，当然了，如果没有指定 pretest 和 posttest，会默默地跳过。

还有 npm restart 这个命令比较叼，它不单单执行 prerestart, restart, postrestart 这三个，而是按下面的顺序来执行：

```
prerestart

prestop

stop

poststop

restart

prestart

start

poststart

postrestart
```

## 变量

npm可以使用npm内部的变量，例如通过`npm_package_`前缀，npm 脚本可以拿到package.json里面的字段。

例如：

```json
{
  "name": "foo", 
  "version": "1.2.5",
  "scripts": {
    "view": "node view.js"
  }
}
```

view.js

```js
console.log(process.env.npm_package_name); // foo
console.log(process.env.npm_package_version); // 1.2.5
```

上面代码中，我们通过环境变量`process.env`对象，拿到package.json的字段值。如果是 Bash 脚本，可以用`$npm_package_name`和`$npm_package_version`取到这两个值。

`npm_package_`前缀也支持嵌套的package.json字段。

```json
"repository": {
  "type": "git",
  "url": "xxx"
},
scripts: {
  "view": "echo $npm_package_repository_type"
}
```

上面代码中，repository字段的type属性，可以通过npm_package_repository_type取到。

## 参考

- [npm scripts 使用指南 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)

- [npm script 用法详解 - 即刻出发_ - SegmentFault 思否](https://segmentfault.com/a/1190000007684156#articleHeader3)
