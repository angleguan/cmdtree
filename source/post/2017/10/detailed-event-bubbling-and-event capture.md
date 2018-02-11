---
title: 理解事件冒泡与事件捕获
date: 2017-10-28 08:58:06
category: JavaScript
---



> 当一个元素嵌套了另一个元素，两个元素都对同一个事件注册了一个处理函数时，所发生的事件冒泡和事件捕获是两种不同的事件传播方式。事件传播模式决定了元素以哪个顺序接收事件。


# 事件冒泡

看下面这个例子：

```
    <div id="btn1">
        <div id="btn2">
            <div id="btn3">
                hello world!
            </div>
        </div>
    </div>
    <script type="text/javascript">
        document.getElementById('btn1').addEventListener("click", function () {
            console.log("这是btn1")
        })
        document.getElementById('btn2').addEventListener("click", function () {
            console.log("这是btn2")
        })
        document.getElementById('btn3').addEventListener("click", function () {
            console.log("这是btn3")
        })
    </script>
```

当hello world被点击时，控制台输出的信息是这样的：

![](/pics/2017/10/2801.png)

这些被按照`自下而上`的顺序依次触发，从子元素依次触发到父元素（直到document对象，有些浏览器则一直冒泡到window对象），这有点像在水中冒泡泡一样，从下面慢慢到上面，所以这叫做事件冒泡。

![](/pics/2017/10/2807.png)


## 阻止事件冒泡

#### (1)、stopPropagation

可以在触发函数中添加`stopPropagation()`方法来阻止事件冒泡，例如上面的代码中，我们只想让当hello World被点击时触发btn3的事件监听

```
    document.getElementById('btn3').addEventListener("click", function (event) {
        event.stopPropagation();
        console.log("这是btn3")
    })
```

传入事件参数，触发`stopPropagation()`方法，然后看看控制台


![](/pics/2017/10/2802.png)

无论点击多少次都只会触发一个事件，即在遍历到第一个监听时就停止了遍历。

如果添加到第二个（btn2）事件监听上，


```
    document.getElementById('btn2').addEventListener("click", function (event) {
        event.stopPropagation();
        console.log("这是btn2")
    })
```


![](/pics/2017/10/2803.png)

同样的，向上冒泡到第二个事件就停止了。

#### (2)、cancelBubble

顾名思义，取消冒泡，同样是上面那个例子，我们可以这样写

```
    document.getElementById('btn3').addEventListener("click", function (event) {
        event.cancelBubble = true;
        console.log("这是btn3")
    })
```

同样也会达到只会触发btn3一个事件的效果

#### (3)、cancelBubble和stopPropagation()的区别

**二者实现的效果是一样的**，唯一的区别是在兼容性上面，cancelBubble的设计初衷是用在IE上面，下面是MDN文档中的兼容性列表


![](/pics/2017/10/2804.png)


以及在whatwg下的issue，[cancelBubble legacy property · Issue #211 · whatwg/dom](https://github.com/whatwg/dom/issues/211)，有兴趣的可以去了解一下

说白了是个历史遗留问题，貌似在除了Firefox之外的浏览器都能正常使用


# 事件捕获

同样是上面的代码，`addEventListener()`其实接受三个参数`type`、`listener`和`useCapture`。

`useCapture`接受一个布尔值，默认为`false`,


当`useCapture`为`true`时，事件只捕获，不冒泡。

```
    <div id="btn1">
        <div id="btn2">
            <div id="btn3">
                hello world!
            </div>
        </div>
    </div>
    <script type="text/javascript">
        document.getElementById('btn1').addEventListener("click", function () {
            console.log("这是btn1")
        },true)
        document.getElementById('btn2').addEventListener("click", function () {
            console.log("这是btn2")
        },true)
        document.getElementById('btn3').addEventListener("click", function () {
            console.log("这是btn3")
        },true)
    </script>
```


![](/pics/2017/10/2806.png)

上面的代码点击时是这样的，事件从document对象（DOM2级规范规定，也有从window对象）一个个节点的遍历下来。


![](/pics/2017/10/2805.png)

> IE8不支持useCapture，详情参考[EventTarget.addEventListener() - Web API 接口](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

因为老版本浏览器不支持，很少人会使用事件捕获，大部分情况下使用事件冒泡，有特殊情况下才会考虑使用事件捕获。