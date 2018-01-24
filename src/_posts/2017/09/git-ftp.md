---
title: 使用Git代替FTP管理虚拟主机文件
date: 2017-09-20 14:45:10 +0800
category: 使用笔记
---



如果我们把网站程序托管在虚拟主机中，我们都需要一款工具来管理主机中的源代码，一般我们都是使用FTP来管理，但是这种方式有很大的缺陷，例如当我们不知道哪些文件做了修改的时候，我们只能把全部文件都上传一遍，FTP协议每次只能传输一个文件，而且每次传输完之后又要再次握手，每次握手的时间比上传一个文件的时间都要长，如果要重新全部上传一个源码，对于大量的小文件来说，这种方式简直让人崩溃。

一般来说，大部分人都会使用Sync工具来进行传输，每次只传输变更的文件，但是这种方法还是感觉有点不方便。后来我了解到可以使用Git来进行传输，而且还拥有版本控制的功能，这样就不用担心操作失误，每次都可以进行回滚，确实很方便。

## git-ftp

这里是这个项目的地址：[git-ftp/git-ftp: Uses Git to upload only changed files to FTP servers.](https://github.com/git-ftp/git-ftp)


## 使用方法

一.首先你得有安装Git，这个就不多加阐述了。

二.安装git-ftp

１）对于所有的Unix/Linux系统，全都可以采用源代码安装，在[Releases · git-ftp/git-ftp](https://github.com/git-ftp/git-ftp/releases)下载最新的压缩包，解压然后

```
# make install
```

这样就安装好了

２）Windows系统，打开git安装目录，默认在`C:\Program Files (x86)\Git`，然后在安装目录下打开git bash输入：

```
curl https://raw.githubusercontent.com/git-ftp/git-ftp/master/git-ftp > /bin/git-ftp
chmod 755 /bin/git-ftp
```

３）Mac OS X

使用brew:


```
brew install git
brew install curl --with-ssl --with-libssh2
brew install git-ftp
```


检查是否安装成功：

```
$ git-ftp   
git-ftp <action> [<options>] <url>
```

三.初始化目录

首先需要初始化Git目录

```
$ git init
```

然后配置你的主机信息：

```
$ git config git-ftp.url "ftp://ftp.example.net:21/public_html"
$ git config git-ftp.user "ftp-user"
$ git config git-ftp.password "secr3t"
```


第一项是你主机的地址，一般如果购买的虚拟主机，就会是IP地址，端口可以省略，然后跟上你的目录路径

第二项是用户名

第三项密码


使用时跟平时使用git一样：

```
$ git add .
$ git commit -m "description"
```

**PUSH命令不同**

使用下面的命令推送代码：

```
$ git ftp push
```


这样就可以了！

是不是发现比使用FTP快多了，当然，git-ftp能做的肯定不止这些，想解锁更多新姿势可以查看
[git-ftp/git-ftp.1.md at master · git-ftp/git-ftp](https://github.com/git-ftp/git-ftp/blob/master/man/git-ftp.1.md)

或者输入
```
$ git-ftp -h
```

来查看帮助。