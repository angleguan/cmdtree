---
layout: post
date: 2017-11-02 15:41:31 +0800
title: "JavaScript数据结构与算法——什么是栈"
category: js
---


之前说到数组操作的时候有提到`push()`方法和`pop()`方法，他们分别可以往一个数组最后推送一个元素或者移除一个元素。而这两个方法其实就是对栈操作的两种主要操作

栈是一种常见的线性数据结构，栈内的元素只能从一端访问，如下图所示，进栈和出栈都是从一端进行，这一端叫做栈顶。


![](/pics/2017/11/Screenshot_20171102_142241.png)

因为栈结构只有一端能访问，所以你只能操作离栈顶最近的那个元素，这种数据结构被称为后入先出（LIFO）。

下图演示了使用`push()`方法和`pop()`方法操作栈的过程。


![](/pics/2017/11/Screenshot_20171102_142824.png)

push()方法表示进栈，pop()方法表示出栈。

## 实现一个栈

来简单实现一个栈吧

```
function Stack() {
    this.dataStore = [];
    this.top = 0;
    this.push = push;
    this.pop = pop;
    this.peek = peek;
}
```

定义一个构造函数，然后其中初始化一个空数组，top表示栈顶元素的位置，当有元素进入栈时就会代替top的位置，然后top加一。

声明一个实例，下面都用这个实例来演示：

```
var stack = new Stack()
```

然后实现一些方法：

#### 实现push方法


```
function push(element) {
    this.dataStore[this.top++] = element;
}
```

实现一个push方法用来往栈中加入元素，并将其储存在当前的top值的位置，然后再给top+1。

```
stack.push("good man")
stack.top       // 1
```

#### 实现pop方法

```
function pop() {
    return this.dataStore[--this.top];
}

```

实现pop方法来给top值-1，即移除栈顶元素并返回移除的这个值

看这个例子：

```
stack.pop()     // "good man"
stack.top       // 0
```

#### 实现peek方法

```
function peek() {
    return this.dataStore[this.top-1];
}
```

peek()方法用来**返回**栈顶元素，即栈的第top-1个元素，


```
stack.peek()    // undefined
```

因为现在stack是空的，没有元素，所有会返回undefined。



#### 实现clear方法

可以设置一个clear方法来把top设置为0，即清空栈内所有的元素。


```
function clear() {
    this.top = 0;
}
```


## 使用栈

栈的用处很多，这里写一个例子，判断一个字符串是否回文，我前两天有用c写了一个，下面用上面实现的那个栈来实现一遍。

```
function isPalindrome(word) {
    var s = new Stack();
    for (var i = 0; i < word.length; ++i) {
        s.push(word[i]);
    }
    var rword = "";
    while (s.top > 0) {
        rword += s.pop();
    }
    if (word == rword) {
        return (word + " is a palindrome.");
    }
    else {
        return (word + " is not a palindrome.");
    }
}
```

非常简单，只要把这个字符串依次放入一个栈中，再依次拿出来，按照栈的LIFO特性，拿出来的这个字符串就会是之前反转的字符串了，再一比较，完事。

```
> isPalindrome("mmm")
< "mmm is a palindrome."

> isPalindrome("good")
< "good is not a palindrome."
```




