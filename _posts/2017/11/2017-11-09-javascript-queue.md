---
layout: post
date: 2017-11-09 10:14:53 +0800
title: JavaScript数据结构与算法——队列
category: js
---

之前说到栈是一种特殊的线性表，队列也是一种列表，与栈不同的是队列是一种FIFO（(First-In-First-Out,先进先出）的数据结构，而栈与之相反。

队列分为两端——队尾和对首，队列从队尾插入元素，从队首删除元素，可以理解成现实生活中的先到先得的道理，好似排队一样，后到的人只能排在队尾。

队列和栈一样，同样的两种重要操作就是插入元素和删除元素，队列还有一个操作就是读取队首的元素，即`peek()`方法，该方法返回位于队首的元素而不将其删除，如果想知道队列中有多少元素也可以通过查看length属性来知道。

## 使用数组实现一个队列

之前在数组操作中就提到`shift()`和`push()`方法，具体可以查看[JavaScript数据结构与算法——数组操作 - 樊志阳](https://fanzhiyang.com/blog/js-array-operation/)

首先定义一个构造函数：

```js
function Queue() {
    this.dataStore = [];
    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.front = front;
    this.back = back;
    this.toString = toString;
    this.empty = empty;
}
```

#### 实现enqueue方法

`enqueue()`方法用于往队列中添加元素

```
function enqueue(element) {
    this.dataStore.push(element);
}
```

#### 实现dequeue方法

`dequeue()`方法用于删除队列中的元素

```
function dequeue() {
    return this.dataStore.shift();
}
```

#### 返回队首或队尾的元素

定义如下方法用于返回队首或队尾的元素

```
function front() {
    return this.dataStore[0];
}
function back() {
    return this.dataStore[this.dataStore.length-1];
}
```