---
title: 更改RubyGems源
date: 2017-05-22T22:09:23+00:00
layout: post
category: use
---

# 一、删除默认源

因为国内原因，访问默认源很慢，有时会出现等半天还安装失败的问题，所以我们通常修改为国内源，首先需要删除默认源。
```bash
gem source --remove https://rubygems.org/
```

# 二、更改为Ruby China的源

**以前我们经常修改为淘宝的源，但现在淘宝已经宣称不再维护此项目了，转而交由Ruby China负责**
```bash
$ gem sources --add https://gems.ruby-china.org/
$ gem sources -l
*** CURRENT SOURCES ***
https://gems.ruby-china.org
# 请确保只有 gems.ruby-china.org
```


但是其中出现了一个小插曲，

报错如下

```bash
SSL_connect returned=1 errno=0 state=error: certificate verify failed (https://gems.ruby-china.org/specs.4.8.gz)
```
google了一下得到的最直接的解决方法是使用http

故
![]({{ site.pics }}/2017/06/QQscreenshot20170622222624.png)

也有说法是因为国内源没有ssl证书，需要自己下载证书配置

其实刚开始还有个报错
```bash
source http://rubygems.org/ not present in cache
```
google了一下（发现已经成习惯了，一看就error就google，其实是remove命令写错了-_-!

https写成https了。

（完）
