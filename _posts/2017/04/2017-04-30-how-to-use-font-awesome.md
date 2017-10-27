---
title: 如何在自己网站中使用Fontawesome的图标
date: 2017-04-30T09:08:26+00:00
layout: post
category: use
---
Font Awesome, 是一款风靡全球的图标字体库和CSS框架,结合Bootstrap使用,可制作出炫酷屌炸天的响应式网站,最新版<em>Font Awesome</em> 4.7。

此项目也开源在Github <a href="https://github.com/FortAwesome/Font-Awesome">Font-Awesome</a>

现在我们讲讲如何在自己的网站中引用Font-Awesome的图标.

一.首先上<a href="http://fontawesome.io/">Font-Awesome</a>的官方网站下载的源文件,当然还有其他的方法是引用外链,这种方法我是不建议的也就不提了

二.下载好文件后解压缩,里面的文件放在网站源码中

三.在`<head>`中引用Fontawesome的css文件夹中的font-awesome.min.css文件

四,在font-awesome的官网可以查找到是否有你所想要的图标,使用`<i></i>`标签引用图标即可.



补充一下如果图标太小如何在改变图标尺寸
```html
<i class="fa fa-address-book" aria-hidden="true"></i>
```
譬如这个图标太小了,我们在其class的末尾加上fa-2x就会放大两倍,2,3.4倍亦是如此
```html
<i class="fa fa-address-book fa-2x" aria-hidden="true"></i>
```
