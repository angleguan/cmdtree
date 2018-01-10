---
layout: post
date: 2018-1-10 10:28:52 +0800
title: JavaScript数据结构与算法——字典
category: js
---

`字典`是一种以键值对形式存在的数据格式，即`[key]: value`，在JS中可以很简单的使用`Object`类来实现字典。

## 实现一个字典

首先定义一个Dictionary类

```js
function Dictionary() {
  this.data = new Array();
}
```

在Dictionary类中要使用数组来进行储存，这样一来，数组的索引即为`key`值。

<!-- more -->

然后定义一些基本方法

#### 添加键值

```js
function add(key, value) {
  this.data[key] = value;
}
```

#### 查询值

```js
function find(key) {
  return this.data[key];
}
```

#### 删除值

```js
function remove(key) {
  delete this.data[key];
}
```

#### 返回字典长度

```js
function count() {
	var n = 0;
	for (key in this.data) {
		++n;
	}
	return(n);
}
```

#### 输出所有值

```js
function returnAll() {
  for(let key in Object.keys(this.data)) {
    return(key + "：" + this.data[key]);
  }
}
```

#### 对字典排序

可以使用原生的`sort()`对数组进行排序。

```js
function returnAll() {
  for(let key in Object.keys(this.data).sort()) {
    return(key + "：" + this.data[key]);
  }
}
```


#### 清空所有值

```js
function clear() {
  for (key in this.data) {
    delete this.data[key];
  }
}
```

## 完整代码

```js
function Dictionary() {
	this.data = new Array();
	this.add = add;
	this.find = find;
  this.remove = remove;
  this.count = count;
  this.returnAll = returnAll;
  this.clear = clear;
}

function add(key, value) {
	this.data[key] = value;
}

function find(key) {
	return this.data[key];
}

function remove(key) {
	delete this.data[key];
}

function count() {
	var n = 0;
	for (key in this.data) {
		++n;
	}
	return(n);
}

function returnAll() {
  for (key in this.data) {
    alert(key + " :" + this.data[key]);
  }
}

function clear() {
  for (key in this.data) {
    delete this.data[key];
  }
}
```
