---
layout: post
date: 2017-12-2 09:42:26 +0800
title: Angular5.0 英雄教程
category: js
---

花了点时间（前后一个月。。。）做了一下angular的英雄教程，官方文档在这里[Angular - Tutorial: Tour of Heroes](https://angular.io/tutorial)，中文文档在[Angular - 教程：英雄指南](https://angular.cn/tutorial)，我是使用cli构建的应用，做好的仓库[rhatyang/AngularJS-Heroes-Tutorial-Demo: angular heroes tutorial Demo based on angular5 using cli build](https://github.com/rhatyang/AngularJS-Heroes-Tutorial-Demo)。

其实这个教程挺简单的，根本不需要这么多时间，如果认真做的话，即使没有接触过ng的人也能在两天之内做完，如果遇到有坑的话，先看看自己是不是有哪些地方没看到。

angular在上个月发布了5.0版本，ng的版本有必要提一下，严格上来说angularjs指的是angular1.0版本，是google在2009发布的一款MVC前端框架，而在2016年发布的angular2.0进行了很大的重写，所以通常把angular1.0和angular2.0是分开来的，官方也同时维护这两个版本，上个月发布的5.0和之前的4.0都是基于2.0的再优化。（angular5.0应用需要用cli1.5构建）

英雄教程是官网推荐的入门教程，里面涉及到了很多ng的功能和特性，所以我推荐想学习ng的同学先从英雄教程入手，推荐使用cli生成应用再按照教程来。

```
npm install -g @angular/cli
ng new my-app
cd my-app
npm install
ng serve --open
```

然后浏览器就会自动打开`localhost:4200`，接着按照教程做就好了。

总的来说，你只需要编辑src/app文件夹下的文件，如果你是使用的支持angular的IDE开发，那么期间你可能需要调一下tslint，这个问题头疼了我很久，tslint可以检查你代码的规范性，但也总感觉有些东西很没必要，比如要求你在一个文件的结尾必须多空一行，必须用单引号（我习惯了用双引号啊）所以就需要把`quotemark`设置为`false`，以及很多很烦人的规范，当然如果你没我这么毛病你完全可以把自己的编写习惯变成他这个要求，你需要调一下你编辑器的缩进啊等等。

我建议在刚开始就把html写在一个单独的文件里，不要直接写在template里，例如这样：

```ts
template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `
```

改成`templateUrl`即可。

```
templateUrl: './dashboard.component.html'
```
