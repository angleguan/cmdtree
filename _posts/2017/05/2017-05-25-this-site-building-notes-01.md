---
title: 本站搭建笔记(一)安装本地环境
date: 2017-05-25T08:31:27+00:00
layout: post
category: use
---

## 按照jekyll官网的方法在本地安装jekyll环境

此方法windows，linux，macos通用，前提是安装了ruby and nodejs

一. 安装jekyll bundler

```zsh
 $ gem install jekyll bundler
```
![]({{ site.pics }}/2017/05/QQscreenshot20170525141624.png)

安装完成可以查看一下版本号

![]({{ site.pics }}/2017/05/QQscreenshot20170525143858.png)

二. 新建一个jekyll文件夹

```zsh
$ jekyll new githubpages
```
![]({{ site.pics }}/2017/05/QQscreenshot20170525144615.png)

三. 进入该文件夹运行本地服务

```zsh
 $ cd githubpages
 $ bundle exec jekyll serve
 ```
![]({{ site.pics }}/2017/05/QQscreenshot20170525145106.png)

完成！  是不是很简单
