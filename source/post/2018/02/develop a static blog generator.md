---
title: 使用Node.js开发一个静态博客生成器（一）
category: 学习笔记
date: 2018-2-4 11:25:37
---

自己用Node.js写了一个非常简单的静态博客生成器，也就是现在这个网站，源代码在[Github](https://github.com/rhatyang/blog)，这里记录一下开发过程


## 读取所有的Markdown文件

首先这个博客生成器是将Markdown文件生成为HTML，所以第一步要做的是读取所有的Markdown源文件，然后将其内容和信息都存入一个JSON文件中。

### 处理文件

rd模块可以遍历文件夹下所有的文件。

我们只需要使用`readFileSync(dir)`方法就可以返回文件夹下所有的文件的一个数组，然后使用`forEach`方法来遍历数组中每一个元素（即每个文件的路径），接着读取每一个文件的内容，使用fs模块的`readFileSync`方法来读取这个文件的内容。

```js
let mdContent = fs.readFileSync(filePath, 'utf-8');
```

然后我们写一个函数来返回这个文件的文件名

```js
const formatFileName = filePath => path.basename(filePath).slice(0, -3).replace(/ /g, '-').toLocaleLowerCase();
```

我们这里将文件中所有的空格替换成-符号，然后将所有的大写转换为小写。

然后这里我们使用到一个`front-matter`模块来读取这个md文件中的头信息，就像Jekyll和Hexo那样，我们需要在文章或页面的文件头部需要定义这篇文章的信息，如标题、时间、分类等。

```js
var fs = require('fs');
var fm = require('front-matter');

fs.readFile('./example.md', 'utf8', function(err, data){
  if (err) throw err
 
  var content = fm(data)
 
  console.log(content)
})
```

fm会解析文件内容并返回一个对象：

```js
{
    attributes: { // 头信息
        title: '',
        category: ''
    },
    body: '' // 内容主体
}
```

## 存入‘数据库’

接着我们将读取到的所有文件的内容和信息存入‘数据库’中，这里我们用一个JSON文件来代替数据库储存文章内容。

我们这里使用lowdb这个库，具体使用方法可以浏览[这里](https://www.npmjs.com/package/lowdb)，我这里对一个JSON文件初始化一个posts数组来储存所有文章。

```js
_postsDb.defaults({posts: []})
  .write();
```

接着写一个方法，然后再之前遍历所有文章的时候将文章信息传入这个方法

```js
this.appendPostsDb = currentDb => {

    _postsDb.get('posts')
      .push(
        {
          path: currentDb.path,
          title: currentDb.title,
          date: currentDb.date(),
          category: currentDb.category,
          content: currentDb.conetnt
        }
      )
      .write();

    // console.log("write db")
  };
```

然后，在每次遍历到文章的时候，使用fm或者其它方法得到这个文章的相关信息并存入一个对象，之后再将这个对象传给`appendPostsDb()`函数。

```js
const post = {
  title: fContent.attributes.title,
  date: f => moment(fContent.attributes.date).format(f || 'YYYY-MM-DD'),
  category: fContent.attributes.category,
  conetnt: md.render(fContent.body),
  path: postLink(fileName)
};

writeDb.appendPostsDb(post);
```

### 对数据库进行排序

这样直接存入数据库后，是没有顺序的，这样很不方便以后我们直接读取所有文章，所有我们这里按照日期先后来给这个JSON排序一下。

```js
function formatDate(item) {
  return parseInt(item.replace(/-/g, ''));
}

let posts = dbPosts.sort((a, b) => formatDate(b.date) - formatDate(a.date));
```

排序方法也是非常简单，直接将日期转换为一个数字字符串然后直接sort比较即可。





