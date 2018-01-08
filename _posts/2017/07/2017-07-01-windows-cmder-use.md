---
title: Windows中的超级终端——Cmder
date: 2017-07-01T22:21:29+00:00
layout: post
category: use
---

Cmder是一个Windows上的一个很好的CMD的替代品，但是现在Win10也自带了PowerShell，也是非常强大的一款官方推出的CMD替代品，同时也支持Git，我是两者都用。

来看看官方对于cmder的解释:

> Cmder is a software package created out of pure frustration over the absence of nice console emulators on Windows. It is based on amazing software, and spiced up with the Monokai color scheme and a custom prompt layout, looking sexy from the start.

Cmder是一个开源项目[cmderdev / cmder：可爱的控制台模拟器包的Windows](https://github.com/cmderdev/cmder)

现在来说一下如何安装配置Cmder

## 一、安装Cmder

打开[Cmder官网](http://cmder.net)

![](/pics/2017/07/TIMscreenshot20170701203059.png)

在下载选项中有两个选择，一个是mini版，一个full版，full版相对更加强大，例如加入Git和vim等。

虽然我已经安装了Git for windows，但是我还是选择了full版，两者都是压缩包形式，解压完直接就能打开cmder.exe，我推荐使用full版，并且如果你选择full版，我推荐你到[Releases · cmderdev/cmder](https://github.com/cmderdev/cmder/releases)下载7z压缩包，我在官网下载的是zip，7z格式的要小一半。

## 二、配置Cmder

这里我将它解压到c盘的根目录，然后**使用管理员身份**打开cmd或者powershell并定位到解压完的目录

![](/pics/2017/07/TIMscreenshot20170701204523.png)

执行
```
.\cmder.exe /REGISTER ALL
```

**这样就将cmder添加到了右键打开菜单：**

![](/pics/2017/07/TIMscreenshot20170701210239.png)


### 我们还可以将Cmder的解压目录添加到path环境变量

![](/pics/2017/07/TIMscreenshot20170702131546.png)

这样我们就可以在`win + R`的运行命令中打开cmder

![](/pics/2017/07/TIMscreenshot20170702131712.png)

cmder还可以在一个窗口下新建多个tab页

![](/pics/2017/07/TIMscreenshot20170702131932.png)

有多种模式可供选择

![](/pics/2017/07/TIMscreenshot20170702133434.png)

更多使用技巧自行摸索。

(完)
