---
date: 2017-09-14 21:14:48 +0800
title: "Linux mint的字体配置"
category: Unix/Linux
---

Linux mint是一款非常优秀的发行版，常年稳居distorwatch排行第一名，但是默认在安装之后是楷体字，比较难看的，这里说一下怎么安装文泉译黑字体和配置字体修复还会显示部分楷体字。

首先在【设置】【语言设置】中把中文包全部安装全（默认所有包都是不全的）。


```
sudo apt-get install language-pack-zh-hans language-pack-gnome-zh-hans libreoffice-l10n-zh-cn thunderbird-locale-zh-hans firefox-locale-zh-hans

sudo apt-get install language-selector-*
```
然后编辑` /var/lib/locales/supported.d/local`文件，加入如下内容

```
en_US.UTF-8 UTF-8
zh_CN.UTF-8 UTF-8
zh_CN.GBK GBK
zh_CN GB2312
zh_CN.GB18030 GB18030
zh_CN.GBK GBK
zh_HK BIG5-HKSCS
zh_HK.UTF-8 UTF-8
zh_SG GB2312
zh_SG.GBK GBK
zh_SG.UTF-8 UTF-8
zh_TW BIG5
zh_TW.EUC-TW EUC-TW
zh_TW.UTF-8 UTF-8
```

然后运行`sudo locale-gen`




接着删除自带的楷体字：
```
# rm -f /usr/share/fonts/truetype/arphic/*
```

注销登录即可！