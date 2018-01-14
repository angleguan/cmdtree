---
title: CSS3计算函数——calc
date: 2017-05-26T10:23:09+00:00
category: 学习笔记
---


calc是英文单词calculate(计算)的缩写，是css3的一个新增的功能，我们可以使用calc函数给任何长的值进行计算。

### calc的作用:

在进行页面布局时，尤其是在普遍使用响应式布局的今天，我们更多的不是使用传统的px长度值，而是使用百分比，em等单位值。

在很多时候，我们只知道一个百分值，但其他值又是px之类的值，这就是难点，我们不可能去计算每次百分比的值到底是多少，但随着CSS3的出现，其中利用box-sizing来改变元素的盒模型类型实使实现效果，但今天我们学习的calc()方法更是方便。

语法说明:
    
    calc()函数支持 "+", "-", "*", "/" 运算；
    calc()函数使用标准的数学运算优先级规则；
    需要注意的是，运算符前后都需要保留一个空格，例如：width: calc(100% - 10px)；
    
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
    background: #60f;
}
.content {
    width: 100%;
    background: #f60;
    height: 50px;
}
```

这时的效果很简单，content完全遮住了wrapper

第二步，在content上添加border和padding

这一步很棘手的事情来了，在content上添加10px的内距padding，同时添加5px的border：
```css
.wrapper {
    width: 300px;
    background: #60f;
}
.content {
    width: 100%;
    background: #f60;
    height: 50px;
    padding: 10px;
    border: 5px solid green;
}
```

为了更好的说明问题，我在div.demo上添加了一个padding：3px 0;

```css
.wrapper {
    width: 300px;
    background: #60f;
    padding: 3px 0;    
}
.content {
    width: 100%;
    background: #f60;
    height: 50px;
    padding: 10px;
    border: 5px solid green;
}
```

这个时候大家不知道能否想到问题会发生在哪？其实很简单，这个时候content的宽度大于了其容器wrapper的总宽度，从而撑破容器伸出来了

为了解决撑破容器的问题，以前我们只能去计算content的宽度，用容器宽度减去padding和border的值，但有时候，我们苦于不知道元素的总宽度，比如说是自适应的布局，只知道一个百分值，但其他的值又是px之类的值，这就是难点，死卡住了。随着CSS3的出现，其中利用box-sizing来改变元素的盒模型类型实使实现效果，但今天我们学习的calc()方法更是方便。

知道总宽度是100%，在这个基础上减去boder的宽度（5px * 2 = 10px）,在减去padding的宽度（10px * 2 = 20px），即"100% - (10px + 5px) * 2 = 30px" ，最终得到的值就是content的width值：

```css
.wrapper {
    width: 300px;
    background: #60f;
    padding: 3px 0;
}
.content {
    background: #f60;
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


经过此例的学习，大家是不是会觉得使用calc()用于自适应布局是超爽的呀.
