---
title: Python中的赋值和深浅拷贝
date: 2017-08-17T14:12:00+00:00
layout: post
category: learn
---

python中，`A object  = B object` 是一种赋值操作，赋的值不是一个对象在内存中的空间，而只是这个对象在内存中的位置。

此时当B对象里面的内容发生更改的时候，A对象也自然而然的会跟着更改。

```py
name = ["root","admin"]
cp_name = name  # 对cp_name进行赋值操作

# 对name列表进行插入
name.append('root_temp')
print(name,cp_name) # ['root', 'admin', 'root_temp'] ['root', 'admin', 'root_temp']
print(id(name),id(cp_name)) # 23991960 23991960 
```
 

而想要进行浅拷贝或者深拷贝，就需要引入copy模块 。

首先来说下浅拷贝，当进行浅拷贝时，使用`copy.copy`方法。

```py
import copy
name = ["root","admin"]
# 进行浅拷贝操作
cp_name = copy.copy(name)
# 查看cp_name,name
print(name,cp_name) # ['root', 'admin'] ['root', 'admin'] 拷贝成功
#查看地址
print(id(name),id(cp_name)) # 21146920 21147160 内存地址并不相同
# 尝试对name进行更改
name.append('root_temp')
# 查看cp_name是否更改
print(cp_name) # ['root', 'admin'] 内容并没有更改
```
 

`A = copy.copy(B)` 此时A对象相当于把B对象中的内容给完成的拷贝了一份，存储在了一份新的内存地址当中。

其中有一点需要注意，如下：

```py
import copy

name = ['root','admin',['root_temp','admin_temp']]
cp_name = copy.copy(name)
# 查看两个对象的地址
print(id(name),id(cp_name)) # 24358504 24428952 二者的地址并不相同
# 对name 进行更改
name.append('test')
# 查看cp_name是否更改
print(cp_name) # ['root', 'admin', ['root_temp', 'admin_temp']] cp_name并未更改
# 在来对name中的列表对象进行更改
name[2].append('ttttt')
print(cp_name) # ['root', 'admin', ['root_temp', 'admin_temp', 'ttttt']] 发现cp_name内容发生了变化
```

在上面的代码中，通过copy.copy()方法把name对象浅拷贝给了cp_name，此时二者的内容相同，但是地址不同，说明通过浅拷贝后，`cp_name`相当于重新开辟了一块内存空间用来存储拷贝过来的内容。所以说，当`name.append()`第一次插入值的时候，cp_name对象没有变化，因为`cp_name`和`name`处于两个不同的内存空间，是独立的。

而浅拷贝的问题在于，只能够拷贝第一层的内容，至于说第二层以及第三层或者第n层，对于浅拷贝来说都是无能为力的，只能简单的拷贝一份内存地址。

所以说，对于name这个对象中，列表第一层发生更改，是不会影响`cp_name`的，而一旦更改了第二层或者第n层的内容，`cp_name`都会被影响，因为此时的`cp_name`对象里面子列表是与name的子列表共享相同的内存空间。

而如果想要对第一层以及第二层甚至第n层都进行彻底的拷贝，那么就需要使用深层拷贝。

深层拷贝需要使用copy模块的`deepcopy()`方法。

```py
import copy

name = ['root','admin',['root_temp','admin_temp']]
cp_name = copy.deepcopy(name)
# 查看二者的id
print(id(name),id(cp_name)) # 29863528 29933976 地址不同，说明开辟了处于两块不同的空间
# 对name 第一层以及第二层进行更改
name.append('t1')
name[2].append('t2')
# 查看cp_name是否内容发生变化
print(cp_name) # ['root', 'admin', ['root_temp', 'admin_temp']] 内容并未发生更改  
```

此时，cp_name对象并不会被name所影响，无论name对象的第一层列表还是第n层的更改和变化，都不会影响`cp_name`，因为此时通过深层拷贝，两个对象已经完全的处于两个不同的独立内存空间，而这也就是深层拷贝。
