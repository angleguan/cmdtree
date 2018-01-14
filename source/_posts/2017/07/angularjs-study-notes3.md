---
title: AngularJS入门学习（三）控制器
date: 2017-07-14T22:14:12+00:00
category: JavaScript
---

controller是MVC（Model View Controller）框架中的一部分，(官方翻译)ngController指令是一个试图控制类，这是一个关键在angular如何支持模型视图控制器设计模式原则方面。Angular的控制器：ngController实际上是一个函数，指定一个Controller类，这个类控制业务逻辑和模型的在视图的绑定。

我们来看一段代码：
```html
    <div ng-app="myapp" ng-controller="myCtrl">
        输入的姓名:<br/>
        名：<input type="text" ng-model="firstname"/><br/>
        姓：<input type="text" ng-model="lastname"/>
        <br />
        <h1>hello {{ firstname +" "+ lastname }}</h1>
    </div>

    <script>
        var app = angular.module("myapp" ,[]);
        app.controller('myCtrl', function($scope) {
            $scope.firstname = "John";
            $scope.lastname =  "Doe";
        });
    </script>
```

上面是一个最简单的使用ng-controller的实例

`ng-controller="myCtrl"` 属性是一个 AngularJS 指令。用于定义一个控制器。

myCtrl 函数是一个 JavaScript 函数。

AngularJS 使用$scope 对象来调用控制器。

控制器的 $scope （相当于作用域、控制范围）用来保存AngularJS Model(模型)的对象。

控制器在作用域中创建了两个属性 (firstName 和 lastName)。

ng-model 指令绑定输入域到控制器的属性（firstName 和 lastName）。

### 控制器也可以有方法

我们将上面的例子改变一下:
```html
    <div ng-app="myapp" ng-controller="personCtrl">
        输入的姓名: <br/>
        名：
        <input type="text" ng-model="firstname" /><br/> 姓：
        <input type="text" ng-model="lastname" />
        <br /> 这里使用函数的方式输出的姓名
        <h1>hello {{ fullname() }}</h1>
    </div>

    <script>
        var app = angular.module("myapp", []);
        app.controller('personCtrl', function ($scope) {
            $scope.firstname = "John";
            $scope.lastname = "Doe";
            $scope.fullname = function () {
                return $scope.firstname + " " + $scope.lastname;
            }
        });
    </script>
```

这里我们使用调用函数的方式来输出姓名，将`$scope.fullname`绑定到HTML，这样修改`input`中的内容时，就可以看到全名被自动更新了。

