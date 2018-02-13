---
title: 在Ubuntu 16.04上简单安装Django
category: 学习笔记
date: 2018-2-13 14:12:58
---

### 安装Django

在Ubuntu上面很方便的一个是你可以直接使用apt安装django：

```
# apt-get install python-django   ## python2
# apt-get install python3-django  ## python3
```

当然更推荐的方法是使用pip安装

首先安装pip

```
# apt-get install python-pip  ## pip2
# apt-get install python3-pip ## pip3
```

接着安装django

```
# pip install django
# pip3 install django
```

如果在安装过程中报错，你可能需要升级一下pip

```
# pip3 install --upgrade pip
```

安装完成后可以查看一下版本：

```
# django-admin --version
```

我这里是python3.5+django2.0.2版本

下面也使用python3作为演示

### 初始化项目

我们可以使用`django-admin`命令快速的初始化一个项目

```
# django-admin startproject hellodjango
# cd hellodjango
```

接着更新django的数据库

```
# python3 manage.py migrate
```

接着需要创建一下管理员信息

```
# python3 manage.py createsuperuser
```

#### 配置主机信息


接着需要设置一下可以连接到django的主机或域名地址，编辑`hellodjango/hellodjango/settings.py`文件

这里面有个`ALLOWED_HOSTS`配置项，将你的公网IP地址或者你的域名加入进去

```
ALLOWED_HOSTS = ['165.227.10.164', 'setint.com']
```


接着你就可以运行服务了：

```
# python3 manage.py runserver 0.0.0.0:8000
```

打开浏览器输入`ip:8000`或者`域名:8000`，就可以看到如下内容


![](/pics/2018/02/1301.png)

在地址后面加上admin还可以进入到自带的管理界面

![](/pics/2018/02/1302.png)

![](/pics/2018/02/1303.png)


> 基于django可以很简单的开发出一个网站或者博客。enjoy
