---
title: 使用Gihub Pages免费制作个人博客
date: 2017-04-08T12:19:43+00:00
category: 使用笔记
---

# 什么是Github Pages

![](/pics/2017/07/TIMscreenshot20170715122434.png)

Github Pages是Github提供的一个给项目生成静态网站的功能，相似的托管网站还有国内的Coding和码云。

关于Github Pages的官方介绍请点击[GitHub Pages](https://pages.github.com/)

![](/pics/2017/07/TIMscreenshot20170715122353.png)

# 一、开始使用

Github允许给任意仓库生成网站，如果不自定义域名，开启Github Pages时的固定域名为 `yourname.github.io` 和`yourname.github.io/reponame`

## 新建仓库

创建好个人账号后，点击右上角的新建仓库，仓库名称格式为`yourname.github.io`

![](/pics/2017/07/TIMscreenshot20170715124209.png)

仓库创建好后，默认已经开启了Github Pages服务，访问`yourname.github.io`即可看到。

## 推送代码

刚才新建的仓库并没有代码，所以打开网址是看不到什么的，所以我们要把我们写好的网站代码推送上去。

Github Pages只支持托管纯静态的网站，也就是说我们的网站只能由`HTML`、 `CSS`、 `js`组成，首页为`index.html`，不支持`PHP`，`ASP`等。

我们先在本地创建一个本地仓库文件夹，并进入该文件夹
```
mkdir blogdir
cd blogdir
```

初始化文件夹并添加远程仓库

```
git init 
git remote add origin git@github.com:yourname/yourname.github.io.git
```

新建一个`index.html`文件并写入Hello World!

```
echo Hello World! -> index.html
```

添加进本地仓库，推送
```
git add .
git commit -m "commit info"
git push origin master
```

然后再次访问刚才的域名`yourname.github.io`就可以看到刚才写入`index.html`中的Hello World!了。

# 二、使用Jekyll生成博客

刚才为了测试所以我们只写了一个简单的index文件，但是既然是博客，我们肯定要写文章，为了更方便的写文章，我们必须要要使用博客系统，Jekyll就是一个良好的，官方推荐的静态文件生成系统。

关于如何在自己的电脑上安装Jekyll，请参考我写的另一篇文章 <a href="({{ site.url }}/p/2017/05/this-site-building-notes-01.html)">本站搭建笔记(一)安装本地环境 | Fan ZhiYang's Blog(樊志阳的博客)</a>

## Jekyll主题

如果你按照那篇文章安装的Jekyll，并且已经新建了一个文件夹，那么你已经安装好了Jekyll的默认主题`minima`了。

通过在jekyll文件夹内输入`jekyll serve`就可以在本地生成一个预览站点，通过访问`http:127.0.0.1:4000`就可以看到。

更多Jekyll主题下载请访问[Jekyll Themes](http://jekyllthemes.org/)

## 开始写作

Jekyll是一种解析markdown文件生成静态网页的系统，与之类似的还有著名的hexo，而几乎所有的博客系统，都会支持markdown或者通过插件来支持markdown语法，所以我们应该学会用markdown进行写作。

要想让jekyll正确解析markdown文件，我们应该在md文件加入如下头信息：
```
---
layout: post //模板
date: 2017-04-15 16:27:26 +0800 //时间
title: 文章标题
category: 分类
---
```

将写好的文件放如`/_post`目录下即可。

# 三、自定义

Jekyll的自定义程度很高，通过查看文档[Welcome | Jekyll • Simple](http://jekyllrb.com/docs/home/)
我们可以很快熟悉Jekyll

（完）


