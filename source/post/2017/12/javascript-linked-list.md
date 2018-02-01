---
date: 2017-12-4 14:57:04 +0800
title: JavaScript数据结构与算法——链表
category: JavaScript
---

## 什么是链表

链表是一种非连续、非顺序的数据结构。数据结构的逻辑顺序是通过每个元素的指针指向下一个节点来实现的。对于很多数组是固定长度的编程语言来说，链表具有插入或删除更加快速的特点，而在JavaScript中，虽然不存在上述问题，但数组被实现成了对象，这样它的效率也会低很多



## 定义一个链表

链接是一组不连续的节点的集合，也就是说在内存中的地址不是连续的，所以如果想找到某一个节点，则必须先找到上一个节点。“上一个”节点的`next`属性就指向“下一个”节点，最后一个节点的next属性为null。

为了更好的识别出起始节点，许多链接都在链表的最前面特地定义一个`头节点`。

当需要向链表中添加元素时：只要把要添加元素的位置的“上一个”节点的next属性指向新元素，然后将新元素的next属性指向原先要添加元素的位置的“下一个”节点即可。

当需要删除一个元素时：只需要将要删除的元素的“上一个”节点的next属性指向要删除的元素的“下一个”节点，再将要删除的元素的next属性改为null即可。

### Node类

首先需要定义一个用来表示节点的类。

```js
function Node(element) {
    this.element = element;
    this.next = null;
}
```

`element`属性用来保存节点上的数据，`next`属性设为null，当要添加元素的时候再修改即可

### 查找节点

之前说过，链表不是连续的，想要查找一个节点就必须要先找到它的上一个节点。所以我们需要先定义一个`find()`方法来查找节点，然后返回这个节点的信息。

具体做法就是先声明一个新的节点，然后将待查找的链表的头节点赋给这个新建的节点，然后这个新声明的节点就具有要查找的链表的头节点的next属性，然后在这个链表上循环找到要查找的节点返回即可。

```js
function find(item) {
    var currNode = this.head;
    while (currNode.element != item) {
        currNode = currNode.next;
    }
    return currNode;
}
```

### 添加节点

使用之前定义的`find()`方法找到节点后，再声明一个`insert()`方法，该方法接受两个参数，要插入的节点的内容和插入的地方（即“上一个”节点）。找到要插入的地方后，把新节点的next属性设为原“下一个”节点的属性，再将原“上一个”节点的next属性指向新节点。

```js
function insert(newElement, item) {
    var newNode = new Node(newElement);
    var current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
}
```

### 删除节点

之前说过，在链表中删除一个节点也很简单，只要找到待删除节点的“上一个”节点，然后将这个节点的next属性改为待删除节点的“下一个”节点，再将这个要删除的节点的next属性改为null即可。

所以我们先要定义一个方法来查找要删除节点的“上一个”节点，然后返回此节点：

```js
function findPrevious(item) {
    var currNode = this.head;
    while (!(currNode.next == null) &&
        (currNode.next.element != item)) {
        currNode = currNode.next;
    }
    return currNode;
}
```

接着写`remove()`方法，只需要把用`findPrevious()`方法找到的节点的next属性改为待删除的节点的“下一个”节点即可

```js
function remove(item) {
    var prevNode = this.findPrevious(item);
    if (!(prevNode.next == null)) {
        prevNode.next = prevNode.next.next;
    }
}
```

## 构造函数

然后可以声明一个构造函数来方便的使用这些方法

```js
function LList() {
    this.head = new Node("head");
    this.find = find;
    this.insert = insert;
    this.findPrevious = findPrevious;
    this.remove = remove;
}
```

至此，我们可以很简单的创建一个链表了

```js
var newLList = new LList();
```

