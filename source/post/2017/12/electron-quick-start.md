---
date: 2017-12-18 16:17:29
title: "Electron 快速入门"
category: 学习笔记
---

Electron是一种基于Node.js的跨平台技术，可以用HTML、CSS、JS来构建桌面应用。

## 前提条件

- 最新稳定版的Node.js
- Electron (`npm i electron -g`)

## 快速开始

首先，把官方的一个快速开始的例子克隆下来：

```
git clone https://github.com/electron/electron-quick-start.git
```

然后使用NPM或者YARN安装好依赖（本步骤可省略，因为这个例子仅有一个electron包需要安装）

```
npm install
```

接着就可以运行程序了



```
npm start    ## 或者 electron .
```

接着就会弹出一个窗口，就是这个快速开始的程序

![](/pics/2017/12/1801.png)

## 解析文件

可以运行了以后再来看一下这个程序里面都包括哪些文件

![](/pics/2017/12/1802.png)

忽略其它无关文件和没有内容的`renderer.js`，我们需要关注下面三个文件

```
electron-quick-start/
  ├── package.json
  ├── main.js
  └── index.html
```

首先是`package.json`，这是Nodejs项目的配置文件，里面包括了这个项目的一些信息和一些依赖情况，这个我们都知道。

```json
{
  "name": "electron-quick-start",
  "version": "1.0.0",
  "description": "A minimal Electron application",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "repository": "https://github.com/electron/electron-quick-start",
  "keywords": [
    "Electron",
    "quick",
    "start",
    "tutorial",
    "demo"
  ],
  "author": "GitHub",
  "license": "CC0-1.0",
  "devDependencies": {
    "electron": "~1.7.8"
  }
}
```

这里需要注意的一点是`main`字段定义了这个项目的入口文件，它指向`main.js`。

## main.js

这个文件是项目的入口文件，来看看它里面写了什么

```js
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {

  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
```

### createWindow()

上面各种导入声明不看，关键看`createWindow()`函数，我们来一步一步的分析

```js
mainWindow = new BrowserWindow({width: 800, height: 600})
```

`BrowserWindow`是一个是用来创建窗口的模块，是主进程，接受一个参数`[options]`。上面的例子中width为创建窗口的宽度，height为高度，表示打开一个长600px、宽800px的窗口。这里可以接受的参数很多，可以查看文档[BrowserWindow#new-browserwindowoptions](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions)

接着出现`loadURL`方法为主窗口载入一个页面，作为程序打开的首页。

```js
mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
```

这里使用了Nodejs的[url.format](https://nodejs.org/api/url.html#url_url_format_urlobject)方法间接的传入了`./index.html`文件作为首页，或者也可以直接在这里写一个URL:

```js
mainWindow.loadURL('https://fanzhiyang.com');
```

接着来看一下index.html文件

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using Node.js <script>document.write(process.versions.node)</script>,
    Chromium <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.

    <script>
      require('./renderer.js')
    </script>
  </body>
</html>

```

没错，这就是刚才看到的程序了，其实就是个HTML页面。`process.versions.node`、`process.versions.chrome`、`process.versions.electron`分别是node版本、Chrome内核版本和electron的版本。

在`createWindow()`函数最后的是关闭窗口的函数。

```js
mainWindow.on('closed', function () {
    mainWindow = null
})
```

直接将`null`赋给mainWindow就好了。

看到这里，你也许会这样想，其实Electron就是一个“浏览器”罢了，对，没错，你完全可以这样理解，你可以按照编写WEB页面的方式来写这个程序，只是不同的是，这个浏览器就是chromium内核，你无需考虑任何兼容性问题，并且你可以使用各种Node API，以及支持各种新特性。

### app

app控制了整个程序的生命周期，来看看上面代码中触发的一些事件。

```js
app.on('ready', createWindow)
```

`ready`，当electron完成初始化的时候触发，就是上面提到的`createWindow()`。

```js
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

`window-all-closed`，当所有的窗口都被关闭时触发，调用`quit()`方法退出应用。

```js
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
```

以及一个只有在mac OS里面才会被触发的`activate`事件，应该是在从dock中打开这个程序时重新加载窗口吧。

## 开发者工具

既然刚才说到开发人员可以像开发WEB应用一样去开发Electron，那怎能少得了浏览器中的开发者工具呢

```js
mainWindow.webContents.openDevTools();
```

只要在`createWindow()`函数中加入上面的代码，就会自动打开开发者工具，像这样

![](/pics/2017/12/1803.png)


## 结束

其实这个东西我也只是之前听说过一点，Atom就是使用Electron开发的，类似的还有Github Desktop、VScode等都是基于Electron开发的。