---
date: 2017-10-14 15:25:36
title: "[笔记]在Ubuntu 16.04 LTS中配置LNMP环境"
category: Unix/Linux
---

首先安装软件

```
$ sudo apt-get install nginx php7.0-fpm mysql-server-5.6 php7.0-mysql
```

然后修改nginx配置文件

```
vim /etc/nginx/sites-available/default
```

修改此处PHP设置
```
location ~ \.php$ {
        include snippets/fastcgi-php.conf;
    #
    #    # With php7.0-cgi alone:
    #    fastcgi_pass 127.0.0.1:9000;
    #    # With php7.0-fpm:
        fastcgi_pass unix:/run/php/php7.0-fpm.sock;
    }
```

然后修改index，添加上index.php

重启服务
```
systemctl restart nginx
systemctl restart php7.0-fpm
systemctl restart mysql
```

修改默认文件夹

```
root /home/zy/www
```

### phpmyadmin

直接下载phpmyadmin放到网站根目录，如果打开报错

```
The mbstring extension is missing. Please check your PHP configuration.

```

那就需要安装`php-mbstring`包
