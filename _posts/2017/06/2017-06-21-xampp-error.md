---
title: xampp 不能启动报错 Error:Apache shutdown unexpectedly
date: 2017-06-21T19:39:22+00:00
layout: post
category: use
---


刚才试着在电脑上安装xampp，搭建wordpress本地环境

启动apache和mysql时却报错，大部分情况就是端口被占用了，或者是被关闭了

就像前段时间流行的比特病毒，我把443端口关闭了，同时80端口被虚拟机占用了 ，所以修改xampp的端口改一下就行了


修改443端口文件在c:/xampp/apache/conf/extra/httpd-ssl.conf 

修改80端口文件在c:/xampp/apache/conf/httpd.conf 

查找要修改的端口然后随便写个端口就好了

**注：修改80端口带来的问题就是直接访问127.0.0.1了，需要在后面加上:你修改的端口号**

（完）
