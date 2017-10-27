---
title: 在Arch Linux 中搭建LAMP环境
date: 2017-09-02T17:28:58+00:00
layout: post
category: use
---

简单的概括一下在Arch Linux中如何搭建LAMP环境。

## 安装 Apache

安装Apache有两种方式：

一是**编译安装**，在官网下载Apache httpd 压缩包，然后解压，编译安装。[Download - The Apache HTTP Server Project](https://httpd.apache.org/download)

这种安装方法适用于各类发行版。

```
## 编译安装三部曲

$ ./configure
$ make
$ make install
```

另外一种方法就是直接使用`pacman`包管理器安装了，简单方便，我是使用这种方法安装的。Arch Linux wiki也是介绍的这种方法。[Apache HTTP Server - ArchWiki](https://wiki.archlinux.org/index.php/Apache_HTTP_Server#Installation)

```
# pacman -S apache 
```

### 启动 Apache

```
# systemctl start httpd
```

然后访问`http://127.0.0.1`即可看到一个文件浏览的页面了

![]({{ site.pics }}/2017/09/Screenshot_20170902_165037.png)

使用这个命令可以查看当前`httpd`的状态以及排错。

```
# systemctl status httpd
```

使用这个命令将`httpd`加入开机自动启动

```
# systemctl enable httpd
```

## 安装 PHP

同样的也可以使用下载安装，但是我这里直接使用`pacman`安装了。

```
# pacman -S php php-apache
```

### 配置 PHP

`php-apache` 中包含的 `libphp7.so` 不支持 `mod_mpm_event`，仅支持 `mod_mpm_prefork`。需要在 `/etc/httpd/conf/httpd.conf `中注释掉:

```
#LoadModule mpm_event_module modules/mod_mpm_event.so
```

然后取消下面行的注释:

```
LoadModule mpm_prefork_module modules/mod_mpm_prefork.so
```

### 启用 PHP

在 `/etc/httpd/conf/httpd.conf` 中添加如下行：

将这一行放在`LoadModule `的末尾：

```
LoadModule php7_module modules/libphp7.so
AddHandler php7-script php
```

将这一行放到`Include`列表的末尾：

```
Include conf/extra/php7_module.conf
```

重启 httpd.service。

```
systemctl restart httpd
```

这次重启会有点长，如果你一下就好了，那就就是出错了，请运行上面提到的命令查看原因。


## 安装 MariaDB

MariaDB完全兼容mysql。

```
# pacman -S mariadb libmariadbclient mariadb-clients 
```

### 配置 MariaDB

安装Mariadb软件包之后，你必须运行下面这条命令：

```
# mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
```

接着执行

```
# systemctl start mariadb
# mysql_secure_installation
# systemctl restart mariadb
```

第二条命令会提示设置`root`密码。


取消 `/etc/php/php.ini `中 下面行前面的注释 :

```
extension=pdo_mysql.so
extension=mysqli.so

```

完成后 重启 `httpd.service` 服务。

```
# systemctl restart httpd
```


## 安装 phpMyAdmin

管理 `MariaDB`的方法有很多，wiki提到`phpMyAdmin`和MariaDB不完全兼容，但是足够执行基本任务。

安装 `phpMyAdmin` 也有两种方法：

一是使用包管理安装
```
# pacman -S phpmyadmin
```

但是我不推荐这个方法，配置复杂，而且wiki很多内容已经过时。

我推荐直接**下载phpmyadmin的压缩包解压到需要的目录**。


这种方法简单快捷的多。

直接在[phpMyAdmin](https://www.phpmyadmin.net/)官网下载安装压缩包，解压到网站目录即可访即可。



## 结束

这里是非常简单的概括了一下安装步骤，很多拓展功能没有提及，比如常用的为Apache开启`.htccess`支持，开启多虚拟主机等等。

想要了解更多可以访问wiki，但有些内容已经不适用了，自行斟酌。
