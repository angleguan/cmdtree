---
title: JS中的prototype方法
date: 2017-06-01T20:38:06+00:00
category: JavaScript
---

我们先来了解几个知识点:

# 一、原型法设计模式

原型法的主要思想是，现在有1个类A,我想要创建一个类B,这个类是以A为原型的,并且能进行扩展。我们称B的原型为A。

# 二、javascript的方法可以分为三类：

a.类方法

b.对象方法

c.原型方法

下面是个例子


```javascript
    function People(name)
    {
      this.name=name;
      //对象方法
      this.Introduce=function(){
        alert("My name is "+this.name);
      }
    }
    //类方法
    People.Run=function(){
      alert("I can run");
    }
    //原型方法
    People.prototype.IntroduceChinese=function(){
      alert("我的名字是"+this.name);
    }
    
    //测试
    
    var p1=new People("ZhiYang");
    
    p1.Introduce(); // My name is ZhiYang
    
    People.Run();  // I can run
    
    p1.IntroduceChinese();  // 我的名字是ZhiYang
```


# 一、基本使用方法

**prototype属性可算是JavaScript与其他面向对象语言的一大不同之处。**

简而言之，prototype就是“一个给类的对象添加方法的方法”，使用prototype属性，可以给类动态地添加方法，以便在JavaScript中实现“继承”的效果。

*具体来说，prototype 是在 IE 4 及其以后版本引入的一个针对于某一类的对象的方法，当你用prototype编写一个类后，如果new一个新的对象，浏览器会自动把prototype中的内容替你附加在对象上。这样，通过利用prototype就可以在JavaScript中实现成员函数的定义，甚至是“继承”的效果。*


一个简单的示例如下：
```javascript
Number.prototype.add = function (num) {
    return (this + num );
}
```
 
这是对已有类添加方法。这样写，可以增强已有类的功能，例如可以给Array类增加push方法如下：

```javascript
Array.prototype.push = function(new_element){ 
    this[this.length]=new_element; 
    return this.length; 
} 
```

对于自定义的类（或者称函数对象），也可以这样写：


```javascript
function MyApplication() {
    this.counter = 0;
    this.map = new GMap2(document.getElementById("map_canvas"));
    this.map.setCenter(new GLatLng(39.917, 116.397), 14);
    GEvent.bind(this.map, "click", this, this.onMapClick);
}

MyApplication.prototype.onMapClick = function () {
    this.counter++;
    alert("这是您第 " + this.counter + " 次点击地图");
}
```
这里定义了创建地图的类，并且为其定义了“单击”事件的响应函数。


# 二、prototype的动态特性及弊端

**需要注意的是，prototype为我们提供了方便，使我们可以在类定义完成之后，仍可以随时为其添加方法、属性，随时添加随时使用——也就是prototype的定义具有动态性。但是越灵活的语言出现错误的可能性越大。这就需要我们在使用时，必须养成一些良好的习惯。**

**“首先，如果可以动态添加属性和方法，那么很容易让人想到，当我调用时，我想要调用的属性或者方法存在不？这是一个很严肃的问题，如果当我们调用时根本没有该属性或者方法，将可能导致我们的脚本down掉。” 对于这个问题，在使用时我们以后可以按照下面的写法书写：**

```javascript
function MyObject(name, size) {
    this.name = name;
    this.size = size;
}

MyObject.prototype.height = "2.26 meters";
MyObject.prototype.tellHeight = function () {
    return "height of " + this.name + " is " + this.height;
}

///////使用 
var myobj1 = new MyObject("haha", 3);
if (myobj1.tellHeight) {
    domDiv.innerHTML += myobj1.tellHeight() + "; 
} 
```

属性和方法在不在的问题简单，可是属性和方法变不变化的问题可就严重了。在不在我们可以检测，变不变呢？比如，请看下面的代码：

```javascript
function MyObject(name, size) 
{ 
    this.name = name; 
    this.size = size; 
} 
 
MyObject.prototype.color = "red"; 
MyObject.prototype.tellColor = function() 
{ 
    return "color of "+this.name+" is "+this.color; 
} 
 
var myobj1 = new MyObject("tiddles", "7.5 meters"); 
domDiv.innerHTML += myobj1.tellColor()+"<br /><br />"; 
 
MyObject.prototype.color = "green"; 
 
domDiv.innerHTML += myobj1.tellColor()+"<br /><br />"; 
``` 

修改的是类MyObject的color属性。但是你惊奇的会看到你之前实例化的对象myobj1的属性值竟然也变化了：

```
color of tiddles is red
color of tiddles is green
```

上面是属性，还有方法，方法也是可以变的！

```javascript
function MyObject(name, size) 
{ 
    this.name = name; 
    this.size = size; 
} 
 
MyObject.prototype.color = "red"; 
MyObject.prototype.tellColor = function() 
{ 
    return "color of "+this.name+" is "+this.color; 
} 
 
var myobj1 = new MyObject("tiddles", "7.5 meters"); 
domDiv.innerHTML += myobj1.tellColor()+"<br /><br />"; 
 
MyObject.prototype.color = "green"; 
MyObject.prototype.tellColor = function() 
{ 
    return "your color of "+this.name+" is "+this.color; 
} 
 
domDiv.innerHTML += myobj1.tellColor()+"<br /><br />"; 
```


这段代码的结果是：

```
color of tiddles is red
your color of tiddles is green
```

Java和C#这些比较严格的语言，虽然降低了灵活性，但也减少了犯错误的可能。这样，即使一个新手，他写出的代码也不会与高手差太多。但是，像Javascript这样的脚本语言，由于太灵活，所以，一定要有好的代码编写习惯，否则出现了上面的问题，调试时可就难咯！
 

# 三、prototype的实现机制

可以说，prototype实际上是“引用”，而非“赋值”。也就是给一个类添加一个属性或者方法，是给它添加了个引用，而非赋值一份给它。看看下面的这个例子：
 
```js
function ClassA() {
    alert("a");
    this.a = function () { alert(); };
}
function ClassB() {
    alert("b");
    this.b = function () { alert(); };
}

ClassB.prototype.a = new ClassA();        //会导致弹出 a 对话框 
ClassB.prototype.xx = "xx";

function initialize() {
    var objB1 = new ClassB();                 //弹出 b 对话框 
    var objB2 = new ClassB();                 //弹出 b 对话框 
    alert(objB1.a == objB2.a);                    //true 
    alert(objB1.b == objB2.b);                //false 
    alert("objB1.xx: " + objB1.xx + ", objB2.xx: " + objB2.xx); //objB1.xx: xx, objB2.xx: xx 
    ClassB.prototype.xx = "yy";
    alert("objB1.xx: " + objB1.xx + ", objB2.xx: " + objB2.xx); //objB1.xx: yy, objB2.xx: yy 
    objB2.xx = "zz";
    alert("objB1.xx: " + objB1.xx + ", objB2.xx: " + objB2.xx); //objB1.xx: yy, objB2.xx: zz 
}
initialize(); 
``` 

其执行结果是依次弹出以下窗口：
```
a
b
b
true
false
objB1.xx: xx, objB2.xx: xx
objB1.xx: yy, objB2.xx: yy
objB1.xx: yy, objB2.xx: zz 
```

相关的解释已经注释在代码中。从上面的代码可以发现，prototype只是给ClassB添加了ClassA实例的引用。因此，两个ClassB的实例中的a实例相等。

同时，ClassA的构造函数只在添加引用时被执行一次，此后ClassB的对象实例化时，只执行ClassB的构造函数。


    参考：http://www.cnblogs.com/lidabo/archive/2012/01/05/2313481.html
    http://www.cnblogs.com/yjf512/archive/2011/06/03/2071914.html
