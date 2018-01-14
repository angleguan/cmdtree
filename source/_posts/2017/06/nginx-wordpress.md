---
title: 手动在服务器上部署wordpress个人博客
date: 2017-06-28T22:08:08+00:00
category: 使用笔记
---

> 测试主机: Cenots 7.2 X64 

# 一、准备LNMP环境

LNMP 是 Linux、Nginx、MySQL 和 PHP 的缩写，是 WordPress 博客系统依赖的基础运行环境。我们先来准备 LNMP 环境

## 1、使用lnmp一键安装

```
wget -c http://soft.vpser.net/lnmp/lnmp1.4.tar.gz && tar zxf lnmp1.4.tar.gz && cd lnmp1.4 && ./install.sh lnmp
```

即可执行lnmp一键安装脚本，更多详细内容可以查看[安装 - LNMP一键安装包](https://lnmp.org/install.html)

## 2、手动安装nginx、mysql、php

### 安装nginx

使用 yum 安装 Nginx：

```zsh
yum install nginx -y
```

- 对于centos6 需要去除对IPv6的监听


修改 `/etc/nginx/conf.d/default.conf`文件，CentOS 6 不支持 IPv6，需要取消对 IPv6 地址的监听，否则 Nginx 不能成功启动。

原default.conf文件

```
server {
    listen       80 default_server;
    listen       [::]:80 default_server;
    server_name  _;
    root         /usr/share/nginx/html;

    # Load configuration files for the default server block.
    include /etc/nginx/default.d/*.conf;

    location / {
    }

    error_page 404 /404.html;
        location = /40x.html {
    }

    error_page 500 502 503 504 /50x.html;
        location = /50x.html {
    }

}
```

将`listen       [::]:80 default_server;`注释掉（前面加#）。

- 启动nginx

```
nginx
```

- 将 Nginx 设置为开机自动启动：

```
systemctl enable nginx.service
```

### 安装MySQL

- 使用 yum 安装 MySQL：

```zsh
yum install mysql-server -y
```

对于最新的centos 7+，会提示没有这个软件包，解决办法参考[centos7 mysql数据库安装和配置 - 樊志阳的个人博客](https://fanzhiyang.com/blog/centos-mysqlserver/)

- 安装完成后，启动 MySQL 服务：

```zsh
service mysqld restart
```

- 设置 MySQL 账户 root 密码：

```zsh
/usr/bin/mysqladmin -u root password 'password'
```

- 将 MySQL 设置为开机自动启动：

```zsh
systemctl enable mysqld.service
```

### 安装php

- 使用 yum 安装 PHP：

```zsh
yum install php-fpm php-mysql -y
```

- 安装之后，启动 PHP-FPM 进程：

```
service php-fpm start
```

- 启动之后，可以使用下面的命令查看 PHP-FPM 进程监听哪个端口

```zsh
netstat -nlpt | grep php-fpm
```

- 把 PHP-FPM 也设置成开机自动启动：

```zsh
systemctl enable php-fpm.service
```

然后在浏览器输入服务器的IP就可以看到如下界面

![](/pics/2017/06/TIMscreenshot20170628114655.png)

# 二、安装并配置 WordPress

## 安装WordPress

- 配置好 LNMP 环境后，继续使用 yum 来安装 WordPress：

```
yum install wordpress -y
```

- 安装完成后，就可以在 /usr/share/wordpress 看到 WordPress 的源代码了。

## 配置数据库

- 进入 MySQL：

```
mysql -uroot --password='password'
```

- 为 WordPress 创建一个数据库：

```
CREATE DATABASE wordpress;
```

- MySQL 部分设置完了，我们退出 MySQL 环境：

```
exit
```

- 把上述的 DB 配置同步到 WordPress 的配置文件中，

打开wordpress安装目录的wp-config.php文件找到

```php
// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'database_name_here');

/** MySQL database username */
define('DB_USER', 'username_here');

/** MySQL database password */
define('DB_PASSWORD', 'password_here');
```

分别把数据库名称和用户名密码填进去

```php
// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'password');
```

## 配置 Nginx

WordPress 已经安装完毕，我们配置 Nginx 把请求转发给 PHP-FPM 来处理

- 首先，重命名默认的配置文件，默认的 Server 监听 80 端口，与 WordPress 的服务端口冲突，将其重命名为 .bak 后缀以禁用默认配置

```zsh
cd /etc/nginx/conf.d/
mv default.conf defaut.conf.bak
```

在 /etc/nginx/conf.d 创建 wordpress.conf 配置，参考下面的内容：

```
server {
    listen 80;
    root /usr/share/wordpress;
    location / {
        index index.php index.html index.htm;
        try_files $uri $uri/ /index.php index.php;
    }
    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    location ~ .php$ {
        fastcgi_pass   127.0.0.1:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include        fastcgi_params;
    }
}
```

- 配置后，重启nginx服务

```
systemctl restart nginx
```

（安装完成）

然后我们可以在浏览器输入解析好的域名或者服务器的ip就可以看到如下界面：

![](/pics/2017/06/TIMscreenshot20170628104823.png)

(完)

