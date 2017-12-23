---
title: Angularjs入门学习（六）表单
date: 2017-08-01T11:05:33+00:00
layout: post
category: JavaScript
---

AngularJS 表单是输入控件的集合。

{% raw %}

HTML 控件

以下 HTML input 元素被称为 HTML 控件:

- input 元素
- select 元素
- button 元素
- textarea 元素

## ng中的表单与Controller

看这个小标题也行你会差异，表单验证，怎么跟controller扯上关系了。ng中的form已经不同于我们平时用的form标签，做了增强。**form是FormController的一个实例**。如何理解这句话呢？想想我们使用ng-controller指令的情景：

```html
<div ng-controller="testC">
  <input type="test" ng-model="a" />
</div>

<scritp>
function testC($scope){
  //.............
}
</script>
```

应用了`ng-controller`的div就是testC的一个实例，我们可以在模板中使用定义在$scopt上的任何属性和方法，而testC的定义也是由我们自己实现的。当我们使用`<form>`的时候也是这样的道理，FormController由ng为我们定义好了，有一系列属性和方法提供给我们完成验证工作，form实例通过name属性来进行标识，我们可以通过此标识来访问form实例的属性和方法，如：

```html
<form name="myform">
  {{ myform.$valid }}
</form>
```

form提供的属性都是用来表示表单的验证状态的，包括：`$pristine`(表单没有填写记录)、`$dirty`(表单有填写记录)、`$valid`(通过验证)、`$invalid`(未通过验证)、`$error`(验证错误信息)。除`$error`外，前四个的值为true或false表示相应的状态。`$error`的值为一个js对象，包含了以下验证内容的状态：

- email
- max
- maxlength
- min
- minlength
- number
- pattern
- required
- url

这些内容我们会在稍后的例子中看到。`FormController`还提供了一些方法，我们一般不手工调用它们，都是系统自己调用。可参考官方文档：[http://docs.angularjs.org/api/ng.directive:form.FormController](http://docs.angularjs.org/api/ng.directive:form.FormController)

表单元素，如input、checkbox、radio等也不是普通的表单元素了，它们通通是NgModelController的实例。与form一样，也是通过name属性来标识。FormController拥有的那五个属性，NgModelController也同样拥有，除此之外，还有许多额外的属性和方法，我们稍后也在示例中展示，可参考官方文档：[http://docs.angularjs.org/api/ng.directive:ngModel.NgModelController](http://docs.angularjs.org/api/ng.directive:ngModel.NgModelController)

还有一个特性需要了解，一个表单中的表单元素，会作为这个form的属性自动加在上面，通过name标识就可以访问到，如：

```html
<form name="myform">
  <input type="text" name="myname" />
  {{myform.myname.$valid}}
</form>
```

## 表单绑定实例

```html
<div ng-app="" ng-controller="formController">
  <form novalidate>
    First Name:<br>
    <input type="text" ng-model="user.firstName"><br>
    Last Name:<br>
    <input type="text" ng-model="user.lastName">
    <br><br>
    <button ng-click="reset()">RESET</button>
  </form>
  <p>form = {{user}}</p>
  <p>master = {{master}}</p>
</div>

<script>
function formController ($scope) {
    $scope.master = {firstName: "John", lastName: "Doe"};
    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };
    $scope.reset();
};
</script>
```

**实例解析**

AngularJS `ng-model` 指令用于绑定 `input` 元素到模型中。

模型对象 master 的值为 `{"firstName" : "John", "lastName" : "Doe"}`。

模型函数 reset 设置了模型对象 user 等于 master。

AngularJS提供可与HTML控件相关联的多个事件。例如`ng-click`通常与按钮相关联。以下是AngularJS支持的事件。

- `ng-click`
- `ng-dbl-click`
- `ng-mousedown`
- `ng-mouseup`
- `ng-mouseenter`
- `ng-mouseleave`
- `ng-mousemove`
- `ng-mouseover`
- `ng-keydown`
- `ng-keyup`
- `ng-keypress`
- `ng-change`

## ng内置的验证规则 

ng框架提供了非常方便的验证机制，你只需要在标签上加点指令，像使用HTML5提供的验证那样，然后在css中根据规则定义好正确/错误的样式就OK了，例如我们要让一个文本框为必填项，使用required：

```html
<form name="myform novalidate">
  <input type="text" ng-model="a" required />
</form>
```

有几点需要注意：

1、在`<form>`上加了一个novalidate，用来禁止掉浏览器默认的验证行为，因为ng已经对HTML5的几种表单新特性做了兼容处理。

2、表单元素必须有ng-model，否则无法触发验证

3、在css中分别定义`.ng-pristine`、`.ng-valid`、`.ng-invalid`、`.ng-dirty`这四种样式，ng会根据相应的状态自动加上样式。

## 只在提交表单后显示错误信息

有时候不想在用户正在输入的时候显示错误信息. 当前错误信息会在用户输入表单时立即显示. 由于Angular很棒的数据绑定特性，这是可以发生的. 因为所有的事务都可以在一瞬间发生改变，这在表单验证时会有副作用.

对于你想要只在表单正要提交之后才显示错误消息的场景, 你就需要对上面的代码做一些小调整.

1、你要去掉提交按钮上的ng-disabled，因为我们想要用户即使是在表单没有全部验证完的情况下也能点击提交.

2、你要在表单已经被提交之后添加一个变量. 在你的 `submitForm()` 函数中, 只要加入 `$scope.submitted = true` 就行了;. 一旦表单被提交，它就会保存提交值为true的submitted变量.

3、将错误规则从`ng-class="{ 'has-error' : userForm.name.$invalid && !userForm.name.$pristine }"` 调整为 `ng-class="{ 'has-error' : userForm.name.$invalid && !userForm.name.$pristine && submitted }".` 这就确保了错误消息只会在表单被提交时被显示出来. 你也许会需要为这个变量调整所有其它的 ng-class 和 ng-show.

现在，只有在submitted变量被设置为true时才会显示错误信息.

{% endraw %}
