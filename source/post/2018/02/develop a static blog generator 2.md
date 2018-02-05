---
title: 使用Node.js开发一个静态博客生成器（二）——模板
category: 学习笔记
date: 2018-2-5 13:17:45
---

> art-template 是一个简约、超快的模板引擎。它采用作用域预声明的技术来优化模板渲染速度，从而获得接近 JavaScript 极限的运行性能，并且同时支持 NodeJS 和浏览器。

一个静态站点生成器自然要用到模板语言，如jade,ejs,handlebars,mustache等，这里我使用的是国人开发的art-template，据说速度是相当的快。

其实我在之前一直是不知道怎么使用模板语言，我原先对于模板文件的工作方式是这样理解的：

由JS获取要应用到模板文件的数据然后传入模板文件生成文件

而其实真正的方式是这样的：

由JS读取模板文件并将模板需要的数据作为参数传给模板函数然后得到生成好的数据，这一切的过程其实都在JS中实现，并不是我以为的要由模板文件来进行编译。

### 为什么要选择artTemplate呢

- 可以使用传统模板语法，即双大括号！（这是我最喜欢的语法）

- 查询文档很方便（有中文版，因为是由国人开发的）

- 速度快，这点其实并没有太大的感觉

## 使用方法

使用方法非常简单，可以参考其[中文文档](https://aui.github.io/art-template/zh-cn/index.html)

我这里简单说下如何将它与现有代码即这个博客生成器结合起来

### Markdown解析器

这里我选择[markdown-it](https://www.npmjs.com/package/markdown-it)，类似的还有marked、showdown等

```js
var md = require('markdown-it')();
var result = md.render('# markdown-it rulezz!');
console.log(result) // <h1>markdown-it rulezz!</h1>
```

因为之前我们使用front-matter对markdown文件进行了解析，得到的文章内容应该是`content.body`，然后使用markdown-it将这个值解析为html即可。

### 模板编译

我们这里只需要用到一个核心方法：

```js
template.render(source, data, options);
```

其中我们将模板文件作为`source`传进去，然后data应该为一个对象，额外的选项暂时不需要。

### 模板变量

接着来看一下一个博客生成器中应该用到哪些变量是必须得：

```
站点信息(site对象)：
  标题(title)：config.json文件定义
  链接(url)：config.json文件定义
  所有文章(posts数组)：posts.json中的posts值
  所有分类(categories对象)：config.json文件定义，应为键对值对象

页面信息(page对象)：
  标题(title)：由front-matter解析得到的content.attributes.title
  日期(date)：由front-matter解析得到的content.attributes.date（只有文章有）
  所属分类(category)：由front-matter解析得到的content.attributes.content
```

然后将这些值全部放入一个对象中供`template.render`调用，为了方便复用，需要判断当前的页面是页面还是文章或者是分类页，所以我将它写成函数，判断当前是什么页面来进行解析并返回一个对象即可。

具体data.js的实现方式在[这里是代码](https://github.com/rhatyang/blog/blob/master/lib/template/data.js)

### 编辑模板

然后就可以来编写模板了（主题）

可以这样来循环所有的文章

```html
<ul>
  {{each site.posts}}
  <li>
    <a href="{{$value.path}}">{{$value.title}}</a>
    <span>{{$value.date}}</span>
  </li>
  {{/each}}
</ul>
```

得到所有的分类

```html
{{each site.categories}}
<li class="pure-menu-item">
  <a class="pure-menu-link" href="{{site.url}}/{{$value.path}}">{{$value.title}}</a>
</li>
{{/each}}
```

对于单个分类页的变量储存方式，我像Jekyll那样将当前分类页的名称作为分类变量的第一项，然后将当前分类下的所有文章作为一个数组存到当前分类数组的第二项，所以可以这样来输出：

```html
<h1>{{category[0]}}</h1> <!-- 分类页标题 -->

<!-- 文章 -->
{{each category[1]}}
<li>
  <a href="{{$value.path}}">{{$value.title}}</a>
  <span>{{$value.date}}</span>
</li>
{{/each}}
```

跟Jekyll很像是吧
