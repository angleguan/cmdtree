---
title: Windows中的超级终端——cmder
date: 2017-07-01T22:21:29+00:00
layout: post
category: use
---
cmder是一个windows上的一个良好的cmd的替代品。

来看看官方对于cmder的解释:

> Cmder is a software package created out of pure frustration over the absence of nice console emulators on Windows. It is based on amazing software, and spiced up with the Monokai color scheme and a custom prompt layout, looking sexy from the start.

现在来说一下如何安装配置cmder

# 一、安装cmder

打开[cmder官网](http://cmder.net)

![]({{ site.pics }}/2017/07/TIMscreenshot20170701203059.png)

在下载选项中有两个选择，一个是mini版，一个full版，两者的区别就是full版自带了git-for-windows；

因为我已经安装了Git Bash，所以这里我选择mini版，两者都是压缩包形式，解压完直接就能打开cmder.exe

# 二、配置cmder

这里我将它解压到c盘的根目录，然后打开开始菜单 -》 输入 -》‘cmd’  -》选择以管理员方式打开，然后导航到你的cmder解压目录

![]({{ site.pics }}/2017/07/TIMscreenshot20170701204523.png)

执行
```
.\cmder.exe /REGISTER ALL
```

**这样就将cmder添加到了右键打开菜单：**

![]({{ site.pics }}/2017/07/TIMscreenshot20170701210239.png)



### 我们还可以将cmder的解压目录添加到path环境变量

![]({{ site.pics }}/2017/07/TIMscreenshot20170702131546.png)

这样我们就可以在`win + R`的运行命令中打开cmder

![]({{ site.pics }}/2017/07/TIMscreenshot20170702131712.png)


### cmder还有一个优点就是可以我们可以在一个窗口下新建多个tab页

![]({{ site.pics }}/2017/07/TIMscreenshot20170702131932.png)


有多种模式可供选择

![]({{ site.pics }}/2017/07/TIMscreenshot20170702133434.png)


(完)
