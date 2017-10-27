---
title: 自己搭建Git服务器
date: 2017-07-18T22:16:20+00:00
layout: post
category: use
---
> 服务器环境: CentOS 6.8

Git 是一款免费、开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。

# 安装Git

## 检查依赖库和编译工具

为了保障后续工作的顺利进行，我们需要检查一下自己的服务器是否已经安装了以下工具

```
yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel
```
```
yum install gcc perl-ExtUtils-MakeMaker
```
因为我在Cenots6的环境下是已经安装了，但在7.4版本下却没有安装。

## 下载Git

选一个目录，用来放下载下来的安装包，这里将安装包放在 /usr/local/src 目录里

```
cd /usr/local/src
```

到官网找一个新版稳定的源码包下载到 /usr/local/src 文件夹里
```
wget https://www.kernel.org/pub/software/scm/git/git-2.10.0.tar.gz
```

## 解压和编译

解压下载的源码包
```
tar -zvxf git-2.10.0.tar.gz
```

解压后进入 git-2.10.0 文件夹
```
cd git-2.10.0
```

执行编译


```
make all prefix=/usr/local/git
```

编译完成后, 安装到 /usr/local/git 目录下
```
make install prefix=/usr/local/git
```

## 配置环境变量

将原来的 PATH 指向目录修改为现在的目录
```
echo 'export PATH=$PATH:/usr/local/git/bin' >> /etc/bashrc
```

生效环境变量
```
source /etc/bashrc
```

此时我们能查看 git 版本号，说明我们已经安装成功了。
```
[root@host git-2.10.0]# git --version
git version 2.10.0
```

# 配置Git

## 创建 git 账号

为我们刚刚搭建好的 git 创建一个账号

```
useradd -m gituser
```

然后为这个账号设置密码
```
passwd gituser
```
如果输入过短会报错，但可以忽略。

## 初始化 git 仓库并配置用户权限

我们创建 /data/repositories 目录用于存放 git 仓库

```
mkdir -p /data/repositories

```
创建好后，初始化这个仓库
```
cd /data/repositories/ && git init --bare test.git
```

## 配置用户权限

给 git 仓库目录设置用户和用户组并设置权限

```
chown -R gituser:gituser /data/repositories
```

```
chmod 755 /data/repositories
```

查找git-shell目录

```
[root@host ~]# which git-shell
/usr/local/git/bin/git-shell
```

编辑 /etc/passwd 文件,将最后一行关于 gituser 的登录 shell 配置改为 git-shell 的目录

```
[root@host ~]# vim /etc/passwd
```
找到最后一行
```
gituser:x:500:500::/home/gituser:/bin/bash
```

修改为

```
gituser:x:500:500::/home/gituser:/usr/local/git/bin/git-shell
```

后面的目录替换为自己上面查到的的git-shell目录。

## 使用Git

到这里我们就已经完成安装了，可以在本地试一试clone仓库

```
$ git clone gituser@yourIP:/data/repositories/test.git
```
