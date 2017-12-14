---
title: 闭包引起的内存泄漏
date: 2017-07-24T22:16:55+00:00
layout: post
category: js
---
# 什么是内存泄漏

> 内存泄漏（Memory Leak）是指程序中己动态分配的堆内存由于某种原因程序未释放或无法释放，造成系统内存的浪费，导致程序运行速度减慢甚至系统崩溃等严重后果。

我们可以这样理解，内存泄漏就是内存被非法占用。而不是非得无限增加的内存占用。

# 闭包产生的内存泄漏

```js
function assignHandler () {
  var element = document.getElementById('someElement');
  element.onclick = function () {
    alert(element.id);
  };
}
```

以上代码创建了一个作为element 元素事件处理程序的闭包，而这个闭包则又创建了一个循环引用。由于匿名函数保存了一个对assignHandler()的活动对象的引用，因此就会导致无法减少element 的引用数。只要匿名函数存在，element 的引用数至少也是1，因此它所占用的内存就永远不会被回收。

而《JavaScript高级程序设计》一书对此建议的解决办法是把`element.id`的一个副本保存在一个变量中，从而消除闭包中该变量的循环引用同时将element变量设为null。

```js
function assignHandler () {
  var element = document.getElementById('someElement');
  var id = element.id;
  element.onclick = function () {
    alert(id);
  };
  element = null;
}
```

那么问题来了

## 闭包是否真的会造成内存泄漏呢？

局部变量本来应该在函数退出的时候被解除引用，但如果局部变量被封闭在闭包形成的环境中，那么这个局部变量就能一直生存下去。从这个意义上看，闭包的确会使一些数据无法被及时销毁。使用闭包的一部分原因是我们选择主动把一些变量封存在闭包中，因为可能在以后还需要使用这些变量，把这些变量放在闭包中和放在全局作用域，对内存方面的影响是一致的，这里并不能说成是内存泄露。如果在将来需要回收这些变量，我们可以手动把这些变量设为null。

跟闭包和内存泄露有关系的地方是，使用闭包的同时比较容易形成循环引用，如果闭包的作用域链中保存着一些DOM节点，这时候就有可能造成内存泄露。但这本身并非闭包的问题，也并非JavaScript的问题。在IE浏览器中，由于BOM和DOM中的对象是使用C++以COM对象的方式实现的，而COM对象的垃圾收集机制采用的是引用计数策略。在基于引用计数策略的垃圾回收机制中，如果两个对象之间形成了循环引用，那么这两个对象都无法被回收，但循环引用造成的内存泄露在本质上也不是闭包造成的。

Javascript 的垃圾回收机制，我现在知道的有两种：标记、计数。

而刚才提及的闭包中产生内存泄漏的原因就是计数机制，**只要匿名函数存在，element 的引用数至少也是1**。

但是我们不得不提及的是，传统闭包中的内存泄漏要满足的条件：

1.在闭包中且循环引用

2.IE 9 之前的版本

IE 9 之前的版本是在环境中bom和dom不是原生的js对象，而是com对象，而com对象的垃圾收集机制是引用计数策略。换句话说，只要ie中存在着com对象，就会存在循环引用的问题。比如

```js
var element=document.getElementById("someElement");
var myobject=new Object();
myobject.element=element;
element.someObject=myobject;
```

这个例子中js对象和dom对象之间建立了循环引用，由于存在这个循环引用，即使将com对象从页面移除，也永远不会被回收。为避免类似问题，应该在不使用它们的时候手动把js对象和com对象断开。

```js
myobject.element=null;
element.someObject=null;
```
 
ie9之前的浏览器对javascript对象和com对象使用不用的垃圾收集机制，因此闭包在ie的这些版本中就会导致上面的一些问题。而具体的解决办法就是取消循环引用并置空引用的html元素就可有效避免。

