---
layout: post
date: 2017-11-15 10:30:12 +0800
title: "使用VScode调试Angularjs应用"
category: js
---

# 一、环境要求

- 在VScode中安装插件`Debugger for Chrome`
- 确保Chrome安装在默认位置
- 项目要求使用Angular Cli创建
- 在项目中安装好必要依赖

# 二、配置launche.json

![](/pics/2017/11/1501.png)

安照上面的顺序打开launche.json文件，将这个文件的所有内容替换为下面内容

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Chrome",
            "url": "http://localhost:4200",
            "webRoot": "${workspaceRoot}"
        }
    ]
}
```

# 三、开始Debug

这个演示的项目在https://gitee.com/mumu-osc/NiceFish。

我在app.component.ts里的构造函数里面打个断点，像这样

![](/pics/2017/11/1502.png)

VScode本身自带有终端模拟器，使用Ctrl+`调出，你也可以使用其它终端。

输入`ng serve`启动项目。

![](/pics/2017/11/1503.png)

然后从VS Code的debug界面启动Chrome：

![](/pics/2017/11/1504.png)

接着会打开Chrome，或者你手动进入到`localhost:4200`，你一定会什么都没有看到，该是什么样子还是什么样子，**你需要刷新一下页面才能看到断点**。

![](/pics/2017/11/1505.png)

如果你使用那个项目并设置跟我一样的断点就可以看到这样了。VScode的上面还有一个控制台，当点击那个绿三角时就会继续运行代码了。

国内大多数企业并不做单元测试，我就先不写了吧，如果你想对单元测试代码进行Debug，请参考英文原版https://github.com/weinand/vscode-recipes/tree/master/Angular-CLI ，最后一小节Debug Unit Tests。


> 根据文章[VS Code 1.14发布，可以直接Debug Angular应用](https://damoqiongqiu.github.io/1-web/2017/07/12/debug-angular-inside-vscode.html)修改