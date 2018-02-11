---
title: Nodejs的安装与npm的使用
date: 2017-08-19T22:22:00+00:00
category: 学习笔记
---

> Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。

## 一、下载安装NodeJS

下载地址[Download Node.js](https://nodejs.org/en/download/)

### Linux平台

Linux平台安装NodeJS的传统方法是编译安装：

```
$ git clone https://github.com/nodejs/node.git // 从Github获取最新源代码
$ sudo chmod -R 755 node // 修改目录权限
// 使用 ./configure 创建编译文件
$ cd node
$ sudo ./configure
$ sudo make
$ sudo make install
```

还有一种方法是通过Linux发行版的包管理工具进行安装：

```
# apt-get install nodejs npm    // Debian系列
```

安装完成后：

```
# 查看当前安装的Node的版本 
node -v 
v7.4.0

# 查看NPM版本
npm -v
4.0.5

# 更新 npm
sudo npm install -g npm
```

### Windows平台

Windows下安装NodeJS十分简单，在官网下载安装包（msi格式）打开即可。

### Mac平台

使用`brew`安装即可：

```
brew install node
```

### 安装cnpm

安装完NodeJS会自带包管理工具npm，但是速度较慢，我们可以使用国内的阿里镜像

安装命令

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

# NPM（Node Package Manager）

> NPM是随同NodeJS一起安装的包管理工具。

我们平常也就是使用它来安装和卸载一些依赖包。

### NPM的安装

npm一般会跟随NodeJS一起安装，也有情况是要单独使用命令来安装：

```
# apt-get install npm
```

## 常用命令


初始化项目（创建package.json）

```
$ npm init
```

```
λ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (vue-test)    # 项目名称
version: (1.0.0)    # 版本号
description:    # 项目描述
entry point: (generate.js)     # 入口文件
test command:   # 测试指令
git repository:     # git仓库
keywords:   # 关键字
author:     #作者
license: (ISC)      # 开源协议
About to write to C:\Users\rhatyang\Desktop\vue-test\package.json:

{
  "name": "vue-test",
  "version": "1.0.0",
  "description": "",
  "main": "generate.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this ok? (yes)    # 是否确定
```


一键安装项目中所需要的包（从package.json中读取依赖列表）

```
$ npm install
```

单独安装某个模块

```
$ npm install <express>     //本地安装

$ npm install <express> -g  //全局安装
```

**本地安装与全局安装的区别**

1、本地安装将安装包放在 `./node_modules` 下（运行 npm 命令时所在的目录），如果没有 node_modules 目录，会在当前执行 npm 命令的目录下生成 `node_modules` 目录；全局安装将安装包放在 `/usr/local` 下或者你 node 的安装目录。

2、本地安装可以通过 `require()` 来引入本地安装的包；全局安装可以直接在命令行里使用。

查看所有全局安装的模块：

```
$ npm list -g
```

查看`./node_modules`下的模块

```
$ npm ls

```

更新模块

```
$ npm update <express>
```

搜索模块

```
$ npm search <express>
```

查看某个模块的版本号

```
$ npm list grunt
```

查看某条命令的帮助

```
$ npm help <command> 
```

### package.json属性说明

- name - 包名。
- version - 包的版本号。
- description - 包的描述。
- homepage - 包的官网 url 。
- author - 包的作者姓名。
- contributors - 包的其他贡献者姓名。
- dependencies - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。
- repository - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。
- main - main 字段指定了程序的主入口文件，require('moduleName') 就会加载这个文件。这个字段的默认值是模块根目录下面的 generate.js。
- keywords - 关键字
