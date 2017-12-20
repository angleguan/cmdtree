---
title: "命名为USERNAME.github.io的Github Pages库如何更改名称"
category: 使用笔记
layout: post
date: 2017-11-13 09:33:10 +0800
---

使用Github Pages的仓库是可以随意命名的，如果想用github提供的二级域名（USERNAME.github.io），就要命名为那种格式，比如我一开始就是使用那种格式命令的，但是到后面我自己绑定了域名，又想更改仓库名，发现其它使用Pages的仓库可以更改，USERNAME.github.io格式改了名称，Pages就访问不了了。

解决办法是先把USERNAME.github.io仓库更名为blog（其它名称），再创建一个USERNAME.github.io库，然后blog库就可以使用Pages了，然后再删除USERNAME.github.io库就行了。