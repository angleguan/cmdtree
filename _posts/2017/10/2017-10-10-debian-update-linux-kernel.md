---
layout: post
date: 2017-10-10 09:44:54 +0800
title: "Debian stable使用backports源升级新内核"
category: Unix/Linux
---

> 为什么要升级内核？我的笔记本电脑CPU较新，估计是7代CPUSoC的电影管理模块状态有变化，导致我在待机下的cpu功耗也能达到5-6瓦，我升级完内核后稳定在2瓦左右，虽然这也高出一般电脑，但也已经好很多了。如果没有必须要升级内核的需求，不建议使用stable单独升级内核。


> 从squeeze开始，Debian Backports 已并入主源，所以就不需要添加新的源了。

这里我使用的是中科大的源，所以我只要加上以下两列源即可：

```
deb http://mirrors.ustc.edu.cn/debian/ stretch-backports main contrib non-free
deb-src http://mirrors.ustc.edu.cn/debian/ stretch-backports main contrib non-free
```

然后更新以下缓存

```
$ sudo apt-get update
```

现在就可以使用backports源了，命令是：

```
$ sudo apt-get -t stretch-backports install "package"
```

比如执行一下sudo apt-get -t stretch-backports upgrade看到是有包可以更新的，但是sudo apt-get upgrade却没有。

安装新的内核

直接执行以下命令就可以安装当前backports的最新内核：

```
$ sudo apt-get -t stretch-backports install linux-image-amd64
```

我现在使用的Debian 9（stretch），默认的是linux 4.9 ，我这里安装的是4.12

重启后使用uname -r就可以查看到已经安装好新的内核

然后执行

```
$ sudo apt autoremove
```

就可以删除旧的内核噢。

查看安装的内核

```
$ dpkg --list | grep linux-image
```