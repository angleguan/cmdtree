---
title: AngularJS入门学习（二）模型与作用域
date: 2017-07-10T22:13:42+00:00
category: JavaScript
---

# 一、AngularJS模型

- AngularJS`ng-model`指令可以将输入域的值与 AngularJS 创建的变量绑定。
- `ng-model`的绑定是双向绑定，即在一方修改变量，另一方也会立即同步。

来看一个双向绑定的实例

```html
<div ng-app="myapp" ng-controller="myCtrl">
    输入：<input ng-model="name"><br/>
    当前name值是:<p>{{ name }}</p>
</div>

<script>
    var app = angular.module('myapp',[]);
     app.controller('myCtrl',function($scope){

         // 将输入域的值与 AngularJS 创建的变量绑定
        $scope.name = 'John Doe';
});
</script>
```

Angular先是定义了`name`的值，并与`input`绑定，当你修改`input`的值时，Angular属性的值也会相应改变。

## 验证用户输入

来看一个实例，使用Angularjs自带的组件验证输入的邮箱地址是否合法
```html
<form ng-app="" name="myForm">
    Email:
    <input type="email" name="myAddress" ng-model="text">
    <span ng-show="myForm.myAddress.$error.email">不是一个合法的邮箱地址</span>
</form>
```
以上实例中，提示信息会在 ng-show 属性返回 true 的情况下显示。

## 应用状态

ng-model 指令可以为应用数据提供状态值(invalid, dirty, touched, error):

```html
<form ng-app="" name="myForm" ng-init="myText = 'test@runoob.com'">
    Email:
    <input type="email" name="myAddress" ng-model="myText" required></p>
    <h1>状态</h1>
    {{myForm.myAddress.$valid}}
    {{myForm.myAddress.$dirty}}
    {{myForm.myAddress.$touched}}
</form>
```

## CSS 类

ng-model 指令基于它们的状态为 HTML 元素提供了 CSS 类：
```html
<style>
    input.ng-invalid {
        background-color: lightblue;
    }
</style>
<body>
    <form ng-app="" name="myForm">
        输入你的名字:
        <input name="myAddress" ng-model="text" required>
    </form>
```

上面的实例，设置了input框未输入的背景颜色

**ng-model 指令根据表单域的状态添加/移除以下类：**（具体参考：[AngularJS: API: form](https://docs.angularjs.org/api/ng/directive/form)）
- ng-empty
- ng-not-empty
- ng-touched
- ng-untouched
- ng-valid
- ng-invalid
- ng-dirty
- ng-pending
- ng-pristine


# 二、AngularJS作用域

- Scope(作用域) 是应用在 HTML (视图) 和 JavaScript (控制器)之间的纽带。
- Scope 是一个对象，有可用的方法和属性。
- Scope 可应用在视图和控制器上。

## 如何使用 Scope

当你在 AngularJS 创建控制器时，你可以将 $scope 对象当作一个参数传递:

```html
    <div ng-app="myApp" ng-controller="myCtrl">

        <h1>{{carname}}</h1>

    </div>

    <script>
        var app = angular.module('myApp', []);

        app.controller('myCtrl', function ($scope) {
            $scope.carname = "Volvo";
        });
    </script>
```
当在控制器中添加 $scope 对象时，视图 (HTML) 可以获取了这些属性。

视图中，你不需要添加 $scope 前缀, 只需要添加属性名即可，如： {{carname}}。

## Scope 概述

AngularJS 应用组成如下：

- View(视图), 即 HTML。
- Model(模型), 当前视图中可用的数据。
- Controller(控制器), 即 JavaScript 函数，可以添加或修改属性。

scope 是模型。

scope 是一个 JavaScript 对象，带有属性和方法，这些属性和方法可以在视图和控制器中使用。

```html
    <div ng-app="myApp" ng-controller="myCtrl">
        <input ng-model="name">
        <h1>{{greeting}}</h1>
        <button ng-click='sayHello()'>点我</button>
    </div>

    <script>
        var app = angular.module('myApp', []);
        app.controller('myCtrl', function ($scope) {
            $scope.name = "Runoob";
            $scope.sayHello = function () {
                $scope.greeting = 'Hello ' + $scope.name + '!';
            };
        });
    </script>
```

## Scope 作用范围

了解你当前使用的 scope 是非常重要的。

在以上两个实例中，只有一个作用域 scope，所以处理起来比较简单，但在大型项目中， HTML DOM 中有多个作用域，这时你就需要知道你使用的 scope 对应的作用域是哪一个。

```html
    <div ng-app="myApp" ng-controller="myCtrl">

        <ul>
            <li ng-repeat="x in names">{{x}}</li>
        </ul>

    </div>

    <script>
        var app = angular.module('myApp', []);

        app.controller('myCtrl', function ($scope) {
            $scope.names = ["Emil", "Tobias", "Linus"];
        });
    </script>
```

每个 <li> 元素可以访问当前的重复对象，这里对应的是一个字符串， 并使用变量 x 表示。

## 根作用域

所有的应用都有一个 $rootScope，它可以作用在 ng-app 指令包含的所有 HTML 元素中。

$rootScope 可作用于整个应用中。是各个 controller 中 scope 的桥梁。用 rootscope 定义的值，可以在各个 controller 中使用。
```html
   <div ng-app="myApp" ng-controller="myCtrl">

        <h1>{{lastname}} 家族成员:</h1>

        <ul>
            <li ng-repeat="x in names">{{x}} {{lastname}}</li>
        </ul>

    </div>

    <script>
        var app = angular.module('myApp', []);

        app.controller('myCtrl', function ($scope, $rootScope) {
            $scope.names = ["Emil", "Tobias", "Linus"];
            $rootScope.lastname = "Refsnes";
        });
    </script>
```
