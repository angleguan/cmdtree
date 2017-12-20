---
layout: post
date: 2017-12-8 13:57:29 +0800
title: "SCSS @extend与@mixin"
category: 学习笔记
---

## @extend

`@extend`可以让一个样式包含另一个样式，就是可以让选择器继承另一个选择器下的所有样式。让原本需要设置多个class的标签只需要设置一个class

简单演示：

```scss
.class1 {
    color: red;
}

.class2 {
    @extend .class1;
    font-size: 16px;
}
```
<!-- more -->


编译出来的结果为：

```css
.class1, .class2 {
  color: red; }

.class2 {
  font-size: 16px; }

```

这样一来，比如原来需要这样写的html

```html
<div class="class1 class2"></div>
```

就可以这样写了

```html
<div class="class2"></div>
```

### 其它选择器

所有的选择器都可以使用extend进行继承

比如`:hover`:

```scss
a {
    color: #000;
    &:hover {
        text-decoration: underline;
    }
}

.link {
    @extend a:hover;
    font-weight: bold;
}

```


编译结果为：

```css
a {
  color: #000; }
  a:hover, .link {
    text-decoration: underline; }

.link {
  font-weight: bold; }

```

### 多重继承

一个选择器可以继承多个其它选择器的所有样式，如：

```scss
.class3 {
    @extend .class1;
    @extend .class2;
    font-weight: bold;
}
```

编译结果为：


```css
.class1, .class2, .class3 {
  color: red; }

.class2, .class3 {
  font-size: 16px; }

.class3 {
  font-weight: bold; }

```

### 延续继承

当一个选择器继承一个选择器时，那个选择器所继承的选择器也会一同继承，如

```scss
.class1 {
    color: red;
}

.class2 {
    @extend .class1;
    font-size: 16px;
}

.class3 {
    @extend .class2;
    font-weight: bold;
}
```

结果依然是：

```css
.class1, .class2, .class3 {
  color: red; }

.class2, .class3 {
  font-size: 16px; }

.class3 {
  font-weight: bold; }

```


## @mixin

`@mixin`为混合定义指定，使用时需要先定义样式，如：

```scss
@mixin media-query($device) {
  @media screen and (max-width: $device) {
    @content;
  }
}
```

使用时需要使用`@include`引用：

```scss
.class4 {
    @include media-query(800px) {
        width: 85%;
    }
}
```

上面的例子中使用了参数和`@content`，`@mixin`允许使用参数，还可以设置多个参数即缺省值，如：

```scss
@mixin sexy-border($color, $width) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}

p {
    @include sexy-border(blue, 1in); 
}
```

```scss
// 为参数指定缺省值
@mixin left($value: 10px) {
    float: left;
    margin-right: $value;
}
```

`@content`用于添加混合样式，在`@include`中出现的其它样式将会出现在@content的位置。


更多内容可以浏览[Sass教程 Sass中文文档](https://www.sass.hk/docs/)