---
title: Windows IIS服务器搭建
date: 2017-07-20T22:22:02+00:00
layout: post
category: use
---

> 测试环境：Windows Server 2008 R2 数据中心版 64位 、IIS 7.5

# 安装IIS服务

安装好系统后，打开【开始】【所有程序】【管理工具】选择【服务器管理器】

![](/pics/2017/07/fzy_screenshot20170720124248.png)

打开之后，如图所示

![](/pics/2017/07/fzy_screenshot20170720124324.png)

选择【角色】【添加角色】

![](/pics/2017/07/fzy_screenshot20170720124358.png)

然后选择【Web服务器（IIS）】

![](/pics/2017/07/fzy_screenshot20170720124518.png)

然后勾选自己所需要的功能

![](/pics/2017/07/fzy_screenshot20170720124656.png)

然后【安装】，完成之后关闭当前窗口

这时候我们就算是安装完成了

这时候可以在服务器内浏览器地址栏输入`127.0.0.1`就可以看到IIS的默认主页了

![](/pics/2017/07/fzy_screenshot20170720130452.png)

然后我们也可以在自己电脑浏览器上输入服务器的公网IP也可以看到相同内容

![](/pics/2017/07/fzy_screenshot20170720130634.png)

我们还可以看到这个站点用的服务有

![](/pics/2017/07/fzy_screenshot20170720132447.png)

# 二、配置服务器

接着在【开始】【管理工具】【Internet信息服务（iis）服务器】

![](/pics/2017/07/fzy_screenshot20170720125015.png)

可以在【网站】下面看到【Default Web Site】，这个就是我们刚才所浏览到的网站

![](/pics/2017/07/fzy_screenshot20170720131007.png)

点击右边【操作】【浏览】可以打开网站源文件目录，我们可以在这里进行我们想要的操作，换成我们的网站源码等


![](/pics/2017/07/fzy_screenshot20170720131141.png)

比如我这里把默认文件删了，新建一个index.html，然后输入`Hello Fan ZhiYang!`

![](/pics/2017/07/fzy_screenshot20170720131628.png)

然后浏览器输入IP地址，就可以看到


![](/pics/2017/07/fzy_screenshot20170720131813.png)


（完）
