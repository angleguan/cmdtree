---
title: AngularJS入门学习（一）表达式与指令
date: 2017-07-08T22:12:56+00:00
layout: post
category: js
---

# 一、AngularJS表达式

{% raw %}

- AngularJS的表达式写在双括号`{{}}`内 
- 表达式的作用是将绑定的数据输出到HTML页面

看下面这段代码

```html
<div ng-app="">
    <!-- 表达式写在双大括号内 数据绑定 -->
    <!-- angluarjs的表达式类似于js的表达式 可以包含文字 运算符 变量 -->
    {{ 5+5 }} // 输出： 10
</div>
```

表达式可以输出数字：

```html
<div ng-app="" ng-init="quantity=1;cost=5">
 
    <p>总价： {{ quantity * cost }}</p>
 
</div>

```

也可以输出字符串：

```html
<div ng-app="" ng-init="firstName='John';lastName='Doe'">
 
    <p>姓名： {{ firstName + " " + lastName }}</p>
 
</div>

```

也可以输出对象：

```html
<div ng-app="" ng-init="person={firstName:'John',lastName:'Doe'}">
 
    <p>姓为 {{ person.lastName }}</p>
 
</div>
```

输出数组：

```html
<div ng-app="" ng-init="points=[1,15,19,2,40]">
 
    <p>第三个值为 {{ points[2] }}</p>
 
</div>
```


# 二、AngularJS指令

- AngularJS 指令是扩展的 HTML 属性，带有前缀`ng-`。
- ng-app 指令初始化一个 AngularJS 应用程序。
- ng-init 指令初始化应用程序数据。
- ng-model 指令把元素值（比如输入域的值）绑定到应用程序。


看一个数据绑定的实例:
```html
<div ng-app="" ng-init="firstName='John'">
     <p>在输入框中尝试输入：</p>
     <p>姓名：<input type="text" ng-model="firstName"></p>
     <p>你输入的为： {{ firstName }}</p>
</div>
```

上面实例中的 `{{ firstName }}` 表达式是一个 AngularJS 数据绑定表达式。

AngularJS 中的数据绑定，同步了 AngularJS 表达式与 AngularJS 数据。

`{{ firstName }}` 是通过 `ng-model="firstName"` 进行同步。

## 重复 HTML 元素

ng-repeat 指令会重复一个 HTML 元素：

```html
<div ng-app="" ng-init="names=['Jani','Hege','Kai']">
  <p>使用 ng-repeat 来循环数组</p>
  <ul>
    <li ng-repeat="x in names">
      {{ x }}
    </li>
  </ul>
</div>
```

ng-repeat 指令用在一个对象数组上：


```html
<div ng-app="" ng-init="names=[
{name:'Jani',country:'Norway'},
{name:'Hege',country:'Sweden'},
{name:'Kai',country:'Denmark'}]">
 
<p>循环对象：</p>
<ul>
  <li ng-repeat="x    in names">
    {{ x.name + ', ' + x.country }}
  </li>
</ul>
 
</div>
```


## 创建自定义的指令

除了 AngularJS 内置的指令外，我们还可以创建自定义指令。

你可以使用 .directive 函数来添加自定义的指令。

要调用自定义指令，HTML 元素上需要添加自定义指令名。

使用驼峰法来命名一个指令， customizeDirective, 但在使用它时需要以 - 分割, customize-directive:

```html
<body ng-app="myApp">

    <customize-directive></customize-directive>

    <script>
        var app = angular.module("myApp", []);
        app.directive("customizeDirective", function() {
            return {
                template : "<h1>自定义指令!</h1>"
            };
        });
    </script>

</body>
```



{% endraw %}
