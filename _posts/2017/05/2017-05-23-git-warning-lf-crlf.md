---
title: git commit警告 LF will be replaced by CRLF
date: 2017-05-23T20:09:58+00:00
layout: post
category: 使用笔记
---
之前在使用git时就经常遇到这样的报错，起初并没有太在意，并没有影响到工作，但是今天在进行仓库分离的时候，使用jekyll build编译网站的时候

![](/pics/2017/06/TIMscreenshot20170623201424.png)

如上图，满屏幕的warning，一看到warning都不舒服的我看到这么多warning瞬间都起鸡皮疙瘩了，于是google了一下，整理出如下内容

# 一、CR、LF、CRLF之间的关系

其实这是一个历史原因，有兴趣的同学可以google一下，这里只简要说一下他们之间的关系

**这三种都是三类系统中对于回车换行的含义：**

```
Linux/Unix  > Line Feed       > LF > 换行
Mac         > Carriage Return > CR > 回车
Windows/Dos > CR LF  > 回车 换行
```

所以windows的换行符是CRLF，正如我在写这篇文章的时候，vscode的右下角已经标出这个使用CRLF换行

![](/pics/2017/06/TIMscreenshot20170623203125.png)

也就说，你在windows系统上创建的文件都是CRLF换行的，但是我在使用bash命令生成文件时，bash是GNU shell啊，GNU又是类UNIX啊，所以追踪溯源，他生成的文件肯定是LF换行的。

但是这里其实也是很奇怪的，git起初也是linux上专属的，但是人家挺有责任心的，你在windows上运行我，我就有义务给你把LF换成你的CRLF，故此就生出这满屏幕的wraning了。


# 二、如何关闭这个警告

其实很简单，我们只需要在git bash中执行
```
git config --global core.autocrlf false

```
这样就把他的自动转换关闭了。

但是这是不需要担心的，因为现在的各种IDE都支持多种换行风格，即使在windows系统中也能正常显示LF换行的文件。

（完）
