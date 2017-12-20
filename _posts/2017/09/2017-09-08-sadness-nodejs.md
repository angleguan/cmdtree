---
layout: post
title: "apm: removing nodejs breaks dependency 'nodejs>=8'—— 这是一个赤裸裸的py交易"
date: 2017-09-08 15:29:18
category: 使用笔记
---

安装了最新版的Nodejs，在`npm run dev`时报错，查到是软件包的问题，所以打算删除掉最新版的nodejs，去官网下载v6.11.3LTS版。

```
# pacman -Rs nodejs
checking dependencies...
error: failed to prepare transaction (could not satisfy dependencies)
:: apm: removing nodejs breaks dependency 'nodejs>=8'
:: npm: removing nodejs breaks dependency 'nodejs'
:: semver: removing nodejs breaks dependency 'nodejs'
```
![](/pics/2017/09/0809001.jpg)

这让我懵逼了，没见过apm啊，这是个啥玩意。嗯，没事我知道npm，那我先删掉npm

```
# pacman -Rs npm
checking dependencies...
error: failed to prepare transaction (could not satisfy dependencies)
:: apm: removing npm breaks dependency 'npm'
```

看来还是不行，必须得删掉这个apm先

```
# pacman -Rs apm
checking dependencies...
error: failed to prepare transaction (could not satisfy dependencies)
:: atom: removing apm breaks dependency 'apm'
```

![](/pics/2017/09/0809002.jpg)

竟然是atom，没想到吧，之前用sublime老是卡死，所以想尝试换个editor，所以装了个atom，一直没用。

立马删了atom，卸载node，舒服～
