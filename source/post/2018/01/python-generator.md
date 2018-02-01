---
title: Python Generator
category: Python
---

生成器（Generator）是Python语言中一个很独特的特性，生成器可以是一个函数，这个generator函数一定会包含`yield`语句，我们知道，在一般函数中，遇到return语句时就会终止执行返回结果，而在generator中，当for对一组可迭代项目进行迭代时，一旦generator函数运行到yield语句处就会停止执行，然后从项目中获取一个新值再从yield处继续执行。



### 生成器表达式

跟列表生成式一样，生成器也可以用类似表达式的形式写出来，只需要把`[]`改成`()`就可以创建一个generator。

```py
iterator = (i for i in range(3))
```

你可以使用`next()`函数来获取generator的下一个值，就像这样

```py
>>> next(iterator)
0
>>> next(iterator)
1
>>> next(iterator)
2
>>> next(iterator)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
```

当next()第一次被调用时，执行从函数体的开始处开始并继续，直到yield处返回结果，随后的调用next()从上次yield语句处继续到函数的结尾，直到没有值的时候就会抛出StopIteration错误。

但是事实上我们不可能一直调用next函数，如果要打印generator所有的值，可以使用for循环，就像这样

```py
>>> iterator = (i for i in range(3))
>>> for item in iterator:
...     print(item)
...
0
1
2
```

### generator函数

生成器表达式可以用来表达一些比较简单的迭代，但是遇到较复杂的条件就没办法写了，所以这个时候就可以用generator函数来表示比较复杂的逻辑关系。

比如斐波拉契数列，从第三个数开始每个数等于前两个数之和，如果用函数来表示我们可以这样写

```py
def fib(max):
    n, a, b = 0, 0, 1
    while n < max:
        print(b)
        a, b = b, a + b
        n = n + 1
    return 'done'
```

上面是一个一般函数，如果要把它变成generator函数我们只需要把输出语句print(b)改成yield语句即可，就像这样

```py
def gen_fib(max):
    n, a, b = 0, 0, 1
    while n < max:
        yield b
        a, b = b, a + b
        n = n + 1
    return 'done'
```

同样的，刚开始说过，一个函数包含了yield语句那它就是一个generator函数

```py
>>> fib(10)
1
1
2
3
5
8
13
21
34
55
'done'

>>> gen_fib(10)
<generator object gen_fib at 0x0000024A02DC5B48>

>>> f = gen_fib(10)
>>> next(f)
1
>>> next(f)
1
>>> next(f)
2
>>> next(f)
3
>>> next(f)
5
```