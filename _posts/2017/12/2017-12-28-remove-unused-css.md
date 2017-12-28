---
layout: post
date: 2017-12-28 11:42:06 +0800
title: 使用Uncss去除未使用的CSS样式
category: learn
---

[Uncss](https://github.com/giakki/uncss)是一个可以去除在HTML页面中没有使用过的CSS样式的工具。

## 使用方法

### 安装使用

你可以使用NPM安装uncss来在本地中使用：

```
npm install -g uncss
```

最简单的一个例子就是使用`uncss`命令：

```
uncss [options] <file or URL, ...>
```

例如

```
uncss https://fanzhiyang.com > style.css
```

这个命令会把我博客主页中所有引用的CSS都进行一次过滤，然后生成仅使用到的样式的CSS文件。

还可以添加的参数有：

```
-V, --version                       output the version number
-i, --ignore <selector, ...>        Do not remove given selectors
-m, --media <media_query, ...>      Process additional media queries
-C, --csspath <path>                Relative path where the CSS files are located
-s, --stylesheets <file, ...>       Specify additional stylesheets to process
-S, --ignoreSheets <selector, ...>  Do not include specified stylesheets
-r, --raw <string>                  Pass in a raw string of CSS
-t, --timeout <milliseconds>        Wait for JS evaluation
-H, --htmlroot <folder>             Absolute paths' root location
-u, --uncssrc <file>                Load these options from <file>
-n, --noBanner                      Disable banner
-a, --userAgent <string>            Use a custom useragent string
-h, --help                          output usage information
```

### 在项目中使用

你可以在Node.js项目中使用uncss，例如在Gulp中使用，你需要安装`gulp-uncss`插件，然后编辑`gulpfile.js`文件

```js
const gulp = require('gulp'),
  	uncss = require('gulp-uncss');
gulp.task('default', () => {
  gulp.src('oldstyle.css')
    .pipe(uncss({
      html: ['index.html', 'posts/**/*.html', 'http://example.com']
    }))
    .pipe(gulp.dest('output/'));
});
```

然后执行`gulp`命令即可。