---
title: 如何在自己的网页中使用阿里图标iconfont
date: 2017-07-04T22:18:15+00:00
layout: post
category: use
---
# 一、打开iconfont官网并将图标加入项目

打开[iconfont官网](http://iconfont.cn)

![](/pics/2017/07/TIMscreenshot20170704093102.png)

在搜索框输入要查找的图标

![](/pics/2017/07/TIMscreenshot20170704093138.png)

将鼠标移至图标上方点击 ‘添加入库’

然后在网站右上方点击购物车

![](/pics/2017/07/TIMscreenshot20170704093218.png)

打开购物车看到添加的图标，选择添加至项目

![](/pics/2017/07/TIMscreenshot20170704093246.png)

新建一个项目并添加

![](/pics/2017/07/TIMscreenshot20170704093420.png)

# 二、引用样式并应用

然后就可以在‘我的图标’中看到‘我的项目’

![](/pics/2017/07/TIMscreenshot20170704093439.png)

点击生成代码

![](/pics/2017/07/TIMscreenshot20170704093521.png)

然后就可以看到生成的字体CDN代码，复制代码，粘贴在自己的css文件中

![](/pics/2017/07/TIMscreenshot20170704093747.png)


接着回到‘我的项目’中，鼠标移至图标上方选择复制代码

然后就会得到一个代码

```

```

在自己的css文件中设置iconfont类样式

```css
.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

使用`<i>`标签引用图标
```css
<i class="iconfont"></i>
```

将刚才复制的图标代码替换进去

# 三、修改项目中图标

使用项目管理图标的好处在于我们可以随时方便的修改图标

![](/pics/2017/07/TIMscreenshot20170704095640.png)

我们可以修改大小，颜色，位置等信息

![](/pics/2017/07/TIMscreenshot20170704095840.png)

但是每次修改完必须要重新更换一次引用的CDN文件

![](/pics/2017/07/TIMscreenshot20170704095932.png)

点击更新代码后，再次引用即可


（完）
