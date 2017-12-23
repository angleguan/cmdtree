---
title: Angularjs入门学习（七）路由
date: 2017-08-08T18:21:46+00:00
layout: post
category: JavaScript
---

> 路由(route)，几乎所有的MVC(VM)框架都应该具有的特性，因为它是前端构建单页面应用(SPA)必不可少的组成部分。

{% raw %}

路由只是从一个页面重定向到另一个页面。在任何web应用中路由都很重要。AngularJs是一个单页面应用程序，一旦应用程序加载，它永远不会重新加载。在这种情况下我们如何实现路由？我们可以使用指令模板从一个模板导航到另一个模板，但是最好不要这样做，而是将视图限制在布局和模板视图中，并以URL显示模板视图。

看一个实例:

```html
<body ng-app="myApp">

<p><a href="#/!">Main</a></p>

<a href="#!red">Red</a>
<a href="#!green">Green</a>
<a href="#!blue">Blue</a>

<div ng-view></div>

<script>
var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.htm"
    })
    .when("/red", {
        templateUrl : "red.htm"
    })
    .when("/green", {
        templateUrl : "green.htm"
    })
    .when("/blue", {
        templateUrl : "blue.htm"
    });
});
</script>
</body>
```

![](/pics/2017/08/fzy_screenshot20170808175153.png)

当Red被点击时，`<div ng-view></div>`中会载入`red.htm`文件中的内容

![](/pics/2017/08/fzy_screenshot20170808175653.png)

整个过程中页面不需要重新加载。

## ng-view

ng-view 是ngRoute中包含的一个特殊指令。它相当与一个占位符，表示即将载入页面的位置。

有三种不同的方式可以达到效果：

- `<div ng-view></div>`
- `<ng-view></ng-view>`
- `<div class="ng-view"></div>`

应用程序只能有一个`ng-view`指令.

## $routeProvider

`$routeProvider`是配置在应用程序的config部分配置路由的提供程序服务，使用$routeProvider您可以定义当用户点击一个链接，显示的页面。

定义$routeProvider的例子

```js
var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.htm"
    })
    .when("/london", {
        templateUrl : "london.htm"
    })
    .when("/paris", {
        templateUrl : "paris.htm"
    });
});
```

## controller

随着`$routeProvider`的使用，你可以定义每个视图的控制器

```js
var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.htm"
    })
    .when("/london", {
        templateUrl : "london.htm",
        controller : "londonCtrl"   //添加控制器
    })
    .when("/paris", {
        templateUrl : "paris.htm",
        controller : "parisCtrl"    //添加控制器
    });
});
app.controller("londonCtrl", function ($scope) {
    $scope.msg = "I love London";
});
app.controller("parisCtrl", function ($scope) {
    $scope.msg = "I love Paris";
});
```

然后你可以在london.htm或者paris.htm中使用`{{ msg }}`

london.htm

```htm
<p>{{ msg }}</p>    // I love London
```


## template

在前面的例子中，我们在$routeProvider.when中使用了templateUrl，这个参数用来插入HTML文件

```js
$routeProvider.when('/computers', {
    templateUrl: 'views/computers.html',
});
```

以上代码会从服务端获取 views/computers.html 文件内容插入到 ng-view 中。

## otherwise

在$routeProvider中还有个otherwise方法

```js
var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
   $routeProvider
    .when("/banana", {
        template : "<h1>Banana</h1><p>Bananas contain around 75% water.</p>"
    })
    .when("/tomato", {
        template : "<h1>Tomato</h1><p>Tomatoes contain around 95% water.</p>"
    })
    .otherwise({
        template : "<h1>Nothing</h1><p>Nothing has been selected</p>"
    });
});
```

上面的例子中，倘若既不是banana又不是tomato的链接被点击时，就会插入

![](/pics/2017/08/fzy_screenshot20170808181808.png)

{% endraw %}
