---
title: JSON快速上手
date: 2017-08-10T11:11:23+00:00
category: 学习笔记
---

JSON（JavaScript Object Notation，JavaScript 对象表示法）是一种存储和交换文本信息的语法。类似于XML。

## 实例

```html
<h2>JSON Object Creation in JavaScript</h2>

<p>
    Name:
    <span id="jname"></span>
    <br /> Age:
    <span id="jage"></span>
    <br /> Address:
    <span id="jstreet"></span>
    <br /> Phone:
    <span id="jphone"></span>
    <br />
</p>

<script>
    var JSONObject = {
        "name": "John Johnson",
        "street": "Oslo West 555",
        "age": 33,
        "phone": "555 1234567"
    };
    document.getElementById("jname").innerHTML = JSONObject.name
    document.getElementById("jage").innerHTML = JSONObject.age
    document.getElementById("jstreet").innerHTML = JSONObject.street
    document.getElementById("jphone").innerHTML = JSONObject.phone
</script>
```

# JSON 语法

JSON 语法是 JavaScript 对象表示法语法的子集。

- 数据在名称/值对中
- 数据由逗号分隔
- 花括号保存对象
- 方括号保存数组

## JSON 名称/值对

JSON 数据的书写格式是：名称/值对。

名称/值对包括字段名称（在双引号中），后面写一个冒号，然后是值：

```json
"firstName" : "John"
```

这很容易理解，等价于这条 JavaScript 语句：

```json
firstName = "John"
```

## JSON 值

JSON 值可以是：

- 数字（整数或浮点数）
- 字符串（在双引号中）
- 逻辑值（true 或 false）
- 数组（在方括号中）
- 对象（在花括号中）
- null

## JSON 对象

JSON 对象在花括号中书写：

对象可以包含多个名称/值对：

```json
{ "firstName":"John" , "lastName":"Doe" }
```

这一点也容易理解，与这条 JavaScript 语句等价：

```json
firstName = "John"
lastName = "Doe"
```

## JSON 数组

JSON 数组在方括号中书写：

数组可包含多个对象：

```json
{
    "employees": [{
            "firstName": "John",
            "lastName": "Doe"
        },
        {
            "firstName": "Anna",
            "lastName": "Smith"
        },
        {
            "firstName": "Peter",
            "lastName": "Jones"
        }
    ]
}
```

在上面的例子中，对象 "employees" 是包含三个对象的数组。每个对象代表一条关于某人（有姓和名）的记录。

## JSON 使用 JavaScript 语法

因为 JSON 使用 JavaScript 语法，所以无需额外的软件就能处理 JavaScript 中的 JSON。

通过 JavaScript，您可以创建一个对象数组，并像这样进行赋值：

```json
var employees = [{
        "firstName": "John",
        "lastName": "Doe"
    },
    {
        "firstName": "Anna",
        "lastName": "Smith"
    },
    {
        "firstName": "Peter",
        "lastName": "Jones"
    }
];
```

可以像这样访问 JavaScript 对象数组中的第一项：

```json
employees[0].lastName;
```

返回的内容是：

```
Doe
```

可以像这样修改数据：

```json
employees[0].firstName = "Jonatan";
```
 
在下面的章节，您将学到如何把 JSON 文本转换为 JavaScript 对象。

## JSON 文件

JSON 文件的文件类型是 ".json"

JSON 文本的 MIME 类型是 "application/json"

# JSON 使用

## JSON - 转换为 JavaScript 对象

JSON 文本格式在语法上与创建 JavaScript 对象的代码相同。

由于这种相似性，无需解析器，JavaScript 程序能够使用内建的 `eval()` 函数，用 JSON 数据来生成原生的 JavaScript 对象。


## 把 JSON 文本转换为 JavaScript 对象

JSON 最常见的用法之一，是从 web 服务器上读取 JSON 数据（作为文件或作为 HttpRequest），将 JSON 数据转换为 JavaScript 对象，然后在网页中使用该数据。

为了更简单地讲解，我们使用字符串作为输入进行演示（而不是文件）。

## JSON 实例 - 来自字符串的对象

创建包含 JSON 语法的 JavaScript 字符串：

```js
var txt = '{ "employees" : [' +
    '{ "firstName":"John" , "lastName":"Doe" },' +
    '{ "firstName":"Anna" , "lastName":"Smith" },' +
    '{ "firstName":"Peter" , "lastName":"Jones" } ]}';
```

由于 JSON 语法是 JavaScript 语法的子集，JavaScript 函数 eval() 可用于将 JSON 文本转换为 JavaScript 对象。
eval() 函数使用的是 JavaScript 编译器，可解析 JSON 文本，然后生成 JavaScript 对象。必须把文本包围在括号中，这样才能避免语法错误：

```js
var obj = eval ("(" + txt + ")");
```

在网页中使用 JavaScript 对象：
```html
<p>
First Name: <span id="fname"></span><br /> 
Last Name: <span id="lname"></span><br /> 
</p> 

<script>
    document.getElementById("fname").innerHTML = obj.employees[1].firstName 
    document.getElementById("lname").innerHTML = obj.employees[1].lastName 
</script>
```

## JSON 解析器

tips: eval() 函数可编译并执行任何 JavaScript 代码。在旧版本的浏览器中，使用eval()对JSON数据结构求值存在风险，因为这可能会执行一些恶意代码。

JSON对象有两个办法：stringift()和parse()。在最简单的情况下，这两个方法分别把javascript对象序列化为JSON字符串和把JSON字符串解析为原生javascript值。


**实例**

```js
var book = {
    "title": "Professional JavaScript",
    "authors": [
        "Nicholas C. Zakas"
    ],
    edition: 3,
    year: 2011
};

var jsonText = JSON.stringify(book);
alert(jsonText);

```

上面的例子将一个javascript对象转化为一个JSON字符串，默认情况下，JSON.stringift()输出的JSON字符串是不带任何空格缩进的，所以jsonText中的字符串是这样的：


```js
{"title":"Professional JavaScript","authors":["Nicholas C. Zakas"],"edition":3,"year":2011}
```

然后将JSON字符串直接传递给JSON.parse()就可以得到相应的javascript对象，

```js
var bookCopy = JSON.parse(jsonText);
```

如上代码可以创建一个类似book的对象

```js
alert(bookCopy.title);  //Professional JavaScript
```

# Ajax请求JSON数据

## 原生javascript请求实例

```html
<body>
<button id="btn">请求数据</button>
<ul id="list"></ul>
<script>
    var btn=document.getElementById('btn');
    var list=document.getElementById('list');
    btn.onclick=function (){
        // 1.创建XMLHttpRequest对象
        var xhr=null;
        if (window.XMLHttpRequest) {
            xhr=new XMLHttpRequest();
        } else{
            xhr=new ActiveXObject('Microsoft.XMLHTTP');
        };
        xhr.open('get','test.json',true);
        xhr.send(null);
        xhr.onreadystatechange=function (){
            if (xhr.readyState==4) {
                if (xhr.status==200) {
                    var json=JSON.parse(xhr.responseText);
                    for (var i = 0; i < json.length; i++) {
                        list.innerHTML+='<li>姓名:'+json[i].name+'， 性别:'+json[i].sex+'， 年龄:'+json[i].age+'， 成绩:'+json[i].score+'</li>';
                    };
                } else{
                    alert(xhr.status);
                };
            };
        }
    }
</script>
</body>
```

**test.json**

```json
[
    {"name":"老王","sex":"女","age":19,"score":66},
    {"name":"老刘","sex":"男","age":22,"score":72},
    {"name":"老李","sex":"女","age":24,"score":85},
    {"name":"老张","sex":"男","age":30,"score":96}
]
```

![](/pics/2017/08/fzy_screenshot20170810110911.png)


## JQuery 的getJSON()方法

使用JQuery的getJSON()可以快速的获取后台的JSON数据

**用法**

```js
$(selector).getJSON(url,data,success(data,status,xhr))
```

| 参数 | 说明|
| ------------| ------------| 
| url|   必需。规定将请求发送的哪个 URL。|
| data|   可选。规定连同请求发送到服务器的数据。|
| success(data,status,xhr) |   可选。规定当请求成功时运行的函数。|

该函数是简写的 Ajax 函数，等价于：

```js
$.ajax({
  url: url,
  data: data,
  success: callback,
  dataType: json
});

```
