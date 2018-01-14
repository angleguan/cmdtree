---
title: AngularJS入门学习（五）事件
date: 2017-07-21T22:15:38+00:00
category: JavaScript
---

这里讲一下AngularJS比较简单的几个事件，包括`ng-click``ng-selected``ng-change`。

## ng-click

`ng-click`指令用来定义HTML元素被点击后触发的事件。

```html
<div ng-app="">
    <button ng-click="count = count + 1" ng-init="count = 1">ClickMe</button>
    <p>{{ count }}</p>
</div>
```

上面的click定义了一个表达式（expression）每次点击button后，count便加一。

`ng-click`事件还可以触发一个函数

```html
<div ng-app="myapp" ng-controller="myCtrl">
    <button ng-click="click()">clickFun</button>
</div>

<script type="text/javascript">
    var app = angular.module("myapp",[]);
    app.controller("myCtrl",function($scope){
        $scope.click = function(){
            alert("you clicked me!");
        }
    })
</script>

```


上面的实例展示了当Button被点击时触发一个函数的例子。


## ng-selected

ng-selected 指令用于设置` <select> `列表中的 `<option>` 元素的 selected 属性。ng-selected 属性的表达式返回 true 则选项被选中。

```html
<div ng-app="">
    点击复选框选择 BMW 选项:
    <input type="checkbox" ng-model="mySel">

    <p>我喜欢的车:</p>

    <select>
      <option>Volvo</option>
      <option ng-selected="mySel">BMW</option>
      <option>Ford</option>    
    </select>
</div>
```

上面的例子展示了当`checkbox`被选中时，即`mySel`为`true`时，`ng-seleted`为`mySel`的选项被选中。

## ng-change

ng-change指令定义了当HTML元素改变的时候触发的事件。

ng-change需要搭配ng-model指令使用。

```html
<div ng-app="myapp" ng-controller="myCtrl">
    <input type="text" ng-change="myFunc()" ng-model="myValue" />
    <p>The input field has changed {{ count }} times.</p>
</div>

<script type="text/javascript">
var app = angular.module("myapp",[]);
app.controller("myCtrl",function($scope){
    $scope.count = 0;
    $scope.myFunc = function(){
        $scope.count++;
    }
})
</script>
```

上面的例子演示了当输入框内内容改变时触发函数来改变count值。

（完）
