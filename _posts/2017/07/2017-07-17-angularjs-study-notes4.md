---
title: AngularJS入门学习（四）常用服务
date: 2017-07-17T22:14:47+00:00
layout: post
category: js
---
AngularJS Service是一个函数或对象，可以使用在Angular应用中。

AngularJS有很多内置服务，我们也可以按照自己的需要来创建服务，这里讲一下几个常用的服务。

# $HTTP

$http服务是所有Angular服务中最为常用的内置服务之一。

$http服务封装了浏览器原生的XMLHttpRequest对象。它只能接受一个参数，且这个参数是一个对象，包含了用来生成HTTP请求的配置内容。它返回一个Promise对象（一个原生的ES6对象，表示即将发生的事件），具有两个方法（success和error）。

```js
$http({
    url:'data.json',
    method:'GET'
}).success(function(response){
    //响应成功
    
}).error(function(response){
    //处理响应失败
});
```

### 使用than方法来处理回调

```js
$http({
    method: 'GET',
    url: 'data.js'
}).then(function successCallback(response) {
        //响应成功
    }, function errorCallback(response) {
        //处理响应失败
});
```

### 快捷的GET/POST请求

```js
$http.get('date.json', config).then(successCallback, errorCallback);

$http.post('date.json', data, config).then(successCallback, errorCallback);
```

# $location

Angular中使用内置的$location服务来监听、操作URL，包括如下功能：

- 获取、监听、改变地址栏的URL
- 与URL实现双向数据绑定（地址栏变动、前进后退或者点击页面的链接均会触发）
- 将URL对象封装成了一套方法（protocol、host、port、path、search和hash）

$location服务的具体行为取决于它初始化时的配置。默认设置对大多数应用都是适合的，你也可以自定义配置来增加些新特性。

$location服务初始化好以后，你就可以使用jquery风格的读写器和它交互了，你可以获取或者改变当前URL。

## $location服务的配置

要配置$location服务，检索$locationProvider并把参数设置成以下这样：
```
html5Mode(模式): {boolean}
    strue - 参阅HTML5模式
    false - 参阅Hashbang模式
    default: false

hashPrefix(前缀): {string}
    Hashbang URLs的前缀 (在Hashbang模式中或者低级浏览器中使用)
    default: '!'
```

**配置示例**

```js
$locationProvider.html5Mode(true).hashPrefix('!');
```

## Hashbang和HTML5模式

$location服务有两种用来控制地址栏URL格式的配置：Hashbang模式（默认）和HTML5模式（使用HTML5历史API）。应用会使用两种模式中相同的API。

## 示例

### Hashbang模式(默认mode)

使用这个模式的话，$location会在所有浏览器中使用Hashbang URLs。
```js
it('should show example', inject(
  function($locationProvider) {
    $locationProvider.html5mode = false;
    $locationProvider.hashPrefix = '!';
  },
  function($location) {
    // open http://host.com/base/index.html#!/a
    $location.absUrl() == 'http://host.com/base/index.html#!/a'
    $location.path() == '/a'

    $location.path('/foo')
    $location.absUrl() == 'http://host.com/base/index.html#!/foo'

    $location.search() == {}
    $location.search({a: 'b', c: true});
    $location.absUrl() == 'http://host.com/base/index.html#!/foo?a=b&c'

    $location.path('/new').search('x=y');
    $location.absUrl() == 'http://host.com/base/index.html#!/new?x=y'
  }
));
```

**支持网络爬虫**

你需要添加特别的meta标记在你的文档的头部才能支持对你的AJAX应用的索引。
```html
<meta name="fragment" content="!" />
```

这能让网络爬虫请求带有`_escaped_fragment_`形式的参数链接，这样你就能识别爬虫并且返回一个HTML的快照了。更多信息请参考 **Making AJAX Applications Crawlable**。

### HTML5模式

在HTML5模式中，$location服务的读写器和浏览器的URL地址通过HTML5历史API交互，这使你能用regular URL path并且搜索各组成部分，和hashbang是等效的。 如果浏览器不支持HTML5 历史API， $location服务会自动回退成使用hashbang URLs。你就不用担心浏览器的支持性了。$location服务总是会用最好的选择。

- 在低级浏览器中使用了regular URL -> 重定向成hashbang URL
- 在现代浏览器中打开了一个hashbang URL -> 重写成regular URL

```js
it('should show example', inject(
  function($locationProvider) {
    $locationProvider.html5mode = true;
    $locationProvider.hashPrefix = '!';
  },
  function($location) {
    // in browser with HTML5 history support:
    // open http://host.com/#!/a -> rewrite to http://host.com/a
    // (replacing the http://host.com/#!/a history record)
    $location.path() == '/a'

    $location.path('/foo');
    $location.absUrl() == 'http://host.com/foo'

    $location.search() == {}
    $location.search({a: 'b', c: true});
    $location.absUrl() == 'http://host.com/foo?a=b&c'

    $location.path('/new').search('x=y');
    $location.url() == 'new?x=y'
    $location.absUrl() == 'http://host.com/new?x=y'

    // in browser without html5 history support:
    // open http://host.com/new?x=y -> redirect to http://host.com/#!/new?x=y
    // (again replacing the http://host.com/new?x=y history item)
    $location.path() == '/new'
    $location.search() == {x: 'y'}

    $location.path('/foo/bar');
    $location.path() == '/foo/bar'
    $location.url() == '/foo/bar?x=y'
    $location.absUrl() == 'http://host.com/#!/foo/bar?x=y'
  }
));
```

# $cacheFactory

$cacheFactory是应用程序一个会话（Session）中的缓存服务，以key-value对的方法存储一些临时数据。它跟浏览器本地缓存localStorage是不一样的。$cacheFactory在用户删除当前会话（比如强制刷新页面）之后，缓存的数据就被清空了。

## 用法

首先，要得到一个缓存实例，用id来区分，比如我想取id为’firstCache’的缓存：
```js
var cache = $cacheFactory('firstCache');
```

添加kv对，put方法：

```js
cache.put(key, value);
```

获取，get方法：

```js
cache.get(key); // 如果不存在这个key的话，会返回undefined
```

添加kv对，put方法：

```js
cache.put(key, value);
```

删除，remove和removeAll：

```js
cache.remove(key); // 删除某个kv对
cache.removeAll(); // 删除该缓存的全部kv对
```

删除该缓存实例，destroy：

```js
cache.destroy(); // 把当前缓存删除掉
cache.put(key, value); // 错误！不能再访问该缓存，要重新生产一个实例出来
```

# $timeout、$interval

$timeout和$interval是AngularJS自带的服务，跟原生js中的setTimeout和setInterval函数的用法基本是一样的。但是有两个不一样的地方需要注意一下：

区别一： 

原生js中的两个函数，如果在AngularJS中使用并且在回调函数中需要使用$scope服务的话，我们需要用$angular.$apply把回调函数包起来，因为这里setTimeout函数被AngularJS当作是外部函数了。就像这样：

```js
// 错误的写法示例（使用setTimeout却没有用$apply）：
angular.module('myDemo', [])

    .controller('firstController', ['$scope', function ($scope) {

        setTimeout(function () {
            console.log('before');  // 正常输出before
            $scope.name = "My name have been changed."; // 这一句不被执行
            console.log('after');   // 正常输出after
        }, 2000);
    }]);
```

```js
// 正确的写法示例
angular.module('myDemo', [])

    .controller('firstController', ['$scope', function ($scope) {

        setTimeout(function () {
            console.log('before');  // 正常输出before
            $scope.$apply(function () {
                $scope.name = "My name have been changed.";  // 正确显示
            });
            console.log('after');   // 正常输出after
        }, 2000);
    }]);
```


所以，在AngularJS中，最好不要用setTimeout或setInterval，而是用那两个AngularJS系统服务。

区别二: 

取消的方式不大一样，比如timeout：

```js
// setTimeout
var id = setTimeout(func, 2000); // 返回该timeout的id
clearTimeout(id); // 使用clearTimeout
```

```js
// $timeout服务
var promise = $timeout(f, 2000); // 返回一个promise对象
$timeout.cancel(promise); // 还是要使用服务，它的cancel方法
```

# $sce

sce指的是`Strict Contextual Escaping`，它是默认开启的，负责拒绝一些不安全的行为，比如加载不同源的资源等等。但是有时候，我们又需要加载一些特定的资源，我们就得使用$sce的一些方法，来为这些资源和AngularJS系统之间建立信任。

## 用法

$sce有以下常用方法：
- $sce.trustAsHtml(…)：将一段html文本视为安全
- $sce.trustAsUrl(…)
- $sce.trustAsResourceUrl(…)
- $sce.trustAsJs(…)

举个例子，假如我要显示（可以理解成渲染，相当于android SDK中的WebView）一段html文本表示的内容，我们需要遵循以下步骤：

1.在html模板中用“ng-bind-html”属性来绑定一个model（变量）；

2.在js中注入$sce服务，并且使用方法$sce.trustAsHtml(…)，把信任后的值赋给该model。

## 示例 

HTML：

```html
<div ng-controller="LogController">
    <!--这里不能用ng-bind，因为是渲染一段html文本，而不是显示简单的数据-->
    <div ng-bind-html="results"></div>
</div>
```

JS：

```js
angular.module('myDemo', [])
    .controller('LogController', function ($scope, $http, $sce) {

        // 随便定义一段html文本
        var txt = "<h1>Hello world!</h1>";

        // 这里不能直接$scope.results = txt，否则会报错显示“不安全”
        $scope.results = $sce.trustAsHtml(txt);
    });
```

此时浏览器就会输出Hello world!

（完）
