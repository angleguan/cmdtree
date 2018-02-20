---
title: Python iterable、iterator、iter() 
category: Python
date: 2018-2-20 20:29:16
---

## Iterable（可迭代对象）

在python中，如果可以用for循环来遍历的对象称为`可迭代对象(iterable)`。

我们可以使用内置函数`isinstance()`来判断一个对象是否为可迭代对象。

> isinstance函数接受两个参数，第一个是要判断的对象，第二个是要判断的类型。与JavaScript中的instanceof运算符相似。

```py
>>> isinstance([], Iterable)
True
>>> isinstance({}, Iterable)
True
>>> isinstance(100, Iterable)
False
```

## Iterator（迭代器）

之前那篇关于生成器的文章讲过，python生成器可以被`next()`函数调用返回值直到没有值时抛StopIteration错误就会结束。

所以对于迭代器的理解就是：可以通过`next()`函数不断调用的对象就是迭代器。

同上，也可以使用`isinstance()`函数判断对象是否为迭代器。

```py
>>> isinstance((x for x in range(10)), Iterator)
True
>>> isinstance([], Iterator)
False
>>> isinstance({}, Iterator)
False
```

所以像列表（list），字符串（str）等只是可迭代对象却不是迭代器。

## iter()

`iter()`函数时一个可以将可迭代对象生成为迭代器的函数。

语法：

```py
iter(object[, sentinel])
```

例如：

```py
>>> l = [1,2,3]
>>> i = iter(l)
>>> isinstance(i, Iterator)
True
```
