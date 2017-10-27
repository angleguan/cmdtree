---
layout: post
date: 2017-09-23 14:51:31+ 0800
title: "JS中的设备事件 —— deviceorientation、orientation、devicemotion"
category: js
---

智能手机和平板电脑的诞生，为用户与浏览器的交互带来了一种新的方式，一系列新的特性随之诞生。**设备事件**让开发人员可以确定用户是在怎样的使用设备，W3C从2011年开始便在制定一份新的关于设备的草案，为不同的设备定义相关的事件。

## orientationchange事件

`orientationchange`事件是苹果公司发布的用于检测iOS设备是以哪种方式来浏览设备的一种事件，移动Safari的`window.orientation`属性可能包含3个值：

- 0表示肖像模式
- 90表示向左旋转的横向模式
- -90表示向右旋转的横向模式

![]({{ site.pics }}/2017/09/2301.png)

只要用户改变了设备的查看模式,就会触发 orientationchange 事件。此时的 event 对象不包
含任何有价值的信息,因为唯一相关的信息可以通过 window.orientation 访问到。下面是使用这个
事件的典型示例。

```js
EventUtil.addHandler(window, "load", function (event) {
    var div = document.getElementById("myDiv");
    div.innerHTML = "Current orientation is " + window.orientation;
    EventUtil.addHandler(window, "orientationchange", function (event) {
        div.innerHTML = "Current orientation is " + window.orientation;
    });
});
```

在这个例子中,当触发 load 事件时会显示最初的方向信息。然后,添加了处理 `orientationchange`
事件的处理程序。只要发生这个事件,就会有表示新方向的信息更新页面中的消息。


## MozOrientation 事件

Firefox 3.6 为检测设备的方向引入了一个名为 `MozOrientation` 的新事件。当设备的加速计检测到设备方向改变时,就会触发这个事件。但这个事件与 iOS 中的 orientationchange 事件不同,该事件只能提供一个平面的方向变化。由于 MozOrientation 事件是在 window 对象上触发的,所以可以使用以下代码来处理。

```js

EventUtil.addHandler(window, "MozOrientation", function(event){
//响应事件
});
```

此时的 event 对象包含三个属性: x 、 y 和 z 。这几个属性的值都介于 1 到-1 之间,表示不同坐标轴上的方向。在静止状态下, x 值为 0, y 值为 0, z 值为 1(表示设备处于竖直状态)。

```
x表示设备倾斜度：
设备右倾:  x 值会减小
向左倾斜:  x 值会增大

y表示设备离用户远近：
设备向远离用户的方向倾斜:  y 值会减小
向接近用户的方向倾斜, y 值会增大

z 轴检测垂直加速度度:
1 表示静止不动,在设备移动时值会减小
失重状态下值为 0。

```


以下是输出这三个值的一个简单的例子。

```js
EventUtil.addHandler(window, "MozOrientation", function (event) {
    var output = document.getElementById("output");
    output.innerHTML = "X=" + event.x + ", Y=" + event.y + ", Z=" + event.z + "<br>";
});
```

只有带加速计的设备才支持 MozOrientation 事件,包括 Macbook、Thinkpad、Windows
Mobile 和 Android 设备。






## deviceorientation 事件

`deviceorientation`事件与`MozOrientation`事件类似，也是检测设备设备方向变化。但是deviceorientation事件的意图是告诉开发人员设备在空间中朝向哪儿,而不是如何移动。

目前这种功能用的较广泛的就是在各种的摇一摇功能里，如微信中的摇一摇找好友，QQ音乐中的摇一摇换歌等。它们都是利用了手机加速传感器提供的API，当监听到手机加速变化的事件时，根据获取的加速值来执行不同的动作。

设备在三维空间中是靠x、y和z轴来定位的。当设备静止放在水平表面上时,这三个值都是0。


- 东（X）在地面上，垂直于北轴，向东为正。
- 北（Y）在地面上，向正北为正（指向北极）。
- 上（Z）垂直于地面，向上为正。

![]({{ site.pics }}/2017/09/2302.png)


对于一个移动设备，例如电话或平板，设备坐标系的定义于屏幕的标准方向相关。这意味着类似于键盘的滑动元素没有展开、类似于显示器的选择元素折叠至其默认位置。如果在设备旋转或展开滑动键盘时屏幕方向发生变化，这不会影响关于设备的坐标系的方向。用户希望获得这些屏幕方向的变化可以使用现有的`orientationchange`事件。对于膝上电脑，设备的坐标系定义于集成键盘。

- x在屏幕或键盘平面上，屏幕或键盘的右侧为正。
- y在屏幕或键盘屏幕上，屏幕或键盘的上方为正。
- z垂直于屏幕或键盘屏幕，离开屏幕或键盘为正。

从地球坐标系到设备坐标系的转变必须按照下列系统转换。

*旋转必须使用右手规则，即正向沿一个轴旋转为从该轴的方向看顺时针旋转。从两个系重合开始，旋转应用下列规则：*

- 以设备坐标系z轴为轴，旋转alpha度。alpha的作用域为[0, 360)。
- 以设备坐标系x轴为轴，旋转beta度。beta的作用域为[-180, 180)。
- 已设备坐标系y轴为轴，旋转gamma度。gamma的作用域为[-90, 90)。

触发 deviceorientation 事件时,事件对象中包含着每个轴相对于设备静止状态下发生变化的信
息。事件对象包含以下 5 个属性。


- alpha:在围绕 z 轴旋转时(即左右旋转时),y 轴的度数差;是一个介于 0 到 360 之间的浮点数。
- beta:在围绕 x 轴旋转时(即前后旋转时), z 轴的度数差;是一个介于180 到 180 之间的浮点数。
- gamma:在围绕 y 轴旋转时(即扭转设备时),z 轴的度数差;是一个介于90 到 90 之间的浮点数。
- absolute:布尔值,表示设备是否返回一个绝对值。
- compassCalibrated:布尔值,表示设备的指南针是否校准过。

下面是一个输出alpha,beta和gamma值的例子。

```js
EventUtil.addHandler(window, "deviceorientation", function (event) {
    var output = document.getElementById("output");
    output.innerHTML = "Alpha=" + event.alpha + ", Beta=" + event.beta +
        ", Gamma=" + event.gamma + "<br>";
});

```

目前这个功能在除了IE内核中的移动浏览器都可以使用






## devicemotion 事件
`DeviceOrientation Event`规范还定义了一个`devicemotion`事件。这个事件是要告诉开发人员设备什么时候移动,而不仅仅是设备方向如何改变。例如,通过`devicemotion`能够检测到设备是不是正在往下掉,或者是不是被走着的人拿在手里。

触发`devicemotion`事件时,事件对象包含以下属性。

- `acceleration`:一个包含x、y和z属性的对象,在不考虑重力的情况下,告诉你在每个方向
上的加速度。
- `accelerationIncludingGravity`:一个包含x、y和z属性的对象,在考虑z轴自然重力加速度的情况下,告诉你在每个方向上的加速度。

- `interval`:以毫秒表示的时间值,必须在另一个`devicemotion`事件触发前传入。这个值在每
个事件中应该是一个常量。

- `rotationRate`:一个包含表示方向的alpha、beta和gamma属性的对象。

如果读取不到`acceleration`、`accelerationIncludingGravity`和`rotationRate`值,则它们的值为null。因此,在使用这三个属性之前,应该先检测确定它们的值不是`null`。例如:

```js
EventUtil.addHandler(window, "devicemotion", function (event) {
    var output = document.getElementById("output");
    if (event.rotationRate !== null) {
        output.innerHTML += "Alpha=" + event.rotationRate.alpha + ", Beta=" +
            event.rotationRate.beta + ", Gamma=" +
            event.rotationRate.gamma;
    }
});

```


与`deviceorientation`事件类似,只有iOS中的Safari、Chrome和Android版WebKit实现了devicemotion事件。