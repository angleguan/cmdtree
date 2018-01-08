---
layout: post
date: 2017-10-13 20:54:27 +0800
title: "Gulp入门教程"
category: js
---


Gulp是一款非常简洁的前端自动化构建工具，依赖于Nodejs，使用Gulp非常简单。

## 安装

首先你需要安装有Nodejs，然后使用npm安装gulp（建议使用[cnpm](https://npm.taobao.org/)）

```
$ npm install gulp -g
```

## 如何使用

首先建立一个文件夹作为node项目文件夹，然后将gulp安装到项目内。

```
$ mkdir gulp-demo
$ cd gulp-demo
$ npm init
$ npm install gulp --save-dev
```

Gulp的配置文件只有一个，名为`gulpfile.js`在项目的根目录下，需要我们手动创建这个文件

然后编辑这个文件

```js
var gulp = require('gulp'); //引入gulp赋给gulp变量

gulp.task('default', function() {
  // 默认任务（task），自动执行
  console.log("Hello Gulp");
})；
```

然后运行Gulp

```
$ gulp
```

这个命令默认会执行默认任务（default），如果想要单独运行自己定义的任务，就使用`gulp [任务名]`,同理，想要创建一个自定义的任务：

```js
gulp.task('customTaskName', function() {
  // 这是一个自定义任务。
})
```

自定义的任务也可以放到default里来随默认任务运行：

```js
gulp.task('default', function() {
  gulp.run('customTaskName');
})；
```

## 使用插件

Gulp的强大是依赖于它各种各样的插件的。例如`gulp-sass`、`gulp-jslint`、`gulp-uglify`等，这些都可以使用npm安装的。同样的，像下面这样引入这些插件

```js
var sass = require('gulp-sass');
var jslint = require('gulp-jslint');
var uglify = require('gulp-uglify');
```

以`gulp-sass`，一个把sass（scss）文件编译为css文件的插件为例，像下面这样使用这个插件

```js
gulp.task('sass', function() {
    gulp.src('src/scss/index.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});
```

执行sass任务时会变异/src/scss/index.scss文件，然后输出index.css到/dist/css目录下。

## 监听文件

既然是自动化工具，那肯定是运行了就不用管的，在开发环境中，如何在修改了文件后自动执行任务，这就要使用到`watch`方法：

```js
gulp.watch(glob[, opts], tasks)
```

以上面的sass任务为例，监听index.scss文件，当文件修改时，重新编译一次css文件，创建一个watch任务

```js
gulp.task('watch', function() {
    gulp.watch('src/scss/index.scss',['sass']);
})
```

然后运行watch任务：

```
$ gulp watch
```

这样当index.scss文件被修改时，就会运行scss任务了。

## 完结

Gulp的强大之处在于各种插件，掌握了基本使用方法后就可以去看各种插件的使用方法了
