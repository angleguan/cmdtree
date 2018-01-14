---
title: JS中的私有变量
date: 2017-07-31T21:55:33+00:00
category: JavaScript
---

任何在函数中定义的变量，都可以认为是私有变量，因为不能在函数的外部访问这些变量。私有变量包括函数的参数，局部变量以及在函数内部定义的其他函数。

如果在函数内部创建一个闭包，那么闭包可以通过自己的作用域链访问这些变量。而利用这一点，就可以创建用于访问私有变量的公有方法。

我们把有权访问私有变量和私有函数的公有方法称为特权方法。

## 创建特权方法的方式

### 1、第一种是在构造函数中定义特权方法，基本模式如下：

```js
function MyObject(){
    //私有变量和私有函数
    var privateVariable =10;

    function privateFunction(){
        return false;
    }

    //特权函数
    this.publicMethod = function(){
        privateVariable++;
        return privateFunction();
    };
}
```

在创建MyObject的实例后，除了使用`publicMethod()`这一个途径外，没有其他办法可以访问`privateVariable`和`privateFunction()`。

利用私有和特权成员，可以隐藏那些不应该被直接修改的数据。例如：

```js
function Person(name){
    this.getName=function(){
        return name;
    }
    this.setName=function(value){
        name=value;
    }
}

var person=new Person("Nicholas");
alert(person.getName());    //Nicholas
person.setName("Greg");
alert(person.getName());    //Greg
```

私有变量name在Person的每一个实例中都不相同，因为每次调用构造函数都会重新创建这两个方法。

### 2、在私有作用域中定义私有变量和函数

通过在私有作用域中定义私有变量和函数，同样可以创建特权方法。为了不用在每一个实例中都重新创建私有变量和私有方法，可以采用原型模式。

我们先来简单的了解一下什么是原型：

我们创建的每一个函数都有一个prototype(原型)属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法。如下面例子所示：

```js
function Person(){
}

Person.prototype.name="Nicholas";
Person.prototype.age=29;
Person.prototype.job="Software Engineering";

Person.prototype.sayName=function(){
    return this.name;
};

var person1=new Person();
alert(person1.sayName());    //Nicholas
var person2=new Person();
alert(person2.sayName());    //Nicholas
alert(person1.sayName()==person2.sayName());    //true
```

接下来我们看一下通过静态私有变量创建特权方法的基本模式：

```js
(function(){

    //私有变量和私有函数
    var privateVariale = 10;
    function privateFunction(){
         return false;
    }

     //构造函数
    MyObject = function(){
    };

    //公有/特权方法
    MyObject.prototype.publicMethod = function(){
        privateVariale++;
        privateFunction();
    }
})();
```

首先，公有方法是在原型上定义的，这一点体现了典型的原型模式。同时，我们在声明`MyObject`的时候没有使用`var`关键字。记住：未经声明的变量，总是会创建一个全局变量。因此，MyObject就成了一个全局变量，能够在私有作用域之外被访问到。但是，在严格模式下，给未经声明的变量赋值会导致错误。

这个模式与在构造函数中定义特权方法的主要区别，就在于私有变量和函数是由实例共享的。由于特权方法是在原型上定义的，因此所有实例都使用一个函数。而这个特权方法，作为一个闭包，总是包含着对作用域的引用。

```js
(function(){
    var name = "";
    
    Person = function(value){
        name=value;
    };
    Person.prototype.getName = function(){
        return name;
    };
    Person.prototype.setName = function(value){
        name=value;
    };
})();

var person1 = new Person("Nocholas");
alert(person1.getName());//Nocholas

person1.setName("Greg");
alert(person1.getName());//Greg

var person2 = new Person("Michale");
alert(person1.getName());//Michale
alert(person2.getName());//Michale
```

在这种模式下，变量`name`就变成了一个静态的，由所有实例共享的属性。结果就是所有的实例会返回相同的值。

### 3、单例模块模式

所谓单例（singleton），指的就是只有一个实例的对象。按照惯例，Javascript是以对象字面量的方式来创建单例对象的。

```js
var singleton={
    name:value;
    method:function(){
        // 这是方法的代码
    };
};
```

模块模式通过为单例添加私有变量和特权方法能够使其得到增强。

```js
var singleton={
    
    //私有变量和私有函数
    var privateVariable = 10;
    function privateFunction(){
        return false;
    }
    //特权/公有方法和属性
    return{
        publicProperty:true;
        publicMethod:function(){
            privateVariable++;
            privateFunction();    
        }
    }
};
```

由于这个对象是在匿名函数内部定义的，因此它的公有方法有权访问私有变量和函数。

```js
var application = function(){

//私有变量和函数
var components = new Array();

//初始化
components.push(new BaseComponent());

//公共
return{
    getComponentCount:function(）{
        return components.length;
    }，
    registerComponent:function(component){
        if(typeof component =="object"){
            component.push(component);
        }
    }
};
}();
```

#### 增强的模块模式

这种增强的模块模式适合那些单例必须是某种类型的实例，同时还必须添加某些属性和（或）方法对其加以增强的情况。

```js
var singleton = function(){

    //私有变量和私有函数
    var privateVariable = 10;
    function privateFunction(){
        return false;
    }

    //创建对象
    var object = new customeType();

    //添加公有属性和方法
    object.publicProperty = true;
    object.publicMethod = function(){
        privateVariable++;
        privateFunction();
    };

    //返回这个对象
    return object;
}
```

总结：

1）函数表达式不同于函数声明。函数声明要求有名字，但函数表达式不需要。没有名字的函数表达式也叫做匿名函数。

2）在无法确定如何引用函数的情况下，递归函数就会变得特别复杂。

3）递归函数应该始终使用arguments.callee来递归地调用自身，不要使用函数名，函数名可能会发生变化。

4）在后台执行环境中，闭包的作用链包含着它自己的作用域，包含函数的作用域和全局作用域。

5）通常，函数的作用域及其所有变量都会在函数执行结束后被销毁。

6）但是，当函数返回了一个闭包时，这个函数的作用域将会在内存中一直保存到闭包不存在为止。

7）即使JavaScript中没有正式的私有属性的概念，但是可以使用闭包来实现公有方法，而通过公有方法可以访问包含在作用域中定义的变量。

8）有权访问私有变量的公有方法叫做特权方法。

9）可以使用构造函数，原型模式来实现自定义类型的特权方法，也可以使用模块模式，增强的模块模式来实现单例的特权方法。
