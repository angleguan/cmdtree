---
date: 2017-12-25 10:02:18 +0800
title: JS图表库 Echarts
category: 学习笔记
---

[Echarts](http://echarts.baidu.com/index.html)是百度开源的一个JS图标库，兼容大部分现代浏览器，包括折线图、饼图、柱状图等。

# 使用教程

## 安装Echarts

最直接的方法就是直接在页面中像引用其它JS文件一样直接引用Echarts：

```html
<script src="https://cdn.bootcss.com/echarts/3.8.5/echarts.min.js"></script>
```

如果在Node项目中使用，也可以使用npm安装

```
npm install echarts --save
```

## 绘制图表

首先需要给Echarts图表绘制一个具备高宽的DOM容器：

```html
<div id="echarts" style="width: 600px;height:400px;"></div>
```

然后使用`echarts.init`方法初始化一个Echarts实例，下面是一个简单的柱状图实例：

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>ECharts</title>
  <!-- 引入 echarts.js -->
  <script src="https://cdn.bootcss.com/echarts/3.8.5/echarts.min.js"></script>
</head>

<body>
  <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
  <div id="main" style="width: 600px;height:400px;"></div>
  <script type="text/javascript">
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  </script>
</body>

</html>
```

效果如下：

![](/pics/2017/12/2501.png)

# 定制

[Echarts下载页](http://echarts.baidu.com/download.html)提供了不同的版本下载：

- 完整版：包含所有图表组件
- 常用版：包含常用的图表组件
- 精简版：包含基础图表（折 柱 饼）

但是一般来说，我们可能只想下载需要用到的图表类型，这时候就可以定制使用：

## 在线定制

这是最简单直观的方法，在[ECharts 在线构建](http://echarts.baidu.com/builder.html)页可以自助选择需要使用的图表进行打包下载

![](/pics/2017/12/2502.png)

然后引用定制好的文件即可。

## 在项目中定制

### 使用构建脚本

echarts自带有一个可以自定义构建的文件在`echarts/build/build.js`，需要在Node.js项目中运行，假如你已经在项目中安装好了echarts，你可以执行命令

```
node node_modules/echarts/build/build.js --help
```

来查看帮助，下面是只生成饼图的echarts文件的例子：

```
node node_modules/echarts/build/build.js --min -i echarts.custom.js -o lib/echarts.custom.min.js
```

这样就会生成`/lib/echarts.custom.min.js`文件，你可以在HTML文件中像上面那样运行。

## 打包工具

按照上面的使用脚本来定制的方法和在线构建的结果是一样的，都是打包出一个JS文件供引用，还有一种利于维护的方法就是和项目中所有的代码打包在一起，例如Webpack。

```js
var echarts = require('echarts');

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
myChart.setOption({
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
});
```