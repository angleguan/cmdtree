---
title: Ubuntu编译安装Nginx及常用操作说明
category: Unix/Linux
date: 2018-2-11 10:03:04
---

## 为什么要编译安装？

- 默认软件源中的包都不是最新的（Centos、Debian等都是如此）
- 编译安装更加稳定
- 自定义程度高

## 安装方法

编译安装十分简单，我之前在Ubuntu 16.04上面通过apt安装的nginx1.10版本，太老了，如果你之前也安装过，直接卸载即可。

```
apt-get purge nginx
rm -rf /etc/nginx
```

接着安装：

```sh
## 目前最新的正式版是1.13.8，好像还有测试版到1.15了，这里安装正式版，当然还有稳定版是1.12
wget http://nginx.org/download/nginx-1.13.8.tar.gz
tar zxvf nginx-1.13.8.tar.gz
cd nginx-1.13.8
## ./configure有很多自定义选项，可查看文档
./configure
make
make install
## 启动nginx，如果你安装到其它位置还需要加c参数指定配置文件
/usr/local/nginx/sbin/nginx
```

## 配置systemctl

当然那样子启动不够方便，我们可以将nginx添加到systemd服务中去

新建`/lib/systemd/system/nginx.service`文件，加入如下内容：

```conf
[Unit]
Description=nginx - high performance web server
After=network.target remote-fs.target nss-lookup.target

[Service]
Type=forking
ExecStart=/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s stop

[Install]
WantedBy=multi-user.target
```

其中以Exec开头的命令，如果你是安装到其它路径，需要更改

接着就可以像使用包管理安装一样来愉快的使用systemctl了

例如加入开机自启

```
systemctl enable nginx
```

重启服务

```
systemctl restart nginx
```

enjoy！