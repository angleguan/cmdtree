---
title: CSS3计算函数——calc
date: 2017-05-26T10:23:09+00:00
category: 学习笔记
---

calc是英文单词calculate(计算)的缩写，是css3的一个新增的功能，我们可以使用calc函数给任何长的值进行计算。

### calc的作用:

在进行页面布局时，尤其是在普遍使用响应式布局的今天，我们更多的不是使用传统的px长度值，而是使用百分比、em、rem等单位值。

在很多时候，我们只知道一个百分值，但其他值又是px之类的值，这就是难点，我们不可能去计算每次百分比的值到底是多少，但随着CSS3的出现，其中利用`box-sizing`来改变元素的盒模型类型实使实现效果，但今天我们学习的calc()方法更是方便。

语法说明:

```
calc()函数支持 "+", "-", "*", "/" 运算；
calc()函数使用标准的数学运算优先级规则；
需要注意的是，运算符前后都需要保留一个空格，例如：width: calc(100% - 10px)；
```

### 来看一个很简单的例子

```html
  <div class="wrapper">
    <div class="content">
    </div>
  </div>
```

然后我们向其添加CSS
```css
.wrapper {
  width: 300px;
  background: red;
}
.content {
  width: 100%;
  background: yellow;
  height: 50px;
}
```

这时的效果很简单，`content`完全遮住了`wrapper`。

![](/pics/2018/01/2101.png)

第二步，在content上添加`border`和`padding`

这一步很棘手的事情来了，在content上添加10px的内距padding，同时添加5px的border：

```css
.wrapper {
  width: 300px;
  background: red;
}
.content {
  width: 100%;
  background: yellow;
  height: 50px;
  padding: 10px;
  border: 5px solid green;
}
```

为了更加清楚直观的发现问题，我给wrapper上下加一个3px的内边距。

```css
.wrapper {
  width: 300px;
  background: red;
  padding: 3px 0;  
}
.content {
  width: 100%;
  background: yellow;
  height: 50px;
  padding: 10px;
  border: 5px solid green;
}
```

![](/pics/2018/01/2102.png)

我们发现，content的总长度（width+border+padding)超过了容器wrapper的长度，content出来了。

但是我们给content的width设定为100%是不想让他撑破父容器的，这个时候我们可以给content加个[box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing)，设定为`border-box`。

![](/pics/2018/01/2103.gif)

但是今天我们不谈这个，我们用calc去实现。

我们知道总宽度是100%，在这个基础上减去boder的宽度（5px * 2 = 10px），在减去padding的宽度（10px * 2 = 20px），即"100% - (10px + 5px) * 2 = 30px" ，最终得到的值就是content的width值：

```css
.wrapper {
  width: 300px;
  background: red;
  padding: 3px 0;
}
.content {
  background: yellow;
  height: 50px;
  padding: 10px;
  border: 5px solid green;
  width: 90%; /*写给不支持calc()的浏览器*/
  width:-moz-calc(100% - (10px + 5px) * 2);
  width:-webkit-calc(100% - (10px + 5px) * 2);
  width: calc(100% - (10px + 5px) * 2);
}
```

这样一来，通过calc()计算后，content不在会超出其容器wrapper的宽度.
