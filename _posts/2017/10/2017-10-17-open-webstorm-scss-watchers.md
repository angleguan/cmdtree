---
title: 给WebStorm/PhpStorm开启SCSS自动编译
date: 2017-10-17T09:52:32+00:00
layout: post
category: 使用笔记
---
## 安装Ruby-sass

首先，需要安装`SASS`，使用ruby安装

没有安装ruby的安装ruby

```
apt-get install ruby    ## Ubuntu
yum/dnf installl ruby   ## Centos/Fedora 
pacman -S ruby          ## Arch Linux
## Windows去官网下载安装包安装
```

然后使用gem安装sass

```
gem install sass
```

## 配置WebStorm/PhpStorm

依次打开【File】》【Settings】》【Tool】》【File Watchers】

![](/pics/2017/10/1701.png)

然后点击右上方的+号，选择【SCSS】

![](/pics/2017/10/1702.png)

在【Program】处选择安装的`SASS`中的scss的可执行文件，如图是Windows的路径，Linux用户自行查找

![](/pics/2017/10/1703.png)

下面两项分别是输出的css文件和css.map文件的路径，默认是跟scss文件同路径。