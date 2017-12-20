---
layout: post
title: 更改Apache根目录导致无法访问站点
date: 2017-09-27 09:29:15 +0800
category: 使用笔记
---

在`/etc/httpd/conf/httpd.conf`中修改默认根目录后，导致访问`localhost`无法访问，提示权限不足（Permission denied），通常是因为httpd无法访问更改的根目录所致，需要给目录设置权限。

假设被修改后的目录为`~/wwwroot`:

```
$ chmod o+x ~
$ chmod o+x ~/wwwroot
$ chmod -R o+r ~/wwwroot
```

然后重启httpd服务即可：

```
# systemctl restart httpd
```