---
title: 开始使用Hexo
date: 2018-1-14 20:15:55
category: 使用笔记
---

昨天开始把博客迁移到Hexo了，我在不久前刚写过一篇[Jekyll和Hexo详细对比](https://fanzhiyang.com/blog/2017/11/jekyll-and-hexo-detailed-comparison/)，其中我提到我在这之前不想迁移到hexo有两点原因

- 模板语言不熟

- 使用Github Pages更加方便

第一点，hexo默认使用[ejs](http://www.embeddedjs.com/)语言，之前尝试过写hexo主题，因为对这款模板不熟都中途放弃了，昨天下了几个hexo主题参考，终于把我现在这款主题从Jekyll迁到Hexo了

第二点，因为Github Pages默认会自动部署Jekyll，我也图个方便，直接把源码PUSH上去就好了，不过现在我使用[travis CI](https://www.travis-ci.org/)，可以自动部署Github Pages服务，只需要把hexo站点源码推送到Github即可，travis会按照自定义代码编译好文件再部署到gh-pages分支，非常方便。

<!-- more -->

## 遇到的坑

其实熟悉hexo再写个主题昨天一天就好了，最让我头疼的是我写过很多文章都有用到双大括号`{% raw %}{{ }}{% endraw %}`或者`{% raw %}{% %}{% endraw %}`，原本在Jekyll中，我都会在要写这两种语法的文章开始和结尾直接加个`{\% raw %\}`(因为我实在不知道怎么输出raw标签，只能加两个反斜杠了)，但是在hexo中，raw会导致markdown语法也无法解析，所以我只能在要转义的字符两端加raw标签了，而有的时候输出双大括号却不需要加raw转义标签，而hexo的报错信息遇到这种问题却还是unknown path，我只能一篇一篇文章排错了，花了一个上午。

## 好处

hexo的优点还是非常多的，要不然我也不会大费周章的迁移过来，其中最让我舒服的一个好处就是开启本地服务，重新加载一次的速度非常快，虽然hugo号称是最快的静态博客生成器，但我感觉两者还是差不多的，就看以后文章更多的时候还能不能这么快了，还有的一个优点就是插件非常丰富吧，当然大部分我也是不需要的。
