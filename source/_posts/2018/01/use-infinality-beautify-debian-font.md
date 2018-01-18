---
title: 使用infinality增强Debian字体渲染
date: 2018-01-18
category: Unix/linux
---

infinality是一个Linux下增强字体显示和渲染的脚本包，虽然已经有两年没有维护了，但使用起来还是有点效果的，下面说下怎么在最新版的Debian 中使用：

## 一、下载安装包

```
git clone https://github.com/rhatyang/debian-infinality.git
```

克隆这仓库，然后安装infinality包

```
sudo dpkg -i fontconfig-infinality_20160429.0042-2_all.deb
```

之后根据自己设备的平台选择安装amd64还是i386的freetype包

```
sudo dpkg -i libfreetype6_2.6.3-infinality5_amd64.deb
```

## 二、配置文件

将以下内容加到home目录下的`.Xresources`文件中

```
Xft.antialias: 1
Xft.autohint: 0
Xft.dpi: 96
Xft.hinting: 1
Xft.hintstyle: hintfull
Xft.lcdfilter: lcddefault
Xft.rgba: rgb
```

### 渲染效果

编辑`/etc/X11/Xsession.d/99infinality-settings`文件，在第60行可以自定义效果，默认就很好了。

下面是我安装后的效果：

![](/pics/2017/01/Screenshot_20180118_141306.png)

## BUG

可能会与搜狗输入法冲突，打字太快会卡死，不知道是不是infinality的问题。