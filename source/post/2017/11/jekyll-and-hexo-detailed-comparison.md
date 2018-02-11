---
date: 2017-11-26 10:29:33
title: Jekyll和Hexo详细对比
category: 使用笔记
---

我一直是使用的Jekyll，这个博客就是使用Jekyll搭建的，源码在[rhatyang/blog: Fan Zhiyang's personal blog , built using jekyll](https://github.com/rhatyang/blog)，使用Github Pages自动部署，所以你可以在我的博客找到很多关于Jekyll的内容——[Jekyll最全使用指南 - 樊志阳](https://fanzhiyang.com/blog/jekyll/)，我之前曾经尝试过使用Hexo，但最后也是不了了之，现在来详细的对比一下这两者的优劣。

首先，Jekyll和Hexo可以说是最受欢迎、用户都非常多的两个**静态博客生成系统**。Jekyll使用Ruby语言编写，使用gem安装，而Hexo使用js编写，使用npm安装，类似的还有很多其它的静态博客生成器（如使用Golang编写的Hugo，[使用Hugo 搭建静态博客 - 樊志阳](https://fanzhiyang.com/blog/hugo/)）可以在[Top Open-Source Static Site Generators - StaticGen](https://www.staticgen.com/)找到。

我从以下几个方面展开对比：

## 安装难度

首先肯定是安装方面，我在网上经常看到很多人安装Jekyll有一大堆毛病，造成一种Jekyll安装很麻烦的假象，我在Windows（10）平台和Linux（主流发行版）平台都有使用Jekyll的经历，**从来没有遇到过任何问题**，我现在的系统是Win10，当初装好系统直接下载一个RubyInstaller包安装好然后`gem install jekyll bundle`就好了，而Hexo基于NodeJS平台，所有的平台都应该会没问题才对。所以我认为在这一点上，两者都很简单。

## 易用性

因为这两者都是静态博客系统，所以他们的功能是相同的——将文章转换为静态文件。所以在很多操作上（增删博文、分类管理等）是比不上WordPress等功能非常完善强大的CMS系统的。例如Jekyll并不自带分类标签页生成的功能，需要自己添加插件，而Hexo则自带这项功能，在撰写文章上，两者都使用Markdown语法并添加yaml头信息，把md文件放在指定文件夹下就可以了。

## 速度

因为Jekyll是Ruby编写的，在性能和速度上面肯定比不上Hexo（当然我不是黑Ruby...），这点是毋庸置疑的，我在写这个文章的时候就测试过，120篇文章，使用Jekyll生成一次花了3秒多，而Hexo并没有输出时间，但我觉得明显比Jekyll快不少，应该在1秒左右。在本地预览上，Jekyll是生成了页面然后进行预览，而Hexo是没有在根目录生成文件的，速度也快不少。

## 部署

Jekyll最开始的开发者是Tom Preston-Werner（Github创始人），现在很多开发者也都是Github员工，我不知道是不是这个原因，Github Pages是建议使用Jekyll的，并且支持自动生成页面，也就是你可以把整个源码推送上去让Github来生成，**我觉得这一点很方便**，这也是我一直用Jekyll的原因之一，而像Hexo，则可以使用`hexo d`命令将整个生成好的网站推送上去，Commit信息则是生成的日期，这个我觉得不是很好。至于在虚拟空间和服务器等我觉着并不好，因为非常不方便，所以你无论你使用Jekyll或者Hexo，我都建议你部署在Github，或者国内的Coding Pages也是个不错的选择。

## 拓展性

这点上Hexo要比Jekyll强，毕竟现在Nodejs的火爆程度，你可以根据官方API轻松的编写一个组件，而像Ruby(⊙o⊙)…，国内会写Ruby的程序员又有几人，当然你要是想找一些日常使用的插件还是找得到的，毕竟Ruby曾经也是相当的火爆啊。

## 迁移

两者都可以很好的从Wordpress等知名Blog、cms系统迁移过来，而**Jekyll是完全兼容Hexo的**，两者的头信息非常相似，你可以直接把Jekyll文章放到Hexo文件夹下用，而Hexo文章的头信息没有`layout`一项。

## 主题开发

这点也是我一直用Jekyll的原因之一，Jekyll使用Liquid模板语言——[Liquid 模板语言中文文档](https://liquid.bootcss.com/)，而Hexo则是使用EJS，相对来说可实现的功能更加的多，但是也更加的复杂许多，所以我曾经几度琢磨EJS，但最后还是感觉这玩意不适合我，Liquid的双大括号语法非常简洁和一目了然啊。

## 总结

我并不觉得网上说的使用Jekyll有多么得“黑客范”，我认为使用Jekyll或者Hexo的人都是追求简约的，所以如果你只想简单的写写文章或者想像我一样使用Github Pages托管，体验原生的Github Pages我建议你使用Jekyll。但是Hexo在总体上来说比Jekyll要优秀很多。
