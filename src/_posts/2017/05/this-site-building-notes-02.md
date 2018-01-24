---
title: 本站搭建笔记(二)修改默认主题
date: 2017-05-25T15:31:21+00:00
category: 使用笔记
---
## 自定义默认minima主题

jekyll是一个非常受欢迎的静态博客生成程序，它的主题也是非常的多，有兴趣的同学可以到[jekylltheme](http://jekyllthemes.org)上查看。

使用jekyll自动生成的站点默认使用minima主题，相关内容我们可以在文件夹下的Gemfile.lock文件中查看的到

> DEPENDENCIES<br/>
  jekyll (= 3.4.3)<br/>
  jekyll-feed (~> 0.6)<br/>
  minima (~> 2.0)<br/>
  tzinfo-data<br/>

**关于如何修改默认主题，在[jekyll.com](https://jekyllrb.com/docs/themes/#overriding-theme-defaults)中有说明**

这里补充一下 

- 在本地查找主题文件

> Run bundle show followed by the name of the theme’s gem, e.g., bundle show minima for default Jekyll’s theme.
  
> This returns the location of the gem-based theme files. For example, Minima theme’s files are located in /usr/local/lib/ruby/gems/2.3.0/gems/minima-2.1.0 on macOS.

这里的`bundle show minima`需要在当前的jekyll站点文件夹下执行才可以得到返回信息
